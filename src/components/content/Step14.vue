<template>
	<div 
        class="block_scrollama contextbox rowBox"
    >
		<div >
            <h6>發展區域南移，未來將湧入更多人口</h6>
            <p
                v-if="imgBoxShow"
                data-aos="fade-up"			
                data-aos-duration="3000"
            >
                目前大內科的工作人口中，有 76.4%集中於右圖中的 A+B 區，這與 A 區鄰近文湖線，開發時間早有關。但 C 區為近年發展重點，包含TESLA總部、影視園區、好事多、IKEA、台塑企業總部等陸續進駐，後續需持續關注 C 區工作人口與交通狀況。
            </p>
            <DonutBasic
                v-if="chartShow"
                data-aos="fade-up"			
                data-aos-duration="3000"
            />
		</div>

        <div class="imgBox">
            <div
                :style="{
                    backgroundImage: `url(${require('@/assets/img/map/9.png')})`,
                    backgroundSize: 'contain'
                }"
                class="bgBlock active"
            />
        </div>
	</div>
</template>

<script>
import MapImg1 from '@/assets/img/map/1.jpg'
import MapImg2 from '@/assets/img/map/2.jpg'
import MapImg3 from '@/assets/img/map/3.jpg'
import MapImg4 from '@/assets/img/map/4.jpg'

import DonutBasic from "@/components/charts/DonutBasic.vue"
export default {
    components:{
		DonutBasic
	},
    props: {
        currStep: {
            type: Number || String
        },
        currStepProgress: {
            type: Number
        },
    },
    computed: {
        imgBoxShow(){
            return this.currStep == 14 && this.currStepProgress > 20
        },
        chartShow(){
            return this.currStep == 14 && this.currStepProgress > 40
        }
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

