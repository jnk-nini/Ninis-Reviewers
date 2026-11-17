(function(){
"use strict";
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const tname=t=>TOPICS[t].short;
const lessonNo=t=>TK.indexOf(t)+1;
const slTxt=sl=>"Slide"+(/[–,-]/.test(String(sl))?"s ":" ")+sl;
const DAY=864e5;
const NITC="Not in the choices";

/* ---------- storage (safe) ---------- */
const KEY="jpl-midterm-reviewer-v1"; /* same key as before: do not change it, it keeps everyone's saved progress */
const PREFS={nitc:false,strict:false,timer:false,dir:"tm",typeFirst:false};
let S={mastery:{},cards:{},wrong:{},best:{},theme:null,lastTopic:"k",srs:{},studied:{},prefs:Object.assign({},PREFS),recall:false,last:null};
try{const o=JSON.parse(localStorage.getItem(KEY)||"{}");S=Object.assign(S,o);S.prefs=Object.assign({},PREFS,o.prefs||{});S.srs=S.srs||{};S.studied=S.studied||{}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

/* ---------- answer checking (accents/ñ, case, punctuation ignored; small typos allowed) ---------- */
const norm=s=>String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[–—]/g,"-").replace(/^(ang|ng|si|ni|sa|the|a|an)\s+/,"").replace(/[^a-z0-9]/g,"");
function lev(a,b){if(Math.abs(a.length-b.length)>3)return 9;const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]}
function checkText(inp,acc){const u=norm(inp);if(!u)return false;
  return acc.some(a=>{const n=norm(a);if(!n)return false;if(u===n)return true;const tol=n.length>=12?2:n.length>=5?1:0;return tol>0&&Math.abs(u.length-n.length)<=tol&&lev(u,n)<=tol})}
function containsAny(text,alts){const t=norm(text);return alts.some(a=>{const n=norm(a);return n.length>=3&&t.includes(n)})}
const squash=s=>String(s).trim().replace(/\s+/g," ");

/* ---------- units: one per source item (progress is tracked per unit) ---------- */
const FACT_OBJ=FACTS.map(f=>({src:"f",t:f[0],term:f[1],def:f[2],clue:f[3],alts:f[4],sl:f[5],id:"c:"+f[1]}));
function accepted(f){const a=[f.term,...f.alts];const nop=f.term.replace(/\s*\(.*?\)\s*/g," ").trim();if(nop!==f.term)a.push(nop);const m=f.term.match(/\(([^)]+)\)/);if(m)a.push(m[1]);return a}
const MCS=MC.map(m=>({src:"m",t:m[0],q:m[1],ans:m[2],ds:m[3],clue:m[4],ex:m[5],sl:m[6],id:"m:"+m[1]}));
const TFS=TF.map((x,i)=>{const c=COUNTERS[i];return{src:"t",t:x[0],s:x[1],tr:!!x[2],ex:x[3],clue:x[4],sl:x[5],w:c&&x[1].includes(c[0])?c[0]:null,r:c?c[1]:null,id:"t:"+x[1]}});
const FIL=FILL.map(x=>({src:"b",t:x[0],s:x[1],answers:x[2],clue:x[3],sl:x[4],id:"b:"+x[1]}));
const ENM=ENUM.map(x=>({src:"e",t:x[0],q:x[1],items:x[2].map(s=>s.split("|")),clue:x[3],sl:x[4],id:"e:"+x[1]}));
const SPL=SPELL.map(x=>({src:"s",t:x[0],sl:x[1],ans:x[2],ds:x[3],what:x[4],id:"s:"+x[2]}));
const ALL=[].concat(FACT_OBJ,MCS,TFS,FIL,ENM,SPL);
const BYID={};ALL.forEach(u=>BYID[u.id]=u);
const box=u=>{const r=S.srs[u.id];return r?r.b:0};
function mark(u,ok,clue){if(!u||!BYID[u.id])return;const r=S.srs[u.id]||(S.srs[u.id]={b:0,w:0,n:0});r.n++;
  if(ok){if(!clue)r.b=Math.min(5,r.b+1);delete S.wrong[u.id]}else{r.b=0;r.w++;S.wrong[u.id]=1}save()}
function readiness(t){const us=ALL.filter(u=>!t||u.t===t);if(!us.length)return 0;return Math.round(us.reduce((a,u)=>a+Math.min(box(u),2)/2,0)/us.length*100)}

/* carry old progress over once: old mistakes → mistakes list, recall-card boxes → readiness */
if(!S.v2){
  Object.keys(S.wrong).forEach(k=>{let id=k;if(/^[fi]:/.test(k))id="c:"+k.slice(2);delete S.wrong[k];if(BYID[id]){S.wrong[id]=1;if(!S.srs[id])S.srs[id]={b:0,w:1,n:1}}});
  Object.keys(S.cards).forEach(id=>{if(BYID[id]&&!S.srs[id])S.srs[id]={b:Math.min(2,S.cards[id].b||0),w:0,n:1}});
  S.v2=1;save()}

/* ---------- question builders ---------- */
/* misspelled / wrong-capital version of an answer, for the “Not in the choices” trap */
function variant(a){
  const ws=a.split(" ");const order=shuffle(ws.map((_,i)=>i));
  for(const i of order){const w=ws[i];
    if(w.length>=3&&/^[A-Z]+$/.test(w)){ws[i]=w[0]+w.slice(1).toLowerCase();return ws.join(" ")}}
  for(const i of order){const w=ws[i];if(w.length>=5&&/^[a-z-]+$/i.test(w)){
    const opts=[];for(let k=1;k<w.length-2;k++)if(w[k]!==w[k+1]&&/[a-z]/.test(w[k])&&/[a-z]/.test(w[k+1]))opts.push(k);
    if(opts.length){const k=pick(opts);ws[i]=w.slice(0,k)+w[k+1]+w[k]+w.slice(k+2);return ws.join(" ")}}}
  return null}
function mcBuild(u,fmt,qHTML,ans,ds,o){
  let choices,correct=ans,trap="";
  const useN=SET.nitc&&Math.random()<.6;
  if(useN&&Math.random()<.4){
    let wr=shuffle(ds).slice(0,3);
    if(!o.noVariant){const v=variant(ans);if(v&&v!==ans&&!ds.includes(v)&&Math.random()<.65){wr=shuffle(ds).slice(0,2).concat([v]);trap=v}}
    choices=shuffle(wr).concat([NITC]);correct=NITC}
  else if(useN)choices=shuffle([ans].concat(shuffle(ds).slice(0,2))).concat([NITC]);
  else choices=shuffle([ans].concat(shuffle(ds).slice(0,3)));
  return{u,fmt,type:"mc",topic:u.t,q:qHTML,ask:o.ask,choices,correct,ans,trap,clue:o.clue,explain:o.explain,sl:u.sl}}
const isNum=s=>/^\d/.test(s);
function fillDistractors(u){const a=u.answers[0],nu=u.answers.map(norm);
  const pool=FIL.filter(x=>x!==u).map(x=>x.answers[0]).filter(x=>!nu.includes(norm(x)));
  let same=pool.filter(x=>isNum(x)===isNum(a));
  if(isNum(a)&&a.length===4){const y=+a;same=[y-2,y-1,y+1,y+3].map(String).concat(same.filter(x=>x.length===4))}
  else if(isNum(a)){const n=+a;same=[n-1,n+1,n+2,n*2].filter(x=>x>0).map(String).concat(same)}
  else{const st=FIL.filter(x=>x!==u&&x.t===u.t&&!isNum(x.answers[0])).map(x=>x.answers[0]).filter(x=>!nu.includes(norm(x)));same=shuffle(st).concat(shuffle(same))}
  const out=[];same.forEach(x=>{if(out.length<5&&!out.some(y=>norm(y)===norm(x))&&!nu.includes(norm(x)))out.push(x)});return out}
function fillQ(u){return esc(u.s).replace("___","<span class='blank'>&nbsp;</span>")}
function filled(u){return esc(u.s).replace("___","<b>"+esc(u.answers[0])+"</b>")}
function tfExplain(u){const n=u.ex?"<br><span class='muted'>"+esc(u.ex)+"</span>":"";
  if(u.tr)return"<b>Tama.</b> "+esc(u.ex);
  if(!u.w)return"<b>Mali.</b> "+esc(u.ex);
  const fixed=esc(u.s).replace(esc(u.w),"<span class='fix'>"+esc(u.r)+"</span>");
  return"<b>Mali.</b> The counter: <span class='strike'>"+esc(u.w)+"</span> → <span class='fix'>"+esc(u.r)+"</span><br><span class='muted'>Tamang pahayag:</span> "+fixed+n}
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
    const u={src:"o",t:topic,id:"o:"+sig};
    u.q={u,fmt:"order",type:"order",topic,ask:"Timeline order",q:"Put these events in order, from <b>earliest</b> to <b>latest</b>.",events:shuffle(set),sorted,
      clue:"Hint: "+sorted[0][3].slice(0,60)+"… happened first.",
      explain:"<ol style='margin:4px 0;padding-left:20px'>"+sorted.map(e=>"<li><b>"+esc(e[1])+"</b> — "+esc(e[3])+"</li>").join("")+"</ol>",
      sl:sorted.map(e=>e[4]).join(", "),show:sorted.map(e=>e[1]).join(" → ")};
    out.push(u)}
  return out}
