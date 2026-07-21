import { Fragment, useEffect } from "react"
import Hero from "./components/Hero"
import ContextRail from "./components/ContextRail"
import ChapterDivider from "./components/ChapterDivider"
import Tip from "./components/Tip"
import Footer from "./components/Footer"
import "./register"
import { ScrollTrigger } from "./register"
import { chapters } from "./data/tips"

export default function App() {
  const totalChapters = chapters.length
  let globalIndex = 0

  // CJK fonts (LXGW WenKai, Noto Sans SC) reflow layout after they load;
  // recalculate every ScrollTrigger once they're ready so positions are exact.
  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }
  }, [])

  return (
    <>
      <ContextRail />
      <Hero />
      <main id="track" className="track">
        {chapters.map((ch, ci) => (
          <Fragment key={ch.mark}>
            <ChapterDivider
              mark={ch.mark}
              title={ch.title}
              tagline={ch.tagline}
              seal={ch.seal}
              index={ci + 1}
              total={totalChapters}
            />
            {ch.tips.map((tip) => {
              globalIndex += 1
              return (
                <Tip
                  key={`${ch.mark}-${tip.title}`}
                  tip={tip}
                  index={globalIndex}
                  chapterMark={ch.mark}
                  chapterTitle={ch.title}
                />
              )
            })}
          </Fragment>
        ))}
      </main>
      <Footer />
    </>
  )
}
