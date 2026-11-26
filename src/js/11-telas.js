function mHelp(){S.mHelp=!S.mHelp;S.top=false;render()}
function persOpen(){S.mv=1;S.psub=S.psub||'a';S.top=true;render()}
function persClose(){S.mv=0;S.top=true;render()}
function persSub(x){S.psub=x;S.top=false;render()}
function persSet(k,v){S.eq=S.eq||{};S.eq[k]=v;S.top=false;render()}
function persView(){const L=myLvl(),eq=S.eq||{},sub=S.psub||'a';
 const av='<div class="avw'+auraAttr()+'"><div class="av '+outCls()+'"></div></div>';
 const seg=[['a','Auras'],['r','Roupas'],['t','Títulos'],['f','Fundos'],['n','Nome']].map(x=>'<button class="'+(sub===x[0]?'on':'')+'" onclick="persSub(\''+x[0]+'\')">'+x[1]+'</button>').join('');
 const it=(n,d,on,lock,act,sw)=>'<div class="card pit'+(lock?' lk2':'')+'">'+(sw?'<i class="psw" style="background:'+sw+'"></i>':'')+'<div style="flex:1"><b>'+esc(n)+'</b><br><span class="note">'+esc(d)+'</span></div>'+(lock?'<span class="note">Nível '+lock+'</span>':'<button class="mb'+(on?' on':'')+'" onclick="'+act+'">'+(on?'Equipado':'Equipar')+'</button>')+'</div>';
 let c='';
 if(sub==='a')c=AURAS.map((x,i)=>it(x[0],x[1],(eq.aura||0)===i,L>=x[2]?0:x[2],"persSet('aura',"+i+")",x[3]?'rgb('+x[3]+')':(i===7?'conic-gradient(#eb5046,#ffcd5a,#78e678,#5ac8aa,#d7dceb,#cd8c50,#eb5046)':''))).join('');
 else if(sub==='r'){const o=outN();c=ROUPAS.map((x,i)=>it(x[0],x[1],o===i,L>=x[2]?0:x[2],"persSet('tone',"+i+")")).join('')+(L>=10?'<button class="lk" onclick="persRank()">Rever a cena do rank D</button>':'')}
 else if(sub==='t'){const have=titlesOf(L);c=it('Sem título','Só o seu nome.',!eq.title,0,"persSet('title','')");TITN.forEach(x=>{c+=it(x[0],'Título de nível.',eq.title===x[0],have.includes(x[0])?0:x[1],"persSet('title','"+x[0]+"')")});have.filter(t=>!TITN.some(x=>x[0]===t)).forEach(t=>{c+=it(t,/^Derrotou/.test(t)?'Título de dungeon.':'Título especial.',eq.title===t,0,"persSet('title','"+t.replace(/'/g,"\\'")+"')")});if(typeof TitComp!=='undefined')c=TitComp.painel()+c}
 else if(sub==='n')c=NOMECOR.map((x,i)=>it(x[0],i?'Cor do seu nome no Início e no Personagem.':'O nome na cor padrão.',(eq.nc||0)===i,L>=x[2]?0:x[2],"persSet('nc',"+i+")",x[1])).join('');
 else c=FUNDOS.map(x=>it(x[1],x[2]?'Liberado no nível '+x[2]+'.':'Onde tudo começa.',(eq.bgv||0)===x[0],L>=x[2]?0:x[2],"persSet('bgv',"+x[0]+")")).join('');
 return '<div class="gh"><button class="lk" onclick="persClose()">‹ Voltar</button><span class="note">Personalizar</span></div><div class="pvw">'+av+'</div><div class="seg">'+seg+'</div>'+c}

function sceneView(){const lv=Array.from({length:16},(_,i)=>'<i class="lf" style="left:'+Math.round(Math.random()*100)+'%;--d:'+(7+Math.random()*7).toFixed(1)+'s;--w:'+(Math.random()*70-35).toFixed(0)+'px;--s:'+(.6+Math.random()*.9).toFixed(2)+';animation-delay:-'+(Math.random()*12).toFixed(1)+'s;filter:blur('+(Math.random()<.35?1.5:0)+'px)"></i>').join('');
 const em=Array.from({length:8},(_,i)=>'<i class="em" style="left:'+(i<4?3+Math.random()*8:90+Math.random()*8).toFixed(0)+'%;top:'+(i<4?20:48)+'%;animation-delay:-'+(Math.random()*5).toFixed(1)+'s"></i>').join('');
 return '<div class="scn"><div class="scnbg scnimg"></div><div class="tg" style="left:2%;top:15%"></div><div class="tg" style="right:-2%;top:40%"></div><div class="tg sm" style="right:6%;top:31%"></div>'+lv+em+'<div class="scnt"><span class="g">Capítulo 1 · Mestre Kaien</span><b>A noite no pátio</b>'+paras(HIS[0].ch[0][2])+'<button class="cta" onclick="sceneClose()">Continuar</button></div></div>'}
function sceneClose(){S.scn=0;S.top=true;render()}
function sceneOpen(){S.scn=1;S.top=true;render()}

function espCel(e){return '<div class="espc"><span class="g">O Espelho</span><div class="xb red"><i style="width:'+Math.round(e.hp/e.max*100)+'%"></i></div><span class="note">'+(e.d?'Perdeu '+e.d+' de vida · '+e.hp+' / '+e.max:'Hoje o Espelho já levou dano. Volte amanhã.')+'</span></div>'}
function rankClose(){clearRdT();try{Cine.stop()}catch(e){}S.rcv=null;S.top=true;render()}
function persRank(){S.rcv={lvl:10,replay:1};render()}
function rankView(lvl){const R=rankOf(lvl),col={E:'170,170,185',D:'205,210,230',C:'90,160,255',B:'175,115,255',A:'255,125,90',S:'255,208,90'}[R]||'205,210,230',n=outN(),oldC=['pH','pH5','pH10'][Math.max(0,n-1)],newC=outCls(),mu=String(RM[rkI(lvl)]||1).replace('.',',');
 const sp=Array.from({length:28},(_,i)=>'<i class="rkp" style="left:'+Math.round(Math.random()*100)+'%;animation-delay:'+(2.7+Math.random()*4).toFixed(1)+'s;--h:'+(60+Math.random()*180).toFixed(0)+'px"></i>').join('');
 return '<div class="rkc" style="--rc:'+col+'"><button class="rks" onclick="rankClose()">Pular</button><div class="rkbg"></div><div class="rkL">'+R+'</div><div class="av rko '+oldC+'"></div><div class="rkfl"></div><div class="rkring"></div><div class="av rkn '+newC+'"></div>'+sp+'<div class="rkt"><span class="g">SUBIU DE RANK</span><p>“Olhe para trás. Você não é mais quem começou.” <b>Kaien</b></p><span class="note">Suas missões agora rendem ×'+mu+' de XP.</span><button class="cta" onclick="rankClose()">Continuar</button></div></div>'}
let _ovK='';
// Camada por cima do app (#ovr). Módulos novos registram em OVX: {k:()=>chave|'' , v:()=>html, depois:()=>void}.
// A chave muda quando o conteúdo precisa ser redesenhado.
const OVX=[];
function ovSync(){let r=document.getElementById('ovr');if(!r){r=document.createElement('div');r.id='ovr';document.body.appendChild(r)}
 const pvk=S.pvo&&S.pv?'pv'+S.pv.st+'|'+Object.keys(S.pv.ck||{}).filter(i=>S.pv.ck[i]).join(''):'';
 let xo=null,xk='';if(!S.rcv)for(const o of OVX){let kk='';try{kk=o.k()}catch(e){}if(kk){xo=o;xk='x:'+kk;break}}
 const k=S.rcv?'rk'+(S.rcv.replay?'r':''):xk?xk:pvk?pvk:S.scn?'scn':S.rd?'rd'+S.rd.s+S.rd.c:'';if(k===_ovK)return;_ovK=k;
 if(!k){r.style.display='none';r.innerHTML='';return}
 r.style.display='block';
 if(xo){r.innerHTML=xo.v();if(xo.depois)try{xo.depois()}catch(e){console.warn(e)}return}
 const rk=S.rcv?rkI(S.rcv.lvl):0;
 r.innerHTML=k.indexOf('rk')===0?(rk===1?rankDView():Cine.view(S.rcv.lvl)):k.indexOf('pv')===0?pvView():k==='scn'?sceneView():readerView();
 if(k.indexOf('rk')===0&&rk===1){rdSfx();return}
 if(k.indexOf('rk')===0)Cine.start(S.rcv.lvl)}

const TIPS={mis:['Novidades nas missões','Suas missões agora aparecem em blocos: Mente, Treino, Hábito e, às vezes, Surpresa. A Mente vem primeiro, mas você pode fazer na ordem que quiser. Depois de cada exercício, eu pergunto se foi fácil, no ponto ou pesado, e ajusto o próximo treino. Você escolhe o tipo de treino (físico, agilidade ou misto) nos Ajustes, na engrenagem do topo.'],kai:['Novidades na aba Kaien','Aqui ficam as histórias do Kaien, o diário, e os ensinamentos. A confiança dele cresce com o seu nível e com as suas missões. Histórias e falas novas se abrem aos poucos, e o aviso de próximo desbloqueio mostra o que vem.']};
const tipH=k=>(S.tp&&S.tp[k])?'':'<div class="card tipc"><div class="mt"><span class="g">Dica</span><b>'+TIPS[k][0]+'</b></div><p class="note clamp" onclick="this.classList.toggle(\'open\')">'+TIPS[k][1]+'</p><button class="mb on" onclick="tipOk(\''+k+'\')">Entendi</button></div>';
function tipOk(k){S.tp=S.tp||{};S.tp[k]=1;render()}

const IC=p=>'<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';
const ICO={low:IC('<path d="M12 20c-4-2-6-6-5-10 3 1 5 3 5 6 0-3 2-5 5-6 1 4-1 8-5 10z"/><path d="M12 16c-2-2-2-6 0-9 2 3 2 7 0 9z"/><path d="M12 3v1.5M5 5l1 1M19 5l-1 1"/>'),obj:IC('<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>'),hab:IC('<path d="M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 3-6 1 1 2 2 3 2 0-3-1-5 0-7z"/><path d="M12 20a2.5 2.5 0 0 1-2.5-2.5c0-1.5 1.5-2 2.5-3.5 1 1.5 2.5 2 2.5 3.5A2.5 2.5 0 0 1 12 20z"/>'),sur:IC('<path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13"/><path d="M12 7c-2-3-5-3-5-1s3 1 5 1zM12 7c2-3 5-3 5-1s-3 1-5 1z"/>'),rest:IC('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/><path d="M16 4v3M14.5 5.5h3"/>')};
const RKC=['170,176,200','110,165,225','100,210,150','240,190,80','235,95,95','255,240,200'];
function nextUnlockTxt(){if(pvReady()||Prova.pronta())return 'faça a Prova de Ascensão, no Início, para subir de rank';const L=myLvl(),need=costOf(L)-xpInOf(totalXp());return 'faltam '+Math.max(0,need)+' XP para o nível '+(L+1)+(REW[L+1]?' e o prêmio: '+REW[L+1].n:'')}
function celExtra(c){const tot=c.times.reduce((a,x)=>a+x.sec,0),si=streakInfo();let h='<div class="cchips">'+(tot?'<span>Tempo <b>'+fmt(tot)+'</b></span>':'')+'<span>Passos <b>'+c.times.length+'</b></span><span>Treinos seguidos <b>'+si.n+'</b></span></div>';
 if(c.fbs&&c.fbs.length)h+='<div class="cfb"><span class="g">Para o próximo treino</span>'+c.fbs.map(x=>'<p class="note"><b>'+esc(x[0])+':</b> '+esc(x[1])+'</p>').join('')+'</div>';
 return h+'<p class="note cnx">Continue amanhã: <b>'+esc(nextUnlockTxt())+'</b>.</p>'}

const STI={'Força':IC('<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>'),'Resistência':IC('<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M12 8v6M9 11h6"/>'),'Agilidade':IC('<path d="M13 2L5 13h6l-1 9 8-12h-6z"/>'),'Foco':IC('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>'),'Disciplina':IC('<path d="M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 3-6 1 1 2 2 3 2 0-3-1-5 0-7z"/>'),'Calma':IC('<path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0"/>')};
