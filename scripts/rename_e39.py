#!/usr/bin/env python3
"""Replace E39 product name references in content text across multiple files."""

import os
import re

BASE = os.path.join(os.path.dirname(__file__), "..", "client", "src")

# Files and replacements (only inline text content, not function names, routes, or IDs)
replacements = {
    os.path.join(BASE, "pages", "ProductE39Intro.tsx"): [
        # zh content paragraphs
        ("'E39 以 35mm 为核心", "'Mandler 35mm F/2 以 35mm 为核心"),
        ("'E39 采用经典双高斯", "'Mandler 35mm F/2 采用经典双高斯"),
        ("F2.0 时，E39 展现", "F2.0 时，Mandler 35mm F/2 展现"),
        ("'E39 不是一支炫技之作", "'Mandler 35mm F/2 不是一支炫技之作"),
        # ja content paragraphs
        ("'E39は35mmを核として", "'Mandler 35mm F/2は35mmを核として"),
        ("'E39はクラシックなダブルガウス", "'Mandler 35mm F/2はクラシックなダブルガウス"),
        ("では、E39は独特の", "では、Mandler 35mm F/2は独特の"),
        ("'E39は技術の誇示", "'Mandler 35mm F/2は技術の誇示"),
        # en content paragraphs
        ("35mm, E39 weaves", "35mm, the Mandler 35mm F/2 weaves"),
        ("'E39 employs the classic", "'The Mandler 35mm F/2 employs the classic"),
        ("F2.0, E39 reveals", "F2.0, the Mandler 35mm F/2 reveals"),
        ("'E39 is not a technical", "'The Mandler 35mm F/2 is not a technical"),
        # alt attributes
        ('alt="E39 detail"', 'alt="Mandler 35mm F/2 detail"'),
        ('alt="E39 front element"', 'alt="Mandler 35mm F/2 front element"'),
        ('alt="E39 lens body"', 'alt="Mandler 35mm F/2 lens body"'),
        ('alt="E39 kit"', 'alt="Mandler 35mm F/2 kit"'),
    ],
    os.path.join(BASE, "pages", "ProductE39.tsx"): [
        ('alt="E39"', 'alt="Mandler 35mm F/2"'),
        ('alt={`E39 view ${idx + 1}`}', 'alt={`Mandler 35mm F/2 view ${idx + 1}`}'),
    ],
    os.path.join(BASE, "pages", "ProductE39Special.tsx"): [
        ('alt="E39 Special Edition"', 'alt="Mandler 35mm F/2 Special Edition"'),
        ('alt={`E39 Special Edition view ${idx + 1}`}', 'alt={`Mandler 35mm F/2 Special Edition view ${idx + 1}`}'),
    ],
    os.path.join(BASE, "pages", "ProductE39SpecialIntro.tsx"): [
        ('alt="E39 Special Edition detail"', 'alt="Mandler 35mm F/2 Special Edition detail"'),
        ('alt="E39 Special material"', 'alt="Mandler 35mm F/2 Special material"'),
    ],
}

for filepath, pairs in replacements.items():
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    count = 0
    for old, new in pairs:
        if old in content:
            content = content.replace(old, new, 1)
            count += 1
        else:
            print(f"  WARNING: not found in {os.path.basename(filepath)}: {old[:60]}...")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  {os.path.basename(filepath)}: {count}/{len(pairs)} replacements applied")

print("\nDone.")
