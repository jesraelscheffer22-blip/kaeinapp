/* Boneco 3D (Three.js, feito só com formas): exercícios e montagem */
/* Exercícios do Kaien em 3D: keyframes por articulação. Corpo de frente para +z, chão em y=0.
   Cada key: p (quadril), ax (direção do tronco), fr (frente), sp (coluna, graus), hd (cabeça), mA/mB (mãos), pA/pB (tornozelos).
   Alvos: f:'w' mundo, 'c' peito, 'p' quadril. pl = polo (para onde aponta o cotovelo/joelho). d = duração até a próxima key. */
(function(){
const S=Math.sin,C=Math.cos,R=Math.PI/180;
const st=o=>Object.assign({p:[0,.95,0]},o||{});
const mao=(x,y,z,f,pl,md)=>Object.assign({k:[x,y,z],f:f||'w'},pl?{pl}:{},md?{md}:{});
const pe=(x,y,z,fd,pl,f)=>Object.assign({k:[x,y,z],f:f||'w'},fd?{fd}:{},pl?{pl}:{});
const PEchao=[pe(.11,.08,.02),pe(-.11,.08,.02)];
const quadril=[mao(.17,.03,.06,'p',[1,.2,-.4]),mao(-.17,.03,.06,'p',[-1,.2,-.4])];// mãos na cintura
// prancha / flexão: corpo reto apoiado nos pés (ou joelhos), inclinado th graus
function prancha(th,o){o=o||{};const s=S(th*R),c=C(th*R),dir=[0,s,c];let p;
 const fr=[0,-c,s];
 if(o.joelho){p=[0,.06+.46*s,.46*c]}else{const b=o.base||[0,.1,-.03];p=[0,b[1]+.87*s,b[2]+.87*c]}
 const k={p,ax:dir,fr,hd:o.hd||0,sp:o.sp||[0,0,0],d:o.d||.6,e:o.e};
 const mx=o.mx!=null?o.mx:.25,mz=o.mz,my=o.my!=null?o.my:.035,ma=o.antebraco;
 if(mz!=null){k.mA=mao(mx,my,mz,'w',o.pl||[.7,.25,-.7],ma?[0,0,1]:[0,0,1]);k.mB=mao(-mx,my,mz,'w',o.pl?[-o.pl[0],o.pl[1],o.pl[2]]:[-.7,.25,-.7],[0,0,1])}
 if(o.joelho){k.pA=pe(.1,.26,-.36,[0,-.3,-.95],[0,-1,0]);k.pB=pe(-.1,.26,-.36,[0,-.3,-.95],[0,-1,0])}
 else{const b=o.base||[0,.1,-.03];k.pA=pe(.1,b[1],b[2],o.fd||[0,-.9,.35]);k.pB=pe(-.1,b[1],b[2],o.fd||[0,-.9,.35])}
 return Object.assign(k,o.x||{})}
const ombroZ=(th,o)=>{o=o||{};const s=S(th*R),c=C(th*R);if(o.joelho)return{y:.06+.94*s,z:.94*c};const b=o.base||[0,.1,-.03];return{y:b[1]+1.35*s,z:b[2]+1.35*c}};
// deitado de costas, cabeça para +z
const costas=o=>Object.assign({p:[0,.12,0],ax:[0,0,1],fr:[0,1,0]},o);
// deitado de bruços, cabeça para +z
const brucos=o=>Object.assign({p:[0,.12,0],ax:[0,0,1],fr:[0,-1,0]},o);
const tempo=(K,a)=>K.map((k,i)=>Object.assign(k,{d:a[i]}));

// tempos de força: desce devagar, pausa, sobe mais rápido, pausa
const F=[1.3,.2,.8,.5];
function flexaoBase(top,bot,o){o=o||{};const t=ombroZ(top,o),mz=o.mz!=null?o.mz:t.z;
 const A=prancha(top,Object.assign({},o,{mz})),B=prancha(bot,Object.assign({},o,{mz}));
 return tempo([A,B,JSON.parse(JSON.stringify(B)),JSON.parse(JSON.stringify(A))],F).map((k,i)=>Object.assign(k,{e:i===2?'out':'io'}))}

const EX={};
// ---------- empurrar ----------
EX.flexao={n:'Flexão tradicional',m:['peito'],vista:'34',el:.12,k:flexaoBase(21.7,6.5)};
EX['flexao-fechada']={n:'Flexão fechada',m:['braco','peito'],vista:'34',el:.12,k:flexaoBase(21.7,5,{mx:.11,pl:[.25,.35,-1]})};
EX['flexao-joelhos']={n:'Flexão com joelhos no chão',m:['peito'],vista:'34',el:.12,k:flexaoBase(35,9,{joelho:1})};
EX['flexao-pes-cadeira']={n:'Flexão com os pés na cadeira',m:['peito','ombro'],vista:'34',el:.12,props:[['cadeira',{z:-.12,costas:-1}]],k:flexaoBase(4,-11,{base:[0,.5,-.03],fd:[0,-.6,.8]})};
EX['flexao-mesa']={n:'Flexão com as mãos na mesa',m:['peito'],vista:'lado34',el:.15,props:[['mesa',{z:1.55,d:.6,h:.72}]],k:flexaoBase(48,36,{fd:[0,-.5,.85],mz:1.3,my:.75,x:{}})};
EX['flexao-parede']={n:'Flexão na parede',m:['peito'],vista:'ladoE',el:.15,az:-.45,props:[['parede',{z:1.0}]],k:(()=>{const mk=th=>prancha(th,{base:[0,.08,0],fd:[0,0,1],mz:.95,my:1.35}),a=mk(70),b=mk(61);
 [a,b].forEach(k=>{k.mA.md=[0,1,0];k.mB.md=[0,1,0];k.mA.pl=[.8,-.4,-.3];k.mB.pl=[-.8,-.4,-.3]});return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],F)})()};
// ---------- pernas ----------
const bracosFrente=(y,z)=>({mA:mao(.2,y,z,'w',[.3,-1,0]),mB:mao(-.2,y,z,'w',[-.3,-1,0])});
const PEagach=[pe(.13,.08,.02,[.15,0,1],[.25,0,1]),pe(-.13,.08,.02,[-.15,0,1],[-.25,0,1])];
const agach=(baixo,o)=>{o=o||{};const pA=o.pA||PEagach[0],pB=o.pB||PEagach[1];
 const topo=Object.assign(st({pA,pB}),o.topo||bracosFrente(1.38,.55)),bx=Object.assign({p:baixo||[0,.56,-.2],ax:[0,.74,.67],sp:[-12,0,0],hd:-10,pA,pB},o.baixo||bracosFrente(1.02,.55));
 return tempo([topo,bx,JSON.parse(JSON.stringify(bx)),JSON.parse(JSON.stringify(topo))],o.F||F).map((k,i)=>Object.assign(k,{e:i===2?'out':'io'}))};
EX.agachamento={n:'Agachamento livre',m:['coxa','gluteo'],vista:'lado34',k:agach()};
EX['agachamento-rapido']={n:'Agachamento rápido',m:['coxa','gluteo'],vista:'lado34',k:agach(null,{F:[.5,.05,.4,.1]})};
EX['sentar-levantar']={n:'Sentar e levantar da cadeira',m:['coxa','gluteo'],vista:'lado34',props:[['cadeira',{z:-.32,costas:-1}]],k:agach([0,.55,-.28],{baixo:Object.assign({},bracosFrente(1.02,.5))})};
EX['agachamento-mochila']={n:'Agachamento com mochila',m:['coxa','gluteo'],vista:'lado34',moc:'peito',k:agach(null,{topo:{mA:mao(.1,.3,.2,'c',[1,-1,0]),mB:mao(-.1,.3,.2,'c',[-1,-1,0])},baixo:{mA:mao(.1,.3,.2,'c',[1,-1,0]),mB:mao(-.1,.3,.2,'c',[-1,-1,0])}})};
EX['agachamento-sumo']={n:'Agachamento sumô',m:['coxa','gluteo'],vista:'frente',el:.15,k:(()=>{const pA=pe(.34,.08,.04,[.6,0,.8],[1,0,.5]),pB=pe(-.34,.08,.04,[-.6,0,.8],[-1,0,.5]),h={mA:mao(.05,.28,.24,'c',[1,-1,0]),mB:mao(-.05,.28,.24,'c',[-1,-1,0])};
 const a=Object.assign(st({pA,pB,p:[0,.93,0]}),h),b=Object.assign({p:[0,.6,-.04],ax:[0,.97,.24],pA,pB},h);return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],F)})()};
