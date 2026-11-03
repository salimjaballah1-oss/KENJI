/* ============================================================
   KENJI'S BIZARRE PORTFOLIO — routeur, vues et interactions
   Vanilla JS, aucune dépendance.
   ============================================================ */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const view = $("#view");
  const fx = $("#fx");
  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => innerWidth < 900;

  let current = null;       // { route, onKey, select? }
  let navToken = 0;

  /* ---------------- Routes ---------------- */
  const ROUTES = {
    menu:        { render: renderMenu,  fx: "burst",   sfx: "ドン!" },
    about:       { render: renderAbout, fx: "panels",  sfx: "ゴゴゴゴ" },
    cv:          { render: (s) => renderCards(s, { title: "CV", jp: "ステータス", tag: "RANG", data: CV, cta: true }), fx: "cards", sfx: "ドドドド" },
    experiences: { render: (s) => renderCards(s, { title: "EXPÉRIENCES", jp: "パート", tag: "STATUT", data: EXPERIENCES }), fx: "cards", sfx: "ゴゴゴゴ" },
    projets:     { render: (s) => renderLog(s, { title: "PROJETS", jp: "ミッション", data: PROJECTS, label: "MISSION" }), fx: "stripes", sfx: "ORA ORA!" },
    veille:      { render: (s) => renderLog(s, { title: "VEILLE TECH", jp: "スピードワゴン財団", data: VEILLE, label: "DOSSIER" }), fx: "stripes", sfx: "ドドドド" },
    passions:    { render: (s) => renderLog(s, { title: "PASSIONS", jp: "奇妙な趣味", data: PASSIONS, label: "BIZARRE" }), fx: "panels", sfx: "MUDA MUDA!" },
    certifs:     { render: (s) => renderBars(s, { title: "CERTIFS", jp: "トロフィー", data: CERTIFS, side: "DOCUMENTS" }), fx: "stripes", sfx: "ゴゴゴゴ" },
    contact:     { render: (s) => renderBars(s, { title: "CONTACT", jp: "連絡", data: CONTACT, side: "CANAUX" }), fx: "stripes", sfx: "ドン!" },
  };

  function parse() {
    const h = location.hash.replace(/^#\/?/, "");
    const [route, sub] = h.split("/");
    return { route: ROUTES[route] ? route : "menu", sub: sub ? decodeURIComponent(sub) : null };
  }

  function mount(route, sub) {
    const r = ROUTES[route];
    document.body.dataset.route = route;
    view.innerHTML = "";
    current = r.render(sub) || {};
    current.route = route;
    view.scrollTop = 0; scrollTo(0, 0);
    document.title = route === "menu"
      ? "Kenji's Bizarre Portfolio — Kenji Chapuis--Voisain"
      : `${(MENU.find((m) => m.route === route) || {}).label || route} — Kenji's Bizarre Portfolio`;
  }

  function go(first = false) {
    const { route, sub } = parse();
    if (current && current.route === route && current.select && !first) {
      current.select(sub);
      return;
    }
    const token = ++navToken;
    if (first || REDUCE) { mount(route, sub); return; }
    playTransition(ROUTES[route], () => { if (token === navToken) mount(route, sub); });
  }

  /* ---------------- Transitions ---------------- */
  function playTransition(r, swap) {
    fx.innerHTML = "";
    const kind = r.fx;
    let html = "";
    if (kind === "stripes") {
      [["var(--ink)", 64, 26, 0], ["var(--purple)", 74, 18, 60], ["var(--gold)", 84, 10, 120], ["var(--pink)", 92, 5, 170]]
        .forEach(([c, l, w, d]) => { html += `<div class="fx-stripe" style="--c:${c};left:${l}vw;width:${w}vw;animation-delay:${d}ms"></div>`; });
    } else if (kind === "panels") {
      [["var(--ink)", -12, 86, 0], ["var(--gold)", 24, 72, 50], ["var(--purple)", 58, 82, 100]]
        .forEach(([c, t, w, d]) => { html += `<div class="fx-panel" style="--c:${c};top:${t}vh;width:${w}vw;animation-delay:${d}ms"></div>`; });
    } else if (kind === "cards") {
      [["var(--purple-dk)", 12, 0], ["var(--paper)", 30, 50], ["var(--paper)", 48, 100], ["var(--purple-dk)", 66, 150]]
        .forEach(([c, t, d]) => { html += `<div class="fx-card" style="--c:${c};top:${t}vh;animation-delay:${d}ms"></div>`; });
    } else {
      html += `<div class="fx-iris"></div>`;
    }
    html += `<div class="fx-sfx"><span>${r.sfx}</span></div>`;
    fx.innerHTML = html;
    fx.classList.add("on");
    BG.pulse(1);
    if (r.sfx.includes("ORA") || r.sfx.includes("MUDA")) Sound.barrage(); else Sound.menace();
    setTimeout(swap, 330);
    setTimeout(() => { fx.classList.remove("on"); fx.innerHTML = ""; }, 1000);
  }

  /* ---------------- Helpers ---------------- */
  function pageTitle(title, jp) {
    return `<header class="ptitle"><span class="ptitle__jp">${jp}</span><h1 class="ptitle__main" data-text="${title}">${title}</h1></header>`;
  }
  function hints(rows) {
    return `<div class="hints">${rows.map(([k, t]) => `<div class="hints__row"><span class="hints__key">${k}</span><span>${t}</span></div>`).join("")}</div>`;
  }
  function backToMenu() { Sound.back(); location.hash = "#/"; }
  function isTyping(e) { return /INPUT|TEXTAREA|SELECT/.test(e.target.tagName); }
  function openLink(href) {
    if (href.startsWith("#")) { location.hash = href; return; }
    if (href.startsWith("mailto:") || href.startsWith("tel:")) { location.href = href; return; }
    window.open(href, "_blank", "noopener,noreferrer");
  }
  function linkAttrs(href) {
    return href.startsWith("http") || href.endsWith(".pdf") ? `href="${href}" target="_blank" rel="noopener"` : `href="${href}"`;
  }
  function restartAnim(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function mountedSoon(root) { requestAnimationFrame(() => setTimeout(() => root.classList.add("mounted"), 40)); }

  /* ================================================================
     MENU PRINCIPAL (polygones qui ondulent, style menu de jeu)
     ================================================================ */
  function renderMenu() {
    let active = 0;
    try { active = Number(sessionStorage.getItem("kbp-menu")) || 0; } catch { /* ignore */ }
    const root = document.createElement("section");
    root.className = "menu";
    root.innerHTML = `
      <div class="menu__name" aria-hidden="true">
        <span>Kenji's</span><span class="menu__name-big">Bizarre</span><span>Portfolio</span>
      </div>
      <div class="menu__portrait" aria-hidden="true">
        <div class="menu__portrait-frame"><img src="${PROFILE.photo}" alt=""><div class="menu__portrait-tone"></div></div>
        <div class="menu__stand"><small>STAND</small>「${PROFILE.stand}」</div>
        <div class="menu__user">${PROFILE.firstName.toUpperCase()} ${PROFILE.lastName.toUpperCase()}<small>${PROFILE.title}</small></div>
      </div>
      <div class="menu__menace" aria-hidden="true">${"<span>ゴ</span>".repeat(4)}</div>
      <nav class="menu__list" aria-label="Menu principal">
        ${MENU.map((m, i) => `
          <a class="mrow" href="#/${m.route}" data-i="${i}" style="--fs:${m.size};--dx:${m.dx}px;--i:${i}">
            <span class="mrow__glow"></span>
            <span class="mrow__skew" style="transform:skewX(${m.skew}deg) skewY(${m.skewY}deg)">
              <span class="mrow__shadow"></span>
              <span class="mrow__hl"></span>
              <span class="mrow__label">
                <span class="mrow__txt mrow__txt--dark">${m.label}</span>
                <span class="mrow__txt mrow__txt--bright" aria-hidden="true">${m.label}</span>
              </span>
              <span class="mrow__jp" aria-hidden="true">${m.jp}</span>
            </span>
          </a>`).join("")}
      </nav>
      ${hints([["↑↓", "NAVIGUER"], ["↵", "CONFIRMER"]])}
    `;
    view.appendChild(root);
    const rows = $$(".mrow", root);

    function setActive(i, silent) {
      i = (i + rows.length) % rows.length;
      if (i === active && rows[i].classList.contains("active")) return;
      active = i;
      rows.forEach((r, k) => {
        r.classList.toggle("active", k === i);
        r.style.setProperty("--dist", Math.abs(k - i));
      });
      restartAnim($(".mrow__shadow", rows[i]), "pop");
      try { sessionStorage.setItem("kbp-menu", i); } catch { /* ignore */ }
      if (!silent) { Sound.select(); BG.pulse(0.15); }
    }
    rows.forEach((r, i) => {
      r.addEventListener("mouseenter", () => setActive(i));
      r.addEventListener("focus", () => setActive(i));
      r.addEventListener("click", () => Sound.confirm());
    });
    setActive(active, true);
    rows[active].classList.add("active");
    setTimeout(() => root.classList.add("mounted"), REDUCE ? 0 : 420);

    return {
      onKey(e) {
        if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
        else if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
        else if (e.key === "Enter" && document.activeElement === document.body) { Sound.confirm(); location.hash = rows[active].getAttribute("href"); }
      },
    };
  }

  /* ================================================================
     À PROPOS — barres + panneau de révélation incliné
     ================================================================ */
  function renderAbout() {
    let active = 0, revealed = false;
    const root = document.createElement("section");
    root.className = "about";
    root.innerHTML = `
      ${pageTitle("À PROPOS", "スタンド使い")}
      <div class="about__bars" role="list">
        ${ABOUT.map((a, i) => `
          <button type="button" class="abar" role="listitem" data-i="${i}" style="--i:${i}">
            <span class="abar__red"></span>
            <span class="abar__bar">
              <img class="abar__char" src="${PROFILE.photo}" alt="" style="object-position:${a.pos}">
              <span class="abar__fill"></span>
              <span class="abar__content">
                <span class="abar__role">${a.tag}</span>
                <span class="abar__label">${a.label}</span>
                <span class="abar__go">▶</span>
              </span>
            </span>
          </button>`).join("")}
      </div>
      <div class="about__reveal" aria-live="polite"></div>
      ${hints([["↑↓", "CHOISIR"], ["↵ / →", "RÉVÉLER"], ["ESC", "RETOUR"]])}
    `;
    view.appendChild(root);
    const bars = $$(".abar", root);
    const reveal = $(".about__reveal", root);

    function paint() {
      bars.forEach((b, k) => b.classList.toggle("active", k === active));
      if (!revealed) { reveal.innerHTML = ""; root.classList.remove("is-revealed"); return; }
      root.classList.add("is-revealed");
      const a = ABOUT[active];
      reveal.innerHTML = `
        <div class="rv-dim" data-close-reveal></div>
        <div class="rv-portrait"><img src="${PROFILE.photo}" alt="Portrait de Kenji Chapuis--Voisain"><div class="rv-portrait__tone"></div></div>
        <div class="rv-nav"><span class="rv-arrow l">◄</span><span class="rv-btn">${String(active + 1).padStart(2, "0")}</span><span class="rv-dot"></span><span class="rv-tag">${a.label}</span><span class="rv-arrow r">►</span></div>
        <div class="rv-panel">
          <div class="rv-upper">${a.upper.map((l) => `<p>${l}</p>`).join("")}</div>
          <div class="rv-lower">${a.lower}</div>
        </div>
        <button type="button" class="rv-close" data-close-reveal>✕ FERMER</button>`;
      $$("[data-close-reveal]", reveal).forEach((el) => el.addEventListener("click", () => { revealed = false; Sound.back(); paint(); }));
    }
    function setActive(i, silent) {
      i = Math.max(0, Math.min(ABOUT.length - 1, i));
      if (i === active && !silent) return;
      active = i; if (!silent) Sound.select(); paint();
    }
    bars.forEach((b, i) => {
      b.addEventListener("mouseenter", () => { if (!revealed) setActive(i); });
      b.addEventListener("click", () => { active = i; revealed = true; Sound.confirm(); BG.pulse(0.6); paint(); });
    });
    paint(); mountedSoon(root);

    return {
      onKey(e) {
        if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
        else if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
        else if (e.key === "Enter" || e.key === "ArrowRight") { e.preventDefault(); if (!revealed) { revealed = true; Sound.confirm(); BG.pulse(0.6); paint(); } }
        else if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") {
          e.preventDefault();
          if (revealed) { revealed = false; Sound.back(); paint(); } else backToMenu();
        }
      },
    };
  }

  /* ================================================================
     CARTES « RANG » + PANNEAU DÉTAIL (CV, Expériences)
     ================================================================ */
  function radarSVG(stats) {
    const cx = 150, cy = 150, R = 105, n = stats.length;
    const pt = (i, r) => {
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    };
    const ring = (r) => stats.map((_, i) => pt(i, r).join(",")).join(" ");
    const val = stats.map((s, i) => pt(i, (s.n / 5) * R).join(",")).join(" ");
    return `
      <svg class="radar" viewBox="-20 -24 340 348" role="img" aria-label="Statistiques de Stand : ${stats.map((s) => `${s.k} ${s.v}`).join(", ")}">
        ${[1, 0.8, 0.6, 0.4, 0.2].map((f) => `<polygon class="radar__ring" points="${ring(R * f)}"/>`).join("")}
        ${stats.map((_, i) => `<line class="radar__axis" x1="${cx}" y1="${cy}" x2="${pt(i, R)[0]}" y2="${pt(i, R)[1]}"/>`).join("")}
        <polygon class="radar__val" points="${val}"/>
        ${stats.map((s, i) => {
          const [x, y] = pt(i, R + 26);
          return `<g class="radar__lbl"><circle cx="${x}" cy="${y}" r="15"/><text x="${x}" y="${y + 6}">${s.v}</text></g>`;
        }).join("")}
        ${stats.map((s, i) => { const [x, y] = pt(i, R + 26); return `<text class="radar__k" x="${x}" y="${y + (y > cy ? 30 : -22)}">${s.k}</text>`; }).join("")}
      </svg>`;
  }

  function renderCards(sub, cfg) {
    let active = Math.max(0, cfg.data.findIndex((d) => d.title.toLowerCase() === (sub || "").toLowerCase()));
    const root = document.createElement("section");
    root.className = "cards";
    root.innerHTML = `
      <div class="cards__mask" aria-hidden="true"></div>
      ${pageTitle(cfg.title, cfg.jp)}
      <div class="cards__stack">
        ${cfg.data.map((d, i) => `
          <button type="button" class="ccard" data-i="${i}" style="--i:${i}">
            <span class="ccard__body">
              <span class="ccard__badge"><span>${d.badge}</span></span>
              <span class="ccard__inner">
                <span class="ccard__title">${d.title}</span>
                <span class="ccard__rank"><small>${cfg.tag}</small><b>${d.rank}</b></span>
              </span>
              <span class="ccard__sub"><span>${d.subtitle}</span></span>
            </span>
          </button>`).join("")}
        ${cfg.cta ? `<a class="cards__cta" href="${PROFILE.cv}" target="_blank" rel="noopener">⬇ TÉLÉCHARGER LE CV (PDF)</a>` : ""}
      </div>
      <article class="cards__detail" aria-live="polite"></article>
      ${hints([["↑↓", "CHOISIR"], ["ESC", "RETOUR"]])}
    `;
    view.appendChild(root);
    const cards = $$(".ccard", root);
    const detail = $(".cards__detail", root);

    function paint() {
      cards.forEach((c, k) => c.classList.toggle("active", k === active));
      const d = cfg.data[active];
      detail.innerHTML = `
        <div class="dt-top"><span class="dt-top__idx">${String(active + 1).padStart(2, "0")}</span><span class="dt-top__title">${d.head}</span><span class="dt-top__prog">${d.progress}</span></div>
        ${d.radar ? `<div class="dt-radar"><div class="dt-radar__name"><small>STAND NAME</small>「${PROFILE.stand}」<small>STAND USER</small>${PROFILE.firstName} ${PROFILE.lastName}</div>${radarSVG(STAND_STATS)}</div>` : ""}
        <div class="dt-list">
          ${d.rows.map((r, k) => `<div class="dt-row" style="--k:${k}"><span class="dt-row__idx">${r.index}</span><span class="dt-row__title">${r.title}</span><span class="dt-row__status">${r.status}</span></div>`).join("")}
        </div>
        <div class="dt-bottom">
          <div class="dt-bottom__title">${d.bulletsTitle}</div>
          ${d.bullets.map((b) => `<p class="dt-bullet">— ${b}</p>`).join("")}
          ${d.link ? `<a class="dt-link" href="${d.link.href}">${d.link.label} ►</a>` : ""}
        </div>`;
      restartAnim(detail, "swap");
    }
    function setActive(i, silent) {
      i = Math.max(0, Math.min(cfg.data.length - 1, i));
      if (i === active && !silent) return;
      active = i; if (!silent) { Sound.select(); BG.pulse(0.2); } paint();
    }
    cards.forEach((c, i) => {
      c.addEventListener("mouseenter", () => { if (!isMobile()) setActive(i); });
      c.addEventListener("click", () => {
        setActive(i);
        if (isMobile()) detail.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "start" });
      });
    });
    paint(); mountedSoon(root);

    return {
      onKey(e) {
        if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
        else if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
        else if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") { e.preventDefault(); backToMenu(); }
      },
    };
  }

  /* ================================================================
     JOURNAL (liste à gauche + panneau détaillé) — Projets, Veille, Passions
     ================================================================ */
  function renderLog(sub, cfg) {
    let active = Math.max(0, cfg.data.findIndex((d) => d.id === sub));
    const root = document.createElement("section");
    root.className = "log";
    root.innerHTML = `
      ${pageTitle(cfg.title, cfg.jp)}
      <div class="log__list">
        ${cfg.data.map((d, i) => `
          <a class="litem" href="#/${parse().route}/${d.id}" data-i="${i}" style="--i:${i}">
            <span class="litem__num">${String(i + 1).padStart(2, "0")}</span>
            <span class="litem__title">${d.title}</span>
            <span class="litem__stack">${d.stack}</span>
          </a>`).join("")}
      </div>
      <article class="log__panel" aria-live="polite" tabindex="-1"></article>
      ${hints([["↑↓", "CHOISIR"], ["↵", "OUVRIR"], ["ESC", "RETOUR"]])}
    `;
    view.appendChild(root);
    const items = $$(".litem", root);
    const panel = $(".log__panel", root);

    function section([h, p]) { return `<div class="lp-sec"><h3>${h}</h3><p>${p}</p></div>`; }

    function paint() {
      items.forEach((it, k) => { it.classList.toggle("active", k === active); it.setAttribute("aria-current", k === active ? "true" : "false"); });
      const d = cfg.data[active];
      panel.innerHTML = `
        <span class="lp-tag">${cfg.label} ${String(active + 1).padStart(2, "0")} · ${d.tag}</span>
        <h2 class="lp-title">${d.title}</h2>
        <p class="lp-stack">${d.stack}</p>
        <p class="lp-summary">${d.summary}</p>
        ${d.stands ? `<div class="lp-stands">${d.stands.map((s) => `
          <figure class="stand-card"><div class="stand-card__img"><img src="${s.img}" alt="${s.name}" loading="lazy"></div>
          <figcaption><b>「${s.name}」</b><small>${s.user}</small></figcaption></figure>`).join("")}</div>` : ""}
        ${(d.body || []).map(section).join("")}
        ${d.code ? `<pre class="lp-code"><code>${d.code.replace(/</g, "&lt;")}</code></pre>` : ""}
        ${d.gallery ? `<div class="lp-gallery">${d.gallery.map((g, k) => `
          <button type="button" class="lp-shot" data-shot="${k}"><img src="${g.src}" alt="${g.cap}" loading="lazy"><span>${g.cap}</span></button>`).join("")}</div>` : ""}
        ${d.models ? `<div class="lp-models"><h3>GALERIE 3D INTERACTIVE · 360°</h3><div class="lp-models__grid">${d.models.map((m, k) => `
          <button type="button" class="lp-model" data-model="${k}"><b>${String(k + 1).padStart(2, "0")}</b><span>${m.t}</span></button>`).join("")}</div></div>` : ""}
        ${d.chips ? `<div class="lp-chips">${d.chips.map((c) => `<span>${c}</span>`).join("")}</div>` : ""}
        ${d.links ? `<div class="lp-links">${d.links.map((l) => `<a class="lp-link" ${linkAttrs(l.href)}>OUVRIR : ${l.label} ►</a>`).join("")}</div>` : ""}
      `;
      $$(".lp-shot", panel).forEach((b) => b.addEventListener("click", () => {
        const g = d.gallery[Number(b.dataset.shot)];
        Sound.confirm();
        Modal.open(g.cap, `<img class="modal__img" src="${g.src}" alt="${g.cap}">`);
      }));
      $$(".lp-model", panel).forEach((b) => b.addEventListener("click", () => {
        const m = d.models[Number(b.dataset.model)];
        Sound.confirm();
        Modal.open(m.t, `
          <div class="modal__frame"><iframe src="https://skpviewer.com/viewer/?urn=${m.u}" title="Modèle 3D : ${m.t}" allowfullscreen loading="lazy"></iframe></div>
          <p class="modal__cap">${m.d} <em>Clic gauche : rotation · molette : zoom · clic droit : déplacement.</em></p>
          <a class="lp-link" href="https://skpviewer.com/viewer/?urn=${m.u}" target="_blank" rel="noopener">OUVRIR DANS UN NOUVEL ONGLET ►</a>`);
      }));
      restartAnim(panel, "swap");
      panel.scrollTop = 0;
    }
    function setActive(i, silent) {
      i = Math.max(0, Math.min(cfg.data.length - 1, i));
      if (i === active && !silent) return;
      active = i; if (!silent) { Sound.select(); BG.pulse(0.2); } paint();
    }
    items.forEach((it, i) => {
      it.addEventListener("mouseenter", () => { if (!isMobile()) setActive(i); });
      it.addEventListener("click", (e) => {
        e.preventDefault();
        history.replaceState(null, "", it.getAttribute("href"));
        setActive(i); Sound.confirm();
        if (isMobile()) panel.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "start" });
      });
    });
    paint(); mountedSoon(root);

    return {
      select(id) { const i = cfg.data.findIndex((d) => d.id === id); if (i >= 0) setActive(i); },
      onKey(e) {
        if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
        else if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
        else if (e.key === "Enter" && document.activeElement === document.body) {
          const d = cfg.data[active];
          if (d.links && d.links[0]) { Sound.confirm(); openLink(d.links[0].href); }
          else panel.focus();
        }
        else if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") { e.preventDefault(); backToMenu(); }
      },
    };
  }

  /* ================================================================
     BARRES « PARTY » + liens à droite — Certifications, Contact
     ================================================================ */
  function renderBars(sub, cfg) {
    let active = 0, info = 0, focus = "left";
    const root = document.createElement("section");
    root.className = "bars";
    root.innerHTML = `
      ${pageTitle(cfg.title, cfg.jp)}
      <div class="bars__left" role="list">
        ${cfg.data.map((d, i) => `
          <button type="button" class="pbar" role="listitem" data-i="${i}" style="--i:${i}">
            <span class="pbar__red"></span>
            <span class="pbar__bar">
              <span class="pbar__fill"></span>
              <span class="pbar__content">
                <span class="pbar__role">${d.role}</span>
                <span class="pbar__icon">${d.icon ? `<img src="${d.icon}" alt="">` : `<i>${d.glyph}</i>`}</span>
                <span class="pbar__label">${d.label}</span>
                <span class="pbar__stats">${d.stats.map((s) => `
                  <span class="pstat"><span class="pstat__top"><span class="pstat__tag" style="color:${s.color};border-color:${s.color}">${s.tag}</span><span class="pstat__num">${s.value}</span></span>
                  <span class="pstat__bar" style="background:${s.color}"></span><span class="pstat__bar2"></span></span>`).join("")}
                </span>
              </span>
            </span>
          </button>`).join("")}
      </div>
      <div class="bars__right" aria-live="polite"></div>
      ${hints([["TAB", "CHANGER DE CÔTÉ"], ["↑↓", "CHOISIR"], ["↵", "OUVRIR"], ["ESC", "RETOUR"]])}
    `;
    view.appendChild(root);
    const bars = $$(".pbar", root);
    const right = $(".bars__right", root);

    function paint() {
      bars.forEach((b, k) => b.classList.toggle("active", k === active));
      root.classList.toggle("focus-right", focus === "right");
      const d = cfg.data[active];
      right.innerHTML = `
        <div class="bnav"><span class="bnav__arrow l">◄</span><span class="bnav__key">${cfg.side}</span><span class="bnav__label">${d.label}</span><span class="bnav__arrow r">►</span></div>
        <p class="bdesc">${d.desc}</p>
        <div class="binfo">
          ${d.links.map((l, k) => `
            <a class="binfo__row${focus === "right" && k === info ? " selected" : ""}" ${linkAttrs(l.href)} data-k="${k}" style="--k:${k}">
              ${k === 0 ? `<span class="binfo__new">NEW!</span>` : ""}
              <span class="binfo__icon">${d.icon ? `<img src="${d.icon}" alt="">` : `<i>${d.glyph}</i>`}</span>
              <span class="binfo__text">${l.text}</span>
              <span class="binfo__box">VOIR</span>
              <span class="binfo__count">${l.count}</span>
            </a>`).join("")}
        </div>`;
      $$(".binfo__row", right).forEach((a) => {
        a.addEventListener("mouseenter", () => { focus = "right"; info = Number(a.dataset.k); markInfo(); });
        a.addEventListener("click", () => Sound.confirm());
      });
    }
    function markInfo() {
      root.classList.toggle("focus-right", focus === "right");
      $$(".binfo__row", right).forEach((a, k) => a.classList.toggle("selected", focus === "right" && k === info));
    }
    function setActive(i, silent) {
      i = Math.max(0, Math.min(cfg.data.length - 1, i));
      if (i === active && !silent) return;
      active = i; info = 0; if (!silent) { Sound.select(); BG.pulse(0.2); } paint();
    }
    bars.forEach((b, i) => {
      b.addEventListener("mouseenter", () => { focus = "left"; if (!isMobile()) setActive(i); else markInfo(); });
      b.addEventListener("click", () => {
        if (active === i && !isMobile()) { Sound.confirm(); openLink(cfg.data[i].href); return; }
        focus = "left"; setActive(i);
        if (isMobile()) right.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "start" });
      });
    });
    paint(); mountedSoon(root);

    return {
      onKey(e) {
        const d = cfg.data[active];
        if (e.key === "Tab" && !e.shiftKey && document.activeElement === document.body) {
          e.preventDefault(); focus = focus === "left" ? "right" : "left"; info = 0; Sound.select(); markInfo(); return;
        }
        if (e.key === "Escape" || e.key === "Backspace") { e.preventDefault(); backToMenu(); return; }
        if (focus === "left") {
          if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
          else if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
          else if (e.key === "ArrowRight") { e.preventDefault(); focus = "right"; info = 0; Sound.select(); markInfo(); }
          else if (e.key === "ArrowLeft") { e.preventDefault(); backToMenu(); }
          else if (e.key === "Enter" && document.activeElement === document.body) { Sound.confirm(); openLink(d.href); }
        } else {
          if (e.key === "ArrowUp") { e.preventDefault(); info = Math.max(0, info - 1); Sound.select(); markInfo(); }
          else if (e.key === "ArrowDown") { e.preventDefault(); info = Math.min(d.links.length - 1, info + 1); Sound.select(); markInfo(); }
          else if (e.key === "ArrowLeft") { e.preventDefault(); focus = "left"; Sound.select(); markInfo(); }
          else if (e.key === "Enter" && document.activeElement === document.body) { Sound.confirm(); openLink(d.links[info].href); }
        }
      },
    };
  }

  /* ---------------- Modale ---------------- */
  const Modal = (() => {
    const el = $("#modal"), body = $("#modalBody"), title = $("#modalTitle");
    let last = null;
    function open(t, html) {
      last = document.activeElement;
      title.textContent = t; body.innerHTML = html;
      el.hidden = false; requestAnimationFrame(() => el.classList.add("open"));
      $(".modal__close", el).focus();
    }
    function close() {
      if (el.hidden) return;
      el.classList.remove("open");
      setTimeout(() => { el.hidden = true; body.innerHTML = ""; }, 220);
      Sound.back();
      if (last && last.focus) last.focus();
    }
    $$("[data-close]", el).forEach((b) => b.addEventListener("click", close));
    return { open, close, get isOpen() { return !el.hidden; } };
  })();

  /* ---------------- Clavier global ---------------- */
  addEventListener("keydown", (e) => {
    if (!$("#intro").hidden) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); startIntro(); }
      return;
    }
    if (Modal.isOpen) { if (e.key === "Escape") { e.preventDefault(); Modal.close(); } return; }
    if (isTyping(e) || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "Backspace" && current && current.route === "menu") return;
    if (current && current.onKey) current.onKey(e);
  });

  /* ---------------- BGM / SFX ---------------- */
  const bgmToggle = $("#bgmToggle"), vol = $("#bgmVol"), volVal = $("#bgmVolVal"), sfxToggle = $("#sfxToggle");
  vol.value = Sound.volume; volVal.textContent = Math.round(Sound.volume * 100);
  function paintAudio() {
    bgmToggle.textContent = Sound.bgmOn ? "BGM ON" : "BGM OFF";
    bgmToggle.classList.toggle("on", Sound.bgmOn);
    bgmToggle.setAttribute("aria-pressed", Sound.bgmOn);
    sfxToggle.textContent = Sound.sfxOn ? "SFX ON" : "SFX OFF";
    sfxToggle.classList.toggle("on", Sound.sfxOn);
    sfxToggle.setAttribute("aria-pressed", Sound.sfxOn);
  }
  bgmToggle.addEventListener("click", () => { Sound.bgmOn ? Sound.stopBgm() : Sound.startBgm(); paintAudio(); bgmToggle.blur(); });
  sfxToggle.addEventListener("click", () => { Sound.setSfx(!Sound.sfxOn); Sound.select(); paintAudio(); sfxToggle.blur(); });
  vol.addEventListener("input", () => { Sound.setVolume(Number(vol.value)); volVal.textContent = Math.round(vol.value * 100); });
  vol.addEventListener("keydown", (e) => e.stopPropagation());
  paintAudio();

  /* ---------------- Intro ---------------- */
  const intro = $("#intro");
  let introDone = false;
  function startIntro() {
    if (introDone) return;
    introDone = true;
    Sound.ensure();
    Sound.barrage();
    if (Sound.wantsBgm()) { Sound.startBgm(); paintAudio(); }
    BG.pulse(1.2);
    intro.classList.add("leave");
    try { sessionStorage.setItem("kbp-intro", "1"); } catch { /* ignore */ }
    setTimeout(() => { intro.hidden = true; mount(parse().route, parse().sub); }, REDUCE ? 0 : 650);
  }
  $("#introStart").addEventListener("click", startIntro);
  intro.addEventListener("click", (e) => { if (e.target === intro) startIntro(); });

  let seen = false;
  try { seen = sessionStorage.getItem("kbp-intro") === "1"; } catch { /* ignore */ }
  if (seen) {
    intro.hidden = true; introDone = true;
    go(true);
    // Le navigateur exige un geste pour l'audio : on relance la BGM au premier clic.
    if (Sound.wantsBgm()) {
      const unlock = () => { Sound.startBgm(); paintAudio(); };
      addEventListener("pointerdown", unlock, { once: true });
    }
  } else {
    requestAnimationFrame(() => intro.classList.add("show"));
  }

  addEventListener("hashchange", () => { if (introDone) go(); });
})();
