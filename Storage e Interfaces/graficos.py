# -*- coding: utf-8 -*-
import sys, os, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.ticker import LogLocator
AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
FIG  = os.path.join(AQUI, "fig")
os.makedirs(FIG, exist_ok=True)
from dados import LINHAS, preco_por_KB

SURF="#fcfcfb"; INK="#0b0b0b"; INK2="#52514e"; GRID="#e3e2de"
C={"primario":"#2a78d6","secundario":"#eb6834","terciario":"#1baf7a"}
ROT={"primario":"Primário (volátil)","secundario":"Secundário (online)","terciario":"Terciário (offline)"}

plt.rcParams.update({
 "font.family":"DejaVu Sans","font.size":9,
 "axes.edgecolor":GRID,"axes.labelcolor":INK2,"text.color":INK,
 "xtick.color":INK2,"ytick.color":INK2,"figure.facecolor":SURF,"axes.facecolor":SURF,
 "axes.spines.top":False,"axes.spines.right":False,"savefig.facecolor":SURF,
})

# ---------- Fig 1: latência x preço/KB ----------
fig,ax=plt.subplots(figsize=(7.0,4.4))
pts=[]
for n,t,p,c,ta,r,w in LINHAS:
    v=preco_por_KB(p,c)
    if v is None: continue
    pts.append((n,t,ta,v))
for tier in ["primario","secundario","terciario"]:
    xs=[a[2] for a in pts if a[1]==tier]; ys=[a[3] for a in pts if a[1]==tier]
    ax.scatter(xs,ys,s=70,color=C[tier],edgecolor=SURF,linewidth=1.6,zorder=3,label=ROT[tier])
off={"Cache SRAM (L3)":(9,4),"DRAM DDR5 desktop":(9,-13),"DRAM DDR5 RDIMM":(9,6),
     "SSD NVMe PCIe 5.0":(-30,15),"SSD NVMe datacenter QLC":(9,4),
     "SSD NVMe datacenter TLC":(-30,-15),"SSD SATA":(-58,-3),
     "Pen drive USB 3.2":(2,-14),"HDD HAMR 30 TB":(10,-3),"Optico M-DISC BD-XL":(-30,10),
     "Fita LTO-9":(-52,-4),"Fita LTO-10":(9,2)}
lbl={"Optico M-DISC BD-XL":"Óptico M-DISC","SSD NVMe PCIe 5.0":"SSD NVMe (PCIe 5.0)",
     "SSD NVMe datacenter QLC":"SSD NVMe DC (QLC)",
     "SSD NVMe datacenter TLC":"SSD NVMe DC (TLC)",
     "Cache SRAM (L3)":"Cache SRAM (L3)"}
for n,t,ta,v in pts:
    ax.annotate(lbl.get(n,n),(ta,v),textcoords="offset points",xytext=off.get(n,(8,4)),
                fontsize=7.5,color=INK)
ax.set_xscale("log"); ax.set_yscale("log")
ax.set_xlabel("Tempo de acesso (s) — escala logarítmica")
ax.set_ylabel("Preço por KB (US\\$) — escala logarítmica")
ax.grid(True,which="major",color=GRID,linewidth=0.7,zorder=0)
ax.set_axisbelow(True)
ax.set_xlim(2e-9,4e2); ax.set_ylim(2e-9,2e-2)
for lab,x in [("ns",1e-9),("µs",1e-6),("ms",1e-3),("s",1e0)]:
    pass
leg=ax.legend(frameon=False,fontsize=8,loc="upper right")
ax.set_title("Hierarquia de armazenamento: tempo de acesso × preço por KB (05/09/2026)",
             fontsize=10,color=INK,loc="left",pad=10)
fig.tight_layout(); fig.savefig(os.path.join(FIG, "fig1_hierarquia.pdf")); plt.close(fig)

