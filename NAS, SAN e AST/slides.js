const PptxGenJS = require("pptxgenjs");
const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE";                 // 13.333 x 7.5 pol -- ANTES de add slides
pres.author = "Grupo CBD - UFRJ";
pres.title  = "Arquiteturas de Armazenamento para SBD: NAS, SAN, AST e Objetos";

const DARK="14181F", DARK2="232A35", INK="14181F", INK2="55606E",
      SOFT="F4F5F7", ACC="EB6834", BLUE="2A78D6", LINE="DFE3E8", W2="FFFFFF";
const TF="Cambria", BF="Calibri";
const M = 0.72, W = 13.333, CW = W - 2*M;

let n = 0;                                    // numeracao dos slides de corpo
const notas = [];

function base(){ const s = pres.addSlide(); s.background = { color: W2 }; return s; }

function rodape(s, num){
  s.addShape(pres.ShapeType.line, { x:M, y:6.86, w:CW, h:0, line:{ color:LINE, width:0.8 } });
  s.addText("NAS x SAN - Arquiteturas de armazenamento fisico para SBD", {
    x:M, y:6.95, w:9.6, h:0.30, isTextBox:true,
    fontFace:BF, fontSize:9, color:INK2 });
  if (num) s.addText(String(num), { x:W-M-0.7, y:6.95, w:0.7, h:0.30, isTextBox:true,
    fontFace:BF, fontSize:9, color:INK2, align:"right" });
}

function titulo(s, t, sub){
  s.addText(t, { x:M, y:0.42, w:CW, h:0.60, isTextBox:true,
    fontFace:TF, fontSize:26, bold:true, color:INK });
  if (sub) s.addText(sub, { x:M, y:1.02, w:CW, h:0.36, isTextBox:true,
    fontFace:BF, fontSize:13, color:INK2 });
}

// slide de conteudo padrao
function slide(t, sub, nota){
  n += 1; const s = base(); titulo(s, t, sub); rodape(s, n);
  notas.push(nota || ""); s.addNotes(nota || "");
  return s;
}
function slideBackup(t, sub, nota){
  const s = base(); titulo(s, t, sub);
  s.addShape(pres.ShapeType.rect, { x:W-M-1.55, y:0.44, w:1.55, h:0.32, fill:{color:SOFT}, line:{color:LINE,width:0.7} });
  s.addText("BACKUP", { x:W-M-1.55, y:0.44, w:1.55, h:0.32, isTextBox:true,
    fontFace:BF, fontSize:9.5, bold:true, color:ACC, align:"center" });
  rodape(s, null); s.addNotes(nota || "");
  return s;
}

// cartao horizontal de uma linha
function card(s, x, y, w, h, titulo_, texto, cor){
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color: cor || LINE, width:1.0 } });
  const tc = (!cor || cor === LINE) ? INK : cor;
  s.addText(titulo_, { x:x+0.20, y:y+0.09, w:w-0.4, h:0.28, isTextBox:true,
    fontFace:BF, fontSize:12.5, bold:true, color: tc });
  if (texto) s.addText(texto, { x:x+0.20, y:y+0.34, w:w-0.4, h:h-0.42, isTextBox:true,
    fontFace:BF, fontSize:11, color:INK2, valign:"top" });
}

function bullets(s, y, itens, fs){
  s.addText(itens.map(t => ({ text:t, options:{ bullet:{ code:"2022" }, breakLine:true } })), {
    x:M, y:y, w:CW, h:6.6-y, isTextBox:true, fontFace:BF, fontSize: fs||14,
    color:INK, lineSpacingMultiple:1.18, valign:"top" });
}

function fonteNota(s, y, txt){
  s.addText(txt, { x:M, y:y, w:CW, h:0.32, isTextBox:true,
    fontFace:BF, fontSize:9.5, italic:true, color:INK2 });
}

function tabela(s, y, head, rows, colW, fs, rowH){
  const body = [ head.map(h => ({ text:h, options:{ bold:true, color:W2, fill:{color:DARK2}, fontSize:(fs||11) } })) ]
    .concat(rows.map(r => r.map(c => ({ text:c, options:{ color:INK, fontSize:(fs||11) } }))));
  s.addTable(body, { x:M, y:y, w:CW, colW:colW, rowH: rowH||0.36,
    fontFace:BF, border:{ type:"solid", color:LINE, pt:0.6 }, valign:"middle", autoPage:false });
}

/* ============================== 1. CAPA / FOLHA DE ROSTO ============================== */
{
  const s = pres.addSlide(); s.background = { color: DARK };
  s.addText("Arquiteturas de Armazenamento Físico\npara Sistemas de Banco de Dados", {
    x:M, y:0.66, w:CW, h:1.30, isTextBox:true,
    fontFace:TF, fontSize:31, bold:true, color:W2, lineSpacingMultiple:1.06 });
  s.addShape(pres.ShapeType.line, { x:M, y:2.10, w:3.4, h:0, line:{ color:ACC, width:2.6 } });
  s.addText("NAS, SAN, Automated Storage Tiering e armazenamento por objetos", {
    x:M, y:2.26, w:CW, h:0.40, isTextBox:true, fontFace:BF, fontSize:16, color:"C9D1DC" });
  s.addText("Construção de Banco de Dados  ·  IM / DCC — UFRJ  ·  Prof. Milton Ramirez", {
    x:M, y:2.70, w:CW, h:0.32, isTextBox:true, fontFace:BF, fontSize:12, color:"8D99A8" });

  const nomes = [
    ["Bernardo Brandão Pozzato Carvalho Costa","123289593"],
    ["Enzo de Carvalho Sampaio","123386206"],
    ["Gabriel Schmitz Corrêa Rizawinsk","123225573"],
    ["Guilherme En Shih Hu","123224674"],
    ["Raphael Henrique da Silva Pereira","123311073"],
    ["Vivian Maria da Silva e Souza","123205793"],
  ];
  const rows = [[{text:"Nome completo",options:{bold:true,color:W2,fill:{color:DARK2}}},
                 {text:"DRE",options:{bold:true,color:W2,fill:{color:DARK2}}}]]
    .concat(nomes.map(p => [ {text:p[0],options:{color:"E7EBF1"}}, {text:p[1],options:{color:"E7EBF1"}} ]));
  s.addTable(rows, { x:M, y:3.30, w:8.6, colW:[6.6,2.0], rowH:0.42, fontFace:BF, fontSize:12.5,
    fill:{color:DARK}, border:{ type:"solid", color:"3A4454", pt:0.6 }, valign:"middle" });
  s.addText("Rio de Janeiro  ·  Setembro de 2026", {
    x:M, y:6.62, w:CW, h:0.32, isTextBox:true, fontFace:BF, fontSize:11.5, color:"8D99A8" });
  s.addNotes("Folha de rosto. Apresentar o grupo e o objeto do trabalho: comparar NAS e SAN como arquiteturas de armazenamento físico para SBD, cobrindo protocolos, AST, object storage e a recomendação por nível secundário e terciário.");
}

/* ============================== 2. ROTEIRO ============================== */
{
  const s = slide("Roteiro", "O enunciado tem 20 itens obrigatórios; cada um tem lugar marcado",
    "Deixar claro desde o início que a apresentação segue a lista do enunciado item a item. Mencionar que o relatório traz uma tabela de checklist mapeando cada exigência à seção correspondente.");
  const it = [
    ["1", "A distinção que decide tudo", "Bloco x arquivo, e o que o Database Engine exige"],
    ["2", "NAS", "Como funciona + SMB/CIFS, NFS e AFP"],
    ["3", "SAN", "Como funciona + FC, FC Switch, iSCSI, FCIP e FCoE"],
    ["4", "AST e Object Storage", "Tiering automatizado e o terceiro paradigma"],
    ["5", "Recomendação", "Nível secundário (online) e terciário (offline)"],
    ["6", "Exemplos reais e correções", "Casos documentados + 3 correções ao material-fonte"],
  ];
  let y = 1.62;
  it.forEach(r => {
    card(s, M, y, CW, 0.78, r[1], r[2], BLUE);
    s.addText(r[0], { x:W-M-0.75, y:y+0.20, w:0.55, h:0.40, isTextBox:true,
      fontFace:TF, fontSize:19, bold:true, color:LINE, align:"right" });
    y += 0.86;
  });
}

