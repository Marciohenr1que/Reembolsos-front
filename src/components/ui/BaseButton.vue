<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "accent" | "neutral" | "outline" | "link";
  size?: "sm" | "md" | "lg";
}

const props = defineProps<Props>();

const buttonClass = computed(() => {
  const base =
    "font-semibold rounded-xl transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-primary text-white hover:bg-red-700 focus:ring-red-500",
    secondary: "bg-secondary text-white hover:bg-gray-800 focus:ring-gray-600",
    accent: "bg-accent text-black hover:bg-yellow-500 focus:ring-yellow-400",
    neutral: "bg-neutral text-black hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    link: "text-primary hover:underline bg-transparent focus:ring-transparent",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return `cursor-pointer ${base} ${variants[props.variant || "primary"]} ${sizes[props.size || "md"]}`;
});
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
