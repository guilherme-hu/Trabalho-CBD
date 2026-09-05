Li os dois arquivos na íntegra, refiz todas as contas e verifiquei 32 afirmações com busca web e com os PDFs dos dois livros anexados ao projeto. Segue a correção.

---

# PARTE 1 — Verificação factual independente

## 1.1 As três "correções ao material-fonte" (o ponto mais arriscado do trabalho)

| # | Afirmação do grupo | Veredito | Evidência |
|---|---|---|---|
| 1 | Silberschatz §12.2 escreve "SATA-3 nominally supports **6 gigabytes** per second, allowing data transfer speeds of up to 600 megabytes per second" | **CONFIRMADO — a correção do grupo está certa** | Texto literal do PDF anexado: *"The SATA-3 version of SATA nominally supports 6 gigabytes per second, allowing data transfer speeds of up to 600 megabytes per second, while SAS version 3 supports data transfer rates of 12 gigabits per second."* A conta de prova (6 Gb/s ÷ 8 × 8/10 = 600 MB/s) confere. Esta é a única das três correções que é indiscutível. |
| 2 | Elmasri §16.11.3 erra ao dizer "FCoE pode ser pensado como iSCSI sem o IP" | **CONFIRMADO na citação, mas a correção é parcialmente um espantalho** | A frase existe: *"The latest idea to enter the enterprise IP storage race is Fibre Channel over Ethernet (FCoE), which can be thought of as iSCSI without the IP."* **Mas o livro continua, na mesma frase e nas duas seguintes:** *"It uses many elements of SCSI and FC (just like iSCSI), but it does not include TCP/IP components. […] It takes advantage of a reliable ethernet technology that uses buffering and end-to-end flow control to avoid dropped packets."* Ou seja: a razão (2) do grupo ("o Ethernet exigido não é o Ethernet comum") **está no próprio livro**, três linhas depois da frase citada, e o grupo cortou a citação exatamente antes dela. Só a razão (3) — não-roteabilidade — é acréscimo genuíno. Apresentar como "tecnicamente incorreto por três razões" o que a fonte já qualifica em duas delas é o tipo de recorte que o professor vai identificar em trinta segundos, porque ele tem o livro. |
| 3 | Elmasri §16.2 escreve "SATA is now called NL-SAS for nearline SAS" | **CONFIRMADO — a correção está certa** | Texto literal: *"SATA transfer speeds underwent an evolution from 2002 to 2008, going from 1.5 Gbps (gigabits per second) to 6 Gbps. SATA is now called NL-SAS for nearline SAS."* A correção (NL-SAS = mídia/mecânica SATA + interface e protocolo SAS) procede, e a ressalva de que "NL-SAS" não é termo normativo do T10 é honesta. |
| 3b | "Elmasri §16.11.5 — Seagate Kinetic como o produto que viabilizou OSD: datado; o padrão de fato virou a API HTTP do S3" | **IMPRECISO como "atualização"** | O livro **já diz isso**: *"Object storage is the choice of many cloud offerings, such as Amazon's AWS (Amazon Web Service) S3, and Microsoft's Azure […] Openstack Swift is an open source project that allows one to use HTTP GET and PUT to retrieve and store objects — that's basically the whole API."* Vender como novidade ("o que efetivamente venceu foi um caminho diferente do proposto pelo T10") algo que a própria fonte registra é inflar o achado. |

**Correção que o grupo deixou passar e era grátis:** o mesmo capítulo do Elmasri diz *"The LTO (Linear Tape Open) consortium […] released the latest LTO-6 standard in 2012 […] at 2.5-TB cartridge with 160 MB/s transfer rate."* O relatório dedica uma seção inteira ao nível terciário com LTO-10 (30/40 TB, 400 MB/s) e **nunca confronta isso com o livro** — uma correção 12× em capacidade e 2,5× em taxa, no exato tópico da recomendação terciária, ignorada.

## 1.2 O bloco Fibre Channel / FCIA — onde o trabalho quebra

| # | Afirmação | Veredito |
|---|---|---|
| 4 | Tabela 6 reproduz literalmente o speedmap FCIA v21 (01/12/2016) | **CONFIRMADO como reprodução, mas incompleta.** Verifiquei o PDF v21: 1GFC 200/1,0625/1996/1997; 2GFC 400; 4GFC 800; 8GFC 1.600/8,5; 16GFC 3.200/14,025; 32GFC 6.400/28,05; 128GFC 25.600/4×28,05/2014/2016; 64GFC 12.800/28,9 PAM-4; 256GFC 51.200/4×28,9. Tudo confere. **Mas o v21 tem ainda quatro linhas que a Tabela 6 omite** (128GFC TBD/2020, 256GFC TBD/2023, 512GFC/2026, 1TFC/2029), sem indicar corte. "Reproduzida literalmente" e depois omitir 4 de 13 linhas é imprecisão de rótulo — o pecado que o trabalho diz combater. |
| 5 | "não conseguimos acessar diretamente o PDF numérico da v24 no momento do fechamento deste relatório" (declaração de lacuna, §4.2) | **FALSO.** A tabela numérica **completa** da v24 (julho/2023) está em HTML na própria página `fibrechannel.org/roadmap/`, aberta, sem PDF: 8GFC 1600 / 16GFC 3200 / 32GFC 6400 / 64GFC 12800 (28,9 PAM-4, mercado **2020**) / **128GFC 24850 (56,1 PAM-4, spec 2022, mercado 2024)** / **256GFC 49700 (112,2 PAM-4, spec 2025)** / 512GFC TBD 2029 / 1TFC TBD 2033. E o PDF numérico da **v23 (30/04/2020)** também abre normalmente em `fibrechannel.org/wp-content/uploads/2020/06/FCIA_SPEEDMAP_v23.pdf`. Declarar lacuna onde não há lacuna é pior do que ter o dado desatualizado: transforma um erro de pesquisa em uma afirmação falsa sobre a própria pesquisa. |
| 6 | **"O nome do produto codifica a taxa: X GFC entrega X × 100 MB/s por direção […] Esses são os números que importam"** — apresentado como "a âncora correta" (caixa em §4.2) | **FALSO a partir do 128GFC.** No speedmap vigente, 128GFC = 24.850 MB/s. 24.850 ÷ 2 = **12.425**, não 12.800. E 256GFC = 49.700 → 24.850 por direção, não 25.600. A convenção "X × 100 MB/s" quebra na Gen 8, e o grupo não percebeu porque publicou a tabela de 2016. |
| 7 | **"Há duas maneiras de expressar a velocidade de um enlace FC, e a diferença entre elas é de exatamente 2×"** (tese central da seção, repetida na Conclusão e no slide 12: "fator exatamente 2") | **IMPRECISO.** Vale para 8/16/32/64GFC (1.600÷800, 3.200÷1.600, 6.400÷3.200, 12.800÷6.400 = 2,00). **Não vale para 128GFC no speedmap atual**: 24.850 ÷ 12.800 = 1,94. O slide 30 exibe a "prova" do fator 2 usando exatamente as três gerações em que ele fecha, e omite a única em que não fecha. |
| 8 | "A FCIA não diz 'full duplex' em nenhum speedmap; a única nota de rodapé fala em dependência da carga útil" | **CONFIRMADO — e é o melhor momento do trabalho.** Verifiquei v21, v23 e v24: nenhum contém "full duplex" nem "per direction". A nota de rodapé existe **na v23/v24**: *"These numbers are representative of throughput values for the line rate and are payload dependent."* Ressalva: **essa nota não está na v21** (cuja única nota é `*Dates: Future dates estimated`), e o texto do relatório a atribui ao conjunto "os speedmaps" — passável, mas frouxo. |
| 9 | "Evidência (1): no material de apresentação da FCIA sobre o speedmap, a tabela que compara Ethernet e Fibre Channel lista 16 Gbit FC = 1.600 MB/s e 128 Gbit FC = 12.800 MB/s […] [10]" | **NÃO VERIFICÁVEL.** A referência [10] é o PDF do speedmap v21, que não contém tabela comparativa Ethernet×FC. A evidência aponta para documento diferente do citado. Em um relatório cuja tese é "rótulo é tão importante quanto valor", citar a fonte errada para a evidência da própria tese é grave. |
| 10 | FCIA 128GFC Q&A: "na versão de revisão pública da FC-PI-8 (revisão 1.4), ainda diz 12.800 MB/s como Data Rate" e a T11 optou por não atualizar | **CONFIRMADO literalmente.** Q&A da FCIA: *"In the public review version of FC-PI-8 (revision 1.4), it still says 12,800 MB/s as Data Rate (page 10). I take it, that changed?" — "We decided not to change this in the FC document."* |
| 11 | "dobrar exigiria uma taxa de linha de 115,6 Gb/s, considerada inviável para fechar o link budget [11]" | **CONFIRMADO literalmente.** *"A doubling of speed would have required a line rate of 115.6Gbps and the technical teams did not feel this was feasible to close the link budget."* |
| 12 | "128GFC exige o SFP112, que suporta 112 Gb/s" (atribuído "ao roadmap de 2023") | **NÃO VERIFICÁVEL na fonte citada.** O Q&A [11] não menciona SFP112, e o relatório **não dá número de referência** para essa afirmação. Segundo furo de proveniência. (Substancialmente é plausível — o v24 dá 112,2 GBd PAM-4 para 256GFC e 56,1 para 128GFC — mas "112 Gb/s por via" não foi verificado no documento citado.) |
| 13 | Codificação: 8b/10b até 8GFC; 64b/66b no 16GFC; 256b/257b + RS-FEC de 32GFC em diante (RS(528,514) no 32GFC); PAM-4 de 64GFC | **CONFIRMADO** (consistente com FC-PI-6/7 e com as linhas NRZ/PAM-4 do speedmap v23/v24). |
| 14 | Brocade G710: "Latency for locally switched ports is 460 ns (including FEC)" e "2000 dynamically allocated" frame buffers, Gen 7, 64G | **CONFIRMADO literalmente** no product brief da Broadcom. |
| 15 | FC-AL: 126 NL_Ports + 1 FL_Port = 127 endereços | **CONFIRMADO.** |

