#!/usr/bin/env node
// Gera KAIEN-IMAGENS.pdf: guia completo das imagens para gerar no ChatGPT.
// Uso: NODE_PATH=$(npm root -g) node tools/manifesto-pdf.js
'use strict';
const fs = require('fs'), path = require('path');
const { L, existe, ESTILO, REGRAS, TRANSP, HEROI } = require('./manifesto.js');
const RAIZ = path.join(__dirname, '..');
const h = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Explicação em português por grupo
const PT = {
  '1': x => `Seu personagem com a roupa nova (${x.onde.split('·')[1].trim()}). Corpo inteiro, de frente, com fundo transparente. Anexe a imagem pH5.webp para o ChatGPT manter o mesmo rosto e o mesmo corpo.`,
  '2': x => `Cenário sem pessoas: ${x.onde.split('·')[1].trim()}. Aparece atrás do personagem e nas cinemáticas. A parte de baixo deve ficar mais escura, porque os botões do app ficam ali.`,
  '3': x => `Cenário do portão da ${x.onde.replace('Cartão e tela da ', '')}. Sem pessoas. Passa a ideia de "atravessar um portão".`,
  '4': x => `Chefe evoluído da dungeon (Fase 2): ${x.onde.split('·')[1].trim()}. Anexe o chefe original como referência para a versão nova "lembrar" a antiga. Fundo transparente.`,
  '5': x => `Forma Verdadeira do chefe (Fase 3, rank B): ${x.onde.split('·')[1].trim()}. Mítica e simbólica, mostrando que está sendo vencida. Fundo transparente.`,
  '6': x => `Retrato do companheiro ${x.onde.split('·')[1].trim()}, da cintura para cima. Aparece na aba Kaien → Amigos. Fundo transparente.`,
  '7': x => `Ilustração do capítulo "${x.onde.split('·')[1].trim()}" das histórias do Kaien. Kaien jovem: cabelo longo escuro ondulado, roupas escuras, antebraços enfaixados. Velho mestre: cabelo branco. A parte de baixo deve ficar mais calma, porque o texto aparece por cima.`,
  '8': x => `Mini monstro evoluído da dungeon (Fase 2): ${x.onde.split('·').slice(1).join('·').trim()}. Pequeno, um pouco fofo e travesso, nunca assustador. Fundo transparente.`,
  '9': x => `Monstro da invasão das estações: ${x.onde.split('·')[1].trim()}. Aparece por 7 dias, 4 vezes por ano. Fundo transparente.`,
  '10': x => `Quadro do giro 360° do personagem (${x.onde.split('·').slice(1).join('·').trim()}). São 4 quadros por roupa (frente, direita, costas, esquerda), todos no mesmo tamanho e na mesma posição. É o item menos importante: deixe para o fim.`
};
const ptDe = x => (PT[x.g.split('.')[0]] || (() => ''))(x);
const nivel = x => { const m = x.onde.match(/nível (\d+)/); return m ? +m[1] : 99 };

// Ordem: grupos na ordem de importância; capítulos por nível
const grupos = [...new Set(L.map(x => x.g))];
const itens = []; grupos.forEach(g => { let a = L.filter(x => x.g === g); if (g.startsWith('7.')) a = a.slice().sort((p, q) => nivel(p) - nivel(q)); a.forEach(x => itens.push(x)) });
itens.forEach((x, i) => x.n = i + 1);

