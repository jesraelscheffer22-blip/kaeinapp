/* ===== Recompensas: coleção de todos os itens, com arte vetorial feita no app ===== */

// Selo de título: forma e cor pelo prestígio (nível em que é ganho).
function seloTitulo(nome,nivel,sz){const r=Math.min(5,Math.floor((nivel||1)/10)),cor=['#9aa0b4','#a9c4ee','#d29a5c','#e6eef8','#f1d48a','#d4b8ff'][r],fundo=['#2a2d3a','#1f2a44','#20332a','#25304a','#3a1e1e','#2a1d44'][r];
 const id='st'+Math.random().toString(36).slice(2,7),ini=String(nome||'?').replace(/^(O|A|Os|As|Do|Da|De) /,'').charAt(0).toUpperCase();
 const pontas=Array.from({length:12},(_,i)=>{const a=i*Math.PI/6,R=i%2?40:46;return (50+R*Math.cos(a)).toFixed(1)+','+(50+R*Math.sin(a)).toFixed(1)}).join(' ');
 return '<svg viewBox="0 0 100 100" width="'+(sz||54)+'" height="'+(sz||54)+'"><defs><radialGradient id="'+id+'"><stop offset="0" stop-color="'+cor+'" stop-opacity=".55"/><stop offset="1" stop-color="'+fundo+'"/></radialGradient></defs><path d="M30 70 22 96l14-8 8 12 6-26M70 70l8 26-14-8-8 12-6-26" fill="#8e1f1a"/><polygon points="'+pontas+'" fill="url(#'+id+')" stroke="'+cor+'" stroke-width="2.5"/><circle cx="50" cy="50" r="27" fill="none" stroke="'+cor+'" stroke-width="1.5" stroke-dasharray="3 3"/><text x="50" y="60" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="28" fill="'+cor+'">'+esc(ini)+'</text>'+'<g fill="'+cor+'">'+Array.from({length:r},(_,i)=>'<circle cx="'+(50-(r-1)*5+i*10)+'" cy="16" r="2.6"/>').join('')+'</g></svg>'}
// Orbe de aura: esfera com brilho e faíscas na cor da aura (animada).
function orbeAura(rgb,sz,arco){const id='au'+Math.random().toString(36).slice(2,7);const fill=arco?'url(#'+id+'r)':'url(#'+id+')';
 return '<svg viewBox="0 0 100 100" width="'+(sz||54)+'" height="'+(sz||54)+'" class="orbe"><defs><radialGradient id="'+id+'" cx="40%" cy="35%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="rgb('+(rgb||'200,200,220')+')"/><stop offset="1" stop-color="rgb('+(rgb||'200,200,220')+')" stop-opacity=".05"/></radialGradient><linearGradient id="'+id+'r"><stop offset="0" stop-color="#eb5046"/><stop offset=".3" stop-color="#ffcd5a"/><stop offset=".5" stop-color="#78e678"/><stop offset=".7" stop-color="#5ac8aa"/><stop offset="1" stop-color="#cd8c50"/></linearGradient></defs><circle cx="50" cy="50" r="44" fill="'+fill+'" opacity=".35"/><circle cx="50" cy="50" r="30" fill="'+fill+'"/>'+[0,1,2,3,4].map(i=>'<circle class="orbp" cx="'+(30+i*10)+'" cy="'+(78-i%2*8)+'" r="2.2" fill="#fff" style="animation-delay:-'+(i*.5)+'s"/>').join('')+'</svg>'}
// Amostra de cor do nome.
const amostraNome=(cor,sz)=>'<svg viewBox="0 0 100 100" width="'+(sz||54)+'" height="'+(sz||54)+'"><rect x="8" y="26" width="84" height="48" rx="10" fill="#141026" stroke="'+(cor||'#888')+'" stroke-width="2"/><text x="50" y="58" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="22" fill="'+(cor||'#e8eaf6')+'">Aa</text></svg>';

