#!/usr/bin/env python3
"""Reconstruct the exact approved horizontal 7BYTE outro from transport chunks.

Most chunks are byte-for-byte canonical. Two historical connector writes lost or
changed one base64 character; repair them only when the resulting Git blob SHA
matches the known canonical SHA. The final MP4 must also match the approved
size and SHA-256 or this script fails closed.
"""

from __future__ import annotations

import base64
import hashlib
from pathlib import Path

ROOT = Path("shared/brand/assets")
OUT = Path("output/outro-horizontal-canonical.mp4")
REPAIRED = Path("output/canonical-outro-chunks")
ALPHABET = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

EXPECTED_BLOB = {
    0: "6405b79caec7cb2fc4b83b4e2b25d7d4e0609249",
    1: "7fb62dbdecf0427b380ed8d86a9939b1ef8a78ee",
    2: "61ad9cefd2b43b5804a17ac8b65a86213cd5214b",
    3: "fa66fcb35ddb19b3f203bd226edeb7e59602fd31",
    4: "92eebc9f0da4a8f81ebba80880b28f2e186fcb8b",
    5: "20972a21b551b62c9920d51a9ec7f8acabc7b717",
    6: "d83acc3aaf1f16ea5c10120450ce03dc145546e6",
    7: "5ee1fc31f0e97e98c71f7686409a8061c006c52b",
    8: "8fcbd39ca4a0eeb4e5d50b17c631be47da418a13",
    9: "a7f849593b293e2f7c6b8bc84680942cb536316d",
    10: "2bff07656a1288603b06bed9b191bc7c9f2f6594",
    11: "80b5094ab30bd6881dfb821c71ee524d9f84d542",
    12: "8ff1a63614450440a800b974882014d247e4d2a7",
    13: "6e97f41db33c8c53eeaf96184b5eb2103dc07101",
}
EXPECTED_SIZE = 125386
EXPECTED_SHA256 = "108db6384810b9545bc2ea369282b423df0ee5e5d5541cc06ebffc167d3bd2fb"


def git_blob_sha(data: bytes) -> str:
    return hashlib.sha1(f"blob {len(data)}\0".encode() + data).hexdigest()


def repair_insert(data: bytes, target_sha: str) -> bytes:
    target_len = len(data) + 1
    header = f"blob {target_len}\0".encode()
    prefix = hashlib.sha1(header)
    for i in range(target_len):
        suffix = data[i:]
        for ch in ALPHABET:
            h = prefix.copy()
            h.update(bytes((ch,)))
            h.update(suffix)
            if h.hexdigest() == target_sha:
                fixed = data[:i] + bytes((ch,)) + suffix
                print(f"repaired insertion at offset {i}")
                return fixed
        if i < len(data):
            prefix.update(data[i:i+1])
    raise RuntimeError("unable to repair canonical part11 by one-character insertion")


def repair_substitution(data: bytes, target_sha: str) -> bytes:
    header = f"blob {len(data)}\0".encode()
    prefix = hashlib.sha1(header)
    for i, old in enumerate(data):
        suffix = data[i + 1:]
        for ch in ALPHABET:
            if ch == old:
                continue
            h = prefix.copy()
            h.update(bytes((ch,)))
            h.update(suffix)
            if h.hexdigest() == target_sha:
                fixed = data[:i] + bytes((ch,)) + suffix
                print(f"repaired substitution at offset {i}")
                return fixed
        prefix.update(data[i:i+1])
    raise RuntimeError("unable to repair canonical part13 by one-character substitution")


def read_part(index: int) -> bytes:
    path = ROOT / f"outro-horizontal-canonical.mp4.b64.part{index:02d}"
    data = path.read_bytes().rstrip(b"\r\n")
    expected = EXPECTED_BLOB[index]
    if git_blob_sha(data) == expected:
        return data
    if index == 11 and len(data) == 11999:
        return repair_insert(data, expected)
    if index == 13 and len(data) == 11184:
        return repair_substitution(data, expected)
    raise RuntimeError(
        f"canonical part{index:02d} mismatch: len={len(data)} sha={git_blob_sha(data)} expected={expected}"
    )


def main() -> None:
    REPAIRED.mkdir(parents=True, exist_ok=True)
    chunks: list[bytes] = []
    for index in range(14):
        data = read_part(index)
        actual = git_blob_sha(data)
        if actual != EXPECTED_BLOB[index]:
            raise RuntimeError(f"part{index:02d} still mismatched after repair")
        if index in (11, 13):
            (REPAIRED / f"part{index:02d}").write_bytes(data)
        chunks.append(data)
        print(f"part{index:02d}: {len(data)} chars {actual}")

    encoded = b"".join(chunks)
    raw = base64.b64decode(encoded, validate=True)
    sha256 = hashlib.sha256(raw).hexdigest()
    if len(raw) != EXPECTED_SIZE:
        raise RuntimeError(f"outro size mismatch: {len(raw)} != {EXPECTED_SIZE}")
    if sha256 != EXPECTED_SHA256:
        raise RuntimeError(f"outro sha256 mismatch: {sha256} != {EXPECTED_SHA256}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_bytes(raw)
    print(f"canonical outro reconstructed: {OUT} {len(raw)} bytes {sha256}")


if __name__ == "__main__":
    main()
