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
                   por_nome["SSD NVMe PCIe 5.0"][3]), 2.1999e-7)
perto(preco_por_KB(por_nome["SSD NVMe datacenter TLC"][2],
                   por_nome["SSD NVMe datacenter TLC"][3]), 1.0812825520833334e-6)
assert por_nome["Optico M-DISC BD-XL"][5:7] == (36e6, 18e6)
perto(por_nome["Tape library (LTO-10)"][3], 926.8 * 1000 * 1000**4 / 1000)

# A capacidade comprimida é cenário, não garantia: 23.170 × 40 TB × 2,5.
perto(23170 * 40 / 1000, 926.8)
perto(23170 * 40 * 2.5 / 1_000_000, 2.317)

print("Dados quantitativos conferem.")
