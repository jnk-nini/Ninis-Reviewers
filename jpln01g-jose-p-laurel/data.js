/* JPL Midterm Reviewer — content taken from "Midterm Lessons JPL 2025" slides.
   Terms, names, and dates follow the slides. Slide numbers are given for every item. */
"use strict";

const TOPICS = {
  k: { n: "Ang Kabataan at Pag-aaral sa Maynila", short: "Kabataan at Maynila", icon: "🌱", sl: "2–8" },
  b: { n: "Paglilitis, U.P. at Kahusayan sa Batas", short: "Kahusayan sa Batas", icon: "⚖️", sl: "9–15" },
  a: { n: "Pag-aaral sa Ibang Bansa at Pagbabalik sa Pilipinas", short: "Ibang Bansa at Interyor", icon: "🎓", sl: "16–24" },
  p: { n: "Ang Pag-alis at Pagbalik sa Paglilingkod sa Bayan", short: "Pamilya at Senador", icon: "🏛️", sl: "25–33" },
  c: { n: "Kalayaan, Konstitusyon at Kataas-taasang Hukuman", short: "Kalayaan at Hukuman", icon: "📜", sl: "34–44" },
  d: { n: "Panahon ng Digmaan: Ang Pananakop", short: "Pananakop ng Hapon", icon: "🌊", sl: "46–63" },
  r: { n: "Ikalawang Republika ng Pilipinas", short: "Ikalawang Republika", icon: "🌸", sl: "64–90" },
  w: { n: "Pagkatapos ng Digmaan", short: "Pagkatapos ng Digmaan", icon: "🕊️", sl: "91–94" }
};
const TK = Object.keys(TOPICS);

/* ---------------- STUDY NOTES ----------------
   h = heading, sl = slide(s), b = body (HTML). Keep each card short: key points + one "Tandaan" line. */
