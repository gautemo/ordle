<script setup lang="ts">
import { computed } from 'vue'
import { played, streak } from '../game/savedStats'
import { Data } from './type'
import CaretDown from './CaretDown.vue'

const searchParams = new URLSearchParams(location.search)
const data: Data = JSON.parse(searchParams.get('data') ?? '')

const totalPlayed = computed(() => Object.values(played.value).reduce((acc, current) => acc + current))
const winPercentage = computed(() => {
  if (totalPlayed.value === 0) return 0
  return Math.ceil(((totalPlayed.value - played.value.fails) / totalPlayed.value) * 100)
})

const importTotalPlayed = computed(() => Object.values(data.played).reduce((acc, current) => acc + current))
const importWinPercentage = computed(() => {
  if (importTotalPlayed.value === 0) return 0
  return Math.ceil(((importTotalPlayed.value - data.played.fails) / importTotalPlayed.value) * 100)
})

if (totalPlayed.value === 0) {
  importData()
}

function importData() {
  played.value[1] = data.played[1]
  played.value[2] = data.played[2]
  played.value[3] = data.played[3]
  played.value[4] = data.played[4]
  played.value[5] = data.played[5]
  played.value[6] = data.played[6]
  played.value.fails = data.played.fails
  const currentKey = 'streak'
  const bestKey = 'best-streak'
  localStorage.setItem(currentKey, data.streak.current.toString())
  localStorage.setItem(bestKey, data.streak.best.toString())
  location.href = location.origin
}

function no() {
  location.href = location.origin
}
</script>

<template>
  <main>
    <h1>Overskriv?</h1>
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
    <span class="down"> <CaretDown />med<CaretDown /> </span>
    <section class="stats">
      <span>{{ importTotalPlayed }}</span>
      <span>Antall spill</span>
      <span>{{ importWinPercentage }} %</span>
      <span>Vunnet</span>
      <span>{{ data.streak.current }}</span>
      <span>Vunnet rekke</span>
      <span>{{ data.streak.best }}</span>
      <span>Beste vunnet rekke</span>
    </section>
    <section class="answer">
      <button class="yes" @click="importData">Ja</button>
      <button class="no" @click="no">Nei</button>
    </section>
  </main>
</template>

<style scoped>
main {
  text-align: center;
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

.down {
  font-size: var(--size-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.answer {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 25px;
}

.answer > button {
  font-size: var(--size-l);
  border: 2px solid #000;
  padding: 5px 20px;
}

.yes {
  background-color: var(--correct);
  color: var(--black);
}
</style>

<style>
@import '../globalStyle.css';
</style>
