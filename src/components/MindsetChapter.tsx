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
          title="写文档"
          sub="LLM非常依赖你输入的文字，所以高质量的文档始终重要"
        />

        <div className="mrow">
          <h3 className="h-card" data-reveal>
            多写文档
          </h3>
          <p className="body-text" data-reveal data-reveal-delay="0.08">
            有价值的对话，叫 AI 写文档总结保存。
            codegraph之类的软件能自动根据代码变化更新文档，但是它只能解决快速找代码的问题，不能保留代码为什么这么写的原因（当然也能用多写注释解决）。
          </p>
        </div>
      </div>
    </section>
  )
}
