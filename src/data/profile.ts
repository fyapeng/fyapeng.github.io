export type Locale = "zh" | "en";

export const site = {
  url: "https://fyapeng.com",
  domain: "fyapeng.com"
};

export const advisorUrl = "http://ie.cssn.cn/kygz/zaizhixuezhe/202510/t20251028_5921239.shtml";

export const profile = {
  identity: {
    chineseName: "付亚鹏",
    englishName: "Yapeng Fu"
  },
  email: "i@fyapeng.com",
  github: "https://github.com/fyapeng",
  photo: { src: "/images/profile/bio.webp", width: 640, height: 960 },
  // Add Google Scholar / ORCID profile URLs here once they exist.
  sameAs: ["https://github.com/fyapeng"],
  zh: {
    role: "中国社会科学院大学经济学博士研究生",
    researchFields: ["健康经济学", "产业组织"],
    seoDescription:
      "付亚鹏（Yapeng Fu），中国社会科学院大学经济学博士研究生，研究健康经济学与产业组织，关注医保支付改革（DRG/DIP）、医疗机构行为与医疗控费。"
  },
  en: {
    role: "Ph.D. Student in Economics, University of Chinese Academy of Social Sciences",
    researchFields: ["Health economics", "Industrial organization"],
    seoDescription:
      "Yapeng Fu (付亚鹏) is a Ph.D. student in economics at the University of Chinese Academy of Social Sciences, working on health economics and industrial organization: provider payment reform (DRG/DIP), hospital behavior, and healthcare cost control."
  }
} as const;

export const publication = {
  doi: "https://link.cnki.net/doi/10.19744/j.cnki.11-1235/f.2026.0040",
  wechat: "https://mp.weixin.qq.com/s/nJC7JVAfS7oIsPJu7niPKg",
  figure: "/images/research/drg-dip-heterogeneity.png",
  zh: {
    title: "医保支付改革、道德风险与医疗控费",
    authors: [
      { name: "付亚鹏", me: true },
      { name: "倪晨旭" },
      { name: "丛正龙", url: "https://www.zhenglongcong.com/", corresponding: true },
      { name: "王震" }
    ],
    venue: "《管理世界》，2026 年第 3 期，141–155 页",
    abstract:
      "医保制度中的起付线等非线性成本分担规则可能与供给侧医保支付方式改革产生复杂交互，从而影响医疗控费的效果与可持续性。本文基于2015~2019年全国医保结算微观数据，采用群聚—双重差分（Bunching-DID）方法，系统评估医保按疾病诊断组付费（Diagnosis Related Groups，DRG）与按病种分值付费（Diagnosis-Intervention Packet，DIP）改革对医疗费用与个人负担的影响，并重点考察起付线附近的策略性费用调整（道德风险）及其对改革绩效的干扰。研究发现：第一，起付线显著诱导费用在门槛右侧群聚，约5.7%的就诊费用被策略性推高至起付线以上，使相关样本的人均医疗总费用上升14.3%，而患者自付费用未显著下降，表明医患双方共同作用下存在道德风险；第二，在考虑行为反应异质性后，DRG/DIP改革的控费效应呈现明显分布依赖：起付线附近患者的自付负担不降反升，且医疗机构出现一定的病例选择迹象；第三，相较于DRG，DIP在抑制门槛附近的策略性费用调整方面更为有效。本文将供给侧支付改革与需求侧非线性激励纳入统一分析框架，揭示了制度拐点对政策评估的潜在干扰机制，为优化医疗控费政策工具组合提供方法论启示与经验证据。",
    figureAlt: "DRG 与 DIP 对人均总费用和自付费用的分组效应"
  },
  en: {
    title: "Health Insurance Payment Reform, Moral Hazard, and Medical Cost Containment",
    authors: [
      { name: "Yapeng Fu", me: true },
      { name: "Chenxu Ni" },
      { name: "Zhenglong Cong", url: "https://www.zhenglongcong.com/", corresponding: true },
      { name: "Zhen Wang" }
    ],
    venue: "Journal of Management World (管理世界), 2026(3): 141–155",
    abstract:
      "Nonlinear cost-sharing rules such as deductibles in medical insurance systems may have complex interactions with supply-side payment reforms, thereby affecting the effectiveness and sustainability of healthcare cost containment. Using nationwide micro-level medical insurance settlement data from 2015 to 2019, this study employs the Bunching-DID method and systematically evaluates the impact of Diagnosis Related Groups (DRG) and Diagnosis-Intervention Packet (DIP) payment reforms on medical expenditures and individual out-of-pocket costs. It specifically examines strategic cost adjustments near deductible thresholds (moral hazard) and their interference with reform performance. The findings are as follows. First, deductibles significantly induce cost bunching to the right of the threshold. Approximately 5.7% of treatment costs are strategically increased above the deductible, increasing per-patient total medical expenditures by 14.3% in the affected samples. Patient out-of-pocket costs show no significant reduction, indicating moral hazard driven by joint actions of providers and patients. Second, after accounting for behavioral response heterogeneity, the cost-containment effects of DRG/DIP reforms exhibit distributional dependence: out-of-pocket burdens increase rather than decrease for patients near the deductible threshold, alongside signs of patient selection by healthcare institutions. Third, compared to DRG, DIP proves more effective in curbing strategic fee adjustments near the threshold. This study integrates supply-side payment reforms with demand-side nonlinear incentives into a unified analytical framework, revealing the potential interference mechanism of institutional thresholds in policy evaluation. This study provides methodological insights and empirical evidence for optimizing the policy mix of healthcare cost control policies.",
    figureAlt: "Effects of DRG and DIP on total and out-of-pocket spending by expenditure bin"
  }
} as const;

const mingwei = { name: { zh: "付明卫", en: "Mingwei Fu" }, url: advisorUrl, corresponding: true };
const me = { name: { zh: "付亚鹏", en: "Yapeng Fu" }, me: true };

export const workingPapers = [
  {
    title: { zh: "医疗实践差异的效率含义", en: "The Efficiency Implications of Medical Practice Variation" },
    authors: [me, mingwei],
    date: { zh: "2026 年 10 月", en: "October 2026" }
  },
  {
    title: { zh: "按属性付费：来自医保支付改革的证据", en: "Attribute-Based Payment: Evidence from Provider Payment Reform" },
    authors: [me, mingwei, { name: { zh: "袁莎莎", en: "Shasha Yuan" } }],
    date: { zh: "2026 年 10 月", en: "October 2026" }
  }
] as const;

// Homepage research highlight: Figure 4 of the Management World paper (pp. 148–149).
// Title is the user's own earlier highlight title; text follows the paper's discussion of Figure 4.
export const highlight = {
  title: "DRG/DIP 支付改革的异质性效应",
  source: "《管理世界》2026 年第 3 期 · 图 4",
  figure: "/images/research/drg-dip-heterogeneity.png",
  figureAlt: "图 4：DRG/DIP 与医疗费用的 Bunching-DID 回归结果，A–D 分别为 DRG、DIP 对人均总费用和人均自付费用的影响",
  text: [
    "图中条形高度表示各标准费用区间内的 DID 估计系数，空心点为累积政策效应；A、B 为 DRG、DIP 对人均总费用的影响，C、D 为对人均自付费用的影响。",
    "DRG/DIP 对降低总医疗费用的影响有限，主要原因是起付线左侧区间内患者的费用水平大幅提高，使其他群体的费用减少效果被“掩盖”；同时，起付线右侧区间内患者的自付费用显著增加，而群聚政策区间外患者所受影响并不显著。"
  ]
} as const;
