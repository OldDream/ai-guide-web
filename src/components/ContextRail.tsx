import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { TOTAL_TIPS } from "../data/tips"

/**
 * The signature element: scroll progress presented as context-window
 * consumption, with the article's own 40%-attention warning marked in
 * cinnabar. A rAF-throttled scroll listener drives a CSS variable so the
 * desktop vertical fill and the mobile top bar share one source of truth.
 * The mapping mirrors ScrollTrigger's "top center" → "bottom bottom": the
 * meter sits empty through the hero and fills as the tips scroll past.
 */
export default function ContextRail() {
  const scope = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)

  const ticks = Array.from({ length: TOTAL_TIPS }, (_, i) => {
    const at = (i / (TOTAL_TIPS - 1)) * 100
    const style = { "--at": `${at}%` } as CSSProperties
    const cls = ["rail__tick", i % 5 === 0 ? "rail__tick--major" : ""].filter(Boolean).join(" ")
    return <span key={i} className={cls} style={style} />
  })

  useEffect(() => {
    const el = scope.current
    if (!el) return
    const rail = el.querySelector<HTMLElement>(".rail")
    const railbar = el.querySelector<HTMLElement>(".railbar")
    let raf = 0

    const recompute = () => {
      raf = 0
      const track = document.getElementById("track")
      if (!track) return
      const vh = window.innerHeight
      const r = track.getBoundingClientRect()
      const startScroll = r.top + window.scrollY - vh * 0.5
      const endScroll = r.bottom + window.scrollY - vh
      const span = endScroll - startScroll
      const y = window.scrollY
      let p = span > 0 ? (y - startScroll) / span : 0
      p = Math.max(0, Math.min(1, p))
      el.style.setProperty("--p", String(p))
      if (readoutRef.current) {
        readoutRef.current.textContent = String(Math.round(p * 100)).padStart(2, "0")
      }
      const warn = p > 0.4
      rail?.classList.toggle("is-warn", warn)
      railbar?.classList.toggle("is-warn", warn)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(recompute)
    }

    recompute()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    const fontsReady = document.fonts?.ready
    fontsReady?.then(recompute).catch(() => {})

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div className="ctx" ref={scope} aria-hidden="true">
      <aside className="rail">
        <div className="rail__top">
          <div>ctx</div>
          <div>
            <span className="rail__readout" ref={readoutRef}>00</span>%
          </div>
        </div>
        <div className="rail__track">
          <div className="rail__fill" />
          {ticks}
          <span className="rail__band" />
          <span className="rail__band-label">40% 警戒</span>
        </div>
        <div className="rail__bottom">上下文</div>
      </aside>

      <div className="railbar">
        <div className="railbar__fill" />
      </div>
    </div>
  )
}
