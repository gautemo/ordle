import { useStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

export const colorContrastOn = useStorage('color-contrast', false)

export function useColorContrast() {
  watchEffect(() => {
    document.documentElement.classList.toggle('color-contrast', colorContrastOn.value)
  })
}
