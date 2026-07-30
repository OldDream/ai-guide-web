import { useRef } from 'react';
import { gsap, useGSAP } from '../register';
import { revealAll } from '../anim';
import SectionHead from './SectionHead';

const SKILL_LINKS = [
  { label: 'mattpocock/skills', href: 'https://github.com/mattpocock/skills' },
  { label: 'obra/superpowers', href: 'https://github.com/obra/superpowers' },
  { label: 'affaan-m/ECC', href: 'https://github.com/affaan-m/ECC/tree/main' },
  {
    label: 'DietrichGebert/ponytail',
    href: 'https://github.com/DietrichGebert/ponytail',
  },
];

const JAVA_LINKS = [
  {
    label: 'MCP Java SDK',
    note: 'Anthropic 官方 · 3.6k star：给项目写专属 MCP 的标准 SDK',
    href: 'https://github.com/modelcontextprotocol/java-sdk',
  },
  {
    label: 'DebugMCP',
    note: '微软官方：VS Code 里给 Java 打断点、单步、看变量',
    href: 'https://github.com/microsoft/DebugMCP',
  },
];

const DOTNET_LINKS = [
  {
    label: 'Microsoft Learn',
    note: '微软官方 · 1.7k star：查 .NET 文档不凭印象',
    href: 'https://github.com/MicrosoftDocs/mcp',
  },
  {
    label: 'NuGet MCP',
    note: '微软官方 · 2.5M 下载：扫描并修复漏洞包',
    href: 'https://devblogs.microsoft.com/dotnet/nuget-mcp-server-preview/',
  },
  {
    label: 'DebugMCP',
    note: '微软官方：AI 控制 VS Code 断点、单步、变量',
    href: 'https://github.com/microsoft/DebugMCP',
  },
  {
    label: 'Aspire',
    note: '.NET 官方：给 AI 查结构化日志和调用链',
    href: 'https://aspire.dev/dashboard/standalone/',
  },
];

/** Chapter 4 · 工具 — bento grid, Apple's favorite density device. */
export default function ToolsChapter() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealAll(ref.current!);
        gsap.from('.bento .card', {
          y: 44,
          autoAlpha: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.12,
          clearProps: 'transform,opacity,visibility', // hand hover back to CSS
          scrollTrigger: { trigger: '.bento', start: 'top 82%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

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
            <p className="body-text">
              context7 让 AI 自己查最新文档，不再凭印象写
              API。其实也可以让它开浏览器自己去查——只是比较费 token。
            </p>
            <a
              className="alink"
              href="https://github.com/upstash/context7"
              target="_blank"
              rel="noreferrer"
            >
              upstash/context7
            </a>
          </article>

          <article className="card">
            <span className="card-glyph">MCP</span>
            <h3 className="h-card">自己开浏览器调试。</h3>
            <p className="body-text">
              chrome-devtools-mcp 让 AI 用浏览器调试：看
              console、查网络请求、点页面元素，调试闭环不用经过你。
            </p>
            <a
              className="alink"
              href="https://github.com/ChromeDevTools/chrome-devtools-mcp"
              target="_blank"
              rel="noreferrer"
            >
              ChromeDevTools/chrome-devtools-mcp
            </a>
          </article>

          <article className="card">
            <span className="card-glyph">换Coding Agent</span>
            <h3 className="h-card">开源模型，试试 Open Code。</h3>
            <p className="body-text">
              不断听到这种说法：开源模型搭配 Open Code 会更强一些。如果感觉
              Claude Code 用着别扭，换一下试试。
            </p>
          </article>

          <article className="card">
            <span className="card-glyph">Skill</span>
            <h3 className="h-card">尝试各种开源 skill</h3>
            <p className="body-text">
              Skill 能解决一部分问题。多找、多试，顺手的就留下来。
            </p>
            <ul className="card-links">
              {SKILL_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <span className="card-glyph">Skill</span>
            <h3 className="h-card">创建自己的 skill</h3>
            <p className="body-text">
              重复使用的信息如个性化流程/指令/特定领域的知识文档，值得总结成
              skill。写法可参考Claude官方最佳实践。
            </p>
            <a
              className="alink"
              href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices"
              target="_blank"
              rel="noreferrer"
            >
              Agent Skills 最佳实践
            </a>
          </article>

          <article className="card">
            <span className="card-glyph">Java</span>
            <h3 className="h-card">Java 的编码调试闭环。</h3>
            <p className="body-text">
              后端没有"浏览器可开"，但有更严格的反馈源：编译器和测试。Bash 跑{' '}
              <code>mvn test</code>
              ，编译错误和单测失败就是它的 console——这层闭环天然成立，不需要任何
              MCP。往下，把查文档、写 MCP、连 IDE 都交给 AI，全是主流方案。
            </p>
            <ul className="ref-links">
              {JAVA_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    <span className="ref-name">{l.label}</span>
                    <span className="ref-note">{l.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <span className="card-glyph">C#</span>
            <h3 className="h-card">C# 的编码调试闭环。</h3>
            <p className="body-text">
              同理，Bash 跑 <code>dotnet test</code>
              ，编译错误和单测失败就是它的 console。再把"能交出去的工具"交给
              AI：查文档、扫漏洞包、看日志、调断点，全是微软官方方案。
            </p>
            <ul className="ref-links">
              {DOTNET_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    <span className="ref-name">{l.label}</span>
                    <span className="ref-note">{l.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
