import { useDark } from '@vueuse/core'
import { createApp } from 'vue'
import ImportData from './ImportData.vue'

useDark()

createApp(ImportData).mount('#app')
