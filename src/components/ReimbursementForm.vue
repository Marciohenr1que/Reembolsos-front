<script setup lang="ts">
import { ref } from "vue";
import { useReimbursementStore } from "../stores/ReimbursementStore";
import BaseInput from "../components/BaseInput.vue";
import BaseFileInput from "../components/BaseFileInput.vue";
import BaseForm from "../components/BaseForm.vue";
import CurrencyInput from "./CurrencyInput.vue";

const reimbursementStore = useReimbursementStore();

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

const resetForm = () => {
  form.value = {
    amount: "",
    description: "",
    receipts: null,
    date: "",
    location: "",
    tags: "",
    status: 0,
  };
};

const submitReimbursement = async () => {
  errors.value = {};

  try {
    const newReimbursement = {
      ...form.value,
      amount: Number(form.value.amount),
      tags: form.value.tags
        ? form.value.tags.split(",").map((tag) => tag.trim())
        : [],
    };

    await reimbursementStore.addReimbursement(newReimbursement);
    resetForm();
  } catch (error) {
    console.error(error);
    errors.value.general = "Erro ao enviar reembolso.";
  }
};
</script>

<template>
  <BaseForm submitText="Enviar Reembolso" @submit="submitReimbursement">
    <CurrencyInput
      id="amount"
      label="Valor"
      type="string"
      v-model="form.amount"
      required
      :error="errors.amount"
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
      required
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
      type="string"
      v-model="form.location"
      required
    />
    <BaseInput
      id="tags"
      label="Tags (separadas por vírgula)"
      v-model="form.tags"
      type="string"
      required
    />
  </BaseForm>
</template>
