# Bywater Roots — Build Spec (the contract)

Student concept site for a university design course (DES 2630). A community garden
that does **not exist yet**, proposed for Bywater Park, Cottonwood Heights, UT. It must
look like a real, polished nonprofit site. Plain static HTML + CSS + vanilla JS, no
build step, no frameworks, no external JS. Must work from `python3 -m http.server`.

## Non-negotiables

- Every page's footer ends with the line, verbatim:
  **"Student concept project — not affiliated with Cottonwood Heights City or CHPRSA."**
- Forms submit nowhere. On submit: `preventDefault()`, run native validation
  (`form.reportValidity()`), then swap the form for a friendly confirmation panel
  (role="status", focus moved to it) that names what they signed up for. A
  "Send another" button restores the reset form.
- No invented facts about the real park/city beyond what's in this spec. No real
  business names, no real people's names, no JSON-LD, no ratings.
- `<meta name="robots" content="noindex">` on every page (mock of a real place).
- Fully responsive 360px → 1440px, no horizontal scroll at any width.
- Accessible: semantic landmarks, one `<h1>` per page, labelled inputs, visible
  focus rings, `prefers-reduced-motion` respected, skip link, AA contrast.

## Files (who owns what)

```
index.html  about.html  get-involved.html  events.html  donate.html  contact.html  404.html
css/style.css     ← SHARED. Owned by the foundation agent ONLY.
css/<page>.css    ← optional, page-specific additions; created by a page agent, linked only from that page
js/main.js        ← SHARED. Owned by the foundation agent ONLY.
favicon.svg
images/           ← empty; the student drops photos here later
README.md         ← photo-swap guide (list of every placeholder)
```

Page agents MUST NOT edit `css/style.css` or `js/main.js`. If they need styling that
the shared library lacks, they put it in `css/<page>.css` using the shared tokens.

## Design language — "Wasatch & Raised Beds"

Warm, earthy, approachable; Wasatch mountains meet backyard gardens. Not corporate.
Think a well-made seed packet and a hand-drawn trail map — refined, not cartoonish.

### Tokens (define on `:root` in style.css)

| Token | Value | Use |
|---|---|---|
| `--pine` | `#2F4A3A` | Primary: headings, header/footer bg, dark bands |
| `--pine-deep` | `#233A2D` | Footer bg, hover on pine |
| `--sage` | `#8FA98B` | Secondary: illustration fills, tags, soft borders |
| `--sage-soft` | `#DCE5D7` | Tinted section backgrounds |
| `--clay` | `#C46A4A` | Accent: primary buttons, icons |
| `--clay-ink` | `#A4512F` | Clay for small TEXT on cream (links) — AA contrast |
| `--sunflower` | `#E8B64C` | Highlights: date stamps, underline swashes, badges (charcoal text on it) |
| `--cream` | `#F6F1E7` | Page background |
| `--paper` | `#FFFCF6` | Cards, form panels |
| `--charcoal` | `#2B2B2B` | Body text |
| `--muted` | `#5E615B` | Secondary text |
| `--line` | `#E4DBC8` | Hairlines on cream |

Primary buttons: clay bg, white text, weight 700, ≥1.0625rem. Hover → `--clay-ink`.
Secondary buttons: pine outline on light, cream outline on pine.
Shadows tinted pine (`rgba(47,74,58,.10)`), never gray-black.

### Type

Google Fonts: **Fraunces** (opsz axis; 500/600/700 + italic 500) for headings;
**Inter** (400/500/600/700) for body/UI.
`h1 clamp(2.5rem, 6vw, 4.5rem)` · `h2 clamp(1.9rem, 4vw, 2.8rem)` · `h3 1.35rem` ·
body `1.0625rem / 1.65`. Eyebrow label above section titles: Inter 600, 0.8rem,
letter-spacing .14em, uppercase, clay-ink, with a small sprout icon.
Italic Fraunces for one emphasized word in a headline, underlined with a hand-drawn
sunflower SVG swash.

### Signature motifs (use consistently, sparingly)

1. **Ridgeline divider** — a layered SVG mountain silhouette (2–3 overlapping ridges
   in pine / sage / sage-soft) used at the bottom of the hero and above the footer.
   One reusable `.ridge` component.
2. **Seed-packet cards** — event cards have a sunflower "date stamp" block (month
   abbrev + big day number) on the left, like a stamp on a seed packet.
3. **Bed-grid texture** — very subtle repeating grid (raised-bed plan feel) as a
   background on `.section--grid`, low-opacity sage lines.
4. **Line icons** — inline SVG, 1.75px stroke, `currentColor`, rounded caps, 24px
   viewBox. Set: sprout, carrot/veg, people/neighbors, bee/flower, calendar, clock,
   map-pin, watering-can, shovel, heart, mail, phone, check, leaf, sun, compost/recycle,
   accessible (wheelchair), child, handshake, school, gift, camera. Define them once in
   a commented "ICON LIBRARY" block at the bottom of index.html (inside a hidden
   `<template id="icon-library">`) so page agents copy exact markup.

