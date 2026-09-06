# Auditoria e plano de correções

## Resumo executivo

O trabalho identifica corretamente a AWS como provedor e aborda conceitos de nuvem, modelos de serviço/implantação, serviços principais e um estudo de custo para 3,5 PB. Contudo, ainda não pode ser entregue: nomes/grupo são placeholders, não existe PDF, a análise de 3,5 PB mistura PB/GB decimais com unidades binárias e não calcula processamento, e a arquitetura não verifica se cada serviço suporta esse volume.

O estudo precisa ser refeito como cenários reproduzíveis. Armazenamento, requisições, recuperação, processamento, transferência, redundância, crescimento e suporte operacional devem aparecer separadamente. Para 3,5 PB, a opção plausível não é um único volume/cluster: é necessário justificar uma arquitetura de data lake/warehouse e declarar workload, região, disponibilidade, retenção e volume lido.

## Artefatos analisados

| Artefato | Papel e estado |
|---|---|
| `Cloud Computing e Cloud Storages/Cloud_Computing_AWS_Trabalho.docx` | Única fonte encontrada para o relatório; AWS está definida como provedor; contém placeholders. |
| `Cloud Computing e Cloud Storages/Cloud_Computing_AWS_Slides(1).pptx` | Apresentação com 16 slides; contém placeholders e gráficos com os valores inconsistentes do DOCX. |
| PDF do relatório | Não encontrado. |
| Fonte estruturada das contas/gráficos | Não encontrada. |

Não foram encontrados duplicados efetivos, embora `(1)` no nome do PPTX sugira arquivo baixado/renomeado. Renomear a versão final sem sufixo e declarar DOCX/PPTX como fontes editáveis. O PDF e os gráficos devem ser derivados de uma planilha ou script de cálculo anexado.

## Matriz requisito x evidência x status

| Requisito | Onde foi verificado | Status | Problema encontrado | Correção objetiva | Prioridade |
|---|---|---|---|---|---|
| Identificação do grupo | Capa do DOCX; slide 1 | AUSENTE | Permanecem `[Grupo 3 / Grupo 7]`, nomes e DREs fictícios. | Substituir em todos os formatos e preencher autoria. | P0 |
| Relatório em PDF | Diretório da proposta | AUSENTE | Só existe DOCX. | Exportar o DOCX corrigido e inspecionar o PDF. | P0 |
| Provedor escolhido | Título, corpo e slides | OK | AWS é inequívoca. | Aplicar todos os requisitos específicos à AWS. | P3 |
| Definição de cloud computing/storage | Seções iniciais; slides 2–4 | PARCIAL | Cloud storage é reduzido a dados remotos via Internet/APIs, aproximando-o só de objeto. | Definir objeto, bloco, arquivo, arquivo frio e armazenamento gerenciado de banco; citar conectividade privada. | P1 |
| Características essenciais/NIST | Seção conceitual | PARCIAL | Características aparecem, mas não são individualmente relacionadas aos exemplos. | Mapear on-demand, broad access, pooling, rapid elasticity e measured service aos serviços. | P1 |
| Elasticidade versus escalabilidade | Seção 6.3 | INCORRETO | Escalar para cima/baixo é usado como definição dos dois conceitos. | Separar capacidade de crescer da adaptação rápida/automática à demanda. | P1 |
| IaaS/PaaS/SaaS/DBaaS/DWaaS | Seções de modelos; slides 4–6 | INCORRETO | DBaaS atribui dados/runtime ao provedor e sugere que o cliente só define modelo/queries. | Corrigir responsabilidade por dados, esquema, IAM, credenciais e configuração; comparar modelos de forma homogênea. | P0 |
| Nuvem pública/privada/híbrida/comunitária | Seção de implantação | PARCIAL | “Pública via Internet” ignora Direct Connect, VPN e endpoints privados. | Definir por propriedade/tenancy/operação, não só caminho de rede. | P1 |
| Serviços AWS obrigatórios | Seção AWS; slides 7–10 | PARCIAL | EC2, S3, EBS, Glacier, RDS, Aurora, DynamoDB e Redshift aparecem, mas há imprecisões. | Corrigir Multi-AZ, DynamoDB, Glacier e Reserved Instances. | P1 |
| Objeto versus bloco versus arquivo | Corpo e slides | AUSENTE | S3/EBS são citados; EFS e comparação de armazenamento em arquivo não aparecem. | Incluir EFS e matriz de tipos/semântica/usos/limites. | P0 |
| Operação, segurança e governança | Seções AWS/economia | PARCIAL | IAM, regiões e backups aparecem, mas quotas, observabilidade, compliance, criptografia/chaves e responsabilidades são rasos. | Acrescentar checklist operacional e shared responsibility por cenário. | P1 |
| Análise de 3,5 PB | Seção 9; slides 11–12 | INCORRETO | Mistura PB/GB com PiB/GiB e usa bases diferentes entre classes. | Adotar 3,5 PB = 3.500.000 GB para preços AWS ou declarar PiB e converter corretamente. | P0 |
| Custo de armazenamento | Tabelas da seção 9 | INCORRETO | S3 Standard soma outra base; demais classes usam 3.670.016 como “GB”; resumo contradiz Deep/Flexible. | Recalcular todas as classes com mesma base/região/data e premissas completas. | P0 |
| Custo de processamento | Menção a Athena | AUSENTE | Há preço de US$5/TB, mas nenhum cenário calculado. | Calcular varredura integral, mensal, diária e com poda/compressão. | P0 |
| Requisições, recuperação e metadados | Estudo econômico | AUSENTE | Classes frias são comparadas só por preço nominal/GB. | Incluir requests, retrieval, mínimo de 128 KB, 40 KB de metadata e permanência mínima. | P0 |
| Transferência/egress | Seção econômica | PARCIAL | Afirma custo elevado sem fórmula/volume; tarifas grandes podem exigir cotação. | Definir volume de saída, origem/destino e usar Pricing Calculator/cotação oficial. | P1 |
| Viabilidade/capacidade por serviço | Estudo de 3,5 PB | AUSENTE | Não verifica limites de Aurora, EBS, RDS, Redshift ou quantidade de objetos. | Criar matriz de limites atuais por região/versão e selecionar arquitetura viável. | P0 |
| Workload e arquitetura | Estudo de 3,5 PB | AUSENTE | Não informa OLTP/OLAP/lake, formato, compressão, crescimento, acesso ou RPO/RTO. | Definir ao menos cenários econômico, típico e alto desempenho. | P0 |
| Referências e data dos preços | Bibliografia | PARCIAL | Links genéricos e marcadores `[Grupo]`; região/data/unidade não são rastreáveis. | Usar páginas exatas, região, moeda, data de acesso e calculadora/planilha. | P0 |
| Slides sintetizam a análise | PPTX, 16 slides | PARCIAL | Gráficos 11–12 repetem números errados; faltam processamento, EFS, limites e arquitetura. | Recalcular gráficos e acrescentar 2–3 slides de premissas/arquitetura/custos. | P0 |

