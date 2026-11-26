
/* ===== Prova de Ascensão ===== */
function provaInit(){if(S.provaD==null){let ok=0;try{ok=lvlRaw(totalXp())>=10&&(S.lvShown||0)>=10}catch(e){}S.provaD=ok?1:0}}
function pvReady(){try{return S.provaD!==1&&lvlRaw(totalXp())>=10}catch(e){return false}}
function pvEnsure(){const p=S.pv;if(!p||p.day!==S.day)S.pv={day:S.day,st:0,ck:{},m1:(p&&p.m1)||'',m2:(p&&p.m2)||'',retry:!!(p&&p.st>0),say:''}}
function pvOpen(){pvEnsure();S.pvo=1;S.top=true;render()}
function pvClose(){S.pvo=0;S.top=true;render()}
function pvGo(n){pvEnsure();S.pv.st=n;S.pv.say='';render()}
function pvNext(n,say){S.pv.st=n;S.pv.say=say||'';render()}
function pvCk(i){S.pv.ck[i]=!S.pv.ck[i];render()}
function pvTxt(k,v){S.pv[k]=v;const b=document.getElementById('pvgo');if(b)b.disabled=!(S.pv.m1.trim().length>=15&&S.pv.m2.trim().length>=15)}
function pvPass(){S.provaD=1;S.pvo=0;S.pvAt=S.day;try{beep()}catch(e){}S.top=true;render()}
function pvCorpo(){const pn=(S.a&&S.a.pain)||0,l=Math.min(2,S.lvl||0);
 if(pn>=2)return{light:1,it:['Alongue pescoço e ombros, 30 segundos de cada lado','Faça 10 círculos lentos com os ombros','Caminhe devagar no lugar por 2 minutos']};
 const R=[[10,8,20],[15,10,30],[20,15,45]][l];
 return{light:0,it:[R[0]+' agachamentos, no seu ritmo',R[1]+' flexões'+(l===0?', com apoio dos joelhos se precisar':', ou a versão que você consegue'),'Prancha por '+R[2]+' segundos, ou o tempo que conseguir']}}
function pvCard(){if(!pvReady())return '';const go=S.pv&&S.pv.day===S.day&&S.pv.st>0;
 return '<div class="card pvcard"><div class="pvci pvp"></div><div class="pvct"><span class="g">Prova de Ascensão</span><b>O portão do rank D está à sua frente</b><p class="note">Seu XP do rank E está completo. Corpo, mente e disciplina, no mesmo dia. Se não der hoje, você não perde nada.</p><button class="mb on" onclick="pvOpen()">'+(go?'Continuar a prova':'Começar a prova')+'</button></div></div>'}
