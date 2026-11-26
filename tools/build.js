#!/usr/bin/env node
// Monta o app Kaien num único index.html a partir de src/.
//
// Uso: node tools/build.js [--imagens=arquivos|inline|sem] [--variante=apk|teste] [--saida=pasta]
//   --imagens=arquivos (padrão) imagens em assets/img/, referenciadas por caminho relativo
//   --imagens=inline            imagens embutidas em base64 (um arquivo só, como antes)
//   --imagens=sem               marcador __IMG__ no lugar das imagens (igual ao index-sem-imagens.html)
//   --variante=teste            limpa localStorage/sessionStorage ao abrir (sempre começa do zero)
//
// Imagem que não existe em assets/img/ vira um placeholder SVG (veja ARTE-MANIFESTO.md).
// Para trocar a arte: coloque assets/img/<nome>.webp e rode o build de novo.
'use strict';
const fs = require('fs'), path = require('path');

const RAIZ = path.join(__dirname, '..');
const SRC = path.join(RAIZ, 'src');
const IMG = path.join(RAIZ, 'assets', 'img');

const arg = (k, d) => { const a = process.argv.find(x => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : d; };
const modo = arg('imagens', 'arquivos');
const variante = arg('variante', 'apk');
const saida = path.resolve(RAIZ, arg('saida', variante === 'teste' ? 'dist-teste' : 'dist'));
if (!['arquivos', 'inline', 'sem'].includes(modo)) throw new Error('--imagens inválido: ' + modo);
if (!['apk', 'teste'].includes(variante)) throw new Error('--variante inválida: ' + variante);

// ---------- placeholders ----------
// Cor de cada hábito (cópia de MCOL em src/js/09-dungeons-dados.js).
const COR = { procrastinacao: '150,90,255', celular: '255,190,70', cigarro: '210,140,110', alcool: '255,90,60',
  sono: '120,110,255', jogos: '90,255,60', apostas: '255,50,70', outra: '170,140,255', espelho: '150,190,255' };
const rot = n => `<text x="50%" y="97%" text-anchor="middle" font-family="Georgia,serif" font-size="26" fill="rgba(234,219,184,.55)">arte pendente · ${n}</text>`;
const svg = (w, h, corpo) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">${corpo}</svg>`;

function placeholder(nome) {
  let m;
  if ((m = nome.match(/^(mob|boss)-([a-z]+)/))) { // monstro: silhueta na cor do hábito, fundo transparente
    const c = COR[m[2]] || '150,150,220';
    return svg(1024, 1536, `<defs><radialGradient id="g"><stop offset="0" stop-color="rgba(${c},.45)"/><stop offset="1" stop-color="rgba(${c},0)"/></radialGradient></defs>` +
      `<ellipse cx="512" cy="800" rx="480" ry="620" fill="url(#g)"/>` +
      `<path d="M512 230C330 230 250 420 270 570 170 760 130 1100 110 1330H914C894 1100 854 760 754 570 774 420 694 230 512 230Z" fill="#160f2a" stroke="rgba(${c},.9)" stroke-width="10"/>` +
      `<ellipse cx="430" cy="560" rx="36" ry="20" fill="rgba(${c},1)"/><ellipse cx="594" cy="560" rx="36" ry="20" fill="rgba(${c},1)"/>` + rot(nome));
  }
  if (/^(spin|p[A-Z]|kemo)/.test(nome)) { // personagem: silhueta humana, fundo transparente
    return svg(1024, 1536, `<g fill="#120d22" stroke="rgba(217,179,106,.75)" stroke-width="8">` +
      `<circle cx="512" cy="330" r="120"/><path d="M330 1460 360 760C360 560 430 480 512 480S664 560 664 760L694 1460Z"/>` +
      `<path d="M370 560 250 960M654 560 774 960" stroke-width="60" stroke-linecap="round"/></g>` + rot(nome));
  }
  if (/^em[A-Z]/.test(nome)) { // emblema de rank
    return svg(1024, 1024, `<path d="M512 60 964 512 512 964 60 512Z" fill="#1a1230" stroke="#d9b36a" stroke-width="22"/>` +
      `<path d="M512 230 794 512 512 794 230 512Z" fill="none" stroke="#8e1f1a" stroke-width="14"/>`);
  }
  // fundo / cena: gradiente de tinta noturna, lua roxa e pincelada carmesim
  return svg(1024, 1536, `<defs><linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14112e"/><stop offset=".6" stop-color="#080a1c"/><stop offset="1" stop-color="#2a0f14"/></linearGradient>` +
    `<radialGradient id="l"><stop offset="0" stop-color="#cdb8ff"/><stop offset=".6" stop-color="rgba(150,120,230,.35)"/><stop offset="1" stop-color="rgba(150,120,230,0)"/></radialGradient></defs>` +
    `<rect width="1024" height="1536" fill="url(#t)"/><circle cx="740" cy="330" r="230" fill="url(#l)"/>` +
    `<path d="M80 1180C300 1120 620 1230 960 1150" stroke="rgba(142,31,26,.6)" stroke-width="34" fill="none" stroke-linecap="round"/>` + rot(nome));
}
// Codifica o SVG para caber em url(...) do CSS e em strings JS com aspas simples.
const svgUri = s => 'data:image/svg+xml,' + encodeURIComponent(s).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');

// ---------- montagem ----------
const ordem = JSON.parse(fs.readFileSync(path.join(SRC, 'ordem.json'), 'utf8'));
const ler = f => fs.readFileSync(path.join(SRC, f), 'utf8');
let html = ler('index.template.html')
  .replace('{{CSS}}', () => ordem.css.map(ler).join('\n'))
  .replace('{{JS}}', () => ordem.js.map(ler).join('\n'));

// Variações: arte nova que ainda não existe pode usar uma arte existente com filtro de cor
// (src/arte.json: nome -> {base, filtro}). O filtro vai na classe .af-<nome>, que só é
// emitida enquanto a arte própria não existir.
const ARTE = JSON.parse(fs.readFileSync(path.join(SRC, 'arte.json'), 'utf8'));
const existe = n => fs.existsSync(path.join(IMG, n + '.webp'));
const usadas = new Set(), faltando = new Set(), variacoes = new Map();
const refImg = nome => {
  usadas.add(nome);
  return modo === 'inline' ? 'data:image/webp;base64,' + fs.readFileSync(path.join(IMG, nome + '.webp')).toString('base64') : 'assets/img/' + nome + '.webp';
};
html = html.replace(/@@IMG:([A-Za-z0-9_-]+)@@/g, (_, nome) => {
  if (modo === 'sem') return 'data:image/webp;base64,__IMG__';
  if (existe(nome)) return refImg(nome);
  faltando.add(nome);
  const v = ARTE[nome];
  if (v && existe(v.base)) { variacoes.set(nome, v.filtro || 'none'); return refImg(v.base); }
  return svgUri(placeholder(nome));
});
const afCss = [...variacoes].map(([n, f]) => `.af-${n}{filter:${f}!important}`).join('\n');
html = html.replace('/*@@AF-CSS@@*/', () => afCss);
// Fontes: arquivo em assets/fonts/ ou embutida em base64.
const FONTES = path.join(RAIZ, 'assets', 'fonts'), fontesUsadas = new Set();
html = html.replace(/@@FONT:([A-Za-z0-9_-]+)@@/g, (_, nome) => {
  const arq = path.join(FONTES, nome + '.woff2');
  if (!fs.existsSync(arq)) throw new Error('Fonte não encontrada: ' + arq);
  fontesUsadas.add(nome);
  return modo === 'arquivos' ? 'assets/fonts/' + nome + '.woff2' : 'data:font/woff2;base64,' + fs.readFileSync(arq).toString('base64');
});
html = html.replace(/@@TESTE@@/g, variante === 'teste' ? 'true' : 'false');
if (/@@[A-Z]+[:@]/.test(html)) throw new Error('Sobrou marcador @@ sem substituir');

if (variante === 'teste') {
  // Variante de teste: começa do zero a cada abertura.
  html = html.replace('<head>', '<head><script>try{localStorage.clear();sessionStorage.clear()}catch(e){}</script>');
}

fs.rmSync(saida, { recursive: true, force: true });
fs.mkdirSync(saida, { recursive: true });
fs.writeFileSync(path.join(saida, 'index.html'), html);
if (modo === 'arquivos') {
  fs.mkdirSync(path.join(saida, 'assets', 'img'), { recursive: true });
  for (const n of usadas) fs.copyFileSync(path.join(IMG, n + '.webp'), path.join(saida, 'assets', 'img', n + '.webp'));
  if (fontesUsadas.size) {
    fs.mkdirSync(path.join(saida, 'assets', 'fonts'), { recursive: true });
    for (const n of fontesUsadas) fs.copyFileSync(path.join(FONTES, n + '.woff2'), path.join(saida, 'assets', 'fonts', n + '.woff2'));
    fs.copyFileSync(path.join(FONTES, 'OFL-space-grotesk.txt'), path.join(saida, 'assets', 'fonts', 'OFL-space-grotesk.txt'));
  }
}
const tam = p => { const st = fs.statSync(p); return st.isDirectory() ? fs.readdirSync(p).reduce((a, f) => a + tam(path.join(p, f)), 0) : st.size; };
console.log(`Build ${variante} (${modo}) em ${path.relative(RAIZ, saida)}/ · ${(tam(saida) / 1048576).toFixed(2)} MB` +
  (modo !== 'sem' ? ` · imagens: ${usadas.size} arquivos, ${variacoes.size} variações por filtro, ${faltando.size - variacoes.size} placeholders` : ''));
if (faltando.size && process.argv.includes('--listar')) console.log('Sem arte própria: ' + [...faltando].sort().join(', '));
// Lista para o manifesto de arte
fs.writeFileSync(path.join(saida, 'arte-pendente.json'), JSON.stringify([...faltando].sort(), null, 1));
