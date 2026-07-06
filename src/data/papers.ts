import { advisor, type Locale } from "./profile";

export interface PaperAuthor {
  name: string;
  url?: string;
  corresponding?: boolean;
  me?: boolean;
}

export interface PaperLink {
  label: string;
  url: string;
}

export interface Paper {
  title: Record<Locale, string>;
  authors: Record<Locale, PaperAuthor[]>;
  year?: number;
  date?: Record<Locale, string>;
  journal?: Record<Locale, string>;
  status?: Record<Locale, string>;
  links?: Partial<Record<Locale, PaperLink[]>>;
  abstract?: Partial<Record<Locale, string>>;
}

export const papers: {
  publications: Paper[];
  workingPapers: Paper[];
} = {
  publications: [
    {
      title: {
        zh: "医保支付改革、道德风险与医疗控费",
        en: "Medical Payment Reform, Moral Hazard and Cost Control"
      },
      authors: {
        zh: [
          { name: "付亚鹏", me: true },
          { name: "倪晨旭" },
          { name: "丛正龙", url: "https://www.zhenglongcong.com/", corresponding: true },
          { name: "王震", url: "http://ie.cssn.cn/kygz/zaizhixuezhe/202510/t20251028_5921246.shtml" }
        ],
        en: [
          { name: "Yapeng Fu", me: true },
          { name: "Chenxu Ni" },
          { name: "Zhenglong Cong", url: "https://www.zhenglongcong.com/", corresponding: true },
          { name: "Zhen Wang", url: "http://ie.cssn.cn/kygz/zaizhixuezhe/202510/t20251028_5921246.shtml" }
        ]
      },
      year: 2026,
      journal: {
        zh: "《管理世界》",
        en: "Journal of Management World"
      },
      links: {
        zh: [
          { label: "DOI", url: "https://link.cnki.net/doi/10.19744/j.cnki.11-1235/f.2026.0040" },
          { label: "公众号推文", url: "https://mp.weixin.qq.com/s/nJC7JVAfS7oIsPJu7niPKg" }
        ],
        en: [
          { label: "DOI", url: "https://link.cnki.net/doi/10.19744/j.cnki.11-1235/f.2026.0040" },
          { label: "Media", url: "https://mp.weixin.qq.com/s/nJC7JVAfS7oIsPJu7niPKg" }
        ]
      },
      abstract: {
        zh: "医保制度中的起付线等非线性成本分担规则可能与供给侧医保支付方式改革产生复杂交互，从而影响医疗控费的效果与可持续性。本文基于2015—2019年全国医保结算微观数据，采用群聚-双重差分（Bunching-DID）方法，系统评估DRG/DIP支付改革对医疗费用与个人负担的影响，并重点考察起付线附近的策略性费用调整（道德风险）及其对改革绩效的干扰。研究发现：第一，起付线显著诱导费用在门槛右侧群聚，约5.7%的就诊费用被策略性推高至起付线以上，使相关样本的人均医疗总费用上升14.3%，而患者自付费用未显著下降，表明医患双方共同作用下存在道德风险。第二，在考虑行为反应异质性后，DRG/DIP改革的控费效应呈现明显分布依赖：起付线附近患者的自付负担不降反升，且医疗机构出现一定的病例选择迹象。第三，相较于DRG，DIP在抑制门槛附近的策略性费用调整方面更为有效。本文将供给侧支付改革与需求侧非线性激励纳入统一分析框架，揭示了制度拐点对政策评估的潜在干扰机制，为优化医疗控费政策工具组合提供方法论启示与经验证据。",
        en: "This paper studies how nonlinear cost-sharing rules in medical insurance interact with provider-side payment reforms and shape the effectiveness of healthcare cost control. Using 2015-2019 national medical insurance claims data and a Bunching-DID approach, the paper evaluates the impact of DRG/DIP payment reform on medical expenditure and patient burden, with particular attention to strategic expenditure adjustment around deductible thresholds. The findings show that deductible thresholds induce substantial bunching, that cost-control effects depend on behavioral heterogeneity around the threshold, and that DIP is more effective than DRG in reducing strategic adjustment near the kink."
      }
    }
  ],
  workingPapers: [
    {
      title: {
        zh: "社会网络与医疗服务供给",
        en: "Social Networks and Healthcare Service Provision"
      },
      authors: {
        zh: [
          { name: "蔡诗芬" },
          { name: "付明卫", url: advisor.url, corresponding: true },
          { name: "付亚鹏", me: true }
        ],
        en: [
          { name: "Shifen Cai" },
          { name: "Mingwei Fu", url: advisor.url, corresponding: true },
          { name: "Yapeng Fu", me: true }
        ]
      },
      date: {
        zh: "2026年6月",
        en: "June 2026"
      }
    },
    {
      title: {
        zh: "按诊疗属性定价：来自按病种分值付费的证据",
        en: "Pricing by Treatment Attributes: Evidence from Diagnosis-Intervention Packet Payment"
      },
      authors: {
        zh: [
          { name: "付亚鹏", me: true },
          { name: "付明卫", url: advisor.url, corresponding: true },
          { name: "袁莎莎" }
        ],
        en: [
          { name: "Yapeng Fu", me: true },
          { name: "Mingwei Fu", url: advisor.url, corresponding: true },
          { name: "Shasha Yuan" }
        ]
      },
      status: {
        zh: "正在进行中",
        en: "In progress"
      }
    },
    {
      title: {
        zh: "组织能力与激励传导：来自公立医院药品加成取消的证据",
        en: "Organizational Capability and Incentive Transmission: Evidence from the Cancellation of Drug Markups in Public Hospitals"
      },
      authors: {
        zh: [
          { name: "何庆红" },
          { name: "付亚鹏", me: true, corresponding: true },
          { name: "付明卫", url: advisor.url }
        ],
        en: [
          { name: "Qinghong He" },
          { name: "Yapeng Fu", me: true, corresponding: true },
          { name: "Mingwei Fu", url: advisor.url }
        ]
      },
      status: {
        zh: "正在进行中",
        en: "In progress"
      }
    }
  ]
};
