import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import ViteSvgLoader from 'vite-svg-loader'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import './src/assets/scss/_main.scss';
  //       `
  //     }
  //   }
  // },
  plugins: [
    ViteSvgLoader(),
    vue(),
    VueI18nPlugin({
      include: fileURLToPath(new URL('./src/generated/locales/*.json', import.meta.url)),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'node:path': 'path-browserify',
    },
  },
})
