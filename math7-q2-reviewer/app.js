(function(){
"use strict";
const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const hsh=s=>{let x=5381;for(let i=0;i<s.length;i++)x=((x<<5)+x+s.charCodeAt(i))|0;return(x>>>0).toString(36)};
const T=D.TOPICS,TK=Object.keys(T),F=D.fmt;
let vennN=0;
function venn(type){
 const id="vn"+(++vennN),A='<circle cx="82" cy="66" r="40"/>',B='<circle cx="128" cy="66" r="40"/>';
 const lab='<text x="62" y="40" class="vl">A</text><text x="140" y="40" class="vl">B</text><text x="12" y="20" class="vl u">U</text>';
 let shade="";
 if(type==="union")shade=`<g class="sh">${A}${B}</g>`;
 else if(type==="inter")shade=`<clipPath id="${id}">${A}</clipPath><g class="sh" clip-path="url(#${id})">${B}</g>`;
 else if(type==="compA")shade=`<mask id="${id}"><rect width="210" height="130" fill="#fff"/><circle cx="82" cy="66" r="40" fill="#000"/></mask><rect x="4" y="4" width="202" height="122" rx="10" class="sh" mask="url(#${id})"/>`;
 else if(type==="diff")shade=`<mask id="${id}"><rect width="210" height="130" fill="#000"/><circle cx="82" cy="66" r="40" fill="#fff"/><circle cx="128" cy="66" r="40" fill="#000"/></mask><g class="sh" mask="url(#${id})">${A}</g>`;
 else if(type==="sub")return`<svg class="venn" viewBox="0 0 210 130" role="img" aria-label="Venn diagram: A inside B"><rect x="4" y="4" width="202" height="122" rx="10" class="vu"/><circle cx="105" cy="66" r="52" class="vo sh2"/><circle cx="92" cy="72" r="24" class="vo sh"/><text x="86" y="78" class="vl">A</text><text x="140" y="40" class="vl">B</text><text x="12" y="20" class="vl u">U</text></svg>`;
 else if(type==="prob")return`<svg class="venn wide" viewBox="0 0 210 130" role="img" aria-label="Venn diagram: Math only 15, both 10, Science only 8, neither 7"><rect x="4" y="4" width="202" height="122" rx="10" class="vu"/><circle cx="82" cy="66" r="40" class="vo sh"/><circle cx="128" cy="66" r="40" class="vo sh2"/><text x="34" y="20" class="vl sm">Math 25</text><text x="140" y="20" class="vl sm">Science 18</text><text x="60" y="72" class="vl">15</text><text x="98" y="72" class="vl">10</text><text x="140" y="72" class="vl">8</text><text x="182" y="118" class="vl">7</text><text x="10" y="120" class="vl u">U = 40</text></svg>`;
 return`<svg class="venn" viewBox="0 0 210 130" role="img" aria-label="Venn diagram"><rect x="4" y="4" width="202" height="122" rx="10" class="vu"/>${shade}<g class="vo">${A}${B}</g>${lab}</svg>`;
}
const md=s=>String(s)
 .replace(/\*\*(.+?)\*\*/g,"<b class='k'>$1</b>")
 .replace(/\[\[([^\]]+?)\/([^\]]+?)\]\]/g,'<span class="fr"><i>$1</i><i>$2</i></span>')
 .replace(/\{\{(.+?)\}\}/g,'<span class="ov">$1</span>')
 .replace(/%%VENN:(\w+)%%/g,(m,t)=>venn(t));
const plain=s=>String(s).replace(/\*\*(.+?)\*\*/g,"$1");

/* ---------- storage ---------- */
const KEY="math7-q2-reviewer-v1";
const DEF={it:{},sk:{},read:{},cards:{},blurt:{},theme:null,recall:false,nf:"all",prefs:{rate:1,voice:"",lvl:2,timer:false,instant:true,dir:"tm"}};
let S=JSON.parse(JSON.stringify(DEF));
try{const o=JSON.parse(localStorage.getItem(KEY)||"{}");S=Object.assign(S,o);S.prefs=Object.assign({},DEF.prefs,o.prefs||{})}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};

/* ---------- data prep ---------- */
const BANK=D.BANK.map(b=>({id:"b"+hsh(b[2]+"|"+b[3]),t:b[0],type:b[1],q:b[2],a:b[3],clue:b[4],ex:b[5],dis:b[6]||[],src:"bank"}));
const CARDS=D.CARDS.map(c=>({id:"k"+hsh(c[1]),t:c[0],f:c[1],b:c[2]}));
const SECS={};TK.forEach(t=>SECS[t]=D.NOTES[t].map((n,i)=>t+i));

/* ---------- theme ---------- */
const root=document.documentElement;
function applyTheme(){if(S.theme)root.setAttribute("data-theme",S.theme);else root.removeAttribute("data-theme");
 const dark=S.theme?S.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;$("#thmBtn").textContent=dark?"☀️":"🌙";$("#thmBtn").setAttribute("aria-label",dark?"Switch to light mode":"Switch to dark mode")}
$("#thmBtn").onclick=()=>{const dark=S.theme?S.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;S.theme=dark?"light":"dark";save();applyTheme()};
applyTheme();

/* ---------- router ---------- */
const VIEWS=["home","notes","practice","setup","quiz","results","flash","list","blurt","sheet"];
const NAVMAP={setup:"practice",quiz:"practice",results:"practice",flash:"practice",list:"practice",blurt:"practice"};
let cur="home";
function show(v,push=true){
 if(v!=="quiz"&&cur==="quiz"&&Q&&Q.timerId){clearInterval(Q.timerId)}
 if(cur==="notes"&&v!=="notes")TTS.stop();
 VIEWS.forEach(x=>{const el=$("#v-"+x);if(el)el.hidden=x!==v});cur=v;
 const nav=NAVMAP[v]||v;$$(".topnav [data-go],.tabbar [data-go]").forEach(b=>{if(b.dataset.go===nav)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
 if(v==="home")renderHome();if(v==="notes")renderNotes();if(v==="practice")renderPractice();if(v==="sheet")renderSheet();
 window.scrollTo(0,0);
 if(push&&location.hash!=="#"+v)history.pushState({v},"","#"+v);
}
window.addEventListener("popstate",()=>{const v=(location.hash||"#home").slice(1);
 if(cur==="quiz"&&Q&&!Q.done&&!confirm("Leave this quiz? Your answers so far won't be saved as a result.")){history.pushState({v:"quiz"},"","#quiz");return}
 show(VIEWS.includes(v)&&!["quiz","results","flash","list","setup","blurt"].includes(v)?v:(v==="home"?"home":"practice"),false)});
document.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g){e.preventDefault();if(cur==="quiz"&&Q&&!Q.done&&g.dataset.go!=="quiz"&&!confirm("Leave this quiz?"))return;show(g.dataset.go)}
 const a=e.target.closest("[data-act]");if(a){e.preventDefault();act(a.dataset.act,a.dataset.t)}});
function act(a,t){
 if(a==="exam")setup("exam");
 else if(a==="review"){S.nf=t||"all";save();show("notes")}
 else if(["quiz","drill","flash","list","blurt","fix"].includes(a))setup(a,t);
}

/* ---------- progress ---------- */
function topicStats(t){
 const secs=SECS[t],read=secs.filter(id=>S.read[id]).length;
 const bank=BANK.filter(b=>b.t===t),mast=bank.filter(b=>(S.it[b.id]||{}).r>=2).length;
 const cards=CARDS.filter(c=>c.t===t),cm=cards.filter(c=>(S.cards[c.id]||{}).b>=2).length;
 let n=0,c=0;for(const k in S.sk)if(k[0]===t){n+=S.sk[k].n;c+=S.sk[k].c}
 const drill=n?(c/n)*Math.min(n,15)/15:0;
 const pct=Math.round(100*(.2*read/secs.length+.4*mast/bank.length+.15*cm/cards.length+.25*drill));
 return{read,secs:secs.length,mast,bank:bank.length,cm,cards:cards.length,dn:n,dc:c,pct};
}
const lvlName=p=>p>=85?"Exam-ready":p>=60?"Almost there":p>=25?"Learning":p>0?"Just started":"Not started";

