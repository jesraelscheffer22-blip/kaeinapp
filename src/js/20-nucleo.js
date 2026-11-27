/* ===== Núcleo da expansão: ajustes, som, telas novas, ajudas ===== */

// ---------- Ajustes de experiência (S.cfg) ----------
// rfx: null = segue o sistema (prefers-reduced-motion), 1 = reduzir efeitos, 0 = efeitos completos
const Cfg={
 get(){S.cfg=S.cfg||{rfx:null,som:1,amb:0,vol:1,vib:1,fs:1,hc:0};return S.cfg},
 rfx(){const c=Cfg.get();if(c.rfx===1)return true;if(c.rfx===0)return false;try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}},
 som(){return Cfg.get().som!==0},
 vib(){return Cfg.get().vib!==0},
 vol(){return [.12,.25,.45][Cfg.get().vol==null?1:Cfg.get().vol]},
 set(k,v){Cfg.get()[k]=v;if(k==='amb'||k==='som'){Som.ambSync()}Cfg.aplicar();S.top=false;render()},
 aplicar(){const b=document.body,c=Cfg.get();if(!b)return;b.classList.toggle('rfx',Cfg.rfx());b.classList.toggle('hc',!!c.hc);b.classList.remove('fs2','fs3');if(c.fs>1)b.classList.add('fs'+c.fs)}
};
// Vibração respeita o ajuste, em todo o app.
(function(){try{const v0=navigator.vibrate&&navigator.vibrate.bind(navigator);if(v0)Object.defineProperty(navigator,'vibrate',{configurable:true,value:p=>{try{return (S&&S.cfg&&S.cfg.vib===0)?false:v0(p)}catch(e){return false}}})}catch(e){}})();
MIGS.push(()=>{Cfg.get();Cfg.aplicar()});
AFTER_RENDER.push(()=>Cfg.aplicar());

// ---------- Som sintetizado (WebAudio, sem arquivos) ----------
const Som=(()=>{let ac=null,amb=null;
 const ctx=()=>{try{if(!ac)ac=(typeof _ac!=='undefined'&&_ac)||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume()}catch(e){ac=null}return ac};
 const ok=()=>Cfg.som()&&ctx();
 function env(a,t0,dur,g){const G=a.createGain(),t=a.currentTime+t0;G.gain.setValueAtTime(.0001,t);G.gain.exponentialRampToValueAtTime(Math.max(.0002,g*Cfg.vol()),t+.015);G.gain.exponentialRampToValueAtTime(.0001,t+dur);G.connect(a.destination);return G}
 function tom(f,t0,dur,g,tipo,ate){const a=ctx();if(!a)return;const o=a.createOscillator(),G=env(a,t0,dur,g);o.type=tipo||'sine';o.frequency.setValueAtTime(f,a.currentTime+t0);if(ate)o.frequency.exponentialRampToValueAtTime(ate,a.currentTime+t0+dur);o.connect(G);o.start(a.currentTime+t0);o.stop(a.currentTime+t0+dur+.05)}
 function ruido(t0,dur,g,tipo,fc){const a=ctx();if(!a)return;const n=Math.floor(a.sampleRate*dur),bf=a.createBuffer(1,n,a.sampleRate),d=bf.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const s=a.createBufferSource(),F=a.createBiquadFilter();F.type=tipo||'lowpass';F.frequency.value=fc||800;s.buffer=bf;s.connect(F);F.connect(env(a,t0,dur,g));s.start(a.currentTime+t0)}
 const api={
  pincel(){if(!ok())return;ruido(0,.25,.5,'bandpass',2400);tom(660,.05,.35,.25,'triangle',990)},
  selo(){if(!ok())return;tom(90,0,.35,.9,'sine',50);ruido(0,.12,.6,'lowpass',500);tom(523,.12,.9,.25,'triangle');tom(784,.22,1.1,.2,'triangle')},
  gongo(){if(!ok())return;[[110,1],[164.8,.6],[220,.5],[277,.35],[392,.2]].forEach(([f,g])=>tom(f,0,4,g*.7,'sine',f*.985));ruido(0,.3,.3,'lowpass',300)},
  sino(){if(!ok())return;tom(880,0,2.2,.35,'sine');tom(1320,0,1.6,.18,'sine');tom(2217,0,.8,.08,'sine')},
  trovao(){if(!ok())return;ruido(0,2.4,1,'lowpass',180);ruido(.05,.5,.5,'lowpass',900)},
  vento(){if(!ok())return;ruido(0,2.5,.25,'bandpass',600)},
  brilho(){if(!ok())return;[1047,1319,1568,2093].forEach((f,i)=>tom(f,i*.08,.9,.18,'triangle'))},
  tambor(){if(!ok())return;tom(80,0,.5,1,'sine',45);ruido(0,.08,.4,'lowpass',200)},
  // Paisagem sonora por rank: drone baixo + sino esparso. Desligada por padrão.
  ambSync(){api.ambStop();if(!Cfg.som()||!Cfg.get().amb)return;const a=ctx();if(!a)return;const r=rkI(myLvl()),base=[110,98,87.3,73.4,65.4,55][r]||110;
   const G=a.createGain();G.gain.value=.05*Cfg.vol();G.connect(a.destination);const os=[1,1.5,2.01].map(m=>{const o=a.createOscillator();o.type='sine';o.frequency.value=base*m;const g=a.createGain();g.gain.value=m===1?.6:.25;o.connect(g);g.connect(G);o.start();return o});
   const t=setInterval(()=>{if(document.hidden)return;tom(base*8*[1,1.125,1.25,1.5,1.667][Math.floor(Math.random()*5)],0,2.5,.06,'sine')},9000);amb={G,os,t}},
  ambStop(){if(!amb)return;try{amb.os.forEach(o=>o.stop());clearInterval(amb.t);amb.G.disconnect()}catch(e){}amb=null}
 };
 document.addEventListener('visibilitychange',()=>{if(document.hidden)api.ambStop();else if(S&&S.cfg&&S.cfg.amb)api.ambSync()});
 return api})();

