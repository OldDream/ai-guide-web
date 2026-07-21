import { useRef } from "react"
import { gsap, useGSAP } from "../register"

/**
 * Chapter 2 · 上下文 — the page's dark centerpiece.
 * The section pins; scrolling fills the context bar. At 40% the attention
 * warning lights up, and the three beats come on one by one as the
 * context budget drains. Reduced motion / mobile: static, bar full.
 */
export default function ContextChapter() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: "(min-width: 900px)",
          animate: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop, animate } = context.conditions as {
            desktop: boolean
            animate: boolean
          }
          if (!animate) return // static final state (bar full, beats visible)

          // Head intro as the section first scrolls in
          gsap.from(".ctx-head > *", {
            y: 44,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
          })

          if (!desktop) {
            // Mobile: no pin — bar fills while scrolling through, beats reveal
            gsap.fromTo(
              ".ctx-fill",
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: ".ctx-bar",
                  start: "top 85%",
                  end: "top 35%",
                  scrub: 1,
                },
              }
            )
            gsap.utils.toArray<HTMLElement>(".beat").forEach((b) => {
              gsap.from(b, {
                y: 30,
                autoAlpha: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: b, start: "top 88%", once: true },
              })
            })
            return
          }

          // Desktop: the pinned moment. Bar = your scroll progress = context spent.
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "+=2400",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          })

          tl.fromTo(".ctx-fill", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
            .from(
              ".beat-1",
              { autoAlpha: 0, y: 34, duration: 0.1, ease: "power2.out" },
              0.06
            )
            // 40% — the attention cliff lights up as the fill reaches it
            .fromTo(
              ".ctx-tick i",
              { scale: 0.4, opacity: 0.35 },
              { scale: 1, opacity: 1, duration: 0.05, ease: "power2.out" },
              0.4
            )
            .fromTo(
              ".ctx-tick span",
              { color: "#86868b" },
              { color: "#f5f5f7", duration: 0.05 },
              0.4
            )
            .from(
              ".beat-2",
              { autoAlpha: 0, y: 34, duration: 0.1, ease: "power2.out" },
              0.46
            )
            .from(
              ".beat-3",
              { autoAlpha: 0, y: 34, duration: 0.1, ease: "power2.out" },
              0.78
            )
            .to({}, { duration: 0.14 }) // hold the full bar before releasing
        }
      )

      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section className="sec--night ctx" id="ch2" ref={ref}>
      <div className="ctx-stage">
        <div className="wrap">
          <header className="ctx-head">
            <p className="eyebrow">第二章 · 上下文</p>
            <h2 className="ctx-big grad-text">1M</h2>
            <p className="ctx-sub">上下文很宽裕。让它多读。</p>
          </header>

          <div className="ctx-bar" role="img" aria-label="上下文消耗示意：40% 处为注意力警戒线">
            <div className="ctx-track">
              <div className="ctx-fill" />
              <div className="ctx-tick">
                <i aria-hidden="true" />
                <span>40% · 注意力警戒线</span>
              </div>
            </div>
            <div className="ctx-scale">
              <span>0</span>
              <span>1M tokens</span>
            </div>
          </div>

          <div className="ctx-beats">
            <div className="beat beat-1">
              <h3>让它多读。</h3>
              <p>
                引导模型尽量多读相关文件，最好指定几个入口文件。看看它的
                thinking，读得不够就再引导。
              </p>
            </div>
            <div className="beat beat-2">
              <h3>读，很便宜。</h3>
              <p>
                读有缓存，重复读能中缓存。发现它看不懂
                SDK，就把文档丢给它——在线给地址，离线转成 md 喂进去。
              </p>
            </div>
            <div className="beat beat-3">
              <h3>但注意力有预算。</h3>
              <p>
                上下文消耗到一定比例，注意力会掉——DeepSeek v4 pro 据说在
                30%。别把它读爆。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
