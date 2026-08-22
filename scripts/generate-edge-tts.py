#!/usr/bin/env python3

import argparse
import asyncio
import json
import re
from pathlib import Path

import edge_tts

PUNCTUATION = set("，。！？、；：“”‘’：,.!?;:'\"()（）-—… \n\r\t")


def normalize(text: str) -> str:
    return "".join(ch.lower() for ch in text if ch not in PUNCTUATION)


def seconds_from_ticks(value: int | float) -> float:
    # edge-tts offsets and durations use 100 ns ticks.
    return float(value) / 10_000_000.0


def vtt_time(seconds: float) -> str:
    ms = max(0, round(seconds * 1000))
    h, rem = divmod(ms, 3_600_000)
    m, rem = divmod(rem, 60_000)
    s, ms = divmod(rem, 1000)
    return f"{h:02d}:{m:02d}:{s:02d}.{ms:03d}"


def align_words_to_script(script: str, words: list[dict]) -> None:
    normalized_chars: list[str] = []
    raw_indexes: list[int] = []
    for raw_index, char in enumerate(script):
        if char in PUNCTUATION:
            continue
        normalized_chars.append(char.lower())
        raw_indexes.append(raw_index)
    normalized_script = "".join(normalized_chars)

    cursor = 0
    for word in words:
        token = normalize(word["text"])
        if not token:
            word["rawStart"] = None
            word["rawEnd"] = None
            continue
        found = normalized_script.find(token, cursor)
        if found < 0:
            word["rawStart"] = None
            word["rawEnd"] = None
            continue
        end = found + len(token)
        word["rawStart"] = raw_indexes[found]
        word["rawEnd"] = raw_indexes[end - 1] + 1
        cursor = end


def build_subtitle_groups(script: str, words: list[dict]) -> list[dict]:
    if not words:
        return []

    groups: list[list[dict]] = []
    current: list[dict] = []

    for word in words:
        if current:
            gap = word["start"] - current[-1]["end"]
            chars = sum(len(normalize(item["text"])) for item in current)
            duration = current[-1]["end"] - current[0]["start"]
            if gap >= 0.42 or chars >= 20 or duration >= 2.8:
                groups.append(current)
                current = []
        current.append(word)
    if current:
        groups.append(current)

    result: list[dict] = []
    for index, group in enumerate(groups):
        first = group[0]
        last = group[-1]
        text = "".join(item["text"] for item in group)

        if first.get("rawStart") is not None:
            raw_start = first["rawStart"]
            if index + 1 < len(groups) and groups[index + 1][0].get("rawStart") is not None:
                raw_end = groups[index + 1][0]["rawStart"]
            elif last.get("rawEnd") is not None:
                raw_end = len(script)
            else:
                raw_end = None
            if raw_end is not None:
                candidate = re.sub(r"\s+", "", script[raw_start:raw_end]).strip()
                if candidate:
                    text = candidate

        result.append({
            "start": first["start"],
            "end": max(last["end"], first["start"] + 0.20),
            "text": text,
        })
    return result


def write_vtt(path: Path, cues: list[dict]) -> None:
    lines = ["WEBVTT", ""]
    for cue in cues:
        lines.append(f"{vtt_time(cue['start'])} --> {vtt_time(cue['end'])}")
        lines.append(cue["text"])
        lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


async def generate(args: argparse.Namespace) -> None:
    script = Path(args.script).read_text(encoding="utf-8").strip()
    if not script:
        raise RuntimeError("TTS script is empty")

    audio_path = Path(args.audio)
    timing_path = Path(args.word_timing)
    vtt_path = Path(args.vtt)
    audio_path.parent.mkdir(parents=True, exist_ok=True)
    timing_path.parent.mkdir(parents=True, exist_ok=True)
    vtt_path.parent.mkdir(parents=True, exist_ok=True)

    communicate = edge_tts.Communicate(
        script,
        args.voice,
        rate=args.rate,
        boundary="WordBoundary",
    )

    words: list[dict] = []
    with audio_path.open("wb") as audio_file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                start = seconds_from_ticks(chunk["offset"])
                duration = seconds_from_ticks(chunk["duration"])
                words.append({
                    "text": chunk["text"],
                    "start": start,
                    "end": start + duration,
                    "offset": chunk["offset"],
                    "duration": chunk["duration"],
                })

    if not words:
        raise RuntimeError("edge-tts returned no WordBoundary events")

    align_words_to_script(script, words)
    cues = build_subtitle_groups(script, words)

    timing_path.write_text(
        json.dumps({"script": script, "words": words}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    write_vtt(vtt_path, cues)

    print(json.dumps({
        "wordCount": len(words),
        "cueCount": len(cues),
        "firstWord": words[0],
        "lastWord": words[-1],
    }, ensure_ascii=False))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--script", required=True)
    parser.add_argument("--voice", required=True)
    parser.add_argument("--rate", default="-2%")
    parser.add_argument("--audio", required=True)
    parser.add_argument("--word-timing", required=True)
    parser.add_argument("--vtt", required=True)
    args = parser.parse_args()
    asyncio.run(generate(args))


if __name__ == "__main__":
    main()
