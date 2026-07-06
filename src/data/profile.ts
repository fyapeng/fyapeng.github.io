export type Locale = "zh" | "en";

export const site = {
  url: "https://fyapeng.com",
  domain: "fyapeng.com",
  title: "Yapeng Fu / 付亚鹏"
};

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
    bio: "我目前在中国社会科学院大学经济学院攻读经济学博士学位，研究关注健康经济学、公共经济学、医保支付改革与微观计量方法。当前工作主要围绕 DRG/DIP 支付改革、道德风险、供给方诱导需求以及医疗控费政策评估展开。",
    researchFields: ["健康经济学", "公共经济学", "医保支付改革", "微观计量"],
    seoDescription: "付亚鹏的个人学术主页，介绍健康经济学、公共经济学、医保支付改革和微观计量相关研究。"
  },
  en: {
    name: "Yapeng Fu",
    role: "Ph.D. Student in Economics, University of Chinese Academy of Social Sciences",
    shortRole: "Ph.D. Student in Economics, UCASS",
    location: "Beijing, China",
    bio: "I am a Ph.D. student in Economics at the School of Economics, University of Chinese Academy of Social Sciences. My research interests include health economics, public economics, medical payment reform, and applied microeconometrics, with current work on DRG/DIP reform, moral hazard, supplier-induced demand, and healthcare cost control.",
    researchFields: ["Health economics", "Public economics", "Medical payment reform", "Applied microeconometrics"],
    seoDescription: "Academic website of Yapeng Fu, a Ph.D. student in economics working on health economics, public economics, medical payment reform, and applied microeconometrics."
  }
} as const;

export const contactLinks = {
  zh: [
    { type: "email", label: "Email" },
    { label: "GitHub", href: profile.github.url },
    { label: "简历", href: "/files/cv_zh.pdf" },
    { label: "申椿", href: profile.wechat.qrImage }
  ],
  en: [
    { type: "email", label: "Email" },
    { label: "GitHub", href: profile.github.url },
    { label: "CV", href: "/files/cv_en.pdf" },
    { label: "Shen Chun", href: profile.wechat.qrImage }
  ]
} as const;
