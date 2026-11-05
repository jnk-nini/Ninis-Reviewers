/* Problem generators for drills: unlimited fresh computation items, each with a clue and a worked solution.
   Each generator returns {t, type, kind, q, a, clue, ex, ch?}
   type "num": a = number (or {pi:coef} when the answer is "in terms of π"); "mc": a = correct, ch = wrong choices;
   type "set": a = array of elements; type "frac": a = [num, den]. lvl: 1 easy, 2 normal, 3 hard. */
(self.D=self.D||{});
(function(){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const P=a=>a[Math.floor(Math.random()*a.length)];
const sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const round=(x,d=4)=>{const f=Math.pow(10,d);return Math.round(x*f)/f};
const F=x=>{x=round(x,4);const neg=x<0;x=Math.abs(x);let [i,d]=String(x).split(".");i=i.replace(/\B(?=(\d{3})+(?!\d))/g,",");return(neg?"−":"")+i+(d?"."+d:"")};
const frac=(a,b)=>`[[${a}/${b}]]`;
const uniq=(arr,n,bad)=>{const out=[];for(const x of sh(arr)){const s=String(x);if(s!==String(bad)&&!out.includes(s))out.push(s);if(out.length>=n)break}return out};
D.fmt=F;

/* ================= I. ROOTS ================= */
const sqrtG=lvl=>{const n=R(lvl==1?2:4,lvl==1?12:lvl==2?20:30),sq=n*n,lo=Math.max(1,n-R(1,2));
 return{t:"r",type:"num",kind:"r.sqrt",q:`Find √${F(sq)}`,a:n,
 clue:`Think: ? × ? = ${F(sq)}. The answer is between ${lo} and ${lo+3}.`,
 ex:`${n} × ${n} = ${F(sq)}, so √${F(sq)} = <b>${n}</b>.`}};
const cbrtG=lvl=>{const n=R(lvl==1?1:2,lvl==1?5:lvl==2?10:12),neg=lvl>1&&Math.random()<.35,c=n*n*n*(neg?-1:1),a=neg?-n:n;
 return{t:"r",type:"num",kind:"r.cbrt",q:`Find ∛${F(c)}`,a,
 clue:neg?`A negative number has a NEGATIVE cube root. First find ∛${F(n*n*n)}.`:`Which number, used 3 times as a factor, gives ${F(c)}? Try numbers near ${Math.max(1,n-1)}.`,
 ex:`(${F(a)}) × (${F(a)}) × (${F(a)}) = ${F(c)}, so ∛${F(c)} = <b>${F(a)}</b>.`}};
const squareG=lvl=>{const n=R(lvl==1?2:5,lvl==1?12:lvl==2?20:25);
 return{t:"r",type:"num",kind:"r.square",q:`Evaluate ${n}²`,a:n*n,clue:`${n}² means ${n} × ${n}.`,ex:`${n} × ${n} = <b>${F(n*n)}</b>.`}};
const cubeG=lvl=>{const n=R(lvl==1?1:2,lvl==1?5:10),neg=lvl==3&&Math.random()<.4,b=neg?-n:n;
 return{t:"r",type:"num",kind:"r.cube",q:`Evaluate (${F(b)})³`,a:b*b*b,clue:`Multiply ${F(b)} by itself three times.${neg?" Three negatives give a negative.":""}`,ex:`(${F(b)}) × (${F(b)}) × (${F(b)}) = <b>${F(b*b*b)}</b>.`}};
const fracRootG=lvl=>{const cube=lvl>1&&Math.random()<.4;let a,b;
 do{a=R(1,cube?5:9);b=R(2,cube?6:12)}while(a>=b||gcd(a,b)!==1);
 const sym=cube?"∛":"√",pa=cube?a**3:a*a,pb=cube?b**3:b*b;
 return{t:"r",type:"frac",kind:"r.frac",q:`Find ${sym}(${frac(pa,pb)}). Type a fraction like 2/3.`,a:[a,b],
 clue:`Take the ${cube?"cube":"square"} root of the numerator and of the denominator separately: ${sym}${pa} and ${sym}${pb}.`,
 ex:`${sym}${pa} = ${a} and ${sym}${pb} = ${b}, so the answer is <b>${frac(a,b)}</b>.`}};
const decRootG=lvl=>{const cube=lvl>1&&Math.random()<.35;
 if(cube){const n=R(1,9),r=n/10,rad=round(r*r*r,6);return{t:"r",type:"num",kind:"r.dec",q:`Find ∛${rad}`,a:r,clue:`The radicand has 3 decimal places, so the root has 1. Which digit cubed gives ${n*n*n}?`,ex:`${r} × ${r} × ${r} = ${rad}, so ∛${rad} = <b>${r}</b>.`}}
 const big=lvl==3&&Math.random()<.5,n=R(big?11:1,big?15:9),r=n/10,rad=round(r*r,6);
 return{t:"r",type:"num",kind:"r.dec",q:`Find √${rad}`,a:r,clue:`${rad} has ${String(rad).split(".")[1].length} decimal places, so the root has half as many. Which number squared gives ${n*n}?`,ex:`${r} × ${r} = ${rad}, so √${rad} = <b>${r}</b>.`}};
const estG=lvl=>{let k;do{k=R(lvl==1?3:10,lvl==1?60:lvl==2?150:400)}while(Number.isInteger(Math.sqrt(k)));
 const lo=Math.floor(Math.sqrt(k)),ans=`${lo} and ${lo+1}`;
 return{t:"r",type:"mc",kind:"r.est",q:`√${k} is between which two consecutive integers?`,a:ans,ch:uniq([`${lo-1} and ${lo}`,`${lo+1} and ${lo+2}`,`${Math.floor(k/2)} and ${Math.floor(k/2)+1}`,`${lo+2} and ${lo+3}`,`${k-1} and ${k}`],3,ans),
 clue:`Find the perfect squares just below and just above ${k}.`,ex:`${lo*lo} < ${k} < ${(lo+1)*(lo+1)}, so ${lo} < √${k} < ${lo+1}. (√${k} ≈ ${round(Math.sqrt(k),2)})`}};
const perfG=lvl=>{const cube=Math.random()<.4;
 if(cube){const n=R(2,10),c=n**3,bad=uniq([c+1,c-1,c+2,n*n*3,c+10,n*100,c*2].filter(x=>!Number.isInteger(Math.round(Math.cbrt(x)))||Math.round(Math.cbrt(x))**3!==x),3,c);
  return{t:"r",type:"mc",kind:"r.perf",q:"Which of the following is a perfect cube?",a:F(c),ch:bad.map(F),clue:"A perfect cube is an integer times itself three times. Try cubing small integers: 2³, 3³, 4³, …",ex:`${n} × ${n} × ${n} = ${F(c)}.`}}
 const n=R(4,lvl==1?12:25),s=n*n;const cands=[s+1,s-1,s+2,s+n,s-n,n*20,s*2,s+3].filter(x=>x>0&&!Number.isInteger(Math.sqrt(x)));
 return{t:"r",type:"mc",kind:"r.perf",q:"Which of the following is a perfect square?",a:F(s),ch:uniq(cands,3,s).map(F),clue:"Perfect squares never end in 2, 3, 7, or 8. Check which one is n × n.",ex:`${n} × ${n} = ${F(s)}.`}};
const negRootG=()=>{const n=R(2,10),sq=n*n,kind=R(0,2);
 if(kind===0)return{t:"r",type:"mc",kind:"r.neg",q:`Evaluate √−${sq}`,a:"not a real number",ch:[`−${n}`,`${n}`,`±${n}`],clue:"Can a real number multiplied by itself give a negative number?",ex:"(+)(+) = + and (−)(−) = +. No real number squared is negative, so √ of a negative is <b>not a real number</b>."};
 if(kind===1)return{t:"r",type:"mc",kind:"r.neg",q:`Evaluate −√${sq}`,a:`−${n}`,ch:["not a real number",`${n}`,`±${n}`],clue:"The negative sign is OUTSIDE the radical. Find the root first.",ex:`√${sq} = ${n}, so −√${sq} = <b>−${n}</b>.`};
 return{t:"r",type:"mc",kind:"r.neg",q:`What are the square roots of ${sq}?`,a:`±${n}`,ch:[`${n} only`,`−${n} only`,`${sq/2}`],clue:"Every positive number has TWO square roots.",ex:`${n} × ${n} = ${sq} and (−${n}) × (−${n}) = ${sq}, so the square roots are <b>±${n}</b>.`}};
const primeG=lvl=>{const n=P([12,14,15,16,18,21,24,28,32,36]),sq=n*n;
 return{t:"r",type:"num",kind:"r.prime",q:`Use prime factorization to find √${F(sq)}`,a:n,clue:`Write ${F(sq)} as a product of primes, then take one factor from each pair. ${F(sq)} = ${pf(sq).join(" × ")}`,ex:`${F(sq)} = ${pf(sq).join(" × ")}. One from each pair: ${pf(n).join(" × ")} = <b>${n}</b>.`}};
function gcd(a,b){return b?gcd(b,a%b):a}
function pf(n){const o=[];for(let p=2;n>1;p++)while(n%p===0){o.push(p);n/=p}return o}

/* ================= II. REAL NUMBERS ================= */
const NUMS=()=>{const n=R(2,30),m=R(2,9),pk=[2,3,5,6,7,8,10,11,12,13,15,17,18,20],nps=P(pk),ps=R(2,12),pc=R(2,5);
 return[
 {x:`${n}`,s:"natural numbers",r:"rational",why:`${n} is a counting number.`},
 {x:"0",s:"whole numbers",r:"rational",why:"0 is a whole number (not a counting number)."},
 {x:`−${n}`,s:"integers",r:"rational",why:`−${n} is a negative integer.`},
 {x:frac(m-1,m),s:"rational numbers",r:"rational",why:"It is a fraction of two integers."},
 {x:`${R(1,9)}.${R(1,9)}${R(1,9)}`,s:"rational numbers",r:"rational",why:"It is a terminating decimal."},
 {x:`0.{{${R(1,9)}}}`,s:"rational numbers",r:"rational",why:"It is a repeating decimal."},
 {x:`√${ps*ps}`,s:"natural numbers",r:"rational",why:`√${ps*ps} = ${ps}, a counting number.`},
 {x:`−√${ps*ps}`,s:"integers",r:"rational",why:`−√${ps*ps} = −${ps}, a negative integer.`},
 {x:`∛−${pc**3}`,s:"integers",r:"rational",why:`∛−${pc**3} = −${pc}, a negative integer.`},
 {x:`√${nps}`,s:"irrational numbers",r:"irrational",why:`${nps} is not a perfect square, so √${nps} is non-terminating and non-repeating.`},
 {x:"π",s:"irrational numbers",r:"irrational",why:"π = 3.14159… never ends and never repeats."},
 {x:frac(22,7),s:"rational numbers",r:"rational",why:"[[22/7]] is a fraction (only an approximation of π)."},
 {x:"0.1010010001…",s:"irrational numbers",r:"irrational",why:"The pattern grows, so no block repeats."},
 {x:`√(${frac(ps*ps,(ps+1)*(ps+1))})`,s:"rational numbers",r:"rational",why:`It simplifies to ${frac(ps,ps+1)}.`}
 ]};
const smallestG=()=>{const o=P(NUMS()),sets=["natural numbers","whole numbers","integers","rational numbers","irrational numbers"];
 return{t:"n",type:"mc",kind:"n.small",q:`What is the smallest (most specific) set that ${o.x} belongs to?`,a:o.s,ch:sh(sets.filter(s=>s!==o.s)).slice(0,3),
 clue:"Simplify it first if there's a root. Then check: counting number? zero? negative integer? fraction/decimal that stops or repeats? never ends and never repeats?",ex:`${o.why} So the smallest set is <b>${o.s}</b>.`}};
const ratIrrG=()=>{const o=P(NUMS());
 return{t:"n",type:"mc",kind:"n.ratirr",q:`Is ${o.x} rational or irrational?`,a:o.r,ch:[o.r==="rational"?"irrational":"rational","not a real number"],
 clue:"Rational = can be written as a fraction (decimal stops or repeats). Irrational = never ends, never repeats.",ex:`${o.why} So it is <b>${o.r}</b>.`}};
const compareG=()=>{let k;do{k=R(2,99)}while(Number.isInteger(Math.sqrt(k)));const s=Math.sqrt(k);let d=round(s+(Math.random()<.5?-1:1)*R(1,4)/10,1);if(d===round(s,1))d=round(d+.1,1);
 const big=s>d?`√${k}`:`${d}`;
 return{t:"n",type:"mc",kind:"n.cmp",q:`Which is greater: √${k} or ${d}?`,a:big,ch:[s>d?`${d}`:`√${k}`,"They are equal"],clue:`Estimate √${k}: it is between ${Math.floor(s)} and ${Math.floor(s)+1}. Square ${d} and compare with ${k}.`,ex:`√${k} ≈ ${round(s,3)} and ${d}² = ${round(d*d,2)}. So <b>${big}</b> is greater.`}};
const repDecG=()=>{const d=R(1,8),two=Math.random()<.4;
 if(two){let ab=R(10,98);if(ab%11===0)ab++;const g=gcd(ab,99);return{t:"n",type:"frac",kind:"n.rep",q:`Write 0.{{${ab}}} as a fraction in lowest terms.`,a:[ab/g,99/g],clue:"Two repeating digits → put them over 99, then simplify.",ex:`0.{{${ab}}} = ${frac(ab,99)}${g>1?` = ${frac(ab/g,99/g)}`:""}. Answer: <b>${frac(ab/g,99/g)}</b>.`}}
 const g=gcd(d,9);return{t:"n",type:"frac",kind:"n.rep",q:`Write 0.{{${d}}} (0.${String(d).repeat(4)}…) as a fraction in lowest terms.`,a:[d/g,9/g],clue:"One repeating digit → put it over 9, then simplify.",ex:`Let x = 0.${String(d).repeat(3)}… → 10x − x = ${d} → 9x = ${d} → x = ${frac(d,9)}${g>1?` = ${frac(d/g,9/g)}`:""}.`}};

/* ================= III. UNITS ================= */
const PAIRS=[ // [big, small, factor, lvl]
["km","m",1000,1],["m","cm",100,1],["cm","mm",10,1],["m","mm",1000,2],["kg","g",1000,1],["g","mg",1000,2],["L","mL",1000,1],["t","kg",1000,3],["km","cm",100000,3],
["ft","in",12,1],["yd","ft",3,1],["yd","in",36,2],["mi","ft",5280,2],["mi","yd",1760,3],["lb","oz",16,2],["gal","qt",4,2],["qt","pt",2,2],["pt","c",2,3],["ton","lb",2000,3],
["m³","L",1000,2],["L","cm³",1000,2]
];
const CROSS=[["in","cm",2.54,"1 in = 2.54 cm"],["kg","lb",2.2,"1 kg ≈ 2.2 lb"],["mi","km",1.609,"1 mi ≈ 1.609 km"],["ft","cm",30.48,"1 ft ≈ 30.48 cm"],["m","ft",3.28,"1 m ≈ 3.28 ft"],["gal","L",3.785,"1 gal ≈ 3.785 L"],["lb","kg",0.454,"1 lb ≈ 0.454 kg"]];
const NICE=[2,3,4,5,6,7,8,9,10,12,15,20,25,1.5,2.5,3.5,0.5,0.75,4.5,0.25];
const convG=lvl=>{
 if(lvl>1&&Math.random()<(lvl==3?.35:.2)){const[a,b,f,fact]=P(CROSS),v=P([2,3,4,5,6,8,10,12,15,20,50]),ans=round(v*f,3);
  return{t:"u",type:"num",kind:"u.cross",tol:.002,q:`Convert ${F(v)} ${a} to ${b}. (Use ${fact}.)`,a:ans,clue:`Multiply by the conversion factor: ${F(v)} × ${f}.`,ex:`${F(v)} ${a} × [[${f} ${b}/1 ${a}]] = <b>${F(ans)} ${b}</b>.`}}
 const pool=PAIRS.filter(p=>p[3]<=lvl),[big,small,f]=P(pool),down=Math.random()<.5;
 if(down){const v=P(NICE.filter(x=>lvl>1||Number.isInteger(x))),ans=round(v*f,4);
  return{t:"u",type:"num",kind:"u.conv",q:`Convert ${F(v)} ${big} to ${small}.`,a:ans,clue:`1 ${big} = ${F(f)} ${small}. Big unit → small unit: MULTIPLY by ${F(f)}.`,ex:`${F(v)} × ${F(f)} = <b>${F(ans)} ${small}</b>.`}}
 const r=P(NICE.filter(x=>lvl>1||Number.isInteger(x))),v=round(r*f,4);
 return{t:"u",type:"num",kind:"u.conv",q:`Convert ${F(v)} ${small} to ${big}.`,a:r,clue:`1 ${big} = ${F(f)} ${small}. Small unit → big unit: DIVIDE by ${F(f)}.`,ex:`${F(v)} ÷ ${F(f)} = <b>${F(r)} ${big}</b>.`}};
const mixedG=()=>{const ft=R(4,6),inch=R(1,11),tot=ft*12+inch,cm=Math.random()<.5;
 if(cm)return{t:"u",type:"num",kind:"u.mixed",tol:.005,q:`A student is ${ft} ft ${inch} in tall. What is the height in centimeters? (1 in = 2.54 cm)`,a:round(tot*2.54,2),clue:`First change everything to inches: ${ft} × 12 + ${inch}. Then multiply by 2.54.`,ex:`${ft} × 12 + ${inch} = ${tot} in → ${tot} × 2.54 = <b>${F(round(tot*2.54,2))} cm</b>.`};
 return{t:"u",type:"num",kind:"u.mixed",q:`Express ${ft} ft ${inch} in in inches.`,a:tot,clue:`1 ft = 12 in. Change the feet to inches, then add the ${inch} in.`,ex:`${ft} × 12 = ${ft*12}; ${ft*12} + ${inch} = <b>${tot} in</b>.`}};
const ruleG=()=>{const[big,small]=P(PAIRS),down=Math.random()<.5;
 return{t:"u",type:"mc",kind:"u.rule",q:`To convert ${down?big:small} to ${down?small:big}, you should…`,a:down?"multiply":"divide",ch:[down?"divide":"multiply","add","subtract"],clue:"Is the new unit bigger or smaller? Smaller unit → you need more of them.",ex:down?`${big} → ${small} is big → small, so <b>multiply</b>.`:`${small} → ${big} is small → big, so <b>divide</b>.`}};

/* ================= IV. CYLINDER ================= */
const cylG=lvl=>{
 const mode=lvl==1?P(["v","v","pi"]):P(["v","v","pi","d","h","r","22","cap"].slice(0,lvl==2?6:8));
 if(mode==="pi"){const r=R(1,lvl==1?6:10),h=R(2,12),c=r*r*h;return{t:"c",type:"num",kind:"c.pi",q:`Find the volume of a cylinder with r = ${r} cm and h = ${h} cm. Leave your answer in terms of π (example: 20π).`,a:{pi:c},clue:`V = πr²h → square the radius (${r}² = ${r*r}), then multiply by ${h}. Keep π as a letter.`,ex:`V = π(${r})²(${h}) = π(${r*r})(${h}) = <b>${c}π cm³</b>.`}}
 if(mode==="22"){const r=P([7,14,21]),h=R(2,10),v=round(22/7*r*r*h,2);return{t:"c",type:"num",kind:"c.v",q:`Find the volume of a cylinder with r = ${r} cm and h = ${h} cm. Use π ≈ [[22/7]].`,a:v,clue:`r² = ${r*r}. Since ${r*r} ÷ 7 = ${r*r/7}, the 7 cancels nicely.`,ex:`V = [[22/7]] × ${r*r} × ${h} = 22 × ${r*r/7} × ${h} = <b>${F(v)} cm³</b>.`}}
 if(mode==="h"){const r=R(1,8),h=R(2,15),v=round(3.14*r*r*h,2);return{t:"c",type:"num",kind:"c.h",q:`A cylinder has a volume of ${F(v)} cm³ and a radius of ${r} cm. Find its height. (π ≈ 3.14)`,a:h,clue:`h = V ÷ (πr²). First find πr² = 3.14 × ${r*r}.`,ex:`πr² = 3.14 × ${r*r} = ${F(round(3.14*r*r,2))}. h = ${F(v)} ÷ ${F(round(3.14*r*r,2))} = <b>${h} cm</b>.`}}
 if(mode==="r"){const r=R(2,10),h=R(2,10),v=round(3.14*r*r*h,2);return{t:"c",type:"num",kind:"c.r",q:`A cylinder has a volume of ${F(v)} cm³ and a height of ${h} cm. Find its radius. (π ≈ 3.14)`,a:r,clue:`r² = V ÷ (πh) = ${F(v)} ÷ (3.14 × ${h}). Then take the square root.`,ex:`r² = ${F(v)} ÷ ${F(round(3.14*h,2))} = ${r*r} → r = √${r*r} = <b>${r} cm</b>.`}}
 if(mode==="cap"){const r=P([5,10,15,20]),h=P([10,20,30,40,50]),cm3=round(3.14*r*r*h,2),L=round(cm3/1000,4);return{t:"c",type:"num",kind:"c.cap",q:`A cylindrical container has r = ${r} cm and h = ${h} cm. How many liters can it hold? (π ≈ 3.14; 1,000 cm³ = 1 L)`,a:L,clue:`Find V in cm³ first, then divide by 1,000.`,ex:`V = 3.14 × ${r*r} × ${h} = ${F(cm3)} cm³ → ÷ 1,000 = <b>${F(L)} L</b>.`}}
 const r=R(1,lvl==1?6:12),h=R(2,lvl==1?10:20),useD=mode==="d",v=round(3.14*r*r*h,2);
 const giv=useD?`a diameter of ${2*r} cm`:`a radius of ${r} cm`;
 return{t:"c",type:"num",kind:useD?"c.d":"c.v",q:`Find the volume of a cylinder with ${giv} and a height of ${h} cm. (π ≈ 3.14)`,a:v,
 clue:(useD?`Diameter → radius first: ${2*r} ÷ 2 = ${r}. `:"")+`V = πr²h = 3.14 × ${r}² × ${h}.`,
 ex:(useD?`r = ${2*r} ÷ 2 = ${r}. `:"")+`V = 3.14 × ${r*r} × ${h} = <b>${F(v)} cm³</b> (= ${r*r*h}π cm³).`}};
const cylScaleG=()=>{const k=P([2,3,4]),which=P(["r","h","both"]),f=which==="r"?k*k:which==="h"?k:k*k*k,nm=["","","doubled","tripled","multiplied by 4"][k];
 return{t:"c",type:"mc",kind:"c.scale",q:`If ${which==="both"?"both the radius and height":which==="r"?"the radius":"the height"} of a cylinder ${which==="both"?"are":"is"} ${nm}, the volume is multiplied by…`,a:String(f),ch:uniq([k,k*k,k*k*k,2*k,k+1].map(String),3,String(f)),
 clue:"In V = πr²h, the radius is SQUARED but the height is not.",ex:which==="r"?`(${k}r)² = ${k*k}r², so V × <b>${f}</b>.`:which==="h"?`h is not squared, so V × <b>${f}</b>.`:`r² gives × ${k*k} and h gives × ${k}: ${k*k} × ${k} = <b>${f}</b>.`}};

/* ================= V. PYRAMID ================= */
const pyrG=lvl=>{
 const mode=lvl==1?P(["sq","sq","rect"]):P(["sq","rect","tri","h","prism","s","slant"].slice(0,lvl==2?5:7));
 if(mode==="rect"){const l=R(2,12),w=R(2,10);let h=R(2,15);if((l*w*h)%3)h=3*R(1,5);const v=l*w*h/3;return{t:"p",type:"num",kind:"p.rect",q:`A rectangular pyramid has a base of ${l} cm by ${w} cm and a height of ${h} cm. Find its volume.`,a:v,clue:`B = l × w = ${l} × ${w}. Then V = [[1/3]] × B × h.`,ex:`B = ${l*w} cm². V = [[1/3]](${l*w})(${h}) = ${l*w*h} ÷ 3 = <b>${F(v)} cm³</b>.`}}
 if(mode==="tri"){const b=2*R(2,8),t=R(2,10),B=b*t/2;let H=3*R(1,5);const v=B*H/3;return{t:"p",type:"num",kind:"p.tri",q:`A triangular pyramid has a base triangle with base ${b} cm and height ${t} cm. The pyramid is ${H} cm tall. Find its volume.`,a:v,clue:`Two heights! Base area first: B = [[1/2]] × ${b} × ${t}. Then use the pyramid height ${H} in V = [[1/3]]Bh.`,ex:`B = [[1/2]](${b})(${t}) = ${B} cm². V = [[1/3]](${B})(${H}) = <b>${F(v)} cm³</b>.`}}
 if(mode==="h"){const B=P([12,15,18,20,24,25,30,36,40,45,50,60,64,81,100]),h=R(2,15),v=B*h/3;return{t:"p",type:"num",kind:"p.h",q:`A pyramid has a volume of ${F(v)} cm³ and a base area of ${B} cm². Find its height.`,a:h,clue:"h = 3V ÷ B. Multiply the volume by 3 first.",ex:`h = 3(${F(v)}) ÷ ${B} = ${F(3*v)} ÷ ${B} = <b>${h} cm</b>.`}}
 if(mode==="prism"){const v=3*R(5,60),toPy=Math.random()<.6;return toPy?{t:"p",type:"num",kind:"p.prism",q:`A prism has a volume of ${v} cm³. What is the volume of a pyramid with the same base and height?`,a:v/3,clue:"A pyramid holds one-third of the prism.",ex:`${v} ÷ 3 = <b>${v/3} cm³</b>.`}:{t:"p",type:"num",kind:"p.prism",q:`A pyramid has a volume of ${v/3} cm³. What is the volume of a prism with the same base and height?`,a:v,clue:"The prism holds 3 times as much as the pyramid.",ex:`${v/3} × 3 = <b>${v} cm³</b>.`}}
 if(mode==="s"){const s=R(2,10),h=3*R(1,5),v=s*s*h/3;return{t:"p",type:"num",kind:"p.s",q:`A square pyramid has a volume of ${F(v)} cm³ and a height of ${h} cm. How long is a side of its base?`,a:s,clue:"B = 3V ÷ h, then s = √B.",ex:`B = 3(${F(v)}) ÷ ${h} = ${s*s} → s = √${s*s} = <b>${s} cm</b>.`}}
 if(mode==="slant"){const[hs,h,l]=P([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15]]),s=2*hs,v=s*s*h/3;return{t:"p",type:"num",kind:"p.slant",q:`A square pyramid has a base side of ${s} cm and a slant height of ${l} cm. Find its volume.`,a:v,clue:`The slant height is NOT the height. Use half the side (${hs}): h = √(${l}² − ${hs}²).`,ex:`h = √(${l*l} − ${hs*hs}) = √${h*h} = ${h} cm. B = ${s*s}. V = [[1/3]](${s*s})(${h}) = <b>${F(v)} cm³</b>.`}}
 const s=R(2,lvl==1?8:12);let h=R(2,15);if((s*s*h)%3)h=3*R(1,5);const v=s*s*h/3;
 return{t:"p",type:"num",kind:"p.sq",q:`A square pyramid has a base side of ${s} cm and a height of ${h} cm. Find its volume.`,a:v,clue:`B = s² = ${s}². Then V = [[1/3]] × B × h.`,ex:`B = ${s*s} cm². V = [[1/3]](${s*s})(${h}) = ${s*s*h} ÷ 3 = <b>${F(v)} cm³</b>.`}};

/* ================= VI. SETS ================= */
const show=a=>a.length?`{${a.join(", ")}}`:"{ } (empty set)";
const sortS=a=>a.slice().sort((x,y)=>(isNaN(x)||isNaN(y))?String(x).localeCompare(String(y)):x-y);
const pickSet=(U,k)=>sortS(sh(U).slice(0,k));
const setOpG=lvl=>{const letters=lvl>1&&Math.random()<.3,U=letters?["a","b","c","d","e","f","g","h"]:[1,2,3,4,5,6,7,8,9,10];
 const A=pickSet(U,R(3,5)),B=pickSet(U,R(3,5));
 const ops=[["A ∪ B",U.filter(x=>A.includes(x)||B.includes(x)),"Union: list every element that is in A or in B, writing repeats once."],
  ["A ∩ B",U.filter(x=>A.includes(x)&&B.includes(x)),"Intersection: keep only the elements found in BOTH sets."],
  ["A′",U.filter(x=>!A.includes(x)),"Complement: elements of U that are NOT in A."],
  ["B′",U.filter(x=>!B.includes(x)),"Complement: elements of U that are NOT in B."],
  ["A − B",A.filter(x=>!B.includes(x)),"Difference: start with A, remove anything that is also in B."],
  ["B − A",B.filter(x=>!A.includes(x)),"Difference: start with B, remove anything that is also in A."]];
 if(lvl==3)ops.push(["(A ∪ B)′",U.filter(x=>!(A.includes(x)||B.includes(x))),"Find A ∪ B first, then take everything in U that is NOT in it."],["A′ ∩ B",B.filter(x=>!A.includes(x)),"Find A′ first, then keep the elements that are also in B."]);
 const[op,ans,clue]=P(lvl==1?ops.slice(0,3):ops);
 return{t:"s",type:"set",kind:"s.op",q:`U = ${show(U)}<br>A = ${show(A)}<br>B = ${show(B)}<br><br>Find <b>${op}</b>. Type the elements separated by commas.`,a:ans.map(String),clue,ex:`${op} = <b>${show(ans)}</b>`}};
const subsetsG=()=>{const n=R(1,6),proper=Math.random()<.45,els=["a","b","c","d","e","f"].slice(0,n),ans=Math.pow(2,n)-(proper?1:0);
 return{t:"s",type:"num",kind:"s.sub",q:`How many ${proper?"proper subsets":"subsets"} does ${show(els)} have?`,a:ans,clue:`Count the elements: n = ${n}. Subsets = 2ⁿ${proper?"; proper subsets = 2ⁿ − 1":""}.`,ex:`n = ${n} → 2${"⁰¹²³⁴⁵⁶"[n]} = ${Math.pow(2,n)}${proper?` → ${Math.pow(2,n)} − 1 = <b>${ans}</b>`:` = <b>${ans}</b>`}.`}};
const vennG=lvl=>{const both=R(3,12),a=both+R(3,15),b=both+R(3,15),neither=R(0,10),tot=a+b-both+neither,A=P(["Math","Basketball","Mango","Music","Coffee"]),B=P(["Science","Volleyball","Banana","Art","Tea"]);
 const qs=[["like "+A+" or "+B+" (at least one)",a+b-both,`n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = ${a} + ${b} − ${both}`],
  ["like "+A+" only",a-both,`${A} only = ${a} − ${both}`],["like "+B+" only",b-both,`${B} only = ${b} − ${both}`],["like neither",neither,`First: at least one = ${a} + ${b} − ${both} = ${a+b-both}. Neither = ${tot} − ${a+b-both}`]];
 const[ask,ans,clue]=P(lvl==1?qs.slice(0,3):qs);
 return{t:"s",type:"num",kind:"s.venn",q:`In a group of ${tot} students, ${a} like ${A}, ${b} like ${B}, and ${both} like both. How many ${ask}?`,a:ans,clue:"Draw a Venn diagram and fill in the middle (both) first. "+clue.split(" = ")[0]+".",ex:`Both = ${both}; ${A} only = ${a-both}; ${B} only = ${b-both}; neither = ${neither}. ${clue} = <b>${ans}</b>.`}};
const cardG=()=>{const nA=R(5,20),nB=R(5,20),nI=R(1,Math.min(nA,nB)-1),which=R(0,1);
 if(which)return{t:"s",type:"num",kind:"s.card",q:`n(A) = ${nA}, n(B) = ${nB}, and n(A ∩ B) = ${nI}. Find n(A ∪ B).`,a:nA+nB-nI,clue:"n(A ∪ B) = n(A) + n(B) − n(A ∩ B). Subtract the overlap because it was counted twice.",ex:`${nA} + ${nB} − ${nI} = <b>${nA+nB-nI}</b>.`};
 return{t:"s",type:"num",kind:"s.card",q:`n(A) = ${nA}, n(B) = ${nB}, and n(A ∪ B) = ${nA+nB-nI}. Find n(A ∩ B).`,a:nI,clue:"Rearrange n(A ∪ B) = n(A) + n(B) − n(A ∩ B): n(A ∩ B) = n(A) + n(B) − n(A ∪ B).",ex:`${nA} + ${nB} − ${nA+nB-nI} = <b>${nI}</b>.`}};

D.GEN={
 r:[[sqrtG,3],[cbrtG,3],[squareG,1],[cubeG,1],[fracRootG,2],[decRootG,2],[estG,2],[perfG,1],[negRootG,2],[primeG,1]],
 n:[[smallestG,4],[ratIrrG,4],[compareG,2],[repDecG,2]],
 u:[[convG,7],[mixedG,1],[ruleG,1]],
 c:[[cylG,6],[cylScaleG,1]],
 p:[[pyrG,1]],
 s:[[setOpG,4],[subsetsG,2],[vennG,2],[cardG,2]]
};
D.gen=function(t,lvl){const list=D.GEN[t];let tot=0;list.forEach(g=>tot+=g[1]);let x=Math.random()*tot;
 for(const[g,w]of list){if((x-=w)<0)return g(lvl)}return list[0][0](lvl)};
})();
