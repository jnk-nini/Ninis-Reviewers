/* Lesson 3 — Logic Gates, Resistor Fundamentals and Digital Circuit Foundations.
   Adds 4 topics + their notes. Loaded after notes.js (appends, never reorders, so saved progress stays valid).
   Wording inside "From the slides" boxes follows the PPT. */

/* ---- gate symbol drawing (also used by the Logic Gate lab) ---- */
window.GATE_SVG = function(kind, w){
  w = w || 72;
  const LABEL = {and:"AND", or:"OR", not:"NOT", nand:"NAND", nor:"NOR", xor:"XOR", xnor:"XNOR", buf:"Buffer"};
  const AND = "M10 4H26A16 16 0 0 1 26 36H10Z", OR = "M8 4Q28 4 44 20Q28 36 8 36Q18 20 8 4Z", TRI = "M10 4L38 20L10 36Z";
  const body = {and:AND, nand:AND, or:OR, nor:OR, xor:OR, xnor:OR, not:TRI, buf:TRI}[kind];
  const tip = {and:42, nand:42, or:44, nor:44, xor:44, xnor:44, not:38, buf:38}[kind];
  const bubble = ["nand","nor","xnor","not"].includes(kind);
  const one = kind === "not" || kind === "buf";
  const inX = (kind === "or" || kind === "nor" || kind === "xor" || kind === "xnor") ? 12 : 10;
  let g = `<path d="${body}" fill="var(--card)"/>`;
  if (kind === "xor" || kind === "xnor") g += `<path d="M3 4Q13 20 3 36"/>`;
  g += one ? `<path d="M0 20H10"/>` : `<path d="M0 12H${inX}M0 28H${inX}"/>`;
  if (bubble) g += `<circle cx="${tip + 3.5}" cy="20" r="3.5" fill="var(--card)"/><path d="M${tip + 7}.5 20H60"/>`;
  else g += `<path d="M${tip} 20H60"/>`;
  return `<svg class="gsym" viewBox="0 0 60 40" width="${w}" height="${Math.round(w * 2 / 3)}" role="img" aria-label="${LABEL[kind]} gate symbol"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${g}</g></svg>`;
};
const BS = String.fromCharCode(92);
const GS = k => window.GATE_SVG(k, 64);
const ROWS = [[0,0],[0,1],[1,0],[1,1]];
const FN = {AND:(a,b)=>a&b, OR:(a,b)=>a|b, NAND:(a,b)=>1-(a&b), NOR:(a,b)=>1-(a|b), XOR:(a,b)=>a^b, XNOR:(a,b)=>1-(a^b)};
const T2 = fn => `<div class="tbl"><table class="tt"><tr><th>A</th><th>B</th><th>Output</th></tr>${ROWS.map(([a,b]) => `<tr><td>${a}</td><td>${b}</td><td><b>${fn(a,b)}</b></td></tr>`).join("")}</table></div>`;
const TALL = `<div class="tbl"><table class="tt"><tr><th>A</th><th>B</th>${Object.keys(FN).map(k => `<th>${k}</th>`).join("")}</tr>${ROWS.map(([a,b]) => `<tr><td>${a}</td><td>${b}</td>${Object.values(FN).map(f => `<td>${f(a,b)}</td>`).join("")}</tr>`).join("")}</table></div>`;
const SW = (hex, name) => `<span class="sw" style="background:${hex}"></span>${name}`;

window.TOPICS.push(
  { id:"ohm",      icon:"⚡", name:"Voltage, Current & Ohm’s Law",  short:"Ohm’s Law",     slides:"Lesson 3 · Slides 3–6" },
  { id:"resistor", icon:"🎨", name:"Resistors & the Color Code",     short:"Resistors",     slides:"Lesson 3 · Slide 7" },
  { id:"digital",  icon:"💡", name:"Transistors & Digital Logic",    short:"Digital Logic", slides:"Lesson 3 · Slides 2 & 8" },
  { id:"gates",    icon:"🔀", name:"Logic Gates & Truth Tables",     short:"Logic Gates",   slides:"Lesson 3 · Slides 9–14" }
);

