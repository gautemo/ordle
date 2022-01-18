<script setup lang="ts">
import { ref } from 'vue';
import CrossIcon from './CrossIcon.vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modal = ref<HTMLElement>()
useFocusTrap(modal, { immediate: true })
</script>

<template>
  <div class="bg" @click="emit('close')" ref="modal">
    <div class="modal" @click.stop>
      <header>
        <button @click="emit('close')" autofocus>
          <CrossIcon />
        </button>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: flex-end;
}
.bg {
  position: absolute;
  inset: 0;
  background: rgba(126, 126, 126, 0.4);
}

.modal {
  position: absolute;
  inset: 0;
  margin: auto;
  width: clamp(300px, 95vw, 500px);
  height: fit-content;
  min-height: 300px;
  background-color: var(--bg);
  box-shadow: 0 4px 10px 2px var(--shadow);
  padding: 1rem;
  max-height: 90vh;
  overflow: auto;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1.5rem;
}

@media only screen and (max-width: 600px) {
  .modal {
    padding: 5px;
  }
}
</style>