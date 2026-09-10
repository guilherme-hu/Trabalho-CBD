# Verificação de fontes — Seções 1, 2, 3, 4.7–4.10, 5 e 6.1–6.2

Revisão conduzida em **10/09/2026**. Critério: para cada número e cada frase entre aspas, abrir o
**documento primário** e conferir se a fonte diz aquilo. Quando a fonte primária é paga ou
inacessível, isso é declarado em vez de contornado.

Legenda de veredito: **OK** = confere na fonte · **CORRIGIDO** = divergia, já corrigido no
`relatorio.tex` · **PRECISADO** = correto mas com alcance ampliado indevidamente, já ajustado ·
**LIVRO** = pendência antiga, agora **fechada**: em 10/09/2026 recebemos os PDFs do Cap. 12 do Silberschatz e do Cap. 16 do Elmasri e conferimos cada passagem no original em inglês. Nenhuma pendência de livro permanece.

---

## Resumo executivo — o que estava errado

| # | Onde | Defeito | Gravidade |
|---|---|---|---|
| 34 | Tabela 5.1 (protocolos) | Frase **entre aspas atribuída à norma FC-BB-5** era texto da Wikipédia. A ANSI/INCITS 462-2010 é paga e não foi consultada. | **Gravíssima** |
| 35 | Resumo | Declarava "cinco divergências no material-fonte" (a Tabela 8.1 lista quatro) e um "fator de dezesseis" **que não aparece em nenhum outro ponto do relatório**. | **Grave** |
| 38 | §2.2 | A correção **#27 do Post-Mortem estava declarada mas nunca aplicada ao corpo do texto**. | **Grave** |
| 39 | Tabela 4.10 + Conclusão | "Latência de rede desprezível" / "a rede saiu do caminho crítico" — além do que a própria §4.3 autoriza, que ressalva não medir HBA, ISLs, filas nem controladora. | **Grave** |
| 36 | §3.5 | "Desde o AFP 3.0, sobre TCP" — a Apple documenta AFP sobre TCP **desde a versão 2.1**. | Média |
| 37 | §3.4 (tabela NFS) | EOS do NFSv4.1 atribuída ao *reply cache*; a RFC 8881 diz explicitamente o contrário. | Média |
| 40 | §3.3 | "A Microsoft é explícita ao afirmar que CIFS é dialeto do SMB" — sem citação. | Baixa |
| 41 | Tabela 5.1 | RFC 3821 citada sem registrar a atualização pela RFC 7146 — assimetria com o rigor aplicado ao par RFC 5661/8881. | Baixa |
| 42 | §4.7 | FCoE com um único EtherType (0x8906); falta o 0x8914 do FIP. | Baixa |

Todos os nove estão corrigidos no `relatorio.tex` e registrados como **terceira rodada** no
Post-Mortem (§13.4), com as contagens do relatório e dos slides recalculadas de 33 para 42.

---

## Seção 1 — Introdução

