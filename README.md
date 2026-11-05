# Reviewers

All my study reviewers live here, one folder per reviewer. Each one is a small static site (plain HTML/CSS/JS, no build step) that works offline and can be installed to the home screen.

## Reviewers

| Folder | Subject | Vercel project |
|---|---|---|
| [`cscn07c-reviewer`](cscn07c-reviewer) | CSCN07C Computer Architecture and Organization | `cscn07c-reviewer` |
| [`cselc01c-clouddb-reviewer`](cselc01c-clouddb-reviewer) | CSELC01C Cloud Databases and Data Services, Vol 1 & 2 | `cselc01c-clouddb-reviewer` |
| [`math7-q2-reviewer`](math7-q2-reviewer) | Mathematics 7, Quarter 2 | `math7-q2-reviewer` |
| [`digital-arts-reviewer`](digital-arts-reviewer) | RVA Midterms CS301: Digital Arts and Technology, Reading Images | `rva-midterms-cs301-reviewer` |

## Adding a new reviewer

1. Copy `_template/` to `<subject>-reviewer/` (lowercase, hyphens, e.g. `cselc03c-reviewer`, `rizal-ch5-reviewer`).
2. Fill in the placeholders: search the new folder for `TODO` and replace every one.
3. Create a Vercel project for it with **Root Directory** set to the new folder, and deploy.
4. Add a row to the table above.

Rules of thumb:

- **One folder = one deployable site.** Everything the site needs is inside its folder. Folders don't import from each other, so changing one reviewer can never break another.
- **Flat inside the folder.** `index.html` sits at the folder root (no `src/`).
- **Bump `CACHE` in `sw.js`** whenever you change the files, and list any new file in `FILES`, or offline users keep the old version.
- **Keep a short `README.md` in each folder**: what it covers, what each file does, which Vercel project it deploys to.
- **Append, don't reorder, data** in lesson files (progress is saved on students' devices by index).
