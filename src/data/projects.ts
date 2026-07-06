export interface Project {
  name: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  status: "Active" | "Maintained" | "In preparation";
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: "fbunch",
    description: "Stata command for bunching and Bunching-DID related analysis.",
    tags: ["Stata", "Bunching", "Econometrics"],
    repoUrl: "https://github.com/fyapeng/fbunch",
    demoUrl: "https://fyapeng.com/fbunch/",
    status: "Active",
    featured: true
  },
  {
    name: "Medical Payment Reform Materials",
    description: "Curated entry points for code, data notes, and public materials related to medical payment reform research.",
    tags: ["Health Economics", "Policy Evaluation", "Reproducibility"],
    docsUrl: "https://link.cnki.net/doi/10.19744/j.cnki.11-1235/f.2026.0040",
    status: "Maintained",
    featured: true
  }
];
