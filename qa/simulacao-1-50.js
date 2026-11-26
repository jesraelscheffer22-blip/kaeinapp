#!/usr/bin/env node
// Simulação 1 -> 50 em três perfis: Fácil constante, Médio constante, Difícil com falhas aleatórias.
// Faz missões, água, sono, mantém até 2 dungeons abertas (fases conforme o nível) e passa nas provas.
// Relatório: dia de cada nível marcante, rank, XP, prêmios, erros de página.
// Uso: node qa/simulacao-1-50.js dist/index.html
'use strict';
const { chromium } = require('playwright'); const path = require('path');
const alvo = path.resolve(process.argv[2] || 'dist/index.html');
const PERFIS = [['Fácil constante', 0, 1], ['Médio constante', 1, 1], ['Médio 80% dos dias', 1, .8], ['Difícil com falhas (70%)', 2, .7]];
(async () => {
  const b = await chromium.launch(); let falhou = false; const linhas = [];
  for (const [nome, lv, taxa] of PERFIS) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } }); const erros = [];
    p.on('pageerror', e => erros.push(e.message));
    await p.goto('file://' + alvo); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(300);
    const r = await p.evaluate(([lv, taxa]) => {
      let seed = 4242; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 };
      quick(); _ab = 1; S.lvl = lv; S.lvShown = 1; const marcos = {}, rk = {}; let hab = 0, quedas = 0, ult = 1; const H = Object.keys(DGH).filter(h => h !== 'O Espelho');
      for (let d = 1; d <= 1000; d++) {
        S.splashDay = S.day; S.cartaQ = []; S.cartaV = null;
        if (pvReady()) pvPass(); const g = Prova.pendente(); if (g) S[PROVAX[g].k] = 1;
        // dungeons: até 2 abertas, fase conforme o nível
        const L0 = myLvl();
        while (dgActiveN() < 2) { const h = H[hab++ % H.length], ph = L0 >= 30 && S.defeated2[h] && !(S.defeated3 || {})[h] ? 3 : L0 >= 7 && S.defeated[h] && !S.defeated2[h] ? 2 : 1; if (ph === 1 && S.defeated[h] && hab > 40) break; enterDg(h, ph, 0); if (hab > 200) break }
        if (rnd() < taxa) {
          testDoneAll(); slpSet(3);
          // um andar de dungeon por dia (regra do app), na primeira dungeon aberta
          const D = Object.values(S.dgAll || {}).find(x => !x.won);
          if (D && S.floorDay !== S.day) { S.dg = D; const i = D.fl.findIndex(f => !f); startGuide('dg' + i, i); let n = 0; while (S.g && n++ < 300) { const G = S.g, st = curStep(); if (G.ph === 'fb') { gFb('o'); continue } if (G.ph === 'rest') { gRestSkip(); continue } if (st.k === 'sets') { gSetDone(); continue } if (st.k === 'timer') { G.fin = true; finishStep(); continue } if (st.k === 'write') { G.note = 'texto de teste suficiente'; finishStep(); continue } finishStep() } S.cel = null }
        } else quedas++;
        nextDay(); S.cel = null; S.lu = null; S.rcv = null; S.lvShown = myLvl();
        const L = myLvl(); for (let x = ult + 1; x <= L; x++) if (!marcos[x]) marcos[x] = S.day - 1; ult = Math.max(ult, L);
        const R = rankOf(L); if (!rk[R]) rk[R] = S.day;
        if (L >= 50) break;
      }
      const L = myLvl();
      return { dias: S.day, nivel: L, rank: rankOf(L), xp: totalXp(), m: [10, 20, 30, 40, 50].map(x => marcos[x] || '-'), premios: Object.keys(REW).filter(k => +k <= L).length, chefes: Object.keys(S.defeated || {}).length + '/' + Object.keys(S.defeated2 || {}).length + '/' + Object.keys(S.defeated3 || {}).length, quedas, regrediu: false };
    }, [lv, taxa]);
    const meses = x => x === '-' ? '-' : (x / 30.4).toFixed(1);
    linhas.push(`| ${nome} | ${r.m.map(x => x === '-' ? '-' : x + ' (' + meses(x) + ' m)').join(' | ')} | ${r.nivel} ${r.rank} | ${r.premios} | ${r.chefes} | ${r.quedas} | ${erros.length} |`);
    if (erros.length || r.nivel < 50) falhou = true;
    if (erros.length) console.log(nome, 'erros:', erros.slice(0, 3));
    await p.close();
  }
  console.log('| Perfil | Nível 10 | Nível 20 | Nível 30 | Nível 40 | Nível 50 | Fim | Prêmios | Chefes F1/F2/F3 | Dias sem missão | Erros |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|');
  linhas.forEach(l => console.log(l));
  await b.close(); console.log(falhou ? 'RESULTADO: FALHOU' : 'RESULTADO: OK'); process.exit(falhou ? 1 : 0);
})();
