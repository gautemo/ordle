import { datesAreOnSameDay } from '../utils/date'
import { computed, readonly, ref, watch } from 'vue'
import { storePlayed } from './savedStats.ts'
import { words, solution } from './words.ts'
import { toast } from '../popper/toaster.ts'
import { today } from './today.ts'

function rowState(row: number, initialColumns = ['', '', '', '', ''], initialCheckedColumns: LetterChecked[] = []) {
  const columns = ref(initialColumns)
  const checkedColumns = ref<LetterChecked[]>(initialCheckedColumns)
  const columnFocused = ref(0)
  const shake = ref(0)
  function resetFocus() {
    if (!columns.value[0]) columnFocused.value = 0
    else if (!columns.value[1]) columnFocused.value = 1
    else if (!columns.value[2]) columnFocused.value = 2
    else if (!columns.value[3]) columnFocused.value = 3
    else if (!columns.value[4]) columnFocused.value = 4
  }
  const answer = computed(() => {
    const value = columns.value.join('')
    return {
      value,
      rowFull: value.length === 5,
      valid: words.includes(value),
    }
  })
  return readonly({
    columns,
    columnFocused,
    checkedColumns,
    answer,
    shake,
    backspace: () => {
      const index = columnFocused.value
      if (columns.value[index]) {
        columns.value[index] = ''
      } else {
        if (index > 0) {
          columns.value[index - 1] = ''
          columnFocused.value = index - 1
        }
      }
    },
    setLetter: (value: string) => {
      if (checkedColumns.value.length > 0) return
      if (value.length > 1) value = value[value.length - 1]!
      const index = columnFocused.value
      columns.value[index] = value.toLowerCase()
      if (index < 4 && (!columns.value[index + 1] || columns.value.every(l => l))) {
        columnFocused.value = index + 1
      } else {
        resetFocus()
      }
    },
    checkAnswer: () => {
      if (checkedColumns.value.length > 0) return
      if (gameState.hardMode.value) {
        const needed = gameState.solutionLetters
          .map(sl => ({ letter: sl.letter, i: [...sl.found].find(i => columns.value[i] !== sl.letter) }))
          .find(n => n.i !== undefined)
        if (needed) {
          toast(`row${row}`, `${needed.letter} må være bokstav ${needed.i! + 1}`)
          shake.value++
          return
        }
        const neededMisplaced = gameState.solutionLetters
          .map(sl => ({
            letter: sl.letter,
            times: Math.min(sl.maxGuess, solution.split(sl.letter).length - 1),
            guessed: columns.value.filter(c => c === sl.letter).length,
          }))
          .find(n => n.guessed < n.times)
        if (neededMisplaced) {
          toast(`row${row}`, `${neededMisplaced.letter} må være tilstede ${neededMisplaced.times} gang${neededMisplaced.times > 1 ? 'er' : ''}`)
          shake.value++
          return
        }
      }
      if (answer.value.valid) {
        let solutionLeft = solution
        for (const [i, letter] of [...solution].entries()) {
          if (columns.value[i] == letter) {
            checkedColumns.value.push('correct')
            gameState.solutionLetters.find(sl => sl.letter === letter)?.fountAt(i)
            solutionLeft = solutionLeft.replace(letter, '')
          } else {
            checkedColumns.value.push('not_calculated')
          }
        }
        for (const [i, letter] of columns.value.entries()) {
          if (checkedColumns.value[i] === 'correct') continue
          if (solutionLeft.includes(letter)) {
            checkedColumns.value[i] = 'misplaced'
            solutionLeft = solutionLeft.replace(letter, '')
          } else {
            checkedColumns.value[i] = 'absent'
            if (!solution.includes(letter)) gameState.knownAbsent.value.add(letter)
          }
        }
        new Set(columns.value).forEach(letter => {
          const occurs = columns.value.filter(l => l === letter).length
          gameState.solutionLetters.find(sl => sl.letter === letter)?.guessedTimes(occurs)
        })
        const won = checkedColumns.value.every(state => state === 'correct')
        if (!won && game.rows.length < 6) addNewRow()
      } else {
        shake.value++
      }
    },
    focusTo: (column: number) => {
      columnFocused.value = column
    },
    resetFocus,
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
  day: gameState.started,
  knownAbsent: gameState.knownAbsent,
  solutionLetters: gameState.solutionLetters,
  hardMode: gameState.hardMode,
  changeHardMode: (on: boolean) => (gameState.hardMode.value = on),
})
export const gameStatus = computed<{ state: 'playing' | 'won' | 'failed'; row: 1 | 2 | 3 | 4 | 5 | 6 }>(() => {
  const row = gameState.rows.value.length as 1 | 2 | 3 | 4 | 5 | 6
  const active = gameState.rows.value[gameState.rows.value.length - 1]
  if (active?.checkedColumns.length === 0) return { state: 'playing', row }
  if (active?.checkedColumns.every(s => s === 'correct')) {
    return { state: 'won', row }
  }
  return { state: 'failed', row }
})

watch(gameStatus, status => {
  if (status.state === 'failed') {
    saveGame()
    storePlayed()
  }
  if (status.state === 'won') {
    saveGame()
    storePlayed(status.row)
  }
})

document.addEventListener('keyup', event => {
  if(game.activeRow) {
    if (event.code === 'ArrowLeft' && game.activeRow.columnFocused > 0) {
      game.activeRow.focusTo(game.activeRow.columnFocused - 1)
    }
    if (event.code === 'ArrowRight' && game.activeRow.columnFocused < 4) {
      game.activeRow.focusTo(game.activeRow.columnFocused + 1)
    }
    if (event.code === 'Tab' && event.target instanceof HTMLButtonElement) game.activeRow.resetFocus()
    if (event.code === 'Enter' && !(event.target instanceof HTMLButtonElement)) {
      game.activeRow.checkAnswer()
    }
    if (event.code === 'Backspace' && !(event.target instanceof HTMLInputElement)) {
      game.activeRow.backspace()
    }
    if (/^(\w|æ|ø|å){1}$/i.test(event.key) && !(event.target instanceof HTMLInputElement)) {
      game.activeRow.setLetter(event.key)
    }
  }
})

function solutionLetter(letter: string, at: number[], initMaxGuess = 0, initFoundSet: number[] = []) {
  const maxGuess = ref(initMaxGuess)
  const found = ref(new Set(initFoundSet))
  const state = computed<LetterChecked[]>(() => {
    if (found.value.size === at.length) return ['correct']
    if (found.value.size > 0 && maxGuess.value > found.value.size) return ['correct', 'misplaced']
    if (found.value.size > 0) return ['correct']
    if (maxGuess.value > 0) return ['misplaced']
    return []
  })
  return readonly({
    letter,
    maxGuess,
    found,
    state,
    fountAt: (i: number) => found.value.add(i),
    guessedTimes: (times: number) => (maxGuess.value = Math.max(maxGuess.value, times)),
  })
}

function saveGame() {
  const toSave: GameState = {
    started: gameState.started.toString(),
    rows: gameState.rows.value.map(r => {
      return {
        columns: r.columns,
        checkedColumns: r.checkedColumns,
      }
    }),
    knownAbsent: [...gameState.knownAbsent.value],
    solutionLetters: gameState.solutionLetters.map(sl => ({
      letter: sl.letter,
      found: [...sl.found],
      maxGuess: sl.maxGuess,
    })),
    hardMode: gameState.hardMode.value,
  }
  localStorage.setItem('gameState', JSON.stringify(toSave))
}

function startGame() {
  const savedState = localStorage.getItem('gameState')
  if (savedState) {
    const saved = JSON.parse(savedState) as GameState
    const started = new Date(saved.started)
    const isToday = datesAreOnSameDay(started, today)
    if (isToday) {
      return {
        rows: ref(saved.rows.map((r, i) => rowState(i, r.columns as string[], r.checkedColumns as LetterChecked[]))),
        started: started,
        knownAbsent: ref(new Set(saved.knownAbsent)),
        solutionLetters: saved.solutionLetters.map(sl => solutionLetter(sl.letter, getLetterAt(sl.letter), sl.maxGuess, sl.found)),
        hardMode: ref(saved.hardMode),
      }
    }
  }
  const knownAbsent = ref(new Set<string>())
  const solutionLetters = [...new Set(solution)].map(l => solutionLetter(l, getLetterAt(l)))
  const hardMode = ref(Boolean(localStorage.getItem('hardMode') ?? false))
  return { rows: ref([rowState(0)]), started: today, solutionLetters, knownAbsent, hardMode }
}

function getLetterAt(letter: string) {
  return [...solution].reduce((acc, curr, i) => (curr === letter ? [...acc, i] : acc), [] as number[])
}

interface GameState {
  started: string
  rows: {
    columns: readonly string[]
    checkedColumns: readonly LetterChecked[]
  }[]
  knownAbsent: string[]
  solutionLetters: {
    letter: string
    maxGuess: number
    found: number[]
  }[]
  hardMode: boolean
}

type LetterChecked = 'not_calculated' | 'correct' | 'absent' | 'misplaced'
