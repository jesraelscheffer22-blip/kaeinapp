/* ===== Estatísticas, Constância, Retrospectiva, Backup, Privacidade, Ajuda ===== */

// Dias de retiro já vividos (para pintar a constância em outra cor).
MIGS.push(()=>{S.retH=S.retH||[]});
const _retIni=Retiro.iniciar;Retiro.iniciar=n=>{_retIni(n);S.retH=(S.retH||[]).concat([S.ret]);render()};
const emRetiro=d=>(S.retH||[]).concat(S.ret?[S.ret]:[]).some(r=>r&&d>=r.de&&d<=r.ate);

const Stats={
 // dias ativos em sequência (dias de descanso e retiro não quebram: só dias de treino sem nada contam como pausa)
 melhorSeq(){let b=0,c=0;S.hist.forEach(h=>{if(h.active){c++;b=Math.max(b,c)}else if(h.train&&!emRetiro(h.day))c=0});if(todayActive()){c++;b=Math.max(b,c)}return b},
 tempo(){let s=0;S.hist.forEach(h=>Object.values(h.ms||{}).forEach(x=>(x.times||[]).forEach(t=>s+=t.sec||0)));Object.values(S.ms).forEach(x=>(x.times||[]).forEach(t=>s+=t.sec||0));return s},
 cel(d){if(d>S.day)return 'fu';if(emRetiro(d))return 'rt';const h=d===S.day?{active:todayActive(),train:isTrain(d)}:S.hist[d-1];if(!h)return 'fu';return h.active?(h.train?'on':'ld'):(h.train?'na':'rs')},
 heat(){const W=16,hoje=S.day,wd=(S.wd0+hoje-1)%7,ini=hoje-wd-7*(W-1);let c='';for(let w=0;w<W;w++){c+='<div class="hmc">';for(let k=0;k<7;k++){const d=ini+w*7+k;c+='<i class="hm '+(d<1?'fu':Stats.cel(d))+'" title="Dia '+d+'"></i>'}c+='</div>'}
  return '<div class="hmw">'+c+'</div><div class="hml"><span><i class="hm on"></i>treino feito</span><span><i class="hm ld"></i>dia leve ativo</span><span><i class="hm rs"></i>descanso</span><span><i class="hm rt"></i>retiro</span><span><i class="hm na"></i>pausa</span></div>'},
 v(){const t=Stats.tempo(),h=Math.floor(t/3600),m=Math.round(t%3600/60),da=S.hist.filter(x=>x.active).length+(todayActive()?1:0);
  return '<div class="card"><div class="mt"><span class="g">Constância</span><b>Últimas 16 semanas</b></div>'+Stats.heat()+'<p class="note">Cada pincelada é um dia. Pausas aparecem em cinza claro, nunca como falha. Dias de retiro ganham a cor do descanso.</p></div>'
  +'<div class="card stg"><div><b>'+S.day+'</b><span>dias no caminho</span></div><div><b>'+da+'</b><span>dias ativos</span></div><div><b>'+doneCount()+'</b><span>missões cumpridas</span></div><div><b>'+Stats.melhorSeq()+'</b><span>melhor sequência de dias ativos</span></div><div><b>'+(h?h+' h ':'')+m+' min</b><span>tempo em missões</span></div><div><b>'+Object.keys(S.defeated||{}).length+'</b><span>chefes derrotados</span></div></div>'
  +(liberado('retro')||S.day>=365||rkI(myLvl())>=5?'<button class="mb on" onclick="telaAbrir(\'retro\')">Abrir a Retrospectiva</button>':'<p class="note">A Retrospectiva do mês abre no nível '+UNL.retro+'.</p>')}
};
TELAS.stats={t:'Estatísticas e constância',v:()=>Stats.v()};

