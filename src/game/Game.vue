<script setup lang="ts">
import { ref } from 'vue';
import GameRow from './GameRow.vue';

const onTry = ref(0)
</script>

<template>
  <GameRow :active="onTry === 0" @next="onTry++"/>
  <GameRow :active="onTry === 1" @next="onTry++"/>
  <GameRow :active="onTry === 2" @next="onTry++"/>
  <GameRow :active="onTry === 3" @next="onTry++"/>
  <GameRow :active="onTry === 4" @next="onTry++"/>
  <GameRow :active="onTry === 5" @next="onTry++"/>
</template>

<style scoped>

</style>