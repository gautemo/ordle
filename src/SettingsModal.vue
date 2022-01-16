<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <section>
    <p>Nattmodus</p>
    <input type="checkbox" v-model="isDark" />
  </section>
</template>

<style scoped>

</style>