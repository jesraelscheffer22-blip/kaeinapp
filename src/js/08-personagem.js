let _sv=0,_rev=null,_sp={a:0,v:0,drag:0,x:0,raf:0};
// Fundos do personagem: [id (eq.bgv), nome, nível, classe CSS]. Os ids crescem com o nível.
const FUNDOS=[[0,'Pátio',0,'dojo'],[2,'Templo das Cachoeiras',8,'t2'],[3,'Templo dos Dragões',16,'t3'],[4,'Floresta de Bambu',20,'fd fd-bambu af-bg-bambu'],[5,'Bambu ao Luar',29,'fd fd-bambulua af-bg-bambulua'],[6,'Montanha da Tempestade',30,'fd fd-montanha af-bg-montanha'],[7,'Tempestade',35,'fd fd-tempestade af-bg-tempestade'],[8,'Palácio do Dragão',40,'fd fd-palacio af-bg-palacio'],[9,'Jardim do Dragão',45,'fd fd-jardim af-bg-jardim'],[10,'Pico da Lua',50,'fd fd-lua af-bg-lua']];
const fundoOf=id=>FUNDOS.find(f=>f[0]===id)||FUNDOS[0];
// Um fundo novo só aparece depois da cena de revelação (S.bgRev = maior id já revelado).
const bgShown=()=>{const v=(S.eq&&S.eq.bgv)||0,r=S.bgRev||0;if(v<=r)return v;const ok=FUNDOS.filter(f=>f[0]<=r&&myLvl()>=f[2]);return ok.length?ok[ok.length-1][0]:0};
const bgCls=()=>fundoOf(bgShown())[3];
const bgNeed=()=>{const L=myLvl(),r=S.bgRev||0,n=FUNDOS.filter(f=>f[0]>r&&L>=f[2]);return n.length?n[n.length-1][0]:0};
function revCheck(){if(_rev)return;const n=bgNeed();if(!n)return;_rev={to:n,ph:0};setTimeout(()=>{if(_rev&&!_rev.ph){_rev.ph=1;S.bgRev=_rev.to;try{Som.gongo();if(navigator.vibrate&&Cfg.vib())navigator.vibrate([40,30,40,30,150])}catch(e){}render()}},Cfg.rfx()?300:2300)}
function revEnd(){if(!_rev||!_rev.ph)return;_rev=null;S.top=true;render()}
function revBg(){const bg=$('bg'),f=$('fx');if(bg)bg.className='bg live '+bgCls()+((_rev&&!_rev.ph)?' shk':'');if(f)f.className=bgCls().replace(/ af-\S+/g,'')}
function revView(){const nm=fundoOf(_rev.to)[1];return '<div class="rev" onclick="revEnd()">'+(_rev.ph?'<div class="rflash"></div><div class="revt"><small>NOVO FUNDO DESBLOQUEADO</small><b>'+nm+'</b></div><small class="revh">toque para continuar</small>':'')+'</div>'}
// Roupas (eq.tone): [nome, descrição, nível, classe]. 3+ são as roupas dos ranks C, B, A e S.
const ROUPAS=[['Roupa inicial','A roupa de quando você começou.',0,'pH'],['Roupa com capa','Liberada no nível 5.',5,'pH5'],['Roupa do rank D','Capa em camadas, liberada no nível 10.',10,'pH10 af-pH10'],['Roupa do rank C','Bronze e verde-jade da Floresta de Bambu. Nível 20.',20,'pH20 af-pH20'],['Roupa do rank B','Prata e azul-gelo da Montanha. Nível 30.',30,'pH30 af-pH30'],['Roupa do rank A','Ouro e carmesim do Palácio do Dragão. Nível 40.',40,'pH40 af-pH40'],['Manto do mestre','Ouro branco e roxo lunar. Rank S, nível 50.',50,'pH50 af-pH50']];
const outN=()=>{const t=(S.eq&&S.eq.tone)||0,L=myLvl();let n=0;ROUPAS.forEach((r,i)=>{if(i<=t&&L>=r[2])n=i});return t?n:0};const outCls=()=>ROUPAS[outN()][3];
const SPIN2=['@@IMG:spin2-0@@','@@IMG:spin2-1@@','@@IMG:spin2-2@@','@@IMG:spin2-3@@'];const SPIN=['@@IMG:spin-0@@','@@IMG:spin-1@@','@@IMG:spin-2@@','@@IMG:spin-3@@'],SPIN0=['@@IMG:spin0-0@@','@@IMG:spin0-1@@','@@IMG:spin0-2@@','@@IMG:spin0-3@@'];const SPINR={3:['@@IMG:spin20-0@@','@@IMG:spin20-1@@','@@IMG:spin20-2@@','@@IMG:spin20-3@@'],4:['@@IMG:spin30-0@@','@@IMG:spin30-1@@','@@IMG:spin30-2@@','@@IMG:spin30-3@@'],5:['@@IMG:spin40-0@@','@@IMG:spin40-1@@','@@IMG:spin40-2@@','@@IMG:spin40-3@@'],6:['@@IMG:spin50-0@@','@@IMG:spin50-1@@','@@IMG:spin50-2@@','@@IMG:spin50-3@@']};
const spSet=()=>{const n=outN();return n>=3?SPINR[n]:n===2?SPIN2:n===1?SPIN:SPIN0};
// classe de variação por filtro de cada quadro do giro (só tem efeito enquanto a arte própria não existe)
const spAf=i=>{const n=outN();return n>=3?' af-spin'+[0,0,0,20,30,40,50][n]+'-'+i:n===2?' af-spin2-'+i:n===0?' af-spin0-'+i:''};
function spUpd(){const a=_sp.a;document.querySelectorAll('#ui .spi').forEach((e,i)=>{let q=(((i-a)%4)+4)%4;q=Math.min(q,4-q);e.style.opacity=Math.max(0,1-q)})}
function spAnim(t){cancelAnimationFrame(_sp.raf);const st=_sp.a,t0=performance.now(),f=n=>{const p=Math.min(1,(n-t0)/380),e=1-Math.pow(1-p,3);_sp.a=st+(t-st)*e;spUpd();if(p<1)_sp.raf=requestAnimationFrame(f);else{_sp.a=((t%4)+4)%4;spUpd()}};_sp.raf=requestAnimationFrame(f)}
function spStep(d){spAnim(Math.round(_sp.a)+d)}
function spDown(e){_sp.drag=1;_sp.x=e.clientX;_sp.v=0;cancelAnimationFrame(_sp.raf);try{e.currentTarget.setPointerCapture(e.pointerId)}catch(_){}}
function spMove(e){if(!_sp.drag)return;const dx=e.clientX-_sp.x;_sp.x=e.clientX;_sp.v=dx;_sp.a=((_sp.a-dx/140)%4+4)%4;spUpd()}
function spUp(){if(!_sp.drag)return;_sp.drag=0;spAnim(Math.round(_sp.a-_sp.v/18))}
function spOpen(){_sv=1;_sp.a=0;S.top=true;render()}
function spClose(){_sv=0;S.top=true;render()}
function spinView(){const st='onpointerdown="event.stopPropagation()"';return '<div class="spin" onpointerdown="spDown(event)" onpointermove="spMove(event)" onpointerup="spUp()" onpointercancel="spUp()"><button class="spc" '+st+' onclick="spClose()">‹ Voltar</button>'+spSet().map((s,i)=>'<img class="spi'+spAf(i)+(spSet()===SPIN0?' spq':'')+((S.eq&&S.eq.aura&&myLvl()>=4)?' spaur':'')+'" alt="" src="'+s+'">').join('')+'<button class="spa l" '+st+' onclick="spStep(-1)"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><button class="spa r" '+st+' onclick="spStep(1)"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button><div class="sph">Arraste para girar</div></div>'}
const BGN=new Proxy({},{get:(_,k)=>{const f=FUNDOS.find(x=>String(x[0])===String(k));return f?f[1].replace('Templo d','').replace(/^as /,'').replace(/^os /,''):'Pátio'}});
function bgCycle(){const L=myLvl(),l=FUNDOS.filter(f=>L>=f[2]).map(f=>f[0]),i=l.indexOf(S.eq.bgv||0);S.eq.bgv=l[(i+1)%l.length];S.top=false;render()}
// Concede o que cada nível dá (equipa na hora). Os módulos novos acrescentam em GRANTS.
const GRANTS=[];
function grantLv(L){S.eq=S.eq||{};S.lvd=S.lvd||{};if(!S.lvd[L])S.lvd[L]=_iso();
 if(L===3&&!S.scnSeen)S.scnP=1;if(L===4)S.eq.aura=1;if(L===5)S.eq.tone=1;if(L===10){S.eq.tone=2;S.eq.title='Aspirante'}if(L===2&&!S.eq.title)S.eq.title='Aprendiz';if(L===6){S.eq.title='Constante'}if(L===8)S.eq.bgv=2;if(L===16)S.eq.bgv=3;
 const t=TITN.find(x=>x[1]===L);if(t&&L>10)S.eq.title=t[0];
 const r=ROUPAS.findIndex(x=>x[2]===L);if(r>=3)S.eq.tone=r;
 const f=FUNDOS.find(x=>x[2]===L);if(f&&L>16)S.eq.bgv=f[0];
 const a=AURAS.findIndex(x=>x[2]===L);if(a>1)S.eq.aura=a;
 const c=NOMECOR.findIndex(x=>x[2]===L);if(c>0)S.eq.nc=c;
 GRANTS.forEach(g=>{try{g(L)}catch(e){}})}
