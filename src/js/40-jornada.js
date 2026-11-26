/* ===== Jornada: painel no Início, Mapa do Caminho, Cartas, Intenção, Retorno gentil ===== */

// ---------- Painel da Jornada (Início) ----------
const JTILES=[
 ['mapa','🗺️','Mapa do Caminho','mapa'],['retiro','🍃','Retiro','retiro',1],['stats','📊','Constância','stats',1],
 ['mand','📜','Mandamentos','mandamentos'],['med','🌬️','Meditação','meditacao'],['galeria','🖼️','Galeria','galeria'],
 ['torneio','🏮','Torneio','torneio'],['escola','⛩️','Escola','escola'],['kata','🥋','Kata','kata'],['diario','✒️','Diário','diario'],
 ['templo','🏯','Meu Templo','templo'],['cenas','📖','Cenas','cenas'],['retro','🌕','Retrospectiva','retro'],['cartao','🎴','Cartão','cartao'],['mestre','⭐','Caminho do Mestre','mestre']];
const Jornada={
 card(){if(myLvl()<2)return '';const L=myLvl();
  const t=JTILES.map(x=>{const ok=x[4]||liberado(x[3]);return '<button class="jt'+(ok?'':' lk2')+'" '+(ok?'onclick="telaAbrir(\''+x[0]+'\')"':'disabled')+'><i>'+(ok?x[1]:'🔒')+'</i><b>'+x[2]+'</b>'+(ok?'':'<small>Nível '+UNL[x[3]]+'</small>')+'</button>'});
  return '<div class="card"><div class="mt"><span class="g">Jornada</span><b>O seu caminho</b></div><div class="jts">'+t.join('')+'</div></div>'}
};
INI_CARDS.push(()=>Jornada.card());

