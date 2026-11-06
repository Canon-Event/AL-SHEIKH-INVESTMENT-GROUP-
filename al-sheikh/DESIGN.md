---
name: Al Sheikh Investment Group
description: An image-led corporate system in deep blue-black, pale stone and restrained brass.
colors:
  ink: "#101e26"
  paper: "#f7f6f2"
  stone: "#eeede7"
  brass: "#c7a678"
  brass-light: "#dfc8a6"
  muted: "#5f6a6c"
  line: "#d7d9d3"
  light-line: "#ffffff29"
  focus: "#90612a"
  dark-hover: "#2d414b"
  active-marker: "#987243"
  field-line: "#a9b4ae"
  field-placeholder: "#68716e"
  field-focus: "#8a6130"
  white: "white"
typography:
  display:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "clamp(64px, 6.3vw, 96px)"
    fontWeight: 400
    lineHeight: 1.11
    letterSpacing: "-0.04em"
  page-headline:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "clamp(48px, 5.4vw, 80px)"
    fontWeight: 400
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "clamp(36px, 3.8vw, 56px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  editorial:
    fontFamily: "Gloock, Georgia, serif"
    fontWeight: 400
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "25px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  supporting:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.85
  button:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
  action-link:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  caption:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 400
  field:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  square: "0"
  circle: "50%"
spacing:
  compact: "12px"
  control: "16px"
  small: "20px"
  image-gap: "22px"
  medium: "24px"
  row-gap: "30px"
  heading-gap: "35px"
  panel: "40px"
  section-small: "50px"
  section-mobile: "55px"
  section-medium: "65px"
  section: "80px"
  section-large: "90px"
  section-wide: "110px"
  gutter: "clamp(24px, 6.25vw, 104px)"
components:
  button-brass:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "16px 23px"
  button-brass-hover:
    backgroundColor: "{colors.brass-light}"
    textColor: "{colors.ink}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "16px 23px"
  button-dark-hover:
    backgroundColor: "{colors.dark-hover}"
    textColor: "{colors.paper}"
  text-link:
    backgroundColor: "transparent"
    typography: "{typography.action-link}"
    padding: "7px 0"
  nav-cta:
    backgroundColor: "transparent"
    textColor: "{colors.brass-light}"
    rounded: "{rounded.square}"
    padding: "11px 18px"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.square}"
    padding: "10px 0 11px"
    width: "100%"
  product-tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "9px 16px"
  gallery-filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "9px 14px"
  gallery-filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  capability:
    typography: "{typography.supporting}"
    padding: "28px 0 30px"
  business-row:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "18px 0"
  enquiry-panel:
    backgroundColor: "{colors.stone}"
    rounded: "{rounded.square}"
    padding: "42px 40px"
---

# Design System: Al Sheikh Investment Group

## Overview

**Creative North Star: "The Commodity Exchange Bulletin"**

A global trading group's breadth becomes tangible through real photographs, direct business names and a precise typographic index. Blue-black establishes corporate weight; Paper and Stone open the reading surfaces; Brass connects actions to the retained gold seal.

The system is spacious and editorial. Hanken carries information and interaction; Gloock adds deliberate contrast inside substantial headlines. Thin rules organize open columns, while rectangular photographs show the group's places, materials and activities. Motion explains a state or gives an image a restrained arrival.

**Key Characteristics:**

- Image-led discovery using preserved company assets.
- Blue-black, pale surfaces and a deliberate brass accent.
- Direct sans-serif type with selective editorial serif phrases.
- Rectangular actions, thin rules and generous open columns.
- Native controls, visible keyboard focus and responsive reflow.

Recorded from the finished code-first build; no approved image comp exists. Ground truth: `src/styles.css`, `src/build.mjs`, `src/app.js`, `src/data.mjs`, `dist/index.html` and the desktop/mobile home, about and contact review screenshots. Source CSS/JS match their distribution copies. The final review fix list is resolved; no standards certification is implied.

## Colors

Frontmatter preserves the source colors. The sidecar's generated tonal strips are preview metadata, not extra application colors.

### Primary

- **Brass:** Filled business actions, conversation band, selection and navigation rules; echoes the original seal.
- **Light Brass:** Brass-action hover, selected home headline emphasis, dark-surface links and selected focus contexts.
- **Active Brass Marker:** Small vertical marker on the selected business row, paired with indentation and a filled arrow.

