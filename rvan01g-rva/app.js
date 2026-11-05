(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const DAY = 864e5;

/* ---------------- storage ---------------- */
const KEY = 'dar-v1';
let S = {};
try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
S.r = S.r || {};   // question id -> 1 right, 2 right with clue, 0 wrong (last attempt)
S.c = S.c || {};   // card id -> {b: box, d: due ms}
S.bd = S.bd || {}; // brain dump % per topic
S.op = S.op || {}; // topics opened
S.set = S.set || {};
S.att = S.att || 0; S.cor = S.cor || 0; S.best = S.best || 0;
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked: app still works this session */ } };

/* ---------------- data ---------------- */
const TOP = window.TOPICS, TMAP = Object.fromEntries(TOP.map(t => [t.id, t]));
const LES = window.LESSONS;
const FMT = { mc: 'Multiple Choice', tf: 'True or False', id: 'Identification', fb: 'Fill in the Blanks' };
const FMT_ORDER = ['mc', 'tf', 'id', 'fb'];
const ROMAN = ['I', 'II', 'III', 'IV'];
const Q = [];
FMT_ORDER.forEach(f => window.BANK[f].forEach((r, i) => {
  const o = { id: f + i, f, t: r[0], q: r[1], clue: r[3], ex: r[4] };
  if (f === 'mc') { o.opts = r[2]; o.ans = r[2][0]; } else o.ans = r[2];
  Q.push(o);
}));
const QBY = Object.fromEntries(Q.map(q => [q.id, q]));
const CARDS = window.FACTS.map((r, i) => ({ id: 'c' + i, t: r[0], term: r[1], def: r[2], alt: r[3] || [] }));
const topicsOf = l => TOP.filter(t => l === 'all' || String(t.lesson) === String(l)).map(t => t.id);

/* ---------------- answer checking ---------------- */
const norm = s => String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/&/g, ' and ').replace(/[×]/g, ' x ').replace(/[“”"'’‘`.,;:!?()[\]{}]/g, '').replace(/[-_/]/g, ' ')
  .replace(/\s+/g, ' ').trim().replace(/^(the|a|an) /, '');
const sing = s => s.split(' ').map(w => w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w).join(' ');
function lev(a, b) {
  if (a === b) return 0; const m = a.length, n = b.length; if (!m || !n) return m || n;
  let p = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; }
  return p[n];
}
function match(input, answers) {
  const ni = sing(norm(input)); if (!ni) return { ok: false };
  for (const a of answers) {
    const na = sing(norm(a));
    if (ni === na || ni.replace(/ /g, '') === na.replace(/ /g, '')) return { ok: true, exact: true };
  }
  for (const a of answers) {
    const na = sing(norm(a)), L = na.length;
    const tol = L <= 4 ? 0 : L <= 8 ? 1 : 2;
    if (tol && lev(ni, na) <= tol) return { ok: true, exact: false, spell: answers[0] };
    // answer typed with a few extra words around it ("lossy compression" for "lossy")
    if (L >= 4 && (' ' + ni + ' ').includes(' ' + na + ' ') && ni.split(' ').length <= na.split(' ').length + 2 && !/\b(not|no|never)\b/.test(ni)) return { ok: true, exact: true };
  }
  return { ok: false };
}

/* ---------------- helpers ---------------- */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2400); }
function mastery(ids) {
  if (!ids.length) return 0;
  let s = 0; ids.forEach(id => { const v = S.r[id]; s += v === 1 ? 1 : v === 2 ? .5 : 0; });
  return s / ids.length;
}
const qidsOfTopic = t => Q.filter(q => q.t === t).map(q => q.id);
const mistakeIds = () => Object.keys(S.r).filter(id => S.r[id] === 0 && QBY[id]);
const pct = x => Math.round(x * 100) + '%';
function segment(el, items, value, onPick) {
  el.innerHTML = items.map(([v, label]) => `<button role="radio" aria-checked="${String(v) === String(value)}" data-v="${esc(v)}">${label}</button>`).join('');
  el.onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('button', el).forEach(x => x.setAttribute('aria-checked', x === b)); onPick(b.dataset.v); };
}
const lessonItems = [['all', 'All lessons combined'], ['1', 'Lesson 1 · Digital Arts'], ['2', 'Lesson 2 · Reading Images']];

/* ---------------- theme & sky ---------------- */
function applyTheme() {
  const th = S.set.theme || 'night';
  document.documentElement.dataset.theme = th;
  $('#thmBtn').textContent = th === 'night' ? '☀️' : '🌙';
  $('meta[name="theme-color"]').content = th === 'night' ? '#0b1636' : '#efe7cf';
}
$('#thmBtn').onclick = () => { S.set.theme = (S.set.theme || 'night') === 'night' ? 'day' : 'night'; save(); applyTheme(); };
(function stars() {
  const box = $('#sky .stars'); let h = '';
  for (let i = 0; i < 70; i++) {
    const big = i < 7, s = big ? 7 + Math.random() * 6 : 1.5 + Math.random() * 3;
    h += `<i style="left:${(Math.random() * 100).toFixed(1)}%;top:${(Math.random() * (big ? 45 : 85)).toFixed(1)}%;--s:${s.toFixed(1)}px;--d:${(2 + Math.random() * 4).toFixed(1)}s;animation-delay:-${(Math.random() * 4).toFixed(1)}s"></i>`;
  }
  box.innerHTML = h;
})();

/* ---------------- routing ---------------- */
const VIEWS = ['home', 'notes', 'gloss', 'setup', 'quiz', 'results', 'flash'];
let QZ = null, FC = null, SETUP_MODE = 'drill';
function show(v) {
  VIEWS.forEach(x => $('#v-' + x).hidden = x !== v);
  window.scrollTo(0, 0);
}
function setNav(k) { $$('#nav button').forEach(b => { if (b.dataset.go === k) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); }); }
function go(r) { if (location.hash === '#' + r) route(); else location.hash = r; }
function route() {
  const r = (location.hash || '#home').slice(1);
  if (r === 'notes') { show('notes'); setNav('notes'); }
  else if (r === 'gloss') { show('gloss'); setNav(''); renderGloss(); }
  else if (['drill', 'exam', 'cards', 'mistakes'].includes(r)) { setNav(r === 'mistakes' ? 'drill' : r); renderSetup(r); show('setup'); }
  else if (r === 'quiz' && QZ && !QZ.done) { show('quiz'); setNav(QZ.mode === 'exam' ? 'exam' : 'drill'); renderQ(); }
  else if (r === 'results' && QZ && QZ.done) { show('results'); }
  else if (r === 'flash' && FC) { show('flash'); setNav('cards'); renderCard(); }
  else { show('home'); setNav('home'); renderHome(); if (r !== 'home' && r !== '') history.replaceState(null, '', '#home'); }
}
window.addEventListener('hashchange', route);
document.addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (b) { e.preventDefault(); go(b.dataset.go); } });

