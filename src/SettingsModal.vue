<script setup lang="ts">
import { useDark } from '@vueuse/core'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isDark = useDark()
</script>

<template>
<div class="bg" @click="emit('close')">
  <div class="modal" @click.stop>
    <section>
      <p>Nattmodus</p>
      <input type="checkbox" v-model="isDark">
    </section>
  </div>
</div>
</template>

<style scoped>
.bg{
  position: absolute;
  inset: 0;
  background: rgba(126, 126, 126, 0.4);
}

.modal{
  position: absolute;
  inset: 0;
  margin: auto;
  width: 500px;
  height: fit-content;
  background-color: var(--bg);
}
</style>