/* ===== Variedade por rank: selos de atributo, Mente/Hábito/Surpresa novos, Missão do Mestre, lembretes ===== */

// ---------- Marcos de atributo (Força 25/50/100...): selo ao lado do valor ----------
const seloAtr=v=>v>=100?'<i class="sat s3" title="Marco 100">✦</i>':v>=50?'<i class="sat s2" title="Marco 50">✦</i>':v>=25?'<i class="sat s1" title="Marco 25">✦</i>':'';

// ---------- Surpresas por rank (somam às 3 originais) ----------
const SURR=[[],['Arrume uma gaveta ou uma prateleira','Escreva três coisas que você fez bem nesta semana','Passe 10 minutos ao ar livre, sem celular'],
 ['Ligue ou mande áudio para alguém de quem você gosta','Aprenda uma palavra ou fato novo e conte a alguém','Faça um alongamento de 5 minutos no meio do dia'],
 ['Cozinhe ou prepare algo simples com calma','Escreva um bilhete gentil para você mesmo e deixe à vista','Doe ou separe algo que você não usa mais'],
 ['Ensine algo pequeno a alguém','Faça uma caminhada observando cinco coisas bonitas','Agradeça por escrito a alguém que te ajudou'],
 ['Planeje um dia de descanso de verdade nesta semana','Releia uma recordação antiga e escreva o que mudou','Convide alguém para caminhar com você']];
// ---------- Práticas de Mente que chegam por rank (a cada 5 dias, a partir do rank C) ----------
const MENTR=[null,null,{t:'Mapa de valores',q:['Quais são os 3 valores mais importantes para você hoje?','Onde eles apareceram nesta semana?','Que escolha pequena amanhã honra o seu valor principal?']},
 {t:'Diálogo com a voz crítica',q:['O que a sua voz crítica disse hoje?','Responda a ela como um mestre gentil responderia.','O que você escolhe acreditar no lugar?']},
 {t:'Carta a um aprendiz',q:['Imagine alguém começando o caminho hoje. O que você diria no primeiro dia?','E no dia em que essa pessoa quisesse desistir?','Que hábito você recomendaria primeiro, e por quê?']},
 {t:'Contemplação do caminho',q:['O que o caminho te deu que você não esperava?','O que você ainda quer aprender?','Como você quer cuidar de si daqui a cinco anos?']}];
// ---------- Hábito: variações por rank, em dias alternados (rank C+) ----------
const HMR={'Celular e redes sociais':[CH('Passe uma refeição inteira sem celular na mesa'),CH('Desligue as notificações de um app por hoje')],'Jogos':[CH('Antes de jogar, cumpra uma tarefa importante do dia'),CH('Jogue com um alarme marcado para parar')],'Apostas':[CH('Revise as proteções do seu dinheiro (limites, bloqueios)'),CH('Fale com alguém de confiança sobre como está a vontade')],'Cigarro ou vape':[CH('Adie o primeiro uso do dia em 30 minutos'),CH('Troque um uso por 5 minutos de caminhada')],'Álcool':[CH('Tenha uma bebida sem álcool que você goste em casa'),CH('Alterne cada dose com um copo de água, se beber hoje')],'Outra coisa':[CH('Aplique uma barreira pequena ao hábito hoje'),CH('Anote o gatilho do dia e o que você fez no lugar')]};
// Atenção: dentro de PLAN_MODS não use myLvl()/totalXp() (eles chamam plan() e virariam recursão).
const rankBase=()=>rkI(lvlOf(S.xpPrev+dgXp()));
PLAN_MODS.push(ms=>{const r=rankBase();return ms.map(m=>{
 if(m.key==='sur'&&r>=1){const pool=SUR.concat(...SURR.slice(1,r+1));return Object.assign({},m,{steps:[CH(pool[(Math.floor(S.day/3)-1+pool.length)%pool.length])]})}
 if(m.key==='low'&&r>=2&&S.day%5===0&&!m.med&&!m.ret){const P=MENTR[Math.min(5,r)];if(P)return Object.assign({},m,{title:P.t,steps:[TM('Respire fundo e fique em silêncio por um momento',1,{breath:true})].concat(P.q.map(q=>({k:'write',name:q,min:[10,15,25][S.lvl]}))),min:2+P.q.length*3})}
 if(m.key==='hab'&&r>=2&&S.day%2===0){const h=(S.pull||[]).find(x=>HMR[x]);if(h)return Object.assign({},m,{steps:HMR[h].slice()})}
 return m})});

