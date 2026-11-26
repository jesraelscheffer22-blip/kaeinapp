/* ===== Práticas: Retiro, Meditação, Kata, Mandamentos, Torneio Silencioso, Diário do Discípulo ===== */

// ---------- Apoio em crise (usado no Diário e no Espelho) ----------
// Detecção simples por palavras, sem IA e sem rede. Nunca bloqueia: só oferece apoio com gentileza.
const Apoio={
 RX:/(me matar|suic[ií]d|n[aã]o quero mais viver|n[aã]o aguento mais viver|acabar com (a )?minha vida|tirar (a )?minha vida|me machucar de prop[oó]sito|quero sumir pra sempre|melhor (eu )?n[aã]o existir)/i,
 risco:t=>Apoio.RX.test(String(t||'')),
 card(){return '<div class="card apc"><span class="g">Kaien</span><b>Obrigado por confiar isso a mim.</b><p class="note">O que você escreveu parece muito pesado. Você não precisa carregar sozinho. Se puder, fale agora com alguém: o <b>CVV atende pelo 188</b>, de graça, 24 horas. Também há chat em cvv.org.br (confira o horário no site). Em perigo imediato, ligue <b>192 (SAMU)</b>.</p><p class="note">Eu continuo aqui. Nada no caminho se perde por você parar para se cuidar.</p></div>'}
};

// ---------- Retiro (B6): modo descanso consciente, disponível desde o início ----------
const Retiro={
 ativo(){const r=S.ret;return !!(r&&S.day>=r.de&&S.day<=r.ate)},
 iniciar(n){const feito=Object.values(S.ms).some(x=>x.st==='done');const de=feito?S.day+1:S.day;S.ret={de,ate:de+n-1};S.retN=(S.retN||0)+1;S.top=true;render()},
 encerrar(){if(!S.ret)return;if(S.ret.de>S.day)S.ret=null;else S.ret.ate=S.day-1;S.top=true;render()},
 v(){const r=S.ret,on=Retiro.ativo(),fut=r&&r.de>S.day;
  let h='<div class="card"><span class="g">Kaien</span><p>“Doente, viajando, exausto? Descansar também é treino. No Retiro, as missões viram só respirar e beber água. Nada se perde: o XP fica, a sequência não quebra e os dias de retiro aparecem em outra cor, nunca como falha.”</p></div>';
  if(on||fut)h+='<div class="card"><div class="mt"><span class="g">Retiro ativo</span><b>'+(fut?'Começa amanhã':'Até o dia '+r.ate+' do caminho')+'</b></div><p class="note">'+(fut?'Hoje você já fez missões, então o retiro começa amanhã para não perder nada.':'Faltam '+(r.ate-S.day+1)+' dia(s). Se melhorar antes, pode encerrar.')+'</p><button class="mb" onclick="Retiro.encerrar()">Encerrar o retiro</button></div>';
  else h+='<div class="card"><div class="mt"><span class="g">Começar um retiro</span><b>Por quantos dias?</b></div><div class="lvs">'+[1,2,3,5,7].map(n=>'<button class="mb on" onclick="Retiro.iniciar('+n+')">'+n+(n===1?' dia':' dias')+'</button>').join('')+'</div><p class="note">Se estiver doente, com dor forte ou sintomas que preocupam, procure um serviço de saúde. O app não substitui atendimento.</p></div>';
  return h}
};
TELAS.retiro={t:'Retiro',v:()=>Retiro.v()};
PLAN_MODS.push(ms=>{if(!Retiro.ativo())return ms;return [{stat:'Calma',tag:'Retiro',key:'low',title:'Respirar e beber água',steps:[TM('Respiração lenta: inspire 4 s, solte 6 s, sem prender o ar',3,{breath:true}),CH('Beba um copo de água com calma')],min:4,xp:15,ret:1}]});
INI_CARDS.unshift(()=>Retiro.ativo()?'<div class="card retc"><span class="g">Retiro</span><b>Hoje é dia de descanso consciente</b><p class="note">Só respirar e beber água. O resto espera por você, sem perder nada.</p><button class="lk" onclick="telaAbrir(\'retiro\')">Ver o retiro</button></div>':'');

