<script setup lang="ts">
import { game } from '../game/state';
import { reactive } from 'vue';
import { datesAreOnSameDay } from '../utils/date';

const countdown = reactive({
  hours: '00',
  minutes: '00',
  seconds: '00',
})

function setClock() {
  const now = new Date()
  if (datesAreOnSameDay(game.day, now)) {
    countdown.hours = (23 - now.getHours()).toString().padStart(2, '0')
    countdown.minutes = (59 - now.getMinutes()).toString().padStart(2, '0')
    countdown.seconds = (59 - now.getSeconds()).toString().padStart(2, '0')
  } else {
    countdown.hours = '00'
    countdown.minutes = '00'
    countdown.seconds = '00'
  }
}

setClock()
setInterval(setClock, 1000)
</script>

<template>
  <div>
    <span>Neste Ordle</span>
    <span class="time">{{ countdown.hours }}:{{ countdown.minutes }}:{{ countdown.seconds }}</span>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.time {
  font-weight: bold;
}

span {
  white-space: nowrap;
}
</style>