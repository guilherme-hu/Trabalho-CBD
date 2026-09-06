# Avaliação simulada — Cloud/AWS e DAS/RAID

Data da revisão: 05/09/2026.

## Parecer geral

Os dois trabalhos agora atendem integralmente ao conteúdo técnico do enunciado, apresentam tese e
critérios próprios em vez de apenas enumerar definições, distinguem números de marketing de métricas
operacionais e documentam correções da IA. A estrutura em LaTeX, o checklist literal, as referências
primárias, as perguntas de debate e a coerência entre PDF e slides colocam o conteúdo em faixa de
excelência.

A identificação foi confirmada como Grupo 3. A nota formal ainda depende do registro verdadeiro de
quem fez/revisou/decidiu o quê. O enunciado torna essa autoria avaliável; inventá-la seria pior que
deixar a pendência explícita.

## Cloud Computing e Cloud Storage — AWS

| Critério | Pontos | Parecer |
|---|---:|---|
| Cobertura do roteiro | 2,0/2,0 | Todos os modelos, tipos, critérios e serviços AWS pedidos estão localizados no checklist. |
| Correção conceitual | 2,0/2,0 | Separa objeto/bloco/arquivo, disponibilidade/durabilidade e escalabilidade/elasticidade. |
| Estudo de 3,5 PB | 2,0/2,0 | Declara PB decimal, região/data e separa storage, scans, transferência, limites e TCO. |
| Análise e recomendação | 1,5/1,5 | Compara arquivo, data lake e analytics recorrente e recomenda arquitetura justificável. |
| Fontes e rastreabilidade | 1,0/1,0 | Usa NIST, livros e documentação oficial AWS com data de acesso. |
| PDF e slides | 0,75/0,75 | PDF A4 de 11 páginas; PPTX de 18 slides, legível e coerente. |
| Post-Mortem | 0,5/0,75 | Prompts e dez correções estão documentados; autoria humana ainda precisa ser confirmada. |

**Nota projetada atual: 9,75/10.** Após confirmar a autoria real: **10,0/10 em conteúdo e
conformidade documental**.

Possíveis perguntas do professor:

1. Por que S3 não substitui diretamente o armazenamento de um SGBD relacional?
2. Como uma varredura diária pode custar mais que a capacidade mensal?
3. Por que 11 noves de durabilidade não dispensam backup?
4. Qual fração dos 3,5 PB precisa ser quente?

## DAS e RAID

| Critério | Pontos | Parecer |
|---|---:|---|
| Cobertura do roteiro | 2,0/2,0 | Todas as interfaces, métricas, mecanismos e níveis pedidos aparecem no checklist. |
| Correção conceitual | 2,0/2,0 | HBA não é protocolo; shadowing não é sinônimo universal; níveis 2–4 são historicizados. |
| Profundidade de RAID | 2,0/2,0 | Explica granularidade, paridade, RMW, write hole, rebuild, URE e falhas correlacionadas. |
| Comparação e recomendação | 1,5/1,5 | Recomenda por workload e componente do SBD, com RPO/RTO e cache/flush. |
| Fontes e rastreabilidade | 1,0/1,0 | Livros, artigo original, SATA-IO, USB-IF, SNIA e documentação técnica. |
| PDF e slides | 0,75/0,75 | PDF A4 de 14 páginas; PPTX de 17 slides, com conclusão antes do debate. |
| Post-Mortem | 0,5/0,75 | Prompts e onze correções documentados; falta a confirmação individual do grupo. |

**Nota projetada atual: 9,75/10.** Após confirmar a autoria real: **10,0/10 em conteúdo e
conformidade documental**.

Possíveis perguntas do professor:

1. Por que RAID 10 tolera algumas falhas duplas e outras não?
2. Que hipóteses tornam a fórmula simplificada de MTTDL otimista?
3. Quando uma escrita pequena em RAID 5 faz quatro I/Os e quando não faz?
4. Por que RAID 6 não transforma um repositório em backup?
5. Qual é a diferença entre HBA e controladora RAID?
