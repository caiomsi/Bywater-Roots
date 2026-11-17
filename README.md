# Bywater Roots Community Garden (concept)

A student concept website (DES 2630) for a community garden that does **not exist yet**,
proposed for Bywater Park, Cottonwood Heights, UT. Plain HTML, CSS and vanilla JS. No build step.

*Student concept project — not affiliated with Cottonwood Heights City or CHPRSA.*

## Preview

```
cd Bywater-Roots
python3 -m http.server 8731
# open http://localhost:8731
```

## Swapping in your photos

1. Drop your photo into `images/` using the filename shown in the placeholder (lowercase, hyphenated, compressed JPG).
2. Replace the placeholder `<div class="photo-ph ..." data-photo="...">...</div>` with an image, keeping the shape modifier:

```html
<img class="photo photo--wide" src="images/NAME.jpg" alt="Describe the photo" width="1600" height="900" loading="lazy">
```

Modifiers: `photo--wide` (16:9), `photo--square`, `photo--tall` (4:5), `photo--arch` (hero arch). Use the one matching the placeholder's `photo-ph--*` class.

## Photo placeholders

Every photo placeholder on the site:

| Page | Filename | What to shoot |
|---|---|---|
| index.html | `images/home-hero-raised-beds.jpg` | Raised garden beds in golden-hour light (portrait, ~4:5) |
| index.html | `images/home-intro-neighbors.jpg` | Neighbors planting side by side (square) |
| about.html | `images/about-park-edge.jpg` | The grassy edge of Bywater Park near the playground and pavilion, where the garden would go (16:9) |
| get-involved.html | `images/get-involved-raised-beds.jpg` | A gardener tending a raised bed with young seedlings (portrait, 4:5) |
| get-involved.html | `images/get-involved-build-day.jpg` | Volunteers filling a raised bed with soil on a build day (portrait, 4:5) |
| donate.html | `images/donate-kids-plot.jpg` | Kids watering plants in the learning plot (portrait, 4:5) |
| contact.html | `images/contact-map.jpg` | Map of Bywater Park (3149 E Banbury Rd) with the garden spot marked (16:9) |
