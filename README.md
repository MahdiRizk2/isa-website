# Islamic Society of Ahlulbayt website

The public website of the Islamic Society of Ahlulbayt (ISA), the Shia Muslim student organization at the University of Michigan, Ann Arbor.

- **Live site:** https://mahdirizk2.github.io/isa-website/
- **Built with:** [Astro](https://astro.build) (static site), plain CSS, hosted on GitHub Pages
- **Why things are the way they are:** [`docs/DECISIONS.md`](docs/DECISIONS.md)

You do not need to be a developer to keep this site up to date. Most updates are a one-line edit to [`src/data/content.json`](src/data/content.json), done directly on GitHub. Every change to `main` rebuilds and republishes the site in about two minutes.

---

## Common updates

| I want to… | Edit this |
|---|---|
| Change a link (WhatsApp chats, forms, Instagram, email, playlist) | `src/data/content.json` › `links` |
| Update the executive board for a new year | `src/data/content.json` › `board` |
| Change program names, schedules or descriptions | `src/data/content.json` › `programs` |
| Add the current Book Club book or the mass meeting date | `src/data/content.json` › `details` |
| Change the donation link or the note under it | `src/data/content.json` › `links.donate`, `donate_note` |
| Add, remove or reorder photos | `src/assets/photos/` and `src/data/photos.ts` |
| Turn on direct sending for the feedback forms | `src/data/content.json` › `feedback` (see below) |
| Add or change an event | The ISA Google Calendar (not this repo) |
| Change other text on a page | `src/pages/<page>.astro` |

### Editing on GitHub (no setup needed)

1. Open the file on github.com and click the pencil icon.
2. Make the change. In `content.json`, keep the quotes and commas exactly as they are around your edit.
3. Click **Commit changes** and commit to `main`.
4. Watch the **Actions** tab: when the "Build and deploy" run turns green, the live site is updated. If it turns red, open the run to see the error (usually a missing comma or quote in `content.json`).

### `content.json` reference

- **`links`**: every outside link on the site. A link set to `null` is hidden.
  - `donate`: where the Donate buttons go. `donate_monthly`: where "Set up monthly" goes; while it is `null`, the button opens an email to the e-board.
- **`donate_note`**: the short note under the Donate button. Set it to `null` to remove it once ISA has a permanent way to give.
- **`details`**: small facts that change each year. Leave a value as `null` to hide it.
  - `current_book`: shown next to "Suggest a book" on Programs.
  - `mass_meeting_date`: shown in the Mass Meeting panel on Events, written as you want it displayed (for example `"Thursday, September 10, 7 PM"`).
  - `programs_resume_month`: used in the "No events scheduled yet" message when the calendar is empty (for example `"September"`).
- **`programs`**: the regular programs. Those with a `photo` (a photo id from `src/data/photos.ts`) appear as large features on Programs. Add `"home": false` to leave a program out of the Home page grid, which is designed for six.
- **`board`**: `term` (for example `"2027-28"`) is used in the heading; `members` is shown in order.
- **`credit`**: the "Site by" line in the footer.

While running the site locally (`npm run dev`), anything still missing shows as grey bracketed text such as `[Current book]`. On the live site, missing items are simply hidden.

---

## Photos

Photos live in `src/assets/photos/` as `.jpg` files and are listed once in `src/data/photos.ts`.

To add or replace a photo:

1. Export it as a JPEG, about **1800px on the long edge** (2400px for the Home page hero). Bigger files only make the repo heavier; the site generates smaller versions automatically.
2. Put it in `src/assets/photos/`, for example `fall-picnic-2027.jpg`.
3. Add a line to the list in `src/data/photos.ts` with its `id` (the file name without `.jpg`), a short `alt` description of what is in the photo (for screen readers), and an optional `caption`.
4. To use it somewhere specific (the Home hero, a program feature), change the id in that page or in `content.json › programs › photo`.

The Photos page shows every photo in the order of the list. Only publish photos the people in them are comfortable with.

---

## Events

Events come from the **ISA Google Calendar**, which must stay public. The site reads the calendar's iCal feed every time it builds (twice a day, plus on every change to `main`), so new events appear within about 12 hours. To publish an event immediately, open **Actions › Build and deploy › Run workflow**.

What appears on the site:

- **"This week"** (Home and Events): up to three events in the next 7 days, always including the Thursday program. If nothing is on this week it shows the next few events instead.
- **"Coming up"** (Events): everything else in the next 90 days, grouped by month, each with an "Add to calendar" file.
- For each event: the title, date, start time, the part of the location before the first comma, and the first line of the description.
- **Past events** (`/events/past/`): everything on the calendar since fall 2025, grouped by semester. Event titles used three or more times count as regular programs and show as session counts. **Don't delete past events from the calendar**; they would disappear from the archive.

Calendar tips for whoever manages it:

- **Everything on the calendar is public.** Do not put private details (phone numbers, addresses of homes, internal notes) in event titles, locations or descriptions.
- A leading "ISA " is dropped from titles ("ISA Book Club" shows as "Book Club").
- Keep the Thursday program's title containing **"Dua and Discussion"** (or "Kumayl") so it is recognised as the main weekly program.
- Use repeating events for weekly programs; the site labels them "Weekly" or "Biweekly" from the repeat rule.
- Put the room in the location (for example `TMC - 1055 Lg Reflection`); the text after the first comma is not shown.

If the calendar cannot be read, the site falls back to `src/data/events.json` (a list of `{ "title", "start", "end", "location", "description" }` with ISO dates, normally empty), and shows "No events scheduled yet" if that is empty too.

**After a quiet summer:** GitHub pauses scheduled runs when the repo has had no commits for 60 days. At the start of each semester, open the **Actions** tab, select **Build and deploy**, and click **Enable workflow** if GitHub shows a banner saying it was disabled.

---

## Feedback and photo reports

Two forms send messages to the e-board email address (`links.email` in `content.json`). That address is a U-M MCommunity group, so every message lands in every board member's own inbox:

- **`/feedback/`**: corrections, bugs and ideas. Every page's footer links to it ("Send feedback") and pre-selects the page the visitor was on.
- **`/photos/report/`**: someone picks a photo and says why it should come down. The email names the exact file (for example `IMG_4335.jpg`), so removing it means deleting that line from `src/data/photos.ts` (and the file from `src/assets/photos/`).

How they send:

- **With a Web3Forms key** (recommended): messages go straight from the page, with no email app needed. [Web3Forms](https://web3forms.com) is a free form-to-email service (about 250 messages a month on the free plan).
  1. On web3forms.com, choose "Create Access Key" and enter the e-board email address.
  2. The key is emailed to that address, so every board member receives it. Paste it into `content.json` › `feedback` › `web3forms_key` (keep the quotes) and commit.
  3. The key is meant to be public; it only lets people send messages to that address. If spam ever becomes a problem, create a new key and replace it.
  4. If the key email never arrives, the MCommunity group is probably blocking senders from outside U-M. A group owner can change this in the group's privacy settings at mcommunity.umich.edu (allow outside senders, or give an owner the "Receive Unpermitted Messages" role so blocked mail is held for approval instead of bounced).
- **Without a key** (`"web3forms_key": null`): pressing Send opens the visitor's email app with the message filled in, addressed to the e-board.

---

## Working on the site locally

You need [Node.js 24](https://nodejs.org) (the version is pinned in `.nvmrc`).

```sh
npm ci            # install exact dependency versions
npm run dev       # start a local site at http://localhost:4321/isa-website/
npm run check     # type-check the project
npm run build     # build the production site into dist/
npm run preview   # serve dist/ locally to check the production build
```

### How the code is organized

```
src/
  data/content.json     links, programs, board, donation note, yearly details
  data/photos.ts        the photo list (ids, alt text, captions)
  data/events.json      fallback events if the calendar can't be read
  lib/calendar.ts       reads the Google Calendar feed at build time
  lib/site.ts           link helper (handles the /isa-website/ base path), nav items
  layouts/Base.astro    page shell: <head>, fonts, header, footer, mobile Join bar
  components/           Header (with mobile menu), Footer, StickyJoin, ThisWeek, EventRow, Photo, ...
  pages/                one file per page; events/[id].ics.ts makes the "Add to calendar" files
  styles/global.css     colors, type, buttons and other shared styles
  assets/               photos and logos (optimized automatically at build time)
public/                 favicon, social preview image (og.png)
design_handoff/         the original design specification (reference only; content.json there is outdated)
docs/DECISIONS.md       decision log
docs/ROADMAP.md         ideas and planned features, not built yet
```

### Design rules

The look is deliberate. Before changing styles, read "Design character" in [`design_handoff/README.md`](design_handoff/README.md). In short: no thin divider lines or card outlines, no rounded corners except 2px on buttons, no shadows, structure from whitespace and solid cream or navy blocks, and the star lattice only on navy bands. Colors and fonts are defined once at the top of `src/styles/global.css`.

### Quality checks before a big change

- `npm run check` and `npm run build` pass with no errors.
- Pages work at phone width (390px) and desktop width.
- Text stays readable: the color tokens in `global.css` were chosen to meet WCAG AA contrast. Don't lighten them.
- Every photo has meaningful `alt` text.

---

## Deploying

The site deploys automatically with GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages. In the repo's **Settings › Pages**, "Source" must be set to **GitHub Actions**.

### Moving to a custom domain

When ISA's domain (for example `isahlulbayt.com`) is ready:

1. In `astro.config.mjs`, set `SITE` to `'https://isahlulbayt.com'` and `BASE` to `'/'`.
2. Add a file `public/CNAME` containing just the domain: `isahlulbayt.com`.
3. At the domain registrar, add DNS records for GitHub Pages: four `A` records for the bare domain pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` record for `www` pointing to `mahdirizk2.github.io` (or the ISA GitHub organization's `<name>.github.io` after a transfer).
4. In **Settings › Pages**, enter the custom domain and turn on **Enforce HTTPS** once the certificate is issued.
5. Update the live-site link at the top of this README and record the registrar and renewal date in `docs/DECISIONS.md`.

---

## Handing the site over

The repo, hosting and (soon) the domain are currently held by Mahdi Rizk (see D-013 in the decision log). Before the next handover:

- [ ] Create an ISA GitHub organization and transfer this repo to it (GitHub keeps redirects from the old URL).
- [ ] Make sure the **ISA Google Calendar** has several owners (Settings › Share with specific people › "Make changes and manage sharing"). The website's events come from it, and if its only owner graduates and loses their U-M account, the calendar and the site's events go with it. Same for the Google Forms the site links to.
- [ ] Move the domain to a registrar account ISA controls, with auto-renew on. The e-board address is an MCommunity group, not a login, so accounts need an org-owned account (see Q-16 in the decision log).
- [ ] Replace the temporary Venmo donation link and remove `donate_note` once ISA has a permanent way to give.
- [ ] Move the pin-up board (Padlet) to an ISA-owned account.
- [ ] Give the new web lead admin access, and walk them through this README.

Record each step in `docs/DECISIONS.md` as it happens.
