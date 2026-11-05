/* Mathematics 7 · Quarter 2 — study notes.
   Markup helpers (converted by app.js):
   **word**  = key word (hidden in Recall mode, tap to reveal)
   [[a/b]]   = stacked fraction
   {{3}}     = repeating digits (bar on top)
   %%VENN:x%% = Venn diagram (x = union | inter | compA | diff | sub | disjoint) */
(self.D=self.D||{});
D.TOPICS={
 r:{name:"Roots of Perfect Squares and Perfect Cubes",short:"Squares & Cubes",icon:"🟩",num:"I"},
 n:{name:"Real Numbers",short:"Real Numbers",icon:"🔢",num:"II"},
 u:{name:"Converting Units of Measure",short:"Units of Measure",icon:"📏",num:"III"},
 c:{name:"Volume of a Cylinder",short:"Cylinder",icon:"🥫",num:"IV"},
 p:{name:"Volume of a Pyramid",short:"Pyramid",icon:"🔺",num:"V"},
 s:{name:"Sets",short:"Sets",icon:"⭕",num:"VI"}
};

/* "Must-know in 60 seconds": the short list to memorize first. Also used by Blurt mode. */
D.MUST={
r:[
"A **square root** of a is a number that, multiplied by itself, gives a. √144 = 12 because 12 × 12 = 144.",
"A **cube root** of a is a number that, multiplied by itself three times, gives a. ∛125 = 5 because 5 × 5 × 5 = 125.",
"A **perfect square** is the square of an integer: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, …",
"A **perfect cube** is the cube of an integer: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000, …",
"The √ symbol gives the **principal (positive)** root. Every positive number has **two** square roots: ±.",
"A negative number has **no real** square root, but it has a **negative** cube root: ∛−27 = −3.",
"Parts of a radical: √ is the **radical sign**, the number inside is the **radicand**, the small number is the **index**.",
"Perfect squares never end in **2, 3, 7, or 8**.",
"To estimate √n, find the two **consecutive perfect squares** around n: 7 < √50 < 8."
],
n:[
"**Real numbers (ℝ)** = all rational and irrational numbers.",
"**Natural numbers (ℕ)**: 1, 2, 3, … (counting numbers, no zero).",
"**Whole numbers (W)**: 0, 1, 2, 3, … (natural numbers plus zero).",
"**Integers (ℤ)**: …, −2, −1, 0, 1, 2, … (whole numbers and their negatives).",
"**Rational numbers (ℚ)** can be written as [[a/b]], b ≠ 0: fractions, integers, terminating or repeating decimals.",
"**Irrational numbers** cannot be written as a fraction: their decimals are **non-terminating and non-repeating** (√2, π, √3).",
"Nesting: ℕ ⊂ W ⊂ ℤ ⊂ ℚ ⊂ ℝ. Irrational numbers sit **outside ℚ** but inside ℝ.",
"√ of a perfect square is **rational** (√16 = 4). √ of a non-perfect square is **irrational** (√15).",
"[[22/7]] and 3.14 are **rational approximations** of π. π itself is **irrational**."
],
u:[
"Metric: 1 m = **100 cm**, 1 km = **1,000 m**, 1 L = **1,000 mL**, 1 kg = **1,000 g**, 1 cm = **10 mm**.",
"English: 1 ft = **12 in**, 1 yd = **3 ft**, 1 mi = **5,280 ft**, 1 lb = **16 oz**, 1 gal = **4 qt**.",
"Metric prefixes, biggest to smallest: **kilo, hecto, deka, (base), deci, centi, milli**: “King Henry Died By Drinking Chocolate Milk.”",
"Big unit → small unit: **multiply**. Small unit → big unit: **divide**.",
"Across systems: 1 in = **2.54 cm**, 1 kg ≈ **2.2 lb**, 1 mi ≈ **1.61 km**, 1 m ≈ **3.28 ft**.",
"**Conversion factor**: a fraction equal to 1 (like [[12 in/1 ft]]) that cancels the unit you don't want.",
"Volume links: 1 cm³ = **1 mL**, 1,000 cm³ = **1 L**, 1 m³ = **1,000 L**."
],
c:[
"Volume of a cylinder: **V = πr²h**.",
"**r** = radius of the circular base, **h** = height, **πr²** = area of the base (B).",
"If the **diameter** is given, divide it by 2 first: r = d ÷ 2.",
"Use **π ≈ 3.14** or **[[22/7]]** (handy when r is a multiple of 7), or leave the answer **in terms of π**.",
"Volume is always in **cubic units**: cm³, m³, in³.",
"Example: r = 7 cm, h = 10 cm → V = π(7)²(10) = **490π ≈ 1,538.6 cm³**.",
"Doubling the radius makes the volume **4 times** bigger; doubling the height makes it **2 times** bigger.",
"Find the height: **h = V ÷ (πr²)**."
],
p:[
"Volume of a pyramid: **V = [[1/3]]Bh**.",
"**B** = area of the base, **h** = height (perpendicular distance from the **apex** to the base).",
"Square base: B = **s²**. Rectangle: B = **l × w**. Triangle: B = **[[1/2]] × base × height**.",
"A pyramid holds **one-third** of a prism with the same base and height.",
"Example: s = 6 cm, h = 9 cm → B = 36 cm², V = [[1/3]](36)(9) = **108 cm³**.",
"Use the true height, **not the slant height** (the height of a triangular face).",
"Find the height: **h = 3V ÷ B**."
],
s:[
"A **set** is a collection of **well-defined** and **distinct** objects called **elements**.",
"**Union (A ∪ B)**: all elements in A **or** in B, or in both.",
"**Intersection (A ∩ B)**: elements **common** to A **and** B.",
"**Complement (A′)**: elements in the **universal set** that are **not in A**.",
"**Difference (A − B)**: elements in A that are **not in B**.",
"**Empty (null) set**: { } or ∅, a set with **no elements**.",
"A set with n elements has **2ⁿ subsets** and **2ⁿ − 1 proper subsets**.",
"Counting rule: **n(A ∪ B) = n(A) + n(B) − n(A ∩ B)**."
]
};