## 1.3 Protocolos, normas e documentação de fabricante

| # | Afirmação | Veredito |
|---|---|---|
| 16 | RFC 7143 (abr/2014) obsoleta a RFC 3720 (iSCSI) | **CONFIRMADO.** |
| 17 | RFC 8881 (2020) obsoleta a RFC 5661 (NFSv4.1) | **CONFIRMADO** (RFC 8881, agosto de 2020, obsoletes 5661). |
| 18 | RFC 8881: *"cada requisição compound ou cb_compound DEVE ser executada pelo receptor exatamente uma vez"* — apresentado entre aspas na Tabela 3 | **NÃO CONFIRMADO como citação literal.** O conceito (Exactly Once Semantics via sessões e reply cache) está na §2.10.1 e §2.10.6, mas não localizei essa sentença nessa forma nas versões acessíveis; a formulação normativa é condicionada a "sent with a leading SEQUENCE or CB_SEQUENCE operation", condição que a citação do relatório omite. **Citação sob suspeita de truncamento.** |
| 19 | RFC 3821 (jul/2004) = FCIP; FC-BB-5 = ANSI/INCITS 462-2010; FC-BB-6 acrescenta VN2VN | **CONFIRMADO.** |
| 20 | Microsoft: "SMBv1 não é instalado por padrão em nenhuma edição do Windows 11 ou do Windows Server 2019 e versões posteriores" e "a partir do Windows 10 Fall Creators Update e do Windows Server 2019, o SMBv1 não é mais instalado por padrão" | **CONFIRMADO literalmente.** A precisão do grupo (o primeiro Server sem SMBv1 foi a versão 1709 do canal semianual) também está no próprio documento: *"SMBv1 is not installed by default in Windows 10 version 1709, Windows Server version 1709, and later versions."* |
| 21 | SQL Server: suporte a SMB fileshare desde 2012 para bancos de sistema e de usuário; FULL CONTROL; FILESTREAM não suportado; loopback/compartilhamentos administrativos/unidades mapeadas não suportados; SMB 3.0 transparent failover para carga crítica | **CONFIRMADO integralmente e literalmente** nos cinco pontos. |
| 22 | Oracle: "Direct NFS Client supports NFSv3, NFSv4, NFSv4.1, and pNFS"; integra o cliente NFS no software Oracle; faz fallback para o cliente do kernel | **CONFIRMADO literalmente** nos três pontos. |
| 23 | nfs(5): "The NFS protocol is not designed to support true cluster file system cache coherence without some type of application serialization"; "applications should use file locking"; "open their files with the O_DIRECT flag"; close-to-open | **CONFIRMADO literalmente.** |
| 24 | MySQL: definição do doublewrite buffer e recuperação após saída inesperada | **CONFIRMADO literalmente.** **Mas** o relatório generaliza: *"ambos podem ser desligados quando o dispositivo garante escrita atômica, o que o manual do MySQL menciona explicitamente para dispositivos com suporte a atomic writes"*. O manual é bem mais restrito: *"This feature is only supported on Fusion-io hardware and is only enabled for Fusion-io NVMFS on Linux."* **IMPRECISO por generalização.** |
| 25 | AFP: cliente depreciado no macOS 15.5; servidor removido no macOS 11 Big Sur; ausente nos betas do macOS 27 "Golden Gate" (jun/2026); SMB primário no macOS desde 10.9 Mavericks (2013) | **CONFIRMADO em substância.** O artigo do MacRumors de 17/06/2026 existe e diz: *"the first developer beta of macOS 27 Golden Gate contains no AFP client at all."* **Ressalva de citação:** o documento Apple 121011 é *"What's new for enterprise in macOS Sequoia"* (29/07/2025) e o texto que localizei é *"Apple Filing Protocol (AFP) client is deprecated and will be removed in a future version of macOS"* — o relatório e o slide 8 apresentam entre aspas *"has been deprecated as of macOS 15.5.0"*, formulação que não bate palavra por palavra. **Conferir antes da apresentação**; se não bater, é aspas em texto não literal, no slide em que o grupo se gaba de fidelidade de citação. |
| 26 | Dell EMC Unity FAST VP: fatia de 256 MB; "Once an hour, FAST VP analyzes the data collected and ranks each slice"; janela padrão diária 17h–1h; tiers Extreme Performance/Performance/Capacity; Start High then Auto-Tier como padrão recomendado | **CONFIRMADO integralmente e literalmente**, inclusive a janela: *"By default, relocations are scheduled daily, between 5 PM local time to the system, and 1 AM of the next day."* Melhor extração de fonte de fabricante do trabalho. |
| 27 | LTO-10: "30 TB and 40 TB native capacity", "75 TB and 100 TB respectively with a 2.5:1 compression ratio", "maximum transfer speeds of 400 MBps (native) and 1,200 MBps (compressed at 2.5:1 using the 32Gb Fibre Channel interface)" | **CONFIRMADO literalmente — e a inconsistência apontada pelo grupo é real.** 400 × 2,5 = 1.000 ≠ 1.200. Este é, de longe, o achado mais sólido do trabalho. |
| 28 | S3: "strong read-after-write consistency automatically", valendo para listagem; durabilidade projetada de 11 noves | **CONFIRMADO literalmente:** *"After a successful write of a new object or an overwrite of an existing object, any subsequent read request immediately receives the latest version of the object. S3 also provides strong consistency for list operations."* |
| 29 | S3 Glacier: Deep Archive "$0.00099 per GB-month (or $1 per TB-month)", recuperação 12–48 h; Instant Retrieval em milissegundos; Flexible Retrieval padrão 3–5 h | **CONFIRMADO literalmente nos quatro números.** |
| 30 | Aurora SIGMOD 2017: 27.378.000 × 780.000 transações; 0,95 × 7,4 IOs/transação; "35 times more transactions"; "the log is the database"; "the only writes that cross the network are redo log records"; segmentos de 10 GB; quórum V=6/Vw=4/Vr=3; reparo de segmento em 10 s a 10 Gb/s | **CONFIRMADO** em todos os itens. **Mas com omissão de rótulo grave:** o artigo diz *"Over the 30-minute period"*. Nem o relatório nem o slide 23 dizem que 27.378.000 e 780.000 são **totais de uma janela de 30 minutos** — apresentam como se fossem grandezas absolutas de "Transações". É exatamente a categoria de erro (número certo descrevendo outra coisa) que o trabalho define como sua especialidade. |
| 31 | CERN: "one petabyte of data per day" processado no Run 2; "more than 600 petabytes" no Run 3; EOS "exceed seven billion files (as of June 2022)" | **CONFIRMADO literalmente**, e a distinção "process ≠ grava" está correta. **Ressalva:** a página do CERN citada **não menciona CTA nem Ceph**; a frase "a arquitetura combina EOS, CTA e Ceph [24]" apoia-se na referência [24] (artigo do CTA no CHEP 2024), que não cobre o Ceph. Afirmação parcialmente sem lastro. |
| 32 | Dropbox: "Moving 500 petabytes of user data into our Magic Pocket"; "We now serve 90% of our customer data on Magic Pocket"; jul/2016; o texto não nomeia o S3 | **CONFIRMADO integralmente**, inclusive a ressalva de que o S3 vem da imprensa. Excelente. |

