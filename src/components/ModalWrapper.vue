<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import CrossIcon from './icons/CrossIcon.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modal = useTemplateRef<HTMLDialogElement>('modal')
onMounted(() => {
  modal.value?.showModal()
  modal.value?.addEventListener('close', () => emit('close'))
})
</script>

<template>
  <dialog ref="modal" @click="modal?.close()">
    <div @click.stop>
      <header>
        <button @click="modal?.close()" autofocus aria-label="lukk">
          <CrossIcon />
        </button>
      </header>
      <slot class="slot"></slot>
    </div>
  </dialog>
</template>

<style scoped>
header {
  display: flex;
  justify-content: flex-end;
}

dialog::backdrop {
  background: rgba(126, 126, 126, 0.4);
}

dialog {
  border: none;
  color: var(--text-color);
  background-color: var(--bg);
  box-shadow: 0 4px 10px 2px var(--shadow);
  padding: 0rem;
  height: fit-content;
  min-height: 300px;
  max-height: 90vh;
  overflow: auto;
}

dialog > div {
  padding: 1rem;
  width: clamp(300px, 90vw, 500px);
}

button {
  border: none;
  background: none;
  font-size: var(--size-l);
  min-height: 30px;
  min-width: 30px;
}

@media only screen and (max-width: 600px) {
  dialog > div {
    padding: 10px;
  }
}
</style>
