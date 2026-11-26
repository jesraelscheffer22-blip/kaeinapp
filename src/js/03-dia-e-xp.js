function isTrain(d){if(S.ret&&d>=S.ret.de&&d<=S.ret.ate)return false;const o=S.ov[d];if(o!==undefined)return o;if(!S.wd.length)return true;return S.wd.includes((S.wd0+d-1)%7)}
function toggleWd(i){const inStep=steps[S.i]&&steps[S.i].t==='wdays',w=S.wd,k=w.indexOf(i);
 if(k>=0){if(!inStep&&w.length<=2){S.wdMsg='O mínimo é 2 dias por semana.';render();return}if(!inStep)S.ov[S.day]=isTrain(S.day);w.splice(k,1)}
 else{if(w.length>=6){S.wdMsg='O máximo é 6 dias. O corpo precisa de pelo menos um dia de descanso.';render();return}if(!inStep)S.ov[S.day]=isTrain(S.day);w.push(i)}
 S.wdMsg='';render()}
function doneWd(){if(S.wd.length<2||S.wd.length>6)return;S.wd.sort((a,b)=>a-b);S.wd0=(new Date().getDay()+6)%7;S.wdMsg='';const n=S.wd.length;
 S.react={x:n+(n===1?' dia':' dias')+' por semana. Os outros dias são de descanso, e descanso também faz parte do treino.',p:'B'};render()}
function swapToday(v){if(Object.keys(S.ms).length)return;S.ov[S.day]=v;S.top=true;render()}
// Plano do dia = plano base + ajustes dos módulos (PLAN_MODS).
function plan(){let ms=plan0();PLAN_MODS.forEach(f=>{try{ms=f(ms)||ms}catch(e){console.warn(e)}});return ms}
function plan0(){const R=calc(),gs=R.gs;const low=ST.filter(x=>x!==gs).sort((a,b)=>R.v[a]-R.v[b])[0];
 const tr=isTrain(S.day),MEN=['Foco','Calma','Disciplina'];
 const men=Object.assign(lib(MEN[(S.day-1)%3]),{tag:'Mente',key:'low'});
 const phys=tr?Object.assign(S.a.pain===3?lib('Força'):(()=>{const t=sessType();return t==='aC'?Object.assign(lib('Agilidade',t),{stat:'Resistência'}):t[0]==='a'?lib('Agilidade',t):lib('Força',t)})(),{tag:'Treino',key:'obj'}):{stat:'Resistência',tag:'Descanso ativo',key:'obj',title:'Alongamento e caminhada leve',steps:[TM('Alongamento suave',pk([8,10,12])),TM('Caminhada curta e leve',pk([5,10,10]))],min:pk([13,20,22]),xp:10};
 const ms=[men,phys];
 const h=S.pull.find(x=>!NONE.includes(x));
 if(h)ms.push({stat:HAB[h],tag:'Hábito',key:'hab',title:HM[h].t,steps:HM[h].st(),min:null,xp:20,sup:(h==='Álcool'||h==='Cigarro ou vape')});
 if(S.day%3===0)ms.push({stat:'Calma',tag:'Surpresa do Kaien',key:'sur',title:'Missão surpresa',steps:[CH(SUR[(S.day/3-1)%SUR.length])],min:5,xp:10});
 if(!tr)ms.forEach(m=>{if(m.key!=='hab')m.xp=Math.round(m.xp*0.6)});
 return ms}
function waterPlan(ms){let b=S.w?S.w*35:2000;const capped=b>3500;b=Math.min(3500,Math.max(1500,b));if(ms.some(m=>m.title.indexOf('Treino de força')===0))b+=500;b=Math.min(3500,b);const ml=Math.round(b/50)*50;return{ml,cups:Math.ceil(ml/250),capped}}
const stOf=(m)=>(S.ms[m.key]||{}).st;
const RM=[1,1.7,2.4,2.9,3.3,3.6],RKN='EDCBAS',rkI=L=>Math.min(5,Math.floor(L/10)),rankOf=L=>RKN[rkI(L)];
function rkSnap(){S.rkm=RM[rkI(lvlOf(totalXp()))]}
function calcXp(){const ms=plan(),mu=LV[S.lvl].m*(S.rkm||1),wp=waterPlan(ms),wDone=!S.noWater&&S.cups>=wp.cups;
 let x=0;ms.forEach(m=>{if(stOf(m)==='done')x+=m.xp});if(wDone)x+=5;x=Math.round(x*mu);
 const all=ms.every(m=>stOf(m)==='done')&&(wDone||S.noWater);if(all)x+=Math.round((isTrain(S.day)?25:15)*mu);
 return{xp:x,all,wDone,wp,ms,mu}}
