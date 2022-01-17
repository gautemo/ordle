<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <section>
    <label>
      <input type="checkbox" v-model="isDark" />
      <span>Nattmodus</span>
    </label>
  </section>
</template>

<style scoped>
label{
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: 1.5rem;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--grey);
}

input{
  cursor: pointer;
  position: relative;
  appearance: none;
  width: 2em;
  height: 2em;
  border: 0.15em solid currentColor;
  border-radius: 0.2em;
}
input::before{
  content: "";
  position: absolute;
  inset: 2px;
  background-color: var(--correct);
  transform: scale(0);
  transition: 250ms transform ease-in-out;
}
input:checked::before{
  transform: scale(1);
}
</style>