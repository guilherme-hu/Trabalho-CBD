# Pendências de identificação e entrega

Revisão atualizada em 05/09/2026. Os relatórios de Cloud/AWS e DAS/RAID foram reconstruídos em
LaTeX, os PDFs foram compilados e os slides foram regenerados. O conteúdo técnico e os nomes/DREs
seguem o trabalho-padrão de NAS/SAN/AST.

## Informação que ainda precisa de confirmação humana

1. Divisão real de trabalho: quem escreveu/revisou cada seção, qual decisão tomou e por quê.
2. Data e confirmação individual da revisão.

Esses dados não devem ser inferidos ou atribuídos apenas para preencher o Post-Mortem.

## Onde editar

### Cloud Computing e Cloud Storage

- `Cloud Computing & Cloud Storages/relatorio.tex`: tabela de autoria na seção Post-Mortem.
- Recompilar e regenerar conforme `Cloud Computing & Cloud Storages/COMPILAR.md`.

### DAS e RAID

- `DAS e RAID/relatorio.tex`: tabela de autoria na seção Post-Mortem.
- Recompilar e regenerar conforme `DAS e RAID/COMPILAR.md`.

## Arquivos canônicos para entrega

```text
Cloud Computing & Cloud Storages/Cloud_Computing_AWS_Trabalho.pdf
Cloud Computing & Cloud Storages/Cloud_Computing_AWS_Slides.pptx
DAS e RAID/DAS_RAID_Trabalho.pdf
DAS e RAID/DAS_RAID_Slides.pptx
```

Os DOCX preservados nas duas pastas são versões anteriores e não são mais a fonte canônica.

## Conferência final

```bash
python3 'Cloud Computing & Cloud Storages/verificar.py'
python3 'DAS e RAID/verificar.py'
```

Depois de preencher a identificação, conferir a mesma grafia no PDF e no PPTX, abrir os quatro
arquivos e revisar capa, tabelas, fórmulas, rodapé e ausência de texto cortado. Apenas um integrante
envia os produtos completos; os demais seguem a regra de folha de rosto descrita no enunciado.
