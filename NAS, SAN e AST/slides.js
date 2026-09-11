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
  s.addTable(body, { x:M, y:y, w:CW, colW:colW.map(v=>v*CW/colW.reduce((a,b)=>a+b,0)), margin:0.05, rowH: rowH||0.36,
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
    ["Raphael Henrique da Silva Pereira","123420783"],
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
  const s = slide("A diferença entre NAS e SAN é de unidade de abstração",
    "Um entrega arquivos, o outro entrega blocos, e disso decorre todo o resto",
    "Slide de abertura do argumento. A ideia a fixar é que a distinção entre as duas arquiteturas não está no cabo nem na banda, e sim em onde a fronteira de rede corta a pilha de entrada e saída. Se essa parte ficar clara, protocolo, custo, forma de compartilhamento e modelo de falha aparecem depois como consequência, e não como listas soltas. Vale dizer em voz alta que a SAN deixa o servidor dono do sistema de arquivos, enquanto o NAS transfere essa propriedade para o equipamento de armazenamento.");
  s.addShape(pres.ShapeType.roundRect, { x:M, y:1.62, w:CW, h:1.34, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("A SAN move a fronteira de rede abaixo do sistema de arquivos: o servidor recebe blocos e continua sendo o dono do sistema de arquivos.\nO NAS move a fronteira acima: o servidor recebe arquivos, e o sistema de arquivos passa a ser do dispositivo de armazenamento.", {
    x:M+0.30, y:1.76, w:CW-0.6, h:1.06, isTextBox:true,
    fontFace:BF, fontSize:15.5, color:W2, lineSpacingMultiple:1.12 });
  card(s, M, 3.16, 5.795, 1.62, "SAN: semântica de bloco",
    "O SGBD controla a alocação, a ordenação de escrita\ne a atomicidade de página, porque continua sendo\nele o dono do sistema de arquivos. A rede é dedicada.\nCompartilhar um mesmo volume entre servidores exige\num sistema de arquivos de cluster.", BLUE);
  card(s, M+6.095, 3.16, 5.795, 1.62, "NAS: semântica de arquivo",
    "O dispositivo é dono do sistema de arquivos: é ele\nque aloca blocos, faz o journaling de metadados e\narbitra o travamento. O compartilhamento entre\nservidores é nativo, mas a coerência de cache é\nfraca por padrão.", ACC);
  s.addText("A consequência prática é que a escolha certa depende do que o Database Engine precisa controlar, e não de qual das duas tem o enlace mais rápido.", {
    x:M, y:4.98, w:CW, h:0.40, isTextBox:true, fontFace:BF, fontSize:14, bold:true, color:INK });
  fonteNota(s, 5.44, "Fontes: Silberschatz et al., §12.2 (definição de SAN e NAS); Elmasri & Navathe, §16.11.1 e §16.11.2.");
}

/* ============================== 4. FIGURA DAS PILHAS ============================== */
{
  const s = slide("Onde a rede corta a pilha de entrada e saída",
    "Em DAS não há corte; em SAN o corte é abaixo do sistema de arquivos; em NAS é acima",
    "Conduzir a figura da esquerda para a direita. Em DAS não existe rede no caminho do dado, então o servidor faz tudo. Em SAN a rede carrega blocos SCSI ou NVMe, e o servidor continua montando o sistema de arquivos por cima. Em NAS a rede carrega operações de arquivo já prontas, do tipo abrir, ler, escrever e travar. As caixas sombreadas são exatamente as camadas que deixam de ser responsabilidade do servidor de banco de dados e passam a ser do equipamento de armazenamento.");
  s.addImage({ path:"fig/pilhas.png", x:M+0.15, y:1.56, w:CW-0.3, h:4.42 });
  s.addText("Toda camada sombreada é trabalho que o servidor de banco deixou de fazer, e que passou a depender do comportamento e da configuração do equipamento de armazenamento.", {
    x:M, y:6.08, w:CW, h:0.34, isTextBox:true, fontFace:BF, fontSize:12, bold:true, color:INK });
  fonteNota(s, 6.44, "Elaboração própria a partir das definições de Silberschatz §12.2 e de Elmasri & Navathe §16.11.");
}

/* ============================== 5. O QUE O ENGINE EXIGE ============================== */
{
  const s = slide("O que o Database Engine exige do armazenamento",
    "Cinco requisitos, em ordem de rigidez, e é contra eles que comparamos NAS e SAN",
    "Esta é a régua do trabalho: comparamos as duas arquiteturas contra estes cinco requisitos, e não contra um benchmark genérico. Dois merecem ênfase na fala. No requisito 2, o que limita a taxa de commits de uma carga OLTP é a latência da chamada de sincronização, e não a banda do canal, o que já explica por que a discussão de velocidade envelheceu. No requisito 3, a página parcialmente escrita é o motivo de existirem o doublewrite buffer do InnoDB e o full_page_writes do PostgreSQL. Se perguntarem sobre desligar o doublewrite, a concessão do manual do MySQL vale para dispositivos Fusion-io sobre NVMFS em Linux, e não para qualquer dispositivo com escrita atômica.");
  const it = [
    ["1. Acesso em unidades de bloco ou página", "São 8 KiB no PostgreSQL e no Oracle por padrão, e 16 KiB no InnoDB do MySQL. Toda a modelagem de custo de entrada e saída é construída sobre essa unidade."],
    ["2. Durabilidade sob comando explícito", "O commit só retorna depois que o registro de log está em mídia não volátil, o que se faz por fsync ou equivalente. É a latência dessa chamada, e não a banda, que limita a vazão de uma carga OLTP."],
    ["3. Atomicidade da escrita de página", "Se a energia cai no meio da gravação de uma página de 16 KiB, o SGBD precisa detectar e reparar a página quebrada. O InnoDB usa o doublewrite buffer e o PostgreSQL usa full_page_writes."],
    ["4. Semântica de travamento previsível", "Em cluster com armazenamento compartilhado, como o Oracle RAC, vários nós escrevem no mesmo conjunto de blocos, e o travamento tem de continuar correto sob falha de nó e sob partição de rede."],
    ["5. Comportamento determinado sob falha transitória", "Se o caminho até o armazenamento some por trinta segundos, a operação bloqueia, retorna erro ou devolve sucesso falso? A diferença entre bloquear e errar decide se a instância sobrevive ou aborta."],
  ];
  let y = 1.54;
  it.forEach(r => { card(s, M, y, CW, 0.96, r[0], r[1], (r[0][0]==="2"||r[0][0]==="3") ? ACC : LINE); y += 1.03; });
  fonteNota(s, 6.72, "Fontes: Silberschatz et al., §12.1; Garcia-Molina et al., cap. 13; MySQL 8.4 Reference Manual §17.6.4; documentação do PostgreSQL.");
}

/* ============================== 6. NAS ============================== */
{
  const s = slide("NAS: como funciona",
    "O equipamento monta um sistema de arquivos próprio e exporta arquivos pela rede IP",
    "Abrir com a definição de Elmasri e Navathe, que descrevem o NAS a partir daquilo que ele deixa de fazer: são servidores que não fornecem nenhum dos serviços comuns de servidor, e simplesmente permitem a adição de armazenamento para compartilhamento de arquivos. O NAS head é a interface entre o sistema e os clientes de rede, e os clientes se conectam a ele, e não aos discos individuais. O ponto que vale repetir na fala é o do quadro laranja: a alocação de blocos, o journaling e o controle de concorrência passam a ser do equipamento, então o servidor de banco delega essas três coisas e fica dependente de como o NAS as implementa.");
  bullets(s, 1.54, [
    "O NAS head possui discos ou SSDs organizados internamente, tipicamente em RAID, e Elmasri e Navathe registram que esses dispositivos suportam usualmente os níveis 0, 1 e 5",
    "Sobre esse armazenamento, o NAS head monta e opera um sistema de arquivos próprio, que costuma ser o WAFL da NetApp, o ZFS ou ext4 e XFS em soluções abertas",
    "Esse sistema de arquivos é então exportado pela rede local por meio de um protocolo de compartilhamento, que pode ser SMB/CIFS, NFS ou AFP",
    "O cliente, que aqui é o servidor de banco de dados, monta o compartilhamento e enxerga arquivos e diretórios, emitindo operações como open, read, write, close e lock, e não comandos de bloco",
  ], 13.5);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.22, w:CW, h:1.30, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.2 } });
  s.addText("O ponto que decide todo o resto está no sistema de arquivos próprio: quem executa a alocação de blocos, o journaling de metadados e o controle de concorrência de arquivo é o dispositivo NAS, e não o servidor de banco de dados, que delega essas três funções e passa a depender de como o equipamento as executa.", {
    x:M+0.26, y:4.36, w:CW-0.52, h:1.02, isTextBox:true, fontFace:BF, fontSize:13.5, color:INK });
  fonteNota(s, 5.68, "Fontes: Elmasri & Navathe, §16.11.2 (as três citações); Silberschatz et al., §12.2.");
}