EX['agachamento-salto']={n:'Agachamento com salto',m:['coxa','gluteo','panturrilha'],vista:'lado34',k:(()=>{const pA=PEagach[0],pB=PEagach[1];
 const bx={p:[0,.6,-.17],ax:[0,.77,.64],sp:[-10,0,0],pA,pB,mA:mao(.25,-.1,-.25,'c'),mB:mao(-.25,-.1,-.25,'c')};
 const ar=Object.assign(st({p:[0,1.25,0],pA:pe(.12,.36,.02,[.1,-.7,.7]),pB:pe(-.12,.36,.02,[-.1,-.7,.7]),mA:mao(.2,1.0,.08,'c',[1,0,-.5]),mB:mao(-.2,1.0,.08,'c',[-1,0,-.5])}));
 const pou=Object.assign(st({p:[0,.88,0],pA,pB,mA:mao(.25,.2,.2,'c'),mB:mao(-.25,.2,.2,'c')}));
 return [Object.assign(bx,{d:.35,e:'out'}),Object.assign(ar,{d:.35,e:'in'}),Object.assign(pou,{d:.3}),Object.assign(JSON.parse(JSON.stringify(bx)),{d:.5})]})()};
// afundo
const afundoK=(fA,fB,p,o)=>Object.assign({p,ax:[0,1,.05],pA:fA,pB:fB,mA:quadril[0],mB:quadril[1]},o||{});
const frente=x=>pe(x,.08,.52),tras=x=>pe(x,.14,-.5,[0,-.55,.83]);
EX.afundo={n:'Afundo alternado',m:['coxa','gluteo'],vista:'lado',el:.14,k:[afundoK(PEchao[0],PEchao[1],[0,.95,0],{d:.6}),afundoK(frente(.12),tras(-.12),[0,.56,.06],{d:1.0}),afundoK(PEchao[0],PEchao[1],[0,.95,0],{d:.6}),afundoK(tras(.12),frente(-.12),[0,.56,.06],{d:1.0})].map((k,i)=>Object.assign(k,{d:[.9,.25,.9,.25][i]}))};
EX.afundo.k=[afundoK(PEchao[0],PEchao[1],[0,.95,0]),afundoK(frente(.12),PEchao[1],[0,.9,.18]),afundoK(frente(.12),tras(-.12),[0,.56,.04]),afundoK(frente(.12),PEchao[1],[0,.9,.18]),afundoK(PEchao[0],PEchao[1],[0,.95,0]),afundoK(PEchao[0],frente(-.12),[0,.9,.18]),afundoK(tras(.12),frente(-.12),[0,.56,.04]),afundoK(PEchao[0],frente(-.12),[0,.9,.18])];
tempo(EX.afundo.k,[.45,.7,.6,.45,.45,.7,.6,.45]);
EX['afundo-tras']={n:'Afundo para trás',m:['coxa','gluteo'],vista:'lado',el:.14,k:tempo([afundoK(PEchao[0],PEchao[1],[0,.95,0]),afundoK(PEchao[0],pe(-.12,.25,-.4,[0,-.5,.85]),[0,.9,-.08]),afundoK(PEchao[0],pe(-.12,.14,-.98,[0,-.55,.83]),[0,.56,-.42]),afundoK(PEchao[0],pe(-.12,.25,-.4,[0,-.5,.85]),[0,.9,-.08]),afundoK(PEchao[0],PEchao[1],[0,.95,0]),afundoK(pe(.12,.25,-.4,[0,-.5,.85]),PEchao[1],[0,.9,-.08]),afundoK(pe(.12,.14,-.98,[0,-.55,.83]),PEchao[1],[0,.56,-.42]),afundoK(pe(.12,.25,-.4,[0,-.5,.85]),PEchao[1],[0,.9,-.08])],[.4,.7,.5,.4,.4,.7,.5,.4])};
EX['afundo-parado']={n:'Afundo parado, segurando numa cadeira',m:['coxa','gluteo'],vista:'ladoE',el:.14,props:[['cadeira',{x:.62,z:.05,costas:-1,ry:Math.PI/2}]],k:(()=>{const fA=pe(.12,.08,.45),fB=pe(-.12,.14,-.5,[0,-.55,.83]),mA=mao(.45,.92,.02,'w',[1,-1,0],[0,0,1]),mB=quadril[1];
 const a={p:[0,.86,-.02],ax:[0,1,.02],pA:fA,pB:fB,mA,mB},b={p:[0,.55,0],ax:[0,1,.02],pA:fA,pB:fB,mA,mB};return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],F)})()};
EX['afundo-andando']=Object.assign({},EX.afundo,{n:'Afundo andando'});
EX['afundo-mochila']=Object.assign({},EX.afundo,{n:'Afundo com mochila',moc:'peito',k:EX.afundo.k.map(k=>Object.assign({},k,{mA:mao(.1,.3,.2,'c',[1,-1,0]),mB:mao(-.1,.3,.2,'c',[-1,-1,0])}))});
// ponte de glúteo
const ponteK=(alto,o)=>{o=o||{};const pA=o.pA||pe(.13,.08,-.5,[0,0,-1],[0,1,0]),pB=o.pB||pe(-.13,.08,-.5,[0,0,-1],[0,1,0]);
 const mA=mao(.26,.03,.25,'w',[0,1,0],[0,0,-1]),mB=mao(-.26,.03,.25,'w',[0,1,0],[0,0,-1]);
 if(!alto)return Object.assign({p:[0,.12,0],ax:[0,0,1],fr:[0,1,0],pA,pB,mA,mB},o.x||{});
 const h=o.h||.4,a=Math.atan2(h-.13,.48);return Object.assign({p:[0,h,-.02],ax:[0,-S(a),C(a)],fr:[0,C(a),S(a)],pA,pB,mA,mB},o.x||{})};
EX.ponte={n:'Ponte de glúteo',m:['gluteo'],vista:'lado',el:.14,k:tempo([ponteK(0),ponteK(1),ponteK(1),ponteK(0)],[.7,.6,.9,.4]).map((k,i)=>Object.assign(k,{e:i===0?'out':'io'}))};
EX['ponte-uma-perna']={n:'Ponte de glúteo com uma perna',m:['gluteo'],vista:'lado',el:.14,k:tempo([0,1,1,0].map(a=>ponteK(a,{pB:pe(-.1,-.85,.1,[0,0,-1],null,'p')})),[.7,.6,.9,.4])};
EX['ponte-sofa']={n:'Ponte de glúteo com os pés no sofá',m:['gluteo'],vista:'lado',el:.14,props:[['sofa',{z:-.85}]],k:tempo([0,1,1,0].map(a=>ponteK(a,{h:.5,pA:pe(.13,.47,-.62,[0,0,-1],[0,1,0]),pB:pe(-.13,.47,-.62,[0,0,-1],[0,1,0])})),[.7,.6,.9,.4])};
EX['ponte-mochila']=Object.assign({},EX.ponte,{n:'Ponte de glúteo com mochila',moc:'quadril',k:EX.ponte.k.map(k=>Object.assign({},k,{mA:mao(.12,.08,.2,'p',[1,0,0]),mB:mao(-.12,.08,.2,'p',[-1,0,0])}))});
// panturrilha
const pant=(y0,deg,o)=>{const sobe=.08;const a=st(Object.assign({p:[0,.95+y0,0],pA:pe(.11,.08+y0,.02,[0,-(deg||0)*0,1]),pB:pe(-.11,.08+y0,.02,[0,0,1])},o||{}));
 const b=st(Object.assign({p:[0,.95+y0+sobe,0],pA:pe(.11,.08+y0+sobe,0,[0,-.6,.8]),pB:pe(-.11,.08+y0+sobe,0,[0,-.6,.8])},o||{}));return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],[.6,.4,1.2,.3])};
EX.panturrilha={n:'Panturrilha em pé',m:['panturrilha'],vista:'lado',el:.1,k:pant(0)};
EX['panturrilha-degrau']={n:'Panturrilha no degrau da escada',m:['panturrilha'],vista:'lado',el:.1,props:[['degrau',{h:.18,z:.06}]],k:(()=>{const y=.18,a=st({p:[0,.92+y,0],pA:pe(.11,.06+y,-.02,[0,.35,.94]),pB:pe(-.11,.06+y,-.02,[0,.35,.94])}),b=st({p:[0,1.04+y,0],pA:pe(.11,.17+y,-.02,[0,-.6,.8]),pB:pe(-.11,.17+y,-.02,[0,-.6,.8])});return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],[.6,.4,1.2,.3])})()};
// ---------- abdômen ----------
const joelhosDobrados={pA:pe(.13,.08,-.5,[0,0,-1],[0,1,0]),pB:pe(-.13,.08,-.5,[0,0,-1],[0,1,0])};
const maosCabeca={mA:mao(.13,.6,-.02,'c',[1,.3,0]),mB:mao(-.13,.6,-.02,'c',[-1,.3,0])};
EX.abdominal={n:'Abdominal tradicional',m:['abdomen'],vista:'lado',el:.14,k:tempo([costas(Object.assign({},joelhosDobrados,maosCabeca)),costas(Object.assign({sp:[38,0,0],hd:12},joelhosDobrados,maosCabeca)),costas(Object.assign({sp:[38,0,0],hd:12},joelhosDobrados,maosCabeca)),costas(Object.assign({},joelhosDobrados,maosCabeca))],[.6,.3,.9,.3]).map((k,i)=>Object.assign(k,{e:i===0?'out':'io'}))};
EX['abdominal-bicicleta']={n:'Abdominal bicicleta',m:['abdomen'],vista:'lado34',el:.3,k:(()=>{const enc=x=>pe(x,.42,-.2,[0,.3,-1],[0,1,.3]),est=x=>pe(x,.28,-.85,[0,.2,-1],[0,1,0]);
 const a=costas(Object.assign({sp:[32,16,0],hd:10,pA:enc(.1),pB:est(-.12)},maosCabeca)),b=costas(Object.assign({sp:[32,-16,0],hd:10,pA:est(.12),pB:enc(-.1)},maosCabeca));return tempo([a,b],[.7,.7])})()};
