<template>
	<div 
        id="chapter1"
        class="block_scrollama contextbox rowBox"
    >
		<div class="articalBox">
            <h6>內湖交通改善計畫：先了解大內科園區</h6>
            <p
                v-if="imgBoxShow1"
                data-aos="fade-up"			
                data-aos-duration="1600"
            >
                根據 2019 年交通流量資料，內湖的交通壅塞熱點，主要集中在以內湖科技園區及大彎南段工業區組成的「大內湖科技園區」(以下簡稱大內科)。大內科總面積2.8km²，其中多為工商業用地，住宅用地次之。
            </p>
            <p
                v-if="imgBoxShow2"
                data-aos="fade-up"			
                data-aos-duration="1600"
            >
                大內科周邊的主要道路，除了供大內科工作的人使用外，同時也要負擔其他區域的過境車流。據交通局委託民間業者的分析報告指出，在通勤時段從其他區域進入大內科的車流為42.5%，過境大內科的車流為57.5%。.5%，過境內科的車流為57.5%。
            </p>
            <p 
                v-if="imgBoxShow3" 
                class="infoBox"
                data-aos="fade-up"			
                data-aos-duration="1600"
            >
                <SpeedLabel :low-speed="lowSpeed"/>
                <button @click="lowSpeed = !lowSpeed">
                    僅顯示低時速 {{lowSpeed ? 'on':'off'}}
                </button>
            </p>
		</div>

        <div :class="[
            'imgBox',
            {
                fixedbox: imgBoxShow3 || (currStep == 3 && currStepProgress <= 25)
            }
        ]">
            <div
                :style="{
                    backgroundImage: `url(${MapImg1})`
                }"
                :class="[
                    'bgBlock',
                    {
                        active: currStep == 1 || (currStep == 2 && currStepProgress <= 60),
                    }
                ]"
            />
            <div
               :style="{
                    backgroundImage: `url(${lowSpeed? MapImg2: MapImg3})`
                }"
                :class="[
                    'bgBlock',
                    {
                        'activeOpacity': (currStep == 2 && currStepProgress >= 45 && currStepProgress <= 60),
                        'active': (currStep == 2 && currStepProgress > 60)
                    }
                ]"
            />
            <div 
                :style="{
                    backgroundImage: `url(${MapImg4})`
                }"
                :class="[
                    'bgBlock',
                    {
                        activeOpacity: (currStep == 2 && currStepProgress > 90) || (currStep == 3 && currStepProgress <= 10)
                    }
                ]"
            />
        </div>
	</div>
</template>

<script>
import MapImg1 from '@/assets/img/map/1.jpg'
import MapImg2 from '@/assets/img/map/2.jpg'
import MapImg3 from '@/assets/img/map/3.jpg'
import MapImg4 from '@/assets/img/map/4.jpg'

import SpeedLabel from "@/components/box/SpeedLabel.vue"

export default {
    components:{
		SpeedLabel
	},
    computed: {
        mobildDevice(){
            return this.$store.state.mobildDevice
        },
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        imgBoxShow1(){
            if(this.mobildDevice) return !(this.currStep == 2 && this.currStepProgress >= 25)
            return this.currStep == 2 && this.currStepProgress > 25
        },
        imgBoxShow2(){
            if(this.mobildDevice) return this.currStep == 2 && this.currStepProgress >= 25
            return this.currStep == 2 &&  this.currStepProgress >= 50
        },
        imgBoxShow3(){
            if(this.mobildDevice) return false
            return this.currStep == 2 && this.currStepProgress >= 50
        },
    },
    data(){
        return {
            lowSpeed: false,
            MapImg1,
            MapImg2,
            MapImg3,
            MapImg4
        }
    }
}
</script>

