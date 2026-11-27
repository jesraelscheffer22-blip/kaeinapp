// Abertura com toques de verdade (como um usuário novo): falha se alguma tela travar sem jeito de continuar.
// Uso: node qa/teste-abertura-toques.js dist/index.html pasta-de-print
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:360,height:700},hasTouch:true});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('file://'+process.argv[2]);await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(700);
let last='',stuck=0,log=[];
for(let k=0;k<400;k++){
 const st=await p.evaluate(()=>({i:S.i,t:steps[S.i]&&steps[S.i].t,id:steps[S.i]&&steps[S.i].id,r:!!S.react}));
 if(st.t==='day1'){log.push('chegou ao dia 1 em '+k+' toques');break}
 const key=JSON.stringify(st);if(key===last){stuck++;if(stuck>(st.t==='analysis'||st.t==='inter'?60:8)){log.push('TRAVOU em '+key);await p.screenshot({path:process.argv[3]+'/travou.png'});break}}else stuck=0;last=key;
 // ação de usuário: preencher campos, escolher opção, apertar botão principal, ou tocar na tela
 const did=await p.evaluate(()=>{const v=e=>e&&e.offsetParent!==null&&!e.disabled;
  const nm=document.getElementById('nm');if(nm&&!nm.value){nm.value='Lia';nm.dispatchEvent(new Event('input'));}
  const sc=[...document.querySelectorAll('.sn button')].filter(v);if(sc.length){const groups=[...document.querySelectorAll('.sn')];for(const g of groups){if(!g.querySelector('.on')){g.querySelectorAll('button')[2].click();return 'escala'}}}
  const wd=[...document.querySelectorAll('.wd2s')].filter(v);if(wd.length&&document.querySelectorAll('.wd2s.on').length<3&&steps[S.i].t==='wdays'){wd.find(x=>!x.classList.contains('on')).click();return 'dia'}
  const oc=[...document.querySelectorAll('.oc')].filter(v);if(oc.length&&steps[S.i].t==='multi'&&!document.querySelector('.oc.on')){oc[0].click();return 'multi'}
  if(oc.length&&steps[S.i].t==='single'&&!S.react){oc[0].click();return 'opção'}
  const cta=[...document.querySelectorAll('.cta,.obacc')].filter(v)[0];if(cta&&!S.react){cta.click();return 'botão '+cta.textContent.trim().slice(0,30)}
  const any=[...document.querySelectorAll('#ui button')].filter(x=>v(x)&&!x.classList.contains('lk')&&!x.classList.contains('obb'))[0];if(any&&!S.react){any.click();return 'btn '+any.textContent.trim().slice(0,20)}
  return null});
 if(!did){await p.mouse.click(180,400)}
 await p.waitForTimeout(did&&did.startsWith('botão Quero')?300:120);
}
console.log(log.join('\n'),'erros:',er);await b.close()})();
