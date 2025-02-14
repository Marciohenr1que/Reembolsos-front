import { setActivePinia, createPinia } from "pinia";
import { useReimbursementStore } from "../../src/stores/ReimbursementStore";
import { updateReimbursementStatus } from "../../api/services/ReimbursementService";
import { handleApiError } from "../../src/notifications/ErrorHandler";
import { nextTick } from "vue";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../api/services/ReimbursementService", () => ({
  updateReimbursementStatus: vi.fn(),
}));

vi.mock("../../src/notifications/errorHandler", () => ({
  handleApiError: vi.fn().mockResolvedValue("Erro ao atualizar"),
}));

describe("ReimbursementStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("deve lidar com erro ao atualizar status do reembolso", async () => {
    const store = useReimbursementStore();

    (updateReimbursementStatus as vi.Mock).mockRejectedValue(
      new Error("Erro ao atualizar")
    );

    await store.updateReimbursementStatus(4, 1);

    await nextTick();

    expect(store.error).toBe("Erro ao atualizar");
    expect(handleApiError).toHaveBeenCalled();
  });
});
