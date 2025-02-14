<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.svg";
import BaseForm from "../components/BaseForm.vue";
import BaseInput from "../components/BaseInput.vue";
import AuthLink from "../components/AuthLink.vue";
import { UserLoginService } from "../../api/services/UserLoginService";

const router = useRouter();
const email = ref("");
const password = ref("");
const errors = ref<Record<string, string>>({});

const handleSubmit = async () => {
  errors.value = {};
  try {
    const { token, user } = await UserLoginService.loginUser({
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role.toString());

    router.push("/dashboard");
  } catch {
    errors.value.email = "Credenciais inválidas.";
  }
};
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex-shrink-0 flex items-center">
        <img class="h-8 w-auto" :src="logo" alt="Logo" />
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10">
        <BaseForm submit-text="Login" @submit="handleSubmit">
          <BaseInput
            id="email"
            label="Email"
            v-model="email"
            type="email"
            required
            :error="errors.email"
          />
          <BaseInput
            id="password"
            label="Senha"
            v-model="password"
            type="password"
            required
            :error="errors.password"
          />
        </BaseForm>
        <AuthLink
          to="/register"
          text="Não tem uma conta?"
          linkText="Cadastre-se aqui"
        />
      </div>
    </div>
  </div>
</template>