EX['abdominal-tesoura']={n:'Abdominal tesoura',m:['abdomen','coxa'],vista:'34',el:.25,k:(()=>{const mA=mao(.26,.03,-.05,'w',[0,1,0],[0,0,-1]),mB=mao(-.26,.03,-.05,'w',[0,1,0],[0,0,-1]);
 const a=costas({sp:[12,0,0],hd:8,mA,mB,pA:pe(-.08,.32,-.83,[0,.4,-1]),pB:pe(.08,.2,-.85,[0,.4,-1])}),b=costas({sp:[12,0,0],hd:8,mA,mB,pA:pe(.14,.2,-.85,[0,.4,-1]),pB:pe(-.14,.32,-.83,[0,.4,-1])});return tempo([a,b],[.45,.45])})()};
// pranchas
const pAnteb=(th,o)=>{o=o||{};const t=ombroZ(th,o);const k=prancha(th,Object.assign({},o,{mz:t.z+.27,my:.04,mx:.13,pl:[.2,-1,-.1]}));return k};
EX.prancha={n:'Prancha',m:['abdomen'],vista:'lado34',el:.06,k:tempo([pAnteb(10.2),pAnteb(10.6)],[1.4,1.4])};
EX['prancha-joelhos']={n:'Prancha com joelhos no chão',m:['abdomen'],vista:'lado34',el:.06,k:tempo([pAnteb(19,{joelho:1}),pAnteb(19.6,{joelho:1})],[1.4,1.4])};
EX['prancha-lateral']={n:'Prancha lateral',m:['abdomen','ombro'],vista:'ladoE',az:.35,el:.18,k:(()=>{const mk=(th)=>{const s=S(th*R),c=C(th*R);const b=[0,.08,0];
 return {p:[0,b[1]+.87*s,.87*c],ax:[0,s,c],fr:[-1,0,0],mA:mao(-.02,.04,1.35*c+.25,'w',[0,-1,0],[0,0,1]),mB:mao(-.05,.1,.0,'p',[-1,.3,0]),pA:pe(.0,.08,.0,[0,0,1],[-1,0,0]),pB:pe(-.03,.17,.0,[0,0,1],[-1,0,0])}};return tempo([mk(11),mk(13)],[1.3,1.3])})()};
EX['prancha-toque']={n:'Prancha com toque no ombro',m:['abdomen','ombro'],vista:'34',el:.15,k:(()=>{const t=ombroZ(21.7),b=prancha(21.7,{mz:t.z});
 const tA=Object.assign(JSON.parse(JSON.stringify(b)),{mA:mao(-.2,.43,.12,'c',[1,0,-1])}),tB=Object.assign(JSON.parse(JSON.stringify(b)),{mB:mao(.2,.43,.12,'c',[-1,0,-1])});
 return tempo([b,tA,JSON.parse(JSON.stringify(b)),tB],[.4,.4,.4,.4])})()};
// ---------- costas e braços ----------
const incl=(graus,o)=>{const a=graus*R;return Object.assign({p:[0,.88,-.14],ax:[0,C(a),S(a)],fr:[0,-S(a),C(a)],hd:-graus*.5,pA:pe(.12,.08,.05,null,[0,0,1]),pB:pe(-.12,.08,.05,null,[0,0,1])},o||{})};
EX['remada-curvada']={n:'Remada curvada com mochila',m:['costas','braco'],vista:'lado34',moc:'maos',k:(()=>{const a=incl(50,{mA:mao(.17,.6,.33,'w',[1,0,-1]),mB:mao(-.17,.6,.33,'w',[-1,0,-1])}),b=incl(50,{mA:mao(.17,.92,.08,'w',[.4,1,-1]),mB:mao(-.17,.92,.08,'w',[-.4,1,-1])});return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],[.8,.3,1.1,.3])})()};
EX['remada-um-braco']={n:'Remada com um braço, apoiado na cadeira',m:['costas','braco'],vista:'lado34',moc:'A',props:[['cadeira',{x:-.18,z:.72,costas:1}]],k:(()=>{const base={p:[0,.86,-.12],ax:[0,.4,.92],fr:[0,-.92,.4],hd:-25,pA:pe(.13,.08,.0,null,[0,0,1]),pB:pe(-.13,.08,.12,null,[0,0,1]),mB:mao(-.18,.48,.72,'w',[-1,0,-1],[0,0,1])};
 const a=Object.assign({},base,{mA:mao(.2,.48,.42,'w',[1,0,-1])}),b=Object.assign({},base,{mA:mao(.2,.82,.2,'w',[.3,1,-1])});return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],[.8,.3,1.1,.3])})()};
EX['remada-mesa']={n:'Remada deitado embaixo da mesa',m:['costas','braco'],vista:'lado',el:.12,props:[['mesa',{z:.62,d:.7,h:.74}]],k:(()=>{const mk=th=>{const s=S(th*R),c=C(th*R),b=[0,.08,-.95];
 return {p:[0,b[1]+.87*s,b[2]+.87*c],ax:[0,s,c],fr:[0,c,-s],hd:5,mA:mao(.25,.7,.3,'w',[.8,-.6,-.3],[0,0,1]),mB:mao(-.25,.7,.3,'w',[-.8,-.6,-.3],[0,0,1]),pA:pe(.1,.08,-.95,[0,1,.3],[0,1,0]),pB:pe(-.1,.08,-.95,[0,1,.3],[0,1,0])}};
 return tempo([mk(5),mk(18),mk(18),mk(5)],[.8,.3,1.1,.3])})()};
EX.superman={n:'Superman',m:['costas','gluteo'],vista:'lado',el:.12,k:(()=>{const a=brucos({mA:mao(.2,.07,1.02,'w',[0,1,0],[0,0,1]),mB:mao(-.2,.07,1.02,'w',[0,1,0],[0,0,1]),pA:pe(.1,.08,-.85,[0,-.2,-1]),pB:pe(-.1,.08,-.85,[0,-.2,-1])}),
 b=brucos({sp:[-15,0,0],hd:-10,mA:mao(.2,.3,.98,'w',[0,1,0],[0,.2,1]),mB:mao(-.2,.3,.98,'w',[0,1,0],[0,.2,1]),pA:pe(.1,.28,-.82,[0,0,-1]),pB:pe(-.1,.28,-.82,[0,0,-1])});return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],[.8,.6,.9,.3])})()};
EX['superman-alternado']={n:'Superman alternado',m:['costas','gluteo'],vista:'34',el:.2,k:(()=>{const bx=(x)=>mao(x,.07,1.02,'w',[0,1,0],[0,0,1]),al=x=>mao(x,.3,.98,'w',[0,1,0],[0,.2,1]),pb=x=>pe(x,.08,-.85,[0,-.2,-1]),pa=x=>pe(x,.28,-.82,[0,0,-1]);
 const a=brucos({sp:[-8,0,0],mA:al(.2),mB:bx(-.2),pA:pb(.1),pB:pa(-.1)}),b=brucos({sp:[-8,0,0],mA:bx(.2),mB:al(-.2),pA:pa(.1),pB:pb(-.1)}),z=brucos({mA:bx(.2),mB:bx(-.2),pA:pb(.1),pB:pb(-.1)});return tempo([z,a,z,b].map(k=>JSON.parse(JSON.stringify(k))),[.6,.6,.6,.6])})()};
const lados=(a,b,o)=>tempo([st(Object.assign({mA:a[0],mB:a[1]},o)),st(Object.assign({mA:b[0],mB:b[1]},o)),st(Object.assign({mA:b[0],mB:b[1]},o)),st(Object.assign({mA:a[0],mB:a[1]},o))],[.8,.3,1.1,.3]);
EX['elevacao-lateral']={n:'Elevação lateral com garrafas',m:['ombro'],vista:'frente',el:.12,gar:'z',k:lados([mao(.24,-.12,.07,'c',[.3,.2,-1]),mao(-.24,-.12,.07,'c',[-.3,.2,-1])],[mao(.74,.4,.14,'c',[0,.5,-1]),mao(-.74,.4,.14,'c',[0,.5,-1])])};
EX['elevacao-frontal']={n:'Elevação frontal com garrafas',m:['ombro'],vista:'lado34',gar:'x',k:lados([mao(.18,-.12,.1,'c',[.4,0,-1]),mao(-.18,-.12,.1,'c',[-.4,0,-1])],[mao(.18,.42,.55,'c',[.4,-1,0]),mao(-.18,.42,.55,'c',[-.4,-1,0])])};
EX.desenvolvimento={n:'Desenvolvimento com garrafas',m:['ombro','braco'],vista:'frente',el:.12,gar:'x',k:lados([mao(.36,.5,.05,'c',[1,-1,0]),mao(-.36,.5,.05,'c',[-1,-1,0])],[mao(.18,1.0,.03,'c',[1,0,0]),mao(-.18,1.0,.03,'c',[-1,0,0])])};
EX['triceps-cadeira']={n:'Tríceps na cadeira (mergulho)',m:['braco'],vista:'lado34',props:[['cadeira',{z:-.42,costas:-1}]],k:(()=>{const pA=pe(.13,.08,.62,[0,1,.4],[0,1,0]),pB=pe(-.13,.08,.62,[0,1,.4],[0,1,0]),mA=mao(.2,.48,-.25,'w',[.1,0,-1],[0,0,1]),mB=mao(-.2,.48,-.25,'w',[-.1,0,-1],[0,0,1]);
 const a={p:[0,.47,-.12],ax:[0,1,-.05],pA,pB,mA,mB},b={p:[0,.24,-.12],ax:[0,1,-.05],pA,pB,mA,mB};return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],F)})()};
