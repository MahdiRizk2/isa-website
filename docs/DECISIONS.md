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

## D-007 · ISA Google Calendar made public
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** The ISA Google Calendar is now public, so its iCal feed can be read at build time without credentials. Resolves Q-1.
- **Alternatives:** Keep it umich-only and read the private ("secret") iCal address as a build secret; launch on a hand-maintained fallback file.
- **Why:** Simplest setup with nothing secret to hand over.
- **Consequences:** Everything on the calendar (titles, locations, descriptions) is visible to anyone. Do not put private details in calendar events. Event titles are currently inconsistent ("Dua and Discussion", "ISA Dua and Discussion"; "Book Club", "Tea and Tawassul"), so the site matches programs by keywords; see the naming guide in the README once written.

## D-008 · Donations go through a personal Venmo for now
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** Until ISA has its own payment account, the Donate buttons link to Mahdi Rizk's personal Venmo, and Mahdi passes the money to ISA. Larger or recurring gifts are directed to email the e-board. Resolves Q-2.
- **Alternatives:** No online giving until an org account exists; Zelle (needs an org bank account).
- **Why:** No org payment account is expected before launch.
- **Consequences:** The link in `content.json › links.donate` must be replaced when Mahdi steps back. Money received this way should be logged and transferred to the ISA account promptly.

## D-009 · Full mission statement on mobile too
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** The mobile home page shows the full mission sentence, same as desktop, instead of the shortened version in the prototype. Resolves Q-3.
- **Why:** The mission statement is the org's own wording and is never edited.

## D-010 · Event times and locations are shown on the site
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** When a calendar event has a time and location, the site shows them. Resolves Q-4. Supersedes the spec line "Times and rooms are NOT published on the site".
- **Consequences:** The weekly-rhythm text stays general ("posted in the Updates chat each semester"); individual events show their own details.

## D-011 · Additional community links
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** Added the sisterhood chat, mailing-list sign-up form and ISA pin-up board (Padlet). The "discussion chat" is the same WhatsApp group as the members chat. Resolves most of Q-5.
- **Consequences:** The pin-up board lives under a member's personal Padlet account; ownership should move to an ISA account eventually.

## D-012 · Host on GitHub Pages for now; custom domain planned
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** The first public version deploys to GitHub Pages (built by a GitHub Action). A custom domain matching the Instagram handle (`isahlulbayt.com` and/or `.org`) will be bought by Mahdi and handed to the org later. Partly supersedes D-004 (Cloudflare Pages). Resolves Q-6.
- **Alternatives:** Cloudflare Pages from day one.
- **Why:** No extra account needed to get the site live.
- **Consequences:** Until the domain is set up, the site is served from a sub-path (`/isa-website/`), handled by Astro's `base` setting. GitHub Pages cannot set custom HTTP headers, so the planned `_headers` file has no effect there. Domain renewal must be tied to someone's payment card; record the expiry date and registrar in this repo.

## D-013 · Mahdi owns the accounts for now; ISA GitHub organization later
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** The repo, hosting and domain stay under Mahdi's personal accounts for now. Creating an ISA-owned GitHub organization (and shared accounts) is deferred. Defers Q-7.
- **Consequences:** Before Mahdi steps back: create the ISA GitHub organization, transfer the repo (GitHub keeps redirects), move the domain to an ISA-controlled registrar account, and update the donate link.

## D-014 · Board list and consent
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** All 2026-27 board members and the people in the site photos have consented to being published. Mahdi Rizk is added to the board list as Advisor. Resolves Q-8.

## D-015 · Footer credit
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** The footer includes a credit to Mahdi Rizk linking to mrizky.dev.

## D-016 · Brotherhood chat link added
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** Added the ISA Brotherhood WhatsApp chat link. With D-011, all community links are now known. Resolves Q-5.

## D-017 · Pin-up board appears in the footer and on the Join page
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** The pin-up board link goes in the footer's Resources column and as a fourth item in the Join page contact row, next to Instagram, Email and Mailing list. Resolves Q-12.

## D-018 · The Venmo note says it is temporary
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** Next to the Donate button, a short note explains that gifts currently go through Mahdi Rizk's Venmo and are passed to ISA, and that this is a temporary workaround while ISA sets up a permanent way to give once or monthly. Refines D-008.
- **Consequences:** When a permanent method exists, update `links.donate` and remove the note.

## D-019 · Check and large-gift details are given by email only
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** The site does not publish SOAS account details (payee, shortcode, mailing address, EIN, treasurer). Donors who want to give by check or set up a recurring gift are asked to email the e-board. Resolves Q-11.
- **Why:** The correct payee and tax-deductibility for gifts to a student org are unconfirmed with SOAS, and the treasurer changes every year.

## D-020 · Accessibility color fix and full-resolution photos
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** The dark maize used for eyebrow labels and small links changes from `#8A6D00` to `#7D6300` (5.14:1 on cream, 4.61:1 on panels; meets WCAG AA). Site photos are exported from the full-resolution originals as JPEG at about 2400px instead of using the 1400px handoff PNGs. Resolves Q-9 and Q-10.
- **Why:** The original color failed AA contrast for small text. The handoff PNGs were 2–4 MB each and too small for the full-width hero.

## D-021 · Board list order and footer credit wording
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** The Advisor appears last in the board list. The footer credit reads "Site by Mahdi Rizk" and links to mrizky.dev. Refines D-014 and D-015.

