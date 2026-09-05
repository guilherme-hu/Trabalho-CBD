# Aprofundamentos opcionais — Tarefa 2 (NAS × SAN)

> **ATUALIZADO após a segunda rodada de verificação (simulação da correção do professor).**
> Sete itens que estavam nesta lista **foram incorporados ao relatório** e saíram daqui:
> B.3 (atomicidade de página em profundidade, parcial), C.1 (a ressalva AHCI × SCSI, agora
> documentada), E.4 (multipath/ALUA), E.9 (**a lacuna do speedmap v24 — resolvida; era falsa**),
> mais três que a correção apontou como faltantes e que entraram: **como o AFP funciona**, **o fluxo
> de quadros do FCP com dimensionamento por BB_Credit**, e **o NDMP como elo com o nível terciário**.
> Também entrou a **penalidade de escrita do RAID aplicada ao WAL**.

**Status: o que restou aqui NÃO ESTÁ NO RELATÓRIO ENTREGUE.** Este documento existe para o grupo decidir, com
calma, o que vale a pena incorporar numa eventual versão estendida — ou o que vale ter na manga
para o debate e para o fórum do AVA.

Cada item traz: **o que é**, **por que valeria incluir**, **custo estimado** (páginas / slides /
horas de verificação) e **risco** (o que pode dar errado ou exigir fonte difícil).

Convenção de risco: 🟢 material já levantado, é só escrever · 🟡 exige pesquisa nova com
proveniência · 🔴 exige número volátil ou de difícil verificação.

---

## Bloco A — Modelo de custo e TCO comparativo

### A.1 Custo por porta: FC × Ethernet
**O que é.** Comparar o custo de uma porta 32/64GFC (switch + SFP + HBA + cabo OM4) com uma porta
25/100GbE equivalente, e derivar o custo por GB/s efetivo.

**Por que incluir.** É a pergunta que o professor pode fazer depois do slide 12: *"se a rede FC é
menos de 5% da latência, por que ainda se gasta com FC?"*. Hoje respondemos com isolamento
operacional e previsibilidade — um número tornaria a resposta muito mais forte.

**Custo.** ~1,5 página + 1 slide + 2–3 h de verificação.
**Risco.** 🔴 Preço de porta não tem tabela pública confiável; depende de canal, volume e contrato.
Se entrar, tem de ser como **faixa de ordem de grandeza com data carimbada**, nunca como número
único — e é exatamente o tipo de dado que o Post-Mortem manda declarar como estimativa.

### A.2 US$/TB útil: NAS × SAN × objeto
**O que é.** Custo por TB útil considerando overhead de proteção (RAID 6 × espelhamento ×
codificação de apagamento), taxa de utilização real e custo de operação.

**Por que incluir.** Fecha o argumento econômico que hoje aparece só qualitativamente
("NAS custa menos"). Permite mostrar que o overhead de proteção pode dominar a comparação: RAID 1
gasta 100% de overhead; RAID 6 de 8+2 gasta 25%; codificação de apagamento 10+4 gasta 40% mas
tolera 4 falhas.

**Custo.** ~2 páginas + 1 slide. **Risco.** 🟡 A parte estrutural (overhead de proteção) é
aritmética pura e não envelhece. A parte de preço é volátil.

### A.3 O custo escondido: recuperação de objeto em classe fria
**O que é.** Modelar o custo de uma restauração completa a partir do S3 Glacier Deep Archive
(armazenamento + requisições + recuperação + transferência de saída) e comparar com o custo
equivalente em fita.

**Por que incluir.** É o item com melhor relação *impacto / esforço* deste bloco. O slide 25 já
diz que o custo de recuperação "é o que quebra orçamentos", mas sem número. Uma conta explícita
para, digamos, restaurar 100 TB transformaria a afirmação em argumento.

**Custo.** ~1 página + 1 slide de backup. **Risco.** 🟡 Preços têm tabela pública, mas mudam por
trimestre — carimbar data.

---

## Bloco B — Ligação forte com o *Database Engine*

