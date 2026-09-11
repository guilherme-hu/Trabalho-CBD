// Slides — Dispositivos de Armazenamento Físico para SBD (CBD/UFRJ)
const pptxgen = require("pptxgenjs");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";           // 13.333 x 7.5 in
pres.author = "Grupo CBD/UFRJ";
pres.title  = "Dispositivos de Armazenamento Fisico para SBD";

// ---------- paleta ----------
const DARK   = "14181F";   // grafite (fundo escuro)
const DARK2  = "232A35";   // grafite claro (cards escuros)
const INK    = "14181F";
const INK2   = "55606E";
const LIGHT  = "FFFFFF";
const SOFT   = "F4F5F7";   // cinza card
const ACC    = "EB6834";   // laranja — acento único
const BLUE   = "2A78D6";   // azul — dado secundário
const AQUA   = "1BAF7A";
const LINE   = "DFE3E8";

const FH = "Cambria";      // títulos (serif, safe list)
const FB = "Calibri";      // corpo (sans, safe list)

const W = 13.333, H = 7.5, M = 0.72;

// ---------- helpers ----------
function slideDark() {
  const s = pres.addSlide();
  s.background = { color: DARK };
  return s;
}
function slideLight() {
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  return s;
}
// título padrão de slide claro + numeração em círculo (motivo visual)
let secNum = 0;
function head(s, title, kicker, dark) {
  const tc = dark ? LIGHT : INK;
  const kc = dark ? ACC : ACC;
  if (kicker) {
    s.addText(kicker.toUpperCase(), {
      x: M, y: 0.42, w: W - 2 * M, h: 0.26, isTextBox: true, margin: 0,
      fontFace: FB, fontSize: 11, bold: true, charSpacing: 1.6, color: kc,
    });
  }
  s.addText(title, {
    x: M, y: kicker ? 0.72 : 0.55, w: W - 2 * M, h: 0.78, isTextBox: true, margin: 0,
    fontFace: FH, fontSize: 30, bold: true, color: tc, valign: "top",
  });
}
function foot(s, n) {
  s.addText(String(n), {
    x: W - M - 0.6, y: H - 0.56, w: 0.6, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 10, color: INK2, align: "right",
  });
}
// cartão com tinta de fundo (sem faixas/stripes)
function card(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: fill || SOFT }, line: { color: fill || SOFT, width: 0 },
  });
}
// bolinha com número/rótulo — motivo visual repetido
function dot(s, x, y, label, color, size) {
  const d = size || 0.42;
  s.addShape(pres.ShapeType.ellipse, {
    x, y, w: d, h: d, fill: { color: color || ACC }, line: { color: color || ACC, width: 0 },
  });
  s.addText(label, {
    x, y, w: d, h: d, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: d > 0.5 ? 15 : 13, bold: true, color: LIGHT,
    align: "center", valign: "middle",
  });
}
function statBlock(s, x, y, w, big, small, color) {
  s.addText(big, {
    x, y, w, h: 0.78, isTextBox: true, margin: 0,
    fontFace: FH, fontSize: 40, bold: true, color: color || ACC, align: "left",
  });
  s.addText(small, {
    x, y: y + 0.78, w, h: 0.85, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12.5, color: INK2, align: "left",
  });
}
// tabela padrão
function table(s, rows, opts) {
  opts = Object.assign({}, opts || {});
  if (opts.colW) { const sum=opts.colW.reduce((a,b)=>a+b,0); opts.colW=opts.colW.map(w=>w*(W-2*M)/sum); }
  s.addTable(rows, Object.assign({
    x: M, y: 1.75, w: W - 2 * M,
    fontFace: FB, fontSize: 11.5, color: INK,
    border: { type: "solid", color: LINE, pt: 0.6 },
    align: "left", valign: "middle",
    autoPage: false,
  }, opts || {}));
}
// linha de fonte no rodape do slide
function fonteNota(s, y, txt) {
  s.addText(txt, {
    x: M, y, w: W - 2 * M, h: 0.34, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 9.5, italic: true, color: INK2, lineSpacing: 12,
  });
}
function hdr(t) { return { text: t, options: { bold: true, color: LIGHT, fill: { color: DARK2 }, fontSize: 11.5 } }; }

let pg = 0;
const P = () => ++pg;

/* =====================================================================
   1 — CAPA / FOLHA DE ROSTO
   ===================================================================== */
{
  const s = slideDark();
  s.addText("UNIVERSIDADE FEDERAL DO RIO DE JANEIRO  ·  CONSTRUÇÃO DE BANCO DE DADOS", {
    x: M, y: 0.75, w: W - 2 * M, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.4, color: ACC,
  });
  s.addText("Dispositivos de Armazenamento\nFísico para SBD", {
    x: M, y: 1.35, w: 7.5, h: 1.9, isTextBox: true, margin: 0,
    fontFace: FH, fontSize: 42, bold: true, color: LIGHT, lineSpacing: 46,
  });
  s.addText("Interfaces de conexão e parâmetros para o Gerente de Armazenamento.\nAtualização da Tabela 16.1 de Elmasri & Navathe — dados consultados em 05/09/2026.", {
    x: M, y: 3.4, w: 7.5, h: 0.95, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 15, color: "C3CAD4", lineSpacing: 22,
  });

  card(s, M, 4.62, 7.4, 2.1, DARK2);
  s.addText("INTEGRANTES DO GRUPO", {
    x: M + 0.3, y: 4.8, w: 6.8, h: 0.26, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 10.5, bold: true, charSpacing: 1.2, color: ACC,
  });
  const nomes = [
    "Bernardo Brandão Pozzato Carvalho Costa — DRE 123289593",
    "Enzo de Carvalho Sampaio — DRE 123386206",
    "Gabriel Schmitz Corrêa Rizawinsk — DRE 123225573",
    "Guilherme En Shih Hu — DRE 123224674",
    "Raphael Henrique da Silva Pereira — DRE 123420783",
    "Vivian Maria da Silva e Souza — DRE 123205793",
  ];
  s.addText(nomes.map((t, i) => ({ text: t, options: { breakLine: i < nomes.length - 1 } })), {
    x: M + 0.3, y: 5.12, w: 6.8, h: 1.45, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, color: LIGHT, lineSpacing: 17,
  });

  // painel lateral com os três achados
  card(s, 8.55, 1.35, 4.06, 5.37, DARK2);
  const achados = [
    ["1 KB", "1.000 bytes: unidade comum para a comparação de custo"],
    ["SCM", "Optane foi descontinuado; CXL de DRAM é volátil"],
    ["<1 µs", "é o custo do barramento PCIe num I/O de 20–70 µs — latência é mídia"],
  ];
  achados.forEach((a, i) => {
    const y = 1.72 + i * 1.72;
    s.addText(a[0], {
      x: 8.9, y, w: 3.4, h: 0.62, isTextBox: true, margin: 0,
      fontFace: FH, fontSize: 34, bold: true, color: ACC,
    });
    s.addText(a[1], {
      x: 8.9, y: y + 0.63, w: 3.4, h: 0.9, isTextBox: true, margin: 0,
      fontFace: FB, fontSize: 12, color: "C3CAD4", lineSpacing: 16,
    });
  });

  s.addText("Rio de Janeiro — Setembro de 2026", {
    x: M, y: H - 0.66, w: 6, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11, color: "8B95A3",
  });
  s.addNotes("Folha de rosto. Preencher nomes completos e DRE de cada integrante antes de postar no AVA.");
}

