import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: ['index.html', 'import.html'],
    },
    cssMinify: 'lightningcss',
  },
  css: {
    transformer: 'lightningcss',
  },
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
})
