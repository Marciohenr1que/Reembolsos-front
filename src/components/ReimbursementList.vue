<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useReimbursementStore } from "../stores/reimbursementStore";
import BaseHeading from "../components/ui/BaseHeading.vue";
import StatusBadge from "../components/ui/StatusBadge.vue";
import { formatCurrency } from "../utils/currency";
import TagBadge from "./ui/TagBadge.vue";
import Pagination from "../components/Pagination.vue";

const store = useReimbursementStore();
const { t } = useI18n();

const reimbursements = computed(() => store.reimbursements);
const currentPage = computed(() => store.currentPage);
const totalPages = computed(() => store.totalPages);

const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  store.loadReimbursements(page);
};

onMounted(() => {
  store.loadReimbursements();
});
</script>

<template>
  <div class="bg-white shadow-md rounded-xl p-6">
    <BaseHeading :level="2" class="text-center">
      {{ t("titles.dashboard") }}
    </BaseHeading>

    <div v-if="store.isLoading" class="text-center py-4">
      {{ t("messages.loading") }}
    </div>

    <ul v-else-if="reimbursements.length" class="space-y-4">
      <li
        v-for="reimbursement in reimbursements"
        :key="reimbursement.id"
        class="border-b pb-4 last:border-b-0"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="font-semibold text-secondary">
              {{ t("labels.description") }}: {{ reimbursement.description }}
            </p>
            <p class="text-sm text-gray-600">
              {{ t("labels.amount") }}:
              {{ formatCurrency(reimbursement.amount) }}
            </p>
            <p class="text-sm text-gray-600">
              {{ t("labels.date") }}:
              {{ new Date(reimbursement.date).toLocaleDateString() }}
            </p>
            <p class="text-sm text-gray-600">
              {{ t("labels.location") }}: {{ reimbursement.location }}
            </p>
            <div class="flex flex-wrap gap-2 mt-2">
              <TagBadge
                v-for="tag in reimbursement.tags"
                :key="tag"
                :tag="tag"
              />
            </div>
          </div>
          <StatusBadge :status="reimbursement.status" />
        </div>
      </li>
    </ul>

    <p v-else class="text-center text-gray-500">
      {{ t("labels.none") }}
    </p>

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @pageChange="handlePageChange"
    />
  </div>
</template>