function build(u,fmt){
  switch(fmt){
  case"cmc":return mcBuild(u,fmt,esc(u.q),u.ans,u.ds,{ask:"Multiple choice",clue:u.clue,explain:esc(u.ex),noVariant:true});
  case"tmc":{let pool=FACT_OBJ.filter(x=>x!==u&&x.t===u.t&&norm(x.term)!==norm(u.term));
    if(pool.length<3)pool=pool.concat(FACT_OBJ.filter(x=>x.t!==u.t));
    const ds=shuffle(pool).slice(0,3).map(x=>x.term);
    return mcBuild(u,fmt,"<span class='defq'>“"+esc(u.def)+"”</span>",u.term,ds,{ask:"Which term matches this description?",clue:u.clue,explain:"<b>"+esc(u.term)+"</b>: "+esc(u.def)})}
  case"pmc":return mcBuild(u,fmt,fillQ(u),u.answers[0],fillDistractors(u),{ask:"Choose the missing word",clue:u.clue,explain:filled(u),noVariant:true});
  case"spell":return mcBuild(u,fmt,"<span class='defq'>"+esc(u.what)+"</span>",u.ans,u.ds,{ask:"Which spelling is exactly as written in the slides?",clue:"Letters, ñ, capitals and spaces count. It's about: "+u.what+".",explain:"Exact spelling: <b>"+esc(u.ans)+"</b>",noVariant:true});
  case"tf":return{u,fmt,type:"tf",topic:u.t,q:esc(u.s),ask:"Tama o Mali?",choices:["Tama","Mali"],correct:u.tr?"Tama":"Mali",clue:u.clue,explain:tfExplain(u),sl:u.sl};
  case"ctr":return{u,fmt,type:"ctr",topic:u.t,q:"",ask:"This statement is MALI. Tap the word that makes it wrong.",clue:u.clue,explain:tfExplain(u),sl:u.sl,correct:u.w};
  case"id":{const a=accepted(u);return{u,fmt,type:"typed",topic:u.t,q:"<span class='defq'>“"+esc(u.def)+"”</span>",ask:"Identify",answers:a,strictAns:[u.term],official:u.term,clue:u.clue,explain:"<b>"+esc(u.term)+"</b>: "+esc(u.def),sl:u.sl,hint:"Type the name or term (spelling and accents are forgiving)"}}
  case"fill":return{u,fmt,type:"typed",topic:u.t,q:fillQ(u),ask:"Fill in the blank",answers:u.answers,strictAns:u.answers,official:u.answers[0],clue:u.clue,explain:filled(u),sl:u.sl,hint:"Type the missing word, name, or number"};
  case"enum":return{u,fmt,type:"enum",topic:u.t,q:esc(u.q),ask:"Enumeration",items:u.items,show:u.items.map(a=>a[0]).join(", "),clue:u.clue,explain:"<b>Answer:</b> "+esc(u.items.map(a=>a[0]).join(", ")),sl:u.sl,hint:"One item per line, or separate with commas. Order does not matter."};
  case"order":return u.q}}

/* ---------- formats ---------- */
const FORMATS={
  cmc:{name:"Multiple choice",d:"Questions from the slides. Pick A, B, C or D.",icon:"🔤",units:()=>MCS},
  tmc:{name:"Which term?",d:"Read the description, pick the exact name or term.",icon:"📚",units:()=>FACT_OBJ},
  tf:{name:"Tama o Mali",d:"One changed word can make it Mali.",icon:"✅",units:()=>TFS},
  ctr:{name:"Find the counter",d:"Tap the word that makes a statement Mali.",icon:"🔍",units:()=>TFS.filter(u=>!u.tr&&u.w)},
  id:{name:"Identification (type)",d:"Read the description, type the answer.",icon:"🔎",units:()=>FACT_OBJ},
  fill:{name:"Fill in the blank (type)",d:"Type the missing word.",icon:"✏️",units:()=>FIL},
  pmc:{name:"Missing word (choices)",d:"Pick the missing word from four choices.",icon:"🧩",units:()=>FIL},
  enum:{name:"Enumeration",d:"List all the items.",icon:"📋",units:()=>ENM},
  spell:{name:"Spelling",d:"Pick the exact spelling from the slides.",icon:"🔠",units:()=>SPL},
  order:{name:"Timeline order",d:"Arrange events by date.",icon:"🗓️",units:t=>orderQs(t)}
};
const TYPE_NAME={cmc:"Multiple choice",tmc:"Which term",tf:"Tama o Mali",ctr:"Find the counter",id:"Identification",fill:"Fill in the blank",pmc:"Missing word",enum:"Enumeration",spell:"Spelling",order:"Timeline order"};
const PRESETS=[["exam","🎓 Exam mix",["cmc","tmc","tf","id","fill","enum"]],["recall","🧠 Recall (typing)",["id","fill","ctr","enum"]],["all","⭐ Everything",Object.keys(FORMATS)]];

/* ---------- selection ---------- */
function pairs(fmts,topics){const out=[];fmts.forEach(f=>FORMATS[f].units(topics).forEach(u=>{if(topics.has(u.t))out.push([u,f])}));return out}
function uniqueUnits(fmts,topics){const s=new Set();pairs(fmts,topics).forEach(p=>s.add(p[0].id));return s.size}
function prio(u){const r=S.srs[u.id];if(!r)return 1+Math.random();if(r.b===0)return Math.random()*.9;return 1.5+r.b+Math.random()}
function select(fmts,topics,n,smart){
  const ps=pairs(fmts,topics);const used=new Set(),out=[];
  if(smart){ps.map(p=>[p,prio(p[0])]).sort((a,b)=>a[1]-b[1]).forEach(([p])=>{if(out.length<n&&!used.has(p[0].id)){used.add(p[0].id);out.push(p)}});return shuffle(out)}
  const by={};fmts.forEach(f=>by[f]=[]);ps.forEach(p=>by[p[1]].push(p));
  const pools=fmts.map(f=>shuffle(by[f]));let i=0,guard=0;
  while(out.length<n&&pools.some(p=>p.length)&&guard<100000){const p=pools[i%pools.length];guard++;
    while(p.length){const c=p.pop();if(!used.has(c[0].id)){used.add(c[0].id);out.push(c);break}}i++}
  return shuffle(out)}
function fmtFor(u){return{f:pick(["tmc","id"]),m:"cmc",t:u.w&&Math.random()<.4?"ctr":"tf",b:pick(["fill","pmc"]),e:"enum",s:"spell"}[u.src]}

/* ---------- views & routing ---------- */
const VIEWS=["home","notes","cheat","tline","gloss","practice","setup","quiz","results","flash","rcards","list","dump","essay"];
const TOP={home:1,notes:1,cheat:1,tline:1,gloss:1,practice:1};
const NAVOF={tline:"notes"};
let cur="home";
function show(v){cur=v;VIEWS.forEach(x=>$("#v-"+x).hidden=x!==v);
  const nav=TOP[v]?(NAVOF[v]||v):"practice";$$(".topnav [data-go],.tabbar [data-go]").forEach(b=>b.setAttribute("aria-current",b.dataset.go===nav?"page":"false"));
  window.scrollTo({top:0});if(v==="home")renderHome();stopTimer()}
function go(v){if(TOP[v]){if(location.hash!=="#"+v)location.hash=v;else route()}else show(v)}
function route(){const h=location.hash.slice(1);const v=TOP[h]?h:"home";
  if(v==="notes")renderNotes();else if(v==="cheat")renderCheat();else if(v==="gloss")renderGloss();else if(v==="practice")renderPractice();else if(v==="tline")renderTL();
  show(v)}
window.addEventListener("hashchange",route);
document.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b){e.preventDefault();go(b.dataset.go)}});

/* theme */
function isDark(){return S.theme?S.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches}
function applyTheme(){if(S.theme)document.documentElement.setAttribute("data-theme",S.theme);else document.documentElement.removeAttribute("data-theme");$("#thmBtn").textContent=isDark()?"☀️":"🌙"}
$("#thmBtn").onclick=()=>{S.theme=isDark()?"light":"dark";save();applyTheme()};

/* ---------- home ---------- */
const TILES={
  notes:["📒","Study notes","All 8 lessons with a must-know list, search and Recall mode.","go"],
  cheat:["🧾","Cheat sheet","Lesson map, dates, look-alikes, counters, spelling.","go"],
  tline:["🗓️","Timeline","Every date in order, from 1906 to 1949.","go"],
  gloss:["📚","Glossary","Search every name, term and place.","go"],
  rcards:["🧠","Recall cards","Spaced repetition. Cards you miss come back sooner.","act"],
  flash:["🃏","Flashcards","Flip, or type first, to memorize names and terms.","act"],
  list:["📋","List recall","Type every item of a list from memory.","act"],
  dump:["✍️","Brain dump","Write everything you remember, then check what you missed.","act"],
  essay:["🗒️","Essay practice","“Sagutin” questions from the slides, with key points.","act"],
  drill:["🎯","Drill","Instant feedback and a clue for every question.","act"],
  exam:["📝","Mock exam","Answers shown only at the end, like a real exam.","act"],
  smart:["🧠","Smart review","Your mistakes and unseen items first.","act"],
  weak:["💪","Weak spot","A quick drill on the lesson you know least.","act"],
  mistakes:["🔁","My mistakes","Redo every question you got wrong before.","act"],
  counter:["🔍","Find the counter","Spot the one word that makes it Mali.","act"],
  spellq:["🔠","Spelling drill","Exact spelling of names, with ñ and capitals.","act"]
};
function tile(k){const t=TILES[k];let badge="";
  if(k==="rcards"){const d=dueCards().length;if(d)badge="<span class='badge'>"+d+" due</span>"}
  if(k==="mistakes"){const w=Object.keys(S.wrong).filter(id=>BYID[id]).length;if(w)badge="<span class='badge'>"+w+" to redo</span>"}
  return"<button class='tile' "+(t[3]==="go"?"data-go='"+k+"'":"data-act='"+k+"'")+"><span class='ic' aria-hidden='true'>"+t[0]+"</span><h4>"+t[1]+"</h4><p>"+t[2]+"</p>"+badge+"</button>"}
function dueCards(topics){const now=Date.now();return FACT_OBJ.filter(f=>(!topics||topics.has(f.t))&&S.cards[f.id]&&S.cards[f.id].due<=now)}
function renderHome(){
  $("#tiles1").innerHTML=["notes","cheat","tline","gloss"].map(tile).join("");
  $("#tiles2").innerHTML=["rcards","flash","list","dump","essay"].map(tile).join("");
  $("#tiles3").innerHTML=["drill","exam","smart","weak","mistakes","counter","spellq"].map(tile).join("");
  const avg=readiness();$("#ring").style.setProperty("--p",avg);$("#ringPct").textContent=avg+"%";
  $("#mast").innerHTML=TK.map(t=>{const v=readiness(t);return"<div class='mrow tp-"+t+"'><span>"+TOPICS[t].icon+" "+tname(t)+"</span><span class='tr'><i style='width:"+v+"%'></i></span><span>"+v+"%</span></div>"}).join("");
  const started=Object.keys(S.srs).length||Object.keys(S.studied).length;
  $("#contBtn").textContent=started?"📒 Continue studying":"📒 Start studying";
  const r=$("#resume"),k=S.last,sec=secByKey(k);
  r.hidden=!sec;if(sec)r.innerHTML="<button class='btn sm' data-resume='"+k+"'>▶ Continue where you left off: "+esc(sec.h)+"</button>"}
