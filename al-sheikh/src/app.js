(() => {
  "use strict";
  const t = (key, values = {}) =>
    Object.entries(values).reduce(
      (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
      window.SITE_I18N?.[key] ?? key,
    );
  const languageMenu = document.querySelector(".language-menu");
  function syncLanguageLinks() {
    document.querySelectorAll("[data-language]").forEach((link) => {
      const url = new URL(link.href);
      url.search = location.search;
      url.hash = location.hash;
      link.href = url.href;
    });
  }
  syncLanguageLinks();
  languageMenu?.addEventListener("toggle", () => {
    if (languageMenu.open) syncLanguageLinks();
  });
  languageMenu?.addEventListener("pointerdown", syncLanguageLinks);
  languageMenu?.addEventListener("focusin", syncLanguageLinks);
  languageMenu?.addEventListener("click", syncLanguageLinks);
  window.addEventListener("hashchange", syncLanguageLinks);
  window.addEventListener("popstate", syncLanguageLinks);
  document.addEventListener("click", (event) => {
    if (languageMenu?.open && !languageMenu.contains(event.target))
      languageMenu.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && languageMenu?.open) {
      languageMenu.open = false;
      languageMenu.querySelector("summary").focus();
    }
  });
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-navigation");
  const businessMenu = document.querySelector(".business-menu");
  const setMenu = (open) => {
    toggle?.setAttribute("aria-expanded", String(open));
    nav?.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    if (!open && businessMenu) businessMenu.open = false;
  };
  toggle?.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (toggle?.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
      if (businessMenu?.open) {
        businessMenu.open = false;
        businessMenu.querySelector("summary")?.focus();
      }
    }
  });
  document.addEventListener("click", (e) => {
    if (businessMenu?.open && !businessMenu.contains(e.target))
      businessMenu.open = false;
  });
  nav?.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || toggle?.getAttribute("aria-expanded") !== "true")
      return;
    const controls = [
      toggle,
      ...nav.querySelectorAll("a,summary"),
      ...document.querySelectorAll(
        ".header-controls summary,.header-controls a",
      ),
    ].filter((el) => el.getClientRects().length);
    const index = controls.indexOf(document.activeElement);
    if (index !== -1) {
      e.preventDefault();
      controls[
        (index + (e.shiftKey ? -1 : 1) + controls.length) % controls.length
      ].focus();
    }
  });
  window.matchMedia("(min-width:1051px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });
  let ticking = false;
  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 140);
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    },
    { passive: true },
  );
  updateHeader();
  document.querySelector(".back-top")?.addEventListener("click", () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    }),
  );

  const rows = [...document.querySelectorAll("[data-business]")];
  const businessImage = document.querySelector(".business-image");
  let imageSequence = 0;
  function showBusiness(row) {
    if (row.classList.contains("is-active")) return;
    rows.forEach((r) => r.classList.toggle("is-active", r === row));
    document.querySelector("[data-business-company]").textContent =
      row.dataset.company;
    document.querySelector("[data-business-summary]").textContent =
      row.dataset.summary;
    const action = document.querySelector("[data-business-link]");
    action.href = row.href;
    action.setAttribute(
      "aria-label",
      t("Explore {company}", { company: row.dataset.company }),
    );
    const sequence = ++imageSequence;
    const source = `/assets/images/${row.dataset.image}-${["refinery", "cargo-ship", "luxury-auction", "skyscrapers"].includes(row.dataset.image) ? "1600" : "1000"}.webp`;
    const preload = new Image();
    preload.src = source;
    preload.onload = () => {
      if (sequence !== imageSequence) return;
      businessImage.classList.add("changing");
      setTimeout(() => {
        if (sequence !== imageSequence) return;
        businessImage.src = source;
        businessImage.alt = row.dataset.alt;
        businessImage.classList.remove("changing");
      }, 80);
    };
  }
  rows.forEach((row) => {
    row.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "touch") showBusiness(row);
    });
    row.addEventListener("focus", () => showBusiness(row));
  });

  const galleryItems = [...document.querySelectorAll("[data-gallery-index]")];
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  let activeFilter = "All";
  function filterGallery(category, updateURL = true) {
    if (!filterButtons.some((b) => b.dataset.filter === category))
      category = "All";
    activeFilter = category;
    galleryItems.forEach(
      (item) =>
        (item.hidden =
          category !== "All" && item.dataset.category !== category),
    );
    filterButtons.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.filter === category)),
    );
    const count = document.querySelector("[data-count]");
    if (count) count.textContent = galleryItems.filter((i) => !i.hidden).length;
    if (updateURL) {
      const url = new URL(location.href);
      if (category === "All") url.searchParams.delete("category");
      else url.searchParams.set("category", category);
      history.replaceState(null, "", url);
      syncLanguageLinks();
    }
  }
  filterButtons.forEach((button) =>
    button.addEventListener("click", () =>
      filterGallery(button.dataset.filter),
    ),
  );
  if (filterButtons.length)
    filterGallery(
      new URLSearchParams(location.search).get("category") || "All",
      false,
    );
  window.addEventListener("popstate", () => {
    if (filterButtons.length)
      filterGallery(
        new URLSearchParams(location.search).get("category") || "All",
        false,
      );
  });
  const dialog = document.querySelector(".lightbox");
  let currentImage = 0,
    previousFocus;
  const filteredItems = () => galleryItems.filter((i) => !i.hidden);
  function renderLightbox() {
    const items = filteredItems();
    const item = items[currentImage];
    if (!item) return;
    const image = dialog.querySelector("[data-lightbox-image]");
    image.src = item.dataset.full;
    image.alt = item.dataset.title;
    dialog.querySelector("[data-lightbox-title]").textContent =
      item.dataset.title;
    dialog.querySelector("[data-lightbox-category]").textContent =
      item.dataset.categoryLabel || item.dataset.category;
    dialog.querySelector("[data-lightbox-position]").textContent =
      `${currentImage + 1} / ${items.length}`;
    dialog.querySelector("[data-lightbox-prev]").disabled = items.length < 2;
    dialog.querySelector("[data-lightbox-next]").disabled = items.length < 2;
  }
  function moveLightbox(amount) {
    const count = filteredItems().length;
    if (!count) return;
    currentImage = (currentImage + amount + count) % count;
    renderLightbox();
  }
  galleryItems.forEach((item) =>
    item.addEventListener("click", () => {
      if (!dialog?.showModal) return;
      previousFocus = item;
      currentImage = filteredItems().indexOf(item);
      renderLightbox();
      dialog.showModal();
    }),
  );
  dialog
    ?.querySelector("[data-lightbox-close]")
    .addEventListener("click", () => dialog.close());
  dialog
    ?.querySelector("[data-lightbox-prev]")
    .addEventListener("click", () => moveLightbox(-1));
  dialog
    ?.querySelector("[data-lightbox-next]")
    .addEventListener("click", () => moveLightbox(1));
  dialog?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      moveLightbox(document.documentElement.dir === "rtl" ? 1 : -1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      moveLightbox(document.documentElement.dir === "rtl" ? -1 : 1);
    }
  });
  dialog?.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        dialog.close();
    }
  });
  dialog?.addEventListener("close", () => previousFocus?.focus());

  const form = document.querySelector("#enquiry-form");
  const divisionField = document.querySelector("#division");
  const requestedDivision = new URLSearchParams(location.search).get(
    "division",
  );
  if (
    divisionField &&
    requestedDivision &&
    [...divisionField.options].some((o) => o.value === requestedDivision)
  )
    divisionField.value = requestedDivision;
  divisionField?.addEventListener("change", () => {
    const url = new URL(location.href);
    if (divisionField.value)
      url.searchParams.set("division", divisionField.value);
    else url.searchParams.delete("division");
    history.replaceState(null, "", url);
    syncLanguageLinks();
  });
  let enquiryText = "";
  form?.addEventListener("input", () => {
    const result = document.querySelector("#form-result");
    if (result) result.hidden = true;
  });
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || message.length < 10) {
      const target = !name ? form.elements.name : form.elements.message;
      target.setCustomValidity(
        !name
          ? t("Please enter your name.")
          : t("Please describe your enquiry in at least 10 characters."),
      );
      target.reportValidity();
      target.addEventListener("input", () => target.setCustomValidity(""), {
        once: true,
      });
      return;
    }
    const business =
      divisionField.options[divisionField.selectedIndex].textContent;
    enquiryText = `${t("Enquiry for Al Sheikh Investment Group")}\n\n${t("Business")}: ${business}\n${t("Name")}: ${name}\n${t("Email")}: ${data.get("email")}\n${t("Company")}: ${data.get("company") || t("Not provided")}\n${t("Phone")}: ${data.get("phone") || t("Not provided")}\n\n${message}\n\n${t("I agree to share these details for this enquiry.")}`;
    const subject = `${business} — ${t("enquiry from")} ${name}`;
    const mailto = `mailto:info@alsheikhinvestmentgroup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiryText)}`;
    const result = document.querySelector("#form-result");
    document.querySelector("#email-draft-link").href = mailto;
    result.hidden = false;
    result.focus();
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  document
    .querySelector("#copy-enquiry")
    ?.addEventListener("click", async () => {
      const status = document.querySelector("#copy-status");
      try {
        await navigator.clipboard.writeText(enquiryText);
        status.textContent = t(
          "Enquiry copied. Paste it into an email to info@alsheikhinvestmentgroup.com.",
        );
      } catch {
        const text = document.createElement("textarea");
        text.value = enquiryText;
        text.style.position = "fixed";
        text.style.left = "-9999px";
        document.body.append(text);
        text.select();
        const copied = document.execCommand("copy");
        text.remove();
        status.textContent = copied
          ? t("Enquiry copied. Paste it into your email.")
          : t(
              "Copy is unavailable in this browser. Use “Open email draft” or email info@alsheikhinvestmentgroup.com directly.",
            );
      }
    });
})();
