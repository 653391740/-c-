import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import postcssPxToViewport from 'postcss-px-to-viewport'


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPxToViewport({
          unitToConvert: 'px',
          viewportWidth: 375,
          propList: ['*'],
        })
      ]
    }
  },
  server: {
    host: '0.0.0.0', // 允许外部访问
    open: true,
    watch: {
      usePolling: true,
      interval: 100
    }
  }
})