const NOTES = {
k: [
 { h: "Ang unang paaralan", sl: "2", b: `<ul>
  <li>Ipinasok si Jose sa paaralan ni <b>Padre Valerio Malabanan</b>.</li>
  <li>Inakala ng mga unang guro na <b>wala nang pag-asa</b> si Jose dahil siya'y <b>pabaya</b> sa pag-aaral.</li>
  <li>Nakita ng komunidad ang isang kabataang walang magandang kinabukasan — <b>ngunit hindi sa puso ng kanyang ina</b>.</li></ul>
  <p class="key">🔑 Tandaan: Padre <b>V</b>alerio <b>M</b>alabanan — unang paaralan ni Jose.</p>` },
 { h: "Ang Kuwintas na Ginto ni Doña Jacoba", sl: "3", b: `<ul>
  <li>Hinandugan ni <b>Doña Jacoba</b> si Jose ng <b>kuwintas na ginto</b> na may <b>palawit na krus</b> — tanda ng <b>pagkalinga ng ina</b>.</li>
  <li>Ito ang <b>gumising sa kaisipan</b> ni Jose; naging maayos ang pag-aaral at <b>nakatapos siya ng intermedya</b>.</li>
  <li>Lalong tumibay ang <b>bigkis ng pagmamahalan ng mag-ina</b>.</li></ul>
  <p class="key">🔑 Tandaan: Kuwintas + krus → gumising kay Jose → natapos ang intermedya.</p>` },
 { h: "San Juan de Letran (1906)", sl: "4–5", b: `<ul>
  <li><b>1906</b>, sa gulang na <b>15</b>, nilisan ni Jose ang <b>Tanauan</b> upang mag-aral sa <b>Alma Mater ng kanyang ama</b>: <b>San Juan de Letran</b>.</li>
  <li>Hindi maganda ang unang taon — <b>mababa ang marka sa isang asignatura</b>.</li>
  <li><b>Kalungkutan ng ina</b>: inakala niyang susunod si Jose sa mga yapak ng ama sa kukuning propesyon.</li>
  <li><b>Simula ng pagbabago at pagbangon</b>: <b>pagbitiw bilang miyembro ng orkestra ng Tanauan</b>.</li></ul>
  <p class="key">🔑 Tandaan: 1906 · 15 taon · Letran · umalis sa orkestra = simula ng pagbabago.</p>` },
 { h: "Manila South High School (Intramuros)", sl: "6–7", b: `<ul>
  <li>Lumipat si Jose rito sa <b>ikalawang taon</b> at dito na nagtapos noong <b>1911</b>.</li>
  <li>Nag-aral habang nagtatrabaho bilang <b>sacristan</b> ng simbahan — ang pagkatuto ng <b>katesismo</b> ang nagpawala ng <b>mali niyang paniniwala sa relihiyon</b>.</li>
  <li>Sinanay ng mga <b>gurong Amerikano</b> sa: kaisipang <b>pulitikal, pamumuno, kultura, kasaysayan, pamahalaan</b> at <b>liberal na demokrasya</b>.</li>
  <li>Mga trabaho habang nag-aaral:
   <ul><li><b>English Teacher</b> – La Regeneracion High School, <b>Trozo</b></li><li><b>Clerk</b> – <b>Bureau of Forestry</b></li></ul></li></ul>
  <p class="key">🔑 Tandaan: Sacristan → katesismo · English Teacher (Trozo) · Clerk (Forestry).</p>` },
 { h: "Ang kaso noong 1909", sl: "8", b: `<ul>
  <li>Hindi nagtamo ng <b>karangalan</b> sa Manila South High School — nasangkot siya sa isang pangyayaring <b>halos nagwasak sa kanyang buhay</b>.</li>
  <li><b>1909</b>, habang nagbabakasyon sa <b>Tanauan</b>, isinakdal si Jose sa salang <b>Nabigong Pagpatay</b>.</li>
  <li><b>Dalawang taon</b> na paglilitis — labis na pinagdusa ni Doña Jacoba at <b>ikinaubos ng kabuhayan</b>.</li></ul>
  <p class="key">🔑 Tandaan: 1909 · Tanauan · Nabigong Pagpatay · 2 taong paglilitis.</p>` }
],
b: [
 { h: "Ang paglilitis at pagpapawalang-sala", sl: "9", b: `<ul>
  <li><b>Nanalo sa kaso</b> ang mga Laurel.</li>
  <li>Abugado: <b>Clyde De Witt</b> — napakahusay ngunit napakamahal.</li>
  <li>Binayaran ng <b>P10,000.00</b> — napakalaking halaga noong panahong iyon.</li></ul>
  <p class="key">🔑 Tandaan: De Witt · P10,000.00.</p>` },
 { h: "U.P. College of Law at si Paciencia Hidalgo (1911)", sl: "10–11", b: `<ul>
  <li><b>1911</b> — nagtapos sa mataas na paaralan bago pumasok sa <b>University of the Philippines – College of Law</b>.</li>
  <li>Ipinasya niyang mag-aral ng <b>abugasya</b> <b>dahil sa kanyang dating kaso</b>.</li>
  <li><b>1911</b> din — ikinasal si Jose kay <b>Paciencia Hidalgo</b>.</li></ul>
  <p class="key">🔑 Tandaan: 1911 = tatlong pangyayari: nagtapos ng HS, pumasok sa U.P. Law, ikinasal kay Paciencia.</p>` },
 { h: "Kahusayan sa Batas", sl: "12–13", b: `<ul>
  <li>Umunlad ang kaalaman sa batas mula sa panutong natanggap sa <b>komite</b> at sa <b>Kolehiyo ng Batas</b> — itinuro ang <b>kaisipang liberal</b> at <b>teoryang demokratiko</b>.</li>
  <li>Nakamit ang <b>mataas na grado</b> sa paaralan ng batas.</li>
  <li>Tesis na napiling <b>pinakamahusay</b>: <i>“What lessons may be derived by the Philippine Islands from the Legal History of Louisiana”</i>.</li>
  <li><b>Marso 1915</b> — nagtapos ng abugasya <b>nang may karangalan</b>.</li>
  <li><b>Setyembre 1915</b> — <b>pangalawang puwesto</b> sa <b>Bar Examinations</b>.</li></ul>
  <p class="key">🔑 Tandaan: Tesis = Louisiana · Marso 1915 may karangalan · Setyembre 1915 ika-2 sa Bar.</p>` },
 { h: "Sagutin ang mga Katanungan (slides 14–15)", sl: "14–15", b: `<p>Mga tanong sa slides na maaaring lumabas bilang sanaysay. Sanayin ito sa <b>🧠 Active Recall → Sanaysay</b>.</p><ul>
  <li>Ano ang naging malaking dagok kay Doña Jacoba?</li><li>Bakit nangako si Jose na magbabago siya?</li>
  <li>Anong pangyayari ang muntik nang magwasak sa buhay ni Jose?</li><li>Patunay na mahusay si Jose sa pag-aaral ng batas.</li></ul>` }
],
a: [
 { h: "Si Jose bilang pensionado sa Yale", sl: "16–18", b: `<ul>
  <li>Isa siyang <b>Pilipinong pensionado</b>; iniwan ang pamilya at tumungo sa <b>Estados Unidos</b> (sa pangangasiwa ng <b>Direktor ng Edukasyon</b>).</li>
  <li><b>Yale University</b> — <b>post graduate work sa batas</b>.</li>
  <li>Kinuha ang <b>Master in Constitutional Law</b> sa payo ni <b>Justice Street</b>.</li>
  <li>Ngunit <b>Doctor of Civil Laws</b> ang ipinagkaloob sa kanya <b>sa halip na</b> Master sa batas.</li></ul>
  <p class="key">🔑 Tandaan: Payo ni Justice Street → Master in Constitutional Law → naging Doctor of Civil Laws.</p>` },
 { h: "Pagtatapos sa Yale at Europa", sl: "19–20", b: `<ul>
  <li>Nagtapos sa Yale noong <b>Hulyo 19, 1920</b>.</li>
  <li><b>Tatlong buwan</b> pagkaraan, tinanggap siya sa <b>Court of Appeals</b> at <b>Korte Suprema ng Distrito ng Columbia</b> (Estados Unidos).</li>
  <li>Sa Europa: <b>University of Sorbonne (Paris)</b> — espesyal na lecture sa <b>legal at maunlad na pilosopiyang pulitikal</b> (legal and advanced political philosophies); at <b>University of Oxford (England)</b>.</li>
  <li>Pagkaraan ng <b>dalawang buwan</b> sa Europa, umuwi na sa Pilipinas.</li></ul>
  <p class="key">🔑 Tandaan: Yale (Hulyo 19, 1920) → +3 buwan Court of Appeals & D.C. → Sorbonne & Oxford (2 buwan).</p>` },
 { h: "Pagbabalik at ang Departamento ng Interyor", sl: "21", b: `<ul>
  <li><b>Disyembre 30, 1920</b> — dumating sa Pilipinas; bumalik sa <b>Kawanihang Ehekutibo ng Departamento ng Interyor</b>.</li>
  <li><b>1921</b> — itinalagang <b>Undersecretary</b> ng Departamento ng Interyor.</li>
  <li>Pagkaraan ng <b>pitong buwan</b> — <b>Sekretaryo ng Interyor</b> ni <b>Gobernador Heneral Leonard Wood</b>.</li></ul>` },
 { h: "Sekretaryo ng Interyor", sl: "22–24", b: `<ul>
  <li><b>31 taong gulang</b> — <b>pinakabatang miyembro ng gabinete</b>.</li>
  <li>Pinagtuunan ang <b>administrasyon ng Pamahalaang Lokal</b> at <b>Sistema ng eleksyon</b>.</li>
  <li>Tumagal lamang ng <b>limang buwan</b> dahil sa <b>pagbagsak ng administrasyon ni Gobernador Heneral Wood</b>.</li></ul>
  <div class="book">📖 <b>Basahin sa Libro:</b> Ang <b>kaso ni Conley</b> (slide 24: “Paano pinatunayan ni Jose P. Laurel na siya'y may prinsipyo sa kaso ni Conley?”). Konteksto: si Ray Conley ay isang Amerikanong detektib ng pulisya ng Maynila na inimbestigahan; ipinilit ni Laurel ang tamang proseso at pagdisiplina, at nang panigan ni G.H. Wood si Conley, <b>nagbitiw si Laurel</b> sa tungkulin bilang paninindigan sa prinsipyo. Basahin ang detalye sa libro.</div>
  <p class="key">🔑 Tandaan: 31 taon · pinakabata · 5 buwan lang · Wood.</p>` }
],
p: [
 { h: "Panahon para sa pamilya", sl: "25", b: `<ul>
  <li>Naging malaya sa pananagutan at paglilingkod-publiko; inilaan ang panahon sa <b>pagpapatatag ng kabuhayan ng pamilya</b>, katuwang si <b>Doña Paciencia</b>.</li>
  <li>Mga anak: <b>Jose Bayani</b>, <b>Jose Sotero III</b>, <b>Natividad</b>, <b>Sotero Cosme</b>, <b>Mariano Antonio (Maning)</b>, <b>Rosenda Paciencia</b>, <b>Potenciana (Nita)</b>, <b>Salvador Roman (Doy)</b>, at <b>Arsenio (Dodgie)</b> — <b>siyam</b> lahat.</li></ul>
  <p class="key">🔑 Tandaan: 9 na anak · may palayaw: Maning, Nita, Doy, Dodgie.</p>` },
 { h: "Ang Bupete (Law Office)", sl: "26–27", b: `<ul>
  <li>Nagtayo ng <b>Bupete (Law Office)</b>; mga kapartner: <b>Vicente del Rosario</b> at <b>Guillermo Lualhati</b>.</li>
  <li><b>Nagturo ng Batas sa U.P.</b> at <b>nagsulat ng mga legal na textbook</b>.</li>
  <li>Kabilang sa kliyente ang mga <b>kompanya ng mga Hapones</b> — malimit niyang makasalamuha sa mga piging ang <b>konsuladong Hapones</b>.</li>
  <li><b>1927</b> — ipinanalo ang isang kaso sa <b>Seguro</b>; binayaran siya ng <b>daang libo</b>.</li></ul>` },
 { h: "Ang tahanan sa Paco", sl: "28", b: `<ul>
  <li>Bumili ng <b>Ancestral (lumang) bahay</b> sa <b>Distrito ng Paco</b>, <b>625 Kalye Peñafrancia</b>, sa panulukan ng <b>Santo Sepulcro</b>.</li>
  <li>Gawain ng pamilya:<ul>
   <li>Sabado at Linggo — sa <b>Luneta</b></li><li>Naglalaro at nagbababad sa <b>Look ng Maynila</b></li>
   <li>Namamasyal at naliligo sa paliguan sa <b>Los Baños</b></li><li>Namimili ng <b>puto, kalamay at kutsinta</b> sa <b>Biñan</b></li></ul></li></ul>
  <p class="key">🔑 Tandaan: 625 Peñafrancia, Paco · Luneta–Look–Los Baños–Biñan.</p>` },
 { h: "Pagbabalik sa pulitika: Senador", sl: "29–30", b: `<ul>
  <li>Pagkaraan ng <b>dalawang taon</b>, muling pumasok sa pulitika.</li>
  <li>Kumandidatong <b>senador sa ikalawang Distrito</b> (<b>Batangas, Cavite, Laguna at Tayabas</b>).</li>
  <li>Kalaban: <b>Antero Soriano</b>, isang <b>Nacionalista</b> mula Cavite na <b>suportado ni Quezon</b>. Madaling natalo ni Jose si Soriano.</li>
  <li>Bilang Senador:<ul>
   <li><b>Rebisyon ng Kodigo Sibil ng Pilipinas</b> — napagtibay ng dalawang kapulungan noong kalagitnaan ng 1920 ngunit <b>ipinatupad lamang noong 1949</b>.</li>
   <li><b>1928</b> — panukalang batas na <b>bigyang-karapatan ang kababaihan na makaboto</b> (<b>hindi nagtagumpay</b>).</li></ul></li></ul>
  <p class="key">🔑 Tandaan: BaCaLaTa (Batangas, Cavite, Laguna, Tayabas) · Kodigo Sibil → 1949 · Boto ng kababaihan 1928 (bigo).</p>` },
 { h: "Pananampalataya at ang pagkatalo noong 1931", sl: "31–33", b: `<ul>
  <li>Si Jose ay <b>umanib sa Masonerya</b>.</li>
  <li>Bumalik sa <b>Katolisismo</b> bilang pagsunod sa kahilingan ng <b>inang may malubhang karamdaman</b>, ngunit may pananaw na salungat sa simbahan.</li>
  <li>Hindi sang-ayon sa <b>pagiging panatiko</b>; inilagay nang buong-buo ang pananalig sa <b>Diyos</b>.</li>
  <li>Naniniwalang ang <b>relihiyon ay maaaring piliin</b>.</li>
  <li>Naghain ng panukalang batas na <b>dapat magbayad ng buwis ang mga korporasyong panrelihiyon</b> (kailangan ng pondo ng pamahalaan).</li>
  <li>Bunga: <b>inalis ng simbahan ang suporta</b> → <b>natalo sa re-eleksyon noong 1931</b> kay <b>Claro M. Recto</b>.</li>
  <li>Ang mga taon pagkaraan ng halalang 1931 ay mahalaga — <b>nakataya ang usapin ng Kalayaan</b>.</li></ul>
  <p class="key">🔑 Tandaan: Buwis sa korporasyong panrelihiyon → nawala suporta ng simbahan → talo kay Recto (1931).</p>` }
],
c: [
 { h: "Hare-Hawes-Cutting Act", sl: "34–37", b: `<ul>
  <li>Kailangan ang <b>pagsang-ayon ng pamahalaan ng Estados Unidos at ng mga mamamayan nito</b> sa pagkakaloob ng Kalayaan.</li>
  <li>Dalawang partido (sa Estados Unidos): <b>Republican Party</b> — <b>tutol</b>; <b>Democratic Party</b> — <b>isinusulong</b>.</li>
  <li>Republikano ang pangulo ng E.U., si <b>Herbert Hoover</b>, ngunit sa eleksyong <b>1932 (USA)</b> naging mayorya ang mga <b>Demokrata</b> sa Mababang Kapulungan.</li>
  <li><b>1932</b> — inalok si Laurel ng <b>Justice Department portfolio</b> ngunit <b>tinanggihan</b> (ipagpapatuloy ang pagkamananggol at pagtuturo).</li>
  <li>Pagkatapos ng <b>isang taong pananahimik</b>, hayagang <b>kumampanya</b> si Laurel sa pagtanggap ng Hare-Hawes-Cutting Act.</li>
  <li>Bunga ng <b>ikaanim na misyong pangkalayaan</b> na pinamunuan nina <b>Senate President Pro-Tempore Sergio Osmeña</b> at <b>House Speaker Manuel Roxas</b> (OsRox).</li>
  <li>Laman: pagkakaloob at pagkilala ng Kalayaan pagkaraan ng <b>sampung taong panahon ng transition</b>.</li></ul>
  <p class="key">🔑 Tandaan: HHC = OsRox mission (ika-6) · 10 taong transition · Laurel kumampanya PABOR.</p>` },
 { h: "Tydings-McDuffie Law (1934)", sl: "38", b: `<ul>
  <li><b>1934</b> — matagumpay na naiuwi ni <b>Quezon</b> mula Estados Unidos.</li>
  <li>Katulad ng Hare-Hawes-Cutting Act: Kalayaan sa loob ng <b>sampung taon</b> (transition).</li>
  <li>May <b>probisyon ng halalan para sa mga delegado ng Kombensiyong Konstitusyonal</b>; agad bumuo ng Kombensyong Konstitusyonal.</li></ul>
  <p class="key">🔑 Tandaan: HHC → OsRox; Tydings-McDuffie → Quezon (1934).</p>` },
 { h: "1935 Konstitusyon ng Commonwealth", sl: "39–40", b: `<ul>
  <li>Nahalal si Laurel na <b>delegado ng ikatlong distrito ng Batangas</b>.</li>
  <li><b>Recto</b> — <b>permanenteng tagapangulo</b> ng kombensiyon.</li>
  <li><b>Laurel</b> — tagapangulo ng <b>Batas ng mga Karapatan (Bill of Rights)</b>; halos lahat ng tadhana ng mga karapatan ay siya ang sumulat.</li>
  <li>Kinilala bilang isa sa <b>“pitong matatalinong lalaki ng kombensiyon”</b>.</li>
  <li>Pinagtibay ang Konstitusyon noong <b>1935</b>; nahalal si <b>Quezon na Pangulo</b>.</li>
  <li><b>Recto at Laurel</b> — naging <b>Mahistrado ng Kataas-taasang Hukuman</b>.</li></ul>
  <p class="key">🔑 Tandaan: Bill of Rights = Laurel · Permanenteng tagapangulo = Recto · “7 matatalinong lalaki”.</p>` },
 { h: "Mahistrado ng Kataas-taasang Hukuman", sl: "41–43", b: `<ul>
  <li>Sa <b>kasong Cuevo-Barredo</b>: ang <b>Lehislatura, Ehekutibo, at Hudikatura</b> ay pinagkalooban ng Konstitusyon ng <b>hiwa-hiwalay na kapangyarihan</b>.</li>
  <li><b>1938</b> — iminungkahi kay Quezon ang <b>kodigo ng mamamayan</b> na ituturo sa mga paaralan.</li>
  <li>Iminungkahi rin ang <b>Bushido (Kodigo ng Mandirigma)</b>.</li>
  <li>Nalugod si Quezon at nag-atas na bumuo ng komite na lilikha ng <b>“kodigong panlipunan”</b> — isang <b>kodigo etika at pansariling kaugalian</b>.</li></ul>` },
 { h: "Sekretaryo ng Katarungan (1941)", sl: "44", b: `<ul>
  <li><b>Oktubre 1941</b> — inanyayahan ni Quezon si Laurel na maging <b>Sekretaryo ng Katarungan</b>.</li>
  <li><b>Tumanggi</b> si Laurel — siya ay <b>nakatataas na katulong na Mahistrado</b>, kasunod ng Punong Mahistrado.</li>
  <li>Naging masigasig si Quezon; tinanggap ni Laurel at itinalaga noong <b>Disyembre 17, 1941</b>.</li></ul>` }
],
d: [
 { h: "Ang pagsiklab ng digmaan", sl: "46–47", b: `<ul>
  <li>Bilang miyembro ng gabinete, dumadalo araw-araw si Laurel sa pulong sa <b>tahanan ni Quezon sa Marikina</b>.</li>
  <li>Binomba ang <b>Pearl Harbor</b>; sinalakay ng hukbong panghimpapawid ng Hapon ang hilagang lalawigan; nagapi ang <b>USAFFE</b>.</li>
  <li>Lumaganap ang palagay na <b>hindi handa ang Estados Unidos</b> na ipagtanggol ang Pilipinas.</li>
  <li>Alam ni <b>Heneral Douglas MacArthur</b> ang kawalang-kahandaan kaya pinayuhan si Quezon na magtungo sa <b>Corregidor</b>.</li>
  <li><b>Disyembre 23, 1941</b> — pulong sa Marikina; ipinahayag ng Pangulo ang pangwakas na pasya.</li></ul>` },
 { h: "Ang pag-alis ni Quezon", sl: "48–49", b: `<ul>
  <li>Isasama ni Quezon ang Punong Mahistrado <b>Jose Abad Santos</b>.</li>
  <li>Si Laurel — itinalagang <b>pansamantalang Punong Mahistrado</b> bukod sa pagiging Sekretaryo ng Katarungan.</li>
  <li>Maiiwan si Laurel sa Maynila upang tulungan si <b>Jorge B. Vargas</b>, ang <b>Alkalde ng Kalakhang Maynila</b>.</li>
  <li><b>Disyembre 24, 1941</b> — sinamahan ni Laurel si Quezon mula sa <b>Palasyo ng Malacañang</b>; <b>hindi na niya muling nakita</b> ang Pangulo.</li>
  <li>Si Vargas ang naging <b>puno at kinatawan ng Pamahalaang Commonwealth</b>, katulong si Laurel.</li></ul>` },
 { h: "Pagpasok ng Hapon at ang Komisyong Pampangasiwaan", sl: "50–52", b: `<ul>
  <li><b>Enero 2, 1942</b> — pumasok sa Maynila ang puwersa ng Hapon. Binomba muna ang Maynila at Cavite; laganap ang nakawan; inalisan ng sandata ang pulisya.</li>
  <li><b>Utos Pangasiwaan Blg. 1, Enero 23, 1943</b> (ayon sa slide) — itinatag ang <b>Komisyong Pampangasiwaan</b>:</li></ul>
  <table class="tbl"><tr><td>Jorge B. Vargas</td><td>Tagapangulo</td></tr><tr><td>Benigno Aquino</td><td>Komisyoner Panloob</td></tr>
  <tr><td>Antonio de las Alas</td><td>Komisyoner ng Pananalapi</td></tr><tr><td><b>Jose P. Laurel</b></td><td><b>Komisyoner ng Katarungan</b></td></tr>
  <tr><td>Rafael Alunan</td><td>Komisyoner ng Pagsasaka at Pangungubat</td></tr><tr><td>Claro M. Recto</td><td>Komisyoner ng Edukasyon at Kapakanang Pangmadla</td></tr>
  <tr><td>Quintin Paredes</td><td>Komisyoner ng mga Gawaing-Bayan at Komunikasyon</td></tr><tr><td>Teofilo Sison</td><td>Pangkalahatang Awditor at Direktor ng Budget</td></tr>
  <tr><td>Jose Yulo</td><td>Punong Mahistrado ng Kataas-taasang Hukuman</td></tr></table>` },
 { h: "Komisyoner ng Katarungan", sl: "53–59", b: `<ul>
  <li>Pinanatili ang bawat isa sa dating posisyon, ngunit <b>nakialam ang mga militar</b>: ang <b>Kempeitai (pulis militar)</b> ay humaharap sa hukuman upang ipawalang-saysay ang mga kaso.</li>
  <li>Nagpalabas si Laurel ng <b>sirkular</b> na nagbabawal sa pagwawalang-bisa ng mga kaso maliban sa <b>legal na proseso</b>.</li>
  <li>Dahil dito, pinagreport sa <b>Fort Santiago</b>, pinigil ng <b>tatlong oras</b>, inutusang bawiin ang sirkular. Sagot niya: <b>“pag-iisipan niya ito”</b>; bumalik nang hindi sinaktan.</li>
  <li>Ang pagtutol sa militar na Hapones ay <b>mangangahulugan ng kamatayan ng isang kababayan</b>.</li>
  <li>Inutusang magpadala ng <b>kablegrama kay Quezon</b> na sila ay sumusunod na sa <b>Greater East Asia Co-Prosperity Sphere</b> — sinunod upang iligtas ang sarili at hindi paghigantihan.</li>
  <li>Dahil sumunod, nakapamagitan siya para kina <b>Heneral Roxas</b> at <b>Punong Mahistrado Jose Abad Santos</b> (ngunit <b>ipinabaril</b> na ang huli). Tinulungan din ang mga <b>bilanggo ng digmaan</b>.</li></ul>` },
 { h: "KALIBAPI (Disyembre 1942)", sl: "60–61", b: `<ul>
  <li><b>KALIBAPI</b> = <b>Kapisanan sa Paglilingkod sa Bagong Pilipinas</b>.</li>
  <li>Layunin: <b>pagsasanib ng lahat ng Pilipino</b> para sa isang mabisang <b>pamahalaang totalitaryo</b>.</li>
  <li>Pangulo — <b>Vargas</b>; Pangalawang Pangulo — <b>Benigno (Aquino)</b>.</li>
  <li>Si Laurel — mula sa Departamento ng Katarungan ay naging <b>Komisyoner Panloob</b>.</li></ul>
  <p class="key">🔑 Tandaan: KA-LI-BA-PI = KApisanan sa paglILingkod sa BAgong PIlipinas.</p>` },
 { h: "Pagtatangka sa buhay ni Laurel", sl: "62–63", b: `<ul>
  <li><b>Hunyo 5, 1943</b> — habang naglalaro ng <b>golf</b> sa <b>Wack Wack Country Club</b>, <b>Mandaluyong</b>, binaril sa likod ng hindi nakikilalang tao.</li>
  <li>Isinugod sa <b>PGH</b>.</li>
  <li>Labis niyang dinamdam ang <b>bintang na siya'y maka-Hapones</b> kaya pinagtangkaan ang kanyang buhay.</li></ul>` }
],
r: [
 { h: "Paghahanda para sa Kalayaan", sl: "64–66", b: `<ul>
  <li>Nanguna si Laurel sa talaan ng <b>Komisyon sa Paghahanda para sa Kalayaan</b>; naging <b>tagapangulo</b> habang <b>nakaratay pa sa PGH</b>.</li>
  <li>Bumuo ng <b>Saligang-Batas</b> para sa Republika — inilaan lamang <b>habang nasa kalagayan ng digmaan</b>.</li>
  <li><b>Setyembre 7, 1943</b> — iniharap ang Saligang-Batas.</li>
  <li><b>Setyembre 25, 1943</b> — <b>Pambansang Asamblea</b>: <b>Aquino</b> bilang <b>Ispiker</b>, <b>Laurel</b> bilang <b>Pangulo ng Pilipinas</b>.</li></ul>` },
 { h: "Paglalakbay patungong Tokyo", sl: "67–71", b: `<ul>
  <li>Sina <b>Laurel, Aquino at Vargas</b> — inatasang mag-report kay <b>Premier Hideki Tojo</b>; dumating sa Japan noong <b>Setyembre 30</b>.</li>
  <li>Kumperensya kina: <b>Punong Ministro Tojo</b>, <b>Ministro Shigemitsu</b> (Ministrong Panlabas), <b>Aoki</b> (Ministro ng Kalakhang Silangang Asya), <b>Embahador Murata</b>, <b>Heneral Wachi</b>.</li>
  <li>Hiniling na <b>magdeklara ng digmaan laban sa Estados Unidos at Great Britain</b>.</li>
  <li>Nabigla sila; tahimik na nanalangin si Laurel ng <b>Pater Noster</b>.</li>
  <li>Pagkatapos magsalin si <b>Hamamoto</b>, magalang na <b>tumanggi</b> si Laurel: <i>“...Mga taong walang utang na loob lamang ang maaasahang gagawa ng ganito.”</i></li>
  <li>Ayon kay Tojo: ang pagpipilian ay <b>pagkalipol o Kalayaan</b>.</li>
  <li>Bumalik sa Pilipinas noong <b>Oktubre 14, 1943</b> (kasama sina Vargas, Aquino, San Victores at Gonzales).</li></ul>` },
 { h: "Ikalawang Republika: inagurasyon at patakaran", sl: "71–75", b: `<ul>
  <li>Pinanumpa si Laurel bilang <b>Pangulo ng Ikalawang Republika ng Pilipinas</b> (Oktubre 1943).</li>
  <li>Nang araw ding iyon — <b>kasunduan ng Pagkakaisa</b> (pulitikal, pangkabuhayan, pangmilitar), ginampanan ni <b>Claro M. Recto</b> (<b>Ministro ng mga Suliraning Panlabas</b>).</li>
  <li>Pangunahing patakaran: <b>Pambansang Kaligtasan</b>.</li>
  <li><i>“Tanging mga Pilipino lamang ang maaaring magmahal sa mga Pilipino.”</i> — JPL</li>
  <li>Isang pamahalaan <b>ng mga Pilipino, pinamamahalaan ng mga Pilipino at para sa mga Pilipino</b> — hindi didiktahan ng dayuhan.</li>
  <li>Ideolohiyang moral: pinakamalalim na pundasyon ay <b>katarungang maka-Diyos</b>.</li>
  <li>Ang tao ay naninirahan sa <b>tatlong daigdig: pisikal, intelektwal, at moral</b> — dapat dominahan ng <b>prinsipyong moral</b>.</li></ul>
  <p class="key">🔑 Tandaan: PIM — Pisikal, Intelektwal, Moral.</p>` },
 { h: "Pamumuhay bilang Pangulo", sl: "76–78", b: `<ul>
  <li>Ipinatupad ang <b>patakaran ng pagtitipid</b>.</li>
  <li>Iniutos na anumang mayroon sa <b>Malacañang</b> ay ipagkaloob sa <b>maralita</b>.</li>
  <li><b>Ipinagbawal ang mga sosyal na pagdiriwang</b>.</li>
  <li>Naging <b>lubhang relihiyoso</b> mula nang manumpa bilang Pangulo.</li>
  <li><b>Kalatas na Binasa sa Bayan ng Kawit, Kabite (Hunyo 25, 1944)</b> — sa pamamahagi ng <b>Damit na Alaala</b> ng Pangulong Laurel. <span class="muted">(Basahin sa Libro)</span></li></ul>` },
 { h: "Estado ng Digmaan (Setyembre 1944)", sl: "79–82", b: `<ul>
  <li>Ipinaalam ni <b>Embahador Shozo Murata</b> na ang <b>Tsina (Nanking), Siam</b> at ang <b>Bose Probisyonal na pamahalaan ng India</b> ay nagdeklara na ng digmaan laban sa Amerika at Inglatera.</li>
  <li>Nasa gipit na kalagayan; pinulong ang Gabinete. Apat na mapagpipilian:<ol>
   <li>Tanggihan ang pamimilit at tumakas.</li><li>Umakyat sa kabundukan, kasama o hindi ang pamilya.</li>
   <li>Magpatiwakal silang lahat.</li><li>Humanap ng kalutasan o makipagkasundo.</li></ol></li>
  <li>Intensiyon ni Laurel: <b>hindi pakikipagdigmaan</b> kundi <b>Estado ng Digmaan (State of War)</b>. Pagkatapos ay inihayag ang <b>Batas Militar (Martial Law)</b>.</li>
  <li>Tinanggihan ang <b>sapilitang pagsusundalo</b> ng mga Pilipino laban sa E.U. — wala ito sa kasunduan/patakaran ng Republika.</li></ul>` },
 { h: "Ang wakas ng Republika", sl: "83–88", b: `<ul>
  <li>Tinupad ni <b>Hen. MacArthur</b> ang pangako — bumalik sa mga huling araw ng Setyembre kasama ang di-inaasahang puwersa.</li>
  <li><b>Disyembre 21, 1944</b> — dinala si Laurel, pamilya at Gabinete sa <b>Baguio</b>; nanirahan nang <b>tatlong buwan</b>.</li>
  <li>Marso 16 — pinagsabihan ni <b>Embahador Murata</b> na magtungo na sa <b>Hapon</b>.</li>
  <li><b>Agosto 17, 1945</b> — nang malaman ang <b>pagsuko ng Hapon</b>, <b>pinawalang-bisa</b> ni Laurel ang kanyang pamahalaan. Nabigo siyang makipag-ugnayan kay MacArthur.</li>
  <li>Nalaman nilang si Laurel, Aquino at Vargas ay <b>pinaghahanap (wanted)</b> ng punong-himpilan ni MacArthur sa Tokyo.</li>
  <li><b>Telegrama</b> kay MacArthur nina <b>Laurel at Aquino</b>: si <b>Vargas at Capinpin</b> ang pinakiusapang magbigay-alam; magtutungo sila sa Tokyo upang ipailalim ang sarili sa kapangyarihan nito.</li>
  <li><b>Lt. Col. Turner</b> — dumating upang arestuhin sila. Haharapin ang pagkakasalang <b>Kataksilang Pakikipagtulungan sa Hapon</b>.</li></ul>` },
 { h: "Pagpapalawak ng Kaalaman (slides 89–90)", sl: "89–90", b: `<ul><li>Kahulugan ng “Pambansang Kaligtasan”.</li><li>Paano ipinakita ni Laurel ang pagmamahal sa kababayan nang ipilit ang sapilitang pagsusundalo?</li><li>Bakit pinayuhan ni MacArthur si Quezon na magtungo sa Corregidor?</li></ul><p>Sanayin sa <b>🧠 Active Recall → Sanaysay</b>.</p>` }
],
w: [
 { h: "Pagkapiit at pagsusulat", sl: "91–92", b: `<ul>
  <li>Napiit si Laurel nang <b>sampung buwan</b>.</li>
  <li>Inabala ang sarili sa pagsusulat tungkol sa <b>aklat ni Birkenhead</b> ukol sa mga pangyayari sa kanyang buhay noong digmaan — ginamitan ng <b>disiplinang judicial</b> at <b>estilong memorandum</b>.</li>
  <li>Isinulat ang pananaw na moral at pulitikal: <b>PRO DEO et PATRIA – Para sa Diyos at Bayan</b>.</li></ul>
  <p class="key">🔑 Tandaan: PRO DEO = para sa Diyos · PATRIA = para sa Bayan.</p>` },
 { h: "Pagbabalik sa Pilipinas at Kalayaan", sl: "93", b: `<ul>
  <li><b>Hunyo 23, 1946</b> — lumisan sa Hapon pauwi sina <b>Laurel, Vargas, Aquino, Osias, at Jose III</b>; ipasasailalim sa Republika.</li>
  <li>Pinamumunuan noon ni <b>Manuel Roxas</b> ang Pilipinas.</li>
  <li><b>Hulyo 4, 1946</b> — ipinagkaloob ang Kalayaan; <b>nawala na ang Commonwealth</b>.</li>
  <li>Nanalo si <b>Roxas laban kay Osmeña</b>; inagurasyon bilang Pangulo noong <b>Hulyo 4, 1946</b>.</li></ul>` },
 { h: "Basahin ng BUO sa libro", sl: "94", b: `<div class="book">📖 Ayon sa slide 94: <b>“Basahin ng BUO ang Pagtatapos ng Digmaan sa Libro, Kasama ito sa Midterm.”</b> Gamitin ang reviewer na ito para sa slides, at basahin ang kabanata sa libro para sa kumpletong detalye (hal. ang paglilitis sa kasong kataksilan at ang buhay ni Laurel pagkatapos ng digmaan).</div>` }
]
};