/* ============================== 3. A TESE ============================== */
{
  const s = slide("A pergunta não é de velocidade", "É de unidade de abstração",
    "Este é o slide-chave. Se o professor perguntar uma coisa só, é esta. A diferença entre NAS e SAN não é o cabo nem a banda: é ONDE a fronteira de rede corta a pilha de E/S. Todas as outras diferenças (protocolo, custo, compartilhamento, modelo de falha) decorrem daí.");
  s.addShape(pres.ShapeType.roundRect, { x:M, y:1.62, w:CW, h:1.34, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("SAN move a fronteira de rede ABAIXO do sistema de arquivos: o servidor recebe blocos e continua dono do sistema de arquivos.\nNAS move a fronteira ACIMA: o servidor recebe arquivos, e o sistema de arquivos é do dispositivo de armazenamento.", {
    x:M+0.30, y:1.76, w:CW-0.6, h:1.06, isTextBox:true,
    fontFace:BF, fontSize:15.5, color:W2, lineSpacingMultiple:1.12 });
  card(s, M, 3.16, 6.35, 1.55, "SAN — semântica de BLOCO",
    "O SGBD controla alocação, ordenação de escrita\ne atomicidade de página. Rede dedicada.\nCompartilhar exige FS de cluster.", BLUE);
  card(s, M+6.65, 3.16, 6.35, 1.55, "NAS — semântica de ARQUIVO",
    "O dispositivo é dono do FS: aloca, faz journaling\ne arbitra travamento. Compartilhamento nativo.\nCoerência de cache é fraca por padrão.", ACC);
  s.addText("Consequência: a escolha certa é a que o Database Engine precisa controlar — não a que tem o cabo mais rápido.", {
    x:M, y:4.92, w:CW, h:0.40, isTextBox:true, fontFace:BF, fontSize:14, bold:true, color:INK });
  fonteNota(s, 5.40, "Fontes: Silberschatz et al., §12.2; Elmasri & Navathe, §16.11.1 e §16.11.2.");
}

/* ============================== 4. FIGURA DAS PILHAS ============================== */
{
  const s = slide("Onde a rede corta a pilha de E/S", "DAS não corta; SAN corta abaixo do FS; NAS corta acima",
    "Explicar a figura da esquerda para a direita. Em DAS não há rede no caminho. Em SAN a rede carrega blocos SCSI ou NVMe. Em NAS a rede carrega operações de arquivo. As caixas sombreadas são as camadas que deixam de ser responsabilidade do servidor de banco de dados.");
  s.addImage({ path:"fig/pilhas.png", x:M+0.15, y:1.56, w:CW-0.3, h:4.55 });
  fonteNota(s, 6.24, "Elaboração própria a partir das definições de Silberschatz §12.2 e Elmasri & Navathe §16.11.");
}

/* ============================== 5. O QUE O ENGINE EXIGE ============================== */
{
  const s = slide("O que o Database Engine exige do armazenamento", "Cinco requisitos, em ordem de rigidez",
    "Esta é a régua contra a qual NAS e SAN devem ser avaliados — e não um benchmark genérico. Destacar o item 2: é a LATÊNCIA do fsync, não a banda, que limita a taxa de commits em OLTP. E o item 3: torn page é o motivo de existir o doublewrite buffer do InnoDB e o full_page_writes do PostgreSQL.");
  const it = [
    ["1. Acesso em blocos/páginas", "8 KiB no PostgreSQL e Oracle; 16 KiB no InnoDB. Toda a modelagem de custo de E/S é construída sobre essa unidade."],
    ["2. Durabilidade sob comando (fsync)", "O commit só retorna com o log em mídia não volátil. É a LATÊNCIA dessa chamada — não a banda — que limita a vazão de OLTP."],
    ["3. Atomicidade da escrita de página", "Se a energia cai no meio de uma página de 16 KiB, é preciso detectar e reparar. InnoDB: doublewrite buffer. PostgreSQL: full_page_writes."],
    ["4. Travamento previsível", "Em cluster com armazenamento compartilhado, vários nós escrevem nos mesmos blocos. Tem de ser correto sob falha de nó."],
    ["5. Comportamento sob falha transitória", "Se o caminho some por 30 s: bloqueia, erra, ou devolve sucesso falso? A diferença decide se a instância sobrevive."],
  ];
  let y = 1.60;
  it.forEach(r => { card(s, M, y, CW, 0.94, r[0], r[1], r[0][0]==="2"||r[0][0]==="3" ? ACC : LINE); y += 1.02; });
}

/* ============================== 6. NAS ============================== */
{
  const s = slide("NAS — como funciona", "O dispositivo é dono do sistema de arquivos",
    "Citar Elmasri & Navathe: os dispositivos NAS 'são, de fato, servidores que não fornecem nenhum dos serviços comuns de servidor, mas simplesmente permitem a adição de armazenamento para compartilhamento de arquivos'. O NAS head é a interface entre o sistema e os clientes de rede.");
  bullets(s, 1.58, [
    "O NAS head possui discos organizados internamente, tipicamente em RAID — Elmasri & Navathe registram suporte típico a RAID 0, 1 e 5",
    "Sobre esse armazenamento, o NAS head MONTA E OPERA UM SISTEMA DE ARQUIVOS PRÓPRIO (WAFL, ZFS, XFS…)",
    "Esse sistema de arquivos é exportado pela LAN por SMB/CIFS, NFS ou AFP",
    "O cliente monta o compartilhamento e enxerga arquivos e diretórios — emite open/read/write/close/lock, não comandos de bloco",
  ], 14);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.10, w:CW, h:1.28, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.2 } });
  s.addText("O ponto que decide tudo: quem executa a alocação de blocos, o journaling de metadados e o controle de concorrência de arquivo é o DISPOSITIVO NAS, não o servidor de banco de dados. O servidor delega.", {
    x:M+0.26, y:4.26, w:CW-0.52, h:0.98, isTextBox:true, fontFace:BF, fontSize:14, color:INK });
  fonteNota(s, 5.56, "Elmasri & Navathe, §16.11.2; Silberschatz et al., §12.2.");
}

/* ============================== 7. SMB/CIFS ============================== */
{
  const s = slide("Protocolo NAS I — SMB/CIFS", "CIFS não é outro protocolo: é o nome que a Microsoft deu, em 1996, à família SMB 1",
    "Ponto de arguição provável: 'qual a diferença entre SMB e CIFS?'. Resposta: nenhuma de natureza — a Microsoft documenta que o CIFS é um DIALETO do SMB. CIFS designa a família SMB 1. Ao especificar 'SMB/CIFS' num projeto novo em 2026, o que se está de fato especificando é SMB 3.");
  tabela(s, 1.58,
    ["Dialeto","Introduzido em","O que trouxe de relevante"],
    [
      ["SMB 1.0 (CIFS)","Anos 1980–90","Protocolo original; verboso, muitas idas e voltas por operação"],
      ["SMB 2.0","Vista / Server 2008","Reescrita: comandos reduzidos, requisições compostas, créditos"],
      ["SMB 2.1","Win 7 / 2008 R2","Leasing de arquivo (cache de cliente mais agressivo e correto)"],
      ["SMB 3.0","Win 8 / Server 2012","SMB Direct (RDMA), Multichannel, transparent failover, AES-128-CCM"],
      ["SMB 3.0.2","Win 8.1 / 2012 R2","E/S pequena e aleatória; SMB1 pode ser removido por completo"],
      ["SMB 3.1.1","Win 10 / Server 2016","Integridade da negociação pré-autenticação; AES-128-GCM"],
    ], [1.75,2.35,7.79], 11, 0.44);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.86, w:CW, h:1.18, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:BLUE, width:1.2 } });
  s.addText("Uso com SGBD: a Microsoft suporta arquivos do SQL Server 2012+ em fileshare SMB — bancos de sistema e de usuário. Exige SMB 3.0 transparent failover para carga crítica. FILESTREAM NÃO é suportado. Só caminhos UNC.", {
    x:M+0.26, y:5.00, w:CW-0.52, h:0.92, isTextBox:true, fontFace:BF, fontSize:13, color:INK });
  fonteNota(s, 6.14, "Fonte: Microsoft Learn — [MS-SMB2] e 'Install SQL Server with SMB Fileshare Storage'.");
}

/* ============================== 8. NFS ============================== */
{
  const s = slide("Protocolo NAS II — NFS", "É o protocolo NAS que aparece em instalações sérias de banco de dados",
    "Marcos: NFSv3 é SEM ESTADO e deixa o travamento fora do protocolo (NLM), o que torna a recuperação após falha frágil. NFSv4 integra travamento e usa uma única porta (2049), o que o torna atravessável por firewall. NFSv4.1 traz sessões com semântica exactly-once e pNFS.");
  tabela(s, 1.52,
    ["Versão","Introduzida","Norma vigente","Característica determinante"],
    [
      ["NFSv2","1989","RFC 1094","Sobre UDP; offsets de 32 bits (limite de 2 GiB por arquivo)"],
      ["NFSv3","1995","RFC 1813","64 bits, escrita assíncrona com COMMIT. SEM ESTADO: travamento fora do protocolo (NLM)"],
      ["NFSv4.0","2000","RFC 7530 (2015)","COM ESTADO. Travamento e ACLs no protocolo; operações COMPOUND; porta única 2049"],
      ["NFSv4.1","2010","RFC 8881 (2020)","Sessões dão semântica exactly-once (com SEQUENCE à frente); pNFS separa metadados de dados"],
      ["NFSv4.2","2016","RFC 7862","Cópia no servidor, arquivos esparsos, hole punching"],
    ], [1.35,1.35,2.05,7.14], 10.5, 0.46);
  s.addText("Cuidado ao ler: “norma vigente” é a RFC EM VIGOR, muitas vezes uma reedição — por isso a v4.2 (2016) parece anteceder a v4.1 (2020). A cronologia real está na coluna “introduzida”.", {
    x:M, y:4.14, w:CW, h:0.30, isTextBox:true, fontFace:BF, fontSize:11, italic:true, color:ACC });
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.52, w:CW, h:1.62, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.2 } });
  s.addText("O calcanhar de Aquiles é a coerência de cache: o NFS usa close-to-open. O manual nfs(5) do Linux é explícito — “se coerência absoluta de cache entre clientes for necessária, as aplicações devem usar travamento de arquivo” ou “abrir seus arquivos com a flag O_DIRECT”. É por isso que a Oracle reimplementou o cliente NFS DENTRO do motor: o Direct NFS (dNFS), com suporte a NFSv3, v4, v4.1 e pNFS.\nE o requisito 5 (comportamento sob falha transitória) tem resposta concreta aqui: a opção de montagem hard vs soft. Com hard, a E/S bloqueia até o servidor voltar; com soft, retorna erro e o SGBD pode corromper. Para banco, a recomendação dos fornecedores é hard.", {
    x:M+0.26, y:4.62, w:CW-0.52, h:1.42, isTextBox:true, fontFace:BF, fontSize:11.5, color:INK });
  fonteNota(s, 6.26, "Fontes: RFCs do IETF; man 5 nfs (Linux); Oracle Database Installation Guide 19c.");
}

/* ============================== 9. AFP ============================== */
{
  const s = slide("Protocolo NAS III — AFP", "Como funciona, por que existiu, e por que acabou",
    "PERGUNTA PROVÁVEL, e a primeira versão deste deck não sabia responder: 'explique como o AFP FUNCIONA — não o que aconteceu com ele'. O enunciado pede 'como funciona cada uma das soluções', e nós tínhamos só o obituário. Resposta: protocolo de sessão COM ESTADO, sobre TCP/548 via DSI; comandos bifurcados por fork (FPOpenFork, FPRead/FPWrite) porque o arquivo do Mac tem data fork e resource fork; metadados do Finder como atributos de primeira classe; travamento por intervalo de bytes com FPByteRangeLock, mas amarrado à SESSÃO. Segunda armadilha: cliente ≠ servidor. Dizer 'removido no Big Sur' erra por cinco anos — removeu o SERVIDOR.");
  card(s, M, 1.50, 6.35, 2.42, "Como funciona",
    "• Sessão COM ESTADO: FPLogin → FPOpenVol →\n   operações sobre identificadores de sessão\n• Sobre TCP porta 548, enquadrado pelo DSI\n• Comandos BIFURCADOS por fork: FPOpenFork,\n   FPRead / FPWrite — o arquivo do Mac tem\n   data fork e resource fork\n• Metadados do Finder como atributos de\n   primeira classe, não emulação\n• FPByteRangeLock, mas com semântica de\n   SESSÃO: o travamento morre com ela", BLUE);
  card(s, M+6.65, 1.50, 6.35, 2.42, "Por que existiu — e o que nunca teve",
    "EXISTIU porque SMB1 e NFS da época não sabiam\nrepresentar o resource fork sem truques (arquivos\n._nome, AppleDouble), e o resultado era corrupção\nsilenciosa de metadados.\n\nNUNCA TEVE: RDMA, múltiplos canais, disponibilidade\ncontínua com failover transparente, nem travamento\nindependente de sessão. Parou no conjunto de\nrecursos de um protocolo de escritório.", INK2);
  let y = 4.08;
  [["macOS 11 (2020)","Removido o SERVIDOR AFP: um Mac deixa de poder compartilhar pastas por AFP.", LINE],
   ["macOS 15.5 (mai./2025)","Depreciado o CLIENTE. Texto da Apple: “Apple Filing Protocol (AFP) client is deprecated and will be removed in a future version of macOS.”", LINE],
   ["macOS 27 (Apple, jul./2026)","A Apple informa oficialmente o fim do suporte do Time Machine a destinos AFP.", ACC],
  ].forEach(r => { card(s, M, y, CW, 0.68, r[0], r[1], r[2]); y += 0.76; });
  s.addText("Relevância para novas implantações de SBD: protocolo legado e não recomendado. Nas matrizes consultadas de Oracle, Microsoft, PostgreSQL e MySQL, AFP não aparece como configuração suportada. Para NAS com clientes Apple: SMB 3.", {
    x:M, y:6.38, w:CW, h:0.42, isTextBox:true, fontFace:BF, fontSize:10.5, bold:true, color:INK });
}

