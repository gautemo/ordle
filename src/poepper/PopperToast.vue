<script setup lang="ts">
import { computed } from 'vue';
import { showToast } from './toaster';

const props = defineProps<{
  msg: string,
  visible?: boolean,
  toastKey?: string,
}>()

const show = computed(() => {
  if(props.visible) return true
  if(props.toastKey) return showToast()
})
</script>

<template>
  <slot>
    <span>{{msg}}</span>
  </slot>
</template>

<style scoped>

</style>