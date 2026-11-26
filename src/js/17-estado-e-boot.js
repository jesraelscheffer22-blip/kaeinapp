function quick(){reset();S.name='Aluno';S.age=28;S.h=175;S.w=75;
 S.a={mov:2,flex:3,breath:2,block:0,pain:0,sleep:2,fh:2,fd:2,rd:2,rb:2,trig:0,ctrl:0,want:0,last:2,why:1,goal:0};
 S.sc={en:3,mo:3,te:2,ir:2};S.pull=['Celular e redes sociais','Jogos'];S.lvl=1;S.tab='ini';S.ms={};S.day=1;S.hist=[];S.progAcc={};S.xpPrev=0;S.g=null;S.cel=null;S.fast=false;S.dg=null;S.dgAll={};S.bi=null;S.bossSeen={};S.dgHist=[];S.dgDone=0;S.wd=[0,2,4];S.wd0=0;S.ov={};S.wdMsg='';S.eq={aura:0,pose:0,bg:0,tone:0,frame:0,title:''};S.mhp={};S.defeated={};runMigs();
 S.i=steps.findIndex(s=>s.t==='day1');render()}
function _clk(){const e=document.getElementById('clk');if(e){const d=new Date();e.textContent=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}}_clk();setInterval(_clk,10000);
function _iso(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function _save(){try{localStorage.setItem('kaien.v1',JSON.stringify(Object.assign({},S,{g:null,cel:null,react:null,bkEnc:null,bkImp:null,bkTxt:null})))}catch(e){}}
function _sync(){if(!S||steps[S.i].t!=='day1')return;const t=_iso();if(!S.lastDate){S.lastDate=t;S.wd0=(new Date().getDay()+6)%7;return}
 const a=S.lastDate.split('-').map(Number),b=t.split('-').map(Number),n=Math.round((Date.UTC(b[0],b[1]-1,b[2])-Date.UTC(a[0],a[1]-1,a[2]))/864e5);
 S.lastDate=t;for(let k=0;k<Math.min(n,60);k++)nextDay()}
const _r=render;render=function(){_r();if(S&&steps[S.i]&&steps[S.i].t==='day1'&&!S.lastDate){S.lastDate=_iso();S.wd0=(new Date().getDay()+6)%7}_save()};
function _mig(){S.eq=S.eq||{aura:0,pose:0,bg:0,tone:0,frame:0,title:''};S.mhp=S.mhp||{};S.defeated=S.defeated||{};S.px=S.px||{};S.kread=S.kread||{};S.wdr=S.wdr||{};S.tp=S.tp||{};S.dia=S.dia||[];if(!Array.isArray(S.hist))S.hist=[];if(!S.ms||typeof S.ms!=='object')S.ms={};if(!S.progAcc||typeof S.progAcc!=='object')S.progAcc={};if(!S.ov||typeof S.ov!=='object')S.ov={};if(!Array.isArray(S.wd))S.wd=[];if(!Array.isArray(S.dia))S.dia=[];if(!S.a||typeof S.a!=='object')S.a={};S.rd=null;S.kst=null;S.dv=0;S.mv=0;S.g=null;S.cel=null;delete S.rk;runMigs();S.ver=5}
(function(){let ok=false,raw=null;try{raw=localStorage.getItem('kaien.v1');if(raw){S=JSON.parse(raw);const _v=S.ver;_mig();if(_v!==5){try{localStorage.setItem('kaien.v1.bak',raw)}catch(e2){}}ok=true}}catch(e){}
 if(ok){try{_sync();render()}catch(e){try{localStorage.setItem('kaien.v1.bak',raw)}catch(e2){}try{_mig();S.tab='ini';S.top=true;render()}catch(e3){reset()}}}else reset()})();