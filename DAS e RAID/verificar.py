#!/usr/bin/env python3
"""Valida o fonte LaTeX, as contas e os artefatos finais de DAS/RAID."""
from html import unescape
from pathlib import Path
from zipfile import ZipFile
import re

BASE = Path(__file__).resolve().parent

def ooxml_text(path):
    with ZipFile(path) as z:
        xml = "\n".join(z.read(n).decode("utf-8", "ignore") for n in z.namelist() if n.endswith(".xml"))
    return unescape(re.sub(r"<[^>]+>", " ", xml))

tex=(BASE/"relatorio.tex").read_text(encoding="utf-8").lower()
pdf=BASE/"DAS_RAID_Trabalho.pdf"; pptx=BASE/"DAS_RAID_Slides.pptx"
assert pdf.read_bytes()[:5] == b"%PDF-" and pptx.exists()
for term in ("bit-level", "block-level", "shadowing", "mttdl", "write hole", "raid 1.5", "raid-dp", "raid-z", "raid não é backup", "post-mortem"):
    assert term in tex, term
availability=1_000_000/(1_000_000+24)*100
assert round(availability,4)==99.9976
slides=ooxml_text(pptx).lower()
for term in ("raid não é backup", "mtbf", "raid 0+1", "níveis não padrão", "perguntas e debate"):
    assert term in slides, term
with ZipFile(pptx) as z: presentation=z.read("ppt/presentation.xml").decode("utf-8")
assert len(re.findall(r"<p:sldId\b", presentation)) == 17
print("DAS/RAID: LaTeX, PDF, contas e 17 slides conferem.")
