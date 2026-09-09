// Remove apenas declarações redundantes de mestres inexistentes geradas pelo
// PptxGenJS. Não remove slides, layouts, relações ou conteúdo da apresentação.
const fs = require('node:fs/promises');
const JSZip = require('jszip');
module.exports = async function normalizarPptx(filename) {
  const zip = await JSZip.loadAsync(await fs.readFile(filename));
  const part = zip.file('[Content_Types].xml');
  const xml = await part.async('string');
  const clean = xml.replace(/<Override\b[^>]*\/>/g, tag => {
    const name = tag.match(/PartName="([^"]+)"/)?.[1];
    if (name && /^\/ppt\/slideMasters\/slideMaster\d+\.xml$/.test(name)
        && !zip.file(name.slice(1))) return '';
    return tag;
  });
  let changed = clean !== xml;
  // Categorias de nível único: representação simples equivalente, com a mesma
  // referência de planilha e o mesmo cache. Preserva o workbook incorporado.
  for (const name of Object.keys(zip.files).filter(n => /^ppt\/charts\/chart\d+\.xml$/.test(n))) {
    const source = await zip.file(name).async('string');
    const normalized = source.replace(/<c:multiLvlStrRef>[\s\S]*?<\/c:multiLvlStrRef>/g, block => {
      if ((block.match(/<c:lvl>/g) || []).length !== 1) return block;
      return block.replaceAll('multiLvlStrRef', 'strRef')
        .replaceAll('multiLvlStrCache', 'strCache')
        .replace('<c:lvl>', '').replace('</c:lvl>', '');
    });
    if (source !== normalized) { zip.file(name, normalized); changed = true; }
  }
  if (changed) {
    zip.file('[Content_Types].xml', clean);
    await fs.writeFile(filename, await zip.generateAsync({type:'nodebuffer', compression:'DEFLATE'}));
  }
};
