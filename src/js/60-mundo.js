/* ===== Mundo: Escolas, Companheiros, Meu Templo, Armas cerimoniais, Títulos compostos ===== */

// ---------- Escolas (A3): identidade, não competição. Escolha no rank C; troca uma vez por rank ----------
const ESC={
 lamina:{n:'Escola da Lâmina',st:['Força','Disciplina'],cor:'235,90,80',d:'Força e disciplina. Para quem cresce com estrutura e repetição.',f:['A lâmina não fica afiada num dia. Fica afiada em mil dias iguais.','Disciplina é escolher de novo, mesmo cansado.','Corte o desnecessário. O treino de hoje é só o de hoje.']},
 agua:{n:'Escola da Água',st:['Calma','Resistência'],cor:'90,200,190',d:'Calma e resistência. Para quem cresce com constância suave.',f:['A água não briga com a pedra. Contorna e continua.','Respirar também é treinar.','Devagar e sempre. A água chega ao mar.']},
 vento:{n:'Escola do Vento',st:['Agilidade','Foco'],cor:'140,220,150',d:'Agilidade e foco. Para quem cresce com leveza e atenção.',f:['O vento não carrega peso. Solte o que não precisa.','Atenção inteira, mesmo em cinco minutos.','Leve não é fraco. Leve chega longe.']},
 montanha:{n:'Escola da Montanha',st:[],cor:'215,190,140',d:'Equilíbrio entre todos os atributos. Para quem quer crescer por inteiro.',f:['A montanha não tem pressa. Tem base.','Nenhum atributo vive sozinho. Cuide de todos um pouco.','Equilíbrio é voltar ao centro, quantas vezes for preciso.']}};
const Escola={
 atual(){return S.esc&&S.esc.id?ESC[S.esc.id]:null},
 podeTrocar(){return !S.esc||!S.esc.id||S.esc.r!==rkI(myLvl())},
 escolher(id){if(!liberado('escola')||!Escola.podeTrocar())return;S.esc={id,d:S.day,r:rkI(myLvl()),bon:S.esc&&S.esc.bon===0?0:1};try{Som.gongo()}catch(e){}S.top=true;render()},
 brasao(id,sz){const E=ESC[id],c='rgb('+E.cor+')';const ico={lamina:'<path d="M50 14 56 62 50 70 44 62Z" fill="'+c+'"/><path d="M36 64h28M50 70v16" stroke="'+c+'" stroke-width="4" stroke-linecap="round"/>',agua:'<path d="M20 52c8-8 14-8 22 0s14 8 22 0 14-8 22 0M20 66c8-8 14-8 22 0s14 8 22 0 14-8 22 0" fill="none" stroke="'+c+'" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="34" r="8" fill="'+c+'"/>',vento:'<path d="M18 40h46c10 0 10-14 0-14M18 54h58c12 0 12 16 0 16M18 68h34" fill="none" stroke="'+c+'" stroke-width="4" stroke-linecap="round"/>',montanha:'<path d="M16 76 40 36 52 54 62 42 84 76Z" fill="'+c+'"/><path d="M36 44 40 36 45 44" fill="#fff" opacity=".7"/>'}[id];
  return '<svg viewBox="0 0 100 100" width="'+(sz||64)+'" height="'+(sz||64)+'" class="emb"><circle cx="50" cy="50" r="46" fill="#120d22" stroke="'+c+'" stroke-width="3"/>'+ico+'</svg>'},
 bon(){return Cfg&&S.esc&&S.esc.id&&S.esc.bon!==0&&S.esc.d<S.day},
 v(){const a=Escola.atual(),pode=Escola.podeTrocar();
  return tutH('escola','Escolas','No rank C, você escolhe uma Escola. Ela muda a cor do seu brasão, as falas do Kaien e dá um bônus pequeno e opcional (+10% de XP nas missões do tema, a partir do dia seguinte). Nada fica trancado. Você pode trocar uma vez por rank, sem perder nada.')
  +(a?'<div class="card escc" style="--ec:'+a.cor+'">'+Escola.brasao(S.esc.id,72)+'<div><span class="g">Sua escola</span><b>'+esc(a.n)+'</b><p class="note">“'+esc(a.f[S.day%3])+'” <span class="g">Kaien</span></p><label class="note" style="display:flex;gap:8px;align-items:center"><input type="checkbox" style="width:auto" '+(S.esc.bon!==0?'checked':'')+' onchange="S.esc.bon=this.checked?1:0;render()">Bônus da Escola (+10% XP em '+(a.st.length?esc(a.st.join(' e ')):'todas as missões, +5%')+')</label></div></div>':'')
  +Object.keys(ESC).map(id=>{const E=ESC[id],on=S.esc&&S.esc.id===id;return '<div class="card escc" style="--ec:'+E.cor+'">'+Escola.brasao(id,56)+'<div style="flex:1"><b>'+esc(E.n)+'</b><p class="note">'+esc(E.d)+'</p>'+(on?'<span class="note">Escolhida</span>':pode?'<button class="mb on" onclick="Escola.escolher(\''+id+'\')">'+(a?'Trocar para esta':'Escolher')+'</button>':'<span class="note">Troca liberada no próximo rank.</span>')+'</div></div>'}).join('')}
};
TELAS.escola={t:'Escolas',v:()=>Escola.v()};
PLAN_MODS.push(ms=>{if(!Escola.bon())return ms;const a=Escola.atual();return ms.map(m=>{const x=a.st.length?(a.st.includes(m.stat)?1.1:1):1.05;return x===1?m:Object.assign({},m,{xp:Math.round(m.xp*x),esc:1})})});
TITX.push(()=>S.esc&&S.esc.id?['Discípulo d'+(S.esc.id==='lamina'?'a Lâmina':S.esc.id==='agua'?'a Água':S.esc.id==='vento'?'o Vento':'a Montanha')]:[]);
INI_CARDS.push(()=>liberado('escola')&&!(S.esc&&S.esc.id)?'<div class="card trnc" onclick="telaAbrir(\'escola\')"><span class="g">Rank C</span><b>Escolha a sua Escola</b><span class="note">Lâmina, Água, Vento ou Montanha. Toque para ver.</span></div>':'');