// ---------- Meditação do Amanhecer / Anoitecer (B1) ----------
const Med={
 nome(){const h=new Date().getHours();return h<15?'Meditação do Amanhecer':'Meditação do Anoitecer'},
 podeTrocar(){return !(S.ms.low&&S.ms.low.st)&&!Retiro.ativo()},
 comecar(min){if(!Med.podeTrocar())return;S.med={day:S.day,min};startGuide('low')},
 v(){const ok=Med.podeTrocar();return tutH('med','Meditação','Uma respiração guiada que substitui a missão de Mente do dia. O círculo de tinta cresce quando você inspira e encolhe quando solta.')
  +'<div class="card"><div class="mt"><span class="g">'+Med.nome()+'</span><b>Respiração guiada</b></div><p class="note">Inspire pelo nariz por 4 segundos e solte devagar por 6, sem prender o ar e sem forçar. Se sentir tontura, volte a respirar normalmente e pare.</p>'
  +(ok?'<div class="lvs">'+[1,3,5].map(m=>'<button class="mb on" onclick="Med.comecar('+m+')">'+m+' min</button>').join('')+'</div><p class="note">Vale como a missão de Mente de hoje.</p>':'<p class="note">'+(Retiro.ativo()?'No retiro, a respiração já é a sua missão de hoje.':'A missão de Mente de hoje já foi feita ou começou. Volte amanhã para meditar valendo a missão.')+'</p>')+'</div>'}
};
TELAS.med={t:'Meditação',v:()=>Med.v()};
PLAN_MODS.push(ms=>{const m=S.med;if(!m||m.day!==S.day||Retiro.ativo())return ms;return ms.map(x=>x.key!=='low'?x:{stat:'Calma',tag:'Mente',key:'low',title:m.ret?'Um minuto para recomeçar':Med.nome(),steps:[TM('Respire: inspire 4 s, solte 6 s. Se sentir tontura, volte a respirar normalmente.',m.min,{breath:true})],min:m.min,xp:15,med:1})});
MDONE.push((m,st)=>{if(m.med&&st==='done')S.medN=(S.medN||0)+1});

