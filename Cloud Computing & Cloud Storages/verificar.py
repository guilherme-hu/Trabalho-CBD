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
gb=3.5e15/2**30
standard=51_200*.023+460_800*.022+(gb-512_000)*.021
assert round(standard)==69_015
assert round(gb*.0125)==40_745 and round(gb*.0036)==11_735 and round(gb*.00099)==3_227
assert round(gb*.024)==78_231 and round(gb*.08)==260_770
tb=3.5e15/2**40
assert round(tb*5)==15_916 and round(tb*5*30)==477_485
assert round(3.5e15*8/10e9/86_400,1)==32.4
assert -(-3.5e15//(16*2**40))==199
for term in ("iaas", "paas", "saas", "dbaas", "dwaas", "3.259.629", "69.015", "redshift managed storage", "post-mortem"):
    assert term in tex, term
slides=ooxml_text(pptx).lower()
for term in ("3.259.629 gb", "69.015", "477.485", "arquitetura recomendada", "perguntas e debate"):
    assert term in slides, term
with ZipFile(pptx) as z: presentation=z.read("ppt/presentation.xml").decode("utf-8")
assert len(re.findall(r"<p:sldId\b", presentation)) == 25
print("Cloud/AWS: LaTeX, PDF, custos e 25 slides conferem.")
