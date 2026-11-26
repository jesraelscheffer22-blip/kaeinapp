let _sv=0,_rev=null,_sp={a:0,v:0,drag:0,x:0,raf:0};
const bgShown=()=>{const v=(S.eq&&S.eq.bgv)||0,r=S.bgRev||0;if(v===3&&r<3)return r>=2?2:0;if(v===2&&r<2)return 0;return v};
const bgCls=()=>{const v=bgShown();return v===2?'t2':v===3?'t3':'dojo'};
const bgNeed=()=>{const L=myLvl(),r=S.bgRev||0;return L>=16&&r<3?3:L>=8&&r<2?2:0};
function revCheck(){if(_rev)return;const n=bgNeed();if(!n)return;_rev={to:n,ph:0};setTimeout(()=>{if(_rev&&!_rev.ph){_rev.ph=1;S.bgRev=_rev.to;try{beep();if(navigator.vibrate)navigator.vibrate([40,30,40,30,150])}catch(e){}render()}},2300)}
function revEnd(){if(!_rev||!_rev.ph)return;_rev=null;S.top=true;render()}
function revBg(){const bg=$('bg'),f=$('fx');if(bg)bg.className='bg live '+bgCls()+((_rev&&!_rev.ph)?' shk':'');if(f)f.className=bgCls()}
function revView(){const nm=_rev.to===3?'Templo dos Dragões':'Templo das Cachoeiras';return '<div class="rev" onclick="revEnd()">'+(_rev.ph?'<div class="rflash"></div><div class="revt"><small>NOVO FUNDO DESBLOQUEADO</small><b>'+nm+'</b></div><small class="revh">toque para continuar</small>':'')+'</div>'}
const outN=()=>{const t=S.eq&&S.eq.tone,L=myLvl();if(!t||L<5)return 0;return(t===2&&L>=10)?2:1};const outCls=()=>['pH','pH5','pH10'][outN()];
const SPIN2=['@@IMG:spin2-0@@','@@IMG:spin2-1@@','@@IMG:spin2-2@@','@@IMG:spin2-3@@'];const SPIN=['@@IMG:spin-0@@','@@IMG:spin-1@@','@@IMG:spin-2@@','@@IMG:spin-3@@'],SPIN0=['@@IMG:spin0-0@@','@@IMG:spin0-1@@','@@IMG:spin0-2@@','@@IMG:spin0-3@@'];const spSet=()=>outN()===2?SPIN2:outN()===1?SPIN:SPIN0;
function spUpd(){const a=_sp.a;document.querySelectorAll('#ui .spi').forEach((e,i)=>{let q=(((i-a)%4)+4)%4;q=Math.min(q,4-q);e.style.opacity=Math.max(0,1-q)})}
function spAnim(t){cancelAnimationFrame(_sp.raf);const st=_sp.a,t0=performance.now(),f=n=>{const p=Math.min(1,(n-t0)/380),e=1-Math.pow(1-p,3);_sp.a=st+(t-st)*e;spUpd();if(p<1)_sp.raf=requestAnimationFrame(f);else{_sp.a=((t%4)+4)%4;spUpd()}};_sp.raf=requestAnimationFrame(f)}
function spStep(d){spAnim(Math.round(_sp.a)+d)}
function spDown(e){_sp.drag=1;_sp.x=e.clientX;_sp.v=0;cancelAnimationFrame(_sp.raf);try{e.currentTarget.setPointerCapture(e.pointerId)}catch(_){}}
function spMove(e){if(!_sp.drag)return;const dx=e.clientX-_sp.x;_sp.x=e.clientX;_sp.v=dx;_sp.a=((_sp.a-dx/140)%4+4)%4;spUpd()}
function spUp(){if(!_sp.drag)return;_sp.drag=0;spAnim(Math.round(_sp.a-_sp.v/18))}
function spOpen(){_sv=1;_sp.a=0;S.top=true;render()}
function spClose(){_sv=0;S.top=true;render()}
function spinView(){const st='onpointerdown="event.stopPropagation()"';return '<div class="spin" onpointerdown="spDown(event)" onpointermove="spMove(event)" onpointerup="spUp()" onpointercancel="spUp()"><button class="spc" '+st+' onclick="spClose()">‹ Voltar</button>'+spSet().map(s=>'<img class="spi'+(spSet()===SPIN0?' spq':'')+((S.eq&&S.eq.aura&&myLvl()>=4)?' spaur':'')+'" alt="" src="'+s+'">').join('')+'<button class="spa l" '+st+' onclick="spStep(-1)"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><button class="spa r" '+st+' onclick="spStep(1)"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button><div class="sph">Arraste para girar</div></div>'}
const BGN={0:'Pátio',2:'Cachoeiras',3:'Dragões'};
function bgCycle(){const L=myLvl(),l=[0];if(L>=8)l.push(2);if(L>=16)l.push(3);const i=l.indexOf(S.eq.bgv||0);S.eq.bgv=l[(i+1)%l.length];S.top=false;render()}
function grantLv(L){S.eq=S.eq||{};if(L===3&&!S.scnSeen)S.scnP=1;if(L===4)S.eq.aura=1;if(L===5)S.eq.tone=1;if(L===10){S.eq.tone=2;S.eq.title='Aspirante'}if(L===2&&!S.eq.title)S.eq.title='Aprendiz';if(L===6){S.eq.title='Constante'}if(L===8)S.eq.bgv=2;if(L===16)S.eq.bgv=3}
const FRM=[{id:'niv',n:'Moldura do Nível',d:'Liberada no nível 6. Mostra o seu nível no losango.',h:0,img:'niv',ar:2.767,dy:11.5,m:[9,5,7,5],ok:()=>myLvl()>=6},
{id:'rD',n:'Moldura do Rank D',d:'Chegue ao rank D (nível 10).',h:0,img:'rD',ar:2.82,dy:13.3,m:[9,5,7,5],ok:()=>rkI(myLvl())>=1},
{id:'rC',n:'Moldura do Rank C',d:'Chegue ao rank C (nível 20).',h:0,img:'rC',ar:2.899,dy:12.4,m:[9,5.5,7,5.5],ok:()=>rkI(myLvl())>=2}];
const fwAttr=f=>'class="fw fwi-'+f.img+'" style="--fh:'+f.h+'deg;--ar:'+f.ar+';--dy:'+f.dy+'%;--mt:'+f.m[0]+'%;--mr:'+f.m[1]+'%;--mb:'+f.m[2]+'%;--ml:'+f.m[3]+'%"';
const frmActive=()=>false;
function frmWrap(inner){return inner;const f=FRM.find(x=>x.id===(S.eq&&S.eq.mold));if(!f||!f.ok())return inner;return '<div '+fwAttr(f)+'><span class="fn">'+myLvl()+'</span>'+inner+'</div>'}
function frmOpen(){S.mv=1;S.top=true;render()}
function frmClose(){S.mv=0;S.top=true;render()}
function frmEq(id){const f=FRM.find(x=>x.id===id);if(!f||!f.ok())return;S.eq.mold=S.eq.mold===id?'':id;render()}
function frmView(){return '<div class="gh"><button class="lk" onclick="frmClose()">‹ Voltar</button><span class="note">Molduras</span></div>'+FRM.map(f=>{const ok=f.ok(),on=S.eq.mold===f.id;return '<div class="card" style="'+(ok?'':'opacity:.55')+'"><div class="mt"><span class="g">'+(ok?(on?'Equipada':'Liberada'):'Bloqueada')+'</span><b>'+esc(f.n)+'</b></div><div '+fwAttr(f).replace('class="fw','class="fw fpv')+'><span class="fn">'+myLvl()+'</span><div class="card" style="margin:0;text-align:center"><b>'+esc(S.name)+'</b></div></div><p class="note">'+esc(f.d)+'</p>'+(ok?'<button class="mb '+(on?'on':'')+'" onclick="frmEq(\''+f.id+'\')">'+(on?'Equipada (tocar para tirar)':'Equipar')+'</button>':'')+'</div>'}).join('')}

