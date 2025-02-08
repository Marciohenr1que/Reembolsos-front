<script setup lang="ts">
import { ref, onMounted } from "vue";
import ApiClient from "../../api/ApiClient";

const reembolsos = ref([]);

const fetchReembolsos = async () => {
  const response = await ApiClient.get("/reembolsos");
  reembolsos.value = response.data;
};

onMounted(fetchReembolsos);
</script>

<template>
  <div class="container mx-auto mt-8">
    <h1 class="text-2xl font-bold text-primary">Reembolsos Pendentes</h1>
    <div class="mt-4 space-y-4">
      <div
        v-for="reembolso in reembolsos"
        :key="reembolso.id"
        class="bg-white p-4 rounded-xl shadow-md"
      >
        <p><strong>Quem:</strong> {{ reembolso.usuario }}</p>
        <p><strong>Quando:</strong> {{ reembolso.data }}</p>
        <p><strong>Onde:</strong> {{ reembolso.local }}</p>
        <p><strong>Quanto:</strong> R$ {{ reembolso.valor }}</p>
        <p><strong>Tags:</strong> {{ reembolso.tags.join(", ") }}</p>
        <img :src="reembolso.comprovante" class="mt-2 max-w-xs" />
      </div>
    </div>
  </div>
</template>