const dgXp=()=>Object.values(S.dgAll||{}).reduce((s,D)=>s+D.fl.reduce((a,f)=>a+(f?f.xp:0),0),0);
const totalXp=()=>S.xpPrev+calcXp().xp+dgXp();
function progOf(n){let c=S.progAcc[n]||0;plan().forEach(m=>{if(m.stat===n&&stOf(m)==='done')c++});return c}
function doneCount(){let d=S.dgDone||0;S.hist.forEach(h=>Object.values(h.ms).forEach(x=>{if(x.st==='done')d++}));Object.values(S.ms).forEach(x=>{if(x.st==='done')d++});return d}
function todayActive(){return Object.values(S.ms).some(x=>x.st==='done')||(!S.noWater&&S.cups>=waterPlan(plan()).cups)}
function streakInfo(){const T=S.hist.filter(h=>h.train),tt=isTrain(S.day),n=T.filter(h=>h.active).length+(tt&&todayActive()?1:0),last=T.length?T[T.length-1].active:false;return{n,lit:(tt&&todayActive())||last}}
function suggestion(){const TH=S.hist.filter(h=>h.train);if(TH.length<3||S.sugDay===S.day)return null;const l=TH.slice(-3);
 const nd=l.reduce((a,h)=>a+h.keys.filter(k=>!(h.ms[k.key]&&h.ms[k.key].st==='done')).length,0);
 const full=l.every(h=>h.keys.length&&h.keys.every(k=>h.ms[k.key]&&h.ms[k.key].st==='done'));
 if(nd>=5&&S.lvl>0)return 'down';if(full&&S.lvl<2&&!(S.a.pain>=2))return 'up';return null}
function chooseLvl(i){S.px={};S.lvl=i;S.tab='ini';S.ms={};S.cups=0;const weak=i===2&&(S.a.flex<=1||S.a.breath===0||S.a.mov===0);
 if(weak&&!S.warned){S.warned=true;S.react={x:'Esse é o caminho mais duro, e a sua ficha ainda está no começo. Eu respeito a escolha, mas se pesar demais, você pode descer de nível a qualquer momento.',p:'A'};render()}else adv()}
function setTab(x){S.tab=x;S.tela=null;if(x==='dun'&&S.dg)S.dgList=1;S.top=true;render()}
function setLvl(i){S.px={};S.lvBase=null;S.lvl=i;S.ms={};S.cups=0;S.top=true;render()}
function addDia(txt,src,title){S.dia=S.dia||[];S.dia.unshift({id:Date.now()+Math.random(),t:Date.now(),src:src,title:title||'',txt:txt})}
function diaOpen(){S.dv=1;S.dedit=null;S.ddel=null;S.top=true;render()}
function diaClose(){S.dv=0;S.dedit=null;S.ddel=null;S.top=true;render()}
function diaFilt(f){S.dvf=f;render()}
function diaSave(){const e=document.getElementById('dnew'),v=e?e.value.trim():'';if(!v)return;addDia(v,'free','Recordação livre');render()}
function diaEdit(id){S.dedit=id;S.ddel=null;render()}
function diaEditSave(id){const e=document.getElementById('ded'),v=e?e.value.trim():'';const x=(S.dia||[]).find(q=>q.id===id);if(x&&v)x.txt=v;S.dedit=null;render()}
function diaDel(id){if(S.ddel!==id){S.ddel=id;S.dedit=null;render();setTimeout(()=>{if(S.ddel===id){S.ddel=null;render()}},4000);return}S.dia=(S.dia||[]).filter(q=>q.id!==id);S.ddel=null;render()}
function diaView(){const L=S.dia||[],f=S.dvf||'all',sh=L.filter(e=>f==='all'||(f==='dg'?e.src==='dg':f==='ms'?e.src==='ms':e.src==='free'));
 const fd=t=>{const d=new Date(t),p=n=>String(n).padStart(2,'0');return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear()+' · '+p(d.getHours())+':'+p(d.getMinutes())};
 const chip=(k,t)=>'<button class="mb '+(f===k?'on':'')+'" onclick="diaFilt(\''+k+'\')">'+t+'</button>';
 const ent=sh.map(e=>'<div class="dpg"><div class="dm"><span>'+fd(e.t)+'</span><span>'+esc(e.title)+'</span></div>'+(S.dedit===e.id?'<textarea id="ded" class="dnote dp" rows="5">'+esc(e.txt)+'</textarea><div style="display:flex;gap:8px;margin-top:6px"><button class="mb on" onclick="diaEditSave('+e.id+')">Salvar</button><button class="mb" onclick="diaEdit(null)">Cancelar</button></div>':'<p class="dt">'+esc(e.txt).replace(/\n/g,'<br>')+'</p><div style="display:flex;gap:12px"><button class="lk dl" onclick="diaEdit('+e.id+')">Editar</button><button class="lk dl" onclick="diaDel('+e.id+')">'+(S.ddel===e.id?'Toque de novo para apagar':'Apagar')+'</button></div>')+'</div>').join('');
 return '<div class="gh"><button class="lk" onclick="diaClose()">‹ Voltar</button><span class="note">Recordações</span></div>'
 +'<div class="b" style="animation:none"><p><span class="g">Kaien</span><br>O que você quer lembrar de hoje?</p></div>'
 +'<div class="dpg"><textarea id="dnew" class="dnote dp" rows="4" placeholder="Escreva o que quiser. Só você vê, fica neste aparelho."></textarea><button class="mb on" style="margin-top:6px" onclick="diaSave()">Guardar no diário</button></div>'
 +'<div style="display:flex;flex-wrap:wrap;gap:6px;margin:10px 0">'+chip('all','Todas')+chip('dg','Dungeons')+chip('ms','Missões')+chip('free','Livres')+'</div>'
 +(ent||'<p class="note" style="text-align:center">'+(L.length?'Nada nesta seção.':'Ainda não há recordações. As anotações das missões também caem aqui.')+'</p>')}
