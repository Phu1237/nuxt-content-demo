<script setup lang="ts">
import { useContent } from "~/composables/useContent";

const { queryContent } = useContent();

const { data } = await useAsyncData("data", () => {
  let query = queryContent("blog", {
    latest: true,
    published: true,
  });
  // This work because the type is BlogCollectionItem now
  query = query.order("updatedAt", "DESC");
  return query.first();
});
console.log("data", data.value);
console.log("published", data.value?.published, typeof data.value?.published);

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});
</script>

<template>
  <ContentRenderer v-if="data" :value="data" />
  <div v-else>Home not found</div>
</template>