## 1.4 Derivações aritméticas — refiz TODAS

| Conta | Resultado | Veredito |
|---|---|---|
| 14,025 × 64/66 = 13,60 Gb/s; ÷8 = 1.700 MB/s | 13,6000; 1,7000 | ✅ exato |
| 1.700 vs 1.600 → excesso | 6,25% (relatório diz 6,3%) | ✅ arredondamento correto |
| 6 Gb/s ÷ 8 × 8/10 | 600 MB/s | ✅ |
| RTT = 2×10⁵ m ÷ 2×10⁸ m/s | 1,0 ms / 100 km | ✅ |
| 256 MiB ÷ 16 KiB | 16.384 exatos; em MB decimais, 15.625 | ✅ ambos conferem |
| 40×10¹² ÷ 400×10⁶ | 100.000 s = 27,78 h | ✅ (com o cartucho de 30 TB seriam 20,8 h — o grupo escolhe o número maior sem dizer) |
| 10⁷ × 10⁻¹¹ | 10⁻⁴/ano = 1 perda / 10.000 anos | ✅ |
| 27.378.000 ÷ 780.000 | 35,10 | ✅ |
| 7,4 ÷ 0,95 | 7,7895 → 7,8 | ✅ (a "divergência" com o 7,7 do artigo é integralmente explicada pelo arredondamento das próprias entradas: 7,35/0,955 = 7,70. O grupo registra a divergência mas não faz essa análise, e a apresenta como achado) |
| 0,92 µs ÷ 20 µs | 4,6% | ✅ aritmeticamente — **mas metodologicamente furado**, ver Parte 2, Q7 |
| 400 × 2,5 = 1.000 ≠ 1.200 | ✅ | achado real |
| 3.200 ÷ 1.600 = 2,00 | ✅ para 8/16/32/64GFC | ❌ falha em 128GFC (24.850 ÷ 12.800 = 1,94) |
| Post-Mortem: 11 ressalvas + 3 IMPRECISO + 1 FALSO + 1 NÃO VERIFICÁVEL | **16**, não as "14 correções aplicadas" que a Tabela 19 declara | ❌ **a única conta do trabalho que não fecha é a do próprio Post-Mortem** |

---

# PARTE 2 — Perguntas que encurralam o apresentador

## Bloco Fibre Channel (o mais perigoso — três perguntas ALTO risco seguidas)

**Q1 — Slide 12 / Tabela 6. "Vocês publicam o speedmap v21, de dezembro de 2016, e escrevem que não conseguiram acessar a tabela numérica da v24. Eu acabei de abrir a v24 em HTML na página `fibrechannel.org/roadmap/`. O que exatamente vocês tentaram acessar?"**
- *Por que é perigosa:* o grupo declarou uma lacuna que não existe, e a metodologia deles trata "declarar a lacuna" como resultado. Aqui a declaração é falsa.
- *Resposta correta:* não há defesa técnica. A resposta honesta é reconhecer o erro de pesquisa e apresentar a tabela vigente: 128GFC = 24.850 MB/s a 56,1 GBd PAM-4 (spec 2022, mercado 2024); 256GFC = 49.700 a 112,2 GBd; 64GFC com disponibilidade de mercado em 2020, não 2019.
- **Risco: ALTO.**

**Q2 — Slide 12. "Vocês afirmam que a diferença entre a FCIA e a T11 é 'de exatamente 2×'. No speedmap vigente, 128GFC = 24.850 MB/s. Metade disso é 12.425. Por que não é 12.800?"**
- *Por que é perigosa:* destrói a tese central da seção de FC e a segunda das três conclusões do trabalho.
- *Resposta correta:* porque a convenção "X GFC = X × 100 MB/s" é nomenclatura de marketing herdada, não uma identidade física, e ela deixa de fechar na Gen 8 — o 128GFC entrega ~99,4 Gb/s de vazão por direção sobre uma via de 112,2 Gb/s. A própria FCIA registra que a geração quebrou a tradição de dobrar porque 115,6 Gb/s era inviável. A leitura "exatamente 2×" só vale de 1GFC a 64GFC.
- **Risco: ALTO.**

**Q3 — Slide 12 / §4.2. "Vocês dizem que a única nota de rodapé da FCIA fala em dependência da carga útil. Em qual versão do speedmap está essa nota?"**
- *Por que é perigosa:* a nota (*"These numbers are representative of throughput values for the line rate and are payload dependent"*) está na v23 e na v24. A v21, que eles reproduzem, tem uma única nota, sobre datas estimadas.
- *Resposta correta:* v23/v24. O texto deveria dizer isso.
- **Risco: MÉDIO.**

**Q4 — §4.2, "Evidência (1)". "Vocês citam a referência [10] — o PDF do speedmap v21 — para uma tabela que compara Ethernet e Fibre Channel. Em que página do v21 está essa tabela?"**
- *Por que é perigosa:* o v21 não tem essa tabela. A evidência da tese aponta para o documento errado.
- *Resposta correta:* a comparação vem de material de apresentação da FCIA, não do speedmap; a referência está mal atribuída.
- **Risco: ALTO.**

**Q5 — §4.2. "Se a convenção da T11 é a âncora correta, e o próprio FC-PI-8 rev. 1.4 diz 12.800 MB/s para o 128GFC, e a FCIA vigente diz 24.850 — quem está publicando full-duplex e quem está publicando por direção?"**
- *Resposta correta:* ninguém declara. 24.850 não é o dobro de 12.800; o número da norma é herdado e a T11 decidiu não atualizá-lo. A leitura full-duplex é inferência, e a inferência não fecha na geração atual.
- **Risco: ALTO.**

**Q6 — Slide 12 / Tabela 5. "O 64GFC roda a 28,9 GBd com PAM-4. PAM-4 carrega dois bits por símbolo. Refaça a conta do 16GFC para o 64GFC e me diga quanto dá."**
- *Por que é perigosa:* o slide mostra a conta só para o 16GFC (NRZ, 64b/66b). Para o 64GFC é 28,9 × 2 = 57,8 Gb/s × 256/257 ÷ 8 ≈ 7.190 MB/s por direção, contra os 6.400 nominais — mesmo excesso de ~12%. O aluno que decorou a conta do slide vai dividir por 8 sem multiplicar por 2 e errar por um fator 2.
- **Risco: ALTO.**