// ---------- Missão do Mestre: uma por rank, opcional, com prêmio maior ----------
const MMESTRE={1:{t:'A primeira lição',it:['Escreva por que você quer continuar no caminho','Caminhe 15 minutos sem celular','Durma no horário que você escolheu numa noite desta semana']},
 2:{t:'O vento no bambu',it:['Faça um treino ou Kata completo no nível que for confortável','Fique 20 minutos sem telas fazendo uma coisa só','Conte a alguém de confiança uma mudança que você percebeu em si']},
 3:{t:'A subida',it:['Cuide do sono por três noites seguidas','Escreva o seu plano para os dias difíceis','Faça algo gentil por alguém sem contar a ninguém']},
 4:{t:'O mestre ensina',it:['Ensine algo do seu caminho a alguém','Revise seus mandamentos e escolha um para os próximos meses','Faça uma caminhada longa e tranquila, no seu ritmo']},
 5:{t:'O pico',it:['Releia as cartas do velho mestre','Escreva o hábito que você quer levar para a vida','Agradeça, em voz alta ou por escrito, por ter chegado até aqui']}};
const MMestre={
 est(){return S.mm=S.mm||{}},
 card(){const r=rkI(myLvl());const M=MMESTRE[r];if(!M)return '';const e=MMestre.est(),c=e[r]=e[r]||{ck:{},ok:0};if(c.ok)return '';const n=Object.values(c.ck).filter(Boolean).length;
  return '<div class="card mmc"><span class="g">Missão do Mestre · rank '+RKN[r]+'</span><b>'+esc(M.t)+'</b><p class="note">Opcional, sem prazo. Feita no seu tempo, ao longo do rank.</p>'+M.it.map((t,i)=>'<button class="pvk'+(c.ck[i]?' on':'')+'" onclick="MMestre.ck('+r+','+i+')"><i>'+(c.ck[i]?'✓':'')+'</i><span>'+esc(t)+'</span></button>').join('')+'<p class="note">'+n+' de 3 · vale '+Math.round(80*(S.rkm||1))+' XP</p></div>'},
 ck(r,i){const c=MMestre.est()[r];c.ck[i]=!c.ck[i];if(MMESTRE[r].it.every((_,j)=>c.ck[j])&&!c.ok){c.ok=S.day;S.xpPrev+=Math.round(80*(S.rkm||1));try{Som.gongo()}catch(e){}}S.top=false;render()}
};
INI_CARDS.push(()=>MMestre.card());

// ---------- Lembretes: frases extras por rank ----------
const REMTXR=[{},{mente:['Bom dia, {n}. O templo das cachoeiras te espera. Cinco minutos de mente.'],treino:['{n}, a água insiste. Você também. Hora do treino.']},
 {mente:['Bom dia, {n}. Bambu verga e não quebra. Comece pequeno.'],noite:['{n}, feche o dia como quem guarda a lâmina: com cuidado.']},
 {treino:['{n}, a montanha não tem pressa. Um treino no seu ritmo.'],noite:['Antes de dormir, {n}: um minuto de silêncio já fecha o dia.']},
 {mente:['Bom dia, {n}. O dragão reconhece quem aparece. Apareça.'],treino:['{n}, o palácio espera. O treino de hoje pode ser leve.']},
 {mente:['Bom dia, mestre {n}. O caminho continua, um dia de cada vez.'],noite:['{n}, a lua cheia guarda o seu dia. Feche-o com gentileza.']}];