// ---------- Companheiros (A5): reflexos de hábitos saudáveis, nunca cobrança ----------
const COMP=[
 {id:'lian',n:'Lian',p:'a curandeira',lv:20,tema:'sono e cuidado',ic:'🌿',cor:'120,200,160',art:@@TEM:comp-lian@@?'@@IMG:comp-lian@@':'',
  sem:['Dormiu bem? O corpo conserta à noite o que o dia gastou.','Beba água antes do café. Seu corpo agradece em silêncio.','Cansaço que não passa é sinal. Ouça antes que ele grite.','Um chá sem cafeína à noite é um carinho barato.','Descansar não é desistir. É curar para continuar.','Se a dor voltar, procure quem entende de corpo. Não aguente sozinho.','Comer devagar também é cuidado.','Hoje, cuide de você como cuida dos outros.'],
  ens:['O sono decide metade do dia seguinte. Proteja a sua hora de deitar como protege um treino.','Dor é mensagem. Desconforto de esforço passa; dor que pontua ou piora pede pausa e avaliação.','Hidratação é simples: um copo ao acordar e uma garrafa à vista resolvem muito.'],
  mem:['Kaien chegou ao meu ateliê com o joelho inchado de orgulho. Literalmente. Eu cuidei do joelho; o orgulho, ele mesmo cuidou, anos depois.','No inverno em que ele perdeu alguém, eu deixava chá na porta dele. Ele nunca agradeceu. Até o dia em que começou a deixar chá na minha.','Ele me disse uma vez que aprendeu a descansar comigo. Mentira: aprendeu com o mestre. Eu só lembrei.']},
 {id:'bao',n:'Bao',p:'o ferreiro',lv:24,tema:'corpo e constância',ic:'🔨',cor:'230,150,80',art:@@TEM:comp-bao@@?'@@IMG:comp-bao@@':'',
  sem:['Ferro bom é batido mil vezes, não uma vez com força.','Treino pequeno, todo dia, forja mais que treino grande uma vez.','Aqueça antes. Ferro frio quebra.','Hoje não precisa ser forte. Precisa ser feito.','A forja descansa à noite. Você também deve.','Erro na forja se conserta batendo de novo. Erro no treino também.','Postura antes de peso. Sempre.','Volte amanhã. A bigorna espera.'],
  ens:['Progressão segura é aumentar pouco de cada vez: uma repetição, alguns segundos, uma série.','A técnica vem antes da carga. Se a forma piorar, volte um passo.','Constância vence intensidade. Três treinos médios valem mais que um treino que te derruba.'],
  mem:['Fui aluno do Tobi, no vale. Ele falava do Kaien como quem fala de um irmão mais teimoso.','Kaien encomendou uma espada comigo e nunca veio buscar. Disse que preferia treinar com um galho, para não se achar demais.','Ele passa na forja de manhã cedo, sem dizer nada, só para ver o fogo. Acho que lembra da tocha do pátio.']},
 {id:'jin',n:'Jin',p:'o rival gentil',lv:30,tema:'mente e foco',ic:'🗡️',cor:'150,170,255',art:@@TEM:comp-jin@@?'@@IMG:comp-jin@@':'',
  sem:['Eu treino para vencer quem eu fui ontem. Você também deveria.','Foco é dizer não a dez coisas boas para fazer uma.','Compare-se comigo, se quiser. Mas só para aprender, nunca para se diminuir.','O celular pode esperar vinte minutos. Eu já testei.','Perdi ontem. Hoje volto melhor. É o único placar que importa.','Quando a mente correr, escreva. Ela anda mais devagar no papel.','Respeito quem cai e levanta mais do que quem nunca cai.','Hoje, uma coisa de cada vez.'],
  ens:['A atenção é treinável: blocos curtos sem distração, repetidos, aumentam o tempo de foco.','Comparar-se com outros quase sempre cansa. Comparar-se com o seu ontem ensina.','Antes de uma tarefa difícil, defina o primeiro passo de 5 minutos. O resto vem.'],
  mem:['O Ren é meu tio. Ele me contou que invejava a paciência do Kaien. Eu ri. Depois entendi.','Desafiei o Kaien para um duelo no primeiro dia. Ele aceitou, perdeu de propósito e me pediu para voltar no dia seguinte. Voltei por cinco anos.','Ele nunca me chamou de rival. Me chama de companheiro de pátio. Demorei a gostar disso. Hoje gosto.']},
 {id:'yue',n:'Yue',p:'a arqueira',lv:40,tema:'amizade e pedir ajuda',ic:'🏹',cor:'240,190,110',art:@@TEM:comp-yue@@?'@@IMG:comp-yue@@':'',
  sem:['Nenhuma flecha voa sozinha. Alguém fez o arco.','Mande uma mensagem a alguém hoje. Só para saber como está.','Pedir ajuda é mirar melhor.','Respire antes de soltar. Na flecha e na palavra.','Quem caminha junto cansa menos.','Se estiver pesado, conte a alguém. Eu conto ao Kaien.','O alvo não foge. Você pode esperar o momento certo.','Agradeça a alguém que te ajudou este mês.'],
  ens:['Contar um objetivo a alguém de confiança aumenta as chances de mantê-lo, sem precisar de cobrança.','Pedir ajuda cedo evita que um problema pequeno vire grande. Médicos, amigos e serviços como o CVV (188) existem para isso.','Relações fazem bem à saúde. Um contato curto por dia já mantém a ponte de pé.'],
  mem:['Kaien me ensinou a atirar sem pressa. Eu ensinei a ele a pedir ajuda. Acho que eu ganhei a troca.','Quando ele não aparece no pátio, sou eu que vou atrás. Não para cobrar. Só para ele saber que alguém notou.','Ele guarda as cartas do velho mestre numa caixa. Um dia me mostrou uma. Era sobre você, antes de você chegar.']}];
