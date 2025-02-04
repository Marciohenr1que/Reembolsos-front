<script lang="ts" setup>
defineProps<{
  id: string;
  label: string;
  modelValue: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-secondary">{{
      label
    }}</label>
    <div class="mt-1">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="handleInput"
        :required="required"
        :placeholder="placeholder"
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
    <p v-if="error" class="mt-2 text-sm text-primary">{{ error }}</p>
  </div>
</template>
