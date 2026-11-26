/* ===== Desafios: Bestiário, Torre dos Mil Degraus, Invasões, Espelho (20/35/50) ===== */

// ---------- Bestiário (C4) ----------
// O que cada monstro simboliza (fase 1: m0-m3, chefe; fase 2: m0-m3, chefe; fase 3: chefe).
const SIMB={
'Procrastinação':['adiar para amanhã','apertar a soneca','abas e distrações abertas','listas que nunca acabam','o adiamento crônico','prazos que assustam','o medo de fazer imperfeito','distrações que parecem tarefa','cansaço que é só desculpa','o hábito de deixar tudo para depois','o tempo que escorre sem decisão'],
'Celular e redes sociais':['o reflexo de olhar o celular','a rolagem sem fim','a busca por aprovação','o vídeo que puxa outro','a atenção fragmentada','notificações em excesso','o feed que nunca termina','o vídeo curto que vicia','o medo de ficar de fora','a atenção capturada pelas telas','a atenção que nunca descansa'],
'Cigarro ou vape':['a pausa que vira hábito','o cheiro que fica','o objeto sempre à mão','a fissura que passa em minutos','a dependência da nicotina','gatilhos ligados à rotina','pausas que só existem com o cigarro','a vontade em horários fixos','as desculpas para mais um','a dependência em todas as formas','o peso que a fumaça deixa no corpo'],
'Álcool':['o brinde fácil','a desculpa do fim de semana','a vontade de mais uma','o silêncio que se tenta afogar','o consumo que foge do controle','a pressão para beber junto','a "última" que nunca é','beber para aliviar o estresse','a culpa que puxa mais consumo','o consumo como resposta a tudo','o que se tenta esquecer'],
'Sono ruim':['a tela na madrugada','pensamentos que giram','a cafeína tarde','o horário de dormir que escorrega','a insônia que se repete','a luz das telas à noite','a cafeína fora de hora','a mente que não desliga','cochilos que roubam a noite','a noite sem descanso','o cansaço acumulado'],
'Jogos':['a partida que nunca é a última','a recompensa que prende','a madrugada online','o ranking sem fim','o tempo perdido no jogo','missões feitas para prender','prêmios por entrar todo dia','a fila competitiva','a noite trocada pelo jogo','o jogo que ocupa a vida','o jogo que nunca termina'],
'Apostas':['a aposta "pequena"','o quase-ganhar','a ilusão das probabilidades','o dinheiro emprestado','a esperança de ganhar fácil','o bônus que é isca','a perseguição do prejuízo','a falsa certeza','a aposta sempre à mão','a casa que sempre ganha','a ilusão de controle'],
'Outra coisa':['o gatilho inicial','o automático','a desculpa pronta','a vontade passageira','o hábito sem nome','o que se esconde','a recompensa imediata','o "só hoje"','o vazio dos dias soltos','o hábito que muda de forma','o hábito encarado de frente'],
'O Espelho':['a voz crítica','a comparação','o passado pesado','o medo de falhar','a autocrítica','a comparação constante','a sensação de nunca bastar','fingir que está tudo bem','o perfeccionismo','o lado que você esconde','a autoimagem que pesa']};
const DICA={
'Procrastinação':['Comece por 5 minutos. Depois decida se continua.','Defina "pronto" antes de começar.','Afaste o celular antes de abrir a tarefa.'],
'Celular e redes sociais':['Desligue as notificações que não são de pessoas.','Deixe o celular fora do quarto à noite.','Tire os apps que mais prendem da tela inicial.'],
'Cigarro ou vape':['A vontade costuma passar em poucos minutos: espere, beba água, respire.','Troque o gatilho: depois do café, faça outra coisa.','A UBS oferece apoio para parar de fumar.'],
'Álcool':['Alterne cada dose com água.','Tenha uma resposta pronta para recusar.','Se bebe muito, não pare de uma vez: procure um médico ou o CAPS AD.'],
'Sono ruim':['Acorde no mesmo horário todos os dias.','Telas desligadas 30 a 45 minutos antes de deitar.','Sem cafeína depois das 15h.'],
'Jogos':['Coloque um alarme longe do alcance.','Desative as recompensas diárias.','Tenha um dia por semana sem jogos.'],
'Apostas':['Peça autoexclusão nas casas de aposta.','Bloqueie apps e sites.','Conte a alguém de confiança e procure apoio (CAPS AD, grupos de apoio).'],
'Outra coisa':['Dê um nome ao hábito.','Crie uma barreira pequena para dificultá-lo.','Conte o seu plano a alguém de confiança.'],
'O Espelho':['Fale consigo como falaria com um amigo.','Compare-se só com quem você foi ontem.','Se o peso ficar grande, fale com alguém ou com o CVV (188).']};
MIGS.push(()=>{S.bst=S.bst||{};Object.keys(S.defeated||{}).forEach(h=>{if(!S.bst[h+'|1|b'])S.bst[h+'|1|b']=S.defeated[h]});Object.keys(S.defeated2||{}).forEach(h=>{if(!S.bst[h+'|2|b'])S.bst[h+'|2|b']=S.defeated2[h]});
 Object.values(S.dgAll||{}).forEach(D=>(D.fl||[]).forEach((f,i)=>{if(f&&f.st==='done'){const k=D.habit+'|'+(D.ph||1)+'|'+(i===D.fl.length-1?'b':i);if(!S.bst[k])S.bst[k]=f.day||S.day}}));
 if(S.esp&&S.esp.won&&!S.bst['O Espelho|1|b'])S.bst['O Espelho|1|b']=S.esp.wonDay||S.day});
