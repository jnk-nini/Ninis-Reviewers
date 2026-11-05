# TODO

Things still to do for Nini's Reviewers. Tick them off as they're done.

## Pinned: reviewers not in this repo yet

These are live on Vercel but their source is not here. Paused for now. Details on how to recover them are in `CLAUDE.md`.

- [ ] `cselc01c-clouddb-reviewer`: **the live site is newer than the repo copy** (`cselc01c-cloud-databases`). It has two extra files, `data_sum.js` and `extra.css`, and newer `app.js`, `index.html`, `style.css`, `sw.js`. Do this one first, and do it **before** connecting the project to Git, or a deploy would overwrite the newer version.
- [ ] `rizal-ch5-reviewer`: needs a course code. Only the built page is downloadable (the source `parts/` and `build.sh` are not served), so import the built page.
- [ ] `eneman20-reviewer`: needs a course code. About 11 files.
- [ ] `cselc03c-reviewer`: about 20 files.

Blocker: the session's shell cannot reach `vercel.app`. Either allow `vercel.app` and `*.vercel.app` in the environment's network settings (not found in the iOS app yet), or import file by file through the chat (slow).

## Vercel and GitHub

- [ ] Connect each Vercel project to this repo (Vercel dashboard → project → Settings → Git → Connect), then set **Root Directory**. Claude cannot do this for projects that already exist.
  - `cscn07c-reviewer` → `cscn07c-computer-architecture` (matches live, safe now)
  - `rva-midterms-cs301-reviewer` → `rvan01g-rva` (matches live, safe now)
  - `math7-q2-reviewer` → `math7-mathematics-q2` (matches live, safe now)
  - `jpl-midterm-reviewer` → `jpln01g-jose-p-laurel` (matches live, safe now)
  - `math7-reviewer` → `math7-mathematics-q1` (matches live, safe now)
  - `cselc01c-clouddb-reviewer` → `cselc01c-cloud-databases` (**not yet**, see above)
- [ ] After connecting, turn on "Skip deployments when there are no changes to the root directory" in each project.
- [ ] In GitHub → Settings → Branches, confirm `main` is the default branch.
- [ ] Once `main` is the default, delete the old `claude/...` branches.
- [ ] Check that classmates can open the reviewer links **without a Vercel login**. The projects have Vercel's login protection switched on for `vercel.app` links. If it blocks them, turn it off in each project (Settings → Deployment Protection).

## Small clean-ups

- [ ] `rvan01g-rva` still says "RVA Midterms CS301" inside the app. Decide whether to change it to the RVAN01G name.
- [ ] Math 7 has no course code. Confirm the folder names `math7-mathematics-q1` / `q2` are fine.
- [ ] Review `CLAUDE.md` and edit anything that doesn't match how you want your reviewers built.
