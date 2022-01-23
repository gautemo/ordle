<script setup lang="ts">
defineProps<{
  msg: string,
  visible: boolean,
  placement: 'top' | 'right' | 'bottom' | 'left'
}>()
</script>

<template>
  <div class="container">
    <slot></slot>
    <span v-if="visible" class="popper" :class="placement">{{ msg }}</span>
  </div>
</template>

<style scoped>
.container{
  position: relative;
}

.popper{
  position: absolute;
  background-color: var(--white);
  color: var(--black);
  padding: 15px 20px;
  border-radius: 5px;
  margin: auto;
  width: fit-content;
  height: fit-content;
  white-space: pre;
  filter: drop-shadow(0px 2px 3px var(--black));
}
.popper::before {
  content: "";
  position: absolute;
  right: 100%;
}

.right{
  left: 100%;
  top: 0;
  bottom: 0;
  margin-left: 12px;
}


.right::before{
  right: 100%;
  top: 0;
  bottom: 0;
  height: 0;
  margin: auto 0;
  border-top: 7px solid transparent;
	border-bottom: 7px solid transparent;
	border-right: 10px solid var(--white);
  filter: drop-shadow(1px 0px var(--white));
}

.bottom{
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 12px;
}


.bottom::before{
  bottom: 100%;
  left: 0;
  right: 0;
  width: 0;
  margin: 0 auto;
  border-left: 7px solid transparent;
	border-right: 7px solid transparent;
	border-bottom: 10px solid var(--white);
  filter: drop-shadow(0 1px var(--white));
}

.top{
  left: 0;
  right: 0;
  bottom: 100%;
  margin-bottom: 12px;
}


.top::before{
  top: 100%;
  left: 0;
  right: 0;
  width: 0;
  margin: 0 auto;
  border-left: 7px solid transparent;
	border-right: 7px solid transparent;
	border-top: 10px solid var(--white);
  filter: drop-shadow(0 -1px var(--white));
}
</style>