## Erros técnicos e conceituais

1. **PB não é PiB.** Para preços publicados em GB decimais, 3,5 PB = 3.500 TB = 3.500.000 GB. Se a intenção for 3,5 PiB, escrever PiB: isso equivale a 3.670.016 GiB ou aproximadamente 3.940.649,674 GB decimais. O relatório usa 3.670.016 como GB e ainda emprega 3.584.000 em outra tabela.
2. **S3 Standard:** com a base decimal de 3,5 PB e as tarifas usadas no próprio relatório para `us-east-1`, a conta de armazenamento puro é `50.000×0,023 + 450.000×0,022 + 3.000.000×0,021 = US$74.050/mês`, ou US$888.600/ano. O valor atual de US$75.814 usa outra quantidade.
3. **Demais classes, mesma base:** sob as tarifas assumidas no documento, Standard-IA = US$43.750/mês; Glacier Flexible Retrieval = US$12.600/mês; Deep Archive = US$3.465/mês, antes de requisições, recuperação, metadados, permanência mínima e transferência. Validar preços novamente no dia da entrega.
4. **Resumo contraditório:** “US$45 mil a US$76 mil conforme a classe” exclui os próprios valores de Flexible/Deep. Reescrever por cenário de acesso e custo total, não apenas preço nominal.
5. **Athena não foi calculado:** a US$5/TB escaneado, uma leitura integral de 3.500 TB custa US$17.500; uma por mês, US$17.500/mês; uma por dia por 30 dias, US$525.000/mês; escanear 10% após compressão/particionamento, US$1.750 por execução. Acrescentar requests, catálogo e resultados quando aplicável.
6. **DBaaS/shared responsibility:** o cliente continua responsável por dados, classificação, modelo/esquema, queries, usuários/IAM, credenciais e configurações permitidas. O provedor não “assume os dados/runtime” de forma irrestrita.
7. **RDS Multi-AZ:** replicação/failover automático depende da configuração/deployment escolhida; não é propriedade de toda instância RDS.
8. **DynamoDB:** a documentação oficial descreve latência de milissegundos de um dígito para a maioria das operações unitárias, não “dezenas de milissegundos” como característica do serviço.
9. **Glacier:** separar Instant Retrieval, Flexible Retrieval e Deep Archive; tempos variam de milissegundos a 12–48 horas conforme classe/opção.
10. **Reserved Instances:** são principalmente um mecanismo de desconto/compromisso; apenas modalidades zonais específicas incluem reserva de capacidade. Savings Plans não são reserva de capacidade.
11. **Cloud pública:** pode ser alcançada por conectividade privada; o modelo de implantação não é definido pela obrigação de usar Internet pública.
12. **EFS ausente:** sem armazenamento em arquivo, a comparação de cloud storages está incompleta.

