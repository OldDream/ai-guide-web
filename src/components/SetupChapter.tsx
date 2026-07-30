import { useRef } from "react"
import { gsap, useGSAP } from "../register"
import { revealAll } from "../anim"
import SectionHead from "./SectionHead"

const DOCS_REFS = [
  {
    label: "colbymchenry/codegraph",
    href: "https://github.com/colbymchenry/codegraph",
    note: "当下流行 · 代码图谱索引",
  },
  {
    label: "affaan-m/ECC · codebase-onboarding",
    href: "https://github.com/affaan-m/ECC/blob/main/skills/codebase-onboarding/SKILL.md",
    note: "可借鉴，改造成自己的",
  },
  {
    label: "AsyncFuncAI/deepwiki-open",
    href: "https://github.com/AsyncFuncAI/deepwiki-open",
    note: "重量级方案",
  },
]

const ROOT_FILES = [
  { name: "AGENT.md", role: "Coding Agent都会读" },
  { name: "CLAUDE.md", role: "CLAUDE CODE专属" },
  { name: "README.md", role: "都会读，但一般写给人读的" },
]

/** Chapter 1 · 铺垫 — docs before code; root files as global beacons. */
export default function SetupChapter() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealAll(ref.current!)

        // Docs tree: lines cascade in like a fresh `tree` call.
        gsap.from(".tree-code .tline", {
          autoAlpha: 0,
          x: -10,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ".tree", start: "top 78%", once: true },
        })

        // Root files fan in.
        gsap.from(".file-chip", {
          autoAlpha: 0,
          y: 26,
          rotation: -1.5,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".files", start: "top 82%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section className="sec sec--white" id="ch1" ref={ref}>
      <div className="wrap">
        <SectionHead
          eyebrow="第一章 · 铺垫"
          title="先把框架搭好。"
          sub="能力差的模型会把自己绕晕，能力强的模型会在不同会话中做同样的探索，费钱。"
        />

        <div className="frow">
          <div className="frow-text">
            <h3 className="h-card" data-reveal>
              文档驱动，避免AI重复探索。
            </h3>
            <p className="body-text" data-reveal data-reveal-delay="0.08">
              用最强的模型来做这件事。
              编码之前先写文档：解释架构、解释模块功能。别堆在一个文档里——按模块拆开，文档间互相引用。
              这能避免模型找错方向，也省上下文：200k
              上下文的模型探完仓库就可能爆掉，每个新会话反复扫仓库也费钱。
              Agent 虽然会做 memory，但那也是个坑——代码都回滚了，memory 可能还在。
              下面是几个辅助创建文档的工具。
            </p>
            <ul className="refs" data-reveal data-reveal-delay="0.14">
              {DOCS_REFS.map((r) => (
                <li key={r.href}>
                  <a
                    className="ref"
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="ref-label">{r.label}</span>
                    <span className="ref-note">{r.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="frow-media">
            <div className="tree">
              <pre className="tree-code">
                <span className="tline">
                  <span className="dir">docs/</span>
                </span>
                {"\n"}
                <span className="tline">
                  ├─ architecture.md{"  "}
                  <span className="cmt"># 全局架构</span>
                </span>
                {"\n"}
                <span className="tline">
                  ├─ modules/{"       "}
                  <span className="cmt"># 按模块拆分</span>
                </span>
                {"\n"}
                <span className="tline">
                  └─ agents.md{"        "}
                  <span className="cmt"># 互相引用</span>
                </span>
              </pre>
              <p className="tree-cap">先文档，后编码 · 按模块拆分，互相引用</p>
            </div>
          </div>
        </div>

        <div className="frow flip">
          <div className="frow-text">
            <h3 className="h-card" data-reveal>
              完善项目级别的提示词
            </h3>
            <p className="body-text" data-reveal data-reveal-delay="0.08">
              根目录的 AGENT.md、CLAUDE.md、README.md，大概率会被 AI
              读到。把项目架构、你的编码原则写在里面。 内容简明扼要，及时清理陈旧内容——否则它会有很强的误导性。<br />
              提示词要渐进式披露，像书的目录一样。如编码规范应写在 `principle.md` 用相对路径在`AGENT.md`里引用。
            </p>
          </div>

          <div className="frow-media">
            <div className="files">
              {ROOT_FILES.map((f) => (
                <div className="file-chip" key={f.name}>
                  <span className="fname">{f.name}</span>
                  <span className="frole">{f.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