EX['triceps-frances']={n:'Tríceps francês com garrafa',m:['braco'],vista:'lado34',gar:1,k:lados([mao(.05,1.0,.0,'c',[.3,1,.2]),mao(-.05,1.0,.0,'c',[-.3,1,.2])],[mao(.05,.55,-.2,'c',[.3,1,.3]),mao(-.05,.55,-.2,'c',[-.3,1,.3])]).map(k=>k)};
EX['triceps-frances'].k=[EX['triceps-frances'].k[0],EX['triceps-frances'].k[1],EX['triceps-frances'].k[2],EX['triceps-frances'].k[3]];[1.1,.3,.8,.3].forEach((d,i)=>EX['triceps-frances'].k[i].d=d);
EX.rosca={n:'Rosca direta com mochila',m:['braco'],vista:'lado34',moc:'maos',k:lados([mao(.16,-.1,.12,'c',[.2,0,-1]),mao(-.16,-.1,.12,'c',[-.2,0,-1])],[mao(.16,.33,.2,'c',[.2,0,-1]),mao(-.16,.33,.2,'c',[-.2,0,-1])])};
EX['rosca-martelo']={n:'Rosca martelo com garrafas',m:['braco','antebraco'],vista:'lado34',gar:'z',k:lados([mao(.25,-.1,.08,'c',[.2,0,-1]),mao(-.25,-.1,.08,'c',[-.2,0,-1])],[mao(.25,.33,.18,'c',[.2,0,-1]),mao(-.25,.33,.18,'c',[-.2,0,-1])])};
EX.encolhimento={n:'Encolhimento de ombros com mochila',m:['ombro'],vista:'frente',el:.1,moc:'maos',k:(()=>{const h={mA:mao(.14,-.12,.12,'c'),mB:mao(-.14,-.12,.12,'c')};const a=st(Object.assign({},h)),b=st(Object.assign({ss:.06},h));
 b.mA=mao(.14,-.06,.12,'c');b.mB=mao(-.14,-.06,.12,'c');return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],[.6,.5,.8,.3])})()};
EX['crucifixo-invertido']={n:'Crucifixo invertido com garrafas',m:['costas','ombro'],vista:'frente',az:.35,el:.25,gar:1,k:(()=>{const a=incl(60,{mA:mao(.16,.66,.36,'w',[1,0,-.5]),mB:mao(-.16,.66,.36,'w',[-1,0,-.5])}),b=incl(60,{mA:mao(.72,1.05,.32,'w',[0,1,-1]),mB:mao(-.72,1.05,.32,'w',[0,1,-1])});return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],[.8,.3,1.1,.3])})()};
// ---------- cardio ----------
const passo=(lev,alt,fr,dur,qY)=>{const up=(x,f)=>pe(x,alt,fr,[0,-.5,.85]),ch=PEchao;
 const bf=(x)=>mao(x,-.02,.28,'c',[0,-.3,-1]),bt=x=>mao(x,-.05,-.22,'c',[0,-.3,-1]);
 const k1=st({p:[0,.95+(qY||0),0],pA:up(.1),pB:ch[1],mA:bt(.23),mB:bf(-.23)}),k2=st({pA:ch[0],pB:ch[1]}),k3=st({p:[0,.95+(qY||0),0],pA:ch[0],pB:up(-.1),mA:bf(.23),mB:bt(-.23)});
 return tempo([k1,k2,k3,JSON.parse(JSON.stringify(k2))],[dur,dur*.6,dur,dur*.6])};
EX.marcha={n:'Marcha no lugar',m:['coxa'],vista:'lado34',k:passo(0,.3,.22,.45)};
EX.caminhada=Object.assign({},EX.marcha,{n:'Caminhada'});
EX['corrida-parada']={n:'Corrida parada',m:['coxa','panturrilha'],vista:'lado34',k:passo(0,.28,.08,.24,.05)};
EX['joelho-alto']={n:'Corrida com joelho alto',m:['coxa','abdomen'],vista:'lado34',k:passo(0,.5,.36,.26,.03)};
EX['passos-laterais']={n:'Passos laterais',m:['coxa'],vista:'frente',el:.12,k:(()=>{const mk=(px,a,b)=>st({p:[px,.88,0],ax:[0,1,.08],pA:pe(a,.08,.04,null,[0,0,1]),pB:pe(b,.08,.04,null,[0,0,1]),mA:mao(.2,.1,.2,'c'),mB:mao(-.2,.1,.2,'c')});
 return tempo([mk(0,.13,-.13),mk(.17,.48,-.13),mk(.3,.48,.12),mk(.17,.48,-.13),mk(0,.13,-.13),mk(-.17,.13,-.48),mk(-.3,-.12,-.48),mk(-.17,.13,-.48)],[.35,.35,.35,.35,.35,.35,.35,.35])})()};
EX['corrida-lateral']={n:'Corrida lateral',m:['coxa','gluteo'],vista:'frente',el:.12,k:(()=>{const mk=(px,a,b,y)=>st({p:[px,y||.78,-.06],ax:[0,.95,.3],pA:pe(a,.08,.04,null,[.3,0,1]),pB:pe(b,.08,.04,null,[-.3,0,1]),mA:mao(.25,.2,.25,'c'),mB:mao(-.25,.2,.25,'c')});
 return tempo([mk(-.25,-.02,-.45),mk(0,.2,-.2,.84),mk(.25,.45,.02),mk(0,.2,-.2,.84)],[.22,.22,.22,.22])})()};
EX.polichinelo={n:'Polichinelo',m:['coxa','ombro'],vista:'frente',el:.1,k:(()=>{const fe=st({pA:pe(.1,.08,.02),pB:pe(-.1,.08,.02),mA:mao(.26,-.1,.03,'c',[0,-.3,-1]),mB:mao(-.26,-.1,.03,'c',[0,-.3,-1])});
 const ar=st({p:[0,1.03,0],pA:pe(.22,.15,.02,[.2,-.4,.9]),pB:pe(-.22,.15,.02,[-.2,-.4,.9]),mA:mao(.6,.55,.03,'c',[0,-1,-.3]),mB:mao(-.6,.55,.03,'c',[0,-1,-.3])});
 const ab=st({p:[0,.92,0],pA:pe(.36,.08,.02,[.3,0,.95],[.6,0,1]),pB:pe(-.36,.08,.02,[-.3,0,.95],[-.6,0,1]),mA:mao(.14,.98,.03,'c',[1,0,-.3]),mB:mao(-.14,.98,.03,'c',[-1,0,-.3])});
 return tempo([fe,ar,ab,JSON.parse(JSON.stringify(ar))],[.2,.2,.2,.2])})()};
EX['polichinelo-sem-salto']={n:'Polichinelo sem salto',m:['coxa','ombro'],vista:'frente',el:.1,k:(()=>{const fe=st({mA:mao(.26,-.1,.03,'c',[0,-.3,-1]),mB:mao(-.26,-.1,.03,'c',[0,-.3,-1])}),cima={mA:mao(.18,.96,.03,'c',[1,0,-.3]),mB:mao(-.18,.96,.03,'c',[-1,0,-.3])};
 const a=st(Object.assign({p:[.04,.94,0],pA:pe(.4,.08,.02,[.3,0,.95],[.6,0,1])},cima)),b=st(Object.assign({p:[-.04,.94,0],pB:pe(-.4,.08,.02,[-.3,0,.95],[-.6,0,1])},cima));return tempo([fe,a,JSON.parse(JSON.stringify(fe)),b],[.4,.4,.4,.4])})()};
EX.socos={n:'Socos no ar',m:['ombro','braco','abdomen'],vista:'34',el:.12,k:(()=>{const pA=pe(.14,.08,.22,[.2,0,1]),pB=pe(-.14,.08,-.2,[-.3,0,1]);const g=(x)=>mao(x,.36,.24,'c',[x>0?.6:-.6,-1,-.2]),s=x=>mao(x*.3,.43,.64,'c',[x>0?1:-1,0,0]);
 const k=(a,b,yaw)=>({p:[0,.9,0],ax:[0,1,.04],sp:[0,yaw,0],pA,pB,mA:a,mB:b});return tempo([k(g(.13),g(-.13),0),k(s(.13),g(-.13),-22),k(g(.13),g(-.13),0),k(g(.13),s(-.13),22)],[.22,.18,.22,.18])})()};
