
const LV=[{n:'Fácil',s:2,m:1,d:'2 séries por exercício. Para recomeçar com calma.'},{n:'Médio',s:3,m:1.5,d:'3 séries por exercício. O caminho do meio.'},{n:'Difícil',s:4,m:2,d:'4 séries por exercício. Mais volume, mais XP.'}];
const pk=a=>a[S.lvl];
const SUP='<button class="lk" onclick="$(\'modal\').classList.add(\'on\')">Ver contatos de apoio</button>';
const CH=n=>({k:'check',name:n});
const TM=(name,min,o)=>Object.assign({k:'timer',name,sec:min*60},o||{});
const SE=(name,sets,target,rest)=>({k:'sets',name,sets,target,rest});
const HM={
'Celular e redes sociais':{t:'Espectro das Notificações',st:()=>[TM('Celular em outro cômodo',pk([20,30,45]),{bg:true}),CH('Anote cada vez que sentiu vontade de pegá-lo')]},
'Jogos':{t:'Monstro dos Jogos',st:()=>[CH('Defina um horário limite antes de começar'),CH('Quando o tempo acabar, pare e anote como se sentiu')]},
'Apostas':{t:'Monstro da Aposta',st:()=>[CH('Anote o que disparou a vontade hoje'),CH('Antes de qualquer impulso, espere 30 min e decida de novo'),CH('Se puder, bloqueie os sites de aposta no celular')]},
'Cigarro ou vape':{t:'Monstro da Fumaça',st:()=>[CH('Anote cada vez que a vontade bater'),CH('Espere 10 min e beba um copo de água antes de decidir')]},
'Álcool':{t:'Rei da Garrafa',st:()=>[CH('Anote o que sentiu antes de cada vontade de beber'),CH('Beba um copo de água antes de decidir, sem meta de parar hoje')]},
'Outra coisa':{t:'Monstro Sem Nome',st:()=>[CH('Anote quando o hábito apareceu e o que você sentia'),CH('Espere 10 min antes de agir e veja o que muda')]}};
const SUR=['Escreva uma frase sobre como você está hoje','Mande uma mensagem de agradecimento a alguém','Arrume algo pequeno que está te incomodando'];
const trustName=p=>{let n=TR[0][1];TR.forEach(a=>{if(p>=a[0])n=a[1]});return n};
const F=()=>S.fast?20:1;
const fmt=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const WPOOL=['casa','rio','lápis','janela','estrada','livro','chave','nuvem','sapato','cadeira','mesa','flor','barco','ponte','vento','luz','relógio','copo','areia','pedra','folha','fogo','lua','sol','trem','porta','mala','bola','rua','mapa','sino','ovo','pão','leite','café','mar','monte','vela','rede','carta','jardim','espelho','caneca','tijolo','escada','panela','tinta','moeda','cesto','praça','chuva','gelo','ferro','tecido','cerca','anel','pente','tapete','forno','lago','ninho'];
function wordsOf(n,r){const o=[],s=(S.day*7+r*13)%WPOOL.length;for(let i=0;i<n;i++)o.push(WPOOL[(s+i*3)%WPOOL.length]);return o.join(', ')}
function calcOf(L,r,cnt){let x=S.day*31+r*17+L*5;const q=()=>{x=(x*1103515245+12345)%2147483648;return x};const o=[];for(let i=0;i<cnt;i++){if(L===0){const a=10+q()%50,b=10+q()%40;o.push(i%2?a+b+' − '+(5+q()%9):a+' + '+b)}else if(L===1){o.push((6+q()%7)+' × '+(6+q()%7))}else{o.push((11+q()%9)+' × '+(6+q()%7)+' + '+(10+q()%40))}}return o.join(' · ')}
const TMODES={fis:'Só físico',agi:'Só agilidade',mix:'Misto'};
const TMD={fis:'Todos os treinos são de força, divididos por músculo.',agi:'Todos os treinos são de agilidade: circuitos de pernas, tronco e cardio.',mix:'Alterna força e agilidade durante a semana.'};
const tmode=()=>(S.tmDay&&S.day<S.tmDay)?(S.tm0||'mix'):(S.tm||'mix');
function setTm(m){const inS=steps[S.i]&&steps[S.i].t==='wdays';if(inS)S.tm=m;else{S.tm0=tmode();S.tm=m;S.tmDay=S.day+1}render()}
const SPL={fis:{2:['L','U'],3:['L','U','F'],4:['U','L','U','L'],5:['P','Q','L','U','L'],6:['P','Q','L','P','Q','L']},
 agi:{2:['aL','aT'],3:['aL','aT','aC'],4:['aL','aT','aC','aL'],5:['aL','aT','aC','aL','aT'],6:['aL','aT','aC','aL','aT','aC']},
 mix:{2:['F','aC'],3:['L','U','aC'],4:['U','aL','L','aT'],5:['P','aL','Q','L','aC'],6:['P','aL','Q','aT','L','aC']}};
