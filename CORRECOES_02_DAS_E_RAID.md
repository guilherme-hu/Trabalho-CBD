# Auditoria e plano de correções

## Resumo executivo

O documento cobre DAS, interfaces, HBA, striping, espelhamento, métricas de confiabilidade e níveis RAID padrão/não padrão. A estrutura é aproveitável, mas a entrega tem três bloqueadores: não há PDF do relatório, a identificação do grupo continua em placeholders e RAID é recomendado como “backup”, o que precisa ser corrigido imediatamente. A comparação de interfaces e a matriz de RAID também não contêm todos os critérios pedidos.

O DOCX e o PPTX parecem ter sido editados manualmente e são as únicas fontes disponíveis. Não há fonte estruturada nem verificador de contas; por isso, a revisão final deve ser feita no DOCX/PPTX e validada depois da exportação para PDF.

## Artefatos analisados

| Artefato | Papel e estado |
|---|---|
| `DAS e RAID/DAS_RAID_Trabalho.docx` | Única fonte encontrada para o relatório; contém placeholders e notas editoriais. |
| `DAS e RAID/DAS_RAID_Slides.pptx` | Apresentação com 19 slides; contém placeholders. |
| PDF do relatório | Não encontrado. |
| Fonte de geração/código | Não encontrada. |

Não foram encontrados duplicados concorrentes. O DOCX deve ser declarado como fonte canônica do relatório e o PPTX como fonte dos slides. O PDF a ser entregue deve ser exportado do DOCX corrigido, nunca tratado como uma segunda fonte editável.

## Matriz requisito x evidência x status

| Requisito | Onde foi verificado | Status | Problema encontrado | Correção objetiva | Prioridade |
|---|---|---|---|---|---|
| Identificação do grupo | Capa do DOCX; slide 1 | AUSENTE | Permanecem `[GRUPO]`, `[Nome]` e DREs fictícios. | Inserir dados reais e remover todas as instruções/editoriais residuais. | P0 |
| Relatório entregue em PDF | Diretório `DAS e RAID` | AUSENTE | Só existe DOCX. | Exportar o DOCX final para PDF e fazer inspeção visual. | P0 |
| Definição e arquitetura DAS | DOCX, seções iniciais; slides 2–4 | PARCIAL | Definição existe, mas topologias, controladoras, enclosures e pontos únicos de falha são superficiais. | Acrescentar diagrama e limites operacionais de DAS. | P1 |
| DAS versus NAS/SAN | Seção 3 | PARCIAL | Há comparação geral; o texto repete “NAS” e simplifica conectividade/gerência. | Corrigir redação e usar uma tabela por acesso, distância, compartilhamento, disponibilidade e uso em SGBD. | P2 |
| Interfaces DAS pedidas | Tabela de interfaces; slides 4–6 | PARCIAL | SATA/eSATA/SAS/FireWire/USB/HBA aparecem, mas faltam critérios homogêneos. | Completar latência, distância, hot-plug, duplex, filas, dispositivos, confiabilidade e estado atual. | P0 |
| Conceito de HBA | Seção HBA | INCORRETO | Sugere que as demais interfaces chegam à CPU “por HBA”; USB/SATA integrados normalmente usam host controllers/chipset. | Definir HBA como adaptador de host, comum em SAS/FC, sem universalizar. | P1 |
| Hardware RAID versus software RAID | Seção correspondente | PARCIAL | Generaliza maior latência/CPU no software RAID. | Condicionar por implementação, cache, fila, CPU e workload; citar benchmark ou retirar a regra. | P2 |
| Redundância versus backup | Recomendações; slide 16 | INCORRETO | RAID 6 é recomendado para “backup e arquivo”. RAID não substitui cópia independente/versionada/off-site. | Criar destaque explícito e reformular a recomendação de backup. | P0 |
| Striping, chunk, stripe e stripe width | Seção de striping; slide 7 | PARCIAL | `chunk/stripe unit` aparece, mas `stripe` e `stripe width` não são definidos com precisão; regra de tamanho é simplista. | Definir os quatro termos e relacionar alinhamento ao padrão de I/O. | P1 |
| Mirroring e shadowing | Seção de espelhamento; slide 8 | INCORRETO | Shadowing é tratado como mero sinônimo universal de RAID 1. | Explicar o uso histórico de shadow disk e distinguir shadow paging/cópias lógicas de banco. | P1 |
| MTTF, MTBF, MTTR, MTTDL | Seção de métricas; slide 9 | PARCIAL | Conceitos aparecem, mas fórmula de MTTDL omite hipóteses e disponibilidade. | Incluir hipóteses, unidades, `A=MTTF/(MTTF+MTTR)` e exemplo numérico. | P1 |
| Níveis RAID 0–6, 0+1 e 10 | Corpo do relatório | PARCIAL | Descrições existem, mas algumas capacidades/tolerâncias são simplificadas e a matriz é incompleta. | Reescrever em tabela homogênea e corrigir RAID 0+1, RAID 2/3 e riscos de rebuild. | P0 |
| Paridade e penalidade de escrita | Seções RAID 4–6 | PARCIAL | Menciona read-modify-write, mas não compara RMW, reconstruct-write e full-stripe. | Acrescentar fluxo de I/O e penalidades sob hipóteses explícitas. | P1 |
| Risco de rebuild/URE/correlação | Seções RAID 5/6 e confiabilidade | AUSENTE | Capacidade crescente é discutida sem URE, erro latente, falha correlacionada ou carga de rebuild. | Inserir limitações do modelo e efeito na escolha RAID 5/6/10. | P1 |
| RAID não padrão | Seção e slide 15 | NÃO VERIFICÁVEL | RAID 1.5, 7, S e DP têm alegações sem fontes primárias por produto. | Ligar cada item ao fabricante/documentação e separar histórico de oferta atual. | P1 |
| Recomendações para SGBD | Seção final; slide 16 | INCORRETO | RAID 5 é “uso geral”, RAID 0 é sugerido para tempdb sem condições e RAID 6 vira backup. | Formular decisões por RPO/RTO, padrão de I/O, rebuild, cache protegido e possibilidade de recriação. | P0 |
| Referências e citações | Bibliografia do DOCX | PARCIAL | Lista curta, URLs/revisões/datas incompletas e quase nenhuma citação no corpo. | Adotar referências numeradas junto às tabelas e afirmações. | P1 |
| Pós-mortem/autoria | Final do DOCX | AUSENTE | Há campos de grupo a completar, não evidência de contribuição real. | Preencher autoria e validação com tarefas realizadas. | P0 |
| Slides cobrem o relatório | Slides 1–19 | PARCIAL | RAID 2/3/4 e 0+1 não são apresentados; o slide remete a um “PDF” inexistente. | Criar síntese visual desses níveis e exportar o PDF. | P1 |

