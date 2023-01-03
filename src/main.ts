import { createApp } from 'vue'
import App from './App.vue'
import { useDark } from '@vueuse/core'
import { useAnimationActive } from './useAnimationActive'

useDark()
useAnimationActive()

createApp(App).mount('#app')
