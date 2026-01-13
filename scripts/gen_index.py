#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
OUT = DOCS / "index.md"

EXCLUDE = {"index.md", "README.md"}

def title_from_md(p: Path) -> str:
    try:
        for line in p.read_text(encoding="utf-8").splitlines():
            if line.startswith("# "):
                return line[2:].strip()
    except Exception:
        pass
    return p.stem

mds = sorted(
    p for p in DOCS.rglob("*.md")
    if p.name not in EXCLUDE
)

lines = [
    "# Index",
    "",
    f"_Auto-generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}_",
    "",
]

for p in mds:
    rel = p.relative_to(DOCS).as_posix()
    lines.append(f"- [{title_from_md(p)}]({rel})")

OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"generated {OUT}")
