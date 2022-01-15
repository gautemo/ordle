import { computed, readonly, ref } from 'vue';
import { wordList, solution } from './words';

function rowState() {
  const columns = ref(['', '', '', '', ''])
  const checkedColumns = ref<Array<'' | 'correct' | 'absent' | 'used'>>([])
  const columnFocused = ref(0)
  const answer = computed(() => {
    const value = columns.value.join('').toUpperCase()
    return {
      value,
      rowFull: value.length === 5,
      valid: wordList.find(({ word }) => word === value)
    }
  })
  return readonly({
    columns,
    columnFocused,
    checkedColumns,
    answer,
    backspace: () => {
      const index = columnFocused.value
      if(columns.value[index]){
        columns.value[index] = ''
      }else{
        if(index > 0){
          columns.value[index - 1] = ''
          columnFocused.value = index - 1
        }
      }
    },
    setLetter: (value: string) => {
      if(value.length > 1) value = value[value.length-1]
      const index = columnFocused.value
      columns.value[index] = value
      if(!columns.value[0]) columnFocused.value = 0
      else if(!columns.value[1]) columnFocused.value = 1
      else if(!columns.value[2]) columnFocused.value = 2
      else if(!columns.value[3]) columnFocused.value = 3
      else if(!columns.value[4]) columnFocused.value = 4
    },
    checkAnswer: () => {
      if (answer.value.valid) {
        if (answer.value.value === solution) {
          console.log('yayy')
        } else {
          console.log(`not ${solution}`)
        }
        checkedColumns.value = Array.from({length: 5}, (_, i) => {
          const letter = columns.value[i].toUpperCase()
          if (solution[i] === letter) {
            return 'correct'
          } else if (solution.includes(letter)) {
            return 'used'
          }
          return 'absent'
        })
        addNewRow()
      }
    },
    focusTo: (column: number) => columnFocused.value = column,
  })
}

const rows = ref([rowState()])
const addNewRow = () => rows.value.push(rowState())

export const game = readonly({
  rows,
  active: computed(() => rows.value.length - 1),
  activeRow: computed(() => rows.value[rows.value.length - 1]),
})

document.addEventListener('keyup', event => {
  if (event.code === 'Enter') {
    game.activeRow.checkAnswer()
  }
})