/* ---------- HOME ---------- */
function renderHome(){
 const tiles=[["📘","Study notes","Every lesson, short and clear. Recall mode, listen mode.","review"],["🎯","Quiz","Choose lessons and number of items. Clues for every question.","quiz"],["✏️","Drills","Unlimited computation practice with full solutions.","drill"],["🃏","Flashcards","See the term, say the answer, flip to check.","flash"],["🧾","Blurt test","Write everything you remember, then check.","blurt"],["📝","Mock exam","Mixed items from all lessons, timed, like the real test.","exam"]];
 $("#tiles").innerHTML=tiles.map(x=>`<button class="tile card" data-act="${x[3]}"><span class="ti">${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></button>`).join("");
 let tot=0;$("#mast").innerHTML=TK.map(t=>{const s=topicStats(t);tot+=s.pct;
  return`<div class="mrow t-${t}"><div class="mh"><span class="mi">${T[t].icon}</span><b>${T[t].short}</b><span class="lv">${lvlName(s.pct)}</span><b class="mp">${s.pct}%</b></div>
  <div class="pbar"><i style="width:${s.pct}%"></i></div>
  <div class="mm"><span>📘 ${s.read}/${s.secs} read</span><span>✅ ${s.mast}/${s.bank} mastered</span><span>🃏 ${s.cm}/${s.cards}</span><span>✏️ ${s.dn?Math.round(100*s.dc/s.dn)+"%":"–"} drills</span>
  <span class="sp"></span><button class="lnk" data-act="review" data-t="${t}">Review</button><button class="lnk" data-act="drill" data-t="${t}">Drill</button></div></div>`}).join("");
 const p=Math.round(tot/TK.length);$("#ring").style.setProperty("--p",p);$("#ringPct").textContent=p+"%";$("#ringLbl").textContent=lvlName(p);
 const weak=BANK.filter(b=>(S.it[b.id]||{}).w&&(S.it[b.id]||{}).r<2).length;
 $("#fixRow").hidden=!weak;$("#fixN").textContent=weak;
}
$("#resetBtn").onclick=()=>{if(confirm("Reset ALL progress on this device? This can't be undone.")){const th=S.theme;S=JSON.parse(JSON.stringify(DEF));S.theme=th;save();renderHome()}};

/* ---------- NOTES ---------- */
function renderNotes(){
 const nf=S.nf||"all";
 $("#nFilter").innerHTML=`<button class="pill ${nf==="all"?"on":""}" data-nf="all">📚 All lessons</button>`+TK.map(t=>`<button class="pill t-${t} ${nf===t?"on":""}" data-nf="${t}">${T[t].icon} ${T[t].num}. ${T[t].short}</button>`).join("");
 $$("#nFilter [data-nf]").forEach(b=>b.onclick=()=>{TTS.stop();S.nf=b.dataset.nf;save();renderNotes()});
 const list=nf==="all"?TK:[nf];
 let total=0,read=0;list.forEach(t=>{total+=SECS[t].length;read+=SECS[t].filter(id=>S.read[id]).length});
 $("#notesSub").textContent=`${read} of ${total} sections learned`;
 $("#notesList").innerHTML=list.map(t=>{
  const notes=D.NOTES[t];
  return`<article class="lesson t-${t}" id="L-${t}">
  <header class="lh"><span class="ln">${T[t].num}</span><div><small>Lesson ${T[t].num}</small><h2>${T[t].icon} ${T[t].name}</h2></div></header>
  <details class="sec must" data-id="${t}-must" open><summary><span class="sn">★</span><span class="st">Must-know in 60 seconds</span><span class="chev" aria-hidden="true"></span></summary>
   <div class="sb"><p class="muted small nosay">Memorize these first. Everything below explains them.</p><ol class="mustl">${D.MUST[t].map(m=>`<li>${md(m)}</li>`).join("")}</ol>
   <div class="srow nosay"><button class="btn sm" data-say>🔊 Listen</button></div></div></details>
  ${notes.map((n,i)=>{const id=t+i,done=!!S.read[id];return`<details class="sec" data-id="${id}"><summary><span class="sn ${done?"done":""}">${done?"✓":i+1}</span><span class="st">${n.h}</span><span class="chev" aria-hidden="true"></span></summary>
   <div class="sb">${md(n.b)}
   ${n.hook?`<div class="hook"><b>🧠 Memory hook</b><span>${md(n.hook)}</span></div>`:""}
   ${n.check?`<div class="qc"><b>❓ Quick check</b><p>${md(n.check[0])}</p><button class="btn sm ghost nosay" data-reveal>Show answer</button><p class="qa" hidden><span class="sayonly">Answer: </span>${md(n.check[1])}</p></div>`:""}
   <div class="srow nosay"><button class="btn sm" data-say>🔊 Listen</button><span class="sp"></span><button class="btn sm ${done?"ok":"pri"}" data-read="${id}">${done?"✓ Learned":"Mark as learned"}</button></div></div></details>`}).join("")}
  <div class="lend card nosay"><b>Done reading? Lock it in:</b><div class="row"><button class="btn sm" data-act="blurt" data-t="${t}">🧾 Blurt test</button><button class="btn sm" data-act="flash" data-t="${t}">🃏 Flashcards</button><button class="btn sm" data-act="drill" data-t="${t}">✏️ Drill</button><button class="btn sm pri" data-act="quiz" data-t="${t}">🎯 Quiz me</button></div></div>
  </article>`}).join("");
 bindNotes();syncExpand();applyRecall();
}
function bindNotes(){
 $$("#notesList details").forEach(d=>d.addEventListener("toggle",syncExpand));
 $$("#notesList [data-reveal]").forEach(b=>b.onclick=()=>{const a=b.nextElementSibling;a.hidden=!a.hidden;b.textContent=a.hidden?"Show answer":"Hide answer"});
 $$("#notesList [data-read]").forEach(b=>b.onclick=()=>{const id=b.dataset.read;if(S.read[id])delete S.read[id];else S.read[id]=1;save();
  const on=!!S.read[id];b.className="btn sm "+(on?"ok":"pri");b.textContent=on?"✓ Learned":"Mark as learned";
  const sn=b.closest("details").querySelector(".sn");sn.classList.toggle("done",on);sn.textContent=on?"✓":(+id.slice(1)+1);
  if(on){const d=b.closest("details");d.open=false;const nx=d.nextElementSibling;if(nx&&nx.tagName==="DETAILS"){nx.open=true;nx.scrollIntoView({behavior:"smooth",block:"start"})}}
  let total=0,read=0;(S.nf==="all"?TK:[S.nf]).forEach(t=>{total+=SECS[t].length;read+=SECS[t].filter(i=>S.read[i]).length});$("#notesSub").textContent=`${read} of ${total} sections learned`});
 $$("#notesList [data-say]").forEach(b=>b.onclick=()=>{const all=$$("#notesList details.sec");TTS.play(all,all.indexOf(b.closest("details")),true)});
 $$("#notesList b.k").forEach(k=>{k.tabIndex=0;k.onclick=()=>{if(S.recall)k.classList.toggle("rv")};k.onkeydown=e=>{if((e.key==="Enter"||e.key===" ")&&S.recall){e.preventDefault();k.classList.toggle("rv")}}});
}
function syncExpand(){const ds=$$("#notesList details");const allOpen=ds.length&&ds.every(d=>d.open);const b=$("#expandTog");b.setAttribute("aria-pressed",allOpen);b.innerHTML=allOpen?"⊖ Collapse all":"⊕ Expand all"}
$("#expandTog").onclick=()=>{const ds=$$("#notesList details");const allOpen=ds.every(d=>d.open);ds.forEach(d=>d.open=!allOpen);syncExpand()};
function applyRecall(){document.body.classList.toggle("recall",!!S.recall);$("#recallTog").setAttribute("aria-pressed",!!S.recall);$$("b.k.rv").forEach(k=>k.classList.remove("rv"))}
$("#recallTog").onclick=()=>{S.recall=!S.recall;save();applyRecall()};
$("#listenAll").onclick=()=>{const all=$$("#notesList details.sec");if(TTS.active)TTS.stop();else TTS.play(all,0,false)};

