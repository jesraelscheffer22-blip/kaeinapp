const DGH={
'Celular e redes sociais':{m:'Espectro das Notificações',st:'Foco',F:mn=>[
[CH('Anote quantas horas de tela o celular mostra por dia (Bem-estar digital ou Tempo de uso)'),CH('Anote os 3 apps que mais consomem seu tempo'),CH('Anote em que momentos você pega o celular sem perceber')],
[CH('Desative as notificações de todos os apps, menos ligações e mensagens importantes'),CH('Tire do início da tela os apps que mais te prendem'),CH('Escreva: "Quando eu sentir vontade de abrir ___, eu vou ___" (ex.: beber água, respirar fundo)')],
[TM('Celular em outro cômodo, fazendo uma tarefa só',mn(30),{bg:true}),CH('Anote quantas vezes a vontade de pegar apareceu'),CH('Anote o que você fez no lugar')],
[CH('Deixe o celular fora do quarto na hora de dormir (use despertador comum, se precisar)'),CH('Faça uma refeição inteira sem celular'),CH('Anote como foi acordar sem ele')],
[TM('Bloco livre: celular fora do alcance',mn(45),{bg:true}),CH('Defina um horário fixo para redes sociais, por exemplo 2 janelas de 20 min por dia'),CH('Anote quanto tempo de tela você reduziu em relação ao primeiro andar')]]},
'Jogos':{m:'Monstro dos Jogos',st:'Disciplina',F:mn=>[
[CH('Anote quantas horas você joga por dia e em quais horários'),CH('Anote o que você deixa de fazer para jogar'),CH('Anote como se sente quando para')],
[CH('Defina um horário de parada e coloque um alarme antes de começar'),CH('Quando o alarme tocar, salve e pare, mesmo no meio da partida'),CH('Anote como foi parar')],
[CH('Escreva: "Quando eu sentir vontade de jogar fora do horário, eu vou ___" (ex.: caminhar 10 min)'),TM('Faça essa ação por 10 min',10),CH('Anote se a vontade mudou')],
[CH('Hoje, jogue só metade do tempo que costuma jogar'),CH('Use o tempo restante em algo que você deixou de lado (treino, estudo, amigos)'),CH('Anote como se sentiu no fim do dia')],
[CH('Passe uma noite inteira sem jogar'),CH('Combine uma atividade com alguém: sair, treinar ou conversar'),CH('Anote como foi e o que você escolheria repetir')]]},
'Apostas':{m:'Monstro da Aposta',st:'Disciplina',sup:1,F:mn=>[
[CH('Anote quanto você apostou e perdeu na última semana, sem julgamento'),CH('Anote os horários e situações em que a vontade aparece (salário, tédio, jogo ao vivo)'),CH('Anote como você se sente logo depois de apostar')],
[CH('Delete os apps de aposta do celular'),CH('Bloqueie os sites de aposta no navegador ou no roteador, se possível'),CH('Remova cartões e Pix salvos nesses apps e sites')],
[CH('Peça ao banco para baixar o limite de Pix e transferências, se puder'),CH('Deixe o dinheiro do mês com uma pessoa de confiança ou em conta separada, se possível'),CH('Escreva: "Se eu sentir vontade de apostar, eu vou esperar 30 min e ligar para ___"')],
[CH('Conte para uma pessoa de confiança que você está enfrentando isso'),CH('Anote o que você gostaria que ela fizesse quando você estiver com vontade')],
[CH('Procure apoio: UBS, CAPS AD ou um grupo de apoio como Jogadores Anônimos'),CH('Veja os contatos de apoio no botão do app (UBS, CAPS AD, CVV 188)'),CH('Anote qual será o seu primeiro passo e quando você vai dá-lo')]]},
'Cigarro ou vape':{m:'Monstro da Fumaça',st:'Resistência',sup:1,F:mn=>[
[CH('Anote quantos você usa por dia e em quais horários'),CH('Anote quais situações disparam a vontade (café, pausa, estresse, álcool)'),CH('Sem julgamento: só observe')],
[CH('Quando a vontade bater, beba um copo de água e espere 10 min'),CH('Anote se a vontade passou'),CH('Escreva: "Quando eu sentir vontade por causa de ___, eu vou ___" (ex.: caminhar 5 min)')],
[CH('Escolha o gatilho mais forte e troque por uma ação curta hoje'),TM('Caminhada leve ou respiração lenta',5,{breath:true}),CH('Anote como foi')],
[CH('Adie o primeiro do dia em 30 min'),CH('Deixe o maço ou o vape fora do alcance'),CH('Anote como foi')],
[CH('Converse com a UBS sobre apoio para reduzir com segurança'),CH('Veja os contatos de apoio no botão do app (UBS, CAPS AD, CVV 188)'),CH('Anote o que ajudou até aqui e o que você vai manter')]]},
'Álcool':{m:'Rei da Garrafa',st:'Calma',sup:1,note:'Se você bebe muito ou todos os dias, não pare de uma vez: pode ser perigoso. Converse com um médico ou procure a UBS/CAPS AD.',F:mn=>[
[CH('Anote quando e quanto você bebeu na última semana, sem julgamento'),CH('Anote o que sentia antes de beber'),CH('Anote com quem e onde costuma beber')],
[CH('Antes de decidir beber, beba um copo de água e espere 15 min'),CH('Anote se a vontade mudou'),CH('Escreva: "Quando eu sentir vontade de beber por causa de ___, eu vou ___"')],
[CH('Escolha um momento do dia ou da semana sem beber, só se for seguro para você'),CH('Tenha em casa uma bebida sem álcool que você goste'),CH('Anote como foi')],
[CH('Conte para uma pessoa de confiança como você está'),CH('Combine com ela uma atividade sem álcool')],
[CH('Procure a UBS ou o CAPS AD para montar um plano com um profissional'),CH('Veja os contatos de apoio no botão do app (UBS, CAPS AD, CVV 188)'),CH('Anote qual será o seu primeiro passo e quando você vai dá-lo')]]},
'Outra coisa':{m:'Monstro Sem Nome',st:'Calma',sup:1,F:mn=>[
[CH('Anote quando o hábito aparece, onde você está e o que sente'),CH('Anote o que costuma acontecer logo depois'),CH('Sem julgamento: só observe')],
[CH('Quando a vontade bater, espere 10 min antes de agir'),CH('Anote o que mudou nesse tempo'),CH('Escreva: "Quando eu sentir ___, eu vou ___"')],
[CH('Escolha o gatilho mais forte e troque por uma ação curta, como caminhar 5 min'),CH('Mude algo no ambiente para dificultar o hábito (guardar, bloquear, afastar)'),CH('Anote como foi')],
[CH('Conte para uma pessoa de confiança como você está'),CH('Peça a ela que te lembre do seu plano')],
[CH('Pense em procurar apoio profissional'),CH('Veja os contatos de apoio no botão do app (UBS, CAPS AD, CVV 188)'),CH('Anote o primeiro passo e quando você vai dá-lo')]]},
'Procrastinação':{m:'Rei do Adiamento',st:'Disciplina',F:mn=>[
[CH('Liste 3 tarefas que você vem adiando'),CH('Anote por que cada uma é difícil de começar'),CH('Escolha uma para esta semana e quebre em passos de 10 min')],
[CH('Escreva: "Quando for [horário], eu vou começar [tarefa] em [lugar]"'),TM('Só 10 minutos da tarefa',10),CH('Anote o que você concluiu')],
[CH('Deixe o material da tarefa pronto na mesa antes de começar'),TM('Tarefa sem celular',mn(20),{bg:true}),CH('Anote o que você concluiu')],
[TM('Tarefa sem celular',mn(30),{bg:true}),CH('Faça uma pausa de 5 min e volte'),CH('Anote o que você concluiu')],
[TM('Bloco final da tarefa',mn(40),{bg:true}),CH('Marque a tarefa como concluída e escolha a próxima'),CH('Anote como se sentiu ao terminar')]]},
'O Espelho':{m:'O Espelho',st:'Calma',F:mn=>[
[CH('Escreva 3 hábitos seus dos quais você se orgulha'),CH('Escreva 1 que você quer mudar')],
[CH('Anote em que momento do dia você fica mais cansado ou irritado'),CH('Anote o que costuma acontecer antes')],
[TM('Silêncio: sentado, sem telas, observando os pensamentos',mn(10),{breath:true}),CH('Anote o que mais apareceu')],
[CH('Escreva uma carta curta para você daqui a 1 mês'),CH('Diga o que espera ter mudado')],
[CH('Releia o que escreveu nesta semana'),CH('Escolha o próximo passo para a semana que vem')]]},
'Sono ruim':{m:'Monstro da Insônia',st:'Calma',F:mn=>[
[CH('Anote a hora em que dormiu e a hora em que acordou'),CH('Anote quantas vezes acordou e como se sentiu de manhã'),CH('Anote cafeína, telas e refeições perto da hora de dormir')],
[CH('Desligue telas 30 min antes de dormir'),CH('Faça uma rotina calma: banho morno, luz baixa, alongamento leve'),CH('Anote como foi dormir')],
[CH('Escolha um horário fixo para deitar e cumpra hoje'),CH('Acorde sempre no mesmo horário, inclusive no fim de semana')],
[CH('Deixe o quarto escuro, silencioso e fresco'),CH('Evite cafeína depois das 16h'),CH('Se não dormir em 20 min, levante, faça algo calmo e volte quando tiver sono')],
[CH('Repita a rotina de sono completa hoje'),TM('Respiração lenta antes de deitar',5,{breath:true}),CH('Anote como se sente em comparação ao primeiro andar')]]}};
const MIMG={'Procrastinação':'@@IMG:boss-procrastinacao@@','Celular e redes sociais':'@@IMG:boss-celular@@','Cigarro ou vape':'@@IMG:boss-cigarro@@','Álcool':'@@IMG:boss-alcool@@','Sono ruim':'@@IMG:boss-sono@@','Jogos':'@@IMG:boss-jogos@@','Apostas':'@@IMG:boss-apostas@@','Outra coisa':'@@IMG:boss-outra@@','O Espelho':'@@IMG:boss-espelho@@'};
const SIL="url(data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20100%20100%27%3E%3Cpath%20d%3D%27M50%208C30%208%2022%2028%2024%2044%2014%2062%2010%2084%208%2096H92C90%2084%2086%2062%2076%2044%2078%2028%2070%208%2050%208Z%27%20fill%3D%27%231b1233%27%20stroke%3D%27%236b4fc4%27%20stroke-width%3D%272%27%2F%3E%3Cellipse%20cx%3D%2741%27%20cy%3D%2738%27%20rx%3D%274%27%20ry%3D%272.5%27%20fill%3D%27%23fff%27%2F%3E%3Cellipse%20cx%3D%2759%27%20cy%3D%2738%27%20rx%3D%274%27%20ry%3D%272.5%27%20fill%3D%27%23fff%27%2F%3E%3C%2Fsvg%3E)";
const monImg=(h,c)=>MIMG[h]?'<img class="'+c+((h==='Jogos'||h==='Apostas')&&c==='mth'?' rnd':'')+'" alt="" src="'+MIMG[h]+'">':'<div class="'+c+' sil" style="background-image:'+SIL+'"></div>';
const BI={
'Procrastinação':['Ah, você chegou. Eu estava esperando... mas sem pressa.','Amanhã você começa, não é? Sempre começa amanhã.','Vamos ver se hoje é diferente.'],
'Celular e redes sociais':['Ding. Você veio olhar, né? Eu sei que veio.','Tem tanta coisa te esperando aqui. Só mais um minutinho.','Duvido que você aguente quatro andares sem me tocar.'],
'Cigarro ou vape':['Calma. Ninguém aqui vai te mandar parar de uma vez.','Eu sou aquele minuto de pausa que você acha que precisa.','Vem. Vamos ver quem manda em quem.'],
'Álcool':['Entre, sente. Eu sempre fui bom de companhia.','Todo mundo diz que vai diminuir. Eu espero.','Mas tudo bem tentar. Só não esqueça: eu sei esperar.'],
'Sono ruim':['Shhh. Ainda está acordado? Que bom, eu gosto da madrugada.','Pensamentos, telas, mais uma hora... você me alimenta.','Mas hoje você veio me enfrentar. Vamos ver.'],
'Jogos':['PRESS START. Você voltou por mais uma partida?','Só mais uma. Sempre só mais uma.','Mas aqui as regras são outras. Seu tempo é a vida.'],
'Apostas':['Bem-vindo. Aqui todo mundo está quase ganhando.','Mais uma rodada, a sorte vira, você sabe.','Só que hoje você escolhe o jogo. Quer apostar contra mim?'],
'Outra coisa':['Você nunca me deu um nome. Isso me deixa forte.','Eu me escondo no que você faz sem perceber.','Hoje você vai me olhar de frente. Será que consegue?'],
'O Espelho':['Olhe bem. Esse é você.','Quem você é quando ninguém está olhando?','Vamos ver se você enfrenta quem você é.']};
const BIK='Eu estou com você. É um andar por dia, sem pressa. Você pode parar quando precisar.';
const BII=(h)=>BI[h]||['...'];
function biStart(h){S.bi={h,i:0};S.bossSeen=S.bossSeen||{};S.bossSeen[h]=1}
function biNext(){const n=BII(S.bi.h).length+1;S.bi.i++;if(S.bi.i>=n){S.bi=null;S.dgSplash=S.day}S.top=true;render()}
function biSkip(){S.bi=null;S.top=true;render()}
const MOBI={
'Procrastinação':['Depois eu resolvo, relaxa.','Só mais cinco minutinhos.','Isso pode esperar até amanhã.','Para que fazer hoje o que dá para largar?'],
'Celular e redes sociais':['Ding! Tem uma coisa nova aqui.','Dá uma olhadinha rápida.','Todo mundo está online agora.','Só mais um vídeo, prometo.'],
'Cigarro ou vape':['Uma pausa não faz mal.','Você merece esse minuto.','Só um para acalmar.','Hoje está puxado, né?'],
'Álcool':['Uma só para começar.','Todo mundo está brindando.','Você merece relaxar.','Amanhã você diminui.'],
'Sono ruim':['Ainda está cedo, fica mais um pouco.','Só mais um episódio.','Dorme depois, agora o celular.','Sono é para quem não tem o que fazer.'],
'Jogos':['Só mais uma partida.','Falta pouco para subir de rank.','Todo mundo ainda está online.','Dá tempo de mais uma, vai.'],
'Apostas':['Uma aposta pequena não pesa.','Hoje a sorte está do seu lado.','Quase deu, tenta de novo.','Só para recuperar o que perdeu.'],
'Outra coisa':['Você nem percebeu que começou.','É só um costume, ninguém liga.','Já faz tempo, que diferença faz?','Só hoje, depois você vê.'],
'O Espelho':['Você não é bom o suficiente.','Os outros fazem melhor.','Por que tentar de novo?','Você sempre desiste.']};
const mobIn=(h,i)=>(MOBI[h]||[])[i]||'';
const MOBS={
'Procrastinação':[['Amanhã Eu Faço','Eu vivia de “depois”. Hoje você não deixou.'],['Soneca do Alarme','Mais cinco minutos... era tudo o que eu tinha.'],['Aba Aberta','Você fechou a aba. Sem ela, eu sumo.'],['Lista Infinita','Uma coisa de cada vez. Que golpe baixo.']],
'Celular e redes sociais':[['Notificação Fantasma','Eu nem existia. Você olhou por hábito.'],['Scroll Sem Fim','Acabou o feed. Pelo menos por hoje.'],['Curtida Vazia','Ninguém precisava de mim para ser feliz.'],['Só Mais Um Vídeo','O próximo vídeo não vai tocar.']],
'Cigarro ou vape':[['Pausa Falsa','Eu fingia ser descanso.'],['Cheiro na Roupa','Você respirou fundo. Eu perdi.'],['Isqueiro Perdido','Sem mim na mão, sobrou espaço.'],['Vontade de Dois Minutos','Passou. Elas sempre passam.']],
'Álcool':[['Brinde Fácil','Dava para brindar com outra coisa.'],['Desculpa de Sexta','A sexta chegou e eu não mandei em você.'],['Copo da Vontade','Pediu e passou. Você esperou.'],['Silêncio Pesado','Você ficou com o silêncio e continuou de pé.']],
'Sono ruim':[['Tela da Madrugada','Você apagou a luz. Perdi minha lanterna.'],['Pensamento em Loop','Você anotou e deixou de lado. Não tenho onde ficar.'],['Café das Seis','Hoje foi só um copo, cedo.'],['Cama Tarde','Você deitou na hora. Fiquei sem fôlego.']],
'Jogos':[['Só Mais Uma Partida','Era a última... dessa vez foi mesmo.'],['Loot Viciante','O prêmio de verdade estava lá fora.'],['Madrugada Online','O servidor fechou e você foi dormir.'],['Ranking Sem Fim','Subir de nível aqui é melhor.']],
'Apostas':[['Aposta Pequena','Não era pequena. Você sabia.'],['Quase Ganhei','“Quase” nunca foi ganhar.'],['Odds Perfeitas','Os números nunca foram seus.'],['Dinheiro Emprestado','Você pediu ajuda em vez de apostar.']],
'Outra coisa':[['Primeiro Gatilho','Você me reconheceu. Isso me enfraquece.'],['Hábito Automático','Você notou antes de fazer.'],['Desculpa Pronta','Essa já não colou.'],['Vontade Passageira','Passou sozinha.']],
'O Espelho':[['Voz Crítica','Eu só repetia o que você me contou.'],['Comparação','Você não é o feed de ninguém.'],['Passado Pesado','Ficou para trás.'],['Medo de Falhar','Você tentou assim mesmo.']]};
const MOBIMG={'Apostas|0':'@@IMG:mob-apostas-0@@','Apostas|1':'@@IMG:mob-apostas-1@@','Apostas|2':'@@IMG:mob-apostas-2@@','Apostas|3':'@@IMG:mob-apostas-3@@','Jogos|0':'@@IMG:mob-jogos-0@@','Jogos|1':'@@IMG:mob-jogos-1@@','Jogos|2':'@@IMG:mob-jogos-2@@','Jogos|3':'@@IMG:mob-jogos-3@@','Outra coisa|0':'@@IMG:mob-outra-0@@','Outra coisa|1':'@@IMG:mob-outra-1@@','Outra coisa|2':'@@IMG:mob-outra-2@@','Outra coisa|3':'@@IMG:mob-outra-3@@','Cigarro ou vape|0':'@@IMG:mob-cigarro-0@@','Cigarro ou vape|1':'@@IMG:mob-cigarro-1@@','Cigarro ou vape|2':'@@IMG:mob-cigarro-2@@','Cigarro ou vape|3':'@@IMG:mob-cigarro-3@@','Sono ruim|0':'@@IMG:mob-sono-0@@','Sono ruim|1':'@@IMG:mob-sono-1@@','Sono ruim|2':'@@IMG:mob-sono-2@@','Sono ruim|3':'@@IMG:mob-sono-3@@','Celular e redes sociais|0':'@@IMG:mob-celular-0@@','Celular e redes sociais|1':'@@IMG:mob-celular-1@@','Celular e redes sociais|2':'@@IMG:mob-celular-2@@','Celular e redes sociais|3':'@@IMG:mob-celular-3@@','Álcool|0':'@@IMG:mob-alcool-0@@','Álcool|1':'@@IMG:mob-alcool-1@@','Álcool|2':'@@IMG:mob-alcool-2@@','Álcool|3':'@@IMG:mob-alcool-3@@','Procrastinação|0':'@@IMG:mob-procrastinacao-0@@','Procrastinação|1':'@@IMG:mob-procrastinacao-1@@','Procrastinação|2':'@@IMG:mob-procrastinacao-2@@','Procrastinação|3':'@@IMG:mob-procrastinacao-3@@'};
const mobOf=(h,i)=>(MOBS[h]||[])[i]||['Mini monstro','...'];
const mobImg=(h,i,c)=>MOBIMG[h+'|'+i]?'<img class="'+c+'" alt="" src="'+MOBIMG[h+'|'+i]+'">':'<div class="'+c+' sil" style="background-image:'+SIL+'"></div>';
const mobCel=d=>'<div class="mcel mobd">'+mobImg(d.h,d.idx,'mth2 mobdie')+'<div class="gl">Mini monstro derrotado</div><b>'+esc(mobOf(d.h,d.idx)[0])+'</b><p class="mfr">“'+esc(mobOf(d.h,d.idx)[1])+'”</p></div>';
const statNow=n=>calc().v[n]+Math.floor(progOf(n)/5);
const ST_SUM=()=>ST.reduce((a,s)=>a+statNow(s),0);
const espDoneToday=()=>Object.values(S.ms||{}).some(m=>m&&m.st==='done')||S.floorDay===S.day;
function espStart(){if(myLvl()<7||S.esp)return;S.esp={start:S.day,max:2500,hp:2500,d1:ST_SUM(),last:0,days:0,won:false,lv:1};if(espDoneToday())espHit();S.top=true;render()}
function espHit(){const e=S.esp;if(!e||e.won||e.last===S.day)return 0;const d=ST_SUM();e.last=S.day;e.days=(e.days||0)+1;e.hp=Math.max(0,e.hp-d);if(e.hp<=0){e.won=true;e.wonDay=S.day;S.xpPrev+=Math.round(300*(e.lv>1?.5:1))}return d}
function dsub(x){S.dsub=x;S.top=true;render()}