/* =====================================================================
   2 — ROTEIRO
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Roteiro da apresentação", "Agenda");
  const itens = [
    ["1", "Fundamentos", "Hierarquia de memória, mecânica do HDD, física do flash, o fim da SCM"],
    ["2", "Tabela 16.1 atualizada", "13 dispositivos comerciais de 2026, com preço por KB"],
    ["3", "Interfaces de conexão", "56 variantes: USB, SATA, SAS, NVMe, M.2/U.2/EDSFF, HBA, FC, iSCSI, InfiniBand"],
    ["4", "Gerente de Armazenamento", "Bloco, buffer, latência de commit, modelo de custo, tiering"],
    ["5", "Post-Mortem", "Prompts, autoria, erros da IA e correções aplicadas"],
  ];
  itens.forEach((it, i) => {
    const y = 1.92 + i * 1.02;
    card(s, M, y, W - 2 * M, 0.86);
    dot(s, M + 0.28, y + 0.22, it[0], i === 4 ? BLUE : ACC);
    s.addText(it[1], {
      x: M + 0.92, y: y + 0.12, w: 3.6, h: 0.34, isTextBox: true, margin: 0,
      fontFace: FB, fontSize: 15.5, bold: true, color: INK,
    });
    s.addText(it[2], {
      x: M + 0.92, y: y + 0.46, w: 10.4, h: 0.32, isTextBox: true, margin: 0,
      fontFace: FB, fontSize: 12.5, color: INK2,
    });
  });
  foot(s, n);
  s.addNotes("Cinco blocos. Os dois centrais são os produtos pedidos no enunciado; o quarto é a nossa contribuição interpretativa.");
}

/* =====================================================================
   3 — POR QUE ISSO IMPORTA
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Todo SGBD é uma máquina de transformar I/O em respostas", "Motivação");
  s.addText("Índices, buffer pool, WAL, otimizador de consultas — tudo existe porque o meio persistente é ordens de grandeza mais lento que a memória. Essa razão é o parâmetro que justifica a arquitetura inteira. E ela mudou.", {
    x: M, y: 1.72, w: W - 2 * M, h: 0.7, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 16, color: INK2, lineSpacing: 24,
  });
  const stats = [
    ["2014", "ano dos preços da Tabela 16.1 do Elmasri & Navathe", ACC],
    ["2018", "ano dos números do Capítulo 12 do Silberschatz", ACC],
    ["12 anos", "de defasagem que este trabalho mede e corrige", BLUE],
  ];
  stats.forEach((st, i) => {
    const x = M + i * 4.05;
    card(s, x, 2.72, 3.75, 1.85);
    statBlock(s, x + 0.3, 2.95, 3.15, st[0], st[1], st[2]);
  });
  card(s, M, 4.9, W - 2 * M, 1.65, DARK);
  s.addText("A pergunta do trabalho", {
    x: M + 0.4, y: 5.1, w: 11, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.4, color: ACC,
  });
  s.addText("Se os parâmetros físicos mudaram por várias ordens de grandeza, quais conclusões práticas dos livros-texto ainda valem — e quais deixaram de valer?", {
    x: M + 0.4, y: 5.45, w: 11.6, h: 0.85, isTextBox: true, margin: 0,
    fontFace: FH, fontSize: 20, color: LIGHT, lineSpacing: 27,
  });
  foot(s, n);
  s.addNotes("Enquadrar: não é um trabalho de catálogo de hardware; é sobre quais premissas de projeto de SGBD envelheceram.");
}

/* =====================================================================
   4 — HIERARQUIA (figura)
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "A hierarquia continua existindo — com um buraco novo", "1. Fundamentos");
  s.addImage({ path: "fig/f1hi-1.png", x: M, y: 1.62, w: 8.3, h: 4.75 });
  card(s, 9.25, 1.62, 3.36, 4.75);
  s.addText("Como ler", {
    x: 9.55, y: 1.85, w: 2.8, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11, bold: true, charSpacing: 1.3, color: ACC,
  });
  const leitura = [
    "Cada tecnologia da Tabela 16.1 atualizada, posicionada por tempo de acesso e preço por KB. Ambos os eixos são logarítmicos.",
    "A fronteira desce da esquerda superior para a direita inferior: pagar mais compra latência menor.",
    "O vazio no eixo horizontal entre DRAM (10⁻⁷ s) e SSD NVMe (5×10⁻⁵ s) é onde ficava o Intel Optane.",
  ];
  s.addText(leitura.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < leitura.length - 1 } })), {
    x: 9.55, y: 2.25, w: 2.78, h: 3.9, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12, color: INK, lineSpacing: 17, paraSpaceAfter: 10,
  });
  foot(s, n);
  s.addNotes("Cinco ordens de grandeza separam DRAM de SSD no eixo do tempo. Esse é o gráfico que organiza a apresentação inteira.");
}

/* =====================================================================
   5 — HDD: os quatro parâmetros
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Disco magnético: a mecânica que define o modelo de custo", "1. Fundamentos");
  const par = [
    ["Busca", "4–10 ms *", "Deslocamento do braço até a trilha. * A Seagate REMOVEU o seek time do manual do Exos M — os ≈8,5 ms que somamos são estimativa nossa da classe."],
    ["Latência rotacional", "4,16 ms", "Meia rotação a 7.200 rpm: 60 ÷ 7.200 ÷ 2 = 4,17 ms; a Seagate publica 4,16. É o único parâmetro de tempo que ela ainda publica."],
    ["Transferência", "275–285 MB/s", "Trilhas externas. Bem menos nas internas, que têm menos setores."],
    ["IOPS (4 KB)", "50–200", "Governado pela mecânica. Praticamente inalterado em duas décadas."],
  ];
  par.forEach((p, i) => {
    const x = M + (i % 2) * 6.15, y = 1.78 + Math.floor(i / 2) * 1.55;
    card(s, x, y, 5.85, 1.32);
    s.addText(p[0], { x: x + 0.3, y: y + 0.16, w: 3.0, h: 0.3, isTextBox: true, margin: 0, fontFace: FB, fontSize: 13, bold: true, color: INK2 });
    s.addText(p[1], { x: x + 3.2, y: y + 0.1, w: 2.4, h: 0.42, isTextBox: true, margin: 0, fontFace: FH, fontSize: 22, bold: true, color: ACC, align: "right" });
    s.addText(p[2], { x: x + 0.3, y: y + 0.58, w: 5.25, h: 0.6, isTextBox: true, margin: 0, fontFace: FB, fontSize: 12, color: INK2, lineSpacing: 16 });
  });
  card(s, M, 4.98, W - 2 * M, 1.55, DARK);
  s.addText("O que os livros não enfatizam o bastante", {
    x: M + 0.4, y: 5.16, w: 11, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.3, color: ACC,
  });
  s.addText("Capacidade cresceu 4×; taxa sequencial, 1,4×; IOPS aleatório, nada. Varrer 8 TB a 200 MB/s levava 11 h; varrer 32 TB a 285 MB/s leva 31 h. Backup, reconstrução de RAID e full table scan pioraram — e é por isso que RAID 5 saiu de cena em discos grandes.", {
    x: M + 0.4, y: 5.5, w: 11.6, h: 0.9, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 13.5, color: "D6DBE2", lineSpacing: 19,
  });
  foot(s, n);
  s.addNotes("O ponto forte deste slide é o cálculo das 31 horas — é o que conecta física de disco a decisão de projeto (RAID 6 em vez de RAID 5).");
}

/* =====================================================================
   6 — FLASH / SSD
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Flash: escrever é diferente de ler, e isso muda o projeto", "1. Fundamentos");
  const ops = [
    ["Ler página", "dezenas de µs", BLUE],
    ["Escrever página apagada", "≈100 µs", BLUE],
    ["Apagar bloco (256 KB–1 MB)", "2–5 ms", ACC],
  ];
  ops.forEach((o, i) => {
    const x = M + i * 4.05;
    card(s, x, 1.78, 3.75, 1.28);
    s.addText(o[0], { x: x + 0.28, y: 1.92, w: 3.2, h: 0.3, isTextBox: true, margin: 0, fontFace: FB, fontSize: 12.5, color: INK2 });
    s.addText(o[1], { x: x + 0.28, y: 2.24, w: 3.2, h: 0.55, isTextBox: true, margin: 0, fontFace: FH, fontSize: 24, bold: true, color: o[2] });
  });
  s.addText("Sobrescrever uma página é impossível: é preciso apagar o bloco inteiro, e a endurance depende da tecnologia e do produto. Toda a arquitetura do SSD — FTL, garbage collection, wear leveling — existe por causa dessa única restrição.", {
    x: M, y: 3.2, w: W - 2 * M, h: 0.62, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 14.5, color: INK, lineSpacing: 21,
  });
  const cons = [
    ["Amplificação de escrita", "O GC move dados: 4 KB lógicos custam mais que 4 KB físicos. É por isso que SGBDs da era do SSD (RocksDB, Cassandra) usam LSM-tree em vez de B⁺-tree in-place."],
    ["Latência de cauda", "O GC é assíncrono e imprevisível. A mediana é ótima; o P99,9 pode ser 10× pior. SLA de banco quebra na cauda, não na média."],
    ["Paralelismo interno", "O SSD atende 32+ requisições simultâneas. SATA: 13 mil IOPS a QD1, 98 mil a QD32. Emitir uma por vez desperdiça o dispositivo."],
  ];
  cons.forEach((c, i) => {
    const y = 3.98 + i * 0.92;
    dot(s, M, y + 0.06, String(i + 1), ACC, 0.36);
    s.addText(c[0], { x: M + 0.52, y, w: 3.1, h: 0.3, isTextBox: true, margin: 0, fontFace: FB, fontSize: 13.5, bold: true, color: INK });
    s.addText(c[1], { x: M + 3.7, y, w: 8.2, h: 0.78, isTextBox: true, margin: 0, fontFace: FB, fontSize: 12, color: INK2, lineSpacing: 16 });
  });
  foot(s, n);
  s.addNotes("Três consequências para o projetista: amplificação, cauda e paralelismo. A terceira é a que mais afeta o gerente de buffer.");
}

/* =====================================================================
   7 — O OBITUÁRIO DA SCM (slide escuro, declaração)
   ===================================================================== */
{
  const s = slideDark(); const n = P();
  head(s, "A memória persistente que os livros anunciam não existe mais", "1. Fundamentos · achado", true);
  s.addText("A Nota 12.1 do Silberschatz apresenta a storage class memory — 3D XPoint / Intel Optane — como o degrau que preencheria o vão entre DRAM e flash.", {
    x: M, y: 1.85, w: 11.9, h: 0.6, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 15.5, color: "C3CAD4", lineSpacing: 22,
  });
  const tl = [
    ["2017", "Optane SSD começa a ser vendido", "8B95A3"],
    ["2018", "Optane PMem em soquete DIMM", "8B95A3"],
    ["jul/2022", "Intel anuncia a saída do negócio", ACC],
    ["—", "Geração 300 (Crow Pass) cancelada", ACC],
    ["fim/2025", "Últimos embarques da série 200", ACC],
  ];
  tl.forEach((t, i) => {
    const x = M + i * 2.42;
    card(s, x, 2.7, 2.22, 1.75, DARK2);
    s.addText(t[0], { x: x + 0.2, y: 2.86, w: 1.85, h: 0.34, isTextBox: true, margin: 0, fontFace: FH, fontSize: 16, bold: true, color: t[2] });
    s.addText(t[1], { x: x + 0.2, y: 3.24, w: 1.85, h: 1.0, isTextBox: true, margin: 0, fontFace: FB, fontSize: 11.5, color: "C3CAD4", lineSpacing: 15 });
  });
  card(s, M, 4.78, W - 2 * M, 1.75, DARK2);
  s.addText("Consequência para bancos de dados transacionais", {
    x: M + 0.4, y: 4.98, w: 11, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.3, color: ACC,
  });
  s.addText("O vão de três ordens de grandeza entre DRAM (≈70 ns) e SSD NVMe (20–70 µs) foi reaberto. Um log em SCM permitiria ≈100.000 commits/s por thread; com NVMe o teto é ≈33.000. O CXL cobre parte do vão — mas do lado da memória, a 214–271 ns medidos (2–2,5× a DRAM local), e não como meio persistente de log.", {
    x: M + 0.4, y: 5.32, w: 11.6, h: 1.05, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 14, color: LIGHT, lineSpacing: 20,
  });
  foot(s, n);
  s.addNotes("Este é o achado mais consequente do trabalho para SGBD transacional. Enfatizar que não é obsolescência do livro: é uma categoria de produto que o mercado retirou.");
}

