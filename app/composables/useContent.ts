import type { Collections } from "@nuxt/content";

interface ContentOptions {
  published?: boolean;
}

export const useContent = () => {
  const queryContent = <T extends keyof Collections>(
    collection: T,
    options: ContentOptions
  ) => {
    let query = queryCollection(collection);
    if (options.published !== undefined) {
      // Bug 1: zod use 1 and 0 as boolean
      const published = options.published ? 1 : 0;
      query = query.where("published", "=", published);
    }
    return query;
  };

  return {
    queryContent,
  };
};
