# Auditoria e plano de correções

## Resumo executivo

Esta é a proposta mais madura das quatro: há fontes editáveis, PDF, PPTX, figuras, referências extensas, exemplos reais e identificação completa. NAS, SAN, protocolos, multipath, armazenamento por objetos e armazenamento terciário são tratados em boa profundidade. As correções são de precisão e síntese, não de reconstrução integral.

Os principais riscos são: conclusões absolutas que entram em conflito com os próprios exemplos do relatório; ausência de uma única matriz comparativa NAS/SAN/objeto com todos os critérios; diferenciação incompleta entre AST, backup, replicação, ILM e HSM; slides excessivamente densos; e `verificar.py` retornar sucesso mesmo sem conseguir abrir o PPTX.

## Artefatos analisados

| Artefato | Papel e estado |
|---|---|
| `NAS, SAN e AST/relatorio.tex` | Fonte canônica provável do relatório; extensa e editável. |
| `NAS, SAN e AST/Estudo_NAS_SAN_Armazenamento_Fisico_SBD.pdf` | PDF compilado existente e visualmente consistente na capa. |
| `NAS, SAN e AST/slides.js` | Fonte canônica provável dos slides. |
| `NAS, SAN e AST/Slides_NAS_SAN_Armazenamento_SBD.pptx` | Apresentação com 38 slides; 29 principais e 9 de backup. |
| `NAS, SAN e AST/fig/encapsulamento.py`, `fig/graficos.py` | Geradores de figuras. |
| `NAS, SAN e AST/fig/encapsulamento.*`, `fig/pilhas.*` | Figuras derivadas em PDF/PNG. |
| `NAS, SAN e AST/verificar.py` | Verificador aritmético e de consistência; tem falha de cobertura do PPTX. |
| `NAS, SAN e AST/Aprofundamentos_Opcionais_NAS_SAN.md` | Material auxiliar, não entrega principal. |
| `NAS, SAN e AST/simulacao_correcao_professor_rodada2.md` | Registro de revisão, não entrega principal. |

Não foram encontrados PDFs ou apresentações concorrentes. `relatorio.tex` e `slides.js` devem ser declarados fontes canônicas; PDF/PPTX são derivados. Os dois Markdown auxiliares devem ser identificados claramente como apoio para não parecerem versões alternativas.

## Matriz requisito x evidência x status

