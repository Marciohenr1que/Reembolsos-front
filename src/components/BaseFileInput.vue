<script lang="ts" setup>
defineProps<{
  id: string;
  label: string;
  modelValue: File[];
  required?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: File[]): void;
}>();

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files ? Array.from(target.files) : [];

  if (files.length === 0) {
    console.log("Nenhum arquivo selecionado");
  }

  emit("update:modelValue", files);
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
        multiple
        @change="handleFileChange"
        :required="required"
        class="currency-input"
      />
    </div>
    <p v-if="error" class="mt-2 text-sm text-primary">{{ error }}</p>
  </div>
</template>