### Neutral

- **Ink / Paper / Stone:** Corporate structure and main text / default page and pale text / exploration, capabilities, form panel and image placeholders.
- **Muted / Line / Light Line:** Supporting reading / pale-surface dividers / translucent dark-surface dividers.
- **Dark Hover / Focus:** Dark-action hover fill / default light-surface keyboard outline.
- **Field Line / Placeholder / Focus:** Native-field underline, hint and focused underline.
- **White:** Selected gallery filters and selected photographic/footer text.

**The Surface Contrast Rule.** Use pale text on blue-black structural surfaces and Ink text on pale or Brass surfaces. Preserve the existing scrims wherever text overlays photography.

## Typography

**Display and body:** Hanken Grotesk, registered as `Hanken`, with Arial and sans-serif fallbacks. Local faces cover 400, 500, 600 and 700; the visible hierarchy mainly uses 400/500 and the wordmark uses 600. **Editorial:** Gloock, Georgia, serif at 400. All faces use `font-display: swap`; there is no mono family.

The frontmatter owns the base roles. Gloock phrases inherit their heading's size and line height. Headings balance wrapping, paragraphs use pretty wrapping, and labels stay in sentence case; uppercase lettering belongs to the wordmark.

| Role | Final responsive implementation |
| --- | --- |
| Home display | Base in frontmatter; at ≤1100px: `clamp(60px, 7.5vw, 82px)`; ≤800px: `clamp(45px, 7.6vw, 64px)` / 1.14; ≤540px: `clamp(37px, 9.3vw, 52px)` / 1.2. The last two use -0.035em tracking. |
| Inner-page headline | Base in frontmatter; ≤800px: `clamp(42px, 6.8vw, 60px)`; ≤540px: `clamp(35px, 9.2vw, 49px)` / 1.18. |
| Division headline | `clamp(50px, 5.2vw, 76px)` / 1.15 at 400; ≤800px: 56px; ≤540px: `clamp(39px, 11vw, 55px)` / 1.16. |
| Section headline | Base in frontmatter; ≤800px: 40px; ≤540px: 38px. Purpose headings are substantive sentences at 33px/1.3, then 28px at ≤800px; the final rule overrides an earlier small value. |
| Business title | Base in frontmatter; ≤1100px: 20px; ≤800px: 17px; ≤540px: 20px. |
| Lead | Reusable base in frontmatter; group intro uses 27px/1.45, division intro 24px/1.55; phone values are 23px/1.45 and 20px/1.6 respectively. |
| Reading | Base 16px/1.65; supporting paragraphs typically 14–15px with 1.8–1.95 leading and component widths of 410–560px. Final phone overrides set primary section copy to 14px. |
| Interface | Buttons 14px/1.5 at 500; text links 14px/1.4 at 400; desktop navigation 14px, mobile-menu navigation 22px/1.4. Labels 12px, captions commonly 11px. Phone labels/consent are 12px; phone inputs are 16px/1.6. |

**The Two Voices Rule.** Keep Hanken on information and interaction; reserve Gloock for deliberate headline phrases. Keep navigation, fields and body copy in Hanken.

## Layout

The centered wrapper is `calc(100% - var(--gutter) * 2)`, maximum 1440px. The frontmatter gutter is the desktop default. Spacing is contextual: compact control gaps, 20–40px content gaps, 8–12% column gaps and broad section intervals; there is no universal fixed multiplier.

Desktop discovery uses equal columns with an 8% gap; division introductions use 1:1.3; contact uses 0.85:1.3 with a 9% gap. Directory rows alternate image position. Gallery uses three columns with 30px row / 22px column gaps; footer starts with four unequal columns.

| Threshold | Final behavior |
| --- | --- |
| ≥1600px | Hero image begins at 15%, hero support copy 19px; business rows min 88px with 21px vertical padding; evidence image min 445px. |
| ≤1100px | Gutter 5vw, header 90px; navigation and gaps compress. Contact and gallery retain desktop columns. |
| ≤800px | Gutter 26px, header 84px / scrolled 76px. Vertical mobile navigation, two-column gallery, stacked contact sections; contact details retain two internal columns. Most editorial pairs remain side by side. |
| ≤540px | Gutter 23px, header 80px. Intro, explorer, energy, purpose, leadership, history, directory, capabilities, products and form rows stack. Gallery retains two columns; division gallery starts with one full-width image. Footer brand spans two link columns. |
| ≤360px | Hide visible “Menu” text; compress wordmark tracking and masthead-index gaps. |

