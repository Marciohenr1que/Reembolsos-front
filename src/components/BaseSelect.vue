<script lang="ts" setup>
defineProps<{
  id: string;
  label: string;
  modelValue: number;
  options: { value: number; text: string }[];
  required?: boolean;
  error?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-secondary">{{
      label
    }}</label>
    <div class="mt-1">
      <select
        :id="id"
        :value="modelValue"
        @change="
          ($event) =>
            $emit(
              'update:modelValue',
              Number(($event.target as HTMLSelectElement).value)
            )
        "
        :required="required"
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
  </div>
</template>