Este é, na nossa avaliação, **o bloco de maior retorno acadêmico**: aprofunda exatamente o eixo
que o enunciado pede ("considerando como o núcleo do SBD utilizará a solução") e é o que mais
diferencia o trabalho de um resumo de catálogo.

### B.1 O caminho completo de um `COMMIT`, camada por camada
**O que é.** Rastrear uma transação desde `COMMIT` até o *log* em mídia não volátil, marcando em
que ponto cada arquitetura acrescenta latência:
`log buffer → write() → page cache → protocolo (SCSI/NFS/SMB) → rede → cache do array → mídia`,
e onde exatamente o `fsync` retorna em cada caso.

**Por que incluir.** Converte a tese central ("é semântica, não velocidade") de afirmação em
demonstração. É o slide que responde de véspera à pergunta "mas na prática, o que muda?".

**Custo.** ~2 páginas + 1 figura + 1 slide. **Risco.** 🟢 Não precisa de fonte nova: sai de
Silberschatz §12.6 (buffers não voláteis), do `man 5 nfs` e da documentação do dNFS que já temos.

### B.2 `O_DIRECT`, *page cache* e o problema do *double caching*
**O que é.** Por que praticamente todo SGBD sério evita o *page cache* do sistema operacional: a
página acaba em memória duas vezes (no *buffer pool* e no *page cache*), o SGBD perde controle
sobre quando a escrita chega à mídia, e a política de despejo do SO não conhece a semântica da
página. Cobrir também o caso especial do PostgreSQL, que **deliberadamente** usa o *page cache*.

**Por que incluir.** É pré-requisito para entender por que NFS sem `O_DIRECT` é problemático — hoje
citamos a recomendação do `man 5 nfs` sem explicar a mecânica.

**Custo.** ~1,5 página + 1 slide. **Risco.** 🟢

### B.3 Atomicidade de página em profundidade
**O que é.** Comparar as três estratégias contra *torn page*: *doublewrite buffer* (InnoDB),
`full_page_writes` no WAL (PostgreSQL) e escrita atômica no dispositivo. Quantificar a amplificação
de escrita de cada uma e mostrar em que condições cada uma pode ser desligada.

**Por que incluir.** O requisito 3 do slide 5 fica só enunciado. Aqui viraria análise, com a
observação interessante de que **o custo da proteção contra torn page pode superar o ganho de uma
mídia mais rápida**.

**Custo.** ~1,5 página + 1 slide de backup. **Risco.** 🟢 Documentação do MySQL e do PostgreSQL é
pública e explícita.

### B.4 *Clusters* com armazenamento compartilhado
**O que é.** Detalhar Oracle RAC + ASM sobre LUNs, e comparar com a alternativa *shared-nothing*.
Explicar por que o ASM dispensa sistema de arquivos e o que isso significa em termos de
travamento distribuído.

**Por que incluir.** É o caso em que a resposta "SAN" é categórica, e hoje aparece como uma linha
de tabela.

**Custo.** ~1,5 página + 1 slide. **Risco.** 🟡 Exige documentação da Oracle; é pública.

### B.5 O modelo de custo de Garcia-Molina aplicado a NAS × SAN
**O que é.** Usar formalmente o modelo de custo do Capítulo 13 (custo medido em acessos a bloco)
para mostrar **algebricamente** por que a diferença entre NAS e SAN se manifesta em transações
curtas e some em varreduras longas: se o custo por acesso é $c = c_{\text{rede}} + c_{\text{mídia}}$
e a varredura amortiza $c_{\text{rede}}$ sobre $n$ blocos sequenciais, então
$\lim_{n\to\infty}$ da diferença relativa entre as arquiteturas tende a zero.

**Por que incluir.** É a única forma de usar o Garcia-Molina de maneira substantiva, e não
decorativa. A instrução do projeto é explícita: *"referência citada e não usada é pior que
referência ausente"*.

**Custo.** ~1 página + 1 slide. **Risco.** 🟢 É derivação nossa; basta que a álgebra esteja certa.

---

## Bloco C — NVMe-oF e RDMA

