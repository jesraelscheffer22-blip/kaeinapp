
function dgMig(){S.dgAll=S.dgAll||{};if(S.dg&&!S.dgAll[S.dg.habit]){const h=S.dg.habit;if(S.dg.max==null){S.dg.max=maxHp(h);S.dg.hp=S.dg.max}S.dgAll[h]=S.dg}}
function enterDg(h,ph,rp){dgMig();ph=ph||1;rp=rp?1:0;if(!dgGate(h))return;const E=S.dgAll[h];if(!E||E.won){if(dgActiveN()>=3){S.dgMsg='Você já tem 3 dungeons abertas. Termine uma ou desista de uma para abrir outra.';S.dgCf=null;S.top=true;render();return}if(E)dgBank(h);const mx=maxHp(h);S.dgAll[h]={start:S.day,habit:h,fl:[null,null,null,null,null],last:null,max:mx,hp:mx,ph:ph,rp:rp,nx:(S.dgNx&&S.dgNx[dgK(h,ph,rp)])||0}}S.dgCf=null;S.dg=S.dgAll[h];S.dgMsg='Dungeon aberta: '+DGH[h].m+'. Toque em Continuar quando quiser entrar.';S.dgList=1;S.dsub='d';S.top=true;render()}
const dgK=(h,ph,rp)=>h+(rp?'#r':'#')+(ph||1);
const dgMul=(D,i)=>(D.ph===2?1.5:1)*(D.rp?.5:1)*(i<(D.nx||0)?0:1);
const dgActiveN=()=>Object.values(S.dgAll||{}).filter(x=>!x.won).length;
function dgBank(h){const D=S.dgAll&&S.dgAll[h];if(D)S.xpPrev+=D.fl.reduce((a,f)=>a+(f?f.xp:0),0)}
function dgAskEnter(h,ph,rp){S.dgCf={h:h,ph:ph||1,rp:rp?1:0};S.dgMsg='';S.top=true;render()}
function dgNoEnter(){S.dgCf=null;S.top=false;render()}
function dgYesEnter(){const c=S.dgCf;if(!c)return;enterDg(c.h,c.ph,c.rp)}
function dgPause(){S.dgAsk=0;dgList()}
const dgFixed=()=>(S.pull||[]).filter(h=>DGH[h]);
const dgGate=h=>h!=='O Espelho';
const DGROT=['Procrastinação','Sono ruim','Celular e redes sociais','Jogos','Outra coisa','Apostas','Cigarro ou vape','Álcool'];
const dgPool=()=>{const fx=dgFixed();return DGROT.filter(h=>DGH[h]&&!fx.includes(h)&&(h!=='O Espelho'||myLvl()>=7))};
function dgPick(){const P=dgPool(),n=P.length;S.dgRi=S.dgRi||0;let h=null;for(let k=0;k<n;k++){const c=P[(S.dgRi+k)%n];if(!(S.dgAll&&S.dgAll[c])){h=c;S.dgRi=(S.dgRi+k)%n;break}}S.dgRot={day:S.day,h:h}}
function dgRotUpd(){if(!S.dgRot||S.dgRot.day!==S.day)dgPick()}
function dgVis(){dgRotUpd();const a=[];const add=h=>{if(h&&DGH[h]&&a.indexOf(h)<0&&dgGate(h))a.push(h)};dgFixed().forEach(add);Object.keys(S.dgAll||{}).forEach(add);add(S.dgRot&&S.dgRot.h);return a}
function dgOpen(h){S.dg=S.dgAll[h];S.dgList=0;S.dgMsg='';if(!(S.bossSeen&&S.bossSeen[h]))biStart(h);S.top=true;render()}
function dgList(){S.dgList=1;S.top=true;render()}
function dgBack(){S.dgList=0;S.top=true;render()}
function dgExit(){S.dgAsk=1;S.top=false;render()}
function dgCancel(){S.dgAsk=0;S.top=false;render()}
function dgLeave(){const D=S.dg,h=D.habit;S.xpPrev+=D.fl.reduce((a,f)=>a+(f?f.xp:0),0);const c=D.fl.filter(Boolean).length;S.dgHist.push({cleared:c,left:1});S.dgNx=S.dgNx||{};const k=dgK(h,D.ph,D.rp),nx=Math.max(S.dgNx[k]||0,c,D.nx||0);S.dgNx[k]=nx;delete S.dgAll[h];S.dg=null;S.dgAsk=0;S.dgList=0;S.dgMsg='Você desistiu de '+DGH[h].m+'. O XP ganho ficou salvo.'+(nx?' Se voltar a ele, o monstro começa com a vida cheia e os andares até o '+nx+'º não darão XP.':' Se voltar a ele, o monstro começa com a vida cheia.');S.top=true;render()}
function gRec(){S.dgRecDay=S.day;completeMission('rec',null)}
function dgRoll(){}
function dgRoll2(){const p=S.dgRot&&S.dgRot.h;if(p&&!(S.dgAll&&S.dgAll[p]))S.dgMiss={h:p,day:S.day};else S.dgMiss=null;S.dgRi=(S.dgRi||0)+1;dgPick()}
const dgEst=st=>Math.round(st.reduce((a,x)=>a+(x.k==='timer'?x.sec/60:x.k==='sets'?x.sets*(1.2+(x.rest||0)/60):1),0)/5)*5;