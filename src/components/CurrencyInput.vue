<script setup lang="ts">
import { computed } from "vue";

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

const formatToBRL = (value: string): string => {
  const number = Number(value) / 100;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const displayValue = computed(() => {
  if (!props.modelValue) return "";
  return formatToBRL(props.modelValue);
});

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const numericValue = input.value.replace(/\D/g, "");
  emit("update:modelValue", numericValue);
};
</script>

<template>
  <div class="currency-input">
    <label v-if="label" :for="id" class="block text-sm font-medium mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      :id="id"
      type="text"
      :value="displayValue"
      @input="handleInput"
      :placeholder="placeholder"
      :required="required"
      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      :class="{ 'border-red-500': error }"
    />

    <span v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</span>
  </div>
</template>
