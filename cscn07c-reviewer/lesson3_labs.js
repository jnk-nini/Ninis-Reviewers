/* Lesson 3 — problem generators (unlimited practice) and Lab tools for: Ohm's law, resistor colors, logic gates.
   Loaded after labs.js. Adds to window.GEN and window.LABS (the Lab page lists every key of window.LABS). */
(function(){
const {R, pick, shuffle, esc} = window.BIN;
const nf = n => String(parseFloat(Number(n).toPrecision(6)));
const fmtOhm = v => v >= 1e6 ? nf(v / 1e6) + " MΩ" : v >= 1e3 ? nf(v / 1e3) + " kΩ" : nf(v) + " Ω";
const fmtMul = v => v >= 1 ? v.toLocaleString("en-US") : String(v);
const $ = (el, s) => el.querySelector(s);
const NL = String.fromCharCode(10);

/* ---------------- resistor data ---------------- */
const C = [["Black","#1b1b1b",0,1],["Brown","#7a4a21",1,10],["Red","#d23a3a",2,100],["Orange","#f08a24",3,1e3],["Yellow","#f2d03b",4,1e4],["Green","#3a9a55",5,1e5],["Blue","#3a6fd1",6,1e6],["Violet","#8a4fc2",7,1e7],["Grey","#9a9a9a",8,1e8],["White","#f7f7f7",9,1e9],["Gold","#d4af37",null,0.1],["Silver","#c0c0c0",null,0.01]];
const DIG = C.slice(0, 10).map(c => c[0]);
const TOL = {Brown:1, Red:2, Gold:5, Silver:10};

/* ---------------- gate data ---------------- */
const GF = {AND:(a,b)=>a&b, OR:(a,b)=>a|b, NAND:(a,b)=>1-(a&b), NOR:(a,b)=>1-(a|b), XOR:(a,b)=>a^b, XNOR:(a,b)=>1-(a^b)};
const GRULE = {AND:"HIGH only when ALL inputs are HIGH", OR:"HIGH if ANY input is HIGH", NAND:"NOT + AND (the AND answer, reversed)", NOR:"NOT + OR (the OR answer, reversed)", XOR:"HIGH only when the inputs are different", XNOR:"HIGH when the inputs are the same"};
const GN = Object.keys(GF);

/* ---------------- generators ---------------- */
const vi = () => { const V = pick([3,5,9,12]), I = pick([10,20,25,40,50,100]); return {V, I, R:V * 1000 / I}; };

Object.assign(window.GEN, {
 ohm:[
  ()=>{ const {V,I,R:r} = vi();
    return {type:"input",chk:"num",ans:String(I),q:`A circuit puts <b>${V} V</b> across a <b>${r} Ω</b> resistor. Using I = V ÷ R, how many <b>milliamps (mA)</b> flow?`,c:"I = V ÷ R gives amps. Multiply by 1000 for mA.",
      e:`<div class="calc">I = V ÷ R${NL}I = ${V} ÷ ${r}${NL}I = <span class="g">${I / 1000} A</span>${NL}I = <span class="g">${I} mA</span>   <span class="k">← × 1000</span></div>`}; },
  ()=>{ const {V,I,R:r} = vi();
    return {type:"input",chk:"num",ans:String(r),q:`A <b>${V} V</b> circuit must carry <b>${I} mA</b>. What resistance (in Ω) gives that? (R = V ÷ I)`,c:`Convert first: ${I} mA = ${I / 1000} A. Then ${V} ÷ ${I / 1000}.`,
      e:`<div class="calc">I = ${I} mA = ${I / 1000} A${NL}R = V ÷ I${NL}R = ${V} ÷ ${I / 1000}${NL}R = <span class="g">${r} Ω</span></div>`}; },
  ()=>{ const {V,I,R:r} = vi();
    return {type:"input",chk:"num",ans:String(V),q:`<b>${I} mA</b> flows through a <b>${r} Ω</b> resistor. What voltage (V) is across it? (V = I × R)`,c:`Convert first: ${I} mA = ${I / 1000} A. Then multiply by ${r}.`,
      e:`<div class="calc">I = ${I} mA = ${I / 1000} A${NL}V = I × R${NL}V = ${I / 1000} × ${r}${NL}V = <span class="g">${V} V</span></div>`}; },
  ()=>{ const r = pick([50,100,200,250,300,500,1000]), I = 5 / r * 1000, safe = I <= 20, Is = nf(I);
    return {type:"tf",q:`A digital chip can only tolerate <b>20 mA</b>. Wired to <b>5 V</b> through a <b>${r} Ω</b> resistor, the chip is safe.`,a:safe,c:"Find I = V ÷ R in mA and compare it with 20 mA.",
      e:`<div class="calc">I = 5 ÷ ${r} = ${nf(5 / r)} A = <span class="${safe ? "g" : "r"}">${Is} mA</span></div>${safe ? `${Is} mA is at or below 20 mA → <b>safe</b>.` : `${Is} mA is above 20 mA → the chip <b>overheats and may fail permanently</b>. Resistors are necessary.`}`}; },
  ()=>{ const V = pick([3,5,9,12]);
    return {type:"input",chk:"num",ans:String(V * 50),q:`A chip tolerates <b>20 mA</b> and the supply is <b>${V} V</b>. What is the smallest resistor (in Ω) that keeps the current at or below 20 mA?`,c:"R = V ÷ I, with I = 20 mA = 0.02 A.",
      e:`<div class="calc">I(max) = 20 mA = 0.02 A${NL}R = V ÷ I = ${V} ÷ 0.02 = <span class="g">${V * 50} Ω</span></div>Any resistor of ${V * 50} Ω or more is safe.`}; }
 ],
 resistor:[
  ()=>{ const d1 = R(1,9), d2 = R(0,9), m = R(0,5), t = pick([["Gold","5%"],["Silver","10%"],["Red","2%"],["Brown","1%"]]), val = (d1 * 10 + d2) * 10 ** m;
    return {type:"input",chk:"num",ans:String(val),q:`A 4-band resistor has the bands <b>${DIG[d1]} – ${DIG[d2]} – ${DIG[m]} – ${t[0]}</b>. What is its resistance in <b>ohms</b>? (Type a plain number, e.g. 4700 — not 4.7k.)`,
      c:`Digits ${d1} and ${d2} side by side, then multiply by the ${DIG[m]} band (× ${fmtMul(10 ** m)}).`,
      e:`<div class="calc">${DIG[d1]}  ${DIG[d2]}  ${DIG[m]}  ${t[0]}${NL}  ${d1}     ${d2}    ×${fmtMul(10 ** m)}   ±${t[1]}${NL}${d1}${d2} × ${fmtMul(10 ** m)} = <span class="g">${val.toLocaleString("en-US")} Ω</span> (${fmtOhm(val)}), ±${t[1]}</div>`}; },
  ()=>{ const d1 = R(1,9), d2 = R(0,9), d3 = R(0,9), m = R(0,3), t = pick([["Brown","1%"],["Red","2%"]]), num = d1 * 100 + d2 * 10 + d3, val = num * 10 ** m;
    return {type:"input",chk:"num",ans:String(val),q:`A 5-band resistor has the bands <b>${DIG[d1]} – ${DIG[d2]} – ${DIG[d3]} – ${DIG[m]} – ${t[0]}</b>. What is its resistance in <b>ohms</b>? (Plain number.)`,
      c:`Three digits (${d1}, ${d2}, ${d3}) side by side, then multiply by the ${DIG[m]} band (× ${fmtMul(10 ** m)}).`,
      e:`<div class="calc">${DIG[d1]}  ${DIG[d2]}  ${DIG[d3]}  ${DIG[m]}  ${t[0]}${NL}  ${d1}     ${d2}     ${d3}    ×${fmtMul(10 ** m)}   ±${t[1]}${NL}${num} × ${fmtMul(10 ** m)} = <span class="g">${val.toLocaleString("en-US")} Ω</span> (${fmtOhm(val)}), ±${t[1]}</div>`}; },
  ()=>{ const d1 = R(1,9), d2 = R(0,9), m = R(1,5), val = (d1 * 10 + d2) * 10 ** m;
    const mk = (a,b,c) => `${DIG[a]} – ${DIG[b]} – ${DIG[c]} – Gold`, right = mk(d1, d2, m), set = new Set([right]), opts = [right];
    const tries = [() => mk(d1, d2, m + 1 > 9 ? m - 1 : m + 1), () => mk(d1, d2, m - 1), () => mk(d2, d1, m), () => mk(d1, (d2 + 1) % 10, m), () => mk((d1 % 9) + 1, d2, m), () => mk(d1, d2, 0)];
    for (const f of shuffle(tries)){ const s = f(); if (!set.has(s) && opts.length < 4){ set.add(s); opts.push(s); } }
    while (opts.length < 4){ const s = mk(R(1,9), R(0,9), R(0,6)); if (!set.has(s)){ set.add(s); opts.push(s); } }
    return {type:"mc",q:`Which 4-band color code (with a Gold tolerance band) shows <b>${val.toLocaleString("en-US")} Ω</b> (${fmtOhm(val)})?`,o:opts,c:"Split the value into two digits and a multiplier (how many zeros).",
      e:`<div class="calc">${val.toLocaleString("en-US")} Ω = ${d1}${d2} × ${fmtMul(10 ** m)}${NL}${DIG[d1]} (${d1}) – ${DIG[d2]} (${d2}) – ${DIG[m]} (× ${fmtMul(10 ** m)}) – Gold (±5%)</div>`}; },
  ()=>{ const kind = R(0,2);
    if (kind === 0){ const i = R(0,9), o = shuffle([...Array(10).keys()].filter(x => x !== i)).slice(0,3).map(String);
      return {type:"mc",q:`In the resistor color chart, which <b>digit</b> does <b>${DIG[i]}</b> represent?`,o:[String(i), ...o],c:"Black 0, Brown 1, Red 2, Orange 3, Yellow 4, Green 5, Blue 6, Violet 7, Grey 8, White 9.",e:`<b>${DIG[i]} = ${i}</b>.`}; }
    if (kind === 1){ const i = R(0,11), mul = C[i][3], all = C.map(c => fmtMul(c[3])), right = fmtMul(mul), o = shuffle(all.filter(x => x !== right)).slice(0,3).map(x => "× " + x);
      return {type:"mc",q:`As a <b>multiplier</b> band, what does <b>${C[i][0]}</b> mean?`,o:["× " + right, ...o],c:"For Black → White the multiplier is 10 to the power of the digit; Gold and Silver are fractions.",e:`<b>${C[i][0]} multiplier = × ${right}</b>.`}; }
    const col = pick(["Brown","Red","Gold","Silver"]), right = TOL[col] + "%", o = ["1%","2%","5%","10%"].filter(x => x !== right);
    return {type:"mc",q:`What <b>tolerance</b> does a <b>${col}</b> band show?`,o:[right, ...o],c:"Brown 1 · Red 2 · Gold 5 · Silver 10.",e:`<b>${col} = ${right}</b>.`}; }
 ],
 digital:[
  ()=>{ const items = [["a signal that can be 0.1 V, 0.5 V, 1.3 V or 3.7 V","Analog"],["a signal that can have infinite values","Analog"],["a value that moves smoothly through 0.7 V, 0.8 V, 0.9 V …","Analog"],["a signal that is only ever LOW or HIGH","Digital"],["a signal whose two states are 0 and 1","Digital"],["a signal where LOW = 0 and HIGH = 1","Digital"]];
    const [x, ans] = pick(items); return {type:"mc",q:`Is <b>${x}</b> analog or digital?`,o:[ans, ...["Analog","Digital","Both","Neither"].filter(c => c !== ans)],c:"Analog = infinite values. Digital = just two states.",e:`<b>${ans}</b>. Analog can have infinite values (0.1V, 0.5V, 1.3V, 3.7V); digital has only LOW (0) and HIGH (1).`}; },
  ()=>{ if (Math.random() < .5){ const v = R(0,1), s = v ? "HIGH" : "LOW";
      return {type:"mc",q:`In digital logic, which state has the value <b>${v}</b>?`,o:[s, ...["LOW","HIGH","Analog","Infinite"].filter(c => c !== s)],c:"LOW = 0, HIGH = 1.",e:`<b>${s}</b> = ${v}.`}; }
    const s = pick(["LOW","HIGH"]), v = s === "HIGH" ? "1" : "0";
    return {type:"mc",q:`In digital logic, what value does <b>${s}</b> have?`,o:[v, ...["0","1","5","−1"].filter(c => c !== v)],c:"LOW = 0, HIGH = 1.",e:`<b>${s}</b> = ${v}.`}; },
  ()=>{ const items = [["What do millions or billions of tiny electronic switches in a computer have as their name?","Transistors",["Resistors","Registers","LEDs"]],["What are transistors organised into?","Logic gates",["Resistors","Registers","Wires"]],["Which device is used to amplify or switch electrical signals and power?","Transistor",["Resistor","LED","Register"]],["Which is the foundation of all digital circuits?","Logic gates",["Resistors","Analog signals","Wires"]]];
    const [q, a, d] = pick(items); return {type:"mc",q,o:[a, ...d],c:"Think of the tiny switches inside a chip.",e:`<b>${a}</b>. Transistors are organised into logic gates, which become the foundation of all digital circuits.`}; }
 ],
 gates:[
  ()=>{ const g = pick(GN), a = R(0,1), b = R(0,1), out = GF[g](a, b);
    const inner = g === "NAND" ? `AND(${a},${b}) = ${a & b} → NOT → ${out}` : g === "NOR" ? `OR(${a},${b}) = ${a | b} → NOT → ${out}` : g === "XNOR" ? `XOR(${a},${b}) = ${a ^ b} → NOT → ${out}` : "";
    return {type:"input",chk:"num",ans:String(out),q:`A <b>${g}</b> gate has inputs <b>A = ${a}</b> and <b>B = ${b}</b>. What is the output (0 or 1)?`,c:`${g}: ${GRULE[g]}.`,e:`<b>${g}(${a}, ${b}) = ${out}</b>. Rule: ${GRULE[g]}.${inner ? `<div class="calc">${inner}</div>` : ""}`}; },
  ()=>{ const a = R(0,1); return {type:"input",chk:"num",ans:String(1 - a),q:`A <b>NOT</b> gate has input <b>A = ${a}</b>. What is the output?`,c:"NOT reverses the input value.",e:`NOT ${a} = <b>${1 - a}</b>.`}; },
  ()=>{ const k = pick([["(A OR B) AND C","A OR B",(a,b)=>a|b,"AND C",(x,c)=>x&c],["(A AND B) OR C","A AND B",(a,b)=>a&b,"OR C",(x,c)=>x|c],["(A XOR B) AND C","A XOR B",(a,b)=>a^b,"AND C",(x,c)=>x&c],["(A NAND B) OR C","A NAND B",(a,b)=>1-(a&b),"OR C",(x,c)=>x|c],["(A NOR B) AND C","A NOR B",(a,b)=>1-(a|b),"AND C",(x,c)=>x&c]]);
    const a = R(0,1), b = R(0,1), c = R(0,1), x = k[2](a, b), y = k[4](x, c);
    return {type:"input",chk:"num",ans:String(y),q:`Two-gate circuit: <b>Y = ${k[0]}</b>. Find Y when <b>A = ${a}, B = ${b}, C = ${c}</b>.`,c:`Solve the inner gate first (${k[1]}), then use its output with C.`,
      e:`<div class="calc">Inner gate:  ${k[1]} = ${a}, ${b} → <span class="g">${x}</span>${NL}Outer gate:  ${k[3]} → ${x}, ${c} → <span class="g">${y}</span></div>Y = <b>${y}</b>.`}; },
  ()=>{ const g = pick(GN), col = ROWS().map(([a,b]) => GF[g](a, b));
    return {type:"mc",q:`A two-input gate gives the outputs <b>${col.join(", ")}</b> for (A,B) = (0,0), (0,1), (1,0), (1,1). Which gate is it?`,o:[g, ...shuffle(GN.filter(x => x !== g)).slice(0,3)],c:"Look at where the single odd output sits, and compare with the rules.",
      e:`<b>${g}</b>: ${GRULE[g]}.`}; },
  ()=>{ const items = [["Outputs 1 only when all inputs are 1.","AND"],["Reverses the input signal.","NOT"],["Outputs 1 when at least one input is 1.","OR"],["Outputs 1 when the inputs are different.","XOR"],["Outputs 1 when the inputs are the same.","XNOR"],["Is NOT + AND.","NAND"],["Is NOT + OR (HIGH only when both inputs are LOW).","NOR"]];
    const [d, g] = pick(items); const pool = ["AND","OR","NOT","NAND","NOR","XOR","XNOR"];
    return {type:"mc",q:`Identify the logic gate: <b>${d}</b>`,o:[g, ...shuffle(pool.filter(x => x !== g)).slice(0,3)],c:"AND = all, OR = any, XOR = different, XNOR = same, bubble = NOT.",e:`<b>${g}</b>.`}; },
  ()=>{ const p = R(0,1), a = R(0,1), b = R(0,1), x = a | b, y = p & x;
    return {type:"input",chk:"num",ans:String(y),q:`A machine starts only when the Power Switch (P) is ON and either Button A or Button B is pressed (<b>Y = P AND (A OR B)</b>). Find Y when <b>P = ${p}, A = ${a}, B = ${b}</b>.`,c:"A OR B first, then AND with P.",
      e:`<div class="calc">A OR B = ${a} OR ${b} = <span class="g">${x}</span>${NL}P AND (…) = ${p} AND ${x} = <span class="g">${y}</span></div>${y ? "The machine <b>starts</b>." : "The machine <b>stays off</b>."}`}; }
 ]
});
function ROWS(){ return [[0,0],[0,1],[1,0],[1,1]]; }

/* ---------------- LAB: Ohm's law ---------------- */
const LABS = window.LABS;
LABS.ohm = {name:"Ohm’s Law", icon:"⚡", topic:"ohm", render(el){
  el.innerHTML = `<div class="card stack"><div><h3>Solve for any one (V = I × R)</h3><p class="muted small">Pick what to find, then type the other two. Current is entered in <b>mA</b> (1 A = 1000 mA).</p></div>
  <div class="seg" id="om"><button data-m="I" class="on">Find current I</button><button data-m="R">Find resistance R</button><button data-m="V">Find voltage V</button></div>
  <div class="inline"><div class="field"><label>Voltage V (volts)</label><input id="ov" type="number" step="any" value="5" inputmode="decimal"></div>
  <div class="field"><label>Resistance R (Ω)</label><input id="orr" type="number" step="any" value="100" inputmode="decimal"></div>
  <div class="field"><label>Current I (mA)</label><input id="oi" type="number" step="any" value="50" inputmode="decimal"></div></div>
  <div class="chips"><button class="chip" data-p="I,5,100,">5 V, 100 Ω → I (slide)</button><button class="chip" data-p="R,5,,20">5 V, 20 mA → R</button><button class="chip" data-p="V,,100,50">50 mA through 100 Ω → V</button><button class="chip" data-p="I,3,150,">3 V, 150 Ω → I</button></div>
  <div id="osteps"></div></div>
  <div class="card stack" style="margin-top:1rem"><div><h3>Chip protection (slide 6)</h3><p class="muted small">A digital chip can only tolerate a limited current. Choose a resistor and see if the chip survives.</p></div>
  <div class="inline"><div class="field"><label>Supply V (volts)</label><input id="pv" type="number" step="any" value="5" inputmode="decimal"></div>
  <div class="field"><label>Resistor R</label><select id="pr"><option value="10">10 Ω</option><option value="47">47 Ω</option><option value="100" selected>100 Ω</option><option value="150">150 Ω</option><option value="200">200 Ω</option><option value="220">220 Ω</option><option value="250">250 Ω</option><option value="330">330 Ω</option><option value="470">470 Ω</option><option value="1000">1000 Ω</option></select></div>
  <div class="field"><label>Chip limit (mA)</label><input id="pl" type="number" step="any" value="20" inputmode="decimal"></div></div>
  <div><div class="mwrap"><div class="meter"><div id="pm"></div></div><span class="mark" title="chip limit"></span></div><p class="tiny muted" style="margin:.2rem 0 0">The black tick marks the chip’s limit.</p></div>
  <div id="pout" class="box"></div></div>`;
  let mode = "I";
  const f = {I:$(el,"#oi"), R:$(el,"#orr"), V:$(el,"#ov")};
  const val = k => { const x = parseFloat(f[k].value); return isFinite(x) && x > 0 ? x : null; };
  const draw = () => {
    el.querySelectorAll("#om button").forEach(b => b.classList.toggle("on", b.dataset.m === mode));
    Object.keys(f).forEach(k => { f[k].readOnly = k === mode; });
    const v = val("V"), r = val("R"), i = val("I"); let html = "";
    if (mode === "I"){ if (v && r){ const A = v / r; f.I.value = nf(A * 1000); html = `I = V ÷ R${NL}I = ${nf(v)} ÷ ${nf(r)}${NL}I = <span class="g">${nf(A)} A</span>${NL}I = <span class="g">${nf(A * 1000)} mA</span>   <span class="k">← × 1000</span>`; } }
    if (mode === "R"){ if (v && i){ const A = i / 1000, r2 = v / A; f.R.value = nf(r2); html = `I = ${nf(i)} mA = ${nf(A)} A   <span class="k">← ÷ 1000</span>${NL}R = V ÷ I${NL}R = ${nf(v)} ÷ ${nf(A)}${NL}R = <span class="g">${nf(r2)} Ω</span>`; } }
    if (mode === "V"){ if (r && i){ const A = i / 1000, v2 = A * r; f.V.value = nf(v2); html = `I = ${nf(i)} mA = ${nf(A)} A   <span class="k">← ÷ 1000</span>${NL}V = I × R${NL}V = ${nf(A)} × ${nf(r)}${NL}V = <span class="g">${nf(v2)} V</span>`; } }
    if (!html){ const k = mode === "I" ? "I" : mode === "R" ? "R" : "V"; f[k].value = ""; }
    el.querySelector("#osteps").innerHTML = html ? `<div class="calc">${html}</div>` : `<p class="note">Enter positive numbers in the two white boxes.</p>`;
  };
  el.querySelectorAll("#om button").forEach(b => b.onclick = () => { mode = b.dataset.m; draw(); });
  ["V","R","I"].forEach(k => f[k].oninput = draw);
  el.querySelectorAll("[data-p]").forEach(c => c.onclick = () => { const [m, v, r, i] = c.dataset.p.split(","); mode = m; if (v) f.V.value = v; if (r) f.R.value = r; if (i) f.I.value = i; draw(); });
  draw();
  const drawP = () => {
    const V = parseFloat($(el,"#pv").value), Rr = +$(el,"#pr").value, L = parseFloat($(el,"#pl").value), out = $(el,"#pout"), meter = $(el,"#pm");
    if (!(V > 0) || !(L > 0)){ out.className = "box"; out.innerHTML = "Enter a positive supply voltage and chip limit."; meter.style.width = "0"; return; }
    const I = V / Rr * 1000, over = I > L, near = !over && I > L * .8, minR = V / (L / 1000);
    meter.style.width = Math.min(100, I / (2 * L) * 100) + "%"; meter.style.background = over ? "var(--bad)" : near ? "var(--warn)" : "var(--ok)";
    $(el,".mark").style.left = "50%";
    out.className = "box " + (over ? "trap" : "tip");
    out.innerHTML = `<b>${over ? "Too much current" : "Safe"}</b>I = ${nf(V)} ÷ ${Rr} = <b>${nf(I)} mA</b> (limit ${nf(L)} mA).<br>${over ? "💥 The chip overheats and may fail permanently. Therefore, resistors are necessary." : near ? "⚠️ Safe, but close to the limit." : "✅ The chip is protected."}<br><span class="small">Smallest safe resistor: R = ${nf(V)} ÷ ${nf(L / 1000)} = <b>${nf(minR)} Ω</b>.</span>`;
  };
  el.querySelectorAll("#pv,#pr,#pl").forEach(x => x.oninput = drawP); drawP();
}};

/* ---------------- LAB: resistor colors ---------------- */
LABS.color = {name:"Resistor Colors", icon:"🎨", topic:"resistor", render(el){
  const dOpts = C.slice(0,10).map((c,i) => `<option value="${i}">${c[0]} (${i})</option>`).join("");
  el.innerHTML = `<div class="card stack"><div><h3>Read a resistor’s color bands</h3><p class="muted small">Choose the bands from left to right. See the value, the tolerance range and the working.</p></div>
  <div class="seg" id="cn"><button data-n="4" class="on">4-band</button><button data-n="5">5-band (slide chart)</button></div>
  <div class="inline"><div class="field"><label>1st digit</label><select id="c1">${dOpts}</select></div><div class="field"><label>2nd digit</label><select id="c2">${dOpts}</select></div>
  <div class="field" id="c3w"><label>3rd digit</label><select id="c3">${dOpts}</select></div>
  <div class="field"><label>Multiplier</label><select id="cm">${C.map((c,i) => `<option value="${i}">${c[0]} (× ${fmtMul(c[3])})</option>`).join("")}</select></div>
  <div class="field"><label>Tolerance</label><select id="ct">${Object.keys(TOL).map(n => `<option value="${n}">${n} (±${TOL[n]}%)</option>`).join("")}</select></div></div>
  <div class="chips"><button class="chip" data-p="4:1,2,0:1:Gold">120 Ω ±5% (slide)</button><button class="chip" data-p="5:4,7,0:1:Brown">4.7 kΩ ±1% (slide)</button><button class="chip" data-p="4:2,2,0:1:Gold">220 Ω (LED)</button><button class="chip" data-p="4:1,0,0:3:Gold">10 kΩ</button><button class="chip" data-p="4:1,0,0:2:Gold">1 kΩ</button></div>
  <div id="cart"></div><div id="cout"></div></div>`;
  const st = {n:4, d:[1,2,0], m:1, t:"Gold"};
  const draw = () => {
    el.querySelectorAll("#cn button").forEach(b => b.classList.toggle("on", +b.dataset.n === st.n));
    $(el,"#c3w").classList.toggle("hide", st.n === 4);
    $(el,"#c1").value = st.d[0]; $(el,"#c2").value = st.d[1]; $(el,"#c3").value = st.d[2]; $(el,"#cm").value = st.m; $(el,"#ct").value = st.t;
    const digs = st.d.slice(0, st.n === 4 ? 2 : 3), num = digs.reduce((a,x) => a * 10 + x, 0), mult = C[st.m][3];
    const val = parseFloat((num * mult).toPrecision(10)), tol = TOL[st.t], lo = val * (1 - tol / 100), hi = val * (1 + tol / 100);
    const names = [...digs.map(i => C[i][0]), C[st.m][0], st.t], hexes = names.map(n => C.find(c => c[0] === n)[1]);
    const xs = st.n === 4 ? [86,108,130,196] : [84,102,120,138,198];
    $(el,"#cart").innerHTML = `<svg viewBox="0 0 300 90" class="resvg" role="img" aria-label="Resistor with bands ${names.join(", ")}"><line x1="0" y1="45" x2="300" y2="45" stroke="#9aa3b2" stroke-width="5" stroke-linecap="round"/><rect x="58" y="20" width="184" height="50" rx="22" fill="#e6cfa3" stroke="#b79a64" stroke-width="2"/>${hexes.map((h,i) => `<rect x="${xs[i]}" y="20" width="12" height="50" fill="${h}" stroke="rgba(0,0,0,.3)" stroke-width=".8"/>`).join("")}</svg>`;
    const pad = (s, n) => String(s).padEnd(n);
    const row1 = names.map(n => pad(n, 8)).join(""), row2 = [...digs.map(d => pad(d, 8)), pad("×" + fmtMul(mult), 8), "±" + tol + "%"].join("");
    $(el,"#cout").innerHTML = `<div class="split"><div class="step"><b class="small">Value</b><div style="font-size:1.6rem;font-weight:800">${fmtOhm(val)} <span class="muted" style="font-size:1rem">±${tol}%</span></div><div class="small muted">= ${val.toLocaleString("en-US")} Ω · real value between ${nf(lo)} Ω and ${nf(hi)} Ω</div></div>
    <div class="step"><b class="small">Working</b><div class="calc" style="margin:.3rem 0 0">${row1}${NL}${row2}${NL}${digs.join("")} × ${fmtMul(mult)} = <span class="g">${val.toLocaleString("en-US")} Ω</span></div></div></div>`;
  };
  el.querySelectorAll("#cn button").forEach(b => b.onclick = () => { st.n = +b.dataset.n; draw(); });
  ["#c1","#c2","#c3"].forEach((s, i) => $(el,s).onchange = e => { st.d[i] = +e.target.value; draw(); });
  $(el,"#cm").onchange = e => { st.m = +e.target.value; draw(); };
  $(el,"#ct").onchange = e => { st.t = e.target.value; draw(); };
  el.querySelectorAll("[data-p]").forEach(c => c.onclick = () => { const [n, d, m, t] = c.dataset.p.split(":"); st.n = +n; st.d = d.split(",").map(Number); st.m = +m; st.t = t; draw(); });
  draw();
}};

/* ---------------- LAB: logic gates ---------------- */
const GFN = {and:GF.AND, or:GF.OR, nand:GF.NAND, nor:GF.NOR, xor:GF.XOR, xnor:GF.XNOR, not:a => 1 - a, buf:a => a};
const GDESC = {and:"Output is HIGH only when ALL inputs are HIGH.", or:"Output is HIGH if ANY input is HIGH.", not:"Reverses the input value.", nand:"NOT + AND: the AND answer, reversed.", nor:"NOT + OR: the OR answer, reversed.", xor:"Exclusive OR: output is HIGH only when the inputs are different.", xnor:"XOR reversed: output is HIGH when the inputs are the same.", buf:"Passes the input through unchanged."};
const GORDER = [["and","AND"],["or","OR"],["not","NOT"],["nand","NAND"],["nor","NOR"],["xor","XOR"],["xnor","XNOR"],["buf","Buffer"]];
const CIRCS = [
 {name:"(A OR B) AND C", note:"slide 12 · exercises 3–5", vars:["A","B","C"], inner:{label:"A OR B", fn:v => v.A | v.B}, outer:{label:"(A OR B) AND C", fn:(v,x) => x & v.C}, presets:[["Ex. 3: A=0 B=1 C=1",[0,1,1]],["Ex. 4: A=0 B=0 C=1",[0,0,1]],["Ex. 5: A=1 B=1 C=0",[1,1,0]]]},
 {name:"P AND (A OR B)", note:"slide 14 · the machine", vars:["P","A","B"], machine:true, inner:{label:"A OR B", fn:v => v.A | v.B}, outer:{label:"P AND (A OR B)", fn:(v,x) => v.P & x}, presets:[["P=1 A=0 B=1",[1,0,1]],["P=1 A=0 B=0",[1,0,0]],["P=0 A=1 B=1",[0,1,1]]]}
];
LABS.gates = {name:"Logic Gates", icon:"🔀", topic:"gates", render(el){
  el.innerHTML = `<div class="card stack"><div><h3>Gate explorer</h3><p class="muted small">Pick a gate, flip the inputs and watch the output. The current row of the truth table lights up.</p></div>
  <div class="chips" id="gk">${GORDER.map(([k,n]) => `<button class="chip ${k === "and" ? "on" : ""}" data-k="${k}">${n}</button>`).join("")}</div>
  <div class="gwrap"><div class="gins" id="gin"></div><div class="bigsym" id="gsym"></div><div class="outpill" id="gout"></div></div>
  <div id="gdesc" class="box ppt"></div><div id="gtt"></div></div>
  <div class="card stack" style="margin-top:1rem"><div><h3>Two-gate circuits</h3><p class="muted small">Solve the inner gate first, then the outer one. These are the circuits from the slide exercises.</p></div>
  <div class="chips" id="ck">${CIRCS.map((c,i) => `<button class="chip ${i === 0 ? "on" : ""}" data-c="${i}">${c.name}</button>`).join("")}</div>
  <p class="small muted" id="cnote"></p><div class="chips" id="cp"></div><div class="row" id="cin"></div><div id="cst" class="calc"></div><div id="cmach"></div><div id="ctt"></div></div>`;
  /* --- gate explorer --- */
  let kind = "and", A = 0, B = 0;
  const two = k => k !== "not" && k !== "buf";
  const drawG = () => {
    el.querySelectorAll("#gk .chip").forEach(c => c.classList.toggle("on", c.dataset.k === kind));
    const fn = GFN[kind], out = two(kind) ? fn(A, B) : fn(A);
    $(el,"#gin").innerHTML = `<div class="gi"><span>A</span><button class="bit ${A ? "one" : ""}" data-i="A" aria-label="Toggle input A">${A}</button></div>${two(kind) ? `<div class="gi"><span>B</span><button class="bit ${B ? "one" : ""}" data-i="B" aria-label="Toggle input B">${B}</button></div>` : ""}`;
    $(el,"#gsym").innerHTML = window.GATE_SVG(kind, 150);
    $(el,"#gout").innerHTML = `<small>Output</small><b class="${out ? "on" : ""}">${out}</b>`;
    $(el,"#gdesc").innerHTML = `<b>${GORDER.find(g => g[0] === kind)[1]}</b>${GDESC[kind]}`;
    const rows = two(kind) ? [[0,0],[0,1],[1,0],[1,1]] : [[0],[1]];
    $(el,"#gtt").innerHTML = `<div class="tbl"><table class="tt"><tr><th>A</th>${two(kind) ? "<th>B</th>" : ""}<th>Output</th></tr>${rows.map(r => `<tr class="${r[0] === A && (!two(kind) || r[1] === B) ? "hot" : ""}"><td>${r[0]}</td>${two(kind) ? `<td>${r[1]}</td>` : ""}<td><b>${two(kind) ? fn(r[0], r[1]) : fn(r[0])}</b></td></tr>`).join("")}</table></div>`;
    el.querySelectorAll("#gin .bit").forEach(b => b.onclick = () => { if (b.dataset.i === "A") A = 1 - A; else B = 1 - B; drawG(); });
  };
  el.querySelectorAll("#gk .chip").forEach(c => c.onclick = () => { kind = c.dataset.k; drawG(); });
  drawG();
  /* --- two-gate circuits --- */
  let ci = 0, V = {};
  const setVars = vals => { V = {}; CIRCS[ci].vars.forEach((n, i) => V[n] = vals[i]); };
  setVars([0,1,1]);
  const drawC = () => {
    const c = CIRCS[ci], x = c.inner.fn(V), y = c.outer.fn(V, x);
    el.querySelectorAll("#ck .chip").forEach(b => b.classList.toggle("on", +b.dataset.c === ci));
    $(el,"#cnote").textContent = "Circuit: Y = " + c.outer.label + "  (" + c.note + ")";
    $(el,"#cp").innerHTML = c.presets.map((p, i) => `<button class="chip" data-pi="${i}">${p[0]}</button>`).join("");
    $(el,"#cin").innerHTML = c.vars.map(n => `<div class="gi"><span>${n}</span><button class="bit ${V[n] ? "one" : ""}" data-v="${n}" aria-label="Toggle input ${n}">${V[n]}</button></div>`).join("");
    $(el,"#cst").innerHTML = `Inner gate:  ${c.inner.label} = <span class="g">${x}</span>${NL}Outer gate:  ${c.outer.label} = <span class="${y ? "g" : "r"}">${y}</span>   <span class="k">← Y</span>`;
    $(el,"#cmach").innerHTML = c.machine ? `<div class="machine ${y ? "run" : ""}">${y ? "⚙️ MACHINE RUNNING" : "⛔ MACHINE STOPPED"}</div>` : "";
    const rows = []; for (let n = 0; n < 8; n++) rows.push([n >> 2 & 1, n >> 1 & 1, n & 1]);
    $(el,"#ctt").innerHTML = `<div class="tbl"><table class="tt"><tr>${c.vars.map(n => `<th>${n}</th>`).join("")}<th>${c.inner.label}</th><th>Y</th></tr>${rows.map(r => { const v = {}; c.vars.forEach((n, i) => v[n] = r[i]); const xi = c.inner.fn(v), yi = c.outer.fn(v, xi), hot = c.vars.every((n, i) => V[n] === r[i]);
      return `<tr class="${hot ? "hot" : ""}">${r.map(b => `<td>${b}</td>`).join("")}<td>${xi}</td><td><b>${yi}</b></td></tr>`; }).join("")}</table></div>`;
    el.querySelectorAll("#cin .bit").forEach(b => b.onclick = () => { V[b.dataset.v] = 1 - V[b.dataset.v]; drawC(); });
    el.querySelectorAll("#cp .chip").forEach(b => b.onclick = () => { setVars(c.presets[+b.dataset.pi][1]); drawC(); });
  };
  el.querySelectorAll("#ck .chip").forEach(b => b.onclick = () => { ci = +b.dataset.c; setVars(CIRCS[ci].presets[0][1]); drawC(); });
  drawC();
}};
})();
