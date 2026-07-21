import { useRef } from "react"
import { gsap, useGSAP } from "../register"
import Seal from "./Seal"
import { FOOTER_LINE, FOOTER_TEXT, COLOPHON } from "../data/tips"

export default function Footer() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) return

      gsap.from(scope.current!.querySelectorAll("[data-reveal]"), {
        autoAlpha: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: scope.current, start: "top 84%", once: true },
      })
    },
    { scope },
  )

  return (
    <footer className="foot" ref={scope}>
      <Seal className="foot__seal seal--tilt" char="终" />
      <h2 className="foot__big" data-reveal>
        {FOOTER_LINE}
      </h2>
      <p className="foot__text" data-reveal>
        {FOOTER_TEXT}
      </p>
      <p className="foot__colophon" data-reveal>
        {COLOPHON}
      </p>
    </footer>
  )
}