EX['pular-corda']={n:'Pular corda',m:['panturrilha'],vista:'34',el:.1,corda:.5,k:(()=>{const m={mA:mao(.32,-.02,.1,'c',[0,-1,-1]),mB:mao(-.32,-.02,.1,'c',[0,-1,-1])};
 const ch=st(Object.assign({p:[0,.93,0],pA:pe(.1,.08,.02),pB:pe(-.1,.08,.02)},m)),ar=st(Object.assign({p:[0,1.05,0],pA:pe(.1,.19,.02,[0,-.6,.8]),pB:pe(-.1,.19,.02,[0,-.6,.8])},m));return tempo([ch,ar],[.25,.25])})()};
// burpee
const burp=flex=>{const t=ombroZ(21.7),mz=t.z-.04,hz=mz;
 const pe0=st({}),ag={p:[0,.55,-.1],ax:[0,.55,.83],sp:[-10,0,0],hd:-15,pA:PEagach[0],pB:PEagach[1],mA:mao(.25,.035,.42,'w',[.7,.25,-.7],[0,0,1]),mB:mao(-.25,.035,.42,'w',[-.7,.25,-.7],[0,0,1])};
 // prancha com as mãos em z=.42: desloca a prancha para trás
 const sh=.42-mz,pr=prancha(21.7,{base:[0,.1,-.03+sh],mz:.42}),bx=prancha(5,{base:[0,.1,-.03+sh],mz:.42});
 const sal=st({p:[0,1.18,0],pA:pe(.12,.3,.02,[.1,-.7,.7]),pB:pe(-.12,.3,.02,[-.1,-.7,.7]),mA:mao(.18,1.0,.05,'c',[1,0,-.5]),mB:mao(-.18,1.0,.05,'c',[-1,0,-.5])});
 const L=[Object.assign(pe0,{d:.3}),Object.assign(ag,{d:.3}),Object.assign(pr,{d:flex?.4:.35})];if(flex)L.push(Object.assign(bx,{d:.45}),Object.assign(JSON.parse(JSON.stringify(pr)),{d:.3}));
 L.push(Object.assign(JSON.parse(JSON.stringify(ag)),{d:.28,e:'out'}),Object.assign(sal,{d:.3,e:'in'}));return L};
EX.burpee={n:'Burpee',m:['coxa','peito','abdomen'],vista:'lado34',k:burp(0)};
EX['burpee-flexao']={n:'Burpee com flexão',m:['coxa','peito','abdomen'],vista:'lado34',k:burp(1)};
EX.escalador={n:'Escalador',m:['abdomen','coxa'],vista:'34',el:.15,k:(()=>{const t=ombroZ(21.7),b=prancha(21.7,{mz:t.z});const ka=pe(.11,.16,.74,[0,-.6,.8],[0,-.2,1]),kb=pe(-.11,.16,.74,[0,-.6,.8],[0,-.2,1]);
 const a=Object.assign(JSON.parse(JSON.stringify(b)),{pA:ka}),c=Object.assign(JSON.parse(JSON.stringify(b)),{pB:kb});return tempo([a,c],[.3,.3])})()};
// aquecimento, rotação e alongamento
EX.aquecimento={n:'Aquecimento: círculos com os braços',m:['ombro'],vista:'34',el:.12,k:(()=>{const c=(y,z)=>({mA:mao(.76,.43+y,z,'c',[0,-1,-1]),mB:mao(-.76,.43+y,z,'c',[0,-1,-1])});
 return tempo([st(c(.12,0)),st(c(0,.12)),st(c(-.12,0)),st(c(0,-.12))],[.3,.3,.3,.3]).map(k=>Object.assign(k,{e:'lin'}))})()};
EX.rotacao={n:'Rotação de tronco em pé',m:['abdomen'],vista:'frente',el:.15,k:(()=>{const h={mA:mao(.22,.3,.28,'c',[1,-1,0]),mB:mao(-.22,.3,.28,'c',[-1,-1,0])},pA=pe(.18,.08,.02),pB=pe(-.18,.08,.02);
 return tempo([st(Object.assign({sp:[0,38,0],pA,pB},h)),st(Object.assign({sp:[0,-38,0],pA,pB},h))],[.9,.9])})()};
EX.alongamento={n:'Finalização: alongamento',m:['coxa','costas'],vista:'lado',el:.15,k:(()=>{const a=st({mA:mao(.16,1.02,.02,'c',[1,0,0]),mB:mao(-.16,1.02,.02,'c',[-1,0,0])}),b={p:[0,.9,-.12],ax:[0,.25,.97],fr:[0,-.97,.25],sp:[25,0,0],hd:15,mA:mao(.13,.24,.22,'w',[1,0,-.3]),mB:mao(-.13,.24,.22,'w',[-1,0,-.3])};
 return tempo([a,JSON.parse(JSON.stringify(a)),b,JSON.parse(JSON.stringify(b))],[1.2,1.0,1.6,1.0])})()};

// ---------- extras (Kata da Água e panturrilha unilateral) ----------
const CAD=[['cadeira',{z:-.2,costas:-1}]];
const sent=o=>Object.assign({p:[0,.56,-.14],ax:[0,1,-.03],pA:pe(.14,.08,.36,null,[0,0,1]),pB:pe(-.14,.08,.36,null,[0,0,1]),mA:mao(.15,.02,.3,'p',[1,0,-.5],[0,0,1]),mB:mao(-.15,.02,.3,'p',[-1,0,-.5],[0,0,1])},o||{});
EX['panturrilha-um-pe']={n:'Panturrilha com um pé só, segurando na parede',m:['panturrilha'],vista:'lado',el:.12,props:[['parede',{z:.62}]],k:(()=>{const h={mA:mao(.2,1.3,.57,'w',[1,-.5,-.5],[0,1,0]),mB:mao(-.2,1.3,.57,'w',[-1,-.5,-.5],[0,1,0]),pB:pe(-.1,.38,-.22,[0,-.3,-.95],[0,0,1])};
 const a=st(Object.assign({p:[0,.95,.02],ax:[0,1,.08],pA:pe(.08,.08,.02,[0,0,1])},h)),b=st(Object.assign({p:[0,1.04,.02],ax:[0,1,.08],pA:pe(.08,.17,0,[0,-.6,.8])},h));return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],[.6,.4,1.2,.3])})()};
EX['alongamento-quadril']={n:'Alongamento de quadril sentado',m:['gluteo'],vista:'34',el:.15,props:CAD,k:(()=>{const pB=pe(.1,.58,.36,[1,0,0],[-1,.3,0]),mA=mao(.14,.58,.42,'w',[1,0,-.3],[0,0,1]),mB=mao(-.1,.6,.38,'w',[-1,0,-.3],[0,0,1]);
 const a=sent({pB,mA,mB}),b=sent({pB,mA,mB,ax:[0,.8,.6],hd:-10});return tempo([a,b,JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a))],[1.6,2.4,1.6,1.0])})()};
EX['circulos-sentado']={n:'Círculos de ombro sentados',m:['ombro'],vista:'lado34',el:.12,props:CAD,k:tempo([sent({ss:0,sp:[0,0,0]}),sent({ss:.06,sp:[-3,0,0]}),sent({ss:.02,sp:[-8,0,0]}),sent({ss:-.02,sp:[4,0,0]})],[.7,.7,.7,.7]).map(k=>Object.assign(k,{e:'lin'}))};
EX['rotacao-sentado']={n:'Rotação do tronco sentado',m:['abdomen'],vista:'frente',el:.2,props:CAD,k:(()=>{const h={mA:mao(-.12,.32,.2,'c',[1,-1,0]),mB:mao(.12,.3,.22,'c',[-1,-1,0])};return tempo([sent(Object.assign({sp:[0,35,0]},h)),sent(Object.assign({sp:[0,35,0]},h)),sent(Object.assign({sp:[0,-35,0]},h)),sent(Object.assign({sp:[0,-35,0]},h))],[1.6,.6,1.6,.6])})()};
EX['respiracao-pe']={n:'Respiração lenta em pé',m:['abdomen'],vista:'34',el:.12,k:tempo([st({}),st({ss:.03,sp:[-4,0,0],hd:-4}),st({ss:.03,sp:[-4,0,0],hd:-4})],[4,.6,6]).map((k,i)=>Object.assign(k,{e:i===2?'io':'io'}))};
EX['respiracao-sentado']={n:'Respiração lenta sentado',m:['abdomen'],vista:'34',el:.12,props:CAD,k:tempo([sent({}),sent({ss:.03,sp:[-4,0,0],hd:-4}),sent({ss:.03,sp:[-4,0,0],hd:-4})],[4,.6,6])};
window.EXS=EX;
})();

/* Boneco 3D do Kaien com esqueleto: quadril, coluna, pescoço, ombros, cotovelos, punhos, joelhos e tornozelos.
   Uso: BonecoExercicio(el, {exercicio:'agachamento', fundo:'#140d26'}) */
