# Como recompilar o PDF

## Conteúdo desta pasta

- `relatorio.tex` — fonte LaTeX do documento (2.298 linhas, 46 páginas)
- `fig/fig1_hierarquia.pdf` — tempo de acesso × preço por KB
- `fig/fig2_banda.pdf` — largura de banda de leitura e escrita
- `fig/fig3_interfaces.pdf` — evolução da taxa útil das interfaces
- `dados.py` — tabela de dados e cálculo do preço por KB
- `graficos.py` — script matplotlib que gera as três figuras (roda de qualquer pasta)

## Compilar

```bash
pdflatex relatorio.tex
pdflatex relatorio.tex   # segunda passada: sumário e referências cruzadas
```

Rode **duas vezes**. A primeira passada escreve o `.aux` com os números de página do
sumário e as referências `\ref{tab:161}` / `\ref{tab:if}`; só a segunda as resolve.

## Pacotes necessários

`babel` com a opção `portuges`, `lmodern`, `geometry`, `booktabs`, `longtable`, `array`,
`tabularx`, `multirow`, `makecell`, `graphicx`, `xcolor`, `microtype`, `enumitem`,
`ragged2e`, `float`, `pdflscape`, `caption`, `fancyhdr`, `titlesec`, `hyperref`,
`amsmath`, `amssymb`.

Em Debian/Ubuntu:

```bash
sudo apt-get install texlive-latex-recommended texlive-latex-extra \
                     texlive-lang-portuguese lmodern
```

No Overleaf funciona sem instalar nada — basta enviar esta pasta inteira e definir
`relatorio.tex` como documento principal.

## Onde editar os nomes do grupo

- **Folha de rosto:** linhas com `{}[NOME COMPLETO DO INTEGRANTE n] & [DRE]`.
  O `{}` antes do colchete é necessário: sem ele o LaTeX interpreta o `[` como
  argumento opcional do `\\` da linha anterior e a compilação falha com
  *Missing number, treated as zero*. Se você substituir o texto inteiro por um nome
  real (que não começa com colchete), pode remover o `{}`.
- **Seção 9.3 (autoria, no Post-Mortem):** linhas com `{}[INTEGRANTE n]`, mesma regra.
- Há também `[INT. n]` no slide 22 do `.pptx`, editável direto no PowerPoint.

## Regenerar as figuras

```bash
python3 graficos.py     # lê dados.py e reescreve fig/*.pdf
python3 dados.py        # imprime a tabela de preço por KB para conferência
```

Ambos resolvem os caminhos a partir da própria localização do script, então funcionam de
qualquer diretório de trabalho — basta manter `graficos.py`, `dados.py` e a pasta `fig/`
juntos.

## Comandos próprios definidos no preâmbulo

- `\destaque{título}{texto}` — caixa cinza de destaque, título em azul
- `\correcao{título}{texto}` — mesma caixa, título em laranja; usada para as correções
  factuais (NL-SAS, Optane, convenção full-duplex da FCIA) e o aviso metodológico
  sobre os preços

## Tabelas em paisagem

As duas tabelas grandes usam `\newgeometry{landscape,...}` + `\begin{landscape}` +
`\restoregeometry`. Os dois comandos são necessários e fazem coisas diferentes: o
`\newgeometry` é o que dá largura útil de ~26 cm ao texto; o `\begin{landscape}` do
`pdflscape` é o que gira a página no PDF final. Usar só um deles produz uma tabela
estourada ou uma página não girada.

As colunas usam `>{\RaggedRight\arraybackslash}p{...}`. O `\arraybackslash` é
obrigatório: sem ele o `\RaggedRight` sequestra o `\\` e as linhas da tabela quebram.