// ---------- Mapa do Caminho (A1) ----------
// 6 regiões, uma parada por nível. Cada parada mostra o prêmio, uma frase e a data em que você chegou.
const REG=[['E','Aldeia',1,9,'190,190,205','A aldeia ao pé da montanha. Onde todo mundo começa.'],['D','Templo das Cachoeiras',10,19,'150,180,225','O templo onde a água ensina a insistir.'],['C','Floresta de Bambu',20,29,'95,205,155','A floresta onde se aprende a vergar sem quebrar.'],['B','Montanha da Tempestade',30,39,'215,225,245','A montanha que testa quem sobe com pressa.'],['A','Palácio do Dragão',40,49,'255,200,90','O palácio onde o dragão reconhece quem não desistiu.'],['S','Pico da Lua',50,50,'210,180,255','O pico de onde se vê o caminho inteiro.']];
const MAPAF=['Um passo de cada vez.','Aqui você aprendeu a voltar.','Este trecho teve chuva. Você passou.','Lembra deste dia? Eu lembro.','A pedra desta parada tem a sua marca.','Daqui já dá para ver o próximo portão.','Você não estava sozinho neste trecho.','O caminho ficou mais leve depois daqui.','Uma parada para respirar e olhar para trás.','O portão estava perto. Você sabia.'];
const Mapa={
 v(){const L=myLvl(),sel=Math.min(50,S.telaX||L);const W=340,H=50*62+80;let path='',pts=[];
  for(let n=1;n<=50;n++){const y=H-40-(n-1)*62,x=W/2+Math.sin(n*0.9)*110;pts.push([x,y,n])}
  path='M'+pts.map(p=>p[0].toFixed(0)+' '+p[1].toFixed(0)).join(' L');
  const reg=n=>REG.find(r=>n>=r[2]&&n<=r[3]);
  const bands=REG.map(r=>{const y1=H-40-(r[3]-1)*62-30,y2=H-40-(r[2]-1)*62+30;return '<rect x="0" y="'+y1+'" width="'+W+'" height="'+(y2-y1)+'" fill="rgba('+r[4]+',.07)"/><text x="12" y="'+(y2-8)+'" class="mpr" fill="rgb('+r[4]+')">'+r[1]+'</text>'}).join('');
  const st=pts.map(p=>{const n=p[2],ok=L>=n,c=reg(n)[4],big=n%10===0||n===50;return '<g class="mps" onclick="S.telaX='+n+';render()"><circle cx="'+p[0].toFixed(0)+'" cy="'+p[1].toFixed(0)+'" r="'+(big?15:10)+'" fill="'+(ok?'rgb('+c+')':'#1a1630')+'" stroke="'+(n===sel?'#fff':'rgba('+c+',.8)')+'" stroke-width="'+(n===sel?4:2)+'"'+(n===L?' class="mpme"':'')+'/><text x="'+p[0].toFixed(0)+'" y="'+(p[1]+4).toFixed(0)+'" text-anchor="middle" font-size="'+(big?12:10)+'" fill="'+(ok?'#120d22':'#8a86a8')+'" font-weight="700">'+n+'</text></g>'}).join('');
  const r=reg(sel),rw=REW[sel],dt=S.lvd&&S.lvd[sel];
  const info='<div class="card mpinfo"><div class="mt"><span class="g">'+r[1]+' · Rank '+r[0]+'</span><b>Parada '+sel+'</b></div><p class="note">'+(rw?'Prêmio: <b>'+esc(rw.n)+'</b>':'Uma parada de caminhada.')+'</p><p class="note">“'+esc(sel<=L?MAPAF[sel%MAPAF.length]:r[5])+'” <span class="g">Kaien</span></p><p class="note">'+(sel>L?'Você ainda vai chegar aqui.':dt?'Você chegou aqui em '+fmtIso(dt)+'.':'Você chegou aqui antes de o mapa existir.')+'</p></div>';
  return tutH('mapa','Mapa do Caminho','Cada nível é uma parada. Toque numa parada para ver o que você ganhou ali e quando chegou.')+info+'<div class="mpw" id="mpw"><svg viewBox="0 0 '+W+' '+H+'" width="100%" class="mpsvg">'+bands+'<path d="'+path+'" fill="none" stroke="#5b4a2a" stroke-width="10" stroke-linecap="round" stroke-dasharray="1 14"/><path d="'+path+'" fill="none" stroke="rgba(217,179,106,.35)" stroke-width="3"/>'+st+'</svg></div>'},
 depois(){const w=document.getElementById('mpw');if(w&&!Mapa._rolou){Mapa._rolou=1;const L=myLvl();w.scrollTop=Math.max(0,(50-L)*62*w.scrollHeight/(50*62+80)-w.clientHeight/2)}}
};
TELAS.mapa={t:'Mapa do Caminho',v:()=>Mapa.v()};
AFTER_RENDER.push(()=>{if(S.tela==='mapa')Mapa.depois();else Mapa._rolou=0});

// ---------- Intenção do rank (E6) ----------
const INTP=['Calma','Constância','Coragem','Paciência','Cuidado','Foco','Leveza','Presença','Gratidão','Equilíbrio'];
const Intencao={
 rankAtual(){return rankOf(myLvl())},
 card(){const L=myLvl();if(L<10)return '';const R=Intencao.rankAtual();S.int=S.int||{};const i=S.int[R];
  if(i)return '<div class="card intc"><span class="g">Intenção do rank '+R+'</span><b>'+esc(i.w)+'</b>'+(i.f?'<p class="note">“'+esc(i.f)+'”</p>':'')+'</div>';
  const w=S.intW||'';return '<div class="card"><div class="mt"><span class="g">Novo rank, nova intenção</span><b>Que palavra vai guiar o seu rank '+R+'?</b></div><div class="kchips">'+INTP.map(p=>'<button class="mb '+(w===p?'on':'')+'" onclick="S.intW=\''+p+'\';S.top=false;render()">'+p+'</button>').join('')+'</div><input id="intf" maxlength="80" placeholder="Uma frase sua (opcional)" class="intin"><button class="mb on" '+(w?'':'disabled')+' onclick="Intencao.salvar()">Guardar intenção</button><p class="note">Ela aparece aqui no Início e eu vou lembrar dela na sua próxima ascensão.</p></div>'},
 salvar(){const R=Intencao.rankAtual(),e=document.getElementById('intf');S.int=S.int||{};S.int[R]={w:S.intW,f:e?e.value.trim():'',d:S.day};S.intW='';S.top=false;render()},
 lembrar(R){const i=S.int&&S.int[R];return i?'<p class="pvs">No começo do rank '+R+', você escolheu: “'+esc(i.w)+'”'+(i.f?'. '+esc(i.f):'')+'</p>':''}
};
INI_CARDS.unshift(()=>Intencao.card());

