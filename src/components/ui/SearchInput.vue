<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import BaseButton from "./BaseButton.vue";
import BaseInput from "../../components/baseInput.vue";

const { t } = useI18n();

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
      type="string"
      v-model="searchQuery"
      :placeholder="placeholder || t('search.placeholder')"
      :required="false"
      class="md:pr-14 w-full"
    />
    <BaseButton
      variant="primary"
      class="absolute inset-y-0 md:right-14 right-0 my-auto md:px-6 rounded-l-none"
      @click="handleSearch"
    >
      {{ t("search.button") }}
    </BaseButton>
  </div>
</template>
