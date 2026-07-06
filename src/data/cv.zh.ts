export const cvZh = {
  lang: "zh",
  title: "简历",
  pdfLabel: "下载中文 PDF",
  pdfUrl: "/files/cv_zh.pdf",
  sections: [
    {
      kind: "entries",
      title: "教育经历",
      entries: [
        {
          title: "中国社会科学院大学",
          subtitle: "经济学博士",
          meta: "2024 年 9 月 - 2029 年 6 月（预计）",
          location: "北京"
        },
        {
          title: "中国社会科学院大学",
          subtitle: "经济学学士",
          meta: "2020 年 9 月 - 2024 年 6 月",
          location: "北京"
        }
      ]
    },
    {
      kind: "tags",
      title: "研究兴趣",
      items: ["健康经济学", "产业组织", "微观理论", "政策评估"]
    },
    {
      kind: "list",
      title: "发表论文",
      items: [
        {
          title: "付亚鹏、倪晨旭、丛正龙、王震（2026）：医保支付改革、道德风险与医疗控费，《管理世界》。",
          url: "https://link.cnki.net/doi/10.19744/j.cnki.11-1235/f.2026.0040"
        }
      ]
    },
    {
      kind: "list",
      title: "工作论文",
      items: []
    },
    {
      kind: "list",
      title: "软件",
      items: []
    },
    {
      kind: "list",
      title: "教学经历",
      items: ["助教，《健康经济学》（硕博生课程），中国社会科学院大学，2025 年秋季。"]
    },
    {
      kind: "list",
      title: "荣誉奖项",
      items: [
        "2024 年 7 月：北京市高校优秀毕业论文（本科）",
        "2024 年 5 月：北京市高校优秀毕业生（本科）",
        "2023 年 12 月：国家励志奖学金（两次）",
        "2023 年 9 月：第十八届“挑战杯”大学生全国课外学术科技作品竞赛三等奖",
        "2023 年 7 月：多个经济学会议/论坛获奖"
      ]
    },
    {
      kind: "list",
      title: "学术活动",
      items: [
        "2025 年 10 月：第八届中国健康经济学论坛（厦门）",
        "2025 年 5 月：第十一届中国组织经济学研讨会（沈阳）",
        "2024 年 7 月：第八届中国劳动经济学者论坛年会（上海）",
        "2024 年 6 月：第二届香樟社会保障论坛（上海）",
        "2023 年 5 月：第十二届新时代中国青年经济论坛（北京）",
        "2023 年 4 月：第五届国家发展青年论坛（北京）"
      ]
    },
    {
      kind: "list",
      title: "联系方式",
      items: [
        { type: "email", title: "Email" },
        { title: "GitHub: fyapeng", url: "https://github.com/fyapeng" },
        "微信公众号：申椿（ID: sencium）"
      ]
    }
  ]
} as const;
