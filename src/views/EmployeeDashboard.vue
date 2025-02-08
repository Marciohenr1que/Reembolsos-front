<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/Header.vue";
import ReimbursementForm from "@/components/ReimbursementForm.vue";
import ReimbursementList from "@/components/ReimbursementList.vue";
import { Reimbursement } from "@/types/reimbursement";
import dashboard from "@/i18n/dashboard";
import BaseHeading from "@/components/ui/BaseHeading.vue";

const reimbursements = ref<Reimbursement[]>([]);

onMounted(async () => {
  try {
    reimbursements.value = await fetchReimbursements();
  } catch (error) {
    console.error("Failed to fetch reimbursements:", error);
  }
});

const handleNewReimbursement = (newReimbursement: ReimbursementForm) => {
  reimbursements.value.unshift(newReimbursement);
};
</script>

<template>
  <div class="min-h-screen bg-neutral">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <BaseHeading level="1">
        {{ dashboard.titles.reimbursement_requests }}
      </BaseHeading>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ReimbursementForm @reimbursement-submitted="handleNewReimbursement" />
        <ReimbursementList :reimbursements="reimbursements" />
      </div>
    </main>
  </div>
</template>
