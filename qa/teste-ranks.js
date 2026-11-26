#!/usr/bin/env node
// Provas e cinemáticas de cada rank (D já existia; aqui C, B, A, S):
// chega ao limite, faz a prova, assiste à cinemática, confere multiplicador, roupa e título.
// Repete com "reduzir efeitos" ligado. Uso: node qa/teste-ranks.js dist/index.html [--telas=pasta]
'use strict';
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
const alvo = path.resolve(process.argv[2] || 'dist/index.html');
const telas = (process.argv.find(a => a.startsWith('--telas=')) || '').split('=')[1];
(async () => {
  const b = await chromium.launch(); let falhou = false;
  for (const rfx of [0, 1]) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); const p = await ctx.newPage();
    const erros = []; p.on('pageerror', e => erros.push(e.message));
    await p.goto('file://' + alvo); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(300);
    await p.evaluate(rfx => { quick(); _ab = 1; S.splashDay = S.day; S.slp = { day: S.day, c: 3, ask: 0 }; S.bgRev = 3; S.scnP = 0; S.dgSplash = S.day; S.provaD = 1; S.cfg.rfx = rfx; S.lvShown = myLvl(); render() }, rfx);
    for (const g of [20, 30, 40, 50]) {
      const r = await p.evaluate(g => {
        S.xpPrev = cum(g) + 10 - calcXp().xp - dgXp(); render(); if (S.lu) lvSeen(); S.rcv = null; render();
        const antes = myLvl(), pronta = Prova.pronta();
        Prova.abrir(); Prova.ir(1); Prova.corpo().it.forEach((x, i) => Prova.ck(i)); Prova.ir(2);
        Prova.tx('m1', 'Aprendi a voltar mesmo cansado.'); Prova.tx('m2', 'Cuido do sono e da água todo dia.'); Prova.ir(3);
        const P = PROVAX[g]; if (P.tema.tipo === 'check') P.tema.it.forEach((x, i) => Prova.ck('t' + i)); if (P.tema.tipo === 'write') Prova.tx('t', 'Comece pequeno, volte sempre e seja gentil com você nos dias ruins.'); if (P.tema.tipo === 'timer') { S.pvx.tf = 1 }
        Prova.ir(4); Prova.passar();
        return { antes, pronta, depois: myLvl(), rcv: !!S.rcv, rank: rankOf(myLvl()) };
      }, g);
      const ov = await p.evaluate(() => !!document.querySelector('#ovr .cn'));
      if (telas) { fs.mkdirSync(telas, { recursive: true }); for (const t of [1500, 6000, 12000]) { await p.waitForTimeout(t === 1500 ? 1500 : 4500); await p.screenshot({ path: path.join(telas, `rank${r.rank}-${rfx ? 'reduzido' : 'completo'}-${t}.png`) }) } }
      await p.evaluate(() => { Cine.pular() }); await p.waitForTimeout(500);
      if (telas && !rfx) await p.screenshot({ path: path.join(telas, `rank${r.rank}-final.png`) });
      const fim = await p.evaluate(() => { rankClose(); if (S.lu) lvSeen(); const t = S.eq.title, o = outCls(); nextDay(); S.lvShown = myLvl(); S.cel = null; return { rkm: S.rkm, titulo: t, roupa: o, ov: document.getElementById('ovr').style.display } });
      const ok = r.pronta && r.antes === g - 1 && r.depois === g && r.rcv && ov && fim.rkm === RMv(g);
      function RMv(g) { return [1, 1.7, 2.4, 2.9, 3.3, 3.6][Math.min(5, Math.floor(g / 10))] }
      if (!ok) falhou = true;
      console.log(`${rfx ? '[reduzir efeitos] ' : ''}Nível ${g}: travado em ${r.antes}, prova pronta=${r.pronta} → nível ${r.depois} (rank ${r.rank}) · cinemática=${ov} · multiplicador amanhã ×${fim.rkm} · título "${fim.titulo}" · roupa ${fim.roupa} → ${ok ? 'OK' : 'FALHOU'}`);
    }
    if (erros.length) { falhou = true; console.log('Erros:', erros.slice(0, 5)) }
    await ctx.close();
  }
  await b.close(); console.log(falhou ? 'RESULTADO: FALHOU' : 'RESULTADO: OK'); process.exit(falhou ? 1 : 0);
})();