function sessType(){const n=Math.min(6,Math.max(2,S.wd.length||3)),w=[...S.wd].sort((a,b)=>a-b),wk=(S.wd0+S.day-1)%7;let k=w.indexOf(wk);if(k<0)k=S.hist.filter(h=>h.train).length%n;return SPL[tmode()][n][k]}
const SLOT={L:['sq','lg','gl','ca','co'],U:['pu','pl','sh','tr','co'],F:['pu','sq','pl','gl','co'],P:['pu','sh','tr','la','co'],Q:['pl','pl2','bi','ra','co']};
const STIT={L:'pernas e glúteos',U:'parte superior',F:'corpo inteiro',P:'empurrar: peito, ombros e tríceps',Q:'puxar: costas e bíceps'};
const ATIT={aL:'pernas e explosão',aT:'tronco e core',aC:'cardio'};
const CHN={
pu:[['Flexão na parede',10,15,'r'],['Flexão com as mãos na mesa firme',8,12,'r'],['Flexão com joelhos no chão',8,12,'r'],['Flexão tradicional',8,12,'r'],['Flexão tradicional com pausa de 2 s embaixo',8,12,'r'],['Flexão com os pés na cadeira',6,12,'r'],['Flexão com os pés na cadeira e descida de 3 s',6,10,'r']],
sq:[['Sentar e levantar da cadeira',10,15,'r'],['Agachamento livre',12,18,'r'],['Agachamento sumô (pernas abertas)',12,18,'r'],['Agachamento com pausa de 2 s embaixo',10,15,'r'],['Agachamento com mochila',10,15,'r'],['Agachamento com mochila e pausa de 2 s',8,12,'r']],
lg:[['Afundo parado, segurando numa cadeira',8,12,'p'],['Afundo alternado',8,12,'p'],['Afundo para trás',8,12,'p'],['Afundo andando',10,14,'p'],['Afundo com mochila',8,12,'p']],
gl:[['Ponte de glúteo',12,18,'r'],['Ponte de glúteo com pausa de 2 s',10,15,'r'],['Ponte de glúteo com uma perna',8,12,'p'],['Ponte de glúteo com os pés no sofá',10,15,'r'],['Ponte de glúteo com mochila no quadril',10,15,'r']],
ca:[['Panturrilha em pé (subir na ponta dos pés)',12,20,'r'],['Panturrilha em pé com descida lenta de 3 s',12,18,'r'],['Panturrilha com um pé só, segurando na parede',10,15,'p'],['Panturrilha no degrau da escada',10,15,'r']],
co:[['Abdominal tradicional',12,20,'r'],['Prancha',20,45,'s'],['Abdominal bicicleta',10,16,'l'],['Prancha lateral (cada lado)',15,40,'s']],
pl:[['Remada curvada com mochila',10,15,'r'],['Remada com um braço e mochila, apoiado na cadeira',10,14,'l'],['Remada curvada com mochila e pausa de 2 s',8,12,'r'],['Remada deitado embaixo da mesa firme',6,12,'r']],
pl2:[['Superman',10,15,'r'],['Superman alternado (braço e perna opostos)',8,12,'l'],['Superman com pausa de 3 s',8,12,'r'],['Superman segurando garrafas',8,12,'r']],
sh:[['Elevação lateral com garrafas',10,15,'r'],['Elevação frontal com garrafas',10,15,'r'],['Desenvolvimento com garrafas (empurrar acima da cabeça)',10,15,'r'],['Desenvolvimento com mochila',8,12,'r']],
la:[['Elevação lateral com garrafas',10,15,'r'],['Elevação lateral com mochila leve',10,15,'r'],['Elevação lateral com pausa de 2 s',8,12,'r']],
tr:[['Flexão fechada com joelhos no chão',8,12,'r'],['Tríceps na cadeira (mergulho)',8,15,'r'],['Flexão fechada',8,12,'r'],['Tríceps francês com garrafa',10,15,'r']],
bi:[['Rosca direta com mochila',10,15,'r'],['Rosca martelo com garrafas',10,15,'r'],['Rosca direta com mochila e descida de 3 s',8,12,'r']],
ra:[['Encolhimento de ombros com mochila',12,18,'r'],['Crucifixo invertido com garrafas',10,15,'r'],['Crucifixo invertido com pausa de 2 s',8,12,'r']]};
const AGT={
aL:[['Marcha no lugar','Passos laterais','Agachamento rápido','Afundo alternado'],['Polichinelo','Afundo alternado','Agachamento rápido','Corrida parada'],['Agachamento com salto','Afundo alternado rápido','Polichinelo','Corrida com joelho alto'],['Agachamento com salto','Pular corda (com ou sem corda)','Burpee sem flexão','Corrida com joelho alto rápida']],
aT:[['Prancha com joelhos no chão','Abdominal tradicional','Escalador lento','Marcha no lugar'],['Escalador','Abdominal bicicleta','Prancha com toque no ombro','Polichinelo'],['Escalador rápido','Burpee','Abdominal bicicleta','Prancha lateral'],['Burpee com flexão','Escalador rápido','Abdominal tesoura','Prancha com toque no ombro']],
aC:[['Marcha no lugar rápida','Polichinelo sem salto','Socos no ar','Corrida parada leve'],['Polichinelo','Corrida parada','Socos no ar rápidos','Pular corda (com ou sem corda)'],['Corrida com joelho alto','Polichinelo','Pular corda (com ou sem corda)','Burpee sem flexão'],['Burpee','Corrida com joelho alto rápida','Pular corda rápido','Escalador rápido']]};
const isAg=id=>id.length===2&&id[0]==='a';
function baseOf(id){const L=S.lvl,a=S.a;if(id==='men')return 0;if(isAg(id))return [0,1,2][L];
 if(id==='pu')return a.flex===0?0:a.flex===1?2:[1,3,4][L];
 if(id==='sq'||id==='lg')return a.breath<=1?0:id==='sq'?[0,1,3][L]:[0,1,2][L];
 if(id==='gl')return [0,2,3][L];if(id==='co')return a.mov<=1?0:[0,1,2][L];
 return [0,1,2][L]}
