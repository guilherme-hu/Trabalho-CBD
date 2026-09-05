#!/usr/bin/env python3
"""Valida contas e artefatos finais de DAS/RAID usando apenas a stdlib."""
from html import unescape
from pathlib import Path
from zipfile import ZipFile
import re

BASE = Path(__file__).resolve().parent


def ooxml_text(path):
    with ZipFile(path) as package:
        xml = "\n".join(
            package.read(name).decode("utf-8", "ignore")
            for name in package.namelist()
            if name.endswith(".xml")
        )
    return unescape(re.sub(r"<[^>]+>", " ", xml))


docx = BASE / "DAS_RAID_Trabalho.docx"
pptx = BASE / "DAS_RAID_Slides.pptx"
pdf = BASE / "DAS_RAID_Trabalho.pdf"
assert docx.exists() and pptx.exists() and pdf.exists()
assert pdf.read_bytes()[:5] == b"%PDF-"

availability = 1_000_000 / (1_000_000 + 24) * 100
assert round(availability, 4) == 99.9976

doc = ooxml_text(docx).lower()
slides = ooxml_text(pptx).lower()
for term in ("raid não é backup", "mttdl", "stripe width", "rpo", "rto"):
    assert term in doc, term
for term in ("raid fornece disponibilidade", "confiabilidade", "níveis históricos"):
    assert term in slides, term
with ZipFile(pptx) as package:
    presentation = package.read("ppt/presentation.xml").decode("utf-8")
assert len(re.findall(r"<p:sldId\b", presentation)) == 22
print("DAS/RAID: contas e artefatos conferem (22 slides).")
