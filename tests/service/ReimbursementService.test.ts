import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  fetchReimbursements,
  createReimbursement,
  updateReimbursementStatus,
} from "../../api/services/ReimbursementService";
import ApiClient from "../../api/ApiClient";

vi.mock("../../api/ApiClient.ts", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("ReimbursementService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("fetchReimbursements", () => {
    it("deve buscar reembolsos corretamente", async () => {
      const mockResponse = {
        data: {
          claims: [
            {
              id: 1,
              description: "Test",
              amount: "100.00",
              user_name: "John",
              tags: [{ id: 1, name: "Tag1" }],
            },
          ],
          currentPage: 1,
          totalPages: 1,
        },
      };
      vi.mocked(ApiClient.get).mockResolvedValue(mockResponse);

      const result = await fetchReimbursements();

      expect(ApiClient.get).toHaveBeenCalledWith("/claims", {
        params: { page: 1, search: "" },
      });
      expect(result).toEqual({
        claims: [
          {
            id: 1,
            description: "Test",
            amount: 100,
            user_name: "John",
            tags: ["Tag1"],
          },
        ],
        currentPage: 1,
        totalPages: 1,
      });
    });

    it("erro ao buscar", async () => {
      vi.mocked(ApiClient.get).mockRejectedValue(new Error("API Error"));

      await expect(fetchReimbursements()).rejects.toThrow(
        "Falha ao carregar os dados."
      );
    });
  });

  describe("createReimbursement", () => {
    it("criar", async () => {
      const mockReimbursement = { description: "New", amount: 200 };
      const mockResponse = { data: { claim: { id: 2, ...mockReimbursement } } };
      vi.mocked(ApiClient.post).mockResolvedValue(mockResponse);

      const result = await createReimbursement(mockReimbursement);

      expect(ApiClient.post).toHaveBeenCalledWith(
        "/claims",
        expect.any(FormData),
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      expect(result).toEqual({ id: 2, ...mockReimbursement });
    });

    it("deve lidar com erros de validação", async () => {
      const mockError = {
        response: {
          status: 422,
          data: { errors: ["Campo inválido"] },
        },
      };
      vi.mocked(ApiClient.post).mockRejectedValue(mockError);

      await expect(createReimbursement({})).rejects.toThrow(
        "Erro ao criar reembolso."
      );
    });
  });

  describe("updateReimbursementStatus", () => {
    it("deve atualizar o status do reembolso corretamente", async () => {
      vi.mocked(ApiClient.patch).mockResolvedValue({});

      await updateReimbursementStatus(1, 2);

      expect(ApiClient.patch).toHaveBeenCalledWith("/claims/1", { status: 2 });
    });

    it("deve lidar com erros ao atualizar o status", async () => {
      vi.mocked(ApiClient.patch).mockRejectedValue(new Error("API Error"));

      await expect(updateReimbursementStatus(1, 2)).rejects.toThrow(
        "Erro ao atualizar status do reembolso."
      );
    });
  });
});
