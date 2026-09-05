import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

AZUL="#2a78d6"; LARANJA="#eb6834"; TINTA="#0b0b0b"; TINTA2="#52514e"
LINHA="#c9c7c2"; VERDE="#2e7d5b"; ROXO="#6b4fa8"; BRANCO="#ffffff"
plt.rcParams.update({"font.family":"DejaVu Sans","font.size":8})

fig, ax = plt.subplots(figsize=(11.0, 4.9))
ax.set_xlim(0, 47); ax.set_ylim(0, 20); ax.axis("off")

def cx(x, y, w, h, txt, fc, tc=BRANCO, fs=8.0, bold=True):
    ax.add_patch(FancyBboxPatch((x, y), w, h,
        boxstyle="round,pad=0.02,rounding_size=0.18",
        linewidth=0.9, edgecolor=fc, facecolor=fc))
    ax.text(x+w/2, y+h/2, txt, ha="center", va="center", color=tc,
            fontsize=fs, fontweight="bold" if bold else "normal")

COLS = [
    ("SAN — FCP sobre FC",      "sem TCP, sem IP\nrede FC dedicada",
     [("Comando / dados SCSI", AZUL), ("Quadro FC (FC-2)", LARANJA), ("Fibra / cobre FC (FC-0/1)", TINTA2)]),
    ("SAN — iSCSI",             "roteável: LAN, WAN, Internet",
     [("Comando / dados SCSI", AZUL), ("PDU iSCSI", VERDE), ("TCP", TINTA2), ("IP", TINTA2), ("Ethernet", TINTA2)]),
    ("SAN — FCIP (túnel)",      "roteável: liga duas fabrics FC",
     [("Comando / dados SCSI", AZUL), ("Quadro FC (FC-2)", LARANJA), ("FCIP", ROXO), ("TCP", TINTA2), ("IP", TINTA2), ("Ethernet", TINTA2)]),
    ("SAN — FCoE",              "NÃO roteável: só camada 2",
     [("Comando / dados SCSI", AZUL), ("Quadro FC (FC-2)", LARANJA), ("Ethernet sem perdas (DCB)", "#b03a1a")]),
    ("NAS — NFS / SMB",         "roteável; unidade = ARQUIVO",
     [("Operações de ARQUIVO", "#8a5a00"), ("RPC (NFS) / SMB", VERDE), ("TCP", TINTA2), ("IP", TINTA2), ("Ethernet", TINTA2)]),
]

W = 8.0; GAP = 1.4; H = 1.72; Y0 = 2.4
for k,(titulo, sub, pilha) in enumerate(COLS):
    x = 0.6 + k*(W+GAP)
    ax.text(x+W/2, 18.9, titulo, ha="center", va="center",
            color=TINTA, fontsize=9.6, fontweight="bold")
    ax.text(x+W/2, 17.75, sub, ha="center", va="center", color=TINTA2, fontsize=7.6)
    y = Y0
    for nome, cor in reversed(pilha):
        cx(x, y, W, H, nome, cor, fs=7.6)
        y += H + 0.34
    ax.plot([x-0.35, x+W+0.35], [Y0-0.55, Y0-0.55], color=LINHA, lw=1.0)
    ax.text(x+W/2, Y0-1.35, "mais baixo na pilha ↓", ha="center", va="center",
            color=LINHA, fontsize=6.8)

ax.text(23.5, 0.35,
        "O que trafega na rede em cada caso. Azul = carga SCSI · laranja = quadro Fibre Channel inteiro · cinza = pilha Ethernet/IP comum.",
        ha="center", va="center", color=TINTA2, fontsize=7.4, style="italic")

plt.tight_layout(pad=0.25)
plt.savefig("fig/encapsulamento.pdf", format="pdf", bbox_inches="tight")
plt.savefig("fig/encapsulamento.png", dpi=175, bbox_inches="tight")
print("ok")
