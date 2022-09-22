<template>
	<main id="homePage" ref="home_container" :class="{langEn: !langZh}" :style="scrollBind">
		<!-- <svg width="100" height="100" viewBox="0 0 24 24" class="svg_scroll svgImg">
			<path d="M21,9H15V22H13V16H11V22H9V9H3V7H21M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6C10.89,6 10,5.1 10,4C10,2.89 10.89,2 12,2Z" />
		</svg> -->
		<div style="position: fixed ;z-index: 1000; width:5rem;height:1rem">
			{{currStep}}
			{{currStepProgress}}
		</div>
		<HeadCover v-if="currStep <= 2" :step="currStep" :video-start="videoStart" @toggle="toggleVideoStatus" />
		<div ref="scrollama_container" id="main_scrollama">
			<HeaderAction data-step-no="0" :video-start="videoStart" />
			<Step1 data-step-no="1"/>
			<Step2 data-step-no="2" :curr-step="currStep" :curr-step-progress="currStepProgress"/>
			<Step3 data-step-no="3" :curr-step="currStep" :curr-step-progress="currStepProgress"/>
			<Step4 data-step-no="4" :curr-step="currStep" :curr-step-progress="currStepProgress"/>
			<Step5 data-step-no="5" />
			<Step6 data-step-no="6" :curr-step="currStep" :curr-step-progress="currStepProgress"/>

			<div 
				data-step-no="7" 
				class="contextbox"
			>
				<header 
					class="contextbox columnBox"
					data-aos="fade-up"
					data-aos-duration="3000"
					data-aos-offset="500"
				>
					<h6>住哪區的通勤族，最少使用大眾運輸？</h6>
					<p>為了理解哪一通勤地區，可以優先檢討其大眾運輸往返大內科的狀況，我們將大眾運輸通勤者的上車地點做分類。數據顯示，住在內湖當地的 58,742位工作人口，僅兩成使用大眾運輸， 有八成通勤者選擇使用私人運具（汽車、機車、或步行）。另外，住在汐止、士林、北投的工作者，也偏好以私人運具上下班。至於有沒有辦法讓住最近的內湖工作者，改變通勤方式，還有賴相關單位進一步討論。</p>
				</header>
				<ColumnBasic :load="columnBasicLoad"/>
			</div>

			<div 
				data-step-no="9"
			>
				<div class="contextbox">
					<DonutBasic :load="donutBasicLoad"/>
				</div>
			</div>

			<div 
				data-step-no="10"
			>
				<div class="contextbox">
					<h6>{{$t('scrollama5.title')}}</h6>
					<p>{{$t('scrollama5.p1')}}</p>
					<p>{{$t('scrollama5.p2')}}</p>
					<div class="imageBox">
						<img :src="stationImg" :alt="$t('scrollama5.imgBox')">
					</div>
					<div class="mapLegendBox">
						<div class="blue"><span>{{$t('scrollama5.heatZone')}}</span></div>
						<div class="taxiStationLegend"><span>{{$t('scrollama5.taxiStation')}}</span></div>
					</div>
				</div>
			</div>

			<div data-step-no="11">
			
				<div class="contextbox">
					<h6>{{$t('scrollama6.title')}}</h6>
					<p>{{$t('scrollama6.p1')}}</p>
					<p>{{$t('scrollama6.p2')}}</p>
					<div class="mapLegendBox">
						<div class="blue">
							<span>{{$t('scrollama5.heatZone')}}</span>
							<button class="toggleLayerBtn" @click="hailLayer = !hailLayer">
								{{hailLayer?'open': 'close'}}
							</button>
						</div>
						<div class="red">
							<span>{{$t('scrollama5.nonStand')}}</span>
							<button class="toggleLayerBtn" @click="hailNonstationLayer = !hailNonstationLayer">
								{{hailNonstationLayer?'open': 'close'}}
							</button>
						</div>
						<div class="taxiStationLegend">{{$t('scrollama5.taxiStation')}}</div>
					</div>
					<div class="annotation">
						<p>{{$t('scrollama6.annotation1')}}</p>
						<p>{{$t('scrollama6.annotation2')}}</p>
					</div>
				</div>
			
			</div>

			<div data-step-no="12">
			
				<div class="contextbox">
					<h6>{{$t('scrollama7.title')}}</h6>
					<p v-html="$t('scrollama7.p1')"/>
					<p>{{$t('scrollama7.p2')}}</p>
					<div class="mapLegendBox">
						<div class="hotspot100Legend">{{$t('scrollama7.hotspot100Legend')}}</div>
						<div class="taxiStationLegend">{{$t('scrollama5.taxiStation')}}</div>
					</div>
					<TopSpotBarChart @center="mapSetCenter"/>
				</div>
			
			</div>

			<div data-step-no="13">
			
				<div class="contextbox">
					<h6>{{$t('scrollama8.title')}}</h6>
					<p>{{$t('scrollama8.p1')}}</p>
					<p>
						{{$t('scrollama8.p2')}}
						<a target="_blank" href="https://www-ws.gov.taipei/Download.ashx?u=LzAwMS9VcGxvYWQvMzkwL3JlbGZpbGUvMTk2OTQvODI1MzIzOC80ZWJlODkzMC1hM2JkLTQ0YjItYTgyNi1jZTNlMGQwYjE0N2MucGRm&n=MTA5MDkyNeS6pOmAmuacg%2bWgseacg%2bitsOizh%2baWmV8xMDnlubTnrKw55qyh5Lqk6YCa5pyD5aCx5pyD6K2w6LOH5paZdjEucGRm&icon=.pdf" :title="$t('linkTo')">
							{{$t('scrollama8.p3')}}
						</a>
						{{$t('scrollama8.p4')}}
					</p>
				</div>
				
			</div>
		</div>

		<AsideBox v-if="currStep > 0" :step="currStep"/>

		<!-- <div id="map_container" :class="{hide: mapContainerHide}">
			<MapBox 
				:curr-step='currStep' 
				:progress="currStepProgress" 
				:update-center="mapCenterData"
				:hail-layer='hailLayer'
				:hail-nonstation-layer='hailNonstationLayer'
			/>
		</div> -->
	</main>
