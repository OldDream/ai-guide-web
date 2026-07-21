import { useRef } from "react"
import { gsap, useGSAP } from "../register"
import { revealAll } from "../anim"
import SectionHead from "./SectionHead"

/** Thin arrow between the three headline words; sized in em so it tracks the heading. */
function TitleArrow() {
  return (
    <svg className="title-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 12h17m-6-7 7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Small verdict mark for the constraint-fit rows. */
function Mark({ ok }: { ok: boolean }) {
  return ok ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 12.5l5 5L20 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Chapter 3 · 流程 — the loop draws itself as you scroll; three cards below. */
export default function ProcessChapter() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealAll(ref.current!)

        // The PLAN → 实施 → REVIEW ring draws with scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".loop-wrap",
            start: "top 88%",
            end: "top 38%",
            scrub: 1,
          },
        })
        tl.fromTo(
          ".loop-ring",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", duration: 1 }
        ).from(
          ".loop-node",
          { scale: 0, transformOrigin: "50% 50%", stagger: 0.3, duration: 0.12, ease: "back.out(2)" },
          0.12
        ).from(
          ".loop-arrow",
          { autoAlpha: 0, duration: 0.08 },
          0.92
        )

        gsap.from(".cards3 .card", {
          y: 44,
          autoAlpha: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.13,
          clearProps: "transform,opacity,visibility", // hand hover back to CSS
          scrollTrigger: { trigger: ".cards3", start: "top 82%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section className="sec sec--cloud" id="ch3" ref={ref}>
      <div className="wrap">
        <SectionHead
          eyebrow="第三章 · 流程"
          title={
            <>
              Plan<TitleArrow />实施<TitleArrow />Review
            </>
          }
          sub="循环往复——别让它一口气写到底。"
        />

        <div className="loop-wrap" aria-hidden="true">
          <svg className="loop" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="loop-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#0090ff" />
                <stop offset="0.5" stopColor="#8a5cf6" />
                <stop offset="1" stopColor="#e1439e" />
              </linearGradient>
            </defs>
            <path
              className="loop-track"
              d="M100 22 A78 78 0 1 1 99.94 22"
              pathLength="1"
            />
            <path
              className="loop-ring"
              d="M100 22 A78 78 0 1 1 99.94 22"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="0"
            />
            <path
              className="loop-arrow"
              d="M108 170 l-8 8 8 8"
              fill="none"
              stroke="#e1439e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g className="loop-node">
              <circle className="loop-dot" cx="100" cy="22" r="5" />
              <text className="loop-label" x="100" y="12" textAnchor="middle">
                PLAN
              </text>
            </g>
            <g className="loop-node">
              <circle className="loop-dot" cx="167.5" cy="139" r="5" />
              <text className="loop-label" x="167.5" y="162" textAnchor="middle">
                实施
              </text>
            </g>
            <g className="loop-node">
              <circle className="loop-dot" cx="32.5" cy="139" r="5" />
              <text className="loop-label" x="32.5" y="162" textAnchor="middle">
                REVIEW
              </text>
            </g>
          </svg>
        </div>

        <div className="cards3">
          <article className="card">
            <h3 className="h-card">先 Plan，后实施。</h3>
            <p className="body-text">
              感觉模型智力不够、爱跑偏，就先让它做计划、你来审。简要指出问题，给它探索的方向，让它自己完善。智力够的模型，描述完需求直接干，反倒便宜。
            </p>
            <div className="card-foot">
              <span className="chip">cc + plan · superpowers / grill-me</span>
              <span className="card-cap">
                外部约束不是免费的——给多少，取决于模型有多强 ↓
              </span>
            </div>
          </article>

          <article className="card">
            <h3 className="h-card">多 Review。</h3>
            <p className="body-text">
              让 AI 自己写久了，架构会变得奇怪。做完一轮需求就及时
              review，看到不合理就叫它重构——它倾向于沿着不合理的架构一路兜底，直到彻底无法维护。也可以另开一个对话来
              review。
            </p>
            <div className="card-foot">
              <span className="chip">Review + fix，确保产出满足【XXXXX】</span>
              <span className="card-cap">
                把Review的需求一起丢进提示词，能提升输出质量
              </span>
            </div>
          </article>

          <article className="card">
            <h3 className="h-card">让测试兜底。</h3>
            <p className="body-text">
              生成 plan 时让它一并生成测试用例，然后自己跑测试、自己改问题——开浏览器、看终端日志都自己来。但修不好就会循环烧钱，人得监督。
            </p>
            <div className="card-foot">
              <span className="chip">相似问题 3 次没修好 → 停止，等人介入</span>
              <span className="card-cap">提示词里预先埋好的停止条件</span>
            </div>
          </article>
        </div>

        {/* md L61: 同一套外部约束，对不同强度的模型收益完全不同 */}
        <div className="tune" data-reveal>
          <div className="tune-head">
            <span className="card-glyph">注意</span>
            <h3 className="h-card">约束的收益，因模型而异。</h3>
          </div>
          <div className="tune-rows">
            <div className="tune-row">
              <span className="tune-model">能力一般的模型，如dpv4</span>
              <span className="tune-verdict tune-verdict--yes">
                <Mark ok /> superpowers 有收益
              </span>
              <span className="tune-note">
                外部约束能补智力，帮它把 plan 做扎实
              </span>
            </div>
            <div className="tune-row">
              <span className="tune-model">强模型 · kimi k3 / glm-5.2</span>
              <span className="tune-verdict tune-verdict--no">
                <Mark ok={false} /> 别上 superpowers
              </span>
              <span className="tune-note">约束太多，反而影响它发挥</span>
            </div>
            <div className="tune-row">
              <span className="tune-model">长程任务很强的模型</span>
              <span className="tune-verdict tune-verdict--yes">
                <Mark ok /> 适合 grill-me
              </span>
              <span className="tune-note">
                它缺的不是流程约束，是把需求梳理透
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