**Q7 — Slide 11 / §4.3 / Conclusão. "Os 460 ns são, no datasheet, de 'locally switched ports' — portas comutadas dentro do mesmo ASIC. Vocês multiplicam por 2 saltos. Dois saltos ainda são 'locally switched'? E onde entra a latência do array?"**
- *Por que é perigosa:* dois saltos implicam ISL, que não é comutação local. E, sobretudo, o denominador está errado: comparar a rede com a latência da **mídia** (20–100 µs) ignora a controladora do array, que tipicamente responde em 100–500 µs. O "<5% do tempo do acesso" é o argumento quantitativo central do trabalho e aparece três vezes (§4.3, §8.1, Conclusão, slide 22, slide 27).
- *Resposta correta:* 460 ns valem para um salto local; um caminho real soma HBA, ISL, propagação de cabo e serviço da controladora. A conclusão qualitativa (a rede saiu do caminho crítico) sobrevive; o número "<5%" é otimista e mal rotulado.
- **Risco: ALTO.**

## Bloco NAS / protocolos

**Q8 — Slide 7. "Pela sua tabela, o NFSv4.2 é de 2016 e o NFSv4.1 é de 2020. O 4.2 veio antes do 4.1?"**
- *Por que é perigosa:* a coluna "Norma" mistura data da RFC vigente com cronologia do protocolo. NFSv4.1 é de 2010 (RFC 5661), reeditado em 2020 (RFC 8881); NFSv4.0 é de 2000/2003 (RFC 3010/3530), reeditado em 2015 (RFC 7530). A tabela, lida como linha do tempo, inverte a ordem.
- *Resposta correta:* as datas são das RFCs vigentes, não da introdução das versões.
- **Risco: ALTO** — o slide induz o erro e não há nota explicando.

**Q9 — Slide 7. "Vocês citam a RFC 8881 entre aspas: 'cada requisição compound ou cb_compound DEVE ser executada pelo receptor exatamente uma vez'. Sob que condição a RFC impõe isso?"**
- *Resposta correta:* a garantia é do mecanismo de sessão + reply cache, e vale para COMPOUND enviado com uma operação SEQUENCE/CB_SEQUENCE à frente. A citação, como está, omite a condição.
- **Risco: MÉDIO-ALTO.**

**Q10 — Slide 8. "Explique como o AFP funciona. Não o que aconteceu com ele — como ele funciona."**
- *Por que é perigosa:* o enunciado pede "como funciona cada uma das soluções" e lista o AFP entre os protocolos NAS. O trabalho tem quatro parágrafos sobre a **morte** do AFP e **zero** sobre seu funcionamento: nada sobre DSI sobre TCP/548, nada sobre o modelo AFP sobre ATP no AppleTalk, nada sobre como ele representa resource forks, nada sobre seu travamento.
- *Resposta correta:* o grupo não tem material para responder.
- **Risco: ALTO.** Esta é a maior lacuna de cobertura do trabalho.

**Q11 — Slide 6. "Vocês dizem que 'ao especificar SMB/CIFS num projeto novo em 2026, o que se está de fato especificando é SMB 3'. Que dialeto um NAS Linux com Samba negocia por padrão hoje, e o que acontece se o cliente for um Windows Server 2016 e o servidor só oferecer 3.0.2?"**
- *Por que é perigosa:* o slide lista dialetos mas nunca explica a negociação (NEGOTIATE / pré-autenticação com integridade no 3.1.1).
- **Risco: MÉDIO.**

**Q12 — Slide 7 / §3.4. "Vocês dizem que o NFS é 'o protocolo NAS que efetivamente aparece em instalações sérias de banco de dados'. Como o cliente NFS do kernel se comporta quando o servidor some por 30 segundos, e que opção de montagem decide isso?"**
- *Por que é perigosa:* o requisito 5 do slide 4 é exatamente esse ("bloqueia, erra, ou devolve sucesso falso?"), e o trabalho nunca responde. A resposta é `hard` vs `soft` (e `intr`/`timeo`/`retrans`), e a recomendação da Oracle e da NetApp para banco é `hard`.
- **Risco: ALTO** — o grupo levanta a pergunta no próprio slide e não a responde em lugar nenhum.

**Q13 — Tabela 4 / slide 9. "'Custo por terabyte útil menor, tanto de aquisição quanto de operação.' Menor quanto? Com que fonte?"**
- *Por que é perigosa:* o trabalho declara na §1.3 que **todo número tem proveniência**. Essa é uma afirmação comparativa de custo sem um único número, repetida em três tabelas e na recomendação final.
- *Resposta correta:* não há dado no trabalho. É a violação mais direta da própria metodologia.
- **Risco: ALTO.**

## Bloco SAN

**Q14 — Slide 10 / §4.4. "Descreva a sequência de quadros de um comando de leitura FCP: quem manda o quê, em que ordem."**
- *Por que é perigosa:* FCP_CMND → FCP_DATA → FCP_RSP (e FCP_XFER_RDY na escrita) não aparece em nenhum lugar do relatório nem dos slides, embora o item 1 do enunciado seja "como funciona".
- **Risco: ALTO.**

**Q15 — Slide 10. "Vocês citam 2.000 buffers do G710. Quantos BB_Credits são necessários para encher um enlace de 32GFC a 10 km com quadros de 2 KB?"**
- *Por que é perigosa:* é a conta clássica de dimensionamento de FC e o trabalho cita BB_Credit como "ordem de grandeza" sem nunca usá-lo. Ordem de grandeza: 10 km ≈ 50 µs de propagação; a 3.200 MB/s isso são ~160 KB em voo, ≈ 80 quadros de 2 KB só para a ida, e o dobro contando o retorno de crédito.
- **Risco: ALTO** — e é a pergunta que liga a distância de 10 km do Elmasri à mecânica de créditos que eles descrevem.

**Q16 — Slide 11. "Vocês dizem que a fabric escala a 'milhões de endereços (24 bits)'. Quantos switches uma fabric FC real suporta?"**
- *Resposta correta:* o espaço é de 2²⁴, mas o campo Domain_ID tem 239 valores válidos e os fornecedores suportam tipicamente algumas dezenas de domínios por fabric. "Milhões de endereços" é verdade teórica e falsidade prática.
- **Risco: MÉDIO.**

**Q17 — Slide 14. "Se o FCIP funde as duas fabrics, por que a replicação síncrona a 100 km é inviável mas o próprio túnel não é?"**
- *Por que é perigosa:* testa se o apresentador entende que a derivação de 1 ms/100 km é sobre o **commit**, não sobre o transporte; o túnel funciona, o que não funciona é pendurar o commit nele.
- **Risco: MÉDIO.**

**Q18 — Slide 15 / slide 26. "Vocês corrigem o Elmasri por dizer que o FCoE 'é iSCSI sem o IP', e a razão 2 de vocês é que ele exige Ethernet sem perdas. O livro diz, duas frases depois: 'It takes advantage of a reliable ethernet technology that uses buffering and end-to-end flow control to avoid dropped packets.' Vocês leram o parágrafo inteiro?"**
- *Por que é perigosa:* é a pergunta que o professor **vai** fazer, porque ele tem o livro aberto. Duas das três razões da "correção" já estão na fonte.
- *Resposta correta:* apenas a razão 3 (não-roteabilidade em L3) é acréscimo genuíno; a correção deveria ter sido enunciada como "a analogia é imprecisa em um ponto que o livro não cobre", não como "tecnicamente incorreta por três razões".
- **Risco: ALTO.**

**Q19 — Slide 15. "A referência que sustenta a citação 'FCoE is not routable at the IP layer' é a Wikipédia. Vocês corrigem um livro-texto com a Wikipédia?"**
- *Resposta correta:* a afirmação é correta e derivável do FC-BB-5 (o FCoE é um Ethertype, 0x8906, sem cabeçalho IP), mas a referência deveria ser a norma ou o próprio encapsulamento, não um verbete.
- **Risco: ALTO** — e é um golpe barato que o professor não vai perder.

