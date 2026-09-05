#!/usr/bin/env python3
"""Valida custos, migração e artefatos finais de Cloud/AWS pela stdlib."""
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


docx = BASE / "Cloud_Computing_AWS_Trabalho.docx"
pptx = BASE / "Cloud_Computing_AWS_Slides.pptx"
pdf = BASE / "Cloud_Computing_AWS_Trabalho.pdf"
assert docx.exists() and pptx.exists() and pdf.exists()
assert not (BASE / "Cloud_Computing_AWS_Slides(1).pptx").exists()
assert pdf.read_bytes()[:5] == b"%PDF-"

gb = 3_500_000
standard = 50_000 * 0.023 + 450_000 * 0.022 + 3_000_000 * 0.021
assert standard == 74_050
assert gb * 0.0125 == 43_750
assert gb * 0.0036 == 12_600
assert gb * 0.00099 == 3_465
assert 3_500 * 5 == 17_500
assert 3_500 * 5 * 30 == 525_000
days_10_gbps = 3.5e15 * 8 / 10e9 / 86_400
assert round(days_10_gbps, 1) == 32.4
assert round(days_10_gbps / 10, 2) == 3.24

doc = ooxml_text(docx).lower()
slides = ooxml_text(pptx).lower()
for term in ("3.500.000 gb", "74.050", "amazon efs", "arquitetura, limites e cenários"):
    assert term in doc, term
for term in ("3.500.000 gb", "74050", "arquitetura viável", "processamento pode superar"):
    assert term in slides, term
with ZipFile(pptx) as package:
    presentation = package.read("ppt/presentation.xml").decode("utf-8")
assert len(re.findall(r"<p:sldId\b", presentation)) == 19
print("Cloud/AWS: contas e artefatos conferem (19 slides).")