/* ---------------- KEY TERMS / FACTS ----------------
   [topic, term, meaning, clue, [other accepted answers], slide] */
const FACTS = [
 ["k","Padre Valerio Malabanan","Ang may-ari ng unang paaralang pinasukan ni Jose.","Isang pari; apelyido nagsisimula sa “M”.",["Valerio Malabanan","Malabanan"],"2"],
 ["k","Doña Jacoba","Ina ni Jose na naghandog sa kanya ng kuwintas na ginto.","Ina ni Jose; “Doña J…”.",["Jacoba","Dona Jacoba","Jacoba Garcia"],"3"],
 ["k","Kuwintas na Ginto","Handog ng ina na may palawit na krus — gumising sa kaisipan ni Jose.","Alahas na isinusuot sa leeg, may krus.",["gintong kuwintas","kuwintas"],"3"],
 ["k","Intermedya","Antas ng pag-aaral na natapos ni Jose matapos magising ang kanyang kaisipan.","Nagsisimula sa “I”, bago ang mataas na paaralan.",["intermediate"],"3"],
 ["k","San Juan de Letran","Alma Mater ng ama ni Jose na pinasukan niya noong 1906.","Kolehiyo sa Maynila; “Letran”.",["Letran","Colegio de San Juan de Letran"],"4"],
 ["k","Tanauan","Bayang nilisan ni Jose noong 1906 upang mag-aral sa Maynila.","Bayan sa Batangas.",["Tanauan Batangas"],"4"],
 ["k","Orkestra ng Tanauan","Ang binitawan ni Jose bilang simula ng kanyang pagbabago at pagbangon.","Grupong pangmusika ng kanyang bayan.",["orkestra"],"5"],
 ["k","Manila South High School","Paaralan sa Intramuros kung saan lumipat si Jose sa ikalawang taon at nagtapos noong 1911.","Nasa Intramuros; “Manila ___ High School”.",["Manila South"],"6"],
 ["k","Sacristan","Trabaho ni Jose sa simbahan habang nag-aaral.","Katulong ng pari sa simbahan.",["sakristan"],"6"],
 ["k","Katesismo","Ang natutunan ni Jose na nagpawala ng mali niyang paniniwala sa relihiyon.","Aral ng pananampalataya na itinuturo sa simbahan.",["catechism","katekismo"],"6"],
 ["k","La Regeneracion High School","Paaralan sa Trozo kung saan naging English Teacher si Jose.","“La Re…” sa Trozo.",["La Regeneracion"],"7"],
 ["k","Bureau of Forestry","Tanggapan kung saan naging clerk si Jose habang nag-aaral.","May kinalaman sa kagubatan.",["Forestry"],"7"],
 ["k","Nabigong Pagpatay","Ang salang isinakdal kay Jose noong 1909 sa Tanauan.","Tangkang pumatay na hindi natuloy.",["frustrated murder"],"8"],
 ["b","Clyde De Witt","Abugado ng mga Laurel — napakahusay ngunit napakamahal.","Amerikanong abugado; apelyido “De W…”.",["De Witt","Clyde DeWitt","DeWitt"],"9"],
 ["b","P10,000.00","Halagang ibinayad ng mga Laurel sa kanilang abugado.","Limang digit na halaga ng piso.",["10000","10,000","P10000","P10,000","sampung libo"],"9"],
 ["b","University of the Philippines – College of Law","Paaralang pinasukan ni Jose noong 1911 upang mag-aral ng abugasya.","U.P. …",["UP College of Law","UP Law","University of the Philippines","UP"],"10"],
 ["b","Paciencia Hidalgo","Babaeng pinakasalan ni Jose noong 1911.","Ang pangalan ay nangangahulugang “pasensya”.",["Paciencia","Doña Paciencia"],"11"],
 ["b","Louisiana","Ang lugar na ang kasaysayang legal ang paksa ng pinakamahusay na tesis ni Jose.","Estado sa Amerika.",["Legal History of Louisiana"],"12"],
 ["b","Bar Examinations","Pagsusulit noong Setyembre 1915 kung saan nagtamo si Jose ng pangalawang puwesto.","Pagsusulit para maging abugado.",["Bar","Bar Exam","Bar Examination"],"13"],
 ["a","Pensionado","Tawag kay Jose bilang iskolar ng pamahalaan na ipinadala sa Estados Unidos.","Iskolar na pinondohan ng pamahalaan; “Pen…”.",["pensionados","Pilipinong pensionado"],"17"],
 ["a","Yale University","Unibersidad sa E.U. kung saan nag-post graduate work sa batas si Jose.","Unibersidad sa Amerika; “Y…”.",["Yale"],"17"],
 ["a","Justice Street","Ang nagpayo kay Jose na kumuha ng Master in Constitutional Law.","“Justice” + salitang Ingles para sa kalye.",["Street"],"17"],
 ["a","Doctor of Civil Laws","Digring ipinagkaloob kay Jose sa Yale sa halip na Master sa batas.","Doktorado; “D.C.L.”",["DCL","Doctor of Civil Law"],"17"],
 ["a","Master in Constitutional Law","Kursong kinuha ni Jose sa Yale sa payo ni Justice Street.","Master tungkol sa saligang-batas.",["Constitutional Law"],"17"],
 ["a","Court of Appeals","Isa sa mga hukumang tumanggap kay Jose tatlong buwan pagkatapos ng Yale.","Hukuman ng apela.",["Court of Appeal"],"19"],
 ["a","University of Sorbonne","Unibersidad sa Paris kung saan dumalo si Jose sa lecture sa legal at maunlad na pilosopiyang pulitikal.","Nasa Paris, France.",["Sorbonne"],"20"],
 ["a","University of Oxford","Unibersidad sa England na pinuntahan ni Jose sa Europa.","Nasa England.",["Oxford"],"20"],
 ["a","Undersecretary ng Departamento ng Interyor","Posisyong itinalaga kay Jose noong 1921.","Pangalawa sa Sekretaryo.",["Undersecretary","Undersecretary of the Interior"],"21"],
 ["a","Sekretaryo ng Interyor","Posisyon ni Jose sa ilalim ni G.H. Leonard Wood; siya ang pinakabatang miyembro ng gabinete.","Pinuno ng Departamento ng Interyor.",["Secretary of the Interior","Kalihim ng Interyor"],"21"],
 ["a","Leonard Wood","Gobernador Heneral na pinaglingkuran ni Jose bilang Sekretaryo ng Interyor.","Gobernador Heneral; apelyido ay “kahoy” sa Ingles.",["Gobernador Heneral Leonard Wood","Wood"],"21"],
 ["a","Kaso ni Conley","Kasong nagpatunay na si Jose P. Laurel ay may prinsipyo (Basahin sa Libro).","Pangalan ng isang Amerikanong detektib; “C…”.",["Conley","Conley case"],"24"],
 ["p","Doña Paciencia","Katuwang ni Jose sa pagbibigay ng magandang kinabukasan sa mga anak.","Asawa ni Jose.",["Paciencia","Paciencia Hidalgo"],"25"],
 ["p","Bupete","Ang Law Office na itinayo ni Jose.","Opisina ng abugado; “Bu…”.",["Law Office","bufete"],"26"],
 ["p","Vicente del Rosario","Isa sa mga kapartner ni Jose sa Bupete (kasama si Guillermo Lualhati).","Apelyido ay “rosaryo”.",["del Rosario"],"26"],
 ["p","Guillermo Lualhati","Isa sa mga kapartner ni Jose sa Bupete (kasama si Vicente del Rosario).","Apelyido ay parang “luwalhati”.",["Lualhati"],"26"],
 ["p","Seguro","Uri ng kaso na naipanalo ni Jose noong 1927 at binayaran siya ng daang libo.","Insurance sa Filipino.",["insurance"],"27"],
 ["p","Paco","Distrito sa Maynila kung saan binili ni Jose ang ancestral na bahay.","“P…”, distrito sa Maynila.",["Distrito ng Paco"],"28"],
 ["p","625 Kalye Peñafrancia","Address ng tahanan ng mga Laurel sa Paco, panulukan ng Santo Sepulcro.","Numero 625 sa kalye na ipinangalan sa isang Birhen.",["Penafrancia","Peñafrancia","625 Penafrancia"],"28"],
 ["p","Biñan","Lugar kung saan namimili ang pamilya ng puto, kalamay at kutsinta.","Bayan sa Laguna na kilala sa puto.",["Binan"],"28"],
 ["p","Antero Soriano","Nacionalista mula Cavite na suportado ni Quezon; tinalo ni Jose sa pagka-senador.","Pangalang “Antero”.",["Soriano"],"29"],
 ["p","Kodigo Sibil ng Pilipinas","Ang nirebisa ni Jose bilang Senador; ipinatupad lamang noong 1949.","Civil Code.",["Kodigo Sibil","Civil Code"],"30"],
 ["p","Masonerya","Samahang inaniban ni Jose bilang Senador.","Freemasonry.",["Freemasonry","Mason"],"31"],
 ["p","Claro M. Recto","Tumalo kay Jose sa re-eleksyon noong 1931.","Kilalang makabayan; inisyal na “C.M.R.”",["Recto","Claro Recto"],"32"],
 ["c","Hare-Hawes-Cutting Act","Batas pangkalayaan na bunga ng ikaanim na misyong pangkalayaan nina Osmeña at Roxas.","Tatlong apelyido ng mambabatas na Amerikano; H-H-C.",["HHC","Hare-Hawes-Cutting","Hare Hawes Cutting Act"],"34–37"],
 ["c","Tydings-McDuffie Law","Batas na naiuwi ni Quezon noong 1934; Kalayaan sa loob ng sampung taon.","T-M; naiuwi ni Quezon.",["Tydings-McDuffie","Tydings McDuffie Act","Tydings-McDuffie Act"],"38"],
 ["c","Republican Party","Partidong tutol sa panukalang Kalayaan.","Partido ni Hoover.",["Republican","Republikano"],"34"],
 ["c","Democratic Party","Partidong nagsusulong ng panukalang Kalayaan.","Naging mayorya sa Mababang Kapulungan noong 1932.",["Democratic","Demokrata"],"34"],
 ["c","Herbert Hoover","Republikanong pangulo ng Estados Unidos noong panahon ng Hare-Hawes-Cutting Act.","Pangulo ng E.U., “H.H.”",["Hoover"],"35"],
 ["c","Justice Department portfolio","Posisyong inalok kay Jose noong 1932 ngunit tinanggihan.","May kinalaman sa katarungan.",["Justice Department"],"35"],
 ["c","Sergio Osmeña","Senate President Pro-Tempore na kasamang namuno sa ikaanim na misyong pangkalayaan.","Ang “Os” sa OsRox.",["Osmeña","Osmena","Sergio Osmena"],"36"],
 ["c","Manuel Roxas","House Speaker na kasamang namuno sa ikaanim na misyong pangkalayaan.","Ang “Rox” sa OsRox.",["Roxas"],"36"],
 ["c","Kombensiyong Konstitusyonal","Kapulungang binuo pagkatapos mapagtibay ang Tydings-McDuffie Law.","Kumbensyon para gumawa ng Konstitusyon.",["Constitutional Convention","Kombensyong Konstitusyonal"],"38"],
 ["c","Batas ng mga Karapatan (Bill of Rights)","Bahagi ng 1935 Konstitusyon na halos lahat ay isinulat ni Laurel.","Listahan ng karapatan ng mamamayan.",["Bill of Rights","Batas ng mga Karapatan"],"39"],
 ["c","Pitong matatalinong lalaki ng kombensiyon","Pagkilalang ibinigay kay Laurel sa 1935 Kombensiyong Konstitusyonal.","Bilang na 7.",["seven wise men","pitong matatalinong lalaki"],"39"],
 ["c","Kataas-taasang Hukuman","Hukumang pinaglingkuran nina Recto at Laurel bilang mga Mahistrado.","Supreme Court.",["Supreme Court","Korte Suprema"],"40"],
 ["c","Kasong Cuevo-Barredo","Kaso kung saan ipinaliwanag na may hiwa-hiwalay na kapangyarihan ang Lehislatura, Ehekutibo, at Hudikatura.","Dalawang apelyido: C… at B…",["Cuevo-Barredo","Cuevo Barredo"],"41"],
 ["c","Kodigo ng Mamamayan","Iminungkahi ni Laurel kay Quezon noong 1938 na ituturo sa mga paaralan.","Code for citizens.",["kodigo ng mamamayan"],"41"],
 ["c","Bushido (Kodigo ng Mandirigma)","Iminungkahi ni Laurel; kodigo ng mga mandirigma.","Salitang Hapones.",["Bushido","Kodigo ng Mandirigma"],"42"],
 ["c","Kodigong Panlipunan","Kodigo etika at pansariling kaugalian na ipinalikha ni Quezon sa isang komite.","Social code.",["kodigo panlipunan"],"42"],
 ["c","Sekretaryo ng Katarungan","Posisyong tinanggap ni Laurel noong Disyembre 17, 1941.","Secretary of Justice.",["Secretary of Justice","Kalihim ng Katarungan"],"44"],
 ["d","Marikina","Kinaroroonan ng tahanan ni Quezon kung saan araw-araw na nagpupulong ang gabinete.","Lungsod na kilala sa sapatos.",["Marikina tahanan ni Quezon"],"46"],
 ["d","USAFFE","Puwersang nagapi ng mga Hapones sa hilagang lalawigan.","United States Army Forces in the Far East.",["United States Army Forces in the Far East"],"46"],
 ["d","Corregidor","Lugar na pinapayo ni MacArthur na puntahan ni Quezon.","Isla sa bukana ng Manila Bay.",["isla ng Corregidor"],"47"],
 ["d","Douglas MacArthur","Heneral na nakaaalam ng kawalang-kahandaan ng Amerika.","“I shall return.”",["MacArthur","Heneral Douglas MacArthur","Hen. MacArthur"],"47"],
 ["d","Jose Abad Santos","Punong Mahistrado na isinama ni Quezon; ipinabaril kalaunan.","“Abad …”",["Abad Santos"],"48"],
 ["d","Pansamantalang Punong Mahistrado","Posisyong itinalaga kay Laurel bukod sa Sekretaryo ng Katarungan.","Acting Chief Justice.",["Acting Chief Justice"],"48"],
 ["d","Jorge B. Vargas","Itinalagang Alkalde ng Kalakhang Maynila; naging Tagapangulo ng Komisyong Pampangasiwaan.","“J.B.V.”",["Vargas","Jorge Vargas"],"48"],
 ["d","Komisyong Pampangasiwaan","Komisyong itinatag sa Utos Pangasiwaan Blg. 1.","Executive Commission.",["Executive Commission"],"51"],
 ["d","Utos Pangasiwaan Blg. 1","Utos na nagtatag ng Komisyong Pampangasiwaan.","Unang utos.",["Utos Pangasiwaan Bilang 1","Utos Pangasiwaan 1"],"51"],
 ["d","Komisyoner ng Katarungan","Posisyon ni Laurel sa Komisyong Pampangasiwaan.","May kinalaman sa hustisya.",["Commissioner of Justice"],"52"],
 ["d","Kempeitai","Pulis militar ng Hapon na nakialam sa mga kaso sa hukuman.","Military police ng Hapon; “K…”.",["Kempetai"],"53"],
 ["d","Sirkular","Inilabas ni Laurel na nagbabawal sa pagwawalang-bisa ng kaso maliban sa legal na proseso.","Isang uri ng memo o kautusan.",["circular"],"54"],
 ["d","Fort Santiago","Kung saan pinagreport at pinigil si Laurel nang tatlong oras.","Kuta sa Intramuros.",["Santiago"],"55"],
 ["d","Greater East Asia Co-Prosperity Sphere","Ang sinasabing sinusunod na sa kablegramang pinadala kay Quezon.","Proyekto ng Hapon para sa Asya.",["Co-Prosperity Sphere"],"57"],
 ["d","Kablegrama","Uri ng mensaheng ipinadala ni Laurel kay Quezon sa utos ng Hapon.","Mensaheng ipinadala sa kable.",["cablegram"],"57"],
 ["d","KALIBAPI","Kapisanan sa Paglilingkod sa Bagong Pilipinas, itinatag noong Disyembre 1942.","Akronim na KA-LI-BA-PI.",["Kalibapi"],"60"],
 ["d","Pamahalaang totalitaryo","Uri ng pamahalaan na layunin ng pagsasanib sa KALIBAPI.","Isang uri ng pamahalaang may lubos na kontrol.",["totalitaryo","totalitarian"],"60"],
 ["d","Komisyoner Panloob","Posisyon ni Laurel nang mailipat siya mula Departamento ng Katarungan.","Commissioner of the Interior.",["Commissioner of the Interior"],"61"],
 ["d","Wack Wack Country Club","Golf club sa Mandaluyong kung saan binaril si Laurel.","Golf club sa Mandaluyong.",["Wack Wack"],"62"],
 ["d","PGH","Ospital kung saan isinugod si Laurel matapos barilin.","Philippine General Hospital.",["Philippine General Hospital"],"62"],
 ["r","Komisyon sa Paghahanda para sa Kalayaan","Komisyong pinamunuan ni Laurel habang nakaratay pa sa PGH.","Preparatory Commission for Independence.",["Komisyon sa Paghahanda","Preparatory Commission for Independence"],"64"],
 ["r","Saligang-Batas","Binuo bilang paghahanda sa Republika; inilaan lamang habang may digmaan.","Konstitusyon.",["Konstitusyon","Saligang Batas","Constitution"],"65"],
 ["r","Pambansang Asamblea","Kapulungang naghalal kina Aquino (Ispiker) at Laurel (Pangulo).","National Assembly.",["National Assembly"],"66"],
 ["r","Hideki Tojo","Premier/Punong Ministro ng Hapon na pinag-reportan nina Laurel.","Punong Ministro ng Hapon; “T…”.",["Tojo","Premier Tojo","Hedeki Tojo"],"67"],
 ["r","Shigemitsu","Ministrong Panlabas ng Hapon sa kumperensya sa Tokyo.","Ministro ng panlabas na ugnayan.",["Ministro Shigemitsu"],"68"],
 ["r","Aoki","Ministro ng Kalakhang Silangang Asya.","Maikling apelyidong Hapones; “A…”.",["Ministro Aoki"],"68"],
 ["r","Pater Noster","Dasal na tahimik na binigkas ni Laurel sa Tokyo.","Ama Namin sa Latin.",["Paster Noster","Ama Namin","Our Father"],"69"],
 ["r","Hamamoto","Ang nagsalin-wika bago tumayo si Laurel at tumanggi.","Tagasalin; “H…”.",[],"70"],
 ["r","Pagkalipol o Kalayaan","Ang pamimilian nila ayon sa pananalita ni Tojo.","Dalawang pagpipilian: mamatay ang bansa o maging malaya.",["pagkalipol o ang kalayaan"],"71"],
 ["r","Ikalawang Republika ng Pilipinas","Republikang pinamunuan ni Laurel bilang Pangulo.","Second Republic.",["Ikalawang Republika","Second Philippine Republic"],"72"],
 ["r","Ministro ng mga Suliraning Panlabas","Posisyon ni Claro M. Recto sa Bagong Republika.","Minister of Foreign Affairs.",["Minister of Foreign Affairs"],"72"],
 ["r","Pambansang Kaligtasan","Pangunahing patakaran ng pamahalaan ni Laurel.","National Survival.",["National Survival"],"73"],
 ["r","Katarungang maka-Diyos","Pinakamalalim na pundasyon ng administrasyon ni Laurel (ideolohiyang moral).","Hustisyang may kinalaman sa Diyos.",["katarungan na maka-Diyos","maka-Diyos na katarungan"],"74"],
 ["r","Tatlong daigdig: pisikal, intelektwal, at moral","Ayon sa ideolohiya ni JPL, dito naninirahan ang tao.","PIM.",["pisikal intelektwal moral","tatlong daigdig"],"75"],
 ["r","Patakaran ng pagtitipid","Ipinatupad ni Laurel bilang Pangulo.","Austerity.",["pagtitipid"],"76"],
 ["r","Damit na Alaala","Ipinamahagi sa Kawit, Kabite noong Hunyo 25, 1944.","Kasuotan na regalo ng Pangulo.",[],"78"],
 ["r","Shozo Murata","Embahador ng Hapon na nagbigay-impormasyon noong Setyembre 1944.","Embahador; “M…”.",["Murata","Embahador Murata"],"79"],
 ["r","Estado ng Digmaan","Ang idineklara ni Laurel sa halip na pakikipagdigmaan.","State of War.",["State of War"],"81"],
 ["r","Batas Militar","Inihayag pagkatapos ng deklarasyon ng estado ng digmaan.","Martial Law.",["Martial Law"],"81"],
 ["r","Sapilitang pagsusundalo","Ipinilit ng Hapones ngunit tinanggihan ni Laurel.","Conscription.",["conscription"],"82"],
 ["r","Baguio","Pinagdalhan kay Laurel noong Disyembre 21, 1944 at nanirahan nang tatlong buwan.","Summer Capital.",["Lungsod ng Baguio"],"84"],
 ["r","Capinpin","Kasama ni Vargas na pinakiusapang magbigay-alam sa Magkakaanib na Kapangyarihan.","“C…”, binanggit sa telegrama.",[],"87"],
 ["r","Lt. Col. Turner","Dumating mula U.S. Headquarters upang arestuhin sina Laurel.","Opisyal na Amerikano; “T…”.",["Turner"],"88"],
 ["r","Kataksilang Pakikipagtulungan sa Hapon","Pagkakasalang kailangang harapin nina Laurel.","Collaboration / treason.",["kataksilan","collaboration","treason"],"88"],
 ["w","Birkenhead","Ang may-akda ng aklat na pinagsulatan ni Laurel noong siya ay napiit.","Apelyido; “B…”.",[],"91"],
 ["w","Estilong memorandum","Estilo ng pagsulat na ginamit ni Laurel dahil sa disiplinang judicial.","Uri ng sulat sa opisina.",["memorandum"],"91"],
 ["w","PRO DEO et PATRIA","Pamagat ng pananaw na moral at pulitikal ni Laurel — Para sa Diyos at Bayan.","Latin; “Para sa Diyos at Bayan”.",["Pro Deo et Patria","Para sa Diyos at Bayan"],"92"],
 ["w","Hulyo 4, 1946","Petsa ng pagkakaloob ng Kalayaan at pagkawala ng Commonwealth.","Fourth of July.",["July 4 1946","Hulyo 04, 1946","Hulyo 4 1946"],"93"]
];

