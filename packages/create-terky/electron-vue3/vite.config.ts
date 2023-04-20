import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command == 'serve' ? '/' : './',
    plugins: [vue()],
  }
})