<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from "vue";
import Pagination from "../components/Pagination.vue";

const props = defineProps({
  receipts: {
    type: Array as () => string[],
    required: true,
  },
});

const emit = defineEmits(["close"]);

const showModal = ref(true);
const currentIndex = ref(0);

const closeModal = () => {
  showModal.value = false;
  emit("close");
};

const getImageSrc = computed(() => {
  return `${import.meta.env.VITE_RAILS_API_BASE_URL}${props.receipts[currentIndex.value]}`;
});

const handlePageChange = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.receipts.length) {
    currentIndex.value = newPage - 1;
  }
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          class="absolute top-2 right-2 text-gray-700 text-4xl font-bold"
          @click="closeModal"
        >
          &times;
        </button>

        <div class="flex flex-col items-center">
          <img
            v-if="receipts.length > 0"
            :src="getImageSrc"
            alt="Comprovante"
            class="max-w-full h-auto rounded"
          />
          <Pagination
            v-if="receipts.length > 1"
            :currentPage="currentIndex + 1"
            :totalPages="receipts.length"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>