// ---------- Treino Kata (B2) ----------
// Movimentos com nome murim, ligados a exercícios seguros sem equipamento obrigatório.
// [nome murim, exercício por nível [Fácil, Médio, Difícil], versão mais leve, alvo por nível, unidade]
const KATAS=[
 {id:'cav',n:'Kata do Cavaleiro',st:'Força',d:'Pernas firmes como raiz.',mv:[['Postura do Cavaleiro',['Sentar e levantar da cadeira','Agachamento livre','Agachamento com pausa de 2 s embaixo'],'Sentar e levantar da cadeira, só até onde for confortável',[10,12,12],' repetições'],['Passo da Garça',['Afundo parado, segurando numa cadeira','Afundo alternado','Afundo para trás'],'Passo para trás curto, segurando numa cadeira',[6,8,10],' por perna'],['Raiz da Montanha',['Ponte de glúteo','Ponte de glúteo com pausa de 2 s','Ponte de glúteo com uma perna'],'Ponte de glúteo curta',[10,12,10],' repetições'],['Pés de Pluma',['Panturrilha em pé','Panturrilha com descida lenta de 3 s','Panturrilha com um pé só'],'Panturrilha em pé, devagar',[12,15,12],' repetições']]},
 {id:'tig',n:'Kata do Tigre',st:'Força',d:'Empurrar com controle.',mv:[['Garra do Tigre',['Flexão com as mãos na mesa firme','Flexão com joelhos no chão','Flexão tradicional'],'Flexão na parede',[8,10,10],' repetições'],['Asas da Garça',['Elevação lateral com garrafas','Elevação lateral com garrafas','Elevação lateral com mochila leve'],'Elevação lateral sem peso',[10,12,12],' repetições'],['Muralha de Pedra',['Prancha com joelhos no chão','Prancha','Prancha'],'Prancha com joelhos, curta',[20,30,40],' segundos'],['Tigre que Volta',['Superman','Superman com pausa de 3 s','Superman alternado'],'Superman curto',[8,10,10],' repetições']]},
 {id:'dra',n:'Kata do Dragão',st:'Agilidade',d:'Centro forte, movimento solto.',mv:[['Dragão Adormecido',['Abdominal tradicional','Abdominal tradicional','Abdominal bicicleta'],'Abdominal curto, só tirando os ombros do chão',[10,12,12],' repetições'],['Muralha de Pedra',['Prancha com joelhos no chão','Prancha','Prancha com toque no ombro'],'Prancha com joelhos, curta',[20,30,12],' segundos'],['Cauda do Dragão',['Ponte de glúteo','Abdominal tesoura','Abdominal bicicleta'],'Ponte de glúteo curta',[10,8,20],' repetições'],['Escamas ao Vento',['Rotação de tronco em pé','Escalador lento','Escalador'],'Rotação de tronco em pé',[10,12,16],' repetições']]},
 {id:'ven',n:'Kata do Vento',st:'Agilidade',d:'Leveza e fôlego, sem pressa.',mv:[['Passos do Vento',['Marcha no lugar','Marcha acelerada','Corrida parada leve'],'Marcha no lugar, devagar',[40,40,40],' segundos'],['Dança da Garça',['Passos laterais','Passos laterais rápidos','Corrida lateral'],'Passos laterais lentos',[30,40,40],' segundos'],['Vento Leste',['Polichinelo sem salto','Polichinelo','Polichinelo'],'Polichinelo sem salto, braços até o ombro',[20,30,40],' segundos'],['Folha que Cai',['Agachamento rápido sem salto','Agachamento rápido','Agachamento rápido'],'Sentar e levantar da cadeira',[30,30,40],' segundos']]},
 {id:'agu',n:'Kata da Água',st:'Calma',d:'Mobilidade e calma. Boa para dias de corpo cansado.',mv:[['Rio Calmo',['Círculos lentos com os ombros','Círculos lentos com os ombros','Círculos lentos com os ombros'],'Círculos de ombro sentados',[10,12,15],' repetições'],['Bambu ao Vento',['Rotação suave do tronco em pé','Rotação suave do tronco em pé','Rotação suave do tronco em pé'],'Rotação do tronco sentado',[10,10,12],' por lado'],['Lótus Aberta',['Alongamento de quadril sentado','Alongamento de quadril sentado','Alongamento de quadril sentado'],'Alongamento de quadril sentado, suave',[30,40,45],' segundos'],['Lua na Água',['Respiração lenta em pé','Respiração lenta em pé','Respiração lenta em pé'],'Respiração lenta sentado',[60,60,90],' segundos']]},
 {id:'mon',n:'Kata da Montanha',st:'Resistência',d:'O corpo inteiro, em equilíbrio.',mv:[['Postura do Cavaleiro',['Sentar e levantar da cadeira','Agachamento livre','Agachamento com pausa de 2 s'],'Sentar e levantar da cadeira',[10,12,12],' repetições'],['Garra do Tigre',['Flexão com as mãos na mesa firme','Flexão com joelhos no chão','Flexão tradicional'],'Flexão na parede',[8,10,10],' repetições'],['Raiz da Montanha',['Ponte de glúteo','Ponte de glúteo com pausa de 2 s','Ponte de glúteo com uma perna'],'Ponte de glúteo curta',[10,12,10],' repetições'],['Muralha de Pedra',['Prancha com joelhos no chão','Prancha','Prancha'],'Prancha com joelhos, curta',[20,30,40],' segundos']]}];
