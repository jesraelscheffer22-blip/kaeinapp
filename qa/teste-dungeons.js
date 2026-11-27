#!/usr/bin/env node
// Dungeons: fase 1 -> 2 -> 3 (Forma Verdadeira), refazer pela metade do XP, Espelho no nível 20,
// Torre dos Mil Degraus, Invasão sazonal e Bestiário. Uso: node qa/teste-dungeons.js dist/index.html
'use strict';
const { chromium } = require('playwright'); const path = require('path');
const alvo = path.resolve(process.argv[2] || 'dist/index.html');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const erros = []; p.on('pageerror', e => erros.push(e.message));
  await p.goto('file://' + alvo); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(300);
  await p.addScriptTag({ content: `window.__faz=(key,dg)=>{startGuide(key,dg);let n=0;while(S.g&&n++<300){const g=S.g,st=curStep();if(g.ph==='fb'){gFb('o');continue}if(g.ph==='rest'){gRestSkip();continue}if(st.k==='sets'){gSetDone();continue}if(st.k==='timer'){g.fin=true;finishStep();continue}if(st.k==='write'){g.note='texto de teste suficiente para passar';finishStep();continue}finishStep()}S.cel=null;S.lu=null;S.rcv=null};
  window.__dia=()=>{testDoneAll();nextDay();S.lvShown=myLvl();S.cel=null;S.lu=null;S.rcv=null;S.cartaQ=[];S.splashDay=S.day;S.slp={day:S.day,c:3,ask:0}};
  window.__vence=(h)=>{const D=S.dgAll[h];S.dg=D;const r=[];for(let i=0;i<D.fl.length;i++){S.floorDay=-1;const fl=dgFloors()[i];r.push(fl.title+' | '+fl.steps[0].name.slice(0,40));__faz('dg'+i,i)}return r};` });
  const R = await p.evaluate(() => {
    const o = {};
    quick(); _ab = 1; ['provaD', 'provaC', 'provaB', 'provaA'].forEach(k => S[k] = 1); S.xpPrev = cum(35) + 5; S.lvShown = myLvl(); S.cartaQ = []; render();
    const h = 'Jogos';
    enterDg(h, 1, 0); o.f1 = __vence(h); o.def1 = !!S.defeated[h];
    const xp0 = totalXp(); enterDg(h, 2, 0); o.nome2 = dgNome(h); o.mob2 = mobOf(h, 0)[0]; o.f2 = __vence(h); o.def2 = !!S.defeated2[h]; o.ganho2 = totalXp() - xp0;
    const xp1 = totalXp(); enterDg(h, 3, 0); o.andares3 = S.dgAll[h].fl.length; o.nome3 = dgNome(h); o.f3 = __vence(h); o.def3 = !!(S.defeated3 && S.defeated3[h]); o.ganho3 = totalXp() - xp1;
    o.titulo3 = titlesOf(myLvl()).filter(t => /^Venceu/.test(t));
    // refazer fase 1: metade do XP por andar
    enterDg(h, 1, 1); S.dg = S.dgAll[h]; S.floorDay = -1; __faz('dg0', 0); o.refazerXp = S.dgAll[h].fl[0].xp; o.normalXp = Math.round(30 * LV[S.lvl].m * 1);
    dgLeave();
    // Espelho no nível 20
    Desafios.espelho2(2); const E = S.dgAll['O Espelho']; o.espelho = E ? dgNome('O Espelho') + ' · ' + E.fl.length + ' andares · ' + mobOf('O Espelho', 0)[0] : 'não abriu';
    if (E) { __vence('O Espelho'); o.espelhoVenceu = !!S.defeated2['O Espelho'] }
    // Bestiário
    o.bestiario = Bestiario.qtd() + ' de ' + Bestiario.lista().length;
    // Torre
    Torre.escolher('Jogos'); for (let d = 0; d < 12; d++) { Torre.subir(); Torre.subir(); __dia(); } o.torre = S.torre.n + ' andares, msg: ' + (S.torre.msg || '-');
    // Invasão do verão (21 a 27/12): 5 dias ativos dentro da janela
    S._hojeTeste = '2026-12-20T12:00:00'; S.lastDate = '2026-12-20'; let n0 = Invasao.atual(); o.invAntes = n0 ? n0.id : 'fora da janela';
    for (let d = 0; d < 6; d++) { __dia(); const t = new Date(2026, 11, 21 + d, 12); S._hojeTeste = t.toISOString(); S.lastDate = _iso.call ? (t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0')) : S.lastDate; Invasao.checar() }
    const w = Invasao.atual(); o.invasao = w ? w.id + ' venceu=' + !!(S.inv[w.id] && S.inv[w.id].won) + ' dias=' + Invasao.dias(w) : 'sem janela';
    render(); return o;
  });
  console.log(JSON.stringify(R, null, 1));
  const ok = R.def1 && R.def2 && R.def3 && R.andares3 === 1 && R.titulo3.length === 1 && Math.abs(R.refazerXp * 2 - R.normalXp) <= 1 && R.espelhoVenceu && /venceu=true/.test(R.invasao) && R.torre.startsWith('12') && !erros.length;
  if (erros.length) console.log('Erros:', erros.slice(0, 5));
  await b.close(); console.log(ok ? 'RESULTADO: OK' : 'RESULTADO: FALHOU'); process.exit(ok ? 0 : 1);
})();
