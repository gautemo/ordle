import { createApp } from 'vue'
import App from './App.vue'
import { useDark } from '@vueuse/core'

useDark()

createApp(App).mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js')
  })
}