// ---------- Telas novas (S.tela) ----------
// Cada módulo registra TELAS[id]={t:'Título', v:()=>html}. render() mostra a tela no lugar do conteúdo da aba.
const TELAS={};
function telaAbrir(id,extra){S.tela=id;S.telaX=extra==null?null:extra;S.top=true;render()}
function telaFechar(){S.tela=null;S.telaX=null;S.top=true;render()}
function telaView(){const T=TELAS[S.tela];return '<div class="gh"><button class="lk" onclick="telaFechar()">‹ Voltar</button><span class="note">'+esc(T.t)+'</span></div>'+T.v()}
// Dica da primeira vez que um sistema aparece (pulável).
function tutH(id,titulo,txt){S.tut=S.tut||{};if(S.tut[id])return '';return '<div class="card tipc"><div class="mt"><span class="g">Primeira vez aqui</span><b>'+esc(titulo)+'</b></div><p class="note">'+txt+'</p><button class="mb on" onclick="S.tut[\''+id+'\']=1;S.top=false;render()">Entendi</button></div>'}
// Sistemas liberados por nível (ver PLANO-EXPANSAO.md).
const UNL={mapa:11,bestiario:11,mandamentos:13,meditacao:14,galeria:14,torneio:17,escola:20,espelho2:20,kata:21,diario:23,templo:25,auraDin:25,elixires:26,fase3:30,torre:30,cenas:31,retro:33,invasao:36,armas:40,titComp:40,cartao:43,mestre:50};
const liberado=k=>!!(S&&S.a&&S.a.goal!=null)&&myLvl()>=(UNL[k]||0);
const discipuloDe=()=>['o aprendiz do Kaien','o discípulo do Kaien','o discípulo do Kaien','irmão de caminho do Kaien','o herdeiro do Kaien','mestre do Caminho'][rkI(myLvl())];
// Data (AAAA-MM-DD) de um dia do app, contando para trás a partir de hoje.
function dataDoDia(d){const t=S.lastDate||_iso(),p=t.split('-').map(Number),x=new Date(p[0],p[1]-1,p[2]-(S.day-d));return x}
const fmtData=x=>{const p=n=>String(n).padStart(2,'0');return p(x.getDate())+'/'+p(x.getMonth()+1)+'/'+x.getFullYear()};
const fmtIso=t=>{if(!t)return '';const p=t.split('-');return p[2]+'/'+p[1]+'/'+p[0]};

// ---------- Ajustes (cartões no Perfil) ----------
const Ajustes={
 cards(){const c=Cfg.get(),b=(k,v,t)=>'<button class="mb '+((c[k]===v||(c[k]==null&&v===null))?'on':'')+'" onclick="Cfg.set(\''+k+'\','+v+')">'+t+'</button>';
  return '<div class="card"><div class="mt"><span class="g">Ajustes</span><b>Experiência</b></div>'
  +'<p class="note">Reduzir efeitos (flashes, tremores e animações)</p><div class="lvs">'+b('rfx',null,'Como o celular')+b('rfx',1,'Reduzir')+b('rfx',0,'Completo')+'</div>'
  +'<p class="note">Sons</p><div class="lvs">'+b('som',1,'Ligados')+b('som',0,'Mudo')+'</div>'
  +'<p class="note">Volume</p><div class="lvs">'+b('vol',0,'Baixo')+b('vol',1,'Médio')+b('vol',2,'Alto')+'</div>'
  +'<p class="note">Paisagem sonora do rank (música ambiente suave)</p><div class="lvs">'+b('amb',0,'Desligada')+b('amb',1,'Ligada')+'</div>'
  +'<p class="note">Vibração</p><div class="lvs">'+b('vib',1,'Ligada')+b('vib',0,'Desligada')+'</div>'
  +'<p class="note">Tamanho do texto</p><div class="lvs">'+b('fs',1,'Normal')+b('fs',2,'Grande')+b('fs',3,'Maior')+'</div>'
  +'<p class="note">Estações e clima no fundo (folhas, flores, névoa)</p><div class="lvs">'+b('est',null,'Ligado')+b('est',0,'Desligado')+'</div>'
  +'<p class="note">Alto contraste</p><div class="lvs">'+b('hc',0,'Normal')+b('hc',1,'Alto contraste')+'</div></div>'
  +'<div class="card"><div class="mt"><span class="g">Seus dados</span><b>Progresso e privacidade</b></div><div class="ajl">'
  +'<button class="mb" onclick="telaAbrir(\'stats\')">📊 Estatísticas e constância</button>'
  +'<button class="mb" onclick="telaAbrir(\'backup\')">💾 Backup: exportar e importar</button>'
  +'<button class="mb" onclick="telaAbrir(\'priv\')">🔒 Privacidade</button>'
  +'<button class="mb" onclick="telaAbrir(\'ajuda\')">❓ Central de ajuda</button></div></div>'}
};