// Auras (eq.aura): [nome, descrição, nível, cor RGB]. A 7 é a aura da semana (cor do atributo dominante).
const AURAS=[['Sem aura','Só o personagem.',0,''],['Aura cinza','Um contorno de luz cinza.',4,'205,210,228'],['Aura de Aço','Azul-aço do Templo das Cachoeiras.',12,'150,180,225'],['Aura de Jade','Verde-jade da Floresta de Bambu.',22,'95,205,155'],['Aura de Prata','Prata e gelo da Montanha.',32,'220,230,245'],['Aura de Ouro','O ouro do Palácio do Dragão.',42,'255,200,90'],['Aura lunar','Ouro branco e roxo lunar. Rank S.',50,'200,160,255'],['Aura da semana','Muda de cor com o atributo que você mais treinou nos últimos 7 dias.',25,'']];
const ACOR={'Força':'235,80,70','Calma':'90,200,170','Foco':'255,205,90','Agilidade':'120,230,120','Disciplina':'215,220,235','Resistência':'205,140,80'};
function auraRgb(){const L=myLvl(),a=(S.eq&&S.eq.aura)||0;if(!a||!AURAS[a]||L<AURAS[a][2])return '';if(a===7){const st=statSemana();return ACOR[st]||AURAS[1][3]}return AURAS[a][3]}
// Atributo mais treinado nos últimos 7 dias (missões concluídas).
function statSemana(){const c={};S.hist.slice(-6).concat([{ms:S.ms,keys:plan().map(m=>({key:m.key,stat:m.stat}))}]).forEach(h=>(h.keys||[]).forEach(k=>{if(h.ms[k.key]&&h.ms[k.key].st==='done')c[k.stat]=(c[k.stat]||0)+1}));let b=null;Object.keys(c).forEach(k=>{if(!b||c[k]>c[b])b=k});return b}
// Atributo HTML para o contorno da aura: class="avw aur" style="--au:R,G,B".
const auraAttr=()=>{const c=auraRgb();return c?' aur auc" style="--au:'+c:''};
// Cor do nome (eq.nc).
const NOMECOR=[['Sem cor','',0],['Aço','#a9c4ee',19],['Jade','#7fdcb0',27],['Prata','#e6edf8',37],['Ouro','#f1d48a',47],['Lunar','#d4b8ff',50]];
const nomeCor=()=>{const c=(S.eq&&S.eq.nc)||0;return c&&NOMECOR[c]&&myLvl()>=NOMECOR[c][2]?NOMECOR[c][1]:''};
const nomeH=()=>{const c=nomeCor();return c?'<b style="color:'+c+';text-shadow:0 0 10px '+c+'66">'+esc(S.name)+'</b>':'<b>'+esc(S.name)+'</b>'};
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

function eqTog(k){const need={aura:4,pose:5,bg:6,frame:8,tone:5}[k];if(myLvl()<need)return;if(k==='tone'){const L=myLvl(),ok=ROUPAS.map((r,i)=>i).filter(i=>L>=ROUPAS[i][2]),i=ok.indexOf(S.eq.tone||0);S.eq.tone=ok[(i+1)%ok.length]}else if(k==='aura'){const L=myLvl(),ok=AURAS.map((r,i)=>i).filter(i=>L>=AURAS[i][2]),i=ok.indexOf(S.eq.aura||0);S.eq.aura=ok[(i+1)%ok.length]}else S.eq[k]=S.eq[k]?0:1;S.top=false;render()}
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