/* ============================== 7. SMB/CIFS ============================== */
{
  const s = slide("Protocolo NAS I: SMB/CIFS",
    "CIFS não é outro protocolo, é o nome que a Microsoft deu em 1996 à família hoje chamada SMB 1",
    "Pergunta provável de banca: qual a diferença entre SMB e CIFS? A resposta é que não há diferença de natureza. A especificação aberta [MS-SMB2] define o SMB 2 e 3 como extensão do protocolo SMB original, especificado em [MS-SMB] e [MS-CIFS], ou seja, o documento de CIFS descreve o SMB original e não um protocolo à parte. Na prática, ao escrever SMB/CIFS num projeto novo em 2026, o que se está especificando é SMB 3. Vale ter na ponta da língua a precisão de rótulo: o primeiro Windows Server sem SMBv1 por padrão foi a versão 1709 do canal semianual, sendo o Server 2019 o primeiro do canal de suporte prolongado.");
  tabela(s, 1.58,
    ["Dialeto","Introduzido em","O que trouxe de relevante"],
    [
      ["SMB 1.0 (CIFS)","Anos 1980–90","Protocolo original, verboso, com muitas idas e voltas por operação"],
      ["SMB 2.0","Vista / Server 2008","Reescrita: comandos reduzidos, requisições compostas, créditos de fluxo"],
      ["SMB 2.1","Win 7 / 2008 R2","Leasing de arquivo, que torna o cache do cliente mais agressivo e correto"],
      ["SMB 3.0","Win 8 / Server 2012","SMB Direct (RDMA), Multichannel, transparent failover e AES-128-CCM"],
      ["SMB 3.0.2","Win 8.1 / 2012 R2","Otimiza E/S pequena e aleatória; permite remover o SMB1 por completo"],
      ["SMB 3.1.1","Win 10 / Server 2016","Integridade da negociação pré-autenticação e AES-128-GCM"],
    ], [1.75,2.35,7.79], 11, 0.44);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.86, w:CW, h:1.42, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:BLUE, width:1.2 } });
  s.addText("Uso com SGBD: a Microsoft suporta oficialmente arquivos do SQL Server 2012 e posteriores em compartilhamento SMB, tanto os bancos de sistema quanto os de usuário. As condições que ela impõe são justamente os pontos frágeis do NAS para banco: para carga crítica o compartilhamento precisa suportar transparent failover do SMB 3, a conta de serviço precisa de controle total no compartilhamento e no NTFS, o FILESTREAM não é suportado, e só valem caminhos UNC.", {
    x:M+0.26, y:4.98, w:CW-0.52, h:1.18, isTextBox:true, fontFace:BF, fontSize:12.5, color:INK });
  fonteNota(s, 6.38, "Fontes: Microsoft Learn, [MS-SMB2] §1.3 e 'Install SQL Server with SMB Fileshare Storage'; página de SMBv1/v2/v3 do Windows Server.");
}

/* ============================== 8. NFS ============================== */
{
  const s = slide("Protocolo NAS II: NFS",
    "É o protocolo NAS que efetivamente aparece em instalações de banco de dados",
    "Os marcos a destacar na fala são três. O NFSv3 é sem estado e deixa o travamento fora do protocolo, num serviço separado chamado NLM, o que torna frágil a recuperação depois de uma falha. O NFSv4 integra travamento, montagem e ACLs ao protocolo e usa uma única porta, a 2049, o que o torna atravessável por firewall. O NFSv4.1 traz o modelo de sessões, que dá semântica de execução exatamente uma vez, e o pNFS, que separa o caminho de metadados do caminho de dados. Se perguntarem sobre a garantia exactly-once, a RFC 8881 é explícita em que ela vale para toda requisição precedida de uma operação SEQUENCE, independentemente de o reply caching ter sido solicitado.");
  tabela(s, 1.52,
    ["Versão","Introduzida","Norma vigente","Característica determinante"],
    [
      ["NFSv2","1989","RFC 1094","Sobre UDP, com offsets de 32 bits, o que limita o arquivo a 2 GiB"],
      ["NFSv3","1995","RFC 1813","Offsets de 64 bits e escrita assíncrona com COMMIT. Sem estado: o travamento fica fora do protocolo, no NLM"],
      ["NFSv4.0","2000","RFC 7530 (2015)","Com estado. Travamento e ACLs no protocolo, operações COMPOUND e porta única 2049"],
      ["NFSv4.1","2010","RFC 8881 (2020)","Sessões dão semântica exatamente uma vez, com SEQUENCE à frente; pNFS separa metadados de dados"],
      ["NFSv4.2","2016","RFC 7862","Cópia no lado do servidor, arquivos esparsos e hole punching"],
    ], [1.35,1.35,2.05,7.14], 10.5, 0.46);
  s.addText("Cuidado ao ler a tabela: a coluna de norma vigente traz a RFC em vigor, que muitas vezes é uma reedição posterior, e por isso a v4.2 de 2016 parece anteceder a v4.1 de 2020. A cronologia real do protocolo está na coluna de introdução.", {
    x:M, y:4.14, w:CW, h:0.30, isTextBox:true, fontFace:BF, fontSize:11, italic:true, color:ACC });
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.52, w:CW, h:1.68, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.2 } });
  s.addText("A maior limitação do NFS para banco de dados é a coerência de cache, porque o protocolo implementa close-to-open, que verifica o cache ao abrir e descarrega ao fechar. O manual nfs(5) do Linux é explícito ao dizer que, se coerência absoluta entre clientes for necessária, as aplicações devem usar travamento de arquivo, ou abrir seus arquivos com a flag O_DIRECT. Foi por isso que a Oracle reimplementou o cliente NFS dentro do próprio motor, no Direct NFS, com suporte a NFSv3, v4, v4.1 e pNFS.\nO requisito 5 da régua também tem resposta concreta aqui, na opção de montagem: com hard, a E/S bloqueia até o servidor voltar; com soft, ela retorna erro e o SGBD pode corromper dados. Para banco, a recomendação dos fornecedores é hard.", {
    x:M+0.26, y:4.62, w:CW-0.52, h:1.48, isTextBox:true, fontFace:BF, fontSize:11.5, color:INK });
  fonteNota(s, 6.32, "Fontes: RFCs 1094, 1813, 7530, 8881 e 7862 do IETF; man 5 nfs do Linux; Oracle Database Installation Guide 19c.");
}

