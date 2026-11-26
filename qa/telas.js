#!/usr/bin/env node
// Capturas das telas em 3 tamanhos e checagem de rolagem horizontal e erros.
// Uso: node qa/telas.js dist/index.html pasta [nivel]
'use strict';
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
const alvo = path.resolve(process.argv[2] || 'dist/index.html'), out = path.resolve(process.argv[3] || 'qa/screens/telas'), nivel = +(process.argv[4] || 45);
const TAM = [[360, 640], [390, 844], [412, 915]];
(async () => {
  const b = await chromium.launch(); fs.mkdirSync(out, { recursive: true }); let falhou = false;
  for (const [w, h] of TAM) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); const erros = []; p.on('pageerror', e => erros.push(e.message));
    await p.goto('file://' + alvo); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(300);
    const ids = await p.evaluate(n => {
      quick(); _ab = 1; S.splashDay = S.day; S.slp = { day: S.day, c: 3, ask: 0 }; S.bgRev = 99; S.scnP = 0; S.dgSplash = S.day;
      ['provaD', 'provaC', 'provaB', 'provaA', 'provaS'].forEach(k => S[k] = 1);
      for (let d = 0; d < 20; d++) { testDoneAll(); nextDay(); }
      S.xpPrev = cum(n) + 5; for (let L = 2; L <= n; L++) grantLv(L); S.lvShown = myLvl(); S.cartaQ = []; S.cartas = {}; Object.keys(CARTAS).forEach(k => S.cartas[k] = 1); S.cel = null; S.lu = null; S.rcv = null; S.tp = { mis: 1, kai: 1 }; S.tut = { x: 1 };
      Mand.criar('Dormir antes das 23h'); render(); return Object.keys(TELAS);
    }, nivel);
    const shots = [['ini', null], ['mis', null], ['per', null], ['kai', null], ['dun', null], ['prf', null]].concat(ids.map(i => ['ini', i]));
    for (const [tab, tela] of shots) {
      await p.evaluate(([t, x]) => { setTab(t); S.dgSplash = S.day; S.bi = null; if (x) { S.tela = x; S.tut = S.tut || {}; } S.top = true; render() }, [tab, tela]);
      await p.waitForTimeout(250);
      const ov = await p.evaluate(() => { const sh = document.querySelector('.sheet'); const r = []; if (document.documentElement.scrollWidth > innerWidth + 1) r.push('página'); if (sh && getComputedStyle(sh).overflowX !== 'hidden' && sh.scrollWidth > sh.clientWidth + 1) r.push('conteúdo'); return r });
      if (ov.length) { falhou = true; console.log(`${w}x${h} ${tela || tab}: rolagem horizontal (${ov.join(', ')})`) }
      if (w === 390) await p.screenshot({ path: path.join(out, (tela || tab) + '.png') });
    }
    if (erros.length) { falhou = true; console.log(`${w}x${h} erros:`, erros.slice(0, 5)) }
    await p.close();
  }
  await b.close(); console.log(falhou ? 'RESULTADO: FALHOU' : 'RESULTADO: OK'); process.exit(falhou ? 1 : 0);
})();
