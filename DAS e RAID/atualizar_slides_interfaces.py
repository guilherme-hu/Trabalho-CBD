#!/usr/bin/env python3
"""Atualiza exclusivamente a capa e os dois slides de interfaces do DAS/RAID."""
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches, Pt


BASE = Path(__file__).resolve().parent
PPTX = BASE / "DAS_RAID_Slides.pptx"
INK = RGBColor(20, 24, 31)
MUTED = RGBColor(82, 91, 102)
BLUE = RGBColor(42, 120, 214)
ORANGE = RGBColor(235, 104, 52)
SOFT = RGBColor(244, 245, 247)
LINE = RGBColor(223, 227, 232)
WHITE = RGBColor(255, 255, 255)

NAMES = [
    "Bernardo Brandão Pozzato Carvalho Costa — 123289593",
    "Enzo de Carvalho Sampaio — 123386206",
    "Gabriel Schmitz Corrêa Rizawinsk — 123225573",
    "Guilherme En Shih Hu — 123224674",
    "Raphael Henrique da Silva Pereira — 123420783",
    "Vivian Maria da Silva e Souza — 123205793",
]


def clear_slide(slide):
    for shape in list(slide.shapes):
        shape._element.getparent().remove(shape._element)


def text(slide, value, x, y, w, h, size=16, color=INK, bold=False,
         font="Calibri", align=PP_ALIGN.LEFT):
    shape = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = shape.text_frame
    frame.clear()
    frame.word_wrap = True
    frame.vertical_anchor = MSO_ANCHOR.TOP
    frame.margin_left = frame.margin_right = Inches(0.04)
    p = frame.paragraphs[0]
    p.text = value
    p.alignment = align
    p.font.name = font
    p.font.size = Pt(size)
    p.font.bold = bold
    p.font.color.rgb = color
    return shape


def rect(slide, x, y, w, h, fill=SOFT, line=BLUE, radius=True):
    shape_type = MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE
    shape = slide.shapes.add_shape(shape_type, Inches(x), Inches(y), Inches(w), Inches(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.color.rgb = line
    shape.line.width = Pt(1)
    return shape


def heading(slide, title, subtitle, page):
    text(slide, title, 0.72, 0.38, 11.9, 0.52, 26, INK, True, "Cambria")
    text(slide, subtitle, 0.72, 0.99, 11.9, 0.32, 12.5, MUTED)
    rule = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.72), Inches(6.86), Inches(11.9), Pt(0.7))
    rule.fill.solid(); rule.fill.fore_color.rgb = LINE; rule.line.fill.background()
    text(slide, "Armazenamento DAS e RAID para SBD — UFRJ", 0.72, 6.95, 8.5, 0.23, 9, MUTED)
    text(slide, str(page), 12.0, 6.95, 0.6, 0.23, 9, MUTED, align=PP_ALIGN.RIGHT)


def timeline(slide, events, x, y, w):
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y + .25), Inches(w), Pt(1))
    line.fill.solid(); line.fill.fore_color.rgb = BLUE; line.line.fill.background()
    step = w / (len(events) - 1)
    for i, (year, label) in enumerate(events):
        px = x + i * step
        dot = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(px - .065), Inches(y + .17), Inches(.13), Inches(.13))
        dot.fill.solid(); dot.fill.fore_color.rgb = ORANGE; dot.line.fill.background()
        text(slide, year, px - .32, y - .08, .64, .18, 8.5, MUTED, True, align=PP_ALIGN.CENTER)
        text(slide, label, px - .58, y + .4, 1.16, .4, 8.5, INK, align=PP_ALIGN.CENTER)


def card(slide, x, y, w, h, title, body, accent=BLUE):
    rect(slide, x, y, w, h, SOFT, accent)
    text(slide, title, x + .15, y + .1, w - .3, .27, 13, accent, True)
    text(slide, body, x + .15, y + .44, w - .3, h - .54, 10.5, INK)


def update_cover(slide):
    clear_slide(slide)
    slide.background.fill.solid(); slide.background.fill.fore_color.rgb = INK
    text(slide, "BANCO DE DADOS — UFRJ", .72, .65, 11.8, .3, 11, ORANGE, True)
    text(slide, "Armazenamento Físico para SBD:\nDAS e Arquiteturas RAID", .72, 1.18, 9.3, 1.0, 31, WHITE, True, "Cambria")
    text(slide, "Interfaces DAS e níveis de RAID padrão e não padrão", .72, 2.33, 10.2, .35, 15, RGBColor(214, 220, 229))
    rect(slide, .72, 3.1, 8.95, 2.65, RGBColor(35, 42, 53), RGBColor(35, 42, 53), False)
    text(slide, "Grupo 3 — integrantes", .95, 3.3, 8.4, .25, 13, ORANGE, True)
    for i, name in enumerate(NAMES):
        text(slide, name, .98, 3.66 + i * .31, 8.25, .25, 11, WHITE)
    text(slide, "Setembro de 2026", 10.0, 5.15, 2.5, .3, 13, WHITE, True, align=PP_ALIGN.RIGHT)