# ---------- Fig 2: banda de leitura e escrita ----------
sel=[l for l in LINHAS if l[0] not in ("Memoria CXL 2.0","Tape library (LTO-10)","DRAM DDR5 RDIMM")]
sel=sorted(sel,key=lambda l:l[5])
nomes=[l[0].replace("Optico","Óptico").replace("Memoria","Memória") for l in sel]
leit=[l[5]/1e6 for l in sel]; escr=[l[6]/1e6 for l in sel]
import numpy as np
y=np.arange(len(sel)); h=0.34
fig,ax=plt.subplots(figsize=(7.0,4.6))
ax.barh(y+h/2,leit,height=h,color="#2a78d6",label="Leitura máx.",zorder=3)
ax.barh(y-h/2,escr,height=h,color="#eb6834",label="Escrita máx.",zorder=3)
ax.set_yticks(y); ax.set_yticklabels(nomes,fontsize=8)
ax.set_xscale("log"); ax.set_xlabel("MB/s — escala logarítmica")
ax.grid(True,axis="x",color=GRID,linewidth=0.7,zorder=0); ax.set_axisbelow(True)
ax.set_xlim(10,4e6)
def fmt(v):
    return f"{v/1000:,.0f} GB/s".replace(",",".") if v>=1000 else f"{v:,.0f} MB/s".replace(",",".")
for yy,v in zip(y+h/2,leit): ax.text(v*1.15,yy,fmt(v),va="center",fontsize=7,color=INK2)
for yy,v in zip(y-h/2,escr): ax.text(v*1.15,yy,fmt(v),va="center",fontsize=7,color=INK2)
ax.legend(frameon=False,fontsize=8,loc="lower right")
ax.set_title("Largura de banda máxima por tecnologia (05/09/2026)",fontsize=10,color=INK,loc="left",pad=10)
fig.tight_layout(); fig.savefig(os.path.join(FIG, "fig2_banda.pdf")); plt.close(fig)

# ---------- Fig 3: evolução das interfaces ----------
series={
 "SATA":[(2003,150),(2004,300),(2009,600),(2020,600)],
 "SAS":[(2004,300),(2009,600),(2013,1200),(2019,2400),(2026,2400)],
 "PCIe x4 (NVMe)":[(2003,1000),(2007,2000),(2010,3938),(2017,7877),(2019,15754),(2022,30250),(2025,60500)],
 "USB":[(2000,60),(2008,500),(2013,1212),(2017,2424),(2019,4850),(2022,9600)],
 "Fibre Channel":[(1997,100),(2001,200),(2004,400),(2005,800),(2011,1600),(2013,3200),(2021,6400),(2023,12425)],
}
cols={"PCIe x4 (NVMe)":"#2a78d6","SAS":"#eb6834","SATA":"#1baf7a","Fibre Channel":"#eda100","USB":"#4a3aa7"}
fig,ax=plt.subplots(figsize=(7.0,4.2))
for k,v in series.items():
    xs=[a[0] for a in v]; ys=[a[1] for a in v]
    ax.plot(xs,ys,color=cols[k],linewidth=2,marker="o",markersize=4,
            markeredgecolor=SURF,markeredgewidth=1.2,zorder=3,label=k)
    ax.annotate(k,(xs[-1],ys[-1]),textcoords="offset points",xytext=(7,-2),fontsize=7.5,color=cols[k])
ax.set_yscale("log"); ax.set_xlabel("Ano de publicação da especificação")
ax.set_ylabel("Taxa útil máxima (MB/s) — log")
ax.grid(True,color=GRID,linewidth=0.7,zorder=0); ax.set_axisbelow(True)
ax.set_xlim(1995,2032); ax.set_ylim(40,1.2e5)
ax.legend(frameon=False,fontsize=8,loc="lower right",ncol=1)
ax.set_title("Evolução da taxa útil das interfaces de armazenamento",fontsize=10,color=INK,loc="left",pad=10)
fig.tight_layout(); fig.savefig(os.path.join(FIG, "fig3_interfaces.pdf")); plt.close(fig)
print("ok")
