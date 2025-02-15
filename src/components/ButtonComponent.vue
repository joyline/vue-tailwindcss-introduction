<script lang="ts" setup>
type Booleanish = boolean | 'true' | 'false'

const props = defineProps<{
  disabled?: Booleanish
  form?: string
  formaction?: string
  formmethod?: string
  formtarget?: string
  type?: 'submit' | 'reset' | 'button'
  class?: string
}>()

defineSlots<{
  default(): void
}>()
</script>

<template>
  <div>
    <button
      v-bind="props"
      class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs"
      :class="[disabled ? 'btn-disabled' : 'btn-primary']"
    >
      <slot></slot>
    </button>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.btn-disabled {
  @apply bg-gray-400 hover:bg-gray-400/75 cursor-not-allowed;
}

.btn-primary {
  @apply bg-green-500 hover:bg-green-600 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600;
}
</style>