Object.assign(window.NOTES, {
/* ------------------------------------------------------------------ */
ohm:{
 big:"<b>Voltage</b> pushes, <b>current</b> flows, <b>resistance</b> holds back — and Ohm’s law, <b>V = I × R</b>, ties the three together.",
 lab:"ohm",
 sections:[
 {h:"The three basics (slide 3)", html:`
  <div class="box ppt"><b>From the slides</b><ul>
  <li><b>Voltage (V)</b> is the electrical pressure that pushes electrons through a circuit. – Arduino Power = 5V</li>
  <li><b>Current (A)</b> is the flow of electrons through a conductor. – Too much current can destroy components.</li>
  <li><b>Resistance (Ω)</b> opposes the flow of electrical current.</li></ul></div>
  <div class="tbl"><table><tr><th>Quantity</th><th>Letter in formulas</th><th>Unit</th><th>Water-pipe picture</th></tr>
  <tr><td><b>Voltage</b></td><td>V</td><td>volt (V)</td><td>the <b>pressure</b> pushing the water</td></tr>
  <tr><td><b>Current</b></td><td>I</td><td>ampere / amp (A)</td><td>how much water <b>flows</b> per second</td></tr>
  <tr><td><b>Resistance</b></td><td>R</td><td>ohm (Ω)</td><td>a <b>narrow part</b> of the pipe that squeezes the flow</td></tr></table></div>
  <p class="small muted">The slide’s cartoon shows exactly this: <b>Volt</b> pushes, <b>Amp</b> gets squeezed through the gap, and <b>Ohm</b> pulls back on the rope.</p>
  <div class="box hook"><b>Memory hook</b><b>“Volt pushes · Amp flows · Ohm resists.”</b></div>
  <div class="box trap"><b>Common trap</b>The <i>unit</i> of current is the amp (A), but the <i>letter</i> used in formulas is <b>I</b>. So you write <code>V = I × R</code>, not <code>V = A × R</code>.</div>`},
 {h:"Ohm’s law (slide 4)", html:`
  <p>The slide shows the <b>Ohm’s law triangle</b> with <b>V</b> on top and <b>I</b> and <b>R</b> underneath. Cover the one you want and read what’s left:</p>
  <div class="calc">        V
     ───────
      I  |  R

cover V → I × R      <span class="g">V = I · R</span>
cover R → V ÷ I      <span class="g">R = V ÷ I</span>
cover I → V ÷ R      <span class="g">I = V ÷ R</span></div>
  <div class="box ppt"><b>From the slides</b><b>V = I · R</b> &nbsp; · &nbsp; <b>R = V : I</b> &nbsp; · &nbsp; <b>I = V : R</b> (the colon “:” means ÷)</div>
  <h4>Go deeper: what the formula is telling you</h4>
  <ul><li>Same voltage, <b>more resistance → less current</b> (the pipe is narrower).</li>
  <li>Same resistance, <b>more voltage → more current</b> (more pressure).</li>
  <li><b>V is always the top of the fraction</b>: I = <b>V</b> ÷ R and R = <b>V</b> ÷ I.</li></ul>
  <div class="box tip"><b>Always convert first</b>The formulas want <b>amps</b>. 1 A = 1000 mA, so <b>20 mA = 0.02 A</b> and <b>0.05 A = 50 mA</b>.</div>`},
 {h:"Worked example: 5 V and 100 Ω (slide 5)", html:`
  <div class="box ppt"><b>From the slides</b>Given: Voltage = 5V · Resistance = 100Ω. <b>Find Current.</b> &nbsp; I = V/R</div>
  <div class="calc">I = V ÷ R
I = 5 ÷ 100
I = <span class="g">0.05 A</span>
I = <span class="g">50 mA</span>   <span class="k">← 0.05 × 1000</span></div>
  <h4>Same idea, other unknowns</h4>
  <div class="calc"><span class="k">Find R:</span>  V = 5 V, I = 0.02 A (20 mA)
R = V ÷ I = 5 ÷ 0.02 = <span class="g">250 Ω</span>

<span class="k">Find V:</span>  I = 0.05 A, R = 100 Ω
V = I × R = 0.05 × 100 = <span class="g">5 V</span></div>
  <div class="box tip"><b>Try it</b>Lab → Ohm’s Law → <b>Solve for any one</b> lets you type two values and get the third, with the steps shown.</div>`},
 {h:"Why too much current is a problem (slide 6)", html:`
  <div class="box ppt"><b>From the slides</b><i>I = 50 mA</i><br>Suppose a digital chip can only tolerate <b>20mA</b>. If a circuit allows <b>50mA</b>:<ul><li>The chip overheats.</li><li>The chip may fail permanently.</li></ul><b>Therefore, resistors are necessary.</b></div>
  <h4>Go deeper: choosing a safe resistor</h4>
  <p>To keep a 5 V circuit at or below 20 mA: <b>R = V ÷ I = 5 ÷ 0.02 = 250 Ω</b> (or more).</p>
  <div class="tbl"><table><tr><th>Resistor</th><th>Current (5 V)</th><th>Chip that tolerates 20 mA</th></tr>
  <tr><td>100 Ω</td><td>50 mA</td><td>❌ overheats, may fail permanently</td></tr>
  <tr><td>200 Ω</td><td>25 mA</td><td>❌ still over the limit</td></tr>
  <tr><td>250 Ω</td><td>20 mA</td><td>✅ right at the limit</td></tr>
  <tr><td>330 Ω</td><td>≈ 15.2 mA</td><td>✅ safe</td></tr>
  <tr><td>1,000 Ω</td><td>5 mA</td><td>✅ very safe (but weaker signal)</td></tr></table></div>
  <p class="small muted">This is the same math as the LED-on-pin-8 circuit in the Arduino lesson (Topic 4): the resistor’s job is to keep current under what the part can survive.</p>`},
 {h:"Traps & quick checks", html:`
  <div class="box trap"><b>Common traps</b><ul>
  <li>Forgetting to convert mA to A: 20 mA is <b>0.02 A</b>, not 20 A.</li>
  <li>Flipping the fraction: it is <b>I = V ÷ R</b>, never R ÷ V.</li>
  <li>Thinking more resistance means more current. It’s the opposite: more resistance → <b>less</b> current.</li>
  <li>Mixing up the three words: voltage = pressure, current = flow, resistance = opposition.</li></ul></div>
  <details class="check"><summary>V = 5 V, R = 250 Ω. Current in mA?</summary>I = 5 ÷ 250 = 0.02 A = <b>20 mA</b>.</details>
  <details class="check"><summary>I = 0.05 A and R = 100 Ω. Voltage?</summary>V = I × R = 0.05 × 100 = <b>5 V</b>.</details>
  <details class="check"><summary>Which quantity opposes the flow of electrical current?</summary><b>Resistance (Ω)</b>.</details>
  <details class="check"><summary>A chip tolerates 20 mA but gets 50 mA. What happens?</summary>It <b>overheats</b> and <b>may fail permanently</b> — so resistors are necessary.</details>`}
 ],
 sum:[
  "Voltage (V) = the electrical pressure that pushes electrons through a circuit. Arduino power = 5V.",
  "Current (A) = the flow of electrons through a conductor. Too much current can destroy components.",
  "Resistance (Ω) = opposes the flow of electrical current.",
  "Ohm’s law: V = I · R, R = V ÷ I, I = V ÷ R (V is on top of the triangle).",
  "Example: V = 5 V, R = 100 Ω → I = 5 ÷ 100 = 0.05 A = 50 mA.",
  "A chip that tolerates only 20 mA, given 50 mA, overheats and may fail permanently → resistors are necessary.",
  "Convert first: 1 A = 1000 mA (20 mA = 0.02 A)."
 ]
},
/* ------------------------------------------------------------------ */
resistor:{
 big:"A resistor is a <b>speed limiter for electricity</b>. It limits current flow so LEDs, chips and sensors survive — and its <b>colored bands</b> tell you its value.",
 lab:"color",
 sections:[
 {h:"What a resistor does (slide 7)", html:`
  <div class="box ppt"><b>From the slides</b><ul>
  <li>a <b>passive</b> electrical component designed to <b>limit current flow</b></li>
  <li>a <b>speed limiter for electricity</b></li></ul>
  <b>Without resistors:</b><ul><li>LEDs burn out</li><li>Chips overheat</li><li>Sensors produce unstable readings</li></ul>
  Before signals reach a CPU, they pass through electronic components including resistors.</div>
  <div class="flow"><div class="st"><b>Signal / power</b>from a source</div><div class="ar">→</div><div class="st"><b>Components</b>including resistors that limit current</div><div class="ar">→</div><div class="st"><b>CPU / chip</b>gets a safe, stable signal</div></div>
  <p class="small muted"><b>Go deeper:</b> “passive” means the part doesn’t add energy or amplify anything. It only <i>controls</i> what flows. The resistance it gives is measured in <b>ohms (Ω)</b>.</p>`},
 {h:"The color chart (slide 7)", html:`
  <p>Bands are read as: <b>digits</b> (1st, 2nd, 3rd), then the <b>multiplier</b>, then the <b>tolerance</b>. This is the chart from the slide:</p>
  <div class="tbl"><table><tr><th>Color</th><th>Digit (1st · 2nd · 3rd)</th><th>Multiplier</th><th>Tolerance</th></tr>
  <tr><td>${SW("#1b1b1b","Black")}</td><td>0</td><td>× 1</td><td>–</td></tr>
  <tr><td>${SW("#7a4a21","Brown")}</td><td>1</td><td>× 10 (10¹)</td><td><b>1%</b></td></tr>
  <tr><td>${SW("#d23a3a","Red")}</td><td>2</td><td>× 100 (10²)</td><td><b>2%</b></td></tr>
  <tr><td>${SW("#f08a24","Orange")}</td><td>3</td><td>× 1,000 (10³)</td><td>–</td></tr>
  <tr><td>${SW("#f2d03b","Yellow")}</td><td>4</td><td>× 10,000 (10⁴)</td><td>–</td></tr>
  <tr><td>${SW("#3a9a55","Green")}</td><td>5</td><td>× 100,000 (10⁵)</td><td>–</td></tr>
  <tr><td>${SW("#3a6fd1","Blue")}</td><td>6</td><td>× 1,000,000 (10⁶)</td><td>–</td></tr>
  <tr><td>${SW("#8a4fc2","Violet")}</td><td>7</td><td>× 10⁷</td><td>–</td></tr>
  <tr><td>${SW("#9a9a9a","Grey")}</td><td>8</td><td>× 10⁸</td><td>–</td></tr>
  <tr><td>${SW("#f7f7f7","White")}</td><td>9</td><td>× 10⁹</td><td>–</td></tr>
  <tr><td>${SW("#d4af37","Gold")}</td><td>–</td><td>× 0.1</td><td><b>5%</b></td></tr>
  <tr><td>${SW("#c0c0c0","Silver")}</td><td>–</td><td>× 0.01</td><td><b>10%</b></td></tr></table></div>
  <div class="box hook"><b>Memory hooks</b><b>Order of the digits 0–9:</b> Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White.<br><b>Rainbow in the middle:</b> Red · Orange · Yellow · Green · Blue · Violet = <b>2 · 3 · 4 · 5 · 6 · 7</b>. Then Grey = 8, White = 9.<br><b>Tolerance:</b> Brown 1 · Red 2 · Gold 5 · Silver 10.</div>`},
 {h:"How to read the bands (with the slide’s examples)", html:`
  <div class="calc">4-band:  digit  digit  × multiplier   ± tolerance
5-band:  digit  digit  digit  × multiplier   ± tolerance   <span class="k">(the chart on the slide has 3 digit bands)</span></div>
  <ol><li>Hold the resistor so the <b>tolerance band</b> (usually gold or silver, set apart from the others) is on the right.</li>
  <li>Read the <b>digits</b> from left to right and write them side by side.</li>
  <li><b>Multiply</b> by the multiplier band.</li>
  <li>Read the <b>tolerance</b> last.</li></ol>
  <h4>Slide example 1 — “120 ohm 5%”</h4>
  <div class="calc">Brown  Red  Brown  Gold
  1     2    ×10    5%
12 × 10 = <span class="g">120 Ω</span>, ±5%</div>
  <h4>Slide example 2 — “4.7k ohm 1%” (5-band)</h4>
  <div class="calc">Yellow  Violet  Black  Brown  Brown
   4       7       0     ×10     1%
470 × 10 = 4,700 Ω = <span class="g">4.7 kΩ</span>, ±1%</div>
  <h4>More practice</h4>
  <div class="calc">Red – Red – Brown – Gold       22 × 10      = <span class="g">220 Ω</span>   ±5%   <span class="k">← the classic LED resistor</span>
Brown – Black – Orange – Gold  10 × 1,000   = <span class="g">10 kΩ</span>  ±5%
Green – Blue – Brown – Gold    56 × 10      = <span class="g">560 Ω</span>   ±5%
Orange – Orange – Red – Silver 33 × 100     = <span class="g">3.3 kΩ</span> ±10%</div>
  <div class="box tip"><b>Shortcut (go deeper)</b>For the digit colors black → green → … the multiplier band is simply <b>how many zeros to add</b>. Brown = 1 zero, Red = 2 zeros, Orange = 3 zeros (so Orange ×1,000), Yellow = 4 zeros.</div>`},
 {h:"Units & tolerance", html:`
  <table><tr><th>Write</th><th>Means</th></tr>
  <tr><td>1 kΩ (kilo-ohm)</td><td>1,000 Ω</td></tr>
  <tr><td>4.7 kΩ</td><td>4,700 Ω</td></tr>
  <tr><td>1 MΩ (mega-ohm)</td><td>1,000,000 Ω</td></tr></table>
  <p><b>Tolerance</b> tells how far the real value may drift from the stated one. A <b>220 Ω ±5%</b> resistor is really between 220 × 0.95 = <b>209 Ω</b> and 220 × 1.05 = <b>231 Ω</b>.</p>
  <div class="box tip"><b>Try it</b>Lab → Resistor Colors lets you pick the bands and see the value, the tolerance range and the working.</div>`},
 {h:"Traps & quick checks", html:`
  <div class="box trap"><b>Common traps</b><ul>
  <li>Reading the multiplier as a digit: an <b>Orange multiplier</b> is × 1,000, not “× 3”.</li>
  <li>Reading from the wrong end. Put the gold/silver tolerance band on the right.</li>
  <li>Mixing up Gold (5%) and Silver (10%), or Brown (1%) and Red (2%).</li>
  <li>Forgetting units: 4.7k ohm means <b>4,700</b> Ω.</li></ul></div>
  <details class="check"><summary>What are the bands for a 120 Ω ±5% resistor?</summary>Brown (1) – Red (2) – Brown (×10) – Gold (5%).</details>
  <details class="check"><summary>Yellow – Violet – Black – Brown – Brown = ?</summary>4 · 7 · 0 → 470, × 10 = <b>4,700 Ω = 4.7 kΩ</b>, ±1%.</details>
  <details class="check"><summary>Name three things that go wrong without resistors.</summary>LEDs burn out · chips overheat · sensors produce unstable readings.</details>`}
 ],
 sum:[
  "Resistor: a passive electrical component designed to limit current flow – a speed limiter for electricity.",
  "Without resistors: LEDs burn out, chips overheat, sensors produce unstable readings.",
  "Before signals reach a CPU, they pass through electronic components including resistors.",
  "Bands: digits (1st, 2nd, 3rd), then multiplier, then tolerance.",
  "Digits 0–9: Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White.",
  "Multiplier: Black ×1, Brown ×10, Red ×100 … White ×10⁹; Gold ×0.1, Silver ×0.01.",
  "Tolerance: Brown 1%, Red 2%, Gold 5%, Silver 10%.",
  "Slide examples: 120 Ω 5% (Brown–Red–Brown–Gold); 4.7 kΩ 1% (Yellow–Violet–Black–Brown–Brown)."
 ]
},
/* ------------------------------------------------------------------ */
digital:{
 big:"Inside every computer are millions or billions of tiny <b>transistor</b> switches. They only need two states — <b>LOW (0)</b> and <b>HIGH (1)</b> — and that’s what makes a circuit <b>digital</b>.",
 lab:"gates",
 sections:[
 {h:"Transistors: the tiny switches (slide 2)", html:`
  <div class="box ppt"><b>From the slides</b><ul>
  <li>at the lowest level, every computer system operates using <b>millions or even billions of tiny electronic switches called transistors</b></li>
  <li>a <b>semiconductor device</b> used to <b>amplify or switch</b> electrical signals and power</li>
  <li>are organised into <b>logic gates</b>, which become the foundation of all digital circuits</li></ul></div>
  <div class="flow"><div class="st"><b>Transistors</b>tiny electronic switches</div><div class="ar">→</div><div class="st"><b>Logic gates</b>AND, OR, NOT …</div><div class="ar">→</div><div class="st"><b>Digital circuits</b>adders, memory, the ALU</div><div class="ar">→</div><div class="st"><b>Computer</b>CPU, Arduino</div></div>
  <p class="small muted"><b>Go deeper:</b> a transistor has two jobs: <b>amplify</b> a weak signal, or <b>switch</b> a signal on and off. In computers it is the switching job that matters — a switch that is ON or OFF is exactly one digital bit.</p>`},
 {h:"Analog vs digital (slide 8)", html:`
  <div class="box ppt"><b>From the slides — Digital Logic</b><b>Analog</b> – can have infinite values: 0.1V, 0.5V, 1.3V, 3.7V<br><b>Digital</b> –<table><tr><th>State</th><th>Value</th></tr><tr><td>LOW</td><td>0</td></tr><tr><td>HIGH</td><td>1</td></tr></table></div>
  <div class="tbl"><table><tr><th></th><th>Analog</th><th>Digital</th></tr>
  <tr><td><b>Possible values</b></td><td>infinite (any value in a range)</td><td>only two: LOW or HIGH</td></tr>
  <tr><td><b>Example</b></td><td>0.1 V, 0.5 V, 1.3 V, 3.7 V</td><td>0 (LOW) or 1 (HIGH)</td></tr>
  <tr><td><b>Picture</b></td><td>a dimmer knob</td><td>a light switch</td></tr></table></div>
  <div class="box hook"><b>Memory hook</b><b>Analog = “any number”. Digital = “just 0 or 1”.</b> LOW is <b>0</b>, HIGH is <b>1</b> — Low and Zero start with their own letters in the lesson table.</div>`},
 {h:"Connecting it to the Arduino", html:`
  <ul><li>In the Blink sketch, <code>digitalWrite(8, HIGH)</code> sets the pin to <b>HIGH (1)</b> = 5 V (LED on) and <code>LOW (0)</code> = 0 V (LED off).</li>
  <li><code>digitalRead(2)</code> returns <b>1</b> when the button is pressed (HIGH) or <b>0</b> (LOW).</li>
  <li>Because a digital signal is either LOW or HIGH, the chip can tell the two apart even if the voltage is a little off — that’s why computers are reliable.</li></ul>
  <p class="small muted"><b>Go deeper:</b> on a 5 V Arduino (Lesson 2), HIGH is about 5 V and LOW is about 0 V.</p>
  <div class="box tip"><b>Next</b>Logic gates take these 0s and 1s and combine them by fixed rules → see <b>Logic Gates &amp; Truth Tables</b>.</div>`},
 {h:"Traps & quick checks", html:`
  <div class="box trap"><b>Common traps</b><ul>
  <li>LOW = <b>0</b> and HIGH = <b>1</b> (not the other way around).</li>
  <li>“Analog” means <b>infinite values</b>, not “few”.</li>
  <li>A <b>transistor</b> is the switch; a <b>logic gate</b> is built <i>from</i> transistors.</li></ul></div>
  <details class="check"><summary>Is 3.7 V an analog or digital value?</summary>It’s an example of an <b>analog</b> value (the slide lists 0.1V, 0.5V, 1.3V, 3.7V).</details>
  <details class="check"><summary>What are transistors organised into?</summary><b>Logic gates</b>, the foundation of all digital circuits.</details>
  <details class="check"><summary>What value does HIGH have?</summary><b>1</b>. (LOW = 0.)</details>`}
 ],
 sum:[
  "At the lowest level, a computer runs on millions or billions of tiny electronic switches called transistors.",
  "A transistor is a semiconductor device used to amplify or switch electrical signals and power.",
  "Transistors are organised into logic gates, the foundation of all digital circuits.",
  "Analog can have infinite values (0.1V, 0.5V, 1.3V, 3.7V).",
  "Digital has two states: LOW = 0 and HIGH = 1."
 ]
},
/* ------------------------------------------------------------------ */
gates:{
 big:"A logic gate takes one or two inputs (0 or 1) and gives <b>one output</b> by a fixed rule. A <b>truth table</b> lists every possible input and the output it gives.",
 lab:"gates",
 sections:[
 {h:"Meet the 8 symbols (slides 9–12)", html:`
  <p>The slides show this symbol chart. Learn to <b>recognize the shape</b> — exams often show the symbol, not the name.</p>
  <div class="gates8">
   <figure>${GS("or")}<figcaption>OR</figcaption></figure><figure>${GS("nor")}<figcaption>NOR</figcaption></figure>
   <figure>${GS("and")}<figcaption>AND</figcaption></figure><figure>${GS("nand")}<figcaption>NAND</figcaption></figure>
   <figure>${GS("xor")}<figcaption>XOR</figcaption></figure><figure>${GS("xnor")}<figcaption>XNOR</figcaption></figure>
   <figure>${GS("buf")}<figcaption>Buffer</figcaption></figure><figure>${GS("not")}<figcaption>NOT</figcaption></figure></div>
  <div class="tbl"><table><tr><th>Gate</th><th>Rule (in words)</th><th>Shape clue</th></tr>
  <tr><td><b>AND</b></td><td>HIGH only when <b>ALL</b> inputs are HIGH</td><td>flat back, round front (“D” shape)</td></tr>
  <tr><td><b>OR</b></td><td>HIGH if <b>ANY</b> input is HIGH</td><td>curved back, pointed front</td></tr>
  <tr><td><b>NOT</b></td><td>reverses the input</td><td>triangle + bubble</td></tr>
  <tr><td><b>NAND</b></td><td>NOT + AND</td><td>AND shape + bubble</td></tr>
  <tr><td><b>NOR</b></td><td>NOT + OR</td><td>OR shape + bubble</td></tr>
  <tr><td><b>XOR</b></td><td>HIGH only when inputs are <b>different</b></td><td>OR shape + extra curved line at the back</td></tr>
  <tr><td><b>XNOR</b></td><td>HIGH when inputs are the <b>same</b></td><td>XOR shape + bubble</td></tr>
  <tr><td><b>Buffer</b></td><td>passes the input through unchanged</td><td>triangle, no bubble</td></tr></table></div>
  <div class="box hook"><b>Memory hook</b><b>The little circle (bubble) means “NOT”.</b> NAND = AND + bubble, NOR = OR + bubble, XNOR = XOR + bubble, and NOT = a Buffer + bubble.</div>`},
 {h:"AND and OR (slide 9)", html:`
  <div class="box ppt"><b>From the slides</b><b>AND Gate</b> – Output is HIGH only when ALL inputs are HIGH.<br><b>OR Gate</b> – Output is HIGH if ANY input is HIGH.</div>
  <div class="split"><div><h4>AND</h4>${T2(FN.AND)}</div><div><h4>OR</h4>${T2(FN.OR)}</div></div>
  <div class="box hook"><b>Memory hook</b><b>AND needs ALL · OR needs ANY.</b> Think of two switches in a row (AND: both must be on) versus two switches side by side (OR: either one works).</div>`},
 {h:"NOT and NAND (slide 10)", html:`
  <div class="box ppt"><b>From the slides</b><b>NOT Gate</b> – Reverses input value.<br><b>NAND Gate</b> – NOT + AND</div>
  <div class="split"><div><h4>NOT (one input)</h4><div class="tbl"><table class="tt"><tr><th>Input</th><th>Output</th></tr><tr><td>0</td><td><b>1</b></td></tr><tr><td>1</td><td><b>0</b></td></tr></table></div></div>
  <div><h4>NAND</h4>${T2(FN.NAND)}</div></div>
  <p><b>NAND is AND with the answer flipped:</b> it is LOW (0) only when <b>both</b> inputs are HIGH.</p>
  <div class="calc">A=1, B=1:  AND → 1,  then NOT → <span class="g">0</span>   <span class="k">(NAND)</span>
A=1, B=0:  AND → 0,  then NOT → <span class="g">1</span></div>
  <p class="small muted"><b>Go deeper — Buffer:</b> the symbol chart also shows a <b>Buffer</b>: a triangle with no bubble. It simply passes its input to the output unchanged (0 → 0, 1 → 1).</p>`},
 {h:"NOR and XOR (slide 11)", html:`
  <div class="box ppt"><b>From the slides</b><b>NOR Gate</b> (table on the slide)<br><b>XOR Gate</b> – Exclusive OR. Output is HIGH only when inputs are different.</div>
  <div class="split"><div><h4>NOR</h4>${T2(FN.NOR)}</div><div><h4>XOR</h4>${T2(FN.XOR)}</div></div>
  <ul><li><b>NOR = NOT + OR</b>: HIGH only when <b>both inputs are LOW</b> (the only 1 is in the 0,0 row).</li>
  <li><b>XOR</b> is like OR, except that when <b>both inputs are 1</b> it gives <b>0</b>.</li>
  <li><b>XNOR</b> (on the symbol chart) is XOR flipped: HIGH when the inputs are the <b>same</b> (exercise 10).</li></ul>
  <div class="split"><div><h4>XNOR</h4>${T2(FN.XNOR)}</div></div>`},
 {h:"All the gates side by side", html:`
  ${TALL}
  <div class="box hook"><b>Quick rules</b>
  <b>AND</b> – only 1,1 gives 1.<br><b>OR</b> – only 0,0 gives 0.<br><b>NAND</b> – only 1,1 gives 0.<br><b>NOR</b> – only 0,0 gives 1.<br><b>XOR</b> – 1 when different.<br><b>XNOR</b> – 1 when same.</div>
  <div class="box trap"><b>Common traps</b><ul>
  <li><b>OR vs XOR:</b> with inputs 1,1, OR gives <b>1</b> but XOR gives <b>0</b>.</li>
  <li><b>NOT has only one input</b>; the others have two.</li>
  <li><b>NAND vs AND</b> (and NOR vs OR) are exact opposites on every row.</li>
  <li>“Exclusive OR” does <b>not</b> mean “exclude zero” — it means “one <i>or</i> the other, <i>but not both</i>”.</li></ul></div>`},
 {h:"Reading a two-gate circuit (slide 12)", html:`
  <div class="box ppt"><b>From the slides — Exercise</b>
  <div class="calc">A ----${BS}
        AND ---- Y
B ----/</div>
  1. What is Y when A = 1 and B = 0? &nbsp; 2. What is Y when A = 1 and B = 1?
  <div class="calc">A ----${BS}
        OR ----${BS}
B ----/         ${BS}
                 AND ---- Y
C -----------/</div>
  3. Find Y when A=0, B=1, C=1. &nbsp; 4. Find Y when A=0, B=0, C=1. &nbsp; 5. Find Y when A=1, B=1, C=0.</div>
  <div class="box tip"><b>Method: solve the inner gate first</b>Work left to right. Find what comes out of the first gate (OR), then use that as an input to the next gate (AND). So <b>Y = (A OR B) AND C</b>.</div>
  <details class="check"><summary>1. A = 1, B = 0 (AND)</summary>1 AND 0 = <b>0</b></details>
  <details class="check"><summary>2. A = 1, B = 1 (AND)</summary>1 AND 1 = <b>1</b></details>
  <details class="check"><summary>3. A=0, B=1, C=1</summary>OR: 0 OR 1 = 1 → AND: 1 AND 1 = <b>1</b></details>
  <details class="check"><summary>4. A=0, B=0, C=1</summary>OR: 0 OR 0 = 0 → AND: 0 AND 1 = <b>0</b></details>
  <details class="check"><summary>5. A=1, B=1, C=0</summary>OR: 1 OR 1 = 1 → AND: 1 AND 0 = <b>0</b></details>`},
 {h:"Identify the gate (slide 13)", html:`
  <div class="box ppt"><b>From the slides — Exercise</b>Identify the logic gate based on the description.<br>6. Outputs 1 only when all inputs are 1. &nbsp; 7. Reverses the input signal. &nbsp; 8. Outputs 1 when at least one input is 1. &nbsp; 9. Outputs 1 when inputs are different. &nbsp; 10. Outputs 1 when inputs are the same.</div>
  <details class="check"><summary>6. Outputs 1 only when all inputs are 1</summary><b>AND</b></details>
  <details class="check"><summary>7. Reverses the input signal</summary><b>NOT</b></details>
  <details class="check"><summary>8. Outputs 1 when at least one input is 1</summary><b>OR</b></details>
  <details class="check"><summary>9. Outputs 1 when inputs are different</summary><b>XOR</b></details>
  <details class="check"><summary>10. Outputs 1 when inputs are the same</summary><b>XNOR</b></details>`},
 {h:"Challenge: the machine (slide 14)", html:`
  <div class="box ppt"><b>From the slides — Challenge Exercise</b>A machine starts only when the <b>Power Switch (P)</b> is ON and either <b>Button A</b> or <b>Button B</b> is pressed.<ul><li>Draw the logic gate circuit.</li><li>Construct the truth table.</li><li>Determine the output when: P=1, A=0, B=1 · P=1, A=0, B=0 · P=0, A=1, B=1</li></ul></div>
  <h4>1. Turn the sentence into gates</h4>
  <ul><li>“Power ON <b>and</b> (A <b>or</b> B)” → an <b>OR</b> gate for the buttons, then an <b>AND</b> gate with P.</li></ul>
  <div class="calc">A ----${BS}
        OR ----${BS}
B ----/         ${BS}
                 AND ---- Y  <span class="k">(machine starts when Y = 1)</span>
P -----------/        <span class="k">Y = P AND (A OR B)</span></div>
  <h4>2. Truth table</h4>
  <div class="tbl"><table class="tt"><tr><th>P</th><th>A</th><th>B</th><th>A OR B</th><th>Y = P AND (A OR B)</th></tr>
  ${[0,1].map(p => [[0,0],[0,1],[1,0],[1,1]].map(([a,b]) => `<tr><td>${p}</td><td>${a}</td><td>${b}</td><td>${a | b}</td><td><b>${p & (a | b)}</b></td></tr>`).join("")).join("")}</table></div>
  <h4>3. The three cases</h4>
  <div class="calc">P=1, A=0, B=1:  A OR B = 1,  1 AND 1 = <span class="g">1</span>   <span class="k">→ machine starts</span>
P=1, A=0, B=0:  A OR B = 0,  1 AND 0 = <span class="r">0</span>   <span class="k">→ stays off</span>
P=0, A=1, B=1:  A OR B = 1,  0 AND 1 = <span class="r">0</span>   <span class="k">→ stays off (power switch is off)</span></div>
  <div class="box tip"><b>Try it</b>Lab → Logic Gates → <b>Two-gate circuits</b> has this machine with switches you can flip.</div>`}
 ],
 sum:[
  "AND – output HIGH only when ALL inputs are HIGH.",
  "OR – output HIGH if ANY input is HIGH.",
  "NOT – reverses the input value (one input).",
  "NAND – NOT + AND: LOW only when both inputs are HIGH.",
  "NOR – NOT + OR: HIGH only when both inputs are LOW.",
  "XOR (exclusive OR) – output HIGH only when the inputs are different. XNOR – HIGH when they are the same.",
  "Symbol chart: OR, NOR, AND, NAND, XOR, XNOR, Buffer, NOT. A bubble on the output means NOT.",
  "Two-gate circuit: solve the inner gate first. (A OR B) AND C.",
  "Challenge: machine starts only when P is ON and A or B is pressed → Y = P AND (A OR B)."
 ]
}
});
