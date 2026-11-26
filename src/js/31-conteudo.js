/* ===== Conteúdo da expansão: Diário do Kaien, Ensinos, Conquistas ===== */

// ---------- Diário do Kaien: falas por confiança (somam às 32 originais) ----------
DI.push(
[3,'Você não precisa gostar de todo treino. Só precisa aparecer em alguns.'],[5,'Repare: hoje você já fez mais do que ontem pensava que faria.'],
[7,'Água, sono e um pouco de movimento. Parece pouco. É a base de tudo.'],[9,'Não sei se você percebeu, mas eu já sei o seu horário. Gosto disso.'],
[11,'Meu mestre comia devagar. Dizia que pressa na mesa vira pressa na vida.'],[13,'Hoje eu treinei pensando em você. Estranho, não é? Mestres também têm alunos favoritos.'],
[15,'Não conte para ninguém, mas eu também tenho dias em que só faço o aquecimento.'],[17,'Você está ficando bom em voltar. É a habilidade mais rara que existe.'],
[20,'Quando eu tinha a sua idade de caminho, eu reclamava muito. Você reclama menos. Isso é bom.'],
[23,'O bambu cresce para baixo por anos antes de aparecer. Seus hábitos também.'],[26,'Tem dias em que eu só observo o vento. Isso também é treino.'],
[29,'Já percebeu que os monstros ficam mais fracos quando você dorme bem?'],[31,'Ren dizia que eu era lento. Ele tinha razão. Lento e constante.'],
[34,'Hoje eu contei os seus dias. Não por cobrança. Por admiração.'],[37,'Se um dia você quiser parar por um tempo, me avise. Eu guardo o lugar.'],
[40,'Na montanha, a neve cai sem fazer barulho. Os bons hábitos também.'],[43,'Eu confio em você. Não digo isso a qualquer um.'],
[45,'Você me lembra de mim mesmo. Na parte boa, eu acho.'],[48,'Não existe dia perdido. Existe dia em que você aprendeu o que não fazer.'],
[51,'Tobi mandou uma carta. Contei a ele sobre você. Ele sorriu, eu sei.'],[53,'A zona do meio é silenciosa. Mas eu estou aqui, mesmo calado.'],
[56,'Sabe qual é o meu som favorito? A sua tocha acesa no pátio, de manhã.'],[57,'Às vezes eu escrevo também. Sobre os alunos. Você aparece bastante.'],
[60,'Você já não precisa que eu lembre de beber água. Notou isso?'],[63,'Quando eu falho, penso no que você faria. E volto.'],
[64,'Meu mestre teria gostado de você. Ele diria "de novo", claro.'],[67,'Tem uma pedra no pátio com o seu nome. Mentira. Mas deveria ter.'],
[69,'A tempestade passa. O hábito fica.'],[72,'Hoje eu dormi cedo porque sabia que você ia aparecer. Você me ensina também.'],
[73,'Os outros alunos perguntam de você. Eu digo: é alguém que volta.'],[76,'Você não está mais tentando mudar. Você está vivendo mudado.'],
[77,'Lá no Palácio, os dragões respeitam uma coisa só: quem não desistiu.'],[80,'Irmão de caminho. É isso que você é para mim agora.'],
[81,'Tenho medo de que você vá embora um dia. Mas tenho mais orgulho do que medo.'],[84,'Se você um dia ensinar alguém, ensine devagar. Como eu fiz com você.'],
[85,'Hoje eu passei pelo Espelho e lembrei de você. Ele estava rachado.'],[88,'A gente já não precisa de muitas palavras, não é?'],
[89,'Ensinar você foi a minha prova mais longa. Acho que passei.'],
[92,'Herdeiro. Não do meu título: do meu hábito de agradecer o dia.'],[93,'Quando eu não estiver mais aqui, o pátio vai continuar. Porque você vai continuar.'],
[95,'Guardei uma coisa para dizer no final. Mas digo agora: obrigado por ter voltado tantas vezes.'],
[96,'Meu mestre deixou um hábito. Eu deixo você.'],[98,'Não há mais nada que eu possa te ensinar. Só lembrar.'],
[100,'Mestre. Ninguém te deu esse nome. Você o construiu, um dia de cada vez.'],[100,'Agora, quando alguém aparecer no seu pátio sem saber se aguenta, você sabe o que fazer: sente ao lado e espere.']);
DI.sort((a,b)=>a[0]-b[0]);

