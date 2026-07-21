import { useRef } from "react"
import { gsap, useGSAP } from "../register"
import { revealAll } from "../anim"
import SectionHead from "./SectionHead"

const SKILL_LINKS = [
  { label: "mattpocock/skills", href: "https://github.com/mattpocock/skills" },
  { label: "obra/superpowers", href: "https://github.com/obra/superpowers" },
  { label: "affaan-m/ECC", href: "https://github.com/affaan-m/ECC/tree/main" },
]

const JAVA_LINKS = [
  {
    label: "MCP Java SDK",
    note: "Anthropic 官方 · 3.6k star：给项目写专属 MCP 的标准 SDK",
    href: "https://github.com/modelcontextprotocol/java-sdk",
  },
  {
    label: "DebugMCP",
    note: "微软官方：VS Code 里给 Java 打断点、单步、看变量",
    href: "https://github.com/microsoft/DebugMCP",
  },
]

const DOTNET_LINKS = [
  {
    label: "Microsoft Learn",
    note: "微软官方 · 1.7k star：查 .NET 文档不凭印象",
    href: "https://github.com/MicrosoftDocs/mcp",
  },
  {
    label: "NuGet MCP",
    note: "微软官方 · 2.5M 下载：扫描并修复漏洞包",
    href: "https://devblogs.microsoft.com/dotnet/nuget-mcp-server-preview/",
  },
  {
    label: "DebugMCP",
    note: "微软官方：AI 控制 VS Code 断点、单步、变量",
    href: "https://github.com/microsoft/DebugMCP",
  },
  {
    label: "Aspire",
    note: ".NET 官方：给 AI 查结构化日志和调用链",
    href: "https://aspire.dev/dashboard/standalone/",
  },
]

/** Chapter 4 · 工具 — bento grid, Apple's favorite density device. */
export default function ToolsChapter() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealAll(ref.current!)
        gsap.from(".bento .card", {
          y: 44,
          autoAlpha: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "transform,opacity,visibility", // hand hover back to CSS
          scrollTrigger: { trigger: ".bento", start: "top 82%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section className="sec sec--white" id="ch4" ref={ref}>
      <div className="wrap">
        <SectionHead
          eyebrow="第四章 · 工具"
          title="配好MCP和SKILL"
          sub="查文档、开浏览器、跑调试——把能交出去的都交出去。"
        />

        <div className="bento">
          <article className="card">
            <span className="card-glyph">MCP</span>
            <h3 className="h-card">自主查文档。</h3>
       