## Erros técnicos e conceituais

1. **RAID não é backup.** Protege contra algumas falhas de disco, mas não contra exclusão lógica, corrupção propagada, ransomware, erro administrativo, falha do controlador/site ou perda simultânea. A seção de recomendações e o slide 16 devem exigir cópia independente, versionada e testada, com RPO/RTO.
2. **HBA não é caminho universal.** Um HBA é uma interface/adaptador do host para determinado barramento ou fabric, especialmente SAS/FC. USB usa host controller; SATA frequentemente está integrado ao chipset/controlador da placa.
3. **Shadowing não é sempre RAID 1.** “Disk shadowing” pode nomear espelhamento histórico, mas shadow paging, snapshots e cópias lógicas do SGBD têm semânticas diferentes. Apresentar contexto e não equivalência total.
4. **MTTDL:** `MTTF²/[N(N−1)MTTR]` só serve como aproximação para discos idênticos, falhas independentes/exponenciais, detecção imediata, reparo perfeito e unidades compatíveis, sem URE nem falhas correlacionadas. Explicitar essas hipóteses e não usar o resultado como garantia.
5. **RAID 0+1:** “tolera um disco” é uma simplificação. Após a primeira falha, um stripe inteiro é considerado perdido; falhas adicionais no stripe já perdido podem não piorar o estado, mas qualquer falha no stripe sobrevivente derruba o array. Comparar com RAID 10.
6. **RAID 2:** a afirmação específica “10+4 e tolera uma falha” não define a variante de código de Hamming e não é universal. Explicar o princípio e marcar o nível como histórico.
7. **RAID 3:** padronizar a definição como striping em granularidade muito fina/byte, paridade dedicada e I/O sincronizado; não apresentar apenas um mínimo de discos como característica principal.
8. **Tamanho de stripe:** “menor favorece OLTP” não é regra. A escolha depende do tamanho/alinhamento das páginas e I/Os, concorrência, full-stripe writes, controladora e workload.
9. **RAID 5 “uso geral”:** é arriscado como recomendação universal para discos grandes, rebuild longo ou escrita intensa. Apresentar RAID 6/10 e proteção fornecida pelo sistema como alternativas condicionadas.
10. **SAS predominante em servidores:** separar legado/installed base de novas arquiteturas NVMe e armazenamento distribuído; fonte e segmento são necessários.