// Plano B: imagens que já existem no index.html antigo de 12,8 MB
const MOB1 = { alcool: [['Brinde Fácil', 'a cheerful little goblet imp raising a toast'], ['Desculpa de Sexta', 'a party-hat creature holding a calendar page'], ['Copo da Vontade', 'a small glass creature with pleading eyes'], ['Silêncio Pesado', 'a heavy grey cloud creature sitting quietly']], celular: [['Notificação Fantasma', 'a small ghost shaped like a notification bubble'], ['Scroll Sem Fim', 'a paper-scroll worm that never ends'], ['Curtida Vazia', 'a hollow heart-shaped creature'], ['Só Mais Um Vídeo', 'a tiny screen creature with a play button belly']], procrastinacao: [['Amanhã Eu Faço', 'a lazy blob creature lying on a calendar'], ['Soneca do Alarme', 'a sleepy alarm-clock creature hitting its own snooze button'], ['Aba Aberta', 'a creature made of many open browser windows (no text)'], ['Lista Infinita', 'a long unrolling list creature with checkboxes (no text)']], sono: [['Tela da Madrugada', 'a small glowing screen spirit at night'], ['Pensamento em Loop', 'a spiral-shaped thought creature'], ['Café das Seis', 'a coffee cup creature with wide sleepless eyes'], ['Cama Tarde', 'a messy bed creature yawning under the moon']] };
const B = [];
const addB = (f, onde, pt, ref, p) => B.push({ f, onde, pt, ref, p });
addB('pH10', 'Personagem com a roupa do rank D', 'Seu personagem com a roupa do rank D: capa em camadas, tons de ferro e azul-aço.', 'pH5.webp', `${ESTILO} ${HEROI} Outfit: layered dark cloak with iron-grey and steel-blue accents, iron bracers. ${TRANSP} ${REGRAS}`);
[['spin0', 'roupa inicial', 'simple black training clothes with a white sash'], ['spin2', 'roupa do rank D', 'layered dark cloak with iron-grey and steel-blue accents']].forEach(([n, r, roupa]) => ['front view', 'right side view', 'back view', 'left side view'].forEach((v, i) => addB(`${n}-${i}`, `Giro 360° · ${r} · quadro ${i + 1}`, `Quadro ${i + 1} do giro da ${r}.`, 'pH5.webp', `${ESTILO} ${HEROI.replace('facing the viewer', '')} Outfit: ${roupa}. Camera: ${v}, same scale and position as the other views. ${TRANSP} ${REGRAS}`)));
Object.keys(MOB1).forEach(s => MOB1[s].forEach(([n, c], i) => addB(`mob-${s}-${i}`, `Dungeon Fase 1 · andar ${i + 1} · ${n}`, `Mini monstro "${n}" da dungeon.`, '', `${ESTILO} A small stylized habit monster called "${n}": ${c}. Slightly cute but mischievous, a metaphor for a bad habit, not scary. Full creature visible, centered. ${TRANSP} ${REGRAS}`)));
[['chimg-cap1', 'Capítulo "A primeira recusa"', 'a young man with long dark wavy hair refusing a helping hand from an older student in a courtyard, his knee bandaged, proud and stubborn'], ['chimg-cap2', 'Capítulo "O que me manteve"', 'a young man with long dark wavy hair walking back up temple stairs at dawn after falling, determined'], ['chimg-cap3', 'Capítulo "O homem que não elogiava"', 'a stern old white-haired master watching a young disciple repeat a martial movement in a courtyard'], ['chimg-cap4', 'Capítulo "A vila"', 'a small quiet rice-field village at dusk with a dirt road, a teenage boy running along the road'], ['chimg-cap5', 'Capítulo "Largar tudo"', 'a young man lying in bed in a dim room looking away from a window that shows a courtyard'], ['scnbg', 'Cena do capítulo 1 "A noite no pátio"', 'a torch-lit temple courtyard at night, empty stone floor, purple moon'], ['pvp', 'Prova do rank D (portão)', 'a temple gate at night with iron fittings and blue-steel tones, mist'], ['pvc', 'Prova do rank D (corpo)', 'a training courtyard with wooden posts at dawn, iron-blue tones'], ['pvm', 'Prova do rank D (mente)', 'a quiet meditation pavilion over a pond at night'], ['pvd', 'Prova do rank D (disciplina)', 'a long stone staircase leading to a temple under the moon'], ['fsub', 'Fundo da cinemática do rank D', 'a dramatic temple courtyard with a great waterfall behind it at night, glowing mist']].forEach(([f, n, c]) => addB(f, n, n + '. Cenário sem texto.', '', `${ESTILO} ${c}. ${REGRAS}`));
addB('kemo', 'Kaien emocionado (cinemática do rank D)', 'O Kaien adulto, emocionado e orgulhoso, de frente.', 'uma das suas imagens do Kaien (a dele estendendo a mão)', `${ESTILO} The adult master Kaien: long dark wavy hair, ornate black and silver layered robes with chains, proud and emotional expression, soft smile, upper body, facing the viewer. ${TRANSP} ${REGRAS}`);
[['emE', 'E', 'grey iron'], ['emD', 'D', 'steel blue']].forEach(([f, R, c]) => addB(f, 'Emblema do rank ' + R, 'Emblema do rank ' + R + ' (losango). Pode ficar sem imagem: o app já desenha um emblema vetorial.', '', `A flat ornate diamond-shaped martial arts rank emblem in ${c} metal with engraved patterns, centered, symmetrical, no letters, no text. ${TRANSP} Square 1:1.`));

