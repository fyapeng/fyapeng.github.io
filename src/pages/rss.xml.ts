import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { site } from "../data/profile";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET: APIRoute = async () => {
  const essays = (await getCollection("essays", ({ data }) => !data.draft)).sort(
    (a, b) => (b.data.updatedAt ?? b.data.date).valueOf() - (a.data.updatedAt ?? a.data.date).valueOf()
  );

  const items = essays
    .map((essay) => {
      const slug = essay.id.replace(/\.mdx?$/, "");
      const url = new URL(`/essays/${slug}/`, site.url).toString();
      const categories = essay.data.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("");

      return [
        "<item>",
        `<title>${escapeXml(essay.data.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<pubDate>${essay.data.date.toUTCString()}</pubDate>`,
        `<description>${escapeXml(essay.data.summary)}</description>`,
        `<category>${escapeXml(essay.data.category)}</category>`,
        categories,
        "</item>"
      ].join("");
    })
    .join("");

  const lastBuildDate = essays[0]
    ? (essays[0].data.updatedAt ?? essays[0].data.date).toUTCString()
    : new Date().toUTCString();
  const feedUrl = new URL("/rss.xml", site.url).toString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>付亚鹏的随笔</title>
    <link>${escapeXml(site.url)}</link>
    <description>付亚鹏的研究札记、方法笔记与学术随笔。</description>
    <language>zh-CN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
};
