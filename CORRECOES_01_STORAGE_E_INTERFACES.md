# Auditoria e plano de correções

## Resumo executivo

O trabalho tem boa profundidade técnica, fonte editável reproduzível (`relatorio.tex` e `slides.js`), relatório compilado e slides em PPTX/PDF. A cobertura de hierarquia de memória, dispositivos, interfaces e efeitos no SGBD é ampla. A entrega, porém, ainda não está pronta: nomes e DREs são placeholders; a base usada pelos gráficos diverge da tabela do relatório; há erros verificáveis em capacidade/preço e na aritmética da biblioteca de fitas; e várias linhas de preço não têm fonte, data e premissa rastreáveis.

Bloqueadores para entrega: substituir a identificação, unificar os dados, corrigir os números P0, regenerar figuras/PDF/PPTX e fazer uma conferência final entre os três formatos. Alterações estilísticas ou expansão bibliográfica sem efeito nos números são secundárias.

## Artefatos analisados

| Artefato | Papel e estado |
|---|---|
| `Storage e Interfaces/relatorio.tex` | Fonte canônica provável do relatório; completa e editável. |
| `Storage e Interfaces/Estudo_Armazenamento_Fisico_SBD.pdf` | PDF compilado existente; contém os placeholders da fonte. |
| `Storage e Interfaces/slides.js` | Fonte canônica provável dos slides. |
| `Storage e Interfaces/Slides_Armazenamento_SBD.pptx` | Apresentação com 30 slides; capa ainda não identificada. |
| `Storage e Interfaces/Slides_Armazenamento_SBD_impressao.pdf` | Exportação para impressão existente. |
| `Storage e Interfaces/dados.py` | Base de dados usada por `graficos.py`; está divergente do relatório. |
| `Storage e Interfaces/graficos.py` | Gerador das figuras quantitativas. |
| `Storage e Interfaces/fig1_hierarquia.pdf`, `fig2_banda.pdf`, `fig3_interfaces.pdf` | Figuras derivadas; devem ser regeneradas após a correção da base. |
| `Storage e Interfaces/COMPILAR.md` | Instruções de geração. |

Não foram encontrados duplicados concorrentes do relatório. A fonte canônica deve ser formalizada como `dados.py` para valores, `relatorio.tex` para narrativa e `slides.js` para apresentação; PDF e PPTX devem ser tratados como derivados. A data dos arquivos no repositório não comprova atualidade bibliográfica.

## Matriz requisito x evidência x status