/* =====================================================================
   8 — TABELA 16.1 ORIGINAL
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "O ponto de partida: a Tabela 16.1 original (2014)", "2. Tabela 16.1");
  const rows = [
    [hdr("Type"), hdr("Capacity"), hdr("Access Time"), hdr("Max Bandwidth"), hdr("Commodity Prices (2014)")],
    ["Main Memory — RAM", "4 GB – 1 TB", "30 ns", "35 GB/s", "US$ 100 – 20 K"],
    ["Flash Memory — SSD", "64 GB – 1 TB", "50 µs", "750 MB/s", "US$ 50 – 600"],
    ["Flash Memory — USB stick", "4 GB – 512 GB", "100 µs", "50 MB/s", "US$ 2 – 200"],
    ["Magnetic Disk", "400 GB – 8 TB", "10 ms", "200 MB/s", "US$ 70 – 500"],
    ["Optical Storage", "50 GB – 100 GB", "180 ms", "72 MB/s", "US$ 100"],
    ["Magnetic Tape", "2,5 TB – 8,5 TB", "10 – 80 s", "40 – 250 MB/s", "US$ 2,5 K – 30 K"],
    ["Tape jukebox", "25 TB – 2,1 EB", "10 – 80 s", "250 MB/s – 1,2 PB/s", "US$ 3 K – 1 M+"],
  ];
  table(s, rows, { y: 1.8, rowH: 0.36, colW: [3.3, 2.4, 1.9, 2.6, 3.69] });
  card(s, M, 5.35, W - 2 * M, 1.2);
  s.addText("O que o enunciado pede: substituir cada tipo por produtos comerciais de 2026, atualizar capacidade e preço, separar a banda em leitura e escrita, e acrescentar a coluna de preço por kilobyte.", {
    x: M + 0.35, y: 5.55, w: 11.6, h: 0.8, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 14, color: INK, lineSpacing: 20,
  });
  foot(s, n);
  s.addNotes("Mostrar o original antes da atualização para que a comparação faça sentido.");
}

/* =====================================================================
   9 — TABELA ATUALIZADA: SÍNTESE
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Tabela 16.1: síntese dos dispositivos", "2. Dados completos e fontes no relatório");
  const rows = [
    [hdr("Dispositivo"), hdr("Capacidade-base"), hdr("Acesso"), hdr("Leitura / escrita"), hdr("US$/KB")],
    ["SRAM L3 (proxy)", "64 MiB adicionais", "≈9 ns (derivado)", "≈1,4 / 1,4 TB/s", "2,97×10⁻³"],
    ["DDR5 desktop", "32 GiB", "70 ns (referência)", "96 / 96 GB/s", "1,6×10⁻⁵"],
    ["Samsung 9100 PRO", "1 TB, sem dissipador", "50 µs (livro)", "14,7 / 13,3 GB/s", "2,00×10⁻⁷"],
    ["Solidigm D5-P5336", "61,44 TB", "50 µs (livro)", "7,0 / 3,0 GB/s", "2,6×10⁻⁷"],
    ["Samsung 870 EVO", "1 TB", "77 µs (derivado)", "560 / 530 MB/s", "3,4×10⁻⁷"],
    ["Seagate Exos M", "30 TB", "10 ms (livro)", "275 / 275 MB/s", "2,7×10⁻⁸"],
  ];
  table(s, rows, { y:1.85, rowH:0.55, fontSize:14, margin:0.06, colW:[2.65,2.1,2.1,2.8,2.243] });
  s.addText("1 KB = 1.000 bytes em todas as linhas. Preço/KB do 9100 PRO: US$ 199,99 (MSRP de lançamento). Preços históricos e proxies não são cotações atuais. Tempos marcados como livro seguem a alternativa autorizada pelo enunciado.", {
    x:M,y:6.0,w:W-2*M,h:0.7,fontFace:FB,fontSize:12,color:INK2,margin:0
  });
  foot(s,n);
  s.addNotes("Tabela completa no relatório, incluindo RDIMM, CXL, Micron 9550 e USB. Fonte do MSRP do 9100 PRO sem dissipador: https://news.samsung.com/us/samsung-announces-9100-pro-series-ssds-with-breakthrough-pcie-5-0-performance/ . O preço histórico não atende sozinho ao requisito de preço atual.");
}

/* =====================================================================
   10 — TABELA ATUALIZADA (terciário) + preço/KB
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "O estrato terciário e a coluna de preço por kilobyte", "2. Tabela 16.1 · consulta de 05/09/2026");
  const rows = [
    [hdr("Tipo"), hdr("Exemplo comercial"), hdr("Capacidade"), hdr("Acesso"), hdr("Leitura"), hdr("Escrita"), hdr("Preço US$"), hdr("US$/KB")],
    ["Óptico WORM", "Verbatim M-DISC BD-XL 100 GB", "100 GB/disco", "180 ms (livro)", "não publicada", "≈18 MB/s (4×)", "12,70 + 230", "1,3×10⁻⁷"],
    ["Fita LTO-9", "Cartucho Ultrium LTO-9", "18 TB nativo", "25–121 s", "400 MB/s", "400 MB/s", "88 + drive", "4,9×10⁻⁹"],
    [{ text: "Fita LTO-10", options: { bold: true, color: BLUE } }, "Cartucho Ultrium LTO-10 (2026)", "30 → 40 TB", "25–121 s", "400 MB/s", "400 MB/s", "260–300 + drive", "9,3×10⁻⁹"],
    ["Tape library", "IBM TS4500 / Quantum i6000", "926,8 PB; 2,317 EB a 2,5:1", "25–121 s", "≈51,2 GB/s", "≈51,2 GB/s", "sob cotação", "n/d"],
  ];
  table(s, rows, { y: 1.72, rowH: 0.36, fontSize: 11, colW: [1.85, 2.9, 1.62, 1.32, 1.28, 1.15, 1.83, 0.94] });
  card(s, M, 3.78, 5.85, 2.52, DARK);
  s.addText("A razão de custo que sustenta a hierarquia", {
    x: M + 0.35, y: 3.96, w: 5.2, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.3, color: ACC,
  });
  s.addText("607.000×", {
    x: M + 0.35, y: 4.28, w: 5.2, h: 0.7, isTextBox: true, margin: 0,
    fontFace: FH, fontSize: 40, bold: true, color: LIGHT,
  });
  s.addText("separam o preço por KB da SRAM do preço por KB do cartucho LTO-9. A conta é (US$ 199 ÷ 67.108,864 KB) ÷ (US$ 87,99 ÷ 1,8×10¹⁰ KB), ou seja, 2,97×10⁻³ contra 4,89×10⁻⁹. É essa razão que justifica manter uma hierarquia em vez de comprar tudo do meio mais rápido.", {
    x: M + 0.35, y: 5.02, w: 5.2, h: 1.2, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12, color: "C3CAD4", lineSpacing: 17,
  });
  card(s, 6.85, 3.78, 5.77, 2.52);
  s.addText("Por que a fita continua em produção", {
    x: 7.2, y: 3.96, w: 5.1, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.3, color: ACC,
  });
  s.addText("→ O drive e a mídia são precificados à parte, como também acontece no armazenamento óptico, de modo que o preço por TB do cartucho não inclui o leitor.\n\n→ O roadmap do consórcio LTO, revisado em novembro de 2025, chega a 365 TB nativos no LTO-14, o horizonte publicado mais longo entre os meios desta tabela.\n\n→ O cartucho não consome energia parado na estante, oferece um air gap físico contra ransomware e tem retenção declarada de 30 anos.", {
    x: 7.2, y: 4.3, w: 5.1, h: 1.9, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12, color: INK, lineSpacing: 16,
  });
  fonteNota(s, 6.42, "Fonte: tabela integral e notas de rodapé na Seção 3.2 do relatório. Capacidades e taxas vêm de datasheet de fabricante; a capacidade da library e os 51,2 GB/s são derivação nossa, com a conta explicitada na nota da tabela.");
  foot(s, n);
  s.addNotes("Os dois livros tratam a fita como o resíduo da hierarquia, e ela é a categoria com o roadmap publicado mais longo de todas as que estão na tabela. Os três motivos do cartão da direita são a resposta se perguntarem por que ela sobrevive, e o número da esquerda é o que explica o resto: a razão de preço por KB entre o topo e a base da hierarquia é de seis ordens de grandeza, enquanto a razão de latência é bem menor. Vale dizer também que a biblioteca de fita entra aqui por corresponder ao tape jukebox do livro, e que ela não tem preço público, então ficou fora da comparação de custo.");
}

/* =====================================================================
   11 — BANDA (gráfico nativo)
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "A largura de banda foi o que mais avançou entre 2014 e 2026", "2. Tabela 16.1 · análise");
  const cats = ["Óptico M-DISC", "HDD HAMR 30 TB", "Fita LTO-10", "SSD SATA", "Pen drive USB", "SSD NVMe DC", "SSD NVMe PCIe 5.0", "DRAM DDR5"];
  const leitura = [36, 275, 400, 560, 1000, 7000, 14700, 96000];
  const escrita = [18, 275, 400, 530, 900, 3000, 13300, 96000];
  s.addChart(pres.ChartType.bar, [
    { name: "Leitura máx. (MB/s)", labels: cats, values: leitura },
    { name: "Escrita máx. (MB/s)", labels: cats, values: escrita },
  ], {
    x: M, y: 1.68, w: 8.0, h: 4.55,
    barDir: "bar", barGrouping: "clustered", barGapWidthPct: 45,
    chartColors: [BLUE, ACC],
    showTitle: false,
    valAxisLogScaleBase: 10, valAxisMinVal: 10, valAxisMaxVal: 100000,
    valAxisTitle: "MB/s (escala logarítmica)", showValAxisTitle: true,
    valAxisLabelColor: INK2, catAxisLabelColor: INK2,
    valAxisLabelFontFace: FB, catAxisLabelFontFace: FB,
    valAxisLabelFontSize: 10, catAxisLabelFontSize: 10.5,
    valAxisTitleFontSize: 10, valAxisTitleColor: INK2, valAxisTitleFontFace: FB,
    valGridLine: { color: LINE, size: 0.6 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendColor: INK2, legendFontFace: FB, legendFontSize: 11,
  });
  card(s, 8.95, 1.68, 3.66, 4.55);
  s.addText("O que o gráfico mostra", { x: 9.3, y: 1.88, w: 3.0, h: 0.3, isTextBox: true, margin: 0, fontFace: FB, fontSize: 11, bold: true, charSpacing: 1.3, color: ACC });
  const pontos = [
    ["20×", "é o ganho de banda do SSD contra a Tabela 16.1 original, que publica 750 MB/s, enquanto o PCIe 5.0 entrega 14,7 GB/s."],
    ["1,4×", "foi o avanço do disco magnético no mesmo período, de 200 para 275 MB/s sustentados nas trilhas externas."],
    ["LTO > HDD", "a fita supera o disco em taxa sequencial, porque não precisa posicionar um braço entre blocos consecutivos."],
  ];
  pontos.forEach((p, i) => {
    const y = 2.20 + i * 1.30;
    s.addText(p[0], { x: 9.3, y, w: 3.0, h: 0.48, isTextBox: true, margin: 0, fontFace: FH, fontSize: 23, bold: true, color: INK });
    s.addText(p[1], { x: 9.3, y: y + 0.48, w: 3.0, h: 0.86, isTextBox: true, margin: 0, fontFace: FB, fontSize: 11.5, color: INK2, lineSpacing: 15 });
  });
  fonteNota(s, 6.34, "Fonte: Figura 2 e Seção 3.5(b) do relatório; valores de leitura e escrita de datasheet de fabricante. A capacidade e a banda publicadas podem ser comparadas entre 2014 e 2026, mas a latência não, porque os tempos de acesso mantidos do livro não têm medição equivalente de carga, fila e percentil.");
  foot(s, n);
  s.addNotes("O eixo é logarítmico, e sem isso as barras do óptico e da fita desapareceriam ao lado da DRAM. O par leitura/escrita é quase idêntico na DRAM, no disco e na fita, e só diverge no flash, o que mostra que a assimetria entre ler e escrever é característica da memória flash e vem do apagamento por bloco, não do armazenamento em geral. Se perguntarem por que a fita aparece acima do disco, a resposta é que a comparação é de taxa sequencial, e nela a fita não paga posicionamento de braço entre blocos consecutivos.");
}

/* =====================================================================
   12 — O QUE MUDOU 2014 → 2026
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "O que mudou entre 2014 e 2026", "2. Tabela 16.1 · síntese");
  const rows = [
    [hdr("Mudança"), hdr("Impacto na tabela e no projeto de SBD")],
    ["Optane / 3D XPoint descontinuado (2022–2025)", "Removeu o degrau de memória persistente e reabriu um vazio de 3 ordens de grandeza entre DRAM e SSD"],
    ["CXL preenche o vazio parcialmente", "Novo nível de memória a 214–271 ns, de 2 a 2,5× a DRAM local; o buffer pool pode crescer além dos slots DIMM"],
    ["Sony ODA encerrado; Pioneer saiu dos leitores ópticos", "O óptico virou nicho de arquivamento WORM de longuíssimo prazo e saiu da tabela como linha ativa"],
    ["SSD SATA tornou-se legado", "A interface satura em 550 MB/s, e a linha é mantida só por retrofit de parque instalado"],
    ["PCIe 5.0 é padrão de consumo; PCIe 6.0 chegou ao datacenter", "14,8 GB/s no consumo e 28 GB/s no Micron 9650, em produção em massa desde fev./2026"],
    ["HAMR entrou em produção", "O disco magnético saltou de 24 TB para 32–36 TB, com o HAMR já em produção de volume"],
    ["LTO-10 lançado (30 → 40 TB nativos)", "Arquivamento a US$ 5–10/TB, com roadmap revisado em nov./2025 até 365 TB nativos no LTO-14"],
    [{ text: "SSD e HDD divergiram em custo em vez de convergir", options: { bold: true, color: ACC } },
     { text: "Razão de 18,6× por TB em 05/09/2026, 3T26 em curso, contra 7× no 3T25 e pico de 23,2× no 1T26", options: { bold: true, color: ACC } }],
  ];
  table(s, rows, { y: 1.75, rowH: 0.42, fontSize: 12, colW: [4.6, 7.29] });
  fonteNota(s, 6.06, "Fontes: razão SSD/HDD e preços de US$ 22.600 (SSD TLC de 30 TB) e US$ 1.216 (HDD de 30 TB) no Flash Volatility Index da VDURA, 11/ago./2026 (https://www.vdura.com/2026/08/11/ssd-prices-settle-into-a-costly-new-normal-at-6-5x-year-ago-levels-reshaping-the-economics-of-ai-factories-vdura-flash-volatility-index-shows/); capacidade de 36 TB no comunicado da Seagate de 20/jan./2025; demais linhas nas Seções 3.4 e 3.5 do relatório.");
  foot(s, n);
  s.addNotes("A última linha é a que mais contraria a expectativa da literatura didática, que esperava convergência de preço entre SSD e HDD por volta de 2026 a 2028. O grupo não fixou autor e data de nenhuma dessas projeções, então ela entra como contexto e não como fonte. O que está documentado é o desfecho: a demanda de IA consumiu capacidade fabril de NAND, parte dos compradores voltou para HDD, e isso pressionou também o preço do disco. A razão é volátil, oscilou de 7× a 23× em quatro trimestres, e por isso só faz sentido apresentada com data. Uma versão anterior deste trabalho citava aproximadamente 16× sem carimbo de trimestre, erro registrado como E15 na Seção 9.4. Uma ressalva de proveniência que vale dizer se perguntarem pela tabela do relatório: a célula de 16,3× do 2T26 vem de divulgação trimestral anterior do mesmo índice, e o grupo não fixou o comunicado específico, de modo que quem reapresentar aquela tabela deve fechar essa referência antes.");
}

/* =====================================================================
   14 — AS TRÊS REDUÇÕES
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Da taxa anunciada à taxa real: três reduções sucessivas", "3. Interfaces");
  const red = [
    ["1", "Unidade", "1 GB/s equivale a 8 Gb/s, de modo que uma interface de 6 Gb/s nunca entrega 6 GB/s.", "O próprio Silberschatz escorrega na §12.2, e a frase seguinte do livro usa a unidade certa para o SAS-3."],
    ["2", "Codificação de linha", "Todo enlace serial insere bits de controle para manter o balanceamento DC e recuperar o relógio do próprio fluxo.", "O 8b/10b custa 25% de overhead, o 128b/130b custa 1,6% e o SAS-4 custa 17,2%."],
    ["3", "Modulação", "O NRZ transmite 1 bit por símbolo e o PAM4 transmite 2, ao custo de reduzir a margem de ruído a um terço e exigir FEC.", "O PAM4 está em FC 64/128GFC, InfiniBand HDR/NDR/XDR e PCIe 6.0/7.0; o USB4 v2.0 usa PAM3."],
  ];
  red.forEach((r, i) => {
    const y = 1.8 + i * 1.28;
    card(s, M, y, W - 2 * M, 1.1);
    dot(s, M + 0.3, y + 0.32, r[0], ACC, 0.46);
    s.addText(r[1], { x: M + 1.0, y: y + 0.16, w: 2.7, h: 0.34, isTextBox: true, margin: 0, fontFace: FB, fontSize: 15, bold: true, color: INK });
    s.addText(r[2], { x: M + 3.8, y: y + 0.14, w: 4.6, h: 0.85, isTextBox: true, margin: 0, fontFace: FB, fontSize: 12, color: INK2, lineSpacing: 15 });
    s.addText(r[3], { x: M + 8.6, y: y + 0.14, w: 3.2, h: 0.85, isTextBox: true, margin: 0, fontFace: FB, fontSize: 11.5, color: BLUE, italic: true, lineSpacing: 15 });
  });
  card(s, M, 5.62, W - 2 * M, 0.82, DARK);
  s.addText("SATA 3.0:  6,0 Gb/s × 8/10 ÷ 8 = 600 MB/s            PCIe 5.0 ×4:  32 GT/s × 4 × 128/130 ÷ 8 = 15,754 GB/s", {
    x: M + 0.4, y: 5.84, w: 11.6, h: 0.4, isTextBox: true, margin: 0,
    fontFace: "Courier New", fontSize: 12.5, color: LIGHT,
  });
  fonteNota(s, 6.52, "Fonte: Seção 4.1 do relatório, que traz a tabela completa das sete codificações com eficiência, overhead e onde cada uma é usada. A base do overhead é bits acrescentados ÷ bits de carga útil, e sobre o quadro total os percentuais seriam menores.");
  foot(s, n);
  s.addNotes("Estas três reduções são o que separa a taxa de marketing da taxa de dados, e é por elas que os comparativos de interface publicados sem cuidado erram por um fator de oito a dez. A citação do Silberschatz vale a pena ler em voz alta: ele escreve que o SATA-3 suporta nominalmente seis gigabytes por segundo, quando são gigabits, e a frase seguinte já cita os 600 MB/s corretos e usa gigabits para o SAS versão 3. Isso mostra que é lapso de digitação e não convenção do texto. O caso do SAS-4 é o mais curioso da segunda linha: 24G é nome comercial, a taxa real é 22,5 Gb/s, e a codificação 128b/150b já embute o FEC, o que explica os 17,2% de overhead.");
}

/* =====================================================================
   15 — TABELA DE INTERFACES (resumo)
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Interfaces: síntese comparativa", "3. Interfaces · extrato da Seção 4.2");
  const rows = [
    [hdr("Interface"),hdr("Tipo"),hdr("Taxa útil máxima"),hdr("Latência típica"),hdr("Alcance"),hdr("Uso típico em SBD")],
    ["USB 3.2 Gen 2×2","Serial","2.424 MB/s","≈100 µs ∗","1 m","Backup externo"],
    ["Ultra-320 SCSI","Paralela","320 MB/s","ms ∗","12 m LVD","Legado"],
    ["SATA 3.0","Serial","600 MB/s","100–200 µs (SSD)","1 m","Capacidade, backup, dev"],
    ["SAS-4 (24G)","Serial","2.400 MB/s","100–200 µs","10 m","Backplane tri-modo"],
    [{ text: "PCIe 5.0 ×4 / NVMe", options: { bold: true, color: ACC } },"Enlace / protocolo",{ text: "15,75 GB/s", options: { bold: true, color: ACC } },{ text: "20–70 µs", options: { bold: true, color: ACC } },"≈0,25 m","OLTP e redo log"],
    ["FC 64GFC (Gen 7)","Serial PAM4","6.400 MB/s por direção","460 ns por switch","100 m OM4 / 10 km","SAN de alto desempenho"],
    ["NVMe/RoCE v2","Fabric Ethernet","≈ Ethernet","41–163 µs (P99,99)","≤ 1 km","SAN de baixa latência"],
    ["NVMe/TCP","Fabric IP","≈ Ethernet","122–177 µs (P99,99)","Roteável","Alternativa moderna ao iSCSI"],
    ["iSCSI","Protocolo sobre IP","110 MB/s a 11 GB/s","500–800 µs","Ilimitada (IP)","PME, virtualização"],
    ["InfiniBand XDR 4×","Serial PAM4","800 Gb/s","sub-µs","100 m AOC / 10 km","HPC e clusters de IA"],
  ];
  table(s, rows, {y:1.78,rowH:0.36,fontSize:11,margin:0.04,colW:[2.35,1.85,2.2,2.05,1.85,3.33]});
  s.addText("Extrato de uma tabela de 53 linhas. O relatório traz todas as variantes exigidas pelo enunciado, mais taxa bruta, ano, hot-plug, topologia e número de dispositivos. As latências marcadas com ∗ são estimativas de ordem de grandeza, sem publicação de organismo normatizador. M.2, U.2, U.3 e EDSFF são fatores de forma e HBA e CNA são adaptadores, de modo que nenhum tem taxa própria e todos aparecem na tabela com “= PCIe”.", {
    x:M,y:5.88,w:W-2*M,h:0.62,fontFace:FB,fontSize:11.5,color:INK2,margin:0,lineSpacing:15
  });
  fonteNota(s, 6.52, "Fonte: Seção 4.2 do relatório. Taxas de Fibre Channel segundo o roadmap da FCIA, por direção, e a FCIA publica também o valor full-duplex, que é o dobro. Latências de NVMe/RoCE e NVMe/TCP são medição P99,99 publicada pela Western Digital.");
  foot(s, n);
  s.addNotes("Duas coisas para apontar aqui. A primeira é a única linha marcada como paralela, o Ultra-320 SCSI, que morreu por um problema físico e não de protocolo: em barramento paralelo, o skew entre as vias e a diafonia crescem com a frequência, e foi isso que fez toda a indústria migrar para serial. A segunda é a coluna de latência, que é onde a história realmente está. A taxa útil do PCIe 5.0 é 26 vezes a do SATA 3.0, mas o que importa para OLTP é que a latência cai de 100–200 µs para 20–70 µs. E repare que iSCSI e NVMe/TCP correm sobre a mesma rede IP e têm latências de ordens diferentes, o que é argumento de protocolo, não de fio. As taxas de FC estão por direção; citar 128GFC sem dizer qual das duas escalas erra por um fator de dois.");
}

/* =====================================================================
   17 — CORREÇÃO: SATA ≠ NL-SAS
   ===================================================================== */
{
  const s = slideDark(); const n = P();
  head(s, "Correção a uma afirmação do próprio enunciado", "3. Interfaces · verificação", true);
  card(s, M, 1.78, W - 2 * M, 0.95, DARK2);
  s.addText("“SATA também é conhecida como NL-SAS.”", {
    x: M + 0.4, y: 1.9, w: 8.2, h: 0.4, isTextBox: true, margin: 0,
    fontFace: FH, fontSize: 18, italic: true, color: "C3CAD4",
  });
  s.addText("Factualmente incorreto.", {
    x: M + 0.4, y: 2.3, w: 8.2, h: 0.34, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 15, bold: true, color: ACC,
  });
  s.addText("NL-SAS = mecânica SATA nearline + protocolo SAS", {
    x: 8.9, y: 2.05, w: 3.7, h: 0.6, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 13.5, bold: true, color: LIGHT, lineSpacing: 18,
  });
  const rows = [
    [hdr(""), hdr("SATA (HDD)"), hdr("NL-SAS"), hdr("SAS corporativo")],
    ["Interface / protocolo", "SATA / ATA", { text: "SAS / SCSI", options: { bold: true, color: ACC } }, "SAS / SCSI"],
    ["Mídia e rotação", "Nearline 7.200 rpm", { text: "Nearline 7.200 rpm (a mesma)", options: { bold: true, color: ACC } }, "10 K / 15 K rpm"],
    ["Portas", "1 (single-port)", { text: "2 (dual-port)", options: { bold: true, color: ACC } }, "2 (dual-port)"],
    ["Multipath / alta disponib.", "Não", { text: "Sim", options: { bold: true, color: ACC } }, "Sim"],
    ["Exige STP / interposer", "Sim", "Não", "Não"],
    ["Taxa de erro irrecuperável", "10⁻¹⁴", "10⁻¹⁵", "10⁻¹⁶"],
  ];
  s.addTable(rows, {
    x: M, y: 3.0, w: W - 2 * M, rowH: 0.4, colW: [3.2, 2.9, 3.2, 2.59],
    fontFace: FB, fontSize: 12, color: LIGHT, fill: { color: DARK2 },
    border: { type: "solid", color: "3A4450", pt: 0.6 },
    valign: "middle", autoPage: false,
  });
  s.addText("Consequência prática: um array SAS com discos SATA precisa de STP ou de placas interposer e perde o caminho redundante. Com NL-SAS, não. Para um SGBD em cluster, é a diferença entre sobreviver ou não à falha de um controlador.", {
    x: M, y: 5.95, w: W - 2 * M, h: 0.75, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 13.5, color: "C3CAD4", lineSpacing: 19,
  });
  foot(s, n);
  s.addNotes("Registrar que o grupo optou por documentar a correção em vez de reproduzir a afirmação. Vale como resposta à pergunta Q7 do documento.");
}

