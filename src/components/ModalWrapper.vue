<script setup lang="ts">
import { ref } from 'vue'
import CrossIcon from './icons/CrossIcon.vue'
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
        <button @click="emit('close')" autofocus aria-label="lukk">
          <CrossIcon />
        </button>
      </header>
      <slot class="slot"></slot>
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
  z-index: 10001;
  inset: 0;
  margin: auto;
  width: clamp(300px, 90vw, 500px);
  height: fit-content;
  min-height: 300px;
  background-color: var(--bg);
  box-shadow: 0 4px 10px 2px var(--shadow);
  padding: 1rem;
  max-height: 90vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

button {
  border: none;
  background: none;
  font-size: var(--size-l);
  min-height: 30px;
  min-width: 30px;
}

@media only screen and (max-width: 600px) {
  .modal {
    padding: 10px;
  }
}
</style>
