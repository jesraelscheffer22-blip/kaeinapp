/* ===== Dungeons: Fase 2 (evoluídas), Fase 3 (Forma Verdadeira) =====
   Fase 2: abre no nível 7, 4 monstros evoluídos + chefe evoluído, ×1,5 de XP. O Espelho ganha
   a sua Fase 2 (A Sombra no Espelho) no nível 20. Fase 3: rank B (nível 30), um andar só, ×2.
   Monstros são metáforas de hábitos, nunca pessoas. Tudo em linguagem de apoio, sem culpa. */
const SLUGH={'Procrastinação':'procrastinacao','Celular e redes sociais':'celular','Cigarro ou vape':'cigarro','Álcool':'alcool','Sono ruim':'sono','Jogos':'jogos','Apostas':'apostas','Outra coisa':'outra','O Espelho':'espelho'};
const DGH2={
'Procrastinação':{m:'Imperador do Amanhã',st:'Disciplina',F:mn=>[
 [CH('Escolha uma tarefa importante que você vem adiando há mais de uma semana'),CH('Escreva o pior que pode acontecer se começar mal, e o pior se não começar'),TM('Comece por 15 minutos, mesmo malfeito',mn(15),{bg:true})],
 [CH('Defina o que é "bom o suficiente" para essa tarefa: o que conta como pronto?'),TM('Trabalhe nela sem revisar nada',mn(20),{bg:true}),CH('Anote o que ficou pronto')],
 [CH('Liste o que te distrai dessa tarefa (abas, celular, arrumações)'),CH('Feche ou afaste tudo antes de começar'),TM('Bloco de foco',mn(25),{bg:true})],
 [CH('Quando vier o "estou cansado demais", faça só 5 minutos e decida depois'),TM('Cinco minutos de começo',5),CH('Anote se continuou ou parou, sem julgar')],
 [CH('Escolha um horário fixo para a tarefa amanhã e coloque um lembrete'),TM('Bloco final',mn(30),{bg:true}),CH('Anote o que você aprendeu sobre o seu jeito de começar')]]},
'Celular e redes sociais':{m:'Espectro das Mil Telas',st:'Foco',F:mn=>[
 [CH('Veja o tempo de tela da última semana e anote o número'),CH('Escolha um app para limitar com o temporizador do próprio celular'),CH('Defina o limite diário desse app')],
 [CH('Desligue as notificações de redes sociais por hoje'),TM('Bloco sem celular',mn(40),{bg:true}),CH('Anote quantas vezes sentiu vontade e o que fez no lugar')],
 [CH('Deixe a tela em preto e branco por hoje, se o celular tiver essa opção'),CH('Tire os apps de redes da tela inicial'),CH('Anote se ficou mais fácil largar')],
 [CH('Passe a primeira hora do dia sem abrir redes sociais'),CH('Passe a última hora antes de dormir sem telas'),CH('Anote como foi acordar e dormir assim')],
 [CH('Escolha um momento sem tela fixo na semana (refeição, caminhada, conversa)'),CH('Convide alguém próximo para fazer junto'),CH('Anote quanto tempo você ganhou nesta semana')]]},
'Cigarro ou vape':{m:'Dragão de Fumaça',st:'Resistência',sup:1,note:'Reduzir aos poucos é válido. Para parar com segurança e com apoio, converse com a UBS.',F:mn=>[
 [CH('Anote, num dia, cada vez que fumou ou usou, com horário e motivo'),CH('Marque qual foi a mais automática'),CH('Sem julgamento: é só um mapa')],
 [CH('Escolha a vez mais automática do dia e adie por 15 minutos'),TM('Respiração lenta enquanto a vontade passa',3,{breath:true}),CH('Anote se a vontade diminuiu')],
 [CH('Troque um gatilho por outra ação: depois do café, escove os dentes ou beba água'),CH('Deixe o cigarro ou o vape em outro cômodo durante uma tarefa'),CH('Anote como foi')],
 [CH('Defina um lugar onde você não fuma nem usa (carro, quarto ou casa)'),CH('Conte a uma pessoa de confiança sobre esse combinado'),CH('Anote os momentos em que foi difícil')],
 [CH('Procure a UBS e pergunte sobre o apoio para parar de fumar'),CH('Veja os contatos de apoio no botão do app'),CH('Anote o seu próximo passo e uma data para ele')]]},
'Álcool':{m:'Senhor da Taça Vazia',st:'Calma',sup:1,note:'Se você bebe muito ou todos os dias, não pare de uma vez: pode ser perigoso. Converse com um médico ou procure a UBS ou o CAPS AD.',F:mn=>[
 [CH('Anote, sem julgamento, quantas doses tomou em cada dia da última semana'),CH('Anote em quais situações bebeu mais'),CH('Escolha uma situação para mudar primeiro')],
 [CH('Combine com você um limite para a próxima ocasião, só se for seguro para você'),CH('Alterne cada dose com um copo de água'),CH('Anote como foi')],
 [CH('Prepare uma resposta para recusar ou adiar uma dose (ex.: "hoje estou de boa")'),CH('Tenha à mão uma bebida sem álcool de que você goste'),CH('Anote se usou a resposta')],
 [CH('Escolha uma atividade de fim de semana sem álcool (caminhada, filme, encontro)'),CH('Convide alguém para fazer junto'),CH('Anote como se sentiu no dia seguinte')],
 [CH('Procure a UBS ou o CAPS AD para conversar sobre o seu consumo'),CH('Veja os contatos de apoio no botão do app'),CH('Anote o seu próximo passo e uma data para ele')]]},
'Sono ruim':{m:'Rainha da Madrugada',st:'Calma',F:mn=>[
 [CH('Anote por 3 noites a hora de deitar, a hora em que dormiu e a hora de acordar'),CH('Anote o que fez na última hora antes de deitar'),CH('Escolha um horário fixo de acordar')],
 [CH('Desligue as telas 45 minutos antes de deitar'),CH('Faça algo calmo no lugar: leitura em papel, banho morno, alongamento leve'),CH('Anote quanto tempo levou para dormir')],
 [CH('Evite cafeína depois das 15h hoje'),CH('Se cochilar, que seja curto, até 20 minutos e antes das 16h'),CH('Anote como foi a noite')],
 [CH('Se a cabeça não parar ao deitar, escreva os pensamentos num papel e deixe para amanhã'),TM('Respiração lenta na cama',5,{breath:true}),CH('Anote se ajudou')],
 [CH('Mantenha o mesmo horário de acordar por 5 dias'),CH('Pegue alguns minutos de luz natural pela manhã'),CH('Se o sono ruim durar semanas, converse com um médico')]]},
'Jogos':{m:'Lorde do Respawn',st:'Disciplina',F:mn=>[
 [CH('Anote quanto tempo jogou em cada dia da semana'),CH('Anote os jogos e horários em que mais perde a noção do tempo'),CH('Escolha um limite diário realista')],
 [CH('Desative as notificações e os lembretes de recompensa dos jogos que mais te puxam'),CH('Jogue só depois de cumprir as missões do dia'),CH('Anote como foi')],
 [CH('Coloque um alarme para o fim do horário de jogo, longe do alcance'),CH('Pare no alarme, salvando o que der'),CH('Anote o que sentiu ao parar')],
 [CH('Escolha um dia da semana sem jogos'),CH('Planeje o que fazer nesse tempo (treino, amigos, descanso)'),CH('Anote como foi o dia')],
 [CH('Converse com alguém sobre o seu equilíbrio com os jogos'),CH('Se os jogos atrapalham sono, estudo ou trabalho, considere apoio profissional'),CH('Anote o seu combinado para as próximas semanas')]]},
'Apostas':{m:'Banqueiro das Sombras',st:'Disciplina',sup:1,F:mn=>[
 [CH('Some, sem julgamento, quanto saiu do seu bolso com apostas no último mês'),CH('Compare com uma conta importante (aluguel, mercado)'),CH('Anote o que sentiu ao ver o número')],
 [CH('Peça a autoexclusão nas casas de aposta que você usa, se elas oferecerem'),CH('Desinstale os apps e bloqueie os sites no celular'),CH('Anote o que ainda deixa a porta aberta')],
 [CH('Quando vier a vontade de "recuperar", espere 30 minutos e ligue para alguém'),TM('Respiração lenta enquanto espera',5,{breath:true}),CH('Anote se a vontade mudou')],
 [CH('Combine com uma pessoa de confiança uma forma de proteger o seu dinheiro por um tempo'),CH('Pague primeiro os compromissos do mês (contas, mercado)'),CH('Anote o combinado')],
 [CH('Procure apoio: UBS, CAPS AD ou um grupo como os Jogadores Anônimos'),CH('Veja os contatos de apoio no botão do app'),CH('Anote o seu próximo passo e uma data para ele')]]},
'Outra coisa':{m:'Sombra Sem Rosto',st:'Calma',sup:1,F:mn=>[
 [CH('Dê um nome ao hábito que você quer mudar'),CH('Anote quando, onde e com quem ele acontece'),CH('Anote o que você sente logo antes')],
 [CH('Escolha uma barreira pequena para dificultar o hábito (guardar, bloquear, afastar)'),CH('Aplique a barreira hoje'),CH('Anote se ajudou')],
 [CH('Escolha uma ação para fazer no lugar quando a vontade vier'),TM('Faça essa ação',10),CH('Anote como se sentiu')],
 [CH('Conte a alguém de confiança o seu plano'),CH('Combine como essa pessoa pode te ajudar'),CH('Anote o combinado')],
 [CH('Pense se é hora de buscar apoio profissional para este hábito'),CH('Veja os contatos de apoio no botão do app'),CH('Anote o seu próximo passo')]]},
'O Espelho':{m:'A Sombra no Espelho',st:'Calma',note:'Se pensamentos pesados ficarem fortes, fale com alguém de confiança ou com o CVV, no 188.',F:mn=>[
 [CH('Escreva 3 coisas que a sua voz crítica costuma dizer'),CH('Para cada uma, escreva o que você diria a um amigo que ouvisse isso'),CH('Leia as respostas com calma')],
 [CH('Anote uma vez nesta semana em que você se comparou com alguém'),CH('Escreva uma coisa em que você melhorou em relação a você mesmo'),CH('Fique uma hora longe das redes depois')],
 [CH('Escreva como você está hoje, de verdade, sem enfeitar'),CH('Conte um pouco disso a uma pessoa de confiança'),CH('Anote como foi ser sincero')],
 [CH('Escolha uma tarefa e faça "bem feito o suficiente", sem buscar perfeição'),TM('Faça a tarefa',mn(20)),CH('Anote o que aconteceu quando você soltou o perfeito')],
 [CH('Escreva uma carta gentil para você, como escreveria a um amigo'),TM('Silêncio: respire e releia a carta',5,{breath:true}),CH('Guarde a carta nas Recordações')]]}};
