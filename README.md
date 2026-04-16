# AgriPro Website - Operator Handoff Notes

**Client:** Agricultural Professionals Ltd. (AgriPro)  
**Build date:** 2026-04-16  
**Status:** First draft - ready for client review

---

## Deployment (GitHub Pages)

1. Push this repository to GitHub
2. In repo Settings → Pages → Source: `main` branch, `/ (root)`
3. Add `CNAME` file already present (contains `agriproltd.com`)
4. Point client's DNS: `A` records to GitHub Pages IPs, or `CNAME` to `<username>.github.io`
5. GitHub auto-provisions HTTPS via Let's Encrypt

---

## Before Launch - Required Swaps

Search the HTML for `PLACEHOLDER` comments. Each marks an image that must be replaced with client-supplied photography.

| Item | Location | Action |
|---|---|---|
| Hero carousel images | `index.html` - `.hero__slide` background-images | Replace 4 Unsplash URLs with client farm/product photos |
| About section image | `index.html` - `about__img` | Swap with client team or farm photo |
| Scotch Bonnet crop image | `index.html` - `crop__img` | Swap with client pepper photograph |
| News card images (×3) | `index.html` - `.news-card__img` | Swap with client photos or relevant imagery |
| Logo | `assets/logo.png` | Add client logo file |
| Favicon | `assets/favicon.png` | Add client favicon |

---

## Second-Pass Refinements (after client call / intake form)

- **What's New** cards: replace assumed updates with real current news from the client
- **Future Projects** cards: replace assumed project names with confirmed project names and descriptions
- **FAQ**: retain good-fit questions; add any new ones from the call transcript
- **About stats** (2×2 grid): replace `JA / KGN` stat cards with specific milestones once the client provides them (e.g. years in operation, clients served)

---

## Analytics

Add GA4 (or preferred analytics) before launch. Paste the `<script>` tag just before `</head>` in `index.html`.

---

## CTA Mode

Currently set to **email** (`CTA_MODE = email`). All primary CTAs use `mailto:admin@agriproltd.com`.  
If the client wants WhatsApp as the primary CTA in future, supply a WhatsApp number and update all `mailto:` links to `https://wa.me/[number]?text=[message]`.

---

## Upsell Opportunities (for future proposals)

- Gallery / farm imagery section
- Dedicated crops or products page
- News / blog archive
- Export market information page
- Careers page
- Partner logos strip
- Lead capture form / request-a-call