const Bestiario={
 lista(){const o=[];Object.keys(SIMB).forEach(h=>{const s=SIMB[h];
  if(h!=='O Espelho')[0,1,2,3].forEach(i=>o.push({h,ph:1,i,n:(MOBS[h]||[])[i]?MOBS[h][i][0]:'?',s:s[i]}));
  o.push({h,ph:1,i:'b',n:DGH[h].m,s:s[4]});[0,1,2,3].forEach(i=>o.push({h,ph:2,i,n:MOBS2[h][i][0],s:s[5+i]}));o.push({h,ph:2,i:'b',n:DGH2[h].m,s:s[9]});o.push({h,ph:3,i:'b',n:DGH3[h].m,s:s[10]})});
  INVK.forEach(k=>o.push({h:'inv',ph:0,i:k,n:INV[k].n,s:INV[k].s}));return o},
 dia(e){if(e.h==='inv'){const w=Object.keys(S.inv||{}).find(x=>x.endsWith(e.i)&&S.inv[x].won);return w?S.inv[w].day:null}return (S.bst||{})[e.h+'|'+e.ph+'|'+e.i]||null},
 qtd(){return Bestiario.lista().filter(e=>Bestiario.dia(e)).length},
 img(e){let src='',nm='';if(e.h==='inv'){src=INVIMG[e.i];nm='inv-'+e.i}else if(e.i==='b'){src=e.ph===3?MIMG3[e.h]:e.ph===2?MIMG2[e.h]:MIMG[e.h];nm=(e.ph===3?'boss3-':e.ph===2?'boss2-':'boss-')+SLUGH[e.h]}else{src=e.ph===2?MOBIMG2[e.h+'|'+e.i]:MOBIMG[e.h+'|'+e.i];nm=(e.ph===2?'mob2-':'mob-')+SLUGH[e.h]+'-'+e.i}
  return src?'<img class="bsi af-'+nm+'" alt="" src="'+src+'">':'<div class="bsi sil" style="background-image:'+SIL+'"></div>'},
 v(){const L=Bestiario.lista(),sel=S.bstSel,n=Bestiario.qtd();
  const det=sel!=null&&L[sel]&&Bestiario.dia(L[sel])?(()=>{const e=L[sel],d=Bestiario.dia(e),dc=e.h==='inv'?INV[e.i].dica:DICA[e.h][(typeof e.i==='number'?e.i:3)%3];return '<div class="card bsd"><div class="bsdi">'+Bestiario.img(e)+'</div><span class="g">'+(e.h==='inv'?'Invasão':esc(e.h)+' · '+(e.ph===3?'Forma Verdadeira':'Fase '+e.ph))+'</span><b>'+esc(e.n)+'</b><p class="note">Simboliza: <b>'+esc(e.s)+'</b>.</p><p class="note">Dica real: '+esc(dc)+'</p><p class="note">Vencido no dia '+d+' do caminho.</p></div>'})():'';
  return tutH('bst','Bestiário','Aqui ficam os monstros que você já venceu: o que cada um simboliza e uma dica prática para lidar com o gatilho dele.')+'<div class="card"><span class="g">Bestiário</span><b>'+n+' de '+L.length+' registrados</b></div>'+det+'<div class="bsg">'+L.map((e,i)=>{const ok=!!Bestiario.dia(e);return '<button class="bsc'+(ok?'':' lk2')+(sel===i?' on':'')+'" '+(ok?'onclick="S.bstSel='+i+';S.top=true;render()"':'disabled')+' style="--mc:'+(MCOL[e.h]||'200,160,255')+'">'+(ok?Bestiario.img(e):'<div class="bsi q">?</div>')+'<small>'+(ok?esc(e.n):'???')+'</small></button>'}).join('')+'</div>'}
};

