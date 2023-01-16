import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/scss/main.scss'
import { createI18n } from 'vue-i18n'
import de from './generated/locales/de.json'
import en from './generated/locales/en.json'

const app = createApp(App)

const i18n = createI18n({
  legacy: false,
  globalInjection: false,
  locale: 'de',
  messages: { de, en },
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
