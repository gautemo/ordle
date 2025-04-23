<script setup lang="ts">
import { game } from './state'
import BackspaceIcon from '../components/BackspaceIcon.vue'
import GameKeyboardKey from './GameKeyboardKey.vue'
</script>

<template>
  <div class="keyboard">
    <GameKeyboardKey letter="q" />
    <GameKeyboardKey letter="w" />
    <GameKeyboardKey letter="e" />
    <GameKeyboardKey letter="r" />
    <GameKeyboardKey letter="t" />
    <GameKeyboardKey letter="y" />
    <GameKeyboardKey letter="u" />
    <GameKeyboardKey letter="i" />
    <GameKeyboardKey letter="o" />
    <GameKeyboardKey letter="p" />
    <GameKeyboardKey letter="å" />
    <GameKeyboardKey letter="a" />
    <GameKeyboardKey letter="s" />
    <GameKeyboardKey letter="d" />
    <GameKeyboardKey letter="f" />
    <GameKeyboardKey letter="g" />
    <GameKeyboardKey letter="h" />
    <GameKeyboardKey letter="j" />
    <GameKeyboardKey letter="k" />
    <GameKeyboardKey letter="l" />
    <GameKeyboardKey letter="ø" />
    <GameKeyboardKey letter="æ" />
    <button @click="game.activeRow?.checkAnswer()" class="c2">ENTER</button>
    <GameKeyboardKey letter="z" />
    <GameKeyboardKey letter="x" />
    <GameKeyboardKey letter="c" />
    <GameKeyboardKey letter="v" />
    <GameKeyboardKey letter="b" />
    <GameKeyboardKey letter="n" />
    <GameKeyboardKey letter="m" />
    <button @click="game.activeRow?.backspace()" class="c2" aria-label="backspace">
      <BackspaceIcon />
    </button>
  </div>
</template>

<style scoped>
.keyboard {
  width: clamp(400px, 75vw, 1000px);
  height: clamp(150px, 20vh, 250px);
  display: grid;
  gap: 1px;
  grid-template: repeat(3, 1fr) / repeat(11, 1fr);
  background: var(--bg-alt1);
  touch-action: manipulation;
}

.c2 {
  grid-column: span 2;
}

button {
  flex: 1;
  font-size: var(--size-l);
  height: 100%;
  background: none;
  border: none;
  border-radius: 5px;
}

@media only screen and (max-width: 600px) {
  .keyboard {
    width: 100%;
  }

  button {
    font-size: var(--size-n);
    padding: 1px 2px;
  }
}
</style>
