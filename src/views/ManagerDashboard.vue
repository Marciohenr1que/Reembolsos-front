<!-- ManagerDashboard.vue -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useReimbursementStore } from "../stores/reimbursementStore";
import SearchInput from "../components/ui/SearchInput.vue";
import ReimbursementItem from "../components/ReimbursementItem.vue";
import {
  fetchReimbursements,
  Reimbursement,
} from "../../api/services/ReimbursementService";
import Header from "../components/Header.vue";
import BaseHeading from "../components/ui/BaseHeading.vue";

const reimbursementStore = useReimbursementStore();
const reimbursements = ref<Reimbursement[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);

const loadReimbursements = async (page = 1, searchQuery = "") => {
  const result = await fetchReimbursements(page, searchQuery);
  reimbursements.value = result.claims;
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
    console.error("Erro ao atualizar status:", error);
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
    <BaseHeading :level="1"> Pedidos de Reembolso </BaseHeading>
    <SearchInput
      placeholder="Pesquisar por tag, nome ou status"
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
