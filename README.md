# fyapeng.com

付亚鹏的个人学术主页，使用 [Astro](https://astro.build/) 构建为静态网站，并通过 GitHub Pages 部署到 `fyapeng.com`。

这个仓库当前只维护新版 Astro 站点。页面内容主要来自 `src/` 中的结构化数据、Markdown 随笔和少量 Astro 页面；旧版站点素材如需保留，放在 `source-assets/`，不参与构建。

## 本地开发

```powershell
npm install
npm run dev
npm run build
npm run preview
```

常用命令含义：

- `npm run dev`：启动本地开发服务器。
- `npm run build`：生成静态站点到 `dist/`，提交前应至少运行一次。
- `npm run preview`：预览最近一次构建结果。

## 站点结构

- `src/pages/`：页面入口。
  - `/`：中文首页。
  - `/research/`：发表论文与工作论文。
  - `/recent-research/`：近期研究展示。
  - `/essays/`：随笔列表和随笔详情页。
  - `/fyalab/`：部分代码项目与研究工具。
  - `/cv/`：网页版中文简历。
  - `/bio/`：英文个人简介。站点不再维护完整英文镜像页。
- `src/data/`：个人信息、论文、CV、项目和近期研究等结构化内容。
- `src/content/essays/`：随笔 Markdown 文件。
- `public/`：静态资源，包括图片、PDF、`CNAME` 和 favicon。
- `.github/workflows/deploy.yml`：GitHub Pages 部署流程。

## 更新内容

### 个人信息与首页

主要编辑：

- `src/data/profile.ts`
- `src/pages/index.astro`
- `src/pages/bio/index.astro`

中文首页顶部只放简短学术简介，避免与“研究兴趣”重复；英文 `Bio` 页面只维护个人简介和联系方式，不翻译全站。

### 研究与论文

论文数据位于 `src/data/papers.ts`。

- `publications`：发表论文。
- `workingPapers`：工作论文。
- 作者、题名、DOI、公众号推文、摘要和附件链接均在这里维护。
- `*` 表示通讯作者，会在研究页面上方说明。

### 近期研究

近期研究卡片位于 `src/data/researchHighlights.ts`。首页只展示第一项，完整列表在 `/recent-research/`。

### 随笔

在 `src/content/essays/` 新建 Markdown 文件。建议文件名使用英文 slug，例如：

```text
src/content/essays/heterogeneous-did-weights.md
```

Frontmatter 示例：

```yaml
---
title: "文章标题"
date: "2026-07-07"
summary: "一句话摘要。"
category: "方法笔记"
tags: ["DID", "TWFE", "异质性处理效应"]
cover: "/images/essays/example.jpg"
coverAlt: "封面图片说明"
wechatUrl: ""
draft: false
---
```

说明：

- `draft: true` 的随笔不会生成页面，也不会出现在列表中。
- 首页随笔区默认展示日期最新的一篇非草稿随笔。
- 随笔支持 Markdown 表格和 LaTeX 数学公式，公式由 `remark-math`、`rehype-katex` 和 `katex` 渲染。
- 封面图片放在 `public/images/essays/`。

### FyaLab

项目数据位于 `src/data/projects.ts`。这里是手动维护的部分项目，不自动同步 GitHub 仓库。

项目链接通常使用：

- `repoUrl`：GitHub 仓库。
- `demoUrl`：项目网页或演示地址。
- `docsUrl`：文档地址。

### CV

网页版 CV 数据位于：

- `src/data/cv.zh.ts`
- `src/data/cv.en.ts`

PDF 文件位于：

- `public/files/cv_zh.pdf`
- `public/files/cv_en.pdf`

更新 PDF 时直接替换对应文件即可。

## 链接规则

站内链接在当前页面打开，外部链接新开页面。判断逻辑在 `src/layouts/SiteLayout.astro` 中：

- `fyapeng.com`、`www.fyapeng.com` 和当前本地域名视为站内。
- 其他 `http` / `https` 链接视为外部，并自动添加 `target="_blank"`、`noopener` 和 `noreferrer`。

## 部署

GitHub Pages 只在 `main` 分支更新后自动部署：

1. 在功能分支上修改并运行 `npm run build`。
2. 提交更改。
3. 合并到 `main`。
4. 推送 `main` 到 GitHub。
5. GitHub Actions 自动安装依赖、构建 Astro，并部署 `dist/`。

自定义域名由 `public/CNAME` 维护。