function renderPractice(){$("#pTiles").innerHTML=["drill","exam","smart","weak","mistakes","counter","spellq"].map(tile).join("");
  $("#pTiles2").innerHTML=["rcards","flash","list","dump","essay"].map(tile).join("")}
let resetArm=null;
$("#resetBtn").onclick=e=>{const b=e.currentTarget;if(b.dataset.arm){clearTimeout(resetArm);S.mastery={};S.cards={};S.wrong={};S.best={};S.srs={};S.studied={};S.last=null;save();delete b.dataset.arm;b.textContent="Progress cleared";renderHome();setTimeout(()=>b.textContent="Reset progress",1500)}
  else{b.dataset.arm="1";b.textContent="Tap again to erase all progress";resetArm=setTimeout(()=>{delete b.dataset.arm;b.textContent="Reset progress"},3000)}};
function startMistakes(){const list=Object.keys(S.wrong).map(id=>BYID[id]).filter(Boolean);
  if(!list.length){alert("No saved mistakes yet. Take a drill or quiz first. 🌱");return}
  startQuiz("drill",list.length,new Set(TK),"🔁 My mistakes",shuffle(list).map(u=>build(u,fmtFor(u))),false,startMistakes)}
document.addEventListener("click",e=>{
  const rs=e.target.closest("[data-resume]");if(rs){openSection(rs.dataset.resume);return}
  const op=e.target.closest("[data-open]");if(op){nf=op.dataset.open;S.lastTopic=nf;save();$("#nSearch").value="";go("notes");return}
  const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act;
  if(a==="drill"||a==="smart"||a==="flash"||a==="list"||a==="rcards")openSetup(a);
  else if(a==="exam"){SET.topics=new Set(TK);SET.count=50;openSetup("exam")}
  else if(a==="quick"){SET.fmts=new Set(PRESETS[0][2]);startQuiz("drill",10,new Set(TK),"⚡ Quick 10",null,true)}
  else if(a==="counter")openSetup("drill",["ctr"]);
  else if(a==="spellq")openSetup("drill",["spell"]);
  else if(a==="dump"){renderDump();show("dump")}
  else if(a==="essay"){renderEssay();show("essay")}
  else if(a==="mistakes")startMistakes();
  else if(a==="weak"){let w=TK[0],lo=1e9;TK.forEach(t=>{const x=readiness(t)+Math.random();if(x<lo){lo=x;w=t}});
    SET.fmts=new Set(PRESETS[0][2]);startQuiz("drill",10,new Set([w]),"💪 Weak spot: "+tname(w),null,true)}});

/* ---------- notes ---------- */
let nf=S.lastTopic&&(S.lastTopic==="all"||TOPICS[S.lastTopic])?S.lastTopic:"k",visible=[];
const secText=s=>(s.h+" "+s.b).replace(/<[^>]+>/g," ").toLowerCase();
function secByKey(k){if(!k)return null;const t=k[0];if(!NOTES[t])return null;if(k.slice(1)==="m")return MUST[t]?{h:"Must-know: "+tname(t),b:MUST[t].join(" ")}:null;return NOTES[t][+k.slice(1)]||null}
function mustSec(t){return{h:"⭐ Must-know: "+TOPICS[t].n,sl:TOPICS[t].sl,b:"<ul>"+MUST[t].map(x=>"<li>"+x+"</li>").join("")+"</ul>"}}
function updateSub(){const done=visible.filter(k=>S.studied[k]).length;$("#notesSub").textContent=done+" of "+visible.length+" sections studied"}
function renderNotes(){
  const q=$("#nSearch").value.trim().toLowerCase();
  $("#nFilter").innerHTML="<button class='pill' aria-pressed='"+(nf==="all"&&!q)+"' data-nf='all'>📚 All lessons</button>"+TK.map((k,i)=>"<button class='pill tp tp-"+k+"' aria-pressed='"+(k===nf&&!q)+"' data-nf='"+k+"'>"+(i+1)+". "+TOPICS[k].icon+" "+tname(k)+"</button>").join("");
  const tks=q?TK:nf==="all"?TK:[nf];
  visible=[];let html="",hits=0;
  const secsOf=t=>[["m",mustSec(t)]].concat(NOTES[t].map((s,i)=>[String(i),s])).filter(p=>!q||secText(p[1]).includes(q));
  tks.forEach(t=>hits+=secsOf(t).length);
  const openAll=!!q&&hits<=6;
  if(q)html+="<p class='muted small' style='margin:12px 0 0'>Searching all lessons: "+hits+" section"+(hits===1?"":"s")+" found.</p>";
  tks.forEach(t=>{const secs=secsOf(t);if(!secs.length)return;
    const dn=secs.filter(p=>S.studied[t+p[0]]).length;
    html+="<div class='thead tp-"+t+"'><span class='chip'>Lesson "+lessonNo(t)+"</span><h3 style='margin-top:6px'>"+TOPICS[t].icon+" "+esc(TOPICS[t].n)+"</h3><p>"+slTxt(TOPICS[t].sl)+" · <span data-th='"+t+"'>"+dn+"/"+secs.length+"</span> studied</p></div>";
    html+=secs.map(([i,s])=>{const k=t+i;visible.push(k);const must=i==="m";
      return"<details class='sec card tp-"+t+(must?" must":"")+(S.studied[k]?" done":"")+"' data-k='"+k+"'"+((!q&&tks.length===1&&must)||openAll?" open":"")+"><summary><span class='done-dot' aria-hidden='true'>✓</span><span class='h'>"+esc(s.h)+"<small>"+slTxt(s.sl)+"</small></span></summary><div class='body'>"+s.b+
      "<div class='secacts'><button class='btn sm"+(S.studied[k]?" good":"")+"' data-study='"+k+"'>"+(S.studied[k]?"✓ Studied":"Mark as studied")+"</button><button class='btn sm ghost' data-quick='"+t+"'>Quick drill: "+esc(tname(t))+" ▶</button></div></div></details>"}).join("");
    if(!q)html+="<div class='row lessonacts'><button class='btn pri' data-quick='"+t+"'>Quick drill on this lesson ▶</button><button class='btn' data-qrecall='"+t+"'>🧠 Recall cards</button><button class='btn' data-qlist='"+t+"'>📋 List recall</button></div>"});
  if(!q&&nf!=="all"&&TK.indexOf(nf)<TK.length-1){const nx=TK[TK.indexOf(nf)+1];html+="<div class='row' style='justify-content:flex-end'><button class='btn' data-nf='"+nx+"'>Next lesson: "+esc(tname(nx))+" →</button></div>"}
  $("#notesList").innerHTML=html||"<p class='muted' style='margin-top:16px'>No section matches “"+esc(q)+"”. Try another word.</p>";
  updateSub();
  $("#notesList").classList.toggle("recall",!!S.recall);$("#recallTog").setAttribute("aria-pressed",!!S.recall);
  syncExpand()}
$("#nSearch").oninput=renderNotes;
$("#nFilter").onclick=e=>{const b=e.target.closest("[data-nf]");if(b){nf=b.dataset.nf;S.lastTopic=nf;save();$("#nSearch").value="";renderNotes()}};
$("#recallTog").onclick=()=>{S.recall=!S.recall;save();$("#notesList").classList.toggle("recall",S.recall);$("#recallTog").setAttribute("aria-pressed",S.recall);$$("#notesList b.shown").forEach(k=>k.classList.remove("shown"))};
/* ONE toggle: opens every section, or closes every section. It follows what you open or close by hand. */
function syncExpand(){const ds=$$("#notesList details"),all=ds.length>0&&ds.every(d=>d.open);
  $("#expandTog").setAttribute("aria-pressed",all);$("#expandLbl").textContent=all?"Collapse all":"Expand all";$("#expandTog").disabled=!ds.length}
$("#expandTog").onclick=()=>{const ds=$$("#notesList details");if(!ds.length)return;const all=ds.every(d=>d.open);ds.forEach(d=>d.open=!all);syncExpand()};
$("#notesList").addEventListener("toggle",syncExpand,true);
function openSection(k){nf=k[0];S.lastTopic=nf;save();$("#nSearch").value="";go("notes");
  setTimeout(()=>{const d=document.querySelector("#notesList details[data-k='"+k+"']");if(d){d.open=true;d.scrollIntoView({behavior:"smooth",block:"start"})}},60)}
$("#v-notes").addEventListener("click",e=>{
  const n=e.target.closest("#notesList [data-nf]");if(n){nf=n.dataset.nf;S.lastTopic=nf;save();renderNotes();window.scrollTo({top:0});return}
  const sm=e.target.closest("summary");if(sm){const d=sm.parentElement;if(d.dataset.k){S.last=d.dataset.k;save()}}
  const k=e.target.closest(".recall .sec .body b");if(k){k.classList.toggle("shown");return}
  const st=e.target.closest("[data-study]");if(st){const key=st.dataset.study;S.studied[key]=!S.studied[key];if(!S.studied[key])delete S.studied[key];S.last=key;save();const d=st.closest("details");d.classList.toggle("done",!!S.studied[key]);st.classList.toggle("good",!!S.studied[key]);st.textContent=S.studied[key]?"✓ Studied":"Mark as studied";
    const t=key[0],vis=visible.filter(x=>x[0]===t),el=document.querySelector("[data-th='"+t+"']");if(el)el.textContent=vis.filter(x=>S.studied[x]).length+"/"+vis.length;updateSub();return}
  const q=e.target.closest("[data-quick]");if(q){SET.fmts=new Set(PRESETS[0][2]);startQuiz("drill",10,new Set([q.dataset.quick]),"Quick drill: "+tname(q.dataset.quick),null,true);return}
  const r=e.target.closest("[data-qrecall]");if(r){startRecall(new Set([r.dataset.qrecall]),15);return}
  const l=e.target.closest("[data-qlist]");if(l){startList(10,new Set([l.dataset.qlist]))}});