## Lacunas de conteúdo

- Definição do workload de 3,5 PB: origem, OLTP/OLAP/lake, formato, compressão, quantidade/tamanho de objetos, crescimento, leituras/escritas, retenção e usuários.
- Três cenários comparáveis: econômico/arquivo, típico/analytics e alto desempenho, com disponibilidade, RPO/RTO e custo mensal/anual.
- Arquitetura alvo. Exemplo a avaliar: S3 como data lake em Parquet, catálogo, Athena/EMR/Redshift Spectrum, ciclo de vida para classes frias e uma camada separada para dados quentes; não assumir um único Aurora/EBS.
- Matriz de limites e quotas. S3 não limita o total de objetos/tamanho agregado do bucket, mas há limites por objeto/request; Aurora/EBS têm limites por cluster/volume e não acomodam 3,5 PB em uma unidade.
- Migração: tempo ideal de 3,5 PB é aproximadamente 32,4 dias a 10 Gb/s e 3,24 dias a 100 Gb/s, sem overhead; avaliar Direct Connect, DataSync e dispositivos de transferência com quotas atuais.
- Custos de requests, transições, retrieval, transferência entre AZ/região/Internet, KMS, observabilidade, catálogo, replicação e suporte.
- Governança: residência de dados, LGPD, chaves, logging, classificação, retenção, imutabilidade e exclusão segura.

## Dados, tabelas e números a revisar

| Cenário/valor | Apresentado | Correção reproduzível |
|---|---|---|
| Base de capacidade | 3,5 PB = 3.670.016 “GB”; em outra tabela 3.584.000 | 3,5 PB decimal = 3.500.000 GB; se 3,5 PiB, usar rótulo correto e converter para a unidade de cobrança. |
| S3 Standard | US$75.814/mês | US$74.050/mês para 3.500.000 GB e faixas assumidas no documento. |
| Standard-IA | US$45.875/mês | US$43.750/mês antes de custos adicionais, com US$0,0125/GB-mês. |
| Glacier Flexible | US$13.212/mês | US$12.600/mês antes de custos adicionais, com US$0,0036/GB-mês. |
| Deep Archive | US$3.633/mês | US$3.465/mês antes de custos adicionais, com US$0,00099/GB-mês. |
| Athena | Só US$5/TB | US$17.500 por varredura integral; mostrar frequência e redução por coluna/partição/compressão. |
| Egress | “Centenas de milhares” | Não estimar sem destino e volume; obter tarifa/cotação por faixa e mostrar fórmula. |
| Crescimento | Ausente | Acrescentar taxa anual e custo em 12/36 meses. |

As cifras acima corrigem a aritmética sob as tarifas já assumidas; não são uma cotação. Os gráficos dos slides devem ser gerados da mesma planilha/script e incluir “armazenamento apenas” ou “TCO estimado” explicitamente.

## Referências e fontes

Fontes primárias mínimas, consultadas em 05/09/2026:

- [NIST SP 800-145 — definição de cloud computing](https://csrc.nist.gov/pubs/sp/800/145/final).
- [AWS S3 Pricing](https://aws.amazon.com/s3/pricing/), incluindo faixas, requisições, retrieval, metadados e permanência mínima.
- [AWS Athena Pricing](https://aws.amazon.com/athena/pricing/), para US$ por TB escaneado e arredondamento mínimo.
- [AWS S3 — restrições e limitações de buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/BucketRestrictions.html).
- [AWS EFS — visão geral](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html), para armazenamento de arquivos/NFS.
- [AWS Aurora — quotas e limites](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Limits.html), verificando engine, versão e região.
- [AWS EBS — restrições de volumes](https://docs.aws.amazon.com/ebs/latest/userguide/volume_constraints.html).
- [AWS DynamoDB — solução de problemas de latência](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TroubleshootingLatency.html).
- [AWS EC2 Reserved Instances Pricing](https://aws.amazon.com/ec2/pricing/reserved-instances/pricing/), distinguindo desconto de reserva de capacidade.
- [AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/).

Registrar em cada tabela: região, moeda, unidade, modalidade, data/hora da consulta e URL. Para volumes com preço “contact us”, anexar proposta/calculadora ou apresentar fórmula sem inventar tarifa.

## Correções necessárias no PDF/relatório

1. No DOCX, substituir grupo, nomes, DREs e autoria; remover todos os marcadores `[Grupo]`. **Obrigatório, P0.**
2. Corrigir PB/PiB e recalcular armazenamento, processamento e gráficos a partir de planilha/script. **Obrigatório, P0.**
3. Definir workload e criar cenários econômico, típico e alto desempenho com TCO. **Obrigatório, P0.**
4. Incluir EFS e matriz objeto/bloco/arquivo/archive/DB/DW. **Obrigatório, P0.**
5. Verificar limites e justificar arquitetura viável para 3,5 PB. **Obrigatório, P0.**
6. Corrigir shared responsibility, RDS Multi-AZ, DynamoDB, Glacier, RI e definição de nuvem pública. **Obrigatório, P0/P1.**
7. Acrescentar operação, segurança, governança, migração, RPO/RTO e custos adicionais. **Obrigatório, P1.**
8. Inserir fontes exatas com região/data e remover referências genéricas. **Obrigatório, P0.**
9. Exportar para PDF e verificar sumário, tabelas, fórmulas, links e os símbolos quadrados vistos na renderização do DOCX. **Obrigatório, P0.**

## Correções necessárias nos slides

1. Slide 1: preencher grupo, nomes e DREs; renomear o arquivo final sem `(1)`. **Obrigatório, P0.**
2. Slides 4–6: corrigir modelos de responsabilidade e elasticidade/escalabilidade. **Obrigatório, P1.**
3. Slides 7–10: corrigir propriedades de serviços e acrescentar EFS. **Obrigatório, P1.**
4. Slides 11–12: substituir os números dos gráficos pela base única de 3.500.000 GB e indicar o que está excluído. **Obrigatório, P0.**
5. Criar slide de premissas/workload e arquitetura para 3,5 PB. **Obrigatório, P0.**
6. Criar slide de processamento/TCO com Athena, requests, retrieval e transferência; evitar comparar classes frias sem padrão de acesso. **Obrigatório, P0.**
7. Criar matriz visual objeto × bloco × arquivo × DB × DW/archive. **Obrigatório, P1.**
8. Atualizar referências/rodapé com região e data; exportar versão final e conferir gráficos. **Obrigatório, P0.**

## Melhorias de apresentação e redação

- Manter o bom tamanho atual de 16 slides e crescer no máximo 2–3 slides; substituir conteúdo redundante em vez de apenas acrescentar.
- Usar diagramas de arquitetura e barras empilhadas que separem armazenamento, processamento, retrieval/requests e transferência.
- Evitar “ilimitado”, “sempre”, “inteiramente gerenciado” e “mais performático” sem condições.
- Escrever PB/PiB, GB/GiB, GB-mês e TB escaneado com consistência.
- Em toda cifra, mostrar região, data e se representa preço de lista, estimativa ou cotação.

## Checklist final para nota máxima

- [ ] Integrantes, DREs, grupo e autoria reais no DOCX, PDF e PPTX.
- [ ] PDF final existe e não apresenta símbolos/quebras de renderização.
- [ ] 3,5 PB usa uma única base decimal; PiB aparece apenas se intencional.
- [ ] Contas de Standard, IA, Flexible, Deep e Athena são reproduzíveis.
- [ ] Requests, retrieval, metadados, retenção mínima, egress e crescimento entram no TCO.
- [ ] Workload, região, disponibilidade, RPO/RTO, compressão e frequência de acesso estão declarados.
- [ ] Arquitetura é viável frente aos limites atuais de cada serviço.
- [ ] EFS e comparação objeto/bloco/arquivo estão incluídos.
- [ ] Shared responsibility e propriedades de RDS/DynamoDB/Glacier/RI estão corrigidas.
- [ ] Gráficos dos slides vêm da mesma planilha/script do relatório.
- [ ] Fontes oficiais exatas e datas de consulta acompanham os valores mutáveis.

## Ordem recomendada de execução

1. Confirmar identificação, workload, região e se 3,5 significa PB ou PiB.
2. Criar planilha/script único e recalcular os cenários.
3. Definir arquitetura e conferir limites/quota/preços oficiais.
4. Corrigir conceitos e completar a comparação de tipos de armazenamento.
5. Atualizar DOCX, referências e conclusões.
6. Regenerar gráficos e atualizar PPTX.
7. Exportar PDF e fazer revisão cruzada/visual final.

## Itens que exigem decisão humana

- Nomes, DREs, grupo correto e divisão real de autoria.
- Se o volume é 3,5 PB decimal ou 3,5 PiB e qual sua taxa de crescimento.
- Região AWS, moeda, modalidade de contrato/desconto e necessidade de suporte empresarial.
- Workload, formato/compressão, acessos mensais, egress, retenção, RPO/RTO e disponibilidade exigida.
- Serviços aprovados pelo professor e se uma cotação via AWS Pricing Calculator/contato comercial será anexada.
