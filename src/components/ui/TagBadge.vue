<script setup lang="ts">
defineProps<{
  tag: string | { id: number; name: string };
}>();
</script>

<template>
  <span class="bg-accent text-secondary text-xs px-2 py-1 rounded-full">
    {{ typeof tag === "string" ? tag : tag.name }}
  </span>
</template>