## D-022 · More accessible muted text and focus rings
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk (v1 build)
- **Decision:** The muted text color changes from `#5B6B7B` to `#566676` (4.73:1 on the darker cream panels, up from 4.39:1). Keyboard focus shows a 2px maize outline around a 2px navy ring, so it is visible on both cream and navy.
- **Why:** The spec's maize-only focus ring is nearly invisible on cream (1.4:1), and the old muted color failed AA on panels. Same reasoning as D-020.

## D-023 · Calendar notes and links after making the calendar public
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk (v1 build)
- **Decision:** Removed the line "Google Calendar view requires a umich.edu account" from the Events page, since the calendar is now public (D-007). "Open in Google Calendar" and "Subscribe (iCal)" link straight to the public calendar.

## D-024 · How calendar events are shown
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk (v1 build)
- **Decision:**
  - "This week" shows up to three events in the next 7 days in date order, always including the Thursday program (titles containing "Dua and Discussion" or "Kumayl"). If nothing is on in the next 7 days, the panel is titled "Next up" and shows the next three events. If the calendar is empty, it shows "No events scheduled yet… Follow the Updates chat."
  - "Coming up" shows every other event in the next 90 days, grouped by month.
  - A leading "ISA " is dropped from event titles. The place shown is the location text before the first comma. The cadence label ("Weekly", "Biweekly") comes from the event's repeat rule.
  - "Add to calendar" downloads a per-event `.ics` file generated at build time.
- **Alternatives:** Linking to the Google Calendar event page (the feed does not include those links); showing the calendar title unchanged.
- **Consequences:** Event quality depends on how events are entered in the calendar; README.md › Events has a short guide for organizers. Note: the calendar currently lists Book Club weekly in November while the site's weekly-rhythm text says "Every other Tuesday"; the board should decide which is right and update one of them.

## D-025 · One set of text for phones and desktops
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk (v1 build)
- **Decision:** The prototype had shortened versions of several paragraphs for phones. The site uses the full desktop text at every screen size. Mobile layout differences from the prototype are kept (for example Home shows three programs on phones). Small wording added where the prototype only had placeholders: "Sisterhood chat" / "Brotherhood chat" buttons on Programs, "Sign up" and "Open the board" on Join, "Reading now:" before the current book. The Photos intro drops "Captions are placeholders." because empty captions are hidden.
- **Why:** One version of each sentence is easier to maintain and avoids the two drifting apart.

## D-026 · Small visual adjustments to the prototype
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk (v1 build)
- **Decision:** Slightly darker photo overlay behind the mobile hero text so the maize eyebrow stays readable. Headings use balanced line wrapping. A simple 404 page was added in the site's style. Missing details show as grey bracketed placeholders only when running locally and are hidden on the live site.

## D-027 · Deploy workflow and scheduled rebuilds
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk
- **Decision:** One GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`, twice a day on a schedule, and on demand. Scheduled runs pausing after 60 days without commits is handled by documentation (README.md › Events) rather than a workaround. Resolves Q-13.
- **Alternatives:** A keep-alive job that commits automatically; an external cron service.
- **Why:** No extra moving parts. Summer has no events, so a paused schedule costs nothing until fall.

## D-028 · Performance setup
- **Date:** 2026-10-15
- **Decided by:** Mahdi Rizk (v1 build)
- **Decision:** CSS is inlined into each page (it is small). Fonts are self-hosted with per-language subsets so only Latin files download, and the two main faces are preloaded. Photos are served as AVIF/WebP in several sizes with explicit dimensions; only the first photo on a page loads eagerly.
- **Consequences:** Lighthouse (mobile) on the live v1 site: performance 99–100, best practices 100, SEO 100, accessibility 100 on most pages. Programs and Events score 95–96 because the mobile Join bar covers whichever button happens to sit at the very bottom of the first screen; scrolling uncovers it. Layout shift is effectively zero.

---

## Open questions

| ID | Question | Raised | Status |
|---|---|---|---|
| Q-1 | Calendar feed access | 2026-10-14 | Resolved by D-007 |
| Q-2 | Online donations | 2026-10-14 | Resolved by D-008 |
| Q-3 | Mission text on mobile | 2026-10-14 | Resolved by D-009 |
| Q-4 | Event times and rooms on the site | 2026-10-14 | Resolved by D-010 |
| Q-5 | Community links | 2026-10-14 | Resolved by D-011 and D-016 |
| Q-6 | Domain | 2026-10-14 | Resolved by D-012 |
| Q-7 | ISA-owned GitHub organization and accounts | 2026-10-14 | Deferred by D-013 |
| Q-8 | Consent for names and photos | 2026-10-14 | Resolved by D-014 |
| Q-9 | Eyebrow color contrast | 2026-10-14 | Resolved by D-020 |
| Q-10 | Photo source files | 2026-10-14 | Resolved by D-020 |
| Q-11 | Check-giving details on the Support page | 2026-10-15 | Resolved by D-019 |
| Q-12 | Pin-up board placement | 2026-10-15 | Resolved by D-017 |
| Q-13 | Keeping scheduled rebuilds running over summer | 2026-10-15 | Resolved by D-027 |
| Q-14 | Book Club cadence: the site says "Every other Tuesday" but the calendar lists it weekly in November. Which is right? | 2026-10-15 | Open |
