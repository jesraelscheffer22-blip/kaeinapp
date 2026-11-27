/* ===== Bot de teste (só quando o build é feito com --bot ou na variante de teste) =====
   Botão 🤖 flutuante: faz missões, água, sono, mandamentos, chefe errante e dungeons com 1 clique,
   avança o dia, passa nas provas e sobe de nível. NÃO deve ir para a versão publicada. */
const Bot={
 aberto:0,
 // conclui um andar da dungeon D pelo modo guiado (respeita a lógica real do jogo)
 andar(D){const i=D.fl.findIndex(f=>!f);if(i<0)return;S.dg=D;S.floorDay=-1;startGuide('dg'+i,i);let n=0;while(S.g&&n++<400){const g=S.g,st=curStep();if(g.ph==='fb'){gFb('o');continue}if(g.ph==='rest'){gRestSkip();continue}if(st.k==='sets'){gSetDone();continue}if(st.k==='timer'){g.fin=true;finishStep();continue}if(st.k==='write'){g.note='Feito pelo bot de teste.';finishStep();continue}finishStep()}S.cel=null},
 // tudo do dia: missões, água, sono, mandamentos, chefe errante, desafio da torre, um andar em cada dungeon aberta
 hoje(silencio){const C=calcXp();C.ms.forEach(m=>{if(!(S.ms[m.key]&&S.ms[m.key].st==='done'))S.ms[m.key]={st:'done',times:[]}});if(!S.noWater)S.cups=Math.max(S.cups||0,C.wp.cups);
  if(slpOpen())slpSet(3);(S.mand||[]).forEach(m=>{m.d=m.d||{};if(!m.d[S.day]){m.d[S.day]=1;S.xpPrev+=2}});
  const t=Errante.est();if(t&&!t.won){ERR.find(e=>e.id===t.id).ch.forEach((_,i)=>t.ck[i]=1);Errante.checar()}
  try{const tw=Torre.est();if(tw.h&&liberado('torre')&&tw.dd!==S.day){Torre.subir()}}catch(e){}Object.values(S.dgAll||{}).filter(D=>!D.won).forEach(D=>Bot.andar(D));S.floorDay=S.day;
  if(!silencio){S.botMsg='Dia '+S.day+' completo: missões, água, sono e um andar em cada dungeon aberta.';S.top=true;render()}},
 avancar(){Bot.hoje(1);nextDay();S.splashDay=S.day;S.botMsg='Avançou para o dia '+S.day+'.';S.top=true;render()},
 semana(){for(let i=0;i<7;i++){Bot.hoje(1);nextDay()}S.splashDay=S.day;S.botMsg='7 dias completos. Agora é o dia '+S.day+'.';S.top=true;render()},
 dungeons(){let n=0;Object.values(S.dgAll||{}).filter(D=>!D.won).forEach(D=>{while(!D.won&&D.fl.some(f=>!f)){Bot.andar(D);n++}});S.floorDay=S.day;S.dgList=1;S.botMsg=n?n+' andares vencidos em todas as dungeons abertas.':'Nenhuma dungeon aberta. Abra uma na aba Desafio.';S.top=true;render()},
 prova(){if(pvReady()){pvPass();S.botMsg='Prova do rank D aprovada.'}else{const g=Prova.pendente();if(g){S[PROVAX[g].k]=1;S.pvx=null;S.botMsg='Prova do rank '+PROVAX[g].R+' aprovada.'}else S.botMsg='Nenhuma prova pendente agora.'}S.top=true;render()},
 nivel(){const L=myLvl(),x=totalXp(),falta=cum(L+1)-x;if(pvReady()||Prova.pronta()){Bot.prova();return}S.xpPrev+=Math.max(1,falta);S.botMsg='XP adicionado para o nível '+(L+1)+'.';S.top=true;render()},
 errante(){for(let i=0;i<7&&!Errante.ehDia();i++){Bot.hoje(1);nextDay()}S.splashDay=S.day;setTab('dun');S.dsub='c';S.botMsg='Hoje tem Chefe Errante: '+Errante.hoje().n+'.';render()},
 painel(){return '<div class="botp"><div class="mt"><span class="g">🤖 Bot de teste</span><b>Dia '+S.day+' · nível '+myLvl()+'</b></div>'+(S.botMsg?'<p class="note">'+esc(S.botMsg)+'</p>':'')
  +'<button class="mb on" onclick="Bot.avancar()">Fazer tudo e avançar o dia</button>'
  +'<button class="mb" onclick="Bot.hoje()">Fazer tudo hoje (sem avançar)</button>'
  +'<button class="mb" onclick="Bot.dungeons()">Vencer todas as dungeons abertas</button>'
  +'<button class="mb" onclick="Bot.semana()">Avançar 7 dias fazendo tudo</button>'
  +'<button class="mb" onclick="Bot.errante()">Ir até o próximo Chefe Errante</button>'
  +'<button class="mb" onclick="Bot.prova()">Passar na prova pendente</button>'
  +'<button class="mb" onclick="Bot.nivel()">Subir 1 nível</button>'
  +'<button class="lk" onclick="Bot.aberto=0;Bot.sync()">Fechar</button></div>'},
 sync(){if(!KAIEN_BOT)return;let b=document.getElementById('botb');const dia=steps[S.i]&&steps[S.i].t==='day1'&&_ab&&!S.lu&&!S.cel&&!S.g&&!S.rcv;
  if(!dia){if(b)b.remove();const p=document.getElementById('botw');if(p)p.remove();return}
  if(!b){b=document.createElement('button');b.id='botb';b.textContent='🤖';b.setAttribute('aria-label','Bot de teste');b.onclick=()=>{Bot.aberto=!Bot.aberto;Bot.sync()};document.getElementById('app').appendChild(b)}
  let w=document.getElementById('botw');if(Bot.aberto){if(!w){w=document.createElement('div');w.id='botw';document.getElementById('app').appendChild(w)}w.innerHTML=Bot.painel()}else if(w)w.remove()}
};
AFTER_RENDER.push(()=>Bot.sync());
