# Roadmap

Ideas and planned features that are not built yet. When one is built, record how it was done in `DECISIONS.md` and remove it from here.

Each item notes who suggested it and when.

## Events and photos

- **Link photos to events.** Clicking a past event shows its photos; viewing a photo shows which event it is from. Could also be done as albums (one per event) on the Photos page. Needs: an event id or name on each photo in `src/data/photos.ts`, and photos from recent events. *Suggested by Mahdi Rizk, 2026-10-16.*
- **More descriptive events.** Show each week's discussion topic and the actual activity for socials (for example "Brotherhood: bowling" instead of "Brotherhood Event"). Best done by writing that detail into the Google Calendar event title or description going forward; past events can be updated there too. Mahdi to supply past discussion titles and activities. *Suggested by Mahdi Rizk, 2026-10-16.*
- **Easier-to-scan past events list.** Thin horizontal rules between rows on `/events/past/` only, styled to fit the site (for example a 2px cream-dark rule rather than a grey hairline). This is a deliberate exception to the "no hairlines" design rule for a dense, table-like page. *Suggested by Mahdi Rizk, 2026-10-16.*

## Site

- **Custom domain** (`isahlulbayt.com`, with `.org` redirecting). Steps in README.md › Moving to a custom domain.
- **Search setup after the domain move:** sitemap, `robots.txt`, structured data describing ISA, home page title that includes "Shia Muslim student organization", Google Search Console, and links from Maize Pages and Instagram to the new domain.
- **Board headshots** in place of the striped placeholders, for members who want one.
- **Online giving through an ISA-owned account,** replacing the temporary personal Venmo (see D-008, D-018).
