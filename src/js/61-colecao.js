/* ===== Coleção: Galeria, Cartão de Discípulo, Missões de Cena, Estações, Caminho do Mestre ===== */

// ---------- Galeria de Cenas (D5) ----------
const Galeria={
 z(i){const it=Galeria._it&&Galeria._it[i];if(!it)return;S.galZ={html:it[0],leg:it[1]};S.galN=(S.galN||0)+1;render()},
 fechar(){S.galZ=null;render()},
 rever(g){if(g===10){persRank();return}S.rcv={lvl:g,replay:1};render()},
 v(){const L=myLvl(),rd=S.kread||{};let h=tutH('galeria','Galeria de Cenas','Todas as ilustrações que você já desbloqueou: fundos, capítulos e monstros. Toque para ampliar. Aqui você também pode rever as cinemáticas de ascensão.');
  const asc=[[10,'D','provaD'],[20,'C','provaC'],[30,'B','provaB'],[40,'A','provaA'],[50,'S','provaS']].filter(x=>S[x[2]]===1&&L>=x[0]);
  h+='<div class="card"><div class="mt"><span class="g">Ascensões</span><b>'+asc.length+' de 5</b></div><div class="glr">'+(asc.length?asc.map(x=>'<button class="glk" onclick="Galeria.rever('+x[0]+')">'+Emb.svg(x[1],58)+'<small>Rever o rank '+x[1]+'</small></button>').join(''):'<p class="note">A primeira ascensão é no nível 10.</p>')+'</div></div>';
  const fu=FUNDOS.filter(f=>L>=f[2]);Galeria._it=[];const zi=(html,leg)=>{Galeria._it.push([html,leg]);return Galeria._it.length-1};
  h+='<div class="card"><div class="mt"><span class="g">Fundos</span><b>'+fu.length+' de '+FUNDOS.length+'</b></div><div class="glg">'+fu.map(f=>'<button class="glt" onclick="Galeria.z('+zi('<div class="bg '+f[3]+'"></div>',esc(f[1]))+')"><div class="bg '+f[3]+'"></div><small>'+esc(f[1])+'</small></button>').join('')+'</div></div>';
  const caps=[];HIS.forEach(hs=>hs.ch.forEach((c,i)=>{const k=hs.id+':'+i;if(rd[k]&&(CHIMG[k]||CAPIMG[k]))caps.push([hs,i,c])}));
  h+='<div class="card"><div class="mt"><span class="g">Capítulos ilustrados</span><b>'+caps.length+'</b></div>'+(caps.length?'<div class="glg">'+caps.map(([hs,i,c])=>'<button class="glt" onclick="Galeria.z('+zi(capImgH(hs.id,i,hs),esc(c[1]))+')"><div class="glc">'+capImgH(hs.id,i,hs)+'</div><small>'+esc(c[1])+'</small></button>').join('')+'</div>':'<p class="note">Leia capítulos com ilustração para guardá-los aqui.</p>')+'</div>';
  const bs=Bestiario.lista().filter(e=>Bestiario.dia(e));
  h+='<div class="card"><div class="mt"><span class="g">Monstros vencidos</span><b>'+bs.length+'</b></div><div class="glg">'+bs.map(e=>'<div class="glt glm" style="--mc:'+(MCOL[e.h]||'200,160,255')+'">'+Bestiario.img(e)+'<small>'+esc(e.n)+'</small></div>').join('')+'</div></div>';
  return h},
 chave(){return S.galZ?'gal'+S.galN:''},
 ov(){const z=S.galZ;return '<div class="glz" onclick="Galeria.fechar()"><div class="glzi">'+z.html+'</div><p>'+z.leg+'</p><small>toque para fechar</small></div>'}
};
TELAS.galeria={t:'Galeria de Cenas',v:()=>Galeria.v()};
OVX.push({k:()=>Galeria.chave(),v:()=>Galeria.ov()});

