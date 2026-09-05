import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

AZUL="#2a78d6"; LARANJA="#eb6834"; TINTA="#0b0b0b"; TINTA2="#52514e"
LINHA="#c9c7c2"; FUNDO="#f0efec"; SOMBRA="#dfe6f4"; BRANCO="#ffffff"

plt.rcParams.update({"font.family":"DejaVu Sans","font.size":8.2})

fig, ax = plt.subplots(figsize=(9.6, 4.35))
ax.set_xlim(0, 30); ax.set_ylim(0, 14.4); ax.axis("off")

CAMADAS = [
    "Aplicação / SQL",
    "Buffer manager do SGBD",
    "Sistema de arquivos",
    "Camada de bloco",
    "Mídia (HDD / SSD)",
]

def caixa(x, y, w, h, texto, fc, ec=LINHA, tc=TINTA, bold=False, fs=8.2):
    ax.add_patch(FancyBboxPatch((x, y), w, h,
        boxstyle="round,pad=0.02,rounding_size=0.16",
        linewidth=0.9, edgecolor=ec, facecolor=fc))
    ax.text(x+w/2, y+h/2, texto, ha="center", va="center",
            color=tc, fontsize=fs, fontweight="bold" if bold else "normal")

def corte(x, w, y, rotulo):
    ax.plot([x-0.35, x+w+0.35], [y, y], color=LARANJA, lw=1.9, ls=(0,(4,2.2)), zorder=5)
    ax.text(x+w/2, y, rotulo, ha="center", va="center", color=LARANJA,
            fontsize=7.4, fontweight="bold", zorder=6,
            bbox=dict(boxstyle="round,pad=0.28", facecolor="#ffffff",
                      edgecolor=LARANJA, linewidth=0.8))

COLS = [(0.9, "DAS", None), (10.6, "SAN", 3), (20.3, "NAS", 2)]
W = 7.0; H = 1.62; STEP = 2.05; Y0 = 1.15

for x, titulo, corte_idx in COLS:
    ax.text(x+W/2, 13.65, titulo, ha="center", va="center",
            color=TINTA, fontsize=11.5, fontweight="bold")
    sub = {"DAS":"disco cabeado ao servidor",
           "SAN":"a rede carrega BLOCOS",
           "NAS":"a rede carrega ARQUIVOS"}[titulo]
    ax.text(x+W/2, 12.85, sub, ha="center", va="center", color=TINTA2, fontsize=7.8)

    for i, nome in enumerate(CAMADAS):
        y = Y0 + (len(CAMADAS)-1-i)*STEP
        # sombreado = passa a ser responsabilidade do dispositivo de armazenamento
        delegada = corte_idx is not None and i >= corte_idx
        fc = SOMBRA if delegada else BRANCO
        ec = AZUL if delegada else LINHA
        caixa(x, y, W, H, nome, fc, ec=ec, bold=delegada)

    if corte_idx is not None:
        y_corte = Y0 + (len(CAMADAS)-1-corte_idx)*STEP + H + (STEP-H)/2
        rot = "a rede corta aqui: BLOCOS" if titulo=="SAN" else "a rede corta aqui: ARQUIVOS"
        corte(x, W, y_corte, rot)

ax.text(15.0, 0.28,
        "Caixas sombreadas: camadas que deixam de ser do servidor de banco de dados e passam a ser do dispositivo de armazenamento.",
        ha="center", va="center", color=TINTA2, fontsize=7.5, style="italic")

plt.tight_layout(pad=0.3)
plt.savefig("fig/pilhas.pdf", format="pdf", bbox_inches="tight")
plt.savefig("fig/pilhas.png", dpi=170, bbox_inches="tight")
print("pilhas OK")