(function(){
const T=THREE,V=(x,y,z)=>new T.Vector3(x,y,z),D=Math.PI/180;
const COR={pele:0x9ea2a9,short:0x16171a,mus:0xff5a1f,glow:0x6aa6ff};
const M={
 pele:new T.MeshStandardMaterial({color:COR.pele,roughness:.62,metalness:0}),
 short:new T.MeshStandardMaterial({color:COR.short,roughness:.8,metalness:0}),
 mus:new T.MeshStandardMaterial({color:COR.mus,roughness:.5,emissive:0x5a1400,emissiveIntensity:.6}),
 glow1:new T.MeshBasicMaterial({color:COR.glow,transparent:true,opacity:.85,side:T.BackSide,blending:T.AdditiveBlending,depthWrite:false}),
 glow2:new T.MeshBasicMaterial({color:COR.glow,transparent:true,opacity:.3,side:T.BackSide,blending:T.AdditiveBlending,depthWrite:false}),
 mad:new T.MeshStandardMaterial({color:0x6b4f36,roughness:.8}),par:new T.MeshStandardMaterial({color:0x3b3f55,roughness:.9}),
 sof:new T.MeshStandardMaterial({color:0x5b3f63,roughness:.9}),moc:new T.MeshStandardMaterial({color:0x3d6b8f,roughness:.7}),
 gar:new T.MeshStandardMaterial({color:0x5fb3c9,roughness:.25,transparent:true,opacity:.85}),deg:new T.MeshStandardMaterial({color:0x555b66,roughness:.9})};
function membro(L,perf){const p=[new T.Vector2(0,0)];perf.forEach(([t,r])=>p.push(new T.Vector2(r,t*L)));p.push(new T.Vector2(0,L));const g=new T.LatheGeometry(p,20);g.computeVertexNormals();return g}
const esf=(rx,ry,rz)=>{const g=new T.SphereGeometry(1,28,20);g.scale(rx,ry,rz);return g};
function peca(geo,on,mat){const g=new T.Group(),c=new T.Mesh(geo,on?M.mus:(mat||M.pele));c.castShadow=true;g.add(c);
 if(on){const a=new T.Mesh(geo,M.glow1);a.scale.setScalar(1.13);const b=new T.Mesh(geo,M.glow2);b.scale.setScalar(1.3);g.add(a,b)}return g}
const UP=V(0,1,0);
function liga(o,A,B){o.position.copy(A);o.quaternion.setFromUnitVectors(UP,B.clone().sub(A).normalize())}
function ik(S,H,L1,L2,pole){const d=H.clone().sub(S);let n=d.length();n=Math.min(L1+L2-.0005,Math.max(Math.abs(L1-L2)+.01,n));const dir=d.normalize();
 const a=(L1*L1-L2*L2+n*n)/(2*n),h=Math.sqrt(Math.max(0,L1*L1-a*a));let p=pole.clone().sub(dir.clone().multiplyScalar(pole.dot(dir)));if(p.lengthSq()<1e-6)p=V(0,0,1);p.normalize();
 return [S.clone().add(dir.clone().multiplyScalar(a)).add(p.multiplyScalar(h)),S.clone().add(dir.clone().multiplyScalar(n))]}
const LA1=.3,LA2=.27,LP1=.41,LP2=.41;

// ---------- montagem ----------
function montar(cena,mus){const on=k=>mus.indexOf(k)>=0;
 const pelve=new T.Group(),peito=new T.Group(),cab=new T.Group();pelve.add(peito);peito.position.set(0,.05,0);peito.add(cab);cab.position.set(0,.5,0);cena.add(pelve);
 const add=(g,geo,mat,x,y,z,rx,ry,rz)=>{const o=new T.Mesh(geo,mat);o.position.set(x,y,z);if(rx!=null)o.rotation.set(rx,ry||0,rz||0);o.castShadow=true;g.add(o);return o};
 const addP=(g,obj,x,y,z,rx,ry,rz)=>{obj.position.set(x,y,z);if(rx!=null)obj.rotation.set(rx,ry||0,rz||0);g.add(obj);return obj};
 // tronco (peito local: y = mundo - 1.0)
 const tr=new T.LatheGeometry([[0,.86],[.15,.88],[.16,.95],[.145,1.04],[.15,1.12],[.175,1.22],[.205,1.32],[.215,1.39],[.2,1.45],[.15,1.5],[.075,1.54],[0,1.55]].map(a=>new T.Vector2(a[0],a[1]-1)),36);tr.scale(1,1,.62);tr.computeVertexNormals();add(peito,tr,M.pele,0,0,0);
 add(peito,esf(.14,.05,.08),M.pele,0,.5,-.015);add(peito,membro(.14,[[0,.058],[.6,.052],[1,.05]]),M.pele,0,.49,0);
 add(cab,esf(.084,.108,.097),M.pele,0,.19,.008);
 const pec=esf(.088,.068,.042);[-1,1].forEach(s=>addP(peito,peca(pec,on('peito')),s*.08,.34,.118,-.12,s*.28,s*-.12));
 [.22,.15,.08].forEach(y=>[-1,1].forEach(s=>addP(peito,peca(esf(.036,.03,.022),on('abdomen')),s*.038,y,.09)));
 [-1,1].forEach(s=>addP(peito,peca(esf(.07,.14,.06),on('costas')),s*.15,.3,-.03,0,0,s*.25));
 if(on('costas')||on('lombar'))[-1,1].forEach(s=>addP(peito,peca(esf(.03,.13,.03),true),s*.035,.12,-.085));
 const delt=[-1,1].map(s=>addP(peito,peca(esf(.062,.066,.064),on('ombro')),s*.215,.44,0));
 const omb=[-1,1].map(s=>{const o=new T.Object3D();o.position.set(s*.215,.43,0);peito.add(o);return o});
 // bermuda (pelve local: y = mundo - .95)
 const sh=new T.LatheGeometry([[0,.8],[.17,.81],[.168,.95],[.158,1.03],[.15,1.035],[0,1.04]].map(a=>new T.Vector2(a[0],a[1]-.95)),32);sh.scale(1,1,.72);add(pelve,sh,M.short,0,0,0);
 if(on('gluteo'))[-1,1].forEach(s=>addP(pelve,peca(esf(.085,.09,.06),true),s*.075,-.09,-.1));
 const qua=[-1,1].map(s=>{const o=new T.Object3D();o.position.set(s*.095,-.05,0);pelve.add(o);return o});
 // braços e pernas: segmentos ligados a cada quadro
 const lado=s=>{const b={};
  b.sup=peca(membro(LA1,[[.04,.064],[.3,.074],[.55,.066],[.85,.05],[.97,.044]]),on('braco'));
  b.ant=peca(membro(LA2,[[.04,.048],[.25,.056],[.6,.044],[.95,.033]]),on('antebraco'));
  b.mao=new T.Mesh(esf(.04,.06,.022),M.pele);b.mao.castShadow=true;
  b.coxa=peca(membro(LP1,[[.03,.08],[.18,.098],[.45,.092],[.8,.07],[.97,.056]]),on('coxa'));
  const tb=new T.Mesh(membro(.22,[[0,.1],[1,.099]]),M.short);tb.castShadow=true;b.coxa.add(tb);
  b.can=peca(membro(LP2,[[.04,.056],[.22,.062],[.4,.066],[.75,.044],[.96,.036]]),on('panturrilha'));
  b.joe=new T.Mesh(esf(.055,.05,.055),M.pele);b.pe=new T.Mesh(esf(.045,.03,.11),M.pele);[b.joe,b.pe].forEach(x=>x.castShadow=true);
  cena.add(b.sup,b.ant,b.mao,b.coxa,b.can,b.joe,b.pe);return b};
 return {pelve,peito,cab,omb,qua,delt,L:{A:lado(1),B:lado(-1)}}}

// ---------- objetos de cena ----------
function caixa(cena,w,h,d,x,y,z,mat){const o=new T.Mesh(new T.BoxGeometry(w,h,d),mat);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;cena.add(o);return o}
const PROPS={
 cadeira(c,o){const g=new T.Group(),x=o.x||0,z=o.z||0;caixa(g,.42,.04,.42,0,.45,0,M.mad);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>caixa(g,.035,.45,.035,a*.18,.225,b*.18,M.mad));caixa(g,.42,.45,.035,0,.69,(o.costas||-1)*.19,M.mad);g.position.set(x,0,z);g.rotation.y=o.ry||0;c.add(g)},
 mesa(c,o){caixa(c,o.w||1,.04,o.d||.6,o.x||0,o.h||.74,o.z||0,M.mad);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>caixa(c,.05,(o.h||.74),.05,(o.x||0)+a*((o.w||1)/2-.05),(o.h||.74)/2,(o.z||0)+b*((o.d||.6)/2-.05),M.mad))},
 parede(c,o){caixa(c,1.6,2,.08,0,1,o.z,M.par)},
 sofa(c,o){caixa(c,1.2,.42,.6,0,.21,o.z,M.sof);caixa(c,1.2,.4,.15,0,.62,o.z-.25,M.sof)},
 degrau(c,o){caixa(c,.8,o.h||.15,.35,0,(o.h||.15)/2,o.z||0,M.deg)}};

