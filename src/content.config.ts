import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const essays = defineCollection({
  loader: glob({ base: "./src/content/essays", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    coverCaption: z.string().optional(),
    coverCredit: z.string().optional(),
    coverCreditUrl: z.string().url().optional(),
    wechatUrl: z.union([z.string().url(), z.literal("")]).optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { essays };
