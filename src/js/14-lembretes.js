
/* ===== lembretes ===== */
const REMLB={mente:'Manhã · mente',treino:'Tarde · treino',noite:'Noite · fechar o dia'};
const REMTX={mente:['Bom dia, {n}. Cinco minutos de mente antes do dia ficar barulhento.','Sua missão de mente está pronta, {n}. É pequena, e conta.'],treino:['Hora do treino, {n}. É só começar, o resto vem junto.','O seu corpo agradece depois, {n}. Vamos?'],noite:['Antes de dormir, {n}: feche o dia com uma missão pequena.','Como foi o seu dia, {n}? Dois minutos bastam para fechá-lo.']};
const remRole=t=>{const h=+String(t).slice(0,2);return h<12?'mente':h<18?'treino':'noite'};
function remPlug(){try{return window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.LocalNotifications||null}catch(e){return null}}
function remPerm(){const P=remPlug();if(!P)return;try{P.requestPermissions().catch(()=>{})}catch(e){}}
function remInit(){if(!S.rem)S.rem={on:1,days:(S.wd||[]).slice(),times:['08:00']};return S.rem}
function remDay(i){const r=remInit(),k=r.days.indexOf(i);if(k>=0)r.days.splice(k,1);else r.days.push(i);r.days.sort((a,b)=>a-b);remSync(1);render()}
function remTime(j,v){const r=remInit();if(/^\d\d:\d\d$/.test(v)){r.times[j]=v;remSync(1);render()}}
function remN(n){const r=remInit(),D=['07:30','13:00','20:30'];while(r.times.length<n)r.times.push(D[r.times.length]);r.times.length=n;remSync(1);render()}
function remOn(v){const r=remInit();r.on=v?1:0;if(v){if(!r.days.length)r.days=[0,1,2,3,4,5,6];remPerm()}remSync(1);render()}
function doneRem(on){const r=remInit();r.on=on?1:0;if(on&&!r.days.length)r.days=[0,1,2,3,4,5,6];remSync(1);if(!on){adv();return}
 // pede a permissão e, quando o celular responder, mostra a confirmação com o botão Continuar
 // mostra a confirmação na hora; a resposta do celular só ajusta a mensagem
 const P=remPlug(),fim=ok=>{if(steps[S.i]&&steps[S.i].t==='rem'&&S.remRes){S.remRes=ok?1:2;render()}};S.remRes=1;render();
 if(!P)return;try{P.requestPermissions().then(x=>fim(!x||x.display!=='denied')).catch(()=>{})}catch(e){}}
function remCont(){delete S.remRes;adv();remSync(1)}
function remTest(){const P=remPlug();if(!P){S.remMsg='Os lembretes só tocam no app instalado (APK), não no navegador.';render();return}
 try{P.requestPermissions().then(()=>P.schedule({notifications:[{id:9999,title:'Kaien',body:'Teste: se você viu isto, os lembretes estão funcionando.',schedule:{at:new Date(Date.now()+5000),allowWhileIdle:true}}]})).then(()=>{S.remMsg='Enviado. Em uns 5 segundos deve aparecer. Se não aparecer, veja se as notificações do app estão permitidas nas configurações do celular.';render()}).catch(()=>{S.remMsg='Não consegui agendar. Veja se as notificações do app estão permitidas.';render()})}catch(e){}}
let _remSig='';
function remSync(force){try{remSync0(force)}catch(e){console.warn(e)}}
// durante a abertura o plano do dia ainda não existe: os lembretes só são agendados depois dela
function remSync0(force){const P=remPlug();if(!P||!S.rem)return;if(steps[S.i]&&steps[S.i].t!=='day1')return;
 const r=S.rem,now=new Date();let mD=false,tD=false,all=false;try{mD=(S.ms.low||{}).st==='done';tD=(S.ms.obj||{}).st==='done';all=calcXp().all}catch(e){}
 const sig=JSON.stringify([r,now.toDateString(),mD,tD,all,S.name,S.wd]);if(!force&&sig===_remSig)return;_remSig=sig;
 const out=[];let id=1;
 for(let d=0;d<7&&r.on;d++){const dt=new Date(now.getFullYear(),now.getMonth(),now.getDate()+d),wd=(dt.getDay()+6)%7;if(!r.days.includes(wd))continue;
  r.times.forEach((t,j)=>{const hm=String(t).split(':').map(Number),at=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hm[0]||0,hm[1]||0,0);if(at<=now)return;const role=remRole(t);
   if(role==='treino'&&!(S.wd||[]).includes(wd))return;
   if(d===0&&((role==='mente'&&mD)||(role==='treino'&&tD)||(role==='noite'&&all)))return;
   const L=REMTX[role].concat((REMTXR[rkI(myLvl())]||{})[role]||[]);out.push({id:id++,title:'Kaien',body:L[(dt.getDate()+j)%L.length].replace('{n}',S.name||'viajante'),schedule:{at:at,allowWhileIdle:true}})})}
 try{P.getPending().then(p=>{const ids=((p&&p.notifications)||[]).filter(n=>n.id!==9999).map(n=>({id:n.id}));return ids.length?P.cancel({notifications:ids}):0}).then(()=>out.length?P.schedule({notifications:out}):0).catch(()=>{})}catch(e){}}
function remCard(){const r=S.rem,on=r&&r.on;
 return '<div class="card"><div class="mt"><span class="g">Lembretes</span><b>'+(on?'Ligados':'Desligados')+'</b></div><div class="lvs"><button class="mb '+(on?'on':'')+'" onclick="remOn(1)">Receber</button><button class="mb '+(!on?'on':'')+'" onclick="remOn(0)">Não receber</button></div>'
 +(on?'<div class="wdg">'+WDN.map((n,i)=>'<button class="'+(r.days.includes(i)?'on':'')+'" onclick="remDay('+i+')">'+n+'</button>').join('')+'</div><div class="lvs">'+[1,2,3].map(n=>'<button class="mb '+(r.times.length===n?'on':'')+'" onclick="remN('+n+')">'+n+(n===1?' vez':' vezes')+' por dia</button>').join('')+'</div>'+r.times.map((t,j)=>'<label class="note" style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><span>'+REMLB[remRole(t)]+'</span><input type="time" class="tin" value="'+esc(t)+'" onchange="remTime('+j+',this.value)"></label>').join('')+'<p class="note" style="margin-top:8px">De manhã lembro da mente, à tarde do treino (só nos dias de treino) e à noite de fechar o dia. Se você já fez a missão, eu não aviso. Depois de uns 7 dias sem abrir o app, eu paro de avisar.</p><button class="mb" onclick="remTest()">Enviar um lembrete de teste</button>':'')
 +(S.remMsg?'<p class="note" style="margin-top:6px"><b>'+esc(S.remMsg)+'</b></p>':(remPlug()?'':'<p class="note" style="margin-top:6px">Os lembretes só tocam no app instalado no celular (APK), não no navegador.</p>'))+'</div>'}