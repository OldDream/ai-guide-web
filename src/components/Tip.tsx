import { useRef } from "react"
import { gsap, useGSAP } from "../register"
import type { Tip as TipData } from "../data/tips"
import PlanReviewLoop from "./PlanReviewLoop"

type Props = {
  tip: TipData
  index: number
  chapterMark: string
  chapterTitle: string
}

export default function Tip({ tip, index, chapterMark, chapterTitle }: Props) {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) return

      gsap.from(scope.current!.querySelectorAll("[data-reveal]"), {
        autoAlpha: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: scope.current, start: "top 82%", once: true },
      })
    },
    { scope },
  )

  return (
    <article className="tip" ref={scope}>
      <div className="tip__margin" data-reveal>
        <span className="tip__num">{String(index).padStart(2, "0")}</span>
        <span className="tip__chap">
          {chapterMark} · {chapterTitle}
        </span>
      </div>
      <div className="tip__body">
        <h3 className="tip__title" data-reveal>
          {tip.title}
        </h3>
        <p className="tip__text" data-reveal>{tip.text}</p>

        {tip.diagram === "loop" && (
          <div data-reveal>
            <PlanReviewLoop />
          </div>
        )}

        {tip.code && (
          <div className="code" data-reveal>
            <code>{tip.code}</code>
            {tip.codeCaption && <span className="code__caption">{tip.codeCaption}</span>}
          </div>
        )}

        {tip.tags && (
          <ul className="tags" data-reveal>
            {tip.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        {tip.refs && (
          <ul className="refs" data-reveal>
            {tip.refs.map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noopener noreferrer">
                  {r.label}
                </a>
                <span className="refs__note">{r.note}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