/* ---------------- MULTIPLE CHOICE ----------------
   [topic, question, correct, [3 wrong], clue, explanation, slide] */
const MC = [
 ["k","Bakit inakala ng mga unang guro na wala nang pag-asa si Jose?","Dahil siya'y pabaya sa pag-aaral",["Dahil mahirap ang kanyang pamilya","Dahil lagi siyang may sakit","Dahil ayaw niya sa paaralan ni Padre Malabanan"],"May kinalaman sa ugali niya sa pag-aaral.","Inakala ng mga unang guro na wala nang pag-asa si Jose dahil siya'y pabaya sa kanyang pag-aaral.","2"],
 ["k","Ano ang palawit ng kuwintas na ginto na handog ni Doña Jacoba?","Krus",["Medalya","Larawan ng ina","Puso"],"Simbolo ng pananampalataya.","Ang gintong kuwintas ay may palawit na krus — pagkalinga ng ina sa anak.","3"],
 ["k","Ilang taon si Jose nang lisanin niya ang Tanauan noong 1906?","15",["12","17","18"],"Kalagitnaan ng pagiging tinedyer.","1906 – sa gulang na 15, nilisan ni Jose ang Tanauan.","4"],
 ["k","Bakit San Juan de Letran ang pinasukan ni Jose noong 1906?","Ito ang Alma Mater ng kanyang ama",["Ito ang pinakamalapit sa Tanauan","Libre ang matrikula rito","Iminungkahi ni Padre Malabanan"],"May kinalaman sa kanyang ama.","Nag-aral siya sa Alma Mater ng kanyang ama — San Juan de Letran.","4"],
 ["k","Ano ang naging simula ng pagbabago at pagbangon ni Jose?","Pagbitiw bilang miyembro ng orkestra ng Tanauan",["Paglipat sa U.P.","Pagpapakasal kay Paciencia","Pagtatrabaho sa Bureau of Forestry"],"May kinalaman sa musika.","Simula ng kanyang pagbabago: pagbitiw bilang miyembro ng orkestra ng Tanauan.","5"],
 ["k","Sa anong taon ng high school lumipat si Jose sa Manila South High School?","Ikalawang taon",["Unang taon","Ikatlong taon","Ikaapat na taon"],"Hindi una.","Lumipat si Jose sa ikalawang taon at dito na nagtapos (1911).","6"],
 ["k","Ano ang nagpawala ng mali niyang paniniwala sa relihiyon?","Pagkatuto ng katesismo bilang sacristan",["Pagbabasa ng Bibliya sa Letran","Payo ni Doña Jacoba","Pag-aaral sa Yale"],"Trabaho niya sa simbahan.","Ang pagkatuto niya ng katesismo (bilang sacristan) ang nagpawala ng mali niyang paniniwala.","6"],
 ["k","Saan naging English Teacher si Jose habang nag-aaral?","La Regeneracion High School, Trozo",["Manila South High School","San Juan de Letran","Bureau of Forestry"],"Nasa Trozo.","English Teacher – La Regeneracion High School, Trozo.","7"],
 ["k","Bakit hindi nagtamo ng karangalan si Jose sa Manila South High School?","Nasangkot siya sa isang pangyayaring halos nagwasak sa kanyang buhay",["Mababa ang marka niya sa Ingles","Lumipat siya sa ibang paaralan","Masyado siyang abala sa orkestra"],"Isang kaso noong 1909.","Hindi nagtamo ng karangalan dahil nasangkot siya sa kaso (Nabigong Pagpatay, 1909).","8"],
 ["k","Ilang taon ang paglilitis sa kaso ni Jose?","Dalawang taon",["Isang taon","Tatlong taon","Limang taon"],"Mas mahaba sa isa.","Dalawang taon ang paglilitis, labis na pinagdusa ni Doña Jacoba.","8"],
 ["b","Sino ang abugado ng mga Laurel sa kaso ni Jose?","Clyde De Witt",["Justice Street","Vicente del Rosario","Antero Soriano"],"Napakahusay ngunit napakamahal.","Abugado: Clyde De Witt — binayaran ng P10,000.00.","9"],
 ["b","Bakit ipinasya ni Jose na mag-aral ng abugasya?","Dahil sa kanyang dating kaso",["Dahil sa payo ni Justice Street","Dahil abugado ang kanyang ama","Dahil sa scholarship ng U.P."],"May kinalaman sa nangyari noong 1909.","Ipinasya niyang mag-aral ng abugasya dahil sa kanyang dating kaso.","10"],
 ["b","Anong taon ikinasal si Jose kay Paciencia Hidalgo?","1911",["1909","1915","1920"],"Kaparehong taon ng pagpasok sa U.P.","1911 — ikinasal si Jose kay Paciencia Hidalgo.","11"],
 ["b","Ano ang paksa ng tesis ni Jose na napiling pinakamahusay?","Mga aral mula sa Legal History ng Louisiana",["Ang Konstitusyon ng Estados Unidos","Ang Bill of Rights","Ang Kodigo Sibil ng Pilipinas"],"Isang estado sa Amerika.","“What lessons may be derived by the Philippine Islands from the Legal History of Louisiana”.","12"],
 ["b","Anong puwesto ang nakuha ni Jose sa Bar Examinations ng 1915?","Pangalawang puwesto",["Unang puwesto","Ikatlong puwesto","Ikasampung puwesto"],"Hindi una.","Setyembre 1915 — pangalawang puwesto sa Bar Examinations.","13"],
 ["a","Sa pangangasiwa ng sino tumungo si Jose sa Estados Unidos bilang pensionado?","Direktor ng Edukasyon",["Gobernador Heneral Wood","Justice Street","Manuel L. Quezon"],"Pinuno ng edukasyon.","Tumungo siya sa E.U. sa pangangasiwa ng Direktor ng Edukasyon.","17"],
 ["a","Ano ang digring ipinagkaloob kay Jose sa Yale?","Doctor of Civil Laws",["Master in Constitutional Law","Bachelor of Laws","Doctor of Philosophy"],"Doktorado, hindi Master.","Doctor of Civil Laws ang ipinagkaloob sa halip na Master sa batas.","17"],
 ["a","Kailan nagtapos si Jose sa Yale University?","Hulyo 19, 1920",["Marso 1915","Disyembre 30, 1920","Setyembre 1915"],"Gitna ng 1920.","Nagtapos sa Yale noong Hulyo 19, 1920.","19"],
 ["a","Ano ang dinaluhan ni Jose sa University of Sorbonne?","Mga espesyal na lecture sa legal at maunlad na pilosopiyang pulitikal",["Kursong Master in Constitutional Law","Bar Examinations ng France","Pagtuturo ng batas"],"Pilosopiya.","Sa Sorbonne (Paris), dumalo siya sa espesyal na lecture sa legal and advanced political philosophies.","20"],
 ["a","Ilang buwan namalagi si Jose sa Europa bago umuwi?","Dalawang buwan",["Tatlong buwan","Pitong buwan","Isang taon"],"Maikli lang.","Pagkaraan ng dalawang buwang pamamalagi sa Europa ay umuwi na siya.","20"],
 ["a","Kailan dumating si Jose sa Pilipinas mula sa ibang bansa?","Disyembre 30, 1920",["Hulyo 19, 1920","Enero 1, 1921","Disyembre 17, 1941"],"Bisperas ng bisperas ng Bagong Taon.","Disyembre 30, 1920 — dumating sa Pilipinas.","21"],
 ["a","Ilang taon si Jose nang maging Sekretaryo ng Interyor?","31",["25","35","41"],"Pinakabatang miyembro ng gabinete.","31 taong gulang — pinakabatang miyembro ng gabinete.","22"],
 ["a","Bakit tumagal lamang ng limang buwan ang pagiging Sekretaryo ng Interyor ni Jose?","Dahil sa pagbagsak ng administrasyon ni G.H. Wood",["Dahil nahalal siyang Senador","Dahil nag-aral siya sa Yale","Dahil sa pagsiklab ng digmaan"],"May kinalaman sa Gobernador Heneral.","Tumagal lamang ng limang buwan dahil sa pagbagsak ng administrasyon ni Gobernador Heneral Wood.","22"],
 ["a","Ano ang pinagtuunan ni Jose bilang Sekretaryo ng Interyor?","Administrasyon ng Pamahalaang Lokal at Sistema ng eleksyon",["Ugnayang panlabas at kalakalan","Edukasyon at kalusugan","Hukbong sandatahan"],"Lokal at halalan.","Pinagtuunan ang administrasyon ng Pamahalaang Lokal at Sistema ng eleksyon.","22"],
 ["p","Ilan ang anak nina Jose at Doña Paciencia ayon sa slide?","Siyam",["Pito","Walo","Sampu"],"Bilangin: Jose Bayani, Jose Sotero III, Natividad, Sotero Cosme, Maning, Rosenda, Nita, Doy, Dodgie.","Siyam na anak ang nakalista sa slide 25.","25"],
 ["p","Sino ang may palayaw na “Doy”?","Salvador Roman",["Mariano Antonio","Arsenio","Sotero Cosme"],"Salvador …","Salvador Roman (Doy).","25"],
 ["p","Sino ang may palayaw na “Maning”?","Mariano Antonio",["Salvador Roman","Jose Bayani","Arsenio"],"Ma-ning → Ma…","Mariano Antonio (Maning).","25"],
 ["p","Sino ang may palayaw na “Dodgie”?","Arsenio",["Salvador Roman","Sotero Cosme","Jose Sotero III"],"Ang huling anak sa listahan.","Arsenio (Dodgie).","25"],
 ["p","Sino ang may palayaw na “Nita”?","Potenciana",["Natividad","Rosenda Paciencia","Paciencia Hidalgo"],"Poten-…","Potenciana (Nita).","25"],
 ["p","Bakit malimit makasalamuha ni Jose ang konsuladong Hapones sa mga piging?","Kliyente niya ang mga kompanya ng mga Hapones",["Nag-aral siya sa Tokyo","Kaibigan niya si Tojo","Embahador siya sa Japan"],"May kinalaman sa kanyang Bupete.","Kabilang sa kanyang kliyente ang mga kompanya ng mga Hapones.","27"],
 ["p","Saan namimili ang pamilya ng puto, kalamay at kutsinta?","Biñan",["Los Baños","Luneta","Paco"],"Bayan sa Laguna.","Mamimili ng puto, kalamay at kutsinta sa Biñan.","28"],
 ["p","Alin ang HINDI kasama sa ikalawang Distrito na tinakbuhan ni Jose bilang senador?","Bulacan",["Batangas","Cavite","Tayabas"],"BaCaLaTa.","Ikalawang Distrito: Batangas, Cavite, Laguna at Tayabas.","29"],
 ["p","Kailan lamang ipinatupad ang rebisyon ng Kodigo Sibil na itinaguyod ni Jose?","1949",["1928","1935","1946"],"Pagkatapos na ng digmaan.","Ipinatupad lamang ito noong 1949.","30"],
 ["p","Ano ang panukalang batas ni Jose noong 1928?","Bigyang-karapatan ang kababaihan na makaboto",["Buwis sa korporasyong panrelihiyon","Rebisyon ng Kodigo Sibil","Bill of Rights"],"Para sa kababaihan.","1928 — panukalang bigyang-karapatan ang kababaihan na makaboto (hindi nagtagumpay).","30"],
 ["p","Bakit bumalik si Jose sa Katolisismo?","Bilang pagsunod sa kahilingan ng inang may malubhang karamdaman",["Dahil sa utos ni Quezon","Upang manalo sa eleksyon","Dahil umalis siya sa Masonerya"],"Para sa kanyang ina.","Bumalik siya sa Katolisismo bilang pagsunod sa kahilingan ng inang may malubhang karamdaman.","31"],
 ["p","Ano ang naging dahilan ng pag-aalis ng suporta ng simbahan kay Jose?","Panukalang buwis sa mga korporasyong panrelihiyon",["Pagsali sa KALIBAPI","Panukalang boto ng kababaihan","Pagtanggi sa Justice Department portfolio"],"May kinalaman sa pondo ng pamahalaan.","Naghain siya ng panukalang dapat magbayad ng buwis ang mga korporasyong panrelihiyon.","32"],
 ["c","Aling partido sa Estados Unidos ang TUTOL sa panukalang Kalayaan?","Republican Party",["Democratic Party","Nacionalista","KALIBAPI"],"Partido ni Hoover.","Republican Party — tutol; Democratic Party — isinusulong.","34"],
 ["c","Bakit tinanggihan ni Laurel ang Justice Department portfolio noong 1932?","Ibig niyang ipagpatuloy ang pagkamananggol at pagtuturo",["Tutol siya kay Quezon","Nasa Yale pa siya","Kumakandidato siyang Senador"],"Propesyon at pagtuturo.","Tinanggihan dahil ibig niyang ipagpatuloy ang kanyang propesyong pagkamananggol at pagtuturo.","35"],
 ["c","Ang Hare-Hawes-Cutting Act ay bunga ng ilang misyong pangkalayaan?","Ikaanim",["Ikalima","Ikapito","Ikatlo"],"Bilang 6.","Bunga ng ikaanim na misyong pangkalayaan nina Osmeña at Roxas.","36"],
 ["c","Ilang taon ang panahon ng transition sa Hare-Hawes-Cutting Act at Tydings-McDuffie Law?","Sampung taon",["Limang taon","Dalawampung taon","Tatlong taon"],"Isang dekada.","Pagkilala ng Kalayaan pagkaraan ng sampung taong transition.","37–38"],
 ["c","Sino ang nag-uwi ng Tydings-McDuffie Law noong 1934?","Quezon",["Osmeña","Roxas","Laurel"],"Naging Pangulo ng Commonwealth.","1934 — matagumpay na naiuwi ni Quezon ang Tydings-McDuffie Law.","38"],
 ["c","Sa anong distrito nahalal si Laurel na delegado sa Kombensiyong Konstitusyonal?","Ikatlong distrito ng Batangas",["Ikalawang distrito ng Batangas","Unang distrito ng Maynila","Ikalawang Distrito (Batangas, Cavite, Laguna, Tayabas)"],"Batangas, ika-3.","Nahalal siyang delegado ng ikatlong distrito ng Batangas.","39"],
 ["c","Sino ang permanenteng tagapangulo ng Kombensiyong Konstitusyonal ng 1935?","Claro M. Recto",["Jose P. Laurel","Manuel L. Quezon","Sergio Osmeña"],"Tumalo kay Laurel noong 1931.","Si Recto ang permanenteng tagapangulo; si Laurel sa Bill of Rights.","39"],
 ["c","Ano ang ipinaliwanag sa kasong Cuevo-Barredo?","May hiwa-hiwalay na kapangyarihan ang Lehislatura, Ehekutibo at Hudikatura",["Karapatan ng kababaihang bumoto","Buwis sa korporasyong panrelihiyon","Kalayaan pagkaraan ng sampung taon"],"Separation of powers.","Ang lehislatura, ehekutibo, at hudikatura ay pinagkalooban ng Konstitusyon ng hiwa-hiwalay na kapangyarihan.","41"],
 ["c","Bakit tumanggi muna si Laurel na maging Sekretaryo ng Katarungan noong Oktubre 1941?","Siya ay nakatataas na katulong na Mahistrado, kasunod ng Punong Mahistrado",["Nasa Japan siya noon","Senador pa siya","May sakit siya sa PGH"],"Mataas na ang posisyon niya sa Hukuman.","Tumanggi siya sapagkat nakatataas siyang katulong na Mahistrado, susunod sa Punong Mahistrado.","44"],
 ["d","Saan pinayuhan ni MacArthur si Quezon na magtungo?","Corregidor",["Baguio","Tokyo","Marikina"],"Isla sa Manila Bay.","Pinayuhan ni MacArthur si Quezon na magtungo sa Corregidor.","47"],
 ["d","Sino ang isinama ni Quezon sa pag-alis?","Punong Mahistrado Jose Abad Santos",["Jose P. Laurel","Jorge B. Vargas","Claro M. Recto"],"Punong Mahistrado.","Isasama niya ang Punong Mahistrado na si Jose Abad Santos.","48"],
 ["d","Sino ang tutulungan ni Laurel sa Maynila matapos umalis si Quezon?","Jorge B. Vargas",["Benigno Aquino","Claro M. Recto","Jose Yulo"],"Alkalde ng Kalakhang Maynila.","Maiiwan si Laurel upang tulungan si Jorge B. Vargas.","48"],
 ["d","Kailan pumasok sa Maynila ang puwersa ng mga Hapones?","Enero 2, 1942",["Disyembre 24, 1941","Enero 23, 1943","Hunyo 5, 1943"],"Unang linggo ng 1942.","Enero 02, 1942 – pumasok sa Maynila ang puwersa ng mga Hapones.","50"],
 ["d","Ano ang posisyon ni Claro M. Recto sa Komisyong Pampangasiwaan?","Komisyoner ng Edukasyon at Kapakanang Pangmadla",["Komisyoner ng Katarungan","Komisyoner Panloob","Tagapangulo"],"Edukasyon.","Claro M. Recto – Komisyoner ng Edukasyon at Kapakanang Pangmadla.","52"],
 ["d","Sino ang Komisyoner ng Pananalapi sa Komisyong Pampangasiwaan?","Antonio de las Alas",["Rafael Alunan","Teofilo Sison","Quintin Paredes"],"“de las …”","Antonio de las Alas – Komisyoner ng Pananalapi.","52"],
 ["d","Sino ang Komisyoner ng Pagsasaka at Pangungubat?","Rafael Alunan",["Quintin Paredes","Antonio de las Alas","Jose Yulo"],"“R.A.”","Rafael Alunan – Komisyoner ng Pagsasaka at Pangungubat.","52"],
 ["d","Sino ang Pangkalahatang Awditor at Direktor ng Budget?","Teofilo Sison",["Quintin Paredes","Rafael Alunan","Benigno Aquino"],"“T.S.”","Teofilo Sison – Pangkalahatang Awditor at Direktor ng Budget.","52"],
 ["d","Sino ang Komisyoner ng mga Gawaing-Bayan at Komunikasyon?","Quintin Paredes",["Teofilo Sison","Jose Yulo","Claro M. Recto"],"“Q.P.”","Quintin Paredes – Komisyoner ng mga Gawaing-Bayan at Komunikasyon.","52"],
 ["d","Sino ang Punong Mahistrado ng Kataas-taasang Hukuman sa ilalim ng Komisyong Pampangasiwaan?","Jose Yulo",["Jose Abad Santos","Jose P. Laurel","Claro M. Recto"],"Hindi si Abad Santos.","G. Jose Yulo – Punong Mahistrado ng Kataas-taasang Hukuman.","52"],
 ["d","Ilang oras pinigil si Laurel sa Fort Santiago?","Tatlong oras",["Isang oras","Isang araw","Sampung oras"],"Higit sa dalawa.","Pinigil doon ng tatlong oras at inutusang bawiin ang sirkular.","55"],
 ["d","Ano ang isinagot ni Laurel nang utusang bawiin ang sirkular?","“Pag-iisipan niya ito”",["Agad niyang binawi","Tumanggi siya at nagbitiw","Humingi siya ng tawad"],"Hindi oo, hindi rin hindi.","Sinabi niyang “pag-iisipan niya ito”, at bumalik sa opisina nang hindi sinaktan.","55"],
 ["d","Bakit sinunod nila ang utos na magpadala ng kablegrama kay Quezon?","Upang iligtas ang sarili at huwag paghigantihan ng mga Hapones",["Dahil sang-ayon sila sa Hapon","Upang makakuha ng posisyon","Dahil iniutos ni Quezon"],"Kaligtasan.","Sinunod nila ang utos upang iligtas ang kanilang sarili at huwag silang paghigantihan.","57"],
 ["d","Para kanino namagitan si Laurel dahil sa pagsunod sa utos?","Heneral Roxas at Punong Mahistrado Jose Abad Santos",["Quezon at Osmeña","Vargas at Aquino","Recto at Yulo"],"Isang heneral at isang Punong Mahistrado.","Namagitan siya para kina Heneral Roxas at Jose Abad Santos (ipinabaril na ang huli).","59"],
 ["d","Ano ang layunin ng KALIBAPI?","Pagsasanib ng lahat ng Pilipino para sa isang mabisang pamahalaang totalitaryo",["Paghahanda para sa Kalayaan","Pagtatanggol sa USAFFE","Pagsulat ng Saligang-Batas"],"Isang partido para sa lahat.","Pagsasanib ng lahat ng Pilipino para sa mga layunin ng isang mabisang pamahalaang totalitaryo.","60"],
 ["d","Sino ang Pangulo ng KALIBAPI?","Vargas",["Laurel","Benigno Aquino","Recto"],"Tagapangulo rin ng Komisyong Pampangasiwaan.","Pangulo – Vargas; Pangalawang Pangulo – Benigno.","61"],
 ["d","Ano ang ginagawa ni Laurel nang siya'y barilin noong Hunyo 5, 1943?","Naglalaro ng golf",["Nagtatalumpati","Nagdarasal sa simbahan","Nagpupulong sa Malacañang"],"Isang isport sa country club.","Naglalaro ng golf sa Wack Wack Country Club, Mandaluyong.","62"],
 ["d","Bakit, ayon sa slide, pinagtangkaan ang buhay ni Laurel?","Dahil sa bintang na siya'y maka-Hapones",["Dahil sa kaso noong 1909","Dahil sa buwis sa simbahan","Dahil sa Bill of Rights"],"Akusasyon ng pagkiling sa kaaway.","Labis niyang dinamdam ang bintang na siya'y maka-Hapones kaya pinagtangkaan ang kanyang buhay.","63"],
 ["r","Kailan iniharap ang Saligang-Batas ng Republika?","Setyembre 7, 1943",["Setyembre 25, 1943","Oktubre 14, 1943","Hunyo 5, 1943"],"Unang linggo ng Setyembre.","Setyembre 7, 1943 – iniharap ang Saligang-Batas.","66"],
 ["r","Sino ang inihalal na Ispiker ng Pambansang Asamblea?","Aquino",["Laurel","Vargas","Recto"],"Benigno …","Inihalal sina Aquino (Ispiker) at Laurel (Pangulo).","66"],
 ["r","Ano ang hiniling ng mga Hapones kina Laurel sa Tokyo?","Magdeklara ng digmaan laban sa Estados Unidos at Great Britain",["Ibigay ang Pilipinas sa Japan","Isuko si Quezon","Bumuo ng KALIBAPI"],"Digmaan laban sa Kanluran.","Hiniling na magdeklara ng digmaan laban sa Estados Unidos at Great Britain.","68"],
 ["r","Ano ang ginawa ni Laurel nang mabigla sa kahilingan ng mga Hapones?","Tahimik na nanalangin ng Pater Noster",["Umalis sa pulong","Sumang-ayon agad","Sumigaw sa galit"],"Dasal.","Tahimik na nanalangin si Laurel at dinasal ang Pater Noster.","69"],
 ["r","Ayon kay Laurel, sino lamang ang maaasahang magdeklara ng digmaan laban sa E.U.?","Mga taong walang utang na loob",["Mga sundalong Hapones","Mga kaaway ng bayan","Mga miyembro ng KALIBAPI"],"Utang na loob.","“Mga taong walang utang na loob lamang ang maaasahang gagawa ng ganito.” – JPL","70"],
 ["r","Sino ang gumanap sa kasunduan ng Pagkakaisa noong inagurasyon ng Republika?","Claro M. Recto",["Benigno Aquino","Jorge B. Vargas","Jose Yulo"],"Ministro ng mga Suliraning Panlabas.","Ginampanan ito ni Claro M. Recto (Ministro ng mga Suliraning Panlabas).","72"],
 ["r","Ano ang pangunahing patakaran ng pamahalaan ni Laurel?","Pambansang Kaligtasan",["Pagtitipid","Kalayaan sa sampung taon","Bushido"],"National Survival.","Paulit-ulit na ipinahayag ni Laurel na ang pangunahing patakaran ay Pambansang Kaligtasan.","73"],
 ["r","Ayon sa ideolohiya ni JPL, alin ang dapat na mangibabaw sa buhay ng tao?","Prinsipyong moral",["Lakas na pisikal","Lakas na mental","Kayamanan"],"Hindi sapat ang pisikal at mental.","Ang lakas na pisikal at mental ay hindi sapat; dapat dominahan ng prinsipyong moral.","75"],
 ["r","Saan binasa ang Kalatas noong Hunyo 25, 1944?","Kawit, Kabite",["Tanauan, Batangas","Baguio","Malacañang"],"Bayan sa Cavite.","Kalatas na Binasa sa Bayan ng Kawit, Kabite (Hunyo 25, 1944).","78"],
 ["r","Aling bansa/pamahalaan ang HINDI binanggit ni Murata na nagdeklara na ng digmaan?","Korea",["Tsina (Nanking)","Siam","Bose Probisyonal na pamahalaan ng India"],"Tatlo lang ang binanggit.","Binanggit: Tsina (Nanking), Siam, at Bose Probisyonal na pamahalaan ng India.","79"],
 ["r","Ano ang intensiyon ni Laurel noong Setyembre 1944?","Magdeklara ng Estado ng Digmaan, hindi ng pakikipagdigmaan",["Magdeklara ng digmaan laban sa Amerika","Tumakas sa kabundukan","Sumuko kay MacArthur"],"State of War.","Ang intensiyon ay magdeklara hindi ng pakikipagdigmaan kundi Estado ng Digmaan.","81"],
 ["r","Ano ang inihayag pagkatapos ng deklarasyon ng estado ng digmaan?","Batas Militar (Martial Law)",["Kalayaan","Pambansang Kaligtasan","Pagtitipid"],"Martial Law.","Pagkatapos ay inihayag ang Batas Militar (Martial Law).","81"],
 ["r","Saan dinala si Laurel at ang Gabinete noong Disyembre 21, 1944?","Baguio",["Tokyo","Corregidor","Kawit"],"Summer capital.","Dinala sa Baguio at nanirahan nang tatlong buwan.","84"],
 ["r","Ano ang ginawa ni Laurel nang malaman ang pagsuko ng Hapon (Agosto 17, 1945)?","Pinawalang-bisa ang kanyang pamahalaan",["Nagdeklara ng digmaan","Tumakas sa Baguio","Nagpakamatay"],"Binuwag.","Nang malaman ang pagsuko ng Hapon, pinawalang-bisa niya ang kanyang pamahalaan.","85"],
 ["r","Sino ang dumating upang arestuhin sina Laurel?","Lt. Col. Turner",["Hen. MacArthur","Embahador Murata","Capinpin"],"Mula sa U.S. Headquarters.","Lt. Col. Turner mula sa U.S. Headquarters ang umaresto.","88"],
 ["w","Ilang buwan napiit si Laurel pagkatapos ng digmaan?","Sampung buwan",["Tatlong buwan","Anim na buwan","Dalawang taon"],"Isang dekada ng buwan.","Napiit si Laurel nang sampung buwan.","91"],
 ["w","Ano ang kahulugan ng PRO DEO et PATRIA?","Para sa Diyos at Bayan",["Para sa Bayan at Kalayaan","Diyos, Bayan at Pamilya","Katarungan para sa Lahat"],"DEO = Diyos.","PRO DEO et PATRIA – Para sa Diyos at Bayan.","92"],
 ["w","Kailan lumisan sa Hapon pauwi sina Laurel?","Hunyo 23, 1946",["Hulyo 4, 1946","Agosto 17, 1945","Disyembre 30, 1920"],"Ilang araw bago ang Kalayaan.","Lumisan sa Hapon sina Laurel noong Hunyo 23, 1946.","93"],
 ["w","Sino ang nanalong Pangulo laban kay Osmeña noong 1946?","Manuel Roxas",["Jose P. Laurel","Claro M. Recto","Jorge B. Vargas"],"Kasama ni Osmeña sa OsRox mission.","Si Manuel Roxas ang nanalo laban kay Osmeña; inagurasyon Hulyo 4, 1946.","93"]
];

