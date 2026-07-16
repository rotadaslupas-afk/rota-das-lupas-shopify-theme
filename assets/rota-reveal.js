import { Component } from '@theme/component';

/**
 * Rota reveal component
 *
 * Two effects, both optional and gated behind `prefers-reduced-motion`:
 *
 * 1. Reveal — fades `[data-reveal]` children in as they enter the viewport.
 * 2. Parallax — drifts `[data-parallax]` slowly inside its frame while the
 *    section is on screen, so the camel reads as moving through the desert.
 *
 * Content stays fully visible without JS: the animation styles only apply once
 * this component adds `rota-reveal--ready` / `rota-narrativa--parallax`.
 *
 * @extends {Component}
 */
class RotaReveal extends Component {
  /** @type {IntersectionObserver | undefined} */
  #observer;

  /** @type {IntersectionObserver | undefined} */
  #parallaxObserver;

  /** @type {HTMLElement | null} */
  #media = null;

  /** @type {number | undefined} */
  #frame;

  /** Maximum drift in each direction, in pixels. */
  #range = 28;

  connectedCallback() {
    super.connectedCallback();

    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.#setupReveal();
    this.#setupParallax();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#observer?.disconnect();
    this.#parallaxObserver?.disconnect();
    this.#stopParallax();
  }

  #setupReveal() {
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

  #setupParallax() {
    this.#media = this.querySelector('.rota-narrativa__media');
    if (!this.#media?.querySelector('img')) return;

    this.classList.add('rota-narrativa--parallax');

    // Only run the scroll loop while the section is actually on screen.
    this.#parallaxObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) this.#startParallax();
        else this.#stopParallax();
      },
      { rootMargin: '100px 0px' }
    );

    this.#parallaxObserver.observe(this);
  }

  #startParallax() {
    if (this.#frame != null) return;

    const tick = () => {
      this.#updateParallax();
      this.#frame = requestAnimationFrame(tick);
    };

    this.#frame = requestAnimationFrame(tick);
  }

  #stopParallax() {
    if (this.#frame == null) return;
    cancelAnimationFrame(this.#frame);
    this.#frame = undefined;
  }

  #updateParallax() {
    const media = this.#media;
    if (!media) return;

    const rect = this.getBoundingClientRect();
    const viewport = window.innerHeight;

    // -1 when the section is just below the fold, 1 when it has just left the top.
    const progress = 1 - (2 * (rect.top + rect.height / 2)) / (viewport + rect.height);
    const offset = (Math.max(-1, Math.min(1, progress)) * this.#range).toFixed(2);

    // Inherited by whichever image is currently visible (desktop or mobile).
    media.style.setProperty('--rota-parallax', `${offset}px`);
  }
}

if (!customElements.get('rota-reveal')) {
  customElements.define('rota-reveal', RotaReveal);
}