// ---------- Retrospectiva mensal e anual (E2) ----------
const MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const Retro={
 dias(f){const o=[];for(let d=1;d<=S.day;d++){const x=dataDoDia(d);if(f(x))o.push(d)}return o},
 resumo(ds){const H=ds.map(d=>d===S.day?{day:d,ms:S.ms,keys:plan().map(m=>({key:m.key,stat:m.stat})),active:todayActive(),water:false}:S.hist[d-1]).filter(Boolean);
  let mis=0;const st={};H.forEach(h=>(h.keys||[]).forEach(k=>{if(h.ms[k.key]&&h.ms[k.key].st==='done'){mis++;st[k.stat]=(st[k.stat]||0)+1}}));
  let bs=null,bn=-1;for(let i=0;i<H.length;i+=7){const n=H.slice(i,i+7).filter(h=>h.active).length;if(n>bn){bn=n;bs=i}}
  const top=Object.keys(st).sort((a,b)=>st[b]-st[a])[0];const dg=Object.keys(S.defeated||{}).filter(h=>ds.includes(S.defeated[h])).map(h=>DGH[h].m);
  const ini=ds[0],fim=ds[ds.length-1],fr=(S.dia||[]).filter(e=>{const d=e.day||null;return e.src==='dd'||e.src==='free'}).find(e=>{const x=new Date(e.t);const a=dataDoDia(ini),b=dataDoDia(fim);return x>=a&&x<=new Date(b.getTime()+864e5)});
  return {mis,ativos:H.filter(h=>h.active).length,agua:H.filter(h=>h.water).length,top,dg,semana:bn,fr}},
 pagina(tit,r){return '<div class="card rtp"><span class="g">Pergaminho</span><b>'+esc(tit)+'</b><ul><li><b>'+r.mis+'</b> missões cumpridas</li><li><b>'+r.ativos+'</b> dias ativos</li><li>Melhor semana: <b>'+Math.max(0,r.semana)+'</b> dias ativos</li><li>Meta de água em <b>'+r.agua+'</b> dias</li><li>Atributo mais treinado: <b>'+esc(r.top||'ainda nenhum')+'</b></li>'+(r.dg.length?'<li>Monstros vencidos: <b>'+esc(r.dg.join(', '))+'</b></li>':'')+'</ul>'+(r.fr?'<p class="note">Uma frase sua:<br>“'+esc(r.fr.txt.slice(0,200))+'”</p>':'')+'<p class="note">“'+esc(r.mis?'Cada missão deste pergaminho foi escolha sua. Eu só fiquei olhando, com orgulho.':'Um mês mais quieto também faz parte. O caminho continua aqui.')+'” <span class="g">Kaien</span></p></div>'},
 v(){const now=new Date(),m=now.getMonth(),y=now.getFullYear(),pm=(m+11)%12,py=m?y:y-1;
  const cur=Retro.dias(x=>x.getMonth()===m&&x.getFullYear()===y),prev=Retro.dias(x=>x.getMonth()===pm&&x.getFullYear()===py);
  let h=Retro.pagina('O mês de '+MESES[m]+' (até hoje)',Retro.resumo(cur));if(prev.length)h+=Retro.pagina('O mês de '+MESES[pm],Retro.resumo(prev));
  if(S.day>=365||rkI(myLvl())>=5){const ano=Retro.dias(x=>(now-x)/864e5<366);h='<div class="card"><span class="g">Relatório anual</span><b>Os últimos 12 meses</b></div>'+Retro.pagina('Um ano de caminho',Retro.resumo(ano))+h}
  return h}
};
TELAS.retro={t:'Retrospectiva',v:()=>Retro.v()};

