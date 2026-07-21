/* Shared chapter metadata — content itself lives in the chapter components,
   art-directed per section like an Apple product page. */

export type ChapterMeta = {
  id: string // anchor id, e.g. "ch1"
  index: string // display index, e.g. "第一章"
  name: string // short name, e.g. "铺垫"
}

export const CHAPTERS: ChapterMeta[] = [
  { id: "ch1", index: "第一章", name: "铺垫" },
  { id: "ch2", index: "第二章", name: "上下文" },
  { id: "ch3", index: "第三章", name: "流程" },
  { id: "ch4", index: "第四章", name: "工具" },
  { id: "ch5", index: "第五章", name: "沉淀" },
]

export const SITE_TITLE = "挖掘 AI 编程潜力"
export const TOTAL_TIPS = 11
