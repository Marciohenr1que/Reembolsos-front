<script setup lang="ts">
import { computed } from "vue";

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  class?: string;
}

const props = defineProps<Props>();

const tag = computed(() => `h${props.level || 1}`);
const baseClass = computed(() => {
  const styles = {
    1: "text-3xl font-bold text-secondary mb-8",
    2: "text-2xl font-semibold text-secondary mb-6",
    3: "text-xl font-medium text-gray-800 mb-4",
    4: "text-lg font-medium text-gray-700 mb-3",
    5: "text-base font-medium text-gray-600 mb-2",
    6: "text-sm font-medium text-gray-500 mb-1",
  };
  return `${styles[props.level || 1]} ${props.class || ""}`;
});
</script>

<template>
  <component :is="tag" :class="baseClass">
    <slot />
  </component>
</template>
