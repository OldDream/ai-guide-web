import { useRef } from "react"
import { gsap, useGSAP } from "../register"
import { revealAll } from "../anim"
import SectionHead from "./SectionHead"

/** Chapter 5 · 沉淀 — document valuable conversations so AI can reuse them. */
export default function MindsetChapter() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealAll(ref.current!)
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section className="sec sec--cloud" id="ch5" ref={ref}>
      <div className="wrap">
        <SectionHead
          eyebrow="第五章"
          title="沉淀"
          sub="LLM终究会依赖你输入的文字，所以高质量的文档始终重要"
        />

        <div className="mrow">
          <h3 className="h-card" data-reveal>
            多沉淀文档
          </h3>
          <p className="body-text" data-reveal data-reveal-delay="0.08">
            有价值的对话，叫 AI 写文档总结，也可以直接/memory。
            那些自动生成的文档未必能很好满足我们的需求。
            文档质量越高，效果越好。
          </p>
        </div>
      </div>
    </section>
  )
}
