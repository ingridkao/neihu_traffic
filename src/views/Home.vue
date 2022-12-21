<template>
	<main 
		id="homePage" 
		ref="home_container" 
		:class="{langEn: !langZh}"
	>
		<HeadCover 
			v-if="currStep <= 2" 
		/>
		<div id="main_scrollama" ref="scrollama_container">
			<HeaderTitle data-step-no="0" />
			<div data-step-no="1" class="cardContainer">
				<Step1 />
			</div>
			<div data-step-no="2" class="rowBox" id="chapter1">
				<Step2/>
			</div>
			<div data-step-no="3" class="rowBox">
				<Step3/>
			</div>
			<div data-step-no="4" class="rowBox" id="chapter2">
				<Step4/>
			</div>
			<div data-step-no="5" class="carouselContainer">
				<Step5/>
			</div>
			<div data-step-no="6" class="carouselContainer" id="chapter3">
				<Step6/>
			</div>
			<div data-step-no="7" class="fullchartContainer">
				<Step7/>
			</div>
			<div data-step-no="8" class="rowBox mapContainer">
				<StepMap/>
			</div>
			<div data-step-no="9" class="contentPadding" id="chapter4">
				<Step9/>
			</div>
			<div data-step-no="10" class="fullContainer">
				<Step10/>
			</div>
			<div data-step-no="11" class="fullContainer">
				<Step11/>
			</div>
			<div data-step-no="12" class="fullContainer">
				<Step12/>
			</div>
			<div data-step-no="13" class="fullchartContainer epilogue" id="chapter5">
				<Step13/>
			</div>
		</div>
		<AsideBox v-if="currStep >= 1" :container-height="containerHeight"/>
	</main>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import "intersection-observer"
import scrollama from "scrollama"
import AOS from "aos"
import "aos/dist/aos.css"

import AsideBox from "@/components/header/Aside.vue"
import HeadCover from "@/components/header/Cover.vue"
import HeaderTitle from "@/components/header/Title.vue"
export default {
	name: "HomePage",
	components:{
		AsideBox, HeadCover, HeaderTitle,
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
				return typeof item === 'object' && item.hasAttribute('data-step-no')
			})
			this.opts = Object.assign({},  {
				step: step,
				progress: true
			}, this.$attrs)
		}

		this.setupScroller()
	},
	beforeUnmount() {
		this._scroller.destroy()
	},
	methods: {
		setupScroller() {
			this._scroller = scrollama()
			this._scroller.destroy()
			this._scroller
			.setup(this.opts)
			.onStepProgress(({element, progress}) => {
				this.$store.commit('updateStep', element.dataset.stepNo)
				this.$store.commit('updateProgres', (Math.floor(progress*10000)/100))
			})
			window.addEventListener('resize', this.handleResize)
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
