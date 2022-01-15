<script setup lang="ts">
import GameRow from './GameRow.vue';
</script>

<template>
  <GameRow v-for="i in 6" :key="i" :row="i-1"/>
</template>

<style scoped>

</style>