(function(){
"use strict";
const $=s=>document.querySelector(s);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const tname=t=>TOPICS[t].short;

/* ---------- storage (safe) ---------- */
const KEY="cselc03c-prelim-reviewer";
let S={mastery:{},best:{},theme:null};
try{S=Object.assign(S,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

/* ---------- answer checking ---------- */
const norm=s=>String(s).toLowerCase().replace(/[–—]/g,"-").replace(/^(the|a|an)\s+/,"").replace(/[^a-z0-9*]/g,"");
function lev(a,b){const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]}
function checkText(inp,acc){const u=norm(inp);if(!u)return false;
  return acc.some(a=>{const n=norm(a);if(!n)return false;if(u===n)return true;const tol=n.length>=12?2:n.length>=6?1:0;return tol>0&&lev(u,n)<=tol})}

/* ---------- question builders ---------- */
const FACT_OBJ=FACTS.map(f=>({t:f[0],g:f[1],term:f[2],def:f[3],clue:f[4],alts:f[5],sl:f[6]}));
function accepted(f){const a=[f.term,...f.alts];const nop=f.term.replace(/\s*\(.*?\)\s*/g," ").trim();if(nop!==f.term)a.push(nop);
  f.term.split(/\s*\/\s*/).forEach(p=>{if(p&&p!==f.term)a.push(p)});return a}
function factMC(f){
  let pool=FACT_OBJ.filter(x=>x!==f&&x.g===f.g&&norm(x.term)!==norm(f.term));
  if(pool.length<3)pool=pool.concat(shuffle(FACT_OBJ.filter(x=>x!==f&&x.t===f.t&&x.g!==f.g)));
  const wrong=shuffle(pool).slice(0,3).map(x=>x.term);
  const choices=shuffle([f.term].concat(wrong));
  return{type:"mc",topic:f.t,q:"Which term matches this meaning?<br><span class='defq'>"+esc(f.def)+"</span>",choices,correct:f.term,clue:f.clue,explain:"<b>"+esc(f.term)+"</b>: "+esc(f.def),sl:f.sl,key:"f"+f.term}}
function authMC(m){return{type:"mc",topic:m[0],q:esc(m[1]),choices:shuffle([m[2]].concat(m[3])),correct:m[2],clue:m[4],explain:esc(m[5]),sl:m[6],key:"m"+m[1]}}
function factID(f){return{type:"id",topic:f.t,q:"Identify the term:<br><span class='defq'>"+esc(f.def)+"</span>",answers:accepted(f),show:f.term,clue:f.clue,explain:"<b>"+esc(f.term)+"</b>: "+esc(f.def),sl:f.sl,hint:"Type the term",key:"i"+f.term}}
function fillQ(x){const ans=x[2][0];const q=esc(x[1]).replace("___","<span class='blank'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>");
  return{type:"fill",topic:x[0],q,answers:x[2],show:ans,clue:x[3],explain:esc(x[1]).replace("___","<b>"+esc(ans)+"</b>"),sl:x[4],hint:"Type the missing word, number, or term",key:"b"+x[1]}}
function tfQ(x){return{type:"tf",topic:x[0],q:esc(x[1]),choices:["True","False"],correct:x[2]?"True":"False",clue:x[4],explain:"<b>"+(x[2]?"True.":"False.")+"</b> "+esc(x[3]),sl:x[5],key:"t"+x[1]}}
const POOLS={
  mc:t=>MC.filter(m=>t.has(m[0])).map(authMC).concat(FACT_OBJ.filter(f=>t.has(f.t)).map(factMC)),
  tf:t=>TF.filter(x=>t.has(x[0])).map(tfQ),
  id:t=>FACT_OBJ.filter(f=>t.has(f.t)).map(factID),
  fill:t=>FILL.filter(x=>t.has(x[0])).map(fillQ)
};
const FORMATS={
  mc:{name:"Multiple choice",d:"Pick A, B, C, or D",icon:"🔤"},
  tf:{name:"True or false",d:"Is the statement correct?",icon:"✅"},
  id:{name:"Identification",d:"Read the meaning, type the term",icon:"🔎"},
  fill:{name:"Fill in the blank",d:"Complete the sentence",icon:"✏️"},
  mixed:{name:"Mixed",d:"A bit of everything",icon:"🎲"}
};
function available(fmt,topics){return fmt==="mixed"?Object.keys(POOLS).reduce((a,k)=>a+POOLS[k](topics).length,0):POOLS[fmt](topics).length}
function buildQuestions(fmt,n,topics){
  if(fmt!=="mixed")return shuffle(POOLS[fmt](topics)).slice(0,n);
  const types=Object.keys(POOLS),pools=types.map(k=>shuffle(POOLS[k](topics)));
  const out=[];let i=0;while(out.length<n&&pools.some(p=>p.length)){const p=pools[i%types.length];if(p.length)out.push(p.pop());i++}
  return shuffle(out)}

/* ---------- views ---------- */
const VIEWS=["home","notes","gloss","setup","quiz","results","flash"];
function show(v){VIEWS.forEach(x=>$("#v-"+x).hidden=x!==v);window.scrollTo({top:0});if(v==="home")renderHome()}
document.addEventListener("click",e=>{if(e.target.closest("[data-home]"))show("home")});
$("#goHome").onclick=()=>show("home");

/* theme */
function isDark(){return S.theme?S.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches}
function applyTheme(){if(S.theme)document.documentElement.setAttribute("data-theme",S.theme);else document.documentElement.removeAttribute("data-theme");$("#thmBtn").textContent=isDark()?"☀️":"🌙"}
$("#thmBtn").onclick=()=>{S.theme=isDark()?"light":"dark";save();applyTheme()};

/* ---------- home ---------- */
const TILES=[
 ["notes","📒","Study notes","Short notes for all 4 topics, with slide numbers.","var(--i-soft)"],
 ["gloss","📚","Glossary","Search every key term and its meaning.","var(--r-soft)"],
 ["flash","🃏","Flashcards","Flip cards to memorize terms.","var(--s-soft)"],
 ["drill","🎯","Drill","Instant feedback after each answer. Great for learning.","var(--o-soft)"],
 ["quiz","📝","Mock quiz","Answers revealed at the end, like a real exam.","var(--i-soft)"],
 ["weak","💪","Train my weak spot","Practice the topic you know least.","var(--r-soft)"]
];
function mastery(t){const m=S.mastery[t];if(!m||!m.a)return 0;return Math.round(m.c/m.a*Math.min(m.a,10)/10*100)}
function renderHome(){
  $("#tiles").innerHTML=TILES.map(t=>"<button class='tile card' data-act='"+t[0]+"'><span class='ic' style='--bg2:"+t[4]+"'>"+t[1]+"</span><h3>"+t[2]+"</h3><p>"+t[3]+"</p></button>").join("");
  const v=TK.map(mastery),avg=Math.round(v.reduce((a,b)=>a+b,0)/TK.length);
  $("#ring").style.setProperty("--p",avg);$("#ringPct").textContent=avg+"%";
  $("#mast").innerHTML=TK.map((t,i)=>"<div class='mrow tp-"+t+"'><span>"+TOPICS[t].icon+" "+tname(t)+"</span><span class='tr'><i style='width:"+v[i]+"%'></i></span><span>"+v[i]+"%</span></div>").join("")}
document.addEventListener("click",e=>{const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;
  if(a==="notes"){renderNotes();show("notes")}else if(a==="gloss"){renderGloss();show("gloss")}
  else if(a==="flash")openSetup("flash");else if(a==="drill")openSetup("drill");else if(a==="quiz")openSetup("quiz");
  else if(a==="weak"){let w=TK[0],lo=1e9;TK.forEach(t=>{const x=mastery(t)+Math.random();if(x<lo){lo=x;w=t}});startQuiz("drill","mixed",10,new Set([w]),"Training: "+tname(w))}});

/* ---------- notes ---------- */
let notesTopic="o",notesBuilt=false;
function renderNotes(){
  $("#tnav").innerHTML=TK.map(t=>"<button class='pill tp tp-"+t+"' aria-pressed='"+(t===notesTopic)+"' data-nt='"+t+"'>"+TOPICS[t].icon+" "+TOPICS[t].topic+": "+tname(t)+"</button>").join("");
  $("#notesList").innerHTML=NOTES[notesTopic].map((s,i)=>"<details class='sec card tp-"+notesTopic+"'"+(i===0?" open":"")+"><summary><span>"+esc(s.h)+"</span><span class='chip sl'>Slide "+s.sl+"</span></summary><div class='body'>"+s.b+"</div></details>").join("")+
    "<div class='row' style='margin-top:14px'><button class='btn pri' data-quicknote='"+notesTopic+"'>Quick drill on this topic ▶</button></div>";
  if(notesTopic==="s")initTracer()}
$("#tnav").onclick=e=>{const b=e.target.closest("[data-nt]");if(b){notesTopic=b.dataset.nt;renderNotes();window.scrollTo({top:0})}};
$("#notesList").onclick=e=>{const b=e.target.closest("[data-quicknote]");if(b)startQuiz("drill","mixed",10,new Set([b.dataset.quicknote]),"Quick drill")};

/* BFS / DFS tracer (uses the trees from slides 44-49) */
const TREES={
 a:{name:"Slide tree: A → B, C · B → D, E · C → F, G",root:"A",goal:null,kids:{A:["B","C"],B:["D","E"],C:["F","G"]}},
 b:{name:"Activity tree: P → Q, R · Q → S, T · R → U, V (goal T)",root:"P",goal:"T",kids:{P:["Q","R"],Q:["S","T"],R:["U","V"]}}
};
const POS=[[200,28],[110,98],[290,98],[65,168],[155,168],[245,168],[335,168]];
let TR={tree:"a",algo:"bfs"};
function trReset(){const t=TREES[TR.tree];TR.frontier=[t.root];TR.visited=[];TR.done=false}
function trStep(){if(TR.done||!TR.frontier.length)return;const t=TREES[TR.tree];
  const n=TR.algo==="bfs"?TR.frontier.shift():TR.frontier.pop();TR.visited.push(n);
  if(n===t.goal){TR.done=true;return}
  const k=(t.kids[n]||[]);if(TR.algo==="bfs")TR.frontier.push(...k);else TR.frontier.push(...k.slice().reverse())}
function trDraw(){const t=TREES[TR.tree],names=[t.root].concat(...Object.values(t.kids)).filter((x,i,a)=>a.indexOf(x)===i);
  const order=[];const bfs=[t.root];while(bfs.length){const n=bfs.shift();order.push(n);bfs.push(...(t.kids[n]||[]))}
  const pos={};order.forEach((n,i)=>pos[n]=POS[i]);
  let s="<svg viewBox='0 0 400 200' role='img' aria-label='Search tree'>";
  Object.entries(t.kids).forEach(([p,ks])=>ks.forEach(c=>{s+="<line x1='"+pos[p][0]+"' y1='"+pos[p][1]+"' x2='"+pos[c][0]+"' y2='"+pos[c][1]+"' stroke='var(--line)' stroke-width='3'/>"}));
  order.forEach(n=>{const v=TR.visited.indexOf(n),inF=TR.frontier.includes(n),goal=n===t.goal;
    s+="<circle cx='"+pos[n][0]+"' cy='"+pos[n][1]+"' r='20' fill='"+(v>=0?"var(--tc)":"var(--card)")+"' stroke='"+(inF?"var(--gold)":"var(--tc)")+"' stroke-width='"+(inF?5:3)+"'/>";
    s+="<text x='"+pos[n][0]+"' y='"+(pos[n][1]+5)+"' text-anchor='middle' font-weight='800' font-size='16' fill='"+(v>=0?"var(--card)":"var(--ink)")+"'>"+n+"</text>";
    if(v>=0)s+="<text x='"+(pos[n][0]+22)+"' y='"+(pos[n][1]-16)+"' font-size='13' font-weight='800' fill='var(--ink)'>#"+(v+1)+"</text>";
    if(goal)s+="<text x='"+pos[n][0]+"' y='"+(pos[n][1]+38)+"' text-anchor='middle' font-size='12' font-weight='700' fill='var(--bad)'>goal</text>"});
  s+="</svg>";
  const ds=TR.algo==="bfs"?"Queue (front → back)":"Stack (top is right)";
  const fr=TR.algo==="bfs"?TR.frontier:TR.frontier;
  $("#trOut").innerHTML=s+"<div class='tl'>Visited: "+(TR.visited.join(", ")||"–")+(TR.done?" ✅ goal reached":"")+"</div><div class='muted'>"+ds+": "+(fr.join(", ")||"empty")+"</div>"}
function initTracer(){const el=$("#tracer");if(!el)return;trReset();
  el.className="tracer tp-s";
  el.innerHTML="<h4>Try it: trace the search step by step</h4><div class='pills'><button class='pill' data-tt='a' aria-pressed='true'>Slide tree</button><button class='pill' data-tt='b' aria-pressed='false'>Activity tree (goal T)</button></div><div class='pills'><button class='pill' data-ta='bfs' aria-pressed='true'>BFS</button><button class='pill' data-ta='dfs' aria-pressed='false'>DFS</button></div><div id='trOut'></div><div class='row'><button class='btn pri' id='trStep'>Next step ▶</button><button class='btn' id='trReset'>Reset</button></div>";
  const sync=()=>{el.querySelectorAll("[data-tt]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.tt===TR.tree));el.querySelectorAll("[data-ta]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.ta===TR.algo))};
  el.onclick=e=>{const a=e.target.closest("button");if(!a)return;e.stopPropagation();
    if(a.dataset.tt){TR.tree=a.dataset.tt;trReset()}else if(a.dataset.ta){TR.algo=a.dataset.ta;trReset()}else if(a.id==="trStep")trStep();else if(a.id==="trReset")trReset();sync();trDraw()};
  trDraw()}

/* ---------- glossary ---------- */
let glT="all";
function renderGloss(){
  $("#glTopics").innerHTML="<button class='pill' aria-pressed='"+(glT==="all")+"' data-gt='all'>All</button>"+TK.map(t=>"<button class='pill tp tp-"+t+"' aria-pressed='"+(glT===t)+"' data-gt='"+t+"'>"+TOPICS[t].icon+" "+tname(t)+"</button>").join("");
  const q=$("#glSearch").value.trim().toLowerCase();
  const list=FACT_OBJ.filter(f=>(glT==="all"||f.t===glT)&&(!q||(f.term+" "+f.def+" "+f.alts.join(" ")).toLowerCase().includes(q))).sort((a,b)=>a.term.localeCompare(b.term));
  const hl=s=>{s=esc(s);if(!q)return s;const i=s.toLowerCase().indexOf(esc(q));return i<0?s:s.slice(0,i)+"<mark>"+s.slice(i,i+esc(q).length)+"</mark>"+s.slice(i+esc(q).length)};
  $("#glCount").textContent=list.length+" term"+(list.length===1?"":"s");
  $("#glList").innerHTML=list.length?list.map(f=>"<div class='gi card tp-"+f.t+"'><b>"+hl(f.term)+"</b><p>"+hl(f.def)+"</p><span class='chip'>"+tname(f.t)+"</span> <span class='chip sl'>Slide "+f.sl+"</span></div>").join(""):"<p class='muted'>No match. Try another word.</p>"}
$("#glTopics").onclick=e=>{const b=e.target.closest("[data-gt]");if(b){glT=b.dataset.gt;renderGloss()}};
$("#glSearch").oninput=renderGloss;

/* ---------- setup ---------- */
let SET={mode:"drill",fmt:"mixed",count:10,topics:new Set(TK)};
function openSetup(mode){SET.mode=mode;
  const names={drill:"🎯 Drill",quiz:"📝 Mock quiz",flash:"🃏 Flashcards"};$("#setupTitle").textContent=names[mode];
  $("#setupSub").textContent=mode==="drill"?"You see if you are right after every answer.":mode==="quiz"?"Answers are revealed only at the end, like a real exam.":"Flip a card, then sort it.";
  $("#fmtBox").hidden=mode==="flash";
  $("#startBtn").textContent=mode==="flash"?"Start flipping ▶":"Start ▶";
  renderSetup();show("setup")}
function renderSetup(){
  $("#fmts").innerHTML=Object.keys(FORMATS).map(k=>"<button class='fmt' aria-pressed='"+(SET.fmt===k)+"' data-fmt='"+k+"'><b>"+FORMATS[k].icon+" "+FORMATS[k].name+"</b><span>"+FORMATS[k].d+"</span></button>").join("");
  $("#topicPills").innerHTML="<button class='pill' aria-pressed='"+(SET.topics.size===TK.length)+"' data-topic='all'>⭐ All topics</button>"+TK.map(t=>"<button class='pill tp tp-"+t+"' aria-pressed='"+SET.topics.has(t)+"' data-topic='"+t+"'>"+TOPICS[t].icon+" "+tname(t)+"</button>").join("");
  const max=SET.mode==="flash"?FACT_OBJ.filter(f=>SET.topics.has(f.t)).length:available(SET.fmt,SET.topics);
  if(SET.count>max)SET.count=Math.max(1,max);
  $("#countPills").innerHTML=[5,10,15,20,30,50].filter(n=>n<=max||n===5).map(n=>"<button class='pill' aria-pressed='"+(SET.count===n)+"' data-count='"+n+"'>"+n+"</button>").join("")+"<button class='pill' aria-pressed='"+(SET.count===max)+"' data-count='"+max+"'>All ("+max+")</button>";
  $("#countIn").value=SET.count;$("#countIn").max=max;$("#availNote").textContent=max+" available for this choice";
  $("#startBtn").disabled=!SET.topics.size||max<1}
$("#fmts").onclick=e=>{const b=e.target.closest("[data-fmt]");if(b){SET.fmt=b.dataset.fmt;renderSetup()}};
$("#countPills").onclick=e=>{const b=e.target.closest("[data-count]");if(b){SET.count=+b.dataset.count;renderSetup()}};
$("#countIn").oninput=e=>{const v=parseInt(e.target.value,10);if(v>0){SET.count=v;const max=SET.mode==="flash"?FACT_OBJ.filter(f=>SET.topics.has(f.t)).length:available(SET.fmt,SET.topics);SET.count=Math.min(v,max);document.querySelectorAll("#countPills .pill").forEach(p=>p.setAttribute("aria-pressed",+p.dataset.count===SET.count))}};
$("#topicPills").onclick=e=>{const b=e.target.closest("[data-topic]");if(!b)return;const t=b.dataset.topic;
  if(t==="all")SET.topics=SET.topics.size===TK.length?new Set():new Set(TK);else SET.topics.has(t)?SET.topics.delete(t):SET.topics.add(t);renderSetup()};
$("#startBtn").onclick=()=>{const n=Math.max(1,SET.count||10);if(SET.mode==="flash")startFlash(n,SET.topics);else startQuiz(SET.mode,SET.fmt,n,new Set(SET.topics))};

/* ---------- quiz engine ---------- */
let Q=null;
const TYPE_NAME={mc:"Multiple choice",tf:"True or false",id:"Identification",fill:"Fill in the blank"};
const PRAISE=["Correct! 🎉","Nice one! 🌟","You got it! 💪","Exactly! ✨","Great! 🚀"];
const OOPS=["Not quite. Here is the answer:","Almost! Check this one:","Oops! Learn this one:"];
function startQuiz(mode,fmt,n,topics,label,list){
  const qs=list||buildQuestions(fmt,n,topics);
  if(!qs.length)return;
  Q={mode,fmt,topics,label,n:qs.length,list:qs,i:0,score:0,streak:0,clues:0,correct:0,log:[],t0:Date.now()};show("quiz");renderQ()}
function clueBtn(){return"<div class='qacts'><button class='btn' id='clueBtn'>💡 Show clue</button></div>"}
function renderQ(){const q=Q.list[Q.i];Q.clueUsed=false;Q.done=false;
  $("#qcard").className="qcard card tp-"+q.topic;
  $("#progFill").style.width=(Q.i/Q.n*100)+"%";$("#qCount").textContent=(Q.i+1)+" / "+Q.n;
  $("#sScore").textContent="⭐ "+Q.score+" pts";
  $("#sMode").textContent=Q.label||(Q.mode==="quiz"?"Mock quiz":"Drill");
  $("#qmeta").innerHTML="<span class='chip'>"+TOPICS[q.topic].icon+" "+tname(q.topic)+"</span><span class='chip' style='--ts:var(--accent-soft);--tc:var(--accent)'>"+TYPE_NAME[q.type]+"</span>";
  $("#qtext").innerHTML=q.q;$("#qclue").innerHTML="";$("#qfb").innerHTML="";
  const A=$("#qans");
  if(q.type==="mc"||q.type==="tf"){
    A.innerHTML="<div class='choices "+(q.type==="tf"?"tf":"two")+"'>"+q.choices.map((c,i)=>"<button class='choice' data-i='"+i+"'>"+(q.type==="tf"?"":"<span class='k'>"+"ABCD"[i]+"</span>")+"<span>"+esc(c)+"</span></button>").join("")+"</div>"+clueBtn();
    A.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{if(Q.done)return;const c=q.choices[+b.dataset.i],ok=c===q.correct;
      A.querySelectorAll(".choice").forEach(x=>x.disabled=true);
      if(Q.mode==="drill"){A.querySelectorAll(".choice").forEach(x=>{if(q.choices[+x.dataset.i]===q.correct)x.classList.add("ok")});if(!ok)b.classList.add("no")}else b.classList.add("picked");
      answer(ok,esc(c),b)})}
  else{A.innerHTML="<div class='typed'><div class='in'><input id='ansIn' autocomplete='off' autocapitalize='off' autocorrect='off' spellcheck='false' placeholder='Your answer' aria-label='Your answer'><button class='btn pri' id='chkBtn'>Check</button></div><div class='hintline'>"+esc(q.hint)+"</div></div>"+clueBtn();
    const inp=$("#ansIn");setTimeout(()=>{try{inp.focus({preventScroll:true})}catch(e){}},60);
    const go=()=>{if(Q.done)return;const v=inp.value.trim();if(!v){inp.classList.add("shake");setTimeout(()=>inp.classList.remove("shake"),400);return}
      const ok=checkText(v,q.answers);inp.disabled=true;$("#chkBtn").disabled=true;if(Q.mode==="drill")inp.classList.add(ok?"ok":"no");answer(ok,esc(v),inp)};
    $("#chkBtn").onclick=go;inp.onkeydown=e=>{if(e.key==="Enter")go()}}
  const cb=$("#clueBtn");cb.onclick=()=>{if(Q.done||Q.clueUsed)return;Q.clueUsed=true;Q.clues++;cb.disabled=true;$("#qclue").innerHTML="<div class='clue'><b>💡 Clue:</b> "+esc(q.clue)+"</div>"}}
function answer(ok,user,el){Q.done=true;const q=Q.list[Q.i];const cb=$("#clueBtn");if(cb)cb.disabled=true;
  const pts=ok?(Q.clueUsed?5:10):0;
  if(ok){Q.correct++;Q.score+=pts}
  const m=S.mastery[q.topic]||(S.mastery[q.topic]={c:0,a:0});m.a++;if(ok)m.c+=Q.clueUsed?.5:1;save();
  Q.log.push({q,ok,user,clue:Q.clueUsed});
  $("#sScore").textContent=Q.mode==="drill"?"⭐ "+Q.score+" pts":"Answered "+(Q.i+1);
  const last=Q.i===Q.n-1;
  const btn="<div class='qacts'><button class='btn pri' id='nextBtn'>"+(last?"See my results 🏁":"Next ▶")+"</button></div>";
  if(Q.mode==="drill"){
    if(!ok){$("#qcard").classList.add("shake");setTimeout(()=>$("#qcard").classList.remove("shake"),400)}
    $("#qfb").innerHTML="<div class='fb "+(ok?"ok":"no")+"'><h3>"+(ok?pick(PRAISE):pick(OOPS))+"</h3>"+(ok?"":"<p>Correct answer: <b>"+esc(q.show||q.correct)+"</b></p>")+"<p>"+q.explain+"</p><p><span class='chip sl'>📄 Slide "+q.sl+"</span>"+(Q.clueUsed&&ok?" <span class='chip sl'>half points (clue used)</span>":"")+"</p>"+btn+"</div>"}
  else $("#qfb").innerHTML="<div class='fb saved'><h3>Answer saved ✔</h3><p class='muted'>You will see the correct answers at the end.</p>"+btn+"</div>";
  const nb=$("#nextBtn");nb.onclick=()=>{if(last)results();else{Q.i++;renderQ();window.scrollTo({top:0,behavior:"smooth"})}};
  setTimeout(()=>{try{nb.focus({preventScroll:true})}catch(e){};$("#qfb").scrollIntoView({behavior:"smooth",block:"nearest"})},80)}
let armT=null;
$("#quitBtn").onclick=e=>{const b=e.currentTarget;if(b.classList.contains("arm")){clearTimeout(armT);b.classList.remove("arm");b.textContent="✕";show("home")}
  else{b.classList.add("arm");b.textContent="Quit?";armT=setTimeout(()=>{b.classList.remove("arm");b.textContent="✕"},2500)}};
document.addEventListener("keydown",e=>{if($("#v-quiz").hidden||!Q||e.target.tagName==="INPUT")return;const q=Q.list[Q.i];
  if(!Q.done){const k=e.key.toLowerCase();let i=-1;if(q.type==="mc")i="abcd".indexOf(k);else if(q.type==="tf")i=k==="t"?0:k==="f"?1:-1;
    if(i>=0){const b=document.querySelector(".choice[data-i='"+i+"']");if(b)b.click()}}});

function results(){const pct=Math.round(Q.correct/Q.n*100),secs=Math.round((Date.now()-Q.t0)/1000);
  const key=Q.mode+"-"+Q.fmt;if(!Q.retry&&!Q.label){S.best[key]=Math.max(S.best[key]||0,pct);save()}
  $("#rPct").textContent=pct+"%";
  $("#rMsg").textContent=pct===100?"Perfect! You are exam-ready 🏆":pct>=75?"Great job! Almost there 🎉":pct>=50?"Good effort. Review the ones you missed 💪":"Keep going. Read the notes, then try again 📒";
  const byT={};Q.log.forEach(l=>{const t=l.q.topic;(byT[t]=byT[t]||{a:0,c:0});byT[t].a++;if(l.ok)byT[t].c++});
  $("#rStats").innerHTML="<span class='stat'>✅ "+Q.correct+" / "+Q.n+" correct</span><span class='stat'>⭐ "+Q.score+" pts</span><span class='stat'>💡 "+Q.clues+" clue"+(Q.clues===1?"":"s")+"</span><span class='stat'>⏱ "+Math.floor(secs/60)+"m "+(secs%60)+"s</span>"+Object.keys(byT).map(t=>"<span class='stat'>"+TOPICS[t].icon+" "+tname(t)+": "+byT[t].c+"/"+byT[t].a+"</span>").join("");
  const wrong=Q.log.filter(l=>!l.ok);$("#redoWrong").hidden=!wrong.length;$("#revTtl").hidden=!wrong.length;
  $("#review").innerHTML=wrong.map(l=>"<div class='rv card tp-"+l.q.topic+"'><span class='chip'>"+tname(l.q.topic)+"</span> <span class='chip sl'>📄 Slide "+l.q.sl+"</span><div class='q'>"+l.q.q+"</div><div class='a'><span class='y'>Your answer: "+l.user+"</span><span class='c'>Correct: "+esc(l.q.show||l.q.correct)+"</span><span>"+l.q.explain+"</span></div></div>").join("");
  show("results")}
$("#againBtn").onclick=()=>startQuiz(Q.mode,Q.fmt,Q.n,Q.topics,Q.label);
$("#redoWrong").onclick=()=>{const list=Q.log.filter(l=>!l.ok).map(l=>l.q.type==="mc"?Object.assign({},l.q,{choices:shuffle(l.q.choices)}):l.q);const m=Q;startQuiz("drill",m.fmt,list.length,m.topics,"Practice my mistakes",shuffle(list));Q.retry=true};

/* ---------- flashcards ---------- */
let FL=null;
function startFlash(n,topics){let deck=shuffle(FACT_OBJ.filter(f=>topics.has(f.t))).slice(0,n);FL={deck,i:0,known:0,learning:[],total:deck.length};show("flash");renderFlash()}
function renderFlash(){const A=$("#fArea");
  if(FL.i>=FL.deck.length){$("#fProg").style.width="100%";$("#fCount").textContent=FL.total+" / "+FL.total;const l=FL.learning;
    A.innerHTML="<div class='res card'><div style='font-size:46px'>🃏</div><h2>Deck done!</h2><p style='margin:0'>You knew <b>"+FL.known+"</b> card"+(FL.known===1?"":"s")+" right away.</p>"+(l.length?"<p class='muted' style='margin:0'>Still learning: "+l.map(c=>esc(c.term)).join(", ")+"</p>":"")+"<div class='row' style='justify-content:center'>"+(l.length?"<button class='btn pri' id='fAgain'>Review “still learning” cards</button>":"")+"<button class='btn' id='fNew'>New deck</button><button class='btn' data-home>Home</button></div></div>";
    if(l.length)$("#fAgain").onclick=()=>{FL={deck:shuffle(l),i:0,known:0,learning:[],total:l.length};renderFlash()};$("#fNew").onclick=()=>openSetup("flash");return}
  const c=FL.deck[FL.i];$("#fProg").style.width=(FL.i/FL.deck.length*100)+"%";$("#fCount").textContent=(FL.i+1)+" / "+FL.deck.length;
  A.innerHTML="<div class='flip tp-"+c.t+"'><button class='fcard' id='fc' aria-label='Flip card'><div class='face f'><div><span class='chip'>"+TOPICS[c.t].icon+" "+tname(c.t)+"</span><div class='big' style='margin-top:12px'>"+esc(c.term)+"</div></div><span class='tapnote'>Tap to flip 🔄</span></div><div class='face b'><div>"+esc(c.def)+"<div style='margin-top:10px'><span class='chip sl'>📄 Slide "+c.sl+"</span></div></div><span class='tapnote'>Tap to flip back</span></div></button></div><div class='row' style='justify-content:center;margin-top:18px'><button class='btn' id='fNo'>😅 Still learning</button><button class='btn good' id='fYes'>😎 I know it!</button></div>";
  const fc=$("#fc");fc.onclick=()=>fc.classList.toggle("on");
  $("#fYes").onclick=()=>{FL.known++;FL.i++;renderFlash()};
  $("#fNo").onclick=()=>{if(!FL.learning.includes(c))FL.learning.push(c);FL.i++;renderFlash()}}
document.addEventListener("keydown",e=>{if($("#v-flash").hidden)return;if(e.key===" "&&$("#fc")){e.preventDefault();$("#fc").click()}});

/* ---------- boot ---------- */
applyTheme();renderHome();
if("serviceWorker" in navigator&&location.protocol.startsWith("http")){
  navigator.serviceWorker.register("sw.js").then(()=>navigator.serviceWorker.ready).then(()=>{$("#offPill").hidden=false}).catch(()=>{})}
})();
