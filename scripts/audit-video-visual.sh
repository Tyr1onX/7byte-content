#!/usr/bin/env bash
set -euo pipefail

VIDEO=${1:?"usage: scripts/audit-video-visual.sh <video> [output-dir] [boundaries-csv]"}
OUT_DIR=${2:-visual-audit}
BOUNDARIES_CSV=${3:-${SHOT_BOUNDARIES:-}}
mkdir -p "$OUT_DIR"

if ! command -v ffmpeg >/dev/null 2>&1 || ! command -v ffprobe >/dev/null 2>&1; then
  echo "ffmpeg and ffprobe are required" >&2
  exit 1
fi

DURATION=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$VIDEO")
if [[ -z "$DURATION" || "$DURATION" == "N/A" ]]; then
  # Some MediaRecorder WebM files have no container duration. Remux first.
  REMUX="$OUT_DIR/remux-for-audit.mkv"
  ffmpeg -y -i "$VIDEO" -c copy "$REMUX" >/dev/null 2>&1
  VIDEO="$REMUX"
  DURATION=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$VIDEO")
fi

FPS_RAW=$(ffprobe -v error -select_streams v:0 -show_entries stream=avg_frame_rate -of default=nw=1:nk=1 "$VIDEO" | head -n1)
FPS=$(awk -v r="$FPS_RAW" 'BEGIN {split(r,a,"/"); if (a[2]>0) printf "%.6f", a[1]/a[2]; else if (a[1]>0) printf "%.6f", a[1]; else print "60"}')
FRAME=$(awk -v f="$FPS" 'BEGIN {printf "%.6f", 1/f}')
FRAME3=$(awk -v f="$FRAME" 'BEGIN {printf "%.6f", 3*f}')

INTERVAL=$(awk -v d="$DURATION" 'BEGIN {v=d/20; if (v<0.5) v=0.5; printf "%.3f", v}')
LAST2=$(awk -v d="$DURATION" 'BEGIN {v=d-2; if (v<0) v=0; printf "%.3f", v}')
LAST1=$(awk -v d="$DURATION" 'BEGIN {v=d-1; if (v<0) v=0; printf "%.3f", v}')
LAST02=$(awk -v d="$DURATION" 'BEGIN {v=d-0.2; if (v<0) v=0; printf "%.3f", v}')

# 20-frame overview for visual/model review.
ffmpeg -y -i "$VIDEO" \
  -vf "fps=1/${INTERVAL},scale=480:-2,tile=5x4:padding=8:margin=8:color=0x202020" \
  -frames:v 1 "$OUT_DIR/contact-sheet.png" >/dev/null 2>&1

# For audit frames, seek AFTER opening the input. Input-side -ss is faster but may
# land on an earlier keyframe in MediaRecorder WebM, which makes boundary audits
# look clean/dirty at the wrong timestamp. Accuracy matters more than speed here.
extract_frame() {
  local time=$1
  local output=$2
  ffmpeg -y -i "$VIDEO" -ss "$time" -frames:v 1 "$output" >/dev/null 2>&1
}

# Start/end frames catch initialization residue and accidental player loops.
for entry in \
  "start-020:0.2" \
  "start-100:1.0" \
  "end-minus-2:${LAST2}" \
  "end-minus-1:${LAST1}" \
  "end-minus-020:${LAST02}"; do
  name=${entry%%:*}
  time=${entry#*:}
  extract_frame "$time" "$OUT_DIR/${name}.png"
done

# Ownership gate: inspect each requested shot boundary at -3/-1/0/+1/+3 frames.
# Example: scripts/audit-video-visual.sh video.mp4 audit "4.005,8.214,37.869,49.005"
if [[ -n "$BOUNDARIES_CSV" ]]; then
  mkdir -p "$OUT_DIR/boundaries"
  IFS=',' read -ra BOUNDARIES <<< "$BOUNDARIES_CSV"
  index=0
  for raw in "${BOUNDARIES[@]}"; do
    boundary=$(echo "$raw" | xargs)
    [[ -z "$boundary" ]] && continue
    index=$((index + 1))

    minus3=$(awk -v t="$boundary" -v d="$FRAME3" 'BEGIN {v=t-d; if (v<0) v=0; printf "%.6f", v}')
    minus1=$(awk -v t="$boundary" -v d="$FRAME" 'BEGIN {v=t-d; if (v<0) v=0; printf "%.6f", v}')
    plus1=$(awk -v t="$boundary" -v d="$FRAME" -v max="$DURATION" 'BEGIN {v=t+d; if (v>max) v=max; printf "%.6f", v}')
    plus3=$(awk -v t="$boundary" -v d="$FRAME3" -v max="$DURATION" 'BEGIN {v=t+d; if (v>max) v=max; printf "%.6f", v}')

    for entry in \
      "m3:${minus3}" \
      "m1:${minus1}" \
      "b0:${boundary}" \
      "p1:${plus1}" \
      "p3:${plus3}"; do
      label=${entry%%:*}
      time=${entry#*:}
      extract_frame "$time" "$OUT_DIR/boundaries/b$(printf '%02d' "$index")-${label}.png"
    done
  done
fi

cat <<EOF
Visual audit generated in: $OUT_DIR
Duration: ${DURATION}s
FPS: ${FPS}
Inspect contact-sheet.png plus start/end frames for:
- orphan lines / stale elements
- connector endpoints not touching nodes
- overlapping UI / subtitles
- duplicated narration-as-screen-text
- shot transition residue or black flashes
- end-of-body loop back to frame 0
EOF

if [[ -n "$BOUNDARIES_CSV" ]]; then
cat <<EOF
Boundary ownership frames: $OUT_DIR/boundaries/
For every boundary, compare -3 / -1 / 0 / +1 / +3 frames and fail the review if:
- one semantic object has two visible owners
- a root-level handoff proxy survives after its target shot owns the object
- a detached label/status remains after its parent object leaves
- a previous-shot primitive is still visible without a deliberate transition role
EOF
fi
