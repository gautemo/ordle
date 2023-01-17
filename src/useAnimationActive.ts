import { useStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

const isSafariv16_2 = navigator.userAgent.includes('Version/16.2 Safari')

export const animationOff = useStorage('reduce-animation', false)

export function useAnimationActive() {
  watchEffect(() => {
    document.documentElement.classList.toggle('reduce-animation', animationOff.value || isSafariv16_2)
  })
}
