import { createApp } from 'vue'
import App from './App.vue'

import { createI18n } from 'vue-i18n'
import { en, zh } from './assets/js/lang.js'

const Locale = localStorage.getItem("locale")
const i18n = createI18n({
    // legacy: false,
    locale: Locale ? Locale: "zh-TW",
    // fallbackLocale: "zh-TW",
    messages: {
      "zh-TW": zh,
      "en-US": en
    }
})

const app  = createApp(App)
app.use(i18n)
app.mount('#app')