## Bloco AST / Object Storage

**Q20 — Slide 19. "Vocês dizem que a tensão AST × buffer manager 'nenhum dos três livros menciona' e que 'nenhum livro faz essa ligação'. Que busca vocês fizeram na literatura fora dos livros antes de afirmar isso?"**
- *Por que é perigosa:* é um negativo universal não verificado, e a interação entre tiering de array e cache de SGBD é discutida em documentação de fabricante (as próprias recomendações da Dell/EMC sobre FAST VP e redo logs pressupõem isso).
- *Resposta correta:* a contribuição é boa, mas o que é original é a **articulação**, não a observação. "Nenhum dos três livros da disciplina" seria defensável; "nenhum livro" e "ninguém menciona" não são.
- **Risco: ALTO** — porque o grupo apresenta este slide como sua contribuição própria.

**Q21 — Slide 19 vs slide 27. "No slide 19 o fator é 16.384× usando página de 16 KiB. Na conclusão vocês dizem 8 KiB. Qual é o fator com 8 KiB?"**
- *Resposta correta:* 32.768×. O trabalho oscila entre as duas páginas e usa sempre o divisor que dá o número menor, sem dizer.
- **Risco: MÉDIO.**

**Q22 — Slide 18. "O white paper da Dell fala em fatias de 256 MB. MB ou MiB? Vocês construíram a conclusão inteira sobre essa leitura."**
- *Por que é perigosa:* o grupo declara a convenção (adotam MiB) — é a resposta certa e eles a têm. É a pergunta que eles **vão** acertar, e por isso vale para calibrar.
- **Risco: BAIXO.**

**Q23 — Slide 20. "Vocês dizem que o objeto não admite atualização parcial. E o multipart upload e o `Range` GET do S3? O que exatamente é impossível?"**
- *Resposta correta:* leitura parcial (`Range`) existe; **escrita** parcial no lugar não existe — não há `PUT` de offset. O slide diz "Atualização parcial: NÃO — o objeto é substituído inteiro", o que está certo, mas o apresentador precisa saber separar leitura de escrita.
- **Risco: MÉDIO.**

**Q24 — Slide 21. "Vocês dizem que a origem acadêmica é CMU 1996 e OceanStore 2000. Qual é o mecanismo do NASD de Gibson que fez o object storage escalar?"**
- *Por que é perigosa:* o trabalho copia a genealogia do Elmasri sem nunca dizer o que o NASD propôs (separar o caminho de metadados/autorização do caminho de dados, entregando ao cliente uma capability para falar direto com o disco) — que é, aliás, exatamente a mesma ideia do pNFS que eles citam no slide 7. A ligação entre os dois nunca é feita e seria o melhor momento intelectual do trabalho.
- **Risco: ALTO.**

## Bloco recomendação / nível terciário / exemplos

**Q25 — Slide 24 / §8.3. "Como se faz backup de um NAS? Qual é o protocolo?"**
- *Por que é perigosa:* **NDMP não aparece uma única vez** no relatório nem nos slides. É o protocolo padrão de backup de NAS e o elo natural entre "NAS", "SAN" e "nível terciário" — exatamente o item 6 do enunciado.
- **Risco: ALTO.**

**Q26 — §2.1 / slide 24. "Vocês afirmam que 'NAS e SAN são, ambos, tecnologias de nível secundário'. Então qual é a recomendação NAS × SAN para o nível terciário, que é o que o enunciado pede?"**
- *Por que é perigosa:* a §8.3 troca a pergunta por "fita × objeto" e nunca responde a que foi feita. A saída boa existe e o grupo quase a tem (a biblioteca de fitas é dispositivo de SAN, o backup em disco fica no NAS), mas nunca é formulada como recomendação.
- **Risco: ALTO.**

**Q27 — Slide 23. "780.000 e 27.378.000 transações em quanto tempo?"**
- *Resposta correta:* 30 minutos, numa carga SysBench só de escrita, no experimento específico do artigo. **Nem o slide nem o relatório dizem.**
- *Por que é perigosa:* é o próprio erro de rótulo que o trabalho define como sua especialidade, cometido no slide seguinte ao que se gaba da conferência de contas.
- **Risco: ALTO.**

**Q28 — Slide 24. "27,8 horas para ler um cartucho cheio a 400 MB/s. Um drive LTO sustenta 400 MB/s do começo ao fim de um cartucho de 40 TB?"**
- *Resposta correta:* não — a taxa é máxima e comprimida de forma variável; sem alimentação constante o drive faz *shoe-shining* e a taxa efetiva despenca. As 27,8 h são um piso, não uma estimativa.
- **Risco: MÉDIO.**

**Q29 — Tabela 15 / slide 26. "'Dados de banco já comprimidos frequentemente não passam de 1,2:1.' Fonte?"**
- *Resposta correta:* não há. É um número sem proveniência num relatório cuja regra fundadora é que todo número tem proveniência.
- **Risco: ALTO.**

**Q30 — Slide 25. "Dos seus cinco 'exemplos reais', três (Aurora, dNFS, SQL Server sobre SMB) já foram apresentados como argumentos nas seções anteriores. Qual é o exemplo de uma instalação real que escolheu NAS ou SAN para um banco de dados, e por quê?"**
- *Por que é perigosa:* o item 7 do enunciado pede exemplos reais; o que existe são dois casos de escala (CERN, Dropbox) que não são bancos relacionais e três reciclagens de seções anteriores. Nenhum caso de decisão real de arquitetura.
- **Risco: ALTO.**

## Bloco Post-Mortem

**Q31 — Slide 32. "Vocês dizem 43 CONFIRMADO, dos quais 11 exigiram ajuste, mais 3 IMPRECISO, 1 FALSO e 1 NÃO VERIFICÁVEL. Isso dá 16 correções. Por que a linha do total diz 14?"**
- *Resposta correta:* não fecha. É a única conta do trabalho que o próprio grupo não refez.
- **Risco: ALTO** — o slide vive de credibilidade metodológica.

**Q32 — Tabela 18 / slide 31. "Na coluna 'Detectado por', 14 dos 18 erros dizem 'Rodada adversarial' — outra IA. Quatro dizem 'Grupo'. O enunciado pede quem corrigiu o que a IA fez de errado. Quem, nominalmente, corrigiu o quê?"**
- *Por que é perigosa:* pela contabilidade do próprio grupo, a IA corrigiu a IA em 78% dos casos, e nenhuma linha da tabela nomeia uma pessoa. A demonstração de autoria fica frágil exatamente onde o enunciado é mais explícito.
- **Risco: ALTO.**

**Q33 — §13.1. "Vocês escrevem que 'nenhuma delas era detectável por leitura atenta, apenas por confronto com a fonte'. O erro #8 (126 vs 127 endereços), o #13 (MB vs MiB) e o #14 (1.700 vs 1.600) são detectáveis por leitura atenta?"**
- *Resposta correta:* sim — três dos dezoito são erros de aritmética ou de convenção, detectáveis sem fonte alguma. A frase é uma generalização retórica.
- **Risco: MÉDIO.**

**Q34 — Slide 33. "O slide remete à 'Seção 12.3 do relatório'. A Seção 12 é 'Questões em aberto'."**
- *Risco: BAIXO*, mas é o tipo de descuido que corrói a confiança num trabalho que se vende como rigoroso.

---

# PARTE 3 — Defeitos, por gravidade

## Gravíssimos

**D1. Declaração de lacuna falsa sobre o speedmap da FCIA (§4.2).** *"não conseguimos acessar diretamente o PDF numérico da v24 no momento do fechamento deste relatório"* — a tabela v24 está em HTML na página `fibrechannel.org/roadmap/`, e o PDF da v23 abre normalmente. O trabalho ergue a "declaração de lacuna" a princípio metodológico ("Declarar a lacuna é resultado, não falha") e depois declara uma lacuna inexistente. Isso é pior do que publicar o dado desatualizado, porque contamina a credibilidade de todas as outras declarações de lacuna (Kinetic, macOS 27, vídeo da aula).

