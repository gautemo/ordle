<script setup lang="ts">
import { ENTER_ACTIVE } from '@/constants';
import { computed, ref, watchEffect } from 'vue';
import GameLetter from './GameLetter.vue';
import { state } from './types';
import { answer, wordList } from './words';
import InfoIcon from '@/components/InfoIcon.vue';
import { Dropdown as TooltipHolder } from 'floating-vue'
import { isFocused } from './state';

const emit = defineEmits<{
  (e: 'next'): void
}>()
const props = defineProps<{
  active: boolean
}>()

const letters = ref(['', '', '', '', ''])
const lettersChecked = ref<state[]>(['', '', '', '', ''])

watchEffect(() => {
  if (props.active) {
    if (!letters.value[0]) isFocused.value = 0
    else if (!letters.value[1]) isFocused.value = 1
    else if (!letters.value[2]) isFocused.value = 2
    else if (!letters.value[3]) isFocused.value = 3
    else if (!letters.value[4]) isFocused.value = 4
    else isFocused.value = ENTER_ACTIVE
  }
})

function checkAnswer() {
  if (validWord.value) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const checking = guess.value!
    if (checking === answer) {
      console.log('yayy')
    } else {
      console.log(`not ${answer}`)
    }
    for (let i = 0; i < 5; i++) {
      if (answer[i] === checking[i]) {
        lettersChecked.value[i] = 'correct'
      } else if (answer.includes(checking[i])) {
        lettersChecked.value[i] = 'used'
      } else {
        lettersChecked.value[i] = 'absent'
      }
    }
    emit('next')
  }
}

const guess = computed(() => {
  const value = letters.value.join('').toUpperCase()
  if (value.length === 5) return value
})

const validWord = computed(() => {
  return guess.value && wordList.find(({ word }) => word === guess.value)
})

function backspace(index: number){
  if(index > 0) letters.value[index - 1] = ''
}
</script>

<template>
  <div @keyup.enter="checkAnswer" class="row">
    <GameLetter
      v-for="i in 5"
      :key="i"
      :index="i-1"
      v-model:letter="letters[i-1]"
      :active="active"
      :checked="lettersChecked[i-1]"
      @backspace="backspace(i - 1)"
    />
    <div class="extra-info">
      <TooltipHolder v-if="validWord" placement="right">
        <button>
          <InfoIcon />
        </button>
        <template #popper>
          <p class="popper">{{ validWord.explanation }}</p>
        </template>
      </TooltipHolder>
      <TooltipHolder v-if="guess && !validWord" v-bind="{ placement: 'right', shown: true }">
        <template #popper>
          <p class="popper">Ikke et ord</p>
        </template>
      </TooltipHolder>
    </div>
  </div>
</template>

<style scoped>
.row {
  position: relative;
}

.extra-info {
  position: absolute;
  left: 100%;
  top: 0;
  bottom: 0;
  margin: auto 10px;
  width: fit-content;
  height: fit-content;
}

.extra-info button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  display: grid;
  place-items: center;
  padding: 0;
}

.popper {
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 200px;
}
</style>