function exOf(id){S.px=S.px||{};const p=S.px[id]||{v:0,r:0};
 if(id==='men')return{top:p.r>=8,last:true,p};
 if(isAg(id)){const i=Math.max(0,Math.min(3,baseOf(id)+p.v));return{i,top:p.r>=4,last:i>=3,p,W:30+5*Math.min(4,p.r)}}
 const ch=CHN[id],i=Math.max(0,Math.min(ch.length-1,baseOf(id)+p.v)),e=ch[i],stp=e[3]==='s'?5:1,N=Math.min(e[2],e[1]+p.r*stp);return{i,e,N,top:N>=e[2],last:i>=ch.length-1,p}}
const isDl=()=>Math.floor((S.day-1)/7)%4===3;
function applyFb(id,a){S.px=S.px||{};const p=S.px[id]=S.px[id]||{v:0,r:0,l:''},bump=k=>{const x=exOf(id);if(x.top&&!x.last){p.v++;p.r=0;return 'Variação mais forte no próximo treino.'}if(!x.top){p.r+=k;return 'Um pouco mais forte no próximo treino.'}return 'Você já está no máximo deste exercício.'};
 let m='Mantido. Tente uma repetição a mais.';
 if(a==='f'){m=isDl()||S.a.pain>=2?'Semana leve: a carga só sobe depois.':bump(2)}
 else if(a==='o'){if(isDl()||S.a.pain>=2)m='Semana leve: a carga só sobe depois.';else{bump(1);m='Mantido, com um pouco mais de meta.'}}
 else{m='Anotado. Mantemos a carga e você descansa mais.';if(p.l==='h'){m='Voltamos um degrau para você evoluir sem se machucar.';if(p.r>0)p.r=Math.max(0,p.r-2);else if(baseOf(id)+p.v>0)p.v--;}}
 p.l=a==='h'?'h':a;S.px[id]=p;return m}
