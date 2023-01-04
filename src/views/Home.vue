<template>
	<main 
		id="homePage" 
		ref="home_container" 
		:class="{langEn: !langZh}"
	>
		<article id="main_scrollama" ref="scrollama_container">
			<div data-step="1" class="step rowBox" id="chapter1">
				<Step2/>
			</div>
			<div data-step="2" class="step rowBox">
				<Step3/>
			</div>
			<div data-step="3" class="step rowBox" id="chapter2">
				<Step4/>
			</div>
			<div data-step="4" class="step carouselContainer">
				<Step5/>
			</div>
			<div data-step="5" class="step carouselContainer" id="chapter3">
				<Step6/>
			</div>
			<div data-step="6" class="step fullchartContainer">
				<Step7/>
			</div>
			<div data-step="7" class="step rowBox mapContainer">
				<StepMap/>
			</div>
			<div data-step="8" class="step" id="chapter4">
				<Step9/>
			</div>
			<div data-step="9" class="step fullContainer">
				<Step10/>
			</div>
			<div data-step="10" class="step fullContainer">
				<Step11/>
			</div>
			<div data-step="11" class="step fullContainer">
				<Step12/>
			</div>
			<div data-step="12" class="step fullchartContainer" id="chapter5">
				<Step13/>
			</div>
		</article>
		<AsideBox v-if="currStep >= 1" :container-height="containerHeight"/>
	</main>
</template>

<script>
import { defineAsyncComponent } from 'vue'
// scrollama
import "intersection-observer"
import scrollama from "scrollama"

import AOS from "aos"
import "aos/dist/aos.css"

import AsideBox from "@/components/header/Aside.vue"
export default {
	name: "HomePage",
	components:{
		AsideBox,
		StepMap: defineAsyncComponent(() => import('@/components/content/StepMap.vue')),
		Step1: defineAsyncComponent(() => import('@/components/content/Step1.vue')),
		Step2: defineAsyncComponent(() => import('@/components/content/Step2.vue')),
		Step3: defineAsyncComponent(() => import('@/components/content/Step3.vue')),
		Step4: defineAsyncComponent(() => import('@/components/content/Step4.vue')),
		Step5: defineAsyncComponent(() => import('@/components/content/Step5.vue')),
		Step6: defineAsyncComponent(() => import('@/components/content/Step6.vue')),
		Step7: defineAsyncComponent(() => import('@/components/content/Step7.vue')),
		Step9: defineAsyncComponent(() => import('@/components/content/Step9.vue')),
		Step10: defineAsyncComponent(() => import('@/components/content/Step10.vue')),
		Step11: defineAsyncComponent(() => import('@/components/content/Step11.vue')),
		Step12: defineAsyncComponent(() => import('@/components/content/Step12.vue')),
		Step13: defineAsyncComponent(() => import('@/components/content/Step13.vue'))
	},
	data() {
		return {
			opts: {}
		}
	},
	computed: {
		langZh(){
            return this.$i18n.locale === 'zh-TW'
        },
		currStep() {
			return this.$store.state.step
		},
		containerHeight(){
			return this.$refs.home_container? this.$refs.home_container.offsetHeight: 0
		}
	},
  	created() {
    	AOS.init({})
    },
	mounted() {
		const childNodes = this.$refs.scrollama_container.childNodes
		if(typeof childNodes === 'object'){
			const step = Object.values(childNodes).filter(item => {
				return typeof item === 'object' && item.hasAttribute('data-step')
			})
			this.opts = Object.assign({},  {
				step: '.step',
				progress: true
			}, this.$attrs)
		}
		this.$store.commit('updateStep', 0)
		this.setupScroller()
		window.addEventListener('resize', this.handleResize)
	},
	beforeUnmount() {
		this._scroller.destroy()
		window.removeEventListener('resize', this.handleResize)
	},
	methods: {
		setupScroller() {
			this._scroller = scrollama()
			this._scroller
			.setup(this.opts)
			.onStepEnter(({element, direction}) => {
				if(element.dataset.step == 1 && direction == 'down'){
					this.$store.commit('updateStep', 1)
				}
			})
			.onStepExit(({element, direction}) => {
				if(element.dataset.step == 1 && direction == 'up'){
					this.$store.commit('updateStep', 0)
				}
			})
			.onStepProgress(({element, progress}) => {
				console.log(progress);
				this.$store.commit('updateStep', element.dataset.step)
				this.$store.commit('updateProgres', progress)
			})
		},
		handleResize () {
			this._scroller.resize()
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/scss/home.scss';
</style>
