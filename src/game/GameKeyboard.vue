<script setup lang="ts">
import { game } from './state';
import BackspaceIcon from '../components/BackspaceIcon.vue';
import GameKeyboardKey from './GameKeyboardKey.vue';
</script>

<template>
  <div class="keyboard">
    <GameKeyboardKey letter="Q" />
    <GameKeyboardKey letter="W" />
    <GameKeyboardKey letter="E" />
    <GameKeyboardKey letter="R" />
    <GameKeyboardKey letter="T" />
    <GameKeyboardKey letter="Y" />
    <GameKeyboardKey letter="U" />
    <GameKeyboardKey letter="I" />
    <GameKeyboardKey letter="O" />
    <GameKeyboardKey letter="P" />
    <GameKeyboardKey letter="Å" />
    <GameKeyboardKey letter="A" />
    <GameKeyboardKey letter="S" />
    <GameKeyboardKey letter="D" />
    <GameKeyboardKey letter="F" />
    <GameKeyboardKey letter="G" />
    <GameKeyboardKey letter="H" />
    <GameKeyboardKey letter="J" />
    <GameKeyboardKey letter="K" />
    <GameKeyboardKey letter="L" />
    <GameKeyboardKey letter="Ø" />
    <GameKeyboardKey letter="Æ" />
    <button @click="game.activeRow.checkAnswer()" class="c2">ENTER</button>
    <GameKeyboardKey letter="Z" />
    <GameKeyboardKey letter="X" />
    <GameKeyboardKey letter="C" />
    <GameKeyboardKey letter="V" />
    <GameKeyboardKey letter="B" />
    <GameKeyboardKey letter="N" />
    <GameKeyboardKey letter="M" />
    <button @click="game.activeRow.backspace()" class="c2">
      <BackspaceIcon />
    </button>
  </div>
</template>

<style scoped>
.keyboard {
  width: clamp(400px, 75vw, 1000px);
  height: 200px;
  display: grid;
  gap: 1px;
  grid-template: repeat(3, 1fr) / repeat(11, 1fr);
  background: var(--bg-alt1);
}

.c2 {
  grid-column: span 2;
}

button {
  cursor: pointer;
  flex: 1;
  font-size: 1.5rem;
  height: 100%;
  background: none;
  border: none;
  border-radius: 5px;
}

@media only screen and (max-width: 600px) {
  .keyboard {
    width: clamp(300px, 95vw, 600px);
    height: 150px;
  }

  button {
    font-size: 1em;
  }
}
</style>