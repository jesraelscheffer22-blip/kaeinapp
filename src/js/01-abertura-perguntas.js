const ST=['Força','Resistência','Agilidade','Foco','Disciplina','Calma'];
const OBJ={'Mais força':'Força','Mais energia':'Resistência','Mais foco':'Foco','Menos estresse':'Calma','Criar rotina':'Disciplina'};
const HAB={'Celular e redes sociais':'Foco','Jogos':'Disciplina','Apostas':'Disciplina','Cigarro ou vape':'Resistência','Álcool':'Calma','Outra coisa':'Calma'};
const NONE=['Nenhum','Prefiro não dizer'];
const T=(x,p)=>({t:'talk',x,p});
const Q=(id,x,p,opts,sup)=>({t:'single',id,x,p,opts,sup});
const steps=[
T('Então você chegou. Poucos chegam até aqui por vontade própria.','B'),
T('Eu sou o Kaien. Passei a vida observando o que separa quem muda de quem apenas deseja mudar.','C'),
T('Não é força, nem talento. É o que a pessoa faz nos dias em que ninguém está olhando.','C'),
T('Eu vou ser seu treinador. Mas o caminho, só você pode andar.','D'),
T('Antes de começar, preciso entender quem está diante de mim, e não quem você gostaria de parecer.','B'),
T('Responda com sinceridade. Eu não julgo. Mas o que você esconder de mim, eu não poderei ajudar a mudar.','B'),
{t:'name',x:'Todo caminho começa com um nome. Como devo te chamar?',p:'B'},
{t:'body',x:'Preciso conhecer o corpo que vai percorrer esse caminho.',p:'C'},
Q('mov','Seu corpo guarda a história dos seus dias. Nas últimas quatro semanas, em quantos dias por semana você se mexeu de propósito, em treino, esporte ou caminhada?','C',[
 ['Nenhum dia',[],'Então o primeiro passo não é correr. É sair do lugar.'],
 ['1 dia por semana',[['Resistência',1]]],
 ['2 ou 3 dias',[['Resistência',1],['Disciplina',1]]],
 ['4 ou 5 dias',[['Resistência',2],['Disciplina',2]],'Isso é constância. É raro de ver.'],
 ['6 ou 7 dias',[['Resistência',3],['Disciplina',3]],'Cuidado: quem nunca descansa também se perde. Voltaremos a isso.']]),
Q('flex','A força mostra o que o corpo aprendeu a suportar. Quantas flexões você faz de uma vez, sem parar?','D',[
 ['Nenhuma, ainda',[],'Hoje é só o ponto de partida. O que importa é onde você estará daqui a um mês.'],
 ['De 1 a 5',[['Força',1]]],['De 6 a 10',[['Força',2]]],['De 11 a 20',[['Força',3]]],['De 21 a 35',[['Força',5]]],
 ['Mais de 35',[['Força',7]],'Há disciplina nisso. Vamos ver se ela se estende ao resto da sua vida.']]),
Q('breath','O fôlego revela quanto tempo a pessoa ficou longe do próprio corpo. Se você subir três lances de escada agora, como chega ao topo?','B',[
 ['Preciso parar no meio',[],'Entendido. Fôlego se reconquista, passo a passo.'],
 ['Chego muito ofegante',[['Resistência',1]]],['Chego respirando mais forte',[['Resistência',2]]],
 ['Chego tranquilo',[['Resistência',3]]],['Chego tranquilo e subiria mais',[['Resistência',5]]]]),
Q('block','Todo caminho tem uma pedra. O que mais impede você de cuidar do corpo?','C',[
 ['Falta de tempo',[['Disciplina',1]],'Tempo não aparece. Tempo se separa. Vamos achar o seu.'],
 ['Cansaço',[['Resistência',1]],'Cansaço também é informação. Vou ouvir o que ele diz.'],
 ['Dor ou desconforto',[['Agilidade',1]],'Vamos olhar isso com cuidado na próxima pergunta.'],
 ['Vergonha ou insegurança',[['Calma',1]],'Vergonha só existe onde há plateia. Aqui, a única plateia sou eu.'],
 ['Não sei por onde começar',[['Foco',1]],'Esse é o problema mais honesto. E o mais fácil de resolver.'],
 ['Perco a vontade rápido',[['Disciplina',1]],'Vontade vai e volta. Por isso o caminho não pode depender dela.']]),
Q('pain','Antes de pedir qualquer coisa ao seu corpo, preciso saber o que ele já carrega. Sente alguma dor ou tem alguma lesão?','A',[
 ['Não',[['Agilidade',1]]],['Desconforto leve, de vez em quando',[['Disciplina',1]]],
 ['Dor que volta com frequência',[['Disciplina',2]],'Dor que volta é um aviso. Vale uma avaliação com um profissional de saúde. Vamos com cuidado.'],
 ['Lesão que limita meus movimentos',[['Disciplina',2]],'Procure um médico antes de treinar. Seu corpo vem primeiro. As missões físicas ficam leves até você confirmar que está liberado.']]),
Q('sleep','Dizem que o sono é descanso. Eu digo que é onde o dia seguinte é decidido. Quantas horas você dorme por noite?','A',[
 ['Menos de 5',[],'Então o seu primeiro adversário não é o treino. É a noite.'],
 ['De 5 a 6',[['Resistência',1]]],['De 7 a 8',[['Resistência',2],['Calma',1]]],['Mais de 8',[['Resistência',1],['Calma',1]]]]),
Q('fh','A mente se dispersa quando não tem para onde ir. Quanto tempo você aguenta focar numa coisa sem pegar o celular?','C',[
 ['Menos de 5 min',[],'A atenção também é um músculo. E tem sido pouco usada.'],
 ['De 5 a 15 min',[['Foco',1]]],['De 15 a 30 min',[['Foco',3]]],['Mais de 30 min',[['Foco',5]]]]),
Q('fd','Foco de verdade só aparece quando a tarefa fica chata. Quando isso acontece com você, o que faz?','C',[
 ['Largo e mudo de assunto',[],'Honesto. A maioria larga. A diferença está em perceber.'],
 ['Pego o celular e volto depois',[['Foco',1]]],
 ['Continuo, mas com muito esforço',[['Foco',2],['Disciplina',1]]],
 ['Continuo até terminar',[['Foco',3],['Disciplina',2]]]]),
Q('rd','Uma vida sem rotina é conduzida pelo acaso. Na última semana, em quantos dias você fez o que tinha planejado?','C',[
 ['Nenhum, ou não costumo planejar',[],'Então vamos construir uma rotina, pedra por pedra.'],
 ['1 ou 2 dias',[['Disciplina',1]]],['3 ou 4 dias',[['Disciplina',2]]],['5 ou 6 dias',[['Disciplina',4]]],['Todos os dias',[['Disciplina',5]]]]),
Q('rb','Toda rotina quebra em algum dia. Quando a sua quebra, o que costuma acontecer?','C',[
 ['Desisto por semanas',[],'Quebrar não é o problema. O problema é o tempo que se passa no chão.'],
 ['Demoro alguns dias para voltar',[['Disciplina',1]]],
 ['Volto no dia seguinte',[['Disciplina',2],['Calma',1]]],
 ['Raramente quebra',[['Disciplina',3],['Calma',1]]]]),
{t:'scales',id:'sc',p:'A',x:'Agora, a cabeça. Pense nas últimas semanas e marque de 1 a 5 como você tem estado.',items:[
 ['en','Energia ao longo do dia','esgotado','cheio de energia'],
 ['mo','Ânimo para começar coisas','nenhum','muito'],
 ['te','Tensão ou ansiedade','nenhuma','muita'],
 ['ir','Irritação com pequenas coisas','raramente','quase sempre']]},
{t:'multi',id:'pull',x:'Todos nós recorremos a algo quando a vida pesa. Sem julgamento: o que, hoje, puxa você com mais força?',p:'A',
 opts:['Celular e redes sociais','Jogos','Apostas','Cigarro ou vape','Álcool','Outra coisa','Nenhum','Prefiro não dizer']},
Q('trig','O hábito não nasce do nada. Quando ele costuma aparecer?','A',[
 ['Quando estou entediado',[['Foco',1]],'Quem entende o gatilho já ganhou metade da luta.'],['Quando estou ansioso ou estressado',[['Calma',1]],'Quem entende o gatilho já ganhou metade da luta.'],
 ['Quando me sinto sozinho',[['Calma',1]],'Quem entende o gatilho já ganhou metade da luta.'],['Quando estou cansado',[['Resistência',1]],'Quem entende o gatilho já ganhou metade da luta.'],
 ['No automático, sem pensar',[['Disciplina',1]],'Quem entende o gatilho já ganhou metade da luta.'],['Em momentos sociais',[['Calma',1]],'Quem entende o gatilho já ganhou metade da luta.']]),
Q('ctrl','Nas últimas semanas, esse hábito esteve sob o seu controle, ou você esteve sob o dele?','A',[
 ['Sob o meu controle',[['Disciplina',2]]],['Às vezes escapa',[['Disciplina',1],['Calma',1]]],
 ['Quase sempre me controla',[['Calma',2]],'Isso é mais comum do que parece, e não é falta de caráter. Vale buscar ajuda de um profissional, e eu posso te mostrar onde.']],true),
Q('want','Se pudesse mudar algo nisso, o que seria?','B',[
 ['Reduzir',[['Disciplina',1]]],['Parar',[['Disciplina',1]]],['Só entender melhor',[['Foco',2]]],
 ['Ainda não quero mexer',[['Calma',1]],'Respeito. Não vou forçar nada. A porta continua aberta.']]),
Q('last','Pense na última vez que você tentou mudar algo na sua vida. O que aconteceu?','C',[
 ['Nunca cheguei a começar',[],'Começar é a parte mais difícil. E você já está aqui.'],
 ['Comecei animado e larguei na primeira semana',[['Disciplina',1]],'Quase todos largam aí. Hoje vamos começar menor.'],
 ['Consegui por um tempo, depois voltei ao que era',[['Disciplina',2]],'Você já sabe como é subir. Vamos descobrir o que derrubou.'],
 ['Consegui e mantive',[['Disciplina',3]],'Então você já sabe vencer. Resta saber o que quer vencer agora.']]),
Q('why','O que trouxe você até aqui, justo agora?','B',[
 ['Cansei de como estou',[['Disciplina',1]],'Cansaço de si mesmo é um bom combustível. Mas dura pouco. Vamos trocar por hábito.'],
 ['Quero cuidar da minha saúde',[['Resistência',1]],'Saúde é uma boa razão. Silenciosa, mas firme.'],
 ['Alguém ou algo me fez pensar',[['Calma',1]],'Às vezes é um olhar de fora que acorda a gente. Guarde isso.'],
 ['Quero provar que sou capaz',[['Força',1]],'Prove para si, não para os outros. É a única plateia que importa.'],
 ['Estou só curioso',[['Foco',1]],'Curiosidade também abre portas. Veremos até onde ela leva.']]),
Q('goal','Um caminho sem destino é só cansaço. O que você quer conquistar?','D',[
 ['Mais força',[],'Esse será o seu objetivo. Quando o caminho ficar difícil, eu vou te lembrar dele.'],['Mais energia',[],'Esse será o seu objetivo. Quando o caminho ficar difícil, eu vou te lembrar dele.'],['Mais foco',[],'Esse será o seu objetivo. Quando o caminho ficar difícil, eu vou te lembrar dele.'],['Menos estresse',[],'Esse será o seu objetivo. Quando o caminho ficar difícil, eu vou te lembrar dele.'],['Criar rotina',[],'Esse será o seu objetivo. Quando o caminho ficar difícil, eu vou te lembrar dele.']]),
{t:'wdays',p:'B',x:'Última escolha. Quantos dias por semana você quer treinar? Marque os dias e escolha o tipo de treino. A mente eu treino com você todo dia.'},{t:'rem',p:'B',x:'Quer que eu te lembre? Escolha o horário e eu aviso com cuidado, sem encher.'},T('Entendi.','C'),T('Vejo um começo, não um destino.','C'),T('Ainda não sei se você aguenta o caminho.','C'),
T('Mas todo mestre já desconfiou de alguém que depois o surpreendeu.','D'),
T('Vou te dar uma chance. Aqui está o seu personagem.','D'),
{t:'sheet'},{t:'level'},{t:'day1'}];
steps.find(s=>s.id==='trig').if=steps.find(s=>s.id==='ctrl').if=steps.find(s=>s.id==='want').if=()=>hasHabit();
let S;const $=id=>document.getElementById(id);
function reset(){S={i:0,a:{},sc:{},name:'',age:null,h:null,w:null,pull:[],react:null,err:'',lvl:null,done:{},cups:0,noWater:false,warned:false,tab:'ini',top:false,ms:{},day:1,hist:[],progAcc:{},xpPrev:0,g:null,cel:null,fast:false,sugDay:0,dg:null,dgAll:{},dgHist:[],dgDone:0,dgMsg:'',wd:[],wd0:0,ov:{},wdMsg:'',eq:{aura:0,pose:0,bg:0,tone:0,frame:0,title:''},mhp:{},defeated:{}};runMigs();render()}
function hasHabit(){return S.pull.some(x=>!NONE.includes(x))}
function adv(){do{S.i++}while(steps[S.i]&&steps[S.i].if&&!steps[S.i].if());render()}
function tap(){if(S.react){S.react=null;adv();return}const s=steps[S.i];if(s.t==='talk')adv()}
function pick(k){const s=steps[S.i];S.a[s.id]=k;const r=s.opts[k][2];if(r){S.react={x:r,p:s.p}; render()}else adv()}
function togglePull(k){const s=steps[S.i],l=s.opts[k];let p=S.pull;
 if(NONE.includes(l))p=p.includes(l)?[]:[l];else{p=p.filter(x=>!NONE.includes(x));p=p.includes(l)?p.filter(x=>x!==l):[...p,l]}
 S.pull=p;render()}
