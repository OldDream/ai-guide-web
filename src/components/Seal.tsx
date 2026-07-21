import type { CSSProperties } from "react"

type SealProps = {
  char: string
  className?: string
  style?: CSSProperties
}

/** Cinnabar ink stamp — the page's recurring authority mark. */
export default function Seal({ char, className = "", style }: SealProps) {
  const cls = ["seal", className].filter(Boolean).join(" ")
  return (
    <span className={cls} style={style} aria-hidden="true">
      <span className="seal__char">{char}</span>
    </span>
  )
}