const Comp={
 ok(c){return myLvl()>=c.lv},
 sem(){return Math.floor((S.day-1)/7)},
 view(){const L=COMP.filter(Comp.ok),sel=COMP.find(c=>c.id===S.compSel&&Comp.ok(c))||L[0];
  if(!L.length)return '<div class="card"><p class="note">Os companheiros chegam no rank C. A primeira é a Lian, a curandeira.</p></div>';
  const lk=COMP.filter(c=>!Comp.ok(c));const w=Comp.sem(),n=Math.min(3,1+Math.floor((myLvl()-sel.lv)/5));
  return '<div class="kchips">'+L.map(c=>'<button class="mb '+(c===sel?'on':'')+'" onclick="S.compSel=\''+c.id+'\';render()">'+c.ic+' '+c.n+'</button>').join('')+'</div>'
  +'<div class="card cmpc" style="--cc:'+sel.cor+'"><div class="cmpa">'+(sel.art?'<img alt="" src="'+sel.art+'">':'<i>'+sel.ic+'</i>')+'</div><span class="g">'+esc(sel.n)+', '+esc(sel.p)+'</span><b>“'+esc(sel.sem[w%sel.sem.length])+'”</b><span class="note">Fala da semana · tema: '+esc(sel.tema)+'</span></div>'
  +'<div class="card"><div class="mt"><span class="g">Ensinos de '+esc(sel.n)+'</span></div>'+sel.ens.slice(0,n).map(e=>'<p class="note">• '+esc(e)+'</p>').join('')+(n<3?'<p class="note" style="opacity:.6">Mais um ensino a cada 5 níveis.</p>':'')+'</div>'
  +'<div class="card"><div class="mt"><span class="g">Lembranças sobre o Kaien</span></div>'+sel.mem.slice(0,n).map(e=>'<p class="kq">“'+esc(e)+'”</p>').join('')+'</div>'
  +(lk.length?'<p class="note">Próximo companheiro: '+lk[0].ic+' '+esc(lk[0].n)+', '+esc(lk[0].p)+', no nível '+lk[0].lv+'.</p>':'')}
};

