import { useRef } from "react"
import { gsap, useGSAP } from "../register"

const STATS = [
  { num: "11", label: "条实战札记" },
  { num: "5", label: "个主题" },
  { num: "1M", label: "上下文可载" },
]

/** Apple's footnote-stat band: big numerals, small labels, hairlines. */
export default function StatStrip() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".stat", {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section className="stats" ref={ref} aria-label="概览数据">
      <div className="stats-row">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
