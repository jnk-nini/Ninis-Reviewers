(function(){
"use strict";
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const tname=t=>TOPICS[t].short;
const DAY=864e5;

/* ---------- storage (safe) ---------- */
const KEY="jpl-midterm-reviewer-v1";
let S={mastery:{},cards:{},wrong:{},best:{},theme:null,lastTopic:"k"};
try{S=Object.assign(S,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function addMastery(t,c){const m=S.mastery[t]||(S.mastery[t]={c:0,a:0});m.a++;m.c+=c;save()}

/* ---------- answer checking (accents/ñ, case, punctuation ignored; small typos allowed) ---------- */
const norm=s=>String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[–—]/g,"-").replace(/^(ang|ng|si|ni|sa|the|a|an)\s+/,"").replace(/[^a-z0-9]/g,"");
function lev(a,b){const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]}
function checkText(inp,acc){const u=norm(inp);if(!u)return false;
  return acc.some(a=>{const n=norm(a);if(!n)return false;if(u===n)return true;const tol=n.length>=12?2:n.length>=5?1:0;return tol>0&&Math.abs(u.length-n.length)<=tol&&lev(u,n)<=tol})}
function containsAny(text,alts){const t=norm(text);return alts.some(a=>{const n=norm(a);return n.length>=3&&t.includes(n)})}

/* ---------- data objects ---------- */
const FACT_OBJ=FACTS.map(f=>({t:f[0],term:f[1],def:f[2],clue:f[3],alts:f[4],sl:f[5],id:"c:"+f[1]}));
function accepted(f){const a=[f.term,...f.alts];const nop=f.term.replace(/\s*\(.*?\)\s*/g," ").trim();if(nop!==f.term)a.push(nop);return a}

/* ---------- question builders ---------- */
function factMC(f){
  let pool=FACT_OBJ.filter(x=>x!==f&&x.t===f.t&&norm(x.term)!==norm(f.term));
  if(pool.length<3)pool=pool.concat(FACT_OBJ.filter(x=>x.t!==f.t));
  const wrong=shuffle(pool).slice(0,3).map(x=>x.term);
  return{type:"mc",topic:f.t,q:"Which term matches this description?<span class='defq'>"+esc(f.def)+"</span>",choices:shuffle([f.term].concat(wrong)),correct:f.term,clue:f.clue,explain:"<b>"+esc(f.term)+"</b>: "+esc(f.def),sl:f.sl,key:"f:"+f.term}}
function authMC(m){return{type:"mc",topic:m[0],q:esc(m[1]),choices:shuffle([m[2]].concat(m[3])),correct:m[2],clue:m[4],explain:esc(m[5]),sl:m[6],key:"m:"+m[1]}}
function factID(f){return{type:"id",topic:f.t,q:"Identify:<span class='defq'>"+esc(f.def)+"</span>",answers:accepted(f),show:f.term,clue:f.clue,explain:"<b>"+esc(f.term)+"</b>: "+esc(f.def),sl:f.sl,hint:"Type the name or term (spelling and accents are forgiving)",key:"i:"+f.term}}
function fillQ(x){const ans=x[2][0];const q=esc(x[1]).replace("___","<span class='blank'>&nbsp;</span>");
  return{type:"fill",topic:x[0],q,answers:x[2],show:ans,clue:x[3],explain:esc(x[1]).replace("___","<b>"+esc(ans)+"</b>"),sl:x[4],hint:"Type the missing word, name, or number",key:"b:"+x[1]}}
function tfQ(x){return{type:"tf",topic:x[0],q:esc(x[1]),choices:["Tama","Mali"],correct:x[2]?"Tama":"Mali",clue:x[4],explain:"<b>"+(x[2]?"Tama.":"Mali.")+"</b> "+esc(x[3]),sl:x[5],key:"t:"+x[1]}}
function enumQ(x){const items=x[2].map(s=>s.split("|"));
  return{type:"enum",topic:x[0],q:"Enumerate: "+esc(x[1]),items,show:items.map(a=>a[0]).join(", "),clue:x[3],explain:"<b>Answer:</b> "+esc(items.map(a=>a[0]).join(", ")),sl:x[4],hint:"One item per line, or separate with commas. Order does not matter.",key:"e:"+x[1]}}
function orderQs(topics){
  const ev=TL.filter(e=>topics.has(e[0]));if(ev.length<3)return[];
  const n=Math.min(ev.length-2,15),out=[],seen=new Set();
  for(let tries=0;out.length<n&&tries<200;tries++){
    const k=Math.min(4,ev.length),set=shuffle(ev).slice(0,k);
    if(new Set(set.map(e=>e[2])).size<k)continue;
    const sig=set.map(e=>e[2]).sort().join("|");if(seen.has(sig))continue;seen.add(sig);
    const sorted=set.slice().sort((a,b)=>a[2]<b[2]?-1:1);
    const tcount={};set.forEach(e=>tcount[e[0]]=(tcount[e[0]]||0)+1);
    const topic=Object.keys(tcount).sort((a,b)=>tcount[b]-tcount[a])[0];
    out.push({type:"order",topic,q:"Put these events in order, from <b>earliest</b> to <b>latest</b>.",events:shuffle(set),sorted,
      clue:"Hint: "+sorted[0][3].slice(0,60)+"… happened first.",
      explain:"<ol style='margin:4px 0;padding-left:20px'>"+sorted.map(e=>"<li><b>"+esc(e[1])+"</b> — "+esc(e[3])+"</li>").join("")+"</ol>",
      sl:sorted.map(e=>e[4]).join(", "),key:"o:"+sig,show:sorted.map(e=>e[1]).join(" → ")})}
  return out}
const POOLS={
  mc:t=>MC.filter(m=>t.has(m[0])).map(authMC).concat(FACT_OBJ.filter(f=>t.has(f.t)).map(factMC)),
  tf:t=>TF.filter(x=>t.has(x[0])).map(tfQ),
  id:t=>FACT_OBJ.filter(f=>t.has(f.t)).map(factID),
  fill:t=>FILL.filter(x=>t.has(x[0])).map(fillQ),
  enum:t=>ENUM.filter(x=>t.has(x[0])).map(enumQ),
  order:t=>orderQs(t)
};
const FORMATS={
  mixed:{name:"Mixed",d:"A bit of everything (best for exams)",icon:"🎲"},
  mc:{name:"Multiple choice",d:"Pick A, B, C, or D",icon:"🔤"},
  tf:{name:"Tama o Mali",d:"Is the statement correct?",icon:"✅"},
  id:{name:"Identification",d:"Read the description, type the answer",icon:"🔎"},
  fill:{name:"Fill in the blank",d:"Complete the sentence",icon:"✏️"},
  enum:{name:"Enumeration",d:"List all the items",icon:"📋"},
  order:{name:"Timeline order",d:"Arrange events by date",icon:"🗓️"}
};
const TYPE_NAME={mc:"Multiple choice",tf:"Tama o Mali",id:"Identification",fill:"Fill in the blank",enum:"Enumeration",order:"Timeline order"};
function available(fmt,topics){return fmt==="mixed"?Object.keys(POOLS).reduce((a,k)=>a+POOLS[k](topics).length,0):POOLS[fmt](topics).length}
function buildQuestions(fmt,n,topics){
  if(fmt!=="mixed")return shuffle(POOLS[fmt](topics)).slice(0,n);
  const types=Object.keys(POOLS),pools=types.map(k=>shuffle(POOLS[k](topics)));
  const out=[];let i=0;while(out.length<n&&pools.some(p=>p.length)){const p=pools[i%types.length];if(p.length)out.push(p.pop());i++}
  return shuffle(out)}
function allQuestionsByKey(){const all=new Set(TK),m={};Object.keys(POOLS).filter(k=>k!=="order").forEach(k=>POOLS[k](all).forEach(q=>m[q.key]=q));return m}

/* ---------- views ---------- */
const VIEWS=["home","notes","tline","gloss","setup","quiz","results","flash","rcards","dump","essay"];
let cur="home";
function show(v){cur=v;VIEWS.forEach(x=>$("#v-"+x).hidden=x!==v);window.scrollTo({top:0});if(v==="home")renderHome()}
document.addEventListener("click",e=>{if(e.target.closest("[data-home]"))show("home")});
$("#goHome").onclick=()=>show("home");

/* theme */
function isDark(){return S.theme?S.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches}
function applyTheme(){if(S.theme)document.documentElement.setAttribute("data-theme",S.theme);else document.documentElement.removeAttribute("data-theme");$("#thmBtn").textContent=isDark()?"☀️":"🌙"}
$("#thmBtn").onclick=()=>{S.theme=isDark()?"light":"dark";save();applyTheme()};

/* ---------- home ---------- */
function mastery(t){const m=S.mastery[t];if(!m||!m.a)return 0;return Math.round(m.c/m.a*Math.min(m.a,15)/15*100)}
function dueCards(topics){const now=Date.now();return FACT_OBJ.filter(f=>(!topics||topics.has(f.t))&&S.cards[f.id]&&S.cards[f.id].due<=now)}
function renderHome(){
  const v=TK.map(mastery),avg=Math.round(v.reduce((a,b)=>a+b,0)/TK.length);
  $("#ring").style.setProperty("--p",avg);$("#ringPct").textContent=avg+"%";
  $("#mast").innerHTML=TK.map((t,i)=>"<div class='mrow tp-"+t+"'><span>"+TOPICS[t].icon+" "+tname(t)+"</span><span class='tr'><i style='width:"+v[i]+"%'></i></span><span>"+v[i]+"%</span></div>").join("");
  const d=dueCards().length;$("#dueBadge").hidden=!d;$("#dueBadge").textContent=d+" due";
  const w=Object.keys(S.wrong).length;$("#missBadge").hidden=!w;$("#missBadge").textContent=w+" to redo";
  $("#contBtn").textContent=Object.keys(S.mastery).length?"Continue studying ▶":"Start studying ▶"}
$("#resetBtn").onclick=e=>{const b=e.currentTarget;if(b.dataset.arm){S.mastery={};S.cards={};S.wrong={};S.best={};save();delete b.dataset.arm;b.textContent="Reset progress";renderHome()}
  else{b.dataset.arm="1";b.textContent="Tap again to erase all progress";setTimeout(()=>{delete b.dataset.arm;b.textContent="Reset progress"},3000)}};
document.addEventListener("click",e=>{const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;
  if(a==="notes"||a==="continue"){if(a==="continue"&&!S.lastTopic)S.lastTopic="k";renderNotes();show("notes")}
  else if(a==="tline"){renderTL();show("tline")}
  else if(a==="gloss"){renderGloss();show("gloss")}
  else if(a==="flash"||a==="drill"||a==="quiz"||a==="rcards")openSetup(a);
  else if(a==="dump"){renderDump();show("dump")}
  else if(a==="essay"){renderEssay();show("essay")}
  else if(a==="exam")startQuiz("quiz","mixed",50,new Set(TK),"Full mock exam");
  else if(a==="weak"){let w=TK[0],lo=1e9;TK.forEach(t=>{const x=mastery(t)+Math.random();if(x<lo){lo=x;w=t}});startQuiz("drill","mixed",10,new Set([w]),"Weak spot: "+tname(w))}
  else if(a==="mistakes"){const m=allQuestionsByKey(),list=Object.keys(S.wrong).map(k=>m[k]).filter(Boolean);
    if(!list.length){alert("No saved mistakes yet. Take a drill or quiz first. 🌱");return}
    startQuiz("drill","mixed",list.length,new Set(TK),"My mistakes",shuffle(list).map(q=>q.choices?Object.assign({},q,{choices:shuffle(q.choices)}):q))}});

/* ---------- notes ---------- */
let cover=false;
function noteCards(t){return NOTES[t].map((s,i)=>"<details class='sec card tp-"+t+(cover?" recall-cover":"")+"'"+(i===0||cover?" open":"")+"><summary><span>"+esc(s.h)+"</span><span class='chip sl'>Slide "+s.sl+"</span></summary><div class='body'>"+s.b+"</div></details>").join("")}
function renderNotes(){
  const t=S.lastTopic||"k";
  $("#tnav").innerHTML="<button class='pill' aria-pressed='"+(t==="all")+"' data-nt='all'>📚 All lessons</button>"+TK.map((k,i)=>"<button class='pill tp tp-"+k+"' aria-pressed='"+(k===t)+"' data-nt='"+k+"'>"+(i+1)+". "+TOPICS[k].icon+" "+tname(k)+"</button>").join("");
  $("#coverBtn").setAttribute("aria-pressed",cover);
  const topics=t==="all"?TK:[t];
  $("#notesList").innerHTML=(cover?"<p class='howto'>🙈 Cover mode: try to say the points out loud first, then tap a card to reveal it.</p>":"")+topics.map(k=>"<div class='topic-h tp-"+k+"'><span class='chip'>Lesson "+(TK.indexOf(k)+1)+"</span><h3>"+TOPICS[k].icon+" "+esc(TOPICS[k].n)+"</h3></div>"+noteCards(k)+
    "<div class='row' style='margin:6px 0 18px'><button class='btn pri' data-quick='"+k+"'>Quick drill on this lesson ▶</button><button class='btn' data-qrecall='"+k+"'>🧠 Recall cards</button></div>").join("")+
    (t!=="all"&&TK.indexOf(t)<TK.length-1?"<div class='row' style='justify-content:flex-end'><button class='btn' data-nt='"+TK[TK.indexOf(t)+1]+"'>Next lesson: "+tname(TK[TK.indexOf(t)+1])+" →</button></div>":"")}
$("#v-notes").addEventListener("click",e=>{
  const n=e.target.closest("[data-nt]");if(n){S.lastTopic=n.dataset.nt;save();renderNotes();window.scrollTo({top:0});return}
  const q=e.target.closest("[data-quick]");if(q){startQuiz("drill","mixed",10,new Set([q.dataset.quick]),"Quick drill: "+tname(q.dataset.quick));return}
  const r=e.target.closest("[data-qrecall]");if(r){startRecall(new Set([r.dataset.qrecall]),15);return}
  const c=e.target.closest(".recall-cover .body");if(c){c.parentElement.classList.toggle("peek")}});
$("#coverBtn").onclick=()=>{cover=!cover;renderNotes()};

/* ---------- timeline ---------- */
let tlT="all";
function renderTL(){
  $("#tlTopics").innerHTML="<button class='pill' aria-pressed='"+(tlT==="all")+"' data-tt='all'>📚 All lessons</button>"+TK.filter(t=>TL.some(e=>e[0]===t)).map(t=>"<button class='pill tp tp-"+t+"' aria-pressed='"+(tlT===t)+"' data-tt='"+t+"'>"+TOPICS[t].icon+" "+tname(t)+"</button>").join("");
  const list=TL.filter(e=>tlT==="all"||e[0]===tlT).slice().sort((a,b)=>a[2]<b[2]?-1:1);
  $("#tlCount").textContent=list.length+" dates";
  $("#tlList").innerHTML=list.map(e=>"<div class='tli card tp-"+e[0]+"'><div class='d'>"+esc(e[1])+"</div><p>"+esc(e[3])+"</p><span class='chip'>"+tname(e[0])+"</span> <span class='chip sl'>Slide "+e[4]+"</span></div>").join("")}
$("#tlTopics").onclick=e=>{const b=e.target.closest("[data-tt]");if(b){tlT=b.dataset.tt;renderTL()}};
$("#tlDrill").onclick=()=>{const t=tlT==="all"?new Set(TK):new Set([tlT]);const qs=POOLS.order(t);if(qs.length)startQuiz("drill","order",Math.min(8,qs.length),t,"Timeline practice");else alert("This lesson has too few dates for ordering. Pick “All lessons”.")};

/* ---------- glossary ---------- */
let glT="all";
function renderGloss(){
  $("#glTopics").innerHTML="<button class='pill' aria-pressed='"+(glT==="all")+"' data-gt='all'>📚 All lessons</button>"+TK.map(t=>"<button class='pill tp tp-"+t+"' aria-pressed='"+(glT===t)+"' data-gt='"+t+"'>"+TOPICS[t].icon+" "+tname(t)+"</button>").join("");
  const q=$("#glSearch").value.trim();const nq=q.toLowerCase();
  const list=FACT_OBJ.filter(f=>(glT==="all"||f.t===glT)&&(!nq||(f.term+" "+f.def+" "+f.alts.join(" ")).toLowerCase().includes(nq))).sort((a,b)=>a.term.localeCompare(b.term,"fil"));
  const hl=s=>{s=esc(s);if(!q)return s;const eq=esc(q);const i=s.toLowerCase().indexOf(eq.toLowerCase());return i<0?s:s.slice(0,i)+"<mark>"+s.slice(i,i+eq.length)+"</mark>"+s.slice(i+eq.length)};
  $("#glCount").textContent=list.length+" term"+(list.length===1?"":"s");
  $("#glList").innerHTML=list.length?list.map(f=>"<div class='gi card tp-"+f.t+"'><b>"+hl(f.term)+"</b><p>"+hl(f.def)+"</p><span class='chip'>"+tname(f.t)+"</span> <span class='chip sl'>Slide "+f.sl+"</span></div>").join(""):"<p class='muted'>No match. Try another word.</p>"}
$("#glTopics").onclick=e=>{const b=e.target.closest("[data-gt]");if(b){glT=b.dataset.gt;renderGloss()}};
$("#glSearch").oninput=renderGloss;

/* ---------- setup ---------- */
let SET={mode:"drill",fmt:"mixed",count:10,topics:new Set(TK)};
const MODES={
  drill:{t:"🎯 Drill",s:"You see if you are right after every answer.",b:"Start drill ▶"},
  quiz:{t:"📝 Mock quiz",s:"Answers are shown only at the end, like a real exam.",b:"Start quiz ▶"},
  flash:{t:"🃏 Flashcards",s:"Flip a card, then sort it into “know” or “still learning”.",b:"Start flipping ▶"},
  rcards:{t:"🧠 Recall cards",s:"Answer from memory first, then rate yourself. Missed cards come back sooner.",b:"Start recall ▶"}
};
function openSetup(mode){SET.mode=mode;const M=MODES[mode];
  $("#setupTitle").textContent=M.t;$("#setupSub").textContent=M.s;$("#startBtn").textContent=M.b;
  $("#fmtBox").hidden=mode==="flash"||mode==="rcards";
  $("#topicH").textContent=($("#fmtBox").hidden?"1. ":"2. ")+"Lessons";
  $("#countH").firstChild.textContent=($("#fmtBox").hidden?"2. ":"3. ")+"How many items? ";
  $("#setupNote").innerHTML=mode==="rcards"?"🧠 <b>How it works:</b> read the description, answer in your head (or type it), then tap <b>Show answer</b> and rate yourself honestly. Cards due for review come first.":mode==="flash"?"💡 Tap the card to flip it. Be honest: “still learning” cards are shown again at the end.":"💡 Every question has a <b>clue</b>. Using a clue gives half points, so try first!";
  renderSetup();show("setup")}
function maxFor(){return SET.mode==="flash"||SET.mode==="rcards"?FACT_OBJ.filter(f=>SET.topics.has(f.t)).length:available(SET.fmt,SET.topics)}
function renderSetup(){
  $("#fmts").innerHTML=Object.keys(FORMATS).map(k=>"<button class='fmt' aria-pressed='"+(SET.fmt===k)+"' data-fmt='"+k+"'><b>"+FORMATS[k].icon+" "+FORMATS[k].name+"</b><span>"+FORMATS[k].d+"</span></button>").join("");
  $("#topicPills").innerHTML="<button class='pill' aria-pressed='"+(SET.topics.size===TK.length)+"' data-topic='all'>📚 All lessons combined</button>"+TK.map((t,i)=>"<button class='pill tp tp-"+t+"' aria-pressed='"+SET.topics.has(t)+"' data-topic='"+t+"'>"+(i+1)+". "+TOPICS[t].icon+" "+tname(t)+"</button>").join("");
  const max=maxFor();
  if(SET.count>max)SET.count=Math.max(1,max);
  const opts=[5,10,15,20,30,50].filter(n=>n<max);
  $("#countPills").innerHTML=opts.map(n=>"<button class='pill' aria-pressed='"+(SET.count===n)+"' data-count='"+n+"'>"+n+"</button>").join("")+"<button class='pill' aria-pressed='"+(SET.count===max)+"' data-count='"+max+"'>All ("+max+")</button>";
  $("#countIn").value=SET.count;$("#countIn").max=max;
  $("#availNote").textContent=SET.topics.size?max+" available":"pick at least one lesson";
  if(SET.mode==="rcards"&&SET.topics.size){const d=dueCards(SET.topics).length;if(d)$("#availNote").textContent+=" · "+d+" due for review"}
  $("#startBtn").disabled=!SET.topics.size||max<1}
$("#fmts").onclick=e=>{const b=e.target.closest("[data-fmt]");if(b){SET.fmt=b.dataset.fmt;renderSetup()}};
$("#countPills").onclick=e=>{const b=e.target.closest("[data-count]");if(b){SET.count=+b.dataset.count;renderSetup()}};
$("#countIn").oninput=e=>{const v=parseInt(e.target.value,10);if(v>0){SET.count=Math.min(v,maxFor());$$("#countPills .pill").forEach(p=>p.setAttribute("aria-pressed",+p.dataset.count===SET.count))}};
$("#topicPills").onclick=e=>{const b=e.target.closest("[data-topic]");if(!b)return;const t=b.dataset.topic;
  if(t==="all")SET.topics=SET.topics.size===TK.length?new Set():new Set(TK);else SET.topics.has(t)?SET.topics.delete(t):SET.topics.add(t);renderSetup()};
$("#startBtn").onclick=()=>{const n=Math.max(1,SET.count||10),t=new Set(SET.topics);
  if(SET.mode==="flash")startFlash(n,t);else if(SET.mode==="rcards")startRecall(t,n);else startQuiz(SET.mode,SET.fmt,n,t)};

/* ---------- quiz engine ---------- */
let Q=null;
const PRAISE=["Tama! 🎉","Magaling! 🌟","You got it! 💪","Exactly! ✨","Ang galing! 🌸"];
const OOPS=["Not quite. Here is the answer:","Almost! Remember this one:","Oops! Learn this one:"];
function startQuiz(mode,fmt,n,topics,label,list){
  const qs=list||buildQuestions(fmt,n,topics);
  if(!qs.length)return;
  Q={mode,fmt,topics,label,n:qs.length,list:qs,i:0,score:0,clues:0,correct:0,log:[],t0:Date.now(),retry:!!list};show("quiz");renderQ()}
function clueBtn(){return"<div class='qacts'><button class='btn' id='clueBtn'>💡 Show clue</button></div>"}
function renderQ(){const q=Q.list[Q.i];Q.clueUsed=false;Q.done=false;
  $("#qcard").className="qcard card tp-"+q.topic;
  $("#progFill").style.width=(Q.i/Q.n*100)+"%";$("#qCount").textContent=(Q.i+1)+" / "+Q.n;
  $("#sScore").textContent=Q.mode==="drill"?"⭐ "+Q.score+" pts":"Answered "+Q.i;
  $("#sMode").textContent=Q.label||(Q.mode==="quiz"?"Mock quiz":"Drill");
  $("#qmeta").innerHTML="<span class='chip'>"+TOPICS[q.topic].icon+" "+tname(q.topic)+"</span><span class='chip' style='--ts:var(--pink-soft);--tc:var(--pink-d)'>"+TYPE_NAME[q.type]+"</span>";
  $("#qtext").innerHTML=q.q;$("#qclue").innerHTML="";$("#qfb").innerHTML="";
  const A=$("#qans");
  if(q.type==="mc"||q.type==="tf"){
    A.innerHTML="<div class='choices "+(q.type==="tf"?"tf":"two")+"'>"+q.choices.map((c,i)=>"<button class='choice' data-i='"+i+"'>"+(q.type==="tf"?"":"<span class='k'>"+"ABCD"[i]+"</span>")+"<span>"+(q.type==="tf"?(c==="Tama"?"✔ Tama":"✘ Mali"):esc(c))+"</span></button>").join("")+"</div>"+clueBtn();
    A.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{if(Q.done)return;const c=q.choices[+b.dataset.i],ok=c===q.correct;
      A.querySelectorAll(".choice").forEach(x=>x.disabled=true);
      if(Q.mode==="drill"){A.querySelectorAll(".choice").forEach(x=>{if(q.choices[+x.dataset.i]===q.correct)x.classList.add("ok")});if(!ok)b.classList.add("no")}else b.classList.add("picked");
      answer(ok?1:0,esc(c))})}
  else if(q.type==="order"){
    const picked=[];
    A.innerHTML="<p class='howto'>Tap the events in order: the first one you tap is the earliest.</p><div class='ord'>"+q.events.map((e,i)=>"<button class='ordi' data-i='"+i+"'><span class='n'>·</span><span>"+esc(e[3])+"</span></button>").join("")+"</div><div class='qacts'><button class='btn' id='ordReset'>↺ Reset</button><button class='btn pri' id='ordChk' disabled>Check order</button></div>"+clueBtn();
    const sync=()=>{A.querySelectorAll(".ordi").forEach(b=>{const p=picked.indexOf(+b.dataset.i);b.classList.toggle("sel",p>=0);b.querySelector(".n").textContent=p>=0?p+1:"·"});$("#ordChk").disabled=picked.length!==q.events.length};
    A.querySelectorAll(".ordi").forEach(b=>b.onclick=()=>{if(Q.done)return;const i=+b.dataset.i,p=picked.indexOf(i);if(p>=0)picked.splice(p,1);else picked.push(i);sync()});
    $("#ordReset").onclick=()=>{if(Q.done)return;picked.length=0;sync()};
    $("#ordChk").onclick=()=>{if(Q.done)return;const ok=picked.every((i,k)=>q.events[i][2]===q.sorted[k][2]);
      A.querySelectorAll(".ordi").forEach(b=>{b.disabled=true;if(Q.mode==="drill"){const i=+b.dataset.i,p=picked.indexOf(i);b.classList.add(q.events[i][2]===q.sorted[p][2]?"ok":"no");b.querySelector(".n").textContent=(q.sorted.indexOf(q.events[i])+1)}});
      $("#ordChk").disabled=true;$("#ordReset").disabled=true;
      answer(ok?1:0,picked.map(i=>esc(q.events[i][1])).join(" → "))}}
  else if(q.type==="enum"){
    A.innerHTML="<div class='typed'><textarea class='ta' id='ansIn' placeholder='Write each item on its own line' aria-label='Your answer'></textarea><div class='hintline'>"+esc(q.hint)+" ("+q.items.length+" items)</div><div class='qacts'><button class='btn pri' id='chkBtn'>Check</button></div></div>"+clueBtn();
    const inp=$("#ansIn");
    $("#chkBtn").onclick=()=>{if(Q.done)return;const v=inp.value.trim();if(!v){inp.classList.add("shake");setTimeout(()=>inp.classList.remove("shake"),400);return}
      const parts=v.split(/[\n,;]+/).map(s=>s.trim()).filter(Boolean);
      const hit=q.items.map(alts=>parts.some(p=>checkText(p,alts)||containsAny(p,alts)));
      const frac=hit.filter(Boolean).length/q.items.length;inp.disabled=true;$("#chkBtn").disabled=true;
      Q.enumHit=hit;answer(frac,esc(parts.join(", ")))}}
  else{A.innerHTML="<div class='typed'><div class='in'><input id='ansIn' autocomplete='off' autocapitalize='off' autocorrect='off' spellcheck='false' placeholder='Your answer' aria-label='Your answer'><button class='btn pri' id='chkBtn'>Check</button></div><div class='hintline'>"+esc(q.hint)+"</div></div>"+clueBtn();
    const inp=$("#ansIn");setTimeout(()=>{try{inp.focus({preventScroll:true})}catch(e){}},60);
    const go=()=>{if(Q.done)return;const v=inp.value.trim();if(!v){inp.classList.add("shake");setTimeout(()=>inp.classList.remove("shake"),400);return}
      const ok=checkText(v,q.answers);inp.disabled=true;$("#chkBtn").disabled=true;if(Q.mode==="drill")inp.classList.add(ok?"ok":"no");answer(ok?1:0,esc(v))};
    $("#chkBtn").onclick=go;inp.onkeydown=e=>{if(e.key==="Enter")go()}}
  const cb=$("#clueBtn");cb.onclick=()=>{if(Q.done||Q.clueUsed)return;Q.clueUsed=true;Q.clues++;cb.disabled=true;$("#qclue").innerHTML="<div class='clue'><b>💡 Clue:</b> "+esc(q.clue)+"</div>"}}
function answer(frac,user){Q.done=true;const q=Q.list[Q.i];const cb=$("#clueBtn");if(cb)cb.disabled=true;
  const ok=frac>=1;const pts=Math.round(frac*(Q.clueUsed?5:10));
  if(ok)Q.correct++;Q.score+=pts;
  addMastery(q.topic,Q.clueUsed?frac*.5:frac);
  if(ok)delete S.wrong[q.key];else if(q.type!=="order")S.wrong[q.key]=1;save();
  Q.log.push({q,ok,frac,user,clue:Q.clueUsed,hit:Q.enumHit});Q.enumHit=null;
  $("#sScore").textContent=Q.mode==="drill"?"⭐ "+Q.score+" pts":"Answered "+(Q.i+1);
  const last=Q.i===Q.n-1;
  const btn="<div class='qacts'><button class='btn pri' id='nextBtn'>"+(last?"See my results 🏁":"Next ▶")+"</button></div>";
  if(Q.mode==="drill"){
    if(!ok){$("#qcard").classList.add("shake");setTimeout(()=>$("#qcard").classList.remove("shake"),400)}
    let extra="";const L=Q.log[Q.log.length-1];
    if(q.type==="enum")extra="<div class='enl'>"+q.items.map((a,i)=>"<span class='"+(L.hit[i]?"y":"n")+"'>"+(L.hit[i]?"✔ ":"✘ ")+esc(a[0])+"</span>").join("")+"</div><p>You got <b>"+L.hit.filter(Boolean).length+" of "+q.items.length+"</b>.</p>";
    $("#qfb").innerHTML="<div class='fb "+(ok?"ok":"no")+"'><h3>"+(ok?pick(PRAISE):pick(OOPS))+"</h3>"+(ok||q.type==="enum"||q.type==="order"?"":"<p>Correct answer: <b>"+esc(q.show||q.correct)+"</b></p>")+extra+"<p>"+q.explain+"</p><p><span class='chip sl'>📄 Slide "+q.sl+"</span>"+(Q.clueUsed&&frac>0?" <span class='chip sl'>half points (clue used)</span>":"")+"</p>"+btn+"</div>"}
  else $("#qfb").innerHTML="<div class='fb saved'><h3>Answer saved ✔</h3><p class='muted'>You will see the correct answers at the end.</p>"+btn+"</div>";
  const nb=$("#nextBtn");nb.onclick=()=>{if(last)results();else{Q.i++;renderQ();window.scrollTo({top:0,behavior:"smooth"})}};
  setTimeout(()=>{try{nb.focus({preventScroll:true})}catch(e){};$("#qfb").scrollIntoView({behavior:"smooth",block:"nearest"})},80)}
let armT=null;
$("#quitBtn").onclick=e=>{const b=e.currentTarget;if(b.classList.contains("arm")){clearTimeout(armT);b.classList.remove("arm");b.textContent="✕";Q&&Q.log.length?results():show("home")}
  else{b.classList.add("arm");b.textContent="Quit?";armT=setTimeout(()=>{b.classList.remove("arm");b.textContent="✕"},2500)}};
document.addEventListener("keydown",e=>{if(cur!=="quiz"||!Q||/INPUT|TEXTAREA/.test(e.target.tagName))return;const q=Q.list[Q.i];
  if(!Q.done){const k=e.key.toLowerCase();let i=-1;if(q.type==="mc")i="abcd".indexOf(k);else if(q.type==="tf")i=k==="t"?0:k==="m"||k==="f"?1:-1;
    if(i>=0){const b=document.querySelector(".choice[data-i='"+i+"']");if(b)b.click()}}});

function results(){const n=Q.log.length,pct=n?Math.round(Q.log.reduce((a,l)=>a+l.frac,0)/n*100):0,secs=Math.round((Date.now()-Q.t0)/1000);
  $("#rPct").textContent=pct+"%";
  $("#rMsg").textContent=pct===100?"Perfect! Handang-handa ka na 🏆":pct>=85?"Excellent! Almost exam-ready 🌸":pct>=70?"Good job! Review the ones you missed 🌿":pct>=50?"Good effort. Read the notes, then try again 💪":"Keep going! Read the notes first, then use recall cards 📒";
  const byT={};Q.log.forEach(l=>{const t=l.q.topic;(byT[t]=byT[t]||{a:0,c:0});byT[t].a++;if(l.ok)byT[t].c++});
  $("#rStats").innerHTML="<span class='stat'>✅ "+Q.correct+" / "+n+" correct</span><span class='stat'>⭐ "+Q.score+" pts</span><span class='stat'>💡 "+Q.clues+" clue"+(Q.clues===1?"":"s")+"</span><span class='stat'>⏱ "+Math.floor(secs/60)+"m "+(secs%60)+"s</span>"+Object.keys(byT).map(t=>"<span class='stat'>"+TOPICS[t].icon+" "+tname(t)+": "+byT[t].c+"/"+byT[t].a+"</span>").join("");
  const wrong=Q.log.filter(l=>!l.ok);$("#redoWrong").hidden=!wrong.length;$("#revTtl").hidden=!wrong.length;
  $("#review").innerHTML=wrong.map(l=>"<div class='rv card tp-"+l.q.topic+"'><span class='chip'>"+tname(l.q.topic)+"</span> <span class='chip sl'>📄 Slide "+l.q.sl+"</span><div class='q'>"+l.q.q+"</div><div class='a'><span class='y'>Your answer: "+(l.user||"–")+"</span>"+(l.q.type==="order"?"":"<span class='c'>Correct: "+esc(l.q.show||l.q.correct)+"</span>")+"<span>"+l.q.explain+"</span></div></div>").join("");
  show("results")}
$("#againBtn").onclick=()=>startQuiz(Q.mode,Q.fmt,Q.n,Q.topics,Q.label);
$("#redoWrong").onclick=()=>{const list=Q.log.filter(l=>!l.ok).map(l=>l.q.choices?Object.assign({},l.q,{choices:shuffle(l.q.choices)}):l.q);startQuiz("drill",Q.fmt,list.length,Q.topics,"Practice my mistakes",shuffle(list))};

/* ---------- flashcards ---------- */
let FL=null;
function startFlash(n,topics){const deck=shuffle(FACT_OBJ.filter(f=>topics.has(f.t))).slice(0,n);FL={deck,i:0,known:0,learning:[],total:deck.length};show("flash");renderFlash()}
function renderFlash(){const A=$("#fArea");
  if(FL.i>=FL.deck.length){$("#fProg").style.width="100%";$("#fCount").textContent=FL.total+" / "+FL.total;const l=FL.learning;
    A.innerHTML="<div class='res card'><div style='font-size:46px'>🃏</div><h2>Deck done!</h2><p style='margin:0'>You knew <b>"+FL.known+"</b> card"+(FL.known===1?"":"s")+" right away.</p>"+(l.length?"<p class='muted' style='margin:0'>Still learning: "+l.map(c=>esc(c.term)).join(", ")+"</p>":"")+"<div class='row' style='justify-content:center'>"+(l.length?"<button class='btn pri' id='fAgain'>Review “still learning” cards</button>":"")+"<button class='btn' id='fNew'>New deck</button><button class='btn' data-home>Home</button></div></div>";
    if(l.length)$("#fAgain").onclick=()=>{FL={deck:shuffle(l),i:0,known:0,learning:[],total:l.length};renderFlash()};$("#fNew").onclick=()=>openSetup("flash");return}
  const c=FL.deck[FL.i];$("#fProg").style.width=(FL.i/FL.deck.length*100)+"%";$("#fCount").textContent=(FL.i+1)+" / "+FL.deck.length;
  A.innerHTML="<div class='flip tp-"+c.t+"'><button class='fcard' id='fc' aria-label='Flip card'><div class='face f'><div><span class='chip'>"+TOPICS[c.t].icon+" "+tname(c.t)+"</span><div class='big' style='margin-top:12px'>"+esc(c.term)+"</div></div><span class='tapnote'>Tap to flip 🔄</span></div><div class='face b'><div>"+esc(c.def)+"<div style='margin-top:10px'><span class='chip sl'>📄 Slide "+c.sl+"</span></div></div><span class='tapnote'>Tap to flip back</span></div></button></div><div class='row' style='justify-content:center;margin-top:18px'><button class='btn' id='fNo'>😅 Still learning</button><button class='btn good' id='fYes'>😎 I know it!</button></div>";
  const fc=$("#fc");fc.onclick=()=>fc.classList.toggle("on");
  $("#fYes").onclick=()=>{FL.known++;FL.i++;renderFlash()};
  $("#fNo").onclick=()=>{if(!FL.learning.includes(c))FL.learning.push(c);FL.i++;renderFlash()}}
document.addEventListener("keydown",e=>{if(cur!=="flash")return;if(e.key===" "&&$("#fc")){e.preventDefault();$("#fc").click()}});

/* ---------- recall cards (spaced repetition, Leitner boxes) ---------- */
const INT=[0,1,2,4,7,14];
let RC=null;
function startRecall(topics,n){const now=Date.now();
  const due=FACT_OBJ.filter(f=>topics.has(f.t)&&S.cards[f.id]&&S.cards[f.id].due<=now).sort((a,b)=>S.cards[a.id].due-S.cards[b.id].due);
  const fresh=shuffle(FACT_OBJ.filter(f=>topics.has(f.t)&&!S.cards[f.id]));
  let deck=due.concat(fresh).slice(0,n);
  if(!deck.length)deck=FACT_OBJ.filter(f=>topics.has(f.t)).sort((a,b)=>S.cards[a.id].due-S.cards[b.id].due).slice(0,n);
  RC={deck:shuffle(deck),i:0,total:deck.length,got:0,miss:0,seen:new Set()};show("rcards");renderRC()}
function renderRC(){const A=$("#rcArea");
  if(RC.i>=RC.deck.length){$("#rcProg").style.width="100%";$("#rcCount").textContent="Done";
    A.innerHTML="<div class='res card'><div style='font-size:46px'>🧠</div><h2>Recall session done!</h2><p style='margin:0'>Remembered: <b>"+RC.got+"</b> · Needed another look: <b>"+RC.miss+"</b></p><p class='muted' style='margin:0;max-width:440px'>Cards you rated “Forgot” or “Hard” will come back first next time. Come back later today or tomorrow, because spacing out your reviews is what makes the facts stay.</p><div class='row' style='justify-content:center'><button class='btn pri' id='rcMore'>Another round</button><button class='btn' data-home>Home</button></div></div>";
    $("#rcMore").onclick=()=>openSetup("rcards");return}
  const c=RC.deck[RC.i];$("#rcProg").style.width=(RC.i/RC.deck.length*100)+"%";$("#rcCount").textContent=(RC.i+1)+" / "+RC.deck.length;
  const box=S.cards[c.id]?S.cards[c.id].b:0;
  A.innerHTML="<div class='rc card tp-"+c.t+"'><div class='qmeta'><span class='chip'>"+TOPICS[c.t].icon+" "+tname(c.t)+"</span><span class='chip sl'>"+(S.cards[c.id]?"Box "+box+" of 5":"New card")+"</span></div><div class='prompt'>"+esc(c.def)+"</div><div class='typed'><div class='in'><input id='rcIn' autocomplete='off' spellcheck='false' placeholder='Say it or type it (optional)' aria-label='Your recall'></div></div><div id='rcClue'></div><div class='qacts'><button class='btn' id='rcClueB'>💡 Clue</button><button class='btn pri' id='rcShow'>Show answer</button></div><div id='rcAns'></div></div>";
  $("#rcClueB").onclick=e=>{e.currentTarget.disabled=true;RC.clue=true;$("#rcClue").innerHTML="<div class='clue'><b>💡 Clue:</b> "+esc(c.clue)+"</div>"};
  RC.clue=false;
  const reveal=()=>{const v=$("#rcIn").value.trim();const auto=v?checkText(v,accepted(c)):null;$("#rcShow").hidden=true;$("#rcClueB").disabled=true;$("#rcIn").disabled=true;
    $("#rcAns").innerHTML="<div class='ans'><div class='big'>"+esc(c.term)+"</div><span class='chip sl'>📄 Slide "+c.sl+"</span>"+(auto===true?" <span class='chip' style='--ts:var(--ok-soft);--tc:var(--ok)'>Your typed answer matches ✔</span>":auto===false?" <span class='chip' style='--ts:var(--bad-soft);--tc:var(--bad)'>Your typed answer was different</span>":"")+"</div><p class='howto' style='margin-top:12px'>How well did you remember it?</p><div class='rate'><button class='btn warn' data-r='0'>😕 Forgot<small>see again soon</small></button><button class='btn' data-r='1'>🤔 Hard<small>review tomorrow</small></button><button class='btn good' data-r='2'>😎 Got it<small>next in "+INT[Math.min(box+1,5)]+" day"+(INT[Math.min(box+1,5)]===1?"":"s")+"</small></button></div>";
    $$("#rcAns [data-r]").forEach(b=>b.onclick=()=>rate(c,+b.dataset.r))};
  $("#rcShow").onclick=reveal;$("#rcIn").onkeydown=e=>{if(e.key==="Enter")reveal()};
  setTimeout(()=>{try{$("#rcIn").focus({preventScroll:true})}catch(e){}},60)}
function rate(c,r){const now=Date.now();const st=S.cards[c.id]||{b:0,due:now};
  if(r===0){st.b=0;st.due=now;RC.miss++;if(!RC.seen.has(c.id)){RC.seen.add(c.id);RC.deck.splice(Math.min(RC.i+4,RC.deck.length),0,c)}}
  else if(r===1){st.b=Math.max(1,st.b);st.due=now+DAY;RC.miss++}
  else{st.b=Math.min(5,st.b+1);st.due=now+INT[st.b]*DAY;RC.got++}
  S.cards[c.id]=st;addMastery(c.t,r===2?(RC.clue?.5:1):r===1?.3:0);RC.i++;renderRC()}
document.addEventListener("keydown",e=>{if(cur!=="rcards"||e.target.tagName==="INPUT")return;const b=document.querySelector("#rcAns [data-r='"+({"1":0,"2":1,"3":2}[e.key])+"']");if(b)b.click()});

/* ---------- brain dump ---------- */
let DT="k";
function renderDump(){const A=$("#dumpArea");
  A.innerHTML="<div><h3>1. Pick a lesson</h3><div class='pills' id='dTopics'>"+TK.map((t,i)=>"<button class='pill tp tp-"+t+"' aria-pressed='"+(DT===t)+"' data-dt='"+t+"'>"+(i+1)+". "+TOPICS[t].icon+" "+tname(t)+"</button>").join("")+"<button class='pill' aria-pressed='"+(DT==="all")+"' data-dt='all'>📚 All lessons</button></div></div>"+
  "<div><h3>2. Close your notes. Write everything you remember</h3><p class='howto'>Names, dates, places, positions, laws, quotes. Don't look! Struggling to remember is what makes it stick. Short phrases are fine.</p><textarea class='ta' id='dumpIn' style='min-height:200px' placeholder='e.g. Padre Valerio Malabanan, kuwintas na ginto, 1906 Letran…'></textarea></div>"+
  "<div class='row'><button class='btn pri big' id='dumpChk'>Check what I remembered ▶</button></div><div id='dumpRes'></div>";
  $("#dTopics").onclick=e=>{const b=e.target.closest("[data-dt]");if(b){const v=$("#dumpIn").value;DT=b.dataset.dt;renderDump();$("#dumpIn").value=v}};
  $("#dumpChk").onclick=()=>{const txt=$("#dumpIn").value;const items=FACT_OBJ.filter(f=>DT==="all"||f.t===DT);
    const hit=items.map(f=>containsAny(txt,accepted(f).concat(f.term.split(/\s+/).filter(w=>w.length>=6))));
    const R=$("#dumpRes");
    const draw=()=>{const k=hit.filter(Boolean).length;
      R.innerHTML="<div class='note' style='margin-top:6px'>You recalled <b>"+k+" of "+items.length+"</b> key terms ("+Math.round(k/items.length*100)+"%). Items were auto-ticked from your text; tap any item to tick or untick it. Read the unticked ones carefully. Those are your gaps.</div><div class='chklist'>"+
      items.map((f,i)=>"<button class='chk' aria-pressed='"+hit[i]+"' data-ci='"+i+"'><span class='bx'>"+(hit[i]?"✔":"")+"</span><span><b>"+esc(f.term)+"</b> <span class='muted'>· slide "+f.sl+"</span><br><span style='font-size:14px'>"+esc(f.def)+"</span></span></button>").join("")+"</div><div class='row' style='margin-top:12px'><button class='btn pri' id='dumpSave'>Save result</button><button class='btn' id='dumpDrill'>Drill my gaps ▶</button></div>";
      R.querySelectorAll("[data-ci]").forEach(b=>b.onclick=()=>{hit[+b.dataset.ci]=!hit[+b.dataset.ci];draw()});
      $("#dumpSave").onclick=e=>{const tset=DT==="all"?TK:[DT];tset.forEach(t=>{const its=items.filter(f=>f.t===t);if(!its.length)return;const kk=its.filter(f=>hit[items.indexOf(f)]).length;addMastery(t,kk/its.length)});e.currentTarget.textContent="Saved ✔";e.currentTarget.disabled=true};
      $("#dumpDrill").onclick=()=>{const gaps=items.filter((f,i)=>!hit[i]);if(!gaps.length){alert("No gaps. Amazing! 🌸");return}startQuiz("drill","id",gaps.length,new Set(TK),"Brain dump gaps",shuffle(gaps).slice(0,20).map(f=>Math.random()<.5?factID(f):factMC(f)))}};
    draw();R.scrollIntoView({behavior:"smooth",block:"start"})}}

/* ---------- essay practice ---------- */
let ET="all";
function renderEssay(){const A=$("#essayArea");
  const list=ESSAY.filter(x=>ET==="all"||x[0]===ET);
  A.innerHTML="<div class='pills' style='margin-bottom:12px'><button class='pill' aria-pressed='"+(ET==="all")+"' data-et='all'>📚 All lessons</button>"+TK.filter(t=>ESSAY.some(x=>x[0]===t)).map(t=>"<button class='pill tp tp-"+t+"' aria-pressed='"+(ET===t)+"' data-et='"+t+"'>"+TOPICS[t].icon+" "+tname(t)+"</button>").join("")+"</div>"+
  "<p class='howto'>Write your answer from memory, then tap <b>Show key points</b> and tick the points you included. Aim to include every point.</p>"+
  list.map((x,i)=>"<div class='qcard card tp-"+x[0]+"' style='margin-bottom:14px'><div class='qmeta'><span class='chip'>"+TOPICS[x[0]].icon+" "+tname(x[0])+"</span><span class='chip sl'>📄 Slide "+x[3]+"</span></div><div class='qtext' style='font-size:19px'>"+esc(x[1])+"</div><textarea class='ta' placeholder='Your answer…' aria-label='Your answer'></textarea><div class='qacts'><button class='btn pri' data-ek='"+ESSAY.indexOf(x)+"'>Show key points</button></div><div class='ekp'></div></div>").join("");
  A.querySelector(".pills").onclick=e=>{const b=e.target.closest("[data-et]");if(b){ET=b.dataset.et;renderEssay()}};
  A.querySelectorAll("[data-ek]").forEach(b=>b.onclick=()=>{const x=ESSAY[+b.dataset.ek],card=b.closest(".qcard"),txt=card.querySelector("textarea").value;b.hidden=true;
    const hit=x[2].map(p=>{const words=p.split(/[\s,;().“”"']+/).filter(w=>w.length>=5);const n=words.filter(w=>norm(txt).includes(norm(w))).length;return words.length>0&&n/words.length>=.5});
    const box=card.querySelector(".ekp");
    const draw=()=>{box.innerHTML="<p class='howto' style='margin-top:12px'>Key points ("+hit.filter(Boolean).length+"/"+x[2].length+" ticked). Tap to tick the ones you covered:</p><div class='chklist'>"+x[2].map((p,i)=>"<button class='chk' aria-pressed='"+hit[i]+"' data-pi='"+i+"'><span class='bx'>"+(hit[i]?"✔":"")+"</span><span>"+esc(p)+"</span></button>").join("")+"</div>";
      box.querySelectorAll("[data-pi]").forEach(k=>k.onclick=()=>{hit[+k.dataset.pi]=!hit[+k.dataset.pi];draw()})};draw()})}

/* ---------- boot ---------- */
applyTheme();renderHome();
if("serviceWorker" in navigator&&location.protocol.startsWith("http")){
  navigator.serviceWorker.register("sw.js").then(()=>navigator.serviceWorker.ready).then(()=>{$("#offPill").hidden=false}).catch(()=>{})}
})();