/* =====================================================================
   18 — POR QUE O NVMe VENCEU
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Por que o NVMe venceu — e não foi por largura de banda", "3. Interfaces");
  const rows = [
    [hdr(""), hdr("AHCI / SATA"), hdr("NVMe")],
    ["Filas de submissão", "1", { text: "65.535", options: { bold: true, color: ACC } }],
    ["Comandos por fila", "32", { text: "65.536", options: { bold: true, color: ACC } }],
    ["Registradores MMIO por comando", "4 (não cacheáveis)", { text: "1", options: { bold: true, color: ACC } }],
    ["Afinidade de núcleo", "Não", { text: "Uma fila por núcleo — sem contenção de lock", options: { bold: true, color: ACC } }],
    ["Conjunto de comandos", "ATA (herdado do disco rotativo)", { text: "Enxuto, projetado para flash", options: { bold: true, color: ACC } }],
  ];
  table(s, rows, { y: 1.78, rowH: 0.46, fontSize: 12.5, colW: [4.1, 3.6, 4.19] });
  card(s, M, 4.72, W - 2 * M, 1.85, DARK);
  s.addText("O argumento em uma frase", {
    x: M + 0.4, y: 4.92, w: 11, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.3, color: ACC,
  });
  s.addText("AHCI oferece uma fila por porta. NVMe permite filas paralelas, reduzindo contenção entre núcleos. O ganho real depende do driver, do dispositivo e da carga.", {
    x: M + 0.4, y: 5.26, w: 11.6, h: 1.1, isTextBox: true, margin: 0,
    fontFace: FH, fontSize: 18, color: LIGHT, lineSpacing: 25,
  });
  foot(s, n);
  s.addNotes("Ponto central da apresentação. Se só uma ideia ficar, que seja esta: a vitória do NVMe é de arquitetura de filas, não de velocidade de fio.");
}

/* =====================================================================
   19 — ORÇAMENTO DE LATÊNCIA
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Orçamento de latência de uma leitura aleatória de 4 KB", "3. Interfaces · síntese");
  const rows = [
    [hdr("Etapa"), hdr("NVMe local (a)"), hdr("NVMe/RoCE (b)"), hdr("NVMe/TCP (b)"), hdr("iSCSI 10 GbE (a)"), hdr("HDD SAS (a)")],
    ["Chamada de sistema + camada de bloco", "2–5 µs", "2–5 µs", "5–10 µs", "10–20 µs", "5 µs"],
    ["Driver + submissão na fila", "1–2 µs", "2 µs", "5 µs", "20–50 µs", "10 µs"],
    [{ text: "Travessia do barramento / fabric", options: { bold: true } }, { text: "<1 µs", options: { bold: true, color: BLUE } }, "5–15 µs", "50–120 µs", "200–400 µs", "5 µs"],
    [{ text: "Latência da mídia", options: { bold: true } }, { text: "20–70 µs", options: { bold: true, color: ACC } }, "20–70 µs", "20–70 µs", "20–70 µs", { text: "≈4 ms", options: { bold: true, color: ACC } }],
    ["Controladora do alvo / RAID", "—", "10–30 µs", "10–30 µs", "30–80 µs", "50 µs"],
    [{ text: "TOTAL", options: { bold: true, fill: { color: SOFT } } },
     { text: "20–70 µs", options: { bold: true, fill: { color: SOFT } } },
     { text: "41–163 µs", options: { bold: true, fill: { color: SOFT } } },
     { text: "122–177 µs", options: { bold: true, fill: { color: SOFT } } },
     { text: "500–800 µs", options: { bold: true, fill: { color: SOFT } } },
     { text: "5–10 ms", options: { bold: true, fill: { color: SOFT } } }],
  ];
  table(s, rows, { y: 1.72, rowH: 0.40, fontSize: 11, colW: [3.5, 1.72, 1.72, 1.72, 1.72, 1.51] });
  s.addText([
    { text: "(a) ", options: { bold: true } }, { text: "latência típica.    ", options: {} },
    { text: "(b) ", options: { bold: true } },
    { text: "percentil 99,99 medido pela Western Digital (4 KB, QD=1, mesma mídia) — a mediana é menor. As duas colunas de fabric são, portanto, conservadoras face às demais: isso reforça a conclusão (2), não a enfraquece.", options: {} },
  ], {
    x: M, y: 4.58, w: W - 2 * M, h: 0.36, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 10, color: INK2, lineSpacing: 13,
  });
  const concl = [
    ["Em NVMe local, ≈90% da latência é mídia", "PCIe 5.0 → 6.0 não reduz latência de leitura aleatória. Só a mídia reduziria — e a mídia que faria isso saiu do mercado."],
    ["Em storage de rede, o protocolo domina", "Trocar iSCSI por NVMe/TCP tem efeito de primeira ordem: 4× menos latência sobre a mesma mídia."],
    ["A cauda importa mais que a média", "SLA de banco quebra no P99,9. Fabrics lossless (FC, IB) vencem o TCP pela variância, não pela média."],
  ];
  concl.forEach((c, i) => {
    const x = M + i * 4.05;
    card(s, x, 5.00, 3.75, 1.55);
    s.addText(c[0], { x: x + 0.26, y: 5.14, w: 3.25, h: 0.5, isTextBox: true, margin: 0, fontFace: FB, fontSize: 12.5, bold: true, color: ACC, lineSpacing: 16 });
    s.addText(c[1], { x: x + 0.26, y: 5.64, w: 3.25, h: 0.85, isTextBox: true, margin: 0, fontFace: FB, fontSize: 11.5, color: INK2, lineSpacing: 15 });
  });
  foot(s, n);
  s.addNotes("Slide mais denso da apresentação. Vale gastar tempo: é a evidência que sustenta a conclusão de que latência, e não banda, governa o SBD.");
}

/* =====================================================================
   20 — GERENTE DE ARMAZENAMENTO: parâmetros
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Traduzindo os números em decisões do Gerente de Armazenamento", "4. Gerente de Armazenamento");
  const dec = [
    ["Tamanho de bloco", "HDD: 8–64 KB, para amortizar a busca de 12,7 ms.  ·  SSD: 4–16 KB, alinhado à página NAND.  ·  Fita: ≥1 MB."],
    ["Buffer pool", "Emitir uma falta de página por vez usa ≈3% de um SSD NVMe. É preciso I/O assíncrono com muitas requisições em voo — daí io_uring e effective_io_concurrency."],
    ["Durabilidade", "O commit custa 1/latência_do_fsync. Group commit é o que separa usar o dispositivo de desperdiçá-lo."],
    ["Modelo de custo", "random_page_cost deve ser calibrado por workload, cache e medições. 1,1–1,5 é apenas faixa inicial ilustrativa para SSD, não regra universal."],
  ];
  dec.forEach((d, i) => {
    const y = 1.8 + i * 1.15;
    card(s, M, y, W - 2 * M, 1.0);
    dot(s, M + 0.28, y + 0.28, String(i + 1), i === 3 ? BLUE : ACC, 0.44);
    s.addText(d[0], { x: M + 0.96, y: y + 0.14, w: 2.7, h: 0.36, isTextBox: true, margin: 0, fontFace: FB, fontSize: 14.5, bold: true, color: INK });
    s.addText(d[1], { x: M + 3.75, y: y + 0.14, w: 8.05, h: 0.75, isTextBox: true, margin: 0, fontFace: FB, fontSize: 12.5, color: INK2, lineSpacing: 17 });
  });
  card(s, M, 6.28, W - 2 * M, 0.58, DARK);
  s.addText("Limite ilustrativo 1/fsync (sem group commit/cache/CPU): HDD ≈125/s · SATA ≈6.700/s · NVMe ≈33.000/s · NVMe/TCP ≈8.200/s · iSCSI ≈1.700/s", {
    x: M + 0.4, y: 6.39, w: 11.6, h: 0.38, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12.5, bold: true, color: LIGHT,
  });
  foot(s, n);
  s.addNotes("A linha do random_page_cost é o exemplo mais concreto: a Tabela 16.1 atualizada termina virando uma linha de arquivo de configuração.");
}

/* =====================================================================
   21 — TIERS
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Uma arquitetura de tiers para 2026", "4. Gerente de Armazenamento");
  const rows = [
    [hdr("Tier"), hdr("Meio"), hdr("Interface"), hdr("Conteúdo típico"), hdr("US$/KB")],
    ["0 — memória", "DRAM + CXL", "DDR5 / CXL 2.0", "Buffer pool, tabelas de hash, catálogos", "10⁻⁵"],
    ["1 — quente", "SSD NVMe TLC (E3.S)", "PCIe 5.0 ×4", "Redo log, tempdb, índices, tabelas OLTP", "10⁻⁶"],
    ["2 — morno", "SSD NVMe QLC alta capac.", "PCIe 4.0 ×4", "Partições históricas, leitura intensiva", "10⁻⁷"],
    ["3 — frio", "HDD nearline 30 TB", "SATA 6 Gb/s ou NL-SAS 12G", "Data lake, partições antigas, backup", "10⁻⁸"],
    ["4 — arquivo", "Fita LTO-10", "SAS 12G / FC 32G", "Retenção legal, air gap contra ransomware", "10⁻⁹"],
  ];
  table(s, rows, { y: 1.8, rowH: 0.52, fontSize: 12.5, colW: [1.8, 2.75, 2.45, 3.75, 1.14] });
  card(s, M, 4.9, 5.85, 1.75, DARK);
  s.addText("3.000×", { x: M + 0.4, y: 5.1, w: 5.0, h: 0.66, isTextBox: true, margin: 0, fontFace: FH, fontSize: 38, bold: true, color: ACC });
  s.addText("é a razão de preço por byte entre o tier 0 e o tier 4. É ela — e não a diferença de desempenho — que sustenta economicamente o tiering.", {
    x: M + 0.4, y: 5.78, w: 5.05, h: 0.75, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12.5, color: "C3CAD4", lineSpacing: 17,
  });
  card(s, 6.85, 4.9, 5.77, 1.75);
  s.addText("Evidência empírica (PostgreSQL)", {
    x: 7.2, y: 5.08, w: 5.1, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.3, color: ACC,
  });
  const ev = [
    "NVMe local: 400 mil IOPS em 8 vCPU. Disco de rede precisaria de 112 vCPU — 14× mais.",
    "TPC-C: 873 tps (NVMe local) contra 636 (Aurora) e 188 (RDS/EBS gp3).",
  ];
  s.addText(ev.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < ev.length - 1 } })), {
    x: 7.2, y: 5.42, w: 5.1, h: 1.1, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12.5, color: INK, lineSpacing: 17, paraSpaceAfter: 8,
  });
  foot(s, n);
  s.addNotes("A diferença de TPC-C não vem de banda: vem de latência × concorrência.");
}

/* =====================================================================
   22 — CONCLUSÕES
   ===================================================================== */
{
  const s = slideDark(); const n = P();
  head(s, "Quatro conclusões", "Conclusão", true);
  const cs = [
    ["A SCM saiu do mercado", "O Optane foi descontinuado entre 2022 e 2025 e nada o substituiu. O teto de commits por thread continua ditado pela latência do NVMe."],
    ["SSD e HDD divergiram", "18,6× em US$/TB na consulta de 05/09/2026; o 3T26 ainda não estava encerrado."],
    ["Banda deixou de ser o parâmetro", "Em NVMe local, <1 µs de 20–70 µs é barramento. Explica o SATA parado, a vitória do NVMe e a irrelevância do PCIe 6.0 para OLTP."],
    ["A fita é a mais viva do baixo da pirâmide", "LTO-10 a 40 TB nativos, roadmap até 365 TB, US$ 5–10/TB. Para retenção legal e air gap, não há substituto."],
  ];
  cs.forEach((c, i) => {
    const x = M + (i % 2) * 6.15, y = 1.85 + Math.floor(i / 2) * 2.35;
    card(s, x, y, 5.85, 2.05, DARK2);
    dot(s, x + 0.32, y + 0.3, String(i + 1), ACC, 0.46);
    s.addText(c[0], { x: x + 1.0, y: y + 0.28, w: 4.6, h: 0.55, isTextBox: true, margin: 0, fontFace: FH, fontSize: 17, bold: true, color: LIGHT, lineSpacing: 22 });
    s.addText(c[1], { x: x + 0.32, y: y + 0.95, w: 5.25, h: 1.0, isTextBox: true, margin: 0, fontFace: FB, fontSize: 12.5, color: "C3CAD4", lineSpacing: 17 });
  });
  s.addText("Achado metodológico: fabricantes publicam cada vez menos parâmetros de latência. Um trabalho equivalente feito em 2014 teria mais dados disponíveis do que este, feito em 2026.", {
    x: M, y: 6.55, w: W - 2 * M, h: 0.5, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12.5, italic: true, color: "8B95A3",
  });
  foot(s, n);
  s.addNotes("Fechar com o achado metodológico — é inesperado e costuma gerar discussão.");
}

