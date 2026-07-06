# Yapeng Fu / 付亚鹏

Personal academic website for `fyapeng.com`, rebuilt as a static Astro site. The old Jekyll source remains in the repository for reference and asset history, but the current website is generated from `src/` and `public/`.

## Development

```powershell
npm install
npm run dev
npm run build
npm run preview
```

The site is configured with:

- `astro.config.mjs` site URL: `https://fyapeng.com`
- Custom domain: `public/CNAME`
- GitHub Pages deployment: `.github/workflows/deploy.yml`

## Update Content

1. Add a new essay

   Create a Markdown or MDX file in `src/content/essays/`. Required frontmatter:

   ```yaml
   title: "文章标题"
   date: "2026-07-18"
   summary: "一句话摘要"
   category: "研究随笔"
   tags: ["健康经济学", "医保支付"]
   cover: "/images/essays/example.webp"
   coverAlt: "图片说明"
   wechatUrl: ""
   draft: false
   ```

2. Add a new paper

   Edit `src/data/papers.ts`. Put published papers in `publications`. Leave `workingPapers` empty until a working paper should appear on the website.

3. Add a new FyaLab project

   Edit `src/data/projects.ts`. Projects are curated manually and are not pulled automatically from GitHub.

4. Update CV data

   Edit `src/data/cv.zh.ts` and `src/data/cv.en.ts`. The web CV pages are generated from these structured data files.

5. Replace PDF CV files

   Replace:

   - `public/files/cv_zh.pdf`
   - `public/files/cv_en.pdf`

6. Deploy

   Commit changes on the `rebuild-astro` branch, open a pull request, and merge to `main` after review. GitHub Actions will build the Astro site and deploy `dist/` to GitHub Pages.