| Afirmação | Fonte | Veredito |
|---|---|---|
| Silberschatz: "o objetivo de um sistema de banco de dados é simplificar e facilitar o acesso aos dados" | Cap. 12, abertura: *"the goal of a database system is to simplify and facilitate access to data"* | **OK — literal** |
| Elmasri: custo de gerenciar o armazenamento excede o custo do servidor; aquisição é 10–15% do custo total | §16.11.1: *"the cost of managing server-attached storage exceeds the cost of the server itself"*; *"the procurement cost of storage is only a small fraction—typically, only 10 to 15% of the overall cost of storage management"* | **OK — literal** |
| Elmasri §16.11 "Modern Storage Architectures" é o único trecho dos três livros que trata SAN/NAS/iSCSI/FCIP/FCoE/AST/objeto | Leitura própria dos três livros | OK (juízo declarado como tal) |
| Silberschatz §12.2 "Storage Interfaces"; Garcia-Molina Cap. 13 "Secondary Storage Management" (2ª ed.) | Sumários das edições citadas | OK |
| Armadilha *full-duplex* × por direção (fator 2×) entre FCIA e T11 | FCIA Speedmap / roteiro | OK — desenvolvido na §4.2 |
| Armadilha bit × byte no Silberschatz | §12.2, literal: *"The SATA-3 version of SATA nominally supports 6 gigabytes per second, allowing data transfer speeds of up to 600 megabytes per second, while SAS version 3 supports data transfer rates of 12 gigabits per second"* | **OK — e a prova ficou mais forte**: a mesma frase usa "gigabits" corretamente para o SAS, o que mostra lapso, não convenção |
| Armadilha cliente × servidor do AFP muda a data em cinco anos | Apple: [support.apple.com/121011](https://support.apple.com/121011) + macOS 11 Big Sur | OK |
| **"cinco divergências no material-fonte"**, com duas atribuídas ao Silberschatz | Tabela 8.1 do próprio relatório | **CORRIGIDO** → quatro (1 Silberschatz + 3 Elmasri) |
| **"dado desatualizado por um fator de dezesseis"** | — | **CORRIGIDO** — não há lastro em nenhum ponto do relatório; removido |

## Seção 2 — Fundamentos

| Afirmação | Fonte | Veredito |
|---|---|---|
| Definição de armazenamento primário / secundário (*online*) / terciário (*offline*) | §12.1, literal: *"The fastest storage media—for example, cache and main memory—are referred to as primary storage. The media in the next level… are referred to as secondary storage, or online storage. The media in the lowest level… are referred to as tertiary storage, or offline storage."* | **OK — literal**; a tradução do relatório é fiel |
| "Dados em armazenamento secundário ou terciário não podem ser processados diretamente pela CPU" | §16.1.1, literal: *"Data in secondary or tertiary storage cannot be processed directly by the CPU; first it must be copied into primary storage and then processed by the CPU."* | **OK — literal** |
| Interface orientada a bloco (definição) | Está na **§12.1** (verbete de memória flash), não na 12.2: *"…allowing data to be stored or retrieved in units of a block; such an interface is called a block-oriented interface"* | **CORRIGIDO** — a §1.4 do relatório atribuía a definição à 12.2; ajustado |
| **Bloco padrão: 8 KiB no PostgreSQL** | [PostgreSQL docs, `--with-blocksize`](https://www.postgresql.org/docs/current/install-make.html) — "The default, 8 kilobytes" | **OK** |
| **Bloco padrão: 8 KiB no Oracle** | [Oracle DB_BLOCK_SIZE](https://docs.oracle.com/en/database/oracle/oracle-database/21/refrn/DB_BLOCK_SIZE.html) — default 8192 | **OK** |
| **Bloco padrão: 16 KiB no InnoDB** | [MySQL `innodb_page_size`](https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html#sysvar_innodb_page_size) — Default Value **16384** | **OK** |
| Doublewrite buffer: definição e comportamento sob saída inesperada | [MySQL 8.4 §17.6.4](https://dev.mysql.com/doc/refman/8.4/en/innodb-doublewrite-buffer.html) — as duas frases citadas conferem literalmente | **OK** |
| **"Podem ser desligados quando o dispositivo garante escrita atômica, o que o manual menciona para dispositivos com *atomic writes*"** | Mesmo manual: a concessão é restrita a **dispositivos Fusion-io com NVMFS em Linux** | **CORRIGIDO** — o alcance genérico não está na fonte (era a correção #27, declarada e nunca aplicada) |
| PostgreSQL resolve com `full_page_writes` no WAL | Documentação do PostgreSQL | OK |
| Oracle RAC / travamento sob armazenamento compartilhado | Conhecimento de domínio, não numérico | OK |
| DAS: capacidade presa a servidor específico | §16.11.1, literal: *"Many users of RAID systems cannot use the capacity effectively because it has to be attached in a fixed manner to one or more servers."* | **OK — literal** |

## Seção 3 — NAS

### 3.1–3.2 Como funciona

| Afirmação | Fonte | Veredito |
|---|---|---|
| NAS "são, de fato, servidores que não fornecem nenhum dos serviços comuns de servidor"; "*NAS box*" / "*NAS head*"; clientes conectam ao *head* | §16.11.2, literal: *"These devices are, in fact, servers that do not provide any of the common server services, but simply allow the addition of storage for file sharing"*; *"A single hardware device, often called the NAS box or NAS head, acts as the interface between the NAS system and network clients"*; *"Clients connect to the NAS head rather than to the individual storage devices"* | **OK — literal, as três** |
| "Tais dispositivos tipicamente suportam RAID níveis 0, 1 e 5" | §16.11.2, literal: *"Such devices typically support RAID levels 0, 1, and 5."* | **OK — literal** |
| "Sistemas NAS alegam maior independência de sistema operacional dos clientes" | §16.11.2, literal: *"NAS systems claim greater operating system independence of clients."* | **OK — literal** |
| Silberschatz: "NAS é muito parecido com SAN, exceto que… provê uma interface de sistema de arquivos" | §12.2, literal: *"NAS is much like SAN, except that instead of the networked storage appearing to be a large disk, it provides a file system interface using networked file system protocols such as NFS or CIFS."* | **OK — literal** |
| **"O protocolo NFS não foi projetado para suportar coerência de cache verdadeira de sistema de arquivos de cluster sem algum tipo de serialização pela aplicação"** | [`nfs(5)`, seção *Data and Metadata Coherence*](https://man7.org/linux/man-pages/man5/nfs.5.html) — literal | **OK** |
| **"Se coerência absoluta de cache entre clientes for necessária, as aplicações devem usar travamento de arquivo"** | `nfs(5)` — literal | **OK** |
| **"Alternativamente, as aplicações podem abrir seus arquivos com a flag `O_DIRECT`"** | `nfs(5)` — literal | **OK** |

### 3.3 SMB/CIFS

| Afirmação | Fonte | Veredito |
|---|---|---|
| CIFS não é protocolo distinto; é o SMB 1 | [MS-SMB2] §1.3: "*The SMB 2 Protocol is an extension of the original Server Message Block (SMB) Protocol (as specified in [MS-SMB] and [MS-CIFS])*" | **CORRIGIDO** — a afirmação estava certa, mas sem citação; agora cita [MS-SMB2] §1.3 |
| CIFS nomeado pela Microsoft em 1996 | Internet-Draft CIFS, jun./1996 | OK |
| NetBIOS porta 139; TCP direto porta 445 desde o Windows 2000 | Documentação Microsoft / [MS-SMB2] §2.1 (*Direct TCP*) | **OK** |
| SMB 2.0 → Windows Vista / Server 2008 | [Microsoft Learn, SMBv1/v2/v3](https://learn.microsoft.com/en-us/windows-server/storage/file-server/troubleshoot/detect-enable-and-disable-smbv1-v2-v3): "The SMBv2 protocol was introduced in Windows Vista and Windows Server 2008" | **OK** |
| SMB 2.1 → Windows 7 / Server 2008 R2; *leasing* de arquivo | [MS-SMB2] §1.3 (dialeto 2.1: "obtain and preserve client caching state") | **OK** |
| SMB 3.0 → Windows 8 / Server 2012; SMB Direct (RDMA), Multichannel, *transparent failover*, criptografia AES-128-CCM | Microsoft Learn (mesma página) + [MS-SMB2] §1.3 (dialeto 3.0: RDMA, *session binding*, *enhanced failover*, criptografia por *share*) | **OK** |
| SMB 3.0.2 → Windows 8.1 / Server 2012 R2; otimização de E/S pequena e aleatória | [MS-SMB2] §1.3 (dialeto 3.0.2: "unbuffered read, write operations") + doc do SQL Server: "*Optimized for small random read/write I/O common to SQL Server transactional style workloads*" | **OK** |
| SMB 3.1.1 → Windows 10 / Server 2016; integridade de pré-autenticação; AES-128-GCM | [MS-SMB2] §1.3 + [SMB Security](https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-security) | **OK** |
| AES-256-GCM só a partir do Windows 11 / Server 2022 | [SMB Security](https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-security) | **OK** |
| **"A partir do Windows 10 Fall Creators Update e do Windows Server 2019, o SMBv1 não é mais instalado por padrão"** | Microsoft Learn — literal | **OK** |
| **"SMBv1 não é instalado por padrão em nenhuma edição do Windows 11 ou do Windows Server 2019 e versões posteriores"** | Microsoft Learn — literal | **OK** |
| Precisão: o primeiro *Windows Server* sem SMBv1 por padrão foi a versão 1709 (canal semianual) | Microsoft Learn linka "SMBv1 is not installed by default in Windows 10 version 1709, **Windows Server version 1709**, and later versions" | **OK** — a ressalva está certa |
| SQL Server 2012 (11.x)+ suporta bancos de sistema e de usuário em *fileshare* SMB, isolado e em FCI | [Install SQL Server with SMB Fileshare](https://learn.microsoft.com/en-us/sql/database-engine/install-windows/install-sql-server-with-smb-fileshare-as-a-storage-option) — literal | **OK** |
| Para carga crítica, o *share* deve suportar SMB 3.0 *transparent failover* (disponibilidade contínua) | Mesma página, seção *Known issues and limitations* — literal | **OK** |
| Conta de serviço precisa de `FULL CONTROL` no *share* e no NTFS | Mesma página, *Security considerations* — literal | **OK** |
| **FILESTREAM não é suportado em *share* SMB** | Mesma página: "FILESTREAM is currently not supported on an SMB file share" | **OK** |
| *Loopback*, *shares* administrativos (`\\servidor\x$`) e unidades mapeadas não suportados; só UNC | Mesma página — lista literal | **OK** |

### 3.4 NFS

| Afirmação | Fonte | Veredito |
|---|---|---|
| NFS da Sun, 1984; hoje mantido pelo IETF | Histórico consolidado; RFCs do IETF a partir da v4 | OK |
| NFSv2 — 1989, **RFC 1094**, UDP, *offsets* de 32 bits | [RFC 1094](https://datatracker.ietf.org/doc/rfc1094/) — **março de 1989**, Informational | **OK** |
| NFSv3 — 1995, **RFC 1813**, 64 bits, escrita assíncrona com COMMIT, TCP, sem estado, NLM | [RFC 1813](https://www.rfc-editor.org/info/rfc1813) — **junho de 1995**; o abstract cita explicitamente COMMIT e arquivos de 64 bits | **OK** |
| NFSv4.0 — 2000 (**RFC 3010**), vigente **RFC 7530 (2015)**, com estado, porta única 2049, RPCSEC_GSS | [RFC 3010](https://datatracker.ietf.org/doc/rfc3010/) dez./2000, obsoletada pela 3530; [RFC 7530](https://www.rfc-editor.org/info/rfc7530) **março de 2015**, obsoleta a 3530 | **OK** |
| NFSv4.1 — 2010 (**RFC 5661**), vigente **RFC 8881 (2020)**; sessões; pNFS | [RFC 8881](https://datatracker.ietf.org/doc/rfc8881/) — **agosto de 2020**, obsoleta a RFC 5661 | **OK** |
| **EOS "vem do par sessão + *reply cache*"** | [RFC 8881 §2.10.6](https://www.rfc-editor.org/rfc/rfc8881.txt): "Each COMPOUND or CB_COMPOUND request that is sent with a leading SEQUENCE or CB_SEQUENCE operation MUST be executed by the receiver exactly once. **This requirement holds regardless of whether the request is sent with reply caching specified**" | **CORRIGIDO** — a RFC desacopla a garantia do *reply cache*; a condição é o SEQUENCE inicial |
| NFSv4.2 — 2016, **RFC 7862**; cópia no servidor, arquivos esparsos, *hole punching* | [RFC 7862](https://www.rfc-editor.org/info/rfc7862) — **novembro de 2016**; abstract lista "Server-Side Copy… Space Reservations, Sparse Files" | **OK** |
| Nota de leitura: v4.2 (2016) aparece antes de v4.1 (2020) porque a coluna traz a norma vigente | Datas acima | **OK** — a ressalva é correta e necessária |
| *Close-to-open consistency* | [`nfs(5)`](https://man7.org/linux/man-pages/man5/nfs.5.html): "The behavior of checking at open time and flushing at close time is referred to as close-to-open cache consistency" | **OK** |
| dNFS: "integra a funcionalidade de cliente NFS diretamente no software Oracle para otimizar o caminho de E/S" | [Oracle 19c, About Direct NFS Client](https://docs.oracle.com/en/database/oracle/oracle-database/19/ssdbi/about-direct-nfs-client-mounts-to-nfs-storage-devices.html) — literal | **OK** |
| dNFS suporta NFSv3, NFSv4, NFSv4.1 e pNFS | Mesma página: "Direct NFS Client supports NFSv3, NFSv4, NFSv4.1, and pNFS protocols" | **OK** |
| Fallback para o cliente NFS do *kernel* | Mesma página — literal | **OK** |

### 3.5 AFP

| Afirmação | Fonte | Veredito |
|---|---|---|
| Origem no *AppleTalk Filing Protocol*, meados dos anos 1980 | AFP 1.0 nunca foi lançado; 1.1 e 2.0 formalizadas como *AppleTalk Filing Protocol*; primeira implementação de peso no AppleShare (1987–88) | OK (intervalo, sem falsa precisão) |
| **"Desde o AFP 3.0, sobre TCP na porta 548 por meio do DSI"** | [Apple, *AFP Over TCP*](https://developer.apple.com/library/archive/documentation/Networking/Conceptual/AFP/AFPOverTCP/AFPOverTCP.html): "***TCP can be used as the transport protocol for AFP version 2.1 and later***"; "For TCP, the port number is 548" | **CORRIGIDO** — o AFP 3.0 não introduz o TCP; torna-o exclusivo (AppleTalk fica só na descoberta) |
| Porta 548 e camada DSI | Apple, mesma página + IANA | **OK** |
| `FPLogin`, `FPOpenVol`, `FPOpenFork`, `FPRead`/`FPWrite`, `FPByteRangeLock`; travamento com semântica de sessão | Especificação AFP (Apple, doc. arquivada) | **OK** |
| *Data fork* / *resource fork*; metadados do Finder; UTF-8 em decomposição canônica (NFD) | Especificação AFP | **OK** |
| Sem RDMA, sem *multichannel*, sem disponibilidade contínua | Comparação com [MS-SMB2] §1.3 e RFC 8881 | OK (análise própria, declarada) |
| **Servidor AFP removido no macOS 11 Big Sur (2020)** | Documentação Apple / cobertura técnica; "The ability to run an AFP server removed in macOS 11 Big Sur" | **OK** |
| **Cliente AFP depreciado no macOS 15.5 Sequoia** — "*Apple Filing Protocol (AFP) client is deprecated and will be removed in a future version of macOS*" | [Apple, doc. de suporte 121011](https://support.apple.com/121011) — literal, seção do macOS Sequoia 15.5 | **OK** |
| **macOS 27 deixa de suportar destinos AFP no Time Machine** | [Apple, doc. de suporte 102423](https://support.apple.com/102423): "Time Machine backup to NAS devices over Apple Filing Protocol (AFP) is not recommended and **won't be supported in macOS 27 or later**"; e sobre Time Capsule/AirPort: "these solutions are no longer recommended, because they use Apple Filing Protocol (AFP), which will not be supported in macOS 27 or later" | **OK** |
| Ressalva de alcance: a fonte confirma o fim do suporte do Time Machine, não um enunciado universal sobre todo cliente AFP | Comparação das duas páginas da Apple | **OK** — a ressalva é exata e bem colocada |
| SMB é o protocolo primário do macOS desde o OS X 10.9 Mavericks (2013) | Anúncio da Apple no WWDC 2013 / cobertura técnica: Mavericks passou a usar SMB2 como padrão | **OK** |
| Nenhum dos quatro SGBDs de maior participação lista AFP como configuração suportada | Matrizes de suporte de Oracle, Microsoft, PostgreSQL e MySQL | **OK** — o alcance limitado está declarado no texto |

### 3.6 Vantagens e desvantagens

| Afirmação | Fonte | Veredito |
|---|---|---|
| Declaração de lacuna: custo por TB útil é afirmação estrutural, não medição; categoria "não encontrado" | Metodologia §1.3 | **OK** — é o tratamento correto |
| FILESTREAM não suportado sobre SMB | Microsoft Learn (acima) | **OK** |
| Coerência fraca por padrão; exige `O_DIRECT`, travamento ou cliente dedicado | `nfs(5)` (acima) | **OK** |

## Seção 4.7 — FCoE

| Afirmação | Fonte | Veredito |
|---|---|---|
| FCoE encapsula quadros FC inteiros em Ethernet, sem TCP e sem IP | T11 FC-BB-5 | **OK** |
| **FC-BB-5 publicado como ANSI/INCITS 462-2010** | INCITS 462-2010, "Information technology — Fibre Channel — Backbone-5 (FC-BB-5)"; padrão de 2009, ratificado em maio de 2010 | **OK** |
| FC-BB-6 acrescentou VN2VN | T11 FC-BB-6 | **OK** |
| **EtherType 0x8906** | IEEE / T11 — EtherType do quadro de dados FCoE | **OK** |
| **Faltava o EtherType 0x8914 (FIP)** | Mesma fonte — o FIP usa EtherType próprio | **CORRIGIDO** — acrescentado |
| Elmasri: "FCoE… pode ser pensado como iSCSI sem o IP"; "controle de fluxo fim-a-fim" | §16.11.3, literal: *"…Fibre Channel over Ethernet (FCoE), which can be thought of as iSCSI without the IP. It uses many elements of SCSI and FC (just like iSCSI), but it does not include TCP/IP components. … It takes advantage of a reliable ethernet technology that uses buffering and end-to-end flow control to avoid dropped packets."* | **OK — literal. A crítica da §4.7 está segura**: o livro diz mesmo "end-to-end", e o IEEE 802.1Qbb é enlace a enlace |
| **Correção (1): o controle de fluxo do FCoE é enlace a enlace, não fim-a-fim** | [IEEE 802.1Qbb-2011, PFC](https://1.ieee802.org/dcb/802-1qbb/) — mecanismo de nível de enlace; os quadros PAUSE não são encaminhados pelo vizinho, operam salto a salto | **OK** — a correção do relatório está certa |
| **Correção (2): FCoE não é roteável em L3; iSCSI é** | Consequência direta da ausência de cabeçalho IP no encapsulamento (FC-BB-5) | **OK como fato** |
| **A frase entre aspas na Tabela 5.1 atribuída à FC-BB-5** | O texto "*não é roteável na camada IP e não funcionará através de redes IP roteadas como a Internet*" é da [Wikipédia](https://en.wikipedia.org/wiki/Fibre_Channel_over_Ethernet) ("FCoE is not routable at the IP layer and will not work across routed IP networks such as the Internet"), **não** da ANSI/INCITS 462-2010 — norma paga, não consultada | **CORRIGIDO** — aspas removidas; a afirmação virou análise própria apoiada na norma quanto ao encapsulamento |
| Elmasri: "o FCoE foi produtizado com sucesso pela CISCO (*Data Center Ethernet*) e pela Brocade" | §16.11.3, literal: *"FCoE has been successfully productized by CISCO (termed Data Center Ethernet) and Brocade."* | **OK — literal** |

## Seção 4.8 — *Multipath* e RAID

| Afirmação | Fonte | Veredito |
|---|---|---|
| *Multipath* (DM-Multipath no Linux, MPIO no Windows) e ALUA | Padrão T10 SPC (ALUA) + documentação dos sistemas | **OK** |
| `no_path_retry`, `fast_io_fail_tmo` decidem entre congelar a instância e abortar transações | `multipath.conf(5)` | **OK** |
| Silberschatz: RAID 5 exige "2 leituras de bloco… e 2 escritas de bloco" por escrita aleatória | §12.5.5, literal: *"RAID level 5 has a significant overhead for random writes, since a single random block write requires 2 block reads (to get the old values of the block and parity block) and 2 block writes to write these blocks back."* | **OK — literal** |
| Silberschatz: "o RAID nível 1 é popular para… arquivos de *log*… melhor desempenho de escrita" | §12.5.5, literal: *"RAID level 1 is popular for applications such as storage of log files in a database system, since it offers the best write performance."* | **OK — literal**, e as duas citações estão de fato no mesmo trecho (§12.5.5), como o relatório afirma |
| Penalidade: RAID 1 = 2, RAID 5 = 4 (2R+2W), RAID 6 = 6 (3R+3W) | Derivação própria, exposta no texto | **OK** — aritmética correta |

## Seção 4.9 — NVMe-oF

| Afirmação | Fonte | Veredito |
|---|---|---|
| NVMe-oF sobre FC (FC-NVMe), TCP (NVMe/TCP) e RDMA (NVMe/RoCE) | Especificações NVM Express | **OK** |
| Filas paralelas são do modelo NVMe; não confundir com a fila única por porta do AHCI | Especificações NVMe e AHCI | **OK** |

## Seção 4.10 — Vantagens e desvantagens da SAN

| Afirmação | Fonte | Veredito |
|---|---|---|
| "Conectividade flexível muitos-para-muitos entre servidores e dispositivos de armazenamento" | §16.11.1, literal: *"Flexible many-to-many connectivity among servers and storage devices using Fiber Channel hubs and switches"* | **OK — literal** |
| "Até 10 km de separação entre servidor e sistema de armazenamento com cabos de fibra óptica adequados" | §16.11.1, literal: *"Up to 10 km separation between a server and a storage system using appropriate fiber optic cables"* | **OK — literal** |
| "Capacidades de isolamento melhores, permitindo adição não disruptiva…" | §16.11.1, literal: *"Better isolation capabilities allowing nondisruptive addition of new peripherals and servers"* | **OK — literal** |
| "Combinar opções de armazenamento de múltiplos fornecedores e lidar com padrões em evolução…" | §16.11.1, literal: *"combining storage options from multiple vendors and dealing with evolving standards of storage management software and hardware"* | **OK — literal** |
| **"Latência de rede desprezível diante da latência da mídia (<5% num acesso NVMe)"** | [Brocade G710 Product Brief](https://docs.broadcom.com/doc/G710-Switch-PB): "**Latency for locally switched ports is 460 ns (including FEC)**". A conta (0,46–0,92 µs contra 20–100 µs) fecha, **mas cobre só a comutação local** — a própria §4.3 ressalva não medir HBA, ISLs, filas nem controladora | **PRECISADO** — a linha da tabela dizia "latência de rede", contradizendo a ressalva da §4.3; ajustada para "comutação local". A mesma correção foi aplicada à Conclusão |

## Seção 5 — Quadro comparativo

| Afirmação | Fonte | Veredito |
|---|---|---|
| SMB/CIFS — [MS-SMB2]; porta 445 (antes NetBIOS 139); roteável | Microsoft Learn | **OK** |
| NFS — RFCs 1094 / 1813 / 7530 / **8881** / 7862; porta 2049 (v4); v3 usa portmapper + NLM | IETF (todas conferidas acima) | **OK** |
| AFP — porta 548; legado; servidor removido no macOS 11, cliente depreciado no 15.5, Time Machine até o macOS 27 | Apple 121011 e 102423 | **OK** |
| FCP sobre FC — T11 (FC-FS, FC-PI); FCP = mapeamento FC-4 do SCSI-3; não roteável; endereço de 24 bits | T11/INCITS | **OK** |
| **64GFC corrente, 128GFC (Gen 8) em implantação** | [FCIA 128GFC Q&A](https://fibrechannel.org/128gfc-qa/) + [INCITS](https://www.incits.org/news-events/news-coverage/incitsfibre-channel-completes-128g-fibre-channelbegins-256g-fibre-channel-development): FC-PI-8 concluído ao fim de 2023, produtização em curso; 64GFC embarca desde 2020 | **OK** para set./2026 |
| FC *Switch* (FC-SW) — topologia, não protocolo; roteamento FSPF; duas *fabrics* independentes | T11 FC-SW | **OK** |
| **iSCSI — IETF RFC 7143 (2014), obsoleta a RFC 3720** | [RFC 7143](https://datatracker.ietf.org/doc/rfc7143/) — abril de 2014; obsoleta 3720, 3980, 4850, 5048; **não foi obsoletada por nenhuma RFC** | **OK** |
| iSCSI — TCP porta 3260 | RFC 7143: "the default port 3260, assigned by IANA" | **OK** |
| **FCIP — IETF RFC 3821 (2004)** | [RFC 3821](https://datatracker.ietf.org/doc/rfc3821/) — julho de 2004, *Proposed Standard*, **vigente**; **atualizada** (não obsoletada) pela [RFC 7146](https://www.rfc-editor.org/info/rfc7146) (2014), quanto a IPsec v3 | **CORRIGIDO** — a atualização passou a constar, por simetria com o rigor aplicado ao par 5661/8881 |
| FCoE — FC-BB-5 = ANSI/INCITS 462-2010; DCB (802.1Qbb PFC, 802.1Qaz ETS, DCBX) obrigatório; não roteável | T11 + IEEE | **OK** (com a citação corrigida — ver #34) |
| NVMe-oF — substitui o SCSI, não o meio | NVM Express | **OK** |
| Tabela NAS × SAN: travamento (NLM na v3, integrado a partir da v4, *oplocks*/*leases* no SMB); coerência *close-to-open* | RFCs + `nfs(5)` + [MS-SMB2] | **OK** |
| Silberschatz: SAN e NAS modernos combinam disco e SSD, com SSD como *cache* | Está no fim da **§12.4** (não na 12.2), literal: *"Modern SAN and NAS systems support the use of a combination of magnetic disks and SSDs, and they can be configured to use the SSDs as a cache for data that reside on magnetic disks."* | **OK — literal** (o relatório cita sem número de seção; não há erro a corrigir) |

## Seção 6.1–6.2 — AST

| Afirmação | Fonte | Veredito |
|---|---|---|
| Elmasri: definição de AST | §16.11.4, literal: *"automated storage tiering (AST), which automatically moves data between different storage types such as SATA, SAS, and solid-state drives (SSDs) depending on the need. The storage administrator can set up a tiering policy in which less frequently used data is moved to slower and cheaper SATA drives and more frequently used data is moved up to solid-state drives"* | **OK — literal** |
| Elmasri: EMC FAST como implementação de referência | §16.11.4, literal: *"EMC has an implementation of this technology called FAST (fully automated storage tiering) that does continuous monitoring of data activity and takes actions to move the data to the appropriate tier based on the policy."* | **OK — literal** |
| **Fatias (*slices*) de 256 MB** | [Dell EMC Unity: FAST Technology Overview, H15086.3](https://www.delltechnologies.com/asset/en-us/products/storage/industry-market/h15086-emc-unity-fast-technology-overview.pdf), fev./2021: "In a multi-tiered Pool, data from storage resources are spread across the tiers by FAST VP in **256 MB slices**"; e "Slice: A 256 MB unit of capacity" | **OK — literal** |
| ***Tiers*: Extreme Performance (Flash); Performance (SAS 10K/15K); Capacity (NL-SAS 7,2K)** | Mesmo *white paper*, §1.3.2: "Extreme Performance Tier: Consisted of Flash drives · Performance Tier: Consisted of Serial Attached SCSI (SAS) drives · Capacity Tier: Consisted of Near-Line SAS (NL-SAS) drives"; §1.3.3.2 confirma 15K/10K RPM e §1.3.3.3 confirma 7,2K RPM | **OK — literal** |
| **"Uma vez por hora, o FAST VP analisa os dados coletados e classifica cada fatia com base na temperatura"** | Mesmo *white paper*: "**Once an hour, FAST VP analyzes the data collected and ranks each slice, based on each slice's temperature**" | **OK — literal** |
| **Janela de relocação: padrão diário, das 17h à 1h** | Mesmo *white paper*: "By default, relocations are scheduled daily, between **5 PM** local time to the system, and **1 AM** of the next day"; e "By default, FAST VP is scheduled to run on every day of the week" | **OK — literal** |
| **Políticas: *Highest Available Tier*, *Auto-Tier*, *Start High then Auto-Tier* (padrão), *Lowest Available Tier*** | Mesmo *white paper*, §1.4.1: as quatro políticas, com "**Start High then Auto-Tier (Default/Recommended)**" | **OK — literal** |
| Distribuição de acesso enviesada justifica o AST | Argumento estrutural, declarado como tal | **OK** |

---

## Pendências para o grupo

1. ~~Conferir no exemplar impresso as passagens marcadas LIVRO.~~ **Fechado em 10/09/2026.**
   Os PDFs dos dois capítulos foram conferidos: **as 22 passagens de livro batem literalmente**,
   inclusive a do FCoE no Elmasri §16.11.3, de que a crítica da §4.7 depende. As quatro
   divergências da Tabela 8.1 (SATA-3 em gigabytes, NL-SAS, FCoE, Kinetic) estão todas
   confirmadas no original. Duas imprecisões de *localização* foram achadas e corrigidas: a
   definição de interface orientada a bloco está na §12.1 (não na 12.2), e o "20 a 100
   microssegundos" o livro atribui a SSDs em geral, sem particularizar NVMe.
2. **Regerar os artefatos**: `Estudo_NAS_SAN_Armazenamento_Fisico_SBD.pdf` (a partir do
   `relatorio.tex`) e `Slides_NAS_SAN_Armazenamento_SBD.pptx` (a partir do `slides.js`). O
   `verificar.py` sinaliza a defasagem: o `.tex` já diz 42 correções, o `.pptx` ainda diz 33.
3. Depois de regerar, `python verificar.py` deve fechar sem falhas.
