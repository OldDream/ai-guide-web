import { useRef } from "react"
import { gsap, useGSAP } from "../register"

/**
 * Chapter 2 · 上下文 — the page's dark centerpiece, told in two acts.
 * Act one (200k): a plain gray bar fills to its 80% "dumb zone" mark.
 * Interlude: the 1M badge lights up in the gradient, the 200k mark shrinks
 * into a ghost tick at 20% of the new scale. Act two (1M): the same bar
 * refills in gradient, its attention cliff at 40%. Reduced motion / mobile:
 * static final state. DOM default = final state; the desktop timeline sets
 * act-one initial states itself.
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
          if (!animate) return // static final state (1M, gradient, ghost mark)

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

          // Desktop: two pinned acts. Bar = your scroll progress = context spent.
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "+=3400",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          })

          // ---- Act one initial states (DOM default is the final 1M state) ----
          tl.set(".ctx-big--200k", { autoAlpha: 1, scale: 1 }, 0)
            .set(".ctx-big--1m", { autoAlpha: 0, scale: 0.7, y: 26 }, 0)
            .set(".ctx-sub--200k", { autoAlpha: 1 }, 0)
            .set(".ctx-sub:not(.ctx-sub--200k)", { autoAlpha: 0 }, 0)
            .set(".ctx-fill", {
              scaleX: 0,
              background: "#f5f5f7",
              opacity: 0.35,
            }, 0)
            // the 40% cliff belongs to the 1M act — hidden until the interlude
            .set(".ctx-tick", { autoAlpha: 0 }, 0)
            .set(".ctx-tick--200k", { opacity: 0 }, 0)
            .set(".ctx-tick--200k i", { scale: 0.4, opacity: 0.35 }, 0)
            .set(".ctx-tick--200k .tick-label", { opacity: 0 }, 0)
            .set(".ctx-scale-end-1m", { yPercent: 100, opacity: 0 }, 0)

          // ---- Act one · 200K: a plain gray bar, dumb at 80% ----
          tl.to(".ctx-fill", { scaleX: 1, duration: 0.26 }, 0.02)
            // 80% of the 200k scale — the dumb zone lights up
            .set(".ctx-tick--200k", { opacity: 1 }, 0.21)
            .to(
              ".ctx-tick--200k i",
              { scale: 1, opacity: 1, duration: 0.04, ease: "power2.out" },
              0.21
            )
            .to(
              ".ctx-tick--200k .tick-label",
              { opacity: 1, duration: 0.05, ease: "power2.out" },
              0.22
            )
            .from(
              ".beat-1",
              { autoAlpha: 0, y: 34, duration: 0.08, ease: "power2.out" },
              0.26
            )

          // ---- Interlude · the 1M badge lights up ----
          tl.to(
            ".ctx-big--200k",
            { autoAlpha: 0, scale: 0.8, duration: 0.05, ease: "power2.in" },
            0.36
          )
            .to(
              ".ctx-big--1m",
              { autoAlpha: 1, scale: 1, y: 0, duration: 0.08, ease: "power3.out" },
              0.39
            )
            .to(".ctx-sub--200k", { autoAlpha: 0, duration: 0.05, ease: "power2.in" }, 0.36)
            .to(".ctx-sub:not(.ctx-sub--200k)", { autoAlpha: 1, duration: 0.06, ease: "power2.out" }, 0.4)
            .to(".ctx-fill", { scaleX: 0, duration: 0.03 }, 0.38)
            .set(".ctx-fill", { background: "var(--grad)", opacity: 1 }, 0.41)
            // the odometer flips to the new scale
            .to(".ctx-scale-end-200k", { yPercent: -100, opacity: 0, duration: 0.04 }, 0.39)
            .to(".ctx-scale-end-1m", { yPercent: 0, opacity: 1, duration: 0.04 }, 0.41)
            // the 200k mark shrinks into a ghost tick at 20% of the 1M scale
            .set(".ctx-tick--200k .tick-label", { opacity: 0 }, 0.41)
            .to(".ctx-tick", { autoAlpha: 1, duration: 0.04 }, 0.44)
            .to(".ctx-tick--200k", { left: "20%", duration: 0.05 }, 0.41)
            .to(
              ".ctx-tick--200k i",
              { scale: 0.55, duration: 0.05, ease: "power2.out" },
              0.41
            )
            .set(".ctx-tick--200k .tick-ghost", { opacity: 1 }, 0.46)
            .to(
              ".ctx-tick--200k .tick-ghost",
              { autoAlpha: 1, duration: 0.04 },
              0.46
            )
            .to(".ctx-tick--200k", { opacity: 0.35 }, 0.46)

          // ---- Act two · 1M: the gradient bar, the real attention cliff ----
          tl.to(".ctx-fill", { scaleX: 1, duration: 0.44 }, 0.46)
            .fromTo(
              ".ctx-tick i",
              { scale: 0.4, opacity: 0.35 },
              { scale: 1, opacity: 1, duration: 0.05, ease: "power2.out" },
              0.62
            )
            .fromTo(
              ".ctx-tick span",
              { color: "#86868b" },
              { color: "#f5f5f7", duration: 0.05 },
              0.62
            )
            .from(
              ".beat-2",
              { autoAlpha: 0, y: 34, duration: 0.08, ease: "power2.out" },
              0.68
            )
            .from(
              ".beat-3",
              { autoAlpha: 0, y: 34, duration: 0.08, ease: "power2.out" },
              0.82
            )
            .to({}, { duration: 0.1 }) // hold the full bar before releasing
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
            <div className="ctx-big-stack">
              <span className="ctx-big ctx-big--200k" aria-hidden="true">
                200K
              </span>
              <h2 className="ctx-big ctx-big--1m grad-text">1M</h2>
            </div>
            <div className="ctx-sub-stack">
              <span className="ctx-sub ctx-sub--200k" aria-hidden="true">
                上下文不宽裕，仔细分配。
              </span>
              <p className="ctx-sub">上下文很宽裕。让它多读。</p>
            </div>
          </header>

          <div
            className="ctx-bar"
            role="img"
            aria-label="上下文消耗示意：200k 模型在 80% 处注意力衰退；1M 模型的注意力警戒线在 40%"
          >
            <div className="ctx-track">
              <div className="ctx-fill" />
              <div className="ctx-tick">
                <i aria-hidden="true" />
                <span>40% · 注意力警戒线</span>
              </div>
              <div className="ctx-tick--200k">
                <i aria-hidden="true" />
                <span className="tick-label">80% · 在这里就变蠢了</span>
                <span className="tick-ghost">200k 到此为止</span>
              </div>
            </div>
            <div className="ctx-scale">
              <span>0</span>
              <span className="ctx-scale-end">
                <span className="ctx-scale-end-200k">200K tokens</span>
                <span className="ctx-scale-end-1m">1M tokens</span>
              </span>
            </div>
          </div>

          <div className="ctx-beats">
            <div className="beat beat-1">
              <h3>多提供信息</h3>
              <p>
                引导模型尽量多读相关文件，指定入口文件，确保AI一次性找对地方。冷门的
                SDK，主动提供文档——在线给地址，离线的转成 md 喂进去。
              </p>
            </div>
            <div className="beat beat-2">
              <h3>很便宜</h3>
              <p>
                读有缓存，重复读能中缓存，近乎免费。贵的是输出。
              </p>
            </div>
            <div className="beat beat-3">
              <h3>但模型注意力有限</h3>
              <p>
                上下文消耗到一定比例，注意力逐渐丢失——200k 的模型在
                80% 就明显变蠢，1M 能撑到 40% 左右。靠近的时候要观察模型状态。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
