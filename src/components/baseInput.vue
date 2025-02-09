<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  modelValue: string;
  type: string;
  required: boolean;
  error?: string;
  placeholder?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
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
        :type="type"
        :value="modelValue"
        @input="handleInput"
        :required="required"
        :placeholder="placeholder"
        class="currency-input"
      />
      <p v-if="error" class="mt-2 text-sm text-primary">{{ error }}</p>
    </div>
  </div>
</template>
