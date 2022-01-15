<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { isFocused, keyToType } from './state';
import { state } from './types';

const props = defineProps<{
  index: number,
  letter: string,
  checked: state,
  active: boolean,
}>()
const emit = defineEmits<{
  (e: 'update:letter', value: string): void
  (e: 'backspace'): void
}>()

function onKey(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement
  if (event.code === 'Backspace' && !props.letter) {
    emit('backspace')
  }
  if (target.value.length > 1) {
    target.value = target.value[target.value.length - 1]
  }
  emit('update:letter', target.value)
}

const el = ref<HTMLInputElement>()
watchEffect(() => {
  if (props.active && isFocused.value === props.index && el.value) {
    el.value.disabled = false
    el.value.focus()
  }
})

watchEffect(() => {
  if(isFocused.value === props.index && keyToType.value){
    emit('update:letter', keyToType.value)
    keyToType.value = ''
  }
})
</script>

<template>
  <input
    type="text"
    @keyup="onKey"
    :value="props.letter"
    ref="el"
    :class="props.checked"
    :disabled="!props.active"
    @focus="isFocused = props.index"
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