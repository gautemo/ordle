<script setup lang="ts">
import QuestionIcon from './components/QuestionIcon.vue';
import GraphIcon from './components/GraphIcon.vue';
import GearIcon from './components/GearIcon.vue';
import Game from './game/Game.vue';
import GameKeyboard from './game/GameKeyboard.vue';
import { ref, watch } from 'vue';
import SettingsModal from './SettingsModal.vue';
import ModalWrapper from './components/ModalWrapper.vue';
import StatsModal from './StatsModal.vue';
import { gameCompletedState } from './game/state';

const showSettings = ref(false)
const showStats = ref(false)

watch(gameCompletedState, (state, prevState) => {
  if (prevState === 'playing' && state !== 'playing') {
    showStats.value = true
  }
})
</script>

<template>
  <header>
    <h1>
      <span>ORD</span>LE
    </h1>
    <section>
      <button>
        <QuestionIcon />
      </button>
      <button>
        <GraphIcon @click="showStats = true"/>
      </button>
      <button>
        <GearIcon @click="showSettings = true" />
      </button>
    </section>
  </header>

  <main>
    <Game />
  </main>
  <footer>
    <GameKeyboard />
  </footer>
  <ModalWrapper v-if="showSettings" @close="showSettings = false">
    <SettingsModal/>
  </ModalWrapper>
  <ModalWrapper v-if="showStats" @close="showStats = false">
    <StatsModal/>
  </ModalWrapper>
</template>

<style scoped>
header {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  font-size: 1.3rem;
  box-sizing: border-box;
  background: #035e7b;
  color: var(--white);
  --fill-icons: var(--white);
}

header h1 {
  font-size: 2rem;
  margin: 0;
  font-family: "Arial Black", Gadget, sans-serif;
  padding: 5px 50px;
}

h1 > span{
  background: linear-gradient(to right, var(--correct) 10%, var(--misplaced) 50%, var(--absent) 90%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

button {
  cursor: pointer;
  background: none;
  border: none;
  margin: 0.5rem;
  padding: 0.2rem;
  font-size: 1.5rem;
}

footer {
  padding-bottom: 1rem;
}
</style>

<style>
@import "./globalStyle.css";
</style>