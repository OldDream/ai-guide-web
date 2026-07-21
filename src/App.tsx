import { useEffect } from "react"
import Nav from "./components/Nav"
import Gauge from "./components/Gauge"
import Hero from "./components/Hero"
// import StatStrip from "./components/StatStrip"
import SetupChapter from "./components/SetupChapter"
import ContextChapter from "./components/ContextChapter"
import ProcessChapter from "./components/ProcessChapter"
import ToolsChapter from "./components/ToolsChapter"
import MindsetChapter from "./components/MindsetChapter"
import Footer from "./components/Footer"
import { ScrollTrigger } from "./register"

export default function App() {
  // CJK fonts reflow layout after they load; recalculate every ScrollTrigger
  // (including the pinned dark chapter) so positions stay exact.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <Nav />
      <Gauge />
      <Hero />
      {/* StatStrip 暂时隐藏，看看没有它的页面效果 */}
      {/* <StatStrip /> */}
      <main>
        <SetupChapter />
        <ContextChapter />
        <ProcessChapter />
        <ToolsChapter />
        <MindsetChapter />
      </main>
      <Footer />
    </>
  )
}
