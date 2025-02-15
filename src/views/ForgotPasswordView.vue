<script setup lang="ts">
import { reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputFieldComponent from '@/components/InputFieldComponent.vue'
import { validateEmailAddress } from '@/helper/InputValidator'

const forgotPasswordData = reactive({
  payload: {
    email: '',
  },
  error: {
    email: false,
  },
})

function validateInputEmailAddress(value: string) {
  forgotPasswordData.error.email = validateEmailAddress(value)
}

function handleInputEmailFocusout() {
  if (forgotPasswordData.payload.email.length === 0) {
    forgotPasswordData.error.email = false
  }
}

async function submitForgotPassword() {
  // assume you will do REST API call to to your backend to forgot-password the user
  // const response = await helper.forgotPassword(forgotPasswordData.payload)
}

const isBtnDisabled = computed(() => {
  let result = false

  if (forgotPasswordData.payload.email.length < 1 || forgotPasswordData.error.email) {
    result = true
  }

  return result
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-36 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img alt="Vue logo" class="mx-auto h-10 w-auto" src="@/assets/logo.svg" />
      <div class="flex mt-10">
        <RouterLink :to="{ name: 'sign-in' }">
          <ArrowLeftIcon class="size-6 text-green-600 my-2" />
        </RouterLink>
        <h2 class="flex-1 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- forgot password form -->
      <form @submit.prevent="submitForgotPassword()" class="space-y-6" action="#" method="POST">
        <!-- email address -->
        <InputFieldComponent
          v-model="forgotPasswordData.payload.email"
          id="email"
          label="Email address"
          name="email"
          type="text"
          placeholder="Email"
          autocomplete="email"
          :error="forgotPasswordData.error.email"
          :required="true"
          @update:modelValue="validateInputEmailAddress($event)"
          @focusout="handleInputEmailFocusout()"
        >
          <template #helpText>
            <div>
              <p
                v-if="
                  !forgotPasswordData.error.email && forgotPasswordData.payload.email.length === 0
                "
                class="mt-2 text-sm text-gray-500"
                id="email-description"
              >
                Use valid email address.
              </p>
              <p
                v-else-if="forgotPasswordData.error.email"
                class="mt-2 text-sm text-red-600"
                id="email-error"
              >
                Not a valid email address.
              </p>
              <p
                v-else-if="!forgotPasswordData.error.email && forgotPasswordData.payload.email"
                class="mt-2 text-sm text-green-500"
                id="email-valid"
              >
                Email address is valid
              </p>
            </div>
          </template>
        </InputFieldComponent>

        <!-- button submit -->
        <ButtonComponent type="submit" :disabled="isBtnDisabled">
          <template #default>Submit</template>
        </ButtonComponent>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