/* =====================================================================
   23 — POST-MORTEM: método
   ===================================================================== */
{
  const s = slideLight(); const n = P();
  head(s, "Post-Mortem — como usamos a IA e o que decidimos nós", "5. Post-Mortem");
  card(s, M, 1.78, 5.85, 2.5);
  s.addText("Prompts que determinaram o conteúdo", {
    x: M + 0.32, y: 1.96, w: 5.2, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.3, color: ACC,
  });
  const pr = [
    "P2 — “marque o que é datasheet, o que é medição e o que é estimativa; se não encontrar, diga.”",
    "P3 — “distinga Gb/s de GB/s e cite a codificação de linha.”",
    "P4 — “verifique se ‘SATA = NL-SAS’ é correto.”",
    "P6 — “liste o que você NÃO conseguiu encontrar.”",
    "P7 — “verificador adversarial: não confirme nada por plausibilidade; ordene por gravidade o que derrubaria o trabalho.”",
  ];
  s.addText(pr.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < pr.length - 1 } })), {
    x: M + 0.32, y: 2.32, w: 5.2, h: 1.85, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12, color: INK, lineSpacing: 16, paraSpaceAfter: 7,
  });
  card(s, 6.85, 1.78, 5.77, 2.5);
  s.addText("Autoria — quem decidiu o quê", {
    x: 7.17, y: 1.96, w: 5.1, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.3, color: ACC,
  });
  const au = [
    "Bernardo — coordenação, preços e conclusão.",
    "Enzo — fundamentos e leitura dos capítulos-base.",
    "Gabriel — Tabela 16.1 e cálculo de preço por KB.",
    "Vivian — interfaces, Fibre Channel e correção do NL-SAS.",
    "Guilherme — verificação adversarial, scripts e revisão final.",
    "Raphael — gerente de armazenamento e consolidação do Post-Mortem.",
  ];
  s.addText(au.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < au.length - 1 } })), {
    x: 7.17, y: 2.32, w: 5.1, h: 1.85, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 10.5, color: INK, lineSpacing: 13, paraSpaceAfter: 3,
  });
  card(s, M, 4.45, W - 2 * M, 2.15, DARK);
  s.addText("Cinco lições sobre o uso de IA neste tipo de trabalho", {
    x: M + 0.4, y: 4.62, w: 11, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.3, color: ACC,
  });
  const lic = [
    "Exigir a origem de cada número é o que torna o trabalho auditável.",
    "Pedir as lacunas explicitamente é tão importante quanto pedir os dados.",
    "A IA reproduz premissas erradas contidas no próprio pedido — o erro do NL-SAS só apareceu porque perguntamos.",
    "Respostas longas contêm contradições internas; só a leitura cruzada as revela.",
    "As conclusões estruturais não vieram prontas: resultaram de comparar tabelas produzidas separadamente.",
    "Uma segunda IA, instruída a ATACAR o texto, achou 5 erros graves que a IA autora não viu — a lição que levamos.",
  ];
  s.addText(lic.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < lic.length - 1 } })), {
    x: M + 0.4, y: 4.96, w: 11.5, h: 1.55, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12.5, color: LIGHT, lineSpacing: 17, paraSpaceAfter: 3,
  });
  foot(s, n);
  s.addNotes("A divisão final registra os seis integrantes, suas seções e decisões principais.");
}

