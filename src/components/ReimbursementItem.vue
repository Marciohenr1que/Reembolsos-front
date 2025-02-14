<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";
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
  isEditing.value = false;
};

const isModalOpen = ref(false);
const isEditing = ref(false);

const showEditButton = computed(
  () => props.reimbursement.status === 1 && !isEditing.value
);
</script>

<template>
  <div class="border rounded-xl p-6 mb-4 shadow-lg bg-white">
    <div class="flex justify-between items-center mb-4">
      <BaseHeading class="text-xl font-semibold">
        {{ reimbursement.description }}
      </BaseHeading>
      <StatusBadge :status="reimbursement.status" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
      <p>
        <span class="font-semibold text-gray-900"
          >{{ t("labels.employee") }}:</span
        >
        {{ reimbursement.user_name }}
      </p>
      <p>
        <span class="font-semibold text-gray-900"
          >{{ t("labels.amount") }}:</span
        >
        {{ formatCurrency(reimbursement.amount) }}
      </p>
      <p>
        <span class="font-semibold text-gray-900">{{ t("labels.date") }}:</span>
        {{ new Date(reimbursement.date).toLocaleDateString() }}
      </p>
      <p>
        <span class="font-semibold text-gray-900"
          >{{ t("labels.location") }}:</span
        >
        {{ reimbursement.location }}
      </p>
    </div>

    <div class="mt-4 flex gap-2 flex-wrap">
      <TagBadge
        v-for="(tag, index) in reimbursement.tags"
        :key="index"
        :tag="tag.name"
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
    <div class="mt-6 flex justify-end gap-2">
      <BaseButton
        v-if="showEditButton"
        variant="primary"
        class="px-6 py-2"
        @click="isEditing = true"
      >
        {{ t("labels.edit") }}
      </BaseButton>

      <div v-else class="flex gap-2">
        <BaseButton
          variant="primary"
          class="px-6 py-2"
          @click="handleStatusChange(1)"
        >
          {{ t("labels.approve") }}
        </BaseButton>
        <BaseButton
          variant="secondary"
          class="px-6 py-2"
          @click="handleStatusChange(2)"
        >
          {{ t("labels.deny") }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
