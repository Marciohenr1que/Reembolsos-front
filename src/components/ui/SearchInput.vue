<script setup lang="ts">
import { ref, watch } from "vue";
import BaseButton from "./BaseButton.vue";
import BaseInput from "../../components/baseInput.vue";

const props = defineProps<{
  placeholder: string;
}>();

const searchQuery = ref("");
const emit = defineEmits(["search"]);

const handleSearch = () => {
  emit("search", searchQuery.value.trim());
};

watch(searchQuery, (newValue) => {
  if (newValue.trim() === "") {
    emit("search", "");
  }
});
</script>

<template>
  <div class="relative md:w-1/2">
    <BaseInput
      id="search"
      label=""
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      :required="false"
      class="md:pr-14 w-full"
    />
    <BaseButton
      variant="primary"
      class="absolute inset-y-0 md:right-14 right-0 my-auto md:px-6 rounded-l-none"
      @click="handleSearch"
    >
      Pesquisar
    </BaseButton>
  </div>
</template>
