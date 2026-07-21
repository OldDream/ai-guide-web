export type Ref = { label: string; href: string; note: string }

export type Tip = {
  title: string
  text: string
  code?: string
  codeCaption?: string
  tags?: string[]
  refs?: Ref[]
  diagram?: 'loop'
}

export type Chapter = {
  mark: string // 章序，如 "一"
  title: string // 章名，如 "铺垫"
  tagline: string
  seal: string // 印章字
  tips: Tip[]
}

export const TITLE = '挖掘 AI 编程潜力'
export const SUBTITLE_EN = 'FIELD NOTES'
export const THESIS = '尽量把能交给 AI 的活，全交出去。'
export const HERO_SUB =
  '一位 AI 编程实践者的 11 条札记——文档先行、上下文、流程、工具，与心法。'

export const chapters: Chapter[] = [
  {
    mark: '一',
    title: '铺垫',
    tagline: '先把脚手架搭好，再让模型动手。',
    seal: '铺',
    tips: [
      {
        title: '大项目，先写文档',
        text: '编码之前先写文档。解释架构、解释模块功能。别堆在一个文档里——按模块拆开，文档之间互相引用。这能避免模型找错方向，也省上下文：200k 的模型探完整个仓库就可能爆掉，每个新会话反复扫仓库也费钱。Agent 虽然会做 memory，但那也是个坑——代码都回滚了，memory 可能还在。',
        code: '# 先文档，后编码\n  docs/\n    architecture.md\n    modules/*.md\n    agents.md',
        codeCaption: '按模块拆分、互相引用',
        refs: [
          {
            label: 'colbymchenry/codegraph',
            href: 'https://github.com/colbymchenry/codegraph',
            note: '当下流行 · 代码图谱索引',
          },
          {
            label: 'affaan-m/ECC · codebase-onboarding',
            href: 'https://github.com/affaan-m/ECC/blob/main/skills/codebase-onboarding/SKILL.md',
            note: '可借鉴，改造成自己的',
          },
          {
            label: 'AsyncFuncAI/deepwiki-open',
            href: 'https://github.com/AsyncFuncAI/deepwiki-open',
            note: '重量级方案',
          },
        ],
      },
      {
        title: '根目录文档是全局信标',
        text: '根目录的 AGENT.md、CLAUDE.md、README.md，大概率会被 AI 读到。把架构、你的编码原则写在里面。但要简明，及时清理陈旧信息——否则它会有很强的误导。',
        tags: ['AGENT.md', 'CLAUDE.md', 'README.md'],
      },
    ],
  },
  {
    mark: '二',
    title: '上下文',
    tagline: '模型自身信息不足，就用上下文来凑。',
    seal: '读',
    tips: [
      {
        title: '1M 上下文，让它多读',
        text: '像 DeepSeek v4 pro 这类长上下文模型，引导它尽量多读相关文件。看它的 thinking 自己判断读得够不够，不够就再引导；最好指定几个入口文件。读有缓存，重复读很便宜。但要注意：上下文消耗到一定百分比，注意力会掉——v4p 据说在 40%。',
        code: '入口 → architecture.md → modules/ → sdk docs',
        codeCaption: '右侧轨道标注的，正是 40% 警戒线',
      },
    ],
  },
  {
    mark: '三',
    title: '流程',
    tagline: 'Plan，实施，Review，循环往复。',
    seal: '程',
    tips: [
      {
        title: '先 Plan，后实施',
        text: '模型容易跑偏时，先让它出计划、你来审。审核时简要指出问题、给探索方向，让它自己完善。智力够的模型，描述完需求直接干，反而更便宜。',
        diagram: 'loop',
      },
      {
        title: '多 Review',
        text: '让 AI 自己写久了，架构会变奇怪。做完一轮需求及时 review，看到不合理就让它重构。AI 倾向于沿着不合理的架构一路写下去、不断兜底，直到最后彻底无法维护。',
      },
      {
        title: '让测试兜底',
        text: '生成 plan 时也让它生成测试用例。让 AI 自己跑测试、自己改问题。但要注意：修不好就会循环烧钱——在提示词里埋好停止条件，人得监督。',
        code: '相似问题 3 次没修好 → 停止，等人介入',
        codeCaption: '提示词里预先埋好的停止条件',
      },
    ],
  },
  {
    mark: '四',
    title: '工具',
    tagline: '给模型配好工具，它能自己查、自己调。',
    seal: '器',
    tips: [
      {
        title: 'MCP：让它自己查文档、自己调试',
        text: 'context7 让 AI 自主查文档；chrome-devtools-mcp 让 AI 用浏览器调试。查文档其实也能让它开浏览器自己去查，只是比较费 token。',
        refs: [
          {
            label: 'upstash/context7',
            href: 'https://github.com/upstash/context7',
            note: '让 AI 自主查文档',
          },
          {
            label: 'ChromeDevTools/chrome-devtools-mcp',
            href: 'https://github.com/ChromeDevTools/chrome-devtools-mcp',
            note: '用浏览器调试',
          },
        ],
      },
      {
        title: '开源模型，试试 Open Code',
        text: '据说开源模型搭配 Open Code 会更强一些。如果感觉和 Claude Code 配合别扭，可以换一下试试。',
      },
      {
        title: '多尝试各种 Skill',
        text: 'Skill 能解决一部分问题。多找、多试，找到顺手的就留下来。',
        refs: [
          {
            label: 'mattpocock/skills',
            href: 'https://github.com/mattpocock/skills',
            note: '技能集合',
          },
          {
            label: 'obra/superpowers',
            href: 'https://github.com/obra/superpowers',
            note: '工作流约束',
          },
          {
            label: 'affaan-m/ECC',
            href: 'https://github.com/affaan-m/ECC/tree/main',
            note: '含 codebase-onboarding',
          },
        ],
      },
    ],
  },
  {
    mark: '五',
    title: '心法',
    tagline: '沉淀上下文，别和它死磕。',
    seal: '心',
    tips: [
      {
        title: '多沉淀文档',
        text: '有价值的对话，叫 AI 写文档总结，也可以直接 /memory。但也要清理过时文档。高质量的上下文能避开很多坑——代码量大、模块多的项目尤其省 token。',
      },
      {
        title: '不要死磕',
        text: '几轮对话解决不了，就总结提示词、开新的会话。上下文污染了，往往越写越差。新会话还没解决，就换模型——不一定要更强的，水平相似的模型也能互补。如果很明确要怎么做、或清楚 bug 的现象，务必在提示词里写清楚。',
      },
    ],
  },
]

export const FOOTER_LINE = '不要死磕。'
export const FOOTER_TEXT =
  '几轮解决不了，就总结提示词、开新会话。上下文污染了，往往越写越差。'
export const COLOPHON =
  '挖掘 AI 编程潜力 · 11 条札记 · 手制于 vellum × cinnabar'

export const TOTAL_TIPS = chapters.reduce((n, c) => n + c.tips.length, 0)
