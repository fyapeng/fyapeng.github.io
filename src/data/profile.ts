export type Locale = "zh" | "en";

export const site = {
  url: "https://fyapeng.com",
  domain: "fyapeng.com",
  title: "Yapeng Fu / 付亚鹏"
};

export const advisor = {
  url: "http://ie.cssn.cn/kygz/zaizhixuezhe/202510/t20251028_5921239.shtml",
  zh: {
    name: "付明卫",
    title: "中国社会科学院经济研究所研究员"
  },
  en: {
    name: "Mingwei Fu",
    title: "Research Fellow at the Institute of Economics, Chinese Academy of Social Sciences"
  }
} as const;

export const profile = {
  identity: {
    chineseName: "付亚鹏",
    englishName: "Yapeng Fu"
  },
  emailParts: ["yp", "fyapeng", "com"],
  photo: {
    src: "/images/profile/bio.webp",
    width: 640,
    height: 960,
    alt: {
      zh: "付亚鹏近照",
      en: "Portrait of Yapeng Fu"
    }
  },
  github: {
    username: "fyapeng",
    url: "https://github.com/fyapeng"
  },
  wechat: {
    officialName: "申椿",
    officialId: "sencium",
    qrImage: "/images/profile/wechat-sencium.png",
    personalId: "",
    personalIdUpdateAfter: "2026-07-18"
  },
  zh: {
    name: "付亚鹏",
    role: "中国社会科学院大学经济学院经济学博士在读",
    shortRole: "经济学博士在读，中国社会科学院大学经济学院",
    location: "北京",
    bio: "专业方向为西方经济学，导师为中国社会科学院经济研究所付明卫研究员，预计于 2029 年获得经济学博士学位。我的学术训练侧重应用微观经济学与经验研究设计，重视从清楚的问题意识、识别假设和可复现材料出发组织研究。",
    researchFields: ["健康经济学", "产业组织", "微观理论", "政策评估"],
    seoDescription: "付亚鹏的个人学术主页，介绍健康经济学、产业组织、微观理论、政策评估和医疗控费政策相关研究。"
  },
  en: {
    name: "Yapeng Fu",
    role: "Ph.D. Student in Economics, University of Chinese Academy of Social Sciences",
    shortRole: "Ph.D. Student in Economics, UCASS",
    location: "Beijing, China",
    bio: "I am a Ph.D. student in Economics at the School of Economics, University of Chinese Academy of Social Sciences, advised by Mingwei Fu. My research interests include health economics, industrial organization, microeconomic theory, and policy evaluation, with current work on DRG/DIP reform, moral hazard, supplier-induced demand, and healthcare cost control. Methodologically, I am interested in applied microeconometrics, structural estimation, and policy counterfactuals.",
    researchFields: ["Health economics", "Industrial organization", "Microeconomic theory", "Policy evaluation"],
    seoDescription: "Academic website of Yapeng Fu, a Ph.D. student in economics working on health economics, industrial organization, microeconomic theory, policy evaluation, and healthcare cost control."
  }
} as const;

export const contactLinks = {
  zh: [
    { type: "email", label: "邮箱", icon: "@" },
    { label: "GitHub", value: "fyapeng", href: profile.github.url, icon: "GH" },
    { label: "简历", value: "查看", href: "/files/cv_zh.pdf", icon: "CV" },
    { label: "公众号", value: "申椿 Sencium", href: profile.wechat.qrImage, icon: "申" }
  ],
  en: [
    { type: "email", label: "Email", icon: "@" },
    { label: "GitHub", value: "fyapeng", href: profile.github.url, icon: "GH" },
    { label: "CV", value: "View", href: "/files/cv_en.pdf", icon: "CV" },
    { label: "WeChat", value: "Shen Chun / Sencium", href: profile.wechat.qrImage, icon: "申" }
  ]
} as const;