const caixa = (x, plano) => `<section class="it"><div class="hd"><span class="n">${plano ? 'B' : ''}${x.n || ''}</span><span class="f">${h(x.f)}.png</span>${existe(x.f) ? '<span class="ok">já feita</span>' : ''}</div>
<p><b>Onde aparece:</b> ${h(x.onde)}</p><p><b>O que é:</b> ${h(plano ? x.pt : ptDe(x))}</p>${x.ref ? `<p><b>Anexe no ChatGPT:</b> ${h(x.ref.replace(/assets\/img\/([A-Za-z0-9-]+)\.webp/g,'$1.png'))}</p>` : ''}
<p class="cp">Texto para copiar e colar no ChatGPT:</p><pre>${h(x.p)}</pre></section>`;
const resumo = grupos.map(g => `<tr><td>${h(g.replace(/^\d+\. /, ''))}</td><td>${L.filter(x => x.g === g).length}</td><td>${itens.filter(x => x.g === g).map(x => x.n)[0]}–${itens.filter(x => x.g === g).slice(-1)[0].n}</td></tr>`).join('');
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
@page{size:A4;margin:16mm 14mm}body{font:11pt/1.45 Georgia,serif;color:#1f1a12}
h1{font-size:30pt;margin:0 0 6px;color:#8e1f1a}h2{font-size:16pt;color:#8e1f1a;border-bottom:2px solid #d9b36a;padding-bottom:4px;margin:22px 0 10px;page-break-after:avoid}
.capa{height:250mm;display:flex;flex-direction:column;justify-content:center;text-align:center;background:linear-gradient(180deg,#1a1440,#080a1c);color:#eadbb8;margin:-16mm -14mm;padding:20mm;page-break-after:always}
.capa h1{color:#f1d48a;font-size:40pt}.capa p{font-size:13pt}.big{font-size:56pt;color:#f1d48a;font-weight:900;margin:10px 0}
.passo{background:#f6efdd;border-left:5px solid #d9b36a;padding:8px 12px;margin:8px 0}
table{border-collapse:collapse;width:100%;font-size:10pt}td,th{border:1px solid #d8c9a3;padding:5px 7px;text-align:left}th{background:#efe3c4}
.it{border:1px solid #d8c9a3;border-radius:6px;padding:10px 12px;margin:10px 0;page-break-inside:avoid}
.hd{display:flex;gap:10px;align-items:center;margin-bottom:4px}.n{background:#8e1f1a;color:#fff;border-radius:12px;padding:2px 9px;font-weight:700;font-size:10pt}
.f{font:700 12pt ui-monospace,Menlo,monospace;color:#5a3a0a}.ok{background:#2f7a5a;color:#fff;border-radius:10px;padding:1px 8px;font-size:9pt}
.it p{margin:3px 0}.cp{font-weight:700;color:#8e1f1a;margin-top:6px!important}
pre{white-space:pre-wrap;word-break:break-word;background:#fbf7ec;border:1px dashed #c9b27a;padding:8px;border-radius:4px;font:9pt/1.4 ui-monospace,Menlo,monospace;margin:4px 0 0}
.nota{font-size:10pt;color:#5d5340}</style></head><body>
<div class="capa"><h1>KAIEN</h1><p>Guia das imagens para gerar no ChatGPT</p><div class="big">${itens.length}</div><p>imagens novas, em ordem de importância</p><p style="margin-top:30px">+ ${B.length} imagens que já existem no seu arquivo antigo (Plano B no final)</p><p style="margin-top:40px;font-size:10pt;opacity:.8">Gerado em ${new Date().toLocaleDateString('pt-BR')}</p></div>
<h2>Como fazer (leia antes)</h2>
<div class="passo"><b>1. Abra o ChatGPT</b> com geração de imagens. Use uma conversa nova para cada grupo (roupas, fundos, monstros...). Assim ele mantém o mesmo estilo dentro do grupo.</div>
<div class="passo"><b>2. Anexe as referências.</b> Se o item disser "Anexe no ChatGPT", envie essa imagem junto. As imagens de referência eu te mandei no chat, com o mesmo nome (por exemplo <b>pH5.png</b>, <b>boss-jogos.png</b>). Elas também estão no GitHub, na pasta <b>assets/img</b>. Também vale anexar <b>uma das suas imagens da abertura</b> (a do Kaien com o mestre, por exemplo) e escrever "use o mesmo estilo desta imagem". Isso ajuda muito na consistência.</div>
<div class="passo"><b>3. Copie o texto</b> da caixa pontilhada e cole no ChatGPT. Se ficar diferente do que você quer, peça ajustes simples: "mais escuro", "mesmo rosto da referência", "sem texto", "fundo transparente".</div>
<div class="passo"><b>4. Baixe a imagem</b> e renomeie com o <b>nome exato</b> do item (por exemplo <b>bg-bambu.png</b>). Pode ser PNG; o app converte sozinho para um formato leve.</div>
<div class="passo"><b>5. Me mande</b> as imagens aqui no chat, várias de uma vez, com o nome certo. Eu coloco no app, testo e gero um APK novo.</div>
<div class="passo"><b>Fundo transparente:</b> personagens e monstros precisam de fundo transparente. Se o ChatGPT não conseguir, peça <b>fundo verde puro (#00FF00)</b> e me mande assim mesmo, que eu recorto.</div>
<div class="passo"><b>Tamanho:</b> todas na vertical (2:3). Se o ChatGPT oferecer tamanhos, escolha o vertical (1024×1536).</div>
<p class="nota">Enquanto uma imagem não existe, o app usa uma versão recolorida das artes atuais ou uma silhueta. Nada quebra. Você pode mandar aos poucos, na ordem deste guia.</p>
<h2>Resumo por grupo</h2><table><tr><th>Grupo (ordem de importância)</th><th>Quantas</th><th>Itens</th></tr>${resumo}<tr><td>Plano B (só se você não tiver o arquivo antigo)</td><td>${B.length}</td><td>B1–B${B.length}</td></tr></table>
${grupos.map(g => `<h2>${h(g)}</h2>` + itens.filter(x => x.g === g).map(x => caixa(x)).join('')).join('')}
<h2>Plano B · imagens que já existem no seu index.html antigo (12,8 MB)</h2>
<p class="nota"><b>Não gere estas se você ainda tiver aquele arquivo.</b> Basta me mandar o index.html antigo de 12,8 MB que eu extraio todas de uma vez, iguais às originais. Use os textos abaixo só se o arquivo tiver se perdido.</p>
${B.map((x, i) => caixa(Object.assign({ n: i + 1 }, x), true)).join('')}
</body></html>`;
fs.writeFileSync(path.join(RAIZ, 'KAIEN-IMAGENS.html'), html);
(async () => {
  const { chromium } = require('playwright'); const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent(html, { waitUntil: 'load' });
  await p.pdf({ path: path.join(RAIZ, 'KAIEN-IMAGENS.pdf'), format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: '<div style="font-size:8pt;width:100%;text-align:center;color:#888">Kaien · imagens · página <span class="pageNumber"></span> de <span class="totalPages"></span></div>', margin: { top: '14mm', bottom: '16mm', left: '12mm', right: '12mm' } });
  await b.close(); console.log(`KAIEN-IMAGENS.pdf: ${itens.length} itens + ${B.length} no Plano B`);
})();
