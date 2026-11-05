# Nini's Reviewers: standing instructions for Claude

This repo holds Nini's study reviewers, one folder per reviewer. Each is a small offline-capable website (plain HTML/CSS/JS, no build step) that she studies from on her **phone**. She works through Claude sessions on her phone, so these instructions exist so she doesn't have to repeat herself.

## How to talk to Nini

- Plain, short words. No jargon. If she has to do something herself, give numbered steps she can follow on a phone, and say clearly what *you* did versus what *she* must do.
- Don't ask technical questions. Ask only what you can't work out: course code, subject name, which lessons or files.
- Say what you changed outside the repo (Vercel, GitHub settings) and anything you could not do. Don't hide failures.

## Must-have: every reviewer is PUBLIC (no login, no sign-up)

Nini's classmates must be able to open every reviewer with just the link. This is the most important rule.

- Vercel turns on **login protection** ("Vercel Authentication") by default on new projects, and it blocks anyone without a Vercel login. For every project, set `ssoProtection` to `null` with `update_project`, and make sure `passwordProtection` is off.
- Check it with `get_project`: `ssoProtection.enabled` and `passwordProtection.enabled` must both be `false`. Do this after creating a project **and** whenever you touch its settings.
- The reviewers themselves must never ask for a log in or sign up (progress is saved on the device, not in an account).
- The Vercel fetch tools log in as Nini, so they can't prove a site is public. If you can't test from outside, say so and rely on the settings check.

## Building a new reviewer (the playbook)

1. **Get the basics.** Course code (never guess it; ask), the subject, and the material (PDFs, slides, photos). Read the material fully before writing.
2. **Folder name:** `<course code>-<subject>`, lowercase with hyphens, e.g. `rvan01g-rva`, `cscn07c-computer-architecture`. If there is no course code, ask.
3. **Start from `_template/`.** Copy it, then search the new folder for `TODO` and replace every one.
4. **Follow the wording of her material.** Terms, names, dates and definitions should match the slides or PDF, not paraphrases. Give slide/page numbers where the material has them.
5. **Include what her other reviewers have** (these are the defaults; she can say otherwise):
   - Study notes per lesson, with a *must-know* list for each
   - Glossary / flashcards
   - Questions in the professor's formats: multiple choice, true or false, identification, fill in the blank. Every question has a **clue** and an **explanation**.
   - Practice by topic, a mock exam, and a way to redo mistakes
   - Progress saved on the device, light and dark mode, and it works offline (installable from the home screen)
   - Phone-first layout
6. **Test before saying it's done.** Chromium and Playwright are pre-installed. Open the page at phone width (about 390px wide), check for console errors, check that the service worker registers, and run one quiz from start to finish.
7. **Commit the source to this repo.** The repo is the source of truth. Never leave the only copy of a reviewer on Vercel (that is how five reviewers got stranded).
8. **Deploy.** Create a Vercel project for it. Use `create_git_project` with this repo, team `cdc-are`, the new folder as `rootDirectory`, and the folder name as the project name, so it redeploys automatically. Then make it public (see the must-have rule above) and confirm the live page loads.
9. **Update `README.md`** (add the row to the table) and `TODO.md` if anything is left open.
10. **Report back** with the live link and a short plain summary.

## Updating an existing reviewer

Edit inside that folder only. Bump `CACHE` in its `sw.js` (and list any new file in `FILES`). Test, commit, and push. If its Vercel project is not connected to Git, deploy by hand and then confirm the live files match the repo.

## Rules that must not be broken

- **Never change a reviewer's `localStorage` key** (e.g. `cscn07c-reviewer-v1`) or `CACHE` name just because a folder or project was renamed. It wipes everyone's saved progress.
- **Append, never reorder or insert,** items in lesson data files. Progress is saved by index.
- **One folder = one site.** Folders don't import from each other. Building or editing one reviewer must not touch another.
- **Don't rename or delete** folders, Vercel projects, branches or the repo without asking her first.
- **Treat Vercel share links and any tokens as secret.** Don't paste them into files or messages.
- **Keep files flat inside a reviewer folder** (`index.html` at the folder root, no `src/`).

## Git

- Solo repo: commit straight to `main` in small commits. Don't open a pull request unless she asks.
- If a push to `main` is refused in a session, push to a `claude/...` branch and tell her.

## Recovering a reviewer that only exists on Vercel

Tips from the first attempt (see `TODO.md` for which reviewers still need it):

- `mcp__Vercel__web_fetch_vercel_url` returns the live file **exactly** (checked by SHA-1). Results over roughly 90K characters are saved to a file on disk automatically; smaller ones arrive inline in the chat.
- `mcp__Vercel__get_deployment_file_contents` **truncates** anything over about 1.5 KB. Don't use it for real files; use `list_deployment_files` to get each file's SHA-1 and compare.
- The sandbox shell cannot reach `vercel.app` unless the environment's network settings allow it.
- If the original Claude session still exists, its `create_deployment` calls contain the full file contents. `list_events` output is saved to disk, so parse it with a script and verify each file's SHA-1 against the live deployment. This is how the JPL reviewer was recovered.
- A project that builds at deploy time (e.g. `rizal-ch5-reviewer`, with `build.sh` and `parts/`) does not serve its source files. Only the built page is downloadable.