const maxHp=h=>150*calc().v[DGH[h].st];
const hpOf=h=>(S.dgAll&&S.dgAll[h])?S.dgAll[h].hp:maxHp(h);
const hpMaxOf=h=>(S.dgAll&&S.dgAll[h])?S.dgAll[h].max:maxHp(h);
const dmgOf=h=>50*statNow(DGH[h].st);
function floorsNeed(h){const D=S.dgAll&&S.dgAll[h];return D?5-D.fl.filter(Boolean).length:5}
let _dgi=null;
const MCOL={'Procrastinação':'150,90,255','Celular e redes sociais':'255,190,70','Cigarro ou vape':'210,140,110','Álcool':'255,90,60','Sono ruim':'120,110,255','Jogos':'90,255,60','Apostas':'255,50,70','Outra coisa':'170,140,255','O Espelho':'150,190,255'};
const dgOpts=()=>dgVis();
function dgFloors(){const H=DGH[S.dg.habit],sc=[.75,1,1.25][S.lvl],mn=x=>Math.max(5,Math.round(x*sc/5)*5);
 const T=['O Portão','O Corredor','A Ponte','A Câmara','O Guardião'],X=[30,30,40,40,60];
 return H.F(mn).map((st,i)=>({stat:H.st,title:(i+1)+'º andar · '+T[i],steps:st,min:dgEst(st)||null,xp:X[i],key:'dg'+i,sup:!!H.sup,note:H.note||''}))}