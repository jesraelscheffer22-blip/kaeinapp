#!/usr/bin/env node
// Extrai as imagens base64 de um index.html completo para assets/img/<nome>.<ext>.
// Uso: node tools/extrair-imagens.js caminho/index.html [--sobrescrever]
// Quando chegar o index.html atual (12,8 MB), rode este script nele:
// todas as imagens que faltam passam a existir e o build para de usar placeholders.
'use strict';
const fs = require('fs'), path = require('path');
const { nomesImagens } = require('./nomes-imagens');

const arq = process.argv[2];
if (!arq) { console.error('Uso: node tools/extrair-imagens.js index.html [--sobrescrever]'); process.exit(1); }
const sobrescrever = process.argv.includes('--sobrescrever');
const dir = path.join(__dirname, '..', 'assets', 'img');
fs.mkdirSync(dir, { recursive: true });

const s = fs.readFileSync(arq, 'utf8');
let novas = 0, mantidas = 0, ignoradas = [];
for (const im of nomesImagens(s)) {
  if (im.data === '__IMG__') continue;
  if (im.name.startsWith('desconhecida-')) { ignoradas.push(im.name); continue; }
  const destino = path.join(dir, im.name + '.' + im.ext);
  if (fs.existsSync(destino) && !sobrescrever) { mantidas++; continue; }
  fs.writeFileSync(destino, Buffer.from(im.data, 'base64'));
  novas++;
}
console.log(`Imagens gravadas: ${novas} · já existiam: ${mantidas}` +
  (ignoradas.length ? ` · sem nome reconhecido (ignoradas): ${ignoradas.join(', ')}` : ''));