// ---------- Torre dos Mil Degraus (C2): sobe 1 andar por dia ativo, nunca desce ----------
const TMARC=[[10,'Degrau Dez'],[30,'Trinta Degraus'],[50,'Meio da Torre'],[100,'Cem Degraus'],[200,'Duzentos Degraus'],[365,'Torre de um Ano']];
const Torre={
 est(){return S.torre=S.torre||{n:0,h:null}},
 escolher(h){const t=Torre.est();t.h=h;t.ini=t.ini||S.day;S.top=false;render()},
 v(){const t=Torre.est(),n=t.n,prox=TMARC.find(m=>m[0]>n);
  if(!t.h){const op=Object.keys(DGH).filter(h=>h!=='O Espelho');return tutH('torre','Torre dos Mil Degraus','Uma torre sem fim. Você sobe um andar por dia em que fizer pelo menos uma missão. Nunca desce, não tem vidas e não tem pressa.')+'<div class="card"><div class="mt"><span class="g">Torre dos Mil Degraus</span><b>Qual hábito esta torre representa?</b></div><p class="note">Escolha o hábito que você quer manter vigiado. Cada andar é um dia em que você cuidou de si.</p><div class="kchips">'+op.map(h=>'<button class="mb" onclick="Torre.escolher(\''+h+'\')">'+esc(h)+'</button>').join('')+'</div></div>'}
  const vis=Array.from({length:9},(_,k)=>n+2-k).filter(x=>x>=0);
  return '<div class="card"><div class="mt"><span class="g">Torre dos Mil Degraus · '+esc(t.h)+'</span><b>Andar '+n+'</b></div><div class="twr">'+vis.map(x=>'<div class="twf'+(x===n?' cur':x>n?' up':'')+(TMARC.some(m=>m[0]===x)?' mk':'')+'"><span>'+(x===0?'Térreo':x)+'</span>'+(TMARC.find(m=>m[0]===x)?'<small>'+TMARC.find(m=>m[0]===x)[1]+'</small>':'')+'</div>').join('')+'</div>'+(t.msg?'<p class="pvs">'+esc(t.msg)+'</p>':'')+'<p class="note">'+(prox?'Próximo marco: andar '+prox[0]+' ('+prox[1]+'), faltam '+(prox[0]-n)+' dias ativos.':'Você passou de todos os marcos. A torre continua.')+'</p><p class="note">A cada 10 andares: +'+Math.round(25*(S.rkm||1))+' XP. Nos marcos, um título novo.</p></div>'}
};
NDAY.push(rec=>{if(!liberado('torre'))return;const t=Torre.est();if(!t.h||!rec.active)return;t.n++;t.msg='';if(t.n%10===0){const x=Math.round(25*(S.rkm||1));S.xpPrev+=x;const m=TMARC.find(q=>q[0]===t.n);t.msg='Andar '+t.n+': +'+x+' XP'+(m?' e o título '+m[1]:'')+'.'}});
TITX.push(()=>{const n=(S.torre||{}).n||0;return TMARC.filter(m=>n>=m[0]).map(m=>m[1])});

// ---------- Invasões das estações (C3): 4 por ano, 7 dias cada, voltam no ano seguinte ----------
// Estações do hemisfério sul. Vence quem tiver 5 dias ativos (com missões normais) dentro da janela.
const INV={outono:{n:'Vento das Folhas Caídas',s:'o desânimo que chega com o fim do verão',m:2,d:20,t:'Guardião do Outono',dica:'Quando o ânimo cair, diminua o passo, mas não pare. Cinco minutos ainda contam.'},
 inverno:{n:'Gigante do Frio',s:'a preguiça de sair das cobertas',m:5,d:21,t:'Guardião do Inverno',dica:'Deixe a roupa do treino separada na noite anterior. Aqueça bem antes de começar.'},
 primavera:{n:'Enxame do Pólen',s:'a distração que floresce por toda parte',m:8,d:22,t:'Guardião da Primavera',dica:'Escolha uma coisa só por vez. O resto pode esperar.'},
 verao:{n:'Serpente do Calor',s:'os excessos das festas e das férias',m:11,d:21,t:'Guardião do Verão',dica:'Beba água ao longo do dia e mantenha o horário de dormir, mesmo nas férias.'}};