/* ============================== 9. AFP ============================== */
{
  const s = slide("Protocolo NAS III: AFP",
    "Como funciona, por que existiu, e em que estado está em 2026",
    "O enunciado pede como funciona cada solução, então a metade esquerda do slide é o mecanismo, e não o obituário. Na fala: é um protocolo de sessão com estado, o cliente faz FPLogin, abre um volume com FPOpenVol e daí em diante opera sobre identificadores de sessão. Os comandos são bifurcados por fork porque um arquivo do Macintosh tem data fork e resource fork. Há travamento por intervalo de bytes, o FPByteRangeLock, mas com semântica de sessão, o que significa que ele morre junto com ela. Duas precisões de rótulo que valem ouro em arguição: primeiro, cliente e servidor foram removidos em momentos diferentes, separados por cinco anos, então dizer que a Apple removeu o AFP no Big Sur erra a data; segundo, o AFP sobre TCP não começa na versão 3.0, e a própria Apple documenta que TCP pode ser usado como transporte desde a versão 2.1. O que o 3.0 muda é a exclusividade do TCP.");
  card(s, M, 1.50, 5.795, 2.46, "Como funciona",
    "→ Sessão com estado: FPLogin, depois FPOpenVol,\n    e daí em diante operações sobre identificadores\n→ Sobre TCP na porta 548, enquadrado pelo DSI,\n    e assim desde o AFP 2.1, não desde o 3.0\n→ Comandos bifurcados por fork (FPOpenFork,\n    FPRead e FPWrite), porque o arquivo do Mac\n    tem data fork e resource fork\n→ Metadados do Finder como atributos de\n    primeira classe, e não como emulação\n→ FPByteRangeLock trava intervalo de bytes,\n    mas com semântica de sessão: morre com ela", BLUE);
  card(s, M+6.095, 1.50, 5.795, 2.46, "Por que existiu, e o que nunca teve",
    "Existiu porque o SMB1 e o NFS da época não sabiam\nrepresentar o resource fork sem truques, como os\narquivos ._nome e o AppleDouble, e o resultado era\ncorrupção silenciosa de metadados.\n\nNunca teve RDMA, múltiplos canais, disponibilidade\ncontínua com failover transparente, nem travamento\nindependente de sessão. Por isso parou no conjunto\nde recursos de um protocolo de compartilhamento de\narquivos de escritório.", INK2);
  let y = 4.12;
  [["macOS 11 (2020)","Removido o servidor AFP, ou seja, um Mac deixa de poder compartilhar pastas por esse protocolo.", LINE],
   ["macOS 15.5 (maio de 2025)","Depreciado o cliente. O texto da Apple é literal: o cliente do Apple Filing Protocol está depreciado e será removido em uma versão futura do macOS.", LINE],
   ["macOS 27 (Apple, julho de 2026)","A Apple informa oficialmente o fim do suporte do Time Machine a destinos AFP, incluindo Time Capsules e AirPort Disks.", ACC],
  ].forEach(r => { card(s, M, y, CW, 0.68, r[0], r[1], r[2]); y += 0.74; });
  s.addText("Relevância para novas implantações de SBD: é protocolo legado e sem recomendação. Nas matrizes de suporte consultadas de Oracle, Microsoft, PostgreSQL e MySQL, o AFP não aparece como configuração suportada. Para um NAS que precise servir clientes Apple, a recomendação é SMB 3, que é o protocolo primário do macOS desde o OS X 10.9 Mavericks, de 2013.", {
    x:M, y:6.36, w:CW, h:0.44, isTextBox:true, fontFace:BF, fontSize:10.5, bold:true, color:INK });
  fonteNota(s, 6.84, "Fontes: Apple, documentação AFP Over TCP (transporte desde a 2.1); documentos de suporte 121011 e 102423.");
}

