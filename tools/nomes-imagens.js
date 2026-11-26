// Dá um nome estável a cada imagem base64 embutida num index.html do Kaien.
// O nome vem do contexto: seletor CSS (.pQ3 -> pQ3, .bg.t2 -> bg-t2), chave de
// MIMG/MOBIMG (boss-jogos, mob-jogos-0) ou posição nos arrays de giro (spin-2).
'use strict';

const SLUG = {
  'Procrastinação': 'procrastinacao', 'Celular e redes sociais': 'celular', 'Cigarro ou vape': 'cigarro',
  'Álcool': 'alcool', 'Sono ruim': 'sono', 'Jogos': 'jogos', 'Apostas': 'apostas',
  'Outra coisa': 'outra', 'O Espelho': 'espelho'
};
const PAT = /data:image\/(webp|png|jpeg);base64,([A-Za-z0-9+/=]+|__IMG__)/g;
const B64 = /data:image\/(?:webp|png|jpeg);base64,(?:[A-Za-z0-9+/=]+|__IMG__)/g;

function cssName(pre) {
  const i = pre.lastIndexOf('{');
  const j = Math.max(pre.lastIndexOf('}', i), pre.lastIndexOf('\n', i));
  return pre.slice(j + 1, i).trim()
    .replace('.rdr .chimg.', 'chimg-').replace(':after', '').replace('.bg.', 'bg-')
    .replace(/^\./, '').replace(/[^A-Za-z0-9_-]/g, '-');
}

// Lista {name, ext, start, end, data} na ordem em que aparecem.
function nomesImagens(s) {
  const out = [], arr = {};
  let m;
  PAT.lastIndex = 0;
  while ((m = PAT.exec(s))) {
    // olha para trás sem o base64 das imagens anteriores
    const pre = s.slice(Math.max(0, m.index - 400000), m.index).replace(B64, 'IMG').slice(-300);
    let name;
    if (pre.endsWith('url(')) name = cssName(pre);
    else {
      const km = pre.match(/'([^']+)':'$/);
      const am = pre.match(/(SPIN2|SPIN0|SPIN)=\[[^\]]*$/);
      if (km && SLUG[km[1].split('|')[0]]) {
        const [h, i] = km[1].split('|');
        name = i != null ? 'mob-' + SLUG[h] + '-' + i : 'boss-' + SLUG[h];
      } else if (am) {
        const a = am[1], c = arr[a] || 0; arr[a] = c + 1;
        name = a.toLowerCase() + '-' + c;
      } else name = 'desconhecida-' + out.length;
    }
    out.push({ name, ext: m[1], start: m.index, end: m.index + m[0].length, data: m[2] });
  }
  return out;
}

module.exports = { nomesImagens, SLUG };
