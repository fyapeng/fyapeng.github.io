export interface NewsItem {
  date: string;
  title: string;
  url?: string;
}

export const news: NewsItem[] = [
  {
    date: "2026-01-01",
    title: "论文《医保支付改革、道德风险与医疗控费》发表于《管理世界》。",
    url: "/research/"
  },
  {
    date: "2025-09-01",
    title: "担任中国社会科学院大学《健康经济学》硕博生课程助教。"
  }
];