/* ============================== 10. NAS vantagens/desvantagens ============================== */
{
  const s = slide("NAS: vantagens e desvantagens",
    "Sob a ótica de um sistema de banco de dados",
    "Não ler a tabela inteira em voz alta. Vale destacar duas linhas. A de coerência de cache, porque é ela que explica a existência do Direct NFS da Oracle e o uso de O_DIRECT. E a de custo, porque é ela que explica por que o NAS domina em data warehouse e área de dump, onde a latência de commit não é o gargalo. Se perguntarem quanto o NAS é mais barato, a resposta honesta é que a direção da comparação é estrutural e certa, já que a SAN acrescenta categorias inteiras de componente, mas a magnitude em dólares por terabyte útil não está neste trabalho, e isso está declarado no relatório como lacuna.");
  tabela(s, 1.58, ["Vantagens","Desvantagens"],
    [
      ["Usa a rede Ethernet/IP que já existe, sem HBA dedicada, sem switch FC e sem equipe especializada","Compete por banda com o tráfego de aplicação, a menos que se segregue por VLAN ou rede física separada"],
      ["O compartilhamento concorrente entre servidores é nativo, sem sistema de arquivos de cluster","A coerência de cache é fraca por padrão, no modelo close-to-open, e exige O_DIRECT ou cliente dedicado"],
      ["Provisionamento simples: basta criar o compartilhamento e conceder permissão","Há uma camada extra de sistema de arquivos no caminho, e metadados, travamento e journaling somam latência"],
      ["Independência de sistema operacional dos clientes, como registram Elmasri e Navathe","A escrita atômica de página não é garantida pelo protocolo, então o SGBD tem de se proteger sozinho"],
      ["Instantâneos e clones no nível de arquivo, com granularidade compreensível","Nem todo recurso do SGBD funciona, e o FILESTREAM não é suportado sobre SMB"],
      ["Menor custo por terabyte útil, tanto de aquisição quanto de operação","Depende de recursos avançados do protocolo, como transparent failover e sessões, para sobreviver a falhas"],
    ], [5.945,5.945], 10.5, 0.66);
  fonteNota(s, 6.44, "Elaboração própria a partir de Elmasri & Navathe §16.11.2, de Microsoft Learn e do man 5 nfs. As linhas de custo são qualitativas: ver a declaração de lacuna na Seção 3.6 do relatório.");
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
  card(s, M, 4.10, 5.795, 1.60, "Controle de acesso em duas camadas",
    "Zoneamento (no switch): quais iniciadores veem quais alvos.\nLUN masking (no array): quais LUNs cada iniciador enxerga.\nJuntos, impedem que o servidor de teste monte o LUN de produção.", BLUE);
  card(s, M+6.095, 4.10, 5.795, 1.60, "Rede sem perdas por BB_Credit",
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
  s.addShape(pres.ShapeType.roundRect, { x:M, y:4.06, w:5.795, h:2.28, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("A prova é de física, não de opinião", {
    x:M+0.24, y:4.16, w:5.315, h:0.28, isTextBox:true, fontFace:BF, fontSize:13, bold:true, color:"FFD9C7" });
  s.addText("16GFC:  3.200 MB/s = 25,6 Gb/s\nmas a linha sinaliza 14,025 Gb/s.\n\n128GFC:  24.850 MB/s = 198,8 Gb/s\nmas a linha sinaliza 112,2 Gb/s.\n\nUma direção não pode transportar mais bits\ndo que a linha sinaliza → é a SOMA DOS DOIS SENTIDOS.", {
    x:M+0.24, y:4.48, w:5.315, h:1.76, isTextBox:true, fontFace:BF, fontSize:11.5, color:W2, lineSpacingMultiple:1.02 });
  s.addShape(pres.ShapeType.roundRect, { x:M+6.095, y:4.06, w:5.795, h:2.28, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.2 } });
  s.addText("A convenção quebra na Gen 8", {
    x:M+6.335, y:4.16, w:5.315, h:0.28, isTextBox:true, fontFace:BF, fontSize:13, bold:true, color:ACC });
  s.addText("Até o 64GFC:  X GFC = X × 100 MB/s por direção.\n\nNo 128GFC:  24.850 ÷ 2 = 12.425, e não 12.800.\nRazão = 1,94, não 2,00.\n\nPorque a linha ficou em 112,2 Gb/s: a FCIA registra\nque dobrar exigiria 115,6 Gb/s, “inviável para fechar\no link budget”. O nome “128” é arredondamento.", {
    x:M+6.335, y:4.48, w:5.315, h:1.76, isTextBox:true, fontFace:BF, fontSize:11.5, color:INK, lineSpacingMultiple:1.02 });
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
  card(s, M, 4.28, 5.795, 1.72, "O custo: a pilha TCP/IP",
    "Processamento no host, controle de congestionamento\ne perda de quadros sob congestão.", INK2);
  card(s, M+6.095, 4.28, 5.795, 1.72, "As três mitigações modernas",
    "TOE / HBA iSCSI dedicada (pilha no adaptador)\niSER — iSCSI Extensions for RDMA\nDCB no switch: classe Ethernet sem perdas", BLUE);
  fonteNota(s, 6.16, "Fontes: IETF RFC 7143; Elmasri & Navathe, §16.11.3.");
}

/* ============================== 15. FCIP ============================== */
{
  const s = slide("Protocolo SAN II — FCIP", "Não substitui o FC: é um TÚNEL entre duas fabrics FC distantes",
    "Confusão comum e provável alvo de pergunta: iSCSI SUBSTITUI o FC (não há fabric em lugar nenhum); FCIP PRESERVA o FC (as duas pontas são fabrics completas, e o túnel as FUNDE em uma só). Daí o risco operacional: um evento de reconfiguração num sítio se propaga ao outro — por isso existem FC routing e IVR.");
  card(s, M, 1.56, 5.795, 1.62, "iSCSI substitui o FC",
    "O servidor não tem HBA de Fibre Channel.\nFala SCSI sobre TCP/IP de ponta a ponta.\nNão existe fabric FC em lugar nenhum.", BLUE);
  card(s, M+6.095, 1.56, 5.795, 1.62, "FCIP preserva o FC",
    "As duas pontas são fabrics FC completas, com HBAs,\nWWNs e zoneamento. O túnel carrega quadros FC pela\nWAN IP e FUNDE as duas fabrics em uma só.", ACC);
  s.addText("Norma: IETF RFC 3821 (2004). Aplicação típica: replicação entre sítios para recuperação de desastre.", {
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
  const s = slide("Protocolo SAN IV: FCoE",
    "Precisando o livro-texto, com o parágrafo inteiro à vista",
    "A citação está completa no slide de propósito, porque o professor tem o livro aberto e porque a nossa primeira versão errou justamente aqui: apresentávamos três razões pelas quais o livro estaria errado, e duas delas estavam no próprio parágrafo, poucas linhas depois da frase que citávamos. A segunda rodada de verificação pegou isso. O que resta são duas imprecisões reais e específicas. A segunda é a de consequência prática: quem aceitar a analogia de que FCoE é iSCSI sem o IP vai tentar usá-lo entre dois data centers, e não vai funcionar, porque não há cabeçalho IP para rotear.");
  s.addShape(pres.ShapeType.roundRect, { x:M, y:1.50, w:CW, h:1.16, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:LINE, width:1.2 } });
  s.addText("Elmasri & Navathe, §16.11.3, o parágrafo inteiro:", {
    x:M+0.26, y:1.58, w:CW-0.52, h:0.26, isTextBox:true, fontFace:BF, fontSize:11.5, bold:true, color:INK2 });
  s.addText("“FCoE [...] pode ser pensado como iSCSI sem o IP. Ele usa muitos elementos de SCSI e FC (assim como o iSCSI), mas não inclui componentes TCP/IP. [...] Ele tira proveito de uma tecnologia Ethernet confiável que usa buffering e controle de fluxo fim-a-fim para evitar pacotes descartados.”", {
    x:M+0.26, y:1.86, w:CW-0.52, h:0.72, isTextBox:true, fontFace:BF, fontSize:11.5, italic:true, color:INK });
  s.addText("O livro já qualifica a analogia em dois pontos, ao dizer que não há TCP/IP e que depende de Ethernet confiável. Restam duas imprecisões reais:", {
    x:M, y:2.76, w:CW, h:0.30, isTextBox:true, fontFace:BF, fontSize:12.5, bold:true, color:INK });
  let y = 3.16;
  [["1. O controle de fluxo não é fim-a-fim, e sim enlace a enlace","O mecanismo é o IEEE 802.1Qbb, o Priority-based Flow Control: o quadro PAUSE atua entre dois vizinhos adjacentes, por prioridade, e cada salto exerce pressão sobre o salto anterior. Não existe realimentação entre origem e destino como há no TCP, e é isso que produz o congestion spreading, em que um alvo lento propaga pausas para trás e degrada tráfego não relacionado que compartilhe o caminho."],
   ["2. O FCoE não é roteável em camada 3, enquanto o iSCSI é","O FCoE usa um EtherType próprio, o 0x8906 para o quadro de dados e o 0x8914 para o FIP, encapsulado diretamente em quadro Ethernet. Como não há cabeçalho IP, não há o que rotear, e ele vive dentro de um domínio de camada 2. O iSCSI, por rodar sobre TCP/IP, atravessa LAN, WAN e Internet. Para ligar dois data centers, portanto, o caminho é FCIP ou iSCSI."],
  ].forEach(r => { card(s, M, y, CW, 1.48, r[0], r[1], ACC); y += 1.58; });
  fonteNota(s, 6.36, "Normas: T11 FC-BB-5, publicada como ANSI/INCITS 462-2010; IEEE 802.1Qbb. Categoria de proveniência: análise do grupo apoiada em norma, ou seja, juízo técnico e não citação.");
}

/* ============================== 17. FIGURA DE ENCAPSULAMENTO ============================== */
{
  const s = slide("O que cada protocolo coloca dentro de quê",
    "As cinco pilhas lado a lado, que é a figura que dispensa três explicações",
    "Conduzir com o ponteiro, em três leituras. A primeira é que iSCSI e FCoE não são variantes um do outro: o iSCSI carrega comandos SCSI sobre TCP/IP, enquanto o FCoE carrega o quadro FC inteiro sobre Ethernet. A segunda é que FCIP e FCoE carregam a mesma coisa, o quadro FC, e diferem apenas em sobre o quê, e é daí que um é roteável e o outro não. A terceira é que o NAS é o único em que o topo da pilha não é comando SCSI, e sim operação de arquivo, que é exatamente a diferença discutida na abertura e a que decide todo o resto do trabalho.");
  s.addImage({ path:"fig/encapsulamento.png", x:M+0.10, y:1.52, w:CW-0.20, h:4.32 });
  s.addShape(pres.ShapeType.roundRect, { x:M, y:5.98, w:CW, h:0.66, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:ACC, width:1.1 } });
  s.addText("Regra de leitura: azul é carga SCSI, laranja é quadro Fibre Channel inteiro e cinza é pilha Ethernet/IP comum. Quem tem IP na pilha, roteia; quem não tem, não sai do domínio de camada 2.", {
    x:M+0.26, y:6.06, w:CW-0.52, h:0.50, isTextBox:true, fontFace:BF, fontSize:12, bold:true, color:INK });
  fonteNota(s, 6.72, "Elaboração própria a partir das normas de cada protocolo: RFC 7143 (iSCSI), RFC 3821 (FCIP) e T11 FC-BB-5 (FCoE).");
}

/* ============================== 18. TABELA DE PROTOCOLOS ============================== */
{
  const s = slide("Todos os protocolos do enunciado, lado a lado",
    "Cada item exigido aparece como uma linha da tabela, e não como menção em prosa",
    "Slide de fechamento da parte de protocolos, feito para o avaliador conferir item a item que os oito protocolos pedidos foram tratados. Se houver pergunta sobre algum deles, voltar ao slide específico. Duas observações que podem cair: o FC Switch é uma topologia e não um protocolo, e por isso a linha dele diz que transporta FCP; e a norma vigente do iSCSI é a RFC 7143, de 2014, que obsoleta a RFC 3720, embora boa parte da literatura ainda cite a antiga.");
  tabela(s, 1.50,
    ["Protocolo","Família","Norma / origem","Unidade","Roteável L3?","Aplicabilidade a SGBD"],
    [
      ["SMB/CIFS","NAS","[MS-SMB2]; CIFS é a família SMB 1","Operações de arquivo","Sim","Suportado no SQL Server 2012 e posteriores; exige transparent failover"],
      ["NFS","NAS","RFC 8881 (v4.1)","Operações de arquivo","Sim","Conforme a configuração homologada por cada SGBD"],
      ["AFP","NAS","Proprietário Apple","Operações de arquivo","Sim","Legado, sem recomendação para nova implantação"],
      ["FCP sobre FC","SAN","T11 (FC-FS, FC-PI)","Comandos SCSI em quadros FC","Não","Referência para OLTP crítico e cluster compartilhado"],
      ["FC Switch (FC-SW)","SAN","T11; é topologia, não protocolo","Transporta o FCP","Não","Duas fabrics independentes para alta disponibilidade"],
      ["iSCSI","SAN","RFC 7143 (2014)","Comandos SCSI em TCP","Sim","Muito adequada quando a rede é dedicada ou segregada"],
      ["FCIP","SAN","RFC 3821 (2004)","Quadros FC em TCP/IP","Sim","Extensão de FC por IP, usada em replicação e backup"],
      ["FCoE","SAN","FC-BB-5, ou INCITS 462-2010","Quadros FC em Ethernet","Não","Exige Ethernet compatível com DCB; não é roteado por IP"],
    ], [1.85,0.80,2.55,2.55,1.05,3.09], 10, 0.545);
  fonteNota(s, 6.48, "Todas as normas foram verificadas na fonte primária. A relação completa está na seção de referências do relatório.");
}

/* ============================== 18. NAS x SAN ============================== */
{
  const s = slide("NAS × SAN: as dimensões que decidem a escolha",
    "E a convergência que os próprios livros-texto já anunciavam",
    "Percorrer a tabela por blocos, e não linha a linha. As duas primeiras linhas são a causa, e todas as outras são consequência. Fechar com a observação de convergência do quadro inferior: quase todo array corporativo hoje é unificado, e o mesmo equipamento apresenta LUNs por FC ou iSCSI e compartilhamentos por NFS e SMB sobre o mesmo pool de mídia. Por isso a pergunta deixou de ser comprar NAS ou SAN e passou a ser qual protocolo apresentar para cada carga, que é uma pergunta melhor porque admite respostas diferentes para o tablespace e para a área de dump.");
  tabela(s, 1.52, ["Dimensão","NAS","SAN"],
    [
      ["Unidade de abstração","Arquivo","Bloco, apresentado como LUN"],
      ["Dono do sistema de arquivos","O dispositivo de armazenamento","O servidor de banco de dados"],
      ["Rede","Ethernet/IP, compartilhada ou segregada","FC ou Ethernet/IP, conforme o projeto"],
      ["Compartilhamento entre servidores","Nativo, porque o dispositivo arbitra o acesso","Exige sistema de arquivos de cluster ou LVM ciente de cluster"],
      ["Travamento","No protocolo: NLM no v3, integrado a partir do NFSv4, oplocks no SMB","No servidor, porque a SAN não sabe o que é um arquivo"],
      ["Coerência de cache","Depende do protocolo e do cliente, e o NFS usa close-to-open","Os servidores é que coordenam o acesso compartilhado"],
      ["Custo relativo","Depende de capacidade, rede e suporte","Depende de capacidade, rede, HBA e suporte"],
      ["Caso de uso típico","Backup, análise e bancos em configurações homologadas","OLTP crítico, cluster compartilhado e cargas com requisito de latência de commit"],
    ], [3.00,4.39,4.50], 10, 0.475);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:6.00, w:CW, h:0.72, rectRadius:0.06,
    fill:{ color:SOFT }, line:{ color:BLUE, width:1.2 } });
  s.addText("Convergência: os arrays unificados oferecem arquivos e blocos no mesmo equipamento, então comprar NAS ou SAN virou qual protocolo apresentar para cada carga, que é a pergunta melhor porque admite respostas diferentes para o tablespace e para a área de dump.", {
    x:M+0.26, y:6.10, w:CW-0.52, h:0.54, isTextBox:true, fontFace:BF, fontSize:12, color:INK });
  fonteNota(s, 6.82, "Fonte da observação de convergência: Silberschatz et al., §12.4, sobre arrays que combinam disco e SSD.");
}