const MOBS2={
'Procrastinação':[['Prazo Fantasma','O prazo existia. Você começou antes dele.'],['Perfeccionismo Paralisante','Feito é melhor que perfeito. Você provou.'],['Distração Disfarçada','Eu parecia tarefa. Você viu que não era.'],['Cansaço de Mentira','Cinco minutos e eu sumi.']],
'Celular e redes sociais':[['Enxame de Notificações','Silêncio. Nenhuma de nós tocou hoje.'],['Feed Infinito','O fim existia: era você largando.'],['Sereia do Vídeo Curto','Você não ficou para o próximo.'],['Medo de Ficar de Fora','Você ficou de fora e ficou bem.']],
'Cigarro ou vape':[['Gatilho do Café','O café ficou só café.'],['Pausa Obrigatória','Você descansou sem mim.'],['Fissura das Três da Tarde','Passou. Sempre passa.'],['Brasa da Desculpa','Sem desculpa, sem brasa.']],
'Álcool':[['Convite Insistente','Você disse "hoje não" e ninguém morreu.'],['Saideira','A última foi a água.'],['Brinde do Estresse','Você respirou em vez de brindar.'],['Ressaca da Culpa','Sem culpa, eu não tenho onde morar.']],
'Sono ruim':[['Luz Azul','A tela apagou antes de você.'],['Cafeína Atrasada','O café das seis virou chá.'],['Ruminação Noturna','Você escreveu e eu fiquei no papel.'],['Soneca Longa','Vinte minutos. Que cruel.']],
'Jogos':[['Missão Diária Infinita','Você não precisava de mim todo dia.'],['Recompensa de Login','O prêmio de verdade era o seu tempo.'],['Partida Ranqueada','Você saiu da fila.'],['Madrugada no Servidor','Você foi dormir. O servidor seguiu sem você.']],
'Apostas':[['Bônus de Boas-vindas','O presente era uma isca. Você viu.'],['Recuperar o Perdido','Você parou de correr atrás.'],['Palpite Certeiro','Nenhum palpite era certo.'],['Cassino no Bolso','O bolso ficou só com o seu dinheiro.']],
'Outra coisa':[['Hábito Escondido','Você me tirou da sombra.'],['Recompensa Rápida','Você escolheu a recompensa lenta.'],['Voz do Só Hoje','"Só hoje" não colou.'],['Vazio de Domingo','Você preencheu o domingo com outra coisa.']],
'O Espelho':[['Eco da Comparação','Você parou de me ouvir.'],['Voz do Nunca Basta','Bastou. Você disse.'],['Máscara do Tudo Bem','Você tirou a máscara e continuou de pé.'],['Sombra do Perfeccionismo','Bem feito o suficiente me desmanchou.']]};
const MOBI2={
'Procrastinação':['Ainda dá tempo. Sempre dá.','Se não for perfeito, nem comece.','Responde só essa mensagem antes.','Você está cansado demais para isso.'],
'Celular e redes sociais':['Bzz. Bzz. Bzz. Bzz.','Desce mais um pouco. Só mais um pouco.','Esse aqui é rapidinho. E o próximo também.','Todo mundo está vendo isso agora.'],
'Cigarro ou vape':['Café sem mim? Impossível.','Você precisa de uma pausa. Comigo.','São três da tarde. Você sabe o que vem.','Hoje foi um dia difícil. Você merece.'],
'Álcool':['Vem, só uma. Vai ser chato sem você.','Mais uma, a última, prometo.','Dia pesado pede um brinde.','Ontem foi demais. Para esquecer, mais uma.'],
'Sono ruim':['Só mais um vídeo antes de dormir.','Um café agora não faz mal.','E aquilo que você disse em 2015?','Uma soneca de três horas resolve.'],
'Jogos':['A missão de hoje expira em 2 horas.','Entre agora e ganhe o prêmio diário.','Mais uma ranqueada para subir.','Todo mundo ainda está online.'],
'Apostas':['Ganhe 100% no primeiro depósito.','Você só precisa recuperar o de ontem.','Esse resultado é certo. Confia.','Está no seu bolso. A um toque.'],
'Outra coisa':['Ninguém precisa saber.','Uma recompensa rápida agora.','Só hoje. Amanhã você para.','Domingo sem nada para fazer...'],
'O Espelho':['Olha como os outros estão melhores.','Ainda não é o suficiente.','Fala que está tudo bem.','Se não for perfeito, é fracasso.']};
const BI2={
'Procrastinação':['Eu sou o Imperador do Amanhã. Governo todos os seus "depois".','Você venceu o meu servo. Agora enfrenta o trono.','Mas cuidado: meu reino só cai quando você começa.'],
'Celular e redes sociais':['Mil telas. Mil luzes. Todas para você.','O espectro que você venceu era só um reflexo meu.','Vamos ver se você aguenta o silêncio.'],
'Cigarro ou vape':['O dragão de fumaça desperta.','Eu moro nos seus intervalos, nos seus cafés, nos seus dias ruins.','Mas cada vontade que passa me deixa menor.'],
'Álcool':['Sente-se. A taça está vazia, mas eu encho.','O rei que você venceu era meu mensageiro.','Hoje você escolhe o que vai no copo.'],
'Sono ruim':['A madrugada é o meu reino, e você é meu convidado.','Telas, cafés, pensamentos: são meus servos.','Mas hoje você veio de dia. Isso me enfraquece.'],
'Jogos':['Game over? Não existe game over. Existe respawn.','Eu sempre volto. Uma missão, um prêmio, uma partida.','Mas você aprendeu a sair do jogo.'],
'Apostas':['Bem-vindo de volta. O banco nunca fecha.','Eu sei quanto você perdeu. Sei quanto quer recuperar.','Só que hoje o jogo é outro: você contra a pressa.'],
'Outra coisa':['Você me deu um nome. Agora eu não tenho rosto.','Eu mudo de forma para não ser reconhecido.','Mas quem aprendeu a me ver, me vê em qualquer forma.'],
'O Espelho':['Você venceu o Espelho. Mas esqueceu da sombra.','Eu sou o que você não mostra a ninguém.','Não precisa me destruir. Precisa me olhar com gentileza.']};
// Fase 3: Forma Verdadeira (um andar, rank B+)
const _f3=(extra)=>mn=>[[CH('Releia o que você anotou nas fases anteriores deste monstro, nas Recordações'),CH('Escreva o que mudou em você desde o primeiro andar'),extra(mn),CH('Escreva o seu plano para quando ele tentar voltar'),TM('Respiração da vitória',3,{breath:true})]];
const DGH3={
'Procrastinação':{m:'A Ampulheta Partida',st:'Disciplina',F:_f3(mn=>TM('Faça agora, sem esperar, a tarefa que mais pesa',mn(25),{bg:true}))},
'Celular e redes sociais':{m:'O Olho que Não Dorme',st:'Foco',F:_f3(mn=>TM('Fique sem celular, fazendo uma coisa só',mn(45),{bg:true}))},
'Cigarro ou vape':{m:'O Véu de Cinzas',st:'Resistência',sup:1,F:_f3(mn=>CH('Conte a alguém de confiança o quanto você já avançou'))},
'Álcool':{m:'O Rei Afogado',st:'Calma',sup:1,F:_f3(mn=>CH('Conte a alguém de confiança o quanto você já avançou'))},
'Sono ruim':{m:'A Noite Sem Fim',st:'Calma',F:_f3(mn=>CH('Hoje, deite no horário que você escolheu, sem telas antes'))},
'Jogos':{m:'O Mestre do Jogo Eterno',st:'Disciplina',F:_f3(mn=>CH('Escolha uma atividade fora das telas para o seu próximo tempo livre'))},
'Apostas':{m:'A Roda da Ilusão',st:'Disciplina',sup:1,F:_f3(mn=>CH('Revise com alguém de confiança as proteções do seu dinheiro'))},
'Outra coisa':{m:'O Nome Verdadeiro',st:'Calma',sup:1,F:_f3(mn=>CH('Conte a alguém de confiança o quanto você já avançou'))},
'O Espelho':{m:'O Espelho Rachado',st:'Calma',F:_f3(mn=>CH('Escreva três qualidades suas, sem "mas" no final'))}};
const BI3={};Object.keys(DGH3).forEach(h=>BI3[h]=['Você me conheceu por outros nomes. Este é o meu verdadeiro.','Não há mais servos nem andares. Só eu e você.','Você já sabe me vencer. Mostre isso uma última vez.']);
const MIMG2={},MIMG3={},MOBIMG2={};
MIMG2['Procrastinação']='@@IMG:boss2-procrastinacao@@';MIMG2['Celular e redes sociais']='@@IMG:boss2-celular@@';MIMG2['Cigarro ou vape']='@@IMG:boss2-cigarro@@';MIMG2['Álcool']='@@IMG:boss2-alcool@@';MIMG2['Sono ruim']='@@IMG:boss2-sono@@';MIMG2['Jogos']='@@IMG:boss2-jogos@@';MIMG2['Apostas']='@@IMG:boss2-apostas@@';MIMG2['Outra coisa']='@@IMG:boss2-outra@@';MIMG2['O Espelho']='@@IMG:boss2-espelho@@';
MIMG3['Procrastinação']='@@IMG:boss3-procrastinacao@@';MIMG3['Celular e redes sociais']='@@IMG:boss3-celular@@';MIMG3['Cigarro ou vape']='@@IMG:boss3-cigarro@@';MIMG3['Álcool']='@@IMG:boss3-alcool@@';MIMG3['Sono ruim']='@@IMG:boss3-sono@@';MIMG3['Jogos']='@@IMG:boss3-jogos@@';MIMG3['Apostas']='@@IMG:boss3-apostas@@';MIMG3['Outra coisa']='@@IMG:boss3-outra@@';MIMG3['O Espelho']='@@IMG:boss3-espelho@@';
[['Procrastinação',['@@IMG:mob2-procrastinacao-0@@','@@IMG:mob2-procrastinacao-1@@','@@IMG:mob2-procrastinacao-2@@','@@IMG:mob2-procrastinacao-3@@']],['Celular e redes sociais',['@@IMG:mob2-celular-0@@','@@IMG:mob2-celular-1@@','@@IMG:mob2-celular-2@@','@@IMG:mob2-celular-3@@']],['Cigarro ou vape',['@@IMG:mob2-cigarro-0@@','@@IMG:mob2-cigarro-1@@','@@IMG:mob2-cigarro-2@@','@@IMG:mob2-cigarro-3@@']],['Álcool',['@@IMG:mob2-alcool-0@@','@@IMG:mob2-alcool-1@@','@@IMG:mob2-alcool-2@@','@@IMG:mob2-alcool-3@@']],['Sono ruim',['@@IMG:mob2-sono-0@@','@@IMG:mob2-sono-1@@','@@IMG:mob2-sono-2@@','@@IMG:mob2-sono-3@@']],['Jogos',['@@IMG:mob2-jogos-0@@','@@IMG:mob2-jogos-1@@','@@IMG:mob2-jogos-2@@','@@IMG:mob2-jogos-3@@']],['Apostas',['@@IMG:mob2-apostas-0@@','@@IMG:mob2-apostas-1@@','@@IMG:mob2-apostas-2@@','@@IMG:mob2-apostas-3@@']],['Outra coisa',['@@IMG:mob2-outra-0@@','@@IMG:mob2-outra-1@@','@@IMG:mob2-outra-2@@','@@IMG:mob2-outra-3@@']],['O Espelho',['@@IMG:mob2-espelho-0@@','@@IMG:mob2-espelho-1@@','@@IMG:mob2-espelho-2@@','@@IMG:mob2-espelho-3@@']]].forEach(([h,a])=>a.forEach((u,i)=>MOBIMG2[h+'|'+i]=u));
// Títulos das Formas Verdadeiras
TITX.push(()=>Object.keys(S.defeated3||{}).map(h=>'Venceu '+DGH3[h].m.replace(/^(O|A) /,x=>x.toLowerCase())));
