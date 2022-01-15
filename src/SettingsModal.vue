<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
<div class="bg" @click="emit('close')">
  <div class="modal" @click.stop>
    yo
  </div>
</div>
</template>

<style scoped>
.bg{
  position: absolute;
  inset: 0;
  background: rgba(126, 126, 126, 0.3);
}

.modal{
  position: absolute;
  inset: 0;
  margin: auto;
  width: 500px;
  height: fit-content;
  background-color: white;
}
</style>