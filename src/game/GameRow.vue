<script setup lang="ts">
import { $computed } from 'vue/macros';
import GameLetter from './GameLetter.vue';
import { Dropdown as TooltipHolder } from 'floating-vue'
import { game } from './state';

const props = defineProps<{
  row: number,
}>()

const row = $computed(() => game.rows[props.row])
</script>

<template>
  <div class="row">
    <GameLetter
      v-for="i in 5"
      :key="i"
      :row="props.row"
      :column="i-1"
    />
    <div class="extra-info" v-if="row">
      <TooltipHolder v-if="row.answer.rowFull && !row.answer.valid" v-bind="{ placement: 'right', shown: true, autoHide: false }">
        <template #popper>
          <p class="popper">Ikke et ord</p>
        </template>
      </TooltipHolder>
    </div>
  </div>
</template>

<style scoped>
.row {
  position: relative;
}

.extra-info {
  position: absolute;
  left: 100%;
  top: 0;
  bottom: 0;
  margin: auto 10px;
  width: fit-content;
  height: fit-content;
}

.extra-info button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  display: grid;
  place-items: center;
  padding: 0;
}

.popper {
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 200px;
}
</style>