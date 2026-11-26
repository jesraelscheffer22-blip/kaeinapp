
// Ranking de constância com contas fictícias removido (comparação social; ver RELATORIO-FASE-1).

function introRedo(){if(!S.rdAsk){S.rdAsk=1;S.top=false;render();setTimeout(()=>{if(S.rdAsk){S.rdAsk=0;render()}},5000);return}try{localStorage.removeItem('kaien.v1')}catch(e){}_ab=0;reset()}

function dgHelp(){S.dgHelp=!S.dgHelp;render()}
let _dcx=0;
function dcInit(){const el=document.getElementById('dcs');if(!el)return;const its=[...el.querySelectorAll('.dci')];if(its.length<2)el.classList.add('one');
 const upd=()=>{const r=el.getBoundingClientRect(),c=r.left+r.width/2;its.forEach(it=>{const q=it.getBoundingClientRect(),d=Math.abs(q.left+q.width/2-c)/q.width,w=Math.max(0,Math.min(1,1-d*1.1));it.style.transform='scale('+(.84+.16*w)+')';it.style.opacity=(.4+.6*w).toFixed(2);it.style.pointerEvents=w>.55?'auto':'none'});const L=document.getElementById('dcl'),R=document.getElementById('dcr');if(L){L.style.opacity=el.scrollLeft<20?.4:1;R.style.opacity=el.scrollLeft>el.scrollWidth-el.clientWidth-20?.4:1}};
 el.scrollLeft=_dcx;el.onscroll=()=>{_dcx=el.scrollLeft;upd()};upd()}
function dcGo(d){const el=document.getElementById('dcs');if(!el)return;const its=[...el.querySelectorAll('.dci')],c=el.scrollLeft+el.clientWidth/2;let k=0,b=1e9;its.forEach((it,i)=>{const x=Math.abs(it.offsetLeft+it.offsetWidth/2-c);if(x<b){b=x;k=i}});const t=its[Math.max(0,Math.min(its.length-1,k+d))];el.scrollTo({left:t.offsetLeft-(el.clientWidth-t.offsetWidth)/2,behavior:'smooth'})}
setTimeout(()=>{const r0=render;render=function(){r0.apply(this,arguments);try{dcInit()}catch(e){}try{ovSync()}catch(e){}AFTER_RENDER.forEach(f=>{try{f()}catch(e){console.warn(e)}})}},0);
