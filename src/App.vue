<script setup lang="ts">
import QuestionIcon from './components/icons/QuestionIcon.vue';
import GraphIcon from './components/icons/GraphIcon.vue';
import GearIcon from './components/icons/GearIcon.vue';
import GameRow from './game/GameRow.vue'
import GameKeyboard from './game/GameKeyboard.vue';
import { ref, watchEffect } from 'vue';
import SettingsModal from './SettingsModal.vue';
import ModalWrapper from './components/ModalWrapper.vue';
import StatsModal from './StatsModal.vue';
import { gameStatus } from './game/state';
import InfoModal from './InfoModal.vue';

const showSettings = ref(false)
const showStats = ref(false)
const pageVisited = Boolean(localStorage.getItem('page-visited'))
localStorage.setItem('page-visited', 'true')
const showInfo = ref(!pageVisited)

watchEffect(() => {
  if (gameStatus.value.state === 'won' || gameStatus.value.state === 'failed') {
    setTimeout(() => showStats.value = true, 1500)
  }
})
</script>

<template>
  <header>
    <h1>
      <span>ORD</span>LE
    </h1>
    <section>
      <button @click="showInfo = true" aria-label="info">
        <QuestionIcon />
      </button>
      <button @click="showStats = true" aria-label="statistikk">
        <GraphIcon />
      </button>
      <button @click="showSettings = true" aria-label="innstillinger">
        <GearIcon />
      </button>
    </section>
  </header>

  <ModalWrapper v-if="showInfo" @close="showInfo = false">
    <InfoModal />
  </ModalWrapper>
  <ModalWrapper v-if="showSettings" @close="showSettings = false">
    <SettingsModal />
  </ModalWrapper>
  <ModalWrapper v-if="showStats" @close="showStats = false">
    <StatsModal />
  </ModalWrapper>
  
  <main>
    <GameRow v-for="i in 6" :key="i" :row="i - 1" />
  </main>
  <footer>
    <GameKeyboard />
  </footer>
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

main {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: var(--tile-gap);
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