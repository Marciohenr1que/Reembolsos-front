<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseFileInput from "@/components/BaseFileInput.vue";
import BaseForm from "@/components/BaseForm.vue";
import { ReimbursementService } from "../../api/services/ReimbursementService";

const form = ref({
  amount: "",
  description: "",
  receipts: null as File | null,
  date: "",
  location: "",
  tags: "",
  status: 0,
});

const errors = ref<{ [key: string]: string }>({});

const submitReimbursement = async () => {
  errors.value = {};

  try {
    await ReimbursementService.createReimbursement({
      ...form.value,
      amount: Number(form.value.amount), // Garante que seja um número
    });
    alert("Reembolso enviado com sucesso!");
  } catch (error) {
    console.error(error);
    errors.value.general = "Erro ao enviar reembolso.";
  }
};
</script>

<template>
  <BaseForm submitText="Enviar Reembolso" @submit="submitReimbursement">
    <BaseInput
      id="amount"
      label="Valor"
      type="number"
      v-model="form.amount"
      required
    />
    <BaseInput
      id="description"
      label="Descrição"
      v-model="form.description"
      required
    />
    <BaseFileInput
      id="receipts"
      label="Anexar Comprovante"
      v-model="form.receipts"
    />
    <BaseInput
      id="date"
      label="Data"
      type="date"
      v-model="form.date"
      required
    />
    <BaseInput
      id="location"
      label="Localização"
      v-model="form.location"
      required
    />
    <BaseInput
      id="tags"
      label="Tags (separadas por vírgula)"
      v-model="form.tags"
    />
  </BaseForm>
</template>
