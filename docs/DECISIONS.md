# Decision log

A running record of how this site was built and why, so future ISA web maintainers can pick it up without guesswork. Add an entry whenever a choice is made that someone later might question or want to undo.

Each entry records **what** was decided, **when**, **who** decided, the **alternatives** that were weighed, and the **consequences** to keep in mind. Newest entries go at the bottom. Do not rewrite old entries; if a decision is reversed, add a new entry that supersedes it and link back.

Open questions that still need an answer live at the end of this file.

---

## D-001 · Reference material stays out of the repo
- **Date:** 2026-10-12
- **Decided by:** Mahdi Rizk
- **Decision:** Org documents, original photos, logos, slides and merch images live in a local `_source/` folder that is gitignored. Only files the site actually uses get copied into the project.
- **Alternatives:** Commit everything as an archive in the repo.
- **Why:** The originals are about 370 MB and include internal documents (constitution drafts, funding notes). The repo stays small and safe to make public.
- **Consequences:** `_source/` exists only on the maintainer's machine. Hand it over separately (shared drive) when passing the project on.

## D-002 · Public repo; only the design spec is committed from the handoff
- **Date:** 2026-10-14
- **Decided by:** Mahdi Rizk
- **Decision:** From `design_handoff/`, only `README.md` (the design spec), `content.json` and `design/ISA Site v2.template.html` are committed. Ignored: `content-sources/`, `screenshots/`, `assets/`, the interactive prototype files.
- **Alternatives:** Commit the whole handoff folder.
- **Why:** The GitHub repo is public. `content-sources/` contains internal finances, funding plans and named individuals. Screenshots (16 MB) and handoff PNGs (53 MB) would bloat git history permanently; site images will be regenerated from the originals instead.
- **Consequences:** Visual reference screenshots and the clickable prototype are not in the repo. Keep them with `_source/` when handing over.

## D-003 · LF line endings for all text files
- **Date:** 2026-10-14
- **Decided by:** Mahdi Rizk
- **Decision:** `.gitattributes` normalizes text files to LF and marks images and fonts as binary.
- **Why:** Maintainers will change every year and use a mix of Windows and Mac. Without this, diffs fill up with line-ending noise.

## D-004 · Stack: Astro static site on Cloudflare Pages
- **Date:** Design phase, before 2026-10-14
- **Decided by:** _to confirm_
- **Decision:** Astro with static output, TypeScript, plain CSS (no Tailwind or UI framework), hosted on Cloudflare Pages. No server, no database, no member accounts.
- **Alternatives:** _to fill in from the design-phase discussion_
- **Why:** _to fill in_
- **Consequences:** All content updates are edits to `content.json` (or data files) followed by a rebuild. No admin panel.

## D-005 · Visual direction
- **Date:** Design phase, before 2026-10-14
- **Decided by:** _to confirm_
- **Decision:** Direction "1c" from the first round of explorations, restyled into "v2". Academic and calm: cream and navy with maize accents, Cormorant Garamond for headings, Source Sans 3 for body. No hairline borders, no rounded cards, no shadows; structure comes from whitespace and solid blocks. Restrained ornament only: an 8-point star lattice on navy bands and a three-diamond divider. No calligraphy, arches or crescents.
- **Alternatives:** The other round-one directions (see the prototype file kept with `_source/`).
- **Why:** _to fill in_
- **Consequences:** The full rules are in `design_handoff/README.md` under "Design character". Treat them as binding when adding pages.

## D-006 · Events come from the Google Calendar feed at build time
- **Date:** Design phase, before 2026-10-14
- **Decided by:** _to confirm_
- **Decision:** The site reads the ISA Google Calendar's iCal feed when it builds, and a scheduled GitHub Action triggers a rebuild every 12 hours. If the feed is unavailable, the site falls back to a local events file and shows an empty state.
- **Alternatives:** Embedding the Google Calendar; a hand-maintained events list.
- **Why:** The calendar is restricted to umich.edu accounts, so an embed shows nothing to visitors. Reading the feed at build time keeps the site static and free to host while staying up to date.
- **Consequences:** The feed must be readable at build time. As of 2026-10-14 the public feed URL returns 404 (calendar is not public). See open question Q-1.

---

## Open questions

| ID | Question | Raised | Status |
|---|---|---|---|
| Q-1 | Calendar feed: make the calendar public, use the secret iCal URL as a build-time secret, or launch on the fallback? | 2026-10-14 | Open |
| Q-2 | Donations: is an org payment link (Zelle or other) coming before launch? If not, what does the Support page point to? | 2026-10-14 | Open |
| Q-3 | Mobile home shows a shortened mission statement; the spec says the mission is never edited. Use the full text on mobile? | 2026-10-14 | Open |
| Q-4 | If calendar events include times and rooms, are they shown on the public site? | 2026-10-14 | Open |
| Q-5 | Links for the mailing list, sisterhood chat, discussion chat and pin-up board. | 2026-10-14 | Open |
| Q-6 | Domain: `*.pages.dev` or a custom domain? | 2026-10-14 | Open |
| Q-7 | Ownership: move the repo and hosting to an ISA-owned GitHub organization and shared Cloudflare account for yearly handover? | 2026-10-14 | Open |
| Q-8 | Consent from board members (names) and people in photos for public publishing. | 2026-10-14 | Open |
| Q-9 | Darken the eyebrow color `#8A6D00` to `#7D6300` so it meets WCAG AA contrast (currently 4.40:1 on cream, 3.95:1 on panels)? | 2026-10-14 | Open |
| Q-10 | Build site photos from the full-resolution originals (JPEG, ~2400px) instead of the 1400px handoff PNGs? | 2026-10-14 | Open |