/* ============================== 10. NAS vantagens/desvantagens ============================== */
{
  const s = slide("NAS — vantagens e desvantagens", "Sob a ótica de um SBD",
    "Não ler a tabela inteira: destacar a linha de coerência de cache (é a que explica o dNFS) e a de custo (é a que explica por que NAS domina data warehouse).");
  tabela(s, 1.58, ["Vantagens","Desvantagens"],
    [
      ["Usa a rede Ethernet/IP existente: sem HBA, sem switch FC, sem equipe especializada","Compete por banda com o tráfego de aplicação, salvo VLAN ou rede física separada"],
      ["Compartilhamento concorrente nativo, sem FS de cluster","Coerência de cache fraca por padrão (close-to-open); exige O_DIRECT ou cliente dedicado"],
      ["Provisionamento simples: criar compartilhamento e dar permissão","Camada extra de FS no caminho: metadados, travamento e journaling somam latência"],
      ["Independência de sistema operacional dos clientes","Escrita atômica de página não é garantida pelo protocolo"],
      ["Instantâneos e clones no nível de arquivo, com granularidade compreensível","Nem todo recurso do SGBD funciona (FILESTREAM não é suportado sobre SMB)"],
      ["Menor custo por TB útil, de aquisição e de operação","Depende de SMB 3 transparent failover / NFSv4.1 para sobreviver a falhas"],
    ], [5.945,5.945], 11, 0.62);
  fonteNota(s, 6.34, "Elaboração própria a partir de Elmasri & Navathe §16.11.2, Microsoft Learn e man 5 nfs.");
}

/* ============================== 11. SAN ============================== */
{
  const s = slide("SAN — como funciona", "O servidor vê um dispositivo de bloco cru, indistinguível de um disco local",
    "Citar Silberschatz: a SAN dá aos servidores 'uma visão lógica de um disco muito grande e muito confiável'. E Elmasri: 'os dispositivos ligados à SAN aparecem como dispositivos SCSI'. É uma ilusão deliberada, e é ela que faz a SAN funcionar — o SGBD não precisa saber que há uma rede no caminho.");
  bullets(s, 1.58, [
    "O array agrega discos em pools protegidos por RAID ou codificação de apagamento",
    "Do pool, o administrador recorta volumes e os apresenta como LUNs (Logical Unit Numbers)",
    "Uma rede dedicada transporta COMANDOS SCSI (ou NVMe) entre iniciador no servidor e alvo no array",
    "O SO vê um dispositivo de bloco cru: /dev/sdb. Formata com o próprio FS, ou entrega cru ao SGBD (é o que o Oracle ASM faz)",
  ], 14);
  card(s, M, 4.10, 6.35, 1.60, "Controle de acesso em duas camadas",
    "Zoneamento (no switch): quais iniciadores veem quais alvos.\nLUN masking (no array): quais LUNs cada iniciador enxerga.\nJuntos, impedem que o servidor de teste monte o LUN de produção.", BLUE);
  card(s, M+6.65, 4.10, 6.35, 1.60, "Rede sem perdas por BB_Credit",
    "A porta só transmite se tiver crédito; o crédito volta quando o\nreceptor libera um buffer. Sem descarte por congestionamento —\né isso que permite dispensar o TCP. Brocade G710: 2000 buffers.", ACC);
  fonteNota(s, 5.88, "Fontes: Silberschatz et al. §12.2; Elmasri & Navathe §16.11.1; Broadcom, Brocade G710 Product Brief.");
}

/* ============================== 12. TOPOLOGIAS ============================== */
{
  const s = slide("Topologias FC — o “FC Switch” do enunciado", "Tecnicamente é uma TOPOLOGIA, não um protocolo",
    "Decisão consciente do grupo: o enunciado lista 'FC Switch' entre as variações de protocolo, mas a norma T11 o define como topologia. Atendemos o item E explicamos a distinção. PERGUNTA PROVÁVEL sobre a caixa de latência: 'dois saltos ainda são locally switched?' — resposta honesta: não, dois saltos implicam ISL, que não é comutação local; por isso o escopo está declarado no slide e a latência da controladora do array está fora da conta. Outra pergunta provável: 'a fabric escala a milhões de endereços?' — o espaço é 2^24, mas o campo Domain_ID tem 239 valores válidos e os fornecedores suportam algumas dezenas de domínios por fabric. É verdade teórica, não prática.");
  let y = 1.60;
  [["Ponto-a-ponto (FC-P2P)","Dois dispositivos ligados diretamente. Banda integralmente dedicada, conectividade de dois nós apenas. Uso residual.", LINE],
   ["Arbitrated loop (FC-AL)","126 NL_Ports + 1 FL_Port = 127 endereços num anel compartilhado. Banda compartilhada; inserir um nó reinicializa o anel (LIP) e pausa a E/S. OBSOLETA.", LINE],
   ["Switched fabric (FC-SW)","É a topologia real de qualquer SAN FC moderna. Comutação cut-through, banda dedicada por porta, roteamento FSPF, zoneamento, 24 bits de endereço. Prática padrão: DUAS fabrics fisicamente independentes (SAN A / SAN B).", BLUE],
  ].forEach(r => { card(s, M, y, CW, 1.18, r[0], r[1], r[2]); y += 1.28; });
  s.addShape(pres.ShapeType.roundRect, { x:M, y:5.44, w:CW, h:1.06, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.2 } });
  s.addText("Datasheet Brocade G710: “Latency for locally switched ports is 460 ns (including FEC)” — UM SALTO, comutação local.  Derivação nossa, escopo declarado: 2 × 0,46 µs ÷ 20 µs = 4,6% do acesso, contra o PISO da faixa de latência de SSD (20–100 µs) do Silberschatz.  O que isso prova: a COMUTAÇÃO não é o gargalo. O que NÃO prova: que “a rede” seja 5% — o número exclui HBA, ISL, propagação e o tempo da CONTROLADORA do array, que nenhum fabricante publica de forma comparável (lacuna declarada).", {
    x:M+0.26, y:5.56, w:CW-0.52, h:0.88, isTextBox:true, fontFace:BF, fontSize:11, color:INK });
}

/* ============================== 13. VELOCIDADES FC ============================== */
{
  const s = slide("Velocidades FC — a armadilha de rótulo", "Três números diferentes atendem por “128GFC”",
    "SLIDE DE MAIOR RISCO DE PERGUNTA. Três coisas para ter na ponta da língua. (1) A prova de que a FCIA publica full-duplex é FÍSICA: a vazão publicada excede a taxa de linha, e uma direção não pode transportar mais bits do que a linha sinaliza. (2) A FCIA NÃO declara isso em lugar nenhum — a leitura é DERIVAÇÃO NOSSA, e dizemos. (3) A convenção X GFC = X×100 MB/s QUEBRA na Gen 8, porque a linha ficou em 112,2 Gb/s e não nos 115,6 que dobrar exigiria. Nossa primeira versão publicava a tabela de 2016 e afirmava 'fator exatamente 2' — as duas coisas erradas, e é o erro mais grave que cometemos.");
  tabela(s, 1.52,
    ["Produto","FCIA (MB/s)","Por direção (derivado)","Taxa de linha (GBd)","T11","Mercado"],
    [
      ["16GFC","3.200","1.600","14,025 NRZ","2009","2011"],
      ["32GFC","6.400","3.200","28,05 NRZ","2013","2016"],
      ["64GFC","12.800","6.400","28,9 PAM-4","2017","2020"],
      ["128GFC  (serial, Gen 8)","24.850","12.425","56,1 PAM-4","2022","2024"],
      ["128GFC  (ISL, 4 vias)","25.600","12.800","4 × 28,05 NRZ","2014","2016"],
    ], [3.05,1.65,2.20,2.55,1.10,1.35], 11, 0.42);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.06, w:6.35, h:2.28, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("A prova é de física, não de opinião", {
    x:M+0.24, y:4.16, w:6.0, h:0.28, isTextBox:true, fontFace:BF, fontSize:13, bold:true, color:"FFD9C7" });
  s.addText("16GFC:  3.200 MB/s = 25,6 Gb/s\nmas a linha sinaliza 14,025 Gb/s.\n\n128GFC:  24.850 MB/s = 198,8 Gb/s\nmas a linha sinaliza 112,2 Gb/s.\n\nUma direção não pode transportar mais bits\ndo que a linha sinaliza → é a SOMA DOS DOIS SENTIDOS.", {
    x:M+0.24, y:4.48, w:6.0, h:1.76, isTextBox:true, fontFace:BF, fontSize:11.5, color:W2, lineSpacingMultiple:1.02 });
  s.addShape(pres.ShapeType.roundRect, { x:M+6.65, y:4.06, w:6.35, h:2.28, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.2 } });
  s.addText("A convenção quebra na Gen 8", {
    x:M+6.89, y:4.16, w:6.0, h:0.28, isTextBox:true, fontFace:BF, fontSize:13, bold:true, color:ACC });
  s.addText("Até o 64GFC:  X GFC = X × 100 MB/s por direção.\n\nNo 128GFC:  24.850 ÷ 2 = 12.425, e não 12.800.\nRazão = 1,94, não 2,00.\n\nPorque a linha ficou em 112,2 Gb/s: a FCIA registra\nque dobrar exigiria 115,6 Gb/s, “inviável para fechar\no link budget”. O nome “128” é arredondamento.", {
    x:M+6.89, y:4.48, w:6.0, h:1.76, isTextBox:true, fontFace:BF, fontSize:11.5, color:INK, lineSpacingMultiple:1.02 });
  fonteNota(s, 6.44, "Proveniência: FCIA Fibre Channel Roadmap, speedmap v24 (jul./2023), consultado em set./2026. O terceiro “128GFC” é o legado do FC-PI-8 rev. 1.4: 12.800 MB/s, que a T11 decidiu não atualizar.");
}

/* ============================== 14. iSCSI ============================== */
{
  const s = slide("Protocolo SAN I — iSCSI", "Bloco cru sobre Ethernet comum, e roteável na Internet",
    "Elmasri & Navathe são precisos sobre o efeito de mercado: o iSCSI impactou principalmente empresas de pequeno e médio porte, e as grandes foram lentas por causa do investimento prévio em FC. Norma vigente: RFC 7143 (2014), que obsoleta a RFC 3720 — nossa primeira versão citou a 3720.");
  bullets(s, 1.56, [
    "Encapsula comandos SCSI dentro de TCP/IP — norma vigente: RFC 7143 (2014), que obsoleta a RFC 3720 (2004)",
    "Iniciador (servidor) e alvo (array) identificados por IQN: iqn.2026-09.br.ufrj.dcc:servidor01",
    "TCP porta 3260 · autenticação CHAP · confidencialidade opcional por IPsec · descoberta por SendTargets ou iSNS",
    "Vantagem citada pelo livro: “não requer o cabeamento especial necessário ao Fibre Channel e pode operar a distâncias maiores usando a infraestrutura de rede existente”",
  ], 13.5);
  card(s, M, 4.28, 6.35, 1.72, "O custo: a pilha TCP/IP",
    "Processamento no host, controle de congestionamento\ne perda de quadros sob congestão.", INK2);
  card(s, M+6.65, 4.28, 6.35, 1.72, "As três mitigações modernas",
    "TOE / HBA iSCSI dedicada (pilha no adaptador)\niSER — iSCSI Extensions for RDMA\nDCB no switch: classe Ethernet sem perdas", BLUE);
  fonteNota(s, 6.16, "Fontes: IETF RFC 7143; Elmasri & Navathe, §16.11.3.");
}