const Kata={
 dor(){return (S.a&&S.a.pain)||0},
 // dor 3: só a Kata da Água. Dor 2: no máximo o nível Médio (o app já limita S.lvl).
 permitido(k){return Kata.dor()<3||k.id==='agu'},
 nivel(){return Math.min(S.lvl||0,Kata.dor()>=2?1:2)},
 sessao(k,leve){const L=leve?0:Kata.nivel(),ss=leve?2:Math.max(2,LV[L].s),rest=[45,60,75][L];
  const steps=[TM('Aquecimento: marcha, ombros, quadris e pernas',4)].concat(k.mv.map(m=>SE(m[0]+': '+(leve?m[2]:m[1][L]),ss,(leve?m[3][0]:m[3][L])+m[4],rest)),[TM('Finalização: caminhada leve e respiração',3)]);
  return {stat:k.st,tag:'Treino',key:'obj',title:k.n+(leve?' · versão leve':''),steps,note:'Pare se sentir dor, tontura ou falta de ar. Faça no seu ritmo, com controle.',min:Math.round(7+k.mv.length*ss*(0.8+rest/60)),xp:30,kata:k.id}},
 podeHoje(){return isTrain(S.day)&&!(S.ms.obj&&S.ms.obj.st)&&!Retiro.ativo()},
 treinar(id){const k=KATAS.find(x=>x.id===id);if(!k||!Kata.permitido(k)||!Kata.podeHoje())return;S.kata={day:S.day,id,leve:!!S.kataLeve};startGuide('obj')},
 v(){const ok=Kata.podeHoje(),L=Kata.nivel();
  return tutH('kata','Treino Kata','Uma sequência de movimentos com nome de escola antiga. Ela substitui o treino do dia e segue as mesmas regras de dor e de nível. Sem equipamento obrigatório.')
  +'<div class="card"><p class="note">Nível dos katas: <b>'+LV[L].n+'</b>'+(Kata.dor()>=2?' (limitado pela dor que você informou)':'')+'.</p><label class="note" style="display:flex;gap:8px;align-items:center"><input type="checkbox" style="width:auto" '+(S.kataLeve?'checked':'')+' onchange="S.kataLeve=this.checked;render()">Usar a versão mais leve de cada movimento</label>'+(ok?'':'<p class="note">'+(Retiro.ativo()?'No retiro, sem treino.':!isTrain(S.day)?'Hoje é dia de descanso. O kata fica para o próximo dia de treino.':'O treino de hoje já foi feito ou começou.')+'</p>')+'</div>'
  +KATAS.map(k=>{const per=Kata.permitido(k);return '<div class="card'+(per?'':' lk2')+'"><div class="mt"><span class="g">'+esc(k.st)+'</span><b>'+esc(k.n)+'</b></div><p class="note">'+esc(k.d)+'</p><ul class="ktl">'+k.mv.map(m=>'<li><b>'+esc(m[0])+'</b> · '+esc(S.kataLeve?m[2]:m[1][L])+'</li>').join('')+'</ul>'+(per?(ok?'<button class="mb on" onclick="Kata.treinar(\''+k.id+'\')">Treinar hoje</button>':''):'<p class="note">Com lesão que limita, só a Kata da Água, até você ter liberação.</p>')+'</div>'}).join('')}
};
TELAS.kata={t:'Treino Kata',v:()=>Kata.v()};
PLAN_MODS.push(ms=>{const c=S.kata;if(!c||c.day!==S.day||!isTrain(S.day)||Retiro.ativo())return ms;const k=KATAS.find(x=>x.id===c.id);if(!k||!Kata.permitido(k))return ms;return ms.map(x=>x.key==='obj'?Kata.sessao(k,c.leve):x)});
MDONE.push((m,st)=>{if(m.kata&&st==='done')S.kataN=(S.kataN||0)+1});

