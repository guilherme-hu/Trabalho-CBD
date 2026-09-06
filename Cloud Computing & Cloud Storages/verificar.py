#!/usr/bin/env python3
"""Valida o fonte LaTeX, as contas e os artefatos finais de Cloud/AWS."""
from html import unescape
from pathlib import Path
from zipfile import ZipFile
import re

BASE=Path(__file__).resolve().parent

def ooxml_text(path):
    with ZipFile(path) as z:
        xml="\n".join(z.read(n).decode("utf-8", "ignore") for n in z.namelist() if n.endswith(".xml"))
    return unescape(re.sub(r"<[^>]+>", " ", xml))

tex=(BASE/"relatorio.tex").read_text(encoding="utf-8").lower()
pdf=BASE/"Cloud_Computing_AWS_Trabalho.pdf"; pptx=BASE/"Cloud_Computing_AWS_Slides.pptx"
assert pdf.read_bytes()[:5] == b"%PDF-" and pptx.exists()
gb=3_500_000
assert 50_000*.023+450_000*.022+3_000_000*.021 == 74_050
assert gb*.0125==43_750 and gb*.0036==12_600 and gb*.00099==3_465
assert gb*.024==84_000 and gb*.08==280_000
assert 3_500*5==17_500 and 3_500*5*30==525_000
assert round(3.5e15*8/10e9/86_400,1)==32.4
assert -(-3.5e15//(16*2**40))==199
for term in ("iaas", "paas", "saas", "dbaas", "dwaas", "3.500.000", "74.050", "redshift managed storage", "post-mortem"):
    assert term in tex, term
slides=ooxml_text(pptx).lower()
for term in ("3.500.000 gb", "74.050", "525.000", "arquitetura recomendada", "perguntas e debate"):
    assert term in slides, term
with ZipFile(pptx) as z: presentation=z.read("ppt/presentation.xml").decode("utf-8")
assert len(re.findall(r"<p:sldId\b", presentation)) == 18
print("Cloud/AWS: LaTeX, PDF, custos e 18 slides conferem.")