/* ============================== 15. FCIP ============================== */
{
  const s = slide("Protocolo SAN II — FCIP", "Não substitui o FC: é um TÚNEL entre duas fabrics FC distantes",
    "Confusão comum e provável alvo de pergunta: iSCSI SUBSTITUI o FC (não há fabric em lugar nenhum); FCIP PRESERVA o FC (as duas pontas são fabrics completas, e o túnel as FUNDE em uma só). Daí o risco operacional: um evento de reconfiguração num sítio se propaga ao outro — por isso existem FC routing e IVR.");
  card(s, M, 1.56, 6.35, 1.62, "iSCSI substitui o FC",
    "O servidor não tem HBA de Fibre Channel.\nFala SCSI sobre TCP/IP de ponta a ponta.\nNão existe fabric FC em lugar nenhum.", BLUE);
  card(s, M+6.65, 1.56, 6.35, 1.62, "FCIP preserva o FC",
    "As duas pontas são fabrics FC completas, com HBAs,\nWWNs e zoneamento. O túnel carrega quadros FC pela\nWAN IP e FUNDE as duas fabrics em uma só.", ACC);
  s.addText("Norma: IETF RFC 3821 (2004). Caso de uso real, e único: replicação entre sítios para recuperação de desastre.", {
    x:M, y:3.36, w:CW, h:0.34, isTextBox:true, fontFace:BF, fontSize:13.5, bold:true, color:INK });
  s.addShape(pres.ShapeType.roundRect, { x:M, y:3.82, w:CW, h:2.14, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.2 } });
  s.addText("Por que a distância decide entre síncrono e assíncrono — derivação nossa", {
    x:M+0.26, y:3.94, w:CW-0.52, h:0.30, isTextBox:true, fontFace:BF, fontSize:13, bold:true, color:ACC });
  s.addText("Velocidade da luz em fibra ≈ 2 × 10⁸ m/s (índice ≈ 1,5). Replicação síncrona só confirma o commit após ida e volta:\n\nRTT = 2d / (2 × 10⁸)   →   d = 100 km   →   RTT = 2 × 10⁵ / 2 × 10⁸ = 1,0 ms\n\n1 ms por 100 km, só de propagação. Para commit local de ~100 µs, 100 km multiplica a latência por mais de dez. Em longa distância o modo é tipicamente assíncrono; síncrono é possível se o SLA aceitar o impacto. O modo escolhido determina o RPO.", {
    x:M+0.26, y:4.26, w:CW-0.52, h:1.60, isTextBox:true, fontFace:BF, fontSize:12.5, color:INK, lineSpacingMultiple:1.05 });
}

/* ============================== 16. FCoE ============================== */
{
  const s = slide("Protocolo SAN III — FCoE", "Precisando o livro-texto — com o parágrafo inteiro à vista",
    "ATENÇÃO: o professor tem o livro aberto. Por isso a citação está COMPLETA no slide, e não recortada. Nossa primeira versão apresentava 'três razões pelas quais o livro está errado', e duas delas estavam no próprio parágrafo, três linhas depois da frase que citávamos. A segunda rodada de verificação pegou, e é o tipo de recorte que derruba um trabalho em trinta segundos. O que resta são duas imprecisões REAIS e específicas — e a segunda é a de consequência prática: quem aceitar a analogia vai tentar usar FCoE entre data centers. Não dá.");
  s.addShape(pres.ShapeType.roundRect, { x:M, y:1.50, w:CW, h:1.16, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:LINE, width:1.2 } });
  s.addText("Elmasri & Navathe, §16.11.3 — o parágrafo inteiro:", {
    x:M+0.26, y:1.58, w:CW-0.52, h:0.26, isTextBox:true, fontFace:BF, fontSize:11.5, bold:true, color:INK2 });
  s.addText("“FCoE […] pode ser pensado como iSCSI sem o IP. Ele usa muitos elementos de SCSI e FC (assim como o iSCSI), mas NÃO INCLUI COMPONENTES TCP/IP. […] Ele tira proveito de uma tecnologia Ethernet CONFIÁVEL que usa buffering e controle de fluxo FIM-A-FIM para evitar pacotes descartados.”", {
    x:M+0.26, y:1.86, w:CW-0.52, h:0.72, isTextBox:true, fontFace:BF, fontSize:11.5, italic:true, color:INK });
  s.addText("O livro já qualifica a analogia em dois pontos. Uma crítica que ignorasse isso seria um espantalho. Restam duas imprecisões reais:", {
    x:M, y:2.76, w:CW, h:0.30, isTextBox:true, fontFace:BF, fontSize:12.5, bold:true, color:INK });
  let y = 3.16;
  [["1. O controle de fluxo não é “fim-a-fim” — é ENLACE A ENLACE","O mecanismo é o IEEE 802.1Qbb (PFC): o quadro PAUSE atua entre DOIS VIZINHOS ADJACENTES, por prioridade. Não há realimentação origem→destino como no TCP. É isso que produz o congestion spreading: um alvo lento propaga pausas para trás e degrada tráfego não relacionado que compartilhe o caminho."],
   ["2. FCoE NÃO é roteável em L3; iSCSI é — e o livro não diz","FCoE é um EtherType próprio (0x8906) direto no quadro Ethernet: sem cabeçalho IP, não há o que rotear. Vive num domínio de camada 2. O iSCSI, sobre TCP/IP, atravessa LAN, WAN e Internet. CONSEQUÊNCIA: para ligar dois data centers, o caminho é FCIP ou iSCSI — nunca FCoE."],
  ].forEach(r => { card(s, M, y, CW, 1.48, r[0], r[1], ACC); y += 1.58; });
  fonteNota(s, 6.36, "Normas: T11 FC-BB-5 = ANSI/INCITS 462-2010 (EtherType 0x8906); IEEE 802.1Qbb. Categoria: análise do grupo apoiada em norma — juízo técnico, não citação.");
}

/* ============================== 17. FIGURA DE ENCAPSULAMENTO ============================== */
{
  const s = slide("O que cada protocolo coloca dentro de quê", "Cinco pilhas lado a lado — a figura que dispensa três explicações",
    "SLIDE DE ALTO RETORNO. Três leituras para conduzir com o ponteiro. (1) iSCSI e FCoE NÃO são variantes um do outro: o iSCSI carrega COMANDOS SCSI sobre TCP/IP; o FCoE carrega o QUADRO FC INTEIRO sobre Ethernet. (2) FCIP e FCoE carregam a MESMA coisa — o quadro FC — e diferem só em sobre o quê: por isso um é roteável e o outro não. (3) O NAS é o único em que o topo da pilha NÃO é comando SCSI: são operações de arquivo. É essa última diferença que decide tudo o mais no trabalho.");
  s.addImage({ path:"fig/encapsulamento.png", x:M+0.10, y:1.52, w:CW-0.20, h:4.32 });
  s.addShape(pres.ShapeType.roundRect, { x:M, y:5.98, w:CW, h:0.66, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.1 } });
  s.addText("Regra de leitura: azul = carga SCSI · laranja = quadro Fibre Channel inteiro · cinza = pilha Ethernet/IP comum.  Quem tem IP na pilha, roteia. Quem não tem, não sai do domínio de camada 2.", {
    x:M+0.26, y:6.06, w:CW-0.52, h:0.50, isTextBox:true, fontFace:BF, fontSize:12, bold:true, color:INK });
}

/* ============================== 18. TABELA DE PROTOCOLOS ============================== */
{
  const s = slide("Todos os protocolos do enunciado, lado a lado", "Cada item exigido é uma LINHA da tabela — não uma menção em prosa",
    "Slide de fechamento da parte de protocolos. Serve para o avaliador conferir item a item que os oito protocolos do enunciado foram tratados. Se houver pergunta sobre um deles, voltar ao slide específico.");
  tabela(s, 1.50,
    ["Protocolo","Família","Norma / origem","Unidade","Roteável L3?","Aplicabilidade a SGBD"],
    [
      ["SMB/CIFS","NAS","[MS-SMB2]; CIFS = SMB 1","Operações de arquivo","Sim","Suportado (SQL Server 2012+); exige transparent failover"],
      ["NFS","NAS","RFC 8881 (v4.1)","Operações de arquivo","Sim","Suportado com O_DIRECT ou cliente próprio (Oracle dNFS)"],
      ["AFP","NAS","Proprietário Apple","Operações de arquivo","Sim","Nenhuma — protocolo encerrado"],
      ["FCP sobre FC","SAN","T11 (FC-FS, FC-PI)","Comandos SCSI em quadros FC","Não","Referência para OLTP crítico e cluster compartilhado"],
      ["FC Switch (FC-SW)","SAN","T11 — é TOPOLOGIA","(transporta FCP)","Não","Obrigatória em produção: 2 fabrics independentes"],
      ["iSCSI","SAN","RFC 7143 (2014)","Comandos SCSI em TCP","Sim","Muito adequada com rede dedicada ou segregada"],
      ["FCIP","SAN","RFC 3821 (2004)","Quadros FC em TCP/IP","Sim","Não é caminho primário: túnel para replicação entre sítios"],
      ["FCoE","SAN","FC-BB-5 = INCITS 462-2010","Quadros FC em Ethernet","Não","Viável mas raro; não atravessa data centers"],
    ], [1.85,0.80,2.55,2.55,1.05,3.09], 10, 0.545);
  fonteNota(s, 6.48, "Normas verificadas na fonte primária; ver referências do relatório.");
}

/* ============================== 18. NAS x SAN ============================== */
{
  const s = slide("NAS × SAN — as dimensões que decidem", "E a convergência que os próprios livros já anunciavam",
    "Fechar com a observação de convergência: quase todo array corporativo hoje é unificado — o mesmo equipamento apresenta LUNs por FC/iSCSI E compartilhamentos por NFS/SMB sobre o mesmo pool. A pergunta virou 'qual protocolo para cada carga?', que é uma pergunta melhor.");
  tabela(s, 1.52, ["Dimensão","NAS","SAN"],
    [
      ["Unidade de abstração","Arquivo","Bloco (LUN)"],
      ["Dono do sistema de arquivos","O dispositivo de armazenamento","O servidor"],
      ["Rede","LAN Ethernet/IP compartilhada","Dedicada (FC) ou Ethernet segregada"],
      ["Compartilhamento entre servidores","Nativo; o dispositivo arbitra","Exige FS de cluster ou LVM ciente de cluster"],
      ["Travamento","No protocolo (NLM/NFSv4; oplocks no SMB)","No servidor — a SAN não sabe o que é arquivo"],
      ["Coerência de cache","Fraca por padrão (close-to-open)","Não se aplica: o cache é do servidor"],
      ["Custo relativo","Menor (usa infraestrutura existente)","Maior (HBA, switch, cabeamento, pessoal)"],
      ["Caso de uso típico","DW, backup, dev/homologação, médio porte com dNFS","OLTP crítico, cluster compartilhado, latência de commit"],
    ], [3.00,4.39,4.50], 10, 0.475);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:6.00, w:CW, h:0.72, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:BLUE, width:1.2 } });
  s.addText("Convergência: quase todo array corporativo é unificado. “Comprar NAS ou SAN?” virou “qual protocolo apresentar para cada carga?” — pergunta melhor, porque admite respostas diferentes para o tablespace e para a área de dump.", {
    x:M+0.26, y:6.10, w:CW-0.52, h:0.54, isTextBox:true, fontFace:BF, fontSize:12, color:INK });
}