// ---------- Fala de hoje: varia pelo dia da semana e pelo que aconteceu ontem ----------
const DIDIA=[['Segunda é um começo pequeno. Não precisa ser grande.','Segunda-feira. O pátio está limpo, a semana é sua.'],['Terça. O dia em que a vontade da segunda costuma sumir. Fique mesmo assim.','Terça é dia de provar que segunda não foi sorte.'],['Quarta. Meio da semana, meio do caminho. Respire.','Quarta-feira. Se a semana está pesada, faça o leve, mas faça.'],['Quinta. Quem chega até aqui na semana já merece respeito.','Quinta é o dia em que o hábito começa a andar sozinho.'],['Sexta. Feche a semana com algo que te dê orgulho.','Sexta-feira. Descanse bem hoje à noite. O corpo agradece no sábado.'],['Sábado. Um dia mais solto também pode ter um treino gentil.','Sábado é bom para caminhar sem pressa.'],['Domingo é para descansar e olhar a semana com carinho.','Domingo. Prepare a semana que vem com calma, sem cobrança.']];
const DIEST={
 parcial:['Ontem foi pela metade. Metade é mais do que nada. Hoje é outro dia.','Fazer parte não é falhar. É ser honesto com o que o corpo deu.','Eu vi que ontem ficou incompleto. Não me importo. Me importo que você esteja aqui.'],
 dor:['Ontem você parou por dor. Foi a decisão certa. Hoje, só o que for confortável.','Corpo dolorido pede descanso, não coragem. Se a dor continuar, procure um profissional.','Respeitar a dor é uma forma de força que pouca gente tem.'],
 recaida:['Recaída não apaga o caminho. Você continua exatamente onde estava, e eu também.','Ontem o monstro ganhou uma rodada. A luta continua, e você ainda está de pé.','Sem culpa. Respire, beba água e volte ao andar quando puder.'],
 volta:['Que bom te ver de volta. Não precisa explicar nada.','A tocha ficou acesa enquanto você estava fora. Sente, respire.','Voltar é o golpe mais difícil do caminho. Você acabou de acertar.'],
 perfeito:['Ontem você fechou o dia inteiro. Hoje, não precisa repetir a perfeição. Só apareça.','Dia completo ontem. Guarde essa sensação, mas não se cobre por ela.','Ontem foi bonito de ver. Hoje a gente continua, um passo de cada vez.'],
 retiro:['Você está em retiro. Descansar faz parte do treino. Eu estou aqui.','Retiro é para recuperar. Respire, beba água, durma bem. O caminho espera.','Sem missões pesadas hoje. Cuide de você.']};
function falaHoje(){const h=S.hist[S.hist.length-1],wd=(S.wd0+S.day-1)%7,longe=S.hist.length>=2&&S.hist.slice(-2).every(x=>!x.active);let e=null;
 if(typeof Retiro!=='undefined'&&Retiro.ativo())e='retiro';else if(longe)e='volta';else if(h){const v=Object.values(h.ms||{});if((S.dgRecDay||-9)===S.day-1)e='recaida';else if(v.some(x=>x.st==='dor'))e='dor';else if(v.some(x=>x.st==='parcial'))e='parcial';else if(h.keys&&h.keys.length&&h.keys.every(k=>h.ms[k.key]&&h.ms[k.key].st==='done'))e='perfeito'}
 const L=e?DIEST[e]:DIDIA[wd];return L[S.day%L.length]}

