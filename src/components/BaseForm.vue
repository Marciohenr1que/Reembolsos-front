<script lang="ts" setup>
defineProps<{
  submitText: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "submit"): void;
}>();

const handleSubmit = () => {
  emit("submit");
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <slot></slot>
    <div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
      >
        {{ submitText }}
      </button>
    </div>
  </form>
</template>
