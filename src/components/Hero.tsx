import { useRef } from "react"
import { gsap, useGSAP } from "../register"

/**
 * Apple-style product hero. The "device shot" for a guide about AI coding
 * is the terminal itself — one quiet prompt exchange, mid-work.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Load choreography: headline lines rise out of their clips,
        // then the terminal settles into place.
        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "power3.out" },
        })
        tl.from(".hero .eyebrow", { y: 24, autoAlpha: 0, duration: 0.8 })
          .from(
            ".hero .h-line-inner",
            { yPercent: 112, duration: 1.15, stagger: 0.1 },
            0.15
          )
          .from(".hero-sub", { y: 28, autoAlpha: 0 }, 0.75)
          .from(
            ".hero-shot",
            { y: 90, autoAlpha: 0, scale: 0.94, duration: 1.3 },
            0.9
          )
          .from(".hero-cue", { autoAlpha: 0, duration: 0.8 }, 1.5)

        // The gradient breathes.
        gsap.to(".hero .grad-text", {
          backgroundPosition: "220% center",
          duration: 9,
          repeat: -1,
          ease: "none",
        })

        // Scroll-away parallax targets WRAPPER elements so it never shares
        // animated properties with the load timeline (a .to() created after
        // a .from() would capture the hidden from-state as its start).
        gsap.to(".hero-head", {
          y: -90,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "82% top",
            scrub: true,
          },
        })
        gsap.to(".hero-shot-scroll", {
          y: -30,
          scale: 0.96,
          autoAlpha: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        gsap.to(".hero-cue-scroll", {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "18% top",
            scrub: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section className="hero" ref={ref} id="top">
      <div className="wrap">
        <div className="hero-head">
          <p className="eyebrow">AI 编程实践 · 11 条札记</p>
          <h1 className="h-display">
            <span className="h-line">
              <span className="h-line-inner">挖掘</span>
            </span>
            <span className="h-line">
              <span className="h-line-inner grad-text">AI 潜力</span>
            </span>
          </h1>
          <p className="hero-sub">能交给 AI 的，全交出去。</p>
        </div>

        <div className="hero-shot-scroll">
          <div className="hero-shot">
            <div className="hero-glow" aria-hidden="true" />
            <div className="term">
              <div className="term-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>claude — zsh</span>
              </div>
              <div className="term-body">
                <p className="term-line">
                  <b>❯</b> 先读 architecture.md，再动代码
                </p>
                <p className="term-line dim">
                  ⏺ 读完 docs/ 下 12 个文档。架构已明，开始按模块实施。
                </p>
                <p className="term-line">
                  <b>❯</b> <span className="caret" aria-hidden="true" />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-cue-scroll">
          <div className="hero-cue" aria-hidden="true">
            <span>滚动了解</span>
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
              <path
                d="M1 1l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
