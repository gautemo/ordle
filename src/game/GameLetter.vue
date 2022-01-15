<script setup lang="ts">
import { watchEffect } from 'vue';
import { $computed, $ref } from 'vue/macros';
import { game } from './state';

const props = defineProps<{
  row: number,
  column: number,
}>()

const row = $computed(() => game.rows[props.row])
const letter = $computed(() => row?.columns[props.column])
const isActiveRow = $computed(() => row?.active(game.rows.length-1))

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
</script>

<template>
  <input
    type="text"
    @keyup="onKey"
    :value="letter"
    maxlength="1"
    ref="el"
    :class="row?.checkedColumns[props.column]"
    :disabled="!isActiveRow"
    @focus="row.focusTo(props.column)"
  />
</template>

<style scoped>
input {
  width: 62px;
  height: 62px;
  margin: 3px;
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  border-radius: 8px;
  border: 2px solid var(--grey);
}

input:disabled{
  color: inherit;
  background-color: var(--grey-light);
}

input.absent {
  background-color: var(--absent);
}

input.misplaced {
  background-color: var(--misplaced);
}

input.correct {
  background-color: var(--correct);
}
</style>