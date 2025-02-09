<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchReimbursements } from "../../api/services/ReimbursementService";
import Header from "../components/Header.vue";
import BaseHeading from "../components/ui/BaseHeading.vue";
const reimbursements = ref([]);

const fetchData = async () => {
  reimbursements.value = await fetchReimbursements();
};

onMounted(fetchData);
</script>

<template>
  <Header />
  <div class="container mx-auto mt-8">
    <BaseHeading :level="2" class="text-primary">
      Pending Reimbursements
    </BaseHeading>

    <div class="mt-4 space-y-4">
      <div
        v-for="reimbursement in reimbursements"
        :key="reimbursement.id"
        class="bg-white p-4 rounded-xl shadow-md"
      >
        <p><strong>Status:</strong> {{ reimbursement.status }}</p>
        <p><strong>Date:</strong> {{ reimbursement.date }}</p>
        <p><strong>Location:</strong> {{ reimbursement.location }}</p>
        <p><strong>Amount:</strong> R$ {{ reimbursement.amount.toFixed(2) }}</p>
        <p><strong>Description:</strong> {{ reimbursement.description }}</p>
        <p>
          <strong>Tags:</strong>
          {{ reimbursement.tags?.join(", ") || "No tags" }}
        </p>

        <img
          v-if="reimbursement.receipts"
          :src="reimbursement.receipts"
          class="mt-2 max-w-xs"
          alt="receipts"
        />
      </div>
    </div>
  </div>
</template>
