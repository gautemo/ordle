import { computed, ref } from 'vue'

const currentlyToasts = ref<{ key: string; msg: string }[]>([])

function toast(key: string, msg: string) {
  currentlyToasts.value.push({ key, msg })
  setTimeout(
    () =>
      currentlyToasts.value.splice(
        currentlyToasts.value.findIndex(t => t.key === key),
        1
      ),
    2500
  )
}

function showToast(key: string) {
  return computed(() => currentlyToasts.value.find(t => t.key === key)?.msg)
}

export { toast, showToast }