// ---------- Armas e artefatos cerimoniais (D1): só vitrine, nada muda a dificuldade ----------
const ARMAS=[['espada','Espada de Treino',40,'A primeira espada do Kaien era de madeira. Ele treinou com ela até rachar, e guardou a rachadura.','M50 10 54 70 50 78 46 70Z|M38 70h24|M50 78v14'],
 ['leque','Leque do Vento',41,'Diziam que abanava o desânimo para longe. Na verdade, só lembrava de respirar.','M20 70 50 30 80 70Z|M50 30v44|M35 50l15 24|M65 50l-15 24'],
 ['cajado','Cajado do Velho Mestre',44,'Gasto na ponta de tanto bater no chão do pátio, toda manhã, antes do sol.','M50 8v84|M44 14c0-8 12-8 12 0'],
 ['selo','Selo de Jade',48,'Usado para assinar as cartas lacradas. Hoje assina as suas conquistas.','M30 40h40v40H30Z|M40 40V26h20v14'],
 ['talisma','Talismã da Lua',49,'Um papel com um só ideograma: "continue". O velho mestre o carregava no bolso.','M34 14h32v72H34Z|M42 30h16M42 44h16M50 56v18'],
 ['pincel','Pincel do Mestre',50,'Com ele, o mestre escreveu o nome de cada aluno que chegou ao Pico. O seu agora está lá.','M50 10v56|M44 66h12l-6 22Z']];
