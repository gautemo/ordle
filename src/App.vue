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
import InfoModal from './InfoModal.vue';

const showSettings = ref(false)
const showStats = ref(false)
const pageVisited = Boolean(localStorage.getItem('page-visited'))
localStorage.setItem('page-visited', 'true')
const showInfo = ref(!pageVisited)

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
      <button @click="showInfo = true">
        <QuestionIcon />
      </button>
      <button @click="showStats = true">
        <GraphIcon />
      </button>
      <button @click="showSettings = true">
        <GearIcon />
      </button>
    </section>
  </header>

  <main>
    <Game />
  </main>
  <footer>
    <GameKeyboard />
  </footer>
  <ModalWrapper v-if="showInfo" @close="showInfo = false">
    <InfoModal />
  </ModalWrapper>
  <ModalWrapper v-if="showSettings" @close="showSettings = false">
    <SettingsModal />
  </ModalWrapper>
  <ModalWrapper v-if="showStats" @close="showStats = false">
    <StatsModal />
  </ModalWrapper>
</template>

<style scoped>
header {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--size-xs);
  box-sizing: border-box;
  background: #035e7b;
  color: var(--white);
  --fill-icons: var(--white);
}

header h1 {
  font-size: var(--size-xl);
  margin: 0;
  font-family: "Arial Black", Gadget, sans-serif;
  padding: 5px 50px;
}

h1 > span {
  background: linear-gradient(
    to right,
    var(--correct) 10%,
    var(--misplaced) 50%,
    var(--absent) 90%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

button {
  background: none;
  border: none;
  margin: var(--size-s);
  padding: var(--size-xs);
  font-size: var(--size-l);
}

footer {
  padding-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

@media only screen and (max-width: 600px) {
  footer {
    padding-bottom: 0;
  }

  header h1 {
    padding: 5px 10px;
  }
}
</style>

<style>
@import "./globalStyle.css";
</style>