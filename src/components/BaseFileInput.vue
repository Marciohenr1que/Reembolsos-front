<script lang="ts" setup>
defineProps<{
  id: string;
  label: string;
  modelValue: File | null; // Agora aceita arquivos
  required?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: File | null): void;
}>();

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] || null;
  emit("update:modelValue", file);
};
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-secondary">
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        :id="id"
        type="file"
        @change="handleFileChange"
        :required="required"
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
    <p v-if="error" class="mt-2 text-sm text-primary">{{ error }}</p>
  </div>
</template>
