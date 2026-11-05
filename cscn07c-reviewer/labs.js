/* Binary helpers, problem generators (unlimited practice) and the interactive Lab tools */
(function(){
function bin(n){ return (((n % 256) + 256) % 256).toString(2).padStart(8, "0"); }
const F = s => s.slice(0,4) + " " + s.slice(4);
const sg = n => { n &= 255; return n & 128 ? n - 256 : n; };
const R = (a,b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const W = [128,64,32,16,8,4,2,1];
const parts = (s, signed) => { const out = []; for (let i = 0; i < 8; i++) if (s[i] === "1") out.push(i === 0 && signed ? "−128" : String(W[i])); return out.length ? out.join(" + ") : "0"; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
window.BIN = { bin, F, sg, R, pick, shuffle, parts, esc };

function twosSteps(n){ // n: 1..127 → html showing +n → −n
  const b = bin(n), o = bin(~n), r = bin(-n);
  return `<div class="calc">+${n}  = ${F(b)}   <span class="k">(${parts(b)})</span>
invert → <span class="b">${F(o)}</span>   <span class="k">(one's complement)</span>
add 1  → <span class="g">${F(r)}</span>   <span class="k">= −${n}</span>
check: ${parts(r, true)} = −${n} ✓</div>`;
}
function addCalc(a8, b8, la, lb){
  const raw = a8 + b8, res = raw & 255, c = raw > 255;
  return `<div class="calc">  ${F(bin(a8))}   ${la}
+ ${F(bin(b8))}   ${lb}
  ---------
${c ? '<span class="r">1</span>' : " "} <span class="g">${F(bin(res))}</span>${c ? '   <span class="k">← drop the 9th bit</span>' : ""}</div>`;
}
function shiftOnce(v, op){
  v &= 255;
  switch(op){
    case "LSL": return {v:(v << 1) & 255, out:v >> 7, inn:0};
    case "LSR": return {v:v >> 1, out:v & 1, inn:0};
    case "ASL": return {v:(v << 1) & 255, out:v >> 7, inn:0};
    case "ASR": return {v:(v >> 1) | (v & 128), out:v & 1, inn:v >> 7};
    case "ROL": return {v:((v << 1) | (v >> 7)) & 255, out:v >> 7, inn:v >> 7};
    case "ROR": return {v:(v >> 1) | ((v & 1) << 7), out:v & 1, inn:v & 1};
  }
}
const OPN = {LSL:"logical left shift (<<)",LSR:"logical right shift (>>)",ASL:"arithmetic left shift",ASR:"arithmetic right shift",ROL:"rotate left",ROR:"rotate right"};
const OPRULE = {LSL:"drop the MSB, fill the LSB with 0",LSR:"drop the LSB, fill the MSB with 0",ASL:"same as logical left: fill the LSB with 0",ASR:"drop the LSB, copy the old MSB (sign bit) into the MSB",ROL:"the MSB loops back into the LSB",ROR:"the LSB loops back into the MSB"};
function flagsOf(a8, b8, op){
  let raw, res, C, V;
  if (op === "+"){ raw = a8 + b8; res = raw & 255; C = raw > 255 ? 1 : 0;
    V = ((a8 ^ res) & (b8 ^ res) & 128) ? 1 : 0; }
  else { raw = a8 - b8; res = raw & 255; C = a8 < b8 ? 1 : 0;
    V = ((a8 ^ b8) & (a8 ^ res) & 128) ? 1 : 0; }
  return {res, Z: res === 0 ? 1 : 0, C, V, S: res >> 7};
}
window.BIN.flagsOf = flagsOf; window.BIN.shiftOnce = shiftOnce; window.BIN.OPN = OPN;

/* ---------------- generators: each returns a fresh question ---------------- */
const IPO_ITEMS = [["a keypad where a user types a PIN","Input"],["a temperature sensor reading 31 °C","Input"],["a push button being pressed","Input"],["a microphone picking up a voice","Input"],["the microcontroller comparing the temperature to 30 °C","Process"],["code that converts Celsius to Fahrenheit","Process"],["the Arduino deciding whether to turn on a fan","Process"],["calculating the average of 10 readings","Process"],["an LED lighting up","Output"],["a buzzer sounding an alarm","Output"],["text printed on the Serial Monitor","Output"],["a servo motor opening a gate","Output"],["saving a high score in EEPROM","Storage (+S)"],["the sketch kept in flash memory after power-off","Storage (+S)"],["logging sensor readings to an SD card","Storage (+S)"],["remembering the last door code for next time","Storage (+S)"]];
const CPU_JOBS = [["keeps track of the memory address of the next instruction to be fetched","Program Counter (PC)"],["holds the instruction currently being decoded and executed","Instruction Register (IR)"],["translates the instruction into a set of control signals","Decoder"],["generates clock and control pulses to keep operations in order","Timing Unit"],["manages the instruction cycle","Control Unit"],["adds two binary operands (A + B)","ALU"],["checks whether A is greater than B","ALU"],["performs AND, OR, XOR and NOT","ALU"],["shifts bits left or right","ALU"],["sets the zero, carry, overflow and sign flags","ALU"]];
const CPU_PARTS = ["Program Counter (PC)","Instruction Register (IR)","Decoder","Timing Unit","Control Unit","ALU","Memory"];
const CYC = ["Address in PC copied to MAR","PC incremented to “point” to the next instruction","Instruction found at address described by MAR copied to the MDR","Instruction in MDR copied to the CIR","CU decodes the contents of the CIR","CU sends signals to relevant components (e.g. ALU)"];
const INSTR = ["ADD 5","LOAD 12","SUB 3","STORE 40","AND 15","JUMP 30"];

const GEN = {
 ipo:[()=>{ const [x,cat] = pick(IPO_ITEMS);
   return {type:"mc",q:`In an Arduino project, <b>${x}</b> belongs to which part of the IPO+S model?`,o:[cat,...["Input","Process","Output","Storage (+S)"].filter(c=>c!==cat)],
   c:"Ask: does it enter, get worked on, leave, or get kept for later?",e:`<b>${cat}</b>. ${({Input:"It is raw data provided to the system.",Process:"It is an operation/computation/decision applied to input.",Output:"It is a final result produced by the system.","Storage (+S)":"It is data retained for future use."})[cat]}`}; }],
 cpu:[()=>{ const [job,part] = pick(CPU_JOBS);
   return {type:"mc",q:`Which CPU part <b>${job}</b>?`,o:[part,...shuffle(CPU_PARTS.filter(p=>p!==part)).slice(0,3)],c:"Match the job to the component’s name (PC, IR, Decoder, Timing Unit, CU, ALU).",e:`<b>${part}</b> ${job}.`}; }],
 cycle:[
  ()=>{ const p = R(10,95); return {type:"input",chk:"num",ans:String(p),q:`The PC holds <b>${p}</b>. After fetch step 1 (“Address in PC copied to MAR”), what does the <b>MAR</b> hold?`,c:"The MAR receives a copy of the PC’s address.",e:`MAR = <b>${p}</b>. Step 1 copies the address in the PC into the MAR.`}; },
  ()=>{ const p = R(10,95); return {type:"input",chk:"num",ans:String(p+1),q:`At the start of a cycle the PC holds <b>${p}</b>. After the whole fetch stage, what does the <b>PC</b> hold?`,c:"Fetch step 2 increments the PC.",e:`PC = <b>${p+1}</b>. It was incremented to “point” to the next instruction (and the MAR keeps ${p}).`}; },
  ()=>{ const p = R(10,95), ins = pick(INSTR); return {type:"mc",q:`Address <b>${p}</b> holds <code>${ins}</code> and the PC = ${p}. After fetch step 3, what does the <b>MDR</b> hold?`,o:[ins,String(p),String(p+1),"Nothing yet – the MDR fills during execute"],c:"Step 3 reads memory at the MAR’s address into the MDR.",e:`MDR = <code>${ins}</code> — the instruction found at address ${p} (described by the MAR).`}; },
  ()=>{ const i = R(0,4); return {type:"mc",q:`In the instruction cycle, which step comes right after: “${CYC[i]}”?`,o:[CYC[i+1],...shuffle(CYC.filter((_,j)=>j!==i+1&&j!==i)).slice(0,3)],c:"Please Make My Coffee, Don’t Exaggerate → PC, MAR, MDR, CIR, Decode, Execute.",e:`Next is: <b>${CYC[i+1]}</b>.`}; }
 ],
 arduino:[
  ()=>{ const on = pick([100,200,250,500,1000,1500,2000]), off = pick([100,250,500,1000,2000]);
    return {type:"input",chk:"num",ans:String(on+off),q:`A blink sketch uses <code>digitalWrite(8, HIGH); delay(${on});</code> then <code>digitalWrite(8, LOW); delay(${off});</code>. How many <b>milliseconds</b> is one full blink (on + off)?`,c:"Add the two delays.",e:`${on} + ${off} = <b>${on+off} ms</b> (${(on+off)/1000} s).`}; },
  ()=>{ const d = pick([100,200,250,500,1000]); return {type:"input",chk:"num",ans:String(1000/d),q:`The loop reads a button, prints it with <code>Serial.println(state);</code>, then <code>delay(${d});</code>. About how many readings are printed <b>per second</b>?`,c:"1 second = 1000 ms. Divide by the delay.",e:`1000 ÷ ${d} = <b>${1000/d}</b> readings per second.`}; },
  ()=>{ const ms = pick([250,500,1000,2000,3000,5000]); return {type:"input",chk:"num",ans:String(ms/1000),q:`<code>delay(${ms});</code> pauses for how many <b>seconds</b>?`,c:"delay() counts milliseconds; 1000 ms = 1 s.",e:`${ms} ÷ 1000 = <b>${ms/1000} s</b>.`}; },
  ()=>{ const I = pick([10,15,20,30]); return {type:"input",chk:"num",ans:String(3000/I),q:`A red LED uses 2 V from a 5 V pin, so the resistor gets 3 V. Using R = V ÷ I, what resistor (in Ω) gives <b>${I} mA</b>?`,c:`Convert mA to A: ${I} mA = ${I/1000} A. Then 3 ÷ ${I/1000}.`,e:`R = 3 V ÷ ${I/1000} A = <b>${3000/I} Ω</b>.`}; }
 ],
 twos:[
  ()=>{ const n = R(1,127); return {type:"input",chk:"bin",ans:bin(-n),q:`Find the 8-bit <b>two's complement</b> of +${n} (write −${n} in binary).`,c:`+${n} = ${F(bin(n))}. Invert every bit, then add 1 to the LSB.`,e:twosSteps(n)}; },
  ()=>{ const n = R(1,254); return {type:"input",chk:"bin",ans:bin(~n),q:`What is the <b>one's complement</b> of <span class="mono">${F(bin(n))}</span>?`,c:"Just flip every bit (0→1, 1→0). Don’t add 1.",e:`<div class="calc">${F(bin(n))}\n<span class="g">${F(bin(~n))}</span>  ← every bit flipped</div>`}; },
  ()=>{ const v = R(-128,-1), s = bin(v); return {type:"input",chk:"num",ans:String(v),q:`What decimal value does <span class="mono">${F(s)}</span> represent in 8-bit two's complement?`,c:"MSB is 1 → negative. Start at −128, then add the other place values.",e:`<div class="calc">${F(s)} = ${parts(s,true)} = <span class="g">${v}</span></div>`}; },
  ()=>{ let a = R(1,127), b = R(1,127); if (a === b) b = a > 1 ? a - 1 : 2;
    const nb = bin(-b), res = (a - b) & 255;
    const read = (a - b) >= 0 ? `MSB 0 → positive → ${parts(bin(res))} = <b>${a-b}</b>` : `MSB 1 → negative → ${parts(bin(res),true)} = <b>${a-b}</b>`;
    return {type:"input",chk:"bin",ans:bin(a-b),q:`Using two's complement, compute <b>${a} − ${b}</b> in 8 bits. Give the 8-bit result.`,c:`Rewrite as ${a} + (−${b}). First find −${b} = invert ${F(bin(b))} and add 1.`,
      e:`<b>1. Make −${b}:</b>${twosSteps(b)}<b>2. Add:</b>${addCalc(a & 255, -b & 255, `(${a})`, `(−${b})`)}<b>3. Read:</b> ${read}`}; }
 ],
 bitwise:[()=>{ const op = pick(["AND","OR","XOR","AND","OR","XOR","NOT"]); const a = R(0,255), b = R(0,255);
   const sym = {AND:"&",OR:"|",XOR:"^",NOT:"~"}[op];
   const r = op==="AND"? a & b : op==="OR"? a | b : op==="XOR"? a ^ b : ~a & 255;
   const rule = {AND:"1 only if both bits are 1",OR:"1 if at least one bit is 1",XOR:"1 if the bits are different",NOT:"flip every bit"}[op];
   const q = op === "NOT" ? `Compute <b>NOT</b> <span class="mono">${F(bin(a))}</span>` : `Compute <span class="mono">${F(bin(a))}</span> <b>${op} (${sym})</b> <span class="mono">${F(bin(b))}</span>`;
   const e = op === "NOT" ? `<div class="calc">~ ${F(bin(a))}\n  <span class="g">${F(bin(r))}</span></div>` : `<div class="calc">  ${F(bin(a))}\n${sym} ${F(bin(b))}\n  ---------\n  <span class="g">${F(bin(r))}</span></div>Rule: ${rule}.`;
   return {type:"input",chk:"bin",ans:bin(r),q,c:`Go column by column: ${rule}. No carries.`,e}; }],
 shift:[
  ()=>{ const op = pick(["LSL","LSR","ASR","ASR","ROL","ROR"]); const n = op.startsWith("RO") ? R(1,2) : R(1,3);
    let v = R(1,255); if (op === "ASR" && Math.random() < .65) v |= 128;
    let cur = v, lines = [`start  ${F(bin(v))}`];
    for (let i = 0; i < n; i++){ cur = shiftOnce(cur, op).v; lines.push(`step ${i+1} <span class="g">${F(bin(cur))}</span>`); }
    return {type:"input",chk:"bin",ans:bin(cur),q:`Apply a <b>${OPN[op]}</b> by <b>${n}</b> to <span class="mono">${F(bin(v))}</span>. What are the 8 bits?`,c:`One place at a time: ${OPRULE[op]}.`,e:`<div class="calc">${lines.join("\n")}</div>Rule: ${OPRULE[op]}.`}; },
  ()=>{ if (Math.random() < .5){ const n = R(1,3), v = R(1, Math.floor(255 / 2 ** n)); return {type:"input",chk:"num",ans:String(v * 2 ** n),q:`(Unsigned) What is <b>${v} &lt;&lt; ${n}</b> in decimal?`,c:`Left shift by n = multiply by 2ⁿ = ${2**n}.`,e:`${v} × 2<sup>${n}</sup> = ${v} × ${2**n} = <b>${v * 2**n}</b><div class="calc">${F(bin(v))} → ${F(bin(v * 2**n))}</div>`}; }
    const n = R(1,3), v = R(8,255), r = v >> n; return {type:"input",chk:"num",ans:String(r),q:`(Unsigned) What is <b>${v} &gt;&gt; ${n}</b> in decimal?`,c:`Right shift by n = divide by 2ⁿ = ${2**n}, and drop any remainder.`,e:`${v} ÷ ${2**n} = ${(v / 2**n).toFixed(3).replace(/\.?0+$/,"")} → remainder dropped → <b>${r}</b><div class="calc">${F(bin(v))} → ${F(bin(r))}</div>`}; }
 ],
 flags:[()=>{ const kind = R(0,4); let a, b, op = "+";
   if (kind === 0){ a = R(64,127); b = R(128 - a, 127); }          // (+) + (+) → overflow
   else if (kind === 1){ a = R(-128,-65); b = R(-128, -129 - a); } // (−) + (−) → overflow
   else if (kind === 2){ a = R(1,255); b = 256 - a; }                                      // result zero
   else if (kind === 3){ a = R(1,127); b = R(-127,-1); }                                   // mixed signs
   else { a = R(0,120); b = R(0,120); }
   const a8 = a & 255, b8 = b & 255, f = flagsOf(a8, b8, op);
   const str = x => `Z=${x.Z} C=${x.C} V=${x.V} S=${x.S}`;
   const right = str(f), set = new Set([right]); const opts = [right];
   while (opts.length < 4){ const g = {...f}; const keys = shuffle(["Z","C","V","S"]).slice(0, R(1,2)); keys.forEach(k => g[k] ^= 1); const s = str(g); if (!set.has(s)){ set.add(s); opts.push(s); } }
   const why = `Z=${f.Z} (${f.Z ? "result is all zeros" : "result not all zeros"}) · C=${f.C} (${f.C ? "a 9th bit carried out" : "no carry-out"}) · V=${f.V} (${f.V ? "two same-sign numbers gave the opposite sign" : "signed answer fits"}) · S=${f.S} (MSB is ${f.S})`;
   return {type:"mc",q:`8-bit ALU: <span class="mono">${F(bin(a8))}</span> + <span class="mono">${F(bin(b8))}</span>. Which flags are set?`,o:opts,c:"Do the addition first. Then: all zeros? 9th bit? same signs → opposite sign? MSB?",e:addCalc(a8, b8, `(${sg(a8)} signed / ${a8} unsigned)`, `(${sg(b8)} / ${b8})`) + why}; }]
};
window.GEN = GEN;

/* ---------------- Lab UI helpers ---------------- */
const T = []; // timers to clear on navigation
window.LAB_STOP = () => { while (T.length) { const t = T.pop(); clearTimeout(t); clearInterval(t); } };
function bitsRow(s, label, cls, clickable, extra){
  let h = `<div class="bitrow">${label !== undefined ? `<span class="lab">${label}</span>` : ""}${extra || ""}`;
  for (let i = 0; i < s.length; i++){
    if (i === 4 && s.length === 8) h += `<span class="bit gap"></span>`;
    const c = (s[i] === "1" ? "one " : "") + (cls ? cls(i) || "" : "");
    h += clickable ? `<button class="bit ${c}" data-i="${i}" aria-label="bit ${7-i}">${s[i]}</button>` : `<span class="bit ${c}">${s[i] === " " ? "&nbsp;" : s[i]}</span>`;
  }
  return h + "</div>";
}
const lbl = () => `<div class="bitlbl">${W.map((w,i)=>(i===4?'<span class="gap"></span>':"")+`<span>${w}</span>`).join("")}</div>`;
const toNum = (v, lo, hi, d) => { v = parseInt(String(v).replace("−","-"), 10); return isNaN(v) ? d : Math.max(lo, Math.min(hi, v)); };
function readByte(str){ str = String(str).trim().replace(/\s/g,"").replace("−","-"); if (/^[01]{8}$/.test(str)) return parseInt(str, 2); const n = parseInt(str, 10); return isNaN(n) ? null : n; }

/* ---------------- Labs ---------------- */
const LABS = {};
LABS.twos = {name:"Two's Complement", icon:"➖", topic:"twos", render(el){
  el.innerHTML = `<div class="card stack">
   <div><h3>Build a negative number</h3><p class="muted small">Type a number from 1 to 127, then reveal each step. Try to predict the bits <b>before</b> you click.</p></div>
   <div class="row"><div class="field" style="width:140px"><label>Positive number</label><input id="tn" type="number" min="1" max="127" value="55" inputmode="numeric"></div>
   <div class="row" style="align-self:flex-end"><button class="btn pri" id="tnext">Next step ▸</button><button class="btn ghost" id="tall">Show all</button></div></div>
   <div class="scrollx"><div id="tsteps" class="steps"></div></div></div>
   <div class="card stack" style="margin-top:1rem"><div><h3>Decode any byte</h3><p class="muted small">Tap bits to flip them. See its value as <b>unsigned</b> and as <b>two's complement (signed)</b>.</p></div>
   <div class="scrollx">${lbl()}<div id="dbits"></div></div><div id="dout"></div></div>`;
  let shown = 0;
  const steps = () => { const n = toNum(el.querySelector("#tn").value, 1, 127, 55), b = bin(n), o = bin(~n), r = bin(-n);
    const changed = i => r[i] !== o[i] ? "new" : "";
    return [
     `<h5>Write +${n} in 8 bits</h5><div>${lbl()}${bitsRow(b, "+"+n)}</div><p class="small muted">${parts(b)} = ${n}. Pad with 0s to make 8 bits!</p>`,
     `<h5>Invert every bit → one's complement</h5>${bitsRow(b, "before")}${bitsRow(o, "after", () => "flip")}<p class="small muted">Every 0 became 1 and every 1 became 0.</p>`,
     `<h5>Add 1 to the LSB</h5>${bitsRow(o, "1's")}${bitsRow("00000001", "+ 1")}${bitsRow(r, "= −"+n, changed)}<p class="small muted">Green bits changed because of the +1 (a 1 + 1 makes 0 and carries left until it meets a 0).</p>`,
     `<h5>Check it</h5><p>Read with the MSB worth −128: <b>${parts(r, true)} = −${n}</b> ✓</p><p class="small">Bonus: ${n} + (−${n}) = ${F(b)} + ${F(r)} = 1 0000 0000 → the 9th bit drops → 0 ✓</p>`
    ]; };
  const draw = () => { const s = steps(); el.querySelector("#tsteps").innerHTML = s.slice(0, shown).map(x => `<div class="step">${x}</div>`).join("") || `<p class="muted small">Press “Next step”.</p>`; el.querySelector("#tnext").disabled = shown >= s.length; };
  el.querySelector("#tnext").onclick = () => { shown++; draw(); };
  el.querySelector("#tall").onclick = () => { shown = 4; draw(); };
  el.querySelector("#tn").oninput = () => { shown = 0; draw(); };
  draw();
  let d = "11001001";
  const drawD = () => { el.querySelector("#dbits").innerHTML = bitsRow(d, "bits", null, true);
    const u = parseInt(d, 2), s = sg(u);
    el.querySelector("#dout").innerHTML = `<div class="split"><div class="step"><b>Unsigned</b><br>${parts(d)} = <b>${u}</b></div><div class="step"><b>Signed (two's complement)</b><br>${parts(d, true)} = <b>${s}</b> ${s < 0 ? "(MSB 1 → negative)" : "(MSB 0 → positive)"}</div></div>`;
    el.querySelectorAll("#dbits .bit").forEach(btn => btn.onclick = () => { const i = +btn.dataset.i; d = d.slice(0,i) + (d[i] === "1" ? "0" : "1") + d.slice(i+1); drawD(); }); };
  drawD();
}};

LABS.sub = {name:"Subtraction (A − B)", icon:"🧮", topic:"twos", render(el){
  el.innerHTML = `<div class="card stack"><div><h3>Subtract the ALU way</h3><p class="muted small">The ALU never really subtracts: it computes <b>A + (−B)</b>. Pick any A and B from 0 to 127.</p></div>
  <div class="inline"><div class="field"><label>A</label><input id="sa" type="number" min="0" max="127" value="100" inputmode="numeric"></div><div class="field"><label>B</label><input id="sb" type="number" min="0" max="127" value="55" inputmode="numeric"></div></div>
  <div class="chips"><button class="chip" data-p="100,55">100 − 55 (slide)</button><button class="chip" data-p="30,12">30 − 12</button><button class="chip" data-p="12,30">12 − 30</button><button class="chip" data-p="64,64">64 − 64</button></div>
  <div class="scrollx"><div id="sout" class="steps"></div></div></div>`;
  const draw = () => { const a = toNum(el.querySelector("#sa").value, 0, 127, 100), b = toNum(el.querySelector("#sb").value, 0, 127, 55);
    const A = bin(a), Bn = bin(b), O = bin(~b), NB = bin(-b), raw = (a & 255) + ((-b) & 255), res = bin(raw), carry = raw > 255;
    const PH = `<span class="bit" style="visibility:hidden"></span>`;
    let cin = "", c = 0; const cs = []; for (let i = 7; i >= 0; i--){ cs[i] = c; const s = +A[i] + +NB[i] + c; c = s > 1 ? 1 : 0; } cin = cs.map(x => x ? "1" : " ").join("");
    const r = a - b;
    el.querySelector("#sout").innerHTML = `
     <div class="step"><h5>Write A and B in 8 bits</h5>${lbl()}${bitsRow(A, "A="+a)}${bitsRow(Bn, "B="+b)}</div>
     <div class="step"><h5>Make −B (invert, then +1)</h5>${bitsRow(O, "invert", () => "flip")}${bitsRow(NB, "−B", i => NB[i] !== O[i] ? "new" : "")}${b === 0 ? '<p class="small muted">−0 is just 0: the +1 carries all the way out.</p>' : ""}</div>
     <div class="step"><h5>Add A + (−B), right to left</h5>${bitsRow(cin, "carry", i => cin[i] === "1" ? "flip" : "", false, PH)}${bitsRow(A, "A", null, false, PH)}${bitsRow(NB, "+(−B)", null, false, PH)}${bitsRow(res, "=", null, false, `<span class="bit ${carry ? "drop" : ""}" title="9th bit">${carry ? "1" : "&nbsp;"}</span>`)}
     <p class="small muted">${carry ? "The red 9th bit doesn’t fit the 8-bit register → it is dropped (it becomes the Carry Flag)." : "No 9th bit this time."}</p></div>
     <div class="step"><h5>Read the answer</h5><p>${res[0] === "1" ? `MSB is 1 → <b>negative</b>. ${parts(res, true)} = <b>${r}</b>` : `MSB is 0 → <b>positive</b>. ${parts(res)} = <b>${r}</b>`} ✓ (${a} − ${b} = ${r})</p></div>`;
  };
  el.querySelectorAll("input").forEach(i => i.oninput = draw);
  el.querySelectorAll("[data-p]").forEach(c => c.onclick = () => { const [x,y] = c.dataset.p.split(","); el.querySelector("#sa").value = x; el.querySelector("#sb").value = y; draw(); });
  draw();
}};

LABS.bitwise = {name:"Bitwise Lab", icon:"🔣", topic:"bitwise", render(el){
  el.innerHTML = `<div class="card stack"><div><h3>AND · OR · XOR · NOT</h3><p class="muted small">Tap bits in A and B, choose an operation. Bits in the result that <b>changed</b> compared with A glow yellow.</p></div>
  <div class="seg" id="bop"><button data-o="AND" class="on">AND &amp;</button><button data-o="OR">OR |</button><button data-o="XOR">XOR ^</button><button data-o="NOT">NOT ~</button></div>
  <div class="chips"><button class="chip" data-p="11001010,00001111,AND">Mask lower 4</button><button class="chip" data-p="11001010,00000001,OR">Set bit 0</button><button class="chip" data-p="11001010,11110000,XOR">Toggle upper 4</button><button class="chip" data-p="01010011,01010011,XOR">Equality check</button><button class="chip" data-p="11001010,00000000,NOT">1's complement</button></div>
  <div class="scrollx">${lbl()}<div id="ba"></div><div id="bb"></div><div id="br"></div></div><div id="bx" class="box tip"></div></div>`;
  let A = "11001010", B = "00001111", op = "AND";
  const draw = () => {
    const a = parseInt(A,2), b = parseInt(B,2), r = op==="AND"? a&b : op==="OR"? a|b : op==="XOR"? a^b : ~a&255, R8 = bin(r);
    el.querySelector("#ba").innerHTML = bitsRow(A, "A", null, true);
    el.querySelector("#bb").innerHTML = op === "NOT" ? `<p class="small muted" style="margin:.4rem 0">NOT uses a single operand (only A).</p>` : bitsRow(B, "B", null, true);
    el.querySelector("#br").innerHTML = bitsRow(R8, "result", i => R8[i] !== A[i] ? "flip" : "");
    const info = {AND:["Returns 1 only if both bits are 1.","Masking: B’s 0s clear bits of A, B’s 1s keep them."],OR:["Returns 1 if at least one bit is 1.","Setting bits: B’s 1s force A’s bits to 1."],XOR:["Returns 1 if the bits are different.","Toggling: B’s 1s flip A’s bits. If A = B the result is all 0s → equal!"],NOT:["Flips a single operand's bits.","Inversion: this is the one's complement – step 1 of two's complement."]}[op];
    el.querySelector("#bx").innerHTML = `<b>${op}</b>${info[0]}<br>${info[1]}${op==="XOR" && r===0 ? "<br><b>Result is all zeros → A equals B (Zero Flag = 1).</b>" : ""}`;
    el.querySelectorAll("#ba .bit").forEach(x => x.onclick = () => { const i=+x.dataset.i; A = A.slice(0,i)+(A[i]==="1"?"0":"1")+A.slice(i+1); draw(); });
    el.querySelectorAll("#bb .bit").forEach(x => x.onclick = () => { const i=+x.dataset.i; B = B.slice(0,i)+(B[i]==="1"?"0":"1")+B.slice(i+1); draw(); });
    el.querySelectorAll("#bop button").forEach(x => x.classList.toggle("on", x.dataset.o === op));
  };
  el.querySelectorAll("#bop button").forEach(x => x.onclick = () => { op = x.dataset.o; draw(); });
  el.querySelectorAll("[data-p]").forEach(c => c.onclick = () => { [A,B,op] = c.dataset.p.split(","); draw(); });
  draw();
}};

LABS.shift = {name:"Shift Playground", icon:"↔️", topic:"shift", render(el){
  el.innerHTML = `<div class="card stack"><div><h3>Shift one step at a time</h3><p class="muted small">Tap bits or type a number (−128 to 255). Each button shifts <b>once</b>. Green = the bit that came in, red = the bit that fell out.</p></div>
  <div class="row"><div class="field" style="width:150px"><label>Start value</label><input id="sv" type="text" value="22" inputmode="numeric"></div><button class="btn sm ghost" id="sreset" style="align-self:flex-end">Reset</button></div>
  <div class="chips" id="sops"><button class="chip" data-o="LSL">Logical &lt;&lt;</button><button class="chip" data-o="LSR">Logical &gt;&gt;</button><button class="chip" data-o="ASL">Arith. left</button><button class="chip" data-o="ASR">Arith. right</button><button class="chip" data-o="ROL">Rotate left</button><button class="chip" data-o="ROR">Rotate right</button></div>
  <div class="scrollx">${lbl()}<div id="sreg"></div></div><div id="sinfo"></div><div><b class="small">History</b><div class="log" id="slog"></div></div></div>`;
  let v = 22, last = null; const log = [];
  const draw = () => {
    const s = bin(v); let cls = null;
    if (last){ const inIdx = last.op.endsWith("L") ? 7 : 0; cls = i => i === inIdx ? "new" : ""; }
    el.querySelector("#sreg").innerHTML = bitsRow(s, "value", cls, true);
    el.querySelectorAll("#sreg .bit").forEach(x => x.onclick = () => { const i = +x.dataset.i; v = parseInt(s.slice(0,i)+(s[i]==="1"?"0":"1")+s.slice(i+1), 2); last = null; draw(); });
    el.querySelector("#sinfo").innerHTML = `<div class="split"><div class="step"><b>Unsigned</b>: ${v} &nbsp; · &nbsp; <b>Signed</b>: ${sg(v)}</div><div class="step">${last ? `<b>${OPN[last.op]}</b>: ${OPRULE[last.op]}.<br>Fell out: <span class="bit drop" style="display:inline-grid;width:26px;height:26px">${last.out}</span> &nbsp; Came in: <span class="bit new" style="display:inline-grid;width:26px;height:26px">${last.inn}</span>` : "Pick an operation above."}</div></div>`;
    el.querySelector("#slog").innerHTML = log.slice(-8).reverse().map(x => `<div>${x}</div>`).join("") || `<div class="muted">No shifts yet.</div>`;
  };
  el.querySelectorAll("#sops .chip").forEach(c => c.onclick = () => { const op = c.dataset.o, before = v, r = shiftOnce(v, op); v = r.v; last = {op, out:r.out, inn:r.inn};
    let note = ""; if (op==="LSL"||op==="ASL") note = r.out ? " (a 1 fell off → not ×2 anymore!)" : " (×2)"; if (op==="LSR") note = before & 1 ? " (÷2, remainder dropped)" : " (÷2)"; if (op==="ASR") note = ` (signed ${sg(before)} → ${sg(v)})`;
    log.push(`${F(bin(before))} (${before}) —${op}→ ${F(bin(v))} (${v})${note}`); draw(); });
  const setV = () => { const n = readByte(el.querySelector("#sv").value); if (n !== null && n >= -128 && n <= 255){ v = n & 255; last = null; draw(); } };
  el.querySelector("#sv").oninput = setV;
  el.querySelector("#sreset").onclick = () => { log.length = 0; setV(); draw(); };
  draw();
}};

LABS.flags = {name:"Flags Lab", icon:"🚩", topic:"flags", render(el){
  el.innerHTML = `<div class="card stack"><div><h3>Watch the status flags</h3><p class="muted small">Type numbers (−128 to 255) or 8 bits like <span class="mono">01111111</span>. The ALU works on 8 bits.</p></div>
  <div class="inline"><div class="field"><label>A</label><input id="fa" type="text" value="127"></div><div class="field"><label>Operation</label><select id="fo"><option value="+">A + B</option><option value="-">A − B (compare)</option></select></div><div class="field"><label>B</label><input id="fb" type="text" value="1"></div></div>
  <div class="chips"><button class="chip" data-p="100,-55,+">100 + (−55) · slide 13</button><button class="chip" data-p="127,1,+">127 + 1</button><button class="chip" data-p="255,1,+">255 + 1</button><button class="chip" data-p="-128,-1,+">−128 + (−1)</button><button class="chip" data-p="5,5,-">5 − 5 (equal?)</button><button class="chip" data-p="3,9,-">3 − 9 (less?)</button></div>
  <div class="scrollx" id="fcalc"></div><div class="flags" id="flg"></div><div id="fwhy" class="small"></div></div>`;
  const draw = () => {
    let a = readByte(el.querySelector("#fa").value), b = readByte(el.querySelector("#fb").value), op = el.querySelector("#fo").value;
    if (a === null || b === null || a < -128 || a > 255 || b < -128 || b > 255){ el.querySelector("#fcalc").innerHTML = `<p class="note">Enter values from −128 to 255.</p>`; return; }
    const a8 = a & 255, b8 = b & 255, f = flagsOf(a8, b8, op), raw = op === "+" ? a8 + b8 : a8 - b8;
    el.querySelector("#fcalc").innerHTML = `<div class="calc">  ${F(bin(a8))}   <span class="k">unsigned ${a8} · signed ${sg(a8)}</span>
${op === "+" ? "+" : "−"} ${F(bin(b8))}   <span class="k">unsigned ${b8} · signed ${sg(b8)}</span>
  ---------
${op === "+" && f.C ? '<span class="r">1</span>' : " "} <span class="g">${F(bin(f.res))}</span>   <span class="k">unsigned ${f.res} · signed ${sg(f.res)}</span></div>
<p class="small">Unsigned check: ${a8} ${op} ${b8} = ${raw} ${raw === f.res ? "✓ fits" : "✗ doesn’t fit 0–255 → Carry"} · Signed check: ${sg(a8)} ${op} ${sg(b8)} = ${op === "+" ? sg(a8)+sg(b8) : sg(a8)-sg(b8)} ${f.V ? "✗ doesn’t fit −128…127 → Overflow" : "✓ fits"}</p>`;
    const L = [["Z","Zero",f.Z],["C","Carry",f.C],["V","Overflow",f.V],["S","Sign",f.S]];
    el.querySelector("#flg").innerHTML = L.map(([k,n,x]) => `<div class="flag ${x ? "on" : ""}"><b>${k}=${x}</b><small>${n} flag</small></div>`).join("");
    const why = [
      `<b>Z</b> = ${f.Z}: the result ${f.Z ? "is" : "is not"} all zeros.`,
      `<b>C</b> = ${f.C}: ${op === "+" ? (f.C ? "a 9th bit carried out of the MSB." : "no carry-out from the MSB.") : (f.C ? "a borrow was needed (A < B as unsigned)." : "no borrow needed (A ≥ B as unsigned).")}`,
      `<b>V</b> = ${f.V}: ${f.V ? "the signed answer is too large or too small for 8 bits (the sign came out wrong)." : "the signed answer fits in −128…127."}`,
      `<b>S</b> = ${f.S}: copied from the MSB of the result (${f.S ? "negative" : "positive or zero"}).`];
    let cmp = ""; if (op === "-") cmp = `<div class="box tip" style="margin-top:.6rem"><b>Comparison</b>${f.Z ? "Z = 1 → A is <b>equal</b> to B." : f.C ? "C = 1 → A is <b>less than</b> B (unsigned)." : "Z = 0 and C = 0 → A is <b>greater than</b> B (unsigned)."}</div>`;
    el.querySelector("#fwhy").innerHTML = `<ul>${why.map(w => `<li>${w}</li>`).join("")}</ul>${cmp}`;
  };
  el.querySelectorAll("input,select").forEach(i => i.oninput = draw);
  el.querySelectorAll("[data-p]").forEach(c => c.onclick = () => { const [x,y,o] = c.dataset.p.split(","); el.querySelector("#fa").value = x; el.querySelector("#fb").value = y; el.querySelector("#fo").value = o; draw(); });
  draw();
}};

LABS.cycle = {name:"Fetch Cycle Stepper", icon:"🔁", topic:"cycle", render(el){
  const PROG = {20:"LOAD 7",21:"ADD 5",22:"STORE 30",23:"HALT",30:"0"};
  const STEPS = ["FETCH 1","FETCH 2","FETCH 3","FETCH 4","DECODE","EXECUTE"];
  el.innerHTML = `<div class="card stack"><div><h3>Step through a tiny program</h3><p class="muted small">Press <b>Next step</b> and watch which register changes (green). The program: load 7, add 5, store the answer at address 30.</p></div>
  <div class="row"><button class="btn pri" id="cn">Next step ▸</button><button class="btn" id="ca">▶ Auto</button><button class="btn ghost" id="cr">Reset</button></div>
  <div class="box ppt" id="cmsg" style="margin:0"></div>
  <div class="split"><div><b class="small">Registers</b><div class="regs" id="cregs" style="margin-top:.4rem"></div><b class="small" style="display:block;margin-top:.8rem">Memory</b><table class="mem" id="cmem" style="margin-top:.4rem"></table></div>
  <div><b class="small">Instruction cycle</b><ol class="cyclist" id="clist" style="margin-top:.4rem"></ol></div></div></div>`;
  let st, auto = null;
  const reset = () => { st = {PC:20, MAR:"–", MDR:"–", CIR:"–", ACC:0, mem:{...PROG}, step:-1, hot:[], memHot:null, msg:"Start of cycle. The PC holds 20 – the address of the first instruction.", halted:false}; draw(); };
  const next = () => {
    if (st.halted) return; st.step = (st.step + 1) % 6; st.hot = []; st.memHot = null;
    const s = st.step;
    if (s === 0){ st.MAR = st.PC; st.hot = ["MAR"]; st.msg = `<b>Fetch 1:</b> Address in PC (${st.PC}) copied to MAR.`; }
    if (s === 1){ st.PC++; st.hot = ["PC"]; st.msg = `<b>Fetch 2:</b> PC incremented to “point” to the next instruction (${st.PC}).`; }
    if (s === 2){ st.MDR = st.mem[st.MAR]; st.hot = ["MDR"]; st.memHot = st.MAR; st.msg = `<b>Fetch 3:</b> Instruction found at address ${st.MAR} (described by MAR) copied to the MDR: <code>${st.MDR}</code>. (MDR read)`; }
    if (s === 3){ st.CIR = st.MDR; st.hot = ["CIR"]; st.msg = `<b>Fetch 4:</b> Instruction in MDR copied to the CIR.`; }
    if (s === 4){ const [op, x] = st.CIR.split(" ");
      st.msg = `<b>Decode:</b> CU decodes the contents of the CIR → ` + ({LOAD:`“put the value ${x} into the accumulator (ACC)”.`,ADD:`“tell the ALU to add ${x} to ACC”.`,STORE:`“write ACC into memory address ${x}”.`,HALT:"“stop the program”."})[op]; }
    if (s === 5){ const [op, x] = st.CIR.split(" ");
      if (op === "LOAD"){ st.ACC = +x; st.hot = ["ACC"]; st.msg = `<b>Execute:</b> CU sends signals → ACC = ${x}.`; }
      if (op === "ADD"){ const old = st.ACC; st.ACC += +x; st.hot = ["ACC"]; st.msg = `<b>Execute:</b> CU sends signals to the <b>ALU</b> → ${old} + ${x} = ${st.ACC} (an intermediate result in ACC).`; }
      if (op === "STORE"){ st.MAR = +x; st.MDR = String(st.ACC); st.mem[x] = String(st.ACC); st.hot = ["MAR","MDR"]; st.memHot = +x; st.msg = `<b>Execute:</b> MAR ← ${x}, MDR ← ACC (${st.ACC}), then memory is written: address ${x} = ${st.ACC}. This is the MDR’s <b>write</b> operation.`; }
      if (op === "HALT"){ st.halted = true; st.msg = `<b>Execute:</b> HALT – the program ends. Press Reset to run it again.`; stopAuto(); }
      if (!st.halted) st.msg += " <i>End of cycle → the next cycle starts at the address in the PC.</i>"; }
    draw();
  };
  const stopAuto = () => { if (auto){ clearInterval(auto); auto = null; el.querySelector("#ca").textContent = "▶ Auto"; } };
  const draw = () => {
    el.querySelector("#cregs").innerHTML = ["PC","MAR","MDR","CIR","ACC"].map(r => `<div class="reg ${st.hot.includes(r) ? "hot" : ""}"><small>${r}</small><b>${st[r]}</b></div>`).join("");
    el.querySelector("#cmem").innerHTML = `<tr><th>Address</th><th>Contents</th></tr>` + Object.keys(st.mem).map(a => `<tr class="${+a === st.memHot ? "hot" : ""}"><td>${a}</td><td>${st.mem[a]}</td></tr>`).join("");
    el.querySelector("#clist").innerHTML = ["Address in PC copied to MAR","PC incremented to “point” to the next instruction","Instruction at MAR’s address copied to the MDR","Instruction in MDR copied to the CIR","CU decodes the contents of the CIR","CU sends signals to relevant components (e.g. ALU)"].map((t,i) => `<li class="${i === st.step ? "on" : i < st.step ? "done" : ""}"><span class="s">${STEPS[i]}</span>${t}</li>`).join("");
    el.querySelector("#cmsg").innerHTML = st.msg; el.querySelector("#cn").disabled = st.halted;
  };
  el.querySelector("#cn").onclick = () => { stopAuto(); next(); };
  el.querySelector("#cr").onclick = () => { stopAuto(); reset(); };
  el.querySelector("#ca").onclick = () => { if (auto) return stopAuto(); auto = setInterval(next, 1400); T.push(auto); el.querySelector("#ca").textContent = "⏸ Pause"; };
  reset();
}};

LABS.arduino = {name:"Arduino Simulator", icon:"🔌", topic:"arduino", render(el){
  el.innerHTML = `<div class="card stack"><div><h3>1 · Blink (slide 9)</h3><p class="muted small">Change the delays and press Run. The highlighted line is what the Arduino is doing right now.</p></div>
  <div class="split"><div class="code" id="bcode"></div>
  <div class="stack center"><div class="led" id="bled"></div><div class="inline"><div class="field"><label>ON delay (ms)</label><input id="bon" type="number" value="1000" min="50" step="50"></div><div class="field"><label>OFF delay (ms)</label><input id="boff" type="number" value="1000" min="50" step="50"></div></div>
  <div class="row" style="justify-content:center"><button class="btn pri" id="brun">▶ Run</button></div><p class="small" id="bstat"></p></div></div></div>
  <div class="card stack" style="margin-top:1rem"><div><h3>2 · Push button + Serial Monitor (slides 10–11)</h3><p class="muted small">Press <b>and hold</b> the button. Every loop the Arduino runs <code>digitalRead(2)</code> and prints the state.</p></div>
  <div class="split"><div class="stack center"><button class="pushbtn" id="pb" aria-label="push button">PRESS</button><p class="small">pin 2 = <b id="pv">0 (LOW)</b></p><div class="field" style="max-width:180px;margin:0 auto"><label>delay(…) ms</label><input id="pd" type="number" value="200" min="50" step="50"></div><div class="row" style="justify-content:center"><button class="btn pri sm" id="prun">▶ Run</button><button class="btn ghost sm" id="pclr">Clear</button></div></div>
  <div><div class="row small" style="justify-content:space-between"><b>Serial Monitor</b><span class="muted">9600 baud</span></div><div class="serial" id="ser"></div><p class="small muted" id="prate"></p></div></div></div>
  <div class="card stack" style="margin-top:1rem"><div><h3>3 · Resistor tester (why add a resistor?)</h3><p class="muted small">5 V pin → resistor → red LED (uses ~2 V) → GND. Current I = (5 − 2) ÷ R.</p></div>
  <div class="split"><div class="stack"><div class="field"><label>Resistor</label><select id="rr"><option value="0">No resistor (0 Ω)</option><option>47</option><option>100</option><option>150</option><option selected>220</option><option>330</option><option>470</option><option>1000</option><option>10000</option></select></div>
  <div><div class="meter"><div id="rm"></div></div><p class="small" id="ri"></p></div><button class="btn sm" id="rfix">🔧 Replace LED</button></div>
  <div class="stack center"><div class="led" id="rled"></div><p id="rmsg" class="small"></p></div></div></div>`;
  const CODE = ["void setup()","{","    pinMode(8, OUTPUT);","}","","void loop()","{","    digitalWrite(8, HIGH);","    delay(ON);","","    digitalWrite(8, LOW);","    delay(OFF);","}"];
  let run = false, tmr = null, line = -1;
  const drawCode = () => { const on = el.querySelector("#bon").value, off = el.querySelector("#boff").value;
    el.querySelector("#bcode").innerHTML = CODE.map((l,i) => `<div class="${i === line ? "hl" : ""}"><i>${i+1}</i>${esc(l.replace("ON", on).replace("OFF", off))}</div>`).join("");
    const p = (+on) + (+off); el.querySelector("#bstat").innerHTML = `One blink = ${on} + ${off} = <b>${p} ms</b> (${p/1000} s) → <b>${(60000/p).toFixed(1).replace(/\.0$/,"")}</b> blinks per minute`; };
  const led = el.querySelector("#bled");
  const cycle = (phase) => { if (!run) return; const on = Math.max(50, +el.querySelector("#bon").value || 1000), off = Math.max(50, +el.querySelector("#boff").value || 1000);
    if (phase === 0){ led.classList.add("on"); line = 8; drawCode(); tmr = setTimeout(() => cycle(1), on); }
    else { led.classList.remove("on"); line = 11; drawCode(); tmr = setTimeout(() => cycle(0), off); }
    T.push(tmr); };
  el.querySelector("#brun").onclick = () => { run = !run; el.querySelector("#brun").textContent = run ? "⏸ Stop" : "▶ Run";
    if (run){ line = 2; drawCode(); tmr = setTimeout(() => cycle(0), 400); T.push(tmr); } else { clearTimeout(tmr); led.classList.remove("on"); line = -1; drawCode(); } };
  el.querySelectorAll("#bon,#boff").forEach(i => i.oninput = drawCode); drawCode();
  // button + serial
  let pressed = 0, prun = false, ptm = null; const ser = el.querySelector("#ser"), pb = el.querySelector("#pb");
  const setP = v => { pressed = v; pb.classList.toggle("down", !!v); el.querySelector("#pv").textContent = v ? "1 (HIGH)" : "0 (LOW)"; };
  pb.addEventListener("pointerdown", e => { e.preventDefault(); setP(1); try { pb.setPointerCapture(e.pointerId); } catch(_){} });
  ["pointerup","pointercancel","pointerleave"].forEach(ev => pb.addEventListener(ev, () => setP(0)));
  pb.addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter"){ e.preventDefault(); setP(1); } });
  pb.addEventListener("keyup", () => setP(0));
  const tick = () => { if (!prun) return; const d = Math.max(50, +el.querySelector("#pd").value || 200);
    const div = document.createElement("div"); div.textContent = pressed; ser.appendChild(div); while (ser.childNodes.length > 200) ser.removeChild(ser.firstChild); ser.scrollTop = ser.scrollHeight;
    el.querySelector("#prate").textContent = `delay(${d}) → about ${(1000/d).toFixed(1).replace(/\.0$/,"")} readings per second.`;
    ptm = setTimeout(tick, d); T.push(ptm); };
  el.querySelector("#prun").onclick = () => { prun = !prun; el.querySelector("#prun").textContent = prun ? "⏸ Stop" : "▶ Run"; if (prun) tick(); else clearTimeout(ptm); };
  el.querySelector("#pclr").onclick = () => { ser.innerHTML = ""; };
  // resistor
  let burnt = false; const rled = el.querySelector("#rled");
  const drawR = () => { const r = +el.querySelector("#rr").value, I = r === 0 ? Infinity : 3 / r * 1000;
    const m = el.querySelector("#rm"), pct = r === 0 ? 100 : Math.min(100, I / 40 * 100);
    m.style.width = pct + "%"; m.style.background = I > 30 ? "var(--bad)" : I > 20 || I < 5 ? "var(--warn)" : "var(--ok)";
    el.querySelector("#ri").innerHTML = r === 0 ? "I = 3 ÷ 0 → <b>huge current</b>" : `I = 3 V ÷ ${r} Ω = <b>${I < 1 ? I.toFixed(2) : I.toFixed(1)} mA</b>`;
    let msg;
    if (I > 30){ burnt = true; msg = r === 0 ? "💥 Too much current rushed through — the LED overheated and its semiconductor junction was destroyed." : "💥 Far over the LED’s ~20–30 mA limit — it overheats and burns out."; }
    else if (I > 20) msg = "⚠️ Very bright, right at the limit — it will run hot and wear out sooner.";
    else if (I >= 10) msg = "✅ Bright and safe. 220 Ω is the classic choice.";
    else if (I >= 3) msg = "🙂 Safe, a bit dimmer.";
    else msg = "😐 Safe, but barely glows — too much resistance.";
    if (burnt && I <= 30) msg = "The LED is already burnt. Press “Replace LED”, then keep a resistor in!";
    rled.className = "led " + (burnt ? "burn" : "on"); if (!burnt) rled.style.opacity = Math.max(.35, Math.min(1, I / 15)); else rled.style.opacity = 1;
    el.querySelector("#rmsg").innerHTML = msg; };
  el.querySelector("#rr").onchange = drawR;
  el.querySelector("#rfix").onclick = () => { burnt = false; if (+el.querySelector("#rr").value === 0) el.querySelector("#rr").value = "220"; drawR(); };
  drawR();
}};
window.LABS = LABS;
})();