## Lacunas de conteúdo

- Tabela única de RAID com: mínimo de discos, capacidade útil, distribuição de dados/paridade, falhas toleradas, leitura, escrita aleatória, full-stripe, rebuild, vantagens, limitações e relevância atual.
- Exemplo numérico de disponibilidade e de MTTDL, seguido de uma caixa sobre por que o modelo não contempla URE e correlação.
- Definição operacional de hot spare, hot swap, write-through, write-back e exigência de cache protegido/flush durável para logs.
- Diagrama de DAS mostrando host, controladora/HBA, cabos/expander, enclosure, discos e possíveis pontos únicos de falha.
- Política de backup independente, restauração testada, RPO/RTO e retenção.
- Comparação explícita RAID de hardware, software, firmware/fake RAID e proteção nativa de sistemas distribuídos.

## Dados, tabelas e números a revisar

| Item | Apresentado | Revisão necessária |
|---|---|---|
| MTTDL RAID 1 | Fórmula sem condições | Declarar hipóteses, usar mesmas unidades e mostrar análise de sensibilidade; não chamar de valor real. |
| Disponibilidade | Não há fórmula/exemplo | Incluir `A=MTTF/(MTTF+MTTR)` e distinguir disponibilidade de confiabilidade/durabilidade. |
| RAID 0+1 | Tolerância de uma falha | Descrever tolerância dependente da localização das falhas. |
| RAID 5 | “Mais usado/uso geral” | Remover ranking universal; incluir URE, rebuild e workload. |
| RAID 6 | Penalidade “6 I/Os” | Identificar o caso de pequena escrita RMW; comparar reconstruct-write/full-stripe. |
| USB4 v2 | Até 120 Gb/s | Marcar 80 Gb/s como capacidade prevista na versão 2.0 e 120 Gb/s como modo opcional assimétrico; capacidade mútua do enlace limita o resultado. |
| RAID 1.5 | Ganho especial de leitura | RAID 1 convencional também pode distribuir leituras; exigir documentação primária do produto/implementação. |

Qualquer exemplo de MTTDL deve incluir valores, unidades, substituição na fórmula e resultado reproduzível em uma planilha ou script anexado.

## Referências e fontes

Fontes primárias/reconhecidas a incorporar, consultadas em 05/09/2026:

- [Patterson, Gibson e Katz — A Case for Redundant Arrays of Inexpensive Disks](https://www.cs.cmu.edu/~garth/RAIDpaper/Patterson88.pdf), para a taxonomia histórica; complementar com documentação atual de implementação.
- [USB-IF — USB4](https://www.usb.org/usb4) e [biblioteca de especificações](https://www.usb.org/documents?items_per_page=50&order=name_1&search=USB4+Specification&sort=asc), para capacidade e dependência de compatibilidade.
- [Intel RAID Software User Guide](https://cdrdv2-public.intel.com/840787/SWUG_full_featured_entry_RAID.pdf), para terminologia/recursos da implementação, sem generalizar características do produto para todo RAID.
- [NetApp — políticas RAID atuais do ONTAP](https://docs.netapp.com/us-en/ontap/disks-aggregates/default-raid-policies-aggregates-concept.html) e [TR-3298 sobre RAID-DP](https://www.netapp.com/media/19939-tr-3298.pdf).
- [USENIX — An Analysis of Data Corruption in the Storage Stack](https://www.usenix.org/legacy/events/fast08/tech/full_papers/bairavasundaram/bairavasundaram.pdf), para motivar erros latentes e limitações de modelos independentes.

Datasheets de SATA, SAS e FireWire devem indicar revisão. Afirmações de desempenho precisam dizer se a taxa é nominal do enlace ou vazão de dispositivo/aplicação.

## Correções necessárias no PDF/relatório

1. No DOCX, substituir capa, cabeçalho de autoria e campos finais pelos integrantes reais. **Obrigatório, P0.**
2. Criar uma caixa destacada “RAID ≠ backup” e reescrever a recomendação de RAID 6. **Obrigatório, P0.**
3. Expandir a tabela de interfaces com todos os critérios e corrigir HBA/USB4. **Obrigatório, P0.**
4. Reorganizar níveis RAID em uma matriz única; corrigir 0+1, RAID 2/3 e contextualizar níveis proprietários. **Obrigatório, P0.**
5. Acrescentar disponibilidade, exemplo de MTTDL e limitações por URE/correlação/rebuild. **Obrigatório, P1.**
6. Inserir citações no corpo e referências com URL, título, organização, revisão/ano e data de acesso. **Obrigatório, P1.**
7. Corrigir a duplicação “NAS ... NAS”, o anglicismo/erro “essencially” e remover notas `[Grupo]: ...`. **Obrigatório, P1.**
8. Exportar para PDF e inspecionar símbolos quadrados/checkboxes observados na renderização do DOCX, sumário, tabelas, fórmulas e links. **Obrigatório, P0.**

## Correções necessárias nos slides

1. Slide 1: inserir grupo, nomes e DREs reais. **Obrigatório, P0.**
2. Slide 8: retirar a equivalência irrestrita entre shadowing e RAID 1. **Obrigatório, P1.**
3. Slide 9: acrescentar hipóteses da fórmula de MTTDL ou mover a fórmula detalhada para backup. **Obrigatório, P1.**
4. Slides 14–15: incluir uma síntese de RAID 2/3/4 e 0+1, além de status histórico/proprietário claramente marcado. **Obrigatório, P1.**
5. Slide 16: remover RAID 6 como estratégia de backup; condicionar RAID 0 para `tempdb` à recriação e tolerância à indisponibilidade. **Obrigatório, P0.**
6. Acrescentar um slide visual sobre falha, rebuild, URE e backup/RPO/RTO. **Obrigatório, P1.**
7. Atualizar a referência ao relatório para o nome real do PDF exportado. **Obrigatório, P0.**

## Melhorias de apresentação e redação

- Usar “latência”, “taxa nominal” e “vazão útil” de forma consistente.
- Evitar “melhor”, “predominante” e “uso geral” sem delimitar cenário.
- Manter uma ideia central por slide e no máximo uma tabela pequena; detalhes de níveis históricos podem ficar em backup.
- Empregar diagramas próprios para striping, mirroring e paridade, com legenda de chunk, stripe e stripe width.
- Padronizar `RAID 0+1`, `RAID 10`, unidades e hifenização; eliminar notas de edição visíveis.

## Checklist final para nota máxima

- [ ] Integrantes e DREs preenchidos no DOCX, PDF e PPTX.
- [ ] PDF final existe e abre sem artefatos de fonte/símbolo.
- [ ] RAID é explicitamente diferenciado de backup.
- [ ] Matriz de interfaces contém todos os critérios pedidos.
- [ ] Matriz RAID cobre níveis 0–6, 0+1, 10 e não padrão com limitações.
- [ ] MTTDL contém hipóteses, unidades e exemplo; disponibilidade também é calculada.
- [ ] Rebuild, URE, falhas correlacionadas e cache protegido são discutidos.
- [ ] Recomendações são condicionadas por workload, RPO/RTO e possibilidade de recuperação.
- [ ] Todas as afirmações técnicas têm citação próxima e referência completa.
- [ ] Slides e PDF usam exatamente a mesma terminologia e conclusões.

## Ordem recomendada de execução

1. Preencher identificação e remover marcadores editoriais.
2. Corrigir “RAID ≠ backup”, HBA, shadowing e recomendações.
3. Reconstruir as tabelas de interfaces e RAID.
4. Inserir métricas, exemplo reproduzível e limitações de confiabilidade.
5. Atualizar citações e referências.
6. Sincronizar/reduzir slides.
7. Exportar PDF e revisar visualmente todos os formatos.

## Itens que exigem decisão humana

- Nomes, DREs, número do grupo e contribuição efetiva de cada integrante.
- Tempo disponível para apresentação e quais níveis históricos ficarão no corpo ou no backup.
- Cenário de SGBD usado nas recomendações: mídia, capacidade, taxa de escrita, tolerância a parada, RPO e RTO.
- Implementações/produtos específicos que justificam manter RAID 1.5, RAID 7 e RAID-S no escopo.