/* =====================================================================
   25 — PERGUNTAS PARA O DEBATE
   ===================================================================== */
{
  const s = slideDark(); const n = P();
  head(s, "O que levamos ao debate", "7. Dúvidas, considerações e pontos para o debate", true);
  const qs = [
    "Se o random_page_cost precisa mudar de 4,0 para 1,1 conforme o meio, por que o SGBD não mede essa razão empiricamente na inicialização, em vez de depender de um administrador que talvez nem saiba que o parâmetro existe?",
    "Faz sentido continuar ensinando o modelo de I/O por contagem de blocos, ou o modelo correto para o hardware de 2026 seria latência × paralelismo, contabilizando a profundidade de fila explicitamente?",
    "A descontinuação do Optane foi falha de mercado ou de tecnologia? O 3D XPoint funcionava e ocupava um degrau real da hierarquia, e se a razão foi custo de fabricação, o que impede que a mesma lacuna se reabra indefinidamente?",
    "Se a memória barata escalar via CXL, bancos in-memory de dezenas de terabytes ficam viáveis. O que muda no projeto de um SGBD que hoje assume que os dados não cabem na memória?",
    "Toda a literatura de otimização usa custo esperado, isto é, média, enquanto os SLAs reais são escritos em P99 e P99,9. Existe formalismo de otimização de consultas que otimize percentil em vez de média?",
    "Silberschatz observa que a nuvem tem latência de dezenas a centenas de milissegundos quando os dados não são colocalizados, e os dados de TPC-C que reunimos confirmam degradação de 4,6×. Esse limite é físico ou de arquitetura?",
    "O enunciado da tarefa afirma que “SATA também é conhecida como NL-SAS”, afirmação que vem do próprio Elmasri & Navathe (§16.2.1). O grupo optou por documentar a correção em vez de reproduzi-la. Foi a conduta correta em um trabalho avaliativo?",
  ];
  qs.forEach((q, i) => {
    const col = i < 4 ? 0 : 1;
    const lin = i < 4 ? i : i - 4;
    const x = M + col * 6.15, y = 1.68 + lin * 1.19;
    dot(s, x, y + 0.02, "Q" + (i + 1), i % 2 ? BLUE : ACC, 0.44);
    s.addText(q, {
      x: x + 0.6, y, w: 5.25, h: 1.1, isTextBox: true, margin: 0,
      fontFace: FB, fontSize: 11.5, color: LIGHT, lineSpacing: 15,
    });
  });
  card(s, M + 6.15, 5.25, 5.85, 1.35, DARK2);
  s.addText("As sete questões estão na Seção 7 do documento, com a redação integral. O relatório completo, com as tabelas na íntegra, as referências e o Post-Mortem exigido pelo enunciado, foi entregue em PDF.", {
    x: M + 6.5, y: 5.45, w: 5.2, h: 0.9, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12, color: "C3CAD4", lineSpacing: 16,
  });
  s.addText("Obrigado.", {
    x: M + 6.5, y: 6.68, w: 5.2, h: 0.4, isTextBox: true, margin: 0,
    fontFace: FH, fontSize: 20, bold: true, color: LIGHT,
  });
  foot(s, n);
  s.addNotes("Q1 e Q2 são as que mais interessam ao professor, porque atacam o modelo de custo ensinado na disciplina. Q3 e Q4 são sobre a lacuna da hierarquia, e valem como fecho da parte da tabela. Q6 tem número atrás dela: a degradação de 4,6× vem de medição da Ubicloud sobre a própria plataforma, comparando NVMe local com Aurora e RDS, e é medição de fornecedor, o que convém dizer se alguém perguntar. Q7 é a única que fala do processo e não do conteúdo, e a resposta que o grupo daria é que documentar a correção com a fonte do T10 ao lado é mais útil que reproduzir o erro em silêncio.");
}