// ---------- Backup: exportar e importar (sem conta, sem servidor) ----------
const Backup={
 dados(){return JSON.stringify({app:'kaien',v:5,data:new Date().toISOString(),S:Object.assign({},S,{g:null,cel:null,react:null,tela:null})})},
 exportar(){const txt=Backup.dados(),nome='kaien-backup-'+_iso()+'.json';
  try{const b=new Blob([txt],{type:'application/json'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=nome;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(u);a.remove()},500)}catch(e){}
  try{if(navigator.share&&window.File){const f=new File([txt],nome,{type:'application/json'});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f],title:'Backup do Kaien'}).catch(()=>{})}}catch(e){}
  S.bkMsg='Arquivo gerado. Se não aparecer, use “Copiar como texto” e guarde num lugar seguro.';render()},
 copiar(){const t=Backup.dados();try{navigator.clipboard.writeText(t).then(()=>{S.bkMsg='Copiado. Cole num lugar seguro (por exemplo, um e-mail para você mesmo).';render()}).catch(()=>{S.bkTxt=1;render()})}catch(e){S.bkTxt=1;render()}},
 validar(o){return o&&o.app==='kaien'&&o.S&&typeof o.S==='object'&&typeof o.S.name==='string'&&Array.isArray(o.S.hist)&&typeof o.S.xpPrev==='number'&&typeof o.S.day==='number'},
 ler(txt){try{const o=JSON.parse(txt);if(!Backup.validar(o))throw 0;S.bkImp={txt,nome:o.S.name,dia:o.S.day,data:o.data};S.bkMsg=''}catch(e){S.bkMsg='Esse arquivo não parece um backup do Kaien.';S.bkImp=null}render()},
 arquivo(inp){const f=inp.files&&inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>Backup.ler(String(r.result));r.readAsText(f)},
 confirmar(){const i=S.bkImp;if(!i)return;try{localStorage.setItem('kaien.v1.bak',localStorage.getItem('kaien.v1')||'');const o=JSON.parse(i.txt);localStorage.setItem('kaien.v1',JSON.stringify(o.S));_save=()=>{};location.reload()}catch(e){S.bkMsg='Não consegui importar. Nada foi alterado.';render()}},
 v(){const i=S.bkImp;return '<div class="card"><div class="mt"><span class="g">Exportar</span><b>Guardar o seu progresso</b></div><p class="note">Gera um arquivo com tudo: níveis, XP, missões, recordações e ajustes. Use para trocar de celular. Ninguém além de você recebe esse arquivo.</p><div class="ajl"><button class="mb on" onclick="Backup.exportar()">Exportar arquivo</button><button class="mb" onclick="Backup.copiar()">Copiar como texto</button></div>'+(S.bkTxt?'<textarea class="dnote" rows="4" readonly onclick="this.select()">'+esc(Backup.dados())+'</textarea>':'')+'</div>'
  +'<div class="card"><div class="mt"><span class="g">Importar</span><b>Trazer o progresso de outro aparelho</b></div><p class="note">Escolha o arquivo do backup ou cole o texto. Antes de trocar, o progresso atual é guardado como cópia de segurança.</p><input type="file" accept="application/json,.json,text/plain" onchange="Backup.arquivo(this)"><textarea id="bkcol" class="dnote" rows="3" placeholder="Ou cole aqui o texto do backup"></textarea><button class="mb" onclick="Backup.ler(document.getElementById(\'bkcol\').value)">Ler texto colado</button>'
  +(i?'<div class="pvq">Backup de <b>'+esc(i.nome)+'</b>, dia '+i.dia+' do caminho'+(i.data?', gerado em '+esc(i.data.slice(0,10).split('-').reverse().join('/')):'')+'.<br>Isso vai substituir o progresso deste aparelho.</div><button class="mb on" onclick="Backup.confirmar()">Importar e substituir</button><button class="lk" onclick="S.bkImp=null;render()">Cancelar</button>':'')+'</div>'+(S.bkMsg?'<p class="note"><b>'+esc(S.bkMsg)+'</b></p>':'')}
};
TELAS.backup={t:'Backup',v:()=>Backup.v()};