// ---------- Ensinos: novos (somam aos 16 originais), com tema ----------
// Temas: corpo, mente, sono, hábito, recaída, rotina, elixires (hidratação e refeições, sem dieta).
ENS.push(
[12,'Aqueça antes, desacelere depois','Cinco minutos de aquecimento preparam articulações e músculos. Cinco minutos de desaceleração ajudam o corpo a voltar ao normal. Pular os dois é pedir para se machucar.'],
[14,'Respiração simples','Inspire pelo nariz contando até 4. Solte pela boca contando até 6. Sem prender o ar, sem forçar. Se sentir tontura, volte a respirar normalmente.'],
[15,'O gatilho vem antes','Todo hábito tem um gatilho: um lugar, um horário, uma emoção. Anote quando a vontade aparece. Conhecer o gatilho é metade da luta.'],
[17,'Tela fora do quarto','A luz e os estímulos do celular atrasam o sono. Deixar o aparelho carregando fora do quarto é uma das mudanças mais simples e fortes que existem.'],
[18,'Dor não é progresso','Desconforto de esforço é normal. Dor aguda, pontada ou dor que piora não são. Pare, descanse e, se persistir, procure um profissional.'],
[20,'Dias leves também contam','Ter dias mais leves na semana não é preguiça. É o que deixa o corpo recuperar e o hábito durar anos, e não semanas.'],
[21,'Um passo menor','Se a meta está pesada, não desista dela. Diminua o passo. Cinco minutos ainda são cinco minutos.'],
[22,'A hora de acordar','Acordar no mesmo horário, inclusive no fim de semana, ajuda o corpo a regular o sono melhor do que dormir até tarde para compensar.'],
[24,'Pensamento não é ordem','A mente oferece pensamentos o tempo todo: "desista", "amanhã", "só um". Você pode ouvir sem obedecer. Observe e deixe passar.'],
[25,'Recaída não zera','Um dia de recaída não apaga semanas de esforço. O que importa é o que você faz no dia seguinte. Volte ao plano, sem castigo.'],
[28,'Planeje o dia difícil','Escreva antes: "Se eu estiver cansado, faço a versão de 5 minutos." Quem decide antes não precisa decidir com a cabeça cansada.'],
[29,'Movimento ao longo do dia','Ficar sentado muito tempo pesa no corpo. Levantar, alongar e caminhar um pouco a cada hora ajuda tanto quanto um treino curto.'],
[31,'Gentileza consigo','Falar consigo com dureza não aumenta a disciplina. Aumenta o cansaço. Trate-se como trataria um amigo que está tentando.'],
[34,'Companhia que ajuda','Contar o seu objetivo a alguém de confiança aumenta as chances de mantê-lo. Não para ser cobrado, mas para ter com quem dividir.'],
[36,'O corpo fala antes','Cansaço que não passa, sono ruim por semanas, falta de ânimo constante: são sinais. Vale conversar com um profissional de saúde.'],
[39,'Celebre o pequeno','Repare nas pequenas vitórias: um copo de água, um treino curto, uma vontade que passou. O cérebro aprende com o que é celebrado.'],
[44,'Revisar sem julgar','Uma vez por semana, olhe o que funcionou e o que travou. Sem nota, sem culpa. Só ajuste o plano.'],
[48,'O caminho é longo','Não existe hábito pronto. Existe hábito cuidado. Mesmo no rank S, continue aparecendo para o básico: sono, água, movimento e mente.'],
[26,'Elixir: água ao acordar','Beber um copo de água ao acordar é um hábito simples que ajuda a começar o dia. Se você tem alguma condição de saúde, siga a orientação do seu médico.'],
[27,'Elixir: chá da calma','À noite, prefira bebidas sem cafeína, como chás de ervas. Café e energéticos perto da hora de dormir atrapalham o sono.'],
[30,'Elixir: refeições no horário','Comer em horários parecidos todos os dias ajuda a energia ficar mais estável. Não é dieta: é rotina. Para orientação alimentar, procure um nutricionista.'],
[33,'Elixir: a garrafa por perto','Ter uma garrafa de água à vista lembra de beber ao longo do dia. Pequenos goles valem mais do que muito de uma vez.'],
[37,'Elixir: comer sem tela','Fazer uma refeição sem celular ajuda a perceber a fome e a saciedade, e dá uma pausa de verdade para a mente.'],
[42,'Elixir: ouvir o corpo','Sede, fome, cansaço e sono são mensagens. Não precisa ignorar nem exagerar. Se algo estiver estranho, procure um profissional de saúde.']);
ENS.sort((a,b)=>a[0]-b[0]);
const ENST={'Comece pequeno':'hábito','Aparecer já é vencer':'rotina','Respire antes de reagir':'mente','Descanso é treino':'corpo','Escreva o que pensa':'mente','Troque, não só proíba':'hábito','Se... então':'hábito','Ambiente vence disciplina':'hábito','Compare com você mesmo':'mente','Recaída não é fim':'recaída','Peça ajuda':'recaída','Cuide do sono':'sono','A mente vem primeiro':'mente','Gratidão prática':'mente','Ensinar é aprender':'rotina','O caminho continua':'rotina',
 'Aqueça antes, desacelere depois':'corpo','Respiração simples':'mente','O gatilho vem antes':'hábito','Tela fora do quarto':'sono','Dor não é progresso':'corpo','Dias leves também contam':'corpo','Um passo menor':'rotina','A hora de acordar':'sono','Pensamento não é ordem':'mente','Recaída não zera':'recaída','Planeje o dia difícil':'rotina','Movimento ao longo do dia':'corpo','Gentileza consigo':'recaída','Companhia que ajuda':'hábito','O corpo fala antes':'corpo','Celebre o pequeno':'mente','Revisar sem julgar':'rotina','O caminho é longo':'rotina'};
