#!/usr/bin/env node
// Bot de teste + Chefes Errantes (terça/sexta, rodízio de 10) + tela de Recompensas.
// Uso: node tools/build.js --bot --saida=dist-bot && node qa/teste-bot.js dist-bot/index.html [pasta-telas]
'use strict';
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
const alvo = path.resolve(process.argv[2] || 'dist-bot/index.html'), telas = process.argv[3];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 } }); const erros = []; p.on('pageerror', e => erros.push(e.message));
  await p.goto('file://' + alvo); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(300);
  const r = await p.evaluate(() => {
    quick(); _ab = 1; S.wd0 = 0; S.splashDay = S.day; S.lvShown = myLvl(); render();
    const o = { botao: !!document.getElementById('botb') };
    // rodízio: dias de terça (1) e sexta (4) com o monstro de cada aparição
    const rod = []; for (let d = 1; d <= 40; d++) if (Errante.ehDia(d)) rod.push(d + ':' + ERR[Errante.idx(d)].id); o.rodizio = rod.slice(0, 12).join(' ');
    o.diferentes = new Set(rod.slice(0, 10).map(x => x.split(':')[1])).size;
    // bot: avançar 3 dias (vai cair numa terça) e vencer o errante
    for (let i = 0; i < 3; i++) Bot.avancar(); o.dia = S.day; o.ehTercaOuSexta = Errante.ehDia();
    Bot.errante(); const e = Errante.hoje(); o.errante = e && e.n; Bot.hoje(); o.venceu = !!(Errante.est() && Errante.est().won); o.vencidos = Errante.vencidos();
    // dungeons com 1 clique
    S.dgAll = {}; enterDg('Jogos', 1, 0); enterDg('Apostas', 1, 0); Bot.dungeons(); o.dungeons = Object.keys(S.defeated || {}).join(', ');
    Bot.semana(); o.diaDepoisSemana = S.day; Bot.nivel(); o.nivel = myLvl();
    return o;
  });
  console.log(JSON.stringify(r, null, 1));
  if (telas) {
    fs.mkdirSync(telas, { recursive: true });
    await p.evaluate(() => { S.cartas = S.cartas || {}; Object.keys(CARTAS).forEach(k => S.cartas[k] = 1); S.cartaQ = []; S.cartaV = null; S.tut = { x: 1 }; Bot.errante(); if (S.lu) lvSeen(); S.lu = null; S.cel = null; S.rcv = null; render() }); await p.waitForTimeout(300);
    await p.evaluate(() => { if (S.lu) lvSeen(); S.lu = null; S.cel = null; S.rcv = null; S.cartaQ = []; S.cartaV = null; S.dgSplash = S.day; S.bi = null; setTab('dun'); dsub('c') }); await p.waitForTimeout(300); await p.screenshot({ path: path.join(telas, 'chefes.png') });
    await p.evaluate(() => { telaAbrir('itens') }); await p.waitForTimeout(300); await p.screenshot({ path: path.join(telas, 'recompensas.png') });
    await p.evaluate(() => { S.tela = null; setTab('ini'); Bot.aberto = 1; Bot.sync() }); await p.waitForTimeout(300); await p.screenshot({ path: path.join(telas, 'bot.png') });
  }
  const ok = r.botao && r.diferentes === 10 && r.ehTercaOuSexta !== undefined && r.venceu && r.dungeons.includes('Jogos') && r.dungeons.includes('Apostas') && !erros.length;
  if (erros.length) console.log('Erros:', erros.slice(0, 5));
  await b.close(); console.log(ok ? 'RESULTADO: OK' : 'RESULTADO: FALHOU'); process.exit(ok ? 0 : 1);
})();
