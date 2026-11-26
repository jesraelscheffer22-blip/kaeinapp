/* ===== Emblemas de rank (SVG vetorial, nítido em qualquer tamanho) ===== */
const Emb={
 cor:{E:['#9aa0b4','#3a3d4a'],D:['#a9c4ee','#2a3550'],C:['#d29a5c','#2f7a5a'],B:['#e6eef8','#5a7fb0'],A:['#f1d48a','#a3241d'],S:['#fff4d6','#9b6cff']},
 svg(R,sz){const c=Emb.cor[R]||Emb.cor.E,id='em'+R+Math.random().toString(36).slice(2,6);let shape='',deco='';
  const poly=(n,r,rot)=>Array.from({length:n},(_,i)=>{const a=rot+i*2*Math.PI/n;return (50+r*Math.cos(a)).toFixed(1)+','+(50+r*Math.sin(a)).toFixed(1)}).join(' ');
  if(R==='C'){shape='<polygon points="'+poly(8,44,Math.PI/8)+'" fill="url(#g'+id+')" stroke="'+c[0]+'" stroke-width="3"/>';deco='<g stroke="'+c[1]+'" stroke-width="3.2" stroke-linecap="round"><path d="M30 80 40 18M50 84V14M70 80 60 18"/></g><g fill="'+c[1]+'"><path d="M40 30c8-4 14-2 18 2-8 2-12 1-18-2zM50 46c-8-4-14-2-18 2 8 2 12 1 18-2zM60 60c8-4 14-2 18 2-8 2-12 1-18-2z"/></g>'}
  else if(R==='B'){shape='<polygon points="'+poly(6,45,-Math.PI/2)+'" fill="url(#g'+id+')" stroke="'+c[0]+'" stroke-width="3"/>';deco='<g stroke="'+c[0]+'" stroke-width="2.4" stroke-linecap="round" opacity=".8">'+[0,1,2].map(i=>{const a=i*Math.PI/3;return '<path d="M'+(50+30*Math.cos(a)).toFixed(1)+' '+(50+30*Math.sin(a)).toFixed(1)+'L'+(50-30*Math.cos(a)).toFixed(1)+' '+(50-30*Math.sin(a)).toFixed(1)+'"/>'}).join('')+'</g><path d="M24 70 40 46 50 58 62 38 78 70Z" fill="'+c[1]+'" opacity=".9"/>'}
  else if(R==='A'){shape='<circle cx="50" cy="50" r="45" fill="url(#g'+id+')" stroke="'+c[0]+'" stroke-width="3"/>';deco='<path d="M22 64c10-22 26-30 40-26 10 3 14 12 8 18-6 6-16 2-14-6 1-6 9-7 12-3" fill="none" stroke="'+c[1]+'" stroke-width="4.5" stroke-linecap="round"/><circle cx="68" cy="30" r="3" fill="'+c[1]+'"/>'}
  else if(R==='S'){shape='<g stroke="'+c[0]+'" stroke-width="2" opacity=".85">'+Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return '<path d="M'+(50+38*Math.cos(a)).toFixed(1)+' '+(50+38*Math.sin(a)).toFixed(1)+'L'+(50+48*Math.cos(a)).toFixed(1)+' '+(50+48*Math.sin(a)).toFixed(1)+'"/>'}).join('')+'</g><circle cx="50" cy="50" r="36" fill="url(#g'+id+')" stroke="'+c[0]+'" stroke-width="3"/>';deco='<circle cx="58" cy="44" r="18" fill="'+c[1]+'" opacity=".35"/>'}
  else{shape='<polygon points="50,4 96,50 50,96 4,50" fill="url(#g'+id+')" stroke="'+c[0]+'" stroke-width="3"/>'}
  return '<svg viewBox="0 0 100 100" width="'+(sz||120)+'" height="'+(sz||120)+'" class="emb" role="img" aria-label="Emblema do rank '+R+'"><defs><radialGradient id="g'+id+'" cx="50%" cy="40%"><stop offset="0" stop-color="'+c[1]+'" stop-opacity=".55"/><stop offset="1" stop-color="#0b0a1c"/></radialGradient></defs>'+shape+deco+'<text x="50" y="62" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="34" fill="'+c[0]+'" stroke="#0b0a1c" stroke-width="1.2">'+R+'</text></svg>'}
};

/* ===== Cinemáticas de ascensão C (7 atos), B (8), A (9), S (12) =====
   Cada ato: d (ms), t (texto grande), s (fala), fx (partículas), bg (0 = fundo antigo, 1 = novo),
   em (0 escondido, 1 aparece, 2 brilha), av (1 = personagem com a roupa nova), fl (flash), sh (tremor), som. */
