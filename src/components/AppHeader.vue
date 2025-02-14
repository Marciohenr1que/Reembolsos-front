<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import logo from "../assets/logo.svg";
import BaseButton from "../components/ui/BaseButton.vue";

const { t } = useI18n();
const router = useRouter();
const isAuthenticated = ref(false);

const checkAuth = () => {
  isAuthenticated.value = !!localStorage.getItem("token");
};

onMounted(checkAuth);
watchEffect(() => {
  checkAuth();
});

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  isAuthenticated.value = false;
  router.push("/");
};
</script>

<template>
  <nav v-if="isAuthenticated" class="bg-white shadow-sm w-full">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto" :src="logo" alt="Logo" />
          </div>
        </div>
        <div class="flex items-center">
          <BaseButton variant="primary" size="md" @click="logout">
            {{ t("navbar.logout") }}
          </BaseButton>
        </div>
      </div>
    </div>
  </nav>
</template>
