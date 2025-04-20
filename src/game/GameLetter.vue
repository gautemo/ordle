<script setup lang="ts">
import { computed, watchEffect, useTemplateRef } from 'vue'
import { game } from './state'

const props = defineProps<{
  row: number
  column: number
  isActiveRow: boolean
}>()

const row = computed(() => game.rows[props.row])
const letter = computed(() => row.value?.columns[props.column])
const animDelay = computed(() => `${props.column * 0.15}s`)

function onKey(event: KeyboardEvent) {
  if (event.code === 'Backspace') {
    row.value?.backspace(true)
  }
  if (/^(\w|æ|ø|å){1}$/i.test(event.key)) {
    row.value?.setLetter(event.key, true)
  }
}

const inputEl = useTemplateRef<HTMLInputElement>('input')
watchEffect(() => {
  if (props.isActiveRow && row.value?.moveFocusTo === props.column && inputEl.value) {
    inputEl.value.disabled = false
    inputEl.value.focus()
  }
})
const focused = computed(() => props.isActiveRow && row.value?.columnFocused === props.column)

const labelState = computed(() => {
  if (row.value?.checkedColumns[props.column]) {
    const statuses: { [key: string]: string } = {
      correct: 'Riktig',
      misplaced: 'Riktig bokstav men på feil plass',
      absent: 'Bokstav ikke i ordet',
    }
    return statuses[row.value.checkedColumns[props.column]!]
  }
  if (props.isActiveRow) return `gjett ${props.row + 1} bokstav ${props.column + 1}`
  return `rad ${props.row + 1} ikke aktiv.`
})
</script>

<template>
  <input type="text" @keyup="onKey" :value="letter" maxlength="1" ref="input"
    :class="[row?.checkedColumns[props.column], { focus: focused }]" :disabled="!props.isActiveRow"
    @focus="row?.focusTo(props.column)" inputmode="none" :aria-label="labelState" />
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
  background-color: var(--input-color);
  animation: flip 0.5s ease-in v-bind(animDelay) forwards;
}

input:focus-visible,
input.focus {
  outline: none;
  border-color: currentColor;
}

@keyframes flip {
  from {
    background-color: var(--input-color);
    color: currentColor;
    -webkit-text-fill-color: currentColor;
  }

  49% {
    background-color: var(--input-color);
    color: currentColor;
    -webkit-text-fill-color: currentColor;
  }

  50% {
    transform: rotateX(90deg);
    background-color: var(--bg);
    color: var(--black);
    -webkit-text-fill-color: var(--black);
  }

  to {
    transform: rotateX(0deg);
    background-color: var(--bg);
    color: var(--black);
    -webkit-text-fill-color: var(--black);
  }
}

.reduce-animation input.absent,
.reduce-animation input.correct,
.reduce-animation input.misplaced {
  animation: stopflip forwards;
}

@keyframes stopflip {
    from,
    to {
      transform: rotateX(0deg);
      background-color: var(--bg);
      color: var(--black);
      -webkit-text-fill-color: var(--black);
    }
  }

@media (prefers-reduced-motion) {
  @keyframes flip {
    from,
    to {
      transform: rotateX(0deg);
      background-color: var(--bg);
      color: var(--black);
      -webkit-text-fill-color: var(--black);
    }
  }
}
</style>