// ---------- Privacidade (LGPD) ----------
const Priv={
 apagar(){if(!S.prvDel){S.prvDel=1;render();setTimeout(()=>{S.prvDel=0;render()},6000);return}try{localStorage.removeItem('kaien.v1');localStorage.removeItem('kaien.v1.bak')}catch(e){}_ab=0;reset()},
 v(){return '<div class="card"><div class="mt"><span class="g">Privacidade</span><b>Seus dados ficam com você</b></div>'
  +'<p class="note"><b>O que é guardado:</b> seu nome ou apelido, idade, altura e peso (se informou), respostas da abertura, dias de treino, missões, hábitos que você marcou, dungeons, recordações, respostas do diário e ajustes.</p>'
  +'<p class="note"><b>Onde:</b> só neste aparelho, no armazenamento interno do app. Não há conta, servidor, nuvem, anúncios nem análise de uso. Nada é enviado para ninguém.</p>'
  +'<p class="note"><b>Por quê:</b> para montar as suas missões, mostrar o seu progresso e lembrar de você. Saúde e hábitos são dados sensíveis, por isso ficam só com você.</p>'
  +'<p class="note"><b>Lembretes:</b> são agendados no próprio celular. O texto deles fica no aparelho.</p>'
  +'<p class="note"><b>Backup:</b> só existe se você exportar. O arquivo fica onde você escolher guardar.</p>'
  +'<p class="note"><b>Como apagar:</b> use o botão abaixo, ou desinstale o app. Apagar não tem volta.</p>'
  +'<button class="mb" onclick="Priv.apagar()">'+(S.prvDel?'Toque de novo para apagar tudo, para sempre':'Apagar todos os meus dados')+'</button></div>'}
};
TELAS.priv={t:'Privacidade',v:()=>Priv.v()};

// ---------- Central de ajuda (FAQ) ----------
const FAQ=[['Como ganho XP?','Concluindo missões (Mente, Treino, Hábito, Surpresa), a meta de água, o registro de sono, os mandamentos e os andares das dungeons. O nível das missões e o rank multiplicam o XP.'],
['O que acontece se eu falhar um dia?','Nada se perde. Você não perde XP, nível nem rank. O Kaien não cobra: o caminho continua de onde você parou.'],
['O que é a Prova de Ascensão?','Nos níveis 10, 20, 30, 40 e 50 o nível para até você fazer a prova do rank. O XP que você ganhar enquanto isso fica guardado. A prova pode ser feita em qualquer dia e retomada depois.'],
['Quando o multiplicador do rank começa?','No dia seguinte à subida de rank.'],
['E se eu sentir dor?','Use "Parei por dor" no treino. Com dor frequente (2), o nível Difícil fica bloqueado; com lesão que limita (3), só o Fácil, e os treinos viram mobilidade leve. Dor que continua: procure um profissional de saúde.'],
['"Fiz parte" conta?','Fica registrado na sua evolução, sem XP. Ser honesto com o corpo também é treino.'],
['O que são as dungeons?','Desafios ligados aos hábitos que você quer mudar. Um andar por dia, até 3 dungeons abertas. Recaída não tira nada: o andar continua aberto.'],
['O que é o Retiro?','Um modo de descanso para quando você estiver doente, viajando ou exausto. As missões viram só respirar e beber água, sem perder nada.'],
['Os lembretes não tocam. O que faço?','Eles só funcionam no app instalado. Confira se as notificações do Kaien estão permitidas nas configurações do celular e use o botão de teste nos lembretes.'],
['Vou trocar de celular. E agora?','Em Perfil, Backup, exporte o arquivo e importe no aparelho novo.'],
['O app substitui um profissional?','Não. O Kaien ajuda a criar hábitos e não substitui médico, psicólogo, nutricionista ou educador físico.'],
['Estou passando por um momento muito difícil.','Você não precisa passar por isso sozinho. O CVV atende pelo 188, de graça, a qualquer hora. Em emergência, ligue 192 (SAMU). Para hábitos que pesam, procure uma UBS ou um CAPS AD.']];
TELAS.ajuda={t:'Central de ajuda',v:()=>FAQ.map(f=>'<div class="card"><b>'+esc(f[0])+'</b><p class="note clamp" onclick="this.classList.toggle(\'open\')">'+esc(f[1])+'</p></div>').join('')+'<div class="card">'+SUP+'</div>'};
