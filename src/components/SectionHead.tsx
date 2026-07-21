type Props = {
  eyebrow: string
  title: React.ReactNode
  sub?: string
}

/** Apple section rhythm: eyebrow → huge headline → gray sub, centered. */
export default function SectionHead({ eyebrow, title, sub }: Props) {
  return (
    <header className="shead">
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 className="h-section" data-reveal data-reveal-delay="0.08">
        {title}
      </h2>
      {sub ? (
        <p className="sub" data-reveal data-reveal-delay="0.16">
          {sub}
        </p>
      ) : null}
    </header>
  )
}
