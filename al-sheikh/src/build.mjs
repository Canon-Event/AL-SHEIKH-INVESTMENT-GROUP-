import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { divisions, gallery } from "./data.mjs";
import {
  languages,
  localePath,
  localizedPage,
  writeRuntimeCatalogs,
} from "./i18n.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const dist = path.join(projectRoot, "dist");
const origin = "https://al-sheikh-reimagined.saksham23garg.chatgpt.site";
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const arrow =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg>';
const northeast =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>';
const down =
  '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4"/></svg>';
const pin =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.4"/></svg>';
const img = (name, alt, cls = "", size = "1000", extra = "") =>
  `<img class="${cls}" src="/assets/images/${name}-${size}.webp" alt="${esc(alt)}" loading="lazy" decoding="async" width="1000" height="750" ${extra}>`;
const link = (href, text, style = "text-link") =>
  `<a class="${style}" href="${href}"><span>${text}</span>${arrow}</a>`;
const brand = () =>
  `<a class="brand" href="/" aria-label="Al Sheikh Investment Group home"><img src="/assets/images/brand-seal-transparent.png" alt="" width="54" height="56"><span>AL SHEIKH<span>INVESTMENT GROUP</span></span></a>`;
function header(active = "") {
  return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="header-inner">${brand()}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation"><span>Menu</span><i></i><i></i></button><nav class="primary-nav" id="primary-navigation" aria-label="Main navigation"><a href="/about/" ${active === "about" ? 'aria-current="page"' : ""}>The group</a><details class="business-menu" ${active === "businesses" ? 'data-current="true"' : ""}><summary>Our businesses ${down}</summary><div class="business-dropdown"><div><span class="menu-description">Specialist businesses.<br>A shared perspective.</span><a href="/businesses/" class="text-link">Explore the group ${arrow}</a></div><div class="dropdown-links">${divisions.map((d) => `<a href="/businesses/${d.id}/">${d.name}${northeast}</a>`).join("")}</div></div></details><a href="/gallery/" ${active === "gallery" ? 'aria-current="page"' : ""}>Our world</a><a class="nav-cta" href="/contact/" ${active === "contact" ? 'aria-current="page"' : ""}>Let’s talk ${northeast}</a></nav></div></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="wrap footer-main"><div class="footer-brand">${brand()}<p>Rooted in Dubai.<br>Connected to the world.</p><a class="location-link" href="https://www.google.com/maps/search/?api=1&query=Business+Bay+Dubai" target="_blank" rel="noopener">${pin} Dubai, United Arab Emirates ${northeast}</a></div><div class="footer-column"><h2>Explore</h2><a href="/about/">The group</a><a href="/businesses/">Our businesses</a><a href="/gallery/">Our world</a><a href="/contact/">Contact us</a></div><div class="footer-column"><h2>Our businesses</h2>${divisions
    .slice(0, 4)
    .map((d) => `<a href="/businesses/${d.id}/">${d.name}</a>`)
    .join(
      "",
    )}</div><div class="footer-column footer-connect"><h2>Start a conversation</h2><a href="tel:+97143880520">+971 4 388 0520</a><a href="tel:+971505520806">+971 50 552 0806</a><a class="footer-email" href="mailto:info@alsheikhinvestmentgroup.com">Email our team ${northeast}</a></div></div><div class="wrap footer-bottom"><span>© 1997–2026 Al Sheikh Investment Group</span><div><span class="concept-note">Independent redesign concept</span><a href="/privacy/">Privacy & website information</a><button class="back-top" type="button" aria-label="Back to top">Back to top ${northeast}</button></div></div></footer>`;
}
function cta(
  title = "The next opportunity<br>starts with a conversation.",
  description = "Tell us what you have in mind. We’ll connect you with the right business.",
  href = "/contact/",
) {
  return `<section class="conversation"><div class="wrap conversation-inner"><div><h2>${title}</h2><p>${description}</p></div>${link(href, "Let’s talk", "button button-dark")}</div></section>`;
}
function layout({
  title,
  description,
  route = "/",
  active = "",
  body = "",
  home = false,
}) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101e26"><meta name="color-scheme" content="light"><title>${esc(title)} | Al Sheikh Investment Group</title><meta name="description" content="${esc(description)}"><meta name="robots" content="noindex,nofollow"><link rel="canonical" href="${origin}${route}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)} | Al Sheikh Investment Group"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${origin}/assets/images/dubai-night-1600.webp"><meta property="og:url" content="${origin}${route}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/images/favicon-transparent.png" type="image/png"><link rel="preload" href="/assets/fonts/hanken-grotesk.ttf" as="font" type="font/ttf" crossorigin>${home ? '<link rel="preload" as="image" href="/assets/images/dubai-night-1600.webp" imagesrcset="/assets/images/dubai-night-900.webp 900w, /assets/images/dubai-night-1600.webp 1600w, /assets/images/dubai-night-2400.webp 2400w" imagesizes="100vw">' : ""}<link rel="stylesheet" href="/assets/styles.css"><script>document.documentElement.classList.add('js');</script><script src="/assets/app.js" defer></script></head><body class="${home ? "home" : "inner-page"}">${header(active)}<main id="main">${body}</main>${footer()}</body></html>`;
}
const write = (route, options) => {
  const html = layout({ ...options, route });
  for (const language of languages) {
    const localizedRoute = localePath(route, language.code);
    const f =
      localizedRoute === "/"
        ? "index.html"
        : localizedRoute.endsWith(".html")
          ? localizedRoute.replace(/^\//, "")
          : localizedRoute.replace(/^\//, "") + "index.html";
    fs.mkdirSync(path.dirname(path.join(dist, f)), { recursive: true });
    fs.writeFileSync(
      path.join(dist, f),
      localizedPage(html, route, language.code),
    );
  }
};

const intro = `<section class="group-intro wrap"><div class="intro-heading"><h2>One group.<br><span class="serif">A broader horizon.</span></h2>${link("/about/", "Discover Al Sheikh")}</div><div class="intro-copy"><p class="lead">We see possibility where<br class="desktop-break"> industries meet.</p><p>Based in Dubai, Al Sheikh Investment Group brings together specialist businesses in energy, real estate, precious materials and international trade.</p><p>Our strength is in our connections. Across sectors and borders, we work with partners to create lasting value through shared expertise and a long-term perspective.</p></div><div class="group-facts"><div><strong>Since 1997</strong><span>A continuing story</span></div><div><strong>Seven businesses</strong><span>One shared vision</span></div><div><strong>Dubai, UAE</strong><span>Our home. Our starting point.</span></div></div></section>`;
function explorer() {
  const d = divisions[0];
  return `<section class="businesses-section" id="businesses"><div class="wrap"><div class="section-heading"><h2>A world of<br><span class="serif">possibilities.</span></h2><p>Different sectors. Complementary expertise.<br>Explore the businesses behind our group.</p></div><div class="business-explorer"><div class="business-list">${divisions.map((d, i) => `<a class="business-row ${i === 0 ? "is-active" : ""}" href="/businesses/${d.id}/" data-business="${d.id}" data-image="${d.image}" data-alt="${esc(d.imageAlt)}" data-summary="${esc(d.summary)}" data-company="${esc(d.company)}"><span class="business-row-title">${d.name}<small>${d.company}</small></span><span class="row-arrow">${northeast}</span></a>`).join("")}</div><div class="business-visual"><div class="business-image-wrap">${img(d.image, d.imageAlt, "business-image", "1600")}<span class="image-corner">A closer look</span></div><div class="business-caption"><div><h3 data-business-company>${d.company}</h3><p data-business-summary>${d.summary}</p></div><a href="/businesses/${d.id}/" class="circle-arrow" data-business-link aria-label="Explore KAS Petroleum">${northeast}</a></div></div></div></div></section>`;
}

write("/", {
  title: "Rooted in Dubai. Reaching further.",
  description:
    "Explore Al Sheikh Investment Group: seven specialist businesses spanning petroleum, property, maritime, precious materials and international trade.",
  home: true,
  body: `
<section class="hero"><picture class="hero-picture"><source srcset="/assets/images/dubai-night-900.webp 900w, /assets/images/dubai-night-1600.webp 1600w, /assets/images/dubai-night-2400.webp 2400w" sizes="100vw"><img src="/assets/images/dubai-night-1600.webp" alt="Dubai skyline and illuminated Sheikh Zayed Road at night" width="5000" height="2650" fetchpriority="high"></picture><div class="hero-shade"></div><div class="wrap hero-content"><h1>Rooted in Dubai.<br>Reaching <span class="serif">further.</span></h1><p>Bringing energy, places and possibilities together.<br> An independent group with a global perspective.</p>${link("#businesses", "Explore our businesses", "button button-brass")}</div><div class="wrap hero-bottom"><a class="scroll-cue" href="#group">Discover our world <span>${arrow}</span></a><span class="hero-location">${pin} Dubai, United Arab Emirates</span></div><div class="hero-index"><div class="wrap"><span>One group. Many horizons.</span><a href="/businesses/petroleum/">Energy</a><a href="/businesses/properties/">Real estate</a><a href="/businesses/gemstones/">Precious materials</a><a href="/businesses/maritime/">Global trade ${northeast}</a></div></div></section>
<div id="group">${intro}</div>${explorer()}
<section class="energy-story"><div class="energy-photo">${img("offshore", "Offshore energy infrastructure and support vessels", "", "1600")}</div><div class="energy-copy"><h2>Moving energy.<br><span class="serif">Connecting markets.</span></h2><p>Energy is a central focus for our group. Through KAS Petroleum and Al Sheikh Petroleum, we connect petroleum trading with the maritime expertise that moves it.</p><div class="energy-products"><span>Crude oil</span><span>LPG & LNG</span><span>Refined products</span><span>Maritime services</span></div>${link("/businesses/petroleum/", "Explore our energy business", "text-link light-link")}</div></section>
<section class="world-section wrap"><div class="section-heading"><h2>A closer look at<br><span class="serif">our world.</span></h2>${link("/gallery/", "Explore the gallery")}</div><div class="world-grid"><a href="/gallery/?category=Properties" class="world-tile world-tall">${img("skyscrapers", "Looking up at Dubai’s contemporary architecture", "", "1000")}<span>Places that inspire ${northeast}</span></a><a href="/gallery/?category=Gemstones" class="world-tile world-wide">${img("emeralds", "A selection of natural rough emeralds", "", "1000")}<span>Extraordinary by nature ${northeast}</span></a><a href="/gallery/?category=Maritime" class="world-tile world-short">${img("cargo-ship", "Container vessel crossing blue water", "", "1000")}<span>Connections that move us ${northeast}</span></a></div></section>
${cta()}`,
});

write("/about/", {
  title: "The group",
  description:
    "Discover the purpose, businesses and shared perspective of Dubai-based Al Sheikh Investment Group.",
  active: "about",
  body: `<section class="page-heading wrap"><h1>A shared vision.<br><span class="serif">A wider perspective.</span></h1><div class="page-heading-bottom"><p>Seven specialist businesses. A common commitment to enduring relationships.</p><span>Al Sheikh Investment Group</span></div></section><div class="about-panorama">${img("dubai-night", "Dubai’s illuminated skyline at night", "", "2400")}</div>${intro.replace(link("/about/", "Discover Al Sheikh"), link("/businesses/", "Explore our businesses"))}<section class="purpose-section"><div class="wrap purpose-grid"><article><h2>Lasting value begins<br><span class="serif">with strong partnerships.</span></h2><p>We aim to provide a sustainable investment platform that supports our strategic business partners. Collaboration, shared growth and an understanding of changing markets shape how we work.</p></article><article><h2>Progress with<br><span class="serif">a broader purpose.</span></h2><p>Our ambition is to contribute to economic growth in the UAE and beyond through innovation, integrity and a commitment to sustainability, while supporting communities and responsible collaboration.</p></article></div></section><section class="wrap leadership-section"><div class="leadership-image">${img("chairman", "Kussay Al Sheikh, President and Chairman of Al Sheikh Investment Group", "", "1000")}</div><div class="leadership-copy"><h2>A vision shaped<br><span class="serif">by experience.</span></h2><h3>Kussay Al Sheikh</h3><span class="company-name">President &amp; Chairman</span><p>Kussay Al Sheikh leads Al Sheikh Investment Group with experience spanning real estate, petroleum and precious materials. His business journey began in 1997, laying the foundation for an outlook that connects industries, markets and people.</p><p>Today, that perspective informs the group’s commitment to partnerships, responsible growth and the opportunities ahead.</p>${link("/contact/", "Connect with the group")}</div></section><section class="wrap history-section"><div><h2>Built on relationships.<br><span class="serif">Looking ahead.</span></h2><p>Our story continues through the businesses and people who share our perspective.</p></div><div class="history-list"><article><span>1997</span><div><h3>The group’s starting point</h3><p>A heritage reflected in the Al Sheikh Group’s original company identity.</p></div></article><article><span>2003</span><div><h3>A focus on petroleum</h3><p>The starting point described by KAS Petroleum and Al Sheikh Petroleum for their energy and maritime activities.</p></div></article><article><span>Today</span><div><h3>Seven complementary businesses</h3><p>A wider scope across energy, property, maritime, gemstones, luxury, metals and chemicals.</p></div></article></div></section>${cta()}`,
});

write("/businesses/", {
  title: "Our businesses",
  description:
    "Explore the seven businesses within Al Sheikh Investment Group and find the right division for your enquiry.",
  active: "businesses",
  body: `<section class="page-heading wrap"><h1>Different expertise.<br><span class="serif">Shared ambition.</span></h1><div class="page-heading-bottom"><p>From the energy that moves industry to the places and materials that shape our world.</p><span>Our businesses</span></div></section><section class="wrap division-directory">${divisions.map((d, i) => `<article class="directory-item"><a class="directory-image" href="/businesses/${d.id}/">${img(d.image, d.imageAlt, "", i === 0 ? "1600" : "1000")}</a><div class="directory-copy"><h2><a href="/businesses/${d.id}/">${d.name}</a></h2><span class="company-name">${d.company}</span><p>${d.summary}</p>${link(`/businesses/${d.id}/`, "Discover the business")}</div></article>`).join("")}</section>${cta()}`,
});

for (const d of divisions) {
  const next = divisions[(divisions.indexOf(d) + 1) % divisions.length];
  write(`/businesses/${d.id}/`, {
    title: d.name,
    description: d.summary,
    active: "businesses",
    body: `<section class="division-hero"><div class="division-hero-image">${img(d.image, d.imageAlt, "", fs.existsSync(path.join(dist, `assets/images/${d.image}-1600.webp`)) ? "1600" : "1000", 'fetchpriority="high"')}</div><div class="wrap division-hero-copy"><a class="breadcrumb" href="/businesses/">Our businesses ${arrow} ${d.name}</a><h1>${d.headline}</h1><p>${d.summary}</p>${link(`/contact/?division=${d.id}`, "Discuss an opportunity", "button button-brass")}</div><span class="division-company">${d.company}</span></section><section class="wrap division-intro"><div><h2>${d.company}</h2><span class="company-name">Part of Al Sheikh Investment Group</span></div><div><p class="lead">${d.intro}</p><p>${d.details}</p></div></section><section class="capabilities-section"><div class="wrap"><div class="section-heading"><h2>Expertise<br><span class="serif">in practice.</span></h2><p>What this business brings<br>to the conversation.</p></div><div class="capability-list">${d.capabilities.map(([title, copy]) => `<article><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div></div></section><section class="wrap product-section"><div><h2>${d.id === "metals" ? "Start with your requirements." : "A closer look at our focus."}</h2><div class="product-tags">${d.products.map((p) => `<span>${p}</span>`).join("")}</div></div><div class="market-panel"><h3>${d.marketLabel || "Markets & connections"}</h3><p>${d.markets.join(" · ")}</p>${link(`/contact/?division=${d.id}`, "Connect with the team")}</div></section><section class="wrap division-gallery"><div class="section-heading compact"><h2>From our world</h2>${link("/gallery/", "View the gallery")}</div><div class="division-gallery-grid">${d.gallery.map((n) => `<a href="/gallery/" aria-label="Explore our company gallery">${img(n, gallery.find((g) => g.image === n)?.title || d.name, "", "1000")}</a>`).join("")}</div><p class="image-note">Selected imagery from the group’s existing website.</p></section>${cta("Let’s explore<br>what’s possible.", `Speak with our team about ${d.name.toLowerCase()}.`, `/contact/?division=${d.id}`)}<div class="next-business wrap"><span>Continue exploring</span><a href="/businesses/${next.id}/">${next.name} ${arrow}</a></div>`,
  });
}

const categories = [
  "All",
  "Energy",
  "Maritime",
  "Properties",
  "Gemstones",
  "Metals",
  "Chemicals",
  "Agriculture",
  "Luxury",
];
write("/gallery/", {
  title: "Our world",
  description:
    "Explore the original company gallery across energy, maritime, property, gemstones, metals, chemicals and agriculture.",
  active: "gallery",
  body: `<section class="page-heading wrap gallery-heading"><h1>Perspective,<br><span class="serif">in pictures.</span></h1><div class="page-heading-bottom"><p>A closer look at the places, materials and connections within our group’s world.</p><span>Company gallery</span></div></section><section class="wrap gallery-section"><div class="gallery-toolbar"><div class="gallery-filters" role="group" aria-label="Filter gallery">${categories.map((c, i) => `<button type="button" data-filter="${c}" aria-pressed="${i === 0}">${c}</button>`).join("")}</div><p class="gallery-count" role="status" aria-live="polite"><span data-count>${gallery.length}</span> images</p></div><div class="gallery-grid">${gallery.map((g, i) => `<button class="gallery-item" type="button" data-gallery-index="${i}" data-category="${g.category}" data-title="${esc(g.title)}" data-full="/assets/images/${g.image}-1000.webp" aria-label="View ${esc(g.title)}">${img(g.image, g.title, "", "480")}<span><span>${g.title}<small>${g.category}</small></span>${northeast}</span></button>`).join("")}</div><p class="image-note">Original imagery preserved from Al Sheikh Investment Group’s company website.</p></section><dialog class="lightbox" aria-label="Company image viewer"><div class="lightbox-bar"><span data-lightbox-category></span><button type="button" data-lightbox-close aria-label="Close image viewer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button></div><div class="lightbox-stage"><button type="button" data-lightbox-prev aria-label="Previous image">${arrow}</button><img data-lightbox-image alt=""><button type="button" data-lightbox-next aria-label="Next image">${arrow}</button></div><div class="lightbox-footer"><h2 data-lightbox-title></h2><span data-lightbox-position></span></div></dialog>${cta()}`,
});

write("/contact/", {
  title: "Start a conversation",
  description:
    "Contact Al Sheikh Investment Group in Dubai and Ajman. Find our official phone numbers, email address and division enquiry form.",
  active: "contact",
  body: `<section class="page-heading wrap contact-heading"><h1>Every possibility starts<br><span class="serif">with a conversation.</span></h1><div class="page-heading-bottom"><p>A question, a partnership or something new.<br>We’d like to hear what you have in mind.</p><span>Connect with Al Sheikh</span></div></section><section class="wrap contact-layout"><div class="contact-details"><h2>Let’s connect.</h2><div class="contact-line"><span>Email</span><a href="mailto:info@alsheikhinvestmentgroup.com">info@alsheikhinvestmentgroup.com ${northeast}</a></div><div class="contact-line"><span>Telephone</span><a href="tel:+97143880520">+971 4 388 0520 ${northeast}</a></div><div class="contact-line"><span>Mobile</span><a href="tel:+971505520806">+971 50 552 0806 ${northeast}</a></div><div class="office"><h3>Dubai office</h3><p>Business Bay<br>Dubai, United Arab Emirates</p><a href="https://www.google.com/maps/search/?api=1&query=Business+Bay+Dubai" target="_blank" rel="noopener">View area on map ${northeast}</a></div><div class="office"><h3>Ajman office</h3><p>Business District, Ajman Free Zone<br>P.O. Box 1305000<br>Ajman, United Arab Emirates</p><a href="https://www.google.com/maps/search/?api=1&query=Ajman+Free+Zone+Business+District" target="_blank" rel="noopener">View area on map ${northeast}</a></div></div><div class="enquiry-panel"><h2>Tell us what’s next.</h2><p class="form-intro">Choose a business and share a little about your enquiry.</p><form id="enquiry-form"><div class="form-row"><div class="field"><label for="full-name">Full name <span>(required)</span></label><input id="full-name" name="name" autocomplete="name" maxlength="120" required placeholder="Your full name"></div><div class="field"><label for="email">Email <span>(required)</span></label><input id="email" name="email" type="email" autocomplete="email" maxlength="254" required placeholder="you@company.com"></div></div><div class="form-row"><div class="field"><label for="company">Company</label><input id="company" name="company" autocomplete="organization" maxlength="150" placeholder="Your company"></div><div class="field"><label for="phone">Phone number</label><input id="phone" name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="Include country code"></div></div><div class="field"><label for="division">Business of interest <span>(required)</span></label><select id="division" name="division" required><option value="">Select a business</option><option value="general">General enquiry / partnership</option>${divisions.map((d) => `<option value="${d.id}">${d.name} — ${d.company}</option>`).join("")}</select></div><div class="field"><label for="message">Your enquiry <span>(required)</span></label><textarea id="message" name="message" rows="4" minlength="10" maxlength="3000" required placeholder="Tell us about your requirements or the opportunity you have in mind."></textarea></div><label class="check-field"><input type="checkbox" name="consent" required><span>I agree to share these details with Al Sheikh Investment Group for this enquiry. <a href="/privacy/">Website information</a>.</span></label><div class="form-actions"><button class="button button-dark" type="submit">Prepare email enquiry ${northeast}</button><span>Prepares a draft for your email app.<br>Then choose to open or copy it.</span></div><div class="form-result" id="form-result" role="status" tabindex="-1" hidden><h3>Your enquiry is ready to review.</h3><p>Open the email draft, review your details and send it from your email app. No message has been sent by this website.</p><div class="result-actions"><a id="email-draft-link" class="text-link" href="mailto:info@alsheikhinvestmentgroup.com">Open email draft ${northeast}</a><button id="copy-enquiry" type="button" class="text-link">Copy enquiry ${arrow}</button></div><p id="copy-status" aria-live="polite"></p></div><noscript><p>JavaScript is needed to prepare your draft. You can email <a href="mailto:info@alsheikhinvestmentgroup.com">info@alsheikhinvestmentgroup.com</a> directly.</p></noscript></form></div></section><div class="contact-city">${img("dubai-night", "Dubai by night", "", "2400")}<span>Our home. Your next connection.</span></div>`,
});

write("/privacy/", {
  title: "Privacy & website information",
  description:
    "Information about this independent website redesign concept and how its enquiry draft works.",
  body: `<article class="wrap legal-page"><h1>Privacy &<br><span class="serif">website information.</span></h1><p class="lead">This is an independent redesign concept prepared for presentation. It is not the company’s official website.</p><h2>The original company website</h2><p>Business information, contact details and company photographs were sourced from <a href="https://www.alsheikhinvestmentgroup.com/" target="_blank" rel="noopener">alsheikhinvestmentgroup.com</a>. The company name, logo and imagery remain associated with their respective owners. Business availability and terms should be confirmed directly with the company.</p><h2>Your enquiry details</h2><p>The enquiry form assembles an email draft in your browser. Form details are not sent to a server or stored by this concept. You can choose to open the draft in your email application or copy the enquiry text. A message is only sent when you send it from your email application.</p><h2>Cookies and analytics</h2><p>The website code does not set analytics or advertising cookies and does not load external analytics services. The private hosting service may use its own access and authentication mechanisms.</p><h2>External links</h2><p>Telephone and email links open your device’s applications. Map links open Google Maps. Those services use their own privacy policies.</p><h2>Contact the company</h2><p><a href="mailto:info@alsheikhinvestmentgroup.com">info@alsheikhinvestmentgroup.com</a><br><a href="tel:+97143880520">+971 4 388 0520</a></p>${link("/contact/", "Back to contact")}</article>`,
});
write("/404.html", {
  title: "Page not found",
  description: "Find your way back to Al Sheikh Investment Group.",
  body: `<section class="wrap not-found"><span>404</span><h1>A different<br><span class="serif">direction.</span></h1><p>The page you’re looking for could not be found.</p>${link("/", "Return to the group", "button button-dark")}</section>`,
});
fs.mkdirSync(path.join(dist, "assets"), { recursive: true });
for (const f of ["styles.css", "app.js", "languages.css"])
  fs.copyFileSync(
    path.join(projectRoot, "src", f),
    path.join(dist, "assets", f),
  );
fs.writeFileSync(path.join(dist, "robots.txt"), "User-agent: *\nDisallow: /\n");
fs.writeFileSync(
  path.join(dist, "_headers"),
  "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Robots-Tag: noindex, nofollow\n",
);
writeRuntimeCatalogs();
console.log(
  "Built 70 static pages across English, Arabic, French, Akan and Chinese.",
);