D.NOTES={
/* ======================= I. ROOTS ======================= */
r:[
{h:"Squares and Square Roots",b:`
<ul>
<li>To <b>square</b> a number means to multiply it <b>by itself</b>: 7² = 7 × 7 = 49. We read 7² as “seven squared.”</li>
<li>A **perfect square** is a number that is the square of an **integer**. Examples: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100.</li>
<li>A **square root** of a number <i>a</i> is a number that, when multiplied **by itself**, gives <i>a</i>. Symbol: √a.</li>
</ul>
<div class="fx">√144 = 12 &nbsp;because&nbsp; 12 × 12 = 144</div>
<h4>Two square roots: the ± idea</h4>
<ul>
<li>Every positive number has **two** square roots, one positive and one negative. Both 5 × 5 and (−5) × (−5) equal 25.</li>
<li>The symbol √ alone means the **principal square root**, the **positive** one: √25 = 5.</li>
<li>−√25 = −5 (the negative root). ±√25 = ±5 (both roots).</li>
<li>√0 = **0**. Zero has only one square root.</li>
</ul>
<div class="trap"><b>⚠️ Exam trap:</b> √−16 is <b>not a real number</b>. No real number multiplied by itself gives a negative, because (+)(+) = + and (−)(−) = +. But −√16 = −4 is fine: the negative sign is <i>outside</i> the radical.</div>
<ul>
<li>Squaring and taking the square root are **inverse operations**. They undo each other: √(9²) = 9 and (√9)² = 9.</li>
</ul>`,
hook:"“Square” = 2 equal factors, like the 2 equal sides you multiply to get the area of a square. A 12-by-12 square has area 144, so √144 = 12.",
check:["What are the two square roots of 81? What is √81?","±9 are the square roots; √81 = 9 (principal root)."]},

{h:"Perfect Squares to Memorize (1² to 20²)",b:`
<p>Knowing these by heart makes every root question instant. Turn on <b>Recall mode</b> and say each answer before you tap it.</p>
<div class="grid sq">
<div>1² = **1**</div><div>2² = **4**</div><div>3² = **9**</div><div>4² = **16**</div><div>5² = **25**</div>
<div>6² = **36**</div><div>7² = **49**</div><div>8² = **64**</div><div>9² = **81**</div><div>10² = **100**</div>
<div>11² = **121**</div><div>12² = **144**</div><div>13² = **169**</div><div>14² = **196**</div><div>15² = **225**</div>
<div>16² = **256**</div><div>17² = **289**</div><div>18² = **324**</div><div>19² = **361**</div><div>20² = **400**</div>
</div>
<p class="small muted">Good to know too: 25² = 625, 30² = 900, 50² = 2,500, 100² = 10,000.</p>
<h4>Patterns that help</h4>
<ul>
<li>Perfect squares only end in **0, 1, 4, 5, 6, or 9**. A number ending in **2, 3, 7, or 8** is never a perfect square (so 2,027 and 538 are not).</li>
<li>Numbers ending in 5 square to a number ending in **25**: 15² = 225, 25² = 625, 35² = 1,225.</li>
<li>A perfect square ending in zeros has an **even number of zeros**: 100, 3,600, 10,000. So 1,000 is <i>not</i> a perfect square.</li>
<li>Squares of tens: 20² = 400, 30² = 900, 40² = 1,600. Just square the digit and add two zeros.</li>
</ul>`,
hook:"Last-digit rule: “2, 3, 7, 8: never great (never a square).”",
check:["Is 1,000 a perfect square? Is 3,600?","1,000 is not (odd number of zeros, 31² = 961 and 32² = 1,024). 3,600 is: 60² = 3,600."]},

{h:"Cubes and Cube Roots",b:`
<ul>
<li>To <b>cube</b> a number means to multiply it by itself **three times**: 4³ = 4 × 4 × 4 = 64. Read it as “four cubed.”</li>
<li>A **perfect cube** is the cube of an **integer**: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1,000.</li>
<li>A **cube root** of <i>a</i> is a number that, multiplied by itself three times, gives <i>a</i>. Symbol: ∛a.</li>
</ul>
<div class="fx">∛125 = 5 &nbsp;because&nbsp; 5 × 5 × 5 = 125</div>
<div class="grid cb">
<div>1³ = **1**</div><div>2³ = **8**</div><div>3³ = **27**</div><div>4³ = **64**</div><div>5³ = **125**</div>
<div>6³ = **216**</div><div>7³ = **343**</div><div>8³ = **512**</div><div>9³ = **729**</div><div>10³ = **1,000**</div>
</div>
<h4>Negative numbers and cube roots</h4>
<ul>
<li>Every real number has exactly **one** real cube root.</li>
<li>The cube root of a negative number is **negative**: ∛−27 = −3 because (−3)(−3)(−3) = −27.</li>
<li>Three negatives multiplied give a negative: (−)(−) = +, then (+)(−) = −.</li>
</ul>
<table class="t"><tr><th></th><th>Square root √</th><th>Cube root ∛</th></tr>
<tr><td>Equal factors</td><td>2</td><td>3</td></tr>
<tr><td>Positive number</td><td>two roots (±)</td><td>one root (positive)</td></tr>
<tr><td>Negative number</td><td><b>not real</b></td><td>one root (negative)</td></tr>
<tr><td>Example</td><td>√64 = 8</td><td>∛64 = 4</td></tr></table>
<div class="trap"><b>⚠️ Exam trap:</b> ∛27 is <b>3</b>, not 9. You are looking for the number used 3 times, not 27 ÷ 3.</div>`,
hook:"Cube = a box. A box has length, width and height: 3 equal factors. A 5 × 5 × 5 box holds 125 small cubes.",
check:["What is ∛−64? What is √−64?","∛−64 = −4. √−64 is not a real number."]},

{h:"Parts of a Radical",b:`
<div class="fx big">∛125 → index 3 · radical sign ∛ · radicand 125</div>
<ul>
<li>**Radical sign** (√): the symbol that shows we are taking a root.</li>
<li>**Radicand**: the number or expression **under** the radical sign. In √49, the radicand is 49.</li>
<li>**Index**: the small number in the “V” of the radical. It tells **which root** to take. Index 3 → cube root.</li>
<li>If **no index** is written, the index is **2** (square root).</li>
<li>A **radical** is the whole expression, like √49 or ∛8.</li>
</ul>`,
hook:"Radi-CAND is the CANDy inside the wrapper (the radical sign).",
check:["In ⁴√81, name the index and the radicand.","Index = 4, radicand = 81 (⁴√81 = 3, since 3⁴ = 81)."]},

{h:"Roots of Fractions and Decimals",b:`
<h4>Fractions: take the root of the top and bottom separately</h4>
<div class="fx">√([[9/16]]) = [[√9/√16]] = [[3/4]] &nbsp;&nbsp;·&nbsp;&nbsp; ∛([[8/27]]) = [[2/3]] &nbsp;&nbsp;·&nbsp;&nbsp; √([[25/49]]) = [[5/7]]</div>
<h4>Decimals: count the decimal places</h4>
<ul>
<li>√0.25 = **0.5** because 0.5 × 0.5 = 0.25.</li>
<li>√0.09 = **0.3**, √0.0004 = **0.02**, √1.44 = **1.2**, √0.16 = **0.4**.</li>
<li>For square roots, the radicand has **twice** as many decimal places as the root: 0.09 has 2 places → the root 0.3 has 1.</li>
<li>For cube roots, the radicand has **three times** as many: ∛0.008 = **0.2**, ∛0.027 = **0.3**, ∛0.125 = **0.5**.</li>
</ul>
<div class="trap"><b>⚠️ Exam trap:</b> √0.9 is <b>not</b> 0.3, because 0.3 × 0.3 = 0.09. And √0.4 is not 0.2. Always check by multiplying back.</div>
<p>Tip: change a decimal to a fraction if stuck. 0.36 = [[36/100]] → √ = [[6/10]] = 0.6.</p>`,
hook:"Check every root by multiplying it back. If it gives the radicand, you're right.",
check:["Find √0.81 and ∛0.064.","√0.81 = 0.9 and ∛0.064 = 0.4."]},

{h:"Finding Roots by Prime Factorization",b:`
<p>Use this for bigger numbers you haven't memorized.</p>
<ol>
<li>Write the radicand as a product of **prime factors**.</li>
<li>Square root: group the factors into **pairs**. Cube root: group them into **triples**.</li>
<li>Take **one** factor from each group and multiply.</li>
</ol>
<div class="ex"><b>√576</b><br>576 = 2 × 2 × 2 × 2 × 2 × 2 × 3 × 3 → pairs: (2·2)(2·2)(2·2)(3·3)<br>Take one from each pair: 2 × 2 × 2 × 3 = <b>24</b>. Check: 24 × 24 = 576 ✓</div>
<div class="ex"><b>∛1,728</b><br>1,728 = (2·2·2)(2·2·2)(3·3·3) → one from each triple: 2 × 2 × 3 = <b>12</b>. Check: 12³ = 1,728 ✓</div>
<ul>
<li>If a factor is **left over** (cannot be paired), the number is **not a perfect square**. 72 = (2·2)(3·3)·2 → the extra 2 means 72 is not a perfect square.</li>
</ul>
<h4>Last digit of a cube root</h4>
<table class="t"><tr><th>Cube ends in</th><td>1</td><td>8</td><td>7</td><td>4</td><td>5</td><td>6</td><td>3</td><td>2</td><td>9</td><td>0</td></tr>
<tr><th>Root ends in</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>0</td></tr></table>
<p class="small muted">Only 2↔8 and 3↔7 swap. Example: ∛2,197 ends in 7 → root ends in 3; 10³ = 1,000 &lt; 2,197 &lt; 8,000 = 20³, so the root is <b>13</b>.</p>`,
hook:"Square root = partners (pairs). Cube root = teams of three.",
check:["Use prime factors to find √324.","324 = (2·2)(3·3)(3·3) → 2 × 3 × 3 = 18."]},

{h:"Estimating Square Roots of Non-Perfect Squares",b:`
<ul>
<li>If the radicand is **not a perfect square**, its root is a non-ending decimal (an **irrational** number). We can **estimate** it.</li>
<li>Step 1: find the two **consecutive perfect squares** around the number.</li>
<li>Step 2: the root lies **between** their square roots.</li>
<li>Step 3: check which one it is **closer** to.</li>
</ul>
<div class="ex"><b>Estimate √50</b><br>49 &lt; 50 &lt; 64 → √49 &lt; √50 &lt; √64 → <b>7 &lt; √50 &lt; 8</b><br>50 is very close to 49, so √50 ≈ 7.1 (actual: 7.07…)</div>
<div class="ex"><b>Estimate √20</b><br>16 &lt; 20 &lt; 25 → 4 &lt; √20 &lt; 5. 20 is a bit closer to 16 → √20 ≈ 4.5 (actual: 4.47…)</div>
<p>Useful values: √2 ≈ **1.414**, √3 ≈ **1.732**, √5 ≈ **2.236**, √10 ≈ **3.162**.</p>
<p>Same idea for cube roots: 27 &lt; 30 &lt; 64 → 3 &lt; ∛30 &lt; 4.</p>`,
hook:"Sandwich it: find the perfect squares just below and just above.",
check:["Between which two consecutive integers is √90?","81 < 90 < 100, so 9 < √90 < 10 (closer to 9: about 9.49)."]}
],

/* ======================= II. REAL NUMBERS ======================= */
n:[
{h:"The Real Number System",b:`
<p>All the numbers we use for measuring and counting are **real numbers (ℝ)**. They are grouped into sets that fit inside each other like nesting boxes.</p>
<div class="nest" aria-label="Nesting of the sets of real numbers">
<div class="nb r"><b>Real Numbers ℝ</b>
 <div class="nrow">
 <div class="nb q"><b>Rational ℚ</b><small>fractions, terminating or repeating decimals</small>
  <div class="nb z"><b>Integers ℤ</b><small>…, −2, −1, 0, 1, 2, …</small>
   <div class="nb w"><b>Whole W</b><small>0, 1, 2, 3, …</small>
    <div class="nb nn"><b>Natural ℕ</b><small>1, 2, 3, …</small></div>
   </div>
  </div>
 </div>
 <div class="nb ir"><b>Irrational</b><small>non-terminating, non-repeating: √2, π, √3</small></div>
 </div>
</div></div>
<table class="t">
<tr><th>Set</th><th>Members</th><th>Remember</th></tr>
<tr><td>**Natural numbers** ℕ</td><td>1, 2, 3, 4, …</td><td>Counting numbers. **No zero.**</td></tr>
<tr><td>**Whole numbers** W</td><td>0, 1, 2, 3, …</td><td>Natural numbers **plus zero**.</td></tr>
<tr><td>**Integers** ℤ</td><td>…, −3, −2, −1, 0, 1, 2, 3, …</td><td>Whole numbers **and their negatives**.</td></tr>
<tr><td>**Rational numbers** ℚ</td><td>[[3/4]], −5, 0.25, 0.{{3}}</td><td>Can be written as [[a/b]], **b ≠ 0**.</td></tr>
<tr><td>**Irrational numbers**</td><td>√2, √3, π</td><td>**Cannot** be written as a fraction.</td></tr>
<tr><td>**Real numbers** ℝ</td><td>all of the above</td><td>Rational **+** irrational.</td></tr></table>
<ul>
<li>Order of nesting: **ℕ ⊂ W ⊂ ℤ ⊂ ℚ ⊂ ℝ**.</li>
<li>Rational and irrational numbers do **not overlap**. A number is one or the other, never both.</li>
<li>A number belongs to **every bigger set** that contains its set. 5 is natural, whole, an integer, rational and real.</li>
</ul>`,
hook:"“No Wonder Zebras Run Quickly… Really!”: ℕ ⊂ W ⊂ ℤ ⊂ ℚ ⊂ ℝ (smallest to biggest). The letter Z comes from the German word Zahlen (numbers); Q from quotient.",
check:["Is 0 a natural number? A whole number? An integer?","0 is not natural, but it is whole, an integer, rational and real."]},

{h:"Rational Numbers",b:`
<p>A **rational number** can be written as a quotient (fraction) [[a/b]] where a and b are **integers** and **b ≠ 0**. The word comes from “ratio.”</p>
<table class="t"><tr><th>Kind</th><th>Example</th><th>As a fraction</th></tr>
<tr><td>Integers</td><td>−5, 0, 7</td><td>[[−5/1]], [[0/1]], [[7/1]]</td></tr>
<tr><td>Fractions / mixed numbers</td><td>[[3/4]], 2[[1/2]]</td><td>[[3/4]], [[5/2]]</td></tr>
<tr><td>**Terminating** decimals (they stop)</td><td>0.75, 1.2</td><td>[[3/4]], [[6/5]]</td></tr>
<tr><td>**Repeating** decimals (a pattern repeats forever)</td><td>0.333… = 0.{{3}}, 0.1666… = 0.1{{6}}</td><td>[[1/3]], [[1/6]]</td></tr>
<tr><td>Roots of perfect squares/cubes</td><td>√16, ∛−8</td><td>[[4/1]], [[−2/1]]</td></tr></table>
<ul>
<li>A bar over digits means they **repeat**: 0.{{45}} = 0.454545…</li>
<li>Every integer is rational, but **not every rational number is an integer** ([[1/2]] is not).</li>
</ul>
<h4>Changing a repeating decimal to a fraction</h4>
<div class="ex">Let x = 0.444… → 10x = 4.444… → subtract: 10x − x = 4 → 9x = 4 → <b>x = [[4/9]]</b></div>
<p>Shortcut: one repeating digit → put it over **9** (0.{{7}} = [[7/9]]). Two repeating digits → over **99** (0.{{27}} = [[27/99]] = [[3/11]]).</p>
<h4>Changing a fraction to a decimal</h4>
<p>Divide the numerator by the denominator: [[3/8]] = 3 ÷ 8 = 0.375 (terminating), [[2/3]] = 0.666… (repeating). Either way, it's rational.</p>`,
hook:"RATIOnal = can be a RATIO (fraction). If the decimal stops or repeats, it's rational.",
check:["Is 0.121212… rational or irrational? Why?","Rational: the digits 12 repeat, so it equals 12/99 = 4/33."]},

{h:"Irrational Numbers",b:`
<p>An **irrational number** **cannot** be written as [[a/b]]. Its decimal form is **non-terminating** (never ends) **and non-repeating** (no repeating block).</p>
<table class="t"><tr><th>Kind</th><th>Examples</th></tr>
<tr><td>Square roots of **non-perfect squares**</td><td>√2 = 1.41421…, √3 = 1.73205…, √5, √8, √15</td></tr>
<tr><td>Cube roots of **non-perfect cubes**</td><td>∛2, ∛10</td></tr>
<tr><td>Special constants</td><td>**π** = 3.14159265…, <i>e</i> = 2.71828…, golden ratio φ = 1.61803…</td></tr>
<tr><td>Decimals with a growing pattern (never the same block)</td><td>0.1010010001…, 0.123456789101112…</td></tr></table>
<div class="trap"><b>⚠️ Exam traps</b>
<ul>
<li>**π is irrational**, but [[22/7]] and **3.14** are **rational** (they are only approximations of π).</li>
<li>√(**[[4/9]]**) = [[2/3]] is **rational**: both 4 and 9 are perfect squares.</li>
<li>√16 = 4 is rational; only roots of <i>non</i>-perfect squares are irrational.</li>
<li>0.1010010001… is irrational (the pattern grows), but 0.101010… is rational (10 repeats).</li>
<li>√−4 is **not a real number** at all, so it is neither rational nor irrational.</li>
</ul></div>`,
hook:"IR-rational = NOT a ratio. “Never ends, never repeats.”",
check:["Classify: √49, √50, 22/7, π.","√49 = 7 rational; √50 irrational; 22/7 rational; π irrational."]},

{h:"Classifying Real Numbers",b:`
<p>Ask the questions in this order: Is it under a root? Simplify first. Then: counting number? zero? negative integer? fraction / decimal that stops or repeats? Or never ends and never repeats?</p>
<div class="tblwrap"><table class="t c">
<tr><th>Number</th><th>ℕ</th><th>W</th><th>ℤ</th><th>ℚ</th><th>Irr</th><th>ℝ</th></tr>
<tr><td>7</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td><td></td><td>✓</td></tr>
<tr><td>0</td><td></td><td>✓</td><td>✓</td><td>✓</td><td></td><td>✓</td></tr>
<tr><td>−4</td><td></td><td></td><td>✓</td><td>✓</td><td></td><td>✓</td></tr>
<tr><td>[[2/3]]</td><td></td><td></td><td></td><td>✓</td><td></td><td>✓</td></tr>
<tr><td>0.25</td><td></td><td></td><td></td><td>✓</td><td></td><td>✓</td></tr>
<tr><td>0.{{6}}</td><td></td><td></td><td></td><td>✓</td><td></td><td>✓</td></tr>
<tr><td>√9 = 3</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td><td></td><td>✓</td></tr>
<tr><td>−√16 = −4</td><td></td><td></td><td>✓</td><td>✓</td><td></td><td>✓</td></tr>
<tr><td>√7</td><td></td><td></td><td></td><td></td><td>✓</td><td>✓</td></tr>
<tr><td>π</td><td></td><td></td><td></td><td></td><td>✓</td><td>✓</td></tr>
</table></div>
<ul>
<li>When asked for the **smallest set** a number belongs to, choose the most specific one: 3 → natural numbers; 0 → whole numbers; −4 → integers; 0.25 → rational numbers.</li>
<li>**Every** number in the table is real.</li>
</ul>`,
hook:"Simplify first, classify second: √9 looks irrational but it is just 3.",
check:["What is the smallest set that −√25 belongs to?","−√25 = −5 → integers (also rational and real)."]},

{h:"Real Numbers on the Number Line",b:`
<ul>
<li>Every real number matches **exactly one point** on the number line, and every point is a real number.</li>
<li>To place or compare numbers, change them to **decimals**: √2 ≈ 1.41, √3 ≈ 1.73, √5 ≈ 2.24, π ≈ 3.14.</li>
<li>Numbers to the **right** are **greater**.</li>
</ul>
<div class="ex"><b>Arrange from least to greatest:</b> π, √10, 3.1, [[16/5]]<br>π ≈ 3.1416, √10 ≈ 3.162, 3.1, [[16/5]] = 3.2 → <b>3.1, π, √10, [[16/5]]</b></div>
<ul>
<li>Between any two real numbers there are **infinitely many** other real numbers (the number line has no gaps).</li>
</ul>`,
hook:"Turn everything into decimals, then line them up.",
check:["Which is greater: √8 or 2.9?","√8 ≈ 2.83, so 2.9 is greater."]}
],

/* ======================= III. UNITS ======================= */
u:[
{h:"Two Systems of Measurement",b:`
<table class="t"><tr><th></th><th>Metric system (SI)</th><th>English system</th></tr>
<tr><td>Based on</td><td>powers of **10**</td><td>older, non-decimal units</td></tr>
<tr><td>Length</td><td>millimeter, centimeter, **meter**, kilometer</td><td>inch, foot, yard, mile</td></tr>
<tr><td>Mass / weight</td><td>milligram, **gram**, kilogram</td><td>ounce, pound, ton</td></tr>
<tr><td>Capacity</td><td>milliliter, **liter**</td><td>cup, pint, quart, gallon</td></tr></table>
<ul>
<li>The metric system is also called the **International System of Units (SI)**. Its base units for length, mass and capacity are the **meter**, **gram** (the SI base unit is the kilogram) and **liter**.</li>
<li>The Philippines officially uses the **metric system**, but English units are still common: height in feet and inches, TV screens in inches, lumber in feet.</li>
</ul>`,
hook:"Metric = Multiply by tens. English = odd numbers (12, 3, 5,280, 16).",
check:["Which system uses powers of 10?","The metric system (SI)."]},

{h:"Metric Prefixes and Common Conversions",b:`
<div class="ladder">
<div><b>kilo</b><small>k · 1,000</small></div><div><b>hecto</b><small>h · 100</small></div><div><b>deka</b><small>da · 10</small></div><div class="base"><b>base</b><small>m · g · L</small></div><div><b>deci</b><small>d · 0.1</small></div><div><b>centi</b><small>c · 0.01</small></div><div><b>milli</b><small>m · 0.001</small></div>
</div>
<p class="center small"><b>K</b>ing <b>H</b>enry <b>D</b>ied <b>B</b>y <b>D</b>rinking <b>C</b>hocolate <b>M</b>ilk</p>
<ul>
<li>Each step to the **right** (smaller unit) → **× 10**. Each step to the **left** (bigger unit) → **÷ 10**.</li>
<li>km → m is 3 steps right → × 1,000. mm → cm is 1 step left → ÷ 10.</li>
</ul>
<table class="t"><tr><th>Length</th><th>Mass</th><th>Capacity</th></tr>
<tr><td>1 cm = **10 mm**</td><td>1 g = **1,000 mg**</td><td>1 L = **1,000 mL**</td></tr>
<tr><td>1 m = **100 cm**</td><td>1 kg = **1,000 g**</td><td>1 kL = **1,000 L**</td></tr>
<tr><td>1 m = **1,000 mm**</td><td>1 metric ton (t) = **1,000 kg**</td><td>1 L = 100 cL</td></tr>
<tr><td>1 km = **1,000 m**</td><td></td><td></td></tr></table>`,
hook:"King Henry Died By Drinking Chocolate Milk: kilo, hecto, deka, BASE, deci, centi, milli.",
check:["How many centimeters are in 1 kilometer?","1 km = 1,000 m = 100,000 cm."]},

{h:"The Conversion Rule",b:`
<div class="fx">Big unit → small unit: <b>MULTIPLY</b> &nbsp;·&nbsp; Small unit → big unit: <b>DIVIDE</b></div>
<ul>
<li>Why? You need **more** of a small unit to measure the same thing, so the number gets **bigger** (multiply).</li>
<li>Going to a bigger unit, you need **fewer** of them, so the number gets **smaller** (divide).</li>
</ul>
<div class="ex">3.5 km → m: big to small → 3.5 × 1,000 = <b>3,500 m</b><br>
750 mL → L: small to big → 750 ÷ 1,000 = <b>0.75 L</b><br>
2,500 g → kg: small to big → 2,500 ÷ 1,000 = <b>2.5 kg</b><br>
4.2 m → cm: big to small → 4.2 × 100 = <b>420 cm</b></div>
<p>Shortcut for powers of 10: move the decimal point. × 1,000 → move **3 places right**; ÷ 100 → move **2 places left**.</p>
<div class="trap"><b>⚠️ Check your answer:</b> if you went to a smaller unit, the number must get bigger. 5 m = 500 cm (not 0.05 cm).</div>`,
hook:"Small unit, BIG number. Big unit, small number.",
check:["Convert 85 cm to meters.","Small → big: divide by 100 → 0.85 m."]},

{h:"English Units",b:`
<table class="t"><tr><th>Length</th><th>Weight</th><th>Capacity</th></tr>
<tr><td>1 ft = **12 in**</td><td>1 lb = **16 oz**</td><td>1 cup (c) = 8 fluid oz</td></tr>
<tr><td>1 yd = **3 ft** = **36 in**</td><td>1 ton = **2,000 lb**</td><td>1 pint (pt) = **2 c**</td></tr>
<tr><td>1 mi = **5,280 ft**</td><td></td><td>1 quart (qt) = **2 pt**</td></tr>
<tr><td>1 mi = **1,760 yd**</td><td></td><td>1 gallon (gal) = **4 qt**</td></tr></table>
<div class="ex">5 ft → in: big to small → 5 × 12 = <b>60 in</b><br>
48 in → ft: small to big → 48 ÷ 12 = <b>4 ft</b><br>
2 mi → ft: 2 × 5,280 = <b>10,560 ft</b><br>
15 ft → yd: 15 ÷ 3 = <b>5 yd</b><br>
5 ft 4 in → in: (5 × 12) + 4 = <b>64 in</b></div>`,
hook:"Gallon → 4 quarts → each quart is 2 pints → each pint is 2 cups. (A gallon holds 16 cups.)",
check:["How many inches are in 2 yards?","2 yd = 6 ft = 72 in (or 2 × 36 = 72)."]},

{h:"Converting Between Metric and English",b:`
<table class="t"><tr><th>Length</th><th>Mass</th><th>Capacity</th></tr>
<tr><td>1 in = **2.54 cm** (exact)</td><td>1 kg ≈ **2.2 lb**</td><td>1 L ≈ 1.06 qt</td></tr>
<tr><td>1 ft ≈ **30.48 cm**</td><td>1 lb ≈ **0.454 kg** (454 g)</td><td>1 gal ≈ **3.785 L**</td></tr>
<tr><td>1 m ≈ **3.28 ft** ≈ 39.37 in</td><td>1 oz ≈ 28.35 g</td><td></td></tr>
<tr><td>1 yd ≈ 0.914 m</td><td></td><td></td></tr>
<tr><td>1 mi ≈ **1.609 km** · 1 km ≈ 0.621 mi</td><td></td><td></td></tr></table>
<div class="ex"><b>A student is 5 ft 4 in tall. Height in cm?</b><br>5 ft 4 in = 64 in → 64 × 2.54 = <b>162.56 cm</b></div>
<div class="ex"><b>A 50-kg sack in pounds?</b> 50 × 2.2 = <b>110 lb</b></div>
<div class="ex"><b>A 10-km run in miles?</b> 10 ÷ 1.609 ≈ <b>6.2 mi</b></div>`,
hook:"1 inch = 2.54 cm: the one exact link between the two systems. Look at a ruler: the inch side and cm side.",
check:["Convert 20 inches to centimeters.","20 × 2.54 = 50.8 cm."]},

{h:"Conversion Factors (Dimensional Analysis)",b:`
<ul>
<li>A **conversion factor** is a fraction whose top and bottom are **equal amounts** in different units, so it equals **1**: [[12 in/1 ft]] or [[1 ft/12 in]].</li>
<li>Multiplying by 1 doesn't change the amount, only the **unit**.</li>
<li>Put the unit you want to **get rid of** in the **denominator** so it **cancels**.</li>
</ul>
<div class="ex">90 in × [[1 ft/12 in]] = [[90/12]] ft = <b>7.5 ft</b></div>
<div class="ex"><b>Multi-step:</b> 3 yd → in<br>3 yd × [[3 ft/1 yd]] × [[12 in/1 ft]] = <b>108 in</b></div>
<div class="ex"><b>Speed:</b> 72 km/h → m/s<br>72 [[km/h]] × [[1,000 m/1 km]] × [[1 h/3,600 s]] = [[72,000/3,600]] = <b>20 m/s</b></div>`,
hook:"Unwanted unit goes DOWN (in the denominator) so it cancels OUT.",
check:["Write the conversion factor to change kilograms to grams.","1,000 g / 1 kg."]},

{h:"Area and Volume Units",b:`
<p>Square and cubic units convert by the **square** or the **cube** of the length factor.</p>
<table class="t"><tr><th>Area</th><th>Volume</th></tr>
<tr><td>1 cm² = 100 mm² (10 × 10)</td><td>1 cm³ = 1,000 mm³ (10 × 10 × 10)</td></tr>
<tr><td>1 m² = **10,000 cm²** (100 × 100)</td><td>1 m³ = **1,000,000 cm³**</td></tr>
<tr><td>1 ft² = 144 in² (12 × 12)</td><td>1 ft³ = 1,728 in³</td></tr></table>
<h4>Volume ↔ capacity (very useful for cylinder problems)</h4>
<div class="fx">1 cm³ = 1 mL &nbsp;·&nbsp; 1,000 cm³ = 1 L &nbsp;·&nbsp; 1 m³ = 1,000 L</div>
<div class="trap"><b>⚠️ Exam trap:</b> 1 m² is <b>not</b> 100 cm². A 1 m × 1 m square is 100 cm × 100 cm = 10,000 cm².</div>`,
hook:"Length factor → square it for area, cube it for volume.",
check:["A tank holds 2.5 m³ of water. How many liters is that?","2.5 × 1,000 = 2,500 L."]},

{h:"Also Good to Know: Time and Temperature",b:`
<ul>
<li>60 seconds = 1 minute · 60 minutes = 1 hour · 24 hours = 1 day · 7 days = 1 week.</li>
<li>Celsius to Fahrenheit: **°F = [[9/5]]°C + 32**. Fahrenheit to Celsius: **°C = [[5/9]](°F − 32)**.</li>
<li>Water freezes at 0°C = 32°F and boils at 100°C = 212°F. Normal body temperature: 37°C ≈ 98.6°F.</li>
</ul>
<div class="ex">30°C → [[9/5]](30) + 32 = 54 + 32 = <b>86°F</b></div>`,
hook:"Freezing 0 / 32, boiling 100 / 212.",
check:["How many seconds are in 1 hour?","60 × 60 = 3,600 seconds."]}
],

/* ======================= IV. CYLINDER ======================= */
c:[
{h:"What Is a Cylinder?",b:`
<div class="fig"><svg viewBox="0 0 220 170" role="img" aria-label="Cylinder with radius r and height h"><g fill="none" stroke="currentColor" stroke-width="2.2"><ellipse cx="90" cy="30" rx="60" ry="16" class="fillc"/><path d="M30 30v108M150 30v108" /><path d="M30 138a60 16 0 0 0 120 0"/><path d="M30 138a60 16 0 0 1 120 0" stroke-dasharray="5 5" opacity=".6"/><path d="M90 138h60" stroke-dasharray="4 3"/><path d="M178 30v108M172 30h12M172 138h12"/></g><circle cx="90" cy="138" r="3.5" fill="currentColor"/><text x="114" y="132" font-size="16" font-style="italic" fill="currentColor">r</text><text x="186" y="90" font-size="18" font-style="italic" fill="currentColor">h</text></svg></div>
<ul>
<li>A **cylinder** is a solid with **two congruent, parallel circular bases** joined by a **curved surface**.</li>
<li>**Radius (r)**: distance from the center of a base to its edge.</li>
<li>**Diameter (d)**: distance across the circle through the center. **d = 2r**, so **r = d ÷ 2**.</li>
<li>**Height (h)**: the **perpendicular** distance between the two bases.</li>
<li>Real life: canned goods, drinking glasses, water tanks, drums, pipes, candles.</li>
</ul>`,
hook:"Think of a can of sardines: two circles (top and bottom) and a label wrapped around.",
check:["A cylinder's diameter is 18 cm. What is its radius?","r = 18 ÷ 2 = 9 cm."]},

{h:"The Formula: V = πr²h",b:`
<div class="fx big">V = πr²h</div>
<ul>
<li>**V** = volume, **r** = radius of the base, **h** = height, **π** ≈ 3.14 or [[22/7]].</li>
<li>Where it comes from: volume of any prism-like solid = **Base area × height (V = Bh)**. The base is a circle, whose area is **B = πr²**. So **V = πr²h**.</li>
<li>Picture a stack of coins: each coin is a circle; stacking them up to height h fills the cylinder.</li>
<li>**Volume** is the amount of space inside a solid, measured in **cubic units** (cm³, m³, in³).</li>
</ul>
<div class="trap"><b>⚠️ Exam traps</b><ul>
<li>Square <b>only the radius</b>: πr² means π × r × r, not (π × r)².</li>
<li>If the problem gives the <b>diameter</b>, halve it first.</li>
<li>Volume uses <b>cubic</b> units (cm³), not square units (cm²).</li></ul></div>`,
hook:"“Pie are square” → π r² is the circle, times h is the stack.",
check:["What does B stand for in V = Bh, and what is it for a cylinder?","B = area of the base = πr²."]},

{h:"Step-by-Step Examples",b:`
<ol><li>Find the **radius** (halve the diameter if needed).</li><li>**Square** the radius.</li><li>Multiply by **π**.</li><li>Multiply by the **height**.</li><li>Write **cubic units**.</li></ol>
<div class="ex"><b>Example 1 (from the review sheet):</b> r = 7 cm, h = 10 cm<br>V = π(7)²(10) = π(49)(10) = <b>490π cm³</b><br>Using π ≈ 3.14: 490 × 3.14 ≈ <b>1,538.6 cm³</b><br>Using π ≈ [[22/7]]: 490 × [[22/7]] = <b>1,540 cm³</b></div>
<div class="ex"><b>Example 2 (diameter given):</b> d = 10 cm, h = 12 cm<br>r = 10 ÷ 2 = 5 → V = π(5)²(12) = 300π ≈ <b>942 cm³</b></div>
<div class="ex"><b>Example 3:</b> r = 3 m, h = 5 m → V = π(9)(5) = 45π ≈ <b>141.3 m³</b></div>
<ul><li>Use **[[22/7]]** when the radius is a multiple of 7 (the 7 cancels). Use **3.14** otherwise. If the problem says “in terms of π,” **leave π** in the answer (like 490π).</li></ul>`,
hook:"R-S-P-H: Radius, Square, Pi, Height.",
check:["Find V when r = 2 cm and h = 10 cm (π ≈ 3.14).","V = 3.14 × 4 × 10 = 125.6 cm³ (40π)."]},

{h:"Working Backwards: Find h or r",b:`
<div class="fx">h = [[V/πr²]] &nbsp;&nbsp;·&nbsp;&nbsp; r² = [[V/πh]] → r = √([[V/πh]])</div>
<div class="ex"><b>Find h:</b> V = 628 cm³, r = 5 cm<br>πr² = 3.14 × 25 = 78.5 → h = 628 ÷ 78.5 = <b>8 cm</b></div>
<div class="ex"><b>Find r:</b> V = 1,256 cm³, h = 4 cm<br>r² = 1,256 ÷ (3.14 × 4) = 1,256 ÷ 12.56 = 100 → r = √100 = <b>10 cm</b></div>
<p>This is where square roots (Lesson I) come back!</p>`,
hook:"To undo multiplying, divide. To undo squaring, take the square root.",
check:["V = 90π m³ and r = 3 m. Find h.","πr² = 9π → h = 90π ÷ 9π = 10 m."]},

{h:"Word Problems and Capacity",b:`
<ul><li>For “how much water can it hold,” find V, then change to liters: **1,000 cm³ = 1 L** and **1 m³ = 1,000 L**.</li></ul>
<div class="ex"><b>A water tank</b> has radius 0.5 m and height 1.2 m. How many liters can it hold?<br>V = 3.14 × 0.5² × 1.2 = 3.14 × 0.25 × 1.2 = 0.942 m³ → × 1,000 = <b>942 L</b></div>
<div class="ex"><b>A can of milk</b> has diameter 8 cm and height 10 cm. r = 4 → V = 3.14 × 16 × 10 = 502.4 cm³ ≈ <b>502.4 mL</b></div>
<div class="ex"><b>Half-full:</b> a glass with V = 300 cm³ is half full → 150 cm³ of juice.</div>
<h4>How changes affect the volume</h4>
<table class="t"><tr><th>Change</th><th>Effect on V</th></tr>
<tr><td>Double the height</td><td>× **2**</td></tr>
<tr><td>Double the radius</td><td>× **4** (because r is squared)</td></tr>
<tr><td>Triple the radius</td><td>× **9**</td></tr>
<tr><td>Double both r and h</td><td>× **8**</td></tr></table>`,
hook:"Radius is squared, so its effect is squared: ×2 → ×4, ×3 → ×9.",
check:["If the radius of a cylinder is doubled and h stays, what happens to V?","V becomes 4 times as large."]},

{h:"Also Good to Know: Cone vs. Cylinder",b:`
<ul><li>A **cone** with the same base and height as a cylinder holds exactly **one-third** of it: **V<sub>cone</sub> = [[1/3]]πr²h**.</li>
<li>This matches the pyramid–prism relationship in Lesson V.</li></ul>`,
hook:"Pointy solids (cones, pyramids) get the [[1/3]].",
check:["A cylinder holds 300 cm³. A cone with the same base and height holds?","300 ÷ 3 = 100 cm³."]}
],

/* ======================= V. PYRAMID ======================= */
p:[
{h:"What Is a Pyramid?",b:`
<div class="fig"><svg viewBox="0 0 230 180" role="img" aria-label="Square pyramid with height h and base side s"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M110 18L22 140L150 160L205 118Z" class="fillp"/><path d="M110 18L150 160"/><path d="M22 140L80 104L205 118" stroke-dasharray="5 5" opacity=".6"/><path d="M110 18L80 104" stroke-dasharray="5 5" opacity=".6"/><path d="M110 18L113 132" stroke-dasharray="4 3"/></g><text x="118" y="88" font-size="18" font-style="italic" fill="currentColor">h</text><text x="80" y="172" font-size="16" font-style="italic" fill="currentColor">s</text><text x="118" y="16" font-size="12" fill="currentColor">apex</text></svg></div>
<ul>
<li>A **pyramid** is a solid with a **polygon base** and **triangular faces** that meet at one point called the **apex** (vertex).</li>
<li>It is named by its **base**: triangular pyramid, **square pyramid**, rectangular pyramid, pentagonal pyramid, hexagonal pyramid.</li>
<li>**Height (h)**: the **perpendicular** distance from the apex straight down to the base (also called the altitude).</li>
<li>**Slant height**: the height of a **triangular face**, measured along the face. It is **longer** than the true height.</li>
<li>**Lateral faces**: the triangles. **Base edges**: sides of the base. **Lateral edges**: where two triangles meet.</li>
</ul>
<div class="trap"><b>⚠️ Exam trap:</b> the volume formula uses the <b>height</b>, not the slant height.</div>`,
hook:"The Egyptian pyramids are square pyramids: square base, 4 triangles meeting at the top.",
check:["What do you call the point where the triangular faces of a pyramid meet?","The apex (vertex)."]},

{h:"The Formula: V = ⅓Bh",b:`
<div class="fx big">V = [[1/3]]Bh</div>
<ul>
<li>**V** = volume, **B** = **area of the base**, **h** = height of the pyramid.</li>
<li>Why [[1/3]]? A pyramid holds exactly **one-third** of a **prism** with the **same base and same height**. Fill a pyramid with sand 3 times and you fill the prism once.</li>
<li>Same as: V = (B × h) ÷ 3.</li>
</ul>
<table class="t"><tr><th>Base shape</th><th>Base area B</th></tr>
<tr><td>Square (side s)</td><td>**B = s²**</td></tr>
<tr><td>Rectangle (length l, width w)</td><td>**B = l × w**</td></tr>
<tr><td>Triangle (base b, height of triangle)</td><td>**B = [[1/2]] × b × h<sub>triangle</sub>**</td></tr>
<tr><td>Regular polygon (bonus)</td><td>B = [[1/2]] × apothem × perimeter</td></tr></table>
<div class="trap"><b>⚠️ Exam trap:</b> for a triangular pyramid there are <b>two</b> heights: the height of the base triangle (for B) and the height of the pyramid (for V). Don't mix them up.</div>`,
hook:"Prism = Bh. Pyramid = the same, divided into 3 equal shares.",
check:["A prism and a pyramid have the same base and height. The prism is 90 cm³. The pyramid?","90 ÷ 3 = 30 cm³."]},

{h:"Step-by-Step Examples",b:`
<ol><li>Find the **base area B** using the right formula.</li><li>Multiply **B × h**.</li><li>Divide by **3** (or multiply by [[1/3]]).</li><li>Write **cubic units**.</li></ol>
<div class="ex"><b>Square pyramid (from the review sheet):</b> s = 6 cm, h = 9 cm<br>B = 6² = 36 cm² → V = [[1/3]](36)(9) = [[324/3]] = <b>108 cm³</b></div>
<div class="ex"><b>Rectangular pyramid:</b> base 8 m by 5 m, h = 12 m<br>B = 8 × 5 = 40 m² → V = [[1/3]](40)(12) = <b>160 m³</b></div>
<div class="ex"><b>Triangular pyramid:</b> base triangle b = 6 cm, height 4 cm; pyramid height 10 cm<br>B = [[1/2]](6)(4) = 12 cm² → V = [[1/3]](12)(10) = <b>40 cm³</b></div>
<p>Tip: divide by 3 <b>first</b> if one of the numbers is divisible by 3. [[1/3]](36)(9) → 12 × 9 = 108.</p>`,
hook:"B-H-3: Base area, times Height, divided by 3.",
check:["Find V: square base s = 5 cm, h = 6 cm.","B = 25 → V = (1/3)(25)(6) = 50 cm³."]},

{h:"Working Backwards: Find h or B",b:`
<div class="fx">h = [[3V/B]] &nbsp;&nbsp;·&nbsp;&nbsp; B = [[3V/h]] &nbsp;&nbsp;·&nbsp;&nbsp; s = √B (square base)</div>
<div class="ex"><b>Find h:</b> V = 200 cm³, B = 50 cm² → h = [[3(200)/50]] = [[600/50]] = <b>12 cm</b></div>
<div class="ex"><b>Find the side of the square base:</b> V = 48 cm³, h = 9 cm → B = [[3(48)/9]] = 16 → s = √16 = <b>4 cm</b></div>`,
hook:"Undo ÷3 by ×3, then divide by what's left.",
check:["V = 100 m³ and h = 12 m. Find B.","B = 3(100) ÷ 12 = 25 m²."]},

{h:"Also Good to Know: Slant Height and Real Life",b:`
<ul><li>If only the **slant height** is given for a square pyramid, use the **Pythagorean theorem** with half the base side: <b>h = √(slant² − (s ÷ 2)²)</b>.</li></ul>
<div class="ex">Square base s = 10 cm, slant height 13 cm → half side = 5<br>h = √(13² − 5²) = √(169 − 25) = √144 = <b>12 cm</b> → V = [[1/3]](100)(12) = <b>400 cm³</b></div>
<ul><li>Real life: tents, roofs, the Great Pyramid of Giza, paper weights, packaging, the glass pyramid at the Louvre.</li></ul>
<table class="t"><tr><th>Flat-top solid</th><th>Pointy solid</th></tr>
<tr><td>Prism: V = Bh</td><td>Pyramid: V = [[1/3]]Bh</td></tr>
<tr><td>Cylinder: V = πr²h</td><td>Cone: V = [[1/3]]πr²h</td></tr></table>`,
hook:"Pointy top → ⅓.",
check:["Which is longer in a pyramid: the height or the slant height?","The slant height."]}
],

/* ======================= VI. SETS ======================= */
s:[
{h:"What Is a Set?",b:`
<ul>
<li>A **set** is a **well-defined** collection of **distinct** objects. The objects are called **elements** or **members**.</li>
<li>Sets are named with **capital letters** (A, B, C) and their elements are written inside **braces { }**.</li>
<li>**Well-defined**: you can tell **clearly** whether something belongs or not. “Vowels of the English alphabet” is well-defined; “beautiful flowers” or “tall students” is **not** (it depends on opinion).</li>
<li>**Distinct**: each element is listed **only once**. Letters of “BOOK” = {B, O, K}.</li>
<li>**Order doesn't matter**: {1, 2, 3} = {3, 1, 2}.</li>
<li>**∈** means “is an element of”; **∉** means “is not an element of”. If A = {2, 4, 6}: 4 ∈ A, 5 ∉ A.</li>
<li>**Cardinality n(A)**: the number of elements in A. n({2, 4, 6}) = 3.</li>
</ul>`,
hook:"Well-defined = no arguing about who's in. Distinct = no copies.",
check:["Is “the set of delicious foods” well-defined? Why?","No: “delicious” depends on opinion."]},

{h:"Ways to Describe a Set",b:`
<table class="t"><tr><th>Method</th><th>Example</th></tr>
<tr><td>**Roster / listing method**: list the elements</td><td>A = {a, e, i, o, u}</td></tr>
<tr><td>**Rule / set-builder notation**: give the property</td><td>A = {x | x is a vowel in the English alphabet}<br><small>read “the set of all x <b>such that</b> x is a vowel…”</small></td></tr>
<tr><td>**Descriptive / verbal method**: describe in words</td><td>A is the set of vowels in the English alphabet.</td></tr></table>
<ul><li>Use an **ellipsis (…)** for a pattern that continues: {2, 4, 6, …} or {1, 2, 3, …, 100}.</li>
<li>Set-builder with numbers: {x | x is an odd number, 1 &lt; x &lt; 10} = {3, 5, 7, 9}.</li></ul>`,
hook:"Roster = Roll call (list names). Rule = the requirement to join.",
check:["Write {x | x is a counting number less than 5} by roster.","{1, 2, 3, 4}."]},

{h:"Kinds of Sets",b:`
<table class="t"><tr><th>Kind</th><th>Meaning</th><th>Example</th></tr>
<tr><td>**Finite**</td><td>elements can be **counted**; the counting ends</td><td>{days of the week}</td></tr>
<tr><td>**Infinite**</td><td>elements **never end**</td><td>{1, 2, 3, …}</td></tr>
<tr><td>**Empty / null set**</td><td>**no elements**; written **{ }** or **∅**</td><td>{months with 32 days}</td></tr>
<tr><td>**Unit set** (singleton)</td><td>exactly **one** element</td><td>{0}, {even prime numbers} = {2}</td></tr>
<tr><td>**Universal set (U)**</td><td>the set of **all elements** being considered</td><td>U = {1, 2, 3, …, 10}</td></tr>
<tr><td>**Equal sets**</td><td>exactly the **same elements**</td><td>{1, 2, 3} = {3, 2, 1}</td></tr>
<tr><td>**Equivalent sets**</td><td>same **number** of elements</td><td>{a, b, c} and {1, 2, 3}</td></tr>
<tr><td>**Joint sets**</td><td>have **at least one** common element</td><td>{1, 2, 3} and {3, 4}</td></tr>
<tr><td>**Disjoint sets**</td><td>**no** common elements</td><td>{1, 2} and {5, 6}</td></tr></table>
<div class="trap"><b>⚠️ Exam traps</b><ul>
<li>{0} is <b>not</b> empty: it has one element, 0.</li>
<li>{∅} is <b>not</b> empty: it has one element, ∅.</li>
<li>Don't write {∅} for the empty set. Use { } or ∅ alone.</li>
<li>Equal sets are always equivalent, but equivalent sets are not always equal.</li></ul></div>`,
hook:"Equal = same members. EquiVALENT = same VALUE of n (same count).",
check:["Are {a, b, c} and {x, y, z} equal or equivalent?","Equivalent (both have 3 elements), not equal."]},

{h:"Subsets",b:`
%%VENN:sub%%
<ul>
<li>A is a **subset** of B (**A ⊆ B**) if **every element of A is also in B**.</li>
<li>A is a **proper subset** of B (**A ⊂ B**) if A ⊆ B **and A ≠ B** (B has at least one extra element).</li>
<li>The **empty set** is a subset of **every** set. Every set is a subset of **itself** (but not a proper subset of itself).</li>
<li>A set with **n elements** has **2ⁿ subsets** and **2ⁿ − 1 proper subsets**.</li>
</ul>
<div class="ex"><b>All subsets of {a, b, c}</b> (n = 3 → 2³ = 8 subsets):<br>{ }, {a}, {b}, {c}, {a, b}, {a, c}, {b, c}, {a, b, c}<br>Proper subsets: all except {a, b, c} → 7</div>
<div class="trap"><b>⚠️ Don't confuse:</b> ∈ is for an <b>element</b> (2 ∈ {1, 2}); ⊆ is for a <b>set</b> ({2} ⊆ {1, 2}).</div>`,
hook:"Subsets double with every new element: 1, 2, 4, 8, 16, 32…",
check:["How many subsets does {1, 2, 3, 4} have? Proper subsets?","2⁴ = 16 subsets; 15 proper subsets."]},

{h:"Set Operations: Union, Intersection, Complement, Difference",b:`
<p>Let <b>U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}</b>, <b>A = {1, 2, 3, 4, 5}</b>, <b>B = {4, 5, 6, 7}</b>.</p>
<div class="vgrid">
<div class="vc">%%VENN:union%%<b>Union A ∪ B</b><span>all elements in A <b>or</b> B, or both (no repeats)</span><code>{1, 2, 3, 4, 5, 6, 7}</code></div>
<div class="vc">%%VENN:inter%%<b>Intersection A ∩ B</b><span>elements <b>common</b> to A <b>and</b> B</span><code>{4, 5}</code></div>
<div class="vc">%%VENN:compA%%<b>Complement A′</b><span>elements of U <b>not in A</b></span><code>{6, 7, 8, 9, 10}</code></div>
<div class="vc">%%VENN:diff%%<b>Difference A − B</b><span>elements in A <b>not in B</b></span><code>{1, 2, 3}</code></div>
</div>
<ul>
<li>**Union ∪** ↔ the word **“or”**. It looks like a **U** for “**U**nite.”</li>
<li>**Intersection ∩** ↔ the word **“and”**. Like a street intersection, it's the part **shared**.</li>
<li>**Complement A′** (also written A<sup>c</sup>) always depends on the **universal set**.</li>
<li>A − B ≠ B − A. Here B − A = {6, 7}.</li>
<li>If A and B are **disjoint**, A ∩ B = **∅**.</li>
</ul>`,
hook:"∪ is a cup that holds everything (union). ∩ is a bridge over the shared part (intersection).",
check:["With U, A and B above, find B′.","B′ = {1, 2, 3, 8, 9, 10}."]},

{h:"Venn Diagrams and Counting Problems",b:`
<ul>
<li>A **Venn diagram** uses a **rectangle** for the universal set and **circles** for sets. The **overlap** of two circles is the **intersection**.</li>
<li>Elements outside all circles but inside the rectangle are in **neither** set.</li>
</ul>
<div class="fx">n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</div>
<p>We subtract n(A ∩ B) because the shared elements were counted **twice**.</p>
<div class="ex"><b>Problem:</b> In a class of 40, 25 like Math, 18 like Science, and 10 like both.<br>
1. <b>Start in the middle:</b> both = 10<br>
2. Math only = 25 − 10 = <b>15</b><br>
3. Science only = 18 − 10 = <b>8</b><br>
4. Math or Science = 15 + 10 + 8 = <b>33</b> (or 25 + 18 − 10 = 33)<br>
5. Neither = 40 − 33 = <b>7</b></div>
%%VENN:prob%%`,
hook:"Fill a Venn diagram from the MIDDLE out.",
check:["n(A) = 12, n(B) = 9, n(A ∩ B) = 4. Find n(A ∪ B).","12 + 9 − 4 = 17."]}
]
};