| Requisito | Onde foi verificado | Status | Problema encontrado | Correção objetiva | Prioridade |
|---|---|---|---|---|---|
| Identificação do grupo | `relatorio.tex`, capa do PDF, `slides.js`, slide 1 | AUSENTE | Há cinco nomes/DREs fictícios. | Substituir todos os campos; conferir grafia e DRE nos três derivados. | P0 |
| Relatório final em PDF | `Estudo_Armazenamento_Fisico_SBD.pdf` | PARCIAL | Existe, mas incorpora dados e identificação ainda incorretos. | Recompilar somente depois das correções e validar visualmente todas as tabelas. | P0 |
| Hierarquia, volatilidade e tecnologias | Relatório, seções iniciais; slides 3–8 | OK | Cobertura ampla. | Apenas preservar as fontes junto às afirmações quantitativas. | P3 |
| Tabela atualizada de dispositivos | Relatório, Tabela 16.1; slides 9–10 | INCORRETO | Existem divergências de modelo, capacidade, preço/KB e base de cálculo. | Refazer a tabela a partir de uma única estrutura de dados validada. | P0 |
| Fonte de especificação, preço e data por item | Tabela 16.1 e referências | PARCIAL | Várias referências são genéricas; preço observado não é ligado a URL/data/condição. | Criar coluna/nota por linha com modelo, capacidade precificada, moeda, região, condição, URL e data. | P0 |
| Comparabilidade de preço por KB | Tabela 16.1 e `dados.py` | INCORRETO | Mistura KB/KiB, capacidade em faixa e preço de uma capacidade não indicada; mídia às vezes exclui o drive. | Adotar bytes decimais ou binários de modo único e explicitar o denominador e itens incluídos. | P0 |
| Cálculo da biblioteca LTO-10 | Tabela 16.1 e slide 10 | INCORRETO | 23.170×40 TB = 926,8 PB nativos, mas a capacidade comprimida correta a 2,5:1 é 2,317 EB, não 1,41 EB. | Corrigir relatório e slide; explicar que compressão depende dos dados. | P0 |
| Interfaces de conexão | Relatório, tabela de 56 variantes; slides 11–19 | PARCIAL | Muito completa, mas não sistematiza duplex, portabilidade, escalabilidade e confiabilidade; alguns números são estimativas. | Acrescentar os critérios faltantes e marcar medido, nominal ou estimado com condições. | P1 |
| Classificação interface/protocolo/formato | Tabela de interfaces | PARCIAL | Conceitos distintos aparecem na mesma lista sem uma coluna de classe. | Adicionar `classe` e evitar comparar camada física, transporte e protocolo como equivalentes. | P1 |
| Impacto no gerente de armazenamento/SGBD | Relatório, seção do gerente; slides 20–23 | OK | Discute blocos, buffer pool, fila, `fsync`, custo do otimizador e AST. | Manter; transformar limites de desempenho em exemplos condicionais. | P2 |
| Consistência entre dados, figuras e texto | `dados.py`, `graficos.py`, Tabela 16.1, slides 9–10 | INCORRETO | `dados.py` ainda contém CXL 140 ns, NVMe de 2 TB/US$399,99, óptico 27/27 MB/s e omite o Micron TLC. | Corrigir `dados.py`, gerar novamente as três figuras e comparar automaticamente com relatório/slides. | P0 |
| Atualidade temporal | Título, texto e referências | NÃO VERIFICÁVEL | O texto apresenta “setembro de 2026” e dados trimestrais sem registrar o dia de coleta; o trimestre pode estar incompleto. | Fixar “dados consultados em 05/09/2026” e evitar tratar 3T2026 como trimestre encerrado. | P1 |
| Limites de latência e `fsync` | Seção de latência; slides 18–20 | PARCIAL | Mistura valores típicos e P99,99; `1/fsync` é apresentado perto de um teto prático apesar de group commit, cache e fila. | Separar percentil/cenário e rotular a conta como ilustração isolada, não throughput do banco. | P1 |
| Conclusões de mercado | Relatório e slides 13–15, 24–25 | PARCIAL | “FCoE morreu”, obsolescência do iSCSI e predominâncias de mercado são categóricas. | Substituir por formulações datadas e condicionais, acompanhadas de fonte de adoção. | P1 |
| Referências técnicas | Bibliografia e notas | PARCIAL | Há boas fontes primárias, mas preços e várias tendências usam páginas amplas/indiretas. | Ligar cada dado mutável à página exata e acrescentar data de acesso. | P1 |
| Slides como síntese apresentável | PPTX, 30 slides | PARCIAL | Tabelas e slides 9, 10, 15, 19, 24 e 27–30 são densos; cinco slides já são backup. | Reduzir o núcleo oral e mover detalhes para backup, sem retirar conteúdo do relatório. | P1 |

## Erros técnicos e conceituais

1. **Samsung 870 EVO:** o relatório informa faixa até 8 TB. A ficha oficial lista 250 GB, 500 GB, 1 TB, 2 TB e 4 TB. Corrigir Tabela 16.1, texto e slide 9 para máximo de 4 TB.
2. **Samsung 9100 PRO:** a linha mistura o rótulo de 1 TB e US$249 com `2,0×10⁻⁷ US$/KB`, valor que corresponde aproximadamente a 2 TB/US$399,99. Com os valores impressos, `249/1.000.000.000 = 2,49×10⁻⁷ US$/KB`. A fonte oficial de lançamento informa MSRP de US$219,99 para 1 TB; se esse preço for adotado, o resultado é `2,20×10⁻⁷ US$/KB`.
3. **LTO-10/TS4500:** 23.170 cartuchos de 40 TB resultam em 926,8 PB nativos. Com razão 2,5:1, o valor comprimido é 2,317 EB. O texto atual de 1,41 EB está matematicamente errado.
4. **Ryzen 9 9950X3D2:** a página oficial registra boost de até 5,6 GHz, não 5,7 GHz. A derivação de latência deve ser refeita e claramente chamada de estimativa. Com os mesmos 46,5 ciclos + 4 ciclos usados no trabalho, a conta seria aproximadamente `46,5/5,6 + 4/5,6 = 9,02 ns`.
5. **PCIe hot-plug:** não é uma propriedade garantida de toda implementação PCIe; depende de plataforma, firmware, slot/backplane e formato. Corrigir a célula e a nota correspondente.
6. **USB4 v2:** 80/120 Gb/s não deve aparecer como desempenho garantido de armazenamento. O modo de 120 Gb/s é opcional e assimétrico, e depende de host, cabo e dispositivo compatíveis; separar largura de banda do enlace de vazão efetiva.
7. **Comparações de latência:** valores locais típicos e percentis de cauda de redes NVMe não são diretamente comparáveis. Acrescentar coluna de percentil e condições de medição.
8. **Afirmações de obsolescência:** trocar “morreu/obsoleto” por “nicho, legado ou menos frequente em novas implantações”, salvo se houver série de adoção atual que sustente a afirmação.

