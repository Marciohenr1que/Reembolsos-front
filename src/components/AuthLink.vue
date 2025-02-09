<script lang="ts" setup>
defineProps<{
  to: string;
  text: string;
  linkText: string;
}>();
</script>

<template>
  <p class="mt-4 text-center text-sm text-muted">
    {{ text }}
    <router-link :to="to" class="text-primary font-medium hover:underline">
      {{ linkText }}
    </router-link>
  </p>
</template>
