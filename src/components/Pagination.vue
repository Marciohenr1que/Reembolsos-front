<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});
const emit = defineEmits(["pageChange"]);

const prevDisabled = computed(() => props.currentPage === 1);
const nextDisabled = computed(() => props.currentPage === props.totalPages);
</script>

<template>
  <div class="flex justify-center space-x-2 mt-4">
    <BaseButton
      variant="outline"
      size="sm"
      @click="emit('pageChange', props.currentPage - 1)"
      :disabled="prevDisabled"
    >
      ⬅ Anterior
    </BaseButton>

    <span class="px-3 py-1">{{ currentPage }} / {{ totalPages }}</span>

    <BaseButton
      variant="outline"
      size="sm"
      @click="emit('pageChange', props.currentPage + 1)"
      :disabled="nextDisabled"
    >
      Próximo ➡
    </BaseButton>
  </div>
</template>