/* ---------- TEXT TO SPEECH ---------- */
const UNITN={km:"kilometer",cm:"centimeter",mm:"millimeter",m:"meter",mL:"milliliter",L:"liter",kL:"kiloliter",kg:"kilogram",g:"gram",mg:"milligram",ft:"foot",in:"inch",yd:"yard",mi:"mile",lb:"pound",oz:"ounce",qt:"quart",gal:"gallon",pt:"pint",t:"metric ton",c:"cup"};
const plural=u=>u==="foot"?"feet":u==="inch"?"inches":u+"s";
function speakable(el){
 const c=el.cloneNode(true);
 c.querySelectorAll(".nosay,svg,.chev,.sn,button").forEach(x=>x.remove());
 c.querySelectorAll(".qa").forEach(x=>x.hidden=false);
 c.querySelectorAll(".ladder small").forEach(x=>{const p=x.textContent.split("·");x.textContent=p.length>2?", meter, gram, liter":", "+p[1].trim()});
 c.querySelectorAll(".fr").forEach(x=>{const i=x.querySelectorAll("i");x.textContent=` ${i[0].textContent} over ${i[1].textContent} `});
 c.querySelectorAll(".ov").forEach(x=>x.textContent=x.textContent.split("").join(" ")+" repeating");
 c.querySelectorAll("sup").forEach(x=>x.textContent=" to the "+x.textContent+" ");
 c.querySelectorAll("li,p,h4,tr,.ex,.fx,.hook,.trap,.grid>div,.ladder>div,summary,.qc b").forEach(x=>x.append(". "));
 c.querySelectorAll("td,th").forEach(x=>x.append(", "));
 c.querySelectorAll(".hook>b").forEach(x=>x.textContent="Memory hook: ");
 let s=c.textContent;
 s=s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{FE0F}]/gu," ")
 .replace(/ℕ/g," N ").replace(/ℤ/g," Z ").replace(/ℚ/g," Q ").replace(/ℝ/g," R ")
 .replace(/(\d|\b)\s*(km|cm|mm|m|in|ft|yd)([²³])/g,(m,a,u,p)=>`${a} ${p==="²"?"square":"cubic"} ${plural(UNITN[u])}`)
 .replace(/n\(([^)]+)\)/g," n of $1 ")
 .replace(/⁴√/g," fourth root of ").replace(/∛/g," cube root of ").replace(/√/g," square root of ")
 .replace(/²/g," squared ").replace(/³/g," cubed ").replace(/ⁿ/g," to the n ").replace(/⁴/g," to the fourth ").replace(/⁰/g," to the zero ")
 .replace(/(^|[\s(,{=:])[−-](\d)/g,"$1negative $2")
 .replace(/(\d)\s?(km|cm|mm|mL|kL|kg|mg|ft|in|yd|mi|lb|oz|qt|gal|pt|m|L|g)\b/g,(m,d,u)=>`${d} ${d==="1"?UNITN[u]:plural(UNITN[u])}`)
 .replace(/°F/g," degrees Fahrenheit").replace(/°C/g," degrees Celsius")
 .replace(/π/g," pi ").replace(/±/g," plus or minus ").replace(/×/g," times ").replace(/÷/g," divided by ").replace(/≈/g," is about ").replace(/≠/g," is not equal to ")
 .replace(/=/g," equals ").replace(/</g," is less than ").replace(/>/g," is greater than ").replace(/→/g,", ").replace(/↔/g," means ").replace(/·/g,", ")
 .replace(/∪/g," union ").replace(/∩/g," intersection ").replace(/∉/g," is not an element of ").replace(/∈/g," is an element of ").replace(/⊆/g," is a subset of ").replace(/⊂/g," is a subset of ")
 .replace(/\{\s*\}/g," empty set ").replace(/∅/g," the empty set ").replace(/′/g," prime ").replace(/\{/g," the set ").replace(/\}/g,", ").replace(/ \| /g," such that ")
 .replace(/…/g," and so on ").replace(/[−–]/g," minus ").replace(/[✓✔★]/g," ").replace(/\s+([.,])/g,"$1").replace(/([.,]\s*){2,}/g,". ").replace(/\s{2,}/g," ").trim();
 return s;
}
function chunks(s){const out=[];(s.match(/[^.!?]+[.!?]*/g)||[s]).forEach(p=>{p=p.trim();if(!p)return;while(p.length>220){let k=p.lastIndexOf(",",220);if(k<60)k=p.lastIndexOf(" ",220);out.push(p.slice(0,k+1));p=p.slice(k+1).trim()}if(p)out.push(p)});return out}
const TTS={active:false,paused:false,list:[],i:0,parts:[],j:0,tok:0,single:false,lock:null,
 ok:"speechSynthesis" in window,
 voice(){const vs=speechSynthesis.getVoices();if(S.prefs.voice){const v=vs.find(x=>x.name===S.prefs.voice);if(v)return v}
  return vs.find(v=>/en[-_](PH|US)/i.test(v.lang)&&/natural|google|samantha|aria|jenny/i.test(v.name))||vs.find(v=>/^en/i.test(v.lang))||null},
 play(list,i,single){if(!this.ok){alert("Text-to-speech isn't supported on this browser. Try Chrome, Edge or Safari.");return}
  this.stop(true);this.list=list;this.i=i;this.single=single;this.active=true;this.paused=false;this.wake(true);this.section();},
 section(){const d=this.list[this.i];if(!d){this.stop();return}
  $$(".speaking").forEach(x=>x.classList.remove("speaking"));d.classList.add("speaking");d.open=true;
  d.scrollIntoView({behavior:"smooth",block:"start"});
  const title=d.querySelector(".st").textContent;$("#ttsTitle").textContent=title;
  this.parts=chunks(speakable(d));this.j=0;this.bar();this.say()},
 say(){const tok=++this.tok;if(this.j>=this.parts.length){if(this.single){this.stop();return}this.i++;
   if(this.i>=this.list.length){this.stop();return}setTimeout(()=>{if(tok===this.tok&&this.active)this.section()},500);return}
  const u=new SpeechSynthesisUtterance(this.parts[this.j]);const v=this.voice();if(v){u.voice=v;u.lang=v.lang}else u.lang="en-US";u.rate=S.prefs.rate||1;
  u.onend=()=>{if(tok!==this.tok||!this.active||this.paused)return;this.j++;this.say()};
  u.onerror=e=>{if(tok!==this.tok||e.error==="interrupted"||e.error==="canceled")return;this.j++;this.say()};
  speechSynthesis.speak(u)},
 toggle(){if(!this.active)return;if(this.paused){this.paused=false;this.say()}else{this.paused=true;this.tok++;speechSynthesis.cancel()}this.bar()},
 next(){if(!this.active)return;this.tok++;speechSynthesis.cancel();this.i=Math.min(this.i+1,this.list.length-1);this.paused=false;this.section()},
 prev(){if(!this.active)return;this.tok++;speechSynthesis.cancel();if(this.j<2)this.i=Math.max(0,this.i-1);this.paused=false;this.section()},
 stop(quiet){this.tok++;if(this.ok)speechSynthesis.cancel();this.active=false;this.paused=false;$$(".speaking").forEach(x=>x.classList.remove("speaking"));this.wake(false);if(!quiet)this.bar()},
 bar(){$("#tts").hidden=!this.active;$("#ttsPlay").textContent=this.paused?"▶":"⏸";$("#ttsPlay").setAttribute("aria-label",this.paused?"Resume":"Pause");
  $("#listenAll").innerHTML=this.active?"⏹ Stop listening":"🎧 Listen to all";document.body.classList.toggle("ttson",this.active)},
 async wake(on){try{if(on&&"wakeLock" in navigator&&!this.lock){this.lock=await navigator.wakeLock.request("screen");this.lock.addEventListener("release",()=>this.lock=null)}else if(!on&&this.lock){this.lock.release();this.lock=null}}catch(e){}}
};
if(TTS.ok){speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=fillVoices}else{$("#listenAll").hidden=true}
function fillVoices(){const sel=$("#ttsVoice");if(!sel||!TTS.ok)return;const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));
 sel.innerHTML=`<option value="">Auto voice</option>`+vs.map(v=>`<option ${v.name===S.prefs.voice?"selected":""}>${esc(v.name)}</option>`).join("")}
