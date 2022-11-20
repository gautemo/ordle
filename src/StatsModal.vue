<script setup lang="ts">
import { computed, ref } from 'vue'
import { played, streak } from './game/savedStats'
import StatsGuessRow from './components/StatsGuessRow.vue'
import { solution } from './game/words'
import CountDown from './components/CountDown.vue'
import ShareText from './components/ShareText.vue'
import { gameStatus } from './game/state'
import BookIcon from './components/icons/BookIcon.vue'

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
    <section v-if="gameStatus.state !== 'playing'" class="today">
      <div v-if="gameStatus.state === 'failed'" class="failed-container">
        <p class="failed">Ikke riktig.</p>
        <button v-if="!revealed" @click="revealed = true">avslør</button>
        <span v-else class="reveal"
          >Korrekt: {{ solution }}
          <a :href="`https://ordbokene.no/bm/search?q=${solution.toLowerCase()}`" class="book" target="_blank" rel="noopener"><BookIcon /></a
        ></span>
      </div>
      <div v-else>
        <p class="correct">
          Riktig: {{ solution }}
          <a :href="`https://ordbokene.no/bm/search?q=${solution.toLowerCase()}`" class="book" target="_blank" rel="noopener"><BookIcon /></a>
        </p>
      </div>
      <CountDown />
    </section>
    <ShareText v-if="gameStatus.state !== 'playing'"/>
    <section class="stats">
      <span>{{ totalPlayed }}</span>
      <span>Antall spill</span>
      <span>{{ winPercentage }} %</span>
      <span>Vunnet</span>
      <span>{{ streak.current }}</span>
      <span>Vunnet rekke</span>
      <span>{{ streak.best }}</span>
      <span>Beste vunnet rekke</span>
    </section>
    <h3>Fordeling av riktige gjetninger</h3>
    <section class="grid">
      <StatsGuessRow :row="1" :value="played[1]" :active="gameStatus.state === 'won' && gameStatus.row === 1" />
      <StatsGuessRow :row="2" :value="played[2]" :active="gameStatus.state === 'won' && gameStatus.row === 2" />
      <StatsGuessRow :row="3" :value="played[3]" :active="gameStatus.state === 'won' && gameStatus.row === 3" />
      <StatsGuessRow :row="4" :value="played[4]" :active="gameStatus.state === 'won' && gameStatus.row === 4" />
      <StatsGuessRow :row="5" :value="played[5]" :active="gameStatus.state === 'won' && gameStatus.row === 5" />
      <StatsGuessRow :row="6" :value="played[6]" :active="gameStatus.state === 'won' && gameStatus.row === 6" />
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

.stats {
  margin: 10px 0;
  display: grid;
  justify-items: center;
  gap: 5px;
  grid-template: 1fr auto / repeat(4, 1fr);
}

.stats > span {
  text-align: center;
}

.stats > :nth-child(2n + 1) {
  font-size: var(--size-xl);
}

.stats > :nth-child(2n) {
  grid-row: 2;
}

.grid {
  display: grid;
  justify-content: start;
  align-items: center;
  grid-template: repeat(6, 1fr) / 20px 30px repeat(v-bind(columns), 1fr);
  gap: 0.5rem 0;
}

.today {
  justify-content: space-between;
}

.correct {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--size-l);
  margin: 0.5rem 0;
  border-bottom: 3px solid var(--correct);
}

.failed {
  margin: 0;
  font-size: var(--size-l);
  border-bottom: 3px solid var(--absent);
}

.failed-container {
  margin: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
}

.failed-container .reveal,
.failed-container button {
  border: 1px dashed var(--grey);
  padding: 5px 10px;
}

.reveal {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.book {
  font-size: var(--size-xl);
  display: flex;
}

h3 {
  margin: 5px;
}
</style>
