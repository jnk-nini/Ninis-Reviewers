# CSELC03C: CS Elective 3 (Artificial Intelligence)

Prelims and Midterms reviewer, from the slides of Ms. Colocado. Built like the other reviewers (same engine as the Software Engineering 2 and Cloud Databases reviewers).

- **Prelims (Lecture 1):** Course Orientation, Introduction to AI, Research Areas for AI, Search Algorithms.
- **Midterms (Lecture 2):** Fuzzy Logic Systems, Natural Language Processing, Expert Systems (from `CSELC03C_MidtermModule.pptx`).

Vercel project: `cselc03c-reviewer` (https://cselc03c-reviewer.vercel.app). Not yet connected to Git, so it is deployed by hand.

## What it can do

- **Review:** notes per topic in the slides' wording, search, topic filters (All / Prelims / Midterms / each topic), **Recall mode** (hides the key words), **one Expand all / Collapse all toggle** (it follows what you open by hand), "Mark as studied", "Continue where you left off", Quick drill, and a **must-know list** per topic. Two small tools: the BFS/DFS tracer (Search) and the fuzzy fan calculator (Fuzzy Logic).
- **Cheat sheet:** topic map, numbers to remember, look-alike terms, every false statement with its counter, exact spellings, and how to handle "Not in the choices".
- **Practice:** Drill, Mock exam (optional timer), **Midterm mock exam**, Smart review (mistakes first), Flashcards (term to meaning, meaning to term, mixed, or type first), List recall, Train my weak spot, Find the counter, Spelling drill.
- **Question types:** missing word, which term, concept multiple choice, true or false, find the counter, spelling, identification (type), fill in the blank (type). Every question has a clue and an explanation. Optional: add "Not in the choices", strict spelling.
- Practice my mistakes, New set, readiness ring per topic ("ready" = right twice), reset progress, keyboard shortcuts, light and dark mode, works offline, installable.

## Files

| File | What it is |
|---|---|
| `index.html`, `style.css`, `app.js` | The app |
| `data_notes.js` | Topics (`D.TOPICS`), deck names, and study notes. `**text**` is a key word (hidden in Recall mode). |
| `data_facts.js` | Glossary terms (flashcards, identification, "which term?") |
| `data_cloze.js` | Missing-word items with 3 wrong choices |
| `data_tf.js` | True or false. Each false item has the wrong phrase and the right phrase (the "counter"). |
| `data_more.js` | Concept multiple choice, recall lists, look-alike pairs, numbers, exact spellings |
| `sw.js`, `manifest.webmanifest`, `icon.svg`, `vercel.json` | Offline support, install, headers |

Slide numbers are written `deck·slide` (deck 1 = Prelims, 2 = Midterms) and shown as "Midterms · Slide 12". Topic keys: `o i r s` (Prelims), `f n e` (Midterms).

## Rules for this folder

- Progress is saved in `localStorage` under `cselc03c-prelim-reviewer`. **Do not change this key.** (Progress from the older version of the app is not carried over: the new version tracks it differently.)
- Bump `CACHE` in `sw.js` when any file changes, and list new files in `FILES`.
- Add items at the end of the data lists (progress is tied to each item's text, not its position).
- The Midterm slide had blank answers for the activities "Find the Intent" and "Write the Rules". The answers in the notes are worked out from the lesson, and the notes say so.
- Finals (Robotics, Neural Networks, Prompt Engineering) are not in yet. Add them as new topics in `D.TOPICS` with their own `grp`, notes and questions.