fillVoices();
$("#ttsVoice").onchange=e=>{S.prefs.voice=e.target.value;save()};
$("#ttsRate").value=String(S.prefs.rate||1);
$("#ttsRate").onchange=e=>{S.prefs.rate=+e.target.value;save();if(TTS.active&&!TTS.paused){TTS.tok++;speechSynthesis.cancel();TTS.say()}};
$("#ttsPlay").onclick=()=>TTS.toggle();$("#ttsNext").onclick=()=>TTS.next();$("#ttsPrev").onclick=()=>TTS.prev();$("#ttsStop").onclick=()=>TTS.stop();
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&TTS.active&&TTS.lock===null)TTS.wake(true)});

/* ---------- PRACTICE HUB ---------- */
function renderPractice(){
 const weak=BANK.filter(b=>(S.it[b.id]||{}).w&&(S.it[b.id]||{}).r<2).length;
 const tiles=[["🎯","Quiz","Multiple choice, true/false, identification and solving. You pick the lessons and how many items.","quiz"],
 ["✏️","Computation drills","Unlimited fresh problems: roots, conversions, volumes, sets. Worked solution after each one.","drill"],
 ["🃏","Flashcards","Active recall: read the front, say the answer out loud, flip, rate yourself.","flash"],
 ["📋","List recall","Type every item of a list from memory: prefixes, perfect squares, kinds of sets…","list"],
 ["🧾","Blurt test","Write everything you remember about a lesson, then check what you missed.","blurt"],
 ["📝","Mock exam","Mixed items from all lessons, timed. Feedback at the end, like a real test.","exam"],
 ["🔁","Fix my mistakes",weak?`${weak} item${weak>1?"s":""} you missed before. Get each right twice to clear it.`:"Nothing yet. Items you miss will collect here.","fix",!weak]];
 $("#pTiles").innerHTML=tiles.map(x=>`<button class="tile card" data-act="${x[3]}" ${x[4]?"disabled":""}><span class="ti">${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></button>`).join("");
}

/* ---------- SETUP ---------- */
const FMTS=[["mc","Multiple choice"],["tf","True or false"],["id","Identification"],["solve","Solve (computation)"]];
let C=null;
function setup(mode,t){
 C={mode,topics:t?[t]:TK.slice(),fmts:mode==="exam"?["mc","tf","id","solve"]:["mc","tf","id","solve"],count:mode==="exam"?40:mode==="list"?5:mode==="flash"?20:10,lvl:S.prefs.lvl||2,timer:mode==="exam",instant:mode!=="exam"};
 if(mode==="fix")return startQuiz(buildFix());
 if(mode==="blurt"){C.topics=[t||TK[0]];}
 const titles={quiz:"🎯 Quiz setup",drill:"✏️ Drill setup",flash:"🃏 Flashcards setup",list:"📋 List recall setup",blurt:"🧾 Blurt test",exam:"📝 Mock exam setup"};
 const subs={quiz:"Pick what to practice",drill:"Fresh numbers every time",flash:"Say the answer before you flip",list:"Type each item you remember",blurt:"Pick one lesson",exam:"Like the real test: feedback at the end"};
 $("#setupTitle").textContent=titles[mode];$("#setupSub").textContent=subs[mode];
 $("#fmtBox").hidden=mode!=="quiz";$("#lvlBox").hidden=!["quiz","drill","exam"].includes(mode);$("#dirBox").hidden=mode!=="flash";
 $("#countBox").hidden=mode==="blurt";$("#optBox").hidden=!["quiz","drill","exam"].includes(mode);
 drawSetup();show("setup");
}
function avail(){
 if(C.mode==="flash")return CARDS.filter(c=>C.topics.includes(c.t)).length;
 if(C.mode==="list")return D.LISTS.filter(l=>C.topics.includes(l[0])).length;
 if(C.mode==="drill"||C.fmts.includes("solve"))return Infinity;
 return BANK.filter(b=>C.topics.includes(b.t)&&C.fmts.includes(b.type)).length;
}
function drawSetup(){
 $("#fmts").innerHTML=FMTS.map(f=>`<button class="pill ${C.fmts.includes(f[0])?"on":""}" data-f="${f[0]}" aria-pressed="${C.fmts.includes(f[0])}">${f[1]}</button>`).join("");
 $$("#fmts [data-f]").forEach(b=>b.onclick=()=>{const f=b.dataset.f;if(C.fmts.includes(f)){if(C.fmts.length>1)C.fmts=C.fmts.filter(x=>x!==f)}else C.fmts.push(f);drawSetup()});
 const single=C.mode==="blurt";
 $("#topicPills").innerHTML=(single?"":`<button class="pill ${C.topics.length===TK.length?"on":""}" data-tp="all">📚 All lessons</button>`)+TK.map(t=>`<button class="pill t-${t} ${C.topics.includes(t)&&(single||C.topics.length!==TK.length)?"on":""}" data-tp="${t}">${T[t].icon} ${T[t].short}</button>`).join("");
 $$("#topicPills [data-tp]").forEach(b=>b.onclick=()=>{const t=b.dataset.tp;
  if(single)C.topics=[t];else if(t==="all")C.topics=TK.slice();else if(C.topics.length===TK.length)C.topics=[t];
  else if(C.topics.includes(t)){if(C.topics.length>1)C.topics=C.topics.filter(x=>x!==t)}else C.topics.push(t);drawSetup()});
 $("#lvlPills").innerHTML=[[1,"🌱 Easy"],[2,"🌿 Normal"],[3,"🌳 Challenge"]].map(l=>`<button class="pill ${C.lvl===l[0]?"on":""}" data-l="${l[0]}">${l[1]}</button>`).join("");
 $$("#lvlPills [data-l]").forEach(b=>b.onclick=()=>{C.lvl=+b.dataset.l;S.prefs.lvl=C.lvl;save();drawSetup()});
 $("#dirPills").innerHTML=[["tm","Term → meaning"],["mt","Meaning → term"],["mix","Mixed"]].map(d=>`<button class="pill ${S.prefs.dir===d[0]?"on":""}" data-d="${d[0]}">${d[1]}</button>`).join("");
 $$("#dirPills [data-d]").forEach(b=>b.onclick=()=>{S.prefs.dir=b.dataset.d;save();drawSetup()});
 const av=avail(),presets=C.mode==="list"?[3,5,10]:C.mode==="exam"?[20,30,40,50]:[5,10,20,30,50];
 if(C.count>av)C.count=av;
 $("#availNote").textContent=av===Infinity?"(unlimited)":`(${av} available)`;
 $("#countPills").innerHTML=presets.map(n=>`<button class="pill ${C.count===n?"on":""}" data-n="${n}" ${n>av?"disabled":""}>${n}</button>`).join("")+(av!==Infinity&&!presets.includes(av)&&av<60?`<button class="pill ${C.count===av?"on":""}" data-n="${av}">All ${av}</button>`:"");
 $$("#countPills [data-n]").forEach(b=>b.onclick=()=>{C.count=+b.dataset.n;$("#countIn").value=C.count;drawSetup()});
 $("#countIn").value=C.count;$("#countIn").max=av===Infinity?200:av;
 $("#optTimer").checked=C.timer;$("#optInstant").checked=C.instant;
 $("#lblTopics").textContent=C.mode==="quiz"?"2":"1";$("#lblCount").textContent=C.mode==="quiz"?"3":"2";
 $("#blurtTip").hidden=C.mode!=="blurt";
}
$("#countIn").oninput=e=>{let n=parseInt(e.target.value,10);const av=avail();if(n>0){C.count=Math.min(n,av===Infinity?200:av);$$("#countPills .pill").forEach(p=>p.classList.toggle("on",+p.dataset.n===C.count))}};
$("#optTimer").onchange=e=>C.timer=e.target.checked;$("#optInstant").onchange=e=>C.instant=e.target.checked;
$("#startBtn").onclick=()=>{
 if(C.mode==="flash")return startFlash();if(C.mode==="list")return startList();if(C.mode==="blurt")return startBlurt(C.topics[0]);
 startQuiz(buildQuiz());
};

