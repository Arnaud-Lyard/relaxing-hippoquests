<template>
  <div class="flex h-full flex-1 sm:mt-[200px] flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Réinitialisation du mot de passe
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Adresse email</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" required=true v-model="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <p v-if="forgotPasswordResponse.status === 'success'" class="text-sm font-medium leading-6 text-green-500">
            {{ forgotPasswordResponse.message }}</p>
          <p v-if="forgotPasswordResponse.status === 'fail'" class="text-sm font-medium leading-6 text-red-500">
            {{ forgotPasswordResponse.message }}</p>

          <button type="submit" :class="isFormValid ? activeClass : disabledClass" @click.prevent="handleSubmit()">
            Réinitialiser
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { authService } from '../services/auth.service';
const email = ref('');
const forgotPasswordResponse = ref({
  status: '',
  message: ''
});
const isFormValid = computed(() => {
  return email.value
});

async function handleSubmit() {
  forgotPasswordResponse.value = {
    status: '',
    message: ''
  }
  if (!isFormValid.value) {
    return;
  }
  try {
    const response = await authService.forgotPassword(email.value);
    forgotPasswordResponse.value = {
      status: 'success',
      message: response.message as string
    }

  } catch (error: any) {
    if (error.response.data.status === "fail" && error.response.data.errors) {
      forgotPasswordResponse.value = { status: 'fail', message: error.response.data.errors[0].message };
    } else if (error.response.data.status === "fail") {
      forgotPasswordResponse.value = { status: 'fail', message: error.response.data.message };
    } else {
      forgotPasswordResponse.value = { status: 'fail', message: 'Une erreur est survenue, veuillez réessayer plus tard.' };
    }

  }
}


const activeClass = ref('flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600')
const disabledClass = ref('flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 cursor-not-allowed')
</script>
