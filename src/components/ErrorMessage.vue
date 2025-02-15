<script lang="ts" setup>
defineSlots<{
  default(): void
}>()
</script>

<template>
  <div class="mt-2 text-sm text-red-600">
    <slot></slot>
  </div>
</template>

<style scoped></style>