function setCups(n){S.cups=n;render()}
const SLC=['Menos de 5 h','5 a 6 h','6 a 7 h','7 a 8 h','Mais de 8 h'];
function slpOpen(){return !(S.slp&&S.slp.day===S.day)}
function slpEligible(){return S.lvl>0&&S.lvBase==null&&!Object.keys(S.ms).length&&!S.cups}
function slpSet(c){if(!slpOpen())return;S.slp={day:S.day,c:c,ask:(c<=1&&slpEligible())?1:0};S.slh=(S.slh||[]).concat([c]).slice(-7);S.slc=(S.slc||0)+1;S.xpPrev+=3;render()}
function slpLite(y){if(y&&S.slp&&S.slp.ask&&slpEligible()){S.lvBase=S.lvl;S.lvl=0;S.ms={};S.cups=0}if(S.slp)S.slp.ask=0;render()}
function slpCard(){const s=S.slp;
 if(slpOpen())return `<div class="card"><div class="mt"><span class="g">Kaien pergunta</span><b>Quantas horas você dormiu?</b></div><p class="note">Sem certo ou errado. Só registrar já vale +3 XP.</p><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${SLC.map((t,i)=>`<button class="mb" onclick="slpSet(${i})">${t}</button>`).join('')}</div></div>`;
 if(s.ask)return `<div class="card"><div class="mt"><span class="g">Kaien</span><b>Noite curta. Quer pegar leve hoje?</b></div><p class="note">As missões de hoje ficam no nível Fácil. Amanhã volta tudo ao normal.</p><div style="display:flex;gap:8px;margin-top:8px"><button class="mb on" onclick="slpLite(1)">Pegar leve hoje</button><button class="mb" onclick="slpLite(0)">Seguir normal</button></div></div>`;
 const l=S.slh||[];if(s.c===0&&l.length>=3&&l.slice(-3).every(x=>x===0))return `<div class="card"><p class="note" style="margin:0">Faz alguns dias que o sono está curto. Se isso continuar, vale conversar com um médico.</p></div>`;
 if(S.lvBase!=null)return `<div class="card"><p class="note" style="margin:0">Hoje está no modo leve. Amanhã o nível normal volta sozinho.</p></div>`;
 return ''}
function kPose(ctx,p){if(p==='D')return 'pD';if(p==='A')return S.day%2?'pQ6':'pQ9';
 if(ctx==='kai')return S.day%2?'pQ11':'pB';if(ctx==='mis')return S.day%2?'pQ12':'pQ4';
 if(slpOpen()||(S.slp&&S.slp.ask))return 'pQ3';
 const h=new Date().getHours();return (h<5||h>=22)?(S.day%2?'pQ12':'pQ10'):h<12?(S.day%2?'pQ13':'pQ7'):'pQ1'}
function toggleNoWater(){S.noWater=!S.noWater;S.cups=0;render()}
function toggleFast(){S.fast=!S.fast;render()}
function dismissSug(){S.sugDay=S.day;render()}
function nextDay(){const C=calcXp(),ms=C.ms;const rec={day:S.day,ms:JSON.parse(JSON.stringify(S.ms)),water:C.wDone,xp:C.xp,keys:ms.map(m=>({key:m.key,title:m.title,stat:m.stat})),train:isTrain(S.day)};
 rec.active=Object.values(S.ms).some(x=>x.st==='done')||C.wDone;
 ms.forEach(m=>{if(stOf(m)==='done')S.progAcc[m.stat]=(S.progAcc[m.stat]||0)+1});
 S.xpPrev+=C.xp;S.hist.push(rec);NDAY.forEach(f=>{try{f(rec)}catch(e){console.warn(e)}});S.day++;if(S.lvBase!=null){S.lvl=S.lvBase;S.lvBase=null}S.ms={};S.cups=0;rkSnap();dgRoll2();S.ms={};S.cups=0;S.g=null;S.cel=null;S.tab='ini';S.top=true;render()}