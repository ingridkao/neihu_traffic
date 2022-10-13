<template>
	<main id="homePage" ref="home_container" :class="{langEn: !langZh}" :style="scrollBind">
		<!-- <div style="position: fixed ;z-index: 1000; width:5rem;height:1rem; color: red;">{{currStep}}{{currStepProgress}}</div> -->
		<HeadCover v-if="currStep <= 2" :video-start="videoStart" @toggle="toggleVideoStatus" />
		<div ref="scrollama_container" id="main_scrollama">
			<HeaderAction data-step-no="0" :video-start="videoStart" />
			<Step1 data-step-no="1"/>
			<Step2 data-step-no="2"/>
			<Step3 data-step-no="3"/>
			<Step4 data-step-no="4"/>
			<Step5 data-step-no="5" />
			<Step6 data-step-no="6"/>
			<Step7 data-step-no="7"/>
			<StepMap data-step-no="8"/>
			<Step9 data-step-no="9" />
			<Step10 data-step-no="10"/>
			<Step11 data-step-no="11"/>
			<Step12 data-step-no="12"/>
			<Step13 data-step-no="13"/>
		</div>
		<AsideBox v-if="currStep > 0"/>
			<!-- <div data-step-no="8" style="height: 100vh;">8</div> -->
			<!-- <Step14 data-step-no="14"/> -->
	</main>
</template>

<script>
import "intersection-observer"
import scrollama from "scrollama"
import AOS from "aos"
import "aos/dist/aos.css"

import AsideBox from "@/components/header/Aside.vue"
import HeaderAction from "@/components/header/Action.vue"
import HeadCover from "@/components/header/Cover.vue"
import Step1 from "@/components/content/Step1.vue"
import Step2 from "@/components/content/Step2.vue"
import Step3 from "@/components/content/Step3.vue"
import Step4 from "@/components/content/Step4.vue"
import Step5 from "@/components/content/Step5.vue"
import Step6 from "@/components/content/Step6.vue"
import Step7 from "@/components/content/Step7.vue"
import Step9 from "@/components/content/Step9.vue"
import Step10 from "@/components/content/Step10.vue"
import Step11 from "@/components/content/Step11.vue"
import Step12 from "@/components/content/Step12.vue"
import Step13 from "@/components/content/Step13.vue"
// import Step14 from "@/components/content/Step14.vue"

import StepMap from '@/components/content/StepMap.vue'

export default {
	name: "HomePage",
  	created() {
    	AOS.init({})
    },
	mounted () {
		this.setupScroller()
		window.addEventListener("scroll", this.handleScroll)
	},
	beforeUnmount() {
		this._scroller.destroy()
	    window.removeEventListener('scroll', this.handleScroll)
	},
	data() {
		return {
			videoStart: false,
			// currStep: 0,
			// currStepProgress: 0,			
			scrollValue: 0
		}
	},
	components:{
		AsideBox, HeaderAction, HeadCover, 
		Step1, Step2, Step3, Step4, Step5, Step6, Step7, 
		StepMap, Step9, Step10, 
		Step11, Step12, Step13, 
		// Step14
	},
	computed: {
		langZh(){
            return this.$i18n.locale === 'zh-TW'
        },
		opts() {
			const step = Object.values(this.$refs.scrollama_container.childNodes).filter(item => {
				return item && item.hasAttribute('data-step-no')
			})
			return Object.assign({},  {
				step: step,
				progress: true
			}, this.$attrs)
		},
		scrollBind() {
			return {
				'--scroll': this.scrollValue
			}
		},
		currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		}
	},
	methods: {
        toggleVideoStatus(boolen){
            this.videoStart = boolen
        },
		handleScroll(){
			this.scrollValue = window.pageYOffset / (this.$refs.home_container.offsetHeight - window.innerHeight)
		},
		setupScroller() {
			this._scroller = scrollama()
			this._scroller.destroy()
			this._scroller
			.setup(this.opts)
			.onStepProgress(resp => {
				const {progress} = resp	
				this.$store.commit('updateProgres', (Math.floor(progress*10000)/100))
				// this.currStepProgress = (Math.floor(progress*10000)/100)
			})
			.onStepEnter(resp => {
				const {element} = resp
				this.$store.commit('updateStep', element.dataset.stepNo)
				// this.currStep = element.dataset.stepNo
			})
			// .onStepExit(resp => {
			// 	const {element} = resp
			// 	console.log(element.dataset.stepNo);
			// })
			window.addEventListener('resize', () => {
				this._scroller.resize()
			})
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/scss/home.scss';
</style>
