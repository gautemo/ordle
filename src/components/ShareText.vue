<script setup lang="ts">
import { game, gameStatus } from '../game/state';
import PopperToast from '../popper/PopperToast.vue';
import { toast } from '../popper/toaster';

function copy(event: MouseEvent) {
  navigator.clipboard.writeText((event.currentTarget as HTMLButtonElement).innerText.replace('\n\n', '\n'))
  toast('copy', 'Tekst kopiert')
}
</script>

<template>
  <div class="box">
    <p class="header">Tekst du kan dele:</p>
    <PopperToast toast-key="copy" placement="right">
      <button class="copy" @click="copy">
        <span class="line">Ordle{{game.hardMode ? '[vanskelig]':''}} {{ new Intl.DateTimeFormat('nb').format(game.day) }}</span>
        <span class="line">Forsøk: {{ gameStatus.row }}/6</span>
        <br />
        <div v-for="(row, i) in game.rows" :key="i">
          <span v-for="(column,j) in row.checkedColumns" :key="j">
            <template v-if="column === 'correct'">🟩</template>
            <template v-if="column === 'misplaced'">🟨</template>
            <template v-if="column === 'absent'">🟥</template>
          </span>
        </div>
      </button>
    </PopperToast>
  </div>
</template>

<style scoped>
.box {
  justify-self: flex-start;
}

.header {
  margin-bottom: 5px;
}

p {
  margin: 0;
}

.line {
  display: block;
}

.copy > div:first-of-type {
  margin-top: -15px;
}

.copy {
  flex-direction: column;
  align-items: flex-start;
  border: 1px dashed var(--correct);
  padding: 3px;
  background: none;
  user-select: text;
}

.copy div > span{
  font-size: 0.9rem;
  line-height: 0px;
}
</style>