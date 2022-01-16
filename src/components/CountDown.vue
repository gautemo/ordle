<script setup lang="ts">
import { reactive } from 'vue';

const countdown = reactive({
  hours: '00',
  minutes: '00',
  seconds: '00',
})

function setClock() {
  const now = new Date()
  countdown.hours = (23 - now.getHours()).toString().padStart(2, '0')
  countdown.minutes = (59 - now.getMinutes()).toString().padStart(2, '0')
  countdown.seconds = (59 - now.getSeconds()).toString().padStart(2, '0')
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
div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.time{
  font-weight: bold;
}
</style>