<script setup lang="ts">
defineProps<{
  tag: string;
}>();
</script>

<template>
  <span class="bg-accent text-secondary text-xs px-2 py-1 rounded-full">
    {{ tag }}
  </span>
</template>
