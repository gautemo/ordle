import { createApp } from 'vue'
import App from './App.vue'
import { useDark } from '@vueuse/core'

useDark()

createApp(App).mount('#app')
