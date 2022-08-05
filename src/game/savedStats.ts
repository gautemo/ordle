import { readonly, ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const played = useStorage('played', {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  fails: 0,
})
export const streak = storedStreak()

function storedStreak() {
  const currentKey = 'streak'
  const bestKey = 'best-streak'
  const current = ref(Number(localStorage.getItem(currentKey)))
  const best = ref(Number(localStorage.getItem(bestKey)))
  const save = () => {
    localStorage.setItem(currentKey, current.value.toString())
    localStorage.setItem(bestKey, best.value.toString())
  }
  return readonly({
    current,
    best,
    bump() {
      current.value++
      if (current.value > best.value) best.value++
      save()
    },
    reset() {
      current.value = 0
      save()
    },
  })
}

export function storePlayed(wonRow?: 1 | 2 | 3 | 4 | 5 | 6) {
  if (wonRow) {
    played.value[wonRow]++
    streak.bump()
  } else {
    played.value.fails++
    streak.reset()
  }
}
