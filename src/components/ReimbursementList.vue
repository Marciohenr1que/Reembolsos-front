<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useReimbursementStore } from "../stores/reimbursementStore";
import BaseHeading from "../components/ui/BaseHeading.vue";
import StatusBadge from "../components/ui/StatusBadge.vue";
import dashboard from "../i18n/dashboard";
import { formatCurrency } from "../utils/currency";

const store = useReimbursementStore();

const reimbursements = computed(() => store.reimbursements);

onMounted(async () => {
  await store.loadReimbursements();
});
</script>

<template>
  <div class="bg-white shadow-md rounded-xl p-6">
    <BaseHeading :level="2" class="text-center">
      {{ dashboard.titles.dashboard }}
    </BaseHeading>

    <div v-if="store.isLoading" class="text-center py-4">Carregando...</div>

    <ul v-else-if="reimbursements.length" class="space-y-4">
      <li
        v-for="reimbursement in reimbursements"
        :key="reimbursement.id"
        class="border-b pb-4 last:border-b-0"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="font-semibold text-secondary">
              Descrição: {{ reimbursement.description }}
            </p>
            <p class="text-sm text-gray-600">
              Valor: {{ formatCurrency(reimbursement.amount) }}
            </p>
            <p class="text-sm text-gray-600">
              Data: {{ new Date(reimbursement.date).toLocaleDateString() }}
            </p>
            <p class="text-sm text-gray-600">
              Local: {{ reimbursement.location }}
            </p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="tag in reimbursement.tags"
                :key="tag"
                class="bg-accent text-secondary text-xs px-2 py-1 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <StatusBadge :status="reimbursement.status" />
        </div>
      </li>
    </ul>

    <p v-else class="text-center text-gray-500">Nenhum reembolso encontrado.</p>
  </div>
</template>
