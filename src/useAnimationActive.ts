import { useStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

export const animationOff = useStorage('reduce-animation', false)

export function useAnimationActive() {
  watchEffect(() => {
    document.documentElement.classList.toggle('reduce-animation', animationOff.value)
  })
}