const INVK=['outono','inverno','primavera','verao'];
const INVIMG={outono:'@@IMG:inv-outono@@',inverno:'@@IMG:inv-inverno@@',primavera:'@@IMG:inv-primavera@@',verao:'@@IMG:inv-verao@@'};
const Invasao={
 hoje(){return S._hojeTeste?new Date(S._hojeTeste):new Date()},
 atual(){const t=Invasao.hoje(),y=t.getFullYear();for(const k of INVK){const I=INV[k],a=new Date(y,I.m,I.d),b=new Date(y,I.m,I.d+6,23,59);if(t>=a&&t<=b)return {k,ano:y,a,b,id:y+'-'+k}}return null},
 dias(w){let n=0;for(let d=Math.max(1,S.day-8);d<=S.day;d++){const x=d===S.day?Invasao.hoje():dataDoDia(d);if(x>=w.a&&x<=w.b){const at=d===S.day?todayActive():(S.hist[d-1]&&S.hist[d-1].active);if(at)n++}}return n},
 checar(){if(!liberado('invasao'))return;const w=Invasao.atual();if(!w)return;S.inv=S.inv||{};const r=S.inv[w.id]=S.inv[w.id]||{won:0};if(r.won)return;if(Invasao.dias(w)>=5){r.won=1;r.day=S.day;const x=Math.round(150*(S.rkm||1));S.xpPrev+=x;r.msg='Você protegeu o caminho: +'+x+' XP e o título '+INV[w.k].t+'.';try{Som.gongo()}catch(e){}}},
 card(){if(!liberado('invasao'))return '';const w=Invasao.atual();if(!w)return '';const I=INV[w.k],r=(S.inv||{})[w.id]||{},n=Invasao.dias(w),fim=Math.ceil((w.b-Invasao.hoje())/864e5);
  return '<div class="card invc" style="--mc:'+({outono:'230,130,60',inverno:'170,200,240',primavera:'240,150,200',verao:'255,180,60'})[w.k]+'"><div class="invi">'+Bestiario.img({h:'inv',i:w.k})+'</div><span class="g">Invasão · '+({outono:'Outono',inverno:'Inverno',primavera:'Primavera',verao:'Verão'})[w.k]+'</span><b>'+esc(I.n)+'</b><p class="note">Simboliza '+esc(I.s)+'. Para vencê-lo, basta ter 5 dias com missões nesta semana. Sem missões extras.</p>'+(r.won?'<p class="pvs">'+esc(r.msg||'Invasão vencida.')+'</p>':'<p class="note"><b>'+n+' de 5</b> dias · a janela fecha em '+Math.max(1,fim)+' dia(s). Se não der, ela volta no ano que vem.</p>')+'</div>'}
};
AFTER_RENDER.push(()=>Invasao.checar());
INI_CARDS.push(()=>Invasao.card());
TITX.push(()=>Object.keys(S.inv||{}).filter(k=>S.inv[k].won).map(k=>INV[k.split('-')[1]].t));

// ---------- O Espelho: retorno no nível 20 (Fase 2) e reflexões no 35 e no 50 (C5) ----------
const ESPQ={p:{t:'O Espelho do Passado',n:35,tit:'Olhou o Passado',intro:'Este espelho não mostra quem você é. Mostra quem você foi. Olhe com carinho: aquela pessoa trouxe você até aqui.',q:['Como você era no seu primeiro dia aqui? Descreva com carinho.','O que você carregava naquela época que hoje pesa menos?','Qual momento difícil do caminho você atravessou?','O que você agradeceria a quem você foi?','O que você ainda está aprendendo a perdoar em si?']},
 f:{t:'O Espelho do Futuro',n:50,tit:'Olhou o Futuro',intro:'O último espelho mostra um reflexo que ainda não existe. Ele é feito das escolhas que você vai fazer. Escreva sem pressão: futuro não é promessa, é direção.',q:['Como você quer estar daqui a um ano?','Qual hábito você quer que continue com você para sempre?','Que pessoa você quer ser para quem está perto de você?','O que você vai fazer nos dias em que tudo pesar?','Escreva uma frase para você ler num dia difícil.']}};
