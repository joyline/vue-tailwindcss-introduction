<script lang="ts" setup>
type Booleanish = boolean | 'true' | 'false'

type InputType = string | 'email' | 'hidden' | 'number' | 'password' | 'text'

const model = defineModel()

const props = defineProps<{
  id?: string
  label: string
  name: string
  type: InputType

  placeholder?: string
  autocomplete?: string
  required?: Booleanish
  disabled?: Booleanish
  class?: string

  error?: Booleanish
}>()

const slots = defineSlots<{
  cornerHint?(): void
  iconAfter?(): void
  helpText?(): void
}>()
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <!-- label -->
      <label :for="name" class="block text-sm/6 font-medium text-gray-900">{{ props.label }}</label>

      <!-- corner hint -->
      <div v-if="slots.cornerHint" class="text-sm">
        <slot name="cornerHint"></slot>
      </div>
    </div>
    <!-- input -->
    <div class="mt-2 grid grid-cols-1">
      <input
        v-model="model"
        v-bind="props"
        class="col-start-1 row-start-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
        :class="[error ? 'focus:outline-red-600' : 'focus:outline-green-600']"
      />
      <slot v-if="slots.iconAfter" name="iconAfter"></slot>
    </div>
    <slot v-if="slots.helpText" name="helpText"></slot>
  </div>
</template>

<style scoped></style>
