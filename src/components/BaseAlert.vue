<script lang="ts" setup>
defineProps<{
  message: string;
  type: "success" | "error";
}>();
</script>

<template>
  <div
    v-if="message"
    class="p-3 rounded-xl text-sm font-medium shadow-md text-center"
    :class="{
      'bg-green-100 text-green-800 border border-green-400': type === 'success',
      'bg-red-100 text-red-800 border border-red-400': type === 'error',
    }"
  >
    {{ message }}
  </div>
</template>
