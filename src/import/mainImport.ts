import { useDark } from "@vueuse/core"
import { createApp } from "vue"
import ImportVue from "./Import.vue"

useDark()

createApp(ImportVue).mount('#app')