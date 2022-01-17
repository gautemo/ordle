import { datesAreOnSameDay } from '../utils/date';
import { computed, readonly, ref, watch } from 'vue';
import { storePlayed } from './savedStats';
import { words, solution } from './words';

function rowState(row: number, initialColumns = ['', '', '', '', ''], initialCheckedColumns: LetterChecked[] = []) {
  const columns = ref(initialColumns)
  const checkedColumns = ref<LetterChecked[]>(initialCheckedColumns)
  const columnFocused = ref(0)
  const moveFocusTo = ref(0)
  function resetFocus() {
    if (!columns.value[0]) columnFocused.value = 0
    else if (!columns.value[1]) columnFocused.value = 1
    else if (!columns.value[2]) columnFocused.value = 2
    else if (!columns.value[3]) columnFocused.value = 3
    else if (!columns.value[4]) columnFocused.value = 4
  }
  const answer = computed(() => {
    const value = columns.value.join('').toUpperCase()
    return {
      value,
      rowFull: value.length === 5,
      valid: words.includes(value)
    }
  })
  return readonly({
    columns,
    columnFocused,
    moveFocusTo,
    checkedColumns,
    answer,
    active: (activeRow: number) => activeRow == row && checkedColumns.value.length === 0,
    backspace: (moveUIFocus = false) => {
      const index = columnFocused.value
      if (columns.value[index]) {
        columns.value[index] = ''
      } else {
        if (index > 0) {
          columns.value[index - 1] = ''
          columnFocused.value = index - 1
        }
      }
      if (moveUIFocus) moveFocusTo.value = columnFocused.value
    },
    setLetter: (value: string, moveUIFocus = false) => {
      if (checkedColumns.value.length > 0) return
      if (value.length > 1) value = value[value.length - 1]
      const index = columnFocused.value
      columns.value[index] = value
      if (index < 4 && (!columns.value[index + 1] || columns.value.every(l => l))) {
        columnFocused.value = index + 1
      } else {
        resetFocus()
      }
      if (moveUIFocus) moveFocusTo.value = columnFocused.value
    },
    checkAnswer: () => {
      if (checkedColumns.value.length > 0) return
      if (answer.value.valid) {
        if (answer.value.value === solution) {
          checkedColumns.value = Array.from({ length: 5 }, () => 'correct')
        } else {
          let solutionLeft = solution
          checkedColumns.value = Array.from({ length: 5 }, (_, i) => {
            const letter = columns.value[i].toUpperCase()
            if (solution[i] === letter) {
              solutionLeft = solutionLeft.replace(letter, '')
              return 'correct'
            }
            return 'not_calculated'
          })
          checkedColumns.value = checkedColumns.value.map((c, i) => {
            if (c === 'correct') return c
            const letter = columns.value[i].toUpperCase()
            if (solutionLeft.includes(letter)) {
              solutionLeft = solutionLeft.replace(letter, '')
              return 'misplaced'
            }
            return 'absent'
          })
          if (game.rows.length < 6) addNewRow()
        }
      }
    },
    focusTo: (column: number) => {
      columnFocused.value = column
    },
    resetFocus
  })
}

const gameState = startGame()
const addNewRow = () => {
  gameState.rows.value.push(rowState(gameState.rows.value.length))
  saveGame()
}

export const game = readonly({
  rows: gameState.rows,
  activeRow: computed(() => gameState.rows.value[gameState.rows.value.length - 1]),
  day: gameState.started
})
export const gameCompletedState = computed(() => {
  const active = gameState.rows.value[gameState.rows.value.length - 1]
  if (active.checkedColumns.length === 0) return 'playing'
  if (active.checkedColumns.every(s => s === 'correct')) {
    return gameState.rows.value.length
  }
  return 'failed'
})

watch(gameCompletedState, (state, prevState) => {
  if (prevState === 'playing' && state !== 'playing') {
    saveGame()
    if (state === 'failed') {
      storePlayed()
    } else {
      storePlayed(gameState.rows.value.length as 1 | 2 | 3 | 4 | 5 | 6)
    }
  }
})

document.addEventListener('keyup', event => {
  if (event.code === 'Tab' && event.target instanceof HTMLButtonElement) game.activeRow.resetFocus()
  if (event.code === 'Enter' && !(event.target instanceof HTMLButtonElement)) {
    game.activeRow.checkAnswer()
  }
  if (event.code === 'Backspace' && !(event.target instanceof HTMLInputElement)) {
    game.activeRow.backspace(true)
  }
  if (/^(\w|æ|ø|å){1}$/i.test(event.key) && !(event.target instanceof HTMLInputElement)) {
    game.activeRow.setLetter(event.key, true)
  }
})

function saveGame() {
  const toSave = {
    started: gameState.started,
    rows: gameState.rows.value.map(r => {
      return {
        columns: r.columns,
        checkedColumns: r.checkedColumns
      }
    })
  }
  localStorage.setItem('gameState', JSON.stringify(toSave))
}

function startGame() {
  const savedState = localStorage.getItem('gameState')
  if (savedState) {
    const saved = JSON.parse(savedState) as GameState
    const started = new Date(saved.started)
    const isToday = datesAreOnSameDay(started, new Date())
    if (isToday) {
      return {
        rows: ref(saved.rows.map((r, i) => rowState(i, r.columns, r.checkedColumns))),
        started: started
      }
    }
  }
  return { rows: ref([rowState(0)]), started: new Date() }
}

interface GameState {
  started: string,
  rows: {
    columns: string[],
    checkedColumns: LetterChecked[]
  }[]
}

type LetterChecked = 'not_calculated' | 'correct' | 'absent' | 'misplaced'