const armaSvg=(a,c)=>'<svg viewBox="0 0 100 100" width="52" height="52"><circle cx="50" cy="50" r="46" fill="#120d22" stroke="'+(c||'#d9b36a')+'" stroke-width="2"/>'+a[4].split('|').map(d=>'<path d="'+d+'" fill="none" stroke="'+(c||'#d9b36a')+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>').join('')+'</svg>';

// ---------- Meu Templo (A4): o troféu vivo do progresso ----------
const TEMPLO=[['arvore','Árvore do caminho',1,'Cresce a cada nível. Plantada no dia em que você chegou.'],['lanterna','Lanternas de pedra',25,'Acesas quando você abriu o seu templo, no nível 25.'],['jardim','Jardim de pedras',26,'Cada pedra é uma semana em que você voltou.'],['ponte','Ponte de madeira',27,'Para atravessar a zona do meio sem cair no rio.'],['sino','Sino do templo',30,'Tocou na sua subida ao rank B.'],['estatua','Estátua do velho mestre',35,'Ele observa o seu templo, como observava o pátio.'],['portao','Portão da Montanha',39,'O último portão antes do Palácio.'],['pagode','Pagode do Dragão',40,'Erguido no dia em que você chegou ao rank A.'],['lago','Lago da Lua',50,'Reflete a lua cheia do Pico. Você chegou ao rank S.']];
const Templo={
 itens(){const L=myLvl(),o=TEMPLO.filter(t=>L>=t[2]).map(t=>({id:t[0],n:t[1],d:t[3]}));
  ARMAS.filter(a=>L>=a[2]).forEach(a=>o.push({id:'arma-'+a[0],n:a[1],d:a[3],arma:a}));
  Object.keys(S.defeated3||{}).forEach(h=>o.push({id:'tr-'+SLUGH[h],n:'Escudo: '+DGH3[h].m,d:'Troféu da Forma Verdadeira vencida no dia '+S.defeated3[h]+'.'}));
  Object.keys(S.inv||{}).filter(k=>S.inv[k].won).forEach(k=>o.push({id:'inv-'+k,n:'Estandarte: '+INV[k.split('-')[1]].n,d:'Invasão de '+k.split('-')[0]+' vencida.'}));
  (S.mand||[]).filter(m=>Mand.dias(m)>=66).forEach(m=>o.push({id:'md-'+m.id,n:'Selo dos 66 dias',d:'Mandamento: '+m.t}));return o},
 qtd(){return Templo.itens().length},
 tem(id){return Templo.itens().some(x=>x.id===id)},
 cena(){const L=myLvl(),r=rkI(L),t=id=>Templo.tem(id),sel=S.tplSel,g=(id,inner)=>'<g class="tpg'+(sel===id?' on':'')+'" onclick="S.tplSel=\''+id+'\';render()">'+inner+'</g>';
  const ceu=['#1a1630','#162238','#122a26','#1c2436','#2a1a14','#1d1238'][r],arv=Math.min(1,.35+L/70);let s='';
  s+='<defs><linearGradient id="tpc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+ceu+'"/><stop offset="1" stop-color="#0b0918"/></linearGradient></defs><rect width="360" height="300" fill="url(#tpc)"/>';
  s+='<circle cx="290" cy="60" r="'+(t('lago')?30:22)+'" fill="#e8dcff" opacity=".85"/><path d="M0 170 70 110 120 150 190 80 260 140 320 100 360 130V300H0Z" fill="#141026"/><rect y="220" width="360" height="80" fill="#1d1a2e"/>';
  if(t('lago'))s+=g('lago','<ellipse cx="270" cy="262" rx="70" ry="16" fill="#2b2f5e"/><ellipse cx="282" cy="262" rx="14" ry="4" fill="#e8dcff" opacity=".7"/>');
  if(t('pagode'))s+=g('pagode','<path d="M178 216V150h44v66Z" fill="#3a1e1e"/><path d="M168 154 200 132 232 154ZM172 182 200 164 228 182Z" fill="#8e1f1a"/><circle cx="200" cy="126" r="4" fill="#f1d48a"/>');
  if(t('portao'))s+=g('portao','<path d="M30 220V150M78 220V150" stroke="#8e1f1a" stroke-width="7"/><path d="M22 152h64M26 164h56" stroke="#a3241d" stroke-width="6"/>');
  if(t('estatua'))s+=g('estatua','<rect x="246" y="196" width="22" height="24" fill="#4a4660"/><circle cx="257" cy="172" r="9" fill="#9a96b0"/><path d="M247 196c0-14 20-14 20 0" fill="#9a96b0"/>');
  if(t('sino'))s+=g('sino','<path d="M128 180h30M134 180v-8M152 180v-8" stroke="#6b4a2a" stroke-width="4"/><path d="M136 184c0 14 14 14 14 0Z" fill="#d9b36a"/>');
  if(t('ponte'))s+=g('ponte','<path d="M96 246c30-20 70-20 100 0" fill="none" stroke="#8a5a2a" stroke-width="6"/><path d="M106 240v10M146 230v14M186 240v10" stroke="#8a5a2a" stroke-width="3"/>');
  if(t('jardim'))s+=g('jardim',[0,1,2,3,4].map(i=>'<ellipse cx="'+(40+i*22)+'" cy="'+(262+(i%2)*6)+'" rx="'+(8+i%3*3)+'" ry="5" fill="#6d6a80"/>').join(''));
  if(t('lanterna'))s+=g('lanterna',[120,232].map(x=>'<rect x="'+(x-4)+'" y="200" width="8" height="20" fill="#5a5670"/><rect x="'+(x-8)+'" y="188" width="16" height="12" fill="#ffb347" opacity=".9"/><path d="M'+(x-10)+' 188h20l-10-8Z" fill="#5a5670"/>').join(''));
  s+=g('arvore','<path d="M330 220V'+(220-70*arv)+'" stroke="#4a2e1e" stroke-width="'+(4+5*arv)+'"/><circle cx="330" cy="'+(220-80*arv)+'" r="'+(18+26*arv)+'" fill="'+(r>=2?'#2f7a5a':'#7a2a3a')+'" opacity=".9"/><circle cx="316" cy="'+(220-70*arv)+'" r="'+(10+14*arv)+'" fill="'+(r>=2?'#3d9a6e':'#a3243d')+'" opacity=".8"/>');
  return '<svg viewBox="0 0 360 300" width="100%" class="tpsvg">'+s+'</svg>'},
 v(){const it=Templo.itens(),sel=it.find(x=>x.id===S.tplSel);
  return tutH('templo','Meu Templo','O seu templo cresce com você. Cada construção, arma e troféu vem de uma conquista. Toque num elemento para ver de onde ele veio.')
  +'<div class="card tpw">'+Templo.cena()+(sel?'<div class="tpi"><b>'+esc(sel.n)+'</b><span class="note">'+esc(sel.d)+'</span></div>':'<p class="note" style="text-align:center">Toque numa construção.</p>')+'</div>'
  +'<div class="card"><div class="mt"><span class="g">Vitrine</span><b>'+it.length+' itens</b></div><div class="tpv">'+it.map(x=>'<button class="tpb'+(S.tplSel===x.id?' on':'')+'" onclick="S.tplSel=\''+x.id+'\';render()">'+(x.arma?armaSvg(x.arma):'<i>'+({arvore:'🌳',lanterna:'🏮',jardim:'🪨',ponte:'🌉',sino:'🔔',estatua:'🗿',portao:'⛩️',pagode:'🏯',lago:'🌕'}[x.id]||(x.id.startsWith('tr-')?'🛡️':x.id.startsWith('inv-')?'🚩':'📜'))+'</i>')+'<small>'+esc(x.n)+'</small></button>').join('')+'</div>'
  +(myLvl()<40?'<p class="note">As armas cerimoniais chegam a partir do nível 40. Elas são só de vitrine: nada muda a dificuldade.</p>':'')+'</div>'}
};
TELAS.templo={t:'Meu Templo',v:()=>Templo.v()};

// ---------- Títulos compostos (D4): prefixo + sufixo, no nível 40 ----------
// Prefixos com gênero (para concordar o adjetivo): [nome, feminino?, condição, como liberar]
const TPRE=[['Lâmina',1,()=>rkI(myLvl())>=2,'rank C'],['Água',1,()=>S.hist.filter(h=>h.water).length>=30,'30 dias de água'],['Vento',0,()=>(S.kataN||0)>=5,'5 katas'],['Bambu',0,()=>rkI(myLvl())>=2,'rank C'],['Montanha',1,()=>rkI(myLvl())>=3,'rank B'],['Neve',1,()=>rkI(myLvl())>=3,'rank B'],['Pedra',1,()=>((S.torre||{}).n||0)>=30,'30 andares da Torre'],['Dragão',0,()=>rkI(myLvl())>=4,'rank A'],['Chama',1,()=>Object.keys(S.defeated3||{}).length>=1,'uma Forma Verdadeira'],['Lua',1,()=>rkI(myLvl())>=5,'rank S']];
const TSUF=[['Sereno','Serena',()=>(S.medN||0)>=5,'5 meditações'],['Constante','Constante',()=>(S.hist.filter(h=>h.active).length)>=60,'60 dias ativos'],['Desperto','Desperta',()=>(S.slc||0)>=30,'30 registros de sono'],['Paciente','Paciente',()=>(_n(()=>Mand.maxDias()>=21)),'um mandamento de 21 dias'],['Firme','Firme',()=>doneCount()>=200,'200 missões'],['Silencioso','Silenciosa',()=>(S.dia||[]).filter(e=>e.src==='dd').length>=10,'10 respostas no diário'],['Gentil','Gentil',()=>!!(S.espR&&S.espR.p),'o Espelho do Passado'],['Incansável','Incansável',()=>(S.dgDone||0)>=40,'40 andares de dungeon']];
const TitComp={
 nome(p,s){const P=TPRE[p],X=TSUF[s];return P[0]+' '+(P[1]?X[1]:X[0])},
 atual(){return S.eq&&S.eq.tc?TitComp.nome(S.eq.tc[0],S.eq.tc[1]):null},
 set(k,i){S.eq.tcx=S.eq.tcx||[null,null];S.eq.tcx[k]=i;const t=S.eq.tcx;if(t[0]!=null&&t[1]!=null){S.eq.tc=[t[0],t[1]];S.eq.title=TitComp.nome(t[0],t[1])}S.top=false;render()},
 painel(){if(!liberado('titComp'))return '<div class="card"><p class="note">No nível 40 você poderá montar títulos com prefixo e sufixo, como “Lâmina Serena”.</p></div>';const t=S.eq.tcx||S.eq.tc||[null,null];
  const ch=(L,k)=>L.map((x,i)=>{const ok=x[2]();return '<button class="mb '+(t[k]===i?'on':'')+'" '+(ok?'onclick="TitComp.set('+k+','+i+')"':'disabled title="Libere com: '+esc(x[3])+'"')+'>'+esc(k?x[0]+'/'+x[1]:x[0])+(ok?'':' 🔒')+'</button>'}).join('');
  return '<div class="card"><div class="mt"><span class="g">Título composto</span><b>'+esc(TitComp.atual()||'Escolha prefixo e sufixo')+'</b></div><p class="note">Prefixo</p><div class="kchips">'+ch(TPRE.map(x=>[x[0],x[1],x[2],x[3]]),0)+'</div><p class="note">Sufixo</p><div class="kchips">'+TSUF.map((x,i)=>{const ok=x[2]();return '<button class="mb '+(t[1]===i?'on':'')+'" '+(ok?'onclick="TitComp.set(1,'+i+')"':'disabled')+'>'+esc(x[1]===x[0]?x[0]:x[0]+'/'+x[1])+(ok?'':' 🔒')+'</button>'}).join('')+'</div><p class="note">Bloqueados mostram 🔒. Prefixos vêm dos ranks e dos sistemas; sufixos, das suas conquistas.</p></div>'}
};
TITX.push(()=>{const t=TitComp.atual();return t?[t]:[]});
