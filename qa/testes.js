#!/usr/bin/env node
// Testes do app Kaien (Playwright/Chromium 390x844).
// Uso: node qa/testes.js <alvo.html> [outro.html ...] [--telas=pasta]
// Com dois ou mais alvos, compara os resultados entre eles (teste de paridade).
// Aleatoriedade e relógio são fixados, para que dois builds iguais deem o mesmo estado.
'use strict';
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs'), crypto = require('crypto');

const alvos = process.argv.slice(2).filter(a => !a.startsWith('--')).map(a => path.resolve(a));
const telas = (process.argv.find(a => a.startsWith('--telas=')) || '').split('=')[1];
if (!alvos.length) { console.error('Uso: node qa/testes.js alvo.html [outro.html] [--telas=pasta]'); process.exit(1); }

const SEMENTE = `(()=>{let s=12345;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646}})();`;

// Funções que rodam dentro da página.
const AJUDA = () => {
  window.__fazMissao = (key, dg) => {
    startGuide(key, dg); let n = 0;
    while (S.g && n++ < 500) {
      const g = S.g, st = curStep();
      if (g.ph === 'fb') { gFb('o'); continue }
      if (g.ph === 'rest') { gRestSkip(); continue }
      if (st.k === 'sets') { gSetDone(); continue }
      if (st.k === 'timer') { g.fin = true; finishStep(); continue }
      if (st.k === 'write') { g.note = 'Resposta de teste com texto suficiente. '.repeat(2); finishStep(); continue }
      finishStep();
    }
    if (S.g) throw new Error('guia travado em ' + key);
    const r = S.cel && S.cel.st; S.cel = null; S.lu = null; S.rcv = null; return r;
  };
  window.__pulaAbertura = () => {
    _ab = 1; S.splashDay = S.day; S.slp = { day: S.day, c: 3, ask: 0 }; S.bgRev = 3; S.scnP = 0; S.dgSplash = S.day; S.provaD = 1;
    S.lvShown = myLvl();
  };
  // Estado sem campos que dependem de horário real de execução.
  window.__impressao = () => JSON.stringify(S, (k, v) => (k === 'top' || k === 'entering') ? undefined : v);
};

async function abrir(browser, alvo, erros) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  await p.clock.setFixedTime(new Date('2026-11-26T12:00:00'));
  await p.addInitScript(SEMENTE);
  await p.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  p.on('pageerror', e => erros.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) erros.push('console: ' + m.text()) });
  p.on('requestfailed', r => { if (!/fonts\.(googleapis|gstatic)/.test(r.url()) && !/__IMG__/.test(r.url())) erros.push('falhou carregar: ' + r.url()) });
  await p.goto('file://' + alvo);
  await p.evaluate(() => { localStorage.clear(); sessionStorage.clear() });
  await p.reload();
  await p.waitForTimeout(300);
  await p.evaluate(AJUDA);
  return { p, ctx };
}

async function testeAbertura(p) {
  return p.evaluate(() => {
    let n = 0; const vistos = [];
    while (steps[S.i].t !== 'day1' && n++ < 400) {
      const s = steps[S.i]; vistos.push(S.react ? 'react' : s.t + (s.id ? ':' + s.id : ''));
      if (S.react) { tap(); continue }
      switch (s.t) {
        case 'open0': obOpenGo(); break;
        case 'name': document.getElementById('nm').value = 'Teste'; doneName(); break;
        case 'body': doneBody(); break;
        case 'single': pick(0); break;
        case 'multi': togglePull(0); donePull(); break;
        case 'scales': ['en', 'mo', 'te', 'ir'].forEach(k => setSc(k, 3)); doneSc(); break;
        case 'wdays': [0, 2, 4].forEach(toggleWd); doneWd(); break;
        case 'rem': doneRem(1); break;
        case 'level': chooseLvl(1); break;
        default: adv();
      }
    }
    return { chegou: steps[S.i].t === 'day1', passos: vistos.length, nome: S.name, wd: S.wd, rem: !!S.rem, lvl: S.lvl, imp: __impressao() };
  });
}

