<script setup lang="ts">
import { ref } from 'vue';
import { game, gameCompletedState } from '../game/state';
import { Dropdown as TooltipHolder } from 'floating-vue'

const showCopied = ref(false)

function copy(event: MouseEvent) {
  navigator.clipboard.writeText((event.currentTarget as HTMLButtonElement).innerText.replace('\n\n', '\n'))
  showCopied.value = true
  setTimeout(() => showCopied.value = false, 2000)
}
</script>

<template>
  <div class="box">
    <p class="header">Tekst du kan dele:</p>
    <TooltipHolder :shows="showCopied" placement="right">
      <button class="copy" @click.once="copy">
        <span class="line">Ordle {{ game.day.toLocaleDateString() }}</span>
        <span class="line">Forsøk: {{ gameCompletedState }}/6</span>
        <br />
        <div v-for="(row, i) in game.rows" :key="i">
          <span v-for="(column,j) in row.checkedColumns" :key="j">
            <span v-if="column === 'correct'">🟩</span>
            <span v-if="column === 'misplaced'">🟨</span>
            <span v-if="column === 'absent'">🟥</span>
          </span>
        </div>
      </button>
      <template #popper>
        <p class="popper">Tekst kopiert</p>
      </template>
    </TooltipHolder>
  </div>
</template>

<style scoped>
.box {
  justify-self: flex-start;
}

.header {
  font-weight: bold;
  margin-bottom: 5px;
}

p {
  margin: 0;
}

.line {
  display: block;
}

.copy > div:first-of-type {
  margin-top: -10px;
}

.copy {
  cursor: pointer;
  border: 1px dashed var(--correct);
  padding: 3px;
  background: none;
  font-size: inherit;
  user-select: text;
}

.popper {
  padding: 1rem;
  max-width: 200px;
}
</style>