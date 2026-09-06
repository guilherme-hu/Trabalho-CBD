# Registro de contribuição de Raphael e consolidação dos Post-Mortems

Data da consolidação: 06/09/2026.

Integrante: Raphael Henrique da Silva Pereira  
DRE: 123311073

## Responsabilidade assumida

Raphael coordenou a consolidação do Post-Mortem de Cloud, DAS/RAID e Storage. Em NAS/SAN/AST,
Guilherme En Shih Hu permaneceu responsável principal pela redação do Post-Mortem e pelas duas
rodadas adversariais; Raphael contribuiu nas seções de AST e armazenamento por objetos e solicitou
uma conferência complementar. Sob solicitação de Raphael, o Codex organizou as auditorias,
confrontou os apontamentos com as fontes canônicas e executou as alterações documentais.

## Material usado na revisão

- `CORRECOES_01_STORAGE_E_INTERFACES.md`
- `CORRECOES_02_DAS_E_RAID.md`
- `CORRECOES_03_NAS_SAN_AST.md`
- `CORRECOES_04_CLOUD_COMPUTING_CLOUD_STORAGES.md`
- fontes `relatorio.tex`, geradores de slides, PDFs e PPTXs atuais;
- scripts `verificar.py` de cada trabalho.

Os quatro arquivos de correções descrevem auditorias feitas sobre versões anteriores. Por isso,
foram usados como checklists históricos, e não como descrição automática do estado atual. Cada
apontamento foi comparado com os artefatos existentes antes do fechamento.

## Resultado por trabalho

### Storage e Interfaces

A auditoria registrou problemas de identificação, sincronização de dados, preço por KB e cálculos de
fita. A base quantitativa atual já incorpora as correções verificáveis e o script de validação passa.
Raphael ficou responsável pela Seção 5 e pela consolidação do Post-Mortem. Os outros cinco
integrantes foram identificados e receberam responsabilidades coerentes com as demais tarefas.

### DAS e RAID

A auditoria antiga apontava ausência de PDF e de fonte estruturada, além de problemas na distinção
entre RAID e backup. A versão atual possui fonte LaTeX, PDF, apresentação e verificador. O texto
atual diferencia RAID de backup, condiciona RAID 5 ao workload e documenta URE, rebuild, cache,
RPO e RTO. Raphael coordenou o registro dessa mudança de estado no Post-Mortem, enquanto os demais
integrantes foram distribuídos entre interfaces, mecanismos RAID, métricas e recomendação.

### NAS SAN e AST

A auditoria complementar foi usada para conferir conclusões absolutas, durabilidade do S3,
latência Fibre Channel, AST e funcionamento do verificador. A versão atual contém ressalvas de
escopo, matrizes de decisão, correções adversariais e leitura OOXML de contingência para o PPTX.
Guilherme permaneceu responsável principal pelo Post-Mortem. Raphael manteve sua contribuição
técnica em AST e armazenamento por objetos e apoiou a conferência complementar.

### Cloud Computing e Cloud Storages

A auditoria antiga apontava ausência de PDF, mistura entre PB e PiB, custos inconsistentes e lacunas
em EFS, Athena e arquitetura. A versão atual usa 3,5 PB decimais, inclui EFS, calcula capacidade e
processamento, propõe arquitetura distribuída e possui PDF, PPTX e verificador. Raphael coordenou o
registro dessa revisão, e os demais integrantes receberam responsabilidades por conceito, AWS,
qualidades, custos e integração.

## Decisões registradas

1. Separar os achados históricos do estado efetivamente verificado nos artefatos finais.
2. Completar a divisão editorial por afinidade temática, cobrindo os seis integrantes sem deixar
   funções genéricas ou campos sem identificação.
3. Manter o Post-Mortem dividido em log de prompts, autoria e decisões, e erros da IA com correções.
4. Usar os verificadores e os artefatos canônicos atuais como critério de fechamento técnico.

## Verificação de fechamento

Em 06/09/2026, os quatro relatórios foram recompilados e as quatro apresentações foram regeneradas.
Os quatro scripts `verificar.py` terminaram sem erro. Todas as 122 páginas dos PDFs e todos os 103
slides foram renderizados e inspecionados visualmente; não foi encontrado corte ou sobreposição
causado pela consolidação. A tabela de autoria de NAS/SAN/AST foi convertida para formato quebrável
entre páginas para evitar estouro vertical.

## Situação final

Os seis integrantes estão identificados nos quatro relatórios e apresentações. As tabelas de
autoria registram responsabilidade, decisão e justificativa, e os registros de correção indicam os
responsáveis. A divisão adotada nesta versão é a divisão editorial final para entrega.
