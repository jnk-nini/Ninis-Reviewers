/* Study notes. Wording follows the six slide decks of
   "(CSCN13C) Software Engineering 2".
   **text** = key word (hidden in Recall mode).  sl = "deck·slide(s)"  (decks are listed in D.DECKS).
   {{svg:name}} = a diagram redrawn from a slide image (see diagrams.js). */
(self.D=self.D||{});
D.DECKS={
 g1:{n:"Ch 1 Guide",full:"Software Engineering Documentation Guide · Chapter 1 Introduction"},
 d1:{n:"Ch 1 Documentation",full:"Software Engineering Documentation · Chapter 1"},
 c2:{n:"Ch 2 Literature",full:"Software Engineering · Chapter 2 (Literature Review)"},
 m2:{n:"Ch 2 Methodologies",full:"Chapter 2 Software Engineering 2 · Software Development Methodologies"},
 c3:{n:"Ch 3 Guidelines",full:"Software Engineering · Chapter 3.1 Guidelines"},
 uc:{n:"Use Case & DFD",full:"Use Case Diagram · Soft Eng 2"}
};
D.TOPICS={
 a:{name:"Chapter 1 · Introduction",short:"Chapter 1",icon:"📝",part:"Documentation",slides:"Background · Objectives · Problem · Significance · Scope",grp:"doc"},
 b:{name:"Chapter 2 · Literature Review, Framework & Terms",short:"Chapter 2 Literature",icon:"📚",part:"Documentation",slides:"Literature review · Conceptual framework · Definition of terms",grp:"doc"},
 c:{name:"Chapter 3 · Methodology & System Design",short:"Chapter 3",icon:"🏗️",part:"Documentation",slides:"Methods · Project planning · System design · Architecture · Process flow",grp:"doc"},
 d:{name:"Software Development Methodologies",short:"Methodologies",icon:"🔁",part:"Concepts",slides:"Kanban · Iterative · Scrum · Requirements engineering",grp:"con"},
 e:{name:"Use Case Diagram & Data Flow Diagram",short:"Use Case & DFD",icon:"🧭",part:"Concepts",slides:"Actors · System · Goals · DFD levels",grp:"con"}
};
D.NOTES={
/* ============ A · CHAPTER 1 ============ */
a:[
{h:"Chapter 1 at a glance",sl:"g1·2–5|c2·1",b:`
<p>The Chapter 1 slides (<b>Introduction</b>) go through these parts:</p>
<ol>
<li>**Background of the Study**</li>
<li>**Objectives of the Study**: General Objective and Specific Objectives</li>
<li>**Statement of the Problem**</li>
<li>**Significance of the Study**: Stakeholder Identification and Analysis</li>
<li>**Scope and Delimitation** (marked “Part of Chapter-1” in the Chapter 2 slides)</li>
</ol>
<div class="hook">🧠 The next sections go through each part in the slides' own words.</div>`},

{h:"Background of the Study",sl:"g1·2|d1·2",b:`
<p><b>Introduction → Background of the Study.</b> What to write:</p>
<ul>
<li>Write an **article format** about the **end user**,</li>
<li>The **enterprise** where it belong,</li>
<li>**Introduce** your system,</li>
<li>Write the **significance** of your system to the user's enterprise</li>
<li>at least **1 paragraph** each (*) and consume at least the **whole page or two**</li>
</ul>
<table class="t"><tr><th>Cover this</th><th>Length</th></tr>
<tr><td>The **end user**</td><td rowspan="4">at least **1 paragraph each**; together at least the **whole page or two**</td></tr>
<tr><td>The **enterprise** where it belong</td></tr>
<tr><td>**Your system** (introduce it)</td></tr>
<tr><td>The **significance** of your system to the user's enterprise</td></tr></table>`},

{h:"Objectives of the Study: General Objective",sl:"g1·3,6|d1·3",b:`
<p><b>Introduction → Objectives of the Study → General Objective</b></p>
<ul>
<li>Write the general objective of the study in an **introductory format** consisting of at least **two (2) paragraphs**.</li>
<li>The discussion should clearly explain:
 <ul>
 <li>what the study intends to **accomplish**,</li>
 <li>the main **purpose** of the proposed project, and</li>
 <li>how it aims to address the identified **problems or limitations** of the **existing system**.</li>
 </ul></li>
</ul>`},

{h:"Objectives of the Study: Specific Objectives",sl:"g1·3,6|d1·3",b:`
<p><b>Introduction → Objectives of the Study → Specific Objectives</b></p>
<ul>
<li>Provide **three (3) specific objectives** that clearly describe the **measurable outcomes or activities** that the project intends to accomplish.</li>
<li>Each specific objective should be written in **one paragraph**.</li>
<li>Begin each objective with a clear **action verb**, such as <b>Develop, Design, Implement, Improve, Create, Analyze, Evaluate, innovate or Determine</b>.</li>
<li>The objectives should be **specific**, **realistic**, and directly **related to the identified problems** and the overall purpose of the project.</li>
<li>Each objective should describe what the project **will accomplish**, rather than simply stating general intentions.</li>
</ul>
<table class="t"><tr><th></th><th>General Objective</th><th>Specific Objectives</th></tr>
<tr><td>How many?</td><td>one (introductory format)</td><td>**three (3)**</td></tr>
<tr><td>Length</td><td>at least **two (2) paragraphs**</td><td>**one paragraph** each</td></tr>
<tr><td>Starts with</td><td>an introduction</td><td>a clear **action verb**</td></tr></table>
<div class="trap"><b>Watch out:</b> the verb list on slide 3 of the Guide includes <b>“innovate”</b>. The other slides that repeat the list end with “Evaluate, or Determine”.</div>`},

{h:"Sample statement on the slide",sl:"g1·7",b:`
<p>This sample is shown after the objectives slides:</p>
<div class="ex"><b>“Ensure that 90% of my team completes the new inventory software training before the end of the current quarter.”</b></div>
<ul>
<li>The Team is sometimes **missing the deadline**.</li>
<li>Once a deadline is missed it translates to **financial loss** for the company.</li>
<li>This experience **demoralized** the whole department to the point of them losing their **motivation** in exploring and studying more solution based system.</li>
<li>The researchers figured out that when the team reached **90%**, the financial cost for the company in terms of profit will also rise to about **30%**.</li>
</ul>`},

{h:"Statement of the Problem",sl:"g1·4|d1·4",b:`
<p>Three parts. Know what each one asks you to write:</p>
<table class="t"><tr><th>Part</th><th>What to write (slide wording)</th></tr>
<tr><td>**Project Overview / Problem Statement**</td><td>Describe the **problems and limitations** of the **current system** being used. Explain how the existing software system **operates**, its current **processes**, and why there is a **need to develop, improve, or replace** the system.</td></tr>
<tr><td>**Problems and Challenges**</td><td>Identify and discuss the specific problems encountered by **both the administrators and end-users** when using the existing system. Explain how these issues affect their **tasks, productivity, efficiency, and overall user experience**.</td></tr>
<tr><td>**Purpose and Rationale of the Proposed Project**</td><td>Clearly explain the intended **purpose** of the proposed project and the **reasons** for improving or overhauling the existing system. Describe how the proposed system is expected to address the identified problems, **improve current processes**, and provide a more **efficient and effective** solution for its intended users.</td></tr></table>`},

{h:"Significance of the Study",sl:"g1·5|d1·5",b:`
<p><b>Significance of the study → Stakeholder Identification and Analysis</b></p>
<h4>Step 1 · Identify All Project Stakeholders</h4>
<ul><li>Identify all **individuals, groups, organizations, or departments** that may be **directly or indirectly affected** by the project or have an **interest in its success**.</li></ul>
<h4>Step 2 · Describe Each Stakeholder</h4>
<ul><li>Provide a brief description of each identified stakeholder, including their **role**, **responsibilities**, **relationship to the project**, and **level of involvement**.</li></ul>
<h4>Step 3 · Analyze the Benefits of the Project to Each Stakeholder</h4>
<ul>
<li>For each identified stakeholder, write at least **two (2) well-developed paragraphs** explaining:</li>
<li>How will the project **benefit** the stakeholder?</li>
<li>How will the project address their **needs, problems, or concerns**?</li>
<li>How can the project improve their **work processes or productivity**?</li>
<li>How can the project improve their **working efficiency and effectiveness**?</li>
<li>What **specific improvements or advantages** can the stakeholder expect once the project is implemented?</li>
</ul>`},

{h:"Specific examples & expected output",sl:"d1·6",b:`
<ul>
<li>**Use Specific and Practical Examples**: support your discussion with specific examples whenever possible. Focus on how the proposed project can create **practical improvements** rather than simply stating that it will be “beneficial” or “helpful.”</li>
</ul>
<h4>Expected Output</h4>
<p>For each stakeholder, organize your discussion using this format:</p>
<div class="ex"><b>Stakeholder:</b> [Name/Group]<br><b>Description:</b> Briefly describe the stakeholder, their role, and their relationship to the project.<br><b>Benefits and Impact:</b> Write at least **two paragraphs** explaining how the project will benefit the stakeholder, address their needs, improve their workflow, and increase their efficiency and effectiveness.</div>`},

{h:"Scope and Delimitation",sl:"c2·1",b:`
<p><b>Scope and Delimitation (Part of Chapter-1)</b></p>
<ul>
<li>Discuss the **scope** of your study, the scope of your system and other related things which your system has **covered**.</li>
<li>Discuss your system's **limitation**, discuss the possible extent of expectations where your system **no longer cover**.</li>
</ul>
<table class="t"><tr><th>Scope</th><th>Delimitation (limitation)</th></tr>
<tr><td>What the study and the system **cover**</td><td>Where the system **no longer covers**: the possible extent of expectations</td></tr></table>`}
],

/* ============ B · CHAPTER 2 LITERATURE ============ */
b:[
{h:"Chapter II at a glance",sl:"c2·2",b:`
<p><b>Chapter - II</b> has three parts:</p>
<ol>
<li>**Literature review**</li>
<li>**Conceptual Framework**</li>
<li>**Definition of terms**</li>
</ol>`},

{h:"Introduction to your Literature Review",sl:"c2·3",b:`
<p><b>Write an Introduction to your Literature review</b></p>
<ul><li>**Briefly explain** the **purpose** of the literature review and its **connection to your project**.</li></ul>
<div class="ex"><b>Example:</b><br>“This literature review examines previous studies, software development methodologies, and related technologies relevant to the proposed Student Attendance Monitoring System. The review aims to identify existing solutions, strengths, limitations, and research gaps that justify the development of the proposed system.”</div>`},

{h:"Related Studies",sl:"c2·4",b:`
<ul><li>Discuss **academic research** related to your project topic.</li></ul>
<h4>For each study, include:</h4>
<div class="two">
<div class="box"><ul><li>**Author(s)**</li><li>**Year**</li><li>**Purpose**</li></ul></div>
<div class="box"><ul><li>**Methodology**</li><li>**Findings**</li><li>**Relevance** to your project</li></ul></div></div>
<div class="ex"><b>Example:</b><br>“According to Santos et al. (2023), automated attendance systems using QR codes significantly reduced recording errors and improved efficiency in educational institutions. The study demonstrated a 95% accuracy rate in attendance tracking. This finding supports the implementation of automation features in the proposed system.”</div>`},

{h:"Related Literature",sl:"c2·5",b:`
<ul><li>Discuss **books, journals, articles, and reliable online sources** about concepts and technologies used in your project.</li></ul>
<h4>Example topics</h4>
<div class="chips"><span>Database Management Systems</span><span>Web Development Frameworks</span><span>Mobile Application Development</span><span>Artificial Intelligence</span><span>Cloud Computing</span><span>Cybersecurity</span></div>
<div class="ex"><b>Example:</b><br>“According to Pressman (2020), software engineering is a systematic and disciplined approach to software development aimed at producing high-quality software that meets user requirements. This concept serves as the foundation of the proposed project.”</div>
<table class="t"><tr><th>Related Studies</th><th>Related Literature</th></tr>
<tr><td>**Academic research** on your project topic (author, year, purpose, methodology, findings, relevance)</td><td>**Books, journals, articles, reliable online sources** about concepts and technologies used</td></tr></table>`},

{h:"Writing Tips",sl:"c2·6",b:`
<ul>
<li>Use **recent sources** (within the last **5 years**).</li>
<li>Use **scholarly sources**:</li>
</ul>
<div class="chips"><span>Google Scholar</span><span>IEEE Xplore</span><span>ACM Digital Library</span><span>ScienceDirect</span><span>Springer</span></div>
<ul class="tips">
<li>✅ Organize studies by **themes** rather than listing them one by one.</li>
<li>✅ **Compare and analyze** sources instead of merely summarizing them.</li>
<li>✅ End with a clear **research gap** that justifies your project.</li>
</ul>`},

{h:"Conceptual Framework",sl:"c2·7",b:`
<ul>
<li>A **Conceptual Framework** is a **visual or written representation** that shows the **relationship** between the key **variables, components, or processes** in your project.</li>
<li>It serves as a **guide** that explains how your proposed system will **solve a specific problem**.</li>
<li>In software engineering, a conceptual framework often illustrates:</li>
</ul>
<div class="flow"><span class="n">Input</span><span class="ar">→</span><span class="n">Process</span><span class="ar">→</span><span class="n">Output</span></div>
<p class="center-t"><b>IPO Model</b></p>`},

{h:"Definition of Terms",sl:"c2·8",b:`
<ul>
<li>Include only **terminologies and jargons** that has something to do with **your system**.</li>
<li>Include at least **10** different terminologies.</li>
</ul>
<div class="ex"><b>Example:</b>
<table class="t"><tr><th>Term</th><th>Definition</th></tr>
<tr><td>**Data**</td><td>A **raw material** in which information is derived.</td></tr>
<tr><td>**Hardware**</td><td>The **physical component** of the electronic data processing cycle.</td></tr></table></div>`}
],

/* ============ C · CHAPTER 3 ============ */
c:[
{h:"Chapter 3.1 at a glance",sl:"c3·1–2",b:`
<p><b>Chapter 3.1 · Guidelines.</b> The outline lists:</p>
<ol>
<li>**Research Methodology**</li>
<li>**Respondents of the Study**</li>
<li>**Project Planning**</li>
<li>**Project Design**</li>
<li>**System Architecture**</li>
<li>**Process Flow**</li>
</ol>
<div class="hook">🧠 The detailed slides are titled Respondents of the Study (research methods), Project Planning, System Design, System Architecture, and Process Flow.</div>`},

{h:"Respondents of the Study: Research Methods",sl:"c3·3",b:`
<ul>
<li>Describe the **research methods** utilized in the study.</li>
<li>If a **survey** was conducted, include a copy of the **survey questionnaire** in the **appendices**. Present the **consolidated survey results** together with the **data analysis**, including the data summary, **mean, median, and mode** for each relevant variable.</li>
<li>If an **interview** was conducted, provide the **profile of the interview participants** (e.g., age, position, role, or other relevant characteristics) and attach the **interview guide or questionnaire** used during the interviews. A **summary of the responses** and the **key findings** derived from the interviews should also be included.</li>
</ul>
<h4>Documentation Requirements</h4>
<ol>
<li>Research Methodology Description</li>
<li>Survey Questionnaire <em>(if applicable)</em></li>
<li>Consolidated Survey Results</li>
<li>Data Summary and Statistical Analysis (Mean, Median, and Mode)</li>
<li>Interview Participants' Profiles <em>(if applicable)</em></li>
<li>Interview Guide/Questionnaire</li>
<li>Summary of Interview Responses and Key Findings</li>
</ol>
<div class="hook">🧠 This section should clearly demonstrate how data were <b>collected, analyzed, and interpreted</b> to support the study's objectives and conclusions.</div>`},

{h:"Project Planning: Development Phases",sl:"c3·4",b:`
<ul>
<li>The project must be developed and documented in **clearly defined phases**.</li>
<li>Each phase should demonstrate **measurable progress** and provide **evidence of the work completed**, ensuring that the project's objectives are being systematically achieved.</li>
<li>About **two paragraphs** each phase including the **definition** of each phase.</li>
</ul>
<div class="phases3">
<div class="ph p1"><b>Phase 1</b><h5>Research and Planning</h5><p>Gathering and analyzing information relevant to the project.</p><ul><li>Identifying the problem</li><li>Conducting a literature review</li><li>Defining project objectives</li><li>Gathering requirements</li><li>Preparing the project plan</li></ul><p class="out"><b>Outputs:</b> project proposal, system requirements, conceptual framework, initial design documents</p></div>
<div class="ph p2"><b>Phase 2</b><h5>Execution and Development</h5><p>The actual development and implementation of the project take place.</p><ul><li>System design</li><li>Coding</li><li>Database development</li><li>Interface creation</li><li>Integration of project components</li></ul><p class="out"><b>Progress shown by:</b> prototypes, screenshots, diagrams, and development reports</p></div>
<div class="ph p3"><b>Phase 3</b><h5>Refinement and Testing</h5><p>Evaluating, improving, and validating the developed project.</p><ul><li>Debugging</li><li>Functionality testing</li><li>User acceptance testing</li><li>Performance evaluation</li><li>Implementing necessary revisions</li></ul><p class="out"><b>Documentation:</b> test results, identified issues, corrective actions taken, and the final version ready for deployment or presentation</p></div>
</div>
<div class="hook">🧠 <b>Note:</b> Each phase must be supported by appropriate <b>documentation, deliverables, and evidence of progress</b> to clearly demonstrate the continuous development and improvement of the project.</div>`},

{h:"Example of Project Phases",sl:"c3·5",b:`
<p>The slide shows a chevron diagram with <b>four</b> phases:</p>
<div class="chev"><span>Initiation</span><span>Planning</span><span>Execution</span><span>Closing</span></div>
<div class="phases4">
<div class="box"><h5>Initiation</h5><ul><li>Define project goal</li><li>Set targets</li><li>Create project charter</li><li>Form project team</li></ul></div>
<div class="box"><h5>Planning</h5><ul><li>Create timeline</li><li>Create budget</li><li>Define roles &amp; responsibilities</li><li>Risk assessment</li><li>Communication plan</li></ul></div>
<div class="box"><h5>Execution</h5><ul><li>Build main deliverable</li><li>Regular progress review</li><li>Handling issues</li><li>Perform training</li></ul></div>
<div class="box"><h5>Closing</h5><ul><li>Hand over final product to customer</li><li>Intensive support</li><li>Perform lessons learned</li><li>Release project team</li></ul></div>
</div>
<div class="trap"><b>Watch out:</b> the guideline (slide 4) has <b>3 phases</b>: Research and Planning, Execution and Development, Refinement and Testing. The <i>example</i> (slide 5) has <b>4 phases</b>: Initiation, Planning, Execution, Closing.</div>`},

{h:"System Design",sl:"c3·6",b:`
<ul>
<li>The System Design section should provide a **detailed presentation** of the proposed system's **structure, functionality, and user interaction**.</li>
<li>It must include the **User Interface (UI) Design**, showing the **appearance and layout of each major screen**, and the **Screen Flow Diagram**, illustrating the **navigation path and sequence of screens** within the application.</li>
<li>Use at least **one whole page or more** for this segment.</li>
<li>This section should clearly demonstrate how users will interact with the system, from **accessing the application** to **completing key tasks and transactions**. **Wireframes, mockups, screenshots, and flowcharts** may be included to effectively present the system's design and workflow.</li>
</ul>
<h4>Required Components</h4>
<div class="two">
<div class="box"><h5>User Interface (UI) Design</h5><ul><li>Login Screen</li><li>Dashboard</li><li>Data Entry Forms</li><li>Reports and Output Screens</li><li>Other Functional Screens</li></ul></div>
<div class="box"><h5>Also covered</h5><ul><li>Navigation structure</li><li>User interaction flow</li><li>Process transitions between screens</li><li>Major system components</li><li>Database interaction</li><li>Input, process, and output flow</li></ul></div></div>
<div class="hook">🧠 The System Design should clearly illustrate <b>how the system is organized</b>, <b>how information moves</b> through the application, and how users <b>efficiently accomplish their intended tasks</b>.</div>`},

{h:"Sample System Design",sl:"c3·7",b:`
<p>The slide is a picture of a <b>sample system design</b>: pages of a design system for a mobile parking app named <b>ParkIt</b>. The pages shown include User Personas, Design System, Buttons, Tooltips, Accessibility, Navigation Controls, Modal Dialogs, Empty State Illustrations, App-Native Controls, Searching, and Onboarding.</p>
<div class="hook">🧠 The slide carries no extra text. Use it as a picture of how screens, controls and navigation can be shown in a system design.</div>`},

{h:"System Architecture Diagram",sl:"c3·8",b:`
<ul>
<li>The System Architecture Diagram is a **graphical representation** that illustrates how the **major components** of the system **interact** with one another. It should clearly show the **relationship and communication flow** between the **users, front-end application, back-end services, and database**.</li>
<li>If the system utilizes **cloud computing services**, the architecture diagram must also include the **cloud infrastructure** and demonstrate how cloud-based resources support **data storage, processing, security, and system accessibility**.</li>
</ul>
<h4>The diagram should include</h4>
<div class="arch">
<div class="al a1"><b>Users/Actors</b><span>e.g., Administrator, Staff, Customer, Student</span></div>
<div class="al a2"><b>Front-End Layer</b><span>Web Application, Mobile Application, User Interface</span></div>
<div class="al a3"><b>Back-End Layer</b><span>Application Server, APIs, Business Logic</span></div>
<div class="al a4"><b>Database Layer</b><span>MySQL, PostgreSQL, MongoDB, etc.</span></div>
<div class="al a5"><b>Cloud Services</b> <em>(if applicable)</em><span>Cloud Hosting Platform · Cloud Database · Storage Services · Authentication Services · Backup and Recovery Services</span></div>
</div>
<h4>Communication Flow</h4>
<div class="flow"><span class="n">User requests</span><span class="ar">→</span><span class="n">Data processing</span><span class="ar">→</span><span class="n">Database transactions</span><span class="ar">→</span><span class="n">Response delivery</span></div>
<div class="hook">🧠 The architecture diagram should provide a clear overview of how <b>data and requests flow</b> through the system, helping stakeholders understand the overall <b>structure, deployment environment, and interaction</b> among system components. It should serve as a visual guide to the system's <b>design, scalability, security, and operational workflow</b>.</div>`},

{h:"Sample architecture diagram",sl:"c3·9",b:`
<p>Slide 9 shows an example <b>System Architecture Diagram</b> (a picture, no extra text). Its labels:</p>
<ul>
<li><b>Internet</b>, linked by <b>Uplink Sync</b> to <b>Router 1</b> and <b>Router 2</b> (<b>Hyperlocal/MeshSync</b> between them)</li>
<li><b>Community Members Phone Hotspot</b></li>
<li>Input from <b>Audio, Image, Video</b> into: <b>Radio pi, Webinar pi, Phone, Laptop</b></li>
<li><b>Ingest</b> → <b>Digest</b> (Audacity, Papad, Maaya) → <b>Programmes or Shows</b></li>
<li><b>Community Modulators (Skills):</b> Read / write · Listen tag audio / videos / images · Audio / video editing · Content writing / production</li>
</ul>`},

{h:"Process Flow",sl:"c3·10",b:`
<p><b>Process Flow</b> is the last item of Chapter 3.1. The slide lists:</p>
<ul><li>**Flowcharts**</li></ul>`}
],

/* ============ D · METHODOLOGIES ============ */
d:[
{h:"Chapter 2 · Software Development Methodologies",sl:"m2·1",b:`
<p>The title slide names these methodologies:</p>
<div class="chips"><span>Waterfall</span><span>Agile</span><span>Scrum</span><span>Kanban</span><span>Iterative development</span></div>
<div class="hook">🧠 The slides that follow explain <b>Kanban</b>, <b>Iterative and incremental development</b>, <b>Scrum</b>, and <b>Software Requirements Engineering</b>. Waterfall and Agile are only named on the title slide (Scrum is described as an Agile framework).</div>`},

{h:"Kanban",sl:"m2·2–3",b:`
<ul><li>**Kanban** is a **visual workflow management system** that helps teams **visualize work**, **limit work in progress**, and **continuously improve efficiency**.</li></ul>
<div class="three"><div class="box"><b>1</b> Visualize work</div><div class="box"><b>2</b> Limit work in progress</div><div class="box"><b>3</b> Continuously improve efficiency</div></div>
<h4>Kanban boards shown on the slides</h4>
<p class="muted small">Board 1 (slide 2) has five columns:</p>
<div class="kb">
<div class="kbc c1"><b>Backlog</b><i></i><i></i></div><div class="kbc c2"><b>on Hold</b><i></i></div><div class="kbc c3"><b>in Progress</b><i></i><i></i></div><div class="kbc c4"><b>Review</b><i></i></div><div class="kbc c5"><b>Done</b><i></i><i></i><i></i></div></div>
<p class="muted small">Board 2 (slide 3, sticky notes) has five columns:</p>
<div class="kb">
<div class="kbc c1"><b>Backlog</b><i></i><i></i><i></i></div><div class="kbc c2"><b>To do</b><i></i><i></i><i></i><i></i></div><div class="kbc c3"><b>In progress</b><i></i><i></i><i></i><i></i></div><div class="kbc c4"><b>Testing</b><i></i><i></i></div><div class="kbc c5"><b>Done</b><i></i><i></i><i></i></div></div>`},

{h:"Iterative and incremental development",sl:"m2·4–5",b:`
<ul>
<li>**Iterative and incremental development** is a methodology used in software development that **combines iterative design and incremental build models**. This approach allows for **flexibility, adaptability, and continuous improvement** throughout the development process.</li>
<li>**Iterative development** involves releasing a product in **phases**, known as **iterations**. Each iteration is a **short development and testing cycle** focused on **one part of the product or a basic version of it**.</li>
<li>At the end of each cycle, a **new version of the product is released**, and **feedback from customers and stakeholders** is incorporated into the next cycle.</li>
<li>This process continues until an **optimized version** of the product is achieved.</li>
</ul>
<h4>Iterative Development (diagram on slide 5)</h4>
<div class="flow"><span class="n">Plan</span><span class="ar">→</span><span class="n loop">↻ Iteration:<br>Implement · Review · Retrospect</span><span class="ar">→</span><span class="n">Deploy</span></div>`},

{h:"Scrum",sl:"m2·6",b:`
<ul>
<li>**Scrum** is a **lightweight, Agile framework** designed to manage and develop **complex products** through **iterative and incremental** processes.</li>
<li>It was co-created by **Ken Schwaber** and **Jeff Sutherland** and is widely used in software development and other knowledge work.</li>
<li>Scrum emphasizes **self-organization, adaptability, and collaboration** to deliver high-value products efficiently.</li>
<li>The framework operates on **empirical principles** of **transparency, inspection, and adaptation**.</li>
<li>Teams work in **time-boxed iterations** called **Sprints**, typically lasting **2–4 weeks**, to produce **potentially shippable product increments**.</li>
<li>Each Sprint includes **planning, execution, review, and retrospective** phases, ensuring **continuous improvement and alignment with changing requirements**.</li>
</ul>
<div class="three"><div class="box"><b>T</b> Transparency</div><div class="box"><b>I</b> Inspection</div><div class="box"><b>A</b> Adaptation</div></div>`},

{h:"Advantages & challenges of Scrum",sl:"m2·7",b:`
<div class="two">
<div class="box good"><h5>✅ Advantages of Scrum</h5><ul>
<li>Scrum enhances **productivity, adaptability, and customer satisfaction** by breaking down large projects into **manageable increments**.</li>
<li>Its **iterative nature** allows teams to respond to changing requirements effectively.</li>
<li>**Continuous feedback loops** improve product quality and ensure alignment with stakeholder expectations.</li></ul></div>
<div class="box bad"><h5>⚠️ Challenges of Scrum</h5><ul>
<li>Scrum can be challenging in environments with **unclear goals** or **frequent mid-Sprint changes**.</li>
<li>It requires **significant commitment** from team members and stakeholders, and the **frequent meetings** may demand additional resources.</li></ul></div></div>
<div class="hook">🧠 <b>In conclusion</b>, Scrum is a powerful framework for managing complex projects, fostering collaboration, and delivering high-value products. However, its success depends on <b>proper implementation and commitment to Agile principles</b>.</div>`},

{h:"Scrum Process",sl:"m2·8",b:`
<p>The Scrum Process diagram (slide 8), step by step:</p>
<div class="flow">
<span class="n">Product Backlog</span><span class="ar">→</span><span class="n">Sprint Planning Meeting</span><span class="ar">→</span><span class="n">Sprint Backlog</span><span class="ar">→</span><span class="n loop">↻ Sprint<br>1-4 Weeks<br><small>Daily Stand Up · 24 H</small></span><span class="ar">→</span><span class="n">Sprint Review + Sprint Retrospective</span><span class="ar">→</span><span class="n">Finished Work</span></div>
<h4>People shown in the diagram</h4>
<div class="chips"><span>Product Owner</span><span>Team</span><span>Scrum Master</span></div>
<div class="trap"><b>Watch out:</b> the text on slide 6 says Sprints typically last <b>2–4 weeks</b>, while the diagram on slide 8 shows <b>1-4 Weeks</b>. Both are on the slides.</div>`},

{h:"Software Requirements Engineering",sl:"m2·9",b:`
<ul>
<li>**Software Requirements Engineering** is the **disciplined process** of **discovering, analyzing, documenting, and managing** the **needs and constraints** a software system must satisfy, forming the **foundation** for all subsequent **design, development, and testing** activities.</li>
<li>It covers **elicitation, analysis, specification, validation, and change management**, ensuring stakeholder needs are translated into **precise, verifiable requirements**.</li>
</ul>
<div class="chips"><span>Elicitation</span><span>Analysis</span><span>Specification</span><span>Validation</span><span>Change management</span></div>
<h4>What Requirements Engineering Is</h4>
<ul>
<li>**Requirements Engineering (RE)** defines **what a system should do** and **under what conditions**, **before implementation begins**.</li>
<li>It integrates **technical, organizational, and human factors** to ensure the system meets **real stakeholder needs**.</li>
</ul>`},

{h:"Key goals & why RE matters",sl:"m2·10",b:`
<h4>Key goals</h4>
<ul>
<li>**Identify** stakeholder needs and constraints</li>
<li>**Translate** needs into clear, testable requirements</li>
<li>**Manage** requirements changes throughout the lifecycle</li>
<li>**Reduce** costly rework caused by unclear or incorrect requirements</li>
</ul>
<h4>Why Requirements Engineering Matters</h4>
<ul>
<li>Requirements errors are the **most common and most expensive** defects in software projects.</li>
<li>Requirements errors account for **40–50%** of all defects.</li>
<li>Fixing a requirements error in production can cost **100–200×** more than fixing it early.</li>
</ul>
<div class="nums"><div><b>40–50%</b><span>of all defects are requirements errors</span></div><div><b>100–200×</b><span>cost to fix in production vs. early</span></div></div>`}
],

/* ============ E · USE CASE & DFD ============ */
e:[
{h:"What is a use case diagram?",sl:"uc·2",b:`
<ul>
<li>A **UML use case diagram** comprises data sets that describe the many ways in which users' may choose to **interact with new software solutions**.</li>
<li>This type of diagram can only be used with a set of specific **stencils**, such as **diagram connectors**.</li>
<li>As these are crucial elements when building a use case diagram, they have already been incorporated into our template. Discover all of them in Stencils, in the **Use Case** section.</li>
</ul>`},

{h:"Main components of a use case diagram",sl:"uc·3",b:`
<p>Typically, a use case diagram will include <b>three main constituents</b>:</p>
<table class="t"><tr><th>#</th><th>Component</th><th>Meaning (slide wording)</th></tr>
<tr><td>1</td><td>**Actors**</td><td>Actors are representing the **users that interact with your system**. They can be **individuals, organizations, or other software** that is in contact with your system.</td></tr>
<tr><td>2</td><td>**System**</td><td>Sometimes referred to as a **scenario**, the system can be defined as a **specific set of actions** that take place **between actors and the software**.</td></tr>
<tr><td>3</td><td>**Goals**</td><td>Goals mark the **desired result** of a use case diagram. All the activities and interactions should be referenced in the chart, as they are vital elements in reaching goals.</td></tr></table>`},

{h:"Purpose of a use case diagram",sl:"uc·4",b:`
<ul><li>The primary purpose of use case diagrams is to **capture the functionalities of a system** under **internal or external influences**.</li></ul>
<h4>The smaller objectives that derive from it</h4>
<ul>
<li>**Analyzing and identifying the requirements** of a system</li>
<li>Observing the system from an **external perspective**</li>
<li>Understanding all of the **external and internal factors** that may be influencing the system</li>
<li>Displaying **all interactions between actors and system**</li>
</ul>`},

{h:"Example: Online Store",sl:"uc·5",b:`
<p>System: <b>Online Store</b>. Two actors: <b>Visitor</b> and <b>Admin</b>.</p>
<figure class="dia">{{svg:store}}<figcaption>Online Store use case diagram (redrawn from slide 5)</figcaption></figure>
<table class="t"><tr><th>Actor</th><th>Use cases</th></tr>
<tr><td>**Visitor**</td><td>Place Order · Cancel Order · Manage Order</td></tr>
<tr><td>**Admin**</td><td>Cancel Order · Manage Order · Change Order Status · Update Products</td></tr></table>`},

{h:"Example: Clinic (with the labelled parts)",sl:"uc·6",b:`
<p>Slide 6 labels the parts of a use case diagram. System: <b>Clinic</b>. Actors: <b>Patient, Scheduler, Doctor, Clerk</b>.</p>
<figure class="dia wide">{{svg:clinic}}<figcaption>Clinic use case diagram with the labels from slide 6</figcaption></figure>
<h4>Labels on the slide</h4>
<table class="t"><tr><th>Label</th><th>In the Clinic example</th></tr>
<tr><td>**system name**</td><td>Clinic</td></tr>
<tr><td>**system boundary**</td><td>The box around the use cases</td></tr>
<tr><td>**include use case**</td><td>**Check Patient Record**: «include» from Make Appointment and from Request Medication</td></tr>
<tr><td>**extend use case**</td><td>**Defer Payment**: «extend» Pay Bill</td></tr>
<tr><td>**extension point**</td><td>**more treatment** (inside Pay Bill)</td></tr>
<tr><td>**generalization**</td><td>The arrow with a hollow triangle from Bill Insurance to Pay Bill</td></tr>
<tr><td>**child use case**</td><td>**Bill Insurance**</td></tr></table>
<table class="t"><tr><th>Actor</th><th>Connected to</th></tr>
<tr><td>**Patient**</td><td>Cancel Appointment · Make Appointment · Request Medication · Pay Bill</td></tr>
<tr><td>**Scheduler**</td><td>Cancel Appointment · Make Appointment</td></tr>
<tr><td>**Doctor**</td><td>Request Medication</td></tr>
<tr><td>**Clerk**</td><td>Pay Bill</td></tr></table>`},

{h:"Example: Online Shopping management",sl:"uc·7",b:`
<p>System: <b>Online Shopping Management System</b>. Actors: <b>Registered User</b> and <b>Support Person</b>.</p>
<table class="t"><tr><th>Actor</th><th>Use cases</th></tr>
<tr><td>**Registered User**</td><td>Contact Support · View Inquiry History · Submit Details · Submit Feedback</td></tr>
<tr><td>**Support Person**</td><td>View Inquiry History · View Submitted Details · Resolve Inquiry · View Feedback</td></tr></table>`},

{h:"Example: Restaurant Management System",sl:"uc·8",b:`
<p>System: <b>Restaurant management</b>. Four actors:</p>
<table class="t"><tr><th>Actor</th><th>Use cases</th></tr>
<tr><td>**Customer**</td><td>View menu · Place order · Pay bill</td></tr>
<tr><td>**Waiter**</td><td>Take order · Serve food · process payment</td></tr>
<tr><td>**Chef**</td><td>Prepare food</td></tr>
<tr><td>**Manager**</td><td>Manage inventory · Manage staff</td></tr></table>`},

{h:"Data Flow Diagram (DFD)",sl:"uc·9",b:`
<ul>
<li>A **Data Flow Diagram (DFD)** is a **graphical tool** used to represent **how data moves through a system**. It shows **data inputs, outputs, data stores, and the processes** that transform the data.</li>
<li>DFDs provide a **high-level overview** of system functionality and are widely used in **structured analysis** due to their **simplicity and clarity** for both technical and non-technical users.</li>
<li>DFDs help visualize the **major steps** in a system and illustrate how **information flows** between different components.</li>
</ul>
<div class="chips"><span>Data inputs</span><span>Outputs</span><span>Data stores</span><span>Processes</span></div>`},

{h:"Levels of Data Flow Diagram",sl:"uc·10",b:`
<ul>
<li>DFDs are categorized into various **levels**, with each level providing different degrees of detail. The levels are numbered from **0** and onward. The **higher the level**, the **more detailed** the diagram becomes.</li>
</ul>
<table class="t"><tr><th>Level</th><th>What it does (slide wording)</th></tr>
<tr><td>**Level 0 DFD (Context Diagram)**</td><td>Represents the **entire system as one single process**, showing its interaction with **external entities**. It highlights **major inputs and outputs** without internal details.</td></tr>
<tr><td>**Level 1 DFD**</td><td>**Breaks the Level 0 process into major sub-processes.** Shows **internal data flows and data stores**.</td></tr>
<tr><td>**Level 2 and Beyond**</td><td>**Further decomposes Level 1** sub-processes for a detailed view of specific functional areas. Useful for **large or complex systems** requiring deeper analysis.</td></tr></table>
<div class="flow"><span class="n">Level 0<br><small>one process</small></span><span class="ar lbl"><i>→</i><em>more detail</em></span><span class="n">Level 1<br><small>sub-processes</small></span><span class="ar lbl"><i>→</i><em>more detail</em></span><span class="n">Level 2+<br><small>functional areas</small></span></div>`},

{h:"Example: Level 0 DFD (not from the slide)",sl:"uc·10",b:`
<p class="note">⚠️ <b>Not from the slides.</b> The slides only show a Level 1 example, so this Level 0 (context diagram) was made up to match the same restaurant system. Use it to see the idea, not as slide content.</p>
<p>The <b>whole system is one single process</b>. Only the <b>external entities</b> and the <b>major inputs and outputs</b> are shown. There are <b>no data stores</b> and <b>no internal details</b>.</p>
<figure class="dia"><div class="made">Made-up example · not from the slide</div>{{svg:dfd0}}<figcaption>Level 0 DFD (context diagram), my own example</figcaption></figure>
<table class="t"><tr><th>Part</th><th>In this example</th></tr>
<tr><td>**External entities**</td><td>Customer · Kitchen · Restaurant manager</td></tr>
<tr><td>**Single process**</td><td>0 Restaurant management system</td></tr>
<tr><td>**Data stores**</td><td>**None** shown (they appear in Level 1)</td></tr>
<tr><td>**Data flows**</td><td>Orders for food · Receipt · Food order · Management report</td></tr></table>`},

{h:"Example: Level 1 DFD",sl:"uc·11",b:`
<p>Slide 11 shows a <b>Level 1 DFD</b> for a restaurant.</p>
<figure class="dia wide">{{svg:dfd}}<figcaption>Level 1 DFD (redrawn from slide 11)</figcaption></figure>
<table class="t"><tr><th>Part</th><th>On the slide</th></tr>
<tr><td>**External entities**</td><td>Customer · Kitchen · Restaurant manager</td></tr>
<tr><td>**Processes**</td><td>1.0 Processing of an order · 2.0 Update sold items file · 3.0 Update inventory file · 4.0 Generate management report</td></tr>
<tr><td>**Data stores**</td><td>Database of sold items · Inventory database</td></tr>
<tr><td>**Data flows**</td><td>Orders for food · Receipt · Food order · Sold items · Inventory data · Formatted sold item data · Formatted inventory data · Info. about daily sold items and amount · Info. about daily inventory depletion amount · Management report</td></tr></table>`},

{h:"Example: Level 2 DFD (not from the slide)",sl:"uc·10",b:`
<p class="note">⚠️ <b>Not from the slides.</b> The slides only describe Level 2 in words and never draw one. This example was made up by me: it breaks <b>process 1.0 Processing of an order</b> from the Level 1 example into smaller steps. The sub-process names (1.1 to 1.3) are my own, not the slide's.</p>
<p><b>Level 2</b> takes <b>one Level 1 process</b> and decomposes it. Sub-processes are numbered under their parent: <b>1.0</b> becomes <b>1.1, 1.2, 1.3</b>.</p>
<figure class="dia wide"><div class="made">Made-up example · not from the slide</div>{{svg:dfd2}}<figcaption>Level 2 DFD of process 1.0, my own example</figcaption></figure>
<table class="t"><tr><th>Part</th><th>In this example</th></tr>
<tr><td>**Parent process**</td><td>1.0 Processing of an order (from the Level 1 slide)</td></tr>
<tr><td>**Sub-processes**</td><td>1.1 Record customer order · 1.2 Print receipt · 1.3 Send food order to kitchen</td></tr>
<tr><td>**External entities**</td><td>Customer · Kitchen</td></tr>
<tr><td>**Data flows**</td><td>Orders for food · Order details · Receipt · Food order</td></tr></table>`}
]
};
