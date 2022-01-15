<script setup lang="ts">
import { computed } from 'vue';
import { game } from './state';

const props = defineProps<{
  letter: string,
}>()

const marked = computed(() => {
  let best: string[] = []
  let hasCorrect = false
  for (const row of game.rows) {
    const rowStatuses = row.columns.map((letter, i) => {
      if (letter.toUpperCase() === props.letter) return row.checkedColumns[i]
      return ''
    }).filter(status => status)
    if (rowStatuses.includes('correct')) hasCorrect = true
    if (
      (rowStatuses.length === best.length &&
      rowStatuses.filter(s => s === 'correct').length > best.filter(s => s === 'correct').length) ||
      rowStatuses.length > best.length
    ) {
      best = rowStatuses
    } 
  }
  if (props.letter === 'G') console.log(best)
  const hasMisplaced = best.includes('misplaced')
  if(hasCorrect && hasMisplaced) return 'correct misplaced'
  if(hasCorrect) return 'correct'
  if(hasMisplaced) return 'misplaced'
  if(best.includes('absent')) return 'absent'
})
</script>

<template>
  <button @click="game.activeRow.setLetter(props.letter)" :class="marked">{{ props.letter }}</button>
</template>

<style scoped>
.absent {
  background-color: var(--absent);
}

.misplaced {
  background-color: var(--misplaced);
}

.correct {
  background-color: var(--correct);
}

.correct.misplaced{
  background: linear-gradient(-45deg, var(--misplaced) 47%, var(--correct) 53%);
}
</style>