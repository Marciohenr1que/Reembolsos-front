<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  receipts: {
    type: Array as () => string[],
    required: true,
  },
});

const emit = defineEmits(["close"]);

const showModal = ref(true);
const selectedReceipt = ref<string | null>(props.receipts[0] || null);

const closeModal = () => {
  showModal.value = false;
  emit("close");
};

const getImageSrc = () =>
  `${import.meta.env.VITE_RAILS_API_BASE_URL}${selectedReceipt.value}`;
</script>

<template>
  <Teleport to="body">
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          class="absolute top-2 right-2 text-secondary text-4xl font-bold"
          @click="closeModal"
        >
          &times;
        </button>
        <img
          v-if="selectedReceipt"
          :src="getImageSrc()"
          alt="Comprovante"
          class="max-w-full h-auto rounded"
        />
      </div>
    </div>
  </Teleport>
</template>
