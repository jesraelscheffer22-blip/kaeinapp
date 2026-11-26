/* ===== Provas de Ascensão dos ranks C, B, A e S =====
   Mesmo mecanismo da Prova D: o nível trava no limite (GATES) sem perder XP; a prova
   pode ser feita em qualquer dia, retomada, e nada se perde se não der hoje.
   4 provas por rank: Corpo, Mente, uma temática do rank e Disciplina (juramento).
   Corpo respeita o nível escolhido e a dor (dor ≥ 2 vira mobilidade). */
const PROVAX={
 20:{R:'C',k:'provaC',nome:'o portão do rank C',lugar:'Floresta de Bambu',img:'prova-c',
  abre:'Você chegou ao fim do rank D. A floresta de bambu está do outro lado do portão. Bambu não é o mais forte da floresta. É o que verga com o vento e não quebra. Quero ver isso em você.',
  mente:['O que o rank D te ensinou sobre recomeçar?','Qual hábito você protege hoje que antes deixava escapar?'],
  tema:{n:'A Lâmina da Atenção',tipo:'timer',min:3,txt:'Três minutos de atenção inteira. Sente-se, deixe o celular longe e observe a respiração. Se a mente fugir, traga de volta, sem bronca. Lâmina afiada é a que volta ao centro.'},
  jura:'Eu me comprometo a vergar sem quebrar: nos dias difíceis, faço o mínimo, mas não abandono o caminho.'},
 30:{R:'B',k:'provaB',nome:'o portão do rank B',lugar:'Montanha da Tempestade',img:'prova-b',
  abre:'A montanha não se importa com pressa. Lá em cima, o vento testa quem sobe. Você chegou ao fim do rank C. Mostre que o seu corpo e a sua mente andam juntos.',
  mente:['Qual foi a tempestade mais forte desde que você começou, e como passou por ela?','O que você faz hoje, sem pensar, que antes exigia esforço?'],
  tema:{n:'Cuidar antes de subir',tipo:'check',it:['Beba um copo de água com calma','Alongue pescoço, ombros e costas por 2 minutos','Caminhe leve por 5 minutos, no seu ritmo'],txt:'Quem sobe montanha aprende cedo: quem cuida do corpo chega. Quem ignora, para no meio.'},
  jura:'Eu me comprometo a cuidar do corpo como cuido da vontade: descansar também é treinar.'},
 40:{R:'A',k:'provaA',nome:'o portão do rank A',lugar:'Palácio do Dragão',img:'prova-a',
  abre:'Poucos chegam ao portão do Palácio. Aqui, a prova não é só sua. Um mestre de verdade sabe passar o caminho adiante. Você chegou ao fim do rank B.',
  mente:['Se você pudesse falar com quem você era no dia 1, o que diria?','Que parte de você ainda pede paciência?'],
  tema:{n:'O Dragão ensina',tipo:'write',min:30,q:'Escreva um conselho para alguém que está começando hoje. Use as suas palavras e a sua experiência.',txt:'O dragão guarda o tesouro, mas o mestre o distribui. Ensinar é a última forma de aprender.'},
  jura:'Eu me comprometo a ser gentil comigo nos dias em que falhar, como seria com um aluno.'},
 50:{R:'S',k:'provaS',nome:'o Pico da Lua',lugar:'Pico da Lua',img:'prova-s',
  abre:'Esta é a última prova. Não há portão no Pico da Lua: há só você, eu e o caminho que você percorreu. Não vou te testar. Vou te pedir que olhe para trás, e depois para frente.',
  mente:['Qual foi o momento em que você percebeu que tinha mudado?','O que você quer levar deste caminho para o resto da vida?'],
  tema:{n:'Carta ao primeiro dia',tipo:'write',min:40,q:'Escreva uma carta curta para você do primeiro dia. Ela fica guardada nas suas Recordações.',txt:'Antes de subir ao pico, todo mestre escreve para quem ele foi.'},
  jura:'Eu me comprometo a continuar caminhando, mesmo sem ranks para conquistar: o caminho é o prêmio.'}};
