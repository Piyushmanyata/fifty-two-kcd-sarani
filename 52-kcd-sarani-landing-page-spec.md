# BUILD SPECIFICATION — "FIFTY TWO" Landing Page
### Premises No. 52, Krishna Chandra Dey Sarani, New Alipore, Kolkata 700053
### Audience: Claude Sonnet (builder). Read fully before writing any code. Follow exactly.

---

## 0. PROJECT BRIEF — WHAT THIS PAGE MUST DO

A single-page luxury landing site selling **one entire G+4 boutique residential building to a single buyer** (one family, one investor, one name on the deed). This is not a flat listing — the product is the *whole building*. Every design decision must communicate: rarity, weight, permanence, and "this is not for everyone."

The emotional arc of the page, top to bottom:
1. **Awe** (cinematic hero) →
2. **Understanding** (what exactly is being sold) →
3. **Desire** (the vertical tour, floor by floor) →
4. **Justification** (location + investment logic) →
5. **Urgency + Action** (one building, one buyer, contact now).

The user is in Kolkata's premium real estate market. Tone: quiet, assured, old-money. Never shouty. The page whispers because it can.

---

## 1. HARD FACTS — DO NOT DEVIATE, DO NOT INVENT

| Item | Value |
|---|---|
| Address | Premises No. 52, Krishna Chandra Dey Sarani, New Alipore, Kolkata 700053 |
| Jurisdiction | Ward 081, P.S. New Alipore, Borough X, KMC |
| Structure | G+4 (five-storied premium residential building) |
| Floors 1–3 | One 3 BHK per floor, **1,607 sq ft super built-up each** |
| Floor 4 | One 2 BHK + Study, **1,450 sq ft super built-up + private open terrace (21'3" × 13'0")** |
| Total saleable | **6,271 sq ft** across 4 residences |
| Ground floor | Stilt entry, lift lobby, shop unit (12'9" × 14'3"), caretaker booth (12'9" × 5'0"), E.M.S. room, W.C. |
| Parking | **4 covered car parks** |
| Servant quarters | **2 servant quarters** within the ground-floor shop area |
| Lift | Yes (1400 × 1350 lift, all floors) |
| Frontage | KMC black-top road (Krishna Chandra Dey Sarani) |
| Architect | Collage Architects, 1486 Rajdanga Main Road, Kolkata 700107 |
| Sale model | **Entire building only — all floors to one buyer** |
| Price | **Not disclosed. Always "Price on Request." NEVER invent a number.** |
| Maps | https://maps.app.goo.gl/aC4NpSLZWuJ1xaeY8 |

**Floor-plan room data (use in floor-plan section, pulled from architect drawings):**

*Typical floor (1st–3rd), Flat A — 3 BHK:*
- Living/Dining 10'3" × 19'9" · Kitchen 9'9" × 5'6" · Balcony 9'0" × 4'0"
- Bedroom 1: 13'6" × 10'9" · Bedroom 2: 10'3" × 12'9" · Bedroom 3: 10'6" × 12'9"
- Toilets: 7'0" × 6'0", 10'6" × 4'9", 6'9" × 5'9" (with loft above)

*4th floor, Flat B — 2 BHK + Study + Terrace:*
- Living/Dining 15'9" × 11'0" · Kitchen 5'0" × 11'0" · Study 8'0" × 10'9"
- Bedroom 1: 10'0" × 12'9" · Bedroom 2: 9'9" × 10'9"
- Toilets: 6'9" × 6'0", 5'3" × 5'6"
- Open terrace 21'3" × 13'0" at 4th-floor level

**Contact (wire these everywhere as specified in §7):**
- Phone & WhatsApp: **+91 98309 22886**
- Email: **piyushmanyata123@gmail.com**

**Legal note:** Include a small footer line: "All dimensions and areas as per architectural drawings; super built-up areas indicative." If the owner provides a WBRERA registration number later, add it to the footer; if the project is exempt (4 residential units), omit any RERA mention entirely. Do not fabricate one.

---

## 2. TECH STACK & VERCEL OPTIMIZATION

```
Framework:    Next.js 14+ (App Router), TypeScript
Styling:      Tailwind CSS
Animation:    Framer Motion (motion/react) — primary
              Lenis — smooth scrolling (lerp: 0.08)
Fonts:        next/font/google (self-hosted by Next, zero layout shift)
Images:       next/image with priority on hero, lazy elsewhere
Deploy:       Vercel — zero config, standard build
NO Three.js, NO GSAP, NO Lottie, NO video files. All motion = CSS transforms
+ Framer Motion on transform/opacity only. This is the performance contract.
```

**Performance budget (non-negotiable):**
- LCP < 2.5s on 4G. Hero image: `priority`, `quality={75}`, AVIF/WebP via next/image, sized ≤ 220KB.
- Animate **only** `transform`, `opacity`, `clip-path`, `filter: blur` (sparingly). Never animate width/height/top/left.
- `will-change` only on elements currently animating; remove after.
- All scroll reveals via Framer's `whileInView` with `viewport={{ once: true, margin: "-15%" }}` — fire once, never re-trigger (prevents scroll jank).
- Sticky-scroll sections use `useScroll` + `useTransform` (passive, GPU-composited).
- `prefers-reduced-motion`: wrap everything in a `useReducedMotion()` check — if true, all entrances become simple 0.3s fades, parallax disabled, preloader skipped.
- Single page, no client-side routing. Code-split nothing except the floor-plan lightbox.

**File structure:**
```
app/
  layout.tsx        // fonts, metadata, Lenis provider
  page.tsx          // assembles sections in order
  globals.css
components/
  Preloader.tsx
  Navbar.tsx
  Hero.tsx
  Manifesto.tsx
  Offering.tsx      // stats counters
  VerticalTour.tsx  // SIGNATURE — sticky floor stack
  FloorPlans.tsx
  Specifications.tsx
  Location.tsx
  InvestmentCase.tsx
  ContactCTA.tsx
  Footer.tsx
  StickyContactBar.tsx  // mobile only
  ui/MagneticButton.tsx, RevealText.tsx, Counter.tsx, GoldLine.tsx
lib/lenis.tsx, lib/animations.ts  // shared variants & easing
public/images/  // hero render, floor plans, texture assets
```

**Image assets needed (tell the owner):** the 3D render JPG (provided — use as hero), and the three floor-plan pages cropped from the PDF as clean PNGs (ground / typical / 4th). If clean crops aren't available, build the floor-plan section with styled dimension tables instead of images — it must still look premium.

---

## 3. DESIGN SYSTEM

The palette is **derived directly from the building's own facade**: graphite marble window surrounds, warm beige render, exposed brick inlays, and the vertical champagne-gold LED strip. This is the justification — the site is the building, translated.

### 3.1 Color tokens (Tailwind config)
```js
ink:       '#121317',  // page base — deep warm graphite, NOT pure black
slate:     '#1C1E24',  // raised surfaces / cards
marble:    '#2B2E36',  // borders-on-dark, dividers
bone:      '#ECE7DE',  // primary text on dark; light-section background
mist:      '#9BA0A8',  // secondary text
champagne: '#C9A96A',  // THE accent — gold strip. Use surgically (≤5% of any viewport)
brick:     '#B4502E',  // secondary accent from facade brick — eyebrows, hover states only
```
Rule: champagne is for moments of value (numbers, the gold line, key CTAs). Brick is for editorial punctuation (section eyebrows, underlines). Never both in the same element.

### 3.2 Typography (next/font/google)
```
Display:  Marcellus        — Roman-inscription serif, all-caps headlines,
                             letter-spacing 0.02–0.08em. Architectural, engraved.
Body:     Hanken Grotesk   — 300/400/500. Body 16–18px, line-height 1.7.
Accent:   Fraunces (italic, opsz 72) — single editorial italic lines only,
                             e.g. the manifesto pull-phrase. Max 3 uses sitewide.
Data:     Hanken Grotesk w/ font-variant-numeric: tabular-nums for all figures.
```
Type scale (desktop → mobile): Hero `clamp(3.5rem, 9vw, 8.5rem)` · H2 `clamp(2.2rem, 5vw, 4.5rem)` · Eyebrow 11px uppercase tracking 0.25em.

### 3.3 Texture & atmosphere
- Subtle film-grain overlay sitewide: a 3% opacity SVG noise `<div>` fixed full-screen, `pointer-events-none`, `mix-blend-overlay`. (One tiny inline SVG, costs nothing, kills the "flat AI page" look.)
- Hairline dividers: 1px `marble` lines; the **gold vertical line** (see §4 signature motif) is 1px `champagne` with a soft glow (`box-shadow: 0 0 12px rgba(201,169,106,0.35)`).
- Border-radius: 2px max. This building is rectilinear; the site is too.

---

## 4. SIGNATURE MOTIF — "THE GOLD LINE" + "THE VERTICAL TOUR"

**One memorable idea, carried through the whole page:** the thin vertical champagne line from the building's facade becomes the page's spine. It appears in the preloader, draws down through the hero, reappears as the scroll-progress indicator on the left edge of the viewport (desktop), and structures the Vertical Tour. Everything else stays disciplined so this one element owns the memory.

**The Vertical Tour (§6.5)** is the centerpiece section: a sticky-pinned sequence where scrolling moves the visitor *up the building*, ground floor to terrace — mirroring exactly what they're buying: the entire vertical. This is the section that must produce the "shock in awe."

---

## 5. GLOBAL BEHAVIORS

### 5.1 Preloader (skip if reduced-motion)
- Full-screen `ink`. Center: Marcellus numerals counting **G → 1 → 2 → 3 → 4** (each number crossfades up, 180ms apart), beneath a 1px gold line growing 0→100% width over 1.2s, `easeOutExpo`.
- At completion: the word **"FIFTY TWO"** stamps in (opacity 0→1, letter-spacing 0.5em→0.12em, 0.6s), holds 400ms, then the whole preloader exits via `clip-path: inset(0 0 100% 0)` over 0.9s `[0.76, 0, 0.24, 1]` — wiping upward like an elevator departing. Hero animation begins during the last 300ms of the wipe (overlap = "animations flowing into one another").
- Total ≤ 2.6s. Session-storage flag: show once per session only.

### 5.2 Navbar
- Absolute over hero, transparent. Left: "FIFTY TWO" wordmark (Marcellus, 14px, tracking 0.3em). Right (desktop): anchor links — The Building · Residences · Location · Enquire — plus a champagne-outlined "Private Viewing" pill.
- After 100vh scroll: navbar slides in fixed with `ink/85` + `backdrop-blur-md`, 1px bottom marble border. Hide-on-scroll-down, reveal-on-scroll-up (Framer `useMotionValueEvent` on scrollY).
- Mobile: wordmark + hamburger → full-screen overlay menu, links stagger in 60ms apart, 0.5s, y: 24→0.

### 5.3 Scroll progress
- Desktop only: fixed 1px gold line on the left edge, `scaleY` bound to `scrollYProgress` via `useSpring({ stiffness: 80, damping: 25 })`. Origin top. This is the spine motif persisting.

### 5.4 Shared animation vocabulary (lib/animations.ts)
```ts
export const EASE = [0.16, 1, 0.3, 1];            // easeOutExpo — house easing
export const fadeUp = { initial:{opacity:0, y:40}, whileInView:{opacity:1, y:0},
  viewport:{once:true, margin:'-15%'}, transition:{duration:0.9, ease:EASE} };
export const stagger = (i:number) => ({ ...fadeUp,
  transition:{duration:0.9, ease:EASE, delay: i*0.08} });
```
- **RevealText component:** headlines split into lines (not letters — letters read gimmicky at this register); each line wrapped in `overflow-hidden`, inner span animates `y: '110%' → 0`, 1s, stagger 90ms. Use for every H2.
- **Counter component:** numbers animate from 0 with `animate()` + spring, `tabular-nums`, fire on `whileInView once`.
- Images: parallax via `useScroll({ target, offset:['start end','end start'] })` → `y: ['-8%','8%']` on an inner img scaled 1.15. Subtle. Everywhere an image appears.

---

## 6. SECTIONS — IN ORDER, WITH COPY AND MOTION SPECS

Use this copy verbatim unless a fact conflicts with §1. Eyebrows are 11px uppercase `brick` with a 24px brick rule to their left.

### 6.1 HERO — full viewport
**Layout:** Full-bleed building render (`next/image`, `priority`, object-cover). Cinematic dark grade: gradient overlay `ink/70 → transparent 40% → ink/90` top-to-bottom, plus `ink/30` flat wash. Content bottom-left aligned on a 12-col grid, cols 1–8.

**Content:**
- Eyebrow: `NEW ALIPORE · KOLKATA 700053`
- H1 (Marcellus, three stacked lines):
  **ONE BUILDING.**
  **ONE OWNER.**
  **FIFTY TWO.**
- Sub (Hanken 300, mist, max-w 52ch): *A five-storied private residence of 6,271 sq ft on Krishna Chandra Dey Sarani — offered, in its entirety, to a single buyer.*
- Two CTAs: solid champagne "Request the Private Dossier" (→ #enquire) + ghost "Take the Vertical Tour ↓" (→ #tour).
- Bottom-right corner, small mono-style stat strip: `G+4 · 4 RESIDENCES · 4 CAR PARKS · PRICE ON REQUEST`

**Motion (the orchestrated load sequence, begins as preloader wipes):**
1. Render scales 1.12 → 1.0 over 2.2s `EASE` while a `blur(8px) → 0` resolves over 1.2s.
2. The gold line draws **down** the left edge of the content block, `scaleY 0→1`, 1s, delay 0.3s.
3. H1 lines reveal (RevealText), delays 0.5/0.6/0.7s. "FIFTY TWO." line is champagne.
4. Sub + CTAs fadeUp at 1.1s/1.25s. Stat strip fades at 1.5s.
5. Idle: a slow Ken Burns on the render (`scale 1.0→1.05` over 18s, alternate, linear) so the hero never feels static.
6. On scroll: hero content parallaxes up at 0.4× scroll speed and fades by 60vh (`useTransform`), so the next section appears to rise *over* it — flow, not cut.

### 6.2 MANIFESTO — short editorial beat
Dark `ink` section, generous padding (py-40 desktop). Single centered column, max-w-3xl.

**Copy** (Fraunces italic, 28–40px, line-height 1.5):
> *"Most people buy an apartment. A few buy a floor. Almost no one gets to buy the address itself."*

Below, Hanken body, mist:
> Fifty Two is a newly built G+4 boutique residence in the heart of New Alipore — three full-floor 3 BHK homes, a terraced penthouse, four covered car parks, staff quarters and a private street-level unit. It is being offered as a single, indivisible whole. When it sells, it sells once.

**Motion:** word-by-word opacity reveal tied to scroll — split the italic quote into words; each word's opacity maps from 0.15 → 1 across a `useScroll` range so the sentence "develops" as you scroll through it (sticky for ~150vh). This is the one scroll-scrub text effect on the page; don't repeat it elsewhere.

### 6.3 THE OFFERING — stats band
Light inversion: `bone` background, `ink` text (the page breathes; the render's plaster tone). py-32.

Eyebrow: `THE OFFERING`. H2: **The entire vertical, undivided.**

4-column stat grid (2×2 on mobile), each cell: huge Marcellus Counter + small caps label, separated by hairline `ink/15` rules:
- **6,271** — sq ft super built-up
- **4** — private residences
- **4** — covered car parks
- **1** — owner

Beneath, a full-width single row of small line items (horizontal scroll on mobile): `Lift to all floors · 2 staff quarters · Caretaker booth · Street-level commercial unit · Open terrace at 4th floor · KMC frontage road`.

**Motion:** counters spring up on view; hairline rules `scaleX 0→1` 1.2s staggered; section enters with a `clip-path inset` wipe from the hero (the bone block slides up over the dark manifesto — continuous flow).

### 6.4 — (transition) 
20vh of `bone→ink` gradient with the gold spine line passing through it. Cheap, seamless tonal hand-off back to dark.

### 6.5 THE VERTICAL TOUR ★ SIGNATURE SECTION — id="tour"
**Concept:** A pinned, scroll-driven ascent of the building. ~400vh of scroll height; inner content sticky at top. The gold spine line runs through its center.

**Desktop layout:** Left 45%: a stylized vertical **elevation diagram** of the building built in pure HTML/CSS — five stacked rectangles (G, 1, 2, 3, 4) with 1px marble borders on `slate`, the gold line running up their left edge. An elevator indicator (small champagne square) travels up the line as you scroll. Right 55%: floor detail panel that crossfades per floor.

**Scroll mapping (`useScroll` on the 400vh wrapper → 5 segments):**
| Segment | Floor lit | Right panel content |
|---|---|---|
| 0–15% | **GROUND** | "Arrival." — Stilt entry & lift lobby, caretaker booth, E.M.S., street-level shop unit with two staff quarters, four covered car parks. |
| 15–35% | **FIRST** | "Residence One — 3 BHK · 1,607 sq ft" + room list (from §1) |
| 35–55% | **SECOND** | "Residence Two — 3 BHK · 1,607 sq ft" — *Identical bones. Different light.* |
| 55–75% | **THIRD** | "Residence Three — 3 BHK · 1,607 sq ft" |
| 75–100% | **FOURTH** | "The Penthouse — 2 BHK + Study · 1,450 sq ft" + **Private open terrace, 21'3" × 13'0"** highlighted in champagne |

**Floor states:** active floor rectangle = border turns champagne, interior fills `champagne/8`, its label scales 1→1.06; inactive floors dim to 35% opacity. Right panel: outgoing content `opacity→0, y→-24` (0.4s), incoming `opacity 0→1, y 24→0` (0.6s, EASE) — keyed by active index, `AnimatePresence mode="popLayout"`.
At the final segment, the terrace: a thin glass-balustrade line on the diagram glints (a 1px gradient sweep animation, once).

**Mobile:** drop the pin. Render as five full-width cards in sequence, each with the mini-diagram on top (current floor lit) and the detail below, standard fadeUp. Pinned scroll on mobile is where lag lives — do not attempt it.

**Exit:** as the tour wrapper ends, the elevation diagram scales down to 0.9 and fades while the next section's heading rises beneath it — another overlap transition.

### 6.6 RESIDENCE PLANS — id="residences"
`slate` background. Eyebrow: `THE RESIDENCES`. H2: **Drawn by Collage Architects.**

Tab switcher (three tabs, Marcellus small caps): `GROUND` · `TYPICAL 1–3` · `PENTHOUSE`. Active tab underlined by a gold rule that slides between tabs via Framer `layoutId="tab-rule"` (shared layout animation — buttery).

Each tab: floor-plan image (if provided) inside a 1px marble frame on `ink`, with parallax-on-scroll, click-to-open lightbox (dynamic import). Beside it (stacked below on mobile), a dimension table — two columns, hairline rows, tabular numerals — listing every room from §1. Footer microcopy: *"All areas super built-up. Dimensions per architectural drawings."*

A quiet champagne text link: "Request full drawings on WhatsApp →" (deep-links per §7 with prefilled text "I'd like the complete floor plans for 52 KCD Sarani.").

### 6.7 LOCATION — id="location"
`ink`. Eyebrow: `NEW ALIPORE`. H2: **An address that needs no introduction.**

Two-column: left, copy —
> New Alipore has spent six decades as one of South Kolkata's most quietly coveted addresses — tree-lined avenues, an established residential character, and minutes from Alipore, Behala, and the arterial routes to the airport and business districts. Krishna Chandra Dey Sarani sits inside its calm interior grid: a KMC-maintained frontage on a street that doesn't pass through, it arrives.

(Keep claims general and safe — do not invent specific distances/times.)

Right: a framed interactive element — either an embedded Google Map iframe (lazy-loaded, `loading="lazy"`, dark style if possible) or a styled static card with a large "Open in Google Maps ↗" champagne button linking to `https://maps.app.goo.gl/aC4NpSLZWuJ1xaeY8`. Prefer the card + button: zero third-party weight, no layout shift, on-brand.

### 6.8 THE INVESTMENT CASE
`bone` light section again (rhythm: dark–light–dark–light). Eyebrow: `THE CASE`. H2: **Why a whole building changes the mathematics.**

Three editorial columns (stack on mobile), hairline-separated, no icons (icons cheapen this register):
1. **Total control.** No society, no committee, no shared decisions. One owner sets the rules for 6,271 sq ft — occupy it, rent it floor by floor, or hold it whole.
2. **Built, not promised.** A brand-new G+4 structure with lift, parking and staff infrastructure already in place. No redevelopment risk, no waiting on possession of someone else's timeline.
3. **A compound for one family.** Three full-floor 3 BHKs and a terraced penthouse under one roof — generations together, doors apart. These configurations almost never reach the open market in New Alipore.

Closing line beneath, Fraunces italic, centered: *"Assets like this don't list often. They change hands quietly — usually before anyone hears."*

**Motion:** columns stagger in; the vertical hairlines between them draw `scaleY 0→1`.

### 6.9 ENQUIRE — id="enquire" — THE CONVERSION SECTION
`ink`, full-viewport-height feel, py-40. Centered.

- Eyebrow: `PRIVATE VIEWING`
- H2 (large): **One building. One conversation.**
- Sub: *Viewings are by appointment and the dossier is shared on request. If the vertical tour held your attention, the building will hold it longer.*

**Three contact cards** in a row (stack mobile), each a `slate` card with 1px marble border, hover: border → champagne + `translateY(-4px)`, 0.3s:

| Card | Label | Action (exact href) |
|---|---|---|
| WhatsApp | "Message now — fastest response" | `https://wa.me/919830922886?text=Hello%2C%20I%27m%20interested%20in%20the%20full%20building%20at%2052%20Krishna%20Chandra%20Dey%20Sarani%2C%20New%20Alipore.%20Please%20share%20details.` |
| Call | "+91 98309 22886" | `tel:+919830922886` |
| Email | "piyushmanyata123@gmail.com" | `mailto:piyushmanyata123@gmail.com?subject=Enquiry%20%E2%80%94%2052%20KCD%20Sarani%2C%20New%20Alipore` |

All open in new tab where applicable (`target="_blank" rel="noopener"` for wa.me). Buttons are **MagneticButton** on desktop: pointer-tracking translate up to 6px toward cursor, spring back on leave (`useSpring`, stiffness 150, damping 12). Disable on touch.

No contact form. Forms add friction and a backend; direct links convert faster for this market. (If the owner later wants lead capture, a follow-up with a serverless route can add it.)

### 6.10 FOOTER
Hairline top border. Three rows, mist 13px:
- "FIFTY TWO — Premises No. 52, Krishna Chandra Dey Sarani, Ward 081, Borough X, KMC, Kolkata 700053"
- "Architectural consultants: Collage Architects, Kolkata · All dimensions and areas as per architectural drawings; super built-up areas indicative. Price on request."
- Repeat contact links inline. Small gold line, centered, 40px wide — the spine's full stop.

### 6.11 STICKY MOBILE CONTACT BAR
Mobile only (`md:hidden`), fixed bottom, `ink/90` blur, safe-area-inset padding. Two buttons: **WhatsApp** (solid champagne, ink text) + **Call** (ghost). Appears after the user scrolls past the hero (translateY 100%→0, 0.4s). This is the highest-converting element on the page — do not omit it.

---

## 7. METADATA, SEO, OG

```ts
export const metadata = {
  title: 'FIFTY TWO — Entire G+4 Building for Sale | New Alipore, Kolkata',
  description: 'A five-storied premium residential building at 52 Krishna Chandra Dey Sarani, New Alipore — 6,271 sq ft, four residences, four car parks. Offered in its entirety to a single buyer. Price on request.',
  openGraph: { images: ['/og.jpg'] },  // crop of the hero render, 1200×630, dark-graded with "FIFTY TWO · NEW ALIPORE" set in Marcellus
}
```
Add JSON-LD `RealEstateListing` schema with address, no price. Viewport theme-color `#121317`.

---

## 8. BUILD ORDER & SELF-CHECK (for Sonnet)

1. Scaffold Next + Tailwind + fonts + Lenis + tokens. Verify fonts render (Marcellus caps, Hanken body) before anything else.
2. Build static layout of ALL sections with final copy — no animation. Check mobile at 375px and desktop at 1440px.
3. Add the shared animation vocabulary (§5.4), then section entrances top-to-bottom.
4. Build the Vertical Tour last on desktop, then its mobile card fallback.
5. Preloader + hero sequence + overlap transitions.
6. Reduced-motion pass, Lighthouse pass (target: Performance ≥ 90 mobile), tap-target check on contact bar.
7. **Mirror check (Chanel rule):** remove one effect. If two scroll-scrub sections exist, cut one. If champagne appears in more than ~5% of any viewport, dial it back. The page should feel expensive because of restraint, not despite it.

**Failure modes to avoid:** pinned scroll on mobile (lag), animating layout properties (jank), inventing a price (legal/credibility), more than one accent per element, letter-by-letter headline splits (gimmick), any stock photography (only the real render and real plans — authenticity is the luxury).