</template>

<script>
import "intersection-observer"
import scrollama from "scrollama"
import AOS from "aos";
import "aos/dist/aos.css";

import AsideBox from "@/components/header/Aside.vue"
import HeaderAction from "@/components/header/Action.vue"
import HeadCover from "@/components/header/Cover.vue"
import Card from "@/components/content/Card.vue"
import Step1 from "@/components/content/Step1.vue"
import Step2 from "@/components/content/Step2.vue"
import Step3 from "@/components/content/Step3.vue"
import Step4 from "@/components/content/Step4.vue"
import Step5 from "@/components/content/Step5.vue"
import Step6 from "@/components/content/Step6.vue"
import Annotation from "@/components/content/Annotation.vue"

import MapBox from '@/components/maps/MapBox.vue'

import ColumnBasic from '@/components/charts/ColumnBasic.vue';
import RadialsBasic from '@/components/charts/RadialsBasic.vue';
import DonutBasic from '@/components/charts/DonutBasic.vue';

import {hotspot} from '@/assets/js/topspot.js'
import ratioImg from '@/assets/img/ratio.jpeg'
import stationImg from '@/assets/img/station.jpeg'

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

			currStep: 0,
			currStepProgress: 0,
			mapCenterData: {},
			hailLayer: true,
			hailNonstationLayer: true,

			ratioImg,
			stationImg,
			
			scrollValue: 0,
			columnBasicLoad: false,
			donutBasicLoad: false
		}
	},
	components:{
		MapBox, HeaderAction, HeadCover, Step1, Step2, Step3, Step4, Step5, Step6, Card, Annotation, AsideBox, ColumnBasic, RadialsBasic, DonutBasic
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
		// mapContainerHide() {
		// 	return this.currStep == 0 || this.currStep == 3 || this.currStep == 4
		// },

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
				// console.log(progress);
				this.currStepProgress = (Math.floor(progress*10000)/100)
			})
			.onStepEnter(resp => {
				const {element} = resp
				this.currStep = element.dataset.stepNo
				this.columnBasicLoad = this.currStep == 7
				// this.donutBasicLoad = this.currStep == 4
			})
			// .onStepExit(resp => {
			// 	const {element} = resp
			// 	console.log(element.dataset.stepNo);
			// })

			window.addEventListener('resize', () => {
				this._scroller.resize()
			})
		},
		// mapSetCenter(e){
		// 	if(hotspot[e] && hotspot[e]['center']){
		// 		const hotspotData = hotspot[e]
		// 		this.mapCenterData = {
		// 			target: hotspotData['序號'],
		// 			pos: hotspotData['center']
		// 		}
		// 	}
		// }
	}
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/home.scss';

.svg_scroll{
	animation: rotate 1s linear infinite;
	animation-play-state: paused;
	animation-delay: calc(var(--scroll) * -1s);

	animation-iteration-count: 1;
	animation-fill-mode: both;
	&.svgImg{
		position: fixed;
		z-index: 1000;
		top: 50%;
		left: 50%;
		margin-top: -50px;
		margin-left: -50px;
	}
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