async function testeSim35(p) {
  return p.evaluate(() => {
    let ruins = []; const marcas = [];
    for (const modo of ['fis', 'agi', 'mix']) for (let nd = 2; nd <= 6; nd++) for (const lv of [0, 2]) {
      quick(); S.tm = modo; S.wd = [0, 1, 2, 3, 4, 5].slice(0, nd); S.lvl = lv; __pulaAbertura();
      for (let d = 1; d <= 35; d++) {
        const ms = plan();
        if (ms[0].key !== 'low') ruins.push(`${modo}/${nd}/${lv} dia ${d}: mente não veio primeiro`);
        ms.forEach(m => { if (!m.steps || !m.steps.length) ruins.push(`${modo}/${nd}/${lv} dia ${d}: missão vazia ${m.key}`) });
        for (const m of ms) { try { __fazMissao(m.key) } catch (e) { ruins.push(`${modo}/${nd}/${lv} dia ${d}: ${e.message}`) } }
        S.cups = calcXp().wp.cups; nextDay(); S.splashDay = S.day; S.slp = { day: S.day, c: 3, ask: 0 }; S.lvShown = myLvl();
      }
      marcas.push([modo, nd, lv, totalXp(), myLvl(), JSON.stringify(S.px)]);
    }
    return { ruins, marcas, imp: __impressao() };
  });
}

async function testeDungeon(p) {
  return p.evaluate(() => {
    quick(); __pulaAbertura(); const r = [];
    S.xpPrev = cum(8); S.lvShown = myLvl();
    ['Jogos', 'Apostas', 'Procrastinação', 'Sono ruim'].forEach(h => enterDg(h, 1, 0));
    r.push(['abertas', dgActiveN(), S.dgMsg]);
    for (let d = 0; d < 6; d++) {
      Object.keys(S.dgAll).forEach(h => { const D = S.dgAll[h]; if (D.won) return; S.dg = D; const i = D.fl.findIndex(f => !f); S.floorDay = -1; __fazMissao('dg' + i, i) });
      nextDay(); S.lvShown = myLvl();
    }
    r.push(['vencidas', Object.keys(S.defeated || {}).length, totalXp()]);
    return { r, imp: __impressao() };
  });
}

async function fotografar(p, pasta, rotulo) {
  fs.mkdirSync(pasta, { recursive: true });
  await p.evaluate(() => { quick(); __pulaAbertura(); S.xpPrev = cum(12); S.lvShown = myLvl(); render() });
  for (const t of ['ini', 'mis', 'per', 'kai', 'dun', 'prf']) {
    await p.evaluate(t => { setTab(t); S.dgSplash = S.day; S.bi = null; render() }, t);
    await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(pasta, `${rotulo}-${t}.png`) });
  }
}

(async () => {
  const browser = await chromium.launch();
  const res = [];
  let falhou = false;
  for (const alvo of alvos) {
    const erros = [], r = { alvo: path.relative(process.cwd(), alvo) };
    let x = await abrir(browser, alvo, erros);
    r.abertura = await testeAbertura(x.p); await x.ctx.close();
    x = await abrir(browser, alvo, erros);
    r.sim = await testeSim35(x.p); await x.ctx.close();
    x = await abrir(browser, alvo, erros);
    r.dg = await testeDungeon(x.p);
    if (telas) await fotografar(x.p, path.resolve(telas), path.basename(path.dirname(alvo)));
    await x.ctx.close();
    r.erros = erros; res.push(r);
    const ab = r.abertura;
    console.log(`\n== ${r.alvo}`);
    console.log(`Abertura: ${ab.chegou ? 'OK' : 'FALHOU'} (${ab.passos} passos) nome=${ab.nome} dias=${JSON.stringify(ab.wd)} lembretes=${ab.rem}`);
    console.log(`Simulação 35 dias (30 combinações): ruins ${r.sim.ruins.length}${r.sim.ruins.length ? ' → ' + r.sim.ruins.slice(0, 5).join(' | ') : ''}`);
    console.log(`Dungeons: ${JSON.stringify(r.dg.r)}`);
    console.log(`Erros de página: ${erros.length}${erros.length ? ' → ' + erros.slice(0, 5).join(' | ') : ''}`);
    if (!ab.chegou || r.sim.ruins.length || erros.length) falhou = true;
  }
  if (res.length > 1) {
    const h = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);
    console.log('\n== Paridade (hash do estado S ao fim de cada teste)');
    for (const k of [['abertura', r => r.abertura.imp], ['simulação 35 dias', r => JSON.stringify(r.sim.marcas) + r.sim.imp], ['dungeons', r => r.dg.imp]]) {
      const hs = res.map(k[1]).map(h), ok = hs.every(x => x === hs[0]);
      if (!ok) falhou = true;
      console.log(`${k[0]}: ${ok ? 'IGUAL' : 'DIFERENTE'} (${hs.join(' / ')})`);
    }
  }
  await browser.close();
  console.log(falhou ? '\nRESULTADO: FALHOU' : '\nRESULTADO: OK');
  process.exit(falhou ? 1 : 0);
})();