**D2. A tese "fator exatamente 2×" é falsa na geração vigente.** 128GFC = 24.850 MB/s no speedmap atual; 24.850 ÷ 2 = 12.425 ≠ 12.800. A tese é apresentada como a segunda das três conclusões do trabalho (§11: *"a FCIA publica throughput full-duplex e a norma T11 publica por direção, diferença de exatos 2×"*), reaparece no slide 12 ("fator exatamente 2"), no slide 27 e no slide 30. Ela vale para 1GFC–64GFC e cai na Gen 8.

**D3. Correção ao Elmasri sobre FCoE construída sobre citação recortada.** Duas das três razões da "correção" (encapsulamento de quadros FC; exigência de Ethernet sem perdas) estão no próprio parágrafo do livro, imediatamente após o trecho citado. Recortar a citação antes da parte que enfraquece a correção é o defeito mais sério de honestidade intelectual do trabalho — e é o mais fácil de detectar, porque o professor tem o livro.

**D4. Aurora sem a janela de 30 minutos.** Os números 780.000 e 27.378.000 são totais de um experimento de 30 minutos com carga SysBench só de escrita. O relatório (§8.2) e o slide 23 os apresentam como "Transações", sem período e sem carga. O slide 23 é literalmente o slide da "Conferência da conta". Erro de rótulo no slide dedicado ao rigor de rótulo.

**D5. Números comparativos de custo sem nenhuma proveniência.** "Custo por terabyte útil menor", "Custo relativo: Menor / Maior", "Menor no longo prazo", "dados já comprimidos raramente passam de 1,2:1", "uma fração pequena dos blocos concentra a maioria esmagadora dos acessos" — cinco afirmações quantitativas ou quase-quantitativas, todas sem fonte, todas em tabelas que sustentam a recomendação final. A §1.3 promete cinco categorias de proveniência para "todo número publicado"; essas afirmações não estão em nenhuma.

## Graves

**D6. AFP tratado só como obituário.** O enunciado pede "como funciona cada uma das soluções" e lista o AFP. O trabalho tem uma linha do tempo de fim de vida e nada sobre mecânica: DSI, porta 548, resource forks (mencionados de passagem), travamento, descoberta. A decisão de não fabricar um caso de uso de banco é correta e honesta; a decisão de não explicar o protocolo não é — são coisas diferentes, e o grupo confundiu as duas.

**D7. "Como funciona" é raso em quatro dos oito protocolos.** Não há fluxo FCP (CMND/XFER_RDY/DATA/RSP), não há mecânica iSCSI (R2T, dados imediatos, digests, MC/S × MPIO), não há RPC/XDR do NFS, não há negociação/oplocks do SMB. O trabalho é forte em **taxonomia, norma e consequência** e fraco em **mecanismo** — que é o primeiro item do enunciado.

**D8. NDMP ausente; RAID ausente; multipath quase ausente; snapshot consistente ausente.** Quatro assuntos que qualquer avaliador espera num trabalho de NAS × SAN para SBD:
- **NDMP** é o protocolo de backup de NAS e a ponte natural para o nível terciário — zero menções.
- **RAID** ocupa toda a §16.10 do Elmasri, o capítulo-âncora do trabalho, e aparece aqui só como "pools protegidos por RAID". A penalidade de escrita do RAID 5 sobre redo log é um clássico da disciplina.
- **Multipath / ALUA** aparece como uma palavra numa tabela; é o mecanismo que faz a SAN sobreviver a falha de caminho, e o slide 4 levanta exatamente esse requisito.
- **Backup consistente de banco** (crash-consistent × application-consistent, hot backup mode, VSS) — "instantâneos e clones no nível de arquivo, com granularidade compreensível" é a única menção, e ela não explica nada.

**D9. Nível terciário não responde à pergunta do enunciado.** A §8.3 troca "NAS ou SAN no nível terciário" por "fita ou objeto". A observação de que a biblioteca LTO-10 é um dispositivo de SAN (via FC 32 Gb) é excelente e está lá — mas nunca vira recomendação. O item 6 do enunciado fica meio-respondido.

**D10. Exemplos reais fracos (item 7).** Cinco itens, três dos quais são referências cruzadas a argumentos já usados. Nenhum é uma decisão real de arquitetura NAS × SAN numa instalação de banco de dados. Nenhum é brasileiro, nenhum é acadêmico, nenhum é uma migração documentada com antes/depois. O critério declarado ("só documentação primária verificável") é uma boa decisão metodológica que produziu um resultado pobre.

**D11. Post-Mortem: a autoria não se sustenta.** Tabela 18 atribui 14 dos 18 erros à "rodada adversarial" (outra IA) e 4 ao "Grupo", sem nomear ninguém em nenhuma linha. A Tabela 17 dá a cada integrante exatamente uma seção e exatamente uma decisão, com justificativas todas do mesmo comprimento e do mesmo formato retórico — lê-se como construído depois, não como registro. Não há datas, versões, histórico de revisão ou qualquer artefato que comprove a divisão. O enunciado é explícito: "demonstração de autoria — quem fez o quê, quem decidiu o quê e por quê" e "quem corrigiu o que a IA fez de errado". A resposta honesta que emerge dos próprios dados do grupo é: a IA corrigiu a IA.

**D12. A aritmética do Post-Mortem não fecha.** 11 ressalvas + 3 IMPRECISO + 1 FALSO + 1 NÃO VERIFICÁVEL = 16 correções; a Tabela 19 declara 14. O trabalho inteiro se organiza em torno de "refazer toda conta citada", e a única que não foi refeita é a do próprio processo.

**D13. Log de prompts insuficiente.** O enunciado pede "log dos prompts-chave". A Tabela 16 traz 6 entradas, cinco delas resumidas ou parafraseadas ("Série de prompts de pesquisa dirigida", "Quatro perguntas de escopo"), e só o prompt adversarial aparece na íntegra. Isso é um sumário de prompts, não um log.

**D14. Referências: dois furos e um constrangimento.**
- A cobertura de março de 2016 sobre a Seagate Kinetic (§7.2) é citada **sem número de referência**. (Ela existe: The Register, 17/03/2016 — *"its HGST unit spent a year trying to find worthwhile use cases for Kinetic drives with its customers, and drew a blank"*.)
- O "roadmap de 2023" com o SFP112 é citado **sem número de referência**.
- A referência [7] é a **Wikipédia**, e é ela que sustenta a citação usada para corrigir o livro-texto no slide 15 e na Tabela 15.
- A referência [24] (CTA no CHEP 2024) é usada para amparar uma afirmação sobre **Ceph**.
Quatro problemas de proveniência num relatório cujo título metodológico é proveniência.

## Médios

**D15. Slides densos demais para serem apresentados.** Diagnóstico slide a slide:
- **Slide 12** (velocidades FC): tabela 6×5 + duas frases de conta + um parágrafo de alerta + nota de proveniência. É o slide que o próprio grupo chama de "maior risco de pergunta" e é o mais ilegível.
- **Slide 16** (todos os protocolos): 8 linhas × 6 colunas. Ninguém lê isso projetado. Funciona como página de relatório, não como slide.
- **Slide 24** (terciário): tabela 5×3 + três parágrafos densos, um deles com quatro contas. Provavelmente 200 palavras.
- **Slide 30** (derivações): nove fórmulas numa tabela. Como slide de backup é defensável; como objeto visual, é ilegível.
- **Slides 6, 7, 17, 18, 22, 26, 29**: todos tabela + parágrafo de fechamento + rodapé de fonte.
Contagem: 34 slides, dos quais **onze são tabelas densas** e **um único é uma figura** (slide 3). Para uma apresentação com debate, isso é um relatório projetado.

