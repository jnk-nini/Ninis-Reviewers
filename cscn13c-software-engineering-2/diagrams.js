/* Inline SVG redraws of the diagrams shown on the slides. Colors come from CSS variables so they follow light/dark mode.
   Every label below is copied from the slide images. */
(self.D=self.D||{});
D.SVG={
/* Use Case Diagram slide 5: Online Store */
store:`<svg viewBox="0 0 560 390" role="img" aria-labelledby="t-store"><title id="t-store">Use case diagram: Online Store. Visitor does Place Order, Cancel Order, Manage Order. Admin does Cancel Order, Manage Order, Change Order Status, Update Products.</title>
<rect class="s-box" x="170" y="12" width="220" height="366" rx="4"/><text class="s-t s-b" x="280" y="34" text-anchor="middle">Online Store</text>
<g class="s-line"><path d="M82 195L198 82M82 195L196 143M82 195L200 205"/><path d="M475 258L364 150M475 258L360 208M475 258L352 270M475 258L350 332"/></g>
<g class="s-uc"><ellipse cx="280" cy="72" rx="82" ry="24"/><ellipse cx="280" cy="136" rx="82" ry="24"/><ellipse cx="280" cy="200" rx="82" ry="24"/><ellipse cx="280" cy="264" rx="82" ry="24"/><ellipse cx="280" cy="328" rx="82" ry="24"/></g>
<g class="s-t" text-anchor="middle"><text x="280" y="76">Place Order</text><text x="280" y="140">Cancel Order</text><text x="280" y="204">Manage Order</text><text x="280" y="268">Change Order Status</text><text x="280" y="332">Update Products</text></g>
<use href="#actor" class="s-actor" x="52" y="162" width="60" height="84"/><text class="s-t" x="82" y="262" text-anchor="middle">Visitor</text>
<use href="#actor" class="s-actor s-act2" x="445" y="225" width="60" height="84"/><text class="s-t" x="475" y="325" text-anchor="middle">Admin</text></svg>`,

/* Use Case Diagram slide 6: Clinic, with the slide's own red annotations */
clinic:`<svg viewBox="0 0 720 560" role="img" aria-labelledby="t-clinic"><title id="t-clinic">Annotated use case diagram: Clinic. Patient, Scheduler, Doctor and Clerk. Make Appointment and Request Medication include Check Patient Record. Defer Payment extends Pay Bill, which has the extension point more treatment. Bill Insurance is a child use case of Pay Bill through generalization.</title>
<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="currentColor" stroke-width="1.6"/></marker>
<marker id="tri" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="12" markerHeight="12" orient="auto"><path d="M1 1L11 6L1 11z" class="s-hollow"/></marker>
<marker id="pt" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M1 1L9 5L1 9z" class="s-pt"/></marker></defs>
<rect class="s-box" x="160" y="40" width="360" height="500" rx="4"/><text class="s-t s-b" x="340" y="64" text-anchor="middle" font-size="17">Clinic</text>
<g class="s-line"><path d="M92 255L180 112M92 255L180 192M92 255L182 308M92 255L190 408"/><path d="M652 120L340 114M652 120L338 180M652 330L342 316M652 440L340 424"/></g>
<g class="s-dash s-line" color="var(--ink)"><path d="M312 214L372 238" marker-end="url(#ah)"/><path d="M304 292L372 272" marker-end="url(#ah)"/><path d="M384 380L330 398" marker-end="url(#ah)"/></g>
<path class="s-line" d="M260 478V456" marker-end="url(#tri)"/>
<g class="s-uc"><ellipse cx="260" cy="108" rx="82" ry="30"/><ellipse cx="260" cy="190" rx="82" ry="30"/><ellipse cx="430" cy="252" rx="72" ry="32"/><ellipse cx="260" cy="316" rx="82" ry="30"/><ellipse cx="440" cy="372" rx="62" ry="26"/><ellipse cx="260" cy="420" rx="82" ry="34"/><ellipse cx="260" cy="508" rx="70" ry="30"/></g>
<path class="s-line" d="M178 424H342"/>
<g class="s-t" text-anchor="middle"><text x="260" y="104">Cancel</text><text x="260" y="120">Appointment</text><text x="260" y="186">Make</text><text x="260" y="202">Appointment</text><text x="430" y="248">Check Patient</text><text x="430" y="264">Record</text><text x="260" y="312">Request</text><text x="260" y="328">Medication</text><text x="440" y="368">Defer</text><text x="440" y="384">Payment</text><text x="260" y="418">Pay Bill</text><text x="260" y="441">more treatment</text><text x="260" y="512">Bill Insurance</text></g>
<g class="s-t s-i" text-anchor="middle" font-size="12"><text x="352" y="214" transform="rotate(22 352 214)">«include»</text><text x="330" y="272" transform="rotate(-17 330 272)">«include»</text><text x="318" y="372">«extend»</text></g>
<use href="#actor" class="s-actor" x="62" y="222" width="60" height="84"/><text class="s-t" x="92" y="322" text-anchor="middle">Patient</text>
<use href="#actor" class="s-actor s-act2" x="622" y="86" width="60" height="84"/><text class="s-t" x="652" y="186" text-anchor="middle">Scheduler</text>
<use href="#actor" class="s-actor s-act2" x="622" y="296" width="60" height="84"/><text class="s-t" x="652" y="396" text-anchor="middle">Doctor</text>
<use href="#actor" class="s-actor s-act2" x="622" y="406" width="60" height="84"/><text class="s-t" x="652" y="506" text-anchor="middle">Clerk</text>
<g class="s-note" font-size="13"><text x="12" y="24">system name</text><path d="M96 20Q200 18 304 52" fill="none" marker-end="url(#pt)"/>
<text x="12" y="478">system boundary</text><path d="M118 474L158 470" marker-end="url(#pt)"/>
<text x="12" y="528">child use case</text><path d="M104 524L186 512" marker-end="url(#pt)"/>
<text x="530" y="60">include use case</text><path d="M560 68Q520 120 480 236" fill="none" marker-end="url(#pt)"/>
<text x="530" y="466">extend use case</text><path d="M590 450Q560 400 508 384" fill="none" marker-end="url(#pt)"/>
<text x="12" y="408">extension point</text><path d="M106 412L176 426" marker-end="url(#pt)"/>
<text x="372" y="536">generalization</text><path d="M368 530Q330 516 272 470" fill="none" marker-end="url(#pt)"/></g></svg>`,

/* Use Case Diagram slide 11: Level 1 DFD (restaurant) */
dfd:`<svg viewBox="0 0 760 630" role="img" aria-labelledby="t-dfd"><title id="t-dfd">Level 1 data flow diagram for a restaurant. Customer sends Orders for food to process 1.0 Processing of an order, which returns a Receipt and sends a Food order to the Kitchen. Sold items go to 2.0 Update sold items file and Inventory data to 3.0 Update inventory file. Those fill the Database of sold items and the Inventory database. 4.0 Generate management report reads both and sends a Management report to the Restaurant manager.</title>
<defs><marker id="da" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto"><path d="M1 1L9 5L1 9" fill="none" stroke="currentColor" stroke-width="1.7"/></marker></defs>
<g class="s-ent"><rect x="20" y="38" width="130" height="46" rx="3"/><rect x="600" y="76" width="120" height="46" rx="3"/><rect x="600" y="548" width="140" height="46" rx="3"/></g>
<g class="s-t s-b" text-anchor="middle"><text x="85" y="66">Customer</text><text x="660" y="104">Kitchen</text><text x="670" y="566">Restaurant</text><text x="670" y="582">manager</text></g>
<g class="s-proc"><circle cx="380" cy="100" r="64"/><circle cx="170" cy="300" r="62"/><circle cx="590" cy="300" r="62"/><circle cx="380" cy="540" r="62"/></g>
<g class="s-line"><path d="M327 64H433M118 266H222M538 266H642M329 506H431"/></g>
<g class="s-t" text-anchor="middle"><text class="s-b" x="380" y="55">1.0</text><text x="380" y="88">Processing of</text><text x="380" y="106">an order</text>
<text class="s-b" x="170" y="257">2.0</text><text x="170" y="292">Update sold</text><text x="170" y="310">items file</text>
<text class="s-b" x="590" y="257">3.0</text><text x="590" y="292">Update</text><text x="590" y="310">inventory file</text>
<text class="s-b" x="380" y="497">4.0</text><text x="380" y="528">Generate</text><text x="380" y="546">management</text><text x="380" y="564">report</text></g>
<g class="s-store"><path d="M20 420H210M20 472H210M20 420V472"/><path d="M550 420H740M550 472H740M550 420V472"/></g>
<g class="s-t s-b" text-anchor="middle"><text x="118" y="442">Database of</text><text x="118" y="460">sold items</text><text x="648" y="442">Inventory</text><text x="648" y="460">database</text></g>
<g class="s-flow" color="var(--ink)">
<path d="M150 56L316 90" marker-end="url(#da)"/>
<path d="M337 150Q85 176 85 88" marker-end="url(#da)"/>
<path d="M444 98H598" marker-end="url(#da)"/>
<path d="M352 158L212 246" marker-end="url(#da)"/>
<path d="M408 158L548 246" marker-end="url(#da)"/>
<path d="M150 360V418" marker-end="url(#da)"/>
<path d="M610 360V418" marker-end="url(#da)"/>
<path d="M60 472V520H322" marker-end="url(#da)"/>
<path d="M700 472V520H438" marker-end="url(#da)"/>
<path d="M436 562H598" marker-end="url(#da)"/></g>
<g class="s-lbl" font-size="12.5"><text x="162" y="46">Orders for food</text>
<text x="190" y="172" text-anchor="middle">Receipt</text>
<text x="520" y="88" text-anchor="middle">Food order</text>
<text x="268" y="190" text-anchor="end">Sold items</text>
<text x="500" y="190">Inventory data</text>
<text x="160" y="392">Formatted</text><text x="160" y="407">sold item data</text>
<text x="620" y="392">Formatted</text><text x="620" y="407">inventory data</text>
<text x="70" y="492">Info. about daily sold items</text><text x="70" y="507">and amount</text>
<text x="690" y="492" text-anchor="end">Info. about daily inventory</text><text x="690" y="507" text-anchor="end">depletion amount</text>
<text x="518" y="554" text-anchor="middle">Management report</text></g>
</svg>`,

/* MADE UP (not on the slides): Level 0 DFD / context diagram for the same restaurant */
dfd0:`<svg viewBox="0 0 700 380" role="img" aria-labelledby="t-dfd0"><title id="t-dfd0">Made-up Level 0 data flow diagram, not from the slides. One process, Restaurant management system, with Customer, Kitchen and Restaurant manager. Customer sends Orders for food and receives a Receipt. Kitchen receives a Food order. Restaurant manager receives a Management report.</title>
<defs><marker id="d0a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto"><path d="M1 1L9 5L1 9" fill="none" stroke="currentColor" stroke-width="1.7"/></marker></defs>
<g class="s-ent"><rect x="20" y="147" width="130" height="46" rx="3"/><rect x="550" y="62" width="120" height="46" rx="3"/><rect x="540" y="272" width="140" height="46" rx="3"/></g>
<g class="s-t s-b" text-anchor="middle"><text x="85" y="175">Customer</text><text x="610" y="90">Kitchen</text><text x="610" y="290">Restaurant</text><text x="610" y="306">manager</text></g>
<g class="s-proc"><circle cx="350" cy="190" r="84"/></g>
<g class="s-t" text-anchor="middle"><text class="s-b" x="350" y="150">0</text><text x="350" y="186">Restaurant</text><text x="350" y="204">management</text><text x="350" y="222">system</text></g>
<g class="s-flow" color="var(--ink)"><path d="M150 160L268 172" marker-end="url(#d0a)"/><path d="M270 212L150 182" marker-end="url(#d0a)"/><path d="M408 130L548 92" marker-end="url(#d0a)"/><path d="M406 250L538 294" marker-end="url(#d0a)"/></g>
<g class="s-lbl" font-size="12.5"><text x="208" y="146" text-anchor="middle">Orders for food</text><text x="208" y="222" text-anchor="middle">Receipt</text><text x="468" y="96" text-anchor="middle">Food order</text><text x="440" y="304" text-anchor="middle">Management report</text></g>
</svg>`,

/* MADE UP (not on the slides): Level 2 DFD that decomposes process 1.0 of the Level 1 example */
dfd2:`<svg viewBox="0 0 760 420" role="img" aria-labelledby="t-dfd2"><title id="t-dfd2">Made-up Level 2 data flow diagram, not from the slides. Process 1.0 Processing of an order is split into 1.1 Record customer order, 1.2 Print receipt and 1.3 Send food order to kitchen. Customer sends Orders for food to 1.1. 1.1 passes Order details to 1.2 and 1.3. 1.2 gives the Customer a Receipt. 1.3 sends a Food order to the Kitchen.</title>
<defs><marker id="d2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto"><path d="M1 1L9 5L1 9" fill="none" stroke="currentColor" stroke-width="1.7"/></marker></defs>
<g class="s-ent"><rect x="20" y="147" width="130" height="46" rx="3"/><rect x="610" y="297" width="120" height="46" rx="3"/></g>
<g class="s-t s-b" text-anchor="middle"><text x="85" y="175">Customer</text><text x="670" y="325">Kitchen</text></g>
<g class="s-proc"><circle cx="330" cy="100" r="62"/><circle cx="330" cy="320" r="62"/><circle cx="570" cy="170" r="62"/></g>
<g class="s-t" text-anchor="middle"><text class="s-b" x="330" y="60">1.1</text><text x="330" y="92">Record</text><text x="330" y="110">customer</text><text x="330" y="128">order</text>
<text class="s-b" x="330" y="280">1.2</text><text x="330" y="312">Print</text><text x="330" y="330">receipt</text>
<text class="s-b" x="570" y="130">1.3</text><text x="570" y="160">Send food order</text><text x="570" y="178">to kitchen</text></g>
<g class="s-flow" color="var(--ink)"><path d="M120 147L272 112" marker-end="url(#d2a)"/><path d="M318 160Q316 220 318 258" marker-end="url(#d2a)"/><path d="M386 128L514 150" marker-end="url(#d2a)"/><path d="M270 330Q130 340 100 196" marker-end="url(#d2a)"/><path d="M590 232L640 295" marker-end="url(#d2a)"/></g>
<g class="s-lbl" font-size="12.5"><text x="170" y="116" text-anchor="middle">Orders for food</text><text x="312" y="212" text-anchor="end">Order details</text><text x="450" y="124" text-anchor="middle">Order details</text><text x="150" y="350" text-anchor="middle">Receipt</text><text x="652" y="262">Food order</text></g>
</svg>`
};
