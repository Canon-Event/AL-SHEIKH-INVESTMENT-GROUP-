import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://al-sheikh-reimagined.saksham23garg.chatgpt.site";
export const languages = [
  { code: "en", label: "English", dir: "ltr", country: "us" },
  { code: "ar", label: "العربية", dir: "rtl", country: "ae" },
  { code: "fr", label: "Français", dir: "ltr", country: "fr" },
  { code: "ak", label: "Akan", dir: "ltr", country: "gh" },
  { code: "zh", label: "中文", dir: "ltr", country: "cn" },
];
const source = JSON.parse(
  fs.readFileSync(path.join(root, "src/locales/source.json"), "utf8"),
);
const catalogs = new Map();
const missingStrings = new Set();
const needsTranslation = (value) =>
  /[A-Za-z]/.test(value) &&
  !["AL SHEIKH", "INVESTMENT GROUP"].includes(value) &&
  !/^(?:https?:\/\/|mailto:|tel:|info@|\+?\d[\d /—–.-]*)/.test(value);
const norm = (s) => s.replace(/\s+/g, " ").trim();
const escape = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const decode = (s) =>
  s.replace(/&(?:amp|quot|lt|gt|apos|#39|#\d+|#x[\da-f]+);/gi, (m) => {
    const map = {
      "&amp;": "&",
      "&quot;": '"',
      "&lt;": "<",
      "&gt;": ">",
      "&apos;": "'",
      "&#39;": "'",
    };
    return (
      map[m] ??
      String.fromCodePoint(
        m.startsWith("&#x")
          ? parseInt(m.slice(3, -1), 16)
          : parseInt(m.slice(2, -1), 10),
      )
    );
  });
export const localePath = (route, code) =>
  code === "en" ? route : `/${code}${route}`;
