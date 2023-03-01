import { createApp } from 'vue'
import App from './App.vue'
import { useDark } from '@vueuse/core'
import { useAnimationActive } from './useAnimationActive'
import { useColorContrast } from './useColorContrast'

useDark()
useAnimationActive()
useColorContrast()

createApp(App).mount('#app')