// ---------- pose ----------
const v3=a=>V(a[0],a[1],a[2]);
const lerpA=(a,b,k)=>a.map((x,i)=>x+(b[i]-x)*k);
function lerpN(a,b,k){if(typeof a==='number')return a+(b-a)*k;if(Array.isArray(a))return lerpA(a,b,k);return a}
const espelha=m=>m&&Object.assign({},m,{k:m.k&&[-m.k[0],m.k[1],m.k[2]],pl:m.pl&&[-m.pl[0],m.pl[1],m.pl[2]],fd:m.fd&&[-m.fd[0],m.fd[1],m.fd[2]]});
function completa(k){k=Object.assign({p:[0,.95,0],ax:[0,1,0],fr:[0,0,1],sp:[0,0,0],hd:0,ss:0},k);
 k.mA=k.mA||{k:[.24,-.13,.02],f:'c'};k.mB=k.mB||espelha(k.mA);k.pA=k.pA||{k:[.1,.08,.02]};k.pB=k.pB||espelha(k.pA);return k}
const EAS={io:u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2,in:u=>u*u,out:u=>1-(1-u)*(1-u),lin:u=>u,hold:u=>0};

function Animador(rig,ex){
 const K=ex.k.map(completa),tot=K.reduce((s,k)=>s+(k.d||.6),0);
 const basis=(ax,fr)=>{const y=v3(ax).normalize(),z=v3(fr);z.sub(y.clone().multiplyScalar(z.dot(y))).normalize();const x=y.clone().cross(z);return new T.Quaternion().setFromRotationMatrix(new T.Matrix4().makeBasis(x,y,z))};
 const alvo=(m,quem)=>{const p=v3(m.k);if(m.f==='c')return rig.peito.localToWorld(p);if(m.f==='p')return rig.pelve.localToWorld(p);return p};
 const dirW=(m,def,quem)=>{if(!m)return def.clone();const p=v3(m);if(quem&&quem.f!=='w'&&quem.f){const g=quem.f==='c'?rig.peito:rig.pelve;return p.applyQuaternion(g.getWorldQuaternion(new T.Quaternion()))}return p};
 function aplica(t){t=((t%tot)+tot)%tot;let i=0,x=t;while(x>(K[i].d||.6)&&i<K.length-1){x-=(K[i].d||.6);i++}
  const a=K[i],b=K[(i+1)%K.length],u=(EAS[a.e||'io'])(Math.min(1,x/(a.d||.6)));
  const p=lerpA(a.p,b.p,u),ax=lerpA(a.ax,b.ax,u),fr=lerpA(a.fr,b.fr,u),sp=lerpA(a.sp,b.sp,u),hd=lerpN(a.hd,b.hd,u),ss=lerpN(a.ss,b.ss,u);
  rig.pelve.position.set(p[0],p[1],p[2]);rig.pelve.quaternion.copy(basis(ax,fr));
  rig.peito.rotation.set(sp[0]*D,sp[1]*D,sp[2]*D,'YXZ');rig.cab.rotation.set(hd*D,0,0);
  rig.omb.forEach(o=>o.position.y=.43+ss);rig.delt.forEach(o=>o.position.y=.44+ss);
  rig.pelve.updateMatrixWorld(true);
  const qP=rig.pelve.getWorldQuaternion(new T.Quaternion()),qC=rig.peito.getWorldQuaternion(new T.Quaternion());
  const out={};
  // deitado de costas o lado A do corpo fica no -x do mundo: alvos em coordenadas do mundo trocam de lado
  const vira=V(1,0,0).applyQuaternion(qP).x<-.5,ld=(k,s)=>{const o=s==='A'?'B':'A',m=k[s];return vira&&(!m.f||m.f==='w')&&(!k[o].f||k[o].f==='w')?o:s};
  [['A',0],['B',1]].forEach(([s,i2])=>{const L=rig.L[s],sg=s==='A'?1:-1;
   // braço
   const ma=a['m'+ld({A:a.mA,B:a.mB},s)],mb=b['m'+ld({A:b.mA,B:b.mB},s)],S=rig.omb[i2===0?1:0].getWorldPosition(V(0,0,0));
   const H=alvo(ma).lerp(alvo(mb),u);
   const plA=ma.pl?dirW(ma.pl,null,ma):V(sg*.4,-.3,-1).applyQuaternion(qC),plB=mb.pl?dirW(mb.pl,null,mb):V(sg*.4,-.3,-1).applyQuaternion(qC);
   const [E,W]=ik(S,H,LA1,LA2,plA.lerp(plB,u));liga(L.sup,S,E);liga(L.ant,E,W);
   const fa=W.clone().sub(E).normalize(),md=(ma.md&&mb.md)?v3(lerpA(ma.md,mb.md,u)).normalize():fa;
   L.mao.position.copy(W.clone().add(md.clone().multiplyScalar(.045)));L.mao.quaternion.setFromUnitVectors(UP,md);
   // perna
   const pa=a['p'+ld({A:a.pA,B:a.pB},s)],pb=b['p'+ld({A:b.pA,B:b.pB},s)],Q=rig.qua[i2===0?1:0].getWorldPosition(V(0,0,0));
   const F=alvo(pa).lerp(alvo(pb),u);
   const kA=pa.pl?dirW(pa.pl,null,pa):V(0,0,1).applyQuaternion(qP),kB=pb.pl?dirW(pb.pl,null,pb):V(0,0,1).applyQuaternion(qP);
   const [J,Tn]=ik(Q,F,LP1,LP2,kA.lerp(kB,u));liga(L.coxa,Q,J);liga(L.can,J,Tn);L.joe.position.copy(J);
   let fw=V(0,0,1).applyQuaternion(qP);fw.y=0;if(fw.lengthSq()<.01)fw=V(0,0,1);fw.normalize();
   const fd=(pa.fd&&pb.fd)?v3(lerpA(pa.fd,pb.fd,u)).normalize():fw;
   L.pe.position.copy(Tn.clone().add(fd.clone().multiplyScalar(.055)).add(V(0,-.045*(1-Math.abs(fd.y)),0)));L.pe.quaternion.setFromUnitVectors(V(0,0,1),fd);
   out[s]={S,E,W,mao:L.mao.position.clone(),Q,J,Tn,pe:L.pe.position.clone()}});
  out.cab=rig.cab.localToWorld(V(0,.19,0));out.u=u;out.i=i;out.t=t;return out}
 return {aplica,tot}}