/* ---------------- TRUE OR FALSE ----------------
   [topic, statement, isTrue, explanation, clue, slide] */
const TF = [
 ["k","Naniwala ang ina ni Jose na wala na siyang magandang kinabukasan.",false,"Ang komunidad ang nakakita ng kabataang walang magandang kinabukasan — ngunit hindi sa puso ng kanyang ina.","Isipin ang ina vs. komunidad.","2"],
 ["k","Matapos matanggap ang kuwintas na ginto, nakatapos si Jose ng intermedya.",true,"Gumising sa kaisipan ni Jose ang kuwintas at nakatapos siya ng intermedya.","Kuwintas → gising.","3"],
 ["k","Maganda ang naging unang taon ni Jose sa Letran.",false,"Hindi naging maganda — mababa ang marka niya sa isang asignatura.","Mababang marka.","4"],
 ["k","Nagtapos si Jose sa Manila South High School noong 1911.",true,"Lumipat siya sa ikalawang taon at doon nagtapos noong 1911.","Kaparehong taon ng kasal.","6"],
 ["k","Clerk sa Bureau of Forestry ang isa sa mga trabaho ni Jose habang nag-aaral.",true,"Mga trabaho: English Teacher (La Regeneracion, Trozo) at clerk (Bureau of Forestry).","Dalawa ang trabaho niya.","7"],
 ["k","Isinakdal si Jose sa salang Nabigong Pagpatay noong 1911 habang nasa Maynila.",false,"1909 ito, habang nagbabakasyon siya sa Tanauan.","Bakasyon sa probinsya.","8"],
 ["k","Sinanay ng mga gurong Amerikano si Jose sa liberal na demokrasya.",true,"Sinanay sa kaisipang pulitikal, pamumuno, kultura, kasaysayan, pamahalaan at liberal na demokrasya.","Manila South High School.","7"],
 ["b","Natalo ang mga Laurel sa kaso noong 1909.",false,"Nanalo sa kaso ang mga Laurel sa tulong ni Clyde De Witt.","Pagpapawalang-sala.","9"],
 ["b","Ipinasya ni Jose na mag-aral ng abugasya dahil sa kanyang dating kaso.",true,"Ito ang dahilan ayon sa slide 10.","Dahil sa 1909.","10"],
 ["b","Ikinasal si Jose kay Paciencia Hidalgo noong 1915.",false,"Ikinasal sila noong 1911.","Kapareho ng pagpasok sa U.P.","11"],
 ["b","Nagtapos ng abugasya si Jose nang may karangalan noong Marso 1915.",true,"Marso 1915 — nagtapos nang may karangalan.","Bago ang Bar.","13"],
 ["b","Unang puwesto si Jose sa Bar Examinations noong Setyembre 1915.",false,"Pangalawang puwesto ang nakuha niya.","Hindi una.","13"],
 ["a","Master in Constitutional Law ang digring ibinigay kay Jose sa Yale.",false,"Doctor of Civil Laws ang ipinagkaloob sa halip na Master sa batas.","Mas mataas na digri.","17"],
 ["a","Si Justice Street ang nagpayo kay Jose na kumuha ng Master in Constitutional Law.",true,"Master in Constitutional Law — sa payo ni Justice Street.","Justice …","17"],
 ["a","Tatlong buwan matapos magtapos sa Yale, tinanggap si Jose sa Court of Appeals at Korte Suprema ng Distrito ng Columbia.",true,"Tama ayon sa slide 19.","Tatlong buwan.","19"],
 ["a","Sa Oxford dumalo si Jose sa espesyal na lecture sa legal at maunlad na pilosopiyang pulitikal.",false,"Sa University of Sorbonne (Paris) iyon.","Nasa Paris.","20"],
 ["a","Noong 1921, itinalaga si Jose na Undersecretary ng Departamento ng Interyor.",true,"Dahil sa kakayahan at pagsisikap, itinalagang Undersecretary (1921).","Bago maging Sekretaryo.","21"],
 ["a","Si Jose ang pinakamatandang miyembro ng gabinete ni G.H. Wood.",false,"Siya ang pinakabatang miyembro (31 taong gulang).","31 taon.","22"],
 ["p","Kasama sa Bupete ni Jose sina Vicente del Rosario at Guillermo Lualhati.",true,"Sila ang kanyang mga kapartner.","Dalawang abugado.","26"],
 ["p","Noong 1927, ipinanalo ni Jose ang isang kaso sa Seguro at binayaran siya ng daang libo.",true,"Tama ayon sa slide 27.","Insurance.","27"],
 ["p","Ang tahanan ng mga Laurel ay nasa 625 Kalye Peñafrancia, Distrito ng Paco.",true,"Sa panulukan ng Santo Sepulcro.","Paco.","28"],
 ["p","Naliligo ang pamilya Laurel sa paliguan sa Biñan.",false,"Sa Los Baños sila naliligo; sa Biñan sila namimili ng puto, kalamay at kutsinta.","Hot springs.","28"],
 ["p","Si Antero Soriano ay suportado ni Quezon.",true,"Si Soriano ay isang Nacionalista mula Cavite na suportado ni Quezon.","Kalaban ni Jose.","29"],
 ["p","Nagtagumpay ang panukala ni Jose noong 1928 na bigyan ng karapatang bumoto ang kababaihan.",false,"Hindi nagtagumpay ang kanyang panukala.","Bigo.","30"],
 ["p","Sang-ayon si Jose sa pagiging panatiko sa relihiyon.",false,"Hindi siya sang-ayon sa pagiging panatiko.","Pananalig sa Diyos, hindi panatismo.","31"],
 ["p","Natalo si Jose sa re-eleksyon noong 1931 kay Claro M. Recto.",true,"Inalis ng simbahan ang suporta kaya natalo siya kay Recto.","1931.","32–33"],
 ["c","Ang Democratic Party ang tutol sa panukalang Kalayaan.",false,"Republican Party ang tutol; Democratic Party ang nagsusulong.","Hoover = Republikano.","34"],
 ["c","Republikano ang pangulo ng Estados Unidos na si Herbert Hoover.",true,"Ngunit sa eleksyong 1932, naging mayorya ang mga Demokrata sa Mababang Kapulungan.","Republikano.","35"],
 ["c","Tinanggap ni Laurel ang Justice Department portfolio noong 1932.",false,"Tinanggihan niya ito.","Pinili ang propesyon at pagtuturo.","35"],
 ["c","Kumampanya si Laurel laban sa Hare-Hawes-Cutting Act.",false,"Hayagang kumampanya siya sa PAGTANGGAP ng Hare-Hawes-Cutting Act.","Pabor siya.","36"],
 ["c","Ang Tydings-McDuffie Law ay may probisyon ng halalan para sa mga delegado ng Kombensiyong Konstitusyonal.",true,"Tama ayon sa slide 38.","Kombensyon.","38"],
 ["c","Si Laurel ang tagapangulo ng Batas ng mga Karapatan (Bill of Rights) sa 1935 Kombensiyon.",true,"Halos lahat ng tadhana ng mga Karapatan ay siya ang sumulat.","Bill of Rights.","39"],
 ["c","Si Laurel ang permanenteng tagapangulo ng Kombensiyong Konstitusyonal.",false,"Si Recto ang permanenteng tagapangulo.","Recto.","39"],
 ["c","Iminungkahi ni Laurel ang Bushido (Kodigo ng Mandirigma).",true,"Tama ayon sa slide 42.","Kodigo.","42"],
 ["c","Itinalaga si Laurel na Sekretaryo ng Katarungan noong Disyembre 17, 1941.",true,"Tama, matapos maging masigasig si Quezon.","Disyembre 1941.","44"],
 ["d","Sa Malacañang ginaganap ang araw-araw na pulong ng gabinete bago umalis si Quezon.",false,"Sa tahanan ni Quezon sa Marikina.","Lungsod ng sapatos.","46"],
 ["d","Noong Disyembre 24, 1941, huling nakita ni Laurel si Pangulong Quezon.",true,"Sinamahan niya si Quezon mula sa Malacañang; mula noon ay hindi na niya ito nakita.","Bisperas ng Pasko.","49"],
 ["d","Si Benigno Aquino ang Komisyoner Panloob sa Komisyong Pampangasiwaan.",true,"Benigno Aquino – Komisyoner Panloob.","Interior.","51–52"],
 ["d","Si Laurel ang Tagapangulo ng Komisyong Pampangasiwaan.",false,"Si Jorge B. Vargas ang Tagapangulo; si Laurel ay Komisyoner ng Katarungan.","Vargas.","52"],
 ["d","Ang Kempeitai ay pulis militar ng Hapon.",true,"Kempeitai (pulis militar).","Military police.","53"],
 ["d","Sinaktan si Laurel sa Fort Santiago.",false,"Bumalik siya sa kanyang opisina nang hindi sinaktan.","Hindi.","55"],
 ["d","Nailigtas ni Laurel si Jose Abad Santos.",false,"Namagitan siya, ngunit ipinabaril na si Abad Santos.","Huli na.","59"],
 ["d","Ang KALIBAPI ay itinatag noong Disyembre 1942.",true,"Disyembre 1942 itinatag ang KALIBAPI.","Katapusan ng 1942.","60"],
 ["d","Binaril si Laurel sa Wack Wack Country Club noong Hunyo 5, 1943.",true,"Tama — binaril sa likod habang naglalaro ng golf.","Golf.","62"],
 ["r","Naging tagapangulo si Laurel ng Komisyon sa Paghahanda habang nakaratay pa sa PGH.",true,"Tama ayon sa slide 64.","Ospital.","64"],
 ["r","Ang Saligang-Batas ng 1943 ay inilaan para sa panahong payapa.",false,"Inilaan lamang ito habang nasa kalagayan ng digmaan ang Pilipinas.","Digmaan.","65"],
 ["r","Inihalal si Laurel bilang Pangulo ng Pilipinas noong Setyembre 25, 1943.",true,"Sa Pambansang Asamblea (Setyembre 25, 1943).","Huling linggo ng Setyembre.","66"],
 ["r","Dumating sina Laurel sa Japan noong Setyembre 30.",true,"Tama ayon sa slide 67.","Katapusan ng Setyembre.","67"],
 ["r","Sumang-ayon si Laurel na magdeklara ng digmaan laban sa E.U. at Great Britain sa Tokyo.",false,"Magalang niyang ipinahayag na hindi niya masusunod ang kahilingan.","Tumanggi.","70"],
 ["r","Ayon kay Tojo, ang pamimilian ay pagkalipol o Kalayaan.",true,"Tama ayon sa slide 71.","Dalawang pagpipilian.","71"],
 ["r","“Tanging mga Pilipino lamang ang maaaring magmahal sa mga Pilipino” ay pahayag ni JPL.",true,"Pahayag ni JPL kaugnay ng Pambansang Kaligtasan.","Pilipino.","73"],
 ["r","Pinahintulutan ni Laurel ang mga sosyal na pagdiriwang bilang Pangulo.",false,"Ipinagbawal niya ang mga sosyal na pagdiriwang.","Pagtitipid.","76"],
 ["r","Isa sa mga mapagpipilian ng Gabinete noong 1944 ay umakyat sa kabundukan.",true,"Kasama o hindi kasama ang pamilya.","Bundok.","80"],
 ["r","Pinayagan ni Laurel ang sapilitang pagsusundalo ng mga Pilipino laban sa E.U.",false,"Pinanindigan niya na wala ito sa kasunduan/layuning militar ng Republika.","Tumanggi.","82"],
 ["r","Sina Laurel at Aquino ang lumagda sa telegrama kay MacArthur.",true,"Jose P. Laurel at Benigno Aquino.","Dalawang pangalan.","87"],
 ["w","Napiit si Laurel nang sampung buwan.",true,"Tama ayon sa slide 91.","10.","91"],
 ["w","Si Osmeña ang nanalo sa halalang Pampanguluhan noong 1946.",false,"Si Manuel Roxas ang nanalo laban kay Osmeña.","Roxas.","93"],
 ["w","Nawala ang Commonwealth noong Hulyo 4, 1946.",true,"Pinagkalooban ng Kalayaan; sa gayon ding petsa ay nawala na ang Commonwealth.","Araw ng Kalayaan.","93"]
];

