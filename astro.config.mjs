import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Pages from earlier versions of the site; send visitors and search engines to the new homepage.
const legacy = [
  "/bio/",
  "/recent-research/",
  "/essays/",
  "/essays/heterogeneity-model-misspecification/",
  "/essays/heterogeneous-did-weights/",
  "/essays/optimal-transport-in-economics/",
  "/unwritten/"
];

export default defineConfig({
  site: "https://fyapeng.com",
  output: "static",
  trailingSlash: "always",
  redirects: {
    ...Object.fromEntries(legacy.map((path) => [path, "/"])),
    "/cv/": "/files/cv_zh.pdf",
    "/senecon/": "/sencium/"
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      i18n: { defaultLocale: "zh", locales: { zh: "zh-CN", en: "en" } }
    })
  ]
});
