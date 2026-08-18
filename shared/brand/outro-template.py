"""7BYTE canonical outro guard.

The approved outro is NOT generated here.
It must be copied verbatim from the canonical asset extracted from EP001 V5:

    ChatGPT Library: /7BYTE/brand/7BYTE-outro-canonical-from-EP001-V5.mp4

This script intentionally refuses to synthesize a replacement. It only copies an
explicit canonical input file to an output path so future automation cannot
silently redesign the outro.
"""

from pathlib import Path
import shutil
import sys


def main(canonical_path: str, output_path: str) -> None:
    source = Path(canonical_path)
    target = Path(output_path)

    if not source.exists():
        raise FileNotFoundError(
            "Canonical 7BYTE outro is missing. Fetch "
            "/7BYTE/brand/7BYTE-outro-canonical-from-EP001-V5.mp4 from the "
            "ChatGPT file library. Do not regenerate a substitute."
        )

    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(
            "Usage: python shared/brand/outro-template.py "
            "<canonical-outro.mp4> <output.mp4>"
        )
    main(sys.argv[1], sys.argv[2])
