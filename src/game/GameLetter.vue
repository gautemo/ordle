<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { $computed, $ref } from 'vue/macros'
import { game } from './state'

const props = defineProps<{
  row: number
  column: number
}>()

const row = $computed(() => game.rows[props.row])
const letter = $computed(() => row?.columns[props.column])
const isActiveRow = $computed(() => row?.active(game.rows.length - 1))

function onKey(event: KeyboardEvent) {
  if (event.code === 'Backspace') {
    row.backspace(true)
  }
  if (/^(\w|æ|ø|å){1}$/i.test(event.key)) {
    row.setLetter(event.key, true)
  }
}

const el = $ref<HTMLInputElement>()
watchEffect(() => {
  if (isActiveRow && row.moveFocusTo === props.column && el) {
    el.disabled = false
    el.focus()
  }
})
const focused = computed(() => isActiveRow && row.columnFocused === props.column)

const labelState = computed(() => {
  if (row?.checkedColumns[props.column]) {
    const statuses: { [key: string]: string } = {
      correct: 'Riktig',
      misplaced: 'Riktig bokstav men på feil plass',
      absent: 'Bokstav ikke i ordet',
    }
    return statuses[row?.checkedColumns[props.column]]
  }
  if (isActiveRow) return `gjett ${props.row + 1} bokstav ${props.column + 1}`
  return `rad ${props.row + 1} ikke aktiv.`
})
</script>

<template>
  <input
    type="text"
    @keyup="onKey"
    :value="letter"
    maxlength="1"
    ref="el"
    :class="[row?.checkedColumns[props.column], { focus: focused }]"
    :disabled="!isActiveRow"
    @focus="row.focusTo(props.column)"
    inputmode="none"
    :aria-label="labelState"
  />
</template>

<style scoped>
input {
  padding: 0;
  aspect-ratio: 1 / 1;
  font-size: var(--size-xl);
  text-align: center;
  text-transform: uppercase;
  border-radius: 8px;
  border: 2px solid var(--grey);
  touch-action: manipulation;
}

input:disabled {
  opacity: 1;
  background-color: var(--bg-alt2);
  cursor: auto;
}

input.absent {
  --bg: var(--absent);
}

input.misplaced {
  --bg: var(--misplaced);
}

input.correct {
  --bg: var(--correct);
}

input.absent,
input.correct,
input.misplaced {
  background-color: var(--bg);
  color: var(--black);
  -webkit-text-fill-color: var(--black);
}

input:focus-visible,
input.focus {
  outline: none;
  border-color: currentColor;
}
</style>