/* ============================== 19. AST ============================== */
{
  const s = slide("AST: Automated Storage Tiering",
    "Como funciona, com os parâmetros reais de um produto documentado",
    "Elmasri e Navathe definem o AST e citam o FAST da EMC como implementação de referência, mas não publicam parâmetros. Fomos ao white paper técnico da Dell e extraímos os valores exatos, que são os da tabela: fatia de 256 MB, análise horária, janela de relocação diária das 17h à 1h e quatro políticas, com a Start High then Auto-Tier como padrão recomendado. A proveniência aqui é documentação de fabricante com produto identificado, e não especificação normativa, o que vale dizer se perguntarem. O mecanismo, resumido, combina contadores de acesso por fatia, uma métrica agregada de temperatura e uma classificação horária, e só então move fisicamente as fatias durante a janela.");
  bullets(s, 1.52, [
    "Elmasri e Navathe definem que o AST “move automaticamente dados entre diferentes tipos de armazenamento, como SATA, SAS e solid-state drives, dependendo da necessidade” (§16.11.4)",
    "Existe porque a hierarquia de armazenamento ordena os meios por preço por byte e o acesso é bastante enviesado: comprar flash para o banco inteiro significa pagar pelo pior caso em toda a capacidade instalada",
  ], 13);
  tabela(s, 2.78, ["Parâmetro (Dell EMC Unity FAST VP)","Valor documentado"],
    [
      ["Granularidade de relocação","Fatias, chamadas slices, de 256 MB"],
      ["Tiers definidos","Extreme Performance (flash), Performance (SAS de 10K e 15K rpm) e Capacity (NL-SAS de 7,2K rpm)"],
      ["Frequência de análise","“Uma vez por hora, o FAST VP analisa os dados coletados e classifica cada fatia com base em sua temperatura”"],
      ["Janela de relocação","Agendada e configurável, com padrão diário das 17h à 1h do dia seguinte"],
      ["Políticas disponíveis","Highest Available Tier, Auto-Tier, Start High then Auto-Tier (que é o padrão recomendado) e Lowest Available Tier"],
    ], [4.60,7.29], 11, 0.58);
  fonteNota(s, 6.20, "Fonte: Dell Technologies, white paper H15086.3, 'Dell EMC Unity: FAST Technology Overview'. Vale distinguir os quatro mecanismos: o AST move dados, o cache mantém cópia, o backup cria versão recuperável e a replicação mantém estado corrente, de modo que o AST não substitui backup.");
}

