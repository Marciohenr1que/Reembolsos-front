<script lang="ts" setup>
defineProps<{
  id: string;
  label: string;
  modelValue: File | null;
  required?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: File | null): void;
}>();

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] || null;

  if (file) {
    console.log("📂 Arquivo selecionado:", file.name);
  } else {
    console.log("⚠️ Nenhum arquivo selecionado");
  }

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
        class="currency-input"
      />
    </div>
    <p v-if="error" class="mt-2 text-sm text-primary">{{ error }}</p>
  </div>
</template>