/* ---------------- FILL IN THE BLANK ----------------
   [topic, sentence with ___, [accepted answers], clue, slide] */
const FILL = [
 ["k","Ipinasok si Jose sa paaralan ni Padre Valerio ___.",["Malabanan"],"Apelyidong nagsisimula sa “M”.","2"],
 ["k","Ang gintong kuwintas ay may palawit na ___.",["krus","cross"],"Simbolo ng Kristiyano.","3"],
 ["k","Noong 1906, sa gulang na ___, nilisan ni Jose ang Tanauan.",["15","labinlima"],"Dalawang digit.","4"],
 ["k","Nag-aral si Jose sa San Juan de Letran, ang Alma Mater ng kanyang ___.",["ama","tatay"],"Magulang na lalaki.","4"],
 ["k","Nag-aral si Jose habang nagtatrabaho bilang ___ ng simbahan.",["sacristan","sakristan"],"Katulong ng pari.","6"],
 ["k","Naging English Teacher si Jose sa La Regeneracion High School sa ___.",["Trozo"],"Lugar sa Tondo; “T…”.","7"],
 ["k","Noong 1909, isinakdal si Jose sa salang ___.",["Nabigong Pagpatay","frustrated murder"],"Tangkang pagpatay.","8"],
 ["b","Ang abugado ng mga Laurel ay si Clyde ___.",["De Witt","DeWitt"],"Dalawang pantig na apelyido.","9"],
 ["b","Ang tesis ni Jose ay tungkol sa Legal History ng ___.",["Louisiana"],"Estado sa Amerika.","12"],
 ["b","Noong Setyembre 1915, nagtamo si Jose ng ___ puwesto sa Bar Examinations.",["pangalawang","pangalawa","ikalawang","ikalawa","2nd","second"],"Hindi una.","13"],
 ["a","Sa Yale, ipinagkaloob kay Jose ang Doctor of ___ Laws.",["Civil"],"Sibil.","17"],
 ["a","Nagtapos si Jose sa Yale noong Hulyo ___, 1920.",["19"],"Dalawang digit.","19"],
 ["a","Dumating si Jose sa Pilipinas noong Disyembre ___, 1920.",["30"],"Bisperas ng bisperas ng Bagong Taon.","21"],
 ["a","Pagkaraan ng ___ buwan bilang Undersecretary, naging Sekretaryo ng Interyor si Jose.",["pitong","pito","7"],"Lucky number.","21"],
 ["a","Si Jose ay ___ taong gulang nang maging Sekretaryo ng Interyor.",["31","tatlumpu't isa"],"Higit sa 30.","22"],
 ["a","Tumagal lamang ng ___ buwan ang posisyon ni Jose bilang Sekretaryo ng Interyor.",["limang","lima","5"],"Bilang ng daliri sa isang kamay.","22"],
 ["p","Nagtayo si Jose ng ___ (Law Office).",["Bupete","bufete"],"“Bu…”.","26"],
 ["p","Ang tahanan ng pamilya ay nasa panulukan ng Kalye Peñafrancia at Santo ___.",["Sepulcro"],"Libingan sa Espanyol.","28"],
 ["p","Tuwing Sabado at Linggo, nagtutungo ang mag-anak sa ___.",["Luneta","Rizal Park"],"Parke sa Maynila.","28"],
 ["p","Naghain si Jose noong 1928 ng panukalang bigyang-karapatan ang ___ na makaboto.",["kababaihan","babae","mga babae"],"Kalahati ng populasyon.","30"],
 ["p","Si Jose ay umanib sa ___.",["Masonerya","Freemasonry","Mason"],"Lihim na kapatiran.","31"],
 ["p","Naghain si Jose ng panukalang dapat magbayad ng buwis ang mga korporasyong ___.",["panrelihiyon","relihiyoso"],"May kinalaman sa simbahan.","32"],
 ["c","Ang Hare-Hawes-Cutting Act ay bunga ng misyong pinamunuan nina Sergio Osmeña at Manuel ___.",["Roxas"],"OsRox.","36"],
 ["c","Ang Tydings-McDuffie Law ay naiuwi ni Quezon noong ___.",["1934"],"Isang taon bago ang 1935 Konstitusyon.","38"],
 ["c","Kinilala si Laurel na isa sa “___ matatalinong lalaki ng kombensiyon”.",["pitong","pito","7"],"Bilang ng araw sa isang linggo.","39"],
 ["c","Noong ___, iminungkahi ni Laurel kay Quezon ang kodigo ng mamamayan.",["1938"],"Tatlong taon pagkatapos ng 1935.","41"],
 ["c","Ang Bushido ay tinatawag ding Kodigo ng ___.",["Mandirigma"],"Warrior.","42"],
 ["d","Noong Disyembre ___, 1941, ginanap ang huling pulong sa tahanan ni Quezon sa Marikina.",["23"],"Dalawang araw bago ang Pasko.","47"],
 ["d","Itinalaga si Laurel na pansamantalang ___ bukod sa pagiging Sekretaryo ng Katarungan.",["Punong Mahistrado","Chief Justice"],"Pinuno ng Kataas-taasang Hukuman.","48"],
 ["d","Si Jorge B. Vargas ay itinalagang Alkalde ng ___.",["Kalakhang Maynila","Maynila","Greater Manila"],"Lungsod.","48"],
 ["d","Pinagreport si Laurel sa Fort ___ dahil sa kanyang sirkular.",["Santiago"],"Kuta sa Intramuros.","55"],
 ["d","Ang KALIBAPI ay Kapisanan sa Paglilingkod sa Bagong ___.",["Pilipinas"],"Bansa natin.","60"],
 ["d","Binaril si Laurel sa Wack Wack Country Club sa ___.",["Mandaluyong"],"Lungsod sa Metro Manila.","62"],
 ["r","Naging Pangulo si Laurel at Ispiker si ___ sa Pambansang Asamblea.",["Aquino","Benigno Aquino"],"Benigno …","66"],
 ["r","Ang tagasalin-wika sa Tokyo ay si ___.",["Hamamoto"],"Apelyidong Hapones na “H…”.","70"],
 ["r","Bumalik sa Pilipinas sina Laurel noong Oktubre ___, 1943.",["14"],"Ikalawang linggo ng Oktubre.","71"],
 ["r","Ang pangunahing patakaran ng pamahalaan ni Laurel ay Pambansang ___.",["Kaligtasan"],"Survival.","73"],
 ["r","Ang pinakamalalim na pundasyon ng administrasyon ni JPL ay ang katarungang ___.",["maka-Diyos","makaDiyos","maka Diyos"],"May kinalaman sa Diyos.","74"],
 ["r","Ang tao ay naninirahan sa tatlong daigdig: pisikal, intelektwal, at ___.",["moral"],"Prinsipyo.","75"],
 ["r","Iniutos ni Laurel na anumang mayroon sa Malacañang ay ipagkaloob sa ___.",["maralita","mahihirap","mahirap"],"Mga mahihirap.","76"],
 ["r","Ang ipinamahagi sa Kawit, Kabite noong Hunyo 25, 1944 ay ang Damit na ___.",["Alaala"],"Souvenir.","78"],
 ["r","Nagdeklara si Laurel ng Estado ng ___ (State of War).",["Digmaan"],"War.","81"],
 ["r","Noong Disyembre 21, 1944, dinala si Laurel sa ___ at nanirahan nang tatlong buwan.",["Baguio"],"Summer Capital.","84"],
 ["r","Sa telegrama, pinakiusapan sina Vargas at ___ na ipagbigay-alam ang kanilang kinaroroonan.",["Capinpin"],"“C…”.","87"],
 ["w","Napiit si Laurel nang ___ buwan.",["sampung","sampu","10"],"Isang dekada.","91"],
 ["w","PRO DEO et PATRIA – Para sa Diyos at ___.",["Bayan"],"Patria.","92"],
 ["w","Pinagkalooban ng Kalayaan ang Pilipinas noong Hulyo ___, 1946.",["4","04"],"Fourth of July.","93"]
];

