import { useRef } from "react"
import { gsap, ScrollTrigger, useGSAP } from "../register"
import { CHAPTERS } from "../data/tips"

/**
 * The signature element: a fixed "context window" rail on the left edge.
 * Reading the page spends the gauge — gradient fill tracks scroll progress,
 * chapter ticks light up, and the 40% mark echoes the attention cliff
 * the guide warns about in chapter two.
 */
export default function Gauge() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current!
      const fill = root.querySelector<HTMLElement>(".gauge-fill")!
      const pct = root.querySelector<HTMLElement>(".gauge-pct")!

      const setFill = gsap.quickTo(fill, "scaleY", {
        duration: 0.35,
        ease: "power2.out",
      })

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setFill(self.progress)
          pct.textContent = `${Math.round(self.progress * 100)}%`
          root.classList.toggle("is-past-40", self.progress >= 0.4)
        },
      })

      // Light up the tick of the chapter currently in view.
      // Element refs, not selectors — the useGSAP scope would confine
      // string triggers to inside this <aside> and never find the chapters.
      CHAPTERS.forEach((c) => {
        ScrollTrigger.create({
          trigger: document.getElementById(c.id),
          start: "top 55%",
          end: "bottom 55%",
          toggleClass: {
            targets: root.querySelector(`[data-ch="${c.id}"]`),
            className: "is-active",
          },
        })
      })

      // Light-on-dark treatment while the black chapter fills the viewport
      ScrollTrigger.create({
        trigger: document.getElementById("ch2"),
        start: "top 60%",
        end: "bottom 40%",
        toggleClass: { targets: root, className: "gauge--dark" },
      })
    },
    { scope: ref }
  )

  const N = CHAPTERS.length
  return (
    <aside className="gauge" ref={ref} aria-hidden="true">
      <div className="gauge-rail">
        <div className="gauge-fill" />
        <div className="gauge-mark">
          <span>40% · 注意力</span>
        </div>
        <ol className="gauge-ticks">
          {CHAPTERS.map((c, i) => (
            <li
              key={c.id}
              data-ch={c.id}
              style={{ top: `${(i / (N - 1)) * 100}%` }}
            >
              <span>{c.name}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="gauge-pct">0%</div>
    </aside>
  )
}
