# Verificação de fontes — Seções 3.4–4.2, 7 e 8

Revisão conduzida em **10/09/2026**. Critério: para cada número e cada frase entre aspas, abrir o
**documento primário** e conferir se a fonte diz aquilo. Os capítulos do Silberschatz (Cap. 12) e
do Elmasri (Cap. 16) foram conferidos no PDF original em inglês.

Legenda: **OK** = confere na fonte · **CORRIGIDO** = divergia, já corrigido no `relatorio.tex` ·
**PRECISADO** = correto, mas com alcance ou rótulo ajustado.

---

## Resumo executivo — o que estava errado

| # | Onde | Defeito | Gravidade |
|---|---|---|---|
| S1 | §8, ref. [29] | **Não era uma referência**: "ANÁLISES DE MERCADO DE ARMAZENAMENTO… rastreadores de preço por TB (varejo)" — sem autor, sem título, sem URL. É a fonte de **toda a §3.5(c)**, que o próprio relatório classifica como extremamente volátil. A fonte real existe, é nomeada no corpo do texto (VDURA) e **não constava da Seção 8**. | **Grave** |
| S2 | §3.5(a), linha DRAM | A célula não sustentava o fator: "1 TB (sistema)" → "256 GB (módulo)" com fator "≈4–8×". Os dois valores mostrados dão uma *redução*. As outras quatro linhas conferem exatamente com a Tabela 16.1 do livro. | **Grave** |
| S3 | §8, ref. [24] | **Rótulo errado**: "Brocade G720 (460 ns **porta a porta**)". O *product brief* diz "*locally switched ports*" — exclui travessia de ISL. | Média |
| S4 | §8, ref. [18] | **O documento citado não contém o número**: o *Exos M Product Manual* cobre 32/30/28/24 TB e é citado para sustentar **36 TB**. | Média |
| S5 | §4.2, família FC | Coluna "Ano" misturava duas grandezas: 16GFC/64GFC eram disponibilidade de mercado; 32GFC "2013" e 128GFC "2023" eram anos de norma. Pela FCIA: **32GFC → 2016**, **128GFC → ≈2025**. | Média |
| S6 | §8 | Referências sem URL nem identificação suficiente: [28] TrendForce, [30] Azure, [31] Ubicloud, [32] STA/SNIA. E a medição "revisada por pares" que sustenta os 214–271 ns do CXL **não tinha entrada nenhuma**. | Média |
| S7 | §4.2, linha iSCSI | Citava só a **RFC 3720 (2004)**, obsoleta, enquanto a ref. [11] da Seção 8 já traz corretamente a RFC 7143 (2014). Inconsistência interna. | Baixa |
| S8 | §4.1, tabela de codificação | Base do *overhead* inconsistente na linha FLIT: 5,5% (= 14/256) contra 14/242 = **5,8%** usado em todas as outras linhas. | Baixa |
| S9 | §4.2, família FC | Só a linha 16GFC trazia o rótulo "por direção"; as outras três omitiam, reabrindo a armadilha *full-duplex* que o trabalho-irmão documentou. | Baixa |
| S10 | §3.5(c) | "A expectativa corrente **na literatura**" — nenhuma projeção nomeada e datada sustentava a afirmação; e a célula "2T26 = 16,3×" não tinha comunicado específico fixado. | Baixa |

Todos corrigidos no `relatorio.tex`.

---

## Seção 3.4 — Justificativa das linhas acrescentadas e removidas