/* ---------------- TIMELINE ----------------
   [topic, date label, sort key (yyyy.mmdd), event, slide] */
const TL = [
 ["k","1906","1906.0000","Sa gulang na 15, nilisan ni Jose ang Tanauan upang mag-aral sa San Juan de Letran.","4"],
 ["k","1909","1909.0000","Habang nagbabakasyon sa Tanauan, isinakdal si Jose sa salang Nabigong Pagpatay.","8"],
 ["b","1911","1911.0000","Nagtapos sa Manila South High School, pumasok sa U.P. College of Law, at ikinasal kay Paciencia Hidalgo.","6, 10–11"],
 ["b","Marso 1915","1915.0300","Nagtapos ng abugasya nang may karangalan.","13"],
 ["b","Setyembre 1915","1915.0900","Pangalawang puwesto sa Bar Examinations.","13"],
 ["a","Hulyo 19, 1920","1920.0719","Nagtapos ng Doctor of Civil Laws sa Yale University.","19"],
 ["a","Disyembre 30, 1920","1920.1230","Dumating sa Pilipinas; bumalik sa Kawanihang Ehekutibo ng Departamento ng Interyor.","21"],
 ["a","1921","1921.0000","Itinalagang Undersecretary ng Departamento ng Interyor.","21"],
 ["p","1927","1927.0000","Ipinanalo ang isang kaso sa Seguro; binayaran ng daang libo.","27"],
 ["p","1928","1928.0000","Naghain ng panukalang batas para sa karapatang bumoto ng kababaihan (hindi nagtagumpay).","30"],
 ["p","1931","1931.0000","Natalo sa re-eleksyon kay Claro M. Recto.","32–33"],
 ["c","1932","1932.0000","Inalok ng Justice Department portfolio ngunit tinanggihan.","35"],
 ["c","1934","1934.0000","Naiuwi ni Quezon ang Tydings-McDuffie Law.","38"],
 ["c","1935","1935.0000","Pinagtibay ang Konstitusyon ng Commonwealth; nahalal si Quezon na Pangulo.","40"],
 ["c","1938","1938.0000","Iminungkahi kay Quezon ang kodigo ng mamamayan para sa mga paaralan.","41"],
 ["c","Oktubre 1941","1941.1000","Inanyayahan ni Quezon na maging Sekretaryo ng Katarungan; tumanggi muna si Laurel.","44"],
 ["c","Disyembre 17, 1941","1941.1217","Itinalagang Sekretaryo ng Katarungan.","44"],
 ["d","Disyembre 23, 1941","1941.1223","Pulong sa tahanan ni Quezon sa Marikina; ipinahayag ang pangwakas na pasya.","47"],
 ["d","Disyembre 24, 1941","1941.1224","Sinamahan ni Laurel si Quezon mula sa Malacañang; huling pagkikita nila.","49"],
 ["d","Enero 2, 1942","1942.0102","Pumasok sa Maynila ang puwersa ng mga Hapones.","50"],
 ["d","Disyembre 1942","1942.1200","Itinatag ang KALIBAPI.","60"],
 ["d","Enero 23, 1943","1943.0123","Utos Pangasiwaan Blg. 1 — Komisyong Pampangasiwaan (ayon sa slide).","51"],
 ["d","Hunyo 5, 1943","1943.0605","Binaril si Laurel sa Wack Wack Country Club, Mandaluyong.","62"],
 ["r","Setyembre 7, 1943","1943.0907","Iniharap ang Saligang-Batas.","66"],
 ["r","Setyembre 25, 1943","1943.0925","Pambansang Asamblea: Laurel – Pangulo, Aquino – Ispiker.","66"],
 ["r","Setyembre 30, 1943","1943.0930","Dumating sina Laurel sa Japan.","67"],
 ["r","Oktubre 14, 1943","1943.1014","Bumalik sa Pilipinas; inagurasyon ng Republika sa buwan ding iyon.","71"],
 ["r","Hunyo 25, 1944","1944.0625","Kalatas na Binasa sa Bayan ng Kawit, Kabite (Damit na Alaala).","78"],
 ["r","Setyembre 1944","1944.0900","Ipinaalam ni Murata ang deklarasyon ng digmaan ng Tsina, Siam at India; Estado ng Digmaan.","79–81"],
 ["r","Disyembre 21, 1944","1944.1221","Dinala si Laurel, pamilya at Gabinete sa Baguio.","84"],
 ["r","Agosto 17, 1945","1945.0817","Pinawalang-bisa ni Laurel ang kanyang pamahalaan matapos sumuko ang Hapon.","85"],
 ["w","Hunyo 23, 1946","1946.0623","Lumisan sa Hapon pauwi sina Laurel, Vargas, Aquino, Osias at Jose III.","93"],
 ["w","Hulyo 4, 1946","1946.0704","Kalayaan ng Pilipinas; nawala ang Commonwealth; inagurasyon ni Roxas.","93"],
 ["w","1949","1949.0000","Ipinatupad ang rebisyon ng Kodigo Sibil na itinaguyod ni Laurel.","30"]
];

