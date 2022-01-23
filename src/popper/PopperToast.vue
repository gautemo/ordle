<script setup lang="ts">
import { showToast } from './toaster';
import PopperBox from './PopperBox.vue';

const props = defineProps<{
  toastKey?: string,
  placement: 'top' | 'right' | 'bottom' | 'left'
}>()

const msg = showToast(props.toastKey ?? '')
</script>

<template>
  <PopperBox :visible="!!msg" :msg="msg ?? ''" :placement="placement">
    <slot></slot>
  </PopperBox>
</template>