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
  presentations: ["2024年第二届香樟社会保障论坛", "2024年第八届中国劳动经济学者论坛年会"],
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
      "医保制度中的起付线等非线性成本分担规则可能与供给侧医保支付方式改革产生复杂交互，从而影响医疗控费的效果与可持续性。本文基于2015~2019年全国医保结算微观数据，采用群聚—双重差分（Bunching-DID）方法，系统评估医保按疾病诊断组付费（Diagnosis Related Groups，DRG）与按病种分值付费（Diagnosis-Intervention Packet，DIP）改革对医疗费用与个人负担的影响，并重点考察起付线附近的策略性费用调整（道德风险）及其对改革绩效的干扰。研究发现：第一，起付线显著诱导费用在门槛右侧群聚，约5.7%的就诊费用被策略性推高至起付线以上，使相关样本的人均医疗总费用上升14.3%，而患者自付费用未显著下降，表明医患双方共同作用下存在道德风险；第二，在考虑行为反应异质性后，DRG/DIP改革的控费效应呈现明显分布依赖：起付线附近患者的自付负担不降反升，且医疗机构出现一定的病例选择迹象；第三，相较于DRG，DIP在抑制门槛附近的策略性费用调整方面更为有效。本文将供给侧支付改革与需求侧非线性激励纳入统一分析框架，揭示了制度拐点对政策评估的潜在干扰机制，为优化医疗控费政策工具组合提供方法论启示与经验证据。"
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
      "Nonlinear cost-sharing rules such as deductibles in medical insurance systems may have complex interactions with supply-side payment reforms, thereby affecting the effectiveness and sustainability of healthcare cost containment. Using nationwide micro-level medical insurance settlement data from 2015 to 2019, this study employs the Bunching-DID method and systematically evaluates the impact of Diagnosis Related Groups (DRG) and Diagnosis-Intervention Packet (DIP) payment reforms on medical expenditures and individual out-of-pocket costs. It specifically examines strategic cost adjustments near deductible thresholds (moral hazard) and their interference with reform performance. The findings are as follows. First, deductibles significantly induce cost bunching to the right of the threshold. Approximately 5.7% of treatment costs are strategically increased above the deductible, increasing per-patient total medical expenditures by 14.3% in the affected samples. Patient out-of-pocket costs show no significant reduction, indicating moral hazard driven by joint actions of providers and patients. Second, after accounting for behavioral response heterogeneity, the cost-containment effects of DRG/DIP reforms exhibit distributional dependence: out-of-pocket burdens increase rather than decrease for patients near the deductible threshold, alongside signs of patient selection by healthcare institutions. Third, compared to DRG, DIP proves more effective in curbing strategic fee adjustments near the threshold. This study integrates supply-side payment reforms with demand-side nonlinear incentives into a unified analytical framework, revealing the potential interference mechanism of institutional thresholds in policy evaluation. This study provides methodological insights and empirical evidence for optimizing the policy mix of healthcare cost control policies."
  }
} as const;

const mingwei = { name: { zh: "付明卫", en: "Mingwei Fu" }, url: advisorUrl, corresponding: true };
const me = { name: { zh: "付亚鹏", en: "Yapeng Fu" }, me: true };