function eqTog(k){const need={aura:4,pose:5,bg:6,frame:8,tone:5}[k];if(myLvl()<need)return;S.eq[k]=S.eq[k]?0:1;S.top=false;render()}
function eqTitleCycle(){const l=[''].concat(titlesOf(myLvl())),i=l.indexOf(S.eq.title||'');S.eq.title=l[(i+1)%l.length];S.top=false;render()}
const trainDone=()=>S.hist.filter(h=>h.train&&h.active).length+(isTrain(S.day)&&todayActive()?1:0);
const ACH=[
{n:'Primeiro passo',d:'Conclua a primeira missão',f:()=>doneCount()>=1},
{n:'Dez missões',d:'Conclua 10 missões',f:()=>doneCount()>=10},
{n:'Constância',d:'Cumpra 3 dias de treino',f:()=>trainDone()>=3},
{n:'Uma semana',d:'Chegue ao 7º dia no app',f:()=>S.day>=7},
{n:'Dia perfeito',d:'Cumpra todas as missões e a água num dia',f:()=>calcXp().all||S.hist.some(h=>h.keys.length&&h.water&&h.keys.every(k=>h.ms[k.key]&&h.ms[k.key].st==='done'))},
{n:'Voltou mais forte',d:'Volte a treinar depois de um dia perdido',f:()=>S.hist.some((h,i)=>h.train&&!h.active&&S.hist.slice(i+1).some(x=>x.active))},
{n:'Honestidade',d:'Registre uma missão pela metade ou uma parada por dor',f:()=>S.hist.some(h=>Object.values(h.ms).some(x=>x.st==='parcial'||x.st==='dor'))||Object.values(S.ms).some(x=>x.st==='parcial'||x.st==='dor')},
{n:'Mais forte',d:'Ganhe +1 ponto em um status',f:()=>ST.some(n=>progOf(n)>=5)},
{n:'Primeiro andar',d:'Vença um andar de dungeon',f:()=>(S.dgDone||0)>=1},
{n:'Caçador de vícios',d:'Derrote um monstro',f:()=>Object.keys(S.defeated||{}).length>=1},
{n:'Nível 5',d:'Chegue ao nível 5',f:()=>myLvl()>=5}];
function eqTitle(t){S.eq.title=S.eq.title===t?'':t;S.top=false;render()}