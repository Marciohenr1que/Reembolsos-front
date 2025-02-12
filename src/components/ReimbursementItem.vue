<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import { Reimbursement } from "../../api/services/reimbursement";
import TagBadge from "../components/ui/TagBadge.vue";
import StatusBadge from "../components/ui/StatusBadge.vue";
import { formatCurrency } from "../utils/currency";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseHeading from "../components/ui/BaseHeading.vue";
import ReceiptModal from "../components/ReceiptModal.vue";

const { t } = useI18n();

const props = defineProps({
  reimbursement: {
    type: Object as () => Reimbursement,
    required: true,
  },
});

const emit = defineEmits(["updateStatus"]);

const handleStatusChange = (newStatus: number) => {
  emit("updateStatus", props.reimbursement.id, newStatus);
};

const isModalOpen = ref(false);
</script>

<template>
  <div class="border rounded-xl p-4 mb-4">
    <div class="flex justify-between items-center mb-2">
      <BaseHeading class="text-lg font-semibold">
        {{ reimbursement.description }}
      </BaseHeading>
      <StatusBadge :status="reimbursement.status" />
    </div>
    <p class="text-muted">
      {{ t("labels.employee") }}: {{ reimbursement.user_name }}
    </p>
    <p class="text-muted">
      {{ t("labels.amount") }}: {{ formatCurrency(reimbursement.amount) }}
    </p>
    <p class="text-muted">
      {{ t("labels.date") }}:
      {{ new Date(reimbursement.date).toLocaleDateString() }}
    </p>
    <p class="text-muted">
      {{ t("labels.location") }}: {{ reimbursement.location }}
    </p>

    <div class="mt-2 flex gap-2 flex-wrap">
      <TagBadge
        v-for="(tag, index) in reimbursement.tags"
        :key="index"
        :tag="tag"
      />
    </div>

    <div class="mt-4">
      <BaseButton variant="link" @click="isModalOpen = true">
        {{ t("labels.view_receipt") }}
      </BaseButton>
    </div>

    <ReceiptModal
      v-if="isModalOpen"
      :receipts="reimbursement.receipts"
      @close="isModalOpen = false"
    />

    <div class="mt-4 flex justify-end gap-2">
      <BaseButton variant="primary" @click="handleStatusChange(1)">
        {{ t("labels.approve") }}
      </BaseButton>
      <BaseButton variant="secondary" @click="handleStatusChange(2)">
        {{ t("labels.deny") }}
      </BaseButton>
    </div>
  </div>
</template>
