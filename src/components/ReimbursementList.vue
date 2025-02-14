<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useReimbursementStore } from "../stores/ReimbursementStore";
import BaseHeading from "../components/ui/BaseHeading.vue";
import StatusBadge from "../components/ui/StatusBadge.vue";
import { formatCurrency } from "../utils/currency";
import TagBadge from "./ui/TagBadge.vue";
import Pagination from "./AppPagination.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";

const { t } = useI18n();

const store = useReimbursementStore();
const reimbursements = computed(() => store.reimbursements);
const currentPage = computed(() => store.currentPage);
const totalPages = computed(() => store.totalPages);
const isLoadingNextPage = computed(() => store.isLoadingNextPage);

const handlePageChange = async (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  await store.loadReimbursements(page);
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

    <div v-if="store.isLoading && !isLoadingNextPage" class="text-center py-4">
      <LoadingSpinner />
    </div>

    <ul v-else-if="reimbursements.length" class="space-y-4 relative">
      <li
        v-for="reimbursement in reimbursements"
        :key="reimbursement.id"
        class="border-b pb-4 last:border-b-0 opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="font-semibold text-secondary">
              <BaseHeading
                :level="5"
                class="text-gray-900 font-semibold inline"
              >
                {{ t("labels.description") }}:
              </BaseHeading>
              {{ reimbursement.description }}
            </p>
            <p class="text-sm text-gray-600">
              <BaseHeading
                :level="5"
                class="text-gray-900 font-semibold inline"
              >
                {{ t("labels.amount") }}:
              </BaseHeading>
              {{ formatCurrency(reimbursement.amount) }}
            </p>
            <p class="text-sm text-gray-600">
              <BaseHeading
                :level="5"
                class="text-gray-900 font-semibold inline"
              >
                {{ t("labels.date") }}:
              </BaseHeading>
              {{ new Date(reimbursement.date).toLocaleDateString() }}
            </p>
            <p class="text-sm text-gray-600">
              <BaseHeading
                :level="5"
                class="text-gray-900 font-semibold inline"
              >
                {{ t("labels.location") }}:
              </BaseHeading>
              {{ reimbursement.location }}
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

      <div
        v-if="isLoadingNextPage"
        class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50"
      >
        <LoadingSpinner />
      </div>
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
