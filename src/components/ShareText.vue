<script setup lang="ts">
import { game, gameCompletedState } from '../game/state';

</script>

<template>
  <div class="box">
    <p class="header">Tekst du kan dele:</p>
    <div class="copy">
      <span class="line">Ordle {{ game.day.toLocaleDateString() }}</span>
      <span class="line">Forsøk: {{ gameCompletedState }}/6</span>
      <br/>
      <div v-for="(row, i) in game.rows" :key="i">
        <span v-for="(column,j) in row.checkedColumns" :key="j">
          <span v-if="column === 'correct'">🟩</span>
          <span v-if="column === 'misplaced'">🟨</span>
          <span v-if="column === 'absent'">🟥</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box{
  justify-self: flex-start;
}

.header {
  font-weight: bold;
  margin-bottom: 5px;
}

p {
  margin: 0;
}

.line{
  display: block;
}

.space {
  margin-bottom: 5px;
}

.copy{
  border: 1px dashed var(--correct);
  padding: 3px;
}
</style>