import { computed, ref } from 'vue';

const currentlyToasts = ref<string[]>([])

function toast(key: string){
  currentlyToasts.value.push(key)
  setTimeout(() => currentlyToasts.value.splice(currentlyToasts.value.findIndex(k => k === key), 1))
}

function showToast(key: string){
  return computed(() => currentlyToasts.value.includes(key))
}

export { toast, showToast }