/* ---------- BUILD ITEMS ---------- */
function prepBank(b){const it=Object.assign({},b);if(b.type==="mc")it.ch=shuffle([b.a].concat(b.dis));return it}
function prepGen(g,lvl){const it=Object.assign({src:"gen",id:"g"+g.kind},g);if(g.type==="mc")it.ch=shuffle([g.a].concat(g.ch||[]));it.lvl=lvl;return it}
function roundRobin(pools,n){const out=[];let k=0,guard=0;const keys=Object.keys(pools).filter(t=>pools[t].length);if(!keys.length)return out;
 while(out.length<n&&guard++<5000){const t=keys[k++%keys.length];if(pools[t].length)out.push(pools[t].shift());if(keys.every(x=>!pools[x].length))break}return out}
function weightBank(list){/* items you missed or haven't mastered come first */
 return shuffle(list).sort((a,b)=>score(a)-score(b));function score(x){const s=S.it[x.id];if(!s)return 1+Math.random();return(s.r>=2?3:s.w?0:2)+Math.random()}}
function buildQuiz(){
 const n=C.count,useGen=C.mode==="drill"||C.fmts.includes("solve"),bankFmts=C.mode==="drill"?[]:C.fmts.filter(f=>f!=="solve");
 const pools={};C.topics.forEach(t=>pools[t]=weightBank(BANK.filter(b=>b.t===t&&bankFmts.includes(b.type))));
 let items=[];
 if(C.mode==="drill")items=genItems(n);
 else{const genN=useGen?(bankFmts.length?Math.round(n*(C.mode==="exam"?.4:.35)):n):0;
  items=roundRobin(pools,n-genN).map(prepBank);items=items.concat(genItems(n-items.length))}
 return shuffle(items).slice(0,n);
}
function genItems(n){const out=[],seen=new Set;let k=0,g=0;if(n<=0)return out;
 while(out.length<n&&g++<n*30){const t=C.topics[k%C.topics.length];const it=D.gen(t,C.lvl);const key=it.q;if(seen.has(key))continue;seen.add(key);k++;out.push(prepGen(it,C.lvl))}return out}
function buildFix(){C={mode:"fix",topics:TK.slice(),fmts:["mc","tf","id"],count:0,lvl:S.prefs.lvl||2,timer:false,instant:true};
 return shuffle(BANK.filter(b=>(S.it[b.id]||{}).w&&(S.it[b.id]||{}).r<2)).slice(0,30).map(prepBank)}

/* ---------- QUIZ ENGINE ---------- */
let Q=null;
const TYPE={mc:"Multiple choice",tf:"True or false",id:"Identification",num:"Solve",set:"Solve: set",frac:"Solve: fraction"};
function startQuiz(items){
 if(!items.length){alert("No items match. Pick more lessons or formats.");return}
 Q={items,i:0,pts:0,res:[],start:Date.now(),done:false,timerId:null,limit:C.timer?items.length*60:0,mode:C.mode,instant:C.instant};
 $("#sMode").textContent={quiz:"🎯 Quiz",drill:"✏️ Drill",exam:"📝 Mock exam",fix:"🔁 Fix my mistakes"}[C.mode];
 $("#sTimer").hidden=!C.timer;
 if(C.timer){Q.timerId=setInterval(tick,1000);tick()}
 show("quiz");renderQ();
}
function tick(){const el=Math.floor((Date.now()-Q.start)/1000),left=Q.limit-el;
 $("#sTimer").textContent="⏱ "+mmss(Math.max(0,left));$("#sTimer").classList.toggle("low",left<60);
 if(left<=0){clearInterval(Q.timerId);finish(true)}}