| Afirmação | Fonte | Veredito |
|---|---|---|
| Memória CXL 2.0 acrescentada; sem ela o salto de 70 ns para 50 µs fica inexplicado | Coerente com as linhas da própria Tabela 16.1 atualizada (DRAM 70 ns, SSD 50 µs) | **OK** |
| SSD desdobrado em três linhas: variação de **~2 ordens de grandeza em capacidade (1 TB a 122,88 TB)** | [Solidigm D5-P5336](https://www.solidigm.com/products/data-center/d5/p5336.html) — 122,88 TB, QLC 192 camadas, PCIe 4.0. Produto real. 122,88 ÷ 1 = 122,9× ✓ | **OK** |
| …e de **mais de 5× em preço por byte** | Aritmética da própria tabela: TLC 1,1×10⁻⁶ ÷ consumidor 2,0×10⁻⁷ = **5,5×** ✓. Conferi as três células: 199,99/1 TB = 2,0×10⁻⁷; 16.246/61,44 TB = 2,6×10⁻⁷; 33.217/30,72 TB = 1,08×10⁻⁶ | **OK — a conta fecha** |
| Fita desdobrada em LTO-9 e LTO-10; **LTO-10 lançado em 2025 com 30 TB** | [Fujifilm](https://www.fujifilm.com/us/en/news/fujifilm-launches-lto-ultrium-10-data-cartridge) — LTO-10 (30 TB) lançado em junho de 2025 | **OK** |
| **cartucho de 40 TB especificado em novembro de 2025** | [LTO Program, 12/11/2025](https://www.lto.org/2025/11/lto-program-announces-new-40-tb-lto-10-cartridge-specifications-and-refreshes-its-roadmap-for-ultra-high-density-ai-ready-archival-storage/) — 40 TB nativos, até 100 TB a 2,5:1 | **OK** |
| **embarques a partir de janeiro de 2026** | Fujifilm: "*available for shipping beginning January, 2026*"; a LTO Program diz "primeiro trimestre de 2026" | **OK** |
| Optane não incluído por não estar comercialmente disponível (critério C2) | Intel encerrou a linha Optane; registrado como achado, não omissão | **OK — é o tratamento correto** |
| Sony Optical Disc Archive encerrado **em todas as regiões em 31/03/2025** | Comunicado de descontinuação da Sony; cobertura técnica confirma "discontinued in all regions as of March 31st, 2025" | **OK** |

## Seção 3.5 — Análise 2014 → 2026

### (a) Capacidade × latência

Conferi a coluna de 2014 contra a **Tabela 16.1 original**, extraída do PDF do Cap. 16:

> Main Memory-RAM **4GB–1TB** · Flash Memory-SSD **64 GB–1TB** · Flash Memory-USB stick
> **4GB–512GB** · Magnetic Disk **400 GB–8TB** · Magnetic Tape **2.5TB–8.5TB**

| Linha | 2014 (topo da faixa do livro) | 2026 | Fator | Veredito |
|---|---|---|---|---|
| SSD flash | 1 TB ✓ | 122,88 TB | 123× | **OK** |
| Pen drive USB | 512 GB ✓ | 2 TB | 4× | **OK** |
| Disco magnético | 8 TB ✓ | 36 TB | 4,5× | **OK** |
| Fita (cartucho) | 8,5 TB ✓ | 40 TB | 4,7× | **OK** |
| **DRAM** | 1 TB ✓ | ~~256 GB (módulo)~~ | ~~≈4–8×~~ | **CORRIGIDO** → "1 TB → 4–8 TB por soquete (12 canais × RDIMM de 256 GB)". Comparar 1 TB de *sistema* com 256 GB de *módulo* não produz 4–8×; produz uma redução |

Acrescentei ao relatório uma nota declarando que a coluna de 2014 é o **topo** de cada faixa do
livro, e que comparar a média seria mais fiel se o livro publicasse distribuição.

| Afirmação | Fonte | Veredito |
|---|---|---|
| "Os tempos de acesso mantidos do livro não permitem medir uma evolução de latência" | Ressalva metodológica própria | **OK — e é a ressalva certa** |

### (b) Largura de banda

| Afirmação | Fonte | Veredito |
|---|---|---|
| SSD: **750 MB/s → 14,7 GB/s = 20×** | Tabela 16.1 do livro: SSD **750MB/sec** ✓. 14.700 ÷ 750 = 19,6 ≈ 20× | **OK** |
| Disco magnético avançou **1,4×** | Tabela 16.1: **200MB/sec** ✓; 1,4 × 200 = 280 MB/s, coerente com os 275 MB/s da linha Exos M da tabela atualizada | **OK** |
| A fita LTO ultrapassa o disco em taxa sequencial | LTO-9/10 = 400 MB/s nativos contra ~275 MB/s do HDD | **OK** |

### (c) Divergência de preço SSD × HDD

| Afirmação | Fonte | Veredito |
|---|---|---|
| **18,6×** (parcial, 05/09/2026) | [VDURA Flash Volatility Index, 11/ago./2026](https://www.vdura.com/2026/08/11/ssd-prices-settle-into-a-costly-new-normal-at-6-5x-year-ago-levels-reshaping-the-economics-of-ai-factories-vdura-flash-volatility-index-shows/) — "the cost multiple… stands at **18.6x**" | **OK** |
| **23,2× (pico) no 1T26** | Mesma fonte: "down from the **23.2x** peak in Q1 2026" | **OK** |
| **7,0× no 3T25** | Mesma fonte: "nearly triple the **7.0x** multiple of a year ago" | **OK** |
| **US$ 22.600** (SSD TLC 30 TB) e **US$ 1.216** (HDD 30 TB) em agosto de 2026 | Mesma fonte: "$22,600, compared with $3,460 in Q3 2025, while a 30TB HDD costs **$1,216**" — e o comunicado é de 11/08/2026 ✓ | **OK — os dois** |
| Aritmética: 753 US$/TB e 41 US$/TB | 22.600 ÷ 30 = 753,3 ✓; 1.216 ÷ 30 = 40,5 ✓; 753,3 ÷ 40,5 = 18,6 ✓ | **OK — fecha** |
| A cautela de não apresentar 18,6× como fechamento do 3T26 | A VDURA publica dentro do trimestre; o relatório é **mais cauteloso que a fonte** | **OK — boa prática** |
| **2T26 = 16,3×** | Não localizei o comunicado trimestral específico desse valor | **PRECISADO** — acrescentei ressalva de proveniência; o grupo deve fixar o comunicado |
| "A expectativa corrente **na literatura** era de convergência em 2026–2028" | Sem projeção nomeada e datada | **PRECISADO** — convertido em lacuna declarada; o desfecho documentado permanece |

### (e) Síntese

| Afirmação | Fonte | Veredito |
|---|---|---|
| **Micron 9650: anunciado em jul./2025, produção em massa desde fev./2026, 28 GB/s** | [Micron / cobertura de fev./2026](https://www.tomshardware.com/pc-components/ssds/worlds-first-pcie-6-0-ssd-enters-mass-production-with-28gb-s-speeds-micron-9650-series-ssds-support-air-and-liquid-cooling) — "first unveiled in July 2025"; mass production fev./2026; **28 GB/s** leitura sequencial, 5,5 M IOPS | **OK — os três** |
| **CXL a 214–271 ns (2–2,5× a DRAM local)** | Nota † da Tabela 16.1: medição independente em expansores CXL 2.0, **contra 111–117 ns de DDR5 local no mesmo experimento**. 214/117 = 1,83; 271/111 = 2,44 → **2–2,5× ✓** | **OK — a razão fecha** contra a linha de base do próprio experimento (não contra os 70/75 ns da tabela) |
| **LTO-10 → roadmap revisado (nov./2025) até 365 TB nativos no LTO-14** | [Blocks & Files, 13/11/2025](https://www.blocksandfiles.com/tape/2025/11/13/lto-10-bumped-to-40-tb-as-future-tape-capacities-get-cut/1711787) — "913 TB compressed capacity for LTO-14, **meaning up to 365 TB raw**" (913 ÷ 2,5 = 365,2 ✓) | **OK** — acrescentei à ref. [16] que os 365 TB são derivação dos 913 TB publicados |
| **HAMR: HDD de 24 TB para 32–36 TB** | [Seagate, 20/jan./2025](https://investors.seagate.com/news/news-details/2025/Seagate-Introduces-Hard-Drive-Capacities-of-Up-to-36TB-Extending-Its-HAMR-Based-Mozaic-3-Technology-Platform/default.aspx) — Exos M até 36 TB, Mozaic 3+, 10 pratos | **OK** — mas a ref. [18] apontava para o manual que vai só até 32 TB; **corrigido** |
| Optane descontinuado (2022–2025); Sony ODA encerrado; SSD SATA virou legado; PCIe 5.0 padrão | Coerentes com as fontes acima e com a tabela | **OK** |

## Seção 4.1 — As três reduções

| Afirmação | Fonte | Veredito |
|---|---|---|
| **(1) Unidade — o deslize do Silberschatz** | §12.2, literal: *"The SATA-3 version of SATA nominally supports **6 gigabytes** per second, allowing data transfer speeds of up to 600 megabytes per second, while SAS version 3 supports data transfer rates of 12 **gigabits** per second."* | **OK — e mais forte do que o relatório diz**: a mesma frase usa "gigabits" corretamente para o SAS, o que prova lapso, não convenção. Vale mencionar na apresentação |
| 8b/10b = 80,00% / 25,0% | 8/10 = 0,80 ✓; 2/8 = 25,0% ✓ | **OK** |
| 64b/66b = 96,97% / 3,1% | 64/66 = 0,9697 ✓; 2/64 = 3,125% ✓ | **OK** |
| 128b/130b = 98,46% / 1,6% | 128/130 = 0,9846 ✓; 2/128 = 1,56% ✓ | **OK** |
| 128b/132b = 96,97% / 3,1% | 128/132 = 0,9697 ✓; 4/128 = 3,125% ✓ | **OK** |
| 256b/257b = 99,61% / 0,4% | 256/257 = 0,9961 ✓; 1/256 = 0,39% ✓ | **OK** |
| 128b/150b = 85,33% / 17,2% | 128/150 = 0,8533 ✓; 22/128 = 17,19% ✓ | **OK** |
| **FLIT 242B/256B = 94,53% / 5,5%** | 242/256 = 0,9453 ✓, mas 14/242 = **5,8%**; os 5,5% são 14/256, base diferente das outras seis linhas | **CORRIGIDO** → 5,8%, com nota explicitando a base |
| **(3) PAM4** dobra bits/símbolo ao custo de 1/3 da margem de ruído; usado em FC 64/128GFC, IB HDR/NDR/XDR, PCIe 6.0/7.0, Ethernet 400G; USB4 v2.0 usa PAM3 | Especificações dos respectivos consórcios | **OK** |
| SATA 3.0: 6,0 × 8/10 ÷ 8 = **600 MB/s** | Aritmética ✓ | **OK** |
| PCIe 5.0 ×4: 32 × 4 × 128/130 ÷ 8 = **15,754 GB/s** | Aritmética ✓ | **OK** |

## Seção 4.2 — Tabela comparativa das interfaces

### Conferidos e corretos

| Linha | Verificação | Veredito |
|---|---|---|
| USB 3.1 Gen2 → 1.212 MB/s | 10 × 128/132 ÷ 8 = 1,212 GB/s ✓ | **OK** |
| USB 3.2 Gen 2×2 → 2.424 MB/s | 20 × 128/132 ÷ 8 = 2,424 GB/s ✓ | **OK** |
| SAS-4 22,5 Gb/s (128b/150b) → 2.400 MB/s | 22,5 × 128/150 ÷ 8 = 2,4 GB/s ✓ | **OK** |
| PCIe 3.0 ×4 / ×16 → 3,94 / 15,75 GB/s | 8 × 4 × 128/130 ÷ 8 = 3,938 ✓ | **OK** |
| PCIe 4.0 ×4 / ×16 → 7,88 / 31,51 GB/s | ✓ | **OK** |
| PCIe 5.0 ×4 / ×16 → 15,75 / 63,02 GB/s | ✓ | **OK** |
| PCIe 6.0 ×4 → 30,25 GB/s | 64 × 4 × 242/256 ÷ 8 = 30,25 ✓ | **OK** |
| PCIe 7.0 ×4 → 60,5 GB/s | ✓ | **OK** |
| **NVMe/RoCE v2 → 41–163 µs (P99,99)** | [WD, *NVMe/TCP vs. RDMA with RoCEv2*](https://documents.westerndigital.com/content/dam/doc-library/en_us/assets/public/western-digital/collateral/white-paper/white-paper-open-flex-data24-roce-vs-tcp.pdf), literal: "RoCE QOS Writes: **41.22 us** · RoCE QOS Reads: **162.82 us**"; "All results were measured at the **4 nines (0.9999)**" | **OK — literal** |
| **NVMe/TCP → 122–177 µs (P99,99)** | Mesmo documento: "TCP QOS Writes: **122.37 us** · TCP QOS Reads: **177.15 us**" | **OK — literal** |
| Condições declaradas na ref. [23]: "4 K a QD1" | Mesmo documento: "Random · Block Size: 4k · Number of Jobs: 1 · **Queue Depth: 1** · Run Time: 20 minutes" | **OK — exatas** |
| 128GFC → 12.425 MB/s por direção | 24.850 (full-duplex, FCIA) ÷ 2 ✓ — consistente com a derivação do trabalho de NAS | **OK** |
| M.2 não suporta hot-swap, 3,3 V, ~8–11 W; EDSFF hot-swap, 12 V, até 70 W | Especificações SFF-TA/EDSFF | **OK** |

### Corrigidos

| Linha | Defeito | Correção |
|---|---|---|
| **32GFC (Gen 6)** | Ano "2013" (norma) numa coluna que usa disponibilidade de mercado nas linhas vizinhas | → **2016** (FCIA: "expected market availability of 2016") |
| **128GFC (Gen 8)** | Ano "2023" — é a conclusão do FC-PI-8, não a produtização | → **≈2025** (FCIA: desenvolvimento concluído ao fim de 2023, disponibilidade ~2025) |
| **iSCSI** | "2004 (RFC 3720)" — norma obsoleta, enquanto a ref. [11] já traz a correta | → "2004; **norma vigente RFC 7143 (2014)**" |
| **32/64/128GFC** | Sem o rótulo "por direção" que a linha 16GFC traz | → rótulo acrescentado nas três, mais nota de leitura na legenda sobre a escala *full-duplex* da FCIA |

## Seção 7 — Dúvidas e pontos para o debate

| Questão | Verificação | Veredito |
|---|---|---|
| Q1 — `random_page_cost` de 4,0 para 1,1 | Valor-padrão do PostgreSQL é 4,0 ✓; 1,1 é a recomendação usual para SSD/NVMe | **OK** |
| Q3 — Optane funcionava e ocupava um degrau real | Consistente com §3.4 e com a descontinuação documentada | **OK** |
| Q5 — literatura de otimização usa custo esperado; SLAs são P99/P99,9 | Observação metodológica, não factual | **OK** |
| Q6 — Silberschatz sobre latência da nuvem | §12.2, literal: *"Cloud storage has a very high latency of tens to hundreds of milliseconds, if the data are not co-located with the database, and is thus not ideal as the underlying storage for databases."* | **OK — literal**, a paráfrase da Q6 é fiel |
| Q6 — "degradação de 4,6×" nos dados de TPC-C | Medição da Ubicloud (ref. [31]), fornecedor sobre a própria plataforma | **PRECISADO** — acrescentei a ressalva de origem à ref. [31] |
| **Q7 — "O enunciado da tarefa continha um erro factual (*SATA também é conhecida como NL-SAS*)"** | Confirmado nos dois lados: o enunciado diz literalmente "SATA também é conhecida como NL-SAS"; e o Elmasri §16.2.1 diz *"SATA is now called NL-SAS for nearline SAS"* — o professor tirou do livro | **OK — a Q7 está bem fundamentada.** Vale saber, para o debate, que a origem é o livro, não um lapso do enunciado |

## Seção 8 — Referências

| Ref. | Verificação | Veredito |
|---|---|---|
| [1] Elmasri, Cap. 16 (§16.1, 16.2, 16.3, 16.10, 16.11; Tabela 16.1) | Conferido no PDF: todas as seções citadas existem e a Tabela 16.1 é a que o trabalho atualiza | **OK** |
| [2] Silberschatz, Cap. 12 (§12.1 a 12.7; Figura 12.1) | Conferido no PDF: Figura 12.1 é "Storage device hierarchy" ✓ | **OK** |
| [4] **PCIe 7.0, publicada em 11/jun./2025** | [PCI-SIG](https://www.businesswire.com/news/home/20250611299049/en/) — release em **11 de junho de 2025**, 128,0 GT/s | **OK — data exata** |
| [11] **RFC 7143, abr./2014** | [IETF](https://datatracker.ietf.org/doc/rfc7143/) — abril de 2014, obsoleta a RFC 3720; **não foi obsoletada** por nenhuma RFC posterior | **OK** |
| [13] **CXL 3.1 (nov./2023) e 3.2 (dez./2024)** | CXL 3.2 anunciada em **3/dez./2024** ✓; CXL 3.1 em nov./2023 ✓ | **OK** |
| [16] LTO Program | **PRECISADO** — acrescentados o comunicado datado de 12/11/2025, sua URL, e a nota de que os 365 TB nativos do LTO-14 são derivação dos 913 TB comprimidos publicados |
| [18] Seagate Exos M | **CORRIGIDO** — o manual cobre 24–32 TB; o ponto de 36 TB ganhou fonte própria (press release de 20/jan./2025) |
| [23] Western Digital OpenFlex | **PRECISADO** — título correto, URL, condições e os quatro valores literais acrescentados |
| [24] Brocade G720 | **CORRIGIDO** — "460 ns porta a porta" → "*Latency for locally switched ports is 460 ns (including FEC)*", com a ressalva de que exclui travessia de ISL, e URL |
| [28] TrendForce | **PRECISADO** — URL e ressalva de que não reproduzimos valores pontuais dessa fonte no corpo |
| [29] "Análises de mercado de armazenamento" | **CORRIGIDO** — substituída pela fonte real: **VDURA, Flash Volatility Index, 11/ago./2026**, com URL e a lista dos valores que ela sustenta |
| [30] Microsoft Azure | **PRECISADO** — URL acrescentada |
| [31] Ubicloud | **PRECISADO** — URL e ressalva de que é medição de fornecedor sobre a própria plataforma |
| [32] STA/SNIA | **PRECISADO** — URL acrescentada |
| **(faltava)** medição de latência de expansores CXL 2.0 | **ACRESCENTADA** como entrada nova, com **lacuna declarada**: a referência exata não foi fixada, e por isso os 214–271 ns valem como ordem de grandeza |

### Observação estrutural sobre a Seção 8

O relatório **não tem mecanismo de citação no texto**: nenhuma das 32 entradas é referenciada por
número em nenhum ponto do corpo. A rastreabilidade fica inteiramente a cargo das notas N1–Nn da
Tabela 16.1, que são excelentes para aquela tabela e não cobrem as Seções 3.5 e 4. Introduzi
ponteiros explícitos (`ref.~[1]`, `ref.~[29]`) nos dois pontos onde a ausência mais pesava. Fechar
isso de forma sistemática é decisão do grupo — não é erro factual, mas é a diferença entre uma
bibliografia e um aparato de proveniência.

---

## Pendências para o grupo

1. **Fixar o comunicado da VDURA** que sustenta a célula "2T26 = 16,3×", ou remover a célula.
2. **Fixar a referência da medição de latência de expansores CXL 2.0** (214–271 ns contra
   111–117 ns), hoje declarada como lacuna.
3. **Regerar os artefatos**: `Estudo_Armazenamento_Fisico_SBD.pdf` (do `relatorio.tex`) e
   `Slides_Armazenamento_SBD.pptx` (do `slides.js`). Depois, `python verificar.py`.
