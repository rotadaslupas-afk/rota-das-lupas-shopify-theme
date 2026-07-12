import { Component } from '@theme/component';

/**
 * Rota reveal component
 *
 * Reveals its `[data-reveal]` children with a subtle fade/translate when they
 * enter the viewport. Content stays fully visible without JS or when the user
 * prefers reduced motion — the animation styles are gated behind the
 * `rota-reveal--ready` class and a `prefers-reduced-motion` media query.
 *
 * @extends {Component}
 */
class RotaReveal extends Component {
  /** @type {IntersectionObserver | undefined} */
  #observer;

  connectedCallback() {
    super.connectedCallback();

    if (!('IntersectionObserver' in window)) return;

    const items = this.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    this.classList.add('rota-reveal--ready');

    this.#observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          this.#observer?.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    for (const item of items) this.#observer.observe(item);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#observer?.disconnect();
  }
}

if (!customElements.get('rota-reveal')) {
  customElements.define('rota-reveal', RotaReveal);
}