Home hero: `min(900px, 100svh)`, min 760px; at ≤800px, `100svh`, min 740px/max 950px; at ≤540px, `94svh`, min 730px/max 900px. Its primary action stays in flow. The sector foot index becomes three columns at ≤800px and hides its last global-trade link; all businesses remain available in the full index.

Header begins absolute; after scrollY >140px it becomes fixed at 80px, or 76px at ≤800px. Inner pages reserve header space. Scroll padding: 115px, then 95px at ≤800px. Print hides navigation, footer, action bands and controls, removes inner-page header space, keeps gallery items together and exposes email destinations.

### Imagery

Use original company assets and the gold seal. Rectangular images use `cover`; modal images use `contain`. The home image has layered ink scrims and shifts from focal point 65%/48% to 57%/center on phones. Division photographs begin to the right of text on desktop and fill the hero on phones. About panorama heights: 470/350/255px at desktop/≤800/≤540. Portrait heights: 510/430/420px, focal point center/8%.

Home masthead WebP sources are 900/1600/2400px with high fetch priority. Generated body images have dimensions, lazy loading and async decoding. Preserve source provenance: PNG metadata and adjacent `.webp.json` files accompany shipping rasters; the final scan covers 97 images with none missing. Do not assume every WebP embeds internal EXIF.

## Elevation & Depth

Resting content is flat, organized by tone, rules and image scale. The complete shadow vocabulary is:

- **Desktop dropdown:** `0 24px 35px #0c151d26`; removed on mobile.
- **Dark-button hover:** `0 7px 20px #101e2615`, paired with the hover fill.

**The Open Surface Rule.** Separate editorial groups with thin rules, whitespace and surface changes. Reserve the observed shadows for the dropdown and dark-action hover.

Motion easing is `cubic-bezier(0.16, 1, 0.3, 1)`. Button fill/color/shadow take 0.25s; arrows shift 4px (buttons) or 5px (text links) over 0.35s with that easing. Navigation underline takes 0.3s; scrolled-header arrival 0.25s; business indentation 0.35s. Business images use 0.2s opacity through 0.45, with preloading and an 80ms swap delay. Image tiles scale to 1.035 over 0.7–0.75s; gallery cards darken to brightness 0.9 over 0.4s.

Only the home photo receives a 1.6s clipped arrival, gated by no-preference. Reduced-motion CSS disables smooth scrolling and collapses animations/transitions to 0.01ms with one iteration; back-to-top also requests instant scrolling. The form-result script still requests a smooth scroll, so do not infer a universal JavaScript motion opt-out.

## Shapes

Labeled actions, panels, tags, filters and crops are square. Circles belong to directional arrows and the scroll cue, commonly 38/48px controls. Structural lines are 1px. The selected business mark is 3px wide, 24px high (20px on phones). Inline SVGs have open 1.4–1.5px strokes, usually 16–24px in size.

## Components

### Actions

Default solid actions use frontmatter variants, a 57px minimum height and 34px icon gap. On phones, hero/division actions use a 52px minimum; the home action has a 218px minimum width and 14px 20px padding. Disabled buttons have opacity 0.5 and default cursor; no custom pressed transform exists.

Text links use a 1px bottom rule, 25px gap and 22px arrow. The outlined navigation CTA uses `#c7a6788c` border and Light Brass text; hover fills Brass with Ink text. Global focus is a 2px outline with 6px offset. Header, home hero, footer and energy story override it to Light Brass; fields use 2px offset.

### Navigation and business explorer

The seal/wordmark is one named home link; its decorative logo image has empty alt. Native `details/summary` opens the desktop business directory, with a rotating chevron and current/open underline. Page links use `aria-current`.

Mobile navigation uses a real button with `aria-expanded` and `aria-controls`, viewport-bounded scrolling and body scroll lock. Escape closes and restores toggle focus; Tab cycles visible controls; links close it; the 801px listener restores desktop behavior. Without JavaScript the scripted closed-state CSS is not applied.

