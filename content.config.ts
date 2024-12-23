import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      // Load every file inside the `content` directory
      source: "blog/**",
      // Specify the type of content in this collection
      type: "page",
    }),
    blog: defineCollection({
      // Load every file inside the `content` directory
      source: "blog/**",
      // Specify the type of content in this collection
      type: "page",
      schema: z.object({
        badge: z.string(),
        image: z.string(),
        tags: z.array(z.string()),
        published: z.boolean().default(true),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      }),
    }),
  },
});
