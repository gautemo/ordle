<script setup lang="ts">
import { $computed, $ref } from 'vue/macros';
import GameLetter from './GameLetter.vue';
import { game } from './state';
import PopperTooltip from '../popper/PopperTooltip.vue';
import PopperToast from '../popper/PopperToast.vue';
import { watch } from 'vue';

const props = defineProps<{
  row: number,
}>()

const row = $computed(() => game.rows[props.row])
const tooltipPlace = $computed(() => {
  if (window.innerWidth <= 650) {
    if (props.row <= 4) return 'top'
    return 'bottom'
  }
  return 'right'
})

let shake = $ref(false)
watch(() => row?.shake, value => {
  if (value > 0) {
    shake = true
    setTimeout(() => shake = false, 500)
  }
})
</script>

<template>
  <PopperToast :toast-key="`row${props.row}`" :placement="tooltipPlace">
    <PopperTooltip
      msg="Ikke et ord"
      :visible="Boolean(row?.answer.rowFull) && !row?.answer.valid"
      :placement="tooltipPlace"
    >
      <div class="row" :class="{ shake: shake }">
        <GameLetter v-for="i in 5" :key="i" :row="props.row" :column="i - 1" />
      </div>
    </PopperTooltip>
  </PopperToast>
</template>

<style scoped>
.row {
  position: relative;
  display: flex;
}

.shake {
  animation: shake 0.1s linear 5 alternate;
}

@keyframes shake {
  from {
    transform: translateX(3px);
  }

  to {
    transform: translateX(-3px);
  }
}

@media (prefers-reduced-motion) {
  .shake {
    animation-name: dissolve;
  }
}
</style>