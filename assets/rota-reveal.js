import { Component } from '@theme/component';

/**
 * Rota reveal component
 *
 * Fades its `[data-reveal]` children in as they enter the viewport. Content
 * stays fully visible without JS, or when the user prefers reduced motion —
 * the animation styles are gated behind the `rota-reveal--ready` class this
 * component adds and a `prefers-reduced-motion` media query.
 *
 * The camel's continuous drift lives in CSS (`rota-kenburns`), so it needs no
 * JavaScript and no scroll wiring.
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
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
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
