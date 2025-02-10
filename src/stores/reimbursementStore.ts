import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { toast } from "vue-sonner";
import {
  fetchReimbursements,
  createReimbursement,
  updateReimbursementStatus as updateStatusService,
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
      toast.error(state.error);
    } finally {
      state.isLoading = false;
    }
  };

  const addReimbursement = async (newReimbursement: Partial<Reimbursement>) => {
    try {
      const created = await createReimbursement(newReimbursement);
      state.reimbursements.unshift(created);
      toast.success("Reembolso enviado com sucesso!");
      return created;
    } catch (err) {
      state.error =
        err instanceof Error ? err.message : "Erro ao adicionar reembolso";
      toast.error(state.error);
      throw err;
    }
  };

  const updateReimbursementStatus = async (id: number, newStatus: number) => {
    try {
      await updateStatusService(id, newStatus);
      const reimbursement = state.reimbursements.find((r) => r.id === id);
      if (reimbursement) {
        reimbursement.status = newStatus;
        toast.success("Status atualizado com sucesso!");
      }
    } catch (err) {
      state.error =
        err instanceof Error ? err.message : "Erro ao atualizar status";
      toast.error(state.error);
      throw err;
    }
  };

  return {
    ...toRefs(state),
    loadReimbursements,
    addReimbursement,
    updateReimbursementStatus,
  };
});
