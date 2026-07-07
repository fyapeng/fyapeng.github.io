import type { Locale } from "./profile";

export type ProjectCategory = "research-workflow" | "experiments";

export interface Project {
  name: string;
  category: ProjectCategory;
  description: Record<Locale, string>;
  tags: Record<Locale, string[]>;
  repoUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  badge: Record<Locale, string>;
  featured: boolean;
}

export const projectCategoryLabels: Record<ProjectCategory, Record<Locale, string>> = {
  "research-workflow": {
    zh: "研究与工作流",
    en: "Research / Workflow"
  },
  experiments: {
    zh: "实验项目",
    en: "Experiments"
  }
};

export const projectLinkLabels = {
  repo: {
    zh: "仓库",
    en: "Repo"
  },
  demo: {
    zh: "演示",
    en: "Demo"
  },
  docs: {
    zh: "文档",
    en: "Docs"
  }
} as const satisfies Record<string, Record<Locale, string>>;

export const projects: Project[] = [
  {
    name: "doctors",
    category: "research-workflow",
    description: {
      zh: "围绕医生行为、医疗服务与健康经济学研究整理的交互式文献综述与研究材料。",
      en: "An interactive literature review and research-materials project around physician behavior, medical services, and health economics."
    },
    tags: {
      zh: ["健康经济学", "文献综述"],
      en: ["Health Economics", "Literature Review"]
    },
    repoUrl: "https://github.com/fyapeng/doctors",
    demoUrl: "https://fyapeng.com/doctors/",
    badge: {
      zh: "资料库",
      en: "Archive"
    },
    featured: true
  },
  {
    name: "SenLab",
    category: "research-workflow",
    description: {
      zh: "个人研究工作流与论文数据库实验，用于整理论文卡片、引用线索与可复现研究材料。",
      en: "A personal research workflow and paper-database experiment for organizing paper cards, citation trails, and reproducible materials."
    },
    tags: {
      zh: ["研究工作流", "论文数据库"],
      en: ["Research Workflow", "Paper Database"]
    },
    repoUrl: "https://github.com/fyapeng/SenLab",
    demoUrl: "https://fyapeng.com/senlab",
    badge: {
      zh: "工作流",
      en: "Workflow"
    },
    featured: true
  },
  {
    name: "nber",
    category: "research-workflow",
    description: {
      zh: "用于跟踪和整理 NBER 工作论文与研究动态的小型自动化项目。",
      en: "A small automation project for tracking and organizing NBER working papers and research updates."
    },
    tags: {
      zh: ["文献跟踪", "自动化"],
      en: ["Literature Tracking", "Automation"]
    },
    repoUrl: "https://github.com/fyapeng/nber",
    demoUrl: "https://fyapeng.com/nber/",
    badge: {
      zh: "自动化",
      en: "Automation"
    },
    featured: true
  },
  {
    name: "SenFate",
    category: "experiments",
    description: {
      zh: "关于传统八字排盘的可复现规则计算实验，强调计算口径、规则触发与审计导出。",
      en: "A reproducible rule-computation experiment for traditional bazi charts, emphasizing calculation conventions, rule triggers, and audit exports."
    },
    tags: {
      zh: ["规则计算", "审计导出"],
      en: ["Rule Computation", "Audit Export"]
    },
    repoUrl: "https://github.com/fyapeng/bazi",
    demoUrl: "https://fyapeng.com/bazi/",
    badge: {
      zh: "规则实验",
      en: "Rule Lab"
    },
    featured: false
  },
  {
    name: "xliuren",
    category: "experiments",
    description: {
      zh: "传统小六壬规则系统的纯前端实验，包含起卦、三宫轨迹、事项分类与结构化解释。",
      en: "A frontend-only experiment for traditional xiaoliuren rules, including casting, three-palace traces, topic categories, and structured explanations."
    },
    tags: {
      zh: ["前端实验", "规则系统"],
      en: ["Frontend Experiment", "Rule System"]
    },
    repoUrl: "https://github.com/fyapeng/xliuren",
    demoUrl: "https://fyapeng.com/xliuren/",
    badge: {
      zh: "前端实验",
      en: "Frontend Lab"
    },
    featured: false
  }
];
