<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useReimbursementStore } from "../stores/ReimbursementStore";
import SearchInput from "../components/ui/SearchInput.vue";
import ReimbursementItem from "../components/ReimbursementItem.vue";
import {
  fetchReimbursements,
  Reimbursement,
} from "../../api/services/ReimbursementService";
import Header from "../components/AppHeader.vue";
import BaseHeading from "../components/ui/BaseHeading.vue";

const { t } = useI18n();
const reimbursementStore = useReimbursementStore();
const reimbursements = ref<Reimbursement[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);

const loadReimbursements = async (page = 1, searchQuery = "") => {
  const result = await fetchReimbursements(page, searchQuery);
  reimbursements.value = result.claims.map((claim) => ({
    ...claim,
    amount: claim.amount.toString(),
  }));

  currentPage.value = result.currentPage;
  totalPages.value = result.totalPages;
};

const handleSearch = (query: string) => {
  loadReimbursements(1, query);
};

const handleUpdateStatus = async (id: number, newStatus: number) => {
  try {
    await reimbursementStore.updateReimbursementStatus(id, newStatus);
    await loadReimbursements(currentPage.value);
  } catch (error) {
    console.error(t("messages.update_status_error"), error);
  }
};

const handlePageChange = (newPage: number) => {
  loadReimbursements(newPage);
};

onMounted(() => {
  loadReimbursements();
});
</script>

<template>
  <Header />
  <div class="container mx-auto py-8">
    <BaseHeading :level="1">
      {{ t("titles.reimbursement_requests_manager") }}
    </BaseHeading>
    <SearchInput
      :placeholder="t('labels.search_placeholder')"
      @search="handleSearch"
    />
    <div class="mt-8">
      <ReimbursementItem
        v-for="reimbursement in reimbursements"
        :key="reimbursement.id"
        :reimbursement="reimbursement"
        @updateStatus="handleUpdateStatus"
      />
    </div>
    <div class="mt-4 flex justify-center">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="handlePageChange(page)"
        :class="[
          'mx-1 px-3 py-1 rounded',
          currentPage === page ? 'bg-primary text-white' : 'bg-gray-200',
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>