/* Lists for List Recall (active recall: type every item you remember) */
D.LISTS=[
["r","List the perfect squares from 1² to 12².",["1","4","9","16","25","36","49","64","81","100","121","144"],"Square each counting number: 1×1, 2×2, …, 12×12."],
["r","List the perfect cubes from 1³ to 10³.",["1","8","27","64","125","216","343","512","729","1000"],"Cube each counting number: 1×1×1, 2×2×2, …"],
["r","Name the 3 parts of a radical like ∛125.",["radical sign","radicand","index"],"The symbol, the number inside, and the small number that tells which root."],
["r","Perfect squares can only end in which digits? (6 digits)",["0","1","4","5","6","9"],"Look at the last digits of 1, 4, 9, 16, 25, 36, 49, 64, 81, 100."],
["n","Name the subsets of the real numbers from smallest to biggest (5 nested sets).",["natural numbers","whole numbers","integers","rational numbers","real numbers"],"No Wonder Zebras Run Quickly… Really!"],
["n","Give the 4 kinds of numbers that are rational.",["fractions","integers","terminating decimals","repeating decimals"],"The poster lists them in the Rational Numbers circle."],
["n","Give 3 examples of irrational numbers from the review sheet.",["√2","π","√3"],"Two square roots and a famous circle constant."],
["u","Name the 7 metric prefixes/units from biggest to smallest.",["kilo","hecto","deka","base","deci","centi","milli"],"King Henry Died By Drinking Chocolate Milk."],
["u","Complete the metric facts: 1 m = ? cm, 1 km = ? m, 1 L = ? mL, 1 kg = ? g.",["100","1000","1000","1000"],"Centi = hundredth; kilo and milli = thousand."],
["u","Complete the English facts: 1 ft = ? in, 1 yd = ? ft, 1 mi = ? ft.",["12","3","5280"],"Ruler, yardstick, and the long one with 4 digits."],
["c","Name the 5 steps to find the volume of a cylinder.",["radius","square","pi","height","cubic units"],"R-S-P-H, then label."],
["c","What do V, r, h and π stand for in V = πr²h?",["volume","radius","height","3.14"],"π is about 3.14 (or 22/7)."],
["p","Name 4 kinds of pyramids according to their base.",["triangular","square","rectangular","pentagonal"],"A pyramid is named after the shape of its base."],
["p","Give the base area formulas for a square, a rectangle and a triangle.",["s²","l×w","½bh"],"Side times side; length times width; half of base times height."],
["s","Name the 4 set operations in the review.",["union","intersection","complement","difference"],"∪, ∩, A′, A − B."],
["s","Name the 3 methods of describing a set.",["roster","rule","descriptive"],"Listing, set-builder, and in words."],
["s","Name 6 kinds of sets.",["finite","infinite","empty","unit","universal","equal","equivalent","joint","disjoint"],"Think of: countable or not, no elements, one element, all elements, same elements, same number…",6]
];

