<script setup lang="ts">
import { keyToType } from './state';

</script>

<template>
  <div class="row">
    <button @click.prevent="keyToType = 'Q'">Q</button>
    <button>W</button>
    <button>E</button>
    <button>R</button>
    <button>T</button>
    <button>Y</button>
    <button>U</button>
    <button>I</button>
    <button>O</button>
    <button>P</button>
    <button>Å</button>
  </div>
  <div class="row">
    <button>A</button>
    <button>S</button>
    <button>D</button>
    <button>F</button>
    <button>G</button>
    <button>H</button>
    <button>J</button>
    <button>K</button>
    <button>L</button>
    <button>Ø</button>
    <button>Æ</button>
  </div>
  <div class="row">
    <button>Z</button>
    <button>X</button>
    <button>C</button>
    <button>V</button>
    <button>B</button>
    <button>N</button>
    <button>M</button>
  </div>
</template>

<style scoped>
</style>