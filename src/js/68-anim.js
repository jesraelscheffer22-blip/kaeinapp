/* ===== Boneco animado dos exercícios =====
   Manequim cinza em vetor (sem imagem), com o músculo trabalhado aceso em laranja.
   Cada exercício é uma lista de poses-chave; o motor interpola e calcula braços e pernas
   por cinemática (ângulos) ou por alvo (IK de 2 ossos), para mãos e pés ficarem no lugar. */
const EXA=(()=>{
 const G=184,LT=50,LUA=27,LFA=26,LTH=38,LSH=38,LFT=11,HR=10;
 const rad=d=>d*Math.PI/180,dir=a=>[Math.sin(rad(a)),Math.cos(rad(a))];
 const add=(p,v,k)=>[p[0]+v[0]*k,p[1]+v[1]*k];
 // IK de 2 ossos: devolve [articulação do meio, ponta]
 function ik(r,t,L1,L2,b){let dx=t[0]-r[0],dy=t[1]-r[1],d=Math.hypot(dx,dy);const mn=Math.abs(L1-L2)+.5,mx=L1+L2-.3;d=Math.max(mn,Math.min(mx,d));
  const base=Math.atan2(dy,dx),a=Math.acos(Math.max(-1,Math.min(1,(L1*L1+d*d-L2*L2)/(2*L1*d)))),j=[r[0]+L1*Math.cos(base+b*a),r[1]+L1*Math.sin(base+b*a)];
  const e=[r[0]+Math.cos(base)*d,r[1]+Math.sin(base)*d];return [j,e]}
 // membro: [ângulo, flexão] (ângulo a partir de "para baixo", positivo = para frente) ou {k:[x,y],b:±1}
 function limb(root,m,L1,L2,sgn,leg,lado){if(!m)m=[0,0];if(m.k)return ik(root,m.k,L1,L2,(m.b||1)*(lado?-1:1));
  const a1=m[0]*sgn,j=add(root,dir(a1),L1),a2=leg?(m[0]-m[1])*sgn:(m[0]+m[1])*sgn;return [j,add(j,dir(a2),L2)]}
 function fk(P){const fr=P.v==='f',p=P.p,t=P.t||0,ss=P.ss||0;
  const S=add(p,[Math.sin(rad(t)),-Math.cos(rad(t))],LT);S[1]-=ss;
  const td=[Math.sin(rad(t+(P.h||0))),-Math.cos(rad(t+(P.h||0)))],H=add(S,td,7+HR);
  const o={fr,P:p,S,H,t};
  if(fr){const SR=[S[0]+16,S[1]+3],SL=[S[0]-16,S[1]+3],HPR=[p[0]+9,p[1]],HPL=[p[0]-9,p[1]];
   o.aN=[SR].concat(limb(SR,P.aN,LUA,LFA,1));o.aF=[SL].concat(limb(SL,P.aF,LUA,LFA,-1));
   o.lN=[HPR].concat(limb(HPR,P.lN,LTH,LSH,1,1));o.lF=[HPL].concat(limb(HPL,P.lF,LTH,LSH,-1,1));
   o.fN=add(o.lN[2],[1,.2],7);o.fF=add(o.lF[2],[-1,.2],7)}
  else{o.aN=[S].concat(limb(S,P.aN,LUA,LFA,1));o.aF=[S].concat(limb(S,P.aF,LUA,LFA,1));
   o.lN=[p].concat(limb(p,P.lN,LTH,LSH,1,1,1));o.lF=[p].concat(limb(p,P.lF,LTH,LSH,1,1,1));
   o.fN=add(o.lN[2],dir(P.fN==null?90:P.fN),LFT);o.fF=add(o.lF[2],dir(P.fF==null?90:P.fF),LFT)}
  return o}
 // interpolação de poses
 const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
 function lerp(a,b,k){if(typeof a==='number')return typeof b==='number'?a+(b-a)*k:a;if(Array.isArray(a))return a.map((x,i)=>lerp(x,b&&b[i]!=null?b[i]:x,k));
  if(a&&typeof a==='object'){const o={};for(const n in a)o[n]=lerp(a[n],b?b[n]:a[n],k);if(b)for(const n in b)if(!(n in o))o[n]=b[n];return o}return a}
 function poseAt(A,ms){const K=A.k,tot=K.reduce((s,x)=>s+(x.d||600),0);let t=ms%tot;
  for(let i=0;i<K.length;i++){const d=K[i].d||600;if(t<=d){const n=K[(i+1)%K.length];return Object.assign(lerp(K[i],n,K[i].hold?Math.max(0,(t/d-.5)*2):ease(t/d)),{v:A.v})}t-=d}return Object.assign({},K[0],{v:A.v})}
 // desenho
 const C={pele:'#d3d7de',som:'#9aa0a9',linha:'#4e535c',fundo:'#7d838c',mus:'#ff6a3a',glow:'#7fb2ff'};
 const seg=(a,b,w,c,ex)=>'<line x1="'+a[0].toFixed(1)+'" y1="'+a[1].toFixed(1)+'" x2="'+b[0].toFixed(1)+'" y2="'+b[1].toFixed(1)+'" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round"'+(ex||'')+'/>';
 const corpo=(a,b,w,lit,far)=>(lit?seg(a,b,w+5,C.glow,' opacity=".55"'):'')+seg(a,b,w+2,C.linha)+seg(a,b,w,lit?C.mus:far?C.fundo:C.pele);
 const elip=(c,rx,ry,ang,cor,ex)=>'<ellipse cx="'+c[0].toFixed(1)+'" cy="'+c[1].toFixed(1)+'" rx="'+rx+'" ry="'+ry+'" transform="rotate('+ang.toFixed(1)+' '+c[0].toFixed(1)+' '+c[1].toFixed(1)+')" fill="'+cor+'"'+(ex||'')+'/>';
 const glowE=(c,rx,ry,ang)=>elip(c,rx+2.5,ry+2.5,ang,C.glow,' opacity=".6"')+elip(c,rx,ry,ang,C.mus);
 function desenha(o,mus,props,P){const m=new Set(mus||[]);let s='';
  const U=(o.P[0]-o.S[0]),V=(o.P[1]-o.S[1]),tl=Math.hypot(U,V)||1,ux=-U/tl,uy=-V/tl,nx=-uy,ny=ux,tang=Math.atan2(uy,ux)*180/Math.PI+90; // u: pelve→ombro; n: frente do peito
  const ptT=(f,off)=>[o.P[0]+(o.S[0]-o.P[0])*f+nx*off,o.P[1]+(o.S[1]-o.P[1])*f+ny*off];
  const lg=k=>m.has('perna')||m.has(k);
  // membros de trás
  const perna=(L,F,far,lado)=>corpo(L[0],L[1],14.5,lg('coxa'),far)+corpo(L[1],L[2],11,lg('panturrilha'),far)+corpo(L[2],F,6.5,false,far);
  const braco=(A,far)=>corpo(A[0],A[1],10.5,m.has('braco')||m.has('ombro2'),far)+corpo(A[1],A[2],8.5,m.has('antebraco'),far)+'<circle cx="'+A[2][0].toFixed(1)+'" cy="'+A[2][1].toFixed(1)+'" r="4.8" fill="'+(far?C.fundo:C.pele)+'" stroke="'+C.linha+'"/>';
  (props.tras||[]).forEach(f=>s+=f(o,P));
  if(o.fr){s+=perna(o.lF,o.fF,0)+perna(o.lN,o.fN,0);
   const tw=[[o.S[0]-19,o.S[1]],[o.S[0]+19,o.S[1]],[o.P[0]+12,o.P[1]-14],[o.P[0]+12,o.P[1]+4],[o.P[0]-12,o.P[1]+4],[o.P[0]-12,o.P[1]-14]];
   s+=seg(o.S,o.H,7,C.linha)+seg(o.S,o.H,5,C.pele);
   s+='<polygon points="'+tw.map(x=>x[0].toFixed(1)+','+x[1].toFixed(1)).join(' ')+'" fill="'+(m.has('costas')?C.mus:C.pele)+'" stroke="'+(m.has('costas')?C.glow:C.linha)+'" stroke-width="'+(m.has('costas')?2.5:1.2)+'" stroke-linejoin="round"/>';
   s+='<rect x="'+(o.P[0]-12)+'" y="'+(o.P[1]-3)+'" width="24" height="10" rx="3" fill="#2b2f36"/>';
   if(m.has('peito')){s+=glowE([o.S[0]-8,o.S[1]+9],8,6,0)+glowE([o.S[0]+8,o.S[1]+9],8,6,0)}
   if(m.has('abdomen'))s+=glowE([(o.S[0]+o.P[0])/2,(o.S[1]+o.P[1])/2+6],6,12,0);
   if(m.has('ombro')){s+=glowE(o.aN[0],5.5,5,0)+glowE(o.aF[0],5.5,5,0)}
   s+=braco(o.aF,0)+braco(o.aN,0)}
  else{s+=braco(o.aF,1)+perna(o.lF,o.fF,1);
   s+=seg(o.S,o.H,7,C.linha)+seg(o.S,o.H,5,C.pele);
   s+=corpo(o.P,o.S,21,false);
   s+=elip(ptT(.72,3.5),11,8.5,tang,C.pele)+elip(ptT(.25,0),9,10,tang,C.pele); // peito e quadril
   if(m.has('peito'))s+=glowE(ptT(.74,6),8,5.5,tang);
   if(m.has('costas'))s+=glowE(ptT(.62,-6),11,5,tang);
   if(m.has('abdomen'))s+=glowE(ptT(.36,6.5),10,4,tang);
   if(m.has('gluteo'))s+=glowE(ptT(.04,-7),7,7,tang);
   s+=elip(ptT(.06,0),12,10.5,tang,'#2b2f36'); // short
   s+=perna(o.lN,o.fN,0);
   if(m.has('ombro'))s+=glowE(o.aN[0],5.5,5,0);
   s+=braco(o.aN,0)}
  s+='<circle cx="'+o.H[0].toFixed(1)+'" cy="'+o.H[1].toFixed(1)+'" r="'+HR+'" fill="'+C.pele+'" stroke="'+C.linha+'" stroke-width="1.2"/>';
  (props.frente||[]).forEach(f=>s+=f(o,P));
  return s}
 // objetos de cena
 const R=(x,y,w,h,c,ex)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="2" fill="'+(c||'#5a4a3a')+'" stroke="#2a2018" stroke-width="1"'+(ex||'')+'/>';
 const OB={
  cadeira:x=>()=>R(x,138,34,5)+R(x+2,143,4,41)+R(x+28,143,4,41)+R(x+28,96,4,42),
  cadeiraF:x=>()=>R(x,138,34,5)+R(x+2,143,4,41)+R(x+28,143,4,41)+R(x,96,4,42),
  mesa:(x,y)=>()=>R(x,y,70,6)+R(x+6,y+6,5,G-y-6)+R(x+59,y+6,5,G-y-6),
  parede:x=>()=>R(x,30,10,154,'#4a4f63'),
  sofa:x=>()=>R(x,150,50,34,'#5b3f63')+R(x+40,128,10,56,'#5b3f63'),
  degrau:(x,y)=>()=>R(x,y,48,G-y,'#555b66'),
  mochila:(lado,dx,dy)=>o=>{const h=o[lado||'aN'][2];return R((h[0]-7+(dx||0)).toFixed(1),(h[1]-2+(dy||0)).toFixed(1),14,16,'#3d6b8f')},
  mochilaPeito:()=>o=>{const c=[(o.S[0]*.7+o.P[0]*.3),(o.S[1]*.7+o.P[1]*.3)];return R((c[0]+2).toFixed(1),(c[1]-6).toFixed(1),13,16,'#3d6b8f')},
  mochilaQuadril:()=>o=>R((o.P[0]-8).toFixed(1),(o.P[1]-13).toFixed(1),16,12,'#3d6b8f'),
  garrafa:lado=>o=>{const h=o[lado][2];return R((h[0]-3).toFixed(1),(h[1]-9).toFixed(1),6,14,'#5fb3c9')},
  corda:()=>(o,P)=>{const a=o.aN[2],b=o.aF[2],y=P.cy;return '<path d="M'+b[0].toFixed(1)+' '+b[1].toFixed(1)+' Q110 '+y.toFixed(1)+' '+a[0].toFixed(1)+' '+a[1].toFixed(1)+'" stroke="#c9a46a" stroke-width="2" fill="none"/>'}
 };
 // ---------- poses ----------
 const ST={p:[110,107],t:0,aN:[8,8],aF:[-6,8],lN:{k:[114,181],b:1},lF:{k:[106,181],b:1}};
 const st=o=>Object.assign(JSON.parse(JSON.stringify(ST)),o);
 const FR={p:[110,107],t:0,aN:[10,6],aF:[10,6],lN:{k:[122,181],b:-1},lF:{k:[98,181],b:1}};
 const fr=o=>Object.assign(JSON.parse(JSON.stringify(FR)),o);
 // corpo reto (prancha/flexão): A = âncora (tornozelo ou joelho), ang = inclinação do corpo; len = distância âncora→pelve
 function reto(A,ang,len,o){const d=[Math.cos(rad(ang)),-Math.sin(rad(ang))],p=[A[0]+d[0]*len,A[1]+d[1]*len];return Object.assign({p,t:90-ang},o)}
 const flex=(A,a1,a2,mao,leg,extra)=>{const k=[];[[a1,700],[Math.max(a2,leg?14:a2),900]].forEach(([ang,dd])=>k.push(Object.assign(reto(A,ang,leg?38:76,{h:-15,aN:{k:mao,b:-1},aF:{k:[mao[0]-3,mao[1]],b:-1},lN:leg?{k:[A[0]-34,A[1]-14],b:1}:{k:A,b:1},lF:leg?{k:[A[0]-34,A[1]-14],b:1}:{k:[A[0]-2,A[1]],b:1},fN:leg?160:60,fF:leg?160:60,d:dd}),extra||{})));return k};
 const agach=(baixo,cad,extra)=>[st(Object.assign({d:700,aN:[20,10],aF:[15,10]},extra||{})),st(Object.assign({p:baixo||[86,146],t:38,aN:[80,0],aF:[75,0],d:800},extra||{}))];
 const afundo=()=>[st({p:[104,108],lN:{k:[142,181],b:1},lF:{k:[72,174],b:1},fF:40,aN:[5,10],aF:[-5,10],d:700}),st({p:[104,140],t:2,lN:{k:[142,181],b:1},lF:{k:[72,174],b:1},fF:40,aN:[5,10],aF:[-5,10],d:800})];
 const ponte=(pes,extra)=>{const f=pes||[150,181];return [Object.assign({p:[105,176],s:1,t:-90,h:0,aN:{k:[104,183],b:-1},aF:{k:[102,183],b:-1},lN:{k:f,b:1},lF:{k:[f[0]-3,f[1]],b:1},fN:90,fF:90,d:700},extra||{}),Object.assign({p:[105,150],t:-120,aN:{k:[104,183],b:-1},aF:{k:[102,183],b:-1},lN:{k:f,b:1},lF:{k:[f[0]-3,f[1]],b:1},fN:90,fF:90,d:900,hold:1},extra||{})]};
 const prancha=(A,ang,len,ombro,extra)=>{const b=reto(A,ang,len,{h:-20,fN:60,fF:60});const S0=[b.p[0]+Math.sin(rad(b.t))*LT,b.p[1]-Math.cos(rad(b.t))*LT];return Object.assign(b,{aN:{k:[S0[0]+22,183],b:1},aF:{k:[S0[0]+19,183],b:1},lN:{k:A,b:1},lF:{k:[A[0]-2,A[1]],b:1}},extra||{})};
 const marcha=(hk,kf,dd,bounce)=>[st({p:[110,107-(bounce||0)],lN:[hk,kf],lF:{k:[106,181],b:1},aN:[-25,20],aF:[30,30],d:dd}),st({p:[110,107],d:dd*.6}),st({p:[110,107-(bounce||0)],lF:[hk,kf],lN:{k:[114,181],b:1},aF:[-25,20],aN:[30,30],d:dd}),st({p:[110,107],d:dd*.6})];
 const A={
  // empurrar
  flexParede:{v:'s',m:['peito','braco'],pr:{tras:[OB.parede(168)]},k:[Object.assign(reto([86,181],72,76,{h:-5,aN:{k:[167,96],b:-1},aF:{k:[167,99],b:-1},lN:{k:[86,181],b:1},lF:{k:[84,181],b:1},fN:70,fF:70,d:700})),Object.assign(reto([86,181],64,76,{h:-5,aN:{k:[167,96],b:-1},aF:{k:[167,99],b:-1},lN:{k:[86,181],b:1},lF:{k:[84,181],b:1},fN:70,fF:70,d:900}))]},
  flexMesa:{v:'s',m:['peito','braco'],pr:{tras:[OB.mesa(140,136)]},k:flex([48,181],38,27,[160,135])},
  flexJoelho:{v:'s',m:['peito','braco'],k:flex([70,180],36,10,[148,183],1)},
  flex:{v:'s',m:['peito','braco'],k:flex([38,181],25,9,[156,183])},
  flexPes:{v:'s',m:['peito','ombro','braco'],pr:{tras:[OB.cadeira(14)]},k:flex([40,138],0,-12,[158,183])},
  flexFechada:{v:'s',m:['braco','peito'],k:flex([38,181],25,9,[150,183])},
  // pernas
  sentar:{v:'s',m:['coxa','gluteo'],pr:{tras:[OB.cadeira(52)]},k:[st({d:700,aN:[20,10],aF:[15,10]}),st({p:[80,140],t:34,aN:[75,0],aF:[70,0],d:800,hold:1})]},
  agach:{v:'s',m:['coxa','gluteo'],k:agach()},
  agachMochila:{v:'s',m:['coxa','gluteo'],pr:{frente:[OB.mochilaPeito()]},k:agach([86,146],0,{aN:[35,115],aF:[32,115]})},
  agachRapido:{v:'s',m:['coxa','gluteo'],k:agach().map(x=>Object.assign(x,{d:380}))},
  agachSalto:{v:'s',m:['coxa','gluteo','panturrilha'],k:[st({p:[86,146],t:38,aN:[60,0],aF:[55,0],d:500}),st({p:[110,92],aN:[170,0],aF:[165,0],lN:{k:[114,166],b:1},lF:{k:[106,166],b:1},fN:30,fF:30,d:350}),st({d:350})]},
  sumo:{v:'f',m:['coxa','gluteo'],k:[fr({lN:{k:[142,181],b:-1},lF:{k:[78,181],b:1},aN:[15,-125],aF:[15,-125],d:700}),fr({p:[110,138],lN:{k:[142,181],b:-1},lF:{k:[78,181],b:1},aN:[15,-125],aF:[15,-125],d:800})]},
  afundo:{v:'s',m:['coxa','gluteo'],k:afundo()},
  afundoCad:{v:'s',m:['coxa','gluteo'],pr:{tras:[OB.cadeira(150)]},k:afundo().map(x=>Object.assign(x,{aN:{k:[152,x.p[1]+8],b:-1}}))},
  afundoTras:{v:'s',m:['coxa','gluteo'],k:[st({d:600}),afundo()[1],st({d:300})]},
  afundoMochila:{v:'s',m:['coxa','gluteo'],pr:{frente:[OB.mochilaPeito()]},k:afundo().map(x=>Object.assign(x,{aN:[35,115],aF:[32,115]}))},
  ponte:{v:'s',m:['gluteo','coxa'],k:ponte()},
  ponteUma:{v:'s',m:['gluteo','coxa'],k:ponte(null,{lF:[100,5]})},
  ponteSofa:{v:'s',m:['gluteo','coxa'],pr:{tras:[OB.sofa(142)]},k:ponte([150,150])},
  ponteMochila:{v:'s',m:['gluteo','coxa'],pr:{frente:[OB.mochilaQuadril()]},k:ponte().map(x=>Object.assign(x,{aN:{k:[x.p[0]+2,x.p[1]-6],b:1}}))},
  pantu:{v:'s',m:['panturrilha'],k:[st({d:600}),st({p:[110,99],lN:{k:[114,173],b:1},lF:{k:[106,173],b:1},fN:42,fF:42,d:800,hold:1})]},
  pantuDegrau:{v:'s',m:['panturrilha'],pr:{tras:[OB.degrau(96,160)]},k:[st({p:[110,90],lN:{k:[114,164],b:1},lF:{k:[106,164],b:1},fN:120,fF:120,d:700}),st({p:[110,76],lN:{k:[114,150],b:1},lF:{k:[106,150],b:1},fN:42,fF:42,d:800,hold:1})]},
  // abdômen e core
  abd:{v:'s',m:['abdomen'],k:[{p:[112,176],t:-90,h:0,aN:[118,0],aF:[116,0],lN:{k:[156,181],b:1},lF:{k:[153,181],b:1},d:700},{p:[112,176],t:-62,h:15,aN:[100,0],aF:[98,0],lN:{k:[156,181],b:1},lF:{k:[153,181],b:1},d:700,hold:1}]},
  bici:{v:'s',m:['abdomen'],k:[{p:[112,176],t:-65,h:15,aN:{k:[70,150],b:1},aF:{k:[72,152],b:1},lN:[150,110],lF:{k:[178,150],b:1},fN:110,fF:110,d:650},{p:[112,176],t:-65,h:15,aN:{k:[70,150],b:1},aF:{k:[72,152],b:1},lF:[150,110],lN:{k:[178,150],b:1},fN:110,fF:110,d:650}]},
  tesoura:{v:'s',m:['abdomen','coxa'],k:[{p:[112,177],t:-85,h:5,aN:{k:[150,182],b:1},aF:{k:[148,182],b:1},lN:[118,0],lF:[100,0],fN:160,fF:160,d:450},{p:[112,177],t:-85,h:5,aN:{k:[150,182],b:1},aF:{k:[148,182],b:1},lN:[100,0],lF:[118,0],fN:160,fF:160,d:450}]},
  prancha:{v:'s',m:['abdomen','ombro'],k:[prancha([36,181],13,76,[150,0],{d:1200}),prancha([36,181],14.5,76,[150,0],{d:1200})]},
  pranchaJ:{v:'s',m:['abdomen'],k:[prancha([84,180],28,38,[150,0],{lN:{k:[50,170],b:-1},lF:{k:[50,170],b:-1},fN:160,fF:160,d:1200}),prancha([84,180],30,38,[150,0],{lN:{k:[50,170],b:-1},lF:{k:[50,170],b:-1},fN:160,fF:160,d:1200})]},
  pranchaLat:{v:'s',m:['abdomen','ombro'],k:[prancha([40,181],15,76,[150,0],{aN:{k:[156,183],b:-1},aF:{k:[110,150],b:1},d:1200}),prancha([40,181],18,76,[150,0],{aN:{k:[156,183],b:-1},aF:{k:[110,146],b:1},d:1200})]},
  toque:{v:'s',m:['abdomen','ombro','peito'],k:[Object.assign(reto([38,181],25,76,{h:-15,aN:{k:[156,183],b:-1},aF:{k:[153,183],b:-1},lN:{k:[38,181],b:1},lF:{k:[36,181],b:1},fN:60,fF:60,d:500})),Object.assign(reto([38,181],25,76,{h:-15,aN:{k:[150,140],b:-1},aF:{k:[153,183],b:-1},lN:{k:[38,181],b:1},lF:{k:[36,181],b:1},fN:60,fF:60,d:500}))]},
  // costas e braços
  remada:{v:'s',m:['costas','braco'],pr:{frente:[OB.mochila('aN',0,0)]},k:[st({p:[100,114],t:62,aN:{k:[138,158],b:1},aF:{k:[136,158],b:1},lN:{k:[116,181],b:1},lF:{k:[112,181],b:1},d:700}),st({p:[100,114],t:62,aN:{k:[112,132],b:-1},aF:{k:[110,132],b:-1},lN:{k:[116,181],b:1},lF:{k:[112,181],b:1},d:800,hold:1})]},
  remadaUm:{v:'s',m:['costas','braco'],pr:{tras:[OB.cadeiraF(140)],frente:[OB.mochila('aN',0,0)]},k:[st({p:[96,112],t:70,aF:{k:[150,138],b:1},aN:{k:[132,165],b:1},lN:{k:[100,181],b:1},lF:{k:[88,181],b:1},d:700}),st({p:[96,112],t:70,aF:{k:[150,138],b:1},aN:{k:[108,138],b:-1},lN:{k:[100,181],b:1},lF:{k:[88,181],b:1},d:800,hold:1})]},
  remadaMesa:{v:'s',m:['costas','braco'],pr:{tras:[OB.mesa(30,120)]},k:[Object.assign(reto([178,182],174,76,{h:0,aN:{k:[62,121],b:-1},aF:{k:[60,121],b:-1},lN:{k:[178,182],b:-1},lF:{k:[176,182],b:-1},fN:170,fF:170,d:700})),Object.assign(reto([178,182],152,76,{h:0,aN:{k:[62,121],b:-1},aF:{k:[60,121],b:-1},lN:{k:[178,182],b:-1},lF:{k:[176,182],b:-1},fN:170,fF:170,d:800,hold:1}))]},
  superman:{v:'s',m:['costas','gluteo'],k:[{p:[95,177],t:90,h:0,aN:[91,0],aF:[93,0],lN:[-89,0],lF:[-91,0],fN:-90,fF:-90,d:700},{p:[95,177],t:80,h:-8,aN:[106,0],aF:[108,0],lN:[-101,0],lF:[-103,0],fN:-100,fF:-100,d:900,hold:1}]},
  supermanAlt:{v:'s',m:['costas','gluteo'],k:[{p:[95,177],t:86,aN:[106,0],aF:[91,0],lN:[-89,0],lF:[-102,0],fN:-90,fF:-100,d:700},{p:[95,177],t:86,aN:[91,0],aF:[106,0],lN:[-102,0],lF:[-89,0],fN:-100,fF:-90,d:700}]},
  elevLat:{v:'f',m:['ombro'],pr:{frente:[OB.garrafa('aN'),OB.garrafa('aF')]},k:[fr({aN:[12,5],aF:[12,5],d:700}),fr({aN:[88,5],aF:[88,5],d:800,hold:1})]},
  elevFront:{v:'s',m:['ombro'],pr:{frente:[OB.garrafa('aN')]},k:[st({aN:[5,0],aF:[0,0],d:700}),st({aN:[88,0],aF:[86,0],d:800,hold:1})]},
  desenv:{v:'f',m:['ombro','braco'],pr:{frente:[OB.garrafa('aN'),OB.garrafa('aF')]},k:[fr({aN:[90,90],aF:[90,90],d:700}),fr({aN:[165,15],aF:[165,15],d:800,hold:1})]},
  mergulho:{v:'s',m:['braco','peito'],pr:{tras:[OB.cadeira(52)]},k:[{p:[104,140],t:-4,h:5,aN:{k:[88,139],b:1},aF:{k:[86,139],b:1},lN:{k:[170,181],b:1},lF:{k:[167,181],b:1},d:700},{p:[104,160],t:-4,h:5,aN:{k:[88,139],b:1},aF:{k:[86,139],b:1},lN:{k:[170,181],b:1},lF:{k:[167,181],b:1},d:800}]},
  frances:{v:'s',m:['braco'],pr:{frente:[OB.garrafa('aN')]},k:[st({aN:[178,0],aF:[176,0],d:700}),st({aN:[172,150],aF:[170,150],d:800})]},
  rosca:{v:'s',m:['braco'],pr:{frente:[OB.mochila('aN',0,0)]},k:[st({aN:[3,5],aF:[0,5],d:700}),st({aN:[6,140],aF:[3,140],d:800,hold:1})]},
  martelo:{v:'s',m:['braco','antebraco'],pr:{frente:[OB.garrafa('aN')]},k:[st({aN:[3,5],aF:[0,5],d:700}),st({aN:[6,135],aF:[3,135],d:800,hold:1})]},
  encolhe:{v:'f',m:['ombro'],pr:{frente:[OB.garrafa('aN'),OB.garrafa('aF')]},k:[fr({aN:[6,0],aF:[6,0],d:700}),fr({ss:8,aN:[6,0],aF:[6,0],d:700,hold:1})]},
  cruci:{v:'s',m:['costas','ombro'],pr:{frente:[OB.garrafa('aN')]},k:[st({p:[100,114],t:65,aN:[8,10],aF:[4,10],lN:{k:[116,181],b:1},lF:{k:[112,181],b:1},d:700}),st({p:[100,114],t:65,aN:[-95,20],aF:[-90,20],lN:{k:[116,181],b:1},lF:{k:[112,181],b:1},d:800,hold:1})]},
  // cardio e agilidade
  marcha:{v:'s',m:['coxa'],k:marcha(70,80,450)},
  corrida:{v:'s',m:['coxa','panturrilha'],k:marcha(40,100,280,4)},
  joelhoAlto:{v:'s',m:['coxa','abdomen'],k:marcha(95,95,280,3)},
  lateral:{v:'f',m:['coxa'],k:[fr({d:400}),fr({p:[122,104],lN:{k:[150,181],b:-1},lF:{k:[104,181],b:1},aN:[30,10],aF:[30,10],d:400}),fr({d:400}),fr({p:[98,104],lF:{k:[70,181],b:1},lN:{k:[116,181],b:-1},aN:[30,10],aF:[30,10],d:400})]},
  corridaLat:{v:'f',m:['coxa','gluteo'],k:[fr({p:[96,124],lN:{k:[120,181],b:-1},lF:{k:[74,181],b:1},aN:[35,60],aF:[35,60],d:300}),fr({p:[124,124],lN:{k:[146,181],b:-1},lF:{k:[100,181],b:1},aN:[35,60],aF:[35,60],d:300})]},
  polichinelo:{v:'f',m:['coxa','ombro','panturrilha'],k:[fr({aN:[12,5],aF:[12,5],d:350}),fr({p:[110,98],aN:[165,5],aF:[165,5],lN:{k:[146,168],b:-1},lF:{k:[74,168],b:1},d:350}),fr({p:[110,107],aN:[160,5],aF:[160,5],lN:{k:[146,181],b:-1},lF:{k:[74,181],b:1},d:350}),fr({p:[110,98],aN:[12,5],aF:[12,5],lN:{k:[122,168],b:-1},lF:{k:[98,168],b:1},d:350})]},
  polichineloSem:{v:'f',m:['coxa','ombro'],k:[fr({d:400}),fr({aN:[150,5],aF:[150,5],lN:{k:[150,181],b:-1},d:500}),fr({d:400}),fr({aN:[150,5],aF:[150,5],lF:{k:[70,181],b:1},d:500})]},
  socos:{v:'s',m:['ombro','braco','abdomen'],k:[st({t:4,lN:{k:[128,181],b:1},lF:{k:[94,181],b:1},aN:[92,0],aF:[35,115],d:260}),st({t:4,lN:{k:[128,181],b:1},lF:{k:[94,181],b:1},aN:[35,115],aF:[35,115],d:200}),st({t:4,lN:{k:[128,181],b:1},lF:{k:[94,181],b:1},aF:[92,0],aN:[35,115],d:260}),st({t:4,lN:{k:[128,181],b:1},lF:{k:[94,181],b:1},aN:[35,115],aF:[35,115],d:200})]},
  corda:{v:'f',m:['panturrilha'],pr:{frente:[OB.corda()]},k:[fr({aN:[28,40],aF:[28,40],cy:20,d:220}),fr({p:[110,98],lN:{k:[118,172],b:-1},lF:{k:[102,172],b:1},aN:[28,40],aF:[28,40],cy:194,d:220})]},
  burpee:{v:'s',m:['coxa','peito','abdomen'],k:[st({d:350}),st({p:[96,150],t:62,aN:{k:[140,183],b:-1},aF:{k:[137,183],b:-1},d:350}),Object.assign(reto([40,181],22,76,{h:-15,aN:{k:[140,183],b:-1},aF:{k:[137,183],b:-1},lN:{k:[40,181],b:1},lF:{k:[38,181],b:1},fN:60,fF:60,d:450})),st({p:[96,150],t:62,aN:{k:[140,183],b:-1},aF:{k:[137,183],b:-1},d:350}),st({p:[110,94],aN:[170,0],aF:[165,0],lN:{k:[114,168],b:1},lF:{k:[106,168],b:1},fN:30,fF:30,d:350})]},
  burpeeFlex:{v:'s',m:['coxa','peito','abdomen'],k:[st({d:350}),st({p:[96,150],t:62,aN:{k:[140,183],b:-1},aF:{k:[137,183],b:-1},d:350}),Object.assign(reto([40,181],22,76,{h:-15,aN:{k:[140,183],b:-1},aF:{k:[137,183],b:-1},lN:{k:[40,181],b:1},lF:{k:[38,181],b:1},fN:60,fF:60,d:400})),Object.assign(reto([40,181],9,76,{h:-15,aN:{k:[140,183],b:-1},aF:{k:[137,183],b:-1},lN:{k:[40,181],b:1},lF:{k:[38,181],b:1},fN:60,fF:60,d:400})),st({p:[96,150],t:62,aN:{k:[140,183],b:-1},aF:{k:[137,183],b:-1},d:350}),st({p:[110,94],aN:[170,0],aF:[165,0],lN:{k:[114,168],b:1},lF:{k:[106,168],b:1},fN:30,fF:30,d:350})]},
  escalador:{v:'s',m:['abdomen','coxa','ombro'],k:[Object.assign(reto([40,181],25,76,{h:-15,aN:{k:[156,183],b:-1},aF:{k:[153,183],b:-1},lN:{k:[100,176],b:1},lF:{k:[40,181],b:1},fN:60,fF:60,d:300})),Object.assign(reto([40,181],25,76,{h:-15,aN:{k:[156,183],b:-1},aF:{k:[153,183],b:-1},lF:{k:[100,176],b:1},lN:{k:[40,181],b:1},fN:60,fF:60,d:300}))]},
  rotacao:{v:'f',m:['abdomen'],k:[fr({aN:{k:[90,118],b:-1},aF:{k:[70,122],b:-1},t:-6,d:700}),fr({aN:{k:[150,122],b:1},aF:{k:[130,118],b:1},t:6,d:700})]},
  alonga:{v:'s',m:['coxa','costas'],k:[st({aN:[175,0],aF:[172,0],d:1200,hold:1}),st({p:[98,104],t:105,h:10,aN:[0,0],aF:[0,0],lN:{k:[114,181],b:1},lF:{k:[110,181],b:1},d:1400,hold:1})]},
  ombros:{v:'f',m:['ombro'],k:[fr({aN:[30,110],aF:[30,110],d:500}),fr({aN:[90,90],aF:[90,90],d:500}),fr({aN:[150,60],aF:[150,60],d:500}),fr({aN:[90,90],aF:[90,90],d:500})]}
 };
 // nome do exercício → animação (o começo do nome mais específico vence)
 const NOMES={'Flexão na parede':'flexParede','Flexão com as mãos na mesa':'flexMesa','Flexão com joelhos':'flexJoelho','Flexão tradicional':'flex','Flexão com os pés':'flexPes','Flexão fechada com joelhos':'flexJoelho','Flexão fechada':'flexFechada','Flexão':'flex',
  'Sentar e levantar':'sentar','Agachamento sumô':'sumo','Agachamento com mochila':'agachMochila','Agachamento com salto':'agachSalto','Agachamento rápido':'agachRapido','Agachamento':'agach',
  'Afundo parado':'afundoCad','Afundo para trás':'afundoTras','Afundo com mochila':'afundoMochila','Afundo':'afundo','Passo para trás':'afundoTras',
  'Ponte de glúteo com uma perna':'ponteUma','Ponte de glúteo com os pés':'ponteSofa','Ponte de glúteo com mochila':'ponteMochila','Ponte de glúteo':'ponte',
  'Panturrilha no degrau':'pantuDegrau','Panturrilha':'pantu',
  'Abdominal bicicleta':'bici','Abdominal tesoura':'tesoura','Abdominal':'abd',
  'Prancha lateral':'pranchaLat','Prancha com joelhos':'pranchaJ','Prancha com toque':'toque','Prancha':'prancha',
  'Remada curvada':'remada','Remada com um braço':'remadaUm','Remada deitado':'remadaMesa','Remada':'remada',
  'Superman alternado':'supermanAlt','Superman':'superman',
  'Elevação lateral':'elevLat','Elevação frontal':'elevFront','Desenvolvimento':'desenv',
  'Tríceps na cadeira':'mergulho','Tríceps francês':'frances','Rosca martelo':'martelo','Rosca':'rosca','Encolhimento':'encolhe','Crucifixo invertido':'cruci',
  'Marcha':'marcha','Caminhada':'marcha','Aquecimento':'ombros','Finalização':'alonga','Alongamento':'alonga',
  'Passos laterais':'lateral','Corrida lateral':'corridaLat','Corrida com joelho alto':'joelhoAlto','Corrida parada':'corrida',
  'Polichinelo sem salto':'polichineloSem','Polichinelo':'polichinelo','Socos no ar':'socos','Pular corda':'corda',
  'Burpee com flexão':'burpeeFlex','Burpee':'burpee','Escalador':'escalador','Rotação':'rotacao','Círculos':'ombros','Alongamento de quadril':'alonga'};
 const NK=Object.keys(NOMES).sort((a,b)=>b.length-a.length);
 const idDe=n=>{n=String(n||'');const t=[n].concat(n.indexOf(': ')>0?[n.slice(n.indexOf(': ')+2)]:[]);for(const v of t){const k=NK.find(x=>v.indexOf(x)===0);if(k&&!(v===n&&n.indexOf(': ')>0&&!/^(Aquecimento|Finalização)/.test(n)))return NOMES[k]}return ''};
 const quadro=(id,ms)=>{const X=A[id];if(!X)return '';const P=poseAt(X,ms);if(P.s){}
  return '<line x1="0" y1="'+(G+1)+'" x2="220" y2="'+(G+1)+'" stroke="#3a3560" stroke-width="2"/>'+desenha(fk(P),X.m,X.pr||{},P)};
 return {A,idDe,quadro,svg(nome,cls){const id=idDe(nome);if(!id)return '';return '<svg class="exa '+(cls||'')+'" data-a="'+id+'" viewBox="0 0 220 196" role="img" aria-label="Animação: '+String(nome).replace(/"/g,'')+'">'+quadro(id,0)+'</svg>'}};
})();
// laço único de animação: só roda com boneco na tela e com o app visível
(function(){let t0=performance.now(),ult=0;function f(t){requestAnimationFrame(f);if(document.hidden||t-ult<33)return;ult=t;const L=document.querySelectorAll('svg.exa');if(!L.length)return;
 const rf=(typeof Cfg!=='undefined'&&Cfg.rfx&&Cfg.rfx());L.forEach(s=>{const id=s.getAttribute('data-a'),ms=rf?Math.floor((t-t0)/1600)*1600:(t-t0);s.innerHTML=EXA.quadro(id,ms)})}
 requestAnimationFrame(f)})();
