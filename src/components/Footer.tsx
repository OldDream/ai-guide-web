import { CHAPTERS, TOTAL_TIPS } from "../data/tips"

/** Apple-style fine print: quiet, small, hairline-divided. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-inner">
          <ul className="footer-nav">
            {CHAPTERS.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`}>{c.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-fine">
          <span>React + GSAP 构建 · 设计语言致敬 Apple</span>
        </div>
      </div>
    </footer>
  )
}
