# -*- coding: utf-8 -*-
"""Valida a fonte canônica antes de gerar figuras, relatório e slides."""
import math
from dados import LINHAS, preco_por_KB

por_nome = {linha[0]: linha for linha in LINHAS}

def perto(valor, esperado, rel=1e-6):
    assert math.isclose(valor, esperado, rel_tol=rel), (valor, esperado)

# Valores que já causaram divergência entre dados.py, TeX e slides.
perto(por_nome["Cache SRAM (L3)"][4], 9.02e-9)
perto(por_nome["Memoria CXL 2.0"][4], 242.5e-9)
perto(preco_por_KB(por_nome["SSD NVMe PCIe 5.0"][2],
                   por_nome["SSD NVMe PCIe 5.0"][3]), 1.9999e-7)
perto(preco_por_KB(por_nome["SSD NVMe datacenter TLC"][2],
                   por_nome["SSD NVMe datacenter TLC"][3]), 1.0812825520833334e-6)
assert por_nome["Optico M-DISC BD-XL"][5:7] == (36e6, 18e6)
perto(por_nome["Tape library (LTO-10)"][3], 926.8 * 1000 * 1000**4 / 1000)

# A capacidade comprimida é cenário, não garantia: 23.170 × 40 TB × 2,5.
perto(23170 * 40 / 1000, 926.8)
perto(23170 * 40 * 2.5 / 1_000_000, 2.317)

# Todas as capacidades são KB decimais, inclusive as memórias.
perto(por_nome["Cache SRAM (L3)"][3], 64 * 1024**2 / 1000)
perto(por_nome["DRAM DDR5 desktop"][3], 32 * 1024**3 / 1000)
perto(por_nome["DRAM DDR5 RDIMM"][3], 64 * 1024**3 / 1000)
for nome in ("SSD NVMe PCIe 5.0", "SSD NVMe datacenter QLC", "SSD NVMe datacenter TLC"):
    perto(por_nome[nome][4], 50e-6)  # Referência do livro, não latência medida.

from pathlib import Path
from zipfile import ZipFile
from xml.etree import ElementTree as ET
base = Path(__file__).resolve().parent
tex = (base / "relatorio.tex").read_text(encoding="utf-8")
with ZipFile(base / "Slides_Armazenamento_SBD.pptx") as z:
    partes = [z.read(n) for n in z.namelist()
              if n.startswith(("ppt/slides/slide", "ppt/notesSlides/notesSlide")) and n.endswith('.xml')]
ppt = "\n".join(e.text or "" for p in partes for e in ET.fromstring(p).iter() if e.tag.endswith('}t'))
for chave in ("123420783", "199,99", "50", "1.000", "MSRP"):
    assert chave in tex and chave in ppt, f"Valor-chave ausente: {chave}"
assert "2{,}00\\times10^{-7}" in tex and "2,00×10⁻⁷" in ppt
assert "219,99" not in tex and "219,99" not in ppt
assert "8--10\\,\\textmu s" not in tex and "8–10 µs" not in ppt
print("Contas e valores selecionados conferem; preços de mercado não são validados pelo script.")