def update_sata_sas(slide):
    clear_slide(slide)
    heading(slide, "Interfaces DAS — SATA, eSATA e SAS", "Versões, capacidades e limites que importam ao SBD", 4)
    card(slide, .72, 1.48, 3.73, 2.0, "SATA", "Ponto a ponto; NCQ até 32 comandos.\n\nNome recomendado: SATA 1,5/3/6 Gb/s — evitar “SATA I/II/III”.\n\n6 Gb/s ≠ vazão garantida.")
    timeline(slide, [("2003", "1,5 Gb/s"), ("2004", "3 Gb/s"), ("2008", "Rev. 3.0\n6 Gb/s")], .98, 2.56, 3.12)
    card(slide, 4.8, 1.48, 3.73, 2.0, "eSATA", "Variante externa: mesmo protocolo SATA; conector/cabo próprios.\n\n2004: eSATA. Até 6 Gb/s somente quando host e dispositivo suportam a revisão SATA correspondente.\n\nO eSATA convencional não fornece energia.", ORANGE)
    card(slide, 8.88, 1.48, 3.73, 2.0, "SAS", "Classe empresarial: dual-port, expansores e multipath. SAS HBA pode conectar SATA; atrás de expansor, usa STP.\n\nFila e número de dispositivos dependem da implementação.")
    timeline(slide, [("2004", "SAS-1\n3 Gb/s"), ("2009", "SAS-2\n6 Gb/s"), ("2013", "SAS-3\n12 Gb/s"), ("2019", "SAS-4 / 24G\n22,5 Gbaud")], 9.08, 2.56, 3.32)
    rect(slide, .72, 4.08, 11.9, 1.55, RGBColor(255, 248, 244), ORANGE)
    text(slide, "Leitura de projeto", .94, 4.27, 2.0, .25, 13, ORANGE, True)
    text(slide, "SAS é apropriado para arrays corporativos e redundância de caminho; classificação 24/7 é do disco, não uma certificação do protocolo. SATA atende bem capacidade e custo.", .94, 4.66, 11.35, .55, 12.5, INK)
    text(slide, "Fontes: SATA-IO, SATA Naming Guidelines e eSATA; T10, SAS-4 (INCITS 534-2019).", .72, 6.23, 11.9, .22, 9, MUTED, align=PP_ALIGN.CENTER)


def update_usb_hba(slide):
    clear_slide(slide)
    heading(slide, "Interfaces DAS — FireWire, USB e HBA", "Cronologia USB e papel da controladora", 5)
    card(slide, .72, 1.45, 3.33, 2.35, "FireWire (IEEE 1394)", "1995: FireWire 400\n2002: FireWire 800\n\nBarramento peer-to-peer e encadeável; hoje é legado. Pode aparecer em armazenamento e captura antigos.", ORANGE)
    card(slide, 4.38, 1.45, 5.0, 2.35, "USB 3 e USB4", "USB é host-cêntrico: apropriado a DAS de um host, backup e transporte.\n\nUSB4: túnel de protocolos; PCIe somente quando suportado. USB4 v2: 80 Gb/s agregados; 120/40 Gb/s é modo opcional assimétrico.")
    timeline(slide, [("2008", "USB 3.0\n5 Gb/s"), ("2013", "USB 3.1\n10 Gb/s"), ("2017", "USB 3.2\n20 Gb/s"), ("2019", "USB4\n40 Gb/s"), ("2022", "USB4 v2\n80 agregado")], 4.63, 3.08, 4.5)
    card(slide, 9.68, 1.45, 2.94, 2.35, "HBA", "Adaptador/controladora, não protocolo nem cabo.\n\nPode ser PCIe ou integrado.\n\nPassthrough expõe discos; JBOD descreve apresentação, não é sinônimo de HBA.", BLUE)
    rect(slide, .72, 4.25, 11.9, 1.28, RGBColor(244, 248, 253), BLUE)
    text(slide, "Regra prática", .94, 4.43, 1.7, .25, 13, BLUE, True)
    text(slide, "A modalidade real depende de host + cabo + gabinete. Taxa nominal não equivale a desempenho sustentado, latência ou segurança de flush.", .94, 4.8, 11.35, .35, 12.5, INK)
    text(slide, "Fonte: USB-IF, USB4 Version 2.0 Announcement (2022).", .72, 6.23, 11.9, .22, 9, MUTED, align=PP_ALIGN.CENTER)


def main():
    prs = Presentation(PPTX)
    if len(prs.slides) < 5:
        raise RuntimeError("Apresentação não possui os slides esperados.")
    update_cover(prs.slides[0])
    update_sata_sas(prs.slides[3])
    update_usb_hba(prs.slides[4])
    prs.save(PPTX)


if __name__ == "__main__":
    main()
