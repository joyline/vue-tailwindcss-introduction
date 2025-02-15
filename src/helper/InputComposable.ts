import { ref } from 'vue'

export function usePasswordToggle() {
  const isShowPassword = ref<boolean>(false)
  const passwordInputType = ref<string>('password')

  function handlePasswordToggle() {
    isShowPassword.value = !isShowPassword.value

    if (passwordInputType.value === 'text') {
      passwordInputType.value = 'password'
    } else {
      passwordInputType.value = 'text'
    }
  }

  return { isShowPassword, passwordInputType, handlePasswordToggle }
}