const Itens={
 grupo(t,itens){const ok=itens.filter(x=>x.ok).length;return '<div class="card"><div class="mt"><span class="g">'+t+'</span><b>'+ok+' de '+itens.length+'</b></div><div class="itg">'+itens.map(x=>'<div class="iti'+(x.ok?'':' lk2')+(x.eq?' eq':'')+'"><div class="itv">'+x.v+'</div><b>'+esc(x.n)+'</b><small>'+esc(x.ok?(x.eq?'Equipado':x.d||'Liberado'):x.como)+'</small></div>').join('')+'</div></div>'},
 v(){const L=myLvl(),eq=S.eq||{};let h=tutH('itens','Recompensas','Aqui estão todos os itens do caminho: os que você já tem e como liberar os outros. Para equipar, use Personagem → Personalizar.');
  h+=Itens.grupo('Títulos',TITN.map(t=>({n:t[0],ok:L>=t[1],eq:eq.title===t[0],como:'Nível '+t[1],v:seloTitulo(t[0],t[1])})));
  h+=Itens.grupo('Auras',AURAS.slice(1).map((a,i)=>({n:a[0],ok:L>=a[2],eq:(eq.aura||0)===i+1,como:'Nível '+a[2],v:orbeAura(a[3],54,i+1===7)})));
  h+=Itens.grupo('Roupas',ROUPAS.map((r,i)=>({n:r[0],ok:L>=r[2],eq:outN()===i,como:'Nível '+r[2],v:'<div class="itav"><div class="av '+r[3]+'"></div></div>'})));
  h+=Itens.grupo('Fundos',FUNDOS.map(f=>({n:f[1],ok:L>=f[2],eq:(eq.bgv||0)===f[0],como:'Nível '+f[2],v:'<div class="itbg"><div class="bg '+f[3]+'"></div></div>'})));
  h+=Itens.grupo('Cor do nome',NOMECOR.slice(1).map((c,i)=>({n:c[0],ok:L>=c[2],eq:(eq.nc||0)===i+1,como:'Nível '+c[2],v:amostraNome(c[1])})));
  h+=Itens.grupo('Emblemas de rank',['E','D','C','B','A','S'].map((R,i)=>({n:'Rank '+R,ok:rkI(L)>=i,como:'Nível '+(i*10||1),v:Emb.svg(R,54)})));
  h+=Itens.grupo('Armas cerimoniais',ARMAS.map(a=>({n:a[1],ok:L>=a[2],como:'Nível '+a[2],d:'No seu Templo',v:armaSvg(a)})));
  h+=Itens.grupo('Selos de atributo',[25,50,100].map((n,i)=>({n:'Marco '+n,ok:ST.some(s=>statNow(s)>=n),como:'Um atributo em '+n,v:'<svg viewBox="0 0 100 100" width="54" height="54"><circle cx="50" cy="50" r="40" fill="#141026" stroke="'+['#cd8c50','#d7dceb','#f1d48a'][i]+'" stroke-width="4"/><text x="50" y="62" text-anchor="middle" font-family="Georgia" font-size="34" fill="'+['#cd8c50','#d7dceb','#f1d48a'][i]+'">✦</text></svg>'})));
  h+=Itens.grupo('Selos de mandamento',[7,21,66].map((n,i)=>({n:n+' dias',ok:Mand.maxDias()>=n,como:'Um mandamento por '+n+' dias',v:'<svg viewBox="0 0 100 100" width="54" height="54"><circle cx="50" cy="50" r="40" fill="'+['#8e1f1a','#2f7a5a','#d9b36a'][i]+'"/><text x="50" y="60" text-anchor="middle" font-family="Georgia" font-weight="700" font-size="28" fill="'+(i===2?'#2a1d10':'#f1d48a')+'">'+n+'</text></svg>'})));
  h+=Itens.grupo('Chefes Errantes',ERR.map(e=>({n:e.n,ok:!!(S.errv||{})[e.id],como:'Terça ou sexta, no rodízio',d:'Vencido',v:errSvg(e,54)})));
  return h}
};
TELAS.itens={t:'Recompensas',v:()=>Itens.v()};
JTILES.unshift(['itens','🎁','Recompensas','itens',1]);
