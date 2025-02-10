<script setup lang="ts">
import Header from "@/components/Header.vue";
import ReimbursementForm from "@/components/ReimbursementForm.vue";
import ReimbursementList from "@/components/ReimbursementList.vue";
import BaseHeading from "@/components/ui/BaseHeading.vue";
import dashboard from "@/i18n/dashboard";
</script>

<template>
  <Header />
  <div class="md:container mx-auto bg-neutral">
    <main class="container mx-auto px-4 py-8">
      <BaseHeading :level="1">
        {{ dashboard.titles.reimbursement_requests }}
      </BaseHeading>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ReimbursementForm />
        <ReimbursementList />
      </div>
    </main>
  </div>
</template>
