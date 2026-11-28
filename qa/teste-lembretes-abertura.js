// Simula o plugin de notificações do celular (permissão que nunca responde) e confere que "Quero lembretes" avança.
// Uso: node qa/teste-lembretes-abertura.js dist/index.html
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:360,height:700}});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(()=>{window.__sched=[];window.Capacitor={Plugins:{LocalNotifications:{requestPermissions:()=>new Promise(()=>{}),getPending:()=>Promise.resolve({notifications:[]}),cancel:()=>Promise.resolve(),schedule:o=>{window.__sched.push(o.notifications.length);return Promise.resolve()}}}}});
await p.goto('file://'+process.argv[2]);await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(500);
const r=await p.evaluate(()=>{reset();S.name='Lia';S.a={mov:2,flex:3,breath:2,block:0,pain:0,sleep:2,fh:2,fd:2,rd:2,rb:2,trig:0,ctrl:0,want:0,last:2,why:1,goal:0};S.sc={en:3,mo:3,te:2,ir:2};S.wd=[0,2,4];S.i=steps.findIndex(s=>s.t==='rem');render();
 remDay(1);remTime(0,'09:00');const btn=[...document.querySelectorAll('button')].find(x=>/Quero lembretes/.test(x.textContent));btn.click();
 const a=!!document.querySelector('.remok'),t1=steps[S.i].t;const c=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='Continuar');c.click();return {a,t1,t2:steps[S.i].t}});
await p.waitForTimeout(300);const r2=await p.evaluate(async()=>{quick();_ab=1;S.rem={on:1,days:[0,1,2,3,4,5,6],times:['23:59']};remSync(1);await new Promise(r=>setTimeout(r,200));return window.__sched});console.log(JSON.stringify(r),r2,er);await b.close()})();