// ---------- Mandamentos (B3) ----------
// Até 3 metas pessoais, marcadas por dia. Conta "dias cumpridos" (nunca zera). Selos em 7, 21 e 66 dias.
const MANDS=['Dormir antes das 23h','Beber um copo de água ao acordar','Deixar o celular fora do quarto à noite','Caminhar 10 minutos','Comer uma refeição sem tela','Ler 10 páginas','Agradecer por uma coisa antes de dormir','Arrumar a cama ao levantar'];
const Mand={
 lista(){return S.mand=S.mand||[]},
 dias(m){return Object.keys(m.d||{}).length},
 maxDias(){return Mand.lista().reduce((a,m)=>Math.max(a,Mand.dias(m)),0)},
 selos(m){const n=Mand.dias(m);return [7,21,66].filter(x=>n>=x)},
 criar(t){t=Seg.texto(t,60);if(!t||Mand.lista().length>=3)return;S.mand.push({id:Date.now(),t,d:{},c:S.day});S.top=false;render()},
 apagar(id){if(S.mdel!==id){S.mdel=id;render();setTimeout(()=>{if(S.mdel===id){S.mdel=null;render()}},4000);return}S.mand=Mand.lista().filter(m=>m.id!==id);S.mdel=null;render()},
 marcar(id){const m=Mand.lista().find(x=>x.id===id);if(!m)return;m.d=m.d||{};if(m.d[S.day]){delete m.d[S.day];S.xpPrev-=2}else{m.d[S.day]=1;S.xpPrev+=2;try{Som.pincel()}catch(e){}const n=Mand.dias(m);if([7,21,66].includes(n)){S.mselo={t:m.t,n};try{Som.selo()}catch(e){}}}S.top=false;render()},
 seloH(n){return '<i class="mselo s'+n+'">'+n+'</i>'},
 card(){if(!liberado('mandamentos'))return '';const L=Mand.lista();if(!L.length)return '';
  return '<div class="card"><div class="mt"><span class="g">Mandamentos de hoje</span><b>'+L.filter(m=>m.d&&m.d[S.day]).length+' de '+L.length+'</b></div>'+(S.mselo?'<p class="pvs">Selo de '+S.mselo.n+' dias: “'+esc(S.mselo.t)+'”. Isso é hábito criando raiz.</p>':'')+L.map(m=>'<button class="pvk mdk'+(m.d&&m.d[S.day]?' on':'')+'" onclick="Mand.marcar('+m.id+')"><i>'+(m.d&&m.d[S.day]?'✓':'')+'</i><span>'+esc(m.t)+'<small>'+Mand.dias(m)+' dias cumpridos '+Mand.selos(m).map(Mand.seloH).join('')+'</small></span></button>').join('')+'<p class="note">+2 XP por mandamento marcado.</p></div>'},
 v(){const L=Mand.lista();S.mselo=null;
  return tutH('mand','Mandamentos','Até 3 metas suas, para marcar todo dia. Conta os dias cumpridos, nunca a sequência perdida. Com 7, 21 e 66 dias, você ganha selos. Os 66 dias são uma curiosidade sobre formação de hábitos, não uma promessa.')
  +L.map(m=>'<div class="card"><div class="mt"><span class="g">Desde o dia '+m.c+'</span><b>'+esc(m.t)+'</b></div><p class="note">'+Mand.dias(m)+' dias cumpridos '+Mand.selos(m).map(Mand.seloH).join('')+'</p><div class="mbar"><i style="width:'+Math.min(100,Mand.dias(m)/66*100)+'%"></i><span style="left:'+(7/66*100)+'%"></span><span style="left:'+(21/66*100)+'%"></span></div><button class="lk" onclick="Mand.apagar('+m.id+')">'+(S.mdel===m.id?'Toque de novo para apagar':'Apagar')+'</button></div>').join('')
  +(L.length<3?'<div class="card"><div class="mt"><span class="g">Novo mandamento</span><b>Uma meta pequena e clara</b></div><input id="mdin" maxlength="60" placeholder="Ex.: Dormir antes das 23h" class="intin"><button class="mb on" onclick="Mand.criar(document.getElementById(\'mdin\').value)">Criar</button><div class="kchips" style="margin-top:8px">'+MANDS.filter(t=>!L.some(m=>m.t===t)).slice(0,6).map(t=>'<button class="mb" onclick="Mand.criar(\''+t+'\')">'+esc(t)+'</button>').join('')+'</div></div>':'<p class="note">Você já tem 3 mandamentos. Para criar outro, apague um.</p>')}
};
TELAS.mand={t:'Mandamentos',v:()=>Mand.v()};
INI_CARDS.push(()=>Mand.card());

// ---------- Torneio Silencioso (B5): prova semanal opcional, contra você mesmo ----------
const TPOOL={corpo:['Faça todos os treinos dos seus dias marcados nesta semana, em qualquer nível','Caminhe 20 minutos, sem pressa, em um dia desta semana','Faça 10 minutos de alongamento em dois dias desta semana','Faça um Kata ou um treino completo em três dias'],
 mente:['Escreva uma página sobre como foi a sua semana','Fique 15 minutos sem celular, fazendo uma coisa só, em três dias','Leia algo por 20 minutos, sem telas','Faça três meditações ou missões de Mente'],
 habito:['Durma no horário que você escolheu em quatro noites','Passe uma noite sem telas depois das 22h','Conte a alguém de confiança sobre o seu caminho','Cumpra a meta de água em cinco dias']};
