# Verification packet

## Multilingual and transparent-logo update

All five original language choices are now present: English, Arabic, French, Akan and Simplified Chinese. There are 70 static pages including five localized error pages. AI-assisted translation catalogs cover all 486 source strings; native review is required before a company launch. Arabic/Chinese fonts are self-hosted character subsets, and Arabic layouts mirror the original design.

Chrome checks in `review/languages/report.json`: 65 content routes, 325 viewport checks, 65 internal link targets, no horizontal overflow, header collisions, JavaScript errors or missing responses. Axe found no violations on 10 locale home/contact samples. `picker-report.json` records 25 open-picker and mobile-focus checks with no issues. Additional open-picker Axe samples also found no violations.

The independent language review found one context-preservation bug: startup-only language links used stale query/hash after gallery filtering or anchor changes. A bounded fix now refreshes those links when state changes and before selection. `context-report.json` verifies changing filters, anchors and selected enquiry divisions before changing language across all five locales. The reviewer scored the fix resolved and returned ship for that scored fix.

The user then requested removal of the logo's rectangular background. The built-in image editor produced a transparent cutout, saved at `asset-library/edited/brand-seal-transparent.png`, with prompt/provenance in `asset-library/logo-edit.json`. The master is RGBA, 1254×1254; all four corner alpha values are zero. Header, footer and favicon now use optimized transparent PNGs. `logo-report.json` confirms the new logo loads on all five homepages with no failed resources. All 97 delivery rasters pass the provenance scan. The untouched original logo remains in the original asset archive.

The extension's static detector reported documentation mismatches for the added script fonts, sizing, neutral hover colors and 1px flag corner treatment, plus the prior static full-bleed/11px-caption findings. The script fonts and responsive picker are documented in DESIGN.md. Rendered browser accessibility checks, including open pickers, are the evidence for the sampled states; no clean static-detector pass is claimed.

The user requested a complete pitch redesign using the original company website and Impeccable, then selected our static stack recommendation and development directly in code.

The direction contract lives in surfaces/home.md. No image comp was created or approved. The original site's screenshot is comparison evidence, not visual authority.

Playwright / Chrome checks: 13 content routes, 13 distinct internal link targets, widths 320 / 390 / 768 / 1440, no horizontal overflow, failed requests or browser errors. Axe WCAG 2 A / AA and 2.1 AA: no violations on home, petroleum, gallery and contact. Interaction checks covered keyboard-triggered business image changes, mobile menu, gallery filtering and keyboard lightbox, division preselection, required form fields, and the email draft.

Detector ran once over src, static home and URL. The URL part failed with a Chrome protocol disconnect, so this is a partial detector result, not a clean pass. The report is UTF-16 JSON at review/detector.json. Functional text under 11px and tight tracking were corrected after the run. Some static contrast / cramped-boundary findings do not understand photographic backgrounds and full-bleed compositions; review rendered evidence. Axe found no contrast violations on sampled routes. No second detector run is claimed.

All delivery raster files carry original source provenance: PNG metadata and adjacent WebP JSON records written by the Impeccable embed-prompt command. The final scan reports 97 rasters and zero missing provenance records. Original media and URLs are preserved separately.

The enquiry form intentionally prepares a draft, explains that nothing has been sent, and provides a copy fallback; no mail service is configured. The site is an independent concept. Six sitemap pages and 46 original media assets have been archived.

## Finish review outcome

The independent finish reviewer confirmed the design's type, material, ground, first viewport, business discovery, visitor story and responsive adaptation. It required three changes: remove the About purpose eyebrows, replace a self-link on About, and clarify the two-step draft helper. All were applied in one batch. The verdict pass scored all three resolved, observed no regressions from the batch, and returned disposition ship for the scored fixes. It did not issue a new whole-surface certification. Corrected About and contact recaptures were reviewed. About's additional automated checks found no overflow across the four tested widths and no Axe violations.
