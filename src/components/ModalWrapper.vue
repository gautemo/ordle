<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
<div class="bg" @click="emit('close')">
  <div class="modal" @click.stop>
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
.bg {
  position: absolute;
  inset: 0;
  background: rgba(126, 126, 126, 0.4);
}

.modal {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 500px;
  height: fit-content;
  min-height: 300px;
  background-color: var(--bg);
  box-shadow: 0 4px 10px 2px var(--shadow);
  padding: 1rem;
}
</style>