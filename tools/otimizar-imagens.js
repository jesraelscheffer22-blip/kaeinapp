#!/usr/bin/env node
// Converte imagens novas (PNG/JPG vindas do ChatGPT) de assets/img/ para WebP leve, no tamanho certo.
// Uso: node tools/otimizar-imagens.js
// Precisa do "cwebp" (pacote webp) ou do Python com Pillow. No GitHub Actions o build.yml instala o cwebp.
// Tamanhos: capítulos/chefes/fundos 768 px de largura; mini monstros e companheiros 512 px.
'use strict';
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const DIR = path.join(__dirname, '..', 'assets', 'img');
const largura = n => /^(mob2?-|comp-|spin)/.test(n) ? 512 : 768;
const tem = c => { try { execFileSync(c, ['-version'], { stdio: 'ignore' }); return true } catch (e) { try { execFileSync(c, ['--version'], { stdio: 'ignore' }); return true } catch (e2) { return false } } };
const cwebp = tem('cwebp'), py = !cwebp && tem('python3');
let n = 0;
for (const f of fs.readdirSync(DIR)) {
  const m = f.match(/^(.+)\.(png|jpe?g)$/i); if (!m) continue;
  const nome = m[1], src = path.join(DIR, f), dst = path.join(DIR, nome + '.webp'), w = largura(nome);
  if (cwebp) execFileSync('cwebp', ['-quiet', '-q', '78', '-alpha_q', '85', '-resize', String(w), '0', src, '-o', dst]);
  else if (py) execFileSync('python3', ['-c', `import sys\nfrom PIL import Image\nim=Image.open(sys.argv[1]);w=int(sys.argv[3]);im=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS) if im.width>w else im\nim.save(sys.argv[2],'WEBP',quality=78,method=6)`, src, dst, String(w)]);
  else { console.error('Instale o cwebp (pacote "webp") ou Python com Pillow para converter ' + f); process.exit(1) }
  fs.unlinkSync(src); n++;
  console.log(`${f} -> ${nome}.webp (${(fs.statSync(dst).size / 1024).toFixed(0)} KB)`);
}
console.log(n ? `${n} imagem(ns) convertida(s).` : 'Nenhuma imagem PNG/JPG nova para converter.');
