<script setup lang="ts">
import { Reimbursement } from "@/types/reimbursement";
import dashboard from "../i18n/dashboard";
import BaseHeading from "../components/ui/BaseHeading.vue";

defineProps<{
  reimbursements: Reimbursement[];
}>();
</script>

<template>
  <div class="bg-white shadow-md rounded-xl p-6">
    <BaseHeading level="2" className="text-center">
      {{ dashboard.titles.dashboard }}
    </BaseHeading>
    <ul class="space-y-4">
      <li
        v-for="reimbursement in reimbursements"
        :key="reimbursement.id"
        class="border-b pb-4 last:border-b-0"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="font-semibold text-secondary">
              {{ reimbursement.description }}
            </p>
            <p class="text-sm text-gray-600">
              Amount: ${{ reimbursement.amount.toFixed(2) }}
            </p>
            <p class="text-sm text-gray-600">
              Date: {{ new Date(reimbursement.date).toLocaleDateString() }}
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
          <span
            :class="[
              'px-2 py-1 text-xs font-semibold rounded-full',
              reimbursement.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : reimbursement.status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800',
            ]"
          >
            {{ reimbursement.status }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
