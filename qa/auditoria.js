#!/usr/bin/env node
// Auditoria completa: visita todas as abas, subabas e telas em vários níveis, aperta cada botão
// e procura erros de script, textos quebrados (undefined/NaN/[object]), imagens que não carregam
// e rolagem horizontal. Uso: node qa/auditoria.js dist/index.html [niveis separados por vírgula]
'use strict';
const { chromium } = require('playwright'); const path = require('path');
const alvo = path.resolve(process.argv[2] || 'dist/index.html');
const NIVEIS = (process.argv[3] || '1,5,10,15,20,25,30,35,40,45,50').split(',').map(Number);
const MAXB = 60;
(async () => {
  const b = await chromium.launch(); const achados = new Map(); const add = (k, v) => { if (!achados.has(k)) achados.set(k, v) };
  for (const nivel of NIVEIS) {
    const p = await b.newPage({ viewport: { width: 360, height: 700 } }); let ctx = '';
    p.on('pageerror', e => add('JS ' + e.message, `nível ${nivel} · ${ctx}`));
    p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') add('console ' + m.text().slice(0, 160), `nível ${nivel} · ${ctx}`) });
    p.on('dialog', d => d.dismiss());
    await p.goto('file://' + alvo); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(300);
    const ok = await p.evaluate(n => { try {
      quick(); _ab = 1; S.splashDay = S.day; S.dgSplash = S.day; S.bgRev = 99; S.scnP = 0;
      ['provaD', 'provaC', 'provaB', 'provaA', 'provaS'].forEach((k, i) => { if (n >= [10, 20, 30, 40, 50][i]) S[k] = 1 });
      for (let d = 0; d < Math.min(30, 2 + n); d++) { testDoneAll(); nextDay() }
      S.xpPrev = Math.max(S.xpPrev, cum(n) + 5); for (let L = 2; L <= n; L++) grantLv(L); S.lvShown = myLvl();
      S.cartaQ = []; S.cartas = {}; Object.keys(CARTAS).forEach(k => S.cartas[k] = 1); S.cel = null; S.lu = null; S.rcv = null; S.tp = { mis: 1, kai: 1 }; S.tut = { x: 1 };
      try { Mand.criar('Dormir antes das 23h') } catch (e) {} render(); window.__snap = JSON.stringify(S); return myLvl() } catch (e) { return 'ERRO ' + e.stack }
    }, nivel);
    if (typeof ok === 'string') { add('setup ' + ok.slice(0, 200), 'nível ' + nivel); await p.close(); continue }
    // lista de telas a visitar: abas, subabas e TELAS
    const lugares = await p.evaluate(() => {
      const L = [], tabs = ['ini', 'mis', 'per', 'kai', 'dun', 'prf'];
      for (const t of tabs) { S = JSON.parse(window.__snap); setTab(t); S.top = true; render(); L.push({ t });
        [...document.querySelectorAll('[onclick]')].map(e => e.getAttribute('onclick')).filter(o => /^(ksub|persSub|dsub|persOpen)\(/.test(o)).forEach(o => L.push({ t, o })) }
      Object.keys(TELAS).forEach(x => L.push({ t: 'ini', tela: x }));
      const seen = new Set(); return L.filter(x => { const k = JSON.stringify(x); if (seen.has(k)) return false; seen.add(k); return true }) });
    const abrir = async l => p.evaluate(l => { S = JSON.parse(window.__snap); S.g = null; setTab(l.t); if (l.tela) S.tela = l.tela; S.top = true; render(); if (l.o) { try { (new Function(l.o))() } catch (e) { throw e } } return document.querySelectorAll('#app [onclick], #ui [onclick]').length }, l);
    for (const l of lugares) {
      ctx = l.tela ? 'tela ' + l.tela : 'aba ' + l.t + (l.o ? ' ' + l.o : '');
      let n; try { n = await abrir(l) } catch (e) { add('abrir ' + e.message.split('\n')[0], `nível ${nivel} · ${ctx}`); continue }
      await p.waitForTimeout(60);
      const chk = await p.evaluate(() => { const r = [], app = document.getElementById('app') || document.body; const tx = app.innerText;
        const m = tx.match(/.{0,30}(undefined|NaN|\[object Object\]|null XP|Infinity).{0,30}/); if (m) r.push('texto: "' + m[0].replace(/\s+/g, ' ') + '"');
        document.querySelectorAll('img').forEach(i => { if (i.complete && i.naturalWidth === 0 && i.getAttribute('src')) r.push('imagem quebrada: ' + i.getAttribute('src').slice(0, 60)) });
        if (document.documentElement.scrollWidth > innerWidth + 1) r.push('rolagem horizontal da página');
        const sh = document.querySelector('.sheet'); if (sh && getComputedStyle(sh).overflowX !== 'hidden' && sh.scrollWidth > sh.clientWidth + 1) r.push('rolagem horizontal no conteúdo');
        return r });
      chk.forEach(c => add(c, `nível ${nivel} · ${ctx}`));
      // aperta cada botão a partir do mesmo estado
      for (let i = 0; i < Math.min(n, MAXB); i++) {
        try {
          await abrir(l);
          const lab = await p.evaluate(i => { const e = [...document.querySelectorAll('#app [onclick], #ui [onclick]')][i]; if (!e) return null; const o = e.getAttribute('onclick') || '';
            if (e.disabled) return null; if (/testReset|Backup\.|exportar|importar|download|reset\(|location|Priv\.apagar|apagar/i.test(o)) return null; const t = (e.textContent || o).trim().slice(0, 40); e.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); return t }, i);
          if (lab == null) continue;
          ctx = (l.tela ? 'tela ' + l.tela : 'aba ' + l.t + (l.o ? ' ' + l.o : '')) + ' → botão "' + lab + '"';
          await p.waitForTimeout(20);
          const t2 = await p.evaluate(() => { const m = (document.body.innerText || '').match(/.{0,30}(undefined|NaN|\[object Object\]|Infinity).{0,30}/); return m ? m[0].replace(/\s+/g, ' ') : '' });
          if (t2) add('texto depois do clique: "' + t2 + '"', `nível ${nivel} · ${ctx}`);
        } catch (e) { add('clique ' + e.message.split('\n')[0].slice(0, 140), `nível ${nivel} · ${ctx}`) }
      }
    }
    console.log(`nível ${nivel}: ${lugares.length} telas visitadas`);
    await p.close();
  }
  await b.close();
  console.log(`\n${achados.size} achado(s):`); for (const [k, v] of achados) console.log('- ' + k + '\n    em: ' + v);
  process.exit(achados.size ? 1 : 0);
})();