const mmss=s=>Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
function renderQ(){
 const it=Q.items[Q.i];Q.clue=false;Q.answered=false;
 $("#qCount").textContent=`${Q.i+1} / ${Q.items.length}`;$("#progFill").style.width=(100*Q.i/Q.items.length)+"%";
 $("#sScore").textContent=`⭐ ${fmtPts(Q.pts)} pts`;
 $("#qcard").className="qcard card t-"+it.t;
 $("#qmeta").innerHTML=`<span class="chip t-${it.t}">${T[it.t].icon} ${T[it.t].short}</span><span class="chip">${TYPE[it.type]}</span><span class="sp"></span>${TTS.ok?`<button class="ib sm" id="qSay" aria-label="Read the question aloud">🔊</button>`:""}`;
 $("#qtext").innerHTML=it.type==="tf"?`<small class="muted">True or false?</small><br>${md(it.q)}`:md(it.q);
 let h="";
 if(it.type==="mc")h=`<div class="choices">${it.ch.map((c,k)=>`<button class="ch" data-k="${k}"><span class="lt">${"ABCD"[k]}</span><span>${md(c)}</span></button>`).join("")}</div>`;
 else if(it.type==="tf")h=`<div class="choices tf"><button class="ch" data-v="1"><span class="lt">T</span><span>True</span></button><button class="ch" data-v="0"><span class="lt">F</span><span>False</span></button></div>`;
 else{const ph=it.type==="set"?"e.g. 1, 2, 3   (type { } for an empty set)":it.type==="frac"?"e.g. 3/4":it.a&&it.a.pi!==undefined?"e.g. 20π":it.type==="num"?"Type a number (units optional)":"Type your answer";
  const im=it.type==="num"&&!(it.a&&it.a.pi!==undefined)?"decimal":"text";
  h=`<form class="typed" id="tForm" autocomplete="off"><input id="tIn" class="in" inputmode="${im}" placeholder="${ph}" aria-label="Your answer" autocapitalize="off" spellcheck="false">
  ${it.a&&it.a.pi!==undefined?`<button type="button" class="btn sm" id="piBtn" aria-label="Insert pi">π</button>`:""}${it.type==="set"?`<button type="button" class="btn sm" id="emBtn">{ }</button>`:""}<button class="btn pri" type="submit">Check</button></form>`}
 $("#qans").innerHTML=h;
 $("#qclue").innerHTML=`<button class="btn sm clue" id="clueBtn">💡 Show clue <small>(½ point)</small></button>`;
 $("#qfb").innerHTML="";
 $$("#qans .ch").forEach(b=>b.onclick=()=>answer(b));
 const f=$("#tForm");if(f){f.onsubmit=e=>{e.preventDefault();answer(null)};setTimeout(()=>{const ti=$("#tIn");if(ti&&matchMedia("(pointer:fine)").matches)ti.focus()},50);
  const pb=$("#piBtn");if(pb)pb.onclick=()=>{$("#tIn").value+="π";$("#tIn").focus()};const eb=$("#emBtn");if(eb)eb.onclick=()=>{$("#tIn").value="{ }"}}
 $("#clueBtn").onclick=()=>{Q.clue=true;$("#qclue").innerHTML=`<div class="cluebox">💡 <b>Clue:</b> ${md(it.clue)}</div>`};
 const qs=$("#qSay");if(qs)qs.onclick=()=>{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(speakable($("#qtext"))+". "+($("#qans .choices")?speakable($("#qans .choices")):""));u.rate=S.prefs.rate||1;const v=TTS.voice();if(v)u.voice=v;speechSynthesis.speak(u)};
}
const fmtPts=p=>Number.isInteger(p)?p:p.toFixed(1);
const norm=s=>String(s).toLowerCase().replace(/[−–]/g,"-").replace(/[^a-z0-9π√∛\-./²³]/g,"");
function parseNum(s){s=String(s).replace(/[−–]/g,"-").replace(/,/g,"").trim();const fm=s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);if(fm)return(+fm[1])/(+fm[2]);const m=s.match(/-?\d*\.?\d+/);return m?parseFloat(m[0]):NaN}
function check(it,raw){
 if(it.type==="id"){const u=norm(raw);if(!u)return false;return it.a.some(a=>{const n=norm(a);if(u===n)return true;const un=parseNum(raw),an=parseNum(a);if(!isNaN(un)&&!isNaN(an)&&/^[\d,.\-\/ ]+$/.test(a.trim()))return Math.abs(un-an)<1e-9;
  return n.length>4&&lev(u,n)<=1})}
 if(it.type==="num"){
  if(it.a&&it.a.pi!==undefined){const s=String(raw).toLowerCase().replace(/\s/g,"").replace(/,/g,"");const hasPi=/π|pi/.test(s);const v=parseNum(s.replace(/π|pi/g,""))||(hasPi&&/^(π|pi)$/.test(s)?1:NaN);
   if(hasPi)return Math.abs(v-it.a.pi)<1e-6;return Math.abs(v-it.a.pi*Math.PI)/(it.a.pi*Math.PI)<.002||Math.abs(v-it.a.pi*3.14)<.006*it.a.pi*3.14}
  const v=parseNum(raw);if(isNaN(v))return false;return it.tol?Math.abs(v-it.a)<=Math.abs(it.a)*it.tol:Math.abs(v-it.a)<=0.051}
 if(it.type==="frac"){const m=String(raw).replace(/[−–]/g,"-").match(/(-?\d+)\s*\/\s*(\d+)/);const v=m?(+m[1])/(+m[2]):parseNum(raw);return!isNaN(v)&&Math.abs(v-it.a[0]/it.a[1])<1e-6}
 if(it.type==="set"){const s=String(raw).trim().toLowerCase();if(/^(\{\s*\}|∅|empty|null|none|empty set|null set|\{\})$/.test(s))return it.a.length===0;
  const parts=s.replace(/[{}]/g,"").split(/[\s,;]+/).filter(Boolean);const set=new Set(parts);return set.size===it.a.length&&it.a.every(x=>set.has(String(x).toLowerCase()))&&parts.every(p=>it.a.map(x=>String(x).toLowerCase()).includes(p))}
 return false;
}
function lev(a,b){const m=a.length,n=b.length;if(Math.abs(m-n)>1)return 2;const d=Array.from({length:m+1},(_,i)=>[i]);for(let j=1;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function correctText(it){
 if(it.type==="tf")return it.a?"True":"False";if(it.type==="mc")return md(it.a);if(it.type==="id")return esc(it.a[0]);
 if(it.type==="set")return it.a.length?`{${it.a.join(", ")}}`:"{ } (empty set)";if(it.type==="frac")return md(`[[${it.a[0]}/${it.a[1]}]]`);
 if(it.a&&it.a.pi!==undefined)return`${it.a.pi}π`;return F(it.a);
}
function answer(btn){
 if(Q.answered)return;const it=Q.items[Q.i];let ok,given;
 if(it.type==="mc"){const k=+btn.dataset.k;ok=it.ch[k]===it.a;given=it.ch[k];}
 else if(it.type==="tf"){const v=btn.dataset.v==="1";ok=v===it.a;given=v?"True":"False"}
 else{given=$("#tIn").value;if(!given.trim()){$("#tIn").focus();$("#tIn").classList.add("shake");setTimeout(()=>$("#tIn").classList.remove("shake"),400);return}ok=check(it,given)}
 Q.answered=true;const pts=ok?(Q.clue?.5:1):0;Q.pts+=pts;
 Q.res.push({it,ok,given,clue:Q.clue,pts});record(it,ok);
 if(!Q.instant){next();return}
 if(it.type==="mc"||it.type==="tf"){$$("#qans .ch").forEach(b=>{b.disabled=true;const val=it.type==="mc"?it.ch[+b.dataset.k]:(b.dataset.v==="1");if(val===it.a)b.classList.add("right");else if(b===btn)b.classList.add("wrong")})}
 else{$("#tIn").disabled=true;$("#tIn").classList.add(ok?"right":"wrong");$$("#tForm button").forEach(b=>b.disabled=true)}
 $("#qclue").innerHTML=Q.clue?$("#qclue").innerHTML:"";
 $("#qfb").innerHTML=`<div class="fb ${ok?"ok":"bad"}"><b>${ok?(Q.clue?"✓ Correct (with clue: ½ point)":"✓ Correct!"):"✗ Not quite."}</b>
 ${ok?"":`<div>Answer: <b>${correctText(it)}</b></div>`}<div class="exl">${md(it.ex)}</div></div>
 <button class="btn pri big" id="nextBtn">${Q.i+1<Q.items.length?"Next ▶":"See results"}</button>`;
 $("#sScore").textContent=`⭐ ${fmtPts(Q.pts)} pts`;
 $("#nextBtn").onclick=next;$("#nextBtn").focus({preventScroll:true});
 $("#qfb").scrollIntoView({behavior:"smooth",block:"nearest"});
}
function record(it,ok){
 if(it.src==="bank"){const s=S.it[it.id]||{r:0,w:0,n:0};s.n++;if(ok){s.r++}else{s.w++;s.r=0}S.it[it.id]=s}
 else{const s=S.sk[it.kind]||{n:0,c:0};s.n++;if(ok)s.c++;if(s.n>40){s.c=Math.round(s.c*30/s.n);s.n=30}S.sk[it.kind]=s}
 save();
}
function next(){Q.i++;if(Q.i>=Q.items.length)finish(false);else renderQ()}
function finish(timeUp){
 Q.done=true;if(Q.timerId)clearInterval(Q.timerId);
 const n=Q.items.length,answered=Q.res.length;
 Q.items.slice(answered).forEach(it=>{Q.res.push({it,ok:false,given:"(no answer: time's up)",clue:false,pts:0})});
 const pct=Math.round(100*Q.pts/n),right=Q.res.filter(r=>r.ok&&!r.clue).length,wc=Q.res.filter(r=>r.ok&&r.clue).length,wrong=n-right-wc;
 $("#rPct").textContent=pct+"%";$("#rPct").className="bigscore "+(pct>=85?"hi":pct>=60?"mid":"lo");
 $("#rMsg").textContent=(timeUp?"⏰ Time's up! ":"")+(pct>=90?"Excellent! You're exam-ready on this set. 🌟":pct>=75?"Great job! Review the few you missed. 🌿":pct>=50?"Good effort. Re-read the notes for the items below, then try again. 🌱":"Keep going! Read the notes first, then practice again. You'll get there. 💪");
 const el=Math.floor((Date.now()-Q.start)/1000);
 const by={};Q.res.forEach(r=>{const b=by[r.it.t]||(by[r.it.t]={n:0,p:0});b.n++;b.p+=r.pts});
 $("#rStats").innerHTML=`<span class="stat ok">✓ ${right} correct</span><span class="stat warn">💡 ${wc} with clue</span><span class="stat bad">✗ ${wrong} missed</span><span class="stat">⏱ ${mmss(el)}</span>`+
  `<div class="tbreak">${Object.keys(by).map(t=>`<div class="t-${t}"><span>${T[t].icon} ${T[t].short}</span><div class="pbar"><i style="width:${Math.round(100*by[t].p/by[t].n)}%"></i></div><b>${Math.round(100*by[t].p/by[t].n)}%</b></div>`).join("")}</div>`;
 const miss=Q.res.filter(r=>!r.ok||r.clue);
 $("#revTtl").hidden=!miss.length;$("#redoWrong").hidden=!miss.length;
 $("#review").innerHTML=miss.map(r=>`<div class="rv card t-${r.it.t}"><div class="qmeta"><span class="chip t-${r.it.t}">${T[r.it.t].icon} ${T[r.it.t].short}</span>${r.ok?`<span class="chip warn">used clue</span>`:""}</div>
 <div class="rq">${md(r.it.q)}</div><div class="ra"><span class="bad">Your answer: ${r.it.type==="mc"?md(r.given):esc(r.given)}</span><span class="ok">Correct: <b>${correctText(r.it)}</b></span></div><div class="exl">${md(r.it.ex)}</div>
 <div class="muted small">💡 ${md(r.it.clue)}</div></div>`).join("");
 Q.missed=miss.map(r=>r.it);
 show("results");
}
$("#redoWrong").onclick=()=>{const items=Q.missed.map(it=>it.src==="gen"?prepGen(D.gen(it.t,it.lvl||2),it.lvl||2):prepBank(it));C.instant=true;C.timer=false;startQuiz(shuffle(items))};
$("#againBtn").onclick=()=>{if(C.mode==="fix")return startQuiz(buildFix());startQuiz(buildQuiz())};
$("#quitBtn").onclick=()=>{if(Q.done||confirm("Quit this quiz? You'll see results for the items you answered.")){if(Q.res.length){Q.items=Q.items.slice(0,Q.res.length);finish(false)}else{if(Q.timerId)clearInterval(Q.timerId);Q.done=true;show("practice")}}};
document.addEventListener("keydown",e=>{
 if(cur!=="quiz"||e.target.tagName==="INPUT"&&e.key!=="Enter")return;
 const k=e.key.toLowerCase();
 if(Q.answered){if(k==="enter"&&$("#nextBtn")&&e.target.id!=="nextBtn"){e.preventDefault();next()}return}
 if(e.target.tagName==="INPUT")return;
 const it=Q.items[Q.i];
 if(it.type==="mc"){const i="abcd".indexOf(k)>=0?"abcd".indexOf(k):"1234".indexOf(k);if(i>=0&&$$("#qans .ch")[i])$$("#qans .ch")[i].click()}
 if(it.type==="tf"){if(k==="t")$$("#qans .ch")[0].click();if(k==="f")$$("#qans .ch")[1].click()}
 if(k==="h"&&$("#clueBtn"))$("#clueBtn").click();
});

/* ---------- FLASHCARDS ---------- */
let FL=null;
function startFlash(){
 const pool=CARDS.filter(c=>C.topics.includes(c.t)).sort((a,b)=>((S.cards[a.id]||{}).b||0)-((S.cards[b.id]||{}).b||0)+Math.random()-.5);
 pool.forEach(c=>c._seen=false);FL={q:pool.slice(0,C.count),i:0,got:0,again:0,total:Math.min(C.count,pool.length)};show("flash");drawCard();
}
function drawCard(){
 const c=FL.q[FL.i];if(!c){$("#fArea").innerHTML=`<div class="res card"><div class="bigscore hi">🎉</div><h2>Deck done!</h2><p class="muted">${FL.got} cards known on the first try · ${FL.again} repeats</p><div class="row center"><button class="btn pri" id="flAgain">Shuffle again</button><button class="btn ghost" data-go="practice">Back</button></div></div>`;$("#fProg").style.width="100%";$("#flAgain").onclick=startFlash;return}
 const dir=S.prefs.dir==="mix"?(Math.random()<.5?"tm":"mt"):S.prefs.dir;const front=dir==="tm"?c.f:c.b,back=dir==="tm"?c.b:c.f;
 $("#fCount").textContent=`${Math.min(FL.i+1,FL.q.length)} / ${FL.q.length}`;$("#fProg").style.width=(100*FL.i/FL.q.length)+"%";
 $("#fArea").innerHTML=`<div class="flip t-${c.t}" id="card" tabindex="0" role="button" aria-label="Flip card"><div class="face front"><span class="chip t-${c.t}">${T[c.t].icon} ${T[c.t].short}</span><div class="fc">${md(front)}</div><small class="muted">Say the answer out loud, then tap to flip</small></div>
 <div class="face back"><span class="chip t-${c.t}">Answer</span><div class="fc">${md(back)}</div></div></div>
 <div class="row center frate" id="frate" hidden><button class="btn bad" id="fAgain">😕 Again</button><button class="btn ok" id="fGot">🙂 Got it</button></div>
 <div class="row center"><button class="btn ghost sm" id="fHint">💡 Clue</button></div><p class="center muted small" id="fHintT"></p>`;
 const flip=()=>{$("#card").classList.toggle("on");$("#frate").hidden=false};
 $("#card").onclick=flip;$("#card").onkeydown=e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();flip()}};
 $("#fHint").onclick=()=>{const w=plain(back).replace(/\[\[|\]\]/g,"").split(/\s+/);$("#fHintT").textContent="Starts with: “"+w.slice(0,Math.max(1,Math.ceil(w.length/4))).join(" ")+" …”"};
 $("#fAgain").onclick=()=>{const s=S.cards[c.id]||{b:0};s.b=0;S.cards[c.id]=s;save();FL.again++;FL.q.push(c);FL.i++;drawCard()};
 $("#fGot").onclick=()=>{const s=S.cards[c.id]||{b:0};s.b=(s.b||0)+1;S.cards[c.id]=s;save();if(!c._seen)FL.got++;FL.i++;drawCard()};
 c._seen=c._seen||false;$("#fAgain").addEventListener("click",()=>c._seen=true);
}

