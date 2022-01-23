<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { game } from './game/state';
import PopperToast from './popper/PopperToast.vue';
import { toast } from './popper/toaster';

const isDark = useDark()

function toggleHardMode(event: MouseEvent) {
  const element = event.currentTarget as HTMLInputElement
  if (game.rows.length > 1 && !game.hardMode) {
    element.checked = false
    toast('hardmode')
  } else {
    game.changeHardMode(element.checked)
  }
}
</script>

<template>
  <section>
    <label>
      <input type="checkbox" v-model="isDark" />
      <span>Nattmodus</span>
    </label>
    <!-- <PopperToast
      msg="Kan ikke skurs på når runden er i gang"
      toast-key="hardmode"
      placement="bottom"
    >
      <label>
        <input type="checkbox" :checked="game.hardMode" @click="toggleHardMode" />
        <span>Vanskelig modus</span>
      </label>
    </PopperToast> -->
  </section>
</template>

<style scoped>
label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--size-l);
  padding-bottom: 5px;
  border-bottom: 1px solid var(--grey);
}

input {
  position: relative;
  appearance: none;
  width: var(--size-xl);
  height: var(--size-xl);
  border: 2px solid currentColor;
  border-radius: 4px;
}
input::before {
  content: "";
  position: absolute;
  inset: 2px;
  background-color: var(--correct);
  transform: scale(0);
  transition: 250ms transform ease-in-out;
}
input:checked::before {
  transform: scale(1);
}
</style>