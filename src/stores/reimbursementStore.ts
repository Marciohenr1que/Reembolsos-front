import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import {
  fetchReimbursements,
  createReimbursement,
  updateReimbursementStatus as updateStatusService,
  Reimbursement,
} from "../../api/services/ReimbursementService";
import { handleApiError } from "../notifications/errorHandler";
import { handleApiSuccess } from "../notifications/successHandler";

export const useReimbursementStore = defineStore("reimbursement", () => {
  const state = reactive({
    reimbursements: [] as Reimbursement[],
    isLoading: false,
    isLoadingNextPage: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
  });

  const loadReimbursements = async (page = 1) => {
    if (page === state.currentPage) {
      state.isLoading = true;
      state.isLoadingNextPage = false;
    } else {
      state.isLoadingNextPage = true;
    }

    state.error = null;
    try {
      const { claims, currentPage, totalPages } =
        await fetchReimbursements(page);
      state.reimbursements = claims;
      state.currentPage = currentPage;
      state.totalPages = totalPages;
    } catch (err) {
      state.error = await handleApiError(err);
    } finally {
      state.isLoading = false;
      state.isLoadingNextPage = false;
    }
  };

  const addReimbursement = async (newReimbursement: Partial<Reimbursement>) => {
    try {
      if (newReimbursement.receipts?.some((r) => !(r instanceof File))) {
        throw new Error("Os arquivos devem ser do tipo File.");
      }

      const created = await createReimbursement(newReimbursement);
      state.reimbursements.unshift(created);
      handleApiSuccess(201);
      return created;
    } catch (err) {
      state.error = await handleApiError(err);
      return null;
    }
  };

  const updateReimbursementStatus = async (id: number, newStatus: number) => {
    try {
      await updateStatusService(id, newStatus);
      const reimbursement = state.reimbursements.find((r) => r.id === id);
      if (reimbursement) {
        reimbursement.status = newStatus;
      }
      handleApiSuccess(204);
    } catch (err) {
      state.error = await handleApiError(err);
    }
  };

  return {
    ...toRefs(state),
    loadReimbursements,
    addReimbursement,
    updateReimbursementStatus,
  };
});