/* ---------- cheat sheet ---------- */
let chTab="map",chT="all";
const CH_TABS=[["map","🗺️ Lesson map"],["nums","🔢 Numbers & dates"],["pairs","👯 Look-alikes"],["ctr","🔁 Counters"],["spell","🔠 Spelling"],["nitc","🎯 Not in the choices"]];
function chipTopics(curT){return"<div class='pills scroll' style='margin:12px 0'><button class='pill' aria-pressed='"+(curT==="all")+"' data-chf='all'>📚 All lessons</button>"+TK.map((t,i)=>"<button class='pill tp tp-"+t+"' aria-pressed='"+(curT===t)+"' data-chf='"+t+"'>"+(i+1)+". "+TOPICS[t].icon+" "+tname(t)+"</button>").join("")+"</div>"}
function renderCheat(){
  $("#chTabs").innerHTML=CH_TABS.map(x=>"<button class='pill' role='tab' aria-selected='"+(chTab===x[0])+"' aria-pressed='"+(chTab===x[0])+"' data-ct='"+x[0]+"'>"+x[1]+"</button>").join("");
  const B=$("#chBody"),inT=x=>chT==="all"||x===chT;
  if(chTab==="map"){
    B.innerHTML="<p class='muted'>What is in each lesson, in the order of the slides. Tap a card to open its notes.</p><div class='map'>"+TK.map(t=>"<button class='mapc card tp-"+t+"' data-open='"+t+"'><span class='chip'>Lesson "+lessonNo(t)+" · "+slTxt(TOPICS[t].sl)+"</span><h3>"+TOPICS[t].icon+" "+esc(TOPICS[t].n)+"</h3><ul>"+NOTES[t].map(s=>"<li>"+esc(s.h)+"</li>").join("")+"</ul><span class='go'>Open notes ▶</span></button>").join("")+"</div>"}
  else if(chTab==="nums"){
    B.innerHTML="<p class='muted'>The years, dates and numbers from the slides. Exams love these. The full list of events is in the <a href='#tline'>Timeline</a>.</p>"+chipTopics(chT)+
      "<div class='numt'>"+NUMS.filter(x=>inT(x[0])).map(x=>"<div class='card tp-"+x[0]+"'><span class='chip'>"+esc(tname(x[0]))+"</span><b>"+esc(x[2])+"</b><span class='v'>"+esc(x[3])+"</span><span class='chip sl'>"+slTxt(x[1])+"</span></div>").join("")+"</div>"+
      "<div class='row' style='margin-top:12px'><button class='btn pri' data-practice='fill'>Practice fill in the blank ▶</button><button class='btn' id='chOrder'>Timeline order ▶</button></div>"}
  else if(chTab==="pairs"){
    B.innerHTML="<p class='muted'>Names and terms that are easy to mix up. Know exactly what separates them.</p>"+chipTopics(chT)+
      PAIRS.filter(x=>inT(x[0])).map(x=>"<div class='trapc card tp-"+x[0]+"'><b>"+esc(x[1])+"</b> <span class='muted'>vs</span> <b>"+esc(x[2])+"</b><div class='yes muted'>"+esc(x[3])+"</div></div>").join("")+
      "<div class='row' style='margin-top:12px'><button class='btn pri' data-practice='tmc'>Practice: which term? ▶</button></div>"}
  else if(chTab==="ctr"){
    const list=TFS.filter(u=>!u.tr&&u.w&&inT(u.t));
    B.innerHTML="<p class='muted'>In Tama o Mali, one phrase is changed to make a statement Mali. Here is every Mali statement, with the wrong phrase crossed out and the slide's phrase next to it.</p>"+chipTopics(chT)+
      list.map(u=>{const body=esc(u.s).replace(esc(u.w),"<span class='strike'>"+esc(u.w)+"</span> <span class='fix'>"+esc(u.r)+"</span>");return"<div class='trapc card tp-"+u.t+"'><span class='chip'>"+esc(tname(u.t))+"</span> <span class='chip sl'>"+slTxt(u.sl)+"</span><div style='margin-top:8px'>"+body+"</div></div>"}).join("")+
      "<div class='row' style='margin-top:12px'><button class='btn pri' data-practice='ctr'>Practice: find the counter ▶</button><button class='btn' data-practice='tf'>Tama o Mali drill ▶</button></div>"}
  else if(chTab==="spell"){
    const list=SPL.filter(x=>inT(x.t));
    B.innerHTML="<p class='muted'>Exact spellings from the slides (watch the ñ, hyphens and capitals). Correct spelling in <b>bold</b>, common wrong versions crossed out.</p>"+chipTopics(chT)+
      "<div class='spl'>"+list.map(x=>"<div class='card tp-"+x.t+"'><b>"+esc(x.ans)+"</b><div class='small muted'>"+esc(x.what)+" · "+slTxt(x.sl)+"</div><div class='small' style='margin-top:4px'>"+x.ds.map(w=>"<s>"+esc(w)+"</s>").join("")+"</div></div>").join("")+"</div>"+
      "<div class='row' style='margin-top:12px'><button class='btn pri' data-practice='spell'>Practice spelling ▶</button></div>"}
  else{
    B.innerHTML="<div class='rule card'><h3>How to beat “Not in the choices”</h3><p class='muted small'>Some professors add this option to multiple choice. You can switch it on in the setup of any quiz.</p><ol style='padding-left:20px;margin:0'>"+
    "<li><b>Answer first, look second.</b> Read the question and say the exact name or term in your head <em>before</em> reading the options.</li>"+
    "<li><b>Scan all four options</b> for that exact answer, letter by letter: ñ, capitals, hyphens.</li>"+
    "<li><b>Exact answer is there?</b> Pick it. Never choose “Not in the choices” just because another option also sounds right.</li>"+
    "<li><b>Only a misspelled version is there, or it's missing?</b> → <b>Not in the choices</b>.</li>"+
    "<li><b>Synonyms don't count.</b> Follow the wording of the slides.</li></ol></div>"+
    "<div class='rule card'><h3>Example</h3><p style='margin:0'>Ang abugado ng mga Laurel na binayaran ng P10,000.00.</p>"+
    "<div class='demo'><div>A. Clyde De Wit</div><div>B. Claro M. Recto</div><div>C. Antero Soriano</div><div class='y'>D. Not in the choices ✓</div></div>"+
    "<p class='muted small' style='margin:0'>The slide says <b>Clyde De Witt</b> (two t's). Option A is misspelled, so the answer is D.</p></div>"+
    "<div class='row'><button class='btn pri' data-practice='spell'>Practice spelling ▶</button></div>"}}
$("#chTabs").onclick=e=>{const b=e.target.closest("[data-ct]");if(b){chTab=b.dataset.ct;renderCheat()}};
$("#chBody").onclick=e=>{const b=e.target.closest("[data-chf]");if(b){chT=b.dataset.chf;renderCheat();return}
  if(e.target.closest("#chOrder")){$("#tlDrill").click();return}
  const p=e.target.closest("[data-practice]");if(p)openSetup("drill",[p.dataset.practice])};

/* ---------- timeline ---------- */
let tlT="all";
function renderTL(){
  $("#tlTopics").innerHTML="<button class='pill' aria-pressed='"+(tlT==="all")+"' data-tt='all'>📚 All lessons</button>"+TK.filter(t=>TL.some(e=>e[0]===t)).map(t=>"<button class='pill tp tp-"+t+"' aria-pressed='"+(tlT===t)+"' data-tt='"+t+"'>"+TOPICS[t].icon+" "+tname(t)+"</button>").join("");
  const list=TL.filter(e=>tlT==="all"||e[0]===tlT).slice().sort((a,b)=>a[2]<b[2]?-1:1);
  $("#tlCount").textContent=list.length+" dates";
  $("#tlList").innerHTML=list.map(e=>"<div class='tli card tp-"+e[0]+"'><div class='d'>"+esc(e[1])+"</div><p>"+esc(e[3])+"</p><span class='chip'>"+tname(e[0])+"</span> <span class='chip sl'>"+slTxt(e[4])+"</span></div>").join("")}
$("#tlTopics").onclick=e=>{const b=e.target.closest("[data-tt]");if(b){tlT=b.dataset.tt;renderTL()}};
function timelineDrill(t){const qs=orderQs(t);if(qs.length)startQuiz("drill",Math.min(8,qs.length),t,"🗓️ Timeline practice",shuffle(qs).slice(0,8).map(u=>u.q),false,()=>timelineDrill(t));else alert("This lesson has too few dates for ordering. Pick “All lessons”.")}
$("#tlDrill").onclick=()=>timelineDrill(tlT==="all"?new Set(TK):new Set([tlT]));

/* ---------- glossary ---------- */
let glT="all";
function renderGloss(){
  $("#glTopics").innerHTML="<button class='pill' aria-pressed='"+(glT==="all")+"' data-gt='all'>📚 All lessons</button>"+TK.map(t=>"<button class='pill tp tp-"+t+"' aria-pressed='"+(glT===t)+"' data-gt='"+t+"'>"+TOPICS[t].icon+" "+tname(t)+"</button>").join("");
  const q=$("#glSearch").value.trim();const nq=q.toLowerCase();
  const list=FACT_OBJ.filter(f=>(glT==="all"||f.t===glT)&&(!nq||(f.term+" "+f.def+" "+f.alts.join(" ")).toLowerCase().includes(nq))).sort((a,b)=>a.term.localeCompare(b.term,"fil"));
  const hl=s=>{s=esc(s);if(!q)return s;const eq=esc(q);const i=s.toLowerCase().indexOf(eq.toLowerCase());return i<0?s:s.slice(0,i)+"<mark>"+s.slice(i,i+eq.length)+"</mark>"+s.slice(i+eq.length)};
  $("#glCount").textContent=list.length+" term"+(list.length===1?"":"s");
  $("#glList").innerHTML=list.length?list.map(f=>"<div class='gi card tp-"+f.t+"'><b>"+hl(f.term)+"</b><p>"+hl(f.def)+"</p><span class='chip'>"+tname(f.t)+"</span> <span class='chip sl'>"+slTxt(f.sl)+"</span></div>").join(""):"<p class='muted'>No match. Try another word.</p>"}
$("#glTopics").onclick=e=>{const b=e.target.closest("[data-gt]");if(b){glT=b.dataset.gt;renderGloss()}};
$("#glSearch").oninput=renderGloss;

