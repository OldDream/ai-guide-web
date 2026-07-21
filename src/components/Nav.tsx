import { useRef } from "react"
import { ScrollTrigger, useGSAP } from "../register"
import { CHAPTERS, TOTAL_TIPS } from "../data/tips"

/** 52px translucent bar — clear over the hero, frosted once you scroll. */
export default function Nav() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 24,
        end: "max",
        toggleClass: { targets: ref.current, className: "is-scrolled" },
      })

      // Flip to dark mode while the black context chapter is under the bar.
      // Element ref, not a selector — the useGSAP scope would confine a
      // string trigger to inside this <nav> and never find #ch2.
      ScrollTrigger.create({
        trigger: document.getElementById("ch2"),
        start: "top 52",
        end: "bottom 52",
        toggleClass: { targets: ref.current, className: "nav--dark" },
      })
    },
    { scope: ref }
  )

  return (
    <nav className="nav" ref={ref} aria-label="页面导航">
      <div className="nav-inner">
        <a className="nav-brand" href="#top">
          <span className="prompt">❯</span>
          挖掘 AI 编程潜力
        </a>
        <ul className="nav-links">
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`}>{c.name}</a>
            </li>
          ))}
        </ul>
        <span className="nav-count" aria-hidden="true">
          {TOTAL_TIPS} 条
        </span>
      </div>
    </nav>
  )
}