### Photo placeholders (the student swaps in their own photos)

Component `.photo-ph`: a box with a soft sage diagonal-hatch background, dashed
`--sage` border, rounded 16px, a camera icon, and a two-line label:
**"PHOTO: <what goes here>"** and a monospace suggested filename, e.g.
`images/home-hero-raised-beds.jpg`. Aspect modifiers: `.photo-ph--wide` (16/9),
`--square` (1/1), `--tall` (4/5), `--hero` (fills hero area). Every placeholder
carries `data-photo="images/<name>.jpg"`. Filenames lowercase-hyphenated.

### Layout

Max content width 1180px, side gutter `clamp(1rem, 4vw, 2rem)`.
Section rhythm `clamp(4rem, 9vw, 7rem)`. Radius 16px cards, 999px pill buttons.
Alternate section backgrounds cream / sage-soft / paper; one pine band per page max
(besides footer).

## Shared chrome (identical on every page)

**Header** (sticky, cream with blur, hairline bottom border on scroll):
logo left — an inline SVG mark (sprout rising from a ridge line inside a circle, pine
+ clay) + wordmark "Bywater Roots" in Fraunces 600 with "COMMUNITY GARDEN" in tiny
Inter caps below. Nav right: Home · About · Get Involved · Events · Contact &
FAQ, then a clay **Donate** pill button. `aria-current="page"` on the active link
(styled with a sunflower underline). Below 900px: hamburger button
(`aria-expanded`, `aria-controls`) opening a full-width panel; Esc closes; body
scroll locked while open.

**Footer** (pine-deep, cream text, ridge divider on top):
col 1 logo + tagline "Grow together, right down the street." + one-line mission;
col 2 "Visit" — Bywater Park, 3149 E Banbury Rd, Cottonwood Heights, UT 84121;
col 3 links (all pages); col 4 newsletter mini-form (email + button).
Bottom bar: "© 2026 Bywater Roots Community Garden (concept)" and the required
disclaimer line, both small.

## Content facts (single source of truth)

- Name: **Bywater Roots Community Garden**. Tagline: **"Grow together, right down the street."**
- Location: Bywater Park, 3149 E Banbury Rd, Cottonwood Heights, UT 84121 — a
  neighborhood park managed by Cottonwood Heights Parks & Recreation, surrounded by
  homes, with a playground, baseball fields, tennis court, pavilion, picnic tables,
  restrooms and parking; near the Cottonwood Heights Recreation Center.
- Concept: turn an underused grassy edge of the park into a garden with raised beds
  (incl. ADA-height accessible beds), a kids' learning plot next to the playground,
  a pollinator/native-plant strip, a compost station, and a shaded gathering area by
  the pavilion.
- Audience: families with kids, retirees, neighbors without yard space, local schools
  and scouts.
- Season: plots April–October; winter workshops at the Rec Center.
- Contact (mock): hello@bywaterroots.org · (801) 555-0142.
  Volunteer office hours (in season): Saturdays 9 AM–12 PM at the garden shed.
  Garden open dawn to dusk, April–October.
- Plot pricing (per season): **4×8 bed $30**, **4×12 bed $40**, **ADA-height
  accessible bed $30** (priority for gardeners who need it). Scholarships available —
  pay what you can, no questions asked. Water + shared tools included.