/* ---------- LIST RECALL ---------- */
let LS=null;
function startList(){const pool=shuffle(D.LISTS.filter(l=>C.topics.includes(l[0]))).slice(0,C.count);LS={q:pool,i:0,score:0,max:0};show("list");drawList()}
const lnorm=s=>String(s).toLowerCase().replace(/,/g,"").replace(/[^a-z0-9²½×π√]/g,"");
function drawList(){
 const L=LS.q[LS.i];
 if(!L){$("#lArea").innerHTML=`<div class="res card"><div class="bigscore ${LS.score/LS.max>=.8?"hi":"mid"}">${Math.round(100*LS.score/Math.max(1,LS.max))}%</div><h2>List recall done</h2><p class="muted">You recalled ${LS.score} of ${LS.max} items from memory.</p><div class="row center"><button class="btn pri" id="lsAgain">New lists</button><button class="btn ghost" data-go="practice">Back</button></div></div>`;$("#lProg").style.width="100%";$("#lsAgain").onclick=startList;return}
 const need=L[4]||L[2].length,got=new Set;
 $("#lCount").textContent=`${LS.i+1} / ${LS.q.length}`;$("#lProg").style.width=(100*LS.i/LS.q.length)+"%";
 $("#lArea").innerHTML=`<div class="card qcard t-${L[0]}"><div class="qmeta"><span class="chip t-${L[0]}">${T[L[0]].icon} ${T[L[0]].short}</span><span class="chip">${need<L[2].length?`any ${need}`:`${need} items`}</span></div>
 <div class="qtext">${md(L[1])}</div><div class="slots" id="slots">${L[2].map((x,k)=>`<span class="slot" data-k="${k}">${k+1}</span>`).join("")}</div>
 <form class="typed" id="lForm" autocomplete="off"><input class="in" id="lIn" placeholder="Type one item, press Enter" aria-label="Type an item" autocapitalize="off" spellcheck="false"><button class="btn pri">Add</button></form>
 <p class="muted small" id="lMsg" aria-live="polite"></p>
 <div class="row"><button class="btn sm ghost" id="lClue">💡 Clue</button><button class="btn sm" id="lGive">Show the rest</button><span class="sp"></span><button class="btn sm pri" id="lNext" hidden>Next ▶</button></div><div id="lClueT"></div></div>`;
 const done=()=>{$("#lNext").hidden=false;$("#lGive").hidden=true;LS.score+=Math.min(got.size,need);LS.max+=need};
 $("#lForm").onsubmit=e=>{e.preventDefault();const v=lnorm($("#lIn").value);if(!v)return;let hit=-1;
  L[2].forEach((x,k)=>{if(hit<0&&!got.has(k)){const n=lnorm(x);if(n===v||(v.length>=4&&(n.includes(v)||v.includes(n)))||(n.length>4&&lev(v,n)<=1))hit=k}});
  if(hit>=0){got.add(hit);const s=$(`#slots [data-k="${hit}"]`);s.textContent=L[2][hit];s.classList.add("got");$("#lMsg").textContent="✓ Yes!";if(got.size>=need&&$("#lNext").hidden){$("#lMsg").textContent="🎉 All recalled!";done();L[2].forEach((x,k)=>{if(!got.has(k)){const s=$(`#slots [data-k="${k}"]`);s.textContent=x;s.classList.add("extra")}})}}
  else $("#lMsg").textContent="✗ Not on this list (or already added). Try another.";
  $("#lIn").value="";$("#lIn").focus()};
 $("#lClue").onclick=()=>$("#lClueT").innerHTML=`<div class="cluebox">💡 ${md(L[3])}</div>`;
 $("#lGive").onclick=()=>{L[2].forEach((x,k)=>{if(!got.has(k)){const s=$(`#slots [data-k="${k}"]`);s.textContent=x;s.classList.add("miss")}});done()};
 $("#lNext").onclick=()=>{LS.i++;drawList()};
}