/* Formula & fact sheet (cheat sheet tab) */
D.SHEET=`
<div class="sheet">
<div class="sc s-r"><h3>🟩 Roots</h3>
<div class="fx">√a × √a = a &nbsp;·&nbsp; ∛a × ∛a × ∛a = a</div>
<div class="grid sq tiny">
<div>1²=1</div><div>2²=4</div><div>3²=9</div><div>4²=16</div><div>5²=25</div><div>6²=36</div><div>7²=49</div><div>8²=64</div><div>9²=81</div><div>10²=100</div><div>11²=121</div><div>12²=144</div><div>13²=169</div><div>14²=196</div><div>15²=225</div><div>16²=256</div><div>17²=289</div><div>18²=324</div><div>19²=361</div><div>20²=400</div></div>
<div class="grid cb tiny"><div>1³=1</div><div>2³=8</div><div>3³=27</div><div>4³=64</div><div>5³=125</div><div>6³=216</div><div>7³=343</div><div>8³=512</div><div>9³=729</div><div>10³=1,000</div></div>
<ul><li>√ gives the positive root; ±√ gives both.</li><li>√(negative) = not real; ∛(negative) = negative.</li><li>Squares never end in 2, 3, 7, 8.</li></ul></div>

<div class="sc s-n"><h3>🔢 Real Numbers</h3>
<p class="chain">ℕ ⊂ W ⊂ ℤ ⊂ ℚ ⊂ ℝ &nbsp; + &nbsp; Irrational ⊂ ℝ</p>
<ul><li><b>ℕ</b> 1, 2, 3, … · <b>W</b> 0, 1, 2, … · <b>ℤ</b> …, −1, 0, 1, …</li>
<li><b>Rational</b>: [[a/b]] (b ≠ 0), terminating or repeating decimals.</li>
<li><b>Irrational</b>: non-terminating, non-repeating (√2, √3, π).</li>
<li>√2 ≈ 1.414 · √3 ≈ 1.732 · π ≈ 3.1416</li></ul></div>

<div class="sc s-u"><h3>📏 Units</h3>
<table class="t"><tr><td>1 cm = 10 mm</td><td>1 ft = 12 in</td></tr><tr><td>1 m = 100 cm</td><td>1 yd = 3 ft</td></tr><tr><td>1 km = 1,000 m</td><td>1 mi = 5,280 ft</td></tr><tr><td>1 L = 1,000 mL</td><td>1 lb = 16 oz</td></tr><tr><td>1 kg = 1,000 g</td><td>1 gal = 4 qt</td></tr><tr><td>1 in = 2.54 cm</td><td>1 kg ≈ 2.2 lb</td></tr><tr><td>1 cm³ = 1 mL</td><td>1 m³ = 1,000 L</td></tr></table>
<p><b>Big → small: × · Small → big: ÷</b></p></div>

<div class="sc s-c"><h3>🥫 Cylinder</h3>
<div class="fx big">V = πr²h</div>
<ul><li>r = d ÷ 2 · π ≈ 3.14 or [[22/7]]</li><li>h = V ÷ (πr²)</li><li>r = 7, h = 10 → 490π ≈ 1,538.6 cm³</li></ul></div>

<div class="sc s-p"><h3>🔺 Pyramid</h3>
<div class="fx big">V = [[1/3]]Bh</div>
<ul><li>Square B = s² · Rectangle B = lw · Triangle B = ½bh</li><li>h = 3V ÷ B · use height, not slant height</li><li>s = 6, h = 9 → [[1/3]](36)(9) = 108 cm³</li></ul></div>

<div class="sc s-s"><h3>⭕ Sets</h3>
<table class="t"><tr><td>A ∪ B</td><td>in A or B (or both)</td></tr><tr><td>A ∩ B</td><td>in A and B</td></tr><tr><td>A′</td><td>in U, not in A</td></tr><tr><td>A − B</td><td>in A, not in B</td></tr><tr><td>∈ / ∉</td><td>is / is not an element of</td></tr><tr><td>⊆ / ⊂</td><td>subset / proper subset</td></tr><tr><td>{ } or ∅</td><td>empty set</td></tr></table>
<ul><li>Subsets: 2ⁿ · proper subsets: 2ⁿ − 1</li><li>n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</li></ul></div>
</div>`;

/* Exam-day strategy (shown on Formulas page) */
D.TIPS=[
["Read the given carefully","Circle whether it says radius or diameter, height or slant height, and which value of π to use."],
["Write the formula first","Teachers often give points for the correct formula and substitution even if the final answer slips."],
["Check roots by multiplying back","12 × 12 = 144 ✓. It takes 3 seconds and catches most mistakes."],
["Simplify before classifying","√9 = 3 is rational; −√16 = −4 is an integer."],
["Use common sense for conversions","Smaller unit → bigger number. 5 m can't be 0.05 cm."],
["Always label units","Volume → cm³, m³. Area → cm², m². Length → cm, m."],
["Fill Venn diagrams from the middle","Put the “both” number in the overlap first, then subtract for the “only” parts."]
];