Business rows remain normal links. Hover from a non-touch pointer or keyboard focus updates the company, description, image/alt and associated destination. Active state combines indentation, bronze marker and filled arrow. Touch keeps ordinary navigation. The evidence stacks after the linked index on phones.

### Open containers, tags and filters

Capability articles sit directly on Stone with a `#c7cec7` top rule, 28px 0 30px padding and 16px internal gap; phones use 24px vertical padding and 13px gap. No card radius or shadow. Directory and timeline rows use similar rules with their own grids.

Product tags are static spans with a `#c5cdc5` outline and frontmatter padding. Gallery filters are buttons: transparent default, `#e3e5de` unselected hover, Ink/White selected with `aria-pressed`. Filtering updates URL category, hidden items and a polite image count.

Image tiles use rectangular crops, caption scrims and restrained zoom. Gallery cards instead caption below the image and darken on hover.

### Enquiry panel and fields

The Stone panel uses frontmatter padding, then 40px at ≤800px and 30px 23px with -9px inline margins at ≤540px. Visible labels precede transparent underlined native controls. Fields have min-height 44px, 8px label spacing, no radius and a focused underline plus outline. Textareas resize vertically with min-height 105px; caret is `#8d6536`. The native select and 16px Ink-accent consent checkbox stay native.

Keep required words/attributes, email type, autocomplete and native validity. There is no custom red-error palette or disabled-field theme. Submission validates locally, then reveals/focuses a status region with explicit open-draft and copy actions; it never claims delivery. A polite region announces copy outcome. Division URLs can preselect a business.

### Viewer and accessibility

Native `dialog` provides the named modal viewer, Ink surface and `#061016ef` backdrop. Images stay contained. Visible previous/next/close controls support arrow keys; native Escape closes; focus returns to the trigger. Previous/next disable for fewer than two images. Width is viewport minus 70px, max 1400px; then minus 30px at ≤800px and minus 16px at ≤540px.

Preserve landmarks, the focus-revealed skip link to main, meaningful alt text, visible labels and decorative SVG `aria-hidden` attributes. Email, telephone and map destinations are native links.

## Do's and Don'ts

### Do:

- **Do** retain the real gold seal, local Hanken/Gloock pairing and company image provenance.
- **Do** organize information with open columns, thin rules and alternating Ink, Paper and Stone surfaces.
- **Do** keep business rows as links and update their evidence on keyboard focus as well as pointer hover.
- **Do** preserve responsive stacking, 16px phone fields, visible labels and native control behavior.
- **Do** describe enquiry preparation and let the person choose to open or copy the draft.

### Don't:

- **Don't** turn editorial groups into rounded, shadowed cards or apply the dropdown shadow to resting content.
- **Don't** extend Gloock into body copy, navigation or fields, or replace the display family with a system font.
- **Don't** replace substantive headings with decorative eyebrows, or present static product tags as controls.
- **Don't** use glyph characters as interface icons; preserve the inline line SVGs.
- **Don't** remove photo scrims or crop the modal image when the complete asset is being inspected.
- **Don't** claim an enquiry was sent by this website or use gallery imagery as invented proof of owned projects.

# Multilingual extension

The existing visual world is retained. The header now includes a native `details` language picker with five native-name options, small SVG flags and a selected check. It stays outside the mobile navigation. The navigation collapses at **1050px** to make room; phone summaries use compact language codes while the open list always shows full names. Options are at least 44px tall and support keyboard focus, Escape and outside-click dismissal. The popover uses paper/ink, a soft downward shadow, square corners and 1px rounding only on flag icons.

Every page has English, Arabic, French, Akan and Simplified Chinese versions. Arabic mirrors the photographic composition, reading order, business row marker and directional actions. Email addresses and telephone values remain left-to-right isolates. The Arabic typeface is self-hosted **Noto Sans Arabic**; the Chinese typeface is self-hosted **Noto Sans SC**. Both use character-subset WOFF2 assets, with weights 400–700. Arabic and Chinese display lettering removes Latin negative tracking and uses more generous line height. Hanken/Gloock and the original palette remain authoritative for Latin-script versions.

The selected language is carried by the URL prefix, not a cookie. Locale changes retain current page, query and section, including gallery filters changed after load and selected enquiry division. Translations are AI-assisted presentation drafts; this design documentation does not certify linguistic accuracy.