/* ---------------- ENUMERATION ----------------
   [topic, prompt, [items], clue, slide] — each item may have alternatives separated by "|" */
const ENUM = [
 ["k","Dalawang trabaho ni Jose habang nag-aaral sa Maynila.",["English Teacher|teacher|guro","Clerk|klerk"],"Isa sa Trozo, isa sa Bureau of Forestry.","7"],
 ["k","Mga itinuro ng gurong Amerikano kay Jose sa Manila South High School (6).",["pulitikal|kaisipang pulitikal","pamumuno","kultura","kasaysayan","pamahalaan","liberal na demokrasya|demokrasya"],"P-P-K-K-P-L.","7"],
 ["b","Tatlong mahahalagang nangyari kay Jose noong 1911.",["nagtapos sa mataas na paaralan|nagtapos ng high school|nagtapos|Manila South","U.P. College of Law|UP|abugasya|College of Law","Paciencia Hidalgo|ikinasal|kasal|Paciencia"],"Paaralan, paaralan, pag-ibig.","6, 10–11"],
 ["a","Dalawang unibersidad sa Europa na pinuntahan ni Jose.",["Sorbonne","Oxford"],"Isa sa Paris, isa sa England.","20"],
 ["a","Dalawang hukumang tumanggap kay Jose tatlong buwan matapos ang Yale.",["Court of Appeals","Korte Suprema ng Distrito ng Columbia|Distrito ng Columbia|Columbia|Korte Suprema"],"Apela at D.C.","19"],
 ["p","Ang siyam na anak nina Jose at Doña Paciencia.",["Jose Bayani","Jose Sotero III|Sotero III","Natividad","Sotero Cosme","Mariano Antonio|Maning","Rosenda Paciencia|Rosenda","Potenciana|Nita","Salvador Roman|Doy","Arsenio|Dodgie"],"Dalawang “Jose”, apat na may palayaw.","25"],
 ["p","Dalawang kapartner ni Jose sa Bupete.",["Vicente del Rosario|del Rosario","Guillermo Lualhati|Lualhati"],"V.D.R. at G.L.","26"],
 ["p","Apat na lalawigan ng ikalawang Distrito na tinakbuhan ni Jose bilang senador.",["Batangas","Cavite","Laguna","Tayabas"],"BaCaLaTa.","29"],
 ["p","Mga lugar na pinupuntahan ng pamilya Laurel (4).",["Luneta","Look ng Maynila|Manila Bay","Los Baños|Los Banos","Biñan|Binan"],"L-L-L-B.","28"],
 ["p","Tatlong kakanin na binibili sa Biñan.",["puto","kalamay","kutsinta"],"Paborito ng mga anak.","28"],
 ["c","Tatlong sangay na may hiwa-hiwalay na kapangyarihan (kasong Cuevo-Barredo).",["Lehislatura|legislative","Ehekutibo|executive","Hudikatura|judiciary"],"L-E-H.","41"],
 ["d","Siyam na miyembro ng Komisyong Pampangasiwaan.",["Jorge B. Vargas|Vargas","Benigno Aquino|Aquino","Antonio de las Alas|de las Alas","Jose P. Laurel|Laurel","Rafael Alunan|Alunan","Claro M. Recto|Recto","Quintin Paredes|Paredes","Teofilo Sison|Sison","Jose Yulo|Yulo"],"Vargas ang tagapangulo; Yulo ang Punong Mahistrado.","52"],
 ["r","Mga Hapones na kinausap nina Laurel sa Tokyo (5).",["Tojo","Shigemitsu","Aoki","Murata","Wachi"],"T-S-A-M-W.","68"],
 ["r","Tatlong daigdig na tinitirhan ng tao ayon kay JPL.",["pisikal","intelektwal","moral"],"PIM.","75"],
 ["r","Apat na mapagpipilian ng Gabinete noong Setyembre 1944.",["tumakas|tanggihan","kabundukan|bundok","magpatiwakal|magpakamatay","makipagkasundo|kalutasan|kasunduan"],"Tumakas, bundok, kamatayan, kasunduan.","80"],
 ["r","Tatlong bansa/pamahalaang nagdeklara na ng digmaan ayon kay Murata.",["Tsina|Nanking|China","Siam|Thailand","India|Bose"],"Asya.","79"],
 ["r","Mga ginawa ni Laurel bilang Pangulo para sa simpleng pamumuhay (3).",["pagtitipid","maralita|mahihirap","pagdiriwang|sosyal"],"Tipid, bigay, bawal ang party.","76"],
 ["w","Mga lumisan sa Hapon pauwi noong Hunyo 23, 1946 (5).",["Laurel","Vargas","Aquino","Osias","Jose III"],"Kasama ang anak ni Laurel.","93"]
];

/* ---------------- ESSAY / SAGUTIN ----------------
   [topic, question, [key points to include], slide] */
const ESSAY = [
 ["k","Ano ang naging malaking dagok kay Doña Jacoba sa inaakala niyang susunod si Jose sa mga yapak ng ama sa kukuning propesyon?",["Mababa ang marka ni Jose sa unang taon sa Letran","Nalungkot ang ina dahil inakala niyang susunod si Jose sa yapak ng ama","Ang Letran ay Alma Mater ng ama"],"4–5, 14"],
 ["k","Bakit nangako si Jose sa sarili na magbabago na siya? Talakayin ang mga ginawa niyang pagtitiis bilang patunay.",["Dahil sa kalungkutan ng kanyang ina","Nagbitiw sa orkestra ng Tanauan","Nag-aral habang sacristan","Nagtrabaho bilang English Teacher at clerk sa Bureau of Forestry"],"5–7, 14"],
 ["k","Anong pangyayari ang muntik nang magwasak sa buhay ni Jose?",["1909, habang nagbabakasyon sa Tanauan","Isinakdal sa salang Nabigong Pagpatay","Dalawang taong paglilitis; naubos ang kabuhayan","Nanalo sa tulong ni Clyde De Witt (P10,000.00)"],"8–9, 14"],
 ["b","Ibigay ang patunay na si Jose ay naging mahusay sa pag-aaral ng batas.",["Mataas na grado sa paaralan ng batas","Pinakamahusay na tesis (Louisiana)","Nagtapos nang may karangalan, Marso 1915","Pangalawang puwesto sa Bar, Setyembre 1915"],"12–13, 15"],
 ["a","Paano pinatunayan ni Jose P. Laurel na siya'y may prinsipyo sa kaso ni Conley? (Basahin sa Libro)",["Ipinilit ang tamang proseso at disiplina kay Conley","Hindi nagpadala sa panig ni G.H. Wood","Nagbitiw sa tungkulin bilang paninindigan"],"22–24"],
 ["r","Ipaliwanag ang kahulugan ng patakaran ni Laurel na “Pambansang Kaligtasan”.",["Pangunahing patakaran ng pamahalaan","Iligtas ang bansa at mamamayan sa panahon ng digmaan","“Tanging mga Pilipino lamang ang maaaring magmahal sa mga Pilipino”","Pamahalaan ng, para sa, at pinamamahalaan ng mga Pilipino"],"73–74, 89"],
 ["r","Paano ipinakilala ni Laurel ang pagmamahal niya sa kababayan nang utusan siya ng sapilitang pagsusundalo ng mga Pilipino?",["Tumanggi sa sapilitang pagsusundalo","Wala ito sa kasunduan/layuning militar ng Republika","Estado ng Digmaan lamang, hindi pakikipagdigmaan","Sa Tokyo: hindi magdedeklara ng digmaan laban sa E.U."],"70, 81–82, 89"],
 ["d","Bakit kaya pinayuhan ni Hen. Douglas MacArthur si Pang. Quezon na umalis na at magtungo sa Corregidor?",["Alam ni MacArthur ang kawalang-kahandaan ng Amerika","Binomba ang Pearl Harbor; nagapi ang USAFFE","Kaligtasan ng Pangulo at ng pamahalaang Commonwealth"],"46–47, 90"]
];
