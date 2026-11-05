/* Glossary / key terms (flashcards, identification, "which term?").
   [topic, slide, group, term, definition (slide wording), clue, alternate accepted answers]
   Groups keep look-alike terms together so wrong choices are fair. */
(self.D=self.D||{});
D.FACTS=[
/* ---- A · Chapter 1 ---- */
["a","g1·2","c1","Background of the Study","Written in article format about the end user, the enterprise where it belong, an introduction of your system, and the significance of your system to the user's enterprise.","The first part of the Introduction.",["background"]],
["a","g1·3","obj","General Objective","Written in an introductory format of at least two (2) paragraphs: what the study intends to accomplish, the main purpose of the proposed project, and how it aims to address the identified problems or limitations of the existing system.","Only one of these, but at least 2 paragraphs.",[]],
["a","g1·3","obj","Specific Objectives","Three (3) objectives that clearly describe the measurable outcomes or activities that the project intends to accomplish. Each is one paragraph and begins with a clear action verb.","Three of them, each starting with an action verb.",["specific objective"]],
["a","g1·4","prob","Statement of the Problem","Describes the problems and limitations of the current system, the problems and challenges of administrators and end-users, and the purpose and rationale of the proposed project.","Has three parts: overview, challenges, purpose.",[]],
["a","g1·4","prob","Project Overview / Problem Statement","Describe the problems and limitations of the current system being used, how the existing software system operates, and why there is a need to develop, improve, or replace the system.","About the CURRENT system and why it must change.",["project overview","problem statement"]],
["a","g1·4","prob","Problems and Challenges","The specific problems encountered by both the administrators and end-users when using the existing system, and how these issues affect their tasks, productivity, efficiency, and overall user experience.","Think: administrators AND end-users.",[]],
["a","g1·4","prob","Purpose and Rationale of the Proposed Project","The intended purpose of the proposed project and the reasons for improving or overhauling the existing system, and how the proposed system is expected to address the identified problems.","Why the new system? The reasons.",["purpose and rationale"]],
["a","g1·5","sig","Significance of the Study","Contains the Stakeholder Identification and Analysis: who is affected and how the project benefits each of them.","Slide title: “Significance of the study”.",["significance"]],
["a","g1·5","sig","Stakeholder","Any individual, group, organization, or department that may be directly or indirectly affected by the project or have an interest in its success.","Directly or indirectly affected.",["stakeholders"]],
["a","d1·6","sig","Expected Output","For each stakeholder: Stakeholder [Name/Group], Description, and Benefits and Impact (at least two paragraphs).","The 3-line format per stakeholder.",[]],
["a","c2·1","scope","Scope","What your study and your system have covered, together with other related things which your system has covered.","What the system DOES cover.",[]],
["a","c2·1","scope","Delimitation","Your system's limitation: the possible extent of expectations where your system no longer covers.","Where the system stops.",["delimitation","limitation","limitations"]],

/* ---- B · Chapter 2 ---- */
["b","c2·3","lit","Literature Review","Examines previous studies, software development methodologies, and related technologies relevant to the proposed system, to identify existing solutions, strengths, limitations, and research gaps that justify the development of the proposed system.","Starts Chapter II.",["literature review"]],
["b","c2·4","lit","Related Studies","Academic research related to your project topic. For each: author(s), year, purpose, methodology, findings, relevance to your project.","Academic RESEARCH (with authors and years).",["related study"]],
["b","c2·5","lit","Related Literature","Books, journals, articles, and reliable online sources about concepts and technologies used in your project.","Books, journals, articles, online sources.",[]],
["b","c2·6","lit","Research Gap","The clear point a literature review should end with, which justifies your project.","Your literature review should END with it.",["research gap"]],
["b","c2·6","lit","Scholarly sources","Google Scholar, IEEE Xplore, ACM Digital Library, ScienceDirect, and Springer.","Five places to look, all academic.",["scholarly source","scholarly"]],
["b","c2·7","fw","Conceptual Framework","A visual or written representation that shows the relationship between the key variables, components, or processes in your project. It serves as a guide that explains how your proposed system will solve a specific problem.","Shows relationships between variables, components, processes.",[]],
["b","c2·7","fw","IPO Model","Input → Process → Output. What a conceptual framework often illustrates in software engineering.","Three letters, three boxes.",["IPO","input process output","input-process-output"]],
["b","c2·8","fw","Definition of Terms","Includes only terminologies and jargons that has something to do with your system, at least 10 different terminologies.","Chapter II part with at least 10 terms.",[]],
["b","c2·8","fw","Data","A raw material in which information is derived.","Information comes from this raw material.",[]],
["b","c2·8","fw","Hardware","The physical component of the electronic data processing cycle.","The PHYSICAL part.",[]],

/* ---- C · Chapter 3 ---- */
["c","c3·3","meth","Research Methods","Describe the research methods utilized in the study (survey and/or interview), with results, data analysis, and key findings.","First thing described in Respondents of the Study.",["research method"]],
["c","c3·3","meth","Data Summary and Statistical Analysis","Includes the mean, median, and mode for each relevant variable.","Three “M” statistics.",["data summary","statistical analysis"]],
["c","c3·4","plan","Project Planning","The project must be developed and documented in clearly defined phases, each showing measurable progress and evidence of work completed.","Clearly defined phases, about two paragraphs each.",[]],
["c","c3·4","plan","Phase 1: Research and Planning","Gathering and analyzing information: identifying the problem, conducting a literature review, defining project objectives, gathering requirements, and preparing the project plan.","Outputs: proposal, requirements, conceptual framework, initial design.",["research and planning"]],
["c","c3·4","plan","Phase 2: Execution and Development","The actual development and implementation: system design, coding, database development, interface creation, and integration of project components.","Progress shown by prototypes, screenshots, diagrams, development reports.",["execution and development"]],
["c","c3·4","plan","Phase 3: Refinement and Testing","Evaluating, improving, and validating the developed project: debugging, functionality testing, user acceptance testing, performance evaluation, and revisions.","The final phase.",["refinement and testing"]],
["c","c3·5","ex","Initiation","First phase in the example: Define project goal, Set targets, Create project charter, Form project team.","Starts the project.",[]],
["c","c3·5","ex","Planning (example phase)","Second phase in the example: Create timeline, Create budget, Define roles & responsibilities, Risk assessment, Communication plan.","Timeline, budget, roles, risks.",["planning"]],
["c","c3·5","ex","Execution (example phase)","Third phase in the example: Build main deliverable, Regular progress review, Handling issues, Perform training.","Build the main deliverable.",["execution"]],
["c","c3·5","ex","Closing","Last phase in the example: Hand over final product to customer, Intensive support, Perform lessons learned, Release project team.","Hand over and release the team.",[]],
["c","c3·6","design","System Design","A detailed presentation of the proposed system's structure, functionality, and user interaction. It must include the User Interface (UI) Design and the Screen Flow Diagram.","Use at least one whole page or more.",[]],
["c","c3·6","design","User Interface (UI) Design","Shows the appearance and layout of each major screen.","Appearance and layout.",["UI design","user interface design","UI"]],
["c","c3·6","design","Screen Flow Diagram","Illustrates the navigation path and sequence of screens within the application.","Navigation path and sequence of screens.",["screen flow"]],
["c","c3·8","arch","System Architecture Diagram","A graphical representation that illustrates how the major components of the system interact with one another, showing the relationship and communication flow between users, front-end application, back-end services, and database.","If cloud services are used, it must show them too.",["architecture diagram","system architecture"]],
["c","c3·8","arch","Front-End Layer","Web Application, Mobile Application, User Interface.","What the user sees and touches.",["front-end","front end"]],
["c","c3·8","arch","Back-End Layer","Application Server, APIs, Business Logic.","Server, APIs, logic.",["back-end","back end"]],
["c","c3·8","arch","Database Layer","MySQL, PostgreSQL, MongoDB, etc.","Where the data lives.",[]],
["c","c3·8","arch","Cloud Services (architecture)","If applicable: Cloud Hosting Platform, Cloud Database, Storage Services, Authentication Services, Backup and Recovery Services.","Only “if applicable”.",["cloud services"]],
["c","c3·8","arch","Communication Flow","User requests, data processing, database transactions, and response delivery.","Request in, response out.",[]],
["c","c3·10","arch","Process Flow","The last item of Chapter 3.1. The slide lists: Flowcharts.","One bullet on the slide: flowcharts.",[]],

/* ---- D · Methodologies ---- */
["d","m2·2","kan","Kanban","A visual workflow management system that helps teams visualize work, limit work in progress, and continuously improve efficiency.","Boards with columns like Backlog and Done.",[]],
["d","m2·4","iter","Iterative and incremental development","A methodology that combines iterative design and incremental build models. It allows for flexibility, adaptability, and continuous improvement throughout the development process.","Combines two models.",["iterative and incremental"]],
["d","m2·4","iter","Iterative development","Releasing a product in phases, known as iterations, with feedback from customers and stakeholders incorporated into the next cycle.","Product released in phases.",["iterative"]],
["d","m2·4","iter","Iteration","A short development and testing cycle focused on one part of the product or a basic version of it.","One short cycle.",["iterations"]],
["d","m2·6","scr","Scrum","A lightweight, Agile framework designed to manage and develop complex products through iterative and incremental processes.","Co-created by Ken Schwaber and Jeff Sutherland.",[]],
["d","m2·6","scr","Sprint","A time-boxed iteration in Scrum, typically lasting 2–4 weeks, that produces potentially shippable product increments.","Time-boxed.",["sprints"]],
["d","m2·6","scr","Empirical principles of Scrum","Transparency, inspection, and adaptation.","Three words, T-I-A.",["empirical principles","transparency, inspection, and adaptation","transparency inspection adaptation"]],
["d","m2·9","re","Software Requirements Engineering","The disciplined process of discovering, analyzing, documenting, and managing the needs and constraints a software system must satisfy, forming the foundation for all subsequent design, development, and testing activities.","Foundation for design, development, testing.",["requirements engineering","RE"]],
["d","m2·9","re","Requirements Engineering (RE)","Defines what a system should do and under what conditions, before implementation begins. It integrates technical, organizational, and human factors.","Done BEFORE implementation.",["RE","requirements engineering"]],

/* ---- E · Use case & DFD ---- */
["e","uc·2","uc","Use case diagram","A UML diagram of data sets that describe the many ways in which users may choose to interact with new software solutions.","UML diagram of user interactions.",["UML use case diagram"]],
["e","uc·3","uc","Actors","The users that interact with your system. They can be individuals, organizations, or other software that is in contact with your system.","Individuals, organizations or other software.",["actor"]],
["e","uc·3","uc","System (use case diagram)","Sometimes referred to as a scenario: a specific set of actions that take place between actors and the software.","Also called a scenario.",["system","scenario"]],
["e","uc·3","uc","Goals","Mark the desired result of a use case diagram. All the activities and interactions should be referenced in the chart, as they are vital elements in reaching them.","The desired result.",["goal"]],
["e","uc·9","dfd","Data Flow Diagram (DFD)","A graphical tool used to represent how data moves through a system. It shows data inputs, outputs, data stores, and the processes that transform the data.","Shows how DATA moves.",["DFD","data flow diagram"]],
["e","uc·10","dfd","Level 0 DFD (Context Diagram)","Represents the entire system as one single process, showing its interaction with external entities. It highlights major inputs and outputs without internal details.","The whole system is ONE process.",["level 0 DFD","context diagram","level 0","DFD level 0"]],
["e","uc·10","dfd","Level 1 DFD","Breaks the Level 0 process into major sub-processes. Shows internal data flows and data stores.","Splits the single process.",["level 1","DFD level 1"]],
["e","uc·10","dfd","Level 2 and Beyond","Further decomposes Level 1 sub-processes for a detailed view of specific functional areas. Useful for large or complex systems requiring deeper analysis.","The most detailed levels.",["level 2","level 2 DFD","level 2 and beyond"]]
];