/* ---------------- home ---------------- */
function renderHome() {
  const all = Q.map(q => q.id), m = mastery(all), mist = mistakeIds().length;
  $('#ring').style.setProperty('--p', Math.round(m * 100)); $('#ringPct').textContent = pct(m);
  const now = Date.now(), due = CARDS.filter(c => S.c[c.id] && S.c[c.id].d <= now).length;
  const learned = CARDS.filter(c => S.c[c.id] && S.c[c.id].b >= 2).length;
  const opened = TOP.filter(t => S.op[t.id]).length;
  $('#kpis').innerHTML = [
    [S.att, 'questions answered'], [S.att ? pct(S.cor / S.att) : '–', 'accuracy'],
    [`${learned}/${CARDS.length}`, 'flashcards learned'], [S.best ? S.best + '%' : '–', 'best mock exam']
  ].map(([b, s]) => `<div class="kpi"><b>${b}</b><span>${s}</span></div>`).join('');
  let h = '';
  [1, 2].forEach(l => {
    h += `<h4>${esc(LES[l].short)} · ${esc(LES[l].name)}</h4>`;
    TOP.filter(t => t.lesson === l).forEach(t => {
      const v = mastery(qidsOfTopic(t.id));
      h += `<button class="mrow" data-drill="${t.id}" title="Drill ${esc(t.name)}"><span>${t.icon} ${esc(t.name)}</span><div class="bar2"><i style="width:${Math.round(v * 100)}%"></i></div><b>${pct(v)}</b></button>`;
    });
  });
  $('#mast').className = 'mast'; $('#mast').innerHTML = h;
  $('#mistakeCount').textContent = mist ? `${mist} item${mist > 1 ? 's' : ''} to fix` : 'No mistakes saved yet';
  const steps = [
    ['notes', 'Learn: read or listen to the notes', 'Start with ⭐ Essentials only, then open the full notes. Use 🔊 Listen while doing chores.', `${opened}/${TOP.length} topics opened`],
    ['cards', 'Recall: flashcards', 'Say the term before you flip. Cards you miss come back sooner (spaced repetition).', due ? `${due} due now` : `${learned} learned`],
    ['drill', 'Practice: drill each topic', 'Instant feedback with the reason. Use a clue only when stuck (½ point).', `${pct(m)} ready`],
    ['exam', 'Test: mock exam, all lessons', 'Part I Multiple Choice, II True or False, III Identification, IV Fill in the Blanks.', S.best ? `best ${S.best}%` : 'not taken yet'],
    ['mistakes', 'Fix: re-test your mistakes', 'Clear every saved mistake before exam day.', mist ? `${mist} to fix` : 'all clear']
  ];
  $('#path').innerHTML = steps.map(([g, b, s, em]) => `<li><button data-go="${g}"><div><b>${b}</b><span>${s}</span></div><em>${em}</em></button></li>`).join('');
}
$('#mast').addEventListener('click', e => { const b = e.target.closest('[data-drill]'); if (b) startQuiz({ mode: 'drill', topics: [b.dataset.drill], fmts: FMT_ORDER.slice(), n: 10, weak: true }); });
$('#resetBtn').onclick = () => {
  if (!confirm('Reset all progress, flashcard schedules and mistakes on this device?')) return;
  S.r = {}; S.c = {}; S.bd = {}; S.op = {}; S.att = 0; S.cor = 0; S.best = 0; save(); renderHome(); toast('Progress reset');
};

