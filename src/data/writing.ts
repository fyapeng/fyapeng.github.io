import type { Locale } from "./profile";

type LocalizedText = Record<Locale, string>;

export const writingLinks = [
  {
    title: "迟迟",
    displayTitle: {
      zh: "《迟迟》",
      en: "Chichi"
    } satisfies LocalizedText,
    type: {
      zh: "长篇小说",
      en: "Novel"
    } satisfies LocalizedText,
    length: {
      zh: "约 25 万字",
      en: "about 250,000 Chinese characters"
    } satisfies LocalizedText,
    description: {
      zh: "一部中文家族小说，围绕老宅、旧账、证明材料与几代人之间迟迟没有说清的亏欠展开。",
      en: "A Chinese family novel about an old house, unsettled accounts, documentary proof, and debts left unsaid across generations."
    } satisfies LocalizedText,
    linkText: {
      zh: "阅读",
      en: "Read"
    } satisfies LocalizedText,
    archiveNote: {
      zh: "部分随笔与申椿文章后续也会在这里作为网页存档。",
      en: "Selected essays and Shen Chun articles may later be archived here as webpages."
    } satisfies LocalizedText,
    url: "/unwritten/"
  }
] as const;
