# Dr. Jose P. Laurel · Midterm Reviewer

Reviewer for the **Dr. Jose P. Laurel** course midterm (content from the "Midterm Lessons JPL 2025" slides, in Filipino). Slide numbers are given for every item.

Static site, no build step. Works offline through a service worker (`sw.js`).

## What it can do

- **Review:** notes for all 8 lessons with a **must-know list** per lesson, search across all lessons, lesson filters, **Recall mode** (hides the key words, tap to check), **one Expand all / Collapse all toggle** (it follows what you open by hand), "Mark as studied", "Continue where you left off", Quick drill, Recall cards and List recall per lesson.
- **Cheat sheet:** lesson map, numbers and dates, look-alike names and terms, every "Mali" statement with its counter, exact spellings, and how to handle "Not in the choices".
- **Timeline** (with ordering practice) and **Glossary**.
- **Practice:** Drill, Mock exam (optional timer), Smart review (mistakes first), Weak spot, My mistakes, Find the counter, Spelling drill, Quick 10.
- **Recall:** Recall cards (spaced repetition), Flashcards (term to meaning, meaning to term, mixed, or type first), List recall, Brain dump, Essay practice.
- **Question types:** multiple choice, which term, Tama o Mali, find the counter, identification (type), fill in the blank (type), missing word (choices), enumeration, spelling, timeline order. Every question has a clue and an explanation. Options: "Not in the choices", strict spelling.
- Readiness ring per lesson ("ready" = right twice), Practice my mistakes, New set, reset progress, keyboard shortcuts, light and dark mode, installable.

## Files

- `data.js`: topics, study notes, glossary terms, and the question bank (MC, Tama o Mali, fill in the blank, timeline, enumeration, essay)
- `data_more.js`: must-know lists, the counter for each "Mali" statement, exact spellings, look-alikes, numbers and dates
- `app.js`: the app; `style.css`: styles; `index.html`: page shell
- `sw.js`: offline cache (bump `CACHE` and list new files when changing anything)

Deployed to Vercel project `jpl-midterm-reviewer` (https://jpl-midterm-reviewer.vercel.app).

## Rules for this folder

- Progress is saved in `localStorage` under `jpl-midterm-reviewer-v1`. **Do not change this key.** Old saved mistakes and recall-card boxes are carried over automatically.
- Add items at the **end** of the data lists. `COUNTERS` in `data_more.js` points to items in `TF` by position, so never reorder or insert into `TF`.

> Source first recovered from the live deployment and verified file-by-file against Vercel's checksums.
