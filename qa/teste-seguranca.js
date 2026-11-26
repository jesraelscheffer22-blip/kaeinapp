#!/usr/bin/env node
// Segurança: CSP sem bloquear o app, nenhuma requisição externa, backup com senha (AES-GCM),
// importação maliciosa rejeitada/limpa, nome sanitizado e escape de HTML.
'use strict';
const { chromium } = require('playwright'); const path = require('path');
const alvo = path.resolve(process.argv[2] || 'dist/index.html');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const erros = [], csp = [], rede = [];
  p.on('pageerror', e => erros.push(e.message));
  p.on('console', m => { if (/Content Security Policy/i.test(m.text())) csp.push(m.text().slice(0, 140)) });
  p.on('request', r => { const u = r.url(); if (!u.startsWith('file:') && !u.startsWith('data:') && !u.startsWith('blob:')) rede.push(u) });
  await p.goto('file://' + alvo); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(400);
  const r = await p.evaluate(async () => {
    const o = {};
    quick(); _ab = 1; S.splashDay = S.day; S.lvShown = myLvl(); for (let i = 0; i < 3; i++) { testDoneAll(); nextDay() } S.name = 'Lia'; render();
    // imagens carregam com a CSP
    setTab('per'); await new Promise(r => setTimeout(r, 300)); o.imagens = await new Promise(res => { const el = document.createElement('div'); el.className = 'av pH5'; document.body.appendChild(el); const u = getComputedStyle(el).backgroundImage.match(/url\("?(.*?)"?\)/); if (!u) return res('sem imagem'); const im = new Image(); im.onload = () => res('carregou'); im.onerror = () => res('BLOQUEADA'); im.src = u[1] });
    // backup protegido: ida e volta
    const xp = totalXp(), txt = Backup.dados(), enc = await Seg.cifrar(txt, 'senha123'), oe = JSON.parse(enc);
    o.cifrado = oe.enc === 1 && !enc.includes('Lia') ? 'sem texto legível' : 'VAZOU';
    try { await Seg.decifrar(oe, 'errada'); o.senhaErrada = 'ABRIU (ruim)' } catch (e) { o.senhaErrada = 'recusada' }
    o.senhaCerta = JSON.parse(await Seg.decifrar(oe, 'senha123')).S.xpPrev === S.xpPrev ? 'ok' : 'falhou';
    // importação maliciosa
    await Backup.ler('{"app":"kaien","S":{"name":"x","hist":[],"xpPrev":-5,"day":1}}'); o.xpNegativo = S.bkImp ? 'ACEITO' : 'rejeitado';
    await Backup.ler('x'.repeat(6 * 1024 * 1024)); o.gigante = S.bkImp ? 'ACEITO' : 'rejeitado';
    await Backup.ler('{"app":"kaien","S":{"name":"<img src=x onerror=alert(1)>","hist":[],"xpPrev":1,"day":2,"__proto__":{"hack":1},"eq":{"constructor":{"x":1}}}}');
    o.proto = S.bkImp && !Object.getOwnPropertyNames(S.bkImp.S).includes('__proto__') && ({}).hack === undefined && !S.bkImp.S.eq.hasOwnProperty('constructor') ? 'limpo' : 'SUJO';
    setTab('prf'); telaAbrir('backup'); o.xssNome = document.querySelector('#ui').innerHTML.includes('<img src=x') ? 'VULNERÁVEL' : 'escapado';
    // nome com caracteres de controle
    o.nome = JSON.stringify(Seg.texto('  Lia\u0000‮  ', 20));
    o.esc = esc(`a'b"<c>`);
    return o;
  });
  console.log(JSON.stringify(r, null, 1)); console.log('CSP bloqueou:', csp.length, csp.slice(0, 3)); console.log('Rede externa:', rede.length, rede.slice(0, 3));
  const ok = !erros.length && !csp.length && !rede.length && r.cifrado === 'sem texto legível' && r.senhaErrada === 'recusada' && r.senhaCerta === 'ok' && r.xpNegativo === 'rejeitado' && r.gigante === 'rejeitado' && r.proto === 'limpo' && r.imagens === 'carregou' && r.xssNome === 'escapado' && r.nome === '"Lia"';
  if (erros.length) console.log('Erros:', erros);
  await b.close(); console.log(ok ? 'RESULTADO: OK' : 'RESULTADO: FALHOU'); process.exit(ok ? 0 : 1);
})();
