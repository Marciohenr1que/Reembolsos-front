<script setup>
import { Toaster } from "vue-sonner";
</script>

<template>
  <Toaster position="top-right" richColors closeButton theme="light" />
  <div class="min-h-screen bg-neutral">
    <main>
      <div class="">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
