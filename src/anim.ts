import { gsap } from "./register"

/**
 * Standard scroll-in reveal for every element with [data-reveal] inside scope.
 * Optional per-element offset: data-reveal-delay="0.15" (seconds).
 * Only call this inside a prefers-reduced-motion: no-preference branch —
 * without JS animation the elements simply render in their final state.
 */
export function revealAll(scope: HTMLElement | Document = document) {
  const els = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope as never)
  els.forEach((el) => {
    gsap.from(el, {
      y: 36,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      delay: parseFloat(el.dataset.revealDelay || "0"),
      scrollTrigger: {
        trigger: el,
        start: "top 86%",
        once: true,
      },
    })
  })
}
