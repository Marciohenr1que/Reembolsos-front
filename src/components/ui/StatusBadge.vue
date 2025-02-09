<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  status: number;
}>();

const statusMap = {
  0: {
    label: "Pendente",
    class: "status-pending",
  },
  1: {
    label: "Aprovado",
    class: "status-approved",
  },
  2: {
    label: "Negado",
    class: "status-denied",
  },
};

const numericStatus = computed(() => Number(props.status));

const statusInfo = computed(() => {
  return (
    statusMap[numericStatus.value] || {
      label: "Desconhecido",
      class: "status-unknown",
    }
  );
});
</script>

<template>
  <span :class="['status-badge', statusInfo.class]">
    {{ statusInfo.label }}
  </span>
</template>
