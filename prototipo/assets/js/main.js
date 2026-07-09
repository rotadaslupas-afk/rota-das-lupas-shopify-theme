/* ==========================================================================
   ROTA DAS LUPAS — Interações da home
   - Header sticky com estado ao rolar
   - Reveal on scroll (IntersectionObserver)
   - Renderização dos produtos a partir dos dados mockados
   - Fallback de logo (mostra texto se a imagem não carregar)
   - Ano automático no rodapé
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Header: sombra/borda ao rolar ---- */
  const header = document.querySelector("[data-header]");
  if (header) {
    const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Fallback do logo: se a imagem falhar, usa versão em texto ---- */
  document.querySelectorAll("[data-logo]").forEach((brand) => {
    const img = brand.querySelector("img");
    if (!img) return;
    const fail = () => brand.classList.add("is-fallback");
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* ---- Produtos (renderiza ANTES do reveal para os cards entrarem na animação) ---- */
  const grid = document.querySelector("[data-products]");
  const items = window.ROTA_PRODUCTS || [];
  if (grid && items.length) {
    grid.innerHTML = items.map(cardTemplate).join("");
    grid.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
    });
  }

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  function cardTemplate(p) {
    const media = p.image
      ? `<img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">`
      : `<span class="card__ph">${escapeHtml(p.name)}</span>`;
    const flag = p.flag ? `<span class="card__flag">${escapeHtml(p.flag)}</span>` : "";
    const old = p.oldPrice ? `<s>${escapeHtml(p.oldPrice)}</s>` : "";
    return `
      <article class="card reveal">
        <div class="card__media">
          ${flag}
          ${media}
        </div>
        <div class="card__body">
          <h3 class="card__name">${escapeHtml(p.name)}</h3>
          <p class="card__desc">${escapeHtml(p.desc)}</p>
          <div class="card__foot">
            <span class="card__price">${old}${escapeHtml(p.price)}</span>
            <button class="card__add" type="button" aria-label="Adicionar ${escapeHtml(p.name)} ao carrinho">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        </div>
      </article>`;
  }

  /* ---- Ano no rodapé ---- */
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Utils ---- */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }
})();
