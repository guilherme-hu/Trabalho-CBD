# Regenerar a entrega

As fontes são `relatorio.tex`, `slides.js` e `dados.py`. Os números e gráficos devem ser atualizados juntos.

1. Execute `python graficos.py` (requer matplotlib).
2. Atualize a imagem usada nos slides: `pdftoppm -png -r 180 -singlefile fig/fig1_hierarquia.pdf fig/f1hi-1`.
3. Execute `node slides.js` nesta pasta (requer pptxgenjs).
4. Compile `relatorio.tex` com Tectonic ou execute `pdflatex relatorio.tex` duas vezes. Copie o PDF resultante para `Estudo_Armazenamento_Fisico_SBD.pdf`.
5. Execute `python verificar.py` e revise visualmente os dois arquivos finais.

O verificador confere valores selecionados, unidades e presença de conteúdo; não comprova preços de mercado nem substitui revisão técnica.
Nomes e DREs estão na capa e na seção de autoria. Raphael: DRE 123420783.

Pacotes LaTeX: babel (portuges), lmodern, amsmath/amssymb, geometry, booktabs,
longtable, array, tabularx, multirow, makecell, graphicx, xcolor, microtype,
enumitem, ragged2e, float, pdflscape, caption, fancyhdr, titlesec, xurl e hyperref.
