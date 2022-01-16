import { createApp } from 'vue'
import App from './App.vue'
import 'floating-vue/dist/style.css'
import { useDark } from '@vueuse/core'

useDark()

createApp(App).mount('#app')
