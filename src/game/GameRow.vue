<script setup lang="ts">
import { $computed } from 'vue/macros';
import GameLetter from './GameLetter.vue';
import { Dropdown as TooltipHolder } from 'floating-vue'
import { game } from './state';

const props = defineProps<{
  row: number,
}>()

const row = $computed(() => game.rows[props.row])
const tooltipPlace = $computed(() => {
  if(screen.width <= 650){
    if(props.row <= 4) return 'top'
    return 'bottom'
  }
  return 'right'
})
</script>

<template>
  <div class="row">
    <GameLetter
      v-for="i in 5"
      :key="i"
      :row="props.row"
      :column="i-1"
    />
    <div v-if="row" class="extra-info" :class="tooltipPlace">
      <TooltipHolder v-if="row.answer.rowFull && !row.answer.valid" v-bind="{ placement: tooltipPlace, shown: true, autoHide: false }">
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
  display: flex;
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

.extra-info.top{
  left: 0;
  right: 0;
  top: -5px;
  margin: auto;
  bottom: auto;
}
.extra-info.bottom{
  left: 0;
  right: 0;
  bottom: -5px;
  margin: auto;
  top: auto;
}

.popper {
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 200px;
}
</style>