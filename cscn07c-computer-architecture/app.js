/* CSCN07C Reviewer — app shell, study modes, drills, quizzes, progress */
(function(){
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const {shuffle, esc} = window.BIN;
const TOP = window.TOPICS, TMAP = Object.fromEntries(TOP.map(t => [t.id, t]));
const app = $("#app");

/* ---------- storage (safe) ---------- */
const KEY = "cscn07c-reviewer-v1";
let S = {q:{}, t:{}, cards:{}, studied:{}, theme:"", setup:null, cardSet:null};
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch(_){}
// Lesson 3 added topics. If a saved selection was "every topic that existed then", keep it meaning "all" so new topics aren't silently left out.
const OLD8 = ["ipo","cpu","cycle","arduino","twos","bitwise","shift","flags"], isOld8 = a => Array.isArray(a) && a.length === OLD8.length && OLD8.every(x => a.includes(x));
if (S.setup && isOld8(S.setup.topics)) S.setup.topics = TOP.map(t => t.id);
if (S.cardSet && isOld8(S.cardSet.topics)) S.cardSet.topics = ["all"];
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(_){} };

/* ---------- theme ---------- */
const applyTheme = () => { if (S.theme) document.documentElement.dataset.theme = S.theme; else delete document.documentElement.dataset.theme;
  const dark = S.theme ? S.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; $("#themeBtn").textContent = dark ? "☀️" : "🌙"; };
$("#themeBtn").onclick = () => { const dark = S.theme ? S.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; S.theme = dark ? "light" : "dark"; save(); applyTheme(); };
applyTheme();

/* ---------- items ---------- */
const ITEMS = [];
window.QUESTIONS.forEach((q, i) => ITEMS.push({...q, id:"q" + i}));
const termAnswers = t => { const inner = (t.t.match(/\((.*?)\)/) || [])[1] || "";
  return [t.t, t.t.replace(/\s*\(.*?\)\s*/g, " ").trim(), ...(inner.length <= 8 ? inner.split(/\s*\/\s*/) : [inner]).filter(Boolean), ...(t.a || [])]; };
window.TERMS.forEach((t, i) => {
  const alts = termAnswers(t);
  ITEMS.push({k:t.k, type:"id", id:"ti" + i, q:`Identify the term: “${t.d}”`, a:alts, c:t.c, e:`<b>${esc(t.t)}</b> — ${esc(t.p)}`, show:t.t});
  const others = shuffle(window.TERMS.filter(x => x.k === t.k && x !== t)).slice(0, 3).map(x => x.t);
  while (others.length < 3) { const x = window.TERMS[Math.floor(Math.random() * window.TERMS.length)].t; if (x !== t.t && !others.includes(x)) others.push(x); }
  ITEMS.push({k:t.k, type:"mc", id:"tm" + i, q:`Which term matches: “${t.d}”`, o:[t.t, ...others], c:t.c, e:`<b>${esc(t.t)}</b> — ${esc(t.p)}`});
});
const genItem = k => { const g = window.GEN[k]; const q = g[Math.floor(Math.random() * g.length)](); return {...q, k, id:"g:" + k, gen:true}; };

/* ---------- answer checking ---------- */
const norm = s => String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/−/g, "-").replace(/[^a-z0-9&|^~<>+\-]/g, "");
function lev(a, b){ const m = a.length, n = b.length; if (!m) return n; if (!n) return m; let p = Array.from({length:n + 1}, (_, j) => j);
  for (let i = 1; i <= m; i++){ const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; }
function checkText(resp, answers){ const r = norm(resp); if (!r) return {ok:false};
  for (const a of answers){ const x = norm(a); if (x && r === x) return {ok:true}; }
  for (const a of answers){ const x = norm(a); if (x.length >= 5 && lev(r, x) <= (x.length >= 10 ? 2 : 1)) return {ok:true, typo:true}; }
  return {ok:false}; }
function check(item, resp){
  if (item.type === "tf") return {ok: resp === item.a};
  if (item.type === "mc") return {ok: resp === item.o[0]};
  if (item.type === "input"){
    if (item.chk === "bin"){ const r = String(resp).replace(/\s/g, ""); if (!/^[01]{1,9}$/.test(r)) return {ok:false};
      if (r.length === 9) return {ok:false, note:"That’s 9 bits — drop the carry bit."};
      const ok = parseInt(r, 2) === parseInt(item.ans, 2); return {ok, note: ok && r.length < 8 ? "Correct value — but write all 8 bits in the exam." : ""}; }
    if (item.chk === "num"){ const r = parseFloat(String(resp).replace(/−/g, "-").replace(/[^0-9.\-]/g, "")); return {ok: !isNaN(r) && Math.abs(r - parseFloat(item.ans)) < 1e-9}; }
  }
  return checkText(resp, item.a);
}
const answerText = it => it.type === "tf" ? (it.a ? "True" : "False") : it.type === "mc" ? it.o[0] : it.type === "input" ? (it.chk === "bin" ? window.BIN.F(it.ans) : it.ans) : it.type === "id" ? it.show : it.a[0];

/* ---------- progress ---------- */
const staticItems = k => ITEMS.filter(i => i.k === k);
function record(item, ok, pts){
  if (!item.gen){ const r = S.q[item.id] || {c:0, w:0, l:0}; ok ? r.c++ : r.w++; r.l = ok ? 1 : 0; S.q[item.id] = r; }
  const t = S.t[item.k] || [0, 0]; t[0] += pts; t[1]++; S.t[item.k] = t; save();
}
const mastery = k => { const its = staticItems(k); return its.length ? Math.round(its.filter(i => S.q[i.id] && S.q[i.id].l).length / its.length * 100) : 0; };
const accuracy = k => { const t = S.t[k]; return t && t[1] ? Math.round(t[0] / t[1] * 100) : null; };
const overall = () => Math.round(TOP.reduce((s, t) => s + mastery(t.id), 0) / TOP.length);

/* ---------- router ---------- */
const NAV = [["home","🏠","Home"],["notes","📒","Notes"],["lab","🧪","Lab"],["cards","🃏","Recall"],["test","🎯","Test"]];
function navHTML(cur){ return NAV.map(([r,i,l]) => `<a href="#/${r}" class="${cur === r ? "on" : ""}"><span class="i">${i}</span><span>${l}</span></a>`).join(""); }
let session = null, keyHandler = null;
function route(){
  window.LAB_STOP(); keyHandler = null; clearInterval(timerInt);
  const [path, qs] = location.hash.replace(/^#\/?/, "").split("?"); const [page, arg] = (path || "home").split("/");
  const params = new URLSearchParams(qs || "");
  const navKey = {glossary:"notes", weak:"test", run:"test", results:"test"}[page] || page;
  $("#topnav").innerHTML = navHTML(navKey); $("#botnav").innerHTML = navHTML(navKey);
  const fn = {home, notes, lab, cards, test, glossary, weak, run, results}[page] || home;
  app.innerHTML = ""; const v = document.createElement("div"); v.className = "view"; app.appendChild(v);
  fn(v, arg, params); window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
document.addEventListener("keydown", e => { if (keyHandler && !e.ctrlKey && !e.metaKey && !e.altKey) keyHandler(e); });
const go = h => { if (location.hash === h) route(); else location.hash = h; };
const toast = m => { const t = document.createElement("div"); t.className = "toast"; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 1800); };
const chipT = (t, on) => `<button class="chip t-${t.id} ${on ? "on" : ""}" data-t="${t.id}">${t.icon} ${t.short}</button>`;
// Filter rows that re-render on click: restore their horizontal scroll and keep the active chip visible
const chipScroll = {};
function keepChipsInView(wrap, key){
  if (chipScroll[key] != null) wrap.scrollLeft = chipScroll[key];
  const on = wrap.querySelector(".chip.on");
  if (on){ const w = wrap.getBoundingClientRect(), c = on.getBoundingClientRect();
    if (c.left < w.left || c.right > w.right) wrap.scrollLeft += c.left - w.left - (w.width - c.width) / 2; }
  chipScroll[key] = wrap.scrollLeft;
  wrap.addEventListener("scroll", () => { chipScroll[key] = wrap.scrollLeft; }, {passive:true});
}

/* ---------- HOME ---------- */
function home(v){
  const o = overall();
  const attempted = TOP.filter(t => accuracy(t.id) !== null);
  let next;
  if (!attempted.length && !Object.keys(S.studied).length) next = `New here? Start with <a href="#/notes/ipo">Study notes → IPO+S</a>, then try a short drill.`;
  else { const w = weakest(); next = `Suggested next: train your weakest topic — <a href="#/weak">${w.t.icon} ${w.t.name}</a> (${w.label}).`; }
  v.innerHTML = `
  <section class="hero"><div class="kicker">CSCN07C · Computer Architecture &amp; Organization</div>
   <h1>Logic Gates, Arduino Architecture &amp; the ALU</h1>
   <p>Everything from the lessons — Ohm's law, resistors, digital logic and logic gates, plus IPO+S, CPU parts, the instruction cycle, Arduino code, two's complement, bitwise logic, bit shifting and status flags — explained step by step, with labs to practice the solving.</p>
   <div class="row"><a class="btn pri" href="#/notes">📒 Start studying</a><a class="btn" href="#/test?mode=drill">🎯 Quick drill</a></div></section>
  <div class="sec-title"><h2>Start here</h2><span>Learn → practice → test yourself. Every question has a clue.</span></div>
  <div class="grid">
   ${tile("#/notes","📒","Study notes","Clear explanations, worked solutions, scenarios & traps. Quick-review mode too.","ipo")}
   ${tile("#/lab","🧪","Practice lab","Ohm's law, resistor colors, logic gates, two's complement, shifts, flags, fetch cycle & Arduino sims.","shift")}
   ${tile("#/cards","🃏","Active recall","Flashcards that make you recall first, then spaced by how well you knew it.","cpu")}
   ${tile("#/test?mode=drill","🎯","Drill","Instant feedback and explanation after every answer.","arduino")}
   ${tile("#/test?mode=quiz","📝","Mock quiz","Answers revealed at the end, like a real exam. Optional timer.","twos")}
   ${tile("#/test?mode=drill&fmt=solve","🧮","Solve problems","Unlimited fresh computations: Ohm's law, resistor colors, gates, 2's complement, shifts, flags…","bitwise")}
   ${tile("#/weak","💪","Train my weak spot","Practice the topic you know least, missed items first.","flags")}
   ${tile("#/glossary","🔎","Glossary","Search every key term, in the slide’s own words.","cycle")}
  </div>
  <div class="sec-title"><h2>Your progress</h2><span>Fills up as you answer each item correctly</span></div>
  <div class="card prog"><div class="ring" style="--p:${o}"><div><b>${o}%</b><small>${o >= 85 ? "EXAM READY" : o >= 50 ? "GETTING THERE" : "READY TO LEARN"}</small></div></div>
   <div class="bars">${TOP.map(t => `<div class="bar t-${t.id}"><span class="nm">${t.icon} ${t.short}</span><div class="track"><div class="fill" style="width:${mastery(t.id)}%"></div></div><span class="pct">${mastery(t.id)}%</span></div>`).join("")}</div></div>
  <p class="small muted" style="margin-top:.8rem">${next}</p>
  <p class="foot">No sign-up. Works online and offline — add it to your home screen. Progress is saved only on this device.<br><button class="btn ghost sm" id="resetP">Reset my progress</button></p>`;
  $("#resetP", v).onclick = () => { if (confirm("Reset all progress, flashcard boxes and stats on this device?")){ S.q = {}; S.t = {}; S.cards = {}; S.studied = {}; save(); route(); } };
}
const tile = (href, ic, b, s, t) => `<a class="tile t-${t}" href="${href}"><span class="ic">${ic}</span><span><b>${b}</b><small>${s}</small></span></a>`;

/* ---------- NOTES ---------- */
function notes(v, arg){
  const sel = arg && TMAP[arg] ? arg : "all";
  const mode = sessionStorage.getItem("notesMode") || "full";
  const list = sel === "all" ? TOP : [TMAP[sel]];
  v.innerHTML = `<div class="page-head"><h1>📒 Study notes</h1><p>Read one topic at a time. Open a section, then tap the “check yourself” questions before moving on.</p></div>
   <div class="chips hscroll" id="tch"><button class="chip ${sel === "all" ? "on" : ""}" data-t="all">📚 All lessons</button>${TOP.map(t => chipT(t, sel === t.id)).join("")}</div>
   <div class="row" style="margin:1rem 0"><div class="seg" id="nmode"><button data-m="full" class="${mode === "full" ? "on" : ""}">Full lesson</button><button data-m="quick" class="${mode === "quick" ? "on" : ""}">Quick review</button></div><span class="spacer"></span>
   ${mode === "full" ? `<button class="btn sm ghost" id="xall">Expand all</button>` : ""}<a class="btn sm ghost" href="#/glossary">🔎 Glossary</a></div>
   <div id="nbody"></div>`;
  const body = $("#nbody", v);
  body.innerHTML = list.map((t, ti) => {
    const N = window.NOTES[t.id];
    const head = `<div class="topic-head t-${t.id}" id="n-${t.id}"><div class="lbl">${t.icon} Topic ${TOP.indexOf(t) + 1} · ${t.slides}</div><h2>${t.name}</h2><p class="big">${N.big}</p></div>`;
    const acts = `<div class="row" style="margin-top:.8rem">${N.lab ? `<a class="btn sm soft" href="#/lab/${N.lab}">🧪 Try it in the Lab</a>` : ""}<a class="btn sm soft" href="#/test?mode=drill&topics=${t.id}">🎯 Drill this topic</a><a class="btn sm soft" href="#/cards?topics=${t.id}">🃏 Recall its terms</a>
      <label class="row small" style="gap:.35rem;margin-left:auto;cursor:pointer"><input type="checkbox" data-studied="${t.id}" ${S.studied[t.id] ? "checked" : ""}> I’ve studied this</label></div>`;
    if (mode === "quick") return `<div class="card t-${t.id}" style="margin-bottom:1rem"><div class="lbl small" style="color:var(--tcx);font-weight:700">${t.icon} ${t.slides}</div><h3 style="margin:.2rem 0 .4rem">${t.name}</h3><ul class="sumlist">${N.sum.map(s => `<li>${esc(s)}</li>`).join("")}</ul>${acts}</div>`;
    return `<section style="margin-bottom:2rem">${head}<div style="margin-top:.8rem">${N.sections.map((s, i) => `<details class="sec t-${t.id}" ${sel !== "all" && i === 0 ? "open" : ""}><summary><span class="n">${i + 1}</span>${s.h}</summary><div class="body">${s.html}</div></details>`).join("")}
      <details class="sec t-${t.id}"><summary><span class="n">✓</span>Must-remember summary</summary><div class="body"><ul class="sumlist">${N.sum.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div></details></div>${acts}
      ${sel !== "all" ? nextLink(t) : ""}</section>`;
  }).join("");
  $$("#tch .chip", v).forEach(c => c.onclick = () => go(c.dataset.t === "all" ? "#/notes" : "#/notes/" + c.dataset.t));
  keepChipsInView($("#tch", v), "notes");
  $$("#nmode button", v).forEach(b => b.onclick = () => { sessionStorage.setItem("notesMode", b.dataset.m); route(); });
  const xa = $("#xall", v); if (xa) xa.onclick = () => { const open = xa.textContent.startsWith("Expand"); $$("details.sec", v).forEach(d => d.open = open); xa.textContent = open ? "Collapse all" : "Expand all"; };
  $$("[data-studied]", v).forEach(c => c.onchange = () => { S.studied[c.dataset.studied] = c.checked; save(); if (c.checked) toast("Nice! Now test it with a drill."); });
}
function nextLink(t){ const i = TOP.indexOf(t), n = TOP[i + 1], p = TOP[i - 1];
  return `<div class="row" style="margin-top:1.2rem">${p ? `<a class="btn ghost" href="#/notes/${p.id}">← ${p.short}</a>` : ""}<span class="spacer"></span>${n ? `<a class="btn" href="#/notes/${n.id}">Next: ${n.icon} ${n.short} →</a>` : `<a class="btn pri" href="#/test?mode=quiz">Take a mock quiz →</a>`}</div>`; }

/* ---------- GLOSSARY ---------- */
function glossary(v){
  let sel = "all", q = "";
  v.innerHTML = `<div class="page-head"><h1>🔎 Glossary</h1><p>${window.TERMS.length} key terms. Definitions follow the slide wording; the grey line explains it in plain words.</p></div>
   <input type="text" id="gq" placeholder="Search a term or meaning…" aria-label="Search glossary">
   <div class="chips hscroll" id="gch" style="margin:.8rem 0"><button class="chip on" data-t="all">📚 All</button>${TOP.map(t => chipT(t, false)).join("")}</div><div class="gl" id="gl"></div>`;
  const draw = () => { const n = norm(q);
    const list = window.TERMS.filter(t => (sel === "all" || t.k === sel) && (!n || norm(t.t + t.d + t.p).includes(n)));
    $("#gl", v).innerHTML = list.length ? list.map(t => `<div class="g t-${t.k}"><div class="row" style="gap:.4rem"><b>${esc(t.t)}</b><span class="tag">${TMAP[t.k].short}</span></div><p>${esc(t.d)}</p><p class="pl">💡 ${esc(t.p)}</p></div>`).join("") : `<div class="empty">No terms match “${esc(q)}”.</div>`; };
  $("#gq", v).oninput = e => { q = e.target.value; draw(); };
  $$("#gch .chip", v).forEach(c => c.onclick = () => { sel = c.dataset.t; $$("#gch .chip", v).forEach(x => x.classList.toggle("on", x === c)); draw(); });
  draw();
}

/* ---------- LAB ---------- */
function lab(v, arg){
  const L = window.LABS, keys = Object.keys(L);
  const sel = L[arg] ? arg : "twos";
  v.innerHTML = `<div class="page-head"><h1>🧪 Practice lab</h1><p>Learn by doing. Change the numbers, predict the answer, then check. Trial and error is the point!</p></div>
   <div class="chips hscroll" id="lch" style="margin-bottom:1rem">${keys.map(k => `<button class="chip t-${L[k].topic} ${k === sel ? "on" : ""}" data-l="${k}">${L[k].icon} ${L[k].name}</button>`).join("")}</div>
   <div id="lbody"></div>
   <div class="row" style="margin-top:1rem"><a class="btn soft" href="#/notes/${L[sel].topic}">📒 Read the notes</a><a class="btn soft" href="#/test?mode=drill&fmt=solve&topics=${L[sel].topic}">🧮 Solve practice problems</a></div>`;
  $$("[data-l]", v).forEach(c => c.onclick = () => go("#/lab/" + c.dataset.l));
  keepChipsInView($("#lch", v), "lab");
  L[sel].render($("#lbody", v));
}

/* ---------- FLASHCARDS (active recall + Leitner boxes) ---------- */
function cards(v, arg, params){
  const cs = S.cardSet || {topics:["all"], dir:"d2t", mode:"type"};
  if (params.get("topics")) cs.topics = params.get("topics").split(",");
  let deck, qi = 0, flipped = false, stats = {again:0, almost:0, got:0};
  const box = t => S.cards[t] || 0;
  v.innerHTML = `<div class="page-head"><h1>🃏 Active recall</h1><p>Look at the prompt and <b>pull the answer from memory first</b> — that effort is what makes it stick. Then rate yourself honestly.</p></div>
   <div class="card setup"><div class="chips hscroll" id="ct"><button class="chip ${cs.topics.includes("all") ? "on" : ""}" data-t="all">📚 All lessons</button>${TOP.map(t => chipT(t, cs.topics.includes(t.id))).join("")}</div>
   <div class="row" style="margin-top:.9rem"><div class="seg" id="cdir"><button data-d="d2t">Meaning → Term</button><button data-d="t2d">Term → Meaning</button></div>
   <div class="seg" id="cmode"><button data-m="type">Type to recall</button><button data-m="flip">Flip only</button></div></div>
   <div class="boxes" id="cbox"></div></div>
   <div id="cstage" style="margin-top:1rem"></div>`;
  const build = () => { const pool = window.TERMS.filter(t => cs.topics.includes("all") || cs.topics.includes(t.k));
    deck = shuffle(pool).sort((a, b) => box(a.t) - box(b.t)); qi = 0; flipped = false; stats = {again:0, almost:0, got:0};
    const c = [0,0,0,0]; pool.forEach(t => { const b = box(t.t); c[b === 0 ? 0 : b <= 2 ? 1 : b === 3 ? 2 : 3]++; });
    $("#cbox", v).innerHTML = `<span>🆕 New ${c[0]}</span><span>📖 Learning ${c[1]}</span><span>💪 Strong ${c[2]}</span><span>🏆 Mastered ${c[3]}</span>`;
    S.cardSet = cs; save(); draw(); };
  const draw = () => {
    $$("#cdir button", v).forEach(b => b.classList.toggle("on", b.dataset.d === cs.dir));
    $$("#cmode button", v).forEach(b => b.classList.toggle("on", b.dataset.m === cs.mode));
    const st = $("#cstage", v);
    if (!deck.length){ st.innerHTML = `<div class="empty">Pick at least one topic.</div>`; return; }
    if (qi >= deck.length){ st.innerHTML = `<div class="card center"><h3>🎉 Round complete!</h3><p>Got it: <b>${stats.got}</b> · Almost: <b>${stats.almost}</b> · Again: <b>${stats.again}</b></p><p class="muted small">Cards you missed come first next round. Short, frequent rounds beat one long cram.</p><div class="row" style="justify-content:center"><button class="btn pri" id="again">Another round</button><a class="btn" href="#/test?mode=drill&fmt=id">Test with identification →</a></div></div>`;
      $("#again", v).onclick = build; keyHandler = null; return; }
    const t = deck[qi], tp = TMAP[t.k];
    const front = cs.dir === "t2d" ? `<div class="term">${esc(t.t)}</div>` : `<div class="def">${esc(t.d)}</div>`;
    const back = cs.dir === "t2d" ? `<div class="def"><b>${esc(t.d)}</b></div><p class="small muted" style="margin-top:.6rem">💡 ${esc(t.p)}</p>` : `<div class="term">${esc(t.t)}</div><p class="small muted" style="margin-top:.6rem">💡 ${esc(t.p)}</p>`;
    st.innerHTML = `<div class="flash t-${t.k}"><div class="qtop"><span>${qi + 1} / ${deck.length}</span><div class="track"><div class="fill" style="width:${qi / deck.length * 100}%"></div></div><span class="tag">${tp.icon} ${tp.short}</span></div>
      <div class="fc ${flipped ? "flip" : ""}" id="fc" tabindex="0" role="button" aria-label="Flip card"><div class="face front">${front}<span class="hintline">${cs.mode === "type" ? "Type your answer below, then reveal" : "Tap to flip · Space"}</span></div><div class="face back">${back}</div></div>
      ${cs.mode === "type" && !flipped ? `<div class="ansrow" style="margin-top:.9rem"><input type="text" id="ctype" placeholder="${cs.dir === "t2d" ? "Explain it in your own words…" : "Type the term…"}" autocomplete="off"><button class="btn pri" id="reveal">Reveal</button></div>` : ""}
      ${!flipped && cs.mode !== "type" ? `<div class="row" style="justify-content:center;margin-top:.9rem"><button class="btn pri" id="reveal">Show answer</button><button class="btn ghost" id="hint">💡 Clue</button></div>` : ""}
      ${!flipped && cs.mode === "type" ? `<div class="row" style="justify-content:center;margin-top:.5rem"><button class="btn ghost sm" id="hint">💡 Clue</button></div>` : ""}
      <div id="cfb"></div>
      ${flipped ? `<div class="rate"><button class="btn" data-r="again">😕 Again<small>didn’t know</small></button><button class="btn" data-r="almost">🤔 Almost<small>partly</small></button><button class="btn pri" data-r="got">😄 Got it<small>knew it</small></button></div><p class="tiny muted center" style="margin-top:.5rem">Keys: 1 · 2 · 3</p>` : ""}</div>`;
    const reveal = () => { const typed = $("#ctype", v) ? $("#ctype", v).value : ""; flipped = true; draw();
      if (typed && cs.dir === "d2t"){ const r = checkText(typed, termAnswers(t));
        $("#cfb", v).innerHTML = `<div class="fb ${r.ok ? "ok" : "no"}"><div class="h">${r.ok ? "✓ You recalled it" + (r.typo ? " (small typo)" : "") : "✗ Not quite"}</div>You typed: <b>${esc(typed)}</b></div>`; }
      else if (typed) $("#cfb", v).innerHTML = `<div class="fb ok"><div class="h">Compare</div>You wrote: <i>${esc(typed)}</i> — does it match the key idea?</div>`; };
    const rate = r => { const b = box(t.t); stats[r]++;
      if (r === "again"){ S.cards[t.t] = 1; deck.splice(Math.min(qi + 4, deck.length), 0, t); }
      else if (r === "almost"){ S.cards[t.t] = Math.max(1, b); deck.push(t); }
      else S.cards[t.t] = Math.min(5, b + 1);
      save(); qi++; flipped = false; draw(); const i = $("#ctype", v); if (i) i.focus(); };
    const fc = $("#fc", v); fc.onclick = () => { if (!flipped) reveal(); };
    if ($("#reveal", v)) $("#reveal", v).onclick = reveal;
    if ($("#hint", v)) $("#hint", v).onclick = () => { $("#cfb", v).innerHTML = `<div class="cluebox"><b>Clue:</b> ${esc(t.c)}</div>`; };
    if ($("#ctype", v)) $("#ctype", v).onkeydown = e => { if (e.key === "Enter"){ e.preventDefault(); reveal(); } };
    $$("[data-r]", v).forEach(b => b.onclick = () => rate(b.dataset.r));
    keyHandler = e => { if (e.target.tagName === "INPUT") return; if (!flipped && (e.key === " " || e.key === "Enter")){ e.preventDefault(); reveal(); }
      else if (flipped && ["1","2","3"].includes(e.key)) rate(["again","almost","got"][+e.key - 1]); };
  };
  $$("#ct .chip", v).forEach(c => c.onclick = () => { const id = c.dataset.t;
    if (id === "all") cs.topics = ["all"]; else { cs.topics = cs.topics.filter(x => x !== "all"); cs.topics = cs.topics.includes(id) ? cs.topics.filter(x => x !== id) : [...cs.topics, id]; if (!cs.topics.length) cs.topics = ["all"]; }
    $$("#ct .chip", v).forEach(x => x.classList.toggle("on", cs.topics.includes(x.dataset.t))); build(); });
  $$("#cdir button", v).forEach(b => b.onclick = () => { cs.dir = b.dataset.d; flipped = false; save(); draw(); });
  $$("#cmode button", v).forEach(b => b.onclick = () => { cs.mode = b.dataset.m; flipped = false; save(); draw(); });
  build();
}

/* ---------- TEST SETUP ---------- */
const FMTS = [["mixed","🎲","Mixed","A bit of everything"],["mc","🔘","Multiple choice","Pick A, B, C or D"],["tf","✅","True or false","Is it correct?"],["id","🔎","Identification","Read the meaning, type the term"],["fill","✏️","Fill in the blank","Complete the sentence"],["solve","🧮","Problem solving","Fresh computations & scenarios"]];
function poolFor(fmt, topics){ return ITEMS.filter(i => topics.includes(i.k) && (fmt === "mixed" || i.type === fmt)); }
function test(v, arg, params){
  const st = Object.assign({mode:"drill", fmt:"mixed", n:10, topics:TOP.map(t => t.id), timer:0}, S.setup || {});
  if (params.get("mode")) st.mode = params.get("mode");
  if (params.get("fmt")) st.fmt = params.get("fmt");
  if (params.get("topics")) st.topics = params.get("topics").split(",").filter(x => TMAP[x]);
  if (!st.topics.length) st.topics = TOP.map(t => t.id);
  const draw = () => {
    const avail = st.fmt === "solve" ? Infinity : poolFor(st.fmt, st.topics).length;
    const all = st.topics.length === TOP.length;
    v.innerHTML = `<div class="page-head"><h1>${st.mode === "drill" ? "🎯 Drill" : "📝 Mock quiz"}</h1><p>${st.mode === "drill" ? "You see if you’re right after every answer, with the full explanation." : "Answer everything first — the score and explanations come at the end, like a real exam."}</p></div>
     <div class="card setup">
      <h3>Mode</h3><div class="seg" id="smode"><button data-m="drill" class="${st.mode === "drill" ? "on" : ""}">🎯 Drill</button><button data-m="quiz" class="${st.mode === "quiz" ? "on" : ""}">📝 Mock quiz</button></div>
      <h3>1. Question format</h3><div class="fmt" id="sfmt">${FMTS.map(([k,i,n,d]) => `<button data-f="${k}" class="${st.fmt === k ? "on" : ""}"><b>${i} ${n}</b><small>${d}</small></button>`).join("")}</div>
      <h3>2. How many items? <span class="muted small" style="font-weight:500">${avail === Infinity ? "unlimited — new numbers every time" : avail + " available for this choice"}</span></h3>
      <div class="chips" id="sn">${[5,10,15,20,30,50].map(n => `<button class="chip ${st.n === n ? "on" : ""}" data-n="${n}">${n}</button>`).join("")}${avail !== Infinity ? `<button class="chip ${st.n === "all" ? "on" : ""}" data-n="all">All (${avail})</button>` : ""}</div>
      <div class="row" style="margin-top:.6rem"><span class="small muted">or type a number:</span><input type="number" id="snum" min="1" max="${avail === Infinity ? 100 : avail}" value="${st.n === "all" ? avail : st.n}" style="width:100px"></div>
      <h3>3. Topics</h3><div class="chips" id="stop"><button class="chip ${all ? "on" : ""}" data-t="all">📚 All topics</button>${TOP.map(t => chipT(t, !all && st.topics.includes(t.id))).join("")}</div>
      ${st.mode === "quiz" ? `<h3>4. Timer</h3><div class="seg" id="stim">${[[0,"Off"],[30,"30 s / item"],[60,"60 s / item"]].map(([s,l]) => `<button data-s="${s}" class="${st.timer === s ? "on" : ""}">${l}</button>`).join("")}</div>` : ""}
      <p class="note" style="margin-top:1.1rem">💡 Every question has a <b>clue</b>. Using a clue gives half a point, so try first!</p>
      <div class="row" style="margin-top:1rem"><button class="btn pri" id="sgo" ${avail === 0 ? "disabled" : ""}>Start ${st.mode === "drill" ? "drill" : "quiz"} →</button><a class="btn ghost" href="#/home">Back</a></div></div>`;
    $$("#smode button", v).forEach(b => b.onclick = () => { st.mode = b.dataset.m; draw(); });
    $$("#sfmt button", v).forEach(b => b.onclick = () => { st.fmt = b.dataset.f; if (st.fmt === "solve" && st.n === "all") st.n = 10; draw(); });
    $$("#sn .chip", v).forEach(b => b.onclick = () => { st.n = b.dataset.n === "all" ? "all" : +b.dataset.n; draw(); });
    $("#snum", v).oninput = e => { const n = parseInt(e.target.value, 10); if (n > 0) { st.n = n; $$("#sn .chip", v).forEach(c => c.classList.toggle("on", c.dataset.n == n)); } };
    $$("#stop .chip", v).forEach(c => c.onclick = () => { const id = c.dataset.t;
      if (id === "all") st.topics = TOP.map(t => t.id);
      else if (st.topics.length === TOP.length) st.topics = [id];
      else { st.topics = st.topics.includes(id) ? st.topics.filter(x => x !== id) : [...st.topics, id]; if (!st.topics.length) st.topics = TOP.map(t => t.id); }
      draw(); });
    $$("#stim button", v).forEach(b => b.onclick = () => { st.timer = +b.dataset.s; draw(); });
    $("#sgo", v).onclick = () => { S.setup = st; save(); startSession(st); };
  };
  draw();
}
function buildItems(st, prioritize){
  const want = st.n === "all" ? Infinity : st.n;
  if (st.fmt === "solve"){ const out = []; const ts = shuffle(st.topics); for (let i = 0; i < want; i++) out.push(genItem(ts[i % ts.length])); return shuffle(out); }
  let pool = shuffle(poolFor(st.fmt, st.topics));
  if (prioritize) pool.sort((a, b) => score(a) - score(b));
  else pool.sort((a, b) => (S.q[a.id] ? 1 : 0) - (S.q[b.id] ? 1 : 0) || Math.random() - .5); // unseen first
  // "mixed" blends in ~25% freshly generated problems (none when "All" is chosen)
  const n = want === Infinity ? pool.length : want;
  let gens = st.fmt === "mixed" && want !== Infinity ? Math.round(n * .25) : 0;
  const out = pool.slice(0, Math.min(pool.length, n - gens));
  if (st.fmt === "mixed") gens = n - out.length;
  const ts = shuffle(st.topics); for (let i = 0; i < gens; i++) out.push(genItem(ts[i % ts.length]));
  return prioritize ? out : shuffle(out);
}
const score = i => { const r = S.q[i.id]; if (!r) return 1; return r.l ? 2 + r.c - r.w : -r.w; };
function startSession(st, items){
  items = items || buildItems(st);
  items = items.map(it => it.type === "mc" ? {...it, opts: shuffle(it.o)} : it);
  session = {st, items, i:0, ans:items.map(() => null), start:Date.now(), deadline: st.mode === "quiz" && st.timer ? Date.now() + st.timer * 1000 * items.length : 0};
  go("#/run");
}

/* ---------- RUN (drill / quiz) ---------- */
let timerInt = null;
function run(v){
  if (!session) return go("#/test");
  const s = session, quiz = s.st.mode === "quiz";
  clearInterval(timerInt);
  if (s.deadline){ timerInt = setInterval(() => { const left = Math.max(0, s.deadline - Date.now()); const el = $("#qtimer"); if (el) el.textContent = fmtTime(left); if (!left){ clearInterval(timerInt); toast("Time’s up!"); finish(); } }, 500); }
  const draw = () => {
    const it = s.items[s.i], a = s.ans[s.i] || {}, tp = TMAP[it.k];
    const answered = !quiz && a.done;
    const typeLbl = {tf:"True or false", mc:"Multiple choice", id:"Identification", fill:"Fill in the blank", input:"Solve"}[it.type] || "";
    let body = "";
    if (it.type === "tf") body = `<div class="opts tf">${[true,false].map((x,i) => `<button class="opt ${optCls(it, a, x, answered, quiz)}" data-v="${x}" ${answered ? "disabled" : ""}><span class="l">${x ? "T" : "F"}</span>${x ? "True" : "False"}</button>`).join("")}</div>`;
    else if (it.type === "mc") body = `<div class="opts">${it.opts.map((o,i) => `<button class="opt ${optCls(it, a, o, answered, quiz)}" data-v="${esc(o)}" data-i="${i}" ${answered ? "disabled" : ""}><span class="l">${"ABCD"[i]}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
    else { const ph = it.chk === "bin" ? "8 bits, e.g. 1100 1001" : it.chk === "num" ? "Type a number" : "Type your answer";
      body = `<div class="ansrow"><input type="text" id="qin" placeholder="${ph}" autocomplete="off" autocapitalize="off" spellcheck="false" ${it.chk ? 'inputmode="' + (it.chk === "num" ? "decimal" : "numeric") + '"' : ""} value="${esc(a.resp || "")}" ${answered ? "disabled" : ""}>${answered ? "" : `<button class="btn pri" id="qsub">${quiz ? "Save" : "Check"}</button>`}</div>`; }
    let fb = "";
    if (answered){ fb = `<div class="fb ${a.ok ? "ok" : "no"}"><div class="h">${a.ok ? (a.clue ? "✓ Correct (½ point – clue used)" : "✓ Correct!") : "✗ Not quite"}</div>${!a.ok || it.type === "id" || it.type === "fill" || it.type === "input" ? `<div>Answer: <b>${esc(answerText(it))}</b></div>` : ""}${a.note ? `<div class="small">${esc(a.note)}</div>` : ""}${a.typo ? `<div class="small">Accepted with a small spelling slip — practise the exact spelling.</div>` : ""}<div style="margin-top:.4rem">${it.e}</div></div>`; }
    v.innerHTML = `<div class="qwrap"><div class="qtop"><span>${s.i + 1} / ${s.items.length}</span><div class="track"><div class="fill" style="width:${(s.i) / s.items.length * 100}%"></div></div>${s.deadline ? `<span id="qtimer" class="mono">${fmtTime(s.deadline - Date.now())}</span>` : ""}<button class="btn ghost sm" id="qend">${quiz ? "Submit" : "End"}</button></div>
      <div class="qcard t-${it.k}"><div class="qmeta"><span class="tag">${tp.icon} ${tp.short}</span><span class="tag" style="background:var(--bg2);color:var(--ink2)">${typeLbl}</span>${quiz ? "" : `<span class="tag" style="background:var(--bg2);color:var(--ink2)">Score ${fmtPts(points())}</span>`}</div>
       <div class="qtext">${it.q}</div>${body}
       ${a.clue ? `<div class="cluebox"><b>💡 Clue:</b> ${it.c}</div>` : ""}${fb}
       <div class="qactions">${!answered && !a.clue ? `<button class="btn ghost sm" id="qclue">💡 Show clue <span class="tiny">(½ pt)</span></button>` : ""}<span class="spacer"></span>
        ${quiz ? `${s.i > 0 ? `<button class="btn" id="qprev">← Prev</button>` : ""}${s.i < s.items.length - 1 ? `<button class="btn pri" id="qnext">Next →</button>` : `<button class="btn pri" id="qfin">Submit quiz ✓</button>`}` : answered ? `<button class="btn pri" id="qnext">${s.i < s.items.length - 1 ? "Next →" : "See results ✓"}</button>` : ""}</div></div>
      <p class="tiny muted center" style="margin-top:.7rem">Keys: ${it.type === "mc" ? "1–4 / A–D" : it.type === "tf" ? "T / F" : "Enter"} to answer · H for clue · Enter for next</p></div>`;
    $$(".opt", v).forEach(b => b.onclick = () => answer(it.type === "tf" ? b.dataset.v === "true" : it.opts[+b.dataset.i]));
    const inp = $("#qin", v); if (inp && !answered){ inp.focus(); inp.onkeydown = e => { if (e.key === "Enter"){ e.preventDefault(); e.stopPropagation(); answer(inp.value); } }; if (quiz) inp.oninput = () => { s.ans[s.i] = {...(s.ans[s.i] || {}), resp:inp.value, pending:true}; }; }
    if ($("#qsub", v)) $("#qsub", v).onclick = () => answer(inp.value);
    if ($("#qclue", v)) $("#qclue", v).onclick = clue;
    if ($("#qnext", v)) $("#qnext", v).onclick = next;
    if ($("#qprev", v)) $("#qprev", v).onclick = () => { s.i--; draw(); };
    if ($("#qfin", v)) $("#qfin", v).onclick = () => { const left = s.ans.filter(x => !x || x.resp === undefined || x.resp === "").length; if (!left || confirm(`${left} item(s) unanswered. Submit anyway?`)) finish(); };
    $("#qend", v).onclick = () => { if (quiz){ if (confirm("Submit the quiz now?")) finish(); } else finish(); };
    keyHandler = e => { const t = e.target.tagName === "INPUT";
      if (e.key === "Enter" && !t){ e.preventDefault(); if ($("#qnext", v)) next(); else if ($("#qfin", v)) $("#qfin", v).click(); return; }
      if (t) return; const k = e.key.toLowerCase();
      if (k === "h" && $("#qclue", v)) return clue();
      if (answered) return;
      if (it.type === "mc"){ const idx = "1234".indexOf(k) >= 0 ? "1234".indexOf(k) : "abcd".indexOf(k); if (idx >= 0 && it.opts[idx] !== undefined) answer(it.opts[idx]); }
      if (it.type === "tf" && (k === "t" || k === "f")) answer(k === "t");
    };
  };
  const clue = () => { s.ans[s.i] = {...(s.ans[s.i] || {}), clue:true}; const inp = $("#qin", v); if (inp) s.ans[s.i].resp = inp.value; draw(); };
  const answer = resp => {
    const it = s.items[s.i], prev = s.ans[s.i] || {};
    if (typeof resp === "string" && !resp.trim()) { toast("Type an answer first (or use the clue)."); return; }
    const r = check(it, resp);
    s.ans[s.i] = {...prev, resp, ok:r.ok, typo:r.typo, note:r.note, done:!quiz, pending:false};
    if (!quiz){ record(it, r.ok, r.ok ? (prev.clue ? .5 : 1) : 0); }
    draw();
    if (quiz && it.type !== "input" && it.type !== "id" && it.type !== "fill") { /* stay; user presses Next */ }
  };
  const next = () => { if (s.i < s.items.length - 1){ s.i++; draw(); } else finish(); };
  draw();
}
const optCls = (it, a, val, answered, quiz) => {
  const chosen = a.resp !== undefined && a.resp === val, correct = it.type === "tf" ? val === it.a : val === it.o[0];
  if (answered) return correct ? "ok" : chosen ? "no" : "";
  return chosen ? "sel" : "";
};
const fmtTime = ms => { const s = Math.ceil(Math.max(0, ms) / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
const fmtPts = p => (Math.round(p * 2) / 2).toString();
const points = () => session.ans.reduce((t, a) => t + (a && a.ok ? (a.clue ? .5 : 1) : 0), 0);

function finish(){
  clearInterval(timerInt);
  const s = session; if (!s) return;
  if (s.st.mode === "quiz"){ s.items.forEach((it, i) => { const a = s.ans[i] || {}; if (a.resp !== undefined && a.resp !== "" && !("ok" in a && a.graded)){ const r = check(it, a.resp); Object.assign(a, {ok:r.ok, typo:r.typo, note:r.note}); }
      a.graded = true; s.ans[i] = a; record(it, !!a.ok, a.ok ? (a.clue ? .5 : 1) : 0); }); }
  s.done = true; s.time = Date.now() - s.start; go("#/results");
}

/* ---------- RESULTS ---------- */
function results(v){
  const s = session; if (!s || !s.done) return go("#/test");
  const answeredIdx = s.items.map((_, i) => i).filter(i => s.st.mode === "quiz" || (s.ans[i] && s.ans[i].done));
  const tot = answeredIdx.length, pts = points(), pct = tot ? Math.round(pts / tot * 100) : 0;
  if (!tot){ v.innerHTML = `<div class="empty"><p>No answers yet — nothing to score.</p><a class="btn pri" href="#/test">Start a new test</a></div>`; return; }
  const byT = {}; answeredIdx.forEach(i => { const k = s.items[i].k, a = s.ans[i] || {}; byT[k] = byT[k] || [0, 0]; byT[k][0] += a.ok ? (a.clue ? .5 : 1) : 0; byT[k][1]++; });
  const missed = answeredIdx.filter(i => !(s.ans[i] && s.ans[i].ok));
  const msg = pct >= 90 ? "Excellent — exam ready! 🏆" : pct >= 75 ? "Great work! Review the misses and you’re there. 💪" : pct >= 50 ? "Good start. Re-read the notes for the topics below, then retry. 📒" : "Keep going! Study the notes + lab for these topics, then drill again. 🌱";
  v.innerHTML = `<div class="qwrap"><div class="card center"><div class="muted small">${s.st.mode === "quiz" ? "Mock quiz" : "Drill"} result · ${Math.round(s.time / 60000) || "<1"} min</div><div class="score" style="margin:.4rem 0">${pct}%</div><div>${fmtPts(pts)} / ${tot} points</div><p class="muted" style="margin:.6rem 0 0">${msg}</p></div>
   <div class="card" style="margin-top:1rem"><b>By topic</b><div class="bars" style="margin-top:.6rem">${Object.keys(byT).map(k => { const p = Math.round(byT[k][0] / byT[k][1] * 100); return `<div class="bar t-${k}"><span class="nm">${TMAP[k].icon} ${TMAP[k].short}</span><div class="track"><div class="fill" style="width:${p}%"></div></div><span class="pct">${p}%</span></div>`; }).join("")}</div></div>
   <div class="row" style="margin:1rem 0">${missed.length ? `<button class="btn pri" id="rmiss">↻ Retry the ${missed.length} missed</button>` : ""}<a class="btn" href="#/test">New test</a><a class="btn ghost" href="#/home">Home</a></div>
   <h3 style="margin-top:1.4rem">Review</h3>
   ${answeredIdx.map(i => { const it = s.items[i], a = s.ans[i] || {}; const yours = a.resp === undefined || a.resp === "" ? "<i>no answer</i>" : esc(it.type === "tf" ? (a.resp ? "True" : "False") : a.resp);
     return `<div class="review-item ${a.ok ? (a.clue ? "half" : "ok") : "no"}"><div class="small muted">${TMAP[it.k].icon} ${TMAP[it.k].short} · #${i + 1}</div><div style="font-weight:600;margin:.2rem 0">${it.q}</div>
     <div class="small">Your answer: ${yours} ${a.ok ? "✓" : "✗"} ${!a.ok ? ` · Correct: <b>${esc(answerText(it))}</b>` : ""}${a.clue ? " · 💡 clue used" : ""}</div>${!a.ok ? `<details class="check"><summary>Why?</summary>${it.e}</details>` : ""}</div>`; }).join("")}</div>`;
  if ($("#rmiss", v)) $("#rmiss", v).onclick = () => startSession({...s.st, mode:"drill", timer:0}, missed.map(i => { const it = s.items[i]; return it.gen ? genItem(it.k) : it; }));
}

/* ---------- WEAK SPOT ---------- */
function weakest(){
  const rows = TOP.map(t => { const acc = accuracy(t.id), m = mastery(t.id); const sc = acc === null ? m : Math.min(acc, m + 30);
    return {t, sc, acc, m, label: acc === null ? `${m}% mastered, not practised yet` : `${acc}% accuracy, ${m}% mastered`}; });
  rows.sort((a, b) => a.sc - b.sc); return rows[0];
}
function weak(v){
  const rows = TOP.map(t => ({t, acc:accuracy(t.id), m:mastery(t.id)})).sort((a, b) => (a.acc === null ? a.m : Math.min(a.acc, a.m + 30)) - (b.acc === null ? b.m : Math.min(b.acc, b.m + 30)));
  const w = rows[0].t;
  v.innerHTML = `<div class="page-head"><h1>💪 Train my weak spot</h1><p>Based on your answers on this device. Missed items come first, then ones you haven’t seen.</p></div>
   <div class="card t-${w.id}" style="background:var(--tb)"><div class="small" style="color:var(--tcx);font-weight:700">YOUR WEAKEST TOPIC RIGHT NOW</div><h2 style="margin:.3rem 0">${w.icon} ${w.name}</h2>
    <div class="row" style="margin-top:.6rem"><button class="btn pri" id="wgo">Train it (10 items)</button><a class="btn" href="#/notes/${w.id}">📒 Re-read notes first</a>${window.NOTES[w.id].lab ? `<a class="btn" href="#/lab/${window.NOTES[w.id].lab}">🧪 Lab</a>` : ""}</div></div>
   <div class="card" style="margin-top:1rem"><b>All topics (weakest first)</b><div class="bars" style="margin-top:.7rem">${rows.map(r => `<div class="bar t-${r.t.id}"><span class="nm">${r.t.icon} ${r.t.short}</span><div class="track"><div class="fill" style="width:${r.acc === null ? r.m : r.acc}%"></div></div><span class="pct">${r.acc === null ? "—" : r.acc + "%"}</span></div>`).join("")}</div>
   <p class="tiny muted" style="margin:.6rem 0 0">Bar = accuracy (— = not practised yet). Tap a topic to train it:</p><div class="chips" style="margin-top:.5rem">${TOP.map(t => chipT(t, false)).join("")}</div></div>`;
  const train = id => { const st = {mode:"drill", fmt:"mixed", n:10, topics:[id], timer:0}; startSession(st, buildItems(st, true)); };
  $("#wgo", v).onclick = () => train(w.id);
  $$(".chip[data-t]", v).forEach(c => c.onclick = () => train(c.dataset.t));
}

/* ---------- boot ---------- */
route();
const badge = $("#netBadge");
const setBadge = () => { const ready = navigator.serviceWorker && navigator.serviceWorker.controller; badge.textContent = ready ? "✓ Offline ready" : navigator.onLine ? "Online" : "Offline"; badge.classList.toggle("off", !ready && !navigator.onLine); };
window.addEventListener("online", setBadge); window.addEventListener("offline", setBadge);
if ("serviceWorker" in navigator && location.protocol !== "file:"){
  navigator.serviceWorker.register("sw.js").then(() => navigator.serviceWorker.ready).then(setBadge).catch(setBadge);
  navigator.serviceWorker.addEventListener("controllerchange", setBadge);
}
setBadge();
})();
