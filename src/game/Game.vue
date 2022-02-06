<script setup lang="ts">
import GameRow from './GameRow.vue'
</script>

<template>
  <div class="grid">
    <GameRow v-for="i in 6" :key="i" :row="i - 1" />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: var(--tile-gap);
}
</style>