const Prova={
 // Grandfather: quem já viu o nível do portão (lvShown) não precisa fazer a prova.
 init(){Object.keys(PROVAX).forEach(g=>{const P=PROVAX[g];if(S[P.k]==null)S[P.k]=((S.lvShown||0)>=+g)?1:0})},
 // Portão pendente agora (só depois da Prova D).
 pendente(){if(S.provaD!==1)return null;let raw=0;try{raw=lvlRaw(totalXp())}catch(e){return null}for(const g of [20,30,40,50]){const P=PROVAX[g];if(S[P.k]!==1)return raw>=g?g:null}return null},
 pronta(){return !!Prova.pendente()},
 corpo(){const c=pvCorpo(),R=PROVAX[S.pvx.g].R;const nm={0:'Postura do Cavaleiro',1:'Garra do Tigre',2:'Muralha de Pedra'};return c.light?{light:1,it:c.it}:{light:0,it:c.it.map((x,i)=>nm[i]+': '+x)}},
 card(){const g=Prova.pendente();if(!g)return '';const P=PROVAX[g],go=S.pvx&&S.pvx.g===g&&S.pvx.st>0;
  return '<div class="card pvcard"><div class="pvci '+P.img+' af-'+P.img+'"></div><div class="pvct"><span class="g">Prova de Ascensão · Rank '+P.R+'</span><b>'+(g===50?'O Pico da Lua espera por você':'O portão do rank '+P.R+' está à sua frente')+'</b><p class="note">Seu XP do rank '+RKN[rkI(g)-1]+' está completo. Quatro provas, no seu ritmo. Se não der hoje, você não perde nada.</p><button class="mb on" onclick="Prova.abrir()">'+(go?'Continuar a prova':'Começar a prova')+'</button></div></div>'},
 abrir(){const g=Prova.pendente();if(!g)return;const p=S.pvx;if(!p||p.g!==g)S.pvx={g,st:0,ck:{},tx:{},t0:0,tf:0,retry:0,n:0};else if(p.st>0)p.retry=1;S.pvx.o=1;S.pvx.n=(S.pvx.n||0)+1;S.top=true;render()},
 fechar(){if(S.pvx)S.pvx.o=0;Prova.parar();S.top=true;render()},
 ir(n){S.pvx.st=n;S.pvx.n++;Prova.parar();render()},
 ck(i){S.pvx.ck[i]=!S.pvx.ck[i];S.pvx.n++;render()},
 tx(k,v){S.pvx.tx[k]=v;const b=document.getElementById('pvxgo');if(b)b.disabled=!Prova.textoOk()},
 textoOk(){const p=S.pvx,P=PROVAX[p.g];if(p.st===2)return (p.tx.m1||'').trim().length>=15&&(p.tx.m2||'').trim().length>=15;if(p.st===3&&P.tema.tipo==='write')return (p.tx.t||'').trim().length>=P.tema.min;return true},
 // cronômetro da prova temática
 iniciarTimer(){const p=S.pvx;p.t0=Date.now();p.tf=0;p.n++;render();Prova._t=setInterval(()=>{const P=PROVAX[p.g],l=P.tema.min*60000-(Date.now()-p.t0)*F(),e=document.getElementById('pvxt');if(e)e.textContent=fmt(Math.ceil(l/1000));if(l<=0){Prova.parar();p.tf=1;p.n++;try{Som.sino()}catch(_){}render()}},250)},
 parar(){clearInterval(Prova._t)},
 passar(){const p=S.pvx,P=PROVAX[p.g];if(P.tema.tipo==='write'&&(p.tx.t||'').trim())addDia(p.tx.t.trim(),'ms','Prova do rank '+P.R+' · '+P.tema.n);
  if((p.tx.m1||'').trim())addDia('Prova do rank '+P.R+'\n\n'+P.mente[0]+'\n'+p.tx.m1.trim()+'\n\n'+P.mente[1]+'\n'+(p.tx.m2||'').trim(),'ms','Prova do rank '+P.R+' · Mente');
  S[P.k]=1;S.pvxAt=S.pvxAt||{};S.pvxAt[P.R]=S.day;S.pvx=null;try{Som.selo()}catch(e){}S.top=true;render()},
 chave(){const p=S.pvx;return p&&p.o?'pvx'+p.g+'|'+p.st+'|'+p.n:''},
 view(){const p=S.pvx,P=PROVAX[p.g],st=p.st,nm=esc(S.name||''),K='<span class="g">Kaien</span>';
  const lv=Array.from({length:9},()=>'<i class="lf" style="left:'+Math.round(Math.random()*100)+'%;--d:'+(8+Math.random()*7).toFixed(1)+'s;--w:'+(Math.random()*60-30).toFixed(0)+'px;--s:'+(.6+Math.random()*.8).toFixed(2)+';animation-delay:-'+(Math.random()*12).toFixed(1)+'s"></i>').join('');
  const tit=(n,t)=>'<span class="g">Prova '+n+' de 4 · '+t+'</span>';let h='',b='';
  if(st===0){h='<span class="g">Prova de Ascensão · Rank '+P.R+'</span><b>'+esc(P.nome.charAt(0).toUpperCase()+P.nome.slice(1))+'</b>';
   b=(p.retry?'<p class="pvs">Voltou, '+nm+'. Sem pressa. Nada do que você conquistou se perdeu. '+K+'</p>':'')+'<p>“'+esc(P.abre)+'” '+K+'</p>'+((typeof Intencao!=='undefined'&&Intencao.lembrar(P.R))||'')+'<button class="cta" onclick="Prova.ir(1)">Começar a prova</button><button class="lk" onclick="Prova.fechar()">Agora não</button>'}
  else if(st===1){const c=Prova.corpo(),ok=c.it.every((x,i)=>p.ck[i]);h=tit(1,'Corpo')+'<b>O que o seu corpo aprendeu</b>';
   b='<p>“'+(c.light?'Hoje o seu corpo pede cuidado. A prova é de movimento, não de força.':'Mostre o que o seu corpo aprendeu. No seu ritmo, com controle.')+'” '+K+'</p><div class="pvl">'+c.it.map((x,i)=>'<button class="pvk'+(p.ck[i]?' on':'')+'" onclick="Prova.ck('+i+')"><i>'+(p.ck[i]?'✓':'')+'</i><span>'+esc(x)+'</span></button>').join('')+'</div><p class="note">Pare se sentir dor, tontura ou falta de ar. Parar também é sabedoria.</p><button class="cta" '+(ok?'':'disabled')+' onclick="Prova.ir(2)">Continuar</button><button class="lk" onclick="Prova.fechar()">Voltar depois</button>'}
  else if(st===2){h=tit(2,'Mente')+'<b>O silêncio</b>';
   b='<p>“Agora, as palavras. Escreva com sinceridade.” '+K+'</p><label>'+esc(P.mente[0])+'<textarea maxlength="500" oninput="Prova.tx(\'m1\',this.value)">'+esc(p.tx.m1||'')+'</textarea></label><label>'+esc(P.mente[1])+'<textarea maxlength="500" oninput="Prova.tx(\'m2\',this.value)">'+esc(p.tx.m2||'')+'</textarea></label><p class="note">Fica guardado só neste aparelho, nas suas Recordações.</p><button class="cta" id="pvxgo" '+(Prova.textoOk()?'':'disabled')+' onclick="Prova.ir(3)">Continuar</button><button class="lk" onclick="Prova.fechar()">Voltar depois</button>'}
  else if(st===3){const T=P.tema;h=tit(3,T.n)+'<b>'+esc(T.n)+'</b>';b='<p>“'+esc(T.txt)+'” '+K+'</p>';
   if(T.tipo==='timer'){const run=p.t0&&!p.tf;b+='<div class="pvxtm"><b id="pvxt">'+(p.tf?'0:00':fmt(T.min*60))+'</b></div>'+(p.tf?'<p class="pvs">Feito. A lâmina voltou ao centro.</p><button class="cta" onclick="Prova.ir(4)">Continuar</button>':run?'<p class="note">Respire devagar. Eu aviso quando acabar.</p>':'<button class="cta" onclick="Prova.iniciarTimer()">Começar os '+T.min+' minutos</button>')}
   else if(T.tipo==='check'){const ok=T.it.every((x,i)=>p.ck['t'+i]);b+='<div class="pvl">'+T.it.map((x,i)=>'<button class="pvk'+(p.ck['t'+i]?' on':'')+'" onclick="Prova.ck(\'t'+i+'\')"><i>'+(p.ck['t'+i]?'✓':'')+'</i><span>'+esc(x)+'</span></button>').join('')+'</div><button class="cta" '+(ok?'':'disabled')+' onclick="Prova.ir(4)">Continuar</button>'}
   else b+='<label>'+esc(T.q)+'<textarea maxlength="800" oninput="Prova.tx(\'t\',this.value)">'+esc(p.tx.t||'')+'</textarea></label><button class="cta" id="pvxgo" '+(Prova.textoOk()?'':'disabled')+' onclick="Prova.ir(4)">Continuar</button>';
   b+='<button class="lk" onclick="Prova.fechar()">Voltar depois</button>'}
  else{h=tit(4,'Disciplina')+'<b>A palavra</b>';b='<p>“A última prova não pede esforço. Pede palavra.” '+K+'</p><div class="pvq">'+esc(P.jura)+'</div><button class="cta" onclick="Prova.passar()">Eu me comprometo</button><button class="lk" onclick="Prova.ir(3)">Voltar</button>'}
  return '<div class="pv"><div class="pvi '+P.img+' af-'+P.img+'"></div>'+lv+'<div class="pvt">'+h+b+'</div></div>'}
};
MIGS.push(()=>Prova.init());
AFTER_RENDER.push(()=>Prova.init());
OVX.push({k:()=>Prova.chave(),v:()=>Prova.view()});
