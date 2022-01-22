<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { game } from './game/state';
import { Dropdown as TooltipHolder } from 'floating-vue'
import { ref } from 'vue';

const isDark = useDark()
const showHardmodeInfo = ref(false)

function toggleHardMode(event: MouseEvent) {
  const element = event.currentTarget as HTMLInputElement
  if (game.rows.length > 1 && !game.hardMode) {
    element.checked = false
    showHardmodeInfo.value = true
    setTimeout(() => showHardmodeInfo.value = false, 2000)
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
    <TooltipHolder :shows="showHardmodeInfo" placement="bottom">
      <label>
        <input type="checkbox" :checked="game.hardMode" @click="toggleHardMode" />
        <span>Vanskelig modus {{showHardmodeInfo}}</span>
      </label>
      <template #popper>
        <p class="popper">Vanskelig modus kan ikke skurs på når runden er i gang</p>
      </template>
    </TooltipHolder>
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
  border: 0.15rem solid currentColor;
  border-radius: 0.2rem;
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

.popper {
  padding: 1rem;
  max-width: 200px;
}
</style>