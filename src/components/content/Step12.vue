<template>
    <div class="imgBox"
        :class="{
            fixedbox: blockFixed,
            blockBottom: blockBottom,
            currStep: currStep == 12
        }"
    >
        <div class="bgBlock imgCenter bg1 active"/>
        <div class="bgBlock imgCenter bg2" :class="{active: article >= 2}"/>
    </div>
    <div class="cardBox"
        :class="{
            blockFixed: blockFixed,
        }"
    >
        <div class="top left title">
            <h6>YouBike的通勤熱區在哪</h6>
            <p>- 上下班時段的起訖熱門區域-</p>
        </div>
        <div class="mapLabel">
            <ChartLabel/>
            <MapPointLabel v-if="article >= 2" :text="'轉乘熱門度'" :gradient="['#fff', '#ee3c43']"/>
        </div>
        <div class="middle2 right content">
            <div
                v-if="article >= 1"
                data-aos="fade-down"
                data-aos-duration="1600"
            >
                YouBike使用熱區多為鄰近內科的捷運站周邊，大多通勤族使用YouBike至捷運站轉乘。
            </div>
            <div
                v-if="!mobildDevice && article === 2"
                data-aos="fade-up"
                data-aos-duration="1600"
            >
                <ColumnBasicBike/>
            </div>
            <div
                v-if="article === 2"
                data-aos="fade-up"
                data-aos-duration="1600"
            >
                港墘捷運站為捷運轉乘Youbike至內科最熱門的捷運站，後依序為文德、劍南路、內湖、松山。
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ColumnBasicBike from '@/components/charts/ColumnBasicBike.vue'
export default {
	components:{
		ColumnBasicBike,
        ChartLabel: defineAsyncComponent(() => import('@/components/content/ChartLabel.vue')),
        MapPointLabel: defineAsyncComponent(() => import('@/components/content/MapPointLabel.vue'))
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
        blockFixed(){
            return  this.currStep == 12 && this.currStepProgress >= 10 && this.currStepProgress <= 95
        },
        blockBottom(){
            return  this.currStep == 13 || (this.currStep == 12 && this.currStepProgress > 95)
        },
        article(){
            if(this.currStep == 13)return 2
            if(this.currStep == 12 && this.currStepProgress >= 50)return 2 
            if(this.currStep == 12) return 1
        }
    },

}
</script>
<style lang="scss" scoped>
    .bgBlock{
        &.bg1{ background-image: url('../../assets/img/zoom/Youbike-01.jpg'); }
        &.bg2{ background-image: url('../../assets/img/zoom/Youbike-02.jpg'); }
    }
    .cardBox{
        pointer-events: none;
        @media screen and (max-width:501px){
            div.middle2 {
                top: auto;
                bottom: 1rem;
            }
        }
    }
    .a{
        background-color: rgba(255,255,255, 0.7);
    }
</style>