const tempoOf=()=>pk(['','descida em 2 s','descida em 3 s']);
const UT={r:' repetições',p:' repetições por perna',l:' repetições por lado',s:' segundos',t:' toques'};
function strength(type,ss,rest,dn){
 const WU=TM('Aquecimento: marcha, ombros, quadris, pernas e braços',5),FIN=TM('Finalização: caminhada leve, respiração e alongamento',4);
 const ex=SLOT[type].map(id=>{const x=exOf(id),e=x.e,tp=(e[3]==='r'||e[3]==='p'||e[3]==='l')&&tempoOf()&&!/pausa|lenta|descida/.test(e[0])?' · '+tempoOf():'';return Object.assign(SE(e[0],ss,x.N+UT[e[3]]+tp,rest),{fb:id})});
 const sec=ex.reduce((a,s)=>a+s.sets*(40+s.rest),0);
 return{title:'Treino de força: '+STIT[type],steps:[WU].concat(ex,[FIN]),note:(dn?dn+' ':'')+'Se usar mochila, comece leve e só aumente o peso com a técnica boa. Dor forte ou tontura: pare. Ao fim de cada exercício, conte como foi: o treino ajusta sozinho.',min:Math.round(5+sec/60+4),xp:30}}
function agility(type,ss,dn){
 const id=type,x=exOf(id),mv=AGT[type][x.i],r=pk([45,60,75]),w=x.W;
 return{title:'Treino de agilidade: '+ATIT[type],steps:[TM('Aquecimento: marcha, ombros, quadris e pernas',3),Object.assign(SE('Circuito',ss,'Cada movimento por '+w+' s, sem pausa: '+mv.join(', ')+'. Depois descanse.',r),{fb:id}),TM('Finalização: caminhada leve, respiração e alongamento',3)],note:(dn?dn+' ':'')+'Ao fim do circuito, conte como foi: o treino ajusta sozinho.',min:Math.round(3+ss*(4*w/60+r/60)+3),xp:25}}