/* ---------- setup ---------- */
let SET={mode:"drill",fmts:new Set(PRESETS[0][2]),topics:new Set(TK),count:10,nitc:S.prefs.nitc,strict:S.prefs.strict};
const MODE_TXT={
  drill:["🎯 Drill","You see the answer and explanation after every question.","Start drill ▶"],
  exam:["📝 Mock exam","Answers are revealed only at the end, like the real exam.","Start exam ▶"],
  smart:["🧠 Smart review","Your past mistakes come first, then items you have never seen.","Start review ▶"],
  flash:["🃏 Flashcards","Flip a card, then sort it: still learning or I know it.","Start flipping ▶"],
  rcards:["🧠 Recall cards","Answer from memory first, then rate yourself. Missed cards come back sooner.","Start recall ▶"],
  list:["📋 List recall","Type every item of a list from memory, then check.","Start recalling ▶"]
};
function openSetup(mode,fmts){SET.mode=mode;
  if(fmts)SET.fmts=new Set(fmts);else if(mode==="exam"||mode==="drill")SET.fmts=new Set(PRESETS[0][2]);else if(mode==="smart")SET.fmts=new Set(Object.keys(FORMATS).filter(f=>f!=="order"));
  const M=MODE_TXT[mode];$("#setupTitle").textContent=M[0];$("#setupSub").textContent=M[1];$("#startBtn").textContent=M[2];
  const q=mode==="drill"||mode==="exam"||mode==="smart";
  $("#fmtBox").hidden=!q;$("#optBox").hidden=!q;$("#flashBox").hidden=mode!=="flash";$("#timerRow").hidden=mode!=="exam";
  $("#lblTopics").textContent=q||mode==="flash"?"2":"1";$("#lblCount").textContent=q||mode==="flash"?"3":"2";
  $("#optNitc").checked=S.prefs.nitc;$("#optStrict").checked=S.prefs.strict;$("#optTimer").checked=S.prefs.timer;$("#typeFirst").checked=S.prefs.typeFirst;
  $("#setupNote").innerHTML=mode==="rcards"?"🧠 <b>How it works:</b> read the description, answer in your head (or type it), then tap <b>Show answer</b> and rate yourself honestly. Cards due for review come first.":mode==="flash"?"💡 Tap the card to flip it. Be honest: “still learning” cards come back at the end.":mode==="list"?"💡 Type every item you remember, one per line. Spelling is forgiving. Tap <b>First letters</b> if you are stuck.":"💡 Every question has a <b>clue</b>. Using a clue gives half points, so try first!";
  if(mode==="exam"&&SET.count<20)SET.count=50;
  renderSetup();show("setup")}
function maxAvail(){if(SET.mode==="flash"||SET.mode==="rcards")return FACT_OBJ.filter(f=>SET.topics.has(f.t)).length;if(SET.mode==="list")return ENM.filter(l=>SET.topics.has(l.t)).length;return uniqueUnits([...SET.fmts],SET.topics)}
function sameSet(a,b){return a.size===b.length&&b.every(x=>a.has(x))}
function renderSetup(){
  $("#presetPills").innerHTML=PRESETS.map(p=>"<button class='pill' aria-pressed='"+sameSet(SET.fmts,p[2])+"' data-preset='"+p[0]+"'>"+p[1]+"</button>").join("");
  $("#fmts").innerHTML=Object.keys(FORMATS).map(k=>"<button class='fmt' aria-pressed='"+SET.fmts.has(k)+"' data-fmt='"+k+"'><b>"+FORMATS[k].icon+" "+FORMATS[k].name+"</b><span>"+FORMATS[k].d+"</span></button>").join("");
  $("#dirPills").innerHTML=[["tm","Term → Meaning"],["mt","Meaning → Term"],["mix","Mixed"]].map(d=>"<button class='pill' aria-pressed='"+(S.prefs.dir===d[0])+"' data-dir='"+d[0]+"'>"+d[1]+"</button>").join("");
  $("#topicPills").innerHTML="<button class='pill' aria-pressed='"+(SET.topics.size===TK.length)+"' data-topic='all'>📚 All lessons</button>"+TK.map((t,i)=>"<button class='pill tp tp-"+t+"' aria-pressed='"+SET.topics.has(t)+"' data-topic='"+t+"'>"+(i+1)+". "+TOPICS[t].icon+" "+tname(t)+"</button>").join("");
  const max=maxAvail();if(SET.count>max)SET.count=Math.max(1,max);
  const opts=SET.mode==="list"?[3,5,10]:[5,10,20,30,50];
  $("#countPills").innerHTML=opts.filter(n=>n<max).map(n=>"<button class='pill' aria-pressed='"+(SET.count===n)+"' data-count='"+n+"'>"+n+"</button>").join("")+"<button class='pill' aria-pressed='"+(SET.count===max)+"' data-count='"+max+"'>All ("+max+")</button>";
  $("#countIn").value=SET.count;$("#countIn").max=max;
  $("#availNote").textContent=SET.topics.size?max+(SET.mode==="list"?" lists":SET.mode==="flash"||SET.mode==="rcards"?" cards":" items")+" available":"pick at least one lesson";
  if(SET.mode==="rcards"&&SET.topics.size){const d=dueCards(SET.topics).length;if(d)$("#availNote").textContent+=" · "+d+" due for review"}
  const q=SET.mode==="drill"||SET.mode==="exam"||SET.mode==="smart";
  $("#startBtn").disabled=!SET.topics.size||max<1||(q&&!SET.fmts.size)}
$("#presetPills").onclick=e=>{const b=e.target.closest("[data-preset]");if(b){SET.fmts=new Set(PRESETS.find(p=>p[0]===b.dataset.preset)[2]);renderSetup()}};
$("#fmts").onclick=e=>{const b=e.target.closest("[data-fmt]");if(b){const f=b.dataset.fmt;SET.fmts.has(f)?SET.fmts.delete(f):SET.fmts.add(f);renderSetup()}};
$("#dirPills").onclick=e=>{const b=e.target.closest("[data-dir]");if(b){S.prefs.dir=b.dataset.dir;save();renderSetup()}};
$("#countPills").onclick=e=>{const b=e.target.closest("[data-count]");if(b){SET.count=+b.dataset.count;renderSetup()}};
$("#countIn").oninput=e=>{const v=parseInt(e.target.value,10);if(v>0){SET.count=Math.min(v,maxAvail());$$("#countPills .pill").forEach(p=>p.setAttribute("aria-pressed",+p.dataset.count===SET.count))}};
$("#topicPills").onclick=e=>{const b=e.target.closest("[data-topic]");if(!b)return;const t=b.dataset.topic;
  if(t==="all")SET.topics=SET.topics.size===TK.length?new Set():new Set(TK);else SET.topics.has(t)?SET.topics.delete(t):SET.topics.add(t);renderSetup()};
$("#optNitc").onchange=e=>{S.prefs.nitc=SET.nitc=e.target.checked;save()};
$("#optStrict").onchange=e=>{S.prefs.strict=SET.strict=e.target.checked;save()};
$("#optTimer").onchange=e=>{S.prefs.timer=e.target.checked;save()};
$("#typeFirst").onchange=e=>{S.prefs.typeFirst=e.target.checked;save()};
$("#startBtn").onclick=()=>{const n=Math.max(1,SET.count||10),t=new Set(SET.topics);
  if(SET.mode==="flash")startFlash(n,t);else if(SET.mode==="rcards")startRecall(t,n);else if(SET.mode==="list")startList(n,t);
  else startQuiz(SET.mode==="smart"?"drill":SET.mode,n,t,SET.mode==="smart"?"🧠 Smart review":null,null,SET.mode==="smart")};

/* ---------- quiz engine ---------- */
let Q=null,timerI=null;
const PRAISE=["Tama! 🎉","Magaling! 🌟","You got it! 💪","Exactly! ✨","Ang galing! 🌸"];
const OOPS=["Not quite. Here is the answer:","Almost! Remember this one:","Oops! Learn this one:"];
function stopTimer(){if(timerI&&cur!=="quiz"){clearInterval(timerI);timerI=null}}
function startQuiz(mode,n,topics,label,list,smart,again){
  SET.nitc=S.prefs.nitc;SET.strict=S.prefs.strict;
  const qs=list||select([...SET.fmts],topics,n,!!smart).map(p=>build(p[0],p[1]));
  if(!qs.length){alert("No questions for this choice. Pick more lessons or question types.");return}
  const base=again===true&&Q&&Q.base?Q.base:{mode,n,topics,label,smart:!!smart,fmts:new Set(SET.fmts),again:typeof again==="function"?again:null};
  Q={mode,topics,label,n:qs.length,list:qs,i:0,score:0,clues:0,correct:0,log:[],t0:Date.now(),base};
  show("quiz");
  if(timerI){clearInterval(timerI);timerI=null}
  const useT=mode==="exam"&&S.prefs.timer;$("#sTimer").hidden=!useT;$("#sTimer").style.color="";
  if(useT){const lim=Q.n*60;const tick=()=>{const s=Math.round((Date.now()-Q.t0)/1000);const m=Math.floor(s/60),r=s%60;$("#sTimer").textContent="⏱ "+m+":"+String(r).padStart(2,"0")+" / "+Math.floor(lim/60)+":00";$("#sTimer").style.color=s>lim?"var(--bad)":""};tick();timerI=setInterval(tick,1000)}
  renderQ()}
