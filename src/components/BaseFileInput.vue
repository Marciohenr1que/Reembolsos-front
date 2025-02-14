<script lang="ts" setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps<{
  id: string;
  label: string;
  modelValue: File[];
  required?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: File[]): void;
}>();

const localError = ref<string | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let files = target.files ? Array.from(target.files) : [];

  if (files.length > 2) {
    localError.value = t("messages.max_files_error");
    return;
  } else {
    localError.value = null;
  }

  emit("update:modelValue", files);
};

watch(
  () => props.error,
  (newError) => {
    localError.value = newError ?? null;
  }
);
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
    <p v-if="localError" class="mt-2 text-sm text-primary">{{ localError }}</p>
  </div>
</template>
