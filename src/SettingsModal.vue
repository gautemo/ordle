<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { game, gameStatus } from './game/state'
import PopperToast from './popper/PopperToast.vue'
import { toast } from './popper/toaster'
import GlobeIcon from './components/icons/GlobeIcon.vue'
import EmailIcon from './components/icons/EmailIcon.vue'
import { played, streak } from './game/savedStats'
import { animationOff, isSafariv16_2 } from './useAnimationActive'
import { colorContrastOn } from './useColorContrast'

const isDark = useDark()
const initialHardMode = Boolean(localStorage.getItem('hardMode') ?? false)

function toggleHardMode(event: MouseEvent) {
  const element = event.currentTarget as HTMLInputElement
  if (element.checked && gameStatus.value.state === 'playing' && gameStatus.value.row > 1) {
    element.checked = false
    toast('hardmode', 'Kan ikke skrus på når runden er i gang')
  } else if (gameStatus.value.state !== 'won' && gameStatus.value.state !== 'failed') {
    game.changeHardMode(element.checked)
  }
  localStorage.setItem('hardMode', element.checked ? 'on' : '')
}

function exportData() {
  const exportData = {
    played: played.value,
    streak,
  }
  const queryParam = `?data=${JSON.stringify(exportData)}`
  navigator.clipboard.writeText(`${location.href}import.html${queryParam}`)
  toast('export', 'Lenke kopiert.\nÅpne på enhet du ønsker å importere til.')
}
</script>

<template>
  <section>
    <label>
      <input type="checkbox" v-model="isDark" />
      <span>Nattmodus</span>
    </label>
    <PopperToast toast-key="hardmode" placement="bottom">
      <label>
        <input type="checkbox" :checked="initialHardMode" @click="toggleHardMode" />
        <span>Vanskelig modus</span>
      </label>
    </PopperToast>
    <label v-if="!isSafariv16_2">
      <input type="checkbox" v-model="animationOff" />
      <span>Uten animasjoner</span>
    </label>
    <label>
      <input type="checkbox" v-model="colorContrastOn" />
      <span>Høy fargekontrast (forbedring hvis fargeblind)</span>
    </label>
    <PopperToast toast-key="export" placement="bottom" class="fit">
      <button @click="exportData">Eksporter statistikk</button>
    </PopperToast>
    <div class="by">
      <span>Lagd av Gaute Meek Olsen</span>
      <a href="https://gaute.dev" target="_blank" rel="noopener" aria-label="hjemmeside">
        <GlobeIcon />
      </a>
      <a href="mailto:gautedevelopment@gmail.com" aria-label="e-post">
        <EmailIcon />
      </a>
    </div>
  </section>
</template>

<style scoped>
section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

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
  content: '';
  position: absolute;
  inset: 2px;
  background-color: var(--correct);
  transform: scale(0);
  transition: 250ms transform ease-in-out;
}
input:checked::before {
  transform: scale(1);
}

.by {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 15px;
}

.by > span {
  flex: 1;
}

.by > a {
  font-size: var(--size-l);
  padding: 5px;
}

button {
  font-size: var(--size-l);
  border: 2px solid #000;
  padding: 5px 20px;
}

.fit {
  width: fit-content;
}
</style>