const Torneio={
 sem(){return Math.floor((S.day-1)/7)},
 tarefas(w){return ['corpo','mente','habito'].map((k,i)=>({k,t:TPOOL[k][(w+i)%TPOOL[k].length]}))},
 estado(){S.trn=S.trn||{w:-1,ck:{},h:{},pago:{}};if(S.trn.w!==Torneio.sem()){S.trn.w=Torneio.sem();S.trn.ck={}}return S.trn},
 ck(k){const t=Torneio.estado();t.ck[k]=!t.ck[k];t.h[t.w]=Object.values(t.ck).filter(Boolean).length;if(t.h[t.w]===3&&!t.pago[t.w]){t.pago[t.w]=1;const x=Math.round(40*(S.rkm||1));S.xpPrev+=x;t.msg='Torneio vencido: +'+x+' XP.';try{Som.gongo()}catch(e){}}S.top=false;render()},
 feitas(){const t=S.trn;return t?Object.keys(t.pago||{}).length:0},
 card(){if(!liberado('torneio'))return '';const t=Torneio.estado(),n=Object.values(t.ck).filter(Boolean).length;if(n===3)return '';return '<div class="card trnc" onclick="telaAbrir(\'torneio\')"><span class="g">Torneio Silencioso</span><b>Prova da semana: '+n+' de 3</b><span class="note">Opcional. Toque para ver.</span></div>'},
 v(){const t=Torneio.estado(),T=Torneio.tarefas(t.w),n=Object.values(t.ck).filter(Boolean).length,ant=t.h[t.w-1];
  return tutH('torneio','Torneio Silencioso','Uma prova opcional por semana: corpo, mente e hábito. Você marca quando cumprir. Não há ranking: você compete só com a sua semana passada.')
  +'<div class="card"><div class="mt"><span class="g">Semana '+(t.w+1)+' do caminho</span><b>'+n+' de 3</b></div>'+(t.msg&&n===3?'<p class="pvs">'+esc(t.msg)+'</p>':'')+T.map(x=>'<button class="pvk'+(t.ck[x.k]?' on':'')+'" onclick="Torneio.ck(\''+x.k+'\')"><i>'+(t.ck[x.k]?'✓':'')+'</i><span><small>'+({corpo:'Corpo',mente:'Mente',habito:'Hábito'})[x.k]+'</small>'+esc(x.t)+'</span></button>').join('')+'<p class="note">Completar as 3 vale '+Math.round(40*(S.rkm||1))+' XP, uma vez por semana.</p><p class="note">'+(ant==null?'Na semana que vem, você poderá comparar com esta.':'Semana passada: '+ant+' de 3. '+(n>ant?'Você já passou dela.':n===ant?'Empatado com você mesmo.':'Sem pressa: a semana ainda não acabou.'))+'</p></div>'}
};
TELAS.torneio={t:'Torneio Silencioso',v:()=>Torneio.v()};
INI_CARDS.push(()=>Torneio.card());