Hoje há **um parágrafo** no relatório (§4.7, "Nota de fronteira") e uma linha na tabela de
protocolos. Poderia virar seção inteira.

### C.1 Por que o SCSI virou gargalo
**O que é.** SCSI foi projetado nos anos 1980 para disco mecânico: uma fila de comandos, com
profundidade da ordem de dezenas. NVMe foi projetado para *flash*: até 65.535 filas, cada uma com
até 65.536 comandos.

⚠️ **Armadilha de rótulo já identificada:** a fonte que dá "1 fila de 32 comandos" fala de
**AHCI/SATA**, e **não** de SCSI/SAS. SAS faz *command queuing* com profundidade da ordem de
centenas. Escrever "1 fila do SCSI" é atacável em arguição — esse erro foi apontado pela rodada de
verificação adversarial e **não** entrou no relatório. Se este bloco for incorporado, manter a
distinção.

**Custo.** ~1 página. **Risco.** 🟡 exatamente pelo motivo acima.

### C.2 Os três transportes: FC-NVMe, NVMe/TCP e NVMe/RoCE
**O que é.** Comparar os três em termos de requisito de rede (FC já é sem perdas; RoCEv2 exige DCB;
TCP não exige nada), de latência adicionada e de esforço de migração.

**Por que incluir.** É a resposta técnica à pergunta 5 do nosso próprio debate ("a convergência
fracassou ou só mudou de nome?"). Seria elegante ter a resposta preparada.

**Custo.** ~2 páginas + 2 slides. **Risco.** 🟡 Especificações do NVM Express são públicas; medições
independentes de latência são mais difíceis de achar com metodologia declarada.

### C.3 RDMA: SMB Direct e NFS over RDMA
**O que é.** Fechar o círculo: mostrar que o lado NAS também tem resposta de baixa latência
(SMB Direct desde o SMB 3.0; NFS/RDMA), e que portanto a fronteira NAS × SAN não coincide com a
fronteira "lento × rápido".

**Por que incluir.** Reforça a tese central com um argumento a mais.
**Custo.** ~1 página + 1 slide. **Risco.** 🟢 Já temos a fonte da Microsoft.

---

## Bloco D — Nuvem: EBS, EFS e S3 mapeados nas três categorias

### D.1 O mapeamento
**O que é.** Uma tabela mostrando que a taxonomia bloco/arquivo/objeto continua valendo na nuvem:
volumes de bloco = SAN; serviços de arquivo gerenciado = NAS; armazenamento de objetos = objeto.
E que os SGBDs gerenciados escolhem **bloco**, o que confirma a recomendação do relatório.

**Por que incluir.** O relatório já tem uma linha sobre isso na Tabela de recomendação. Uma seção
tornaria o argumento acessível a quem só conhece nuvem, que provavelmente é a maioria da turma.

**Custo.** ~1,5 página + 1 slide. **Risco.** 🟡 Nomes de serviço e limites mudam; carimbar data.

### D.2 A arquitetura *storage-disaggregated*
**O que é.** Aprofundar o caso Aurora (que já está no relatório) e ampliar para Snowflake e para
o padrão *lakehouse* (Parquet + Iceberg/Delta sobre objeto): a separação entre computação e
armazenamento como terceira via.

**Por que incluir.** É a continuação natural do slide 24 ("a observação que mais surpreende") e o
melhor material para o debate entre grupos.

**Custo.** ~2 páginas + 2 slides. **Risco.** 🟢 para o Aurora (artigo revisado por pares em mãos);
🟡 para Snowflake (o artigo do SIGMOD 2016 existe e é citável).

### D.3 Latência de armazenamento em nuvem: o número que falta
**O que é.** Silberschatz afirma "dezenas a centenas de milissegundos" para armazenamento em nuvem.
Isso é verdade para objeto, e **não** para volume de bloco em nuvem, que fica na casa de centenas de
microssegundos a poucos milissegundos.

**Por que incluir.** É uma **quarta possível correção ao material-fonte** — a citação do
Silberschatz, como está, pode induzir o leitor a achar que nenhum banco roda bem em nuvem, o que
contradiz a realidade de mercado.

⚠️ **Antes de incluir:** ler a frase do livro em contexto. Ele diz *"se os dados não estiverem
colocalizados com o banco de dados"*, o que pode ser exatamente a ressalva que salva a afirmação.
**Verificar antes de acusar** — foi o que fizemos com a faixa de 1,6–12 GB/s do FC, que parecia erro
e não era.

**Custo.** ~0,5 página + 1 slide de backup. **Risco.** 🟡 exige medição publicada com metodologia.

---

## Bloco E — Itens menores que ficaram de fora

| # | Item | Por que ficou de fora | Custo se entrar |
|---|---|---|---|
| E.1 | **pNFS em detalhe** (separação metadados/dados, *layouts* de arquivo, bloco e objeto) | Aparece como uma linha na tabela do NFS | ~1 pág. 🟢 |
| E.2 | **Sistemas de arquivos de *cluster*** (GFS2, OCFS2, VMFS) | Citados de passagem ao explicar por que SAN não compartilha sozinha | ~1 pág. 🟡 |
| E.3 | **NPIV e virtualização de HBA** | Fora do escopo do enunciado | ~0,5 pág. 🟢 |
| ~~E.4~~ | ~~**Multipath e *failover* de caminho**~~ | ✅ **INCORPORADO** — Seção 5.6 do relatório, com `no_path_retry`/`fast_io_fail_tmo` como resposta ao requisito 5 | — |
| E.5 | **Congestionamento em *fabric* FC** (*slow drain*, *credit stall*) | Assunto excelente, mas periférico | ~1 pág. 🟡 |
| E.6 | **Segurança**: zoneamento × VLAN × IPsec no iSCSI × criptografia SMB/NFS | O enunciado não pede | ~1,5 pág. 🟡 |
| E.7 | **Hiperconvergência (HCI)** como quarta arquitetura | Não é NAS nem SAN; abriria frente nova | ~1,5 pág. 🟡 |
| E.8 | **Deduplicação e compressão no *array*** e sua interação com dados já comprimidos pelo SGBD | Liga bem com a ressalva de 2,5:1 da fita | ~1 pág. 🟢 |
| ~~E.9~~ | ~~**Velocidades do *speedmap* FCIA v24**~~ | ✅ **RESOLVIDO, e era uma lacuna FALSA.** A tabela v24 está em HTML na página de *roadmap* da FCIA. Ao buscá-la, descobrimos que o 128GFC serial entrega **24.850 MB/s**, o que refuta a tese de "fator exatamente 2" que a v1 publicava como conclusão. Virou o achado principal da seção de FC | — |

---

## Recomendação do grupo sobre o que priorizar

Se for para incluir alguma coisa, a ordem sugerida é:

1. **B.1 — o caminho completo de um `COMMIT`.** Maior retorno acadêmico, custo baixo, sem fonte nova.
2. **B.5 — o modelo de custo de Garcia-Molina.** Resolve o uso decorativo da terceira referência,
   que é uma fragilidade real do relatório atual.
3. **A.3 — o custo de recuperação em classe fria.** Um número transforma uma afirmação forte em
   argumento. **Subiu de prioridade** porque a correção apontou os itens de custo como a violação
   mais direta da nossa própria metodologia (hoje resolvida por declaração de lacuna, não por dado).
4. **D.2 — arquitetura *storage-disaggregated*.** O melhor material para o debate entre grupos.
5. **A.2 — US$/TB útil com o overhead de proteção.** A parte estrutural (RAID 1 = 100% de overhead,
   RAID 6 de 8+2 = 25%, codificação 10+4 = 40%) é aritmética pura, não envelhece, e fecharia
   metade da lacuna de custo sem depender de preço de canal.

**O que NÃO recomendamos incluir:** A.1 (preço de porta) e qualquer item que dependa de preço de
canal. O relatório hoje não tem nenhum número volátil sem data, e essa é uma das suas melhores
características. Introduzir preços que envelhecem em um trimestre custaria mais em credibilidade do
que renderia em conteúdo.
