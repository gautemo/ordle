<script setup lang="ts">
import { watchEffect } from 'vue';
import { $computed, $ref } from 'vue/macros';
import { game } from './state';

const props = defineProps<{
  row: number,
  column: number,
  active: boolean,
}>()

const row = $computed(() => game.rows[props.row])
const letter = $computed(() => row?.columns[props.column])

function onKey(event: KeyboardEvent) {
  if (event.code === 'Backspace') {
    row.backspace()
  }else{
    row.setLetter((event.target as HTMLInputElement).value)
  }
}

const el = $ref<HTMLInputElement>()
watchEffect(() => {
  if (props.active && row.columnFocused === props.column && el) {
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
    ref="el"
    :class="row?.checkedColumns[props.column]"
    :disabled="!props.active"
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
}

.absent {
  background-color: red;
}

.used {
  background-color: yellow;
}

.correct {
  background-color: green;
}
</style>