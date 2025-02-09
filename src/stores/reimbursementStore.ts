import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { Reimbursement } from "../../api/services/reimbursement";
import {
  createReimbursement,
  fetchReimbursements,
} from "../../api/services/ReimbursementService";

export const useReimbursementStore = defineStore("reimbursement", () => {
  const state = reactive({
    reimbursements: [] as Reimbursement[],
    isLoading: false,
    error: null as string | null,
  });

  const loadReimbursements = async () => {
    state.isLoading = true;
    try {
      const data = await fetchReimbursements();
      state.reimbursements = [...data];
    } catch (err) {
      state.error = "Erro ao carregar reembolsos";
      console.error(err);
    } finally {
      state.isLoading = false;
    }
  };

  const addReimbursement = async (
    newReimbursement: Omit<Reimbursement, "id">
  ) => {
    try {
      const created = await createReimbursement(newReimbursement);
      if (!created?.id) {
        throw new Error("Resposta da API inválida");
      }
      state.reimbursements.unshift(created as Reimbursement);
      return created;
    } catch (err) {
      state.error = "Erro ao adicionar reembolso";
      console.error(err);
      throw err;
    }
  };

  return {
    ...toRefs(state),
    loadReimbursements,
    addReimbursement,
  };
});
