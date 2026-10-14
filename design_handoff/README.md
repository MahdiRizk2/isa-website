# Handoff: ISA Website (Islamic Society of Ahlulbayt, University of Michigan)

## Overview
Public website for ISA, a student-run Shia Muslim organization at U-M Ann Arbor. Goals: help visitors understand ISA, find upcoming events, join the community (WhatsApp chats), and support activities (donate). Audience: prospective and current students, alumni, supporters.

Target stack (user's choice): **Astro**, static output, hosted on **Cloudflare Pages**. This is the first public draft; it must deploy.

## About the design files
Everything in `design/` is a **design reference built in HTML**, not production code. Recreate it in Astro with ordinary components and CSS. Do not ship the `.dc.html` runtime.

- `design/ISA Site v2.dc.html` + `design/support.js`: the approved interactive prototype. Serve the `design/` folder locally and open the file (file:// may block fetches). Bottom-right toggle switches Desktop / Mobile; nav is clickable; all 7 pages live in one file, switched by state.
- `design/ISA Site v2.template.html`: the same markup without the runtime, easier to read. Every style is inline, so exact values are in the markup. `{{ name }}` holes and `<sc-if>` / `<sc-for>` are template control flow (`sc-if value="{{ isEvents }}"` wraps the Events page, etc.). `{{ footerStars }}` is `none` on Home and the star-lattice `url(...)` on every other page.
- `design/ISA Website Directions.dc.html`: round-1 exploration (three directions); historical only. Direction 1c was chosen and then substantially restyled into v2. Do not build from this file.
- `screenshots/`: full-page captures of every page: `desktop-01-home.png` … `desktop-07-support.png` (page body, 1790px viewport: full-bleed bands with a 1200px content column) plus `desktop-00-header-footer.png` (footer), and `mobile-01-home.png` … `mobile-07-support.png` plus `mobile-08-menu-open.png` (390px, full phone frame including header, footer and sticky Join bar). Use them for visual comparison; use the template for exact values.
- `content.json`: all copy, links, programs, board list. Source of truth for text.
- `content-sources/`: plain-text extractions of the org's documents for context. Internal procedures and financial figures in these must **not** be published.
- `assets/`: logos (PNG, transparent), web-sized photos (≤1400px), merch pics (future page).

## Fidelity
**High fidelity.** Colors, type, spacing and copy are final unless noted as a placeholder. Photo-to-caption matching is not final; the org will swap photos later, so keep every image in one data array / one folder.

## Design character (read before coding)
Academic, calm, Islamic-art-informed. Specifically:
- **No hairlines.** No 1px borders, dividers, or card outlines anywhere. Structure comes from whitespace, type hierarchy, and solid blocks (cream-dark panels or navy bands). The only borders in the design are: 4px maize or navy top accent bars on panels, 1.5px navy outline buttons, and the 4px maize rule on top of header and footer.
- **No rounded cards.** Corner radius is 2px on buttons and 0 everywhere else. No pills, no chips, no shadows.
- **Ornament, restrained:** an 8-point star lattice (two overlapping squares, one rotated 45°) tiled at low opacity on navy feature sections; a small three-diamond ornament as a section divider. No Arabic calligraphy (none supplied), no arches, no crescents.
- Photos are plain rectangles, cover-fit, consistent heights per row.
- Weights stay 500/600; nothing heavier than 700 (nav Join button). Display type is a serif.

## Site map and routing
```
/            Home
/events      Events
/programs    Programs
/photos      Photos
/about       About
/join        Join
/support     Support / Donate
```
Header (navy, 4px maize top rule, 84px tall): logo + "Islamic Society of Ahlulbayt" (serif 24px/600) with "UNIVERSITY OF MICHIGAN" small caps under it; nav Events · Programs · Photos · About · **Donate** (maize text → /support) · **Join ISA** (maize filled button → /join). Active page gets a 2px maize bottom border; inactive transparent (no layout shift).
Footer (navy, 4px maize top rule, 4 columns): brand + "University of Michigan, Ann Arbor / A member of the Muslim Coalition" · PAGES · CONNECT · RESOURCES. Star lattice on the footer at 0.10 opacity on every page **except Home** (Home's last section is already a lattice band and the tiles would misalign).

Future, leave room but do not render: member accounts, alumni directory, merch store, custom payment.

## Design tokens
Colors
- Page background (cream): `#F6F2E8`
- Panel (cream-dark, for solid cards/panels): `#EBE6D8`
- Outer frame behind the page on very wide screens / mobile preview backdrop: `#E9E4D6`
- Navy (header, footer, feature bands, primary buttons): `#002848`
- Maize (accents, primary CTA, top rules): `#F8C800`
- Dark maize (eyebrow labels and small-caps links on cream): `#8A6D00`
- Text on cream: headings `#002848`, body `#3D4B5A`, muted/meta `#5B6B7B`, base `#1F2D3D`
- Text on navy: headings `#FFFFFF`, body `#DBE3EC`, muted `#C9D3E0`, eyebrows `#F8C800`
- Hero overlays: vertical `linear-gradient(180deg, rgba(0,40,72,.45) 0%, rgba(0,40,72,.25) 40%, rgba(0,40,72,.85) 100%)` plus horizontal `linear-gradient(90deg, rgba(0,40,72,.7) 0%, rgba(0,40,72,.2) 60%, rgba(0,40,72,0) 100%)` over the photo.

Star lattice (CSS `background-image` on navy sections, tiles at 96px):
```
url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cg fill='none' stroke='%23F8C800' stroke-opacity='.16'%3E%3Crect x='20' y='20' width='56' height='56'/%3E%3Crect x='20' y='20' width='56' height='56' transform='rotate(45 48 48)'/%3E%3C/g%3E%3C/svg%3E")
```
Opacity `.16` on feature bands and the Join "Members chat" card; `.10` on footer and the mobile menu overlay. Put it in a shared CSS custom property or a `.lattice` utility and apply it per section; never on the header or hero.

Three-diamond divider: centered flex row, gap 14px: 6px filled `#8A6D00` diamond, 10px outlined (1.5px) diamond, 6px filled diamond; each is a square rotated 45°. Mobile: 5 / 8 / 5 px, gap 12px.

Typography
- Display / headings: **Cormorant Garamond** (Google Fonts) weights 400/500/600, italic 400/500. Also used for the big day numerals in event rows and the serif "This week" title.
- Body / UI: **Source Sans 3** weights 400/500/600/700.
- Placeholders only: **IBM Plex Mono** 400.
- H1 home: 68px / 1.02 / 500 / -.01em, white on hero. H1 inner pages: 64px / 1.02 / 500, navy. Mobile H1: 42px (home, events) or 40px.
- H2 band/section: 46px / 500; secondary H2: 36px / 600; program feature H2: 48px / 500 / 1.05. Mobile: 34 / 32 / 28.
- H3 / card titles: 30px / 600 / 1.1 (program grid), 28px (support), 32px (give once/monthly). Mobile 22–26px.
- Mission pull text: 32px / 1.3 / 500 serif (home), 30px / 1.35 (about). Mobile 22px.
- Eyebrow labels: 12–13px / 600 / letter-spacing .14–.16em / uppercase, dark maize on cream, maize on navy. Mobile 11px.
- Body: 19px (hero), 18px (page intros), 17px (long program copy), 16px, 15px; line-height 1.5–1.65. Mobile 15/14.
- Meta: 14px, 13px, 12px.
- Nav: 15px/600 white. Buttons: 16px/700 maize filled (hero), 16px/600 navy filled, 15px/600 outline. Mobile 15/14.
- Small-caps text links: 13px / 600 / .1em / uppercase, navy with a 2px maize bottom border and 3px padding-bottom (or dark maize with no underline when used as a "see all" link).

Spacing & layout
- Content column max-width **1200px**, centered; bands (hero, navy sections, header, footer) are full-bleed with the 1200 column inside.
- Horizontal padding 40px desktop; 20px text / 12px panels on mobile.
- Section vertical padding 64–88px desktop (navy bands 72–80px); 28–36px mobile.
- Grid gaps: 48px (3-col text grids), 40px (4-col), 64px (two-column feature grids), 24px (two side-by-side panels), 10px (photo rows).
- Responsive: one breakpoint at 900px is sufficient.

Radii: 2px on buttons; 0 elsewhere. Shadows: none (the mobile sticky button has a soft `0 2px 10px rgba(0,40,72,.25)`).

## Shared components

### Header (desktop)
Navy, `border-top: 4px solid #F8C800`, inner 1200 column, height 84px, flex space-between. Left: `ISA_Logo_Yellow-Clear.png` 48px tall + two-line wordmark (serif 24px/600 white "Islamic Society of Ahlulbayt"; 12px/.14em uppercase `#C9D3E0` "University of Michigan"). Right: nav gap 30px, 15px/600 white, Donate in maize, Join ISA button `padding 11px 20px; background #F8C800; color #002848; font-weight 700; border-radius 2px`.

### Header (mobile)
Navy, 3px maize top rule, padding 12px 16px. Logo 36px + two-line serif wordmark 17px. 44×44 menu button, `≡` / `×`. Menu: full-screen navy overlay (lattice at .10) below the header; items Home, Events, Programs, Photos, About, Donate (maize) in serif 34px/500 with 12px vertical padding, no dividers; then a full-width Join ISA button (maize, 15px padding, 16px/700, radius 2px); Instagram handle and email in 13px `#C9D3E0` at the bottom. Lock body scroll while open; close on route change.

### Mobile sticky Join bar
`position: sticky; bottom: 0; padding: 10px 12px 18px; background: linear-gradient(180deg, rgba(246,242,232,0), #F6F2E8 45%)`. Inside: full-width "Join ISA · members chat" navy filled button, 15px padding, 16px/600, radius 2px, shadow above. Present on every mobile page; content gets ~100px bottom padding so the footer is not hidden.

### "This week" panel
Cream page-color (`#F6F2E8`) panel with 4px maize top rule, padding 28px 30px 24px. Header row: serif "This week" 30px/600 navy + "ALL EVENTS" small-caps link in dark maize. Rows: grid `72px 1fr auto`, gap 16px, padding 12px 0, no dividers. Date block: weekday 11px/.14em uppercase dark maize; day numeral serif 34px navy. Title 17px/600 navy; meta 14px `#5B6B7B`. Right column: cadence label ("Weekly", "Biweekly") 11px/.12em uppercase `#5B6B7B`. Footer note 12px. On Events the same rows appear without the panel (page-colour, with a serif 36px/600 heading). Mobile: `#EBE6D8` panel, 56px date column, serif 28px numerals, 15px titles.

### Event list row (Coming up)
Grid `90px 1fr 240px 150px`, gap 24px, padding 18px 0; date block as above (serif 38px); title 19px/600 + 14px meta; time/place 14px `#3D4B5A` two lines; "ADD TO CALENDAR" small-caps link with 2px maize underline. Month headers are eyebrow labels with 18px top padding. Mobile: flex row, 48px date, 15px title, trailing dark-maize "+" (44px tap target).

### Buttons
- Primary on cream: navy filled, white text, 600, padding 13–14px 24–26px, radius 2px.
- Primary on navy / hero: maize filled, navy text, 700, same padding.
- Secondary: 1.5px navy outline, navy text, 600, padding 11–13px 18–24px, radius 2px.
- Text link: small caps 13px/600/.1em with 2px maize bottom border; or 15–16px white with underline (offset 5px) on photos.

### Panels
Solid `#EBE6D8` blocks, padding 28–36px, no border, optional 4px top rule (maize = featured / navy = standard). Navy panel variant: `#002848` + lattice, white text, maize eyebrow, 4px maize top rule.

## Screens (desktop; mobile is the same content stacked unless noted)

### Home
1. **Hero**: full-bleed navy section with `DSCF2344.png` as a cover image (`object-position: center 35%`), both gradient overlays, inner 1200 grid `1.1fr .9fr`, gap 64px, `align-items: end`, padding `150px 40px 64px`, min-height 640px. Left: eyebrow "SHIA MUSLIM STUDENT COMMUNITY · ANN ARBOR" (13px/600/.16em maize), H1 "A place to learn, connect, and serve." (serif 68px, max-width 600px, `text-wrap: balance`), paragraph 19px `#E2E8EF` max-width 480px, then maize button "Join the members chat" + white underlined text link "Updates only" (gap 22px). Right: the This week panel, bottom-aligned inside the hero (not overhanging). Mobile: hero padding `190px 20px 28px`, H1 42px, one button; This week panel follows below with 16px margin.
2. **Who we are**: 1200 grid `1.1fr .9fr`, gap 64px, `align-items: center`, padding `88px 40px 0`. Left: eyebrow "WHO WE ARE", mission statement as serif 32px/1.3 pull text (copy from `content.json › org.mission`, full sentence starting "The mission of…"), 17px supporting line "A student-run organization, a member of the Muslim Coalition at U-M, and firmly against Islamophobic and anti-Shi'i sentiment.", then **"About ISA" outline button**. Right: `IMG_9246.png`, 100% width, stretch to row height, min-height 380px.
3. **Three-diamond divider**, padding 72px top.
4. **Regular programs**: padding `64px 40px 72px`; header row serif 46px "Regular programs" + "ALL PROGRAMS" small-caps link (dark maize). Grid `repeat(3, 1fr)`, gap `40px 48px`, six items: eyebrow (cadence), serif H3 30px/600, 16px body. No dividers, no cards. Data: `content.json › programs` (`cadence`, `title`, `short`).
5. **Photo row**: grid `repeat(5, 1fr)`, gap 10px, five images 220px tall, cover. Mobile: three 120px images, gap 6px.
6. **Support band**: navy + lattice (.16), padding 80px 40px, grid `1fr 1fr`, gap 64px, centered. Left: eyebrow "SUPPORT ISA" (maize), serif H2 46px "Your support keeps Thursday nights running.", 17px `#DBE3EC` body, maize button "Ways to give" → /support. Right: `100_2894.png` 360px tall, cover.
Footer on Home has **no** lattice.

### Events
- Intro: grid `1fr 320px`, gap 48px, `align-items: end`, padding `72px 40px 40px`. Left: eyebrow, H1 "What's on at ISA", 18px intro. Right (stacked, gap 10px): "Open in Google Calendar" navy filled → `links.calendar_embed` (new tab); "Subscribe (iCal)" outline → `links.calendar_ical`; 12px note "Google Calendar view requires a umich.edu account".
- Two columns (gap 64px, padding 48px 40px 0): left "This week" (serif 36px heading + mono "[week of —]", three rows); right "The weekly rhythm" (serif 36px; three rows grid `170px 1fr`, 16px: bold cadence + program), 14px note, then an `#EBE6D8` panel "Mass Meeting" (eyebrow EACH FALL, serif 28px, 15px body, mono placeholder date).
- "Coming up": serif 36px heading + 13px helper; month eyebrow; event rows as specified; grouped by month.
- Mobile: intro stacked with two full-width buttons; This week rows; Coming up rows; then "The weekly rhythm" (`#EBE6D8`, 4px maize rule) and "Mass Meeting" panels.

### Programs
- Intro: eyebrow, H1 "What a semester at ISA looks like" (max-width 760px), 18px body (max-width 640px), padding `72px 40px 56px`.
- Three **featured program** rows: grid `1fr 1fr`, gap 64px, centered, padding 64px 40px. Image 400px tall cover (P1090361 / 8b4e641d / IMG_7767), alternating left-right-left. Text: eyebrow (cadence), serif H2 48px/500, 17px body (max-width 560px), button row: Thursday → two outline buttons "Discussion resources" (`links.discussion_resources`) and "Request a topic" (`links.request_topic_form`); Tuesday → outline "Suggest a book" (`links.book_club_form`) + mono "[Current book]"; Sisterhood & Brotherhood → two mono placeholders for chat links.
- **Through the year** navy band + lattice: padding 72px 40px, header serif 46px + 14px `#C9D3E0` note; grid `repeat(3,1fr)` gap 48px: eyebrow (maize), serif H3 30px/600, 16px `#DBE3EC` body.
- Bottom two columns (gap 64px, padding `64px 40px 80px`): "Listen / ISA playlist" with small-caps link "OPEN ON YOUTUBE" → `links.playlist`; `#EBE6D8` panel "New here? / Start with a Thursday." with navy button "Join the members chat".
- Mobile: image 220px full width above each program's text (H2 32px); band list stacked; one closing panel.

### Photos
- Intro (eyebrow, H1 "From the last few semesters", 18px "Captions are placeholders. Tag @isahlulbayt to be featured."), padding `72px 40px 40px`.
- Grid `repeat(3, 1fr)`, gap `28px 24px`, padding `48px 40px 80px`. Figure: image 260px cover; caption 13px mono `#5B6B7B`, 10px top padding (no rule). Mobile: 2 columns, 150px images, 10px captions.
- Photos: all files in `assets/photos/`; order in the prototype: IMG_4335, adc8466d, 4db790e4, IMG_2628, 3f3fdbc7, DSCF2344, DSCF2397, DSCF2331, P1090361, P1090378, 8b4e641d, IMG_7767, IMG_7514, IMG_9246, 62c62466, ba459ede, 100_2894, IMG_2637, IMG_2641. Captions placeholder `[Event · term N]` in a data array.

### About
- Intro grid `1fr 420px`, gap 64px, centered, padding `72px 40px 64px`: eyebrow, H1 "The Shia Muslim student community at Michigan", 18px intro; right image `DSCF2344.png` 420px tall.
- Three-diamond divider.
- **Mission**: grid `200px 1fr`, gap 48px, padding 64px 40px. Label "MISSION"; serif 30px/1.35 first paragraph then two 17px paragraphs (`org.mission`, `org.mission_extended`). Copy verbatim.
- Three facts: grid `repeat(3,1fr)`, gap 48px, padding `0 40px 72px`: eyebrow + 16px body (STUDENT-RUN / PART OF THE MUSLIM COALITION / OPEN TO ALL; text in template).
- **Executive board** navy band + lattice, padding 72px 40px: serif 46px "2026-27 Executive Board" + maize underlined email link; grid `repeat(4,1fr)`, gap `8px 32px`; rows: 52px circular striped avatar placeholder (`repeating-linear-gradient(45deg, rgba(255,255,255,.12) 0 5px, rgba(255,255,255,.04) 5px 10px)`), name 16px/600 white, role 13px `#C9D3E0`; text column `flex:1; min-width:0`. Data: `board_2026_27`. Real headshots later.
- Alumni: grid `1fr 1fr`, gap 64px, centered, padding `72px 40px 80px`: eyebrow, serif H2 42px "Graduated? Stay close.", 17px body, outline button "Email the e-board" (mailto); right image `100_2894.png` 340px.
- Mobile: image 240px full-width with 20px side margins; board as single column.

### Join
- Intro (eyebrow, H1 "No application. No dues. Just show up.", 18px), padding `72px 40px 48px`.
- Two panels grid `1fr 1fr`, gap 24px, padding 36px each. Members chat: navy + lattice, 4px maize top rule, eyebrow RECOMMENDED (maize), serif 40px "Members chat", 16px `#DBE3EC` body, maize "Join on WhatsApp →". Updates chat: `#EBE6D8`, 4px navy top rule, eyebrow QUIET OPTION, serif 40px, 16px body, navy "Join on WhatsApp →". Whole panel is the link, new tab.
- Contact row: grid `repeat(3,1fr)`, padding `48px 40px 0`: INSTAGRAM → serif 28px "@isahlulbayt"; EMAIL → serif 24px address (word-break); MAILING LIST → mono "[Sign-up link]".
- What to expect: grid `200px 1fr 1fr 1fr`, gap 40px, padding 56px 40px: serif 36px heading in first column; three items with 17px/600 title + 15px body.
- Two form panels grid `1fr 1fr`, gap 24px, padding `0 40px 80px`: `#EBE6D8`, padding 22px 26px, eyebrow FORM, serif 26px title, trailing arrow → `links.request_topic_form`, `links.book_club_form`.

### Support
- Intro grid `1fr 420px`, gap 64px, centered, padding `72px 40px 64px`: eyebrow, H1 "Your support keeps Thursday nights running.", 18px body, "Donate" navy button + mono "[Zelle · org account pending]"; right image `DSCF2397.png` 420px.
- **What your support enables** navy band + lattice: serif 46px heading; grid `repeat(4,1fr)`, gap 40px: eyebrow (maize), serif H3 28px/600, 15px body. Data: `support_enables`.
- Give once / Give monthly: grid `1fr 1fr`, gap 24px, padding `64px 40px 24px`: `#EBE6D8` panels, padding 32px, 4px navy / maize top rules, eyebrow, serif 32px, 16px body, "Donate" navy filled / "Set up monthly" outline, each with a mono placeholder.
- Two columns (gap 48px, padding `24px 40px 80px`): ORGANIZATIONS AND MOSQUES / IN KIND, 16px body, small-caps mailto links.

## Interactions
- Standard links between routes; active nav underline 2px maize.
- Hover: nav/footer links on navy → `#F8C800`; links on cream → `#8A6D00`; buttons may darken 6%; 150ms color transitions only. Respect `prefers-reduced-motion`.
- External links open in a new tab with `rel="noopener"`.
- Focus rings: 2px maize outline, 2px offset.
- Tap targets ≥ 44px on mobile.

## Events data (calendar integration)
The Google Calendar is restricted to umich.edu accounts, so a public embed shows nothing to outsiders.
1. At build time, fetch `links.calendar_ical` (the organiser must set the calendar to public or "see all event details" for the ICS to be readable; otherwise fall back to `src/data/events.json`).
2. Parse with `node-ical`, expand recurrences, return the next 90 days: `{ title, start, end, location, description, recurring }`.
3. Render "This week" (next 7 days, max 3, featured program first) and "Coming up" (grouped by month).
4. Rebuild on a schedule: Cloudflare Pages deploy hook triggered by a GitHub Actions cron every 12 hours.
5. Empty state (summer / no events): keep the panel and show "No events scheduled yet. Weekly programs resume in [month]. Follow the Updates chat." Never render an empty panel.
6. "Add to calendar": link to the Google Calendar event when available; otherwise generate a per-event `.ics`.
Weekly rhythm text is static. Times and rooms are NOT published on the site ("posted in the Updates chat each semester").

## Placeholders to resolve before launch
Rendered in IBM Plex Mono inside square brackets in the prototype:
- Donate link (Zelle; organisation account pending). Do NOT publish any personal phone number.
- Mailing list sign-up link.
- Sisterhood and brotherhood chat links.
- Current Book Club book.
- Mass meeting date.
- Event dates, times, rooms (from calendar).
- Board headshots; photo captions.
Keep each as a nullable field in `content.json`. In dev render the bracketed mono text; in production hide the element (or the whole panel when it exists only for that link). The Donate button stays visible in production and can point to `/support` until the Zelle link exists.

## Content rules
- Copy from `content.json` verbatim; no em dashes; no invented stats, testimonials or partner names.
- Mission statement text is the org's own and must not be edited.
- Do not publish internal procedures, grant amounts, donor names, or khums details found in `content-sources/`.
- Transliterations as given: Ahlulbayt (AS), Prophet (SAW), Dua Kumayl, Dua Tawassul, Laylatul Qadr, Eid al-Ghadeer, Fatimiyya.

## Assets
- `assets/logo/ISA_Logo_Yellow-Clear.png`: primary mark on navy (header, footer).
- `assets/logo/ISA_Logo_Navy-Clear.png`: for light backgrounds (social cards).
- `assets/logo/ISA_LOGO_NO_WORDS.png`, `Zulfiqar_Transparent_Yellow_New.png`: icon-only variants (favicon / app icon).
- `assets/photos/*.png`: web-sized photos (≤1400px). Use Astro `<Image>`/`<Picture>` with avif/webp output and explicit dimensions.
- `assets/merch/`: reference for a future merch page; not used in release 1.
- Fonts: Cormorant Garamond (400/500/600 + italics), Source Sans 3 (400–700), IBM Plex Mono (400). Self-host via `@fontsource` packages.

## Suggested Astro structure
```
src/
  layouts/Base.astro            (head, fonts, Header, Footer, mobile sticky Join)
  styles/global.css             (tokens as custom properties, .lattice utility, resets)
  components/Header.astro, MobileMenu.astro, Footer.astro, StickyJoin.astro
  components/ThisWeek.astro, EventRow.astro, ProgramItem.astro, Panel.astro, Button.astro, Eyebrow.astro, DiamondDivider.astro, BoardRow.astro, PhotoFigure.astro
  data/content.json             (copy of content.json)
  data/events.json              (fallback / generated)
  lib/calendar.ts               (ICS fetch + parse at build)
  pages/index.astro, events.astro, programs.astro, photos.astro, about.astro, join.astro, support.astro
public/favicon.svg, og.png, _headers
.github/workflows/rebuild.yml   (12h cron → CF deploy hook)
```

## Files
- `screenshots/`: full-page references, desktop and mobile.
- `design/ISA Site v2.dc.html` (+ `support.js`): approved prototype, interactive.
- `design/ISA Site v2.template.html`: readable markup with all inline styles.
- `design/ISA Website Directions.dc.html`: round-1 exploration, historical only.
- `content.json`, `content-sources/`, `assets/`.
