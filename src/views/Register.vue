<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseForm from "@/components/BaseForm.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseAlert from "@/components/BaseAlert.vue";
import messages from "@/i18n/messages";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const role = ref(0);
const errors = ref<Record<string, string>>({});
const successMessage = ref("");

const handleSubmit = async () => {
  errors.value = {};
  successMessage.value = "";

  if (password.value !== passwordConfirmation.value) {
    errors.value.password_confirmation = messages.errors.passwords_mismatch;
    return;
  }

  try {
    await register({
      user: {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
        role: role.value,
      },
    });

    successMessage.value = messages.success.register;
    setTimeout(() => router.push("/"), 2000);
  } catch (error) {
    if (error instanceof Error) {
      errors.value.email = error.message;
    }
  }
};
const roleOptions = [
  { value: 0, text: messages.roles.employee },
  { value: 1, text: messages.roles.manager },
];
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold text-secondary">
        {{ messages.create_account }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10">
        <BaseAlert
          v-if="successMessage"
          :message="successMessage"
          type="success"
        />
        <BaseAlert v-if="errors.email" :message="errors.email" type="error" />

        <BaseForm :submit-text="messages.register" @submit="handleSubmit">
          <BaseInput
            id="name"
            :label="messages.name"
            v-model="name"
            type="text"
            required
            :error="errors.name"
          />
          <BaseInput
            id="email"
            :label="messages.email"
            v-model="email"
            type="email"
            required
            :error="errors.email"
          />
          <BaseInput
            id="password"
            :label="messages.password"
            v-model="password"
            type="password"
            required
            :error="errors.password"
          />
          <BaseInput
            id="password_confirmation"
            :label="messages.password_confirmation"
            v-model="passwordConfirmation"
            type="password"
            required
            :error="errors.password_confirmation"
          />

          <BaseSelect
            id="role"
            :label="messages.role"
            v-model="role"
            :options="roleOptions"
            required
            :error="errors.role"
          />
        </BaseForm>
      </div>
    </div>
  </div>
</template>