function clueBtn(){return"<div class='qacts'><button class='btn sm' id='clueBtn'>💡 Show clue</button></div>"}
function shakeIt(el){el.classList.add("shake");setTimeout(()=>el.classList.remove("shake"),400)}
function renderQ(){const q=Q.list[Q.i];Q.clueUsed=false;Q.done=false;Q.enumHit=null;
  $("#qcard").className="qcard card tp-"+q.topic;
  $("#progFill").style.width=(Q.i/Q.n*100)+"%";$("#qCount").textContent=(Q.i+1)+" / "+Q.n;
  $("#sScore").textContent=Q.mode==="drill"?"⭐ "+Q.score+" pts":"Answered "+Q.i;
  $("#sMode").textContent=Q.label||(Q.mode==="exam"?"📝 Mock exam":"🎯 Drill");
  $("#qmeta").innerHTML="<span class='chip'>"+TOPICS[q.topic].icon+" "+tname(q.topic)+"</span><span class='chip' style='--ts:var(--pink-soft);--tc:var(--pink-d)'>"+TYPE_NAME[q.fmt]+"</span>";
  $("#qtext").innerHTML="<span class='ask'>"+esc(q.ask)+"</span>"+q.q;$("#qclue").innerHTML="";$("#qfb").innerHTML="";
  const A=$("#qans");
  if(q.type==="mc"||q.type==="tf"){
    A.innerHTML="<div class='choices "+(q.type==="tf"?"tf":"two")+"'>"+q.choices.map((c,i)=>"<button class='choice"+(c===NITC?" nitc":"")+"' data-i='"+i+"'>"+(q.type==="tf"?"":"<span class='k'>"+"ABCD"[i]+"</span>")+"<span>"+(q.type==="tf"?(c==="Tama"?"✔ Tama":"✘ Mali"):esc(c))+"</span></button>").join("")+"</div>"+clueBtn();
    A.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{if(Q.done)return;const c=q.choices[+b.dataset.i],ok=c===q.correct;
      A.querySelectorAll(".choice").forEach(x=>x.disabled=true);
      if(Q.mode==="drill"){A.querySelectorAll(".choice").forEach(x=>{if(q.choices[+x.dataset.i]===q.correct)x.classList.add("ok")});if(!ok)b.classList.add("no")}else b.classList.add("picked");
      answer(ok?1:0,c)})}
  else if(q.type==="ctr"){
    const s=q.u.s;let idx=s.indexOf(q.u.w);const end=idx+q.u.w.length;
    const toks=[];s.replace(/\S+/g,(m,off)=>{toks.push({m,hit:off<end&&off+m.length>idx});return m});q.toks=toks;
    A.innerHTML="<div class='words'>"+toks.map((t,i)=>"<button class='word' data-w='"+i+"'>"+esc(t.m)+"</button>").join("")+"</div>"+clueBtn();
    A.querySelectorAll(".word").forEach(b=>b.onclick=()=>{if(Q.done)return;const t=q.toks[+b.dataset.w],ok=t.hit;
      A.querySelectorAll(".word").forEach(x=>{x.disabled=true;if(Q.mode==="drill"&&q.toks[+x.dataset.w].hit)x.classList.add("span")});
      b.classList.add(Q.mode==="drill"?(ok?"ok":"no"):"picked");
      answer(ok?1:0,t.m)})}
  else if(q.type==="order"){
    const picked=[];
    A.innerHTML="<p class='howto'>Tap the events in order: the first one you tap is the earliest.</p><div class='ord'>"+q.events.map((e,i)=>"<button class='ordi' data-i='"+i+"'><span class='n'>·</span><span>"+esc(e[3])+"</span></button>").join("")+"</div><div class='qacts'><button class='btn' id='ordReset'>↺ Reset</button><button class='btn pri' id='ordChk' disabled>Check order</button></div>"+clueBtn();
    const sync=()=>{A.querySelectorAll(".ordi").forEach(b=>{const p=picked.indexOf(+b.dataset.i);b.classList.toggle("sel",p>=0);b.querySelector(".n").textContent=p>=0?p+1:"·"});$("#ordChk").disabled=picked.length!==q.events.length};
    A.querySelectorAll(".ordi").forEach(b=>b.onclick=()=>{if(Q.done)return;const i=+b.dataset.i,p=picked.indexOf(i);if(p>=0)picked.splice(p,1);else picked.push(i);sync()});
    $("#ordReset").onclick=()=>{if(Q.done)return;picked.length=0;sync()};
    $("#ordChk").onclick=()=>{if(Q.done)return;const ok=picked.every((i,k)=>q.events[i][2]===q.sorted[k][2]);
      A.querySelectorAll(".ordi").forEach(b=>{b.disabled=true;if(Q.mode==="drill"){const i=+b.dataset.i,p=picked.indexOf(i);b.classList.add(q.events[i][2]===q.sorted[p][2]?"ok":"no");b.querySelector(".n").textContent=(q.sorted.indexOf(q.events[i])+1)}});
      $("#ordChk").disabled=true;$("#ordReset").disabled=true;
      answer(ok?1:0,picked.map(i=>q.events[i][1]).join(" → "))}}
  else if(q.type==="enum"){
    A.innerHTML="<div class='typed'><textarea class='ta' id='ansIn' placeholder='Write each item on its own line' aria-label='Your answer'></textarea><div class='hintline'>"+esc(q.hint)+" ("+q.items.length+" items)</div><div class='qacts'><button class='btn pri' id='chkBtn'>Check</button></div></div>"+clueBtn();
    const inp=$("#ansIn");
    $("#chkBtn").onclick=()=>{if(Q.done)return;const v=inp.value.trim();if(!v){shakeIt(inp);return}
      const parts=v.split(/[\n,;]+/).map(s=>s.trim()).filter(Boolean);
      const hit=q.items.map(alts=>parts.some(p=>checkText(p,alts)||containsAny(p,alts)));
      const frac=hit.filter(Boolean).length/q.items.length;inp.disabled=true;$("#chkBtn").disabled=true;
      Q.enumHit=hit;answer(frac,parts.join(", "))}}
  else{A.innerHTML="<div class='typed'><div class='in'><input id='ansIn' autocomplete='off' autocapitalize='off' autocorrect='off' spellcheck='false' placeholder='Your answer' aria-label='Your answer'><button class='btn pri' id='chkBtn'>Check</button></div><div class='hintline'>"+esc(q.hint)+(SET.strict?" · strict spelling is ON":"")+"</div></div>"+clueBtn();
    const inp=$("#ansIn");setTimeout(()=>{try{inp.focus({preventScroll:true})}catch(e){}},60);
    const goC=()=>{if(Q.done)return;const v=inp.value.trim();if(!v){shakeIt(inp);return}
      const exact=q.strictAns.some(a=>squash(a)===squash(v));const ok=SET.strict?exact:checkText(v,q.answers);q.exact=exact;
      inp.disabled=true;$("#chkBtn").disabled=true;if(Q.mode==="drill")inp.classList.add(ok?"ok":"no");answer(ok?1:0,v)};
    $("#chkBtn").onclick=goC;inp.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();e.stopPropagation();goC()}}}
  const cb=$("#clueBtn");cb.onclick=()=>{if(Q.done||Q.clueUsed)return;Q.clueUsed=true;Q.clues++;cb.disabled=true;$("#qclue").innerHTML="<div class='clue'><b>💡 Clue:</b> "+esc(q.clue)+"</div>"}}
function nitcNote(q,user){
  if(q.type!=="mc")return"";
  if(q.correct===NITC)return"<p>🎯 The exact answer <b>“"+esc(q.ans)+"”</b> was not among the choices"+(q.trap?". <b>“"+esc(q.trap)+"”</b> looks right, but its spelling or capitalization is wrong":"")+", so the answer is <b>Not in the choices</b>.</p>";
  if(user===NITC)return"<p>⚠️ The exact answer <b>was</b> in the choices (letter "+"ABCD"[q.choices.indexOf(q.correct)]+"). Read every option before choosing “Not in the choices”.</p>";
  return""}
function rightOf(q){return q.type==="typed"?q.official:q.type==="ctr"?q.u.w+" → "+q.u.r:q.show||q.correct}
function answer(frac,user){Q.done=true;const q=Q.list[Q.i];const cb=$("#clueBtn");if(cb)cb.disabled=true;
  const ok=frac>=1;const pts=Math.round(frac*(Q.clueUsed?5:10));
  if(ok)Q.correct++;Q.score+=pts;
  if(q.u.src!=="o")mark(q.u,ok,Q.clueUsed);
  const L={q,ok,frac,user,clue:Q.clueUsed,hit:Q.enumHit};Q.log.push(L);
  const last=Q.i===Q.n-1;
  const btn="<div class='qacts qnext'><button class='btn pri' id='nextBtn'>"+(last?"See my results 🏁":"Next ▶")+"</button></div>";
  if(Q.mode==="drill"){
    if(!ok)shakeIt($("#qcard"));
    let extra="";
    if(q.type==="enum")extra="<div class='enl'>"+q.items.map((a,i)=>"<span class='"+(L.hit[i]?"y":"n")+"'>"+(L.hit[i]?"✔ ":"✘ ")+esc(a[0])+"</span>").join("")+"</div><p>You got <b>"+L.hit.filter(Boolean).length+" of "+q.items.length+"</b>.</p>";
    let spellNote="";if(ok&&q.type==="typed"&&!q.exact)spellNote="<p>✍️ Accepted, but on the exam write it exactly: <b>"+esc(q.official)+"</b></p>";
    $("#qfb").innerHTML="<div class='fb "+(ok?"ok":"no")+"'><h3>"+(ok?pick(PRAISE):pick(OOPS))+"</h3>"+(ok||q.type==="enum"||q.type==="order"?"":"<p>Correct answer: <b>"+esc(rightOf(q))+"</b></p>")+nitcNote(q,user)+spellNote+extra+"<p>"+q.explain+"</p><p><span class='chip sl'>📄 "+slTxt(q.sl)+"</span>"+(Q.clueUsed&&frac>0?" <span class='chip sl'>half points (clue used)</span>":"")+"</p>"+btn+"</div>"}
  else $("#qfb").innerHTML="<div class='fb saved'><h3>Answer saved ✔</h3><p class='muted'>You will see the correct answers at the end.</p>"+btn+"</div>";
  $("#sScore").textContent=Q.mode==="drill"?"⭐ "+Q.score+" pts":"Answered "+(Q.i+1);
  const nb=$("#nextBtn");nb.onclick=next;
  setTimeout(()=>{try{nb.focus({preventScroll:true})}catch(e){}$("#qfb").scrollIntoView({behavior:"smooth",block:"nearest"})},80)}
function next(){if(!Q||!Q.done)return;if(Q.i===Q.n-1)results();else{Q.i++;renderQ();window.scrollTo({top:0,behavior:"smooth"})}}
let armT=null;
$("#quitBtn").onclick=e=>{const b=e.currentTarget;if(b.classList.contains("arm")){clearTimeout(armT);b.classList.remove("arm");b.textContent="✕";if(Q&&Q.log.length)results();else go("practice")}
  else{b.classList.add("arm");b.textContent=Q&&Q.log.length?"End & see results?":"Quit?";armT=setTimeout(()=>{b.classList.remove("arm");b.textContent="✕"},2500)}};