| Requisito | Onde foi verificado | Status | Problema encontrado | Correção objetiva | Prioridade |
|---|---|---|---|---|---|
| Identificação do grupo | Capa do relatório/PDF e slide 1 | OK | Seis nomes e DREs estão presentes e consistentes. | Apenas confirmar consentimento/grafia antes da entrega. | P3 |
| PDF e fontes editáveis | Diretório da proposta | OK | PDF, TeX, PPTX e JS existem. | Regenerar derivados após as correções. | P2 |
| Fundamentos NAS e protocolos | Relatório, seções NAS/SMB/NFS/AFP; slides 3–10 | OK | Cobertura ampla, com segurança e semântica. | Atualizar AFP com fonte primária Apple de 2026. | P1 |
| Fundamentos SAN e protocolos | Seções FC/iSCSI/FCIP/FCoE/multipath; slides 11–18 | PARCIAL | Conteúdo forte, mas algumas conclusões de uso/obsolescência são absolutas. | Condicionar por implantação, suporte, distância e workload. | P1 |
| Comparação NAS versus SAN | Tabelas e recomendações | PARCIAL | Critérios aparecem em locais diferentes; não há uma única matriz decisória completa. | Consolidar acesso, protocolo, latência, disponibilidade, consistência, custo, limites e exemplos. | P1 |
| Armazenamento por objetos | Seção de objetos; slides 19–22 | PARCIAL | S3 é bem explicado, mas “substituição integral” e a interpretação de 11 noves precisam de escopo. | Precisar semântica por objeto e remover a extrapolação probabilística enganosa. | P1 |
| Comparação NAS/SAN/objeto | Tabela de paradigmas e slides | PARCIAL | Falta uma tabela única com disponibilidade, consistência, melhor uso, limitações, custo e produtos. | Criar matriz consolidada no relatório e versão reduzida nos slides. | P1 |
| AST/terciário | Seção correspondente; slides 23–25 | PARCIAL | Cache e tiering são discutidos, mas AST não é explicitamente separado de backup, replicação, ILM e HSM. | Acrescentar tabela de objetivos, gatilhos, cópias, localização, RPO/RTO e recuperação. | P1 |
| Efeito no SGBD | Recomendações e exemplos | PARCIAL | Regras “ordenamento implica bloco/SAN” e equivalência de custo/desempenho são universais demais. | Basear decisão em semântica suportada pelo SGBD/protocolo, SLA e benchmark. | P0 |
| Exemplos reais | Seção de exemplos; slides 26–28 | OK | Casos são variados e documentados; há limitação declarada de um vídeo inacessível. | Preservar; substituir vídeo se for requisito verificável do docente. | P2 |
| Atualidade NFS/AFP/S3 | Texto e referências | PARCIAL | NFS/S3 estão corretos; notícia secundária sobre AFP pode ser trocada por página oficial Apple. | Atualizar referência e data de acesso. | P1 |
| Cálculos FC e latência | Seções FC; verificador | PARCIAL | Derivação é explícita, mas conclusão “rede deixou de ser gargalo” extrapola o switch local. | Limitar a conclusão ao componente medido e separar latência fim a fim. | P1 |
| Durabilidade S3 | Seção de objetos | INCORRETO | Converte 11 noves de durabilidade projetada em “uma perda por 10.000 anos”, sugerindo probabilidade independente/empírica. | Remover essa equivalência ou rotulá-la como heurística não-SLA, incapaz de cobrir correlação/erro humano. | P1 |
| Recomendações e RPO/RTO | Seções finais | PARCIAL | Há recuperação e tiering, mas não uma matriz explícita de RPO/RTO por cenário. | Acrescentar objetivos e testes de restauração/failover. | P1 |
| Referências | Bibliografia | OK | Em geral específicas e primárias. | Substituir fontes secundárias onde há fonte oficial mais nova e datar claims de mercado. | P2 |
| Pós-mortem | Final do relatório; slides 36–37 | PARCIAL | Registra 33 correções, mas o slide resume 16+15 sem explicar duas correções adicionais da primeira rodada. | Explicitar 18 na primeira rodada, sendo 16 do teste de 48 afirmações + 2 externas. | P2 |
| Verificação automatizada | `verificar.py` | INCORRETO | Sem `python-pptx`, imprime indisponibilidade, define `ppt=None` e aceita todas as comparações como OK. | Falhar explicitamente ou implementar leitura XML; só retornar zero quando o PPTX foi realmente verificado. | P0 |
| Slides legíveis e proporcionais | PPTX, 38 slides | PARCIAL | Muitos slides principais são densos; percurso de 29 slides tende a exceder apresentação comum. | Reduzir núcleo para 12–18 slides e mover detalhes/referências ao backup. | P1 |

## Erros técnicos e conceituais

1. **Bloco não implica necessariamente SAN.** Um SGBD pode usar armazenamento em arquivo via NFS/SMB em configuração oficialmente suportada, mantendo durabilidade e locking adequados ao produto. Reescrever a regra como decisão por suporte do SGBD, semântica do protocolo, latência, disponibilidade e operação.
2. **“NAS ou SAN é indiferente”/“mesmo resultado por fração do custo”:** essas conclusões precisam de workload, arquitetura, benchmark e TCO. Sem isso, usar “pode ser viável” e listar condições.
3. **Latência FC:** 0,46–0,92 µs de componente de switch local não representa HBA, serialização, cabos, ISLs, controladora, filas e dispositivo. A comparação com 20 µs não demonstra que “a rede deixou de ser gargalo” fim a fim.
4. **FCIP:** distância/latência pode tornar replicação síncrona impraticável para determinado RPO e aplicação, mas não a torna tecnicamente “necessariamente assíncrona”. Trocar por “tipicamente assíncrona em longas distâncias”.
5. **FCoE/AFP:** “morto” e “sem relevância” são absolutos. Datar suporte e adoção e distinguir novas implantações de base instalada. Para AFP, usar a página oficial Apple sobre Time Machine no macOS 27+.
6. **Objeto e atualização:** em S3, `PUT` substitui o valor de uma chave e não existe atualização in-place arbitrária, mas há multipart upload e leituras por range. Delimitar a afirmação ao modelo do serviço.
7. **S3 11 noves:** durabilidade projetada não é uma probabilidade empírica independente por objeto nem SLA de tempo até perda; não cobre exclusão por credencial válida, corrupção lógica ou eventos correlacionados.
8. **Air gap:** fita removida oferece forte isolamento físico, mas não é a única defesa contra credenciais cloud válidas; existem contas/vaults isolados, controles de imutabilidade e cópias offline. Corrigir “única” para uma comparação de mecanismos.
9. **Custo do NAS:** “menor custo por TB” exige configuração, suporte, desempenho, licença, redundância e período de TCO comparáveis.

