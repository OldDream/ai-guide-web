import { useRef } from "react"
import { gsap, useGSAP } from "../register"
import { revealAll } from "../anim"
import SectionHead from "./SectionHead"

/** Chapter 5 · 沉淀 — one quiet row, then the gradient closing line. */
export default function MindsetChapter() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealAll(ref.current!)

        // The closing statement zooms in gently, Apple finale style
        gsap.from(".closer .h-display, .closer-sub", {
          scale: 0.9,
          autoAlpha: 0,
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: ".closer",
            start: "top 92%",
            end: "top 45%",
            scrub: 1,
          },
        })
        gsap.from(".flow > *", {
          y: 20,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".flow", start: "top 92%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section className="sec sec--cloud" id="ch5" ref={ref}>
      <div className="wrap">
        <SectionHead
          eyebrow="第五章 · 沉淀"
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

        <div className="closer">
          <h3 className="h-display grad-text">不要死磕</h3>
          <p className="closer-sub">
            在被污染的上下文里死磕，往往越写越差。
          </p>
          <div className="flow" aria-label="死磕时的脱身流程">
            <span className="flow-step">总结提示词 + 开新会话</span>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
            <span className="flow-step">换模型</span>
          </div>
          <p className="closer-note">
            水平相近的模型也能互补。若你很清楚 bug
            的现象，务必写进提示词——这对 AI debug 极有帮助。
          </p>
        </div>
      </div>
    </section>
  )
}
