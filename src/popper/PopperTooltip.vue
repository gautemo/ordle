<script setup lang="ts">
import PopperBox from './PopperBox.vue';

defineProps<{
  msg: string,
  visible: boolean,
  placement: 'top' | 'right' | 'bottom' | 'left'
}>()
</script>

<template>
  <PopperBox :visible="visible" :msg="msg" :placement="placement">
    <slot></slot>
  </PopperBox>
</template>
