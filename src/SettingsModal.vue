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
  font-size: var(--size-l);
  padding-bottom: 5px;
  border-bottom: 1px solid var(--grey);
}

input{
  position: relative;
  appearance: none;
  width: var(--size-xl);
  height: var(--size-xl);
  border: 0.15rem solid currentColor;
  border-radius: 0.2rem;
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