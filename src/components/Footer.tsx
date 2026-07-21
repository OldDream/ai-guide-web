import { CHAPTERS, TOTAL_TIPS } from "../data/tips"

/** Apple-style fine print: quiet, small, hairline-divided. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-inner">
          <div>
            <p className="footer-brand">挖掘 AI 编程潜力</p>
            <p className="footer-note">
              尽量把能交给 AI 的活，全交出去。文档先行、上下文、流程、工具，与心法。
            </p>
          </div>
          <ul className="footer-nav">
            {CHAPTERS.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`}>{c.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-fine">
          <span>内容整理自《AI 潜力挖掘》 · {TOTAL_TIPS} 条札记</span>
          <span>React + GSAP 构建 · 设计语言致敬 Apple</span>
        </div>
      </div>
    </footer>
  )
}
