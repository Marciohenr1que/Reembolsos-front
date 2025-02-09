<script setup lang="ts">
import { computed } from "vue";
import { formatCurrency } from "../utils/currency";

interface Props {
  modelValue: string;
  label?: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  id: "",
  required: false,
  placeholder: "R$ 0,00",
  error: "",
});

const emit = defineEmits(["update:modelValue"]);
const displayValue = computed(() => {
  if (!props.modelValue) return "";
  return formatCurrency(props.modelValue);
});

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const numericValue = input.value.replace(/\D/g, "");
  emit("update:modelValue", numericValue);
};
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium mb-1">
      {{ label }}
    </label>

    <input
      :id="id"
      type="text"
      :value="displayValue"
      @input="handleInput"
      :placeholder="placeholder"
      :required="required"
      class="currency-input"
      :class="{ 'border-red-500': error }"
    />

    <span v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</span>
  </div>
</template>