/* ---------- BLURT ---------- */
function startBlurt(t){
 show("blurt");const prev=S.blurt[t];
 $("#bArea").innerHTML=`<div class="card qcard t-${t}"><div class="qmeta"><span class="chip t-${t}">${T[t].icon} ${T[t].name}</span>${prev!=null?`<span class="chip">Best: ${prev}%</span>`:""}</div>
 <div class="qtext">Without looking at your notes, write <b>everything</b> you remember about <b>${T[t].name}</b>: definitions, formulas, examples, traps.</div>
 <textarea id="bTxt" class="in ta" rows="9" placeholder="Start typing… key words, formulas, anything you remember."></textarea>
 <div class="row"><button class="btn ghost sm" id="bClue">💡 Clue</button><span class="sp"></span><button class="btn pri" id="bCheck">Check what I remembered</button></div><div id="bClueT"></div></div><div id="bRes"></div>`;
 $("#bClue").onclick=()=>$("#bClueT").innerHTML=`<div class="cluebox">💡 Think about: ${D.MUST[t].map(m=>{const k=m.match(/\*\*(.+?)\*\*/);return k?esc(k[1]):""}).filter(Boolean).slice(0,4).join(" · ")} …</div>`;
 $("#bCheck").onclick=()=>{
  const txt=lnorm($("#bTxt").value);
  const rows=D.MUST[t].map((m,i)=>{const keys=(m.match(/\*\*(.+?)\*\*/g)||[]).map(k=>lnorm(k.replace(/\*\*/g,""))).filter(k=>k.length>1);
   const hit=keys.length?keys.filter(k=>txt.includes(k)).length/keys.length:0;return{m,i,auto:hit>=.5}});
  $("#bRes").innerHTML=`<div class="card panel"><h3>Tick what you remembered</h3><p class="muted small">Items with your key words are pre-ticked. Be honest: untick anything you only half knew.</p>
  ${rows.map(r=>`<label class="chk bl"><input type="checkbox" data-i="${r.i}" ${r.auto?"checked":""}><span>${md(r.m)}</span></label>`).join("")}
  <div class="row"><button class="btn pri" id="bScore">Save my score</button><button class="btn" id="bRedo">Try again</button><button class="btn ghost" data-act="review" data-t="${t}">Re-read notes</button></div><p id="bOut" class="fbline"></p></div>`;
  $$("#bRes b.k").forEach(k=>k.classList.add("rv"));
  $("#bScore").onclick=()=>{const n=$$("#bRes input:checked").length,p=Math.round(100*n/rows.length);S.blurt[t]=Math.max(S.blurt[t]||0,p);save();
   $("#bOut").innerHTML=`You recalled <b>${n} of ${rows.length}</b> must-knows (${p}%). ${p===100?"Perfect! 🌟":"Re-read the unticked ones, then blurt again tomorrow."}`};
  $("#bRedo").onclick=()=>startBlurt(t);
  $("#bRes").scrollIntoView({behavior:"smooth"});
 };
}

/* ---------- SHEET (formulas, key terms, tips) ---------- */
let sheetTab="f";
function renderSheet(){
 $$("#sheetTabs [data-st]").forEach(b=>{b.classList.toggle("on",b.dataset.st===sheetTab);b.onclick=()=>{sheetTab=b.dataset.st;renderSheet()}});
 $("#glSearch").hidden=sheetTab!=="g";
 if(sheetTab==="f")$("#sheetBody").innerHTML=md(D.SHEET);
 else if(sheetTab==="t")$("#sheetBody").innerHTML=`<div class="tips">${D.TIPS.map((x,i)=>`<div class="tip card"><span class="tn">${i+1}</span><div><b>${x[0]}</b><p>${md(x[1])}</p></div></div>`).join("")}</div>
  <div class="card panel"><h3>📅 A smart review schedule</h3><ol class="sched"><li><b>Day 1:</b> Read Lessons I–III with Recall mode. Blurt each one.</li><li><b>Day 2:</b> Read Lessons IV–VI. Blurt each one. Flashcards (all lessons).</li><li><b>Day 3:</b> Drills on all lessons (Normal). Fix my mistakes.</li><li><b>Day 4:</b> Mock exam. Re-read notes for the lessons below 80%.</li><li><b>Exam eve:</b> Must-know lists + Formula sheet, listen mode while relaxing, then sleep well.</li></ol>
  <p class="muted small">Why it works: recalling from memory (active recall) and spreading reviews over days (spaced repetition) are the two most proven study methods. Rereading alone feels good but fades fast.</p></div>`;
 else drawGloss();
}
function drawGloss(){const q=lnorm($("#glSearch").value||"");
 const list=CARDS.filter(c=>!q||lnorm(c.f+" "+c.b).includes(q));
 $("#sheetBody").innerHTML=TK.map(t=>{const l=list.filter(c=>c.t===t);if(!l.length)return"";return`<h3 class="glh t-${t}">${T[t].icon} ${T[t].name}</h3><div class="gl">${l.map(c=>`<div class="gi card t-${t}"><b>${md(c.f)}</b><span>${md(c.b)}</span></div>`).join("")}</div>`}).join("")||`<p class="muted">No match. Try another word.</p>`}
$("#glSearch").oninput=drawGloss;

window.__rv={check,speakable,correctText};
/* ---------- offline ---------- */
if("serviceWorker" in navigator&&location.protocol!=="file:"){
 window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").then(()=>navigator.serviceWorker.ready).then(()=>{$("#offPill").hidden=false}).catch(()=>{})});
}
const net=()=>{$("#netPill").hidden=navigator.onLine};window.addEventListener("online",net);window.addEventListener("offline",net);net();

/* ---------- start ---------- */
const start=(location.hash||"#home").slice(1);
history.replaceState({v:"home"},"","#home");
if(["notes","practice","sheet"].includes(start)){history.pushState({v:start},"","#"+start);show(start,false)}else show("home",false);
})();