const Espelhos={
 tx(k,i,v){S.espT=S.espT||{};S.espT[k+i]=v;const b=document.getElementById('espgo');if(b)b.disabled=!Espelhos.ok(k)},
 ok(k){return ESPQ[k].q.every((_,i)=>((S.espT||{})[k+i]||'').trim().length>=5)},
 concluir(k){if(!Espelhos.ok(k))return;S.espR=S.espR||{};const E=ESPQ[k],T=S.espT||{};addDia(E.q.map((q,i)=>q+'\n'+T[k+i].trim()).join('\n\n'),'ms',E.t);
  if(!S.espR[k]){S.espR[k]=S.day;const x=Math.round(100*(S.rkm||1));S.xpPrev+=x;S.espMsg='+'+x+' XP e o título '+E.tit+'.'}E.q.forEach((_,i)=>delete T[k+i]);try{Som.sino()}catch(e){}S.top=true;render()},
 v(k){const E=ESPQ[k],feito=S.espR&&S.espR[k],T=S.espT||{},risco=E.q.some((_,i)=>Apoio.risco(T[k+i]));
  return '<div class="card"><span class="g">'+esc(E.t)+'</span><p>“'+esc(E.intro)+'” <span class="g">Kaien</span></p>'+(feito?'<p class="pvs">Você já olhou este espelho no dia '+feito+'. '+(S.espMsg||'')+' Pode olhar de novo quando quiser; fica nas Recordações.</p>':'')+'</div>'
  +E.q.map((q,i)=>'<div class="card"><label class="note">'+esc(q)+'<textarea class="dnote" rows="3" maxlength="600" oninput="Espelhos.tx(\''+k+'\','+i+',this.value)">'+esc(T[k+i]||'')+'</textarea></label></div>').join('')
  +(risco?Apoio.card():'')+'<button class="cta" id="espgo" '+(Espelhos.ok(k)?'':'disabled')+' onclick="Espelhos.concluir(\''+k+'\')">Guardar o reflexo</button><p class="note">Não há resposta certa. Se algo doer demais, pare e fale com alguém de confiança.</p>'}
};
TELAS.espP={t:'O Espelho do Passado',v:()=>Espelhos.v('p')};
TELAS.espF={t:'O Espelho do Futuro',v:()=>Espelhos.v('f')};
TITX.push(()=>Object.keys(S.espR||{}).map(k=>ESPQ[k].tit));
const Desafios={
 espelho2(ph){S.dsub='d';enterDg('O Espelho',ph,0)},
 chefesExtra(){const L=myLvl();let h='';const D=S.dgAll&&S.dgAll['O Espelho'];
  const cd=(tag,nome,txt,btn)=>'<div class="card esx"><span class="g">'+tag+'</span><b>'+esc(nome)+'</b><p class="note">'+txt+'</p>'+(btn||'')+'</div>';
  if(L<20)h+=cd('Chefe · nível 20','A Sombra no Espelho','O Espelho volta no nível 20, mais profundo. Desta vez, quem aparece é a sua própria sombra.');
  else if(D&&!D.won)h+=cd('Em andamento',dgNome('O Espelho'),'Andar '+(D.fl.filter(Boolean).length+1)+' de '+D.fl.length+'.','<button class="mb on" onclick="dsub(\'d\');dgOpen(\'O Espelho\')">Continuar</button>');
  else{const d2=S.defeated2&&S.defeated2['O Espelho'],d3=S.defeated3&&S.defeated3['O Espelho'];
   h+=cd('Fase 2 · Espelho','A Sombra no Espelho',d2?'Você encarou a sua sombra no dia '+d2+'.':'Cinco andares de reflexão: a voz crítica, a comparação, a máscara do "tudo bem" e o perfeccionismo. Vale 1,5× de XP.',d2?'':'<button class="mb on" onclick="Desafios.espelho2(2)">Encarar a Sombra</button>');
   if(d2&&liberado('fase3'))h+=cd('Forma Verdadeira','O Espelho Rachado',d3?'Vencido no dia '+d3+'.':'Um andar só. A última vez que o Espelho tenta te convencer de algo. 2× de XP.',d3?'':'<button class="mb on" onclick="Desafios.espelho2(3)">Enfrentar</button>')}
  h+=cd('Reflexão · nível 35','O Espelho do Passado',L>=35?'Cinco perguntas gentis sobre quem você foi.':'Abre no nível 35.',L>=35?'<button class="mb on" onclick="telaAbrir(\'espP\')">Olhar</button>':'');
  h+=cd('Reflexão · nível 50','O Espelho do Futuro',L>=50?'Cinco perguntas sobre quem você quer ser.':'Abre no nível 50.',L>=50?'<button class="mb on" onclick="telaAbrir(\'espF\')">Olhar</button>':'');
  return h},
 invasaoCard(){return (S.dsub==='d'||!S.dsub)&&(!S.dg||S.dgList)?Invasao.card():''}
};
