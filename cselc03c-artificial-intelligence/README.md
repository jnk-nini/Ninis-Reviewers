# CSELC03C: CS Elective 3 (Artificial Intelligence)

Prelims and Midterms reviewer, from the lectures of Ms. Colocado.

- **Prelims (Lecture 1):** Course Orientation, Introduction to AI, Research Areas for AI, Search Algorithms.
- **Midterms (Lecture 2):** Fuzzy Logic Systems, Natural Language Processing, Expert Systems (from `CSELC03C_MidtermModule.pptx`).

Vercel project: `cselc03c-reviewer` (live at https://cselc03c-reviewer.vercel.app). Not yet connected to Git, so it is deployed by hand.

## Files

| File | What it is |
|---|---|
| `index.html`, `style.css`, `app.js`, `core.js` | The app. `core.js` lists the topics (`o i r s` = Prelims, `f n e` = Midterms). |
| `facts*.js`, `facts_m1.js` | Glossary, flashcards, identification, and the "which term" multiple choice |
| `mc*.js`, `mc_m1.js` | Multiple choice questions |
| `tf*.js`, `tf_m1.js` | True or false |
| `fill*.js`, `fill_m1.js` | Fill in the blank |
| `notes_*.js` | Study notes per topic (`notes_f1/n1/e1` are the Midterm ones, each ends with a must-know list) |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Offline support and home-screen install |
| `vercel.json` | Cache headers for `sw.js` and `index.html` |

Every data file only adds to the lists (`D.FACTS`, `D.MC`, ...), so add new items at the end.

## Rules for this folder

- Progress is saved in `localStorage` under `cselc03c-prelim-reviewer`. **Do not change this key**, even though the app now also covers Midterms. It would wipe saved progress.
- Bump `CACHE` in `sw.js` and list any new file in `ASSETS` whenever a file changes.
- The Midterm slide numbers are from the Midterm module, so they show as "Slide N (Midterm)".
- Finals (Robotics, Neural Networks, Prompt Engineering) are not in yet. Add them as new topics (`b`, `u`, `p`, for example) in `core.js`, with new data files.
