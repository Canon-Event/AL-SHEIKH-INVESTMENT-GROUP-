# Al Sheikh Investment Group — Reimagined

A complete, independent website redesign concept for a client pitch. Built with the company's original identity and photographs, and frontend guidance from [Impeccable](https://github.com/pbakaus/impeccable).

## Open locally

From this folder, with Node 20 or newer:

```powershell
npm run dev
```

Open **http://localhost:4173**. No dependency installation is needed.

To regenerate the static pages after editing:

```powershell
npm run build
```

The server reads the current `dist/` files. Refresh the browser after building.

## What is included

- 14 page types in English, Arabic, French, Akan and Simplified Chinese: 70 static pages in total, including localized 404 pages.
- A language selector that preserves the current page, query and section; Arabic right-to-left layouts and self-hosted Arabic/Chinese fonts.
- An interactive seven-business explorer, responsive navigation, sticky header, filterable company gallery and keyboard-operated image viewer.
- Division-specific enquiry links, native form validation, email draft preparation and a copy fallback.
- Original gold company seal, existing company photographs and self-hosted fonts.
- A transparent-background seal and favicon; the edited full-resolution PNG is in `asset-library/edited/`, and the untouched original remains in the original asset archive.
- Six original pages archived during research and 46 unique original image assets saved locally.
- Responsive WebP assets with source provenance, descriptive alternative text, reduced-motion support, social metadata and print styles.

## Files to edit

| File | Purpose |
| --- | --- |
| `src/data.mjs` | Division names, copy, capabilities, products and gallery entries |
| `src/build.mjs` | Shared page templates and page content |
| `src/styles.css` | Visual design and responsive layouts |
| `src/app.js` | Navigation, business explorer, gallery and enquiry interactions |
| `src/i18n.mjs` | Static localization, language navigation, metadata and catalog validation |
| `src/locales/` | English source strings and Arabic, French, Akan and Chinese translations |
| `src/languages.css` | Language picker, Arabic layouts and script-specific typography |
| `src/server.mjs` | Local preview server |
| `dist/` | Complete deployable static website |
| `asset-library/originals/` | All 46 untouched source media assets, retained locally |
| `asset-library/manifest.json` | Original URLs, source pages, dimensions and sizes |
| `asset-library/delivery-manifest.json` | Optimized image and font provenance |
| `PITCH.md` | Client presentation script and commercial scope |
| `RESEARCH.md` | Company scope, source map and editorial decisions |
| `DESIGN.md` | Final documented design system |
| `.impeccable/` | Design context and visual review evidence |

The original media directory is excluded from Git to keep the hosted source compact. It is included in the separate original-assets ZIP in the workspace. The delivered static site includes the optimized copies it needs.

## Enquiries

This pitch has **no email delivery backend**. The form prepares a draft only after validation and consent. Visitors choose to open it in their own email app or copy it. The interface explicitly states that no message has been sent. Form edits invalidate the prepared draft so visitors prepare it again with current details. Form details are not stored by this site's code.

## Languages

English remains at `/`; translated routes use `/ar/`, `/fr/`, `/ak/` and `/zh/`. Every content page and error page has all five versions. Internal navigation stays in the selected language. Language changes retain the current page, query parameters and section. Gallery categories use stable internal keys with translated labels. Enquiry drafts, custom errors, image descriptions and social metadata are translated too.

Translations are AI-assisted draft copy for the pitch, not native-speaker-approved company copy. All four translated catalogs, particularly the Akan/Twi technical wording, require native review before an official launch. English remains the editorial reference. Corporate names, email addresses, phone numbers, dates and product abbreviations are preserved where appropriate.

Keep source string IDs stable. When editing English copy, update its source entry and each translated catalog together. The build checks catalog completeness and rejects unregistered English text rather than silently publishing an untranslated fallback. Font subsets cover the supplied Arabic and Chinese copy; additional characters require regenerating those font subsets or using a broader font asset. Browser-native validation prompts follow the visitor's browser language.

## Verification

Chrome / Playwright exercised all 13 content routes and 13 distinct internal link targets at widths 320, 390, 768 and 1440. Checks covered image loading, page errors, horizontal overflow, mobile navigation, business focus changes, gallery filtering and keyboard image navigation, division preselection and enquiry draft content. Axe checks reported no WCAG 2 A/AA or 2.1 AA violations on the home, petroleum, gallery, contact and group pages. These automated samples are not a full accessibility certification.

Impeccable's detector ran once. The URL scan disconnected; static findings informed the type-size corrections. Its partial result is not represented as a clean detector pass. Screenshots and machine-readable reports are retained under `.impeccable/review/` locally.

## Hosting and handover

The full site is static. Deploy the contents of `dist/` to a static host. `.openai/hosting.json` records the private Sites pitch project's identity. Source is prepared and published through the Sites workflow.

Before an official company launch, agree the enquiry delivery service, confirm final copy and image usage with the company, set the official origin in `src/build.mjs`, and replace the pitch's deliberate `noindex`, robots exclusion and independent-concept wording. Those are launch configuration tasks, not claims that the pitch already receives enquiries or replaces the live company site.

The company's existing website remains the source of its name, logo, imagery, business descriptions and contact details. The design is an independent presentation concept. No client testimonials, financial performance figures, completed project claims or investment-return promises were invented.

## Design context

Keep `PRODUCT.md`, `DESIGN.md`, `.impeccable/config.json`, `.impeccable/design.json` and `.impeccable/surfaces/` with the project. Screenshot and question runtime folders are ignored. Font license texts are provided in `licenses/`.