// ---------- Diário do Discípulo (B4): uma pergunta por dia, resposta só no aparelho ----------
const DDQ=['O que foi difícil hoje?','Do que você se orgulha hoje?','O que você aprendeu sobre você esta semana?','Qual momento do dia te deu calma?','O que te puxou para trás hoje, e o que te puxou para frente?','O que você diria a um amigo no seu lugar?','Qual pequena vitória ninguém viu hoje?','Do que o seu corpo precisou hoje?','O que você quer deixar para trás amanhã?','Quem te fez bem recentemente?','O que você está evitando? Por quê?','Como estava o seu sono, e como isso mudou o dia?','O que você faria se não tivesse medo de errar?','Qual hábito está ficando mais fácil?','O que te irritou hoje, e o que isso diz sobre o que importa para você?','Qual foi o melhor momento da semana?','O que você pode fazer amanhã em 5 minutos que ajudaria muito?','Que pensamento se repetiu hoje?','Como você cuidou de você hoje?','O que te deu energia, e o que tirou?','Que conselho você daria a quem você era há um mês?','O que mudou no seu jeito de reagir?','O que você quer agradecer hoje?','O que está pesando? Escreva para tirar da cabeça.','Que parte do caminho está mais leve?','O que você precisa ouvir hoje?','Qual escolha de hoje o seu eu de amanhã vai agradecer?','O que te fez rir recentemente?','Qual é o próximo passo pequeno?','Se hoje fosse um capítulo, que título teria?'];
const DDR=[[/cansad|exaust|sem energia|esgotad/i,'Cansaço também é informação. Hoje, o leve basta. Durma cedo, se puder.'],[/orgulh|consegui|venci|feliz|alegr/i,'Guarde essa sensação. Ela é lenha para os dias frios.'],[/trist|sozinh|chor|vazi/i,'Obrigado por escrever isso. Não carregue sozinho: falar com alguém de confiança ajuda muito.'],[/ansios|ansiedade|nervos|medo|preocup/i,'Respire devagar: 4 segundos para dentro, 6 para fora. O que está no papel pesa menos do que o que está na cabeça.'],[/raiva|irrit|bravo|ódio/i,'A raiva cansa antes do corpo. Sente, respire, e só depois decida.'],[/dor|machuc|lesão/i,'Respeite o corpo. Se a dor continuar, procure um profissional de saúde.'],[/fum|cigarr|vape|beb|álcool|alcool|apost|jog/i,'Obrigado pela honestidade. Recaída ou vontade não apagam o caminho. Amanhã a gente continua.'],[/dormi|sono|insôni|insoni/i,'O sono decide o dia seguinte. Uma noite melhor já muda muita coisa.'],[/grat|agradec|obrigad/i,'Gratidão é um treino silencioso. Você está ficando bom nele.']];
const DDD=['Li o que você escreveu. Obrigado por confiar.','Escrever é dizer em voz alta para dentro. Você fez isso hoje.','Isso me diz muito sobre quem você está se tornando.','Guardei suas palavras. Amanhã a gente continua.'];
const Diario={
 q(){return DDQ[(S.day-1)%DDQ.length]},
 hoje(){return (S.dia||[]).find(e=>e.src==='dd'&&e.day===S.day)},
 resp(t){if(Apoio.risco(t))return null;const r=DDR.find(x=>x[0].test(t));return r?r[1]:DDD[S.day%DDD.length]},
 salvar(){const e=document.getElementById('ddin'),v=e?e.value.trim():'';if(!v)return;addDia(v,'dd',Diario.q());S.dia[0].day=S.day;S.top=false;render()},
 apagar(){if(!S.ddel2){S.ddel2=1;render();setTimeout(()=>{S.ddel2=0;render()},5000);return}S.dia=(S.dia||[]).filter(e=>e.src!=='dd');S.ddel2=0;render()},
 mes(){const d=new Date(),m=d.getMonth(),y=d.getFullYear();return (S.dia||[]).filter(e=>{if(e.src!=='dd')return false;const x=new Date(e.t);return x.getMonth()===m&&x.getFullYear()===y}).reverse()},
 card(){if(!liberado('diario')||Diario.hoje())return '';return '<div class="card trnc" onclick="telaAbrir(\'diario\')"><span class="g">Diário do Discípulo</span><b>'+esc(Diario.q())+'</b><span class="note">Toque para responder. Só você vê.</span></div>'},
 v(){const h=Diario.hoje(),M=Diario.mes(),MES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'][new Date().getMonth()];
  return tutH('diario','Diário do Discípulo','Uma pergunta curta por dia. A resposta fica só neste aparelho, nas suas Recordações. No fim do mês, as suas frases viram uma página de retrospectiva.')
  +'<div class="card"><div class="mt"><span class="g">Pergunta de hoje</span><b>'+esc(Diario.q())+'</b></div>'+(h?'<p class="dt">'+esc(h.txt)+'</p>'+(Apoio.risco(h.txt)?'':'<p class="pvs">“'+esc(Diario.resp(h.txt))+'” <span class="g">Kaien</span></p>'):'<textarea id="ddin" class="dnote" rows="5" maxlength="1000" placeholder="Escreva com sinceridade. Só você vê."></textarea><button class="mb on" onclick="Diario.salvar()">Guardar</button>')+'</div>'
  +(h&&Apoio.risco(h.txt)?Apoio.card():'')
  +'<div class="card ddpg"><div class="mt"><span class="g">Página de '+MES+'</span><b>'+M.length+(M.length===1?' resposta':' respostas')+'</b></div>'+(M.length?M.map(e=>'<p class="note"><b>'+esc(e.title)+'</b><br>'+esc(e.txt).replace(/\n/g,'<br>')+'</p>').join(''):'<p class="note">As respostas do mês aparecem aqui.</p>')+'</div>'
  +'<button class="lk" onclick="Diario.apagar()">'+(S.ddel2?'Toque de novo para apagar todas as respostas do diário':'Apagar todas as respostas do diário')+'</button>'}
};
TELAS.diario={t:'Diário do Discípulo',v:()=>Diario.v()};
INI_CARDS.push(()=>Diario.card());