/* ============================== 19. AST ============================== */
{
  const s = slide("AST — Automated Storage Tiering", "Como funciona, com os parâmetros reais de um produto documentado",
    "Elmasri & Navathe definem AST e citam o FAST da EMC. Fomos ao white paper e extraímos os parâmetros exatos: fatia de 256 MB, análise horária, janela de relocação diária 17h–1h, quatro políticas. Proveniência: documentação de fabricante, produto identificado.");
  bullets(s, 1.52, [
    "“Move automaticamente dados entre diferentes tipos de armazenamento — SATA, SAS e SSDs — dependendo da necessidade” (Elmasri & Navathe, §16.11.4)",
    "Existe porque a hierarquia de armazenamento é uma escada de preço por byte, e o acesso é altamente enviesado: comprar flash para o banco inteiro é pagar pelo pior caso em 100% da capacidade",
  ], 13.5);
  tabela(s, 2.72, ["Parâmetro (Dell EMC Unity FAST VP)","Valor documentado"],
    [
      ["Granularidade de relocação","Fatias (slices) de 256 MB"],
      ["Tiers","Extreme Performance (flash) · Performance (SAS 10K/15K) · Capacity (NL-SAS 7,2K)"],
      ["Frequência de análise","“Uma vez por hora, o FAST VP analisa os dados coletados e classifica cada fatia”"],
      ["Janela de relocação","Agendada; padrão diário, das 17h à 1h"],
      ["Políticas","Highest Available · Auto-Tier · START HIGH THEN AUTO-TIER (padrão) · Lowest Available"],
    ], [4.60,7.29], 11.5, 0.58);
  fonteNota(s, 6.10, "AST move dados; cache mantém cópia; backup cria versão recuperável; replicação mantém estado corrente. AST não substitui backup. Fonte: Dell H15086.3.");
}

/* ============================== 20. AST x BUFFER MANAGER ============================== */
{
  const s = slide("A tensão que nenhum dos três livros menciona", "O SGBD já faz tiering — e faz melhor, mais rápido e com mais informação",
    "Este é o slide de contribuição própria do grupo, e o mais provável de gerar debate. A consequência contra-intuitiva: o AST pode classificar como FRIO exatamente o dado mais QUENTE do banco, porque esse dado mora permanentemente no buffer pool e quase nunca é relido do disco. O que chega ao array é o RESÍDUO que o cache do SGBD não absorveu.");
  card(s, M, 1.54, 3.764, 1.72, "1. Granularidade",
    "Buffer manager: página de 8–16 KiB.\nFAST VP: fatia de 256 MB.\n\n16.384× maior (256 MiB ÷ 16 KiB).", ACC);
  card(s, M+4.064, 1.54, 3.764, 1.72, "2. Latência de reação",
    "Buffer manager: reage AO ACESSO.\nAST: reage numa janela de HORAS.", ACC);
  card(s, M+8.128, 1.54, 3.765, 1.72, "3. Informação semântica",
    "Buffer manager sabe que aquela página\né o nó raiz de um índice B+.\nO array vê apenas offsets de LBA.", ACC);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:3.48, w:CW, h:1.24, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("Consequência contra-intuitiva: o AST enxerga a carga FILTRADA pelo buffer pool. O que chega ao array é o resíduo que o cache do SGBD não absorveu — então um bloco genuinamente quente pode nunca aparecer como quente para o AST. O AST pode classificar como frio exatamente o dado mais quente do banco.", {
    x:M+0.28, y:3.62, w:CW-0.56, h:0.96, isTextBox:true, fontFace:BF, fontSize:13.5, color:W2 });
  s.addText("Recomendação prática", { x:M, y:4.82, w:CW, h:0.30, isTextBox:true,
    fontFace:BF, fontSize:13.5, bold:true, color:INK });
  bullets(s, 5.10, [
    "HABILITAR em data warehouse e em consolidação de muitos bancos: o padrão de acesso é estável na escala de dias, que é a escala do AST",
    "EVITAR (ou fixar em Highest Available Tier) para redo/WAL, tempdb e índices críticos",
    "Para OLTP, CACHING (o dado é copiado, reage em segundos) é quase sempre melhor que TIERING (o dado muda de lugar, reage em horas)",
  ], 12.5);
}

/* ============================== 21. OBJECT STORAGE ============================== */
{
  const s = slide("Object-Based Storage — o terceiro paradigma", "Abre mão de coisas, deliberadamente, para ganhar escala",
    "Origem acadêmica correta: CMU (Gibson et al., 1996) e OceanStore em Berkeley (Kubiatowicz et al., 2000). Observação: o que venceu NÃO foi o comando OSD do T10 — foi a API HTTP do S3. O armazenamento por objetos venceu pelo verbo HTTP, não pelo comando SCSI.");
  tabela(s, 1.50, ["","Bloco (SAN)","Arquivo (NAS)","Objeto"],
    [
      ["Unidade","Bloco de tamanho fixo","Arquivo em hierarquia","Objeto com metadados e ID global"],
      ["Endereçamento","LUN + LBA","Caminho hierárquico","Espaço de nomes plano (bucket + chave)"],
      ["Interface","SCSI / NVMe","POSIX, SMB, NFS","HTTP REST (PUT, GET, DELETE)"],
      ["Atualização parcial","Sim, qualquer bloco","Sim, qualquer offset","S3 PUT substitui a chave; multipart não muda a semântica"],
      ["Escala típica","TB a PB","TB a PB","EXABYTES"],
      ["Metadados","Nenhum","Fixos (dono, datas, permissões)","Arbitrários, definidos pela aplicação"],
    ], [2.30,2.90,3.10,3.59], 10.5, 0.44);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.86, w:CW, h:1.30, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.3 } });
  s.addText("Atualização essencial: o S3 NÃO é mais eventualmente consistente.", {
    x:M+0.26, y:4.96, w:CW-0.52, h:0.28, isTextBox:true, fontFace:BF, fontSize:13, bold:true, color:ACC });
  s.addText("Desde dezembro de 2020 a AWS documenta consistência forte de leitura após escrita e de listagem. Isso vale por chave/operação; não cria transação ou locking entre chaves. Os 11 noves são objetivo de projeto, não SLA nem previsão empírica.", {
    x:M+0.26, y:5.24, w:CW-0.52, h:0.86, isTextBox:true, fontFace:BF, fontSize:12, color:INK });
  fonteNota(s, 6.32, "Fontes: Elmasri & Navathe §16.11.5; Amazon S3 FAQs (consultado em set./2026).");
}

/* ============================== 22. OBJETO: onde serve ============================== */
{
  const s = slide("Object storage: onde não serve e onde venceu", "A ressalva do livro continua correta — mas por razões que vale detalhar",
    "Elmasri & Navathe: 'como o armazenamento por objetos força o travamento a ocorrer no nível do objeto, não está claro quão adequado ele é para processamento concorrente de transações em sistemas de alta vazão'. Continua correto. Mas nos domínios em que a latência não importa, venceu completamente.");
  card(s, M, 1.54, 6.35, 2.60, "Por que não serve como armazenamento primário de OLTP",
    "• No modelo S3, PUT publica novo valor para a chave;\n   multipart muda o transporte, não essa semântica\n• Latência depende de colocalização e serviço\n• Sem fsync/ordenação transacional entre chaves\n• Sem locking transacional entre objetos", INK2);
  card(s, M+6.65, 1.54, 6.35, 2.60, "Onde venceu, e venceu completamente",
    "• Camada de armazenamento de data warehouses em nuvem:\n   objetos imutáveis em formato colunar (Parquet, ORC) com\n   metadados transacionais por cima (Iceberg, Delta Lake).\n   Escrever uma vez, ler muitas, varrer grandes extensões\n• Destino de backup e arquivamento\n• Repositórios de dados não estruturados", BLUE);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.34, w:CW, h:1.10, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:LINE, width:1.1 } });
  s.addText("Não converter 11 noves em “anos até uma perda”: é durabilidade de projeto, não probabilidade empírica independente por objeto. Não cobre exclusão por credencial válida, corrupção lógica, falhas correlacionadas nem ransomware.", {
    x:M+0.26, y:4.46, w:CW-0.52, h:0.86, isTextBox:true, fontFace:BF, fontSize:12.5, color:INK });
  fonteNota(s, 5.56, "Nota de atualização: o exemplo do livro (Seagate Kinetic) não obteve tração comercial. O padrão de fato tornou-se a API HTTP do S3.");
}

/* ============================== 23. RECOMENDAÇÃO SECUNDÁRIO ============================== */
{
  const s = slide("Recomendação — nível secundário (storage online)", "Por perfil de CARGA, não por porte de empresa",
    "Escolher por semântica oficialmente suportada, SLA, latência de cauda, failover, RPO/RTO, benchmark e TCO. Bloco não implica obrigatoriamente SAN: NFS/SMB homologados também podem servir ao SGBD.");
  tabela(s, 1.50, ["Perfil de carga","Recomendação","Justificativa"],
    [
      ["OLTP crítico, alta taxa de commit","SAN ou NAS homologado","Validar persistência/locking, failover, P99 e suporte oficial do SGBD"],
      ["Cluster com armazenamento compartilhado","SAN (bloco)","Vários nós escrevem nos mesmos blocos com coordenação do SGBD (Oracle ASM sobre LUNs)"],
      ["Relacional de médio porte, OLTP moderado","NAS ou SAN, após teste","Comparar matriz de suporte, falha, latência P99 e TCO"],
      ["Data warehouse, OLAP, varredura","NAS ou objeto","Medir banda/concorrência e validar compatibilidade do motor"],
      ["Dev, homologação, muitas instâncias","NAS","Provisionamento simples, clones finos por instantâneo, sem requisito de latência"],
      ["Dump, export, staging de ETL","NAS","Semântica de arquivo é exatamente a abstração desejada"],
      ["Banco em nuvem gerenciado","Bloco de rede (= SAN)","Volumes de bloco em nuvem são SAN sob outro nome: iniciador no host, alvo remoto"],
    ], [3.35,2.65,5.89], 10.5, 0.575);
  fonteNota(s, 6.28, "O cálculo <5% cobre apenas dois saltos de switch local; exclui HBA, ISL, filas, controladora e alvo. Não representa rede fim a fim.");
}

