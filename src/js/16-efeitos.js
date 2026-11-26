function esc(t){return String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
(function(){const em=document.getElementById('em'),c=['#ffcf6a','#ffb347','#c9a8ff','#ffe9a8'];
 for(let i=0;i<24;i++){const e=document.createElement('i'),z=2+Math.random()*3.5;
  e.style.cssText='left:'+(Math.random()*100)+'%;width:'+z+'px;height:'+z+'px;background:'+c[i%4]+';box-shadow:0 0 '+(z*3)+'px '+c[i%4]+';animation-duration:'+(9+Math.random()*12)+'s;animation-delay:-'+(Math.random()*18)+'s;--dx:'+((Math.random()-.5)*90)+'px';
  em.appendChild(e)}})();
const FX={prf:{pos:.3,pts:[[.294,.26,260]],moon:[.81,.158]},per:{pos:.85,pts:[[.94,.51,230],[.055,.60,170]]},dun:{pos:1,pts:[[.887,.60,240]]}};
function placeFx(){const K=S.tab,cfg=FX[K],tf=$('tf');if(!cfg){tf.innerHTML='';tf.dataset.k='';return}
 const a=$('app'),w=a.clientWidth,h=a.clientHeight,sc=Math.max(w/941,h/1672),iw=941*sc,ih=1672*sc,ox=(w-iw)*cfg.pos,oy=(h-ih)/2;
 if(tf.dataset.k!==K){tf.dataset.k=K;let s='';cfg.pts.forEach((p,i)=>{s+='<div class="ta" data-i="'+i+'"><div class="fire" style="width:'+p[2]+'px;height:'+p[2]+'px"></div>'+[0,1,2,3].map(()=>'<i class="sp"></i>').join('')+'</div>'});if(cfg.moon)s+='<div class="ta" data-m="1"><div class="moong"></div></div>';tf.innerHTML=s;tf.querySelectorAll('.sp').forEach(e=>{e.style.cssText='margin-left:'+((Math.random()-.5)*26)+'px;animation-duration:'+(2.5+Math.random()*3)+'s;animation-delay:-'+(Math.random()*5)+'s;--dx:'+((Math.random()-.5)*60)+'px'})}
 tf.querySelectorAll('.ta').forEach(el=>{const m=el.dataset.m?cfg.moon:cfg.pts[+el.dataset.i];el.style.left=(ox+m[0]*iw)+'px';el.style.top=(oy+m[1]*ih)+'px'})}
addEventListener('resize',()=>{if(S)placeFx()});
(function(){const tf=document.getElementById('tf');for(let i=0;i<10;i++){const e=document.createElement('i');e.className='sp';e.style.cssText='margin-left:'+((Math.random()-.5)*30)+'px;animation-duration:'+(2.5+Math.random()*3)+'s;animation-delay:-'+(Math.random()*5)+'s;--dx:'+((Math.random()-.5)*60)+'px';tf.appendChild(e)}})();
(function(){const lv=document.getElementById('lv'),c=['#b3203a','#8f1c34','#c93a52'];
 for(let i=0;i<9;i++){const e=document.createElement('i');e.style.cssText='left:'+(Math.random()*100)+'%;background:'+c[i%3]+';animation-duration:'+(13+Math.random()*9)+'s;animation-delay:-'+(Math.random()*20)+'s;--dx:'+((Math.random()-.5)*140)+'px;--rot:'+(360+Math.random()*540)+'deg';lv.appendChild(e)}})();