// ---------- Retorno gentil (E4) ----------
const Retorno={
 longe(){return S.hist.length>=2&&S.hist.slice(-2).every(h=>!h.active)&&!Object.values(S.ms).some(x=>x.st==='done')&&!(typeof Retiro!=='undefined'&&Retiro.ativo())},
 card(){if(!Retorno.longe()||S.retG===S.day)return '';return '<div class="card retc"><span class="g">O caminho continua aqui</span><b>Sem cobrança. Sem perda de nada.</b><p class="note">Seu XP, seus níveis e suas conquistas estão exatamente onde você deixou. Que tal um minuto só, para recomeçar?</p><div class="lvs"><button class="mb on" onclick="Retorno.um()">Missão de 1 minuto</button><button class="mb" onclick="S.retG=S.day;S.top=false;render()">Hoje não</button></div></div>'},
 um(){if(!(S.ms.low&&S.ms.low.st)){S.med={day:S.day,min:1,ret:1};S.retG=S.day;startGuide('low')}}
};
INI_CARDS.unshift(()=>Retorno.card());

// ---------- Cartas do Mestre (A6) e marcos de calendário (E1) ----------
// Cartas de rank: o velho mestre deixou cartas lacradas para quem chegasse longe. Cartas de calendário: do Kaien.
const CARTAS={
 n15:{de:'O velho mestre',t:'A primeira carta lacrada',x:`{n},

Se você está lendo isto, o Kaien achou que você merecia. Ele não entrega estas cartas a qualquer um.

Eu não te conheço. Mas sei uma coisa sobre você: já são {dias} dias desde que você subiu a escada do pátio, e você ainda está aqui. A maioria não passa da primeira semana.

Não vou te dar conselhos grandiosos. Só um: continue fazendo o pequeno. O pequeno, repetido, vira montanha.

Com respeito,
o velho mestre`},
 n20:{de:'O velho mestre',t:'Carta do rank C',x:`{n},

Você chegou à Floresta de Bambu. Quando eu era jovem, levei sete anos para chegar aqui. Você levou {dias} dias. Os tempos mudam, mas o esforço é o mesmo.

O bambu tem um segredo: por anos ele cresce só para baixo, criando raiz. Ninguém vê. Depois, sobe tão rápido que parece mágica. Não é. É raiz.

As suas raízes já estão aí: {missoes} missões cumpridas. Ninguém viu a maioria delas. Eu sei que estão lá.

o velho mestre`},
 n25:{de:'O velho mestre',t:'Sobre os monstros',x:`{n},

O Kaien me contou que você enfrenta {habito}. Não vou fingir que é fácil. Eu também tive os meus monstros, e alguns ainda aparecem quando estou cansado.

Aprendi que monstro não se vence numa luta só. Vence-se em mil pequenos nãos, e em alguns sins também: sim ao sono, sim à água, sim a pedir ajuda.

Se um dia ele ganhar uma rodada, não se castigue. Levante e continue a luta no dia seguinte. É o que os mestres fazem.

o velho mestre`},
 n30:{de:'O velho mestre',t:'Carta da Montanha',x:`{n},

A Montanha da Tempestade é onde eu quase desisti pela segunda vez. Conto isso para você saber que mestres também tremem.

Sua maior sequência até agora foi de {seq} dias seguidos. Não estou contando para te pressionar a bater esse número. Estou contando para te lembrar de que você é capaz de coisas que antes pareciam impossíveis.

Quando a tempestade vier, e ela vem, lembre: você não precisa subir rápido. Só não precisa descer.

o velho mestre`},
 n35:{de:'O velho mestre',t:'Sobre o descanso',x:`{n},

Deixe-me contar o que ninguém conta: os maiores mestres que conheci eram ótimos em descansar.

Eles dormiam cedo, comiam devagar, sabiam quando parar. Quem nunca descansa um dia quebra, e quebra de uma vez.

Você já está no caminho há {dias} dias. Se o corpo pedir pausa, use o Retiro. Não é fraqueza. É sabedoria de quem quer caminhar por anos, e não por semanas.

o velho mestre`},
 n40:{de:'O velho mestre',t:'Carta do Palácio',x:`{n},

Bem-vindo ao Palácio do Dragão. Poucos entram aqui.

Quero te pedir uma coisa. A partir de agora, preste atenção em quem está começando perto de você. Um amigo, um irmão, um colega. Você não precisa ensinar nada. Só ser gentil com quem tropeça, do jeito que alguém foi gentil com você.

É assim que um caminho vira tradição.

o velho mestre`},
 n45:{de:'O velho mestre',t:'O que fica',x:`{n},

Estou velho. Talvez esta seja uma das minhas últimas cartas.

Não guardei espada nem título. Guardei um hábito: levantar e agradecer pelo dia. Ele me segurou de pé por décadas.

Que hábito você vai carregar daqui para a frente, quando ninguém mais estiver contando os seus dias? Pense nele. Escolha com carinho. Ele vai ser a sua herança.

o velho mestre`},
 n50:{de:'O velho mestre',t:'A última carta',x:`{n},

Se você chegou ao Pico da Lua, então o meu aluno fez um bom trabalho. E você fez um trabalho ainda melhor.

{dias} dias. {missoes} missões. Nenhum deles foi perfeito, e todos eles contaram.

Agora o caminho é seu. Não existe mais rank para conquistar, só um jeito de viver para cuidar. Cuide dele como quem cuida de uma tocha no pátio: todos os dias, um pouco.

Foi uma honra.
o velho mestre`},
 d7:{de:'Kaien',t:'Uma semana',x:`{n},

Uma semana. Sete dias. Parece pouco, mas a maioria das pessoas que sobe a escada do pátio não chega até aqui.

Não vou te parabenizar por ter sido perfeito, porque ninguém é. Vou te parabenizar por ter continuado.

Amanhã é só mais um dia. É assim que se constrói tudo.

Kaien`},
 d30:{de:'Kaien',t:'Um mês',x:`{n},

Trinta dias. Lembra do primeiro? Eu lembro. Você não sabia se aguentaria.

Neste mês, você cumpriu {missoes} missões. Algumas foram fáceis, outras pesadas, algumas ficaram pela metade. Todas contam.

Se o próximo mês for mais difícil, tudo bem. Já sabemos que você volta.

Kaien`},
 d60:{de:'Kaien',t:'Dois meses',x:`{n},

Dois meses. Aqui o hábito começa a ter raiz.

Talvez você não sinta tanta empolgação quanto no começo. É normal. Empolgação é faísca; hábito é brasa. A brasa esquenta mais e dura mais.

Continue alimentando a brasa.

Kaien`},
 d100:{de:'Kaien',t:'Cem dias',x:`{n},

Cem dias. Eu acendi uma tocha extra no pátio hoje, só por você.

Sua maior sequência foi de {seq} dias. Você já enfrentou {habito}. Você já leu histórias minhas que nunca contei a ninguém.

Isso não é mais uma tentativa. É um caminho.

Kaien`},
 d200:{de:'Kaien',t:'Duzentos dias',x:`{n},

Duzentos dias. Às vezes eu esqueço que você começou do zero, porque agora você parece parte do pátio.

Obrigado por continuar aparecendo. Você me ensina também.

Kaien`},
 d365:{de:'Kaien',t:'Um ano',x:`{n},

Um ano inteiro. Quatro estações, centenas de manhãs.

Abra a Retrospectiva quando puder. Ela guarda o que este ano foi. Mas a verdade cabe numa frase: você não é mais quem subiu a escada naquele primeiro dia.

Feliz aniversário de caminho.

Kaien`}};
const Cartas={
 dados(t){const h=(S.pull||[]).filter(x=>!NONE.includes(x));return t.replace(/\{n\}/g,S.name||'viajante').replace(/\{dias\}/g,S.day).replace(/\{missoes\}/g,doneCount()).replace(/\{seq\}/g,Stats.melhorSeq()).replace(/\{habito\}/g,h.length?h[0].toLowerCase():'os seus hábitos')},
 // fila: cartas de rank (via GRANTS) e de calendário (dias de uso)
 checar(){S.cartas=S.cartas||{};S.cartaQ=S.cartaQ||[];[7,30,60,100,200,365].forEach(d=>{const k='d'+d;if(S.day>=d&&!S.cartas[k]&&S.cartaQ.indexOf(k)<0)S.cartaQ.push(k)})},
 abrir(k){S.cartaV=k;S.cartaN=(S.cartaN||0)+1;render()},
 fechar(){const k=S.cartaV;S.cartas=S.cartas||{};if(k&&!S.cartas[k])S.cartas[k]=S.day;S.cartaQ=(S.cartaQ||[]).filter(x=>x!==k);S.cartaV=null;S.top=true;render()},
 // mostra a próxima carta pendente quando nada mais está na frente
 chave(){if(S.cartaV)return 'carta'+S.cartaV;const q=S.cartaQ||[];if(q.length&&_ab&&!S.g&&!S.cel&&!S.lu&&!S.rcv&&!(S.pvx&&S.pvx.o)&&!S.pvo&&!S.scn&&!S.rd&&steps[S.i]&&steps[S.i].t==='day1'){S.cartaV=q[0];return 'carta'+q[0]}return ''},
 carta(){const k=S.cartaV,C=CARTAS[k];if(!C)return '';const novo=!(S.cartas&&S.cartas[k]);try{if(novo)Som.selo()}catch(e){}return '<div class="ctw"><div class="ctp"><div class="ctselo">'+(C.de==='Kaien'?'K':'師')+'</div><span class="g">'+esc(C.de)+'</span><b>'+esc(C.t)+'</b><div class="ctx">'+paras(Cartas.dados(C.x))+'</div><button class="cta" onclick="Cartas.fechar()">'+(novo?'Guardar a carta':'Fechar')+'</button></div></div>'},
 lista(){S.cartas=S.cartas||{};return Object.keys(CARTAS).filter(k=>S.cartas[k])},
 view(){const L=Cartas.lista();return L.length?L.map(k=>'<button class="card ctl" onclick="Cartas.abrir(\''+k+'\')"><span class="g">'+esc(CARTAS[k].de)+'</span><b>'+esc(CARTAS[k].t)+'</b><span class="note">Recebida no dia '+S.cartas[k]+'</span></button>').join(''):'<div class="card"><p class="note">Ainda não há cartas. A primeira chega na sua primeira semana de caminho. As do velho mestre chegam a cada 5 níveis, a partir do 15.</p></div>'}
};
OVX.push({k:()=>Cartas.chave(),v:()=>Cartas.carta()});
GRANTS.push(L=>{if(L>=15&&L%5===0&&CARTAS['n'+L]){S.cartaQ=S.cartaQ||[];S.cartas=S.cartas||{};if(!S.cartas['n'+L]&&S.cartaQ.indexOf('n'+L)<0)S.cartaQ.push('n'+L)}});
AFTER_RENDER.push(()=>Cartas.checar());