document.addEventListener("keydown",e=>{if(cur!=="quiz"||!Q)return;if(/INPUT|TEXTAREA/.test(e.target.tagName)&&!Q.done)return;
  const q=Q.list[Q.i];const k=e.key.toLowerCase();
  if(Q.done){if(k==="enter"){e.preventDefault();next()}return}
  let i=-1;if(q.type==="mc"){i="abcd".indexOf(k);if(i<0)i="1234".indexOf(k)}else if(q.type==="tf")i=k==="t"?0:k==="m"||k==="f"?1:-1;
  if(i>=0){const b=document.querySelector(".choice[data-i='"+i+"']");if(b)b.click()}});

function results(){if(timerI){clearInterval(timerI);timerI=null}
  const n=Q.log.length,pct=n?Math.round(Q.log.reduce((a,l)=>a+l.frac,0)/n*100):0,secs=Math.round((Date.now()-Q.t0)/1000);
  $("#rPct").textContent=pct+"%";
  $("#rMsg").textContent=pct===100?"Perfect! Handang-handa ka na 🏆":pct>=85?"Excellent! Almost exam-ready 🌸":pct>=70?"Good job! Review the ones you missed 🌿":pct>=50?"Good effort. Read the notes, then try again 💪":"Keep going! Read the notes first, then use recall cards 📒";
  const byT={};Q.log.forEach(l=>{const t=l.q.topic;(byT[t]=byT[t]||{a:0,c:0});byT[t].a++;if(l.ok)byT[t].c++});
  $("#rStats").innerHTML="<span class='stat'>✅ "+Q.correct+" / "+n+" correct</span>"+(Q.mode==="drill"?"<span class='stat'>⭐ "+Q.score+" pts</span>":"")+"<span class='stat'>💡 "+Q.clues+" clue"+(Q.clues===1?"":"s")+"</span><span class='stat'>⏱ "+Math.floor(secs/60)+"m "+(secs%60)+"s</span>"+Object.keys(byT).map(t=>"<span class='stat'>"+TOPICS[t].icon+" "+tname(t)+": "+byT[t].c+"/"+byT[t].a+"</span>").join("");
  const wrong=Q.log.filter(l=>!l.ok);$("#redoWrong").hidden=!wrong.length;$("#revTtl").hidden=!wrong.length;
  $("#review").innerHTML=wrong.map(l=>{const q=l.q,qtxt=q.type==="ctr"?esc(q.u.s):q.q;
    return"<div class='rv card tp-"+q.topic+"'><span class='chip'>"+tname(q.topic)+"</span> <span class='chip sl'>"+TYPE_NAME[q.fmt]+"</span> <span class='chip sl'>📄 "+slTxt(q.sl)+"</span><div class='q'>"+qtxt+"</div><div class='a'><span class='y'>Your answer: "+esc(l.user||"–")+"</span>"+(q.type==="order"?"":"<span class='c'>Correct: "+esc(rightOf(q))+"</span>")+nitcNote(q,l.user)+"<span>"+q.explain+"</span></div></div>"}).join("");
  show("results")}
$("#againBtn").onclick=()=>{const b=Q.base;if(b.again){b.again();return}SET.fmts=new Set(b.fmts);startQuiz(b.mode,b.n,b.topics,b.label,null,b.smart)};
$("#redoWrong").onclick=()=>{const list=Q.log.filter(l=>!l.ok).map(l=>l.q.u.src==="o"?Object.assign({},l.q,{events:shuffle(l.q.events)}):build(l.q.u,l.q.fmt));startQuiz("drill",list.length,Q.topics,"Practice my mistakes",shuffle(list),false,true)};

/* ---------- flashcards ---------- */
let FL=null;
function startFlash(n,topics){const deck=FACT_OBJ.filter(f=>topics.has(f.t)).map(u=>[u,prio(u)]).sort((a,b)=>a[1]-b[1]).slice(0,n).map(x=>x[0]);
  FL={deck:shuffle(deck),i:0,known:0,learning:[],total:deck.length};show("flash");renderFlash()}
function renderFlash(){const A=$("#fArea");
  if(FL.i>=FL.deck.length){$("#fProg").style.width="100%";$("#fCount").textContent=FL.total+" / "+FL.total;const l=FL.learning;
    A.innerHTML="<div class='res card'><div style='font-size:46px'>🃏</div><h2>Deck done!</h2><p style='margin:0'>You knew <b>"+FL.known+"</b> of "+FL.total+" right away.</p>"+(l.length?"<p class='muted' style='margin:0'>Still learning: "+l.map(c=>esc(c.term)).join(", ")+"</p>":"")+"<div class='row' style='justify-content:center'>"+(l.length?"<button class='btn pri' id='fAgain'>Review “still learning” cards</button>":"")+"<button class='btn' id='fNew'>New deck</button><button class='btn ghost' data-go='home'>Home</button></div></div>";
    if(l.length)$("#fAgain").onclick=()=>{FL={deck:shuffle(l),i:0,known:0,learning:[],total:l.length};renderFlash()};$("#fNew").onclick=()=>openSetup("flash");return}
  const c=FL.deck[FL.i];const dir=S.prefs.dir==="mix"?(Math.random()<.5?"tm":"mt"):S.prefs.dir;
  $("#fProg").style.width=(FL.i/FL.deck.length*100)+"%";$("#fCount").textContent=(FL.i+1)+" / "+FL.deck.length;
  const chip="<span class='chip'>"+TOPICS[c.t].icon+" "+tname(c.t)+"</span>";
  const front=dir==="tm"?"<div>"+chip+"<div class='big' style='margin-top:12px'>"+esc(c.term)+"</div></div>":"<div>"+chip+"<div style='margin-top:12px'>"+esc(c.def)+"</div></div>";
  const back=(dir==="tm"?"<div>"+esc(c.def)+"</div>":"<div class='big'>"+esc(c.term)+"</div>")+"<div style='margin-top:10px'><span class='chip sl'>📄 "+slTxt(c.sl)+"</span></div>";
  const tf=S.prefs.typeFirst;
  A.innerHTML="<div class='flip tp-"+c.t+"'><button class='fcard' id='fc' aria-label='Flip card'><div class='face f'>"+front+"<span class='tapnote'>"+(tf?"Type your answer below first":"Tap to flip 🔄")+"</span></div><div class='face b'><div><div id='fYour'></div>"+back+"</div><span class='tapnote'>Tap to flip back</span></div></button></div>"+
    (tf?"<div class='fin'><input id='fIn' placeholder='"+(dir==="tm"?"What does it mean? (key words)":"Which name or term is it?")+"' autocomplete='off' spellcheck='false' aria-label='Your answer'><button class='btn pri' id='fChk'>Flip</button></div>":"")+
    "<div class='row' style='justify-content:center;margin-top:18px'><button class='btn' id='fNo'>😅 Still learning</button><button class='btn good' id='fYes'>😎 I know it!</button></div>";
  const fc=$("#fc");
  const flip=()=>{if(tf&&!fc.classList.contains("on")){const v=$("#fIn").value.trim();if(v){const m=dir==="mt"?(checkText(v,accepted(c))?" ✔":" ✘"):"";$("#fYour").innerHTML="<p class='small muted' style='margin:0 0 8px'>You wrote: <b>"+esc(v)+"</b>"+m+"</p>"}}fc.classList.toggle("on")};
  fc.onclick=flip;
  if(tf){$("#fChk").onclick=flip;$("#fIn").onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();flip()}};setTimeout(()=>{try{$("#fIn").focus({preventScroll:true})}catch(e){}},60)}
  $("#fYes").onclick=()=>{mark(c,true,false);FL.known++;FL.i++;renderFlash()};
  $("#fNo").onclick=()=>{mark(c,false,false);if(!FL.learning.includes(c))FL.learning.push(c);FL.i++;renderFlash()}}
document.addEventListener("keydown",e=>{if(cur!=="flash"||e.target.tagName==="INPUT")return;if(e.key===" "&&$("#fc")){e.preventDefault();$("#fc").click()}});

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
    A.innerHTML="<div class='res card'><div style='font-size:46px'>🧠</div><h2>Recall session done!</h2><p style='margin:0'>Remembered: <b>"+RC.got+"</b> · Needed another look: <b>"+RC.miss+"</b></p><p class='muted' style='margin:0;max-width:440px'>Cards you rated “Forgot” or “Hard” will come back first next time. Come back later today or tomorrow, because spacing out your reviews is what makes the facts stay.</p><div class='row' style='justify-content:center'><button class='btn pri' id='rcMore'>Another round</button><button class='btn ghost' data-go='home'>Home</button></div></div>";
    $("#rcMore").onclick=()=>openSetup("rcards");return}
  const c=RC.deck[RC.i];$("#rcProg").style.width=(RC.i/RC.deck.length*100)+"%";$("#rcCount").textContent=(RC.i+1)+" / "+RC.deck.length;
  const bx=S.cards[c.id]?S.cards[c.id].b:0;
  A.innerHTML="<div class='rc card tp-"+c.t+"'><div class='qmeta'><span class='chip'>"+TOPICS[c.t].icon+" "+tname(c.t)+"</span><span class='chip sl'>"+(S.cards[c.id]?"Box "+bx+" of 5":"New card")+"</span></div><div class='prompt'>"+esc(c.def)+"</div><div class='typed'><div class='in'><input id='rcIn' autocomplete='off' spellcheck='false' placeholder='Say it or type it (optional)' aria-label='Your recall'></div></div><div id='rcClue'></div><div class='qacts'><button class='btn' id='rcClueB'>💡 Clue</button><button class='btn pri' id='rcShow'>Show answer</button></div><div id='rcAns'></div></div>";
  RC.clue=false;
  $("#rcClueB").onclick=e=>{e.currentTarget.disabled=true;RC.clue=true;$("#rcClue").innerHTML="<div class='clue'><b>💡 Clue:</b> "+esc(c.clue)+"</div>"};
  const reveal=()=>{const v=$("#rcIn").value.trim();const auto=v?checkText(v,accepted(c)):null;$("#rcShow").hidden=true;$("#rcClueB").disabled=true;$("#rcIn").disabled=true;
    $("#rcAns").innerHTML="<div class='ans'><div class='big'>"+esc(c.term)+"</div><span class='chip sl'>📄 "+slTxt(c.sl)+"</span>"+(auto===true?" <span class='chip' style='--ts:var(--ok-soft);--tc:var(--ok)'>Your typed answer matches ✔</span>":auto===false?" <span class='chip' style='--ts:var(--bad-soft);--tc:var(--bad)'>Your typed answer was different</span>":"")+"</div><p class='howto' style='margin-top:12px'>How well did you remember it?</p><div class='rate'><button class='btn warn' data-r='0'>😕 Forgot<small>see again soon</small></button><button class='btn' data-r='1'>🤔 Hard<small>review tomorrow</small></button><button class='btn good' data-r='2'>😎 Got it<small>next in "+INT[Math.min(bx+1,5)]+" day"+(INT[Math.min(bx+1,5)]===1?"":"s")+"</small></button></div>";
    $$("#rcAns [data-r]").forEach(b=>b.onclick=()=>rate(c,+b.dataset.r))};
  $("#rcShow").onclick=reveal;$("#rcIn").onkeydown=e=>{if(e.key==="Enter")reveal()};
  setTimeout(()=>{try{$("#rcIn").focus({preventScroll:true})}catch(e){}},60)}