- Giving tiers: **$25** Seeds (a season of seeds for the kids' plot) · **$75** A tool
  kit · **$250** A raised bed · **$1,000** Sponsor a bed with a name plaque.

### Events (dates verified — use exactly)

| Season | Event | Date | Time | Where | Blurb idea |
|---|---|---|---|---|---|
| Winter | Winter Seed-Starting Workshop | Sat, Feb 20, 2027 | 10:00–11:30 AM | Cottonwood Heights Recreation Center | Start tomatoes & peppers indoors; take home a seed tray |
| Winter | Garden Planning Night | Thu, Mar 11, 2027 | 6:30–8:00 PM | Rec Center | Map your bed, companion planting, Utah frost dates |
| Spring | Volunteer Build Day #1 | Sat, Mar 27, 2027 | 9:00 AM–1:00 PM | Bywater Park | Build & fill raised beds; tools and lunch provided |
| Spring | Volunteer Build Day #2 | Sat, Apr 10, 2027 | 9:00 AM–1:00 PM | Bywater Park | ADA beds, compost station, pollinator strip prep |
| Spring | Spring Opening Day | Sat, Apr 17, 2027 | 10:00 AM–2:00 PM | Bywater Park pavilion | Plot hand-off, ribbon cutting, seedling swap |
| Spring | Pollinator Planting Party | Sat, May 15, 2027 | 9:00–11:00 AM | Pollinator strip | Plant native flowers for bees & butterflies |
| Summer | Kids' Garden Club | Wednesdays, Jun 2 – Aug 11, 2027 | 4:00–5:00 PM | Kids' plot by the playground | Weekly hands-on lessons, ages 5–12 |
| Fall | Harvest Festival | Sat, Sep 25, 2027 | 11:00 AM–3:00 PM | Bywater Park pavilion | Potluck, produce swap, kids' scarecrow contest |
| Fall | Put the Garden to Bed | Sat, Oct 23, 2027 | 9:00 AM–12:00 PM | Bywater Park | Season wrap-up, cover crops, compost turn |

## Pages

1. **index.html — Home.** Hero: eyebrow "A community garden for Bywater Park",
   h1 "Grow together, right down the street." (italic-swash on one word), short
   subline, buttons **Get Involved** (→ get-involved.html, clay) and **Donate**
   (→ donate.html, outline), hero photo placeholder, ridge divider. "What is Bywater
   Roots?" intro (2 short paragraphs + small photo). 3 highlight cards: **Grow Food /
   Meet Neighbors / Support Pollinators** (icon, title, 2 lines, link). Upcoming
   events preview: next 3 events as seed-packet cards + "See all events". Quote /
   testimonial placeholder: large Fraunces italic quote, attribution "— A future
   gardener on Banbury Rd" plus a tiny "placeholder quote" tag. Newsletter signup
   band (pine band): heading, line, email field + Subscribe.
2. **about.html — About Us.** Page hero (smaller). Mission statement (big pull-
   statement). The story: why this park, why this neighborhood (use the park facts).
   Garden features list (6 items with icons: raised beds, ADA-height beds, kids'
   learning plot, pollinator/native strip, compost station, shaded gathering area).
   **Map/layout**: an inline-SVG illustrated concept site plan (not to scale) showing
   the playground, pavilion, kids' plot beside playground, rows of raised beds, ADA
   beds near the path/parking, pollinator strip along the edge, compost station,
   shaded gathering area; numbered pins + legend; caption "Concept layout — not to
   scale." Our Values: Inclusive / Sustainable / Neighbor-run (3 cards).
3. **get-involved.html — Get Involved.** Intro + 3 path cards linking to anchors
   (#rent, #volunteer, #partner). **Rent a Plot**: pricing cards (3 options + a
   scholarship note), form: name, email, plot size (radio 4×8 / 4×12), accessible
   bed (radio yes/no), optional notes. **Volunteer**: form with name, email, interest
   checkboxes (Build days, Kids' Garden Club helper, Compost crew, Pollinator strip,
   Events & festivals, Watering rotation), availability select. **Partner With Us**:
   for schools, scouts & businesses — 3 partnership ideas (field trips/class plots,
   scout service projects, business sponsorship) + short form (org name, contact
   name, email, type select, message).
4. **events.html — Events.** Page hero, season filter chips (All / Winter / Spring /
   Summer / Fall — JS filtering, works with all visible if JS off), events grouped
   under season headings as seed-packet cards: date stamp, title, time, place (icons),
   description. "Add to calendar" is NOT needed. Bottom CTA: volunteer at build days.
5. **donate.html — Donate.** Why donations matter (3 short points with icons + a
   simple "where $1 goes" bar visual: e.g., beds & soil 45%, tools & water 25%, kids'
   programs 20%, compost & pollinators 10% — label as a planned budget). Giving tiers
   as 4 selectable cards (clicking one fills the form amount). Mock donation form:
   amount (tier radios + custom), one-time/monthly toggle, name, email, "dedicate this
   gift" optional, a clearly mock card area that says "Payment is disabled in this
   concept demo" (NO card number inputs). Confirmation on submit. "Business
   sponsors" section: 6–8 placeholder logo tiles (neutral monogram shapes with
   "Sponsor logo" text), plus a "Become a sponsor" link to get-involved.html#partner.
6. **contact.html — Contact & FAQ.** Contact form (name, email, topic select,
   message). Location & hours card (address, garden hours, office hours, email,
   phone) + a map placeholder (`.photo-ph` labelled "MAP: Bywater Park location").
   FAQ: 6 items as `<details>` accordions: Do I need experience? · Is water provided?
   · Can kids participate? · What does a plot cost / are scholarships available? ·
   Are there accessible beds? · What happens in winter?
7. **404.html** — friendly "This row hasn't been planted yet" with link home.

## JS (js/main.js, shared)

Guard every lookup. Features: mobile nav; header scrolled state; footer year;
generic form handler for every `form[data-mock-form]` using a `data-confirm`
attribute for the confirmation text (+ optional `data-confirm-title`); donate tier
→ amount sync (`[data-tier]`); events filter (`[data-filter]` chips +
`[data-season]` groups); gentle reveal-on-scroll (IntersectionObserver, disabled
under reduced motion; content visible without JS).