export const workingPapers = [
  {
    id: "wp-variation",
    title: { zh: "医疗实践差异的效率含义", en: "The Efficiency Implications of Medical Practice Variation" },
    authors: [me, mingwei],
    date: { zh: "2026 年 10 月", en: "October 2026" },
    abstract: {
      zh: "医疗实践差异的效率含义取决于其来源。我们利用一家三级医院的病案与医生组合，建立两层医生共同决定检查的模型，区分病人构成、诊断能力、检查偏好与风险信念，并比较统一标准与调整检查强度的效果。研究发现，不确定病例的医生差异较多来自检查偏好，主任的影响更大，相近疾病内的边际结果与共同临界概率的预测相符，统一风格在固定检查量下增加的检出较少。压缩医生之间的差异与调整检查的整体水平具有不同的效率含义，政策选择取决于边际检查的净收益。"
    }
  },
  {
    id: "wp-abp",
    title: { zh: "按属性付费：来自医保支付改革的证据", en: "Attribute-Based Payment: Evidence from Provider Payment Reform" },
    authors: [me, mingwei, { name: { zh: "袁莎莎", en: "Shasha Yuan" } }],
    date: { zh: "2026 年 10 月", en: "October 2026" },
    abstract: {
      zh: "医保按病种付费根据病例属性确定支付标准，而部分病例属性由服务供给方而非患者选择。我们建立按属性付费的概念框架，利用一次将治疗方式纳入病例分组的地方改革，研究按属性付费相对于统一付费的福利后果。结构估计显示，按属性付费能够缓解手术治疗不足，提高患者健康收益；但手术操作的增加中仅有约18%—27%来自对手术操作的额外补偿，其余来自医患互动实践惯性等非价格因素。反事实模拟发现，在医保支出不变时，边际患者的福利改善主要来自医院净收益的下降，即分组与分值调整的作用主要是医院与患者间的再分配。这为评估医保支付改革提供了分析框架。"
    },
    presentations: [
      { venue: "2025年第十一届中国组织经济学研讨会", title: "分解过度医疗：道德风险与说服误导" },
      { venue: "2025年第八届中国健康经济学论坛", title: "为“标准”付费：医保支付方式改革与供给方诱导需求" }
    ]
  }
] as const;

// Homepage research highlights: headline-style titles and one-line blurbs written for the site,
// grounded in each paper's discussion of the figure (numbers checked against the papers).
export const highlights = [
  {
    title: "控费改革后，有的病人花得少了，有的反而更多",
    text: "医保有一条“起付线”，看病花费超过它才开始报销。DRG/DIP 改革后，花费刚过这条线的病人总费用降了，差一点到线的病人总费用反而涨了。",
    figure: "/images/research/drg-dip-threshold-event.png",
    width: 3207,
    height: 1536,
    figureAlt: "DRG/DIP 改革前后，起付线附近塌陷区间与群聚区间样本人均总费用的事件研究估计",
    paper: "医保支付改革、道德风险与医疗控费",
    source: "《管理世界》2026 年第 3 期，图 5",
    anchor: "/research/#mw-2026"
  },
  {
    title: "医保给不同治疗定价，差价不是越大越好",
    text: "同一种病，做手术等操作和保守治疗，医保付给医院的钱不一样。研究发现，把这个差价适度拉大对病人更有利，拉得太大反而不好；差价最合适时，比现在每位病人平均多得约 151 元的好处。",
    figure: "/images/research/abp-policy-curve.png",
    width: 1220,
    height: 796,
    figureAlt: "操作相对保守治疗、高等级相对低等级操作的支付比变化时，患者净收益相对现行三路径的变化",
    paper: "按属性付费：来自医保支付改革的证据",
    source: "工作论文，2026 年 10 月",
    anchor: "/research/#wp-abp"
  },
  {
    title: "爱开检查的医生，查出的病也更多",
    text: "同一家医院里，有的医生检查开得多，有的开得少。开得多的医生，查出的病也按比例更多，多开的检查并不是白做的。",
    figure: "/images/research/pv-doctor-test-detect.png",
    width: 1366,
    height: 699,
    figureAlt: "主治与主任医生风险调整后的检查率与每百例住院检出数散点图",
    paper: "医疗实践差异的效率含义",
    source: "工作论文，2026 年 10 月",
    anchor: "/research/#wp-variation"
  },
  {
    title: "检查开多开少，更多取决于医生的习惯",
    text: "病情还不明确时，医生之间检查开多开少的差别，五到七成来自各自的偏好，和诊断水平有关的不到两成。",
    figure: "/images/research/pv-variation-sources.png",
    width: 1368,
    height: 612,
    figureAlt: "团队之间检查率差异按病人构成、诊断能力、检查偏好与风险信念的分解",
    paper: "医疗实践差异的效率含义",
    source: "工作论文，2026 年 10 月",
    anchor: "/research/#wp-variation"
  }
] as const;