function setSc(k,n){S.sc[k]=n;render()}
function doneSc(){const c=S.sc;let x;
 if(c.te>=5||(c.ir>=5&&c.te>=4))x='Obrigado por dizer isso. É um peso real. Não precisa carregá-lo sozinho: se puder, converse com alguém de confiança ou com um profissional. Comigo, vamos em passos pequenos.';
 else if(c.en<=2&&c.mo<=2)x='Pouca energia e pouco ânimo. Então o primeiro passo será pequeno, de propósito.';
 else x='Entendi. O corpo e a cabeça contam histórias diferentes. Vou ouvir as duas.';
 S.react={x,p:'A'};render()}
function needSup(){const c=S.sc;return c.te>=5||(c.ir>=5&&c.te>=4)||S.a.ctrl===2}
function donePull(){S.react={x:hasHabit()?'Admitir o que nos prende exige mais coragem do que qualquer treino. Obrigado por confiar isso a mim.':'Entendido. Se algo mudar no caminho, você pode me dizer.',p:'A'};render()}
function doneName(){const v=Seg.texto($('nm').value,20);if(!v){S.err='Digite um nome para continuar.';render();return}S.name=v;S.err='';S.react={x:v+'. Vou lembrar disso. Espero que você também lembre.',p:'B'};render()}
function doneBody(){const a=+$('ag').value,h=+$('ht').value,w=+$('wt').value;
 if(!a||a<16||a>99){S.err=a&&a<16?'Este app é para maiores de 16 anos (idade mínima provisória).':'Informe uma idade válida.';render();return}
 if(h&&(h<100||h>230)){S.err='Altura em centímetros, entre 100 e 230.';render();return}
 if(w&&(w<30||w>300)){S.err='Peso em quilos, entre 30 e 300.';render();return}
 S.age=a;S.h=h||null;S.w=w||null;S.err='';S.react={x:'Números não definem você. Servem só para eu medir o peso certo do treino.',p:'C'};render()}