**D16. Só uma figura em 34 slides.** Falta o que mais ajudaria: um diagrama da pilha de encapsulamento comparando SCSI/FC, SCSI/TCP/IP (iSCSI), FC/TCP/IP (FCIP) e FC/Ethernet (FCoE) lado a lado. Esse desenho responderia sozinho aos slides 13, 14 e 15 e eliminaria a confusão que o slide 14 tenta desfazer em prosa. Também falta um diagrama de fabric dupla (SAN A / SAN B), que o texto descreve e nunca mostra.

**D17. Slides de backup defendem o processo, não o conteúdo.** Os cinco backups (29–33) são: proveniência, derivações, erros da IA, rodada adversarial, autoria. Se o professor perguntar "como funciona o FCP" ou "o que é NPIV", não há backup nenhum. O grupo se blindou contra perguntas sobre método e ficou exposto a perguntas sobre matéria.

**D18. Cronologia enganosa das RFCs do NFS** (Tabela 3 e slide 7): coluna "Norma" mistura RFC vigente com data de introdução, produzindo v4.2 (2016) antes de v4.1 (2020). Corrigível com uma coluna a mais.

**D19. Inconsistência 8 KiB × 16 KiB no fator do AST.** Slide 19 e §6.3 usam 16 KiB (16.384×); a Conclusão e o slide 27 usam 8 KiB mas mantêm o discurso. Com 8 KiB o fator é 32.768×. O trabalho nunca escolhe.

**D20. Generalização indevida do manual do MySQL.** *"ambos podem ser desligados quando o dispositivo garante escrita atômica"* — o manual restringe a Fusion-io NVMFS em Linux.

**D21. Uso de latência de 2020 para argumento de 2026.** Os "20 a 100 µs" vêm do Silberschatz (edição 2020) e sustentam o cálculo do "<5%" apresentado como estado da arte em 2026, num trabalho que exige carimbo de data em número volátil. Latência de NVMe corporativo em 2026 é rotineiramente inferior a 20 µs — o que, aliás, **fortaleceria** o argumento inverso (a rede pesaria mais). O grupo usou o número que não é datado nem favorável ao próprio argumento.

**D22. Negativos universais não verificados.** "a tensão que ninguém menciona"; "nenhum dos três livros faz essa ligação"; "nenhum livro"; "Não existe SGBD relacional de porte suportado sobre AFP"; "Caso de uso real, e único" (FCIP). Nenhum é acompanhado de descrição da busca que o sustentaria. Alguns são provavelmente verdadeiros; nenhum é demonstrado.

## Menores, mas visíveis

**D23. Redundância retórica.** A tese "unidade de abstração" é enunciada seis vezes com palavras diferentes (Resumo, caixa §2.3, caixa §8.1, §11, slide 2, nota do slide 22). A citação do Silberschatz sobre SSD como cache em SAN/NAS aparece duas vezes (§5.1 e §6.3). A derivação do "<5%" aparece cinco vezes. O trabalho poderia perder 4 páginas sem perder conteúdo.

**D24. Fórmula retórica repetida.** Onze caixas destacadas seguem o mesmo molde: título provocativo + revelação + consequência. "A armadilha, com a proveniência declarada honestamente"; "A tensão que ninguém menciona"; "A observação que mais surpreende"; "Relevância para SBD: nenhuma, e isso é o achado"; "O ponto que decide tudo"; "A regra de decisão, em uma frase". É prosa de IA bem calibrada, e um leitor experiente reconhece o padrão. O conteúdo dentro delas costuma ser bom — o invólucro é que denuncia.

**D25. Tabela 15 mistura categorias.** Intitulada "Divergências encontradas no material-fonte", inclui LTO Program e FCIA, que não são material-fonte da disciplina. O Resumo diz "três correções ao material-fonte"; a tabela tem seis linhas. Slide 26 mostra três. Rotulagem inconsistente entre resumo, tabela e slide.

**D26. Referência cruzada errada** no slide 33 ("Seção 12.3" em vez de 13.3).

**D27. Numeração do roteiro** (slide 1): a sequência sai 1, 1, 2, 3, 4, 5, 6 — provável defeito de geração no pptxgenjs.

**D28. Glossário incompleto** para o vocabulário efetivamente usado: faltam ASM, CTA, DCBX, EOS, IVR, LIP, LTSC, MPIO, NDMP (que aliás não existe no texto), NPIV, SAC, VTL, WAFL, e as próprias siglas SBD e SGBD.

**D29. Post-Mortem depois das Referências.** Escolha de diagramação incomum que quebra a leitura e provavelmente causou o erro de referência cruzada do slide 33.

**D30. `verificar.py` como personagem.** O relatório atribui a um script a descoberta de que 400 × 2,5 ≠ 1.200. É uma multiplicação de uma cifra. Creditar isso a "verificação por script" e transformá-lo em "Duas camadas de verificação, dois tipos diferentes de erro" infla o processo — e é justamente o tipo de inflação que o Post-Mortem, no resto, evita bem.

---

# PARTE 4 — Nota

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| **Corretude factual** | 30% | **7,5** | Taxa de acerto altíssima: verifiquei 32 afirmações e ~27 conferem **literalmente**, incluindo as difíceis (LTO-10, FAST VP, Brocade, Aurora, CERN, Dropbox, SQL Server, dNFS, nfs(5), Microsoft SMB, Glacier, S3). Todas as onze derivações aritméticas fecham. As duas correções principais ao material-fonte (SATA-3 gigabytes/gigabits; SATA ≠ NL-SAS) estão **certas**, verificadas no PDF do próprio livro — isso vale muito. O que derruba a nota são três coisas, todas na mesma seção: a lacuna declarada que não existe (D1), a tese do fator 2× que a tabela vigente refuta (D2), e a correção ao Elmasri construída sobre citação recortada (D3). Somem-se o Aurora sem a janela de 30 min (D4), a citação da RFC 8881 provavelmente truncada, e a citação da Apple provavelmente não literal. Um trabalho que se apresenta como auditoria de rótulos não pode falhar em rótulos. |
| **Cobertura do enunciado** | 20% | **8,0** | Todos os 9 itens têm endereço, e a Tabela 1 (checklist literal) é a decisão estrutural mais inteligente do trabalho — um avaliador confere item a item em dois minutos. Os oito protocolos são linhas de tabela, como o enunciado exige. Perde por: AFP sem mecânica (D6); "como funciona" raso em FCP, iSCSI, NFS-RPC e SMB (D7); nível terciário que não responde a pergunta feita (D9); exemplos reais reciclados (D10); NDMP, RAID e multipath ausentes (D8). |
| **Profundidade analítica** | 20% | **8,0** | A tese da unidade de abstração é genuinamente boa e organiza tudo. A seção AST × buffer pool é a melhor do trabalho: a observação de que o AST vê a carga **filtrada** pelo buffer pool e pode classificar como frio o dado mais quente é original na articulação, correta e defensável em arguição. A distinção tiering × caching é precisa. A derivação de 1 ms/100 km é o tipo de conta que separa quem entende de quem copiou. O uso do dNFS como evidência empírica da tese é elegante. Perde por: nenhuma medição própria; nenhum TCO; afirmações comparativas de custo sem dado (D5); negativos universais (D22); o denominador errado do "<5%" (Q7); e a ligação NASD → pNFS, que estava ali de graça e não foi feita (Q24). |
| **Slides como material de apresentação** | 15% | **6,0** | É a maior fraqueza. 34 slides, 11 tabelas densas, **uma** figura. Slides 12, 16, 24 e 30 são impossíveis de apresentar — são páginas de relatório projetadas. As notas do apresentador são muito boas (específicas, antecipam perguntas, dizem o que destacar e o que não ler) e salvam a nota; sem elas seria 5. Falta o diagrama de encapsulamento que resolveria três slides de uma vez. Os backups defendem o método e deixam o conteúdo descoberto. Erro de referência cruzada e numeração quebrada no roteiro. |
| **Post-Mortem** | 10% | **7,0** | O tom é honesto e a taxonomia dos erros (desatualização / rótulo errado / excesso de confiança) é genuinamente útil e transferível — melhor do que a maioria dos post-mortems que vejo. Admitir erros próprios no corpo do texto (AFP, S3, CERN, Dropbox) é corajoso e conta a favor. Mas: a conta não fecha (16 × 14); o log de prompts é um sumário, não um log; a tabela de autoria é simétrica demais para ser verdadeira e não nomeia ninguém como detector; e a contabilidade do próprio grupo mostra a IA corrigindo a IA em 14 de 18 casos, o que é a resposta oposta à que o enunciado pede. |
| **Apresentação / forma** | 5% | **8,5** | LaTeX limpo, sumário, resumo com palavras-chave, referências categorizadas por tipo, glossário, folha de rosto correta com os seis nomes e DREs em ambos os produtos. Descontos por: Wikipédia como referência [7]; duas fontes sem número; Post-Mortem depois das referências; referência cruzada errada. |

