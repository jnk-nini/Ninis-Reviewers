# CSCN13C Software Engineering 2 Reviewer

Reviewer for **(CSCN13C) Software Engineering 2**, built from six slide decks: documentation Chapters 1 to 3, development methodologies (Kanban, Iterative, Scrum, Requirements Engineering), and Use Case / Data Flow diagrams.

Static site, no build step. Works offline through a service worker (`sw.js`). Dark "dev console" theme by default, light mode on the sun/moon button.

- `data_notes.js`: study notes per chapter, in the slides' wording (also lists the source decks and slide numbers)
- `diagrams.js`: the use case and data flow diagrams from the slide images, redrawn as SVG
- `data_facts.js`: glossary terms (flashcards, identification, "which term?")
- `data_cloze.js`: missing-word items (multiple choice, fill in the blank)
- `data_tf.js`: true or false items; false ones carry the "counter" phrase
- `data_more.js`: concept multiple choice, list recall, look-alike pairs, numbers to remember
- `app.js`: the app; `style.css`: styles

Chapters (internal keys `a` to `e`): Chapter 1 · Introduction, Chapter 2 · Literature Review, Chapter 3 · Methodology & System Design, Software Development Methodologies, Use Case & Data Flow Diagrams.

Source decks (`D.DECKS` in `data_notes.js`): `g1` Documentation Guide Ch 1, `d1` Documentation Ch 1, `c2` Chapter 2 (Literature), `m2` Chapter 2 (Methodologies), `c3` Chapter 3.1 Guidelines, `uc` Use Case Diagram.

Deployed to Vercel project `cscn13c-se2-reviewer` with Root Directory set to this folder (`cscn13c-software-engineering-2`). Progress is saved in `localStorage` under `cscn13c-reviewer-v1`; do not rename that key.
