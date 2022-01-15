<script setup lang="ts">
import QuestionIcon from './components/QuestionIcon.vue';
import GraphIcon from './components/GraphIcon.vue';
import GearIcon from './components/GearIcon.vue';
import Game from './game/Game.vue';
import GameKeyboard from './game/GameKeyboard.vue';
</script>

<template>
  <header>
    <h1>
      <span>ORD</span>LE
    </h1>
    <section>
      <button>
        <QuestionIcon />
      </button>
      <button>
        <GraphIcon />
      </button>
      <button>
        <GearIcon />
      </button>
    </section>
  </header>

  <main>
    <Game />
  </main>
  <footer>
    <GameKeyboard />
  </footer>
</template>

<style scoped>
header {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  font-size: 1.3rem;
  box-sizing: border-box;
  background: #035e7b;
  color: var(--white);
  --fill-icons: var(--white);
}

header h1 {
  font-size: 2rem;
  margin: 0;
  font-family: "Arial Black", Gadget, sans-serif;
  padding: 5px 50px;
}

h1 > span{
  background: linear-gradient(to right, var(--correct) 10%, var(--misplaced) 50%, var(--absent) 90%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

button {
  cursor: pointer;
  background: none;
  border: none;
  margin: 0.5rem;
  padding: 0.2rem;
  font-size: 1.5rem;
}

footer {
  padding-bottom: 1rem;
}
</style>

<style>
@import "./globalStyle.css";
</style>