/* ============================== 20. AST x BUFFER MANAGER ============================== */
{
  const s = slide("AST e buffer pool", "Migração de dados e cache de páginas são mecanismos distintos",
    "Este é o slide de contribuição própria do grupo, e o mais provável de gerar debate. A consequência contra-intuitiva: o AST pode classificar como FRIO exatamente o dado mais QUENTE do banco, porque esse dado mora permanentemente no buffer pool e quase nunca é relido do disco. O que chega ao array é o RESÍDUO que o cache do SGBD não absorveu.");
  card(s, M, 1.54, 3.764, 1.72, "1. Granularidade",
    "Buffer manager: página de 8–16 KiB.\nFAST VP: fatia de 256 MB.\n\n16.384× maior (256 MiB ÷ 16 KiB).", ACC);
  card(s, M+4.064, 1.54, 3.764, 1.72, "2. Latência de reação",
    "Buffer manager: reage AO ACESSO.\nAST: reage numa janela de HORAS.", ACC);
  card(s, M+8.128, 1.54, 3.765, 1.72, "3. Informação semântica",
    "O SGBD pode usar informação semântica\nalém do histórico de acessos.\nO array vê apenas offsets de LBA.", ACC);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:3.48, w:CW, h:1.24, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("Consequência contra-intuitiva: o AST enxerga a carga FILTRADA pelo buffer pool. O que chega ao array é o resíduo que o cache do SGBD não absorveu — então um bloco genuinamente quente pode nunca aparecer como quente para o AST. O AST pode classificar como frio exatamente o dado mais quente do banco.", {
    x:M+0.28, y:3.62, w:CW-0.56, h:0.96, isTextBox:true, fontFace:BF, fontSize:13.5, color:W2 });
  s.addText("Recomendação prática", { x:M, y:4.82, w:CW, h:0.30, isTextBox:true,
    fontFace:BF, fontSize:13.5, bold:true, color:INK });
  bullets(s, 5.10, [
    "HABILITAR em data warehouse e em consolidação de muitos bancos: o padrão de acesso é estável na escala de dias, que é a escala do AST",
    "EVITAR (ou fixar em Highest Available Tier) para redo/WAL, tempdb e índices críticos",
    "Avaliar cache e AST separadamente: cópia em RAM e migração no array atendem objetivos distintos",
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
  const s = slide("Object storage: limites e aplicações", "A adequação depende da arquitetura do motor",
    "Elmasri & Navathe: 'como o armazenamento por objetos força o travamento a ocorrer no nível do objeto, não está claro quão adequado ele é para processamento concorrente de transações em sistemas de alta vazão'. Continua correto. Mas em cargas de grandes leituras, o custo por requisição pode ser amortizado.");
  card(s, M, 1.54, 5.795, 2.60, "Limites para motores que exigem blocos",
    "• No modelo S3, PUT publica novo valor para a chave;\n   multipart muda o transporte, não essa semântica\n• Latência depende de colocalização e serviço\n• Motor deve implementar ordenação e recuperação\n• Sem locking transacional entre objetos", INK2);
  card(s, M+6.095, 1.54, 5.795, 2.60, "Aplicações adequadas",
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

/* ============================== 28. CONCLUSÃO ============================== */
{
  const s = slide("Conclusão", "Três coisas para levar",
    "Fechar com as três conclusões e emendar direto nas perguntas para o debate.");
  card(s, M, 1.58, CW, 1.44, "1. O argumento de velocidade envelheceu",
    "460 ns por salto de COMUTAÇÃO LOCAL, contra 20–100 µs de uma leitura aleatória em SSD: menos de 5% do acesso, mesmo no cenário mais favorável ao argumento contrário. (A conta não inclui HBA, ISL nem a controladora do array — escopo declarado.)\nO que sobra como diferença é SEMÂNTICO — quem garante atomicidade, quem arbitra travamento, o que acontece quando o caminho oscila. É por isso que a Microsoft fala em transparent failover, e não em banda; e que a Oracle reimplementou o cliente NFS dentro do motor.", BLUE);
  card(s, M, 3.14, CW, 1.44, "2. O rótulo é tão importante quanto o valor",
    "Num campo inteiramente normatizado, encontramos quatro casos em que dois números CORRETOS descrevem coisas diferentes:\nFCIA full-duplex × T11 por direção (2×) · LTO nativo × comprimido (2,5×) · gigabyte × gigabit (8×) · cliente × servidor do AFP (5 anos).\nNenhum é erro de pesquisa: todos são erros de LEITURA, e passariam por uma revisão que só conferisse se o número está na fonte.", ACC);
  card(s, M, 4.70, CW, 1.44, "3. A pergunta do enunciado está sendo reformulada pela indústria",
    "O AST tenta resolver no array, com 256 MiB e latência de horas, um problema que o buffer manager já resolve com 8–16 KiB e latência de acesso — 16.384 a 32.768× de diferença.\nO object storage abandonou bloco E arquivo, e atende cargas que amortizam o custo das requisições. E o Aurora mostrou que, quando o motor deixa de escrever\npáginas, a escolha entre bloco e arquivo perde parte do sentido. Continua havendo resposta certa para cada carga — mas a fronteira se moveu.", INK2);
}

/* ============================== 29. PERGUNTAS PARA O DEBATE ============================== */
{
  const s = slide("Questões em aberto para o debate", "Sete perguntas que consideramos genuinamente abertas",
    "Oferecer para a discussão em sala e no fórum do AVA. Não são perguntas retóricas: são pontos em que o grupo não tem resposta fechada.");
  bullets(s, 1.52, [
    "Se a rede FC é <5% da latência de um acesso NVMe, o que ainda justifica economicamente uma fabric FC dedicada — isolamento operacional, ou inércia de investimento?",
    "O AST pode ser CONTRAPRODUCENTE para OLTP? Deveria existir uma interface que exponha as estatísticas do buffer manager ao array — ou o storage deve permanecer deliberadamente ignorante?",
    "Qual é a granularidade certa para tiering? 256 MiB é 16.384× uma página de 16 KiB. Ou o problema é que tiering e caching são mecanismos diferentes vendidos com o mesmo nome?",
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
  card(s, M, 2.76, 5.795, 1.64, "Duas camadas de controle de fluxo",
    "XFER_RDY → por COMANDO, na camada FC-4.\nBB_Credit → por QUADRO, na camada FC-2,\nentre portas adjacentes.\n\nSão independentes: o congestionamento de\numa não é visível na outra.", BLUE);
  card(s, M+6.095, 2.76, 5.795, 1.64, "Carga útil por quadro",
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
    "Backup para duas perguntas prováveis e específicas. NDMP é uma opção em equipamentos compatíveis para 'como se faz backup de um NAS'. hard vs soft é a resposta concreta ao requisito 5 do slide 4.");
  card(s, M, 1.56, CW, 1.72, "Backup de NAS: NDMP como opção",
    "O NDMP separa controle e dados no backup de equipamentos compatíveis.\nPode permitir envio direto do NAS à fita. Não é obrigatório para todo NAS: a escolha\ndepende do suporte do equipamento e do software de backup.", BLUE);
  card(s, M, 3.44, CW, 1.52, "E se o servidor NFS sumir por 30 segundos? — a opção de montagem hard vs soft",
    "hard: a E/S BLOQUEIA até o servidor voltar. O processo trava, mas nada é corrompido.  soft: a E/S RETORNA ERRO após os timeouts,\ne o SGBD pode registrar uma escrita como perdida. Para banco de dados, a recomendação dos fornecedores é hard.\nÉ a resposta concreta ao requisito 5 do slide 4 — e o análogo, no lado SAN, é no_path_retry / fast_io_fail_tmo no multipath.", ACC);
  card(s, M, 5.12, CW, 1.42, "Nível terciário: onde NAS e SAN entram",
    "Fita pode usar FC na SAN ou SAS direto. O estágio em disco pode ser NAS, LUN SAN ou disco local.\nSe produção e backup compartilham enlaces, dimensionar a capacidade. Zoneamento controla acesso, não reserva banda.\nNAS e SAN podem atender papéis distintos no caminho até a mídia terciária.", INK2);
}
{
  const s = slideBackup("RAID e multipath: o que a SAN pressupõe", "Dois mecanismos que ficam fora da discussão de protocolo e dentro da de arquitetura",
    "Backup para perguntas sobre RAID, que ocupa uma seção inteira do Elmasri e quase não aparece no corpo do deck, e sobre o que faz a fabric dupla realmente funcionar. Na fala: o requisito 5 da régua não é atendido pelo protocolo sozinho, e quem o atende são estes dois mecanismos. O parâmetro de multipath é o que decide se uma falha de caminho é invisível ou fatal, e é o análogo, do lado SAN, da escolha entre hard e soft na montagem NFS.");
  s.addShape(pres.ShapeType.roundRect, { x:M, y:1.56, w:CW, h:1.98, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("A penalidade de escrita aplicada ao WAL, derivação nossa", {
    x:M+0.28, y:1.66, w:CW-0.56, h:0.28, isTextBox:true, fontFace:BF, fontSize:12.5, bold:true, color:"FFD9C7" });
  s.addText("Custo, em operações físicas, de uma escrita aleatória de um bloco:\n\nRAID 1 → 2          RAID 5 → 4  (2 leituras + 2 escritas)          RAID 6 → 6  (3 leituras + 3 escritas)\n\nO log de transações é escrito sequencialmente e sincronizado a cada commit. Sob RAID 5, toda descarga de log que não preencha\numa faixa completa paga a penalidade de quatro vezes, e é justamente a taxa de commits que ela limita.\n\nSilberschatz, §12.5: “o RAID nível 1 é popular para aplicações como o armazenamento de arquivos de log num sistema de banco de\ndados, já que oferece o melhor desempenho de escrita”. Daí a regra prática: log em RAID 1 ou 10, dados em RAID 5 ou 6.", {
    x:M+0.28, y:1.98, w:CW-0.56, h:1.48, isTextBox:true, fontFace:BF, fontSize:11, color:W2, lineSpacingMultiple:1.02 });
  card(s, M, 3.70, 5.795, 1.72, "Multipath e ALUA",
    "Montar duas fabrics só produz disponibilidade se\nhouver, no servidor, uma camada que reconheça que\nos dois caminhos levam ao mesmo LUN, papel do\nDM-Multipath no Linux e do MPIO no Windows. O padrão\nALUA permite que o array informe quais caminhos são\notimizados e quais são apenas disponíveis.", BLUE);
  card(s, M+6.095, 3.70, 5.795, 1.72, "O parâmetro que decide o resultado",
    "Em no_path_retry e fast_io_fail_tmo, configurar como\nenfileirar indefinidamente congela a instância, e como\nfalhar imediatamente aborta transações. É decisão de\nprojeto, e não padrão a aceitar, sendo o análogo, do\nlado da SAN, da escolha entre hard e soft na\nmontagem de um compartilhamento NFS.", ACC);
  s.addText("Por que isto importa para o AST: é a mesma razão pela qual a política de tiering do volume de redo deve ser fixada, e não deixada ao critério estatístico do array.", {
    x:M, y:5.60, w:CW, h:0.36, isTextBox:true, fontFace:BF, fontSize:12, bold:true, color:INK });
  fonteNota(s, 6.04, "Fontes: Silberschatz et al., §12.5.5 (as duas citações sobre RAID 5 e RAID 1); padrão T10 SPC para o ALUA; multipath.conf(5).");
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
  tabela(s, 1.56, ["Grandeza","Conta"], linhas, [2.55,9.34], 8.5, 0.51);
}
{
  const s = slideBackup("Post-Mortem — as 42 correções, por família", "Só UMA foi “alucinação”; as outras 41 foram erros bem mais difíceis de detectar",
    "Slide de defesa sobre o Post-Mortem. A família (e) é a que mais ensinou, e é a mais recente: a frase era VERDADEIRA e a FONTE era falsa — texto de Wikipédia entre aspas, creditado a uma norma ANSI paga que não tínhamos. Nenhuma checagem de fato pega isso, porque o fato confere; só pega quem abre o documento citado e procura a frase lá dentro. A família (d) vem logo atrás: erros de ENQUADRAMENTO, em que cada afirmação isolada era verdadeira e o erro estava no que ficou de fora.");
  tabela(s, 1.54, ["Família","Qtd.","Exemplos","Antídoto"],
    [
      ["(a) Rótulo errado sobre número certo","17","full-duplex × por direção · 64b/66b × 256b/257b · Server 2019 × versão 1709 (SAC) · 126 × 127 no FC-AL · CERN “gravou” × “processou” · Aurora sem os 30 min · “<5%” sem a controladora","“Este número mede o quê, em que condições?”"],
      ["(b) Desatualização","7","cliente AFP · speedmap v21 · RFC 3720 · RFC 5661 · S3 “eventualmente consistente”","Carimbar data; reverificar qual norma vige"],
      ["(c) Excesso de confiança","11","CIFS ≡ SMB 1.0 · Aurora 7,7× não reconferido · Dropbox “concluiu em 2016” · Kinetic “descontinuada” · custos sem proveniência","Refazer TODA conta citada, inclusive de artigo revisado por pares"],
      ["(d) RECORTE — enquadramento","4","Lacuna declarada que não existia · “fator exatamente 2” além dos casos tabelados · FCoE citando o livro só até a frase conveniente","Ler o parágrafo INTEIRO: “o que ficou de fora?”"],
      ["(e) PROVENIÊNCIA FABRICADA — o pior","1","Frase da Wikipédia entre aspas, atribuída à norma FC-BB-5 (ANSI/INCITS 462-2010) — paga, e que não consultamos","Sem o documento aberto, não se usa aspas"],
    ], [2.90,0.60,5.60,2.79], 8.0, 0.70);
  s.addShape(pres.ShapeType.roundRect, { x:M, y:6.02, w:CW, h:0.84, rectRadius:0.06,
    fill:{ color:DARK }, line:{ color:DARK, width:1 } });
  s.addText("A lição: verificar FATOS é necessário e não é suficiente. Faltam duas perguntas: “O QUE FOI DEIXADO DE FORA PARA QUE ISTO PARECESSE VERDADE?” (família d) e “ESTA FRASE ESTÁ MESMO NO DOCUMENTO A QUE EU A ATRIBUÍ?” (família e).\nA primeira uma IA responde bem. As outras duas exigem adotar a perspectiva de quem quer derrubar o trabalho — e abrir a fonte.", {
    x:M+0.28, y:6.10, w:CW-0.56, h:0.68, isTextBox:true, fontFace:BF, fontSize:10.5, color:W2 });
}
{
  const s = slideBackup("Post-Mortem — as três rodadas de verificação", "Rodada 1: 18 correções (16 do teste de 48 + 2 externas) · Rodada 2: 15 · Rodada 3: 9",
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
      ["3 — proveniência das citações","“Para cada frase entre aspas, abra o documento primário e procure a frase lá dentro.”","9 correções — inclusive a aspa atribuída a uma norma que não consultamos"],
      ["TOTAL","","42 correções aplicadas (ver slide anterior)"],
    ], [2.40,3.85,5.64], 9.5, 0.56);
  s.addText("Custo-benefício: as três rodadas somaram ~30% do esforço e produziram 40 das 42 correções. Cada rodada achou uma classe que a anterior não via: a 2 achou o recorte de citação; a 3 achou a citação com a fonte errada. Todas registradas no corpo do relatório, não apagadas.", {
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
      ["Raphael Henrique da Silva Pereira","AST, object storage e apoio à conferência complementar do Post-Mortem em 06/09","Adotar a tensão AST × buffer manager e solicitar ao Codex uma conferência complementar dos artefatos atuais"],
      ["Vivian Maria da Silva e Souza","Recomendação (secundário e terciário) e exemplos reais","Critério de seleção: só casos com documentação primária. Recomendar por PERFIL DE CARGA"],
    ], [3.10,3.70,5.09], 9, 0.72);
}

pres.writeFile({ fileName: process.env.OUTPUT_PPTX || "Slides_NAS_SAN_Armazenamento_SBD_v2.pptx" })
  .then(async f => {
    await require('../scripts/normalizar_pptx.cjs')(process.env.OUTPUT_PPTX || 'Slides_NAS_SAN_Armazenamento_SBD_v2.pptx');
    console.log("OK ->", f, "| slides numerados:", n);
  });
