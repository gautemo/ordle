<script setup lang="ts">
import { computed } from 'vue'
import { game } from './state'

const props = defineProps<{
  letter: string
}>()

const marked = computed(() => {
  if (game.knownAbsent.has(props.letter)) return 'absent'
  return game.solutionLetters.find(sl => sl.letter === props.letter)?.state ?? []
})
</script>

<template>
  <button @click="game.activeRow.setLetter(props.letter)" :class="marked">{{ props.letter }}</button>
</template>

<style scoped>
.absent {
  background-color: var(--absent);
  color: var(--black);
}

.misplaced {
  background-color: var(--misplaced);
  color: var(--black);
}

.correct {
  background-color: var(--correct);
  color: var(--black);
}

.correct.misplaced {
  background: linear-gradient(-45deg, var(--misplaced) 47%, var(--correct) 53%);
}
</style>
