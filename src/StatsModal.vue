<script setup lang="ts">
import { computed, ref } from 'vue';
import { played, streak } from './game/savedStats';
import StatsGuessRow from './components/StatsGuessRow.vue';
import { solution } from './game/words';
import CountDown from './components/CountDown.vue';
import ShareText from './components/ShareText.vue';
import { gameCompletedState } from './game/state';

const totalPlayed = computed(() => Object.values(played.value).reduce((acc, current) => acc + current))
const winPercentage = computed(() => {
  if (totalPlayed.value === 0) return 0
  return Math.ceil(((totalPlayed.value - played.value.fails) / totalPlayed.value) * 100)
})
const columns = computed(() => Math.max(played.value[1], played.value[2], played.value[3], played.value[4], played.value[5], played.value[6]))
const revealed = ref(false)
</script>

<template>
  <div class="container">
    <section v-if="gameCompletedState !== 'playing'" class="today">
      <div v-if="gameCompletedState === 'failed'" class="failed-container">
        <p class="failed">Ikke riktig.</p>
        <button v-if="!revealed" @click="revealed = true">avslør</button>
        <span v-else class="reveal">Korrekt: {{ solution }}</span>
      </div>
      <div v-else>
        <p class="correct">Riktig: {{ solution }}</p>
      </div>
      <CountDown />
    </section>
    <ShareText v-if="gameCompletedState !== 'failed' && gameCompletedState !== 'playing'" />
    <h2>Statistikk</h2>
    <section class="stats">
      <div class="stat">
        <span>{{ totalPlayed }}</span>
        <span>Antall spill</span>
      </div>
      <div class="stat">
        <span>{{ winPercentage }}</span>
        <span>Vunnet %</span>
      </div>
      <div class="stat">
        <span>{{ streak.current }}</span>
        <span>Vunnet rekke</span>
      </div>
      <div class="stat">
        <span>{{ streak.best }}</span>
        <span>Beste vunnet rekke</span>
      </div>
    </section>
    <h3>Fordeling av riktige gjetninger</h3>
    <section class="grid">
      <StatsGuessRow :row="1" :value="played[1]" :active="gameCompletedState === 1" />
      <StatsGuessRow :row="2" :value="played[2]" :active="gameCompletedState === 2" />
      <StatsGuessRow :row="3" :value="played[3]" :active="gameCompletedState === 3" />
      <StatsGuessRow :row="4" :value="played[4]" :active="gameCompletedState === 4" />
      <StatsGuessRow :row="5" :value="played[5]" :active="gameCompletedState === 5" />
      <StatsGuessRow :row="6" :value="played[6]" :active="gameCompletedState === 6" />
    </section>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  place-items: center;
}

section {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
}

.stat {
  display: grid;
  place-items: center;
  text-align: center;
  width: 100px;
}

.stat > span:first-child {
  font-size: 2rem;
}
.stat > span:last-child {
  height: 50px;
}

.grid {
  display: grid;
  justify-content: start;
  grid-template: repeat(6, 1fr) / 20px 20px repeat(v-bind(columns), 1fr);
  gap: 0.5rem;
}

.today {
  justify-content: space-between;
}

.correct {
  font-size: 1.5rem;
  margin: 0.5rem 0;
  border-bottom: 3px solid var(--correct);
}

.failed {
  margin: 0;
  font-size: 1.5rem;
  border-bottom: 3px solid var(--absent);
}

.failed-container {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.failed-container .reveal,
.failed-container button {
  border: 1px dashed var(--grey);
  padding: 3px;
  font-size: inherit;
}

@media only screen and (max-width: 600px) {
  section{
    gap: 0.5rem;
  }
  .stats {
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr;
    justify-items: center;
  }

  .stat:nth-child(2n) {
    justify-self: start;
  }
  .stat:nth-child(2n + 1) {
    justify-self: end;
  }
  .stat > span:first-child {
    font-size: 1.2rem;
  }
}
</style>