window.BonecoExercicio=function(el,op){op=op||{};const ex=EXS[op.exercicio];if(!ex)throw new Error('exercício '+op.exercicio);
 const W=()=>el.clientWidth||320,Hh=()=>el.clientHeight||320;
 const r=new T.WebGLRenderer({antialias:true,alpha:!op.fundo});r.setPixelRatio(Math.min(2,window.devicePixelRatio||1));r.setSize(W(),Hh());
 r.shadowMap.enabled=true;r.shadowMap.type=T.PCFSoftShadowMap;if(op.fundo)r.setClearColor(op.fundo,1);el.appendChild(r.domElement);
 const cena=new T.Scene(),cam=new T.PerspectiveCamera(34,W()/Hh(),.05,30);
 cena.add(new T.HemisphereLight(0xcfd8ff,0x1c1628,.5));const sol=new T.DirectionalLight(0xffffff,.8);sol.position.set(1.4,3.2,2.4);sol.castShadow=true;sol.shadow.mapSize.set(1024,1024);
 Object.assign(sol.shadow.camera,{left:-2,right:2,top:2.5,bottom:-2,near:.5,far:9});sol.target.position.set(0,0,0);cena.add(sol,sol.target);
 const rim=new T.DirectionalLight(0x8fb4ff,.5);rim.position.set(-2,1.5,-2);cena.add(rim);
 const chao=new T.Mesh(new T.PlaneGeometry(10,10),new T.ShadowMaterial({opacity:.35}));chao.rotation.x=-Math.PI/2;chao.receiveShadow=true;cena.add(chao);
 const piso=new T.Mesh(new T.CircleGeometry(1.3,48),new T.MeshBasicMaterial({color:0x3a3160,transparent:true,opacity:.35}));piso.rotation.x=-Math.PI/2;piso.position.y=.001;cena.add(piso);
 const rig=montar(cena,ex.m||[]);(ex.props||[]).forEach(p=>PROPS[p[0]](cena,p[1]||{}));
 // objetos presos ao corpo
 let moc=null,gar=[],corda=null;
 if(ex.moc){moc=new T.Mesh(new T.BoxGeometry(.3,.36,.16),M.moc);moc.castShadow=true;cena.add(moc)}
 if(ex.gar)gar=[0,1].map(()=>{const g=new T.Mesh(new T.CylinderGeometry(.035,.035,.2,14),M.gar);g.castShadow=true;cena.add(g);return g});
 if(ex.corda){corda=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([V(0,0,0),V(0,1,0)]),8,.006,4),new T.MeshStandardMaterial({color:0xc9a46a}));cena.add(corda)}
 const an=Animador(rig,ex);
 function extras(o,t){
  if(moc){if(ex.moc==='peito'){moc.position.copy(rig.peito.localToWorld(V(0,.25,.24)));moc.quaternion.copy(rig.peito.getWorldQuaternion(new T.Quaternion()))}
   else if(ex.moc==='quadril'){moc.position.copy(rig.pelve.localToWorld(V(0,.02,.2)));moc.quaternion.copy(rig.pelve.getWorldQuaternion(new T.Quaternion()))}
   else if(ex.moc==='A'){moc.position.copy(o.A.mao).add(V(0,-.2,0));moc.quaternion.identity()}
   else{moc.position.copy(o.A.mao).add(o.B.mao).multiplyScalar(.5).add(V(0,-.12,0));moc.quaternion.identity()}}
  gar.forEach((g,i)=>{const s=i?o.B:o.A;g.position.copy(s.mao);const d=s.mao.clone().sub(s.W).normalize();const lat=(ex.gar==='z'?V(0,0,1):V(1,0,0)).applyQuaternion(rig.peito.getWorldQuaternion(new T.Quaternion()));g.quaternion.setFromUnitVectors(UP,lat.sub(d.clone().multiplyScalar(lat.dot(d))).normalize())});
  if(corda){const a=o.A.mao,b=o.B.mao,c=a.clone().add(b).multiplyScalar(.5),ang=(t/ex.corda)*Math.PI*2,R=1.05;
   const pts=[];for(let i=0;i<=16;i++){const f=i/16,x=a.x+(b.x-a.x)*f,arc=Math.sin(f*Math.PI);pts.push(V(x,c.y+(-Math.cos(ang))*R*arc*.85+.0,c.z+Math.sin(ang)*R*arc*.45))}
   pts.forEach(p=>{p.y=Math.max(.01,p.y)});corda.geometry.dispose();corda.geometry=new T.TubeGeometry(new T.CatmullRomCurve3(pts),24,.007,5)}}
 // câmera: enquadra o movimento inteiro
 const bb=new T.Box3();for(let i=0;i<24;i++){const o=an.aplica(i*an.tot/24);['A','B'].forEach(s=>['S','E','W','Q','J','Tn','pe'].forEach(k=>bb.expandByPoint(o[s][k])));bb.expandByPoint(o.cab.clone().add(V(0,.12,0)))}
 bb.expandByPoint(V(bb.min.x,0,bb.min.z));const cen=bb.getCenter(V(0,0,0)),tam=bb.getSize(V(0,0,0));
 const VIS={lado:Math.PI/2,frente:0,'34':.7,lado34:1.05,tras34:2.3,ladoE:-Math.PI/2};
 let az=(VIS[ex.vista]!=null?VIS[ex.vista]:.7)+(ex.az||0),el2=ex.el!=null?ex.el:.22,dist=Math.max(1.9,Math.max(tam.x,tam.y,tam.z)*1.55+.9),arr=null;const alvoC=cen;
 piso.position.x=cen.x;piso.position.z=cen.z;sol.target.position.copy(cen);sol.position.set(cen.x+1.4,3.2,cen.z+2.4);
 const posCam=()=>{cam.position.set(alvoC.x+dist*Math.cos(el2)*Math.sin(az),alvoC.y+dist*Math.sin(el2),alvoC.z+dist*Math.cos(el2)*Math.cos(az));cam.lookAt(alvoC)};posCam();
 const cv=r.domElement;cv.style.touchAction='none';
 cv.addEventListener('pointerdown',e=>{arr={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId)});
 cv.addEventListener('pointermove',e=>{if(!arr)return;az-=(e.clientX-arr.x)*.008;el2=Math.max(-.05,Math.min(1.3,el2+(e.clientY-arr.y)*.006));arr={x:e.clientX,y:e.clientY};posCam();if(parado)desenha()});
 cv.addEventListener('pointerup',()=>arr=null);
 const reduz=(()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches||op.parado}catch(e){return !!op.parado}})();
 let visivel=true,parado=reduz,t0=performance.now(),raf=0;
 function desenha(t){t=parado?(ex.tFixo||an.tot*.4):t;const o=an.aplica(t);extras(o,t);r.render(cena,cam)}
 function laco(n){raf=requestAnimationFrame(laco);if(!r.domElement.isConnected||document.hidden||window.__pausa)return;desenha((n-t0)/1000)}
 if(parado)desenha();else raf=requestAnimationFrame(laco);
 return {cam:(a,e,d)=>{az=a;el2=e;if(d)dist=d;posCam()},desenha:t=>desenha(t),tot:an.tot,canvas:r.domElement,parar(){cancelAnimationFrame(raf);try{r.forceContextLoss()}catch(e){}r.dispose()}}};
})();


/* ===== Boneco 3D no treino guiado: um só por vez, reaproveitado entre renders ===== */
const B3N={'Flexão na parede':'flexao-parede','Flexão com as mãos na mesa':'flexao-mesa','Flexão com joelhos':'flexao-joelhos','Flexão fechada com joelhos':'flexao-joelhos','Flexão fechada':'flexao-fechada','Flexão com os pés':'flexao-pes-cadeira','Flexão':'flexao',
 'Sentar e levantar':'sentar-levantar','Agachamento sumô':'agachamento-sumo','Agachamento com mochila':'agachamento-mochila','Agachamento com salto':'agachamento-salto','Agachamento rápido':'agachamento-rapido','Agachamento':'agachamento',
 'Afundo parado':'afundo-parado','Passo para trás':'afundo-parado','Afundo para trás':'afundo-tras','Afundo andando':'afundo-andando','Afundo com mochila':'afundo-mochila','Afundo':'afundo',
 'Ponte de glúteo com uma perna':'ponte-uma-perna','Ponte de glúteo com os pés':'ponte-sofa','Ponte de glúteo com mochila':'ponte-mochila','Ponte de glúteo':'ponte',
 'Panturrilha no degrau':'panturrilha-degrau','Panturrilha com um pé':'panturrilha-um-pe','Panturrilha':'panturrilha',
 'Abdominal bicicleta':'abdominal-bicicleta','Abdominal tesoura':'abdominal-tesoura','Abdominal':'abdominal',
 'Prancha lateral':'prancha-lateral','Prancha com joelhos':'prancha-joelhos','Prancha com toque':'prancha-toque','Prancha':'prancha',
 'Remada curvada':'remada-curvada','Remada com um braço':'remada-um-braco','Remada deitado':'remada-mesa','Remada':'remada-curvada',
 'Superman alternado':'superman-alternado','Superman':'superman','Elevação lateral':'elevacao-lateral','Elevação frontal':'elevacao-frontal','Desenvolvimento':'desenvolvimento',
 'Tríceps na cadeira':'triceps-cadeira','Tríceps francês':'triceps-frances','Rosca martelo':'rosca-martelo','Rosca':'rosca','Encolhimento':'encolhimento','Crucifixo invertido':'crucifixo-invertido',
 'Marcha':'marcha','Caminhada':'caminhada','Passos laterais':'passos-laterais','Corrida lateral':'corrida-lateral','Corrida com joelho alto':'joelho-alto','Corrida parada':'corrida-parada',
 'Polichinelo sem salto':'polichinelo-sem-salto','Polichinelo':'polichinelo','Socos no ar':'socos','Pular corda':'pular-corda','Burpee com flexão':'burpee-flexao','Burpee':'burpee','Escalador':'escalador',
 'Aquecimento':'aquecimento','Finalização':'alongamento','Alongamento de quadril':'alongamento-quadril','Alongamento':'alongamento',
 'Círculos de ombro sentados':'circulos-sentado','Círculos':'aquecimento','Rotação do tronco sentado':'rotacao-sentado','Rotação':'rotacao','Respiração lenta sentado':'respiracao-sentado','Respiração':'respiracao-pe'};
const _b3k=Object.keys(B3N).sort((a,b)=>b.length-a.length);
const B3D={cur:null,id:null,falhou:false,
 id3(n){n=String(n||'');const t=/^(Aquecimento|Finalização)/.test(n)?[n]:[n.indexOf(': ')>0?n.slice(n.indexOf(': ')+2):n];for(const v of t){const k=_b3k.find(x=>v.indexOf(x)===0);if(k)return B3N[k]}return ''},
 // caixa do boneco: o desenho 2D fica por baixo como reserva se o 3D não puder rodar
 html(n,cls){const id=B3D.id3(n),d2=(typeof EXA!=='undefined'&&EXA.svg(n,cls))||'';if(!id||B3D.falhou||typeof THREE==='undefined')return d2;return '<div class="b3d '+(cls||'')+'" data-ex="'+id+'">'+d2+'</div>'},
 sync(){const el=document.querySelector('.b3d');if(navigator.webdriver&&!window.__b3d)return;
  if(!el){if(B3D.cur){B3D.cur.parar();B3D.cur=null;B3D.id=null}return}
  const id=el.getAttribute('data-ex');
  if(B3D.cur&&B3D.id===id){el.appendChild(B3D.cur.canvas);el.classList.add('on');return}
  if(B3D.cur){B3D.cur.parar();B3D.cur=null}
  try{B3D.cur=BonecoExercicio(el,{exercicio:id,parado:Cfg.rfx()});B3D.id=id;el.classList.add('on')}catch(e){B3D.falhou=true;B3D.cur=null;console.warn(e)}}};
AFTER_RENDER.push(()=>B3D.sync());