## Lacunas de conteúdo

- A tabela de interfaces precisa explicitar classe, duplex, distância, hot-plug, número de dispositivos, escalabilidade, confiabilidade e estado atual de forma homogênea.
- Falta indicar, em cada dispositivo, qual capacidade exata originou o preço/KB. Faixas de capacidade não substituem a base da conta.
- CXL e biblioteca de fitas aparecem com preço `n/d`, contrariando o objetivo de comparação econômica. Se não houver cotação pública, movê-los para uma tabela técnica complementar ou obter cotação datada.
- O tratamento econômico de fita e mídia óptica deve diferenciar preço apenas da mídia de custo do drive/biblioteca e, opcionalmente, mostrar cenário amortizado.
- Tendências de mercado precisam de recorte geográfico, segmento, período e fonte; não basta inferi-las de desempenho máximo.
- Recomenda-se uma pequena seção “metodologia de coleta” com unidade, taxa de câmbio se houver, região, impostos/frete, preço novo/promocional/marketplace e data.

## Dados, tabelas e números a revisar

| Item | Valor apresentado | Valor/ação correta | Evidência |
|---|---|---|---|
| 870 EVO | Até 8 TB | Até 4 TB na linha oficial 870 EVO | Ficha Samsung abaixo |
| 9100 PRO 1 TB | US$249 e `2,0×10⁻⁷` US$/KB | `2,49×10⁻⁷` com US$249; ou MSRP oficial US$219,99 e `2,20×10⁻⁷` | Anúncio/ficha Samsung abaixo |
| TS4500/LTO-10 | 927 PB nativos; 1,41 EB comprimidos | 926,8 PB nativos; 2,317 EB a 2,5:1 | IBM e LTO abaixo |
| 9950X3D2 | Boost 5,7 GHz; latência 8,9 ns | Boost oficial até 5,6 GHz; aproximadamente 9,02 ns sob a própria hipótese do relatório | AMD abaixo |
| CXL em `dados.py` | 140 ns | Sincronizar com o intervalo adotado no relatório, preservando fonte/cenário | Fonte já usada no relatório |
| Unidade de preço | “US$/KB” com bases misturadas | Definir 1 KB = 1.000 bytes ou usar KiB; recalcular todas as linhas | Metodologia do próprio trabalho |
| Óptico em `dados.py` | 27/27 MB/s | Sincronizar com a linha final escolhida e marcar proxy/ausência de dado | Fonte exata do modelo |
| Micron 9550 | Ausente na base dos gráficos | Incluir ou remover conscientemente da tabela; figuras e relatório devem ter o mesmo universo | `dados.py` x Tabela 16.1 |

Recalcular por script e incluir asserções para cada preço/capacidade. Não editar manualmente os números nos três artefatos.

## Referências e fontes

Fontes primárias mínimas a ligar às células correspondentes, todas consultadas em 05/09/2026:

- [Samsung 870 EVO — ficha técnica oficial](https://download.semiconductor.samsung.com/resources/data-sheet/Samsung_SSD_870_EVO_Data_Sheet_Rev1.1_230509_10129500053000.pdf).
- [Samsung 9100 PRO — anúncio e preços oficiais](https://news.samsung.com/us/samsung-announces-9100-pro-series-ssds-with-breakthrough-pcie-5-0-performance/) e [ficha técnica](https://download.semiconductor.samsung.com/resources/data-sheet/Samsung_NVMe_SSD_9100_PRO_Datasheet_Rev.1.0_10149294091048.pdf).
- [LTO Ultrium 10 — capacidades e desempenho](https://www.lto.org/lto-10/).
- [IBM TS4500 — capacidade da biblioteca](https://www.ibm.com/docs/en/ts4500-tape-library/1.12.2?topic=overview-introduction-ts4500-tape-library).
- [AMD Ryzen 9 9950X3D2 — especificações oficiais](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-9-9950x3d2-dual-edition.html).

Para preços de varejo, a fonte deve ser a página exata do produto, não a home da loja. Registrar o preço observado, capacidade, condição, país/moeda e data; preservar uma captura ou referência bibliográfica estável. Fontes secundárias podem contextualizar mercado, mas não substituir fichas técnicas.

## Correções necessárias no PDF/relatório

1. Em `relatorio.tex`, capa e pós-mortem, substituir os cinco placeholders de integrante/DRE. **Obrigatório, P0.**
2. Corrigir as quatro inconsistências numéricas descritas acima na Tabela 16.1, notas e texto. **Obrigatório, P0.**
3. Transformar `dados.py` na fonte única dos valores quantitativos ou gerar esse arquivo de uma tabela canônica; eliminar números repetidos manualmente no TeX. **Obrigatório, P0.**
4. Acrescentar à Tabela 16.1 preço-capacidade de referência, fonte de preço, data, moeda, unidade decimal/binária e escopo do custo. **Obrigatório, P0.**
5. Completar a matriz de interfaces e qualificar estimativas, percentis e dependências de plataforma. **Obrigatório, P1.**
6. Revisar conclusões categóricas sobre FCoE, iSCSI, USB4 e predominância de SAS/HDD. **Obrigatório, P1.**
7. Regerar figuras com `graficos.py`, recompilar o PDF e inspecionar capa, tabelas largas, legendas, referências e quebras. **Obrigatório, P0.**
8. Acrescentar uma nota curta de limitações dos dados de mercado e do trimestre em curso. **Recomendado, P2.**

## Correções necessárias nos slides

1. No slide 1, substituir os placeholders. **Obrigatório, P0.**
2. Nos slides 9–10, corrigir 870 EVO, 9100 PRO, LTO-10/TS4500 e as bases de preço/KB; sincronizar com a fonte canônica. **Obrigatório, P0.**
3. Nos slides de interfaces e latência, separar taxa nominal de vazão útil e indicar percentil/cenário. **Obrigatório, P1.**
4. Reduzir o texto/tamanho das tabelas nos slides 9, 10, 15, 19 e 24; mostrar apenas comparações que sustentam a fala e enviar a tabela integral ao backup. **Obrigatório para legibilidade, P1.**
5. Manter os slides 26–30 como backup e limitar o percurso principal ao tempo disponível. **Recomendado, P2.**
6. Exportar novamente PPTX e PDF de impressão; comparar números automaticamente ou por checklist com o relatório. **Obrigatório, P0.**

## Melhorias de apresentação e redação

- Preferir “taxa nominal”, “vazão observada” e “latência sob a condição X” a números sem qualificador.
- Evitar linguagem promocional ou definitiva como “morreu”, “venceu” e “tornou obsoleto”.
- Nas figuras, escrever “elaboração própria a partir da Tabela 16.1” e manter as fontes na tabela.
- Encurtar parágrafos dos slides; explicações e ressalvas completas permanecem no relatório.
- Padronizar grafia de unidades: GB/TB decimais para capacidade comercial; GiB/TiB apenas quando realmente binários; `Gb/s` para bits e `GB/s` para bytes.

## Checklist final para nota máxima

- [ ] Nomes e DREs reais em relatório, PDF, PPTX e PDF de impressão.
- [ ] Uma única base de dados alimenta tabela, figuras e slides.
- [ ] 870 EVO, 9100 PRO, TS4500/LTO-10 e 9950X3D2 corrigidos.
- [ ] Toda linha de preço contém capacidade-base, URL, moeda, condição e data.
- [ ] Todas as contas passam por asserções automatizadas.
- [ ] Interfaces têm critérios homogêneos e valores marcados como nominais/medidos/estimados.
- [ ] PDF recompilado sem overflow, texto cortado ou referências quebradas.
- [ ] PPTX e PDF de impressão refletem exatamente os números do relatório.
- [ ] Afirmações de mercado têm fonte, data e escopo.
- [ ] Apresentação cabe no tempo e permanece legível em projeção.

## Ordem recomendada de execução

1. Obter nomes/DREs e decidir a metodologia de unidades/preço.
2. Corrigir e validar `dados.py`, incluindo testes das contas.
3. Atualizar Tabela 16.1 e matriz de interfaces em `relatorio.tex`.
4. Regenerar figuras e revisar conclusões técnicas.
5. Atualizar `slides.js`, reduzindo densidade e sincronizando números.
6. Gerar PDF, PPTX e PDF de impressão.
7. Fazer conferência cruzada e inspeção visual final.

## Itens que exigem decisão humana

- Nomes completos, DREs, ordem e atribuição real de autoria no pós-mortem.
- Se preços devem usar MSRP oficial ou preço de varejo observado; a escolha deve ser única e documentada.
- Se CXL e biblioteca empresarial sem preço público permanecem na tabela principal ou migram para tabela técnica complementar.
- Unidade adotada no cálculo econômico (KB decimal ou KiB) e tratamento de impostos/frete/câmbio.
- Tempo da apresentação e quantidade de slides que poderão ser usados ao vivo.
