import { useRef } from "react"
import { gsap, useGSAP } from "../register"
import Seal from "./Seal"

type Props = {
  mark: string
  title: string
  tagline: string
  seal: string
  index: number
  total: number
}

export default function ChapterDivider({ mark, title, tagline, seal, index, total }: Props) {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      gsap.set(".chap__rule", { scaleX: 0, transformOrigin: "left center" })

      if (reduce) {
        gsap.set(".chap__rule", { scaleX: 1 })
        return
      }

      gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: "top 80%" },
        defaults: { ease: "power3.out" },
      })
        .from(".chap__seal", {
          autoAlpha: 0,
          scale: 1.9,
          rotation: 14,
          duration: 0.5,
          ease: "back.out(1.7)",
        })
        .from(".chap__eyebrow", { autoAlpha: 0, y: 10, duration: 0.45 }, "-=0.15")
        .from(".chap__title", { autoAlpha: 0, y: 14, duration: 0.5 }, "<0.04")
        .from(".chap__tagline", { autoAlpha: 0, duration: 0.5 }, "<0.08")
        .to(".chap__rule", { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "<")
    },
    { scope },
  )

  return (
    <section className="chap" ref={scope}>
      <Seal className="chap__seal" char={seal} />
      <div className="chap__meta">
        <span className="chap__eyebrow">
          CH {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <h2 className="chap__title">
          {mark} · {title}
        </h2>
      </div>
      <p className="chap__tagline">{tagline}</p>
      <span className="chap__rule" />
    </section>
  )
}
