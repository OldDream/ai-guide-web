import { useRef } from "react"
import { gsap, useGSAP } from "../register"

/** The Plan → 实施 → Review cycle, drawn on-scroll (no premium plugins). */
export default function PlanReviewLoop() {
  const scope = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const svg = scope.current!
      const paths = svg.querySelectorAll<SVGPathElement>(".loop__path")

      if (!reduce) {
        paths.forEach((p) => {
          const len = p.getTotalLength()
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        })

        gsap
          .timeline({
            scrollTrigger: { trigger: svg, start: "top 75%" },
            defaults: { ease: "power2.out" },
          })
          .from(
            ".loop__node",
            {
              autoAlpha: 0,
              scale: 0.4,
              duration: 0.5,
              stagger: 0.12,
              ease: "back.out(1.7)",
              transformOrigin: "50% 50%",
            },
            0,
          )
          .to(
            paths,
            { strokeDashoffset: 0, duration: 0.7, stagger: 0.15, ease: "power1.inOut" },
            0.15,
          )
      }
    },
    { scope },
  )

  return (
    <svg className="loop" viewBox="0 0 320 250" ref={scope} aria-hidden="true" role="img">
      <title>Plan → 实施 → Review 循环</title>
      <defs>
        <marker
          id="loopArrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="loop__arrowhead" />
        </marker>
      </defs>

      <path className="loop__path" d="M 180 78 Q 244 118 248 162" markerEnd="url(#loopArrow)" />
      <path className="loop__path" d="M 218 196 Q 160 240 102 196" markerEnd="url(#loopArrow)" />
      <path className="loop__path" d="M 72 162 Q 76 118 140 78" markerEnd="url(#loopArrow)" />

      <g className="loop__node">
        <circle className="loop__node-bg" cx="160" cy="58" r="33" />
        <text className="loop__node-label" x="160" y="54">
          Plan
        </text>
        <text className="loop__node-sub" x="160" y="74">
          先计划
        </text>
      </g>
      <g className="loop__node">
        <circle className="loop__node-bg" cx="256" cy="190" r="33" />
        <text className="loop__node-label" x="256" y="186">
          实施
        </text>
        <text className="loop__node-sub" x="256" y="206">
          DO
        </text>
      </g>
      <g className="loop__node">
        <circle className="loop__node-bg" cx="64" cy="190" r="33" />
        <text className="loop__node-label" x="64" y="186">
          Review
        </text>
        <text className="loop__node-sub" x="64" y="206">
          复审
        </text>
      </g>
    </svg>
  )
}
