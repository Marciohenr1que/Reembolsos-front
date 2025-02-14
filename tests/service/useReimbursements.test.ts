import { describe, it, expect, vi, beforeEach } from "vitest";
import { useReimbursements } from "../../api/services/UseReimbursements";
import { fetchReimbursements } from "../../api/services/ReimbursementService";

vi.mock("vue", async () => {
  const actual = await vi.importActual("vue");
  return {
    ...actual,
    onMounted: vi.fn((cb) => cb()),
    ref: vi.fn((val) => ({ value: val })),
  };
});

vi.mock("../../api/services/ReimbursementService", () => ({
  fetchReimbursements: vi.fn(),
}));

describe("useReimbursements", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve carregar reembolsos corretamente", async () => {
    const mockReimbursement = {
      id: 1,
      description: "Test Reimbursement",
      amount: "100.50",
      date: "2023-05-01",
      user_id: 1,
      location: "Office",
      status: 1,
      receipt: "receipt.jpg",
      tags: "tag1,tag2",
    };

    vi.mocked(fetchReimbursements).mockResolvedValue([mockReimbursement]);

    const { reimbursements, loadReimbursements } = useReimbursements();
    await loadReimbursements();

    expect(fetchReimbursements).toHaveBeenCalled();
    expect(reimbursements.value).toEqual([
      {
        id: 1,
        description: "Test Reimbursement",
        amount: 100.5,
        date: "2023-05-01",
        userId: 1,
        location: "Office",
        status: 1,
        receipts: ["receipt.jpg"],
        tags: ["tag1", "tag2"],
      },
    ]);
  });

  it("deve lidar com erros ao carregar reembolsos", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    vi.mocked(fetchReimbursements).mockRejectedValue(new Error("API Error"));

    const { reimbursements, loadReimbursements } = useReimbursements();
    await loadReimbursements();

    expect(fetchReimbursements).toHaveBeenCalled();
    expect(reimbursements.value).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to load reimbursements:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it("deve formatar corretamente reembolsos com diferentes formatos de tags", async () => {
    const mockReimbursements = [
      {
        id: 1,
        description: "Test 1",
        amount: "100.00",
        date: "2023-05-01",
        user_id: 1,
        location: "Office",
        status: 1,
        tags: "tag1,tag2",
      },
      {
        id: 2,
        description: "Test 2",
        amount: "200.00",
        date: "2023-05-02",
        user_id: 2,
        location: "Home",
        status: 2,
        tags: ["tag3", "tag4"],
      },
      {
        id: 3,
        description: "Test 3",
        amount: "300.00",
        date: "2023-05-03",
        user_id: 3,
        location: "Travel",
        status: 3,
        tags: null,
      },
    ];

    vi.mocked(fetchReimbursements).mockResolvedValue(mockReimbursements);

    const { reimbursements, loadReimbursements } = useReimbursements();
    await loadReimbursements();

    expect(fetchReimbursements).toHaveBeenCalled();
    expect(reimbursements.value).toEqual([
      {
        id: 1,
        description: "Test 1",
        amount: 100.0,
        date: "2023-05-01",
        userId: 1,
        location: "Office",
        status: 1,
        receipts: [],
        tags: ["tag1", "tag2"],
      },
      {
        id: 2,
        description: "Test 2",
        amount: 200.0,
        date: "2023-05-02",
        userId: 2,
        location: "Home",
        status: 2,
        receipts: [],
        tags: ["tag3", "tag4"],
      },
      {
        id: 3,
        description: "Test 3",
        amount: 300.0,
        date: "2023-05-03",
        userId: 3,
        location: "Travel",
        status: 3,
        receipts: [],
        tags: [],
      },
    ]);
  });
});