// ---------- Cartão de Discípulo (D6): imagem para compartilhar, sem dados pessoais ----------
const Cartao={
 gerar(){const cv=document.createElement('canvas'),W=1080,H=1350;cv.width=W;cv.height=H;const x=cv.getContext('2d'),L=myLvl(),R=rankOf(L),rc=(Emb.cor[R]||Emb.cor.E)[0],au=auraRgb()||'217,179,106';
  const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a1440');g.addColorStop(1,'#05050f');x.fillStyle=g;x.fillRect(0,0,W,H);
  const rg=x.createRadialGradient(W/2,560,40,W/2,560,520);rg.addColorStop(0,'rgba('+au+',.35)');rg.addColorStop(1,'rgba('+au+',0)');x.fillStyle=rg;x.fillRect(0,0,W,H);
  x.strokeStyle='#d9b36a';x.lineWidth=6;x.strokeRect(36,36,W-72,H-72);x.strokeStyle='rgba(142,31,26,.8)';x.lineWidth=2;x.strokeRect(54,54,W-108,H-108);
  const fim=()=>{x.textAlign='center';x.fillStyle='#f1d48a';x.font='900 64px Georgia, serif';x.fillText('KAIEN',W/2,150);
   x.fillStyle=rc;x.font='700 92px Georgia, serif';x.fillText('Rank '+R+' · Nível '+L,W/2,1120);
   x.fillStyle='#eadbb8';x.font='italic 48px Georgia, serif';x.fillText(S.cartNome&&S.name?S.name:(S.eq.title||'Discípulo do Caminho'),W/2,1200);
   x.fillStyle='rgba(234,219,184,.6)';x.font='30px Georgia, serif';x.fillText(S.day+' dias no caminho',W/2,1260);
   try{cv.toBlob(b=>{if(!b){S.cartMsg='Não consegui gerar a imagem neste aparelho.';render();return}Cartao.blob=b;Cartao.url&&URL.revokeObjectURL(Cartao.url);Cartao.url=URL.createObjectURL(b);S.cartMsg='';S.cartOk=(S.cartOk||0)+1;render()},'image/png')}catch(e){S.cartMsg='Não consegui gerar a imagem neste aparelho.';render()}};
  // personagem: usa a imagem da roupa atual
  const el=document.createElement('div');el.className='av '+outCls();document.body.appendChild(el);const bi=getComputedStyle(el).backgroundImage;el.remove();const m=bi&&bi.match(/url\("?(.*?)"?\)/);
  const emb=new Image();emb.onload=()=>{x.drawImage(emb,W/2-90,170,180,180);if(m){const im=new Image();im.onload=()=>{const h2=700,w2=im.width*h2/im.height;x.save();x.shadowColor='rgba('+au+',.9)';x.shadowBlur=40;x.drawImage(im,W/2-w2/2,360,w2,h2);x.restore();fim()};im.onerror=fim;im.src=m[1]}else fim()};emb.onerror=fim;
  emb.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(Emb.svg(R,180).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '))},
 compartilhar(){const b=Cartao.blob;if(!b)return;try{const f=new File([b],'kaien-cartao.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:'Meu caminho no Kaien'}).catch(()=>{});return}}catch(e){}
  try{const a=document.createElement('a');a.href=Cartao.url;a.download='kaien-cartao.png';document.body.appendChild(a);a.click();a.remove();S.cartMsg='Se o download não começar, toque e segure a imagem para salvar.';render()}catch(e){}},
 v(){return tutH('cartao','Cartão de Discípulo','Uma imagem do seu personagem com rank, nível e título, para compartilhar se quiser. Por padrão, sem o seu nome.')+'<div class="card"><label class="note" style="display:flex;gap:8px;align-items:center"><input type="checkbox" style="width:auto" '+(S.cartNome?'checked':'')+' onchange="S.cartNome=this.checked;render()">Mostrar o meu apelido no cartão</label><button class="mb on" onclick="Cartao.gerar()">Gerar cartão</button>'+(Cartao.url&&S.cartOk?'<img class="cartimg" alt="Cartão de Discípulo" src="'+Cartao.url+'"><button class="mb on" onclick="Cartao.compartilhar()">Compartilhar ou salvar</button>':'')+(S.cartMsg?'<p class="note">'+esc(S.cartMsg)+'</p>':'')+'<p class="note">O cartão não mostra idade, peso, hábitos nem nada do seu diário.</p></div>'}
};
TELAS.cartao={t:'Cartão de Discípulo',v:()=>Cartao.v()};

// ---------- Missões de Cena (B7): micro-histórias com escolhas, a cada 3 níveis a partir do 31 ----------
// Toda escolha é válida: há a "melhor" e a "ok", nunca punição. Cada uma ensina um conceito.
const CENAS=[
 {id:'fumaca',lv:31,t:'A pausa do café',x:'Depois do almoço, um colega te chama para a pausa de sempre. Ele estende o maço, ou o vape, como faz todo dia. A vontade aparece na hora, junto com o cheiro do café.',
  o:[['Digo que vou esperar 10 minutos e bebo um copo de água antes de decidir.','m','Isso. A vontade é uma onda: sobe, chega no topo e desce. Dez minutos e um copo de água costumam bastar para ela passar.'],['Acompanho o colega, mas fico só no café.','o','Também vale. Estar no ambiente é mais difícil, mas você manteve a escolha. Com o tempo, trocar de lugar na pausa ajuda ainda mais.'],['Saio para caminhar 5 minutos e volto.','m','Sair do ambiente é uma das ferramentas mais fortes. Você trocou o gatilho por movimento.']],eco:'Lembra da pausa do café? A vontade passa. Você já provou isso.'},
 {id:'aposta',lv:34,t:'O convite do grupo',x:'No grupo de amigos, alguém manda um link: "Bônus de boas-vindas, aposta grátis, todo mundo vai entrar no jogo de hoje." O celular vibra várias vezes.',
  o:[['Silencio o grupo por hoje e combino de ver o jogo sem apostar.','m','Silenciar é proteger a sua atenção. Ver o jogo pode continuar sendo bom, sem dinheiro em risco.'],['Respondo que estou fora das apostas por um tempo.','m','Dizer em voz alta fortalece a decisão. E abre espaço para alguém do grupo dizer "eu também".'],['Ignoro a mensagem e deixo o celular em outro cômodo.','o','Funciona. Distância física da tentação é uma barreira real. Se a vontade insistir, converse com alguém de confiança.']],eco:'Bônus de boas-vindas é isca. Você aprendeu a ver o anzol.'},
 {id:'madrugada',lv:37,t:'Meia-noite e meia',x:'Você está na cama. O dia foi bom. O celular está na mão, e o vídeo seguinte já está começando. Amanhã você acorda cedo.',
  o:[['Coloco o celular para carregar longe da cama e apago a luz.','m','Distância é tudo. O que está longe da mão quase sempre fica longe da cabeça.'],['Assisto só até o fim deste e paro.','o','Pode funcionar, mas o próximo vídeo é feito para te pegar. Um alarme ou o modo descanso do celular ajudam a cumprir.'],['Anoto num papel o que estava na cabeça e deito.','m','Tirar os pensamentos da cabeça e pôr no papel ajuda a mente a desligar.']],eco:'Celular longe da cama. Sono decide o dia seguinte.'},
 {id:'dor',lv:40,t:'A pontada',x:'No meio do treino, sente uma pontada no joelho. Não é insuportável. Mas é diferente do cansaço de sempre. Faltam duas séries.',
  o:[['Paro o treino e registro "Parei por dor".','m','Essa é a escolha de quem quer treinar por anos. Dor diferente do cansaço é aviso. Se continuar, procure um profissional.'],['Troco por uma versão mais leve, sem o movimento que doeu.','o','Pode ser uma boa adaptação, desde que a dor não volte. Se voltar, pare e descanse.'],['Faço só o alongamento final, com cuidado.','m','Respeitar o corpo também é treino. O progresso continua amanhã.']],eco:'Seu corpo vem primeiro. Sempre.'},
 {id:'recaida',lv:43,t:'Depois de semanas',x:'Foram semanas firmes. Ontem, num dia ruim, o hábito antigo voltou. Hoje você acordou com a voz dizendo: "Viu? Não adianta."',
  o:[['Volto hoje ao plano, com uma missão pequena.','m','Recaída não apaga semanas. O que importa é o dia seguinte, e você está nele.'],['Conto a alguém de confiança o que aconteceu.','m','Dizer em voz alta tira o peso da vergonha. E vergonha é combustível de recaída.'],['Escrevo no diário o que disparou a vontade.','o','Bom. Entender o gatilho é preparar a próxima vez. Só não fique preso na culpa: volte também para o plano.']],eco:'Ontem não decide hoje. Você voltou.'},
 {id:'zombaria',lv:46,t:'A piada',x:'Um conhecido ri do seu "aplicativo de monge" e diz que isso não serve para nada. Algumas pessoas riem junto.',
  o:[['Sorrio e sigo o meu caminho, sem precisar explicar.','m','Você não precisa da aprovação de ninguém para cuidar de si. Como o Tobi, você só continua aparecendo.'],['Explico com calma o que tem me ajudado.','o','Pode ser bom, se você quiser. Às vezes a piada esconde curiosidade. Mas você não deve explicação.'],['Convido a pessoa para uma caminhada qualquer dia.','m','Gentileza desarma. E talvez você ajude alguém que também precisa.']],eco:'Ninguém precisa entender o seu caminho para ele valer.'},
 {id:'aluno',lv:49,t:'O iniciante',x:'Alguém próximo conta que quer começar a se cuidar, mas não sabe por onde. A pessoa parece com você no primeiro dia.',
  o:[['Sugiro começar pequeno: 5 minutos por dia e muita água.','m','Comece pequeno. É o primeiro ensinamento, e o mais verdadeiro.'],['Conto um pouco do meu caminho, inclusive das quedas.','m','Mostrar as cicatrizes ensina mais que mostrar as medalhas.'],['Digo que estou aqui se ela precisar de companhia.','m','Isso é sentar ao lado no pátio. É o que o meu mestre fez por mim.']],eco:'Agora você também é tocha acesa para alguém.'}];
const Cenas={
 disp(){return CENAS.filter(c=>myLvl()>=c.lv)},
 pend(){S.cenas=S.cenas||{};return Cenas.disp().filter(c=>!S.cenas[c.id])},
 escolher(id,i){const c=CENAS.find(x=>x.id===id);S.cenas=S.cenas||{};if(S.cenas[id])return;S.cenas[id]={c:i,day:S.day};const x=Math.round(50*(S.rkm||1));S.xpPrev+=x;S.cenaEco={t:c.eco,d:S.day};try{Som.pincel()}catch(e){}S.top=false;render()},
 v(){const L=Cenas.disp();if(!L.length)return '<div class="card"><p class="note">A primeira Missão de Cena chega no nível 31.</p></div>';
  return tutH('cenas','Missões de Cena','Uma pequena história com escolhas. Não há escolha errada: algumas são melhores, outras são ok. Cada cena vale XP uma vez e muda uma fala do Kaien.')
  +L.slice().reverse().map(c=>{const r=S.cenas&&S.cenas[c.id];return '<div class="card cnc"><span class="g">Cena · nível '+c.lv+'</span><b>'+esc(c.t)+'</b><p class="note">'+esc(c.x)+'</p>'+(r?'<div class="pvq">'+esc(c.o[r.c][0])+'</div><p class="pvs">“'+esc(c.o[r.c][2])+'” <span class="g">Kaien</span></p>'+(c.o[r.c][1]==='m'?'':'<p class="note">Outras saídas: '+c.o.filter(o=>o[1]==='m').map(o=>esc(o[0])).join(' / ')+'</p>'):c.o.map((o,i)=>'<button class="pvk" onclick="Cenas.escolher(\''+c.id+'\','+i+')"><i>'+String.fromCharCode(65+i)+'</i><span>'+esc(o[0])+'</span></button>').join('')+'<p class="note">Vale '+Math.round(50*(S.rkm||1))+' XP.</p>')+'</div>'}).join('')}
};
TELAS.cenas={t:'Missões de Cena',v:()=>Cenas.v()};
INI_CARDS.push(()=>Cenas.pend().length?'<div class="card trnc" onclick="telaAbrir(\'cenas\')"><span class="g">Missão de Cena</span><b>'+esc(Cenas.pend()[0].t)+'</b><span class="note">Uma pequena história com escolhas. Toque para ler.</span></div>':'');
// a cena muda a fala de hoje do Kaien por 3 dias
const _falaHoje0=falaHoje;falaHoje=function(){const e=S.cenaEco;if(e&&S.day-e.d<3)return e.t;return _falaHoje0()};

// ---------- Estações e clima (A2): só visual; desliga com "Reduzir efeitos" ----------
// Hemisfério sul: primavera set–nov, verão dez–fev, outono mar–mai, inverno jun–ago.
const Estacao={
 atual(){const m=new Date().getMonth();return m>=8&&m<=10?'primavera':m===11||m<=1?'verao':m<=4?'outono':'inverno'},
 hora(){const h=new Date().getHours();return h>=5&&h<9?'amanhecer':h>=17&&h<19?'entardecer':h>=19||h<5?'noite':'dia'},
 aplicar(){const app=document.getElementById('app');if(!app)return;let el=document.getElementById('est');const off=Cfg.rfx()||!(steps[S.i]&&steps[S.i].t==='day1')||S.cfg.est===0;
  if(off){if(el)el.remove();return}
  const k=Estacao.atual()+' '+Estacao.hora();if(el&&el.dataset.k===k)return;if(!el){el=document.createElement('div');el.id='est';const ui=document.getElementById('ui');app.insertBefore(el,ui)}
  el.dataset.k=k;el.className='est-'+Estacao.atual()+' hora-'+Estacao.hora();const n=12;el.innerHTML=Array.from({length:n},()=>'<i style="left:'+(Math.random()*100).toFixed(0)+'%;animation-delay:-'+(Math.random()*14).toFixed(1)+'s;animation-duration:'+(10+Math.random()*8).toFixed(1)+'s;--dx:'+((Math.random()-.5)*120).toFixed(0)+'px"></i>').join('')}
};
AFTER_RENDER.push(()=>Estacao.aplicar());

// ---------- O Caminho do Mestre (pós-nível 50): Estrelas de Mestre a cada 5 níveis ----------
const ESTRELAS=[[1,'Estrela da Aurora'],[2,'Lua Crescente'],[3,'Lua Cheia'],[4,'Eterno Aprendiz'],[5,'Lenda do Pátio'],[10,'Mestre das Mil Manhãs']];
const Mestre={
 estrelas(){const L=myLvl();return L<50?0:Math.floor((L-50)/5)},
 renovar(h){if(Mestre.renovaveis()<1)return;S.renov=(S.renov||0)+1;S.dgNx=S.dgNx||{};Object.keys(S.dgNx).filter(k=>k.indexOf(h)===0).forEach(k=>delete S.dgNx[k]);if(S.dgAll&&S.dgAll[h]&&S.dgAll[h].won){dgBank(h);delete S.dgAll[h]}S.tela=null;setTab('dun');enterDg(h,1,0)},
 renovaveis(){return Mestre.estrelas()-(S.renov||0)},
 v(){const L=myLvl(),n=Mestre.estrelas(),prox=50+(n+1)*5;
  if(L<50)return '<div class="card"><p class="note">O Caminho do Mestre abre no rank S, nível 50.</p></div>';
  return '<div class="card mstc"><span class="g">O Caminho do Mestre</span><b>'+'★'.repeat(Math.min(n,10))+(n?'':'Nenhuma estrela ainda')+'</b><p class="note">O rank S não é o fim. Os níveis continuam, e a cada 5 níveis você ganha uma Estrela de Mestre. Próxima estrela no nível '+prox+' (faltam '+(costOf(L)-xpInOf(totalXp()))+' XP para o nível '+(L+1)+').</p></div>'
  +'<div class="card"><div class="mt"><span class="g">Títulos lendários</span></div>'+ESTRELAS.map(e=>'<p class="note">'+(n>=e[0]?'★ <b>'+esc(e[1])+'</b>':'☆ '+esc(e[1])+' · '+e[0]+' estrela'+(e[0]>1?'s':''))+'</p>').join('')+'</div>'
  +'<div class="card"><div class="mt"><span class="g">Renovar uma dungeon</span><b>'+Mestre.renovaveis()+' disponível(is)</b></div><p class="note">Cada estrela permite renovar uma dungeon já vencida: ela volta do começo, com XP cheio, para revisitar um hábito antigo.</p>'+(Mestre.renovaveis()>0?'<div class="kchips">'+Object.keys(S.defeated||{}).map(h=>'<button class="mb" onclick="Mestre.renovar(\''+h+'\')">'+esc(h)+'</button>').join('')+'</div>':'')+'</div>'
  +'<button class="mb on" onclick="telaAbrir(\'retro\')">Relatório anual e retrospectiva</button>'}
};
TELAS.mestre={t:'Caminho do Mestre',v:()=>Mestre.v()};
TITX.push(()=>ESTRELAS.filter(e=>Mestre.estrelas()>=e[0]).map(e=>e[1]));