/* ---------------- notes ---------------- */
function buildNotes() {
  let h = '', n = 0;
  [1, 2].forEach(l => {
    h += `<h3 class="lesson-h" data-lesson="${l}">${esc(LES[l].short)}: ${esc(LES[l].name)}</h3>`;
    TOP.filter(t => t.lesson === l).forEach(t => {
      n++;
      const N = window.NOTES[t.id];
      h += `<article class="tp card" id="n-${t.id}" data-id="${t.id}" data-lesson="${l}">
<div class="nh" role="button" tabindex="0" aria-expanded="false"><span class="ic">${t.icon}</span><span class="tt"><small>TOPIC ${n} · ${esc(LES[l].short.toUpperCase())}</small><b>${esc(t.name)}</b></span>
<button class="ib say" data-say="${t.id}" aria-label="Listen from ${esc(t.name)}" title="Listen from here">🔊</button><span class="chev" aria-hidden="true">▾</span></div>
<div class="nb">
<div class="must"><h5>⭐ Must-know (memorize these)</h5><ul>${N.must.map(x => `<li>${x}</li>`).join('')}</ul></div>
<div class="full">${N.html}</div>
<div class="nact">
<button class="btn sm" data-say="${t.id}">🔊 Listen from here</button>
<button class="btn sm" data-dump="${t.id}">🧠 Brain dump</button>
<button class="btn sm" data-qc="${t.id}">⚡ Quick check</button>
<button class="btn sm pri" data-drill="${t.id}">🎯 Drill this topic</button>
</div>
<div class="dumpbox"></div><div class="qcbox"></div>
</div></article>`;
    });
  });
  $('#notesList').innerHTML = h;
  $('#noteJump').innerHTML = TOP.map(t => `<button data-jump="${t.id}" data-lesson="${t.lesson}">${t.icon} ${esc(t.name)}</button>`).join('');
}
function setOpen(sec, open) {
  sec.classList.toggle('open', open); $('.nh', sec).setAttribute('aria-expanded', open);
  if (open && !S.op[sec.dataset.id]) { S.op[sec.dataset.id] = 1; save(); }
  syncExpandBtn();
}
const visibleSecs = () => $$('#notesList .tp').filter(s => !s.hidden);
function syncExpandBtn() {
  const v = visibleSecs(), all = v.length && v.every(s => s.classList.contains('open'));
  $('#expandBtn').textContent = all ? '⊟ Collapse all' : '⊞ Expand all'; $('#expandBtn').setAttribute('aria-pressed', all);
}
function applyNoteFilter() {
  const l = S.set.noteLesson || 'all';
  $$('#notesList [data-lesson]').forEach(el => el.hidden = !(l === 'all' || el.dataset.lesson === l));
  $$('#noteJump button').forEach(el => el.hidden = !(l === 'all' || el.dataset.lesson === l));
  syncExpandBtn();
}
function initNotes() {
  buildNotes();
  segment($('#noteLesson'), lessonItems, S.set.noteLesson || 'all', v => { S.set.noteLesson = v; save(); applyNoteFilter(); });
  applyNoteFilter();
  const ess = !!S.set.ess, rec = !!S.set.recall;
  document.body.classList.toggle('essentials', ess); $('#essBtn').setAttribute('aria-pressed', ess);
  document.body.classList.toggle('recall', rec); $('#recallBtn').setAttribute('aria-pressed', rec); $('#recallHint').hidden = !rec;
  $('#expandBtn').onclick = () => { const v = visibleSecs(), all = v.every(s => s.classList.contains('open')); v.forEach(s => setOpen(s, !all)); };
  $('#essBtn').onclick = () => { S.set.ess = !S.set.ess; save(); document.body.classList.toggle('essentials', S.set.ess); $('#essBtn').setAttribute('aria-pressed', S.set.ess); toast(S.set.ess ? 'Showing ⭐ Must-know only' : 'Showing full notes'); };
  $('#recallBtn').onclick = () => {
    S.set.recall = !S.set.recall; save(); document.body.classList.toggle('recall', S.set.recall);
    $('#recallBtn').setAttribute('aria-pressed', S.set.recall); $('#recallHint').hidden = !S.set.recall; $$('.k.shown').forEach(k => k.classList.remove('shown'));
  };
  $('#listenAll').onclick = () => { const secs = visibleSecs(); ttsStart(noteItems(secs)); };
  $('#noteJump').onclick = e => { const b = e.target.closest('[data-jump]'); if (!b) return; const s = $('#n-' + b.dataset.jump); setOpen(s, true); s.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  $('#notesList').addEventListener('click', e => {
    const k = e.target.closest('.k'); if (k && document.body.classList.contains('recall')) { k.classList.toggle('shown'); return; }
    const say = e.target.closest('[data-say]'); if (say) { e.stopPropagation(); const secs = visibleSecs(); const i = secs.findIndex(s => s.dataset.id === say.dataset.say); ttsStart(noteItems(secs.slice(Math.max(0, i)))); return; }
    const nh = e.target.closest('.nh'); if (nh) { const s = nh.closest('.tp'); setOpen(s, !s.classList.contains('open')); return; }
    const d = e.target.closest('[data-drill]'); if (d) { startQuiz({ mode: 'drill', topics: [d.dataset.drill], fmts: FMT_ORDER.slice(), n: 10, weak: true }); return; }
    const bd = e.target.closest('[data-dump]'); if (bd) { brainDump(bd.dataset.dump); return; }
    const qc = e.target.closest('[data-qc]'); if (qc) { quickCheck(qc.dataset.qc); return; }
  });
  $('#notesList').addEventListener('keydown', e => { const nh = e.target.closest('.nh'); if (nh && e.target === nh && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); nh.click(); } });
}
function brainDump(id) {
  const sec = $('#n-' + id), box = $('.dumpbox', sec);
  if (box.innerHTML) { box.innerHTML = ''; sec.classList.remove('dumping'); return; }
  sec.classList.add('dumping');
  box.innerHTML = `<div class="panel2"><h5>🧠 Brain dump: ${esc(TMAP[id].name)}</h5>
<p class="muted">The notes above are hidden. Write (or say out loud) everything you remember about this topic, then check yourself.</p>
<textarea class="txt" aria-label="Write what you remember" placeholder="Definitions, lists, examples, memory tricks…"></textarea>
<div class="row" style="margin-top:10px"><button class="btn pri" data-act="check">Check my recall</button><button class="btn ghost" data-act="cancel">Cancel</button></div></div>`;
  $('textarea', box).focus({ preventScroll: true });
  box.onclick = e => {
    const a = e.target.closest('[data-act]'); if (!a) return;
    if (a.dataset.act === 'cancel') { box.innerHTML = ''; sec.classList.remove('dumping'); return; }
    if (a.dataset.act === 'check') {
      const must = window.NOTES[id].must;
      sec.classList.remove('dumping');
      $('.panel2', box).innerHTML = `<h5>Tick each point you remembered</h5><ul class="checks">${must.map((m, i) => `<li><label><input type="checkbox" data-i="${i}"><span>${m}</span></label></li>`).join('')}</ul>
<div class="row"><button class="btn pri" data-act="done">Done</button></div>`;
    }
    if (a.dataset.act === 'done') {
      const c = $$('input:checked', box).length, t = window.NOTES[id].must.length, p = Math.round(c / t * 100);
      S.bd[id] = p; save(); box.innerHTML = '';
      toast(p >= 80 ? `Great recall: ${c}/${t} ✨` : `${c}/${t} recalled. Re-read the unchecked points, then try again.`);
    }
  };
}
function quickCheck(id) {
  const sec = $('#n-' + id), box = $('.qcbox', sec);
  const items = shuffle(Q.filter(q => q.t === id && (q.f === 'id' || q.f === 'fb'))).slice(0, 3);
  box.innerHTML = `<div class="panel2"><h5>⚡ Quick check: answer in your head, then reveal</h5>${items.map(q => `<div class="qc-item"><div>${q.f === 'fb' ? esc(q.q).replace('____', '<span class="blank"></span>') : esc(q.q)}</div>
<div class="row" style="margin-top:6px"><button class="btn sm" data-c>💡 Clue</button><button class="btn sm" data-a>Show answer</button></div>
<div class="clue" hidden>${esc(q.clue)}</div><div class="ans" hidden>${esc(q.ans[0])}</div></div>`).join('')}
<div class="row" style="margin-top:10px"><button class="btn sm pri" data-new>New questions</button><button class="btn sm ghost" data-close>Close</button></div></div>`;
  box.onclick = e => {
    const it = e.target.closest('.qc-item');
    if (e.target.closest('[data-c]')) $('.clue', it).hidden = false;
    if (e.target.closest('[data-a]')) $('.ans', it).hidden = false;
    if (e.target.closest('[data-new]')) quickCheck(id);
    if (e.target.closest('[data-close]')) box.innerHTML = '';
  };
}

