# Pendências de identificação e entrega

## Responsável por esta etapa

Esta etapa deve ser executada pelo membro responsável pela identificação dos grupos, registro das contribuições reais e preparação dos arquivos finais para entrega.

As correções técnicas já foram aplicadas. Não é necessário refazer a auditoria. O trabalho restante exige informações humanas que não devem ser inventadas: número do grupo, nomes completos, DREs, contribuições efetivamente realizadas, confirmação de revisão, data e, quando aplicável, assinatura.

O trabalho de **NAS, SAN e AST** já possui seis nomes e DREs. Apenas confirme a grafia e o consentimento dos integrantes. As instruções abaixo são para **Storage e Interfaces**, **DAS e RAID** e **Cloud Computing & Cloud Storages**, que ainda possuem cinco integrantes fictícios cada.

## Dados que precisam ser coletados

Para cada um dos três trabalhos pendentes, obtenha:

1. número correto do grupo;
2. nome completo dos cinco integrantes;
3. DRE de cada integrante;
4. seções ou tarefas realmente executadas por cada pessoa;
5. decisões técnicas que cada pessoa revisou ou consegue justificar;
6. confirmação individual de revisão do conteúdo gerado com IA;
7. data da revisão e assinatura, quando o documento solicitar.

Não atribua contribuição apenas para preencher a tabela. Se a divisão sugerida no documento não corresponder ao trabalho real, substitua-a pela divisão verdadeira.

## 1. Storage e Interfaces

### Relatório

Edite `Storage e Interfaces/relatorio.tex`.

- Na folha de rosto, substitua os cinco marcadores `[NOME COMPLETO DO INTEGRANTE n]` e os respectivos `[DRE]`.
- Na seção de autoria do Post-Mortem, substitua `[INTEGRANTE 1]` até `[INTEGRANTE 5]` pelas pessoas que realmente executaram ou revisaram cada atividade.
- Revise também as ocorrências de `[INTEGRANTE n]` na tabela de erros. Elas devem identificar quem realmente encontrou ou confirmou cada problema.
- Não remova as chaves `{}` que aparecem antes de alguns nomes no TeX; elas evitam que nomes iniciados por números ou caracteres especiais sejam interpretados como comandos.

Para localizar tudo:

```sh
rg -n '\[NOME COMPLETO|\[INTEGRANTE|\[DRE\]' 'Storage e Interfaces/relatorio.tex'
```

### Slides

Edite `Storage e Interfaces/slides.js` e substitua as cinco linhas da lista de integrantes, atualmente no formato:

```text
[NOME COMPLETO DO INTEGRANTE n] — DRE [00000000]
```

Depois, gere novamente o PPTX:

```sh
npm install --prefix /tmp/trabalho-cbd-node-deps pptxgenjs
cd 'Storage e Interfaces'
NODE_PATH=/tmp/trabalho-cbd-node-deps/node_modules node slides.js
```

### Regeneração do relatório e PDF de impressão

Recompile o relatório depois de preencher os nomes:

```sh
cd 'Storage e Interfaces'
tectonic -X compile relatorio.tex --outdir /tmp/storage-final
cp /tmp/storage-final/relatorio.pdf Estudo_Armazenamento_Fisico_SBD.pdf
python3 verificar.py
```

O PDF de impressão antigo foi removido porque não correspondia aos slides corrigidos. Após gerar o PPTX final:

1. abra `Slides_Armazenamento_SBD.pptx` no Keynote ou PowerPoint;
2. use **Arquivo → Exportar para → PDF**;
3. selecione boa ou máxima qualidade de imagem;
4. salve exatamente como `Slides_Armazenamento_SBD_impressao.pdf` na pasta `Storage e Interfaces`;
5. confira capa, nomes, gráficos, tabelas, rodapés e ausência de texto cortado.

## 2. DAS e RAID

### Relatório

Abra `DAS e RAID/DAS_RAID_Trabalho.docx` no Word, Pages ou LibreOffice.

- Substitua `[GRUPO — substituir pelo número correto]` na capa.
- Preencha os cinco nomes e DREs na primeira tabela.
- Na tabela **Integrante / Seções sob sua responsabilidade / Decisão a justificar**, substitua `[Nome n] — DRE [...]` e ajuste as responsabilidades para refletir o trabalho real.
- Na tabela de declaração individual, substitua `[Nome n]`, marque a revisão somente depois que ela ocorrer e preencha a data.
- Não altere a tabela de riscos e correções técnicas, salvo se o grupo efetivamente fizer nova verificação documentada.