/* ============================== 24. AURORA ============================== */
{
  const s = slide("A observação que mais surpreende", "O modelo pode ser abandonado por inteiro",
    "Provocação deliberada para o debate. A pergunta 'NAS ou SAN?' pressupõe que o motor escreva páginas. Quando o motor deixa de escrever páginas e passa a escrever só log, a pergunta muda de objeto. ATENÇÃO AO RÓTULO, e é provável pergunta: os números NÃO são vazão — são TOTAIS DE UMA JANELA DE 30 MINUTOS, numa carga SysBench só de escrita, sobre 100 GB, numa r3.8xlarge. Se perguntarem 'em quanto tempo?', a resposta é 30 minutos. Nossa primeira versão omitia isso e a segunda rodada de verificação pegou.");
  s.addShape(pres.ShapeType.roundRect, { x:M, y:1.56, w:CW, h:1.10, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("“As únicas escritas que cruzam a rede são registros de redo log. Nenhuma página é jamais escrita a partir da camada de banco de dados.”   —   “O log é o banco de dados, e quaisquer páginas que o sistema de armazenamento materialize são simplesmente um cache.”", {
    x:M+0.28, y:1.68, w:CW-0.56, h:0.88, isTextBox:true, fontFace:BF, fontSize:13.5, italic:true, color:W2 });
  s.addText("Condições do experimento (Tabela 1 do artigo): SysBench SÓ DE ESCRITA · 100 GB · instância r3.8xlarge · JANELA DE 30 MINUTOS.", {
    x:M, y:2.78, w:CW, h:0.30, isTextBox:true, fontFace:BF, fontSize:12, bold:true, color:ACC });
  tabela(s, 3.12, ["Totais em 30 minutos (Tabela 1 do artigo)","MySQL espelhado sobre EBS","Amazon Aurora"],
    [
      ["Transações no período","780.000","27.378.000"],
      ["Operações de E/S por transação","7,4","0,95"],
    ], [5.30,3.30,3.29], 12, 0.44);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.42, w:CW, h:1.36, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.2 } });
  s.addText("Conferência da conta (regra do grupo: refazer toda conta citada, inclusive de artigo revisado por pares):\n27.378.000 ÷ 780.000 = 35,1×  ✓  confere com o “35 vezes mais transações” do artigo.\n7,4 ÷ 0,95 = 7,79 → 7,8×, e o artigo enuncia “7,7 vezes menos”. Divergência de arredondamento, registrada.", {
    x:M+0.26, y:4.52, w:CW-0.52, h:1.16, isTextBox:true, fontFace:BF, fontSize:12, color:INK });
  fonteNota(s, 5.90, "Proveniência: medição publicada em artigo revisado por pares — Verbitski et al., SIGMOD 2017. Também: 6 cópias em 3 AZs, quórum 4/6 escrita e 3/6 leitura, segmentos de 10 GB.");
}

/* ============================== 25. RECOMENDAÇÃO TERCIÁRIO ============================== */
{
  const s = slide("Recomendação — nível terciário (storage offline)", "Fita e objeto em classe de arquivamento; a resposta certa é combinar",
    "Detalhe revelador: a taxa comprimida do LTO-10 é declarada 'usando a interface Fibre Channel de 32 Gb'. A biblioteca de fitas moderna é um DISPOSITIVO DA SAN — o nível terciário não é um mundo à parte, é conectado pela mesma fabric, e o dimensionamento do enlace precisa contemplar a janela de backup.");
  tabela(s, 1.50, ["Critério","Fita (LTO em biblioteca)","Objeto em classe de arquivamento"],
    [
      ["Custo por TB","Menor no longo prazo; capital inicial alto","US$ 1 por TB-mês no Deep Archive (set./2026); sem capital inicial"],
      ["Custo de recuperação","Baixo e previsível","COBRADO POR VOLUME RECUPERADO — é o que quebra orçamentos"],
      ["Prazo de recuperação","Minutos a horas (montagem + busca sequencial)","12 a 48 h no Deep Archive"],
      ["Isolamento contra ransomware","VANTAGEM DECISIVA: cartucho fora do drive é air gap FÍSICO","Depende de object lock / WORM. A proteção é lógica, não física"],
      ["Longevidade","Leitura limitada a poucas gerações; exige migração","Migração é responsabilidade do provedor"],
    ], [2.55,3.94,5.40], 9.5, 0.48);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.72, w:CW, h:1.34, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.2 } });
  s.addText("Rótulo obrigatório: NATIVO ≠ COMPRIMIDO. LTO-10 = 30 e 40 TB NATIVOS (75 e 100 TB comprimidos a 2,5:1). A razão 2,5:1 é ASSUMIDA, não medida — dados já comprimidos pelo SGBD raramente passam de 1,2:1.\nACHADO DA NOSSA VERIFICAÇÃO POR SCRIPT: a especificação do LTO não fecha. As capacidades batem a 2,5:1 (30×2,5=75 e 40×2,5=100), mas a taxa publicada — 400 MB/s nativos e 1.200 MB/s comprimidos “a 2,5:1” — exigiria 3:1, porque 400×2,5 = 1.000. Não adivinhamos qual era: adotamos só a taxa NATIVA de 400 MB/s.", {
    x:M+0.26, y:4.82, w:CW-0.52, h:1.16, isTextBox:true, fontFace:BF, fontSize:11, color:INK });
  s.addText("Combinar e testar: NAS para restauração rápida; objeto imutável/isolado para retenção; fita ejetada para forte air gap físico. A fita não é a única defesa: vaults/contas isolados, imutabilidade e cópias offline também reduzem o alcance de credenciais. Definir RPO/RTO.", {
    x:M, y:6.14, w:CW, h:0.58, isTextBox:true, fontFace:BF, fontSize:12, bold:true, color:INK });
}

/* ============================== 26. EXEMPLOS REAIS ============================== */
{
  const s = slide("Exemplos reais", "Critério declarado: só entram casos com documentação primária verificável",
    "Ser transparente: não tivemos acesso ao vídeo específico mostrado em aula. Em vez de supor qual era, declaramos o critério e o aplicamos. Casos citados apenas em material de divulgação foram descartados. Essa é a decisão de honestidade metodológica do grupo.");
  let y = 1.50;
  [["CERN — três paradigmas em escala de exabyte",
    "“Processava, em média, um petabyte por dia durante o LHC Run 2”; plano de “mais de 600 petabytes” no Run 3; instâncias EOS excedendo “sete bilhões de arquivos (junho de 2022)”. EOS (disco) + CTA (fita) + Ceph (bloco/objeto).", BLUE],
   ["Dropbox — a migração de volta para infraestrutura própria",
    "~500 PB de dados de usuário para o Magic Pocket. Precisão: o texto do Dropbox diz “90% dos dados de clientes” em jul./2016. Contraexemplo instrutivo — mas NÃO generalizável: exige escala de exabyte e equipe dedicada.", BLUE],
   ["Oracle Direct NFS — NAS levado a sério para banco de dados",
    "A Oracle suporta produção sobre NFS, desde que pelo seu próprio cliente, com NFSv3, v4, v4.1 e pNFS. É a melhor evidência da tese: NAS entrega abstração alta demais — serve QUANDO O MOTOR PARTICIPA DA DECISÃO.", ACC],
   ["SQL Server sobre SMB 3 — SAN dispensada em ambiente Windows",
    "Suporte oficial desde o SQL Server 2012, com requisito de transparent failover para carga crítica. É o caminho pelo qual muitas instalações Windows substituíram a SAN FC por um Scale-Out File Server sobre Ethernet.", ACC],
  ].forEach(r => { card(s, M, y, CW, 1.16, r[0], r[1], r[2]); y += 1.24; });
  fonteNota(s, 6.36, "Todas as fontes primárias listadas nas referências do relatório.");
}

/* ============================== 27. CORREÇÕES AO MATERIAL-FONTE ============================== */
{
  const s = slide("Divergências encontradas nas fontes", "Duas nos livros da disciplina, uma de envelhecimento, duas em fontes de fabricante",
    "Apresentar com respeito — são livros excelentes e o campo se move rápido. A do SATA-3 se prova sozinha dentro da própria frase: se fossem 6 GB/s, seriam 6.000 MB/s, e não os 600 MB/s que o mesmo período afirma. ATENÇÃO: NÃO listamos mais o FCoE como 'erro do livro' — o parágrafo do Elmasri já qualifica a analogia em dois pontos, e nossa versão anterior citava recortado. O que restou está no slide 15, e é menor e honesto. A do LTO foi achada pelo nosso script de verificação, não pela IA.");
  tabela(s, 1.46, ["Fonte","Afirmação","Correção","Consequência prática"],
    [
      ["Silberschatz §12.2","“SATA-3 nominalmente suporta 6 GIGABYTES por segundo, permitindo até 600 megabytes por segundo”","São 6 GIGABITS/s. A própria frase prova: 6 Gb/s ÷ 8 × (8/10) = 600 MB/s","Erro de bit/byte por fator 8. Verificar UNIDADE antes de valor"],
      ["Elmasri §16.2.1","“SATA agora é chamado de NL-SAS, de nearline SAS”","NL-SAS = mecânica/mídia SATA 7.200 rpm COM interface e protocolo SAS","Array SAS com discos SATA exige STP/interposer e PERDE multipath"],
      ["Elmasri §16.11.3 (precisão, não erro)","“…controle de fluxo FIM-A-FIM para evitar pacotes descartados”","O PFC (802.1Qbb) é ENLACE A ENLACE, não fim-a-fim. E o livro não menciona a não-roteabilidade em L3","Explica o congestion spreading; e impede usar FCoE entre data centers"],
      ["Elmasri §16.2.4 (dado datado)","“LTO-6 […] cartucho de 2,5 TB com taxa de 160 MB/s”","LTO-10: 40 TB e 400 MB/s nativos — 16× a capacidade, 2,5× a taxa","Ler um cartucho cheio passou de 4,3 h para 27,8 h: +6,4×"],
      ["LTO Program (fabricante)","“400 MB/s nativos e 1.200 MB/s comprimidos A 2,5:1”","Não fecha: 400 × 2,5 = 1.000. Os 1.200 exigiriam 3:1. As capacidades, essas, fecham","Adotamos só a taxa nativa. Achado do nosso script de verificação"],
    ], [2.10,3.35,3.20,3.24], 8.5, 0.78);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:5.62, w:CW, h:0.92, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:BLUE, width:1.2 } });
  s.addText("Achado de nomenclatura: a grafia normativa do T11 é “FIBRE Channel”, com -re, porque o padrão não exige fibra óptica (as primeiras variantes rodavam sobre cobre). Silberschatz escreve “Fiber Channel FC” e Elmasri alterna entre as duas no mesmo capítulo. O enunciado, corretamente, reconhece as duas: “FC (Fibre/Fiber Channel)”.", {
    x:M+0.26, y:5.72, w:CW-0.52, h:0.72, isTextBox:true, fontFace:BF, fontSize:11, color:INK });
}

