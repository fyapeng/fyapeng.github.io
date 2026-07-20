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
  - `/cv/`：网页版中文简历。
  - `/bio/`：英文个人简介。站点不再维护完整英文镜像页。
  - `/rss.xml`：随笔 RSS 订阅源。
- `src/data/`：个人信息、论文、CV 和近期研究等结构化内容。
- `src/content/essays/`：随笔 Markdown 文件。
- `public/`：静态资源，包括图片、PDF、`CNAME`、`robots.txt` 和 favicon。
- `.github/workflows/deploy.yml`：GitHub Pages 构建与部署流程。

旧版的 `/research.html`、`/cv.html` 和 `/en/` 会生成迁移页，分别指向新版地址，帮助访问者和搜索引擎逐步更新旧链接。

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
updatedAt: "2026-07-20"
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
- `updatedAt` 仅在文章发生实质修订时填写；填写后会显示最后修订日期，并写入文章结构化数据。
- 首页随笔区默认展示日期最新的一篇非草稿随笔。
- 随笔页会根据中英文字符数量估算阅读时间。
- 随笔支持 Markdown 表格和 LaTeX 数学公式，公式由 `remark-math`、`rehype-katex` 和 `katex` 渲染。
- 封面图片放在 `public/images/essays/`。
- RSS 由 `src/pages/rss.xml.ts` 在构建时自动生成。

### CV

网页版 CV 数据位于：

- `src/data/cv.zh.ts`
- `src/data/cv.en.ts`

PDF 文件位于：

- `public/files/cv_zh.pdf`
- `public/files/cv_en.pdf`

更新 PDF 时直接替换对应文件即可。

## 访问统计

站点支持 Cloudflare Web Analytics，但仓库中不保存统计 token。配置方法：

1. 在 Cloudflare Web Analytics 中添加 `fyapeng.com`。
2. 复制站点的 Web Analytics token。
3. 打开仓库 `Settings → Secrets and variables → Actions → Variables`。
4. 新建变量 `CLOUDFLARE_WEB_ANALYTICS_TOKEN`，值为该 token。
5. 重新运行部署工作流，或向 `main` 推送一次提交。

构建时，工作流会把该变量传给 `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`。变量为空时，统计脚本不会写入网页。

## 搜索引擎与分享元数据

公共布局统一生成：

- 页面标题与描述；
- canonical URL；
- Open Graph 和 Twitter 分享卡片；
- `Person`、`WebSite`、`WebPage` 和随笔 `BlogPosting` JSON-LD；
- RSS 自动发现链接；
- Google 与 Bing 的可选站点验证码。

如果选择 HTML meta 标签验证，可以在仓库 Actions Variables 中添加：

- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`

也可以在域名 DNS 中添加搜索平台提供的 TXT 验证记录；这种方式不依赖网页部署。

站点地图由 `@astrojs/sitemap` 自动生成在 `/sitemap-index.xml`，并已写入 `public/robots.txt`。部署后应分别在 Google Search Console 和 Bing Webmaster Tools 中提交该地址，并对首页及重要页面执行 URL 检查和重新抓取。

## 链接规则

站内链接在当前页面打开，外部链接新开页面。判断逻辑在 `src/layouts/SiteLayout.astro` 中：

- `fyapeng.com`、`www.fyapeng.com` 和当前本地域名视为站内。
- 其他 `http` / `https` 链接视为外部，并自动添加 `target="_blank"`、`noopener` 和 `noreferrer`。

## 部署

GitHub Pages 应使用 GitHub Actions 作为发布源：

1. 打开仓库 `Settings → Pages`。
2. 在 `Build and deployment` 下确认 `Source` 为 `GitHub Actions`。
3. 不要选择 `Deploy from a branch`；后者不会发布 Astro 构建生成的 `dist/`，可能继续显示历史静态文件。

部署流程：

1. 在功能分支上修改。
2. Pull Request 会自动运行 `npm ci` 和 `npm run build`，但不会部署。
3. 合并到 `main`。
4. GitHub Actions 构建 Astro 并部署 `dist/`。

自定义域名由 `public/CNAME` 维护。部署完成后，如果浏览器仍显示旧页面，可先检查 Pages 发布源和最近一次部署状态，再进行强制刷新；搜索结果中的旧摘要则需要等待搜索引擎重新抓取。