function catalog(code) {
  if (code === "en") return {};
  if (catalogs.has(code)) return catalogs.get(code);
  const file = path.join(root, `src/locales/${code}.json`);
  if (!fs.existsSync(file))
    throw new Error(
      `Missing ${code} translation catalog. Complete translations before building.`,
    );
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const missing = Object.keys(source).filter(
    (id) => typeof data[id] !== "string" || !data[id].trim(),
  );
  if (missing.length)
    throw new Error(
      `${code} is missing ${missing.length} translations: ${missing.slice(0, 8).join(",")}`,
    );
  const lookup = Object.fromEntries(
    Object.entries(source).map(([id, text]) => [norm(text), data[id]]),
  );
  catalogs.set(code, lookup);
  return lookup;
}
function flag(country) {
  const shapes = {
    us: '<path fill="#fff" d="M0 0h30v20H0z"/><path stroke="#b22234" stroke-width="2" d="M0 1h30M0 5h30M0 9h30M0 13h30M0 17h30"/><path fill="#3c3b6e" d="M0 0h13v11H0z"/><path fill="#fff" d="m4 2 .5 1.5H6l-1.2 1 .4 1.5L4 5l-1.2 1 .4-1.5L2 3.5h1.5ZM9 6l.5 1.5H11l-1.2 1 .4 1.5L9 9l-1.2 1 .4-1.5L7 7.5h1.5Z"/>',
    ae: '<path fill="#00732f" d="M0 0h30v7H0z"/><path fill="#fff" d="M0 7h30v6H0z"/><path fill="#111" d="M0 13h30v7H0z"/><path fill="#f00" d="M0 0h8v20H0z"/>',
    fr: '<path fill="#fff" d="M0 0h30v20H0z"/><path fill="#002654" d="M0 0h10v20H0z"/><path fill="#ed2939" d="M20 0h10v20H20z"/>',
    gh: '<path fill="#ce1126" d="M0 0h30v7H0z"/><path fill="#fcd116" d="M0 7h30v6H0z"/><path fill="#006b3f" d="M0 13h30v7H0z"/><path fill="#111" d="m15 7 1 2h2.2l-1.8 1.4.7 2.2-2.1-1.4-2.1 1.4.7-2.2-1.8-1.4H14Z"/>',
    cn: '<path fill="#de2910" d="M0 0h30v20H0z"/><path fill="#ffde00" d="m7 3 1.1 3.3h3.5L8.8 8.4l1.1 3.4L7 9.7l-2.9 2.1 1.1-3.4-2.8-2.1h3.5Z"/>',
  };
  return `<svg class="language-flag" viewBox="0 0 30 20" aria-hidden="true">${shapes[country]}</svg>`;
}
function picker(route, language, t) {
  return `<details class="language-menu"><summary aria-label="${escape(t("Select language"))}: ${language.label}">${flag(language.country)}<span class="language-current" lang="${language.code}">${language.label}</span><span class="language-short" aria-hidden="true">${language.code.toUpperCase()}</span><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4"/></svg></summary><div class="language-options" aria-label="${escape(t("Language"))}">${languages.map((l) => `<a href="${localePath(route, l.code)}" hreflang="${l.code}" lang="${l.code}" data-language="${l.code}" ${l.code === language.code ? 'aria-current="true"' : ""}>${flag(l.country)}<span>${l.label}</span>${l.code === language.code ? '<svg class="language-check" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" stroke-width="1.5"/></svg>' : ""}</a>`).join("")}</div></details>`;
}
const translatableAttributes = new Set([
  "alt",
  "title",
  "aria-label",
  "placeholder",
  "data-summary",
  "data-company",
  "data-alt",
  "data-title",
]);
export function localizedPage(html, route, code) {
  const language = languages.find((l) => l.code === code);
  const lookup = catalog(code);
  const t = (s) => {
    const key = norm(s);
    if (code !== "en" && !lookup[key] && needsTranslation(key))
      missingStrings.add(key);
    return lookup[key] ?? s;
  };
  let rawTag = "";
  let out = html.replace(
    /<!--[\s\S]*?-->|<(?:[^>"']|"[^"]*"|'[^']*')*>|[^<]+/g,
    (token) => {
      if (token.startsWith("<!--")) return token;
      if (token.startsWith("<")) {
        const tag = token.match(/^<\/?([\w-]+)/)?.[1]?.toLowerCase();
        const closing = token.startsWith("</");
        if (tag === "script" || tag === "style") {
          rawTag = closing ? "" : tag;
          return token;
        }
        if (rawTag) return token;
        let changed = token.replace(
          /([\w:-]+)="([^"]*)"/g,
          (whole, attr, value) => {
            const decoded = decode(value);
            if (translatableAttributes.has(attr))
              return `${attr}="${escape(t(decoded))}"`;
            if (
              attr === "content" &&
              tag === "meta" &&
              /(?:name="description"|property="og:(?:title|description)")/.test(
                token,
              )
            )
              return `${attr}="${escape(t(decoded))}"`;
            if (
              attr === "href" &&
              decoded.startsWith("/") &&
              !decoded.startsWith("/assets/") &&
              !decoded.startsWith("//")
            )
              return `href="${escape(localePath(decoded, code))}"`;
            if (
              (attr === "href" &&
                tag === "link" &&
                /rel="canonical"/.test(token)) ||
              (attr === "content" &&
                tag === "meta" &&
                /property="og:url"/.test(token))
            )
              return `${attr}="${origin}${localePath(route, code)}"`;
            return whole;
          },
        );
        if (!closing && token.includes("data-gallery-index=")) {
          const category = decode(
            token.match(/data-category="([^"]*)"/)?.[1] || "",
          );
          changed = changed.replace(
            />$/,
            ` data-category-label="${escape(t(category))}">`,
          );
        }
        return changed;
      }
      if (rawTag) return token;
      const decoded = decode(token);
      const key = norm(decoded);
      if (!key || !lookup[key]) {
        if (code !== "en" && key && needsTranslation(key))
          missingStrings.add(key);
        return token;
      }
      const leading = decoded.match(/^\s*/)?.[0] || "",
        trailing = decoded.match(/\s*$/)?.[0] || "";
      return leading + escape(lookup[key]) + trailing;
    },
  );
  out = out.replace(
    '<html lang="en">',
    `<html lang="${code}" dir="${language.dir}">`,
  );
  const menuMatch = out.match(
    /<button class="menu-toggle"[\s\S]*?<\/button>/,
  )?.[0];
  const menu = menuMatch?.replace(
    "aria-controls=",
    `aria-label="${escape(t("Menu"))}" aria-controls=`,
  );
  if (!menu) throw new Error("Navigation toggle was not found");
  out = out
    .replace(menuMatch, "")
    .replace(
      "</nav></div></header>",
      `</nav><div class="header-controls">${picker(route, language, t)}${menu}</div></div></header>`,
    );
  const alternates = languages
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l.code}" href="${origin}${localePath(route, l.code)}">`,
    )
    .join("");
  out = out.replace(
    "</head>",
    `${alternates}<link rel="alternate" hreflang="x-default" href="${origin}${route}"><link rel="stylesheet" href="/assets/languages.css"></head>`,
  );
  out = out.replace(
    '<script src="/assets/app.js" defer></script>',
    `<script src="/assets/i18n/${code}.js" defer></script><script src="/assets/app.js" defer></script>`,
  );
  if (code === "ar")
    out = out.replace(
      "</head>",
      '<link rel="preload" href="/assets/fonts/noto-sans-arabic.woff2" as="font" type="font/woff2" crossorigin></head>',
    );
  return out.replace(
    '<div class="language-options"',
    '<div class="language-options" role="group"',
  );
}
export function writeRuntimeCatalogs() {
  if (missingStrings.size)
    throw new Error(
      "Source content has no translation entries: " +
        [...missingStrings].join(" | "),
    );
  const directory = path.join(root, "dist/assets/i18n");
  fs.mkdirSync(directory, { recursive: true });
  for (const l of languages) {
    const data = JSON.stringify(catalog(l.code))
      .replaceAll("<", "\\u003c")
      .replaceAll(">", "\\u003e")
      .replaceAll("&", "\\u0026");
    fs.writeFileSync(
      path.join(directory, `${l.code}.js`),
      `window.SITE_LOCALE=${JSON.stringify(l.code)};window.SITE_I18N=${data};\n`,
    );
  }
}