### Slides

Abra `DAS e RAID/DAS_RAID_Slides.pptx` e atualize:

- slide 1: grupo, nomes e DREs;
- slide 22: número correto do grupo.

### Exportação e validação

Exporte o DOCX como `DAS_RAID_Trabalho.pdf` na mesma pasta. Depois execute:

```sh
python3 'DAS e RAID/verificar.py'
```

Abra o PDF e verifique a capa, as duas matrizes largas, símbolos, fórmulas, links e quebras de página.

## 3. Cloud Computing & Cloud Storages

### Relatório

Abra `Cloud Computing & Cloud Storages/Cloud_Computing_AWS_Trabalho.docx`.

- Troque `[GRUPO 3 / GRUPO 7 — substituir pelo número correto]` pelo grupo correto.
- Preencha os cinco nomes e DREs na primeira tabela.
- Na tabela de autoria, substitua `[Nome n] — DRE [...]` e registre as contribuições reais.
- Na declaração individual, substitua `[Nome n]`, marque a revisão somente após conferência, preencha a data e recolha a assinatura se exigida.
- Confirme com o membro responsável pelo custo que a consulta de preços continua válida na data da entrega. Se os preços mudarem, atualize relatório, gráfico, slides e verificador em conjunto.

### Slides

Abra `Cloud Computing & Cloud Storages/Cloud_Computing_AWS_Slides.pptx` e atualize:

- slide 1: grupo, nomes e DREs;
- slide 19: número correto do grupo.

O arquivo final já está com o nome canônico, sem o sufixo `(1)`. Não recrie a versão antiga.

### Exportação e validação

Exporte o DOCX como `Cloud_Computing_AWS_Trabalho.pdf` na mesma pasta. Depois execute:

```sh
python3 'Cloud Computing & Cloud Storages/verificar.py'
```

Abra o PDF e confira capa, tabela de responsabilidade compartilhada, tabelas de custo, seção de cenários, declarações individuais e referências.

## Conferência final dos quatro trabalhos

1. Confirme que os nomes e DREs têm exatamente a mesma grafia no relatório, PDF e PPTX.
2. Confirme que nenhuma contribuição foi atribuída sem validação da pessoa indicada.
3. Verifique se não restaram marcadores editoriais:

```sh
rg -n '\[NOME COMPLETO|\[INTEGRANTE|\[DRE\]|substituir pelo número|Grupo 3 / Grupo 7' \
  'Storage e Interfaces/relatorio.tex' \
  'Storage e Interfaces/slides.js'
```

Nos DOCX e PPTX, faça também uma busca pelo próprio Word/PowerPoint por `substituir`, `[Nome`, `[DRE]` e `[Grupo`.

4. Execute todos os validadores a partir da raiz do projeto:

```sh
python3 'Storage e Interfaces/verificar.py'
python3 'DAS e RAID/verificar.py'
python3 'NAS, SAN e AST/verificar.py'
python3 'Cloud Computing & Cloud Storages/verificar.py'
```

5. Abra os quatro PDFs e quatro PPTX, fazendo uma inspeção visual final.
6. Confirme a existência de `Storage e Interfaces/Slides_Armazenamento_SBD_impressao.pdf`.
7. Antes de enviar, confira se não há arquivos antigos com `(1)`, `cópia`, `final-final` ou nomes semelhantes.

## Arquivos finais esperados

```text
Storage e Interfaces/Estudo_Armazenamento_Fisico_SBD.pdf
Storage e Interfaces/Slides_Armazenamento_SBD.pptx
Storage e Interfaces/Slides_Armazenamento_SBD_impressao.pdf
DAS e RAID/DAS_RAID_Trabalho.pdf
DAS e RAID/DAS_RAID_Slides.pptx
NAS, SAN e AST/Estudo_NAS_SAN_Armazenamento_Fisico_SBD.pdf
NAS, SAN e AST/Slides_NAS_SAN_Armazenamento_SBD.pptx
Cloud Computing & Cloud Storages/Cloud_Computing_AWS_Trabalho.pdf
Cloud Computing & Cloud Storages/Cloud_Computing_AWS_Slides.pptx
```
