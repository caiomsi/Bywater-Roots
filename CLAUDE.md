# CLAUDE.md — Bywater Roots

Student concept site (DES 2630) for a community garden that does not exist: Bywater Park,
Cottonwood Heights UT. Static HTML/CSS/vanilla JS. `SPEC.md` is the content/design contract.
Hosting: GitHub Pages, live at `caiomsi.github.io/Bywater-Roots` (repo caiomsi/Bywater-Roots, master). 404.html uses `/Bywater-Roots/`-prefixed paths on purpose.

## File ownership
- `css/style.css` and `js/main.js` are SHARED and the component library lives in the index comment at the top of style.css. Page-specific extras go in `css/<page>.css`.
- Header/footer/ridge/icon markup is canonical in `index.html`; copy verbatim and move `aria-current="page"`.

## Tokens
pine #2F4A3A, pine-deep #233A2D, sage #8FA98B, sage-soft #DCE5D7, clay #C46A4A (icons), clay-btn #B85B3C (button fill, AA), clay-ink #A4512F (small text), sunflower #E8B64C, cream #F6F1E7, paper #FFFCF6, charcoal #2B2B2B, muted #5E615B. Fonts: Fraunces (headings), Inter (body).

## Patterns
- Mock forms: `<form data-mock-form data-confirm="Thanks {name}…" data-confirm-title="…">`; JS validates, hides the form and shows a role=status confirmation with "Send another". Tokens `{name}` `{email}` use fields named `name` / `email`.
- Donate tiers: `[data-tier="25"]` buttons sync to `[data-tier-amount]` input and `input[data-tier-radio]` radios.
- Events filter: chips `[data-filter]`, groups/cards `[data-season]`, status `[data-filter-status]`.
- Photo placeholders: `.photo-ph` with `data-photo`; swap per README. Log each new placeholder in README table.
- Required footer disclaimer on every page: "Student concept project — not affiliated with Cottonwood Heights City or CHPRSA."
- Every page: robots noindex, one h1, no JSON-LD, no real names/businesses, no card inputs.

## SEO / share (refined 2026-11-19)
- Every page: canonical + og:url (absolute `https://caiomsi.github.io/Bywater-Roots/...`, none on 404), OG/Twitter tags, share image `images/og-image.png` (1200×630), favicon.ico/svg, apple-touch-icon, `site.webmanifest` + icon-192/512.
- Deliberately NOT added: sitemap.xml, robots.txt, llms.txt, JSON-LD, breadcrumbs. The site is noindex (concept project naming a real city park), and files at `/Bywater-Roots/` aren't at the domain root, where robots.txt and llms.txt must live. If it's ever made indexable, add a sitemap and an Organization schema, never LocalBusiness: the garden doesn't exist.
