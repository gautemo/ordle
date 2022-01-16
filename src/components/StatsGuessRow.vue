<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  row: number,
  value: number,
  active: boolean,
}>()

const span = computed(() => props.value + 1)
</script>

<template>
  <div>{{row}}:</div>
  <div class="bar" :class="{active: active}">{{value}}</div>
</template>

<style scoped>
div{
  grid-row: v-bind(row);
}

.bar{
  background-color: var(--grey);
  color: var(--white);
  font-weight: bold;
  grid-column: span v-bind(span);
  text-align: end;
  padding: 2px 5px;
}

.active{
  background-color: var(--correct);
}
</style>