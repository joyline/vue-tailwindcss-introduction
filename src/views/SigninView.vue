<script setup lang="ts">
import { reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputFieldComponent from '@/components/InputFieldComponent.vue'
import HelperMessage from '@/components/HelperMessage.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import ValidMessage from '@/components/ValidMessage.vue'
import { EyeSlashIcon, EyeIcon } from '@heroicons/vue/24/solid'
import { usePasswordToggle } from '@/helper/InputComposable'
import { validateEmailAddress } from '@/helper/InputValidator'

const { isShowPassword, passwordInputType, handlePasswordToggle } = usePasswordToggle()

const signInData = reactive({
  payload: {
    email: '',
    password: '',
  },
  error: {
    email: false,
    password: false,
  },
})

const isBtnDisabled = computed(() => {
  let result = false
  if (signInData.payload.email.length < 1 || signInData.payload.password.length < 1) {
    result = true
  } else if (signInData.error.email || signInData.error.password) {
    result = true
  }

  return result
})

function validateInputEmailAddress(value: string) {
  signInData.error.email = validateEmailAddress(value)
}

function handleInputEmailFocusout() {
  if (signInData.payload.email.length === 0) {
    signInData.error.email = false
  }
}

function validatePassword(value: string) {
  signInData.error.password = false

  if (value.length < 6 || value.length > 20) {
    signInData.error.password = true
  }
}

function handleInputPasswordFocusout() {
  if (signInData.payload.password.length === 0) {
    signInData.error.password = false
  }
}

async function submitSignIn() {
  // assume you will do REST API call to to your backend to sign in the user
  // const response = await helper.signIn(signInData.payload)
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-36 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img alt="Vue logo" class="mx-auto h-10 w-auto" src="@/assets/logo.svg" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- sign in form -->
      <form @submit.prevent="submitSignIn()" class="space-y-6" action="#" method="POST">
        <!-- email address -->
        <InputFieldComponent
          v-model="signInData.payload.email"
          id="email"
          label="Email address"
          name="email"
          type="text"
          placeholder="Email"
          autocomplete="email"
          :error="signInData.error.email"
          :required="true"
          @update:modelValue="validateInputEmailAddress($event)"
          @focusout="handleInputEmailFocusout()"
        >
          <template #helpText>
            <div>
              <HelperMessage
                v-if="!signInData.error.email && signInData.payload.email.length === 0"
              >
                Use valid email address
              </HelperMessage>
              <ErrorMessage v-else-if="signInData.error.email">
                Not a valid email address
              </ErrorMessage>
              <ValidMessage v-else-if="!signInData.error.email && signInData.payload.email">
                Email address is valid
              </ValidMessage>
            </div>
          </template>
        </InputFieldComponent>

        <!-- password -->
        <InputFieldComponent
          v-model="signInData.payload.password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          :type="passwordInputType"
          :error="signInData.error.password"
          :required="true"
          @update:modelValue="validatePassword($event)"
          @focusout="handleInputPasswordFocusout()"
        >
          <template #cornerHint>
            <RouterLink
              :to="{ name: 'forgot-password' }"
              class="font-semibold text-green-500 hover:text-green-600"
            >
              Forgot password?
            </RouterLink>
          </template>

          <template #iconAfter>
            <EyeIcon
              v-if="isShowPassword"
              class="col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-400 sm:size-4"
              aria-hidden="true"
              @click="handlePasswordToggle()"
            />
            <EyeSlashIcon
              v-else
              class="col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-400 sm:size-4"
              aria-hidden="true"
              @click="handlePasswordToggle()"
            />
          </template>

          <template #helpText>
            <div>
              <HelperMessage
                v-if="!signInData.error.password && signInData.payload.password.length === 0"
              >
                Use strong password between 6 - 20 characters.
              </HelperMessage>
              <ErrorMessage v-else-if="signInData.error.password">
                Not a valid password. (must between 6 - 20 characters)
              </ErrorMessage>
              <ValidMessage v-else-if="!signInData.error.password && signInData.payload.password">
                Password is valid
              </ValidMessage>
            </div>
          </template>
        </InputFieldComponent>

        <!-- button submit -->
        <ButtonComponent type="submit" :disabled="isBtnDisabled">
          <template #default>Sign in</template>
        </ButtonComponent>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