/* ============================== 28. CONCLUSÃO ============================== */
{
  const s = slide("Conclusão", "Três coisas para levar",
    "Fechar com as três conclusões e emendar direto nas perguntas para o debate.");
  card(s, M, 1.58, CW, 1.44, "1. O argumento de velocidade envelheceu",
    "460 ns por salto de COMUTAÇÃO LOCAL, contra 20–100 µs de uma leitura aleatória em SSD: menos de 5% do acesso, mesmo no cenário mais favorável ao argumento contrário. (A conta não inclui HBA, ISL nem a controladora do array — escopo declarado.)\nO que sobra como diferença é SEMÂNTICO — quem garante atomicidade, quem arbitra travamento, o que acontece quando o caminho oscila. É por isso que a Microsoft fala em transparent failover, e não em banda; e que a Oracle reimplementou o cliente NFS dentro do motor.", BLUE);
  card(s, M, 3.14, CW, 1.44, "2. O rótulo é tão importante quanto o valor",
    "Num campo inteiramente normatizado, encontramos quatro casos em que dois números CORRETOS descrevem coisas diferentes:\nFCIA full-duplex × T11 por direção (2×) · LTO nativo × comprimido (2,5×) · gigabyte × gigabit (8×) · cliente × servidor do AFP (5 anos).\nNenhum é erro de pesquisa: todos são erros de LEITURA, e passariam por uma revisão que só conferisse se o número está na fonte.", ACC);
  card(s, M, 4.70, CW, 1.44, "3. A pergunta do enunciado está sendo reformulada pela indústria",
    "O AST tenta resolver no array, com 256 MiB e latência de horas, um problema que o buffer manager já resolve com 8–16 KiB e latência de acesso — 16.384 a 32.768× de diferença.\nO object storage abandonou bloco E arquivo, e venceu onde a latência não importa. E o Aurora mostrou que, quando o motor deixa de escrever\npáginas, a escolha entre bloco e arquivo perde parte do sentido. Continua havendo resposta certa para cada carga — mas a fronteira se moveu.", INK2);
}

/* ============================== 29. PERGUNTAS PARA O DEBATE ============================== */
{
  const s = slide("Questões em aberto para o debate", "Sete perguntas que consideramos genuinamente abertas",
    "Oferecer para a discussão em sala e no fórum do AVA. Não são perguntas retóricas: são pontos em que o grupo não tem resposta fechada.");
  bullets(s, 1.52, [
    "Se a rede FC é <5% da latência de um acesso NVMe, o que ainda justifica economicamente uma fabric FC dedicada — isolamento operacional, ou inércia de investimento?",
    "O AST pode ser CONTRAPRODUCENTE para OLTP? Deveria existir uma interface que exponha as estatísticas do buffer manager ao array — ou o storage deve permanecer deliberadamente ignorante?",
    "Qual é a granularidade certa para tiering? 256 MB é 16.384× uma página de 16 KiB. Ou o problema é que tiering e caching são mecanismos diferentes vendidos com o mesmo nome?",
    "Com o S3 fornecendo consistência forte desde 2020, qual é a PRÓXIMA barreira real ao objeto como camada primária de um SGBD: latência, imutabilidade, ou ausência de ordenação entre objetos?",
    "A convergência (FCoE) fracassou, ou só mudou de nome? O NVMe/TCP promete o mesmo com outra pilha. O que mudou tecnicamente — ou é a mesma aposta com sigla nova?",
    "Fita ainda tem futuro, ou o air gap é o último argumento? 40 TB a 400 MB/s = 27,8 h para ler um cartucho cheio. A capacidade cresce e a velocidade não.",
    "Se o Aurora mostrou que “o log é o banco de dados”, por que os SGBDs tradicionais não seguiram? Limitação técnica, ou só faz sentido quando o mesmo fornecedor controla motor e armazenamento?",
  ], 12.5);
}

