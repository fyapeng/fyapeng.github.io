import type { Locale } from "./profile";

export interface Project {
  name: string;
  category: "Research / Workflow" | "Experiments";
  description: Record<Locale, string>;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  status: "Active" | "Maintained" | "In preparation";
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: "doctors",
    category: "Research / Workflow",
    description: {
      zh: "围绕医生行为、医疗服务与健康经济学研究整理的代码和材料。",
      en: "Code and materials organized around physician behavior, medical services, and health economics research."
    },
    tags: ["Health Economics", "Workflow"],
    repoUrl: "https://github.com/fyapeng/doctors",
    status: "Active",
    featured: true
  },
  {
    name: "SenLab",
    category: "Research / Workflow",
    description: {
      zh: "个人研究工作流、可复现材料与工具实验的整理入口。",
      en: "A workspace for research workflows, reproducible materials, and small tool experiments."
    },
    tags: ["Research Workflow", "Tools"],
    repoUrl: "https://github.com/fyapeng/SenLab",
    demoUrl: "https://fyapeng.com/senlab",
    status: "Maintained",
    featured: true
  },
  {
    name: "nber",
    category: "Research / Workflow",
    description: {
      zh: "用于整理 NBER 风格数据、文献和研究流程的小型工具项目。",
      en: "A small project for organizing NBER-style data, literature, and research workflows."
    },
    tags: ["Data", "Literature", "Workflow"],
    repoUrl: "https://github.com/fyapeng/nber",
    status: "Maintained",
    featured: true
  },
  {
    name: "SenFate / bazi",
    category: "Experiments",
    description: {
      zh: "围绕八字知识结构化、检索与展示方式的小型实验。",
      en: "A small experiment in structuring, retrieving, and displaying bazi knowledge."
    },
    tags: ["Knowledge Base", "Experiment"],
    repoUrl: "https://github.com/fyapeng/bazi",
    status: "Active",
    featured: false
  },
  {
    name: "xliuren",
    category: "Experiments",
    description: {
      zh: "围绕小六壬信息组织与解释界面的小型实验。",
      en: "A small experiment around organizing and presenting xiaoliuren readings."
    },
    tags: ["Interface", "Experiment"],
    repoUrl: "https://github.com/fyapeng/xliuren",
    status: "Maintained",
    featured: false
  }
];
