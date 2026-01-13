#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
OUT = DOCS / "index.md"

EXCLUDE = {"index.md", "README.md"}

def title_from_md(p: Path) -> str:
    try:
        lines = p.read_text(encoding="utf-8").splitlines()
    except Exception:
        return p.stem

    start_index = 0
    if lines and lines[0].strip() == "---":
        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                start_index = i + 1
                break

    for line in lines[start_index:]:
        if line.startswith("# "):
            return line[2:].strip()
    return p.stem

def group_key(rel: Path) -> str:
    # docs直下なら「(root)」扱い、サブフォルダならその最上位フォルダ名
    parts = rel.parts
    if len(parts) <= 1:
        return "(root)"
    return parts[0]

# 収集
md_files = []
for p in DOCS.rglob("*.md"):
    if p.name in EXCLUDE:
        continue
    md_files.append(p)

# グルーピング
groups: dict[str, list[Path]] = {}
for p in md_files:
    rel = p.relative_to(DOCS)
    k = group_key(rel)
    groups.setdefault(k, []).append(p)

# ソート（フォルダ名、ファイルパス）
for k in groups:
    groups[k].sort(key=lambda p: p.relative_to(DOCS).as_posix().lower())
sorted_group_names = sorted(groups.keys(), key=lambda s: s.lower())

# 出力
lines = [
    "# Index",
    "",
    f"_Auto-generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}_",
    "",
]

for g in sorted_group_names:
    lines.append(f"## {g}")
    lines.append("")
    for p in groups[g]:
        rel = p.relative_to(DOCS).as_posix()
        title = title_from_md(p)
        lines.append(f"- [{title}]({rel})")
    lines.append("")

OUT.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
print(f"generated {OUT}")