/* ============================== BACKUP DE CONTEÚDO ============================== */
{
  const s = slideBackup("Como funciona o FCP, quadro a quadro", "E por que uma escrita custa uma ida e volta a mais que uma leitura",
    "Backup para a pergunta 'descreva a sequência de quadros de um comando FCP'. O ponto que rende: a escrita tem o XFER_RDY a mais, e é isso que aparece na latência de fsync do log.");
  s.addShape(pres.ShapeType.roundRect, { x:M, y:1.56, w:CW, h:1.02, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:BLUE, width:1.2 } });
  s.addText("LEITURA:    FCP_CMND  (inic.→alvo, carrega o CDB SCSI e o LUN)   →   FCP_DATA  (alvo→inic.)   →   FCP_RSP  (status, fecha a troca)", {
    x:M+0.26, y:1.66, w:CW-0.52, h:0.36, isTextBox:true, fontFace:BF, fontSize:12.5, bold:true, color:INK });
  s.addText("ESCRITA:   FCP_CMND   →   FCP_XFER_RDY  (o alvo diz quantos bytes pode receber)   →   FCP_DATA   →   FCP_RSP", {
    x:M+0.26, y:2.06, w:CW-0.52, h:0.36, isTextBox:true, fontFace:BF, fontSize:12.5, bold:true, color:ACC });
  card(s, M, 2.76, 6.35, 1.64, "Duas camadas de controle de fluxo",
    "XFER_RDY → por COMANDO, na camada FC-4.\nBB_Credit → por QUADRO, na camada FC-2,\nentre portas adjacentes.\n\nSão independentes: o congestionamento de\numa não é visível na outra.", BLUE);
  card(s, M+6.65, 2.76, 6.35, 1.64, "Carga útil por quadro",
    "Máximo de 2.112 bytes por quadro FC.\nUm bloco de 16 KiB do InnoDB ocupa,\nportanto, cerca de 8 quadros.", INK2);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.58, w:CW, h:1.86, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("Dimensionamento por BB_Credit a 10 km — derivação nossa", {
    x:M+0.28, y:4.68, w:CW-0.56, h:0.28, isTextBox:true, fontFace:BF, fontSize:12.5, bold:true, color:"FFD9C7" });
  s.addText("Elmasri cita “até 10 km de separação” como vantagem da SAN. Quantos créditos isso exige?\n\n10 km × 5 µs/km = 50 µs por sentido.   A 32GFC (3.200 MB/s por direção):\n50 × 10⁻⁶ s × 3,2 × 10⁹ B/s = 160 KB em voo   →   160.000 ÷ 2.112 ≈ 76 quadros.\nContando o retorno do crédito: ≈ 150 BB_Credits para manter o enlace cheio.\n\nO Brocade G710 tem 2.000 — mais de uma ordem de grandeza acima. Quando os créditos acabam o enlace NÃO descarta: ele PARA. É o slow drain.", {
    x:M+0.28, y:5.00, w:CW-0.56, h:1.36, isTextBox:true, fontFace:BF, fontSize:11, color:W2, lineSpacingMultiple:1.02 });
}
{
  const s = slideBackup("As perguntas de NAS que o corpo do deck não responde", "Backup para “como se faz backup de um NAS?” e “e se o servidor sumir?”",
    "Backup para duas perguntas prováveis e específicas. NDMP é o elo que liga NAS, SAN e nível terciário — e é a resposta correta para 'como se faz backup de um NAS'. hard vs soft é a resposta concreta ao requisito 5 do slide 4.");
  card(s, M, 1.56, CW, 1.72, "Como se faz backup de um NAS? — NDMP (Network Data Management Protocol)",
    "Um NAS corporativo não roda agente de backup. O NDMP separa o canal de CONTROLE (o servidor de backup orquestra) do\ncanal de DADOS (o NAS escreve DIRETO no drive de fita, sem que os dados atravessem o servidor de backup).\nÉ o análogo, no mundo de arquivo, da separação metadados/dados do pNFS e do NASD — e é o elo que liga NAS, SAN e nível terciário.", BLUE);
  card(s, M, 3.44, CW, 1.52, "E se o servidor NFS sumir por 30 segundos? — a opção de montagem hard vs soft",
    "hard: a E/S BLOQUEIA até o servidor voltar. O processo trava, mas nada é corrompido.  soft: a E/S RETORNA ERRO após os timeouts,\ne o SGBD pode registrar uma escrita como perdida. Para banco de dados, a recomendação dos fornecedores é hard.\nÉ a resposta concreta ao requisito 5 do slide 4 — e o análogo, no lado SAN, é no_path_retry / fast_io_fail_tmo no multipath.", ACC);
  card(s, M, 5.12, CW, 1.42, "Nível terciário: onde NAS e SAN entram",
    "(1) A biblioteca de fitas é DISPOSITIVO DE SAN — o LTO-10 declara sua taxa “usando a interface Fibre Channel de 32 Gb”. A janela de\nbackup disputa a mesma fabric da produção.   (2) O estágio intermediário é NAS: disk-to-disk-to-tape, e o primeiro disco é um\ncompartilhamento de arquivos.   (3) O NDMP é o protocolo que faz a ponte. A pergunta “NAS ou SAN no terciário?” tem, portanto, resposta: os dois, em papéis distintos.", INK2);
}
{
  const s = slideBackup("RAID e multipath: o que a SAN pressupõe", "Dois mecanismos fora da discussão de protocolo e dentro da de arquitetura",
    "Backup para perguntas sobre RAID (que ocupa uma seção inteira do Elmasri e quase não aparece no corpo) e sobre o que faz a fabric dupla realmente funcionar.");
  s.addShape(pres.ShapeType.roundRect, { x:M, y:1.56, w:CW, h:1.98, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("A penalidade de escrita aplicada ao WAL — derivação nossa", {
    x:M+0.28, y:1.66, w:CW-0.56, h:0.28, isTextBox:true, fontFace:BF, fontSize:12.5, bold:true, color:"FFD9C7" });
  s.addText("Custo, em operações físicas, de uma escrita aleatória de um bloco:\n\nRAID 1 → 2          RAID 5 → 4  (2 leituras + 2 escritas)          RAID 6 → 6  (3 + 3)\n\nO log é escrito sequencialmente e sincronizado a CADA COMMIT. Sob RAID 5, toda descarga de log que não preencha uma faixa\ncompleta paga 4× — e é justamente a taxa de commits que ela limita.\n\nSilberschatz §12.5: “o RAID nível 1 é popular para aplicações como o armazenamento de arquivos de log num sistema de banco de\ndados, já que oferece o melhor desempenho de escrita”.   Regra: log em RAID 1/10, dados em RAID 5/6.", {
    x:M+0.28, y:1.98, w:CW-0.56, h:1.48, isTextBox:true, fontFace:BF, fontSize:11, color:W2, lineSpacingMultiple:1.02 });
  card(s, M, 3.70, 6.35, 1.72, "Multipath e ALUA",
    "Duas fabrics só produzem disponibilidade se houver,\nno servidor, uma camada que reconheça que os dois\ncaminhos levam ao MESMO LUN: DM-Multipath (Linux),\nMPIO (Windows). O ALUA deixa o array informar quais\ncaminhos são otimizados.", BLUE);
  card(s, M+6.65, 3.70, 6.35, 1.72, "O parâmetro que decide tudo",
    "no_path_retry / fast_io_fail_tmo:\n“enfileirar indefinidamente” CONGELA a instância;\n“falhar imediatamente” ABORTA transações.\nÉ decisão de projeto, não padrão a aceitar —\ne é o análogo SAN do hard vs soft do NFS.", ACC);
  s.addText("Por que isto importa para o AST: é a mesma razão pela qual a política do volume de redo deve ser FIXADA, e não deixada ao critério estatístico do array.", {
    x:M, y:5.60, w:CW, h:0.36, isTextBox:true, fontFace:BF, fontSize:12, bold:true, color:INK });
}

/* ============================== BACKUP DE MÉTODO ============================== */
{
  const s = slideBackup("Proveniência de todos os números apresentados", "Cada valor pertence a uma de cinco categorias — a quinta é legítima",
    "Slide de defesa. Se houver pergunta sobre a origem de qualquer número do deck, ele está aqui.");
  tabela(s, 1.56, ["Categoria","Números deste deck que pertencem a ela"],
    [
      ["Especificação normativa","RFCs 1094 / 1813 / 7530 / 8881 / 7862 / 7143 / 3821; T11 FC-BB-5 (INCITS 462-2010); dialetos SMB; portas 445, 2049, 548, 3260"],
      ["Datasheet de fabricante","Brocade G710: 460 ns e 2000 buffers · Dell EMC Unity FAST VP: 256 MB, análise horária, 17h–1h, 4 políticas · LTO-10: 30/40 TB nativos, 400 MB/s · S3: 11 noves, Deep Archive US$1/TB-mês e 12–48 h"],
      ["Medição publicada por terceiro","Aurora SIGMOD 2017: 27.378.000 vs 780.000 transações; 0,95 vs 7,4 IOs/transação · CERN: 1 PB/dia processado no Run 2, >600 PB no Run 3, 7 bilhões de arquivos (jun./2022)"],
      ["Derivação nossa (conta à mostra)","16GFC: 14,025 × 64/66 ÷ 8 = 1.700 MB/s · FCIP: 2d ÷ 2×10⁸ = 1 ms/100 km · 256 MiB ÷ 16 KiB = 16.384 · 40 TB ÷ 400 MB/s = 27,8 h · 7,4 ÷ 0,95 = 7,8×"],
      ["NÃO ENCONTRADO (declarado)","Data exata de lançamento do macOS 27 em comunicado formal da Apple · Anúncio de descontinuação da Seagate Kinetic · Tabela numérica completa do FCIA speedmap v24"],
    ], [2.55,9.34], 8.5, 0.78);
}
{
  const s = slideBackup("Todas as derivações aritméticas, passo a passo", "Se um número for questionado, a conta está aqui",
    "Slide de defesa para perguntas sobre contas.");
  const linhas = [
    ["16GFC por direção","14,025 GBd × 64/66 = 13,60 Gb/s ; 13,60 ÷ 8 = 1,70 GB/s = 1.700 MB/s. Excede em 6,3% o nominal de 1.600, que é CONVENÇÃO T11 (X GFC × 100), não resultado da conta."],
    ["FCIA = full-duplex","Speedmap 16GFC = 3.200 MB/s ; 3.200 ÷ 1.600 = 2,00 exato. Idem 8GFC (1.600 ÷ 800) e 64GFC (12.800 ÷ 6.400). DERIVAÇÃO NOSSA — a FCIA não declara isso."],
    ["Comutação local FC","1–2 saltos × 460 ns = 0,46–0,92 µs; 0,92 ÷ 20 = 4,6%. Exclui HBA, ISL, propagação, fila, controladora e alvo."],
    ["FCIP: síncrono × assíncrono","c/n = 3×10⁸ ÷ 1,5 = 2×10⁸ m/s. RTT = 2 × 100.000 m ÷ 2×10⁸ m/s = 1,0 ms por 100 km. Commit local ~100 µs → fator > 10."],
    ["AST × buffer manager","256 MiB ÷ 16 KiB = 268.435.456 ÷ 16.384 = 16.384 exatos. (Em MB decimais seriam 15.625 — adotamos a leitura binária, e declaramos.)"],
    ["Leitura de um LTO-10","40 × 10¹² bytes ÷ 400 × 10⁶ B/s = 100.000 s = 27,8 h."],
    ["11 noves","Objetivo de projeto, não SLA/probabilidade empírica; não converter em anos até perda."],
    ["Aurora","27.378.000 ÷ 780.000 = 35,1× (artigo diz 35×, confere). 7,4 ÷ 0,95 = 7,79 → 7,8× (artigo diz 7,7×, divergência de arredondamento)."],
    ["LTO-10 — a fonte NÃO fecha","Capacidades: 30 × 2,5 = 75 ✓ e 40 × 2,5 = 100 ✓. Taxa: 400 × 2,5 = 1.000, mas o LTO publica 1.200 “a 2,5:1” (exigiria 3:1). Adotamos só a taxa nativa."],
  ];
  tabela(s, 1.56, ["Grandeza","Conta"], linhas, [2.55,9.34], 8.5, 0.545);
}
{
  const s = slideBackup("Post-Mortem — as 33 correções, por família", "Nenhuma foi “alucinação”; todas foram erros bem mais difíceis de detectar",
    "Slide de defesa sobre o Post-Mortem. A família (d) é a que mais ensinou: são erros de ENQUADRAMENTO, não de fato. Em todos os três, cada afirmação isolada era verdadeira — o erro estava no que ficou de fora. Nenhuma verificação de fatos detecta isso.");
  tabela(s, 1.54, ["Família","Qtd.","Exemplos","Antídoto"],
    [
      ["(a) Rótulo errado sobre número certo","14","full-duplex × por direção · 64b/66b × 256b/257b · Server 2019 × versão 1709 (SAC) · 126 × 127 no FC-AL · CERN “gravou” × “processou” · Aurora sem os 30 min · “<5%” sem a controladora","“Este número mede o quê, em que condições?”"],
      ["(b) Desatualização","6","cliente AFP · speedmap v21 · RFC 3720 · RFC 5661 · S3 “eventualmente consistente”","Carimbar data; reverificar qual norma vige"],
      ["(c) Excesso de confiança","8","CIFS ≡ SMB 1.0 · Aurora 7,7× não reconferido · Dropbox “concluiu em 2016” · Kinetic “descontinuada” · custos sem proveniência","Refazer TODA conta citada, inclusive de artigo revisado por pares"],
      ["(d) RECORTE — os 3 mais graves","3","Lacuna declarada que não existia · “fator exatamente 2” além dos casos tabelados · FCoE citando o livro só até a frase conveniente","Ler o parágrafo INTEIRO: “o que ficou de fora?”"],
    ], [2.90,0.60,5.60,2.79], 8.5, 0.82);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:6.02, w:CW, h:0.84, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("A lição: verificar FATOS é necessário e não é suficiente. A segunda pergunta não é “isto é verdade?” e sim “O QUE FOI DEIXADO DE FORA PARA QUE ISTO PARECESSE VERDADE?”.\nA primeira uma IA responde bem. A segunda exige adotar a perspectiva de quem quer derrubar o trabalho — e foi o que o prompt da segunda rodada instruiu.", {
    x:M+0.28, y:6.10, w:CW-0.56, h:0.68, isTextBox:true, fontFace:BF, fontSize:10.5, color:W2 });
}
{
  const s = slideBackup("Post-Mortem — as duas rodadas de verificação", "Rodada 1: 18 correções (16 do teste de 48 + 2 externas) · Rodada 2: 15",
    "Slide de defesa sobre o processo. As duas cláusulas do prompt são o que faz a técnica funcionar.");
  s.addShape(pres.ShapeType.roundRect, { x:M, y:1.56, w:CW, h:1.52, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.3 } });
  s.addText("“Você é um verificador de fatos adversarial. Verifique cada afirmação abaixo com busca web e classifique como CONFIRMADO (com URL), IMPRECISO (com o valor correto), NÃO VERIFICÁVEL ou FALSO. Seja implacável: o objetivo é encontrar erros antes que o professor os encontre. Não confirme nada por plausibilidade — só com fonte. Se não achar fonte, diga NÃO VERIFICÁVEL, o que já é um achado. Ao final, ordene por gravidade o que um avaliador rigoroso poderia usar para derrubar o trabalho.”", {
    x:M+0.28, y:1.68, w:CW-0.56, h:1.28, isTextBox:true, fontFace:BF, fontSize:12.5, italic:true, color:INK });
  s.addText("Por que essas duas cláusulas: “não confirme por plausibilidade” impede a validação complacente, que é o modo de falha natural de um verificador automático. “Ordene por gravidade” força a perspectiva do avaliador — é o que transforma uma lista de reparos numa lista de riscos.", {
    x:M, y:3.22, w:CW, h:0.56, isTextBox:true, fontFace:BF, fontSize:12.5, color:INK2 });
  tabela(s, 3.86, ["Rodada","Papel do verificador","Resultado"],
    [
      ["1 — verificação de fatos","“Não confirme nada por plausibilidade — só com fonte.”","16 correções no teste de 48 afirmações + 2 verificações externas = 18"],
      ["2 — simulação da correção","“As correções que o grupo alega ter encontrado nos livros estão certas mesmo?”","15 correções, 3 GRAVÍSSIMAS — todas de enquadramento, invisíveis à rodada 1"],
      ["TOTAL","","33 correções aplicadas (ver slide anterior)"],
    ], [2.40,3.85,5.64], 10, 0.62);
  s.addText("Custo-benefício: as duas rodadas somaram ~25% do esforço e produziram 31 das 33 correções. A rodada 2 encontrou o erro mais grave do trabalho — uma lacuna que declaramos e que não existia — e ele está registrado no corpo do relatório, não apagado.", {
    x:M, y:6.42, w:CW, h:0.40, isTextBox:true, fontFace:BF, fontSize:11, bold:true, color:INK });
}
{
  const s = slideBackup("Autoria — quem fez o quê e quem decidiu o quê", "Detalhe completo na Seção 13.3 do relatório",
    "Slide de defesa caso o professor pergunte sobre a divisão de trabalho.");
  tabela(s, 1.56, ["Integrante","Fez","Decidiu"],
    [
      ["Bernardo Brandão Pozzato Carvalho Costa","SAN, pilha FC, endereçamento, zoneamento, topologias","Tratar “FC Switch” como TOPOLOGIA, não protocolo — é como a norma T11 define"],
      ["Enzo de Carvalho Sampaio","iSCSI, FCIP, FCoE, derivação de latência de propagação","Incluir a derivação física (1 ms/100 km) em vez de repetir “serve para longas distâncias”"],
      ["Gabriel Schmitz Corrêa Rizawinsk","NAS; SMB/CIFS, NFS e AFP","NÃO fabricar aplicação de banco para o AFP; transformar o item em análise de fim de vida"],
      ["Guilherme En Shih Hu","Coordenação, integração, AS DUAS rodadas adversariais, Post-Mortem","Escopo enxuto para sobrar tempo de revisão; e registrar os 3 erros gravíssimos NO CORPO DO TEXTO em vez de corrigi-los em silêncio"],
      ["Raphael Henrique da Silva Pereira","AST e object storage","Adotar a tensão AST × buffer manager como eixo analítico — nenhum livro faz essa ligação"],
      ["Vivian Maria da Silva e Souza","Recomendação (secundário e terciário) e exemplos reais","Critério de seleção: só casos com documentação primária. Recomendar por PERFIL DE CARGA"],
    ], [3.10,3.70,5.09], 9, 0.72);
}

pres.writeFile({ fileName: "Slides_NAS_SAN_Armazenamento_SBD.pptx" })
  .then(f => console.log("OK ->", f, "| slides numerados:", n));