function pvView(){const p=S.pv,st=p.st,cls=['pvp','pvc','pvm','pvd'][st],nm=esc(S.name||'');
 const lv=Array.from({length:9},()=>'<i class="lf" style="left:'+Math.round(Math.random()*100)+'%;--d:'+(8+Math.random()*7).toFixed(1)+'s;--w:'+(Math.random()*60-30).toFixed(0)+'px;--s:'+(.6+Math.random()*.8).toFixed(2)+';animation-delay:-'+(Math.random()*12).toFixed(1)+'s"></i>').join('');
 const K='<span class="g">Kaien</span>',say=p.say?'<p class="pvs">“'+esc(p.say)+'” '+K+'</p>':'';
 let h='',b='';
 if(st===0){h='<span class="g">Prova de Ascensão</span><b>O portão do rank D</b>';
  b=(p.retry?'<p class="pvs">Voltou, '+nm+'. Sem pressa, e você não perdeu nada do que conquistou. '+K+'</p>':'')+'<p>“Você chegou ao limite do rank E. Para cruzar o portão, preciso ver o que o treino fez de você. Corpo, mente e disciplina, no mesmo dia. Responda como você é, e não como gostaria de ser.” '+K+'</p><button class="cta" onclick="pvGo(1)">Começar a prova</button><button class="lk" onclick="pvClose()">Agora não</button>'}
 else if(st===1){const c=pvCorpo(),ok=c.it.every((x,i)=>p.ck[i]);h='<span class="g">Prova 1 de 3 · Corpo</span><b>O que o seu corpo aprendeu</b>';
  b='<p>“'+(c.light?'Hoje o seu corpo pede cuidado. A prova é de movimento, não de força. Faça com calma, e conta do mesmo jeito.':'Mostre o que o seu corpo aprendeu. Faça no seu ritmo.')+'” '+K+'</p><div class="pvl">'+c.it.map((x,i)=>'<button class="pvk'+(p.ck[i]?' on':'')+'" onclick="pvCk('+i+')"><i>'+(p.ck[i]?'✓':'')+'</i><span>'+esc(x)+'</span></button>').join('')+'</div><p class="note">Pare se algo doer. Parar também conta como cuidar de si.</p><button class="cta" '+(ok?'':'disabled')+' onclick="pvNext(2,\'Muito bem. O corpo respondeu.\')">Continuar</button><button class="lk" onclick="pvClose()">Voltar</button>'}
 else if(st===2){const ok=p.m1.trim().length>=15&&p.m2.trim().length>=15;h='<span class="g">Prova 2 de 3 · Mente</span><b>O silêncio</b>';
  b=say+'<p>“Agora o silêncio. Escreva com as suas palavras.” '+K+'</p><label>O que mudou em você desde o primeiro dia?<textarea maxlength="400" oninput="pvTxt(\'m1\',this.value)">'+esc(p.m1)+'</textarea></label><label>Qual foi o dia em que você mais quis desistir? O que te trouxe de volta?<textarea maxlength="400" oninput="pvTxt(\'m2\',this.value)">'+esc(p.m2)+'</textarea></label><p class="note">Escreva com calma. Se hoje estiver pesado demais, o CVV atende no 188, a qualquer hora.</p><button id="pvgo" class="cta" '+(ok?'':'disabled')+' onclick="pvNext(3,\'Eu li. Fiquei em silêncio por um instante, porque isso valeu.\')">Continuar</button><button class="lk" onclick="pvClose()">Voltar</button>'}
 else{h='<span class="g">Prova 3 de 3 · Disciplina</span><b>A palavra</b>';
  b=say+'<p>“A última prova não tem esforço, tem palavra. No rank D o caminho fica mais difícil. Você se compromete a continuar?” '+K+'</p><div class="pvq">Eu me comprometo a voltar ao caminho, mesmo nos dias em que não tiver vontade.</div><button class="cta" onclick="pvPass()">Eu me comprometo</button><button class="lk" onclick="pvClose()">Voltar</button>'}
 return '<div class="pv"><div class="pvi '+cls+'"></div>'+lv+'<div class="pvt">'+h+b+'</div></div>'}

/* ===== subida para o rank D (7 atos) ===== */
function rankDView(){const mu=String(RM[1]).replace('.',','),nm=esc(S.name||'');
 const sp=Array.from({length:30},()=>'<i class="rkp" style="left:'+Math.round(Math.random()*100)+'%;animation-delay:'+(5.6+Math.random()*4).toFixed(1)+'s;--h:'+(60+Math.random()*180).toFixed(0)+'px"></i>').join('');
 return '<div class="rdc sh" style="--rc:190,150,255"><button class="rks" onclick="rankClose()">Pular</button><div class="rdg pvp"></div><div class="rds fsub"></div><div class="rdx"><i></i></div><div class="rdxl">XP COMPLETO · PROVA CUMPRIDA</div><div class="rdcr"></div><div class="rdfl"></div><div class="rdem"><div class="rdp s1 emE"></div><div class="rdp s2 emE"></div><div class="rdp s3 emE"></div><div class="rdp s4 emE"></div><div class="rdr2"></div><div class="rdd emD"></div></div>'+sp+'<div class="rdk kemo"></div><p class="rdsay"><span class="g">Kaien</span><br>“Eu esperei muito para dizer isto, '+nm+': seja bem-vindo ao rank D.”</p><div class="rdtt"><span class="g">NOVO TÍTULO</span><b class="rdti">Aspirante</b><div class="rdch"><span>×'+mu+' de XP nas missões, a partir de amanhã</span><span>Roupa nova do rank D, já equipada</span><span>Título Aspirante, já equipado</span></div><button class="cta" onclick="rankClose()">Continuar</button></div></div>'}
function rdSfx(){clearRdT();window._rdT=[setTimeout(()=>{try{beep();if(navigator.vibrate)navigator.vibrate([60,40,180])}catch(e){}},3000),setTimeout(()=>{try{beep();if(navigator.vibrate)navigator.vibrate([40,30,40,30,260])}catch(e){}},5500),setTimeout(()=>{try{beep()}catch(e){}},11400)]}
function clearRdT(){(window._rdT||[]).forEach(clearTimeout);window._rdT=[]}