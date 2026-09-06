# Compilar e validar

O fonte canônico do relatório é `relatorio.tex`. O DOCX foi preservado apenas como versão anterior.

```bash
cd 'Cloud Computing & Cloud Storages'
pdflatex -interaction=nonstopmode -halt-on-error relatorio.tex
pdflatex -interaction=nonstopmode -halt-on-error relatorio.tex
cp relatorio.pdf Cloud_Computing_AWS_Trabalho.pdf
python3 verificar.py
```

Os slides são gerados a partir da raiz pelo script `gerar_slides_finais.py`, com `python-pptx`:

```bash
PYTHONPATH=/caminho/que/contem/python-pptx python3 gerar_slides_finais.py
```

O grupo está identificado como Grupo 3. Antes da entrega, registrar as contribuições humanas reais
na seção Post-Mortem e regenerar os artefatos caso o texto seja alterado.