## Lacunas de conteúdo

- Matriz única NAS/SAN/objeto com tipo de acesso, protocolos, consistência, locking, latência, throughput, escalabilidade, disponibilidade, custo, melhores usos, limites e produtos.
- Tabela AST × cache × tiering × ILM × HSM × backup × replicação, explicitando objetivo e se cria uma cópia recuperável independente.
- RPO, RTO, teste de restauração/failover e domínio de falha nas recomendações.
- Critérios formais de suporte de SGBD sobre NFS/SMB e exemplos de configurações homologadas, para equilibrar a regra de decisão.
- Evidência quantitativa/TCO antes de afirmar equivalência de desempenho ou menor custo.
- Indicação visível de quais 29 slides são percurso principal e quais podem ser omitidos conforme o tempo.

## Dados, tabelas e números a revisar

| Item | Valor/conclusão atual | Revisão necessária |
|---|---|---|
| FC 128GFC | Derivação de 24.850 MB/s e ~0,46 µs | Manter como estimativa dependente de payload/overhead; não inferir latência fim a fim. |
| FCIP | Longa distância “necessariamente” assíncrona | Usar latência, RPO/RTO e tolerância do aplicativo; “tipicamente”, não “necessariamente”. |
| S3 11 noves | Aproximadamente uma perda/10.000 anos | Remover conversão; apresentar como objetivo de durabilidade de projeto e discutir ameaças fora do modelo. |
| FAST VP | Granularidade de 256 MB | Manter com referência Dell e modelo/versão; não generalizar para todo AST. |
| Pós-mortem | 16 + 15 = 33 | Explicar: 18 na primeira rodada, dos quais 16 vieram do teste adversarial de 48 afirmações, mais 15 na segunda. |
| `verificar.py` | “Tudo confere” sem `python-pptx` | Ausência de dependência deve produzir SKIP visível e saída não zero, ou usar parser XML completo. |

O verificador deve testar também que a contagem e os valores presentes no PPTX correspondem ao relatório; “não consegui ler” não pode ser convertido em aprovação.

## Referências e fontes

Fontes primárias a preservar/acrescentar, consultadas em 05/09/2026:

- [RFC 8881 — NFSv4.1](https://www.rfc-editor.org/rfc/rfc8881.html), que substitui a RFC 5661.
- [AWS — Amazon S3 strong consistency](https://aws.amazon.com/s3/consistency/) e [guia do S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html); deixar claro o escopo por chave/operação e a ausência de locking entre escritores.
- [Apple — tipos de disco aceitos pelo Time Machine](https://support.apple.com/en-us/102423), atualizada em 2026, para a transição de AFP.
- [Apple — protocolos de compartilhamento no macOS](https://support.apple.com/en-ca/121011), para a depreciação do cliente AFP.
- [FCIA Speedmap v24](https://fibrechannel.org/wp-content/uploads/2023/07/FCIA-Speedmap-V24-July-2023.pdf), distinguindo signaling rate de throughput representativo.
- [Dell EMC Unity: FAST Technology Overview](https://www.delltechnologies.com/asset/en-us/products/storage/industry-market/h15086-emc-unity-fast-technology-overview.pdf), para granularidade e políticas da implementação citada.

Afirmações de suporte dos “quatro principais SGBDs” devem apontar para a matriz oficial de cada fornecedor e versão, não para uma busca genérica.

## Correções necessárias no PDF/relatório

1. Em `relatorio.tex`, reformular a regra bloco/SAN e as conclusões universais sobre NAS/SAN. **Obrigatório, P0.**
2. Corrigir FCIP, air gap, FCoE/AFP e conclusão de latência fim a fim. **Obrigatório, P1.**
3. Remover/reformular a extrapolação de 11 noves do S3. **Obrigatório, P1.**
4. Criar matriz consolidada NAS/SAN/objeto e comparação AST/backup/replicação/ILM/HSM. **Obrigatório, P1.**
5. Acrescentar RPO/RTO e condições de suporte/benchmark/TCO às recomendações. **Obrigatório, P1.**
6. Trocar notícia secundária sobre AFP por fonte oficial Apple atualizada. **Obrigatório, P1.**
7. Corrigir `verificar.py` e executar uma validação que realmente abra o PPTX. **Obrigatório, P0.**
8. Recompilar PDF, conferir links, tabelas largas, notas e figuras. **Obrigatório, P1.**

## Correções necessárias nos slides

1. Nos slides de decisão (19–22 e 26–30), substituir absolutos por critérios verificáveis e condicionais. **Obrigatório, P0/P1.**
2. Acrescentar uma matriz visual compacta NAS/SAN/objeto e uma AST/backup/replicação. **Obrigatório, P1.**
3. Corrigir o argumento dos 11 noves, FCIP e latência de rede. **Obrigatório, P1.**
4. Reduzir o núcleo de 29 para aproximadamente 12–18 slides conforme o tempo; manter protocolo e contas detalhadas no backup. **Obrigatório para legibilidade, P1.**
5. Dividir ou simplificar os slides 8, 9, 11–18 e 20–30, que concentram tabelas/texto pequeno. **Recomendado, P2.**
6. No slide 37, explicar a decomposição das 33 correções. **Recomendado, P2.**
7. Regenerar o PPTX e só aceitá-lo se `verificar.py` tiver efetivamente lido os slides. **Obrigatório, P0.**

## Melhorias de apresentação e redação

- Alterar o subtítulo/capa para explicitar também armazenamento por objetos e AST, se estes são parte avaliada do tema.
- Separar definição, evidência e recomendação; hoje algumas frases pulam de uma métrica isolada para decisão universal.
- Usar “componente de switch”, “fim a fim”, “nominal” e “observado” com precisão.
- Preservar o detalhamento no relatório e usar diagramas/fluxos decisórios nos slides.
- Marcar `Aprofundamentos_Opcionais_NAS_SAN.md` e `simulacao_correcao_professor_rodada2.md` como material auxiliar fora da entrega.

## Checklist final para nota máxima

- [ ] Regra de seleção não confunde bloco com obrigação de SAN.
- [ ] Comparação NAS/SAN/objeto está consolidada e contém todos os critérios.
- [ ] AST está diferenciado de cache, tiering, ILM, HSM, backup e replicação.
- [ ] S3 11 noves não é convertido em previsão de perda individual.
- [ ] FCIP, FCoE, AFP e air gap têm linguagem datada e condicional.
- [ ] Recomendações registram suporte do SGBD, benchmark/TCO, RPO e RTO.
- [ ] `verificar.py` falha se não puder ler o PPTX e passa com a dependência/parser funcional.
- [ ] PDF e PPTX foram regenerados e comparados à fonte.
- [ ] Slides principais cabem no tempo e são legíveis à distância.
- [ ] Referências primárias atuais estão ligadas às afirmações relevantes.

## Ordem recomendada de execução

1. Corrigir `verificar.py` para tornar a validação confiável.
2. Revisar conclusões P0/P1 no `relatorio.tex`.
3. Criar as duas matrizes consolidadas e acrescentar RPO/RTO.
4. Atualizar fontes AFP/S3/FC e datas.
5. Reduzir e sincronizar `slides.js`.
6. Regenerar PDF/PPTX e executar verificação completa.
7. Fazer revisão visual e ensaio cronometrado.

## Itens que exigem decisão humana

- Tempo de apresentação e quais seções/protocolos ficam apenas no backup.
- Se o exemplo em vídeo inacessível deve ser substituído por evidência pública verificável.
- Workloads, versões de SGBD e requisitos de RPO/RTO que sustentarão as recomendações finais.
- Se os dois Markdown auxiliares permanecerão no pacote de entrega ou serão enviados separadamente.