const temaEns=e=>/^Elixir/.test(e[1])?'elixires':(ENST[e[1]]||'mente');

// ---------- Conquistas novas (somam às 11 originais) ----------
// Nunca premiam excesso (jejum, treinar com dor, perder peso). Todas com descrição e dica.
const _n=(f)=>{try{return f()}catch(e){return false}};
const diasAtivos=()=>S.hist.filter(h=>h.active).length+(todayActive()?1:0);
ACH.push(
{n:'Duas semanas',d:'Chegue ao 14º dia no app',f:()=>S.day>=14},{n:'Um mês de caminho',d:'Chegue ao 30º dia no app',f:()=>S.day>=30},
{n:'Cem dias',d:'Chegue ao 100º dia no app',f:()=>S.day>=100},{n:'Um ano',d:'Chegue ao 365º dia no app',f:()=>S.day>=365},
{n:'Cinquenta missões',d:'Conclua 50 missões',f:()=>doneCount()>=50},{n:'Duzentas missões',d:'Conclua 200 missões',f:()=>doneCount()>=200},{n:'Quinhentas missões',d:'Conclua 500 missões',f:()=>doneCount()>=500},
{n:'Trinta dias ativos',d:'Faça ao menos uma missão em 30 dias diferentes',f:()=>diasAtivos()>=30},{n:'Cem dias ativos',d:'Faça ao menos uma missão em 100 dias diferentes',f:()=>diasAtivos()>=100},
{n:'Nível 10',d:'Chegue ao nível 10',f:()=>myLvl()>=10},{n:'Nível 25',d:'Chegue ao nível 25',f:()=>myLvl()>=25},{n:'Nível 40',d:'Chegue ao nível 40',f:()=>myLvl()>=40},
{n:'Rank D',d:'Passe pela Prova do rank D',f:()=>S.provaD===1},{n:'Rank C',d:'Passe pela Prova do rank C',f:()=>S.provaC===1},{n:'Rank B',d:'Passe pela Prova do rank B',f:()=>S.provaB===1},{n:'Rank A',d:'Passe pela Prova do rank A',f:()=>S.provaA===1},{n:'Rank S',d:'Chegue ao Pico da Lua',f:()=>S.provaS===1},
{n:'Bem dormido',d:'Registre o sono 7 vezes',f:()=>(S.slc||0)>=7},{n:'Noites em ordem',d:'Registre 7 a 8 horas de sono em 5 noites',f:()=>(S.slh||[]).filter(c=>c>=3).length>=5},
{n:'Copo cheio',d:'Cumpra a meta de água 7 vezes',f:()=>S.hist.filter(h=>h.water).length>=7},{n:'Rio constante',d:'Cumpra a meta de água 30 vezes',f:()=>S.hist.filter(h=>h.water).length>=30},
{n:'Cinco andares',d:'Vença 5 andares de dungeon',f:()=>(S.dgDone||0)>=5},{n:'Vinte andares',d:'Vença 20 andares de dungeon',f:()=>(S.dgDone||0)>=20},
{n:'Três chefes',d:'Derrote 3 chefes diferentes',f:()=>Object.keys(S.defeated||{}).length>=3},{n:'Caçador evoluído',d:'Vença uma dungeon da Fase 2',f:()=>Object.keys(S.defeated2||{}).length>=1},
{n:'Forma Verdadeira',d:'Vença uma Forma Verdadeira',f:()=>Object.keys(S.defeated3||{}).length>=1},{n:'Encarar o Espelho',d:'Derrote o Espelho',f:()=>!!(S.esp&&S.esp.won)},
{n:'Leitor',d:'Leia 8 capítulos das histórias',f:()=>Object.keys(S.kread||{}).length>=8},{n:'Biblioteca do pátio',d:'Leia 24 capítulos',f:()=>Object.keys(S.kread||{}).length>=24},
{n:'Aprendiz atento',d:'Abra 10 ensinamentos',f:()=>Object.keys(S.ensl||{}).length>=10},{n:'Sábio',d:'Abra 30 ensinamentos',f:()=>Object.keys(S.ensl||{}).length>=30},
{n:'Recordações',d:'Guarde 20 recordações',f:()=>(S.dia||[]).length>=20},{n:'Confiança plena',d:'Chegue ao topo da confiança do Kaien',f:()=>trustPts()>=100},
{n:'Um mandamento',d:'Cumpra um mandamento por 7 dias',f:()=>_n(()=>Mand.maxDias()>=7)},{n:'Mandamento firme',d:'Cumpra um mandamento por 21 dias',f:()=>_n(()=>Mand.maxDias()>=21)},{n:'Selo dos 66 dias',d:'Cumpra um mandamento por 66 dias',f:()=>_n(()=>Mand.maxDias()>=66)},
{n:'Respiração em paz',d:'Faça 5 meditações',f:()=>(S.medN||0)>=5},{n:'Kata',d:'Complete 5 treinos Kata',f:()=>(S.kataN||0)>=5},
{n:'Torneio Silencioso',d:'Complete uma prova semanal',f:()=>_n(()=>Torneio.feitas()>=1)},{n:'Quatro torneios',d:'Complete 4 provas semanais',f:()=>_n(()=>Torneio.feitas()>=4)},
{n:'Descanso consciente',d:'Use um Retiro quando precisar',f:()=>(S.retN||0)>=1},{n:'Escritor do caminho',d:'Responda 10 perguntas do Diário do Discípulo',f:()=>(S.dia||[]).filter(e=>e.src==='dd').length>=10},
{n:'Escola escolhida',d:'Escolha uma Escola',f:()=>!!(S.esc&&S.esc.id)},{n:'Templo vivo',d:'Tenha 5 construções no seu Templo',f:()=>_n(()=>Templo.qtd()>=5)},
{n:'Degrau dez',d:'Suba 10 andares da Torre dos Mil Degraus',f:()=>((S.torre||{}).n||0)>=10},{n:'Cem degraus',d:'Suba 100 andares da Torre',f:()=>((S.torre||{}).n||0)>=100},
{n:'Guardião das estações',d:'Vença uma Invasão sazonal',f:()=>Object.keys(S.inv||{}).some(k=>S.inv[k].won)},{n:'Bestiário',d:'Registre 15 monstros no Bestiário',f:()=>_n(()=>Bestiario.qtd()>=15)},
{n:'Livro-jogo',d:'Viva 3 Missões de Cena',f:()=>Object.keys(S.cenas||{}).length>=3},{n:'Correspondência',d:'Leia 4 Cartas do Mestre',f:()=>Object.keys(S.cartas||{}).length>=4},
{n:'Estrela de Mestre',d:'Ganhe a primeira Estrela de Mestre (nível 55)',f:()=>myLvl()>=55});
// Dica de cada conquista (mostrada quando ainda está bloqueada).
const ACHD={'Primeiro passo':'Comece pela missão de Mente.','Constância':'Treine nos dias que você escolheu.','Dia perfeito':'Missões e água no mesmo dia.','Voltou mais forte':'Depois de um dia sem treinar, volte no seguinte.','Honestidade':'Usar "Fiz parte" ou "Parei por dor" também conta.','Bem dormido':'Responda quantas horas dormiu, no Início.','Copo cheio':'Marque os copos de água no Início.','Encarar o Espelho':'O Espelho fica na aba Desafio, em Chefes.','Descanso consciente':'Retiro fica na Jornada, no Início.','Escola escolhida':'Abre no rank C.','Torneio Silencioso':'Abre no nível 17, na Jornada.','Aprendiz atento':'Toque nos ensinamentos para lê-los.'};
function ensLer(t){S.ensl=S.ensl||{};if(!S.ensl[t]){S.ensl[t]=1}}
