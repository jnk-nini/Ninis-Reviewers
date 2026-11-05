# CSCN07C Reviewer

Reviewer for **CSCN07C Computer Architecture and Organization** (LPU Cavite).
Live: https://cscn07c-reviewer.vercel.app

Static site, no build step. Works offline through a service worker (`sw.js`) and can be installed to the home screen.

## Lessons covered

| Lesson | Topics |
|---|---|
| 2 – Intro to Arduino Architecture & Cirkit Designer | IPO+S, CPU components, fetch–decode–execute, Arduino code, two's complement, bitwise, shifting, status flags |
| 3 – Logic Gates, Resistor Fundamentals & Digital Circuit Foundations | Ohm's law, resistors & color code, transistors & digital logic, logic gates & truth tables |

## Files

- `notes.js`, `bank.js`, `labs.js`: Lesson 2 notes, glossary + question bank, generators + labs
- `lesson3_notes.js`, `lesson3_bank.js`, `lesson3_labs.js`, `lesson3.css`: Lesson 3. They **append** to the Lesson 2 data
  (topics, `NOTES`, `TERMS`, `QUESTIONS`, `GEN`, `LABS`), so progress saved on students' devices (keyed by index) stays valid.
  New lessons should follow the same pattern: append, never insert or reorder.
- `app.js`: the app (notes, lab, flashcards, drills, mock quiz, progress). Topics/labs are data-driven; nothing to edit when adding a lesson.
- `style.css`: styles (light and dark). `sw.js`: offline cache (bump `CACHE` and list new files when adding any).
- Script order in `index.html` matters: notes → lesson notes → bank → lesson bank → labs → lesson labs → app.

## Deploying

Deployed to Vercel project `cscn07c-reviewer` with the files at the site root (flat, no `src/` prefix).
