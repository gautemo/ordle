<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { $computed, $ref } from 'vue/macros';
import { game } from './state';

const props = defineProps<{
  row: number,
  column: number,
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
  />
</template>

<style scoped>
input {
  width: clamp(30px, min(10vw, 10vh), 80px);
  height: clamp(30px, min(10vw, 10vh), 80px);
  margin: 3px;
  font-size: var(--size-xl);
  text-align: center;
  text-transform: uppercase;
  border-radius: 8px;
  border: 2px solid var(--grey);
}

input:disabled {
  color: inherit;
  background-color: var(--bg-alt2);
}

input.absent {
  background-color: var(--absent);
  color: var(--black);
}

input.misplaced {
  background-color: var(--misplaced);
  color: var(--black);
}

input.correct {
  background-color: var(--correct);
  color: var(--black);
}

input:focus-visible,
input.focus {
  outline: none;
  border-color: currentColor;
}

</style>