#!/usr/bin/env node
// Regras de dor e saúde: dor 2 bloqueia Difícil; dor 3 bloqueia tudo acima de Fácil e troca treinos por
// mobilidade; Kata segue as mesmas regras (dor 3 só a Kata da Água); prova de corpo vira mobilidade.
'use strict';
const { chromium } = require('playwright'); const path = require('path');
const alvo = path.resolve(process.argv[2] || 'dist/index.html');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 } }); const erros = []; p.on('pageerror', e => erros.push(e.message));
  await p.goto('file://' + alvo); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(300);
  const r = await p.evaluate(() => {
    const o = {}; quick(); _ab = 1; S.provaD = 1; S.xpPrev = cum(22); S.lvShown = myLvl(); S.splashDay = S.day; S.cartaQ = []; render();
    const botoes = () => { setTab('prf'); return [...document.querySelectorAll('.lvs .mb')].filter(x => ['Fácil', 'Médio', 'Difícil'].includes(x.textContent)).slice(0, 3).map(x => x.textContent + (x.disabled ? ':bloq' : ':ok')).join(' ') };
    S.a.pain = 0; o.dor0 = botoes();
    S.a.pain = 2; o.dor2 = botoes(); S.lvl = 1; o.kataNivel2 = LV[Kata.nivel()].n; o.corpo2 = pvCorpo().light ? 'mobilidade' : 'exercícios';
    S.a.pain = 3; o.dor3 = botoes(); S.lvl = 0; o.kataDor3 = KATAS.filter(k => Kata.permitido(k)).map(k => k.n).join(', ');
    S.wd = [0, 1, 2, 3, 4, 5]; const t = plan().find(m => m.key === 'obj'); o.treinoDor3 = t.title; o.corpo3 = pvCorpo().light ? 'mobilidade' : 'exercícios';
    S.kata = { day: S.day, id: 'cav', leve: 0 }; o.kataForcada = plan().find(m => m.key === 'obj').title;
    // parar por dor: mensagem e sem XP
    S.kata = null; S.ms = {}; startGuide('obj'); gPain(); o.msgDor = /Dor é um aviso do corpo/.test(document.body.innerText) ? 'mensagem ok' : 'sem mensagem'; o.xpDor = S.ms.obj.st;
    return o;
  });
  console.log(JSON.stringify(r, null, 1));
  const ok = r.dor0 === 'Fácil:ok Médio:ok Difícil:ok' && r.dor2 === 'Fácil:ok Médio:ok Difícil:bloq' && r.dor3 === 'Fácil:ok Médio:bloq Difícil:bloq' && r.kataDor3 === 'Kata da Água' && r.corpo2 === 'mobilidade' && !/Kata do Cavaleiro/.test(r.kataForcada) && r.msgDor === 'mensagem ok' && r.xpDor === 'dor' && !erros.length;
  if (erros.length) console.log('Erros:', erros);
  await b.close(); console.log(ok ? 'RESULTADO: OK' : 'RESULTADO: FALHOU'); process.exit(ok ? 0 : 1);
})();
