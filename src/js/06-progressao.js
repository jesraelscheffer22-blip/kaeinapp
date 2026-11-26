const REW={2:{n:'Título: Aprendiz'},3:{n:'Capítulo 1 do mestre Kaien: a noite no pátio',m:1},4:{n:'Aura cinza do personagem e capítulo 2 do diário'},5:{n:'Nova roupa do personagem',m:1},6:{n:'Título: Constante'},7:{n:'Chefe: O Espelho'},8:{n:'Novo fundo: Templo das Cachoeiras',m:1},9:{n:'Capítulo 3 do diário'},10:{n:'Roupa nova do rank D e o título Aspirante',m:1},16:{n:'Novo fundo: Templo dos Dragões',m:1}};
const titlesOf=L=>{const a=[];if(L>=2)a.push('Aprendiz');if(L>=6)a.push('Constante');if(L>=10)a.push('Aspirante');Object.keys(S.defeated||{}).forEach(h=>a.push('Derrotou o '+DGH[h].m));return a};
// Custo de XP por nível. Metade do original (aprovado em 26/11/2026: "50% mais rápido").
// Original: XPC=[250,300,400,550,600,650,700,800,900,1000] e 1000+100*(L-10).
// O XP total do jogador não muda; quem já jogava apenas sobe de nível.
const XPC=[125,150,200,275,300,325,350,400,450,500];
const costOf=L=>L<=10?XPC[L-1]:500+50*(L-10);
const cum=L=>{let s=0;for(let i=1;i<L;i++)s+=costOf(i);return s};
const lvlRaw=x=>{let L=1;while(x>=cum(L+1))L++;return L};
const lvlOf=x=>{const L=lvlRaw(x);return(L>=10&&S.provaD!==1)?9:L};
const xpInOf=x=>{const L=lvlOf(x);return Math.min(costOf(L),x-cum(L))};
const myLvl=()=>lvlOf(totalXp());