## Nota final: **7,8**

## O que separaria este trabalho de um 10

Em ordem de retorno, e todos executáveis até 14/09:

1. **Refazer a Tabela 6 com o speedmap v24 (jul/2023)** e reescrever a caixa da armadilha. Trocar "diferença de exatamente 2×" por "diferença de 2× até o 64GFC, que a Gen 8 quebra: 128GFC = 24.850 MB/s, e 24.850 ÷ 2 = 12.425 ≠ 12.800". **Descobrir que a própria convenção de nomenclatura falha na geração vigente é um achado melhor do que o achado que vocês publicaram** — e transforma o pior defeito do trabalho na sua melhor página. Apagar a declaração de lacuna.
2. **Reescrever a correção do FCoE citando o parágrafo inteiro do Elmasri.** Reduzi-la a uma razão — a não-roteabilidade em L3 — e reconhecer explicitamente que o livro já registra a exigência de Ethernet confiável com controle de fluxo fim-a-fim. Uma correção honesta e menor vale mais do que três razões das quais duas não são correções. Trocar a referência [7] pela norma FC-BB-5 ou pelo próprio Ethertype 0x8906.
3. **Corrigir todos os rótulos que faltam:** "30 minutos, SysBench write-only" no Aurora; "locally switched port, um salto" na latência do G710; a latência do array no denominador do "<5%"; a condição SEQUENCE/CB_SEQUENCE na citação da RFC 8881; conferir palavra por palavra a citação da Apple.
4. **Dar proveniência aos números de custo** — ou apagá-los. Uma linha de tabela com uma faixa de preço datada de um array unificado e de um switch FC de 24 portas vale mais do que dez ocorrências de "menor custo". Se não houver fonte, aplicar a própria regra: "não encontrado".
5. **Escrever meia página sobre como o AFP funciona** (DSI sobre TCP/548, sessão, resource forks, travamento) antes de declarar sua morte, e uma página sobre o fluxo FCP e o NDMP. São três itens do enunciado hoje mal cobertos, e são baratos.
6. **Cortar o deck para ~22 slides**, mover as quatro tabelas densas para backup, e desenhar **uma** figura: a pilha de encapsulamento SCSI/FC × iSCSI × FCIP × FCoE lado a lado. É o melhor investimento visual disponível.
7. **Refazer a aritmética do Post-Mortem** (16, não 14) e nomear, em cada linha da Tabela 18, quem confirmou a correção contra a fonte. Se a resposta honesta for "a rodada adversarial encontrou e fulano conferiu na fonte primária", escrever isso — é uma demonstração de autoria melhor do que uma tabela simétrica.

O trabalho já está bem acima da média: a checklist literal, a disciplina de proveniência, as duas correções corretas ao livro, a seção de AST e o Post-Mortem confessional são material de nota alta. O que o impede de chegar lá é que o único bloco onde o método falhou é justamente aquele que o trabalho escolheu como vitrine do método.

Sources:
- [Silberschatz §12.1/§12.2 e Elmasri Cap. 16 — PDFs anexados ao projeto](https://claude.ai)
- [FCIA Official Speedmap v21 (01/12/2016)](https://fibrechannel.org/wp-content/uploads/2015/10/FCIA_SPEEDMAP_v21.pdf)
- [FCIA Official Speedmap v23 (30/04/2020)](https://fibrechannel.org/wp-content/uploads/2020/06/FCIA_SPEEDMAP_v23.pdf)
- [FCIA Fibre Channel Roadmap — speedmap v24 (jul/2023)](https://fibrechannel.org/roadmap/)
- [FCIA 128GFC Q&A](https://fibrechannel.org/128gfc-qa/)
- [Broadcom — Brocade G710 Switch Product Brief](https://docs.broadcom.com/doc/G710-Switch-PB)
- [Dell Technologies — Dell EMC Unity: FAST Technology Overview (H15086)](https://www.delltechnologies.com/asset/en-us/products/storage/industry-market/h15086-emc-unity-fast-technology-overview.pdf)
- [LTO Program — LTO Generation 10](https://www.lto.org/lto-10/)
- [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/)
- [Amazon S3 Glacier storage classes](https://aws.amazon.com/s3/storage-classes/glacier/)
- [Verbitski et al., Amazon Aurora (SIGMOD 2017)](https://pages.cs.wisc.edu/~yxy/cs764-f20/papers/aurora-sigmod-17.pdf)
- [CERN — Storage](https://home.cern/science/computing/storage)
- [Dropbox — Moving 500 petabytes of user data into our Magic Pocket](https://blog.dropbox.com/topics/technology/moving-500-petabytes-of-user-data-into-our-magic-pocket)
- [Microsoft Learn — Detect, enable and disable SMBv1, SMBv2, SMBv3](https://learn.microsoft.com/en-us/windows-server/storage/file-server/troubleshoot/detect-enable-and-disable-smbv1-v2-v3)
- [Microsoft Learn — Install SQL Server with SMB Fileshare Storage](https://learn.microsoft.com/en-us/sql/database-engine/install-windows/install-sql-server-with-smb-fileshare-as-a-storage-option)
- [Oracle — About Direct NFS Client Mounts to NFS Storage Devices (19c)](https://docs.oracle.com/en/database/oracle/oracle-database/19/ssdbi/about-direct-nfs-client-mounts-to-nfs-storage-devices.html)
- [nfs(5) — Linux manual page](https://man7.org/linux/man-pages/man5/nfs.5.html)
- [MySQL 8.4 Reference Manual — Doublewrite Buffer](https://dev.mysql.com/doc/refman/8.4/en/innodb-doublewrite-buffer.html)
- [Apple — What's new for enterprise in macOS Sequoia (HT121011)](https://support.apple.com/121011)
- [MacRumors — macOS 27 Golden Gate Kills Time Capsule Support (17/06/2026)](https://www.macrumors.com/2026/06/17/macos-27-golden-gate-kills-time-capsule-support/)
- [The Register — Seagate's Kinetic Ethernet drives have seen the light (17/03/2016)](https://www.theregister.com/2016/03/17/seagate_has_seen_the_light/)
- [RFC 8881 — NFS Version 4 Minor Version 1 Protocol](https://www.rfc-editor.org/info/rfc8881/)
- [AppleInsider — Apple shifts from AFP file sharing to SMB2 in OS X 10.9 Mavericks](https://appleinsider.com/articles/13/06/11/apple-shifts-from-afp-file-sharing-to-smb2-in-os-x-109-mavericks)
- [Macworld — AFP is no longer supported in macOS Big Sur](https://www.macworld.com/article/234926/using-afp-to-share-a-mac-drive-its-time-to-change.html)
- [StorageNewsletter — FCIA 2020 Fibre Channel Roadmap](https://www.storagenewsletter.com/2021/04/19/fcia-2020-fibre-channel-roadmap/)agentId: a2ba3f19a57f781b1 (use SendMessage with to: 'a2ba3f19a57f781b1', summary: '<5-10 word recap>' to continue this agent)
<usage>subagent_tokens: 255492
tool_uses: 53
duration_ms: 943761</usage>