const CINE={
 2:{R:'C',cor:'210,160,95',fundo:'fd fd-bambu af-bg-bambu',velho:'t3',roupa:3,atos:[
  {d:2800,t:'O portão se abre',s:'Você deixou o rank D para trás. Escute.',fx:'folhas',som:'sino'},
  {d:3000,t:'O vento atravessa o bambu',s:'Bambu verga. Não quebra.',fx:'bambu',bg:1,som:'vento'},
  {d:2600,t:'Cada volta afiou a lâmina',fx:'laminas',bg:1,fl:1,som:'brilho'},
  {d:3000,t:'RANK C',fx:'bambu',bg:1,em:1,sh:1,som:'gongo'},
  {d:3000,t:'Bronze e jade',s:'A roupa do rank C já é sua.',fx:'bambu',bg:1,em:2,av:1,som:'selo'},
  {d:4200,s:'Eu vi você vergar e voltar, {n}. Seja bem-vindo à Floresta de Bambu.',fx:'bambu',bg:1,em:2,av:1,fala:1}]},
 3:{R:'B',cor:'205,222,245',fundo:'fd fd-montanha af-bg-montanha',velho:'fd fd-bambu af-bg-bambu',roupa:4,atos:[
  {d:2800,t:'A montanha te chamou',s:'O ar fica mais frio a cada passo.',fx:'neve',som:'vento'},
  {d:2800,t:'O vento sobe',fx:'nevasca',bg:1,som:'vento'},
  {d:2400,t:'A tempestade testa quem sobe',fx:'nevasca',bg:1,fl:1,sh:1,som:'trovao'},
  {d:3000,t:'Você não desceu',s:'Choveu, ventou, e você continuou.',fx:'neve',bg:1},
  {d:3000,t:'RANK B',fx:'neve',bg:1,em:1,fl:1,som:'gongo'},
  {d:3000,t:'Prata e gelo',s:'A roupa do rank B já é sua.',fx:'neve',bg:1,em:2,av:1,som:'selo'},
  {d:4400,s:'Lá embaixo, {n}, muitos desistiram com a primeira nuvem. Você é feito de outra pedra.',fx:'neve',bg:1,em:2,av:1,fala:1}]},
 4:{R:'A',cor:'255,200,90',fundo:'fd fd-palacio af-bg-palacio',velho:'fd fd-montanha af-bg-montanha',roupa:5,atos:[
  {d:2600,t:'Os portões do Palácio',s:'Poucos ouviram este som.',fx:'brasas',som:'tambor'},
  {d:2600,t:'As tochas se acendem',fx:'brasas',bg:1,som:'tambor'},
  {d:3200,t:'O dragão desperta',fx:'dragao',bg:1,sh:1,som:'trovao'},
  {d:3000,t:'Tudo o que você construiu brilha',fx:'ouro',bg:1,som:'brilho'},
  {d:3000,t:'RANK A',fx:'ouro',bg:1,em:1,fl:1,som:'gongo'},
  {d:3000,t:'Ouro e carmesim',s:'A roupa do rank A já é sua.',fx:'ouro',bg:1,em:2,av:1,som:'selo'},
  {d:3400,t:'Lian, Bao e Jin se curvam',s:'Seus companheiros reconhecem o caminho que você fez.',fx:'ouro',bg:1,em:2,av:1},
  {d:4600,s:'O dragão não te deu nada, {n}. Ele só reconheceu o que você construiu, um dia de cada vez.',fx:'ouro',bg:1,em:2,av:1,fala:1}]},
 5:{R:'S',cor:'235,215,255',fundo:'fd fd-lua af-bg-lua',velho:'fd fd-palacio af-bg-palacio',roupa:6,atos:[
  {d:2600,t:'Silêncio',s:'Respire. Só desta vez, não há pressa nenhuma.',fx:'',som:'sino'},
  {d:3200,t:'Dia 1',s:'Você chegou sem saber se aguentaria.',fx:'folhas'},
  {d:3000,t:'{dias} dias em movimento',fx:'folhas'},
  {d:3000,t:'{missoes} missões cumpridas',fx:'brasas'},
  {d:3400,t:'E · D · C · B · A',s:'Cada rank foi um portão. Você atravessou todos.',fx:'ranks',som:'tambor'},
  {d:3200,t:'A lua cheia nasce',fx:'lua',bg:1,som:'vento'},
  {d:3000,t:'A aura desperta',fx:'ouro',bg:1,som:'brilho'},
  {d:3200,t:'RANK S',fx:'ouro',bg:1,em:1,fl:1,sh:1,som:'gongo'},
  {d:3200,t:'O manto do mestre',s:'Ouro branco e roxo lunar. É seu.',fx:'lua',bg:1,em:2,av:1,som:'selo'},
  {d:4800,s:'Meu mestre me disse, no dia em que cheguei aqui: o pico não é o fim do caminho, é onde se enxerga o caminho inteiro.',fx:'lua',bg:1,em:2,av:1,fala:1},
  {d:4400,s:'Você agora é Mestre do Caminho, {n}. E eu tenho orgulho de ter andado ao seu lado.',fx:'lua',bg:1,em:2,av:1,fala:1}]}
};
const Cine={_t:[],
 // texto com dados do jogador
 txt(x){const dias=S.hist.filter(h=>h.active).length+(todayActive()?1:0);return String(x||'').replace('{n}',S.name||'viajante').replace('{dias}',dias).replace('{missoes}',doneCount())},
 particulas(){const rf=Cfg.rfx(),n=rf?6:22,mk=(c,k)=>Array.from({length:k||n},(_,i)=>'<i class="'+c+'" style="left:'+(Math.random()*100).toFixed(1)+'%;animation-delay:-'+(Math.random()*8).toFixed(1)+'s;animation-duration:'+(4+Math.random()*5).toFixed(1)+'s;--dx:'+((Math.random()-.5)*120).toFixed(0)+'px"></i>').join('');
  return '<div class="cnp p-folhas">'+mk('cnl')+'</div><div class="cnp p-bambu">'+mk('cnl cnj')+'</div><div class="cnp p-neve p-nevasca">'+mk('cns',rf?10:40)+'</div><div class="cnp p-brasas p-dragao">'+mk('cnb')+'</div><div class="cnp p-ouro">'+mk('cno',rf?8:30)+'</div><div class="cnp p-lua">'+mk('cno cnv')+'</div>'},
 view(lvl){const r=rkI(lvl),C=CINE[r];if(!C)return rankView(lvl);const nm=esc(S.name||'');
  const fim=Cine.fimH(lvl);
  return '<div class="cn" id="cn" style="--rc:'+C.cor+'"><button class="rks" onclick="Cine.pular()">Pular</button><div class="bg '+C.velho+' cnb0"></div><div class="bg '+C.fundo+' cnb1"></div><div class="cnvig"></div>'+Cine.particulas()
  +'<div class="cnsl"><i></i><i></i><i></i></div><svg class="cndr" viewBox="0 0 400 200"><path d="M-40 150C40 60 100 170 170 100S300 40 360 110 440 120 460 90" fill="none" stroke="rgba(255,190,90,.55)" stroke-width="18" stroke-linecap="round"/><path d="M-40 150C40 60 100 170 170 100S300 40 360 110 440 120 460 90" fill="none" stroke="rgba(120,20,20,.7)" stroke-width="8" stroke-linecap="round" stroke-dasharray="2 14"/></svg>'
  +'<div class="cnmoon"></div><div class="cnranks">'+['E','D','C','B','A'].map((R,i)=>'<span style="--i:'+i+'">'+Emb.svg(R,54)+'</span>').join('')+'</div>'
  +'<div class="cnem">'+Emb.svg(C.R,150)+'</div><div class="cnav"><div class="av '+ROUPAS[C.roupa][3]+'"></div></div><div class="cnfl"></div>'
  +'<div class="cntx"><b id="cnt"></b><p id="cns"></p></div><div class="cnfim">'+fim+'</div></div>'},
 fimH(lvl){const r=rkI(lvl),C=CINE[r],mu=String(RM[r]).replace('.',','),R=C.R;const rew=(REW[lvl]&&REW[lvl].n)||'';
  const it=['×'+mu+' de XP nas missões, a partir de amanhã'].concat(rew.replace(/^Rank [A-Z]: /,'').split(/, | e (?=[a-zà-ú])/).map(x=>x.charAt(0).toUpperCase()+x.slice(1)));
  return '<span class="g">VOCÊ AGORA É</span><div class="cnR">'+Emb.svg(R,96)+'<b>Rank '+R+'</b></div>'+((typeof Intencao!=='undefined'&&Intencao.lembrar(RKN[r-1]))||'')+'<div class="rdch">'+it.map(x=>'<span>'+esc(x)+'</span>').join('')+'</div><button class="cta" onclick="rankClose()">Continuar</button>'},
 start(lvl){Cine.stop();const r=rkI(lvl),C=CINE[r];if(!C)return;const el=document.getElementById('cn');if(!el)return;const rf=Cfg.rfx();let t=300;
  C.atos.forEach((a,i)=>{Cine._t.push(setTimeout(()=>Cine.ato(a,i),t));t+=rf?Math.max(1600,a.d*.7):a.d});
  Cine._t.push(setTimeout(()=>{const e=document.getElementById('cn');if(e)e.classList.add('fim');try{Som.selo()}catch(_){}},t))},
 ato(a,i){const el=document.getElementById('cn');if(!el)return;const rf=Cfg.rfx();
  el.className='cn a'+i+(a.bg?' nb':'')+(a.em===1?' em1':a.em===2?' em1 em2':'')+(a.av?' av1':'')+(a.fx?' f-'+a.fx:'')+(a.fala?' fala':'');
  const T=document.getElementById('cnt'),P=document.getElementById('cns');if(T){T.textContent=Cine.txt(a.t);T.style.animation='none';void T.offsetWidth;T.style.animation=''}if(P)P.textContent=Cine.txt(a.s);
  if(a.fl&&!rf){el.classList.add('flash');setTimeout(()=>el&&el.classList.remove('flash'),450)}
  if(a.sh&&!rf){el.classList.add('shk');setTimeout(()=>el&&el.classList.remove('shk'),600)}
  if(a.som)try{Som[a.som]()}catch(e){}
  if((a.em===1||a.fl)&&navigator.vibrate)try{navigator.vibrate([60,40,160])}catch(e){}},
 pular(){Cine.stop();const el=document.getElementById('cn');if(el)el.className='cn nb em1 em2 av1 fim'},
 stop(){Cine._t.forEach(clearTimeout);Cine._t=[]}
};