/* ---------------- text to speech ---------------- */
const synth = window.speechSynthesis;
const TTS = { q: [], i: 0, state: 'off', tok: 0, wl: null, el: null };
const canSpeak = !!(synth && window.SpeechSynthesisUtterance);
function clean(t) {
  return t.replace(/→/g, ' to ').replace(/↓/g, ', down to, ').replace(/(\d)\s*×\s*(\d)/g, '$1 by $2').replace(/×/g, ' times ')
    .replace(/°/g, ' degrees').replace(/\be\.g\.,?/gi, 'for example,').replace(/\bvs\.?(?=\s)/gi, 'versus').replace(/\betc\./gi, 'et cetera')
    .replace(/[\p{Extended_Pictographic}️‍]/gu, '').replace(/\s+/g, ' ').trim();
}
function chunks(t) {
  if (t.length <= 220) return [t];
  const out = []; let cur = '';
  t.split(/(?<=[.!?;:])\s+/).forEach(s => {
    if ((cur + ' ' + s).length > 220 && cur) { out.push(cur); cur = s; } else cur = cur ? cur + ' ' + s : s;
  });
  if (cur) out.push(cur);
  return out.flatMap(c => c.length <= 300 ? [c] : c.split(/,\s+/).reduce((a, s) => { if (a.length && (a[a.length - 1] + ', ' + s).length < 220) a[a.length - 1] += ', ' + s; else a.push(s); return a; }, []));
}
function rowText(tr) {
  const tbl = tr.closest('table'), hs = $$('thead th', tbl).map(th => th.textContent.trim()), cs = $$('td', tr).map(td => td.textContent.trim());
  const off = hs.length - cs.length;
  return cs.map((c, j) => (j === 0 && off === 0) || !hs[j + off] ? c : `${hs[j + off]}: ${c}`).join('. ') + '.';
}
function noteItems(secs) {
  const items = [], ess = document.body.classList.contains('essentials');
  secs.forEach(sec => {
    const t = TMAP[sec.dataset.id], label = t.name;
    items.push({ el: $('.nh', sec), text: `Topic: ${t.name}.`, label });
    items.push({ el: $('.must h5', sec), text: 'Must know.', label });
    $$('.must li', sec).forEach(li => items.push({ el: li, text: li.textContent, label }));
    if (!ess) $$('.full h4, .full h5, .full p, .full li, .full tr, .full .tip, .full .trap', sec).forEach(el => {
      if (el.closest('.no-tts') || el.closest('thead')) return;
      if (el.tagName === 'P' && el.closest('li')) return;
      items.push({ el, text: el.tagName === 'TR' ? rowText(el) : el.textContent, label });
    });
  });
  return items;
}
function ttsStart(items) {
  if (!canSpeak) { toast('Read-aloud is not supported in this browser'); return; }
  TTS.q = [];
  items.forEach(it => chunks(clean(it.text)).forEach(c => c && TTS.q.push({ el: it.el, text: c, label: it.label })));
  TTS.i = 0; TTS.fails = 0; TTS.state = 'play'; $('#tts').hidden = false; document.body.classList.add('tts-on');
  wake(true); ttsSpeak(); syncTTS();
}
function ttsSpeak() {
  const tok = ++TTS.tok, it = TTS.q[TTS.i];
  if (!it) { ttsStop(); toast('Finished reading ✨'); return; }
  mark(it);
  const u = new SpeechSynthesisUtterance(it.text);
  u.rate = +S.set.rate || 1;
  const v = pickVoice(); if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
  u.onstart = () => { TTS.fails = 0; };
  u.onend = () => { if (tok !== TTS.tok || TTS.state !== 'play') return; TTS.i++; ttsSpeak(); };
  u.onerror = e => {
    if (tok !== TTS.tok || TTS.state !== 'play' || e.error === 'interrupted' || e.error === 'canceled') return;
    TTS.fails = (TTS.fails || 0) + 1;
    if (TTS.fails >= 2) { ttsStop(); toast(e.error === 'not-allowed' ? 'Tap 🔊 Listen again to allow read-aloud' : 'No speech voice is available on this device. Install a voice in your phone or computer settings.'); return; }
    TTS.i++; ttsSpeak();
  };
  if (synth.speaking || synth.pending) { synth.cancel(); setTimeout(() => { if (tok === TTS.tok) synth.speak(u); }, 80); } else synth.speak(u);
  $('#ttsNow').textContent = it.label || '';
}
function mark(it) {
  if (TTS.el && TTS.el !== it.el) TTS.el.classList.remove('speaking');
  TTS.el = it.el; if (!it.el) return;
  it.el.classList.add('speaking');
  const sec = it.el.closest('.tp'); if (sec && !sec.classList.contains('open')) setOpen(sec, true);
  if ($('#ttsFollow').checked && !document.hidden) it.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function ttsPause() { TTS.state = 'pause'; TTS.tok++; synth.cancel(); wake(false); syncTTS(); }
function ttsResume() { TTS.state = 'play'; wake(true); ttsSpeak(); syncTTS(); }
function ttsStop() {
  TTS.state = 'off'; TTS.tok++; if (canSpeak) synth.cancel(); wake(false);
  if (TTS.el) TTS.el.classList.remove('speaking'); TTS.el = null;
  $('#tts').hidden = true; document.body.classList.remove('tts-on');
}
function syncTTS() { const p = TTS.state === 'play'; $('#ttsPlay').textContent = p ? '⏸' : '▶'; $('#ttsPlay').setAttribute('aria-label', p ? 'Pause' : 'Play'); }
async function wake(on) {
  try {
    if (on && 'wakeLock' in navigator && !TTS.wl) { TTS.wl = await navigator.wakeLock.request('screen'); TTS.wl.addEventListener('release', () => TTS.wl = null); }
    if (!on && TTS.wl) { await TTS.wl.release(); TTS.wl = null; }
  } catch (e) { /* wake lock not available: reading still works */ }
}
document.addEventListener('visibilitychange', () => { if (!document.hidden && TTS.state === 'play') wake(true); });
function voices() { return canSpeak ? synth.getVoices().filter(v => /^en(-|_|$)/i.test(v.lang)) : []; }
function pickVoice() {
  const vs = voices(); if (!vs.length) return null;
  return vs.find(v => v.name === S.set.voice) || vs.find(v => v.localService && /en-US/i.test(v.lang)) || vs.find(v => v.localService) || vs.find(v => /en-US/i.test(v.lang)) || vs[0];
}
function fillVoices() {
  const vs = voices(), cur = pickVoice();
  $('#ttsVoice').innerHTML = vs.length ? vs.map(v => `<option ${cur && v.name === cur.name ? 'selected' : ''}>${esc(v.name)}${v.localService ? '' : ' (online)'}</option>`).join('') : '<option>Default voice</option>';
}
if (canSpeak) { fillVoices(); synth.onvoiceschanged = fillVoices; }
else { $$('#listenAll,#glListen').forEach(b => { b.disabled = true; b.title = 'Read-aloud is not supported in this browser'; }); }
$('#ttsVoice').onchange = e => { S.set.voice = voices()[e.target.selectedIndex]?.name; save(); if (TTS.state === 'play') ttsSpeak(); };
$('#ttsRate').value = S.set.rate || '1';
$('#ttsRate').onchange = e => { S.set.rate = e.target.value; save(); if (TTS.state === 'play') ttsSpeak(); };
$('#ttsPlay').onclick = () => TTS.state === 'play' ? ttsPause() : ttsResume();
$('#ttsStop').onclick = ttsStop;
$('#ttsNext').onclick = () => { TTS.i = Math.min(TTS.q.length - 1, TTS.i + 1); TTS.state = 'play'; syncTTS(); ttsSpeak(); };
$('#ttsPrev').onclick = () => { TTS.i = Math.max(0, TTS.i - 1); TTS.state = 'play'; syncTTS(); ttsSpeak(); };
$('#ttsOpt').onclick = () => { const o = $('#ttsOpts'); o.hidden = !o.hidden; $('#ttsOpt').setAttribute('aria-expanded', !o.hidden); };

/* ---------------- glossary ---------------- */
function renderGloss() {
  const l = S.set.glLesson || 'all';
  segment($('#glLesson'), lessonItems, l, v => { S.set.glLesson = v; save(); renderGloss(); });
  const qs = norm($('#glSearch').value), ts = topicsOf(l);
  const list = CARDS.filter(c => ts.includes(c.t) && (!qs || norm(c.term + ' ' + c.def + ' ' + c.alt.join(' ')).includes(qs)))
    .sort((a, b) => ts.indexOf(a.t) - ts.indexOf(b.t));
  $('#glCount').textContent = `${list.length} term${list.length === 1 ? '' : 's'}`;
  $('#glList').innerHTML = list.length ? list.map(c => `<div class="gi card" data-term="${c.id}"><div><small>${TMAP[c.t].icon} ${esc(TMAP[c.t].name)}</small><br><b>${esc(c.term)}</b><p>${esc(c.def)}</p></div>${canSpeak ? `<button class="ib" data-sayterm="${c.id}" aria-label="Listen to ${esc(c.term)}">🔊</button>` : ''}</div>`).join('') : '<p class="hint">No terms match your search.</p>';
}
$('#glSearch').addEventListener('input', renderGloss);
$('#glList').addEventListener('click', e => { const b = e.target.closest('[data-sayterm]'); if (!b) return; const el = b.closest('.gi'), c = CARDS.find(x => x.id === b.dataset.sayterm); ttsStart([{ el, text: `${c.term}. ${c.def}`, label: c.term }]); });
$('#glListen').onclick = () => { const items = $$('#glList .gi').map(el => { const c = CARDS.find(x => x.id === el.dataset.term); return { el, text: `${c.term}. ${c.def}`, label: c.term }; }); if (items.length) ttsStart(items); };

/* ---------------- setup ---------------- */
const DEF_N = { drill: 20, exam: 40, cards: 20, mistakes: 20 };
function cfgFor(mode) {
  const c = Object.assign({ lesson: 'all', topics: TOP.map(t => t.id), fmts: FMT_ORDER.slice(), n: DEF_N[mode], weak: true, dir: 'dt' }, S.set['cfg_' + mode] || {});
  c.topics = c.topics.filter(t => TMAP[t]); if (!c.topics.length) c.topics = topicsOf(c.lesson);
  return c;
}
function poolFor(mode, c) {
  if (mode === 'cards') return CARDS.filter(x => c.topics.includes(x.t));
  const base = mode === 'mistakes' ? mistakeIds().map(id => QBY[id]) : Q;
  return base.filter(q => c.topics.includes(q.t) && c.fmts.includes(q.f));
}
function renderSetup(mode) {
  SETUP_MODE = mode; const c = cfgFor(mode);
  const titles = { drill: '🎯 Drill', exam: '📝 Mock exam', cards: '🃏 Flashcards', mistakes: '🔁 Fix my mistakes' };
  const subs = { drill: 'Practice with instant feedback', exam: 'Like the real test: answers revealed at the end', cards: 'Active recall with spaced repetition', mistakes: 'Only items you last answered wrong' };
  $('#setupTitle').textContent = titles[mode]; $('#setupSub').textContent = subs[mode];
  $('#fmtBlk').hidden = mode === 'cards'; $('#dirBlk').hidden = mode !== 'cards'; $('#weakRow').hidden = mode === 'cards' || mode === 'mistakes';
  $('#weakChk').checked = c.weak;
  const notes = {
    drill: '💡 Every question has a clue. Using it gives ½ point, so try first. You see the right answer and the reason right after each item.',
    exam: '📝 Ordered like your prof\'s exam: Part I Multiple Choice → II True or False → III Identification → IV Fill in the Blanks. Clues give ½ point. Answers are revealed at the end.',
    cards: '🃏 Read the prompt, say the answer out loud (or type it), then flip. Rate yourself honestly: missed cards come back in this session, known cards return in a few days.',
    mistakes: '🔁 Answer these correctly to clear them from your mistake list.'
  };
  $('#setupNote').textContent = notes[mode];
  const sync = () => {
    S.set['cfg_' + mode] = c; save();
    const pool = poolFor(mode, c), avail = pool.length;
    // topics
    const shown = TOP.filter(t => c.lesson === 'all' || String(t.lesson) === c.lesson);
    $('#topicPills').innerHTML = shown.map(t => {
      const cnt = mode === 'cards' ? CARDS.filter(x => x.t === t.id).length : poolFor(mode, Object.assign({}, c, { topics: [t.id] })).length;
      return `<button aria-pressed="${c.topics.includes(t.id)}" data-t="${t.id}">${t.icon} ${esc(t.name)} <small>${cnt}</small></button>`;
    }).join('');
    if (mode !== 'cards') $('#fmtPills').innerHTML = FMT_ORDER.map(f => {
      const cnt = poolFor(mode, Object.assign({}, c, { fmts: [f] })).length;
      return `<button aria-pressed="${c.fmts.includes(f)}" data-f="${f}">${FMT[f]} <small>${cnt}</small></button>`;
    }).join('');
    const counts = [10, 20, 30, 50];
    $('#countPills').innerHTML = counts.map(n => `<button aria-pressed="${c.n === n}" data-n="${n}" ${n > avail ? 'disabled' : ''}>${n}</button>`).join('') + `<button aria-pressed="${c.n === 'all'}" data-n="all">All (${avail})</button>`;
    $('#countIn').value = c.n === 'all' ? avail : c.n;
    $('#availNote').textContent = `${avail} available`;
    $('#startBtn').disabled = !avail;
    $('#startBtn').textContent = avail ? 'Start ▶' : (mode === 'mistakes' ? 'No mistakes here 🎉' : 'Pick at least one topic');
  };
  segment($('#setLesson'), lessonItems, c.lesson, v => { c.lesson = v; c.topics = topicsOf(v); sync(); });
  segment($('#dirSeg'), [['dt', 'Definition → Term (like Identification)'], ['td', 'Term → Definition']], c.dir, v => { c.dir = v; sync(); });
  $('#topicPills').onclick = e => { const b = e.target.closest('[data-t]'); if (!b) return; const t = b.dataset.t; c.topics = c.topics.includes(t) ? c.topics.filter(x => x !== t) : c.topics.concat(t); sync(); };
  $('#fmtPills').onclick = e => { const b = e.target.closest('[data-f]'); if (!b) return; const f = b.dataset.f; c.fmts = c.fmts.includes(f) ? c.fmts.filter(x => x !== f) : FMT_ORDER.filter(x => c.fmts.includes(x) || x === f); sync(); };
  $('#countPills').onclick = e => { const b = e.target.closest('[data-n]'); if (!b || b.disabled) return; c.n = b.dataset.n === 'all' ? 'all' : +b.dataset.n; sync(); };
  $('#countIn').onchange = e => { const v = Math.max(1, parseInt(e.target.value, 10) || 1); c.n = v; sync(); };
  $('#topAll').onclick = () => { c.topics = topicsOf(c.lesson); sync(); };
  $('#topNone').onclick = () => { c.topics = []; sync(); };
  $('#weakChk').onchange = e => { c.weak = e.target.checked; sync(); };
  $('#startBtn').onclick = () => {
    const n = c.n === 'all' ? Infinity : c.n;
    if (mode === 'cards') startCards(c.topics, n, c.dir);
    else startQuiz({ mode, topics: c.topics.slice(), fmts: c.fmts.slice(), n, weak: mode === 'mistakes' ? false : c.weak });
  };
  sync();
}

/* ---------------- quiz ---------------- */
function prio(q) { const v = S.r[q.id]; return v === 0 ? 0 : v === undefined ? 1 : v === 2 ? 2 : 3; }
function pickItems(pool, n, weak) {
  const byF = {}; FMT_ORDER.forEach(f => byF[f] = shuffle(pool.filter(q => q.f === f)));
  if (weak) FMT_ORDER.forEach(f => byF[f].sort((a, b) => prio(a) - prio(b)));
  const fs = FMT_ORDER.filter(f => byF[f].length); const total = Math.min(n, pool.length);
  const quota = Object.fromEntries(fs.map(f => [f, 0])); let left = total;
  while (left > 0) { let moved = false; for (const f of fs) { if (left && quota[f] < byF[f].length) { quota[f]++; left--; moved = true; } } if (!moved) break; }
  return fs.flatMap(f => byF[f].slice(0, quota[f]));
}
function startQuiz(cfg) {
  let pool = cfg.mode === 'mistakes' ? mistakeIds().map(id => QBY[id]) : Q;
  pool = cfg.ids ? cfg.ids.map(id => QBY[id]) : pool.filter(q => cfg.topics.includes(q.t) && cfg.fmts.includes(q.f));
  if (!pool.length) { toast('No questions for this selection'); return; }
  let items = cfg.ids ? pool : pickItems(pool, cfg.n, cfg.weak);
  items = cfg.mode === 'exam' ? FMT_ORDER.flatMap(f => shuffle(items.filter(q => q.f === f))) : shuffle(items);
  QZ = { cfg, mode: cfg.mode, i: 0, score: 0, done: false, items: items.map(q => ({ q, opts: q.f === 'mc' ? shuffle(q.opts) : null, given: null, ok: null, clue: false, gone: null, answered: false })) };
  go('quiz');
}
function qText(q) { return q.f === 'fb' ? esc(q.q).replace('____', '<span class="blank" aria-label="blank"></span>') : esc(q.q); }
function ansText(q) { return q.f === 'mc' ? q.ans : q.f === 'tf' ? (q.ans ? 'True' : 'False') : q.ans[0]; }
function givenText(it) { const g = it.given; if (g === null || g === '') return '(no answer)'; return it.q.f === 'tf' ? (g ? 'True' : 'False') : String(g); }
function renderQ() {
  const it = QZ.items[QZ.i], q = it.q, n = QZ.items.length, exam = QZ.mode === 'exam';
  $('#qCount').textContent = `${QZ.i + 1} / ${n}`;
  $('#progFill').style.width = (QZ.i / n * 100) + '%';
  $('#sMode').textContent = { drill: '🎯 Drill', exam: '📝 Mock exam', mistakes: '🔁 Mistakes' }[QZ.mode];
  $('#sScore').textContent = exam ? `✍️ ${QZ.items.filter(x => x.answered).length} answered` : `⭐ ${QZ.score} pts`;
  const pi = FMT_ORDER.indexOf(q.f);
  $('#sPart').hidden = !exam; $('#sPart').textContent = `Part ${ROMAN[pi]} · ${FMT[q.f]}`;
  const showBanner = exam && (QZ.i === 0 || QZ.items[QZ.i - 1].q.f !== q.f);
  const directions = { mc: 'Choose the best answer.', tf: 'Write True if the statement is correct, False if it is not.', id: 'Identify the term being described.', fb: 'Supply the missing word or phrase.' };
  let h = showBanner ? `<div class="part-banner">Part ${ROMAN[pi]}. ${FMT[q.f]}: ${directions[q.f]}</div>` : '';
  h += `<div class="qmeta"><span class="chip">${TMAP[q.t].icon} ${esc(TMAP[q.t].name)}</span><span class="chip">${FMT[q.f]}</span>${S.r[q.id] === 0 ? '<span class="chip">🔁 missed before</span>' : ''}</div>`;
  h += `<p class="qtext">${qText(q)}</p>`;
  const locked = it.answered && !exam;
  if (q.f === 'mc') {
    h += `<div class="opts">${it.opts.map((o, i) => {
      let cls = 'opt';
      if (it.gone === o) cls += ' gone';
      if (locked) { if (o === q.ans) cls += ' right'; else if (o === it.given) cls += ' wrong'; }
      else if (it.given === o) cls += ' sel';
      return `<button class="${cls}" data-o="${i}" ${locked || it.gone === o ? 'disabled' : ''}><span class="l">${'ABCD'[i]}</span><span>${esc(o)}</span></button>`;
    }).join('')}</div>`;
  } else if (q.f === 'tf') {
    h += `<div class="tfrow">${[true, false].map(v => {
      let cls = 'opt';
      if (locked) { if (v === q.ans) cls += ' right'; else if (v === it.given) cls += ' wrong'; } else if (it.given === v) cls += ' sel';
      return `<button class="${cls}" data-tf="${v}" ${locked ? 'disabled' : ''}>${v ? '✔ True' : '✘ False'}</button>`;
    }).join('')}</div>`;
  } else {
    h += `<div class="ansrow"><input class="txt" id="typed" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer…" aria-label="Your answer" value="${esc(it.given || '')}" ${locked ? 'disabled' : ''}></div>`;
  }
  if (it.clue) h += `<div class="clue">${esc(q.clue)}${q.f === 'id' || q.f === 'fb' ? ` <span class="muted">· Starts with “${esc(q.ans[0][0].toUpperCase())}”, ${q.ans[0].trim().split(/\s+/).length} word${q.ans[0].trim().split(/\s+/).length > 1 ? 's' : ''}.</span>` : ''}${q.f === 'mc' && it.gone ? ' <span class="muted">· One wrong option was removed.</span>' : ''}</div>`;
  if (locked) {
    h += `<div class="fb ${it.ok ? 'ok' : 'no'}"><b class="h">${it.ok ? (it.clue ? '✅ Correct (with clue, ½ point)' : '✅ Correct!') : '❌ Not quite'}</b>`;
    if (it.spell) h += `<p>Accepted. Check the spelling: <b>${esc(it.spell)}</b></p>`;
    if (!it.ok || q.f === 'id' || q.f === 'fb') h += `<p>Answer: <b>${esc(ansText(q))}</b></p>`;
    if (norm(q.ex) !== norm(ansText(q))) h += `<p>${esc(q.ex)}</p>`;
    if (!it.ok && (q.f === 'id' || q.f === 'fb') && it.given) h += `<p><button class="lnk" id="overrideBtn">My answer means the same thing, count it as correct</button></p>`;
    h += `</div>`;
  }
  const last = QZ.i === n - 1;
  h += `<div class="qact">`;
  if (!locked) h += `<button class="btn" id="clueBtn" ${it.clue ? 'disabled' : ''} title="Using a clue gives ½ point">💡 ${it.clue ? 'Clue shown' : 'Clue (½ pt)'}</button>`;
  h += `<span class="sp"></span>`;
  if (exam) {
    if (QZ.i > 0) h += `<button class="btn ghost" id="prevBtn">← Back</button>`;
    h += `<button class="btn pri" id="nextBtn" data-primary>${last ? 'Finish & see results' : 'Next →'}</button>`;
  } else if (locked) h += `<button class="btn pri" id="nextBtn" data-primary>${last ? 'See results' : 'Next →'}</button>`;
  else if (q.f === 'id' || q.f === 'fb') h += `<button class="btn pri" id="checkBtn" data-primary>Check</button>`;
  h += `</div><p class="kbd">${q.f === 'mc' ? 'Keys: 1–4 or A–D to choose' : q.f === 'tf' ? 'Keys: T or F' : 'Press Enter to submit'}${exam ? ' · Enter for next' : ''}</p>`;
  const card = $('#qcard'); card.innerHTML = h;
  const inp = $('#typed', card);
  if (inp && !locked) { inp.focus({ preventScroll: true }); inp.oninput = () => { if (exam) it.given = inp.value; }; }
  else if (locked) $('#nextBtn', card)?.focus({ preventScroll: true });
  card.onclick = e => {
    const o = e.target.closest('[data-o]'); if (o && !o.disabled) return choose(it.opts[+o.dataset.o]);
    const tf = e.target.closest('[data-tf]'); if (tf && !tf.disabled) return choose(tf.dataset.tf === 'true');
    if (e.target.closest('#clueBtn')) return useClue();
    if (e.target.closest('#checkBtn')) return choose(inp.value);
    if (e.target.closest('#nextBtn')) return next();
    if (e.target.closest('#prevBtn')) { QZ.i--; renderQ(); return; }
    if (e.target.closest('#overrideBtn')) return override();
  };
}
function useClue() {
  const it = QZ.items[QZ.i];
  if (QZ.mode === 'exam' && (it.q.f === 'id' || it.q.f === 'fb')) it.given = $('#typed')?.value ?? it.given;
  it.clue = true;
  if (it.q.f === 'mc' && !it.gone) { const wrong = it.opts.filter(o => o !== it.q.ans && o !== it.given); it.gone = wrong[Math.random() * wrong.length | 0]; }
  renderQ();
}
function grade(it) {
  const q = it.q; let ok = false, spell = null;
  if (q.f === 'mc') ok = it.given === q.ans;
  else if (q.f === 'tf') ok = it.given === q.ans;
  else { const m = match(it.given || '', q.ans); ok = m.ok; if (m.ok && !m.exact) spell = m.spell; }
  it.ok = ok; it.spell = spell; it.pts = ok ? (it.clue ? .5 : 1) : 0;
}
function record(it) {
  const prev = S.r[it.q.id];
  S.r[it.q.id] = it.ok ? (it.clue ? (prev === 1 ? 1 : 2) : 1) : 0;
  S.att++; if (it.ok) S.cor++; save();
}
function choose(v) {
  const it = QZ.items[QZ.i];
  if (QZ.mode === 'exam') { it.given = v; it.answered = true; renderQ(); return; }
  if ((it.q.f === 'id' || it.q.f === 'fb') && !String(v).trim()) { toast('Type an answer first (or use the clue)'); $('#typed')?.focus(); return; }
  it.given = v; it.answered = true; grade(it); record(it); QZ.score += it.pts; renderQ();
}
function override() {
  const it = QZ.items[QZ.i]; if (it.ok) return;
  it.ok = true; it.pts = it.clue ? .5 : 1; QZ.score += it.pts; S.r[it.q.id] = it.clue ? 2 : 1; S.cor++; save(); renderQ();
}
function next() {
  const it = QZ.items[QZ.i];
  if (QZ.mode === 'exam') { const inp = $('#typed'); if (inp) { it.given = inp.value; it.answered = !!inp.value.trim(); } }
  if (QZ.i < QZ.items.length - 1) { QZ.i++; renderQ(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (QZ.mode === 'exam') {
    const blank = QZ.items.filter(x => x.given === null || x.given === '').length;
    if (blank && !confirm(`${blank} item${blank > 1 ? 's are' : ' is'} unanswered. Finish anyway?`)) return;
    QZ.items.forEach(x => { grade(x); record(x); }); QZ.score = QZ.items.reduce((a, x) => a + x.pts, 0);
  }
  finish();
}
$('#quitBtn').onclick = () => { if (!QZ || QZ.done || confirm('Quit this set? Answers so far are kept in your progress.')) { QZ = null; go('home'); } };

function finish() {
  QZ.done = true;
  const n = QZ.items.length, right = QZ.items.filter(x => x.ok).length, clues = QZ.items.filter(x => x.clue).length;
  const p = Math.round(QZ.score / n * 100);
  if (QZ.mode === 'exam' && n >= 10) { S.best = Math.max(S.best || 0, p); save(); }
  $('#rPct').textContent = p + '%';
  $('#rMsg').textContent = p >= 90 ? 'Exam-ready! ✨ Keep it fresh with flashcards.' : p >= 75 ? 'Almost there. Review the mistakes below, then re-test them.' : p >= 50 ? 'Good start. Read the ⭐ Essentials of your weak topics, then drill again.' : 'Keep going: read the notes (or listen), then drill topic by topic.';
  $('#rStats').innerHTML = `<span class="pill">✅ ${right} correct</span><span class="pill">❌ ${n - right} wrong</span><span class="pill">💡 ${clues} clue${clues === 1 ? '' : 's'} used</span><span class="pill">⭐ ${QZ.score} / ${n} pts</span>`;
  const rowsBy = (keyFn, label) => {
    const g = {}; QZ.items.forEach(x => { const k = keyFn(x); g[k] = g[k] || [0, 0]; g[k][1]++; if (x.ok) g[k][0]++; });
    return Object.entries(g).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]).map(([k, [r, t]]) => `<div class="mrow" style="cursor:default"><span>${label(k)}</span><div class="bar2"><i style="width:${Math.round(r / t * 100)}%"></i></div><b>${r}/${t}</b></div>`).join('');
  };
  $('#rBreak').innerHTML = `<div class="breaks"><h4>By format</h4>${rowsBy(x => x.q.f, k => FMT[k])}<h4>By topic (weakest first)</h4>${rowsBy(x => x.q.t, k => TMAP[k].icon + ' ' + esc(TMAP[k].name))}</div>`;
  const wrong = QZ.items.filter(x => !x.ok);
  $('#redoWrong').hidden = !wrong.length;
  let filt = wrong.length ? 'wrong' : 'all';
  const renderRev = () => {
    const list = filt === 'wrong' ? wrong : QZ.items;
    $('#review').innerHTML = list.length ? list.map(x => {
      const q = x.q, qh = q.f === 'fb' ? esc(q.q).replace('____', `<u>${esc(q.ans[0])}</u>`) : esc(q.q);
      return `<div class="rv card ${x.ok ? 'ok' : 'no'}"><div class="qmeta"><span class="chip">${TMAP[q.t].icon} ${esc(TMAP[q.t].name)}</span><span class="chip">${FMT[q.f]}</span>${x.clue ? '<span class="chip">💡 clue</span>' : ''}</div>
<p class="q">${qh}</p><p class="ya">Your answer: ${esc(givenText(x))} ${x.ok ? '✅' : '❌'}</p>${x.ok ? '' : `<p class="ca">Correct answer: ${esc(ansText(q))}</p>`}${norm(q.ex) !== norm(ansText(q)) ? `<p class="ex2">${esc(q.ex)}</p>` : ''}</div>`;
    }).join('') : '<p class="hint">No mistakes in this set. 🎉</p>';
  };
  segment($('#revSeg'), [['wrong', `Mistakes (${wrong.length})`], ['all', `All (${n})`]], filt, v => { filt = v; renderRev(); });
  renderRev();
  $('#againBtn').onclick = () => startQuiz(Object.assign({}, QZ.cfg));
  $('#redoWrong').onclick = () => startQuiz({ mode: 'drill', ids: wrong.map(x => x.q.id), topics: [], fmts: [] });
  go('results');
}

/* ---------------- flashcards (Leitner spaced repetition) ---------------- */
const INTERVAL = [0, 1, 2, 4, 8, 16, 32]; // days per box
function startCards(topics, n, dir) {
  const now = Date.now();
  const pool = shuffle(CARDS.filter(c => topics.includes(c.t)));
  const rank = c => { const r = S.c[c.id]; if (!r) return 1; if (r.d <= now) return 0 + r.b / 10; return 2 + r.d / 1e15; };
  pool.sort((a, b) => rank(a) - rank(b));
  const deck = pool.slice(0, Math.min(n, pool.length));
  if (!deck.length) { toast('No cards for this selection'); return; }
  FC = { q: deck.map(c => c.id), total: deck.length, done: 0, dir, flipped: false, typed: '', clue: false, st: { again: 0, hard: 0, good: 0 }, end: false };
  go('flash');
}
function renderCard() {
  const area = $('#fArea');
  $('#fCount').textContent = `${Math.min(FC.done + 1, FC.total)} / ${FC.total}`;
  $('#fProg').style.width = (FC.done / FC.total * 100) + '%';
  if (FC.end || !FC.q.length) {
    FC.end = true;
    const due = CARDS.filter(c => S.c[c.id] && S.c[c.id].d <= Date.now() + DAY).length;
    area.innerHTML = `<div class="fc card res"><div class="bigscore">🌟</div><h2>Deck complete</h2>
<div class="rstats"><span class="pill">😎 Knew it: ${FC.st.good}</span><span class="pill">🤔 Hard: ${FC.st.hard}</span><span class="pill">😕 Again: ${FC.st.again}</span></div>
<p class="muted">${due} card${due === 1 ? '' : 's'} will be due within a day. Come back then: reviewing right before you forget makes memories stick.</p>
<div class="row center"><button class="btn pri" data-go="cards">Another deck</button><button class="btn" data-go="drill">Drill questions</button><button class="btn ghost" data-go="home">Home</button></div></div>`;
    return;
  }
  const c = CARDS.find(x => x.id === FC.q[0]), dt = FC.dir === 'dt';
  const rec = S.c[c.id];
  let h = `<div class="fc card"><div class="qmeta"><span class="chip">${TMAP[c.t].icon} ${esc(TMAP[c.t].name)}</span>${rec ? `<span class="chip">Box ${rec.b}</span>` : '<span class="chip">New</span>'}</div>
<span class="side">${dt ? 'What term is this?' : 'Explain this term'}</span>
<div class="front">${esc(dt ? c.def : c.term)}</div>`;
  if (!FC.flipped) {
    if (dt) h += `<input class="txt" id="fcIn" type="text" autocomplete="off" spellcheck="false" placeholder="Say it or type it (optional)…" aria-label="Your answer" value="${esc(FC.typed)}">`;
    if (FC.clue) h += `<div class="clue">${dt ? `Starts with “${esc(c.term[0].toUpperCase())}”, ${c.term.split(/\s+/).length} word${c.term.split(/\s+/).length > 1 ? 's' : ''}, ${c.term.replace(/[^A-Za-z0-9]/g, '').length} letters.` : `Topic: ${esc(TMAP[c.t].name)}. Starts with: “${esc(c.def.split(' ').slice(0, 3).join(' '))}…”`}</div>`;
    h += `<div class="grow"></div><div class="qact"><button class="btn" id="fcClue" ${FC.clue ? 'disabled' : ''}>💡 Clue</button><span class="sp"></span><button class="btn pri big" id="fcFlip" data-primary>Show answer</button></div><p class="kbd">Space or Enter to flip</p>`;
  } else {
    let verdict = '';
    if (dt && FC.typed.trim()) { const m = match(FC.typed, [c.term].concat(c.alt)); verdict = `<p class="${m.ok ? 'ca' : 'ya'}" style="margin:8px 0 0">You typed “${esc(FC.typed)}” ${m.ok ? '✅' : '❌'}</p>`; }
    h += `<div class="back"><b>${esc(dt ? c.term : c.term)}</b><p style="margin:6px 0 0">${esc(c.def)}</p>${verdict}</div>
<div class="grow"></div><p class="muted" style="margin:14px 0 0">How well did you know it?</p>
<div class="grade"><button class="btn g-again" data-g="again">😕 Again<small>missed it</small></button><button class="btn g-hard" data-g="hard">🤔 Hard<small>slow / partly</small></button><button class="btn g-good" data-g="good">😎 Knew it<small>instantly</small></button></div><p class="kbd">Keys: 1 · 2 · 3</p>`;
  }
  h += `</div>`;
  area.innerHTML = h;
  const inp = $('#fcIn'); if (inp) { inp.focus({ preventScroll: true }); inp.oninput = () => FC.typed = inp.value; }
  area.onclick = e => {
    if (e.target.closest('#fcClue')) { FC.clue = true; renderCard(); }
    if (e.target.closest('#fcFlip')) flip();
    const g = e.target.closest('[data-g]'); if (g) gradeCard(g.dataset.g);
  };
}
function flip() { FC.flipped = true; renderCard(); }
function gradeCard(g) {
  const id = FC.q.shift(), now = Date.now(), r = S.c[id] || { b: 0, d: now };
  FC.st[g]++;
  if (g === 'again') { r.b = 1; r.d = now; FC.q.splice(Math.min(3, FC.q.length), 0, id); }
  else if (g === 'hard') { r.b = Math.max(1, r.b); r.d = now + DAY; FC.done++; }
  else { r.b = Math.min(INTERVAL.length - 1, r.b + 1); r.d = now + INTERVAL[r.b] * DAY; FC.done++; }
  S.c[id] = r; save();
  FC.flipped = false; FC.typed = ''; FC.clue = false;
  if (!FC.q.length) FC.end = true;
  renderCard();
}
$('#fQuit').onclick = () => { FC = null; go('home'); };

/* ---------------- keyboard ---------------- */
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '');
  const ae = document.activeElement;
  if (e.key === 'Enter' && ae && ae.tagName === 'BUTTON' && !ae.hasAttribute('data-primary')) return;
  if (!$('#v-quiz').hidden && QZ) {
    const it = QZ.items[QZ.i];
    if (e.key === 'Enter') { const p = $('#qcard [data-primary]'); if (p) { e.preventDefault(); p.click(); } return; }
    if (typing) return;
    if (it.q.f === 'mc') { const k = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase()); if (k >= 0) { const b = $$('#qcard [data-o]')[k]; if (b && !b.disabled) b.click(); } }
    if (it.q.f === 'tf') { const k = e.key.toLowerCase(); if (k === 't' || k === 'f') { const b = $(`#qcard [data-tf="${k === 't'}"]`); if (b && !b.disabled) b.click(); } }
  } else if (!$('#v-flash').hidden && FC && !FC.end) {
    if (!FC.flipped && (e.key === 'Enter' || (e.key === ' ' && !typing))) { e.preventDefault(); flip(); return; }
    if (FC.flipped && !typing && ['1', '2', '3'].includes(e.key)) gradeCard(['again', 'hard', 'good'][+e.key - 1]);
  }
});

/* ---------------- offline ---------------- */
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('sw.js').then(() => navigator.serviceWorker.ready).then(() => { $('#offPill').hidden = false; }).catch(() => {});
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController) toast('Reviewer updated ✨ Reload to see the newest version.'); });
}
window.addEventListener('offline', () => toast('You are offline. Everything still works.'));

/* ---------------- start ---------------- */
applyTheme();
initNotes();
route();
})();
