import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'

import { createI18n } from 'vue-i18n'
import { en, zh } from './assets/js/lang.js'

import VueApexCharts from "vue3-apexcharts"

import Annotation from "@/components/content/Annotation.vue"



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

const store = createStore({
	state () {
		return {
			step: 0,
			progres: 0,
			mobildDevice: false
		}
	},
	mutations: {
		updateStep (state, payload) {
			state.step = payload
		},
		updateProgres (state, payload) {
			state.progres = payload
		},
		updateMobildDevice (state, payload) {
			state.mobildDevice = payload
		}
	}
})

const app  = createApp(App)
app.use(i18n)
app.use(VueApexCharts)
app.use(store)
app.component('Annotation', Annotation)
app.mount('#app')