function lib(stat,type){
 const L=S.lvl,dl=isDl(),ss=Math.max(2,LV[L].s-(dl?1:0)),light=S.a.pain===3,rest=pk([60,75,90]);
 const dn=dl?'Semana leve: uma série a menos para o corpo recuperar. Isso faz parte do progresso.':'';
 const mo=Math.min(8,((S.px||{}).men||{}).r||0),fbq=s=>{s[s.length-1]=Object.assign({},s[s.length-1],{fb:'men'});return s};
 let o;
 if(stat==='Força'){
  if(light)o={title:'Mobilidade leve',steps:[TM('Alongamento suave',10),TM('Caminhada leve',10)],note:'Treino de força liberado só após avaliação médica.',min:20,xp:30};
  else o=strength(type||'F',ss,rest,dn)}
 else if(stat==='Agilidade'){
  if(light)o={title:'Equilíbrio leve',steps:[TM('Mobilidade de quadril e ombros',5),SE('Equilíbrio em um pé só',3,'20 segundos por perna',20)],note:'Sem impacto até a liberação médica.',min:12,xp:15};
  else o=agility(type||'aC',ss,dn)}
 else if(stat==='Resistência'){const m=light?10:pk([15,20,30]);o={title:'Caminhada firme',steps:[TM('Caminhada em ritmo firme',m)],min:m,xp:15}}
 else if(stat==='Foco'||stat==='Calma'||stat==='Disciplina'){
  const W=q=>({k:'write',name:q,min:pk([10,15,25])}),k0=Math.floor(S.day/3),ns=Math.max(2,LV[L].s),n=pk([2,3,4])+(mo>=3?1:0),ib=pk([1,2,2]),br=TM('Respire fundo e fique em silêncio. Deixe os pensamentos baixarem.',ib,{breath:true});
  const mk=(title,qs,pre,bre)=>{const q=qs.slice(0,Math.min(qs.length,n)),st=(bre?[br]:[]).concat(pre||[],q.map(W));return{title,steps:fbq(st),min:(bre?ib:0)+q.length*pk([2,3,4])+(pre&&pre.length?2:0),xp:15}};
  const QD=['O que mais ocupou a sua cabeça hoje, e por quê?','Quando você se sentiu mais você esta semana?','O que você anda evitando sentir ou decidir?','Do que você sente falta de fazer?','Que pensamento se repete e não te ajuda? Como você responderia a ele?','O que te deixaria orgulhoso de si ao fim da semana?','O que você diria a um amigo que estivesse no seu lugar?','Em que situação você reage mal e gostaria de reagir melhor?','O que o seu eu de daqui a 5 anos agradeceria que você fizesse hoje?','Quem você admira e que qualidade dessa pessoa quer cultivar?','O que você faz para se distrair de algo importante?','Quando foi a última vez que você descansou de verdade?'];
  const PS=['Hábitos não são destruídos pela força de vontade de um dia. Eles perdem o poder quando a pessoa percebe o momento exato em que a vontade aparece e escolhe, mesmo que devagar, outra resposta. Cada escolha diferente enfraquece o caminho antigo e fortalece um novo, como uma trilha que, usada todos os dias, vira estrada.','Descansar não é o oposto de evoluir. O corpo e a mente se reorganizam nas pausas: é ali que o esforço vira força. Quem nunca para costuma desistir de uma vez; quem aprende a pausar volta no dia seguinte.','Uma meta grande assusta porque parece distante. Uma meta pequena, repetida, muda a pessoa sem que ela perceba. Em um mês, vinte minutos por dia somam mais de dez horas de prática, e o que parecia impossível vira rotina.'];
  if(stat==='Foco'){const k=k0%6;
   if(k===0)o=mk('Planejamento estratégico',['Qual objetivo você quer alcançar nos próximos 30 dias? Seja específico.','Quebre esse objetivo em 3 passos concretos, do menor para o maior.','Qual é o obstáculo mais provável? Escreva: Se acontecer X, então eu faço Y.','Qual é o primeiro passo que cabe em 10 minutos hoje? Faça agora, se puder.'],null,true);
   else if(k===1)o=mk('Decisão difícil',['Qual decisão você está adiando ou que pesa para você?','Escreva pelo menos 2 prós e 2 contras.','O que a sua melhor versão escolheria? Por quê?','Qual é o menor passo para testar essa escolha, sem se comprometer de vez?'],null,true);
   else if(k===2)o=mk('Argumentar o contrário',['Escolha uma crença sua e escreva em uma frase.','Agora defenda o contrário com os melhores argumentos que conseguir.','O que você aprendeu ao fazer isso? Algo mudou na sua opinião?','Como você pode ouvir melhor quem pensa diferente de você?'],null,true);
   else if(k===3)o=mk('Leitura analítica',['Qual é a ideia central do texto, em uma frase?','Você concorda? Por quê?','Como isso se aplica à sua vida agora?','Qual ação concreta nasce dessa ideia?'],[CH('Leia com calma, uma ou duas vezes, sem celular por perto: '+PS[S.day%PS.length])],false);
   else if(k===4)o={title:'Cálculo de cabeça',steps:fbq(Array.from({length:ns},(_,i)=>CH('Rodada '+(i+1)+' de '+ns+', sem calculadora nem papel: '+calcOf(Math.min(2,L+Math.floor(mo/3)),i,3+Math.min(3,mo))))),min:Math.round(ns*1.5),xp:15};
   else{const nw=Math.min(24,pk([5,10,15])+2*mo);o={title:'Memória de palavras',steps:fbq(Array.from({length:ns},(_,i)=>CH('Rodada '+(i+1)+' de '+ns+': leia por 30 segundos, cubra e escreva as que lembrar. Palavras: '+wordsOf(nw,i)))),min:Math.round(ns*1.5),xp:15}}}
  else if(stat==='Calma'){const k=k0%4;
   if(k===0)o=mk('Diário do dia',['Como você está se sentindo agora, de verdade? Escreva sem se corrigir.',QD[S.day%QD.length],'O que você faria diferente se esse dia se repetisse?','O que isso diz sobre quem você está se tornando?'],null,true);
   else if(k===1)o=mk('Gratidão e conquistas',['Escreva 3 coisas que deram certo hoje ou esta semana, mesmo pequenas.','Para cada uma: o que VOCÊ fez para ela acontecer?','Quem ajudou você, e como pode agradecer?','Qual dessas conquistas você quer repetir amanhã?'],null,true);
   else if(k===2)o=mk('Carta para o eu de amanhã',['Escreva uma carta curta para você de amanhã: o que ele precisa ouvir?','Qual é a única coisa que você promete a ele?','O que pode atrapalhar essa promessa, e como você se protege disso?','Como você quer se sentir amanhã à noite?'],null,true);
   else o=mk('Valores',['Escolha 3 valores que importam para você (ex.: família, saúde, honestidade).','Como cada um apareceu no seu dia?','Qual valor você deixou de lado? O que o traria de volta?','Que atitude pequena hoje honra o seu valor mais importante?'],null,true)}
  else{const k=k0%4;
   if(k===0)o=mk('Revisão da semana',['O que funcionou nesta semana?','O que travou? Seja honesto, sem se culpar.','Qual é a decisão para a próxima semana?','O que você vai fazer diferente no primeiro dia?'],null,true);
   else if(k===1)o=mk('Mapa de gatilhos',['Descreva a última situação em que você cedeu ou quase cedeu ao seu hábito.','O que você sentia antes? Anote emoção, lugar e hora.','Escreva: Quando X acontecer, eu vou fazer Y.','Quem ou o que pode ajudar você nesse momento?'],null,true);
   else if(k===2)o=mk('Compromisso da semana',['Qual é o seu compromisso mais importante para esta semana?','Por que ele importa? Escreva as suas razões.','Quando exatamente você vai cumpri-lo? Dia, hora e lugar.','O que pode atrapalhar, e qual é o plano B?'],null,true);
   else o=mk('Tarefa no horário',['Qual tarefa você vem adiando? Escolha uma só.','Que horário você vai fazer? Escreva dia e hora.','Qual é o primeiro passo de 10 minutos?','Como você vai se lembrar e se proteger de distrações?'],[CH('Deixe o espaço pronto e o celular longe antes de começar.')],true)}}
 else o={title:'Respiração lenta',steps:fbq([TM('Respiração: inspire 4 s, solte 6 s',pk([5,8,10]),{breath:true})]),min:pk([5,8,10]),xp:15};
 return Object.assign(o,{stat})}
const WDN=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];