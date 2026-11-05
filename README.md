# Nini's Reviewers

All my study reviewers live here, one folder per reviewer. Each one is a small static site (plain HTML/CSS/JS, no build step) that works offline and can be installed to the home screen.

Open tasks are in [`TODO.md`](TODO.md). The standing instructions Claude follows when building or updating a reviewer are in [`CLAUDE.md`](CLAUDE.md).

## Reviewers

Folders are named `<course code>-<subject>`.

| Folder | Course | Subject | Vercel project |
|---|---|---|---|
| [`cscn07c-computer-architecture`](cscn07c-computer-architecture) | CSCN07C | Computer Architecture and Organization | `cscn07c-reviewer` |
| [`cselc01c-cloud-databases`](cselc01c-cloud-databases) | CSELC01C | Cloud Databases and Data Services, Vol 1 & 2 | `cselc01c-clouddb-reviewer` |
| [`rvan01g-rva`](rvan01g-rva) | RVAN01G | RVA (Midterms): Digital Arts and Technology, Reading Images | `rva-midterms-cs301-reviewer` |
| [`math7-mathematics-q1`](math7-mathematics-q1) | Math 7 | Mathematics 7: percentages, rational numbers, fractions, decimals, roots | `math7-reviewer` |
| [`math7-mathematics-q2`](math7-mathematics-q2) | Math 7 | Mathematics 7, Quarter 2 | `math7-q2-reviewer` |
| [`jpln01g-jose-p-laurel`](jpln01g-jose-p-laurel) | JPLN01G | Dr. Jose P. Laurel, Midterm | `jpl-midterm-reviewer` |

### Deployed but not in this repo yet

These have live Vercel projects but their source still needs to be added here (then named `<course code>-<subject>`):

`eneman20-reviewer`, `cselc03c-reviewer`, `rizal-ch5-reviewer`.

Also, the live `cselc01c-clouddb-reviewer` is newer than the copy in `cselc01c-cloud-databases` (it has extra `data_sum.js` and `extra.css`).

## Adding a new reviewer

1. Copy `_template/` to `<course code>-<subject>/` (lowercase, hyphens, e.g. `cselc03c-<subject>`, `rizal-ch5-<subject>`).
2. Fill in the placeholders: search the new folder for `TODO` and replace every one.
3. Create a Vercel project for it from this repo with **Root Directory** set to the new folder.
4. Add a row to the table above.

## Deploying

Each reviewer is its own Vercel project, connected to this repo, with **Root Directory** set to its folder (e.g. `cscn07c-computer-architecture`). Enable "Skip deployments when there are no changes to the root directory" in each project so a push only redeploys the reviewer that changed.

Always make sure the folder here has the latest version of the reviewer before connecting its project, because a Git deploy replaces whatever is live.

## Rules of thumb

- **One folder = one deployable site.** Everything the site needs is inside its folder. Folders don't import from each other, so changing one reviewer can never break another.
- **Flat inside the folder.** `index.html` sits at the folder root (no `src/`).
- **Bump `CACHE` in `sw.js`** whenever you change the files, and list any new file in `FILES`, or offline users keep the old version.
- **Keep a short `README.md` in each folder**: what it covers, what each file does, which Vercel project it deploys to.
- **Append, don't reorder, data** in lesson files (progress is saved on students' devices by index).
- **Never change the `localStorage` key** (e.g. `cscn07c-reviewer-v1`) or the `CACHE` name just because a folder was renamed. Doing so resets everyone's saved progress.
