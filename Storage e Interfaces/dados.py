# -*- coding: utf-8 -*-
"""Dados consolidados da Tabela 16.1 atualizada (setembro/2026)."""

# nome, tier, capacidade_bytes_representativa, tempo_acesso_s, leitura_Bps, escrita_Bps, preco_USD, capacidade_KB
# KB = 1000 B para armazenamento; KiB = 1024 B para memórias (convenção de cada indústria)

MB = 1000**2; GB = 1000**3; TB = 1000**4
MiB = 1024**2; GiB = 1024**3

LINHAS = [
 # nome curto,               tier,      preco,        cap_KB,            t_acesso_s, leit_Bps,      escr_Bps
 ("Cache SRAM (L3)",         "primario", 199.0,       64*1024,           9.4e-9,     1.4e12,        1.4e12),
 ("DRAM DDR5 desktop",       "primario", 539.99,      32*1024*1024,      70e-9,      96e9,          96e9),
 ("DRAM DDR5 RDIMM",         "primario", 2833.95,     64*1024*1024,      75e-9,      51.2e9,        51.2e9),
 ("Memoria CXL 2.0",         "primario", None,        256*1024*1024,     140e-9,     36e9,          36e9),
 ("SSD NVMe PCIe 5.0",       "secundario", 399.99,    2*TB//1000,        50e-6,      14.7e9,        13.3e9),
 ("SSD NVMe datacenter",     "secundario", 16245.78,  61.44*TB/1000,     110e-6,     7.0e9,         3.0e9),
 ("SSD SATA",                "secundario", 344.75,    1*TB/1000,         77e-6,      560e6,         530e6),
 ("Pen drive USB 3.2",       "secundario", 129.70,    1*TB/1000,         300e-6,     1.0e9,         0.9e9),
 ("HDD HAMR 30 TB",          "secundario", 799.99,    30*TB/1000,        12.7e-3,    275e6,         275e6),
 ("Optico M-DISC BD-XL",     "terciario", 12.70,      100*GB/1000,       0.2,        27e6,          27e6),
 ("Fita LTO-9",              "terciario", 87.99,      18*TB/1000,        55.0,       400e6,         400e6),
 ("Fita LTO-10",             "terciario", 279.99,     30*TB/1000,        55.0,       400e6,         400e6),
 ("Tape library (LTO-10)",   "terciario", None,       927*1000*TB/1000,  73.0,       51.2e9,        51.2e9),
]

def preco_por_KB(preco, cap_KB):
    if preco is None: return None
    return preco/cap_KB

if __name__ == "__main__":
    print(f"{'Tecnologia':26} {'US$/KB':>12} {'US$/GB':>12}")
    for n,t,p,c,ta,r,w in LINHAS:
        v = preco_por_KB(p,c)
        if v is None:
            print(f"{n:26} {'n/d':>12} {'n/d':>12}")
        else:
            print(f"{n:26} {v:12.3e} {v*1e6:12.4f}")
