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
			<Header data-step-no="0" :video-start="videoStart" />
			<Card data-step-no="1" :direction="'center'" :content="'內湖的塞車問題不僅是通勤族的夢靨，也是台北市政府長久以來的施政痛點。儘管市府已經針對交通壅塞提出短、中、長期計畫，依序包括：增加捷運與公車班次，道路拓寬，以及捷運環狀線規劃等，交通改善仍然有限。臺北大數據中心於2020年中主動與交通局合作，以全觀的區域視角，理解車流與人流如何進到內湖，並將鄰近內湖的大直、士林、松山、汐止納入研究，嘗試提供不同的政策思考。'"/>

			<div 
				data-step-no="2"
				id="chapter1"
				class="contextbox rowBox"
			>
				<div
					data-aos="fade-up"
					data-aos-duration="3000"
					data-aos-offset="500"
				>
					<h6>內湖交通改善計畫：先了解大內科園區</h6>
					<p>內湖的交通壅塞熱點，主要集中在以內湖科技園區及大彎南段工業區組成的「大內湖科技園區」(以下簡稱大內科)。大內科總面積2.8km²，  其中多為工商業用地，住宅用地次之，西邊則為美麗華商業區。</p>
				</div>
				<div class="imgBox"
					:class="{
						fixedbox: (currStep == 2 && currStepProgress > 0.25) || (currStep >= 3 && currStep < 6)
					}"
				>
					<div class="bg-map1" :class="{
						active: currStep <= 2,
						activeOpacity: (currStep == 2 && currStepProgress >= 0.3)
					}"/>
					<div class="bg-map2 " :class="{
						active: currStep == 3,
						activeOpacity: (currStep == 2 && currStepProgress >= 0.3)
					}"/>
					<div class="bg-map3" :class="{
                        activeOpacity: (currStep == 3 && currStepProgress > 0.25),
						active: (currStep == 3 && currStepProgress >= 0.75) || currStep == 4 
                    }"/>
				</div>
			</div>

            <div 
                data-step-no="3"
                class="contextbox rowBox"
            >
                <div
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    data-aos-offset="500"
                >
                    <p>大內科區域聚集6,000家以上企業，包含許多大型企業的營運總部，扮演「北台灣技產業軸帶」的關鍵性角色。園區以研發設計、行銷、服務知識經濟產業鏈為主，也包括資訊通訊、數位內容、生技等高附加價值的產業。</p>
                </div>
            </div>

			<div 
				data-step-no="4"
				class="contextbox rowBox"
			>
				<div
					data-aos="fade-up"
					data-aos-duration="3000"
					data-aos-offset="500"
				>
					<h6>13萬的工作人口，居住當地不到4成</h6>
					<p>本次研究，透過
						<Annotation :text="'電信資料'" :content="'電信業者將手機通訊資料去識別化後，能推估出一定空間範圍內的人口變化。這能幫助我們更精確掌握如上下班通勤的時段性人潮、居住與就業地分佈等資訊。'"/>
						推估大內科的人口特性。大內科工作人口為133,500人，居住人口為22,800人。由此可知，多數人口透過通勤前往至此工作。此外，對比全台北市的人口密度，大內科區域的的居住人口密度為台北的0.5倍、工作人口密度為2.5倍。
					</p>
				</div>
			</div>

			<div 
				data-step-no="5"
				id="chapter2"
				class="contextbox full carouselContainer"
			>
				<header>
					<h6>大內科的工作人口從哪來？士林、松山、汐止佔多數</h6>
					<p>運用電信數據除了能掌握區域內的工作人口數量外，更可以進一步了解工作人口的實際居住地。由下圖可知，大內科的工作人口，有37.6%居住在內湖區，其次為汐止區6.2%、士林區5.6%，松山區、大安區及中山區各佔4%。</p>
					<p>大內科A、B、C三區域的工作人口居住地分布上有其差異，A區有捷運站服務，因此工作人口涵蓋範圍覆蓋雙北甚至到基隆，B、C區主要之工作人口較多來自內湖及鄰近行政區(汐止、南港、信義、松山)。</p>
				</header>
				<Carousel/>
			</div>

			<div 
				data-step-no="6"
				id="chapter3"
				class="contextbox columnBox"
			>
				<div>
					<h6>哪一區的通勤人口最少使用大眾運輸？</h6>
					<p>為了理解哪一通勤地區，可以優先增設大眾運輸節點，或是加以檢視推廣，我們將大眾運輸通勤者的上車地點分類加總，並以通勤人口的實際居住地做分析。數據顯示，內湖區當地未使用大眾運輸通勤的人口數量最多，而除內湖區外，汐止、士林、北投、文山為目前大眾運輸使用比例低且人數較高的區域。。 *(汽車+機車+步行)</p>
				</div>
				<ColumnBasic :load="columnBasicLoad"/>
			</div>

			<div 
				data-step-no="7" 
				class="full"
			>
				<div 
					class="contextbox columnBox"
					data-aos="fade-up"
					data-aos-duration="3000"
					data-aos-offset="500"
				>
					<div>
						<h6>{{$t('scrollama2.title')}}</h6>
						<div class="imgBox">
							<img :src="ratioImg" :alt="$t('scrollama2.imgAlt')">
						</div>
						<p v-html="$t('scrollama2.p')"/>
						<div class="source">{{$t('scrollama1.source')}}</div>
					</div>
					<div class="chartBox">
						<RadialsBasic :load="radialsbarLoad"/>
					</div>
				</div>
			</div>
			

			<div 
				data-step-no="8"
				class="full" 
			>
				<div class="contextbox columnBox">
					<div class="">
						<h6>{{$t('scrollama3.title1')}}</h6>
						<p v-html="$t('scrollama3.p1')"/>
						<div class="source">{{$t('scrollama1.source')}}</div>
					</div>
					<div>
						<h6>{{$t('scrollama3.title2')}}</h6>
						<p v-html="$t('scrollama3.p2')"/>
						<div class="source">{{$t('scrollama3.source')}}</div>
					</div>
				</div>
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

import Header from '@/views/Header.vue'
import AsideBox from "@/components/header/Aside.vue"
import HeadCover from "@/components/header/Cover.vue"
import Card from "@/components/content/Card.vue"
import Annotation from "@/components/content/Annotation.vue"
import Carousel from "@/components/content/Carousel.vue"

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
			radialsbarLoad: false,
			donutBasicLoad: false
		}
	},
	components:{
		MapBox, Header, HeadCover, Card, Annotation, Carousel, AsideBox, ColumnBasic, RadialsBasic, DonutBasic
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
				this.currStepProgress = (Math.floor(progress*100)/100)/2
			})
			.onStepEnter(resp => {
				const {element} = resp
				this.currStep = element.dataset.stepNo
				this.columnBasicLoad = this.currStep == 1
				this.radialsbarLoad = this.currStep == 2
				this.donutBasicLoad = this.currStep == 4
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
