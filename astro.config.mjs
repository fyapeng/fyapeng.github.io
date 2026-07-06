import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://fyapeng.com",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()]
});
