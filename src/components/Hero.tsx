import { useRef } from "react"
import { gsap, useGSAP } from "../register"
import Seal from "./Seal"
import { TITLE, SUBTITLE_EN, THESIS, HERO_SUB, TOTAL_TIPS } from "../data/tips"

export default function Hero() {
  const scope = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const text = textRef.current!
      const full = THESIS

      // Initial hidden states — set before paint to avoid any flash.
      gsap.set(".hero__topbar > *", { autoAlpha: 0, y: -8 })
      gsap.set(".hero__sub", { autoAlpha: 0, y: 14 })
      gsap.set(".hero__seal", { autoAlpha: 0, scale: 1.7, rotation: 4 })
      gsap.set(".hero__rule", { scaleX: 0, transformOrigin: "left center" })
      gsap.set(".hero__scroll", { autoAlpha: 0 })

      if (reduce) {
        text.textContent = full
        gsap.set(".hero__topbar > *", { autoAlpha: 1, y: 0 })
        gsap.set(".hero__sub", { autoAlpha: 1, y: 0 })
        gsap.set(".hero__seal", { autoAlpha: 0.92, scale: 1, rotation: -5 })
        gsap.set(".hero__rule", { scaleX: 1 })
        gsap.set(".hero__scroll", { autoAlpha: 0.6 })
        gsap.set(cursorRef.current, { autoAlpha: 0.5 })
        return
      }

      text.textContent = ""
      const counter = { n: 0 }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.to(".hero__topbar > *", { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 })
        .from(".hero__prompt", { autoAlpha: 0, duration: 0.3 }, ">-0.1")
        .to(
          counter,
          {
            n: full.length,
            duration: full.length * 0.06,
            ease: "none",
            onUpdate: () => {
              text.textContent = full.slice(0, Math.round(counter.n))
            },
          },
          "<",
        )
        .to(".hero__sub", { autoAlpha: 1, y: 0, duration: 0.6 }, ">-0.15")
        .to(".hero__rule", { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "<")
        .to(
          ".hero__seal",
          { autoAlpha: 0.92, scale: 1, rotation: -5, duration: 0.5, ease: "back.out(1.7)" },
          "<0.05",
        )
        .to(".hero__scroll", { autoAlpha: 0.6, duration: 0.4 }, "<0.1")

      // Blinking block cursor, independent of the main timeline.
      gsap.to(cursorRef.current, {
        autoAlpha: 0,
        duration: 0.42,
        repeat: -1,
        yoyo: true,
        ease: "none",
      })
    },
    { scope },
  )

  return (
    <header className="hero" ref={scope}>
      <div className="hero__topbar">
        <span className="hero__brand">
          {TITLE}
        </span>
        <span>{SUBTITLE_EN}</span>
        <span className="hero__count">
          00 / {String(TOTAL_TIPS).padStart(2, "0")}
        </span>
      </div>

      <h1 className="hero__thesis">
        <span className="hero__prompt">{"❯"}</span>
        <span className="hero__text" ref={textRef}></span>
        <span className="hero__cursor" ref={cursorRef}></span>
      </h1>

      <p className="hero__sub">{HERO_SUB}</p>

      <div className="hero__foot">
        <Seal className="hero__seal" char="AI" />
        <span className="hero__rule" />
        <span className="hero__scroll">scroll ↓</span>
      </div>
    </header>
  )
}