function calc(){const v={},log={};ST.forEach(s=>{v[s]=8;log[s]=[]});
 const add=(s,p,why)=>{if(!p)return;v[s]+=p;log[s].push([p,why])};
 const q=id=>steps.find(s=>s.id===id);
 const ap=(id,tag)=>{const k=S.a[id];if(k==null)return;q(id).opts[k][1].forEach(([s,p])=>add(s,p,tag+': '+q(id).opts[k][0]))};
 const g=S.age;
 if(g<30)add('Agilidade',2,'Idade: '+g+' anos');else if(g<45){add('Resistência',1,'Idade: '+g+' anos');add('Disciplina',1,'Idade: '+g+' anos')}else add('Disciplina',2,'Idade: '+g+' anos');
 [['mov','Movimento nas 4 semanas'],['flex','Flexões'],['breath','Fôlego'],['block','Obstáculo reconhecido'],['pain','Dor ou lesão'],['sleep','Sono'],['fh','Foco: tempo sem celular'],['fd','Foco: tarefa difícil'],['rd','Rotina: dias cumpridos'],['rb','Rotina: quando quebra']].forEach(([i,n])=>ap(i,n));
 const c=S.sc;
 add('Resistência',[0,0,1,2,2][c.en-1],'Energia: '+c.en+' de 5');
 add('Disciplina',[0,0,1,1,2][c.mo-1],'Ânimo: '+c.mo+' de 5');
 add('Calma',[4,3,2,1,1][c.te-1],'Tensão: '+c.te+' de 5');
 add('Calma',[2,2,1,1,0][c.ir-1],'Irritação: '+c.ir+' de 5');
 S.pull.forEach(h=>{if(HAB[h])add(HAB[h],1,'Hábito que puxa: '+h)});
 if(hasHabit()){ap('trig','Gatilho do hábito');ap('ctrl','Controle do hábito');ap('want','Desejo de mudar')}
 ap('last','Última tentativa de mudar');ap('why','O que trouxe você');
 const goal=q('goal').opts[S.a.goal][0],gs=OBJ[goal];
 if(!hasHabit())add(gs,1,'Sem hábito que puxe (ou prefere não dizer)');
 add(gs,3,'Objetivo: '+goal);
 const raw={...v};ST.forEach(s=>{if(v[s]>20)v[s]=20});
 return{v,raw,log,gs,goal}}