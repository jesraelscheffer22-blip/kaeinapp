#!/usr/bin/env node
// Teste de save antigo: gera saves no app ORIGINAL (qa/referencia) em vários níveis,
// carrega no build novo e confere: XP total idêntico, nenhum campo perdido, backup criado, zero erros.
// Uso: node qa/teste-saves.js dist/index.html
'use strict';
const { chromium } = require('playwright'); const path = require('path');
const ref = path.resolve(__dirname, 'referencia/index-sem-imagens.html'), novo = path.resolve(process.argv[2] || 'dist/index.html');
const ALVOS = [1, 5, 9, 10, 16];
(async () => {
  const b = await chromium.launch(); let falhou = false;
  for (const nivel of ALVOS) {
    const erros = [];
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); const p = await ctx.newPage();
    p.on('pageerror', e => erros.push(e.message));
    await p.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
    // 1) joga no app original até o nível pedido (XP de verdade, missões feitas, dungeon aberta)
    await p.goto('file://' + ref); await p.evaluate(() => localStorage.clear()); await p.reload();
    const antes = await p.evaluate(nivel => {
      quick(); _ab = 1; S.provaD = nivel >= 10 ? 1 : 0;
      let d = 0; while (lvlRaw(totalXp()) < nivel && d++ < 400) { testDoneAll(); slpSet(3); nextDay(); S.cel = null; S.lu = null; S.rcv = null }
      if (nivel >= 7) enterDg('Jogos', 1, 0);
      S.lvShown = myLvl(); render();
      return { raw: localStorage.getItem('kaien.v1'), xp: totalXp(), lvl: myLvl(), dia: S.day, campos: Object.keys(S).sort() };
    }, nivel);
    // 2) abre o build novo com esse save
    await p.goto('file://' + novo); await p.waitForTimeout(400);
    await p.evaluate(() => { if (typeof endOpen === 'function' && !_ab) endOpen() }); await p.waitForTimeout(100);
    const depois = await p.evaluate(() => ({ titulo: S.eq.title, aura: S.eq.aura, xp: totalXp(), lvl: myLvl(), dia: S.day, ver: S.ver, rk: 'rk' in S, bak: !!localStorage.getItem('kaien.v1.bak'),
      campos: Object.keys(S).sort(), telaNivel: !!S.lu, eq: S.eq, provaPronta: pvReady() }));
    const perdidos = antes.campos.filter(c => !depois.campos.includes(c) && c !== 'rk');
    const ok = depois.xp === antes.xp && !perdidos.length && depois.bak && depois.ver === 5 && !erros.length && depois.dia === antes.dia;
    if (!ok) falhou = true;
    console.log(`Save nível ${antes.lvl} (dia ${antes.dia}, ${antes.xp} XP) → nível ${depois.lvl}${depois.provaPronta ? ' (Prova do rank D liberada)' : ''} · XP ${depois.xp === antes.xp ? 'idêntico' : 'DIFERENTE ' + depois.xp} · campos perdidos: ${perdidos.length ? perdidos.join(',') : 'nenhum'} · backup ${depois.bak ? 'ok' : 'FALTA'} · tela de subir de nível: ${depois.telaNivel ? "sim" : "não"} · título: ${depois.titulo || "-"} · erros: ${erros.length} → ${ok ? 'OK' : 'FALHOU'}`);
    await ctx.close();
  }
  await b.close(); console.log(falhou ? 'RESULTADO: FALHOU' : 'RESULTADO: OK'); process.exit(falhou ? 1 : 0);
})();
