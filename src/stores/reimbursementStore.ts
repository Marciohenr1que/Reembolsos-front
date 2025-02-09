import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import {
  fetchReimbursements,
  createReimbursement,
  Reimbursement,
} from "../../api/services/ReimbursementService";

export const useReimbursementStore = defineStore("reimbursement", () => {
  const state = reactive({
    reimbursements: [] as Reimbursement[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
  });

  const loadReimbursements = async (page = 1) => {
    state.isLoading = true;
    state.error = null;
    try {
      const { claims, currentPage, totalPages } =
        await fetchReimbursements(page);
      state.reimbursements = claims;
      state.currentPage = currentPage;
      state.totalPages = totalPages;
    } catch (err) {
      state.error =
        err instanceof Error ? err.message : "Erro ao carregar reembolsos";
    } finally {
      state.isLoading = false;
    }
  };

  const addReimbursement = async (newReimbursement: Partial<Reimbursement>) => {
    try {
      const created = await createReimbursement(newReimbursement);
      state.reimbursements.unshift(created);
      return created;
    } catch (err) {
      state.error =
        err instanceof Error ? err.message : "Erro ao adicionar reembolso";
      throw err;
    }
  };

  return {
    ...toRefs(state),
    loadReimbursements,
    addReimbursement,
  };
});
