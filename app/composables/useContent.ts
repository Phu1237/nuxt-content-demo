import type { Collections, SQLOperator } from "@nuxt/content";

interface ContentOptions {
  extension?: ContentOptionsExtension;
  published?: boolean;
  latest?: boolean;
  pagination?: ContentOptionsPagination;
}

interface ContentOptionsExtension {
  operator: SQLOperator;
  value: string;
}

interface ContentOptionsPagination {
  currentPage: number;
  perPage: number;
}

export const useContent = () => {
  const queryContent = <T extends keyof Collections>(
    collection: T,
    options: ContentOptions
  ) => {
    let query = queryCollection(collection);
    if (options.extension) {
      query = query.where(
        "extension",
        options.extension.operator,
        options.extension.value
      );
    }
    if (options.published !== undefined) {
      // Bug 1: zod use 1 and 0 as boolean
      const published = options.published ? 1 : 0;

      // This work because the type of field is string
      query = query.where("published", "=", published);
    }
    if (options.latest !== undefined) {
      // Bug 2: This doesn'twork because the type of field is keyof Collections[T]
      // And the content collection is not contain updatedAt
      // Still work if add updatedAt to content collection
      query = query.order("updatedAt", "DESC");
    }

    // Addition: No total count so can't calculate total pages so can't paginate from pages
    // As total pages = total items / perPage
    if (options.pagination) {
      const { currentPage, perPage } = options.pagination;
      // Calculate the number of items per page and remove page 1 items
      const skippingItems = perPage * currentPage - perPage;
      query = query.skip(skippingItems).limit(perPage);
    }
    return query;
  };

  return {
    queryContent,
  };
};
