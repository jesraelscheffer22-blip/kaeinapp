/* ===== "Coisas vivas": movimento leve nos fundos, personagem, provas e monstros =====
   Tudo com transform/opacity (leve para celular modesto). Desliga com "Reduzir efeitos". */
const VIVO={
 // efeito de cada fundo novo: partículas e clima
 'fd-bambu':{p:'bambu',n:14},'fd-bambulua':{p:'vagalume',n:16},'fd-montanha':{p:'neve',n:34,raio:1},
 'fd-tempestade':{p:'chuva',n:46,raio:1},'fd-palacio':{p:'brasa',n:18},'fd-jardim':{p:'bordo',n:12},'fd-lua':{p:'ouro',n:18},
 't2':{p:'nevoa',n:3},'t3':{p:'brasa',n:10}};
const Vivo={
 chave:'',
 aplicar(){const bg=document.getElementById('bg'),app=document.getElementById('app');if(!bg||!app)return;
  let el=document.getElementById('vivo');const rf=Cfg.rfx(),cls=bg.className,k=Object.keys(VIVO).find(x=>new RegExp('(^|\\s)'+x+'(\\s|$)').test(cls));
  const chave=rf?'':(k||'')+(steps[S.i]&&steps[S.i].t==='day1'?'':'x');
  if(chave===Vivo.chave&&el)return;Vivo.chave=chave;
  if(!el){el=document.createElement('div');el.id='vivo';bg.insertAdjacentElement('afterend',el)}
  if(!k||rf){el.className='';el.innerHTML='';return}
  const V=VIVO[k];el.className='vv-'+V.p+(V.raio?' vv-raio':'');
  el.innerHTML='<i class="vluz"></i>'+Array.from({length:V.n},()=>'<i class="vp" style="left:'+(Math.random()*100).toFixed(1)+'%;top:'+(V.p==='vagalume'?(30+Math.random()*60).toFixed(0)+'%':'')+';animation-delay:-'+(Math.random()*10).toFixed(2)+'s;animation-duration:'+((V.p==='chuva'?.7:V.p==='neve'?6:V.p==='vagalume'?5:9)+Math.random()*(V.p==='chuva'?.5:5)).toFixed(2)+'s;--dx:'+((Math.random()-.5)*(V.p==='chuva'?40:120)).toFixed(0)+'px"></i>').join('')+(V.raio?'<i class="vraio"></i>':'')}
};
AFTER_RENDER.push(()=>Vivo.aplicar());

// Provas: poeira dourada subindo e luz pulsando no portão
const _pvView=Prova.view;Prova.view=function(){return _pvView().replace('<div class="pvt">','<div class="vgate"></div><div class="vdust">'+Array.from({length:Cfg.rfx()?0:16},()=>'<i style="left:'+(20+Math.random()*60).toFixed(0)+'%;animation-delay:-'+(Math.random()*6).toFixed(1)+'s;animation-duration:'+(4+Math.random()*4).toFixed(1)+'s"></i>').join('')+'</div><div class="pvt">')};
