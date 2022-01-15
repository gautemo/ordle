<script setup lang="ts">
import QuestionIcon from './components/QuestionIcon.vue';
import GraphIcon from './components/GraphIcon.vue';
import GearIcon from './components/GearIcon.vue';
import Game from './game/Game.vue';
import GameKeyboard from './game/GameKeyboard.vue';
</script>

<template>
  <header>
    <button><QuestionIcon/></button>
    <h1><span>ORD</span>LE</h1>
    <button><GraphIcon/></button>
    <button><GearIcon/></button>
  </header>

  <main><Game/></main>
  <footer>
    <GameKeyboard/>
  </footer>
</template>

<style scoped>
header{
  display: flex;
  align-items: center;
  width: 500px;
  border-bottom: 1px solid var(--grey);
  padding-top: 1rem;
  gap: 1rem;
  font-size: 1.3rem;
}

header h1{
  font-size: 2rem;
  flex: 1;
  text-align: center;
  margin: 0;
  font-weight: bold;
}

h1 > span{
  color: blue;
}

button{
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
}

footer{
  padding-bottom: 1rem;
}
</style>

<style>
@import './globalStyle.css';
</style>