/* =====================================================================
   SLIDES DE BACKUP — não apresentados; usados para responder perguntas
   ===================================================================== */
let bkNum = 0;
function footB(s) {
  bkNum++;
  s.addText("BACKUP B" + bkNum, {
    x: W - M - 1.4, y: H - 0.56, w: 1.4, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 10, bold: true, color: ACC, align: "right",
  });
}

/* --- Divisor --- */
{
  const s = slideDark();
  s.addText("BACKUP", {
    x: M, y: 2.9, w: W - 2 * M, h: 1.0, isTextBox: true, margin: 0,
    fontFace: FH, fontSize: 54, bold: true, color: LIGHT, align: "center",
  });
  s.addText("Proveniência dos dados · derivações aritméticas · fatores de forma e HBA", {
    x: M, y: 3.95, w: W - 2 * M, h: 0.5, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 15, color: "8B95A3", align: "center",
  });
  s.addNotes("Slides a partir daqui não fazem parte da apresentação — servem para responder perguntas.");
}

/* --- B1: proveniência --- */
{
  const s = slideLight();
  head(s, "De onde vem cada número da Tabela 16.1", "Backup · proveniência");
  const rows = [
    [hdr("Categoria de origem"), hdr("Como aparece na tabela"), hdr("Exemplos")],
    [{ text: "Datasheet do fabricante", options: { bold: true, color: BLUE } }, "Sem marcação", "Capacidades e taxas do 9100 PRO, 870 EVO, D5-P5336, 9550 PRO, DT Max e Exos M; latência rotacional de 4,16 ms; taxas nativas do LTO-9 e do LTO-10"],
    [{ text: "Medição publicada por terceiro", options: { bold: true, color: BLUE } }, "Citada no texto", "1,4 TB/s de L3 do Zen 5 (Chips and Cheese); 214–271 ns do CXL 2.0; 41–177 µs do NVMe-oF (Western Digital); razão SSD/HDD (VDURA)"],
    [{ text: "Derivação nossa", options: { bold: true, color: ACC } }, "Conta explicitada na nota", "Preço por KB; 51,2 GB/s por módulo DDR5-6400; 51,2 GB/s da library; 926,8 PB (23.170 × 40 TB); 2,317 EB só no cenário 2,5:1"],
    [{ text: "Referência mantida do livro", options: { bold: true, color: ACC } }, "Marcada como livro", "Tempos de acesso da Tabela 16.1 original: SSD 50 µs, HDD 10 ms, pen drive USB 100 µs e óptico 180 ms"],
    [{ text: "Lacuna declarada", options: { bold: true } }, "n/d", "Preço de módulo CXL e de tape library, disponíveis só sob cotação; banda agregada do MD220; velocidade de leitura do M-DISC"],
  ];
  table(s, rows, { y: 1.74, rowH: 0.70, fontSize: 10, colW: [2.75, 2.15, 6.99] });
  s.addText("Limites que o grupo assume: MSRP histórico não é cotação atual; CXL e biblioteca de fita não têm preço confirmado e ficaram fora da comparação de custo, de modo que “n/d” não deve ser lido como custo zero.", {
    x: M, y: 5.94, w: W - 2 * M, h: 0.42, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, color: INK2, lineSpacing: 15,
  });
  fonteNota(s, 6.36, "Fonte: Seções 3.3 e 3.4 do relatório, e a lista de referências da Seção 8, que separa livros-texto, organismos normatizadores, documentação de fabricante e medições de terceiros. Os 214–271 ns do CXL vêm de medição revisada por pares que este trabalho não chegou a fixar com autor e ano, e devem ser lidos como ordem de grandeza.");
  footB(s);
  s.addNotes("Este slide existe para responder de onde vem qualquer número da tabela. A regra que o grupo adotou é que cada célula pertence a uma destas cinco categorias, e que a quinta, a lacuna declarada, é uma resposta legítima. Foi essa disciplina que impediu duas invenções de aparecerem no trabalho, e as duas estão registradas no Post-Mortem. Se perguntarem pelo preço do 9100 PRO, vale dizer que é MSRP de lançamento e que sozinho ele não atende ao requisito de preço corrente do enunciado.");
}
/* --- B2: derivações aritméticas --- */
{
  const s = slideLight();
  head(s, "As contas, por extenso", "Backup · derivações");
  const contas = [
    ["Preço por KB (SRAM)", "US$ 199 ÷ 67.108,864 KB = 2,97×10⁻³ /KB", "Delta entre o 9950X3D2 (192 MB de L3, US$ 899) e o 9950X3D (128 MB, US$ 700)"],
    ["Razão topo/base", "2,97×10⁻³ ÷ 4,89×10⁻⁹ = 607.000×", "SRAM contra cartucho LTO-9, este a US$ 87,99 ÷ 1,8×10¹⁰ KB"],
    ["Latência rotacional", "60 ÷ 7.200 ÷ 2 = 4,16 ms", "Meia rotação a 7.200 rpm, valor que a Seagate publica no datasheet"],
    ["Varredura de disco", "32 TB ÷ 285 MB/s = 31,2 h", "Contra 8 TB ÷ 200 MB/s = 11,1 h em 2014: a capacidade subiu mais que a banda"],
    ["SATA 3.0 útil", "6,0 Gb/s × 8/10 ÷ 8 = 600 MB/s", "Codificação 8b/10b, 80% de eficiência"],
    ["PCIe 5.0 ×4", "32 GT/s × 4 × 128/130 ÷ 8 = 15,754 GB/s", "Codificação 128b/130b, 98,46% de eficiência"],
    ["SAS-4 útil", "22,5 Gb/s × 128/150 ÷ 8 = 2.400 MB/s", "“24G” é nome comercial; a taxa de sinalização é 22,5 Gb/s"],
    ["Limite ilustrativo de commits", "1 ÷ latência do fsync", "Ignora group commit, cache protegido, fila e CPU, então não é throughput previsto do SGBD"],
    ["Banda DDR5-6000", "6.000 MT/s × 8 B × 2 canais = 96 GB/s", "Dois canais, que é a configuração do kit de desktop da tabela"],
    ["Latência L3 do Zen 5", "(46,5 + 4) ÷ 5,6 GHz = 9,02 ns", "5,6 GHz é o boost oficial, mas a contagem de ciclos é derivação nossa e não especificação"],
  ];
  contas.forEach((c, i) => {
    const x = M + (i % 2) * 6.15, y = 1.78 + Math.floor(i / 2) * 0.98;
    card(s, x, y, 5.85, 0.86);
    s.addText(c[0], { x: x + 0.26, y: y + 0.09, w: 2.5, h: 0.3, isTextBox: true, margin: 0, fontFace: FB, fontSize: 11, bold: true, color: INK });
    s.addText(c[1], { x: x + 2.75, y: y + 0.09, w: 2.95, h: 0.3, isTextBox: true, margin: 0, fontFace: "Courier New", fontSize: 10, color: ACC });
    s.addText(c[2], { x: x + 0.26, y: y + 0.42, w: 5.4, h: 0.4, isTextBox: true, margin: 0, fontFace: FB, fontSize: 10, color: INK2, lineSpacing: 13 });
  });
  fonteNota(s, 6.76, "Fonte: notas de rodapé da Tabela 16.1 e Seção 4.1 do relatório. Todas as contas acima são reproduzidas pelo script verificar.py, que acompanha a entrega e falha se algum número do texto divergir.");
  footB(s);
  s.addNotes("Se pedirem uma conta, está aqui. Vale marcar as duas linhas que são derivação nossa e não especificação publicada: a latência de L3 do Zen 5, em que a contagem de ciclos vem de medição de terceiro e só a frequência é oficial, e o limite de commits, que é ilustrativo e ignora group commit. O caso do SAS-4 é o que costuma gerar pergunta, porque 24G sugere 24 Gb/s e a taxa de sinalização real é 22,5 Gb/s.");
}
/* --- B3: fatores de forma e HBA --- */
{
  const s = slideLight();
  head(s, "Fatores de forma e HBA — o que não é protocolo", "Backup · M.2, U.2, EDSFF, HBA");
  const rows = [
    [hdr("Fator de forma"), hdr("Lanes"), hdr("Hot-swap"), hdr("Tensão / potência"), hdr("Uso")],
    ["M.2 2280", "×4 (M-key)", { text: "Não", options: { bold: true, color: ACC } }, "3,3 V — 8 a 11 W", "Boot, cliente, cache"],
    ["U.2 (SFF-8639)", "×4", "Sim", "12 V — 25 W", "Servidor, gaveta frontal"],
    ["U.3 (SFF-TA-1001)", "×4", "Sim", "12 V — 25 W", "Baia tri-modo: SAS, SATA ou NVMe"],
    ["E1.S / E1.L (EDSFF)", "×4", "Sim", "12 V — 16 a 40 W", "1U; E1.L é a “régua” de capacidade"],
    ["E3.S / E3.S 2T", "×4 ou ×8", "Sim", "12 V — 25 a 70 W", "Sucessor do U.2; o 2T aceita módulo CXL"],
  ];
  table(s, rows, { y: 1.75, rowH: 0.42, fontSize: 11.5, colW: [2.6, 1.5, 1.3, 2.4, 4.09] });
  s.addText("Por que o EDSFF está substituindo o U.2: SSDs PCIe 5.0/6.0 passam de 25 W e a lata de 2,5 polegadas não dissipa. O M.2, além de não ter hot-swap, só tem 3,3 V.", {
    x: M, y: 4.42, w: W - 2 * M, h: 0.4, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12, color: INK2, italic: true,
  });
  card(s, M, 4.92, W - 2 * M, 1.75, DARK);
  s.addText("HBA não é interface nem protocolo — é o adaptador", {
    x: M + 0.4, y: 5.1, w: 11, h: 0.3, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 11.5, bold: true, charSpacing: 1.3, color: ACC,
  });
  const hba = [
    "HBA em modo IT expõe os discos crus ao SO, sem cache nem metadados de RAID — é o que ZFS, Ceph e réplica por software exigem. Em modo RAID, faz RAID em hardware com cache protegido.",
    "Armadilha de durabilidade: HBA RAID com cache NÃO protegido por bateria pode confirmar um fsync antes da persistência. O SGBD acredita ter cumprido a durabilidade; a queda de energia prova o contrário.",
  ];
  s.addText(hba.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < hba.length - 1 } })), {
    x: M + 0.4, y: 5.44, w: 11.5, h: 1.15, isTextBox: true, margin: 0,
    fontFace: FB, fontSize: 12.5, color: LIGHT, lineSpacing: 17, paraSpaceAfter: 6,
  });
  footB(s);
  s.addNotes("O enunciado lista HBA, M.2 e U.2 entre as interfaces. Nenhum é protocolo — este slide explica a diferença de categoria sem fugir da lista.");
}

pres.writeFile({ fileName: process.env.OUTPUT_PPTX || "Slides_Armazenamento_SBD_v2.pptx" }).then(async () => {
  await require('../scripts/normalizar_pptx.cjs')(process.env.OUTPUT_PPTX || 'Slides_Armazenamento_SBD_v2.pptx');
  console.log("gerado: Slides_Armazenamento_SBD_v2.pptx  —  " + pg + " slides numerados + capa");
});
