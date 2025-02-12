<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  status: number;
}>();

const statusMap = {
  0: {
    label: "status.pending",
    class: "status-pending",
  },
  1: {
    label: "status.approved",
    class: "status-approved",
  },
  2: {
    label: "status.denied",
    class: "status-denied",
  },
};

const numericStatus = computed(() => Number(props.status));

const statusInfo = computed(() => {
  return (
    statusMap[numericStatus.value] || {
      label: "status.unknown",
      class: "status-unknown",
    }
  );
});
</script>

<template>
  <span :class="['status-badge', statusInfo.class]">
    {{ t(statusInfo.label) }}
  </span>
</template>
