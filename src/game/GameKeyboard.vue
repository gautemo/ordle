<script setup lang="ts">
import { game } from './state';
import BackspaceIcon from '@/components/BackspaceIcon.vue';
</script>

<template>
  <div class="row">
    <button @click="game.activeRow.setLetter('Q')">Q</button>
    <button @click="game.activeRow.setLetter('W')">W</button>
    <button @click="game.activeRow.setLetter('E')">E</button>
    <button @click="game.activeRow.setLetter('R')">R</button>
    <button @click="game.activeRow.setLetter('T')">T</button>
    <button @click="game.activeRow.setLetter('Y')">Y</button>
    <button @click="game.activeRow.setLetter('U')">U</button>
    <button @click="game.activeRow.setLetter('I')">I</button>
    <button @click="game.activeRow.setLetter('O')">O</button>
    <button @click="game.activeRow.setLetter('P')">P</button>
    <button @click="game.activeRow.setLetter('Å')">Å</button>
  </div>
  <div class="row">
    <button @click="game.activeRow.setLetter('A')">A</button>
    <button @click="game.activeRow.setLetter('S')">S</button>
    <button @click="game.activeRow.setLetter('D')">D</button>
    <button @click="game.activeRow.setLetter('F')">F</button>
    <button @click="game.activeRow.setLetter('G')">G</button>
    <button @click="game.activeRow.setLetter('H')">H</button>
    <button @click="game.activeRow.setLetter('J')">J</button>
    <button @click="game.activeRow.setLetter('K')">K</button>
    <button @click="game.activeRow.setLetter('L')">L</button>
    <button @click="game.activeRow.setLetter('Ø')">Ø</button>
    <button @click="game.activeRow.setLetter('Æ')">Æ</button>
  </div>
  <div class="row">
    <button @click="game.activeRow.checkAnswer()">ENTER</button>
    <button @click="game.activeRow.setLetter('Z')">Z</button>
    <button @click="game.activeRow.setLetter('X')">X</button>
    <button @click="game.activeRow.setLetter('C')">C</button>
    <button @click="game.activeRow.setLetter('V')">V</button>
    <button @click="game.activeRow.setLetter('B')">B</button>
    <button @click="game.activeRow.setLetter('N')">N</button>
    <button @click="game.activeRow.setLetter('M')">M</button>
    <button @click="game.activeRow.backspace()"><BackspaceIcon/></button>
  </div>
</template>

<style scoped>
button{
  font-size: 1.5rem;
  margin: 3px;
  padding: 5px 10px;
}
</style>