function rate(c,r){const now=Date.now();const st=S.cards[c.id]||{b:0,due:now};
  if(r===0){st.b=0;st.due=now;RC.miss++;if(!RC.seen.has(c.id)){RC.seen.add(c.id);RC.deck.splice(Math.min(RC.i+4,RC.deck.length),0,c)}}
  else if(r===1){st.b=Math.max(1,st.b);st.due=now+DAY;RC.miss++}
  else{st.b=Math.min(5,st.b+1);st.due=now+INT[st.b]*DAY;RC.got++}
  S.cards[c.id]=st;
  if(r===0)mark(c,false,false);else if(r===1)mark(c,true,true);else mark(c,true,RC.clue);
  RC.i++;renderRC()}
document.addEventListener("keydown",e=>{if(cur!=="rcards"||e.target.tagName==="INPUT")return;const b=document.querySelector("#rcAns [data-r='"+({"1":0,"2":1,"3":2}[e.key])+"']");if(b)b.click()});

/* ---------- list recall (uses the enumeration lists) ---------- */
let LS=null;
function startList(n,topics){const deck=ENM.filter(l=>topics.has(l.t)).map(u=>[u,prio(u)]).sort((a,b)=>a[1]-b[1]).slice(0,n).map(x=>x[0]);
  if(!deck.length){alert("This lesson has no lists. Pick another lesson.");return}
  LS={deck:shuffle(deck),i:0,got:0,tot:0,res:[]};show("list");renderList()}
function renderList(){const A=$("#lArea");
  if(LS.i>=LS.deck.length){$("#lProg").style.width="100%";$("#lCount").textContent=LS.deck.length+" / "+LS.deck.length;const pct=LS.tot?Math.round(LS.got/LS.tot*100):0;
    const rep=LS.res.filter(r=>r.ok<r.n);
    A.innerHTML="<div class='res card'><div class='bigscore'>"+pct+"%</div><h2>You recalled "+LS.got+" of "+LS.tot+" items</h2>"+
      (rep.length?"<p class='muted' style='margin:0'>Lists to repeat: "+rep.map(r=>esc(r.u.q)).join(" · ")+"</p>":"")+
      "<div class='row' style='justify-content:center'><button class='btn pri' id='lNew'>New set</button><button class='btn ghost' data-go='home'>Home</button></div></div>";$("#lNew").onclick=()=>openSetup("list");return}
  const l=LS.deck[LS.i];$("#lProg").style.width=(LS.i/LS.deck.length*100)+"%";$("#lCount").textContent=(LS.i+1)+" / "+LS.deck.length;
  A.innerHTML="<div class='lcard card tp-"+l.t+"'><div class='qmeta'><span class='chip'>"+TOPICS[l.t].icon+" "+tname(l.t)+"</span><span class='chip sl'>"+l.items.length+" items</span><span class='chip sl'>📄 "+slTxt(l.sl)+"</span></div><div class='qtext'>"+esc(l.q)+"</div>"+
    "<textarea class='ta' id='lIn' placeholder='Type one item per line (or separate with commas)' aria-label='Your list'></textarea><div id='lClue'></div><div class='qacts'><button class='btn pri' id='lChk'>Check my list</button><button class='btn sm' id='lClueB'>💡 First letters</button><button class='btn sm ghost' id='lShow'>I don't know, show me</button></div><div id='lOut'></div></div>";
  setTimeout(()=>{try{$("#lIn").focus({preventScroll:true})}catch(e){}},60);
  $("#lClueB").onclick=()=>{$("#lClue").innerHTML="<div class='clue'><b>💡 First letters:</b> "+l.items.map(it=>esc(it[0].replace(/^[^A-Za-zÀ-ÿ0-9]+/,"")[0])).join(" · ")+"<br><span class='muted'>Hint: "+esc(l.clue)+"</span></div>";$("#lClueB").disabled=true};
  const check=give=>{const parts=give?[]:$("#lIn").value.split(/\n|,|;/).map(s=>s.trim()).filter(Boolean);
    const res=l.items.map(alts=>parts.some(p=>checkText(p,alts)||containsAny(p,alts)));const ok=res.filter(Boolean).length;
    LS.got+=ok;LS.tot+=l.items.length;LS.res.push({u:l,ok,n:l.items.length});mark(l,ok/l.items.length>=.8,false);
    $("#lIn").disabled=true;$("#lChk").disabled=true;$("#lShow").disabled=true;$("#lClueB").disabled=true;
    $("#lOut").innerHTML="<div class='fb "+(ok===l.items.length?"ok":"no")+"'><h3>"+(ok===l.items.length?"All "+ok+" recalled! 🎉":ok+" of "+l.items.length+" recalled")+"</h3><ul class='litems'>"+l.items.map((it,i)=>"<li class='"+(res[i]?"ok":"no")+"'>"+(res[i]?"✅":"❌")+" <span>"+esc(it[0])+"</span></li>").join("")+"</ul><div class='hook'>🧠 Memory hook: "+esc(l.clue)+"</div><div class='qacts qnext'><button class='btn pri' id='lNext'>"+(LS.i===LS.deck.length-1?"Finish 🏁":"Next list ▶")+"</button></div></div>";
    $("#lNext").onclick=()=>{LS.i++;renderList();window.scrollTo({top:0,behavior:"smooth"})};setTimeout(()=>{try{$("#lNext").focus({preventScroll:true})}catch(e){}},60)};
  $("#lChk").onclick=()=>check(false);$("#lShow").onclick=()=>check(true)}

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
      $("#dumpSave").onclick=e=>{items.forEach((f,i)=>{if(hit[i])mark(f,true,false)});e.currentTarget.textContent="Saved ✔";e.currentTarget.disabled=true};
      $("#dumpDrill").onclick=()=>{const gaps=items.filter((f,i)=>!hit[i]);if(!gaps.length){alert("No gaps. Amazing! 🌸");return}const run=()=>startQuiz("drill",Math.min(20,gaps.length),new Set(TK),"✍️ Brain dump gaps",shuffle(gaps).slice(0,20).map(f=>build(f,Math.random()<.5?"id":"tmc")),false,run);run()}};
    draw();R.scrollIntoView({behavior:"smooth",block:"start"})}}

/* ---------- essay practice ---------- */
let ET="all";
function renderEssay(){const A=$("#essayArea");
  const list=ESSAY.filter(x=>ET==="all"||x[0]===ET);
  A.innerHTML="<div class='pills' style='margin-bottom:12px'><button class='pill' aria-pressed='"+(ET==="all")+"' data-et='all'>📚 All lessons</button>"+TK.filter(t=>ESSAY.some(x=>x[0]===t)).map(t=>"<button class='pill tp tp-"+t+"' aria-pressed='"+(ET===t)+"' data-et='"+t+"'>"+TOPICS[t].icon+" "+tname(t)+"</button>").join("")+"</div>"+
  "<p class='howto'>Write your answer from memory, then tap <b>Show key points</b> and tick the points you included. Aim to include every point.</p>"+
  list.map(x=>"<div class='qcard card tp-"+x[0]+"' style='margin-bottom:14px'><div class='qmeta'><span class='chip'>"+TOPICS[x[0]].icon+" "+tname(x[0])+"</span><span class='chip sl'>📄 "+slTxt(x[3])+"</span></div><div class='qtext' style='font-size:19px'>"+esc(x[1])+"</div><textarea class='ta' placeholder='Your answer…' aria-label='Your answer'></textarea><div class='qacts'><button class='btn pri' data-ek='"+ESSAY.indexOf(x)+"'>Show key points</button></div><div class='ekp'></div></div>").join("");
  A.querySelector(".pills").onclick=e=>{const b=e.target.closest("[data-et]");if(b){ET=b.dataset.et;renderEssay()}};
  A.querySelectorAll("[data-ek]").forEach(b=>b.onclick=()=>{const x=ESSAY[+b.dataset.ek],card=b.closest(".qcard"),txt=card.querySelector("textarea").value;b.hidden=true;
    const hit=x[2].map(p=>{const words=p.split(/[\s,;().“”"']+/).filter(w=>w.length>=5);const n=words.filter(w=>norm(txt).includes(norm(w))).length;return words.length>0&&n/words.length>=.5});
    const bx=card.querySelector(".ekp");
    const draw=()=>{bx.innerHTML="<p class='howto' style='margin-top:12px'>Key points ("+hit.filter(Boolean).length+"/"+x[2].length+" ticked). Tap to tick the ones you covered:</p><div class='chklist'>"+x[2].map((p,i)=>"<button class='chk' aria-pressed='"+hit[i]+"' data-pi='"+i+"'><span class='bx'>"+(hit[i]?"✔":"")+"</span><span>"+esc(p)+"</span></button>").join("")+"</div>";
      bx.querySelectorAll("[data-pi]").forEach(k=>k.onclick=()=>{hit[+k.dataset.pi]=!hit[+k.dataset.pi];draw()})};draw()})}

/* ---------- boot ---------- */
applyTheme();route();
if("serviceWorker" in navigator&&location.protocol.startsWith("http")){
  navigator.serviceWorker.register("sw.js").then(()=>navigator.serviceWorker.ready).then(()=>{$("#offPill").hidden=false}).catch(()=>{})}
})();
