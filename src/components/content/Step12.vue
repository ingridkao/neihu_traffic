<template>
    <div class="imgBox"
        :class="{
            fixed: blockFixed
        }"
    >
        <div class="bgBlock imgCenter bg1 active"/>
    </div>
    <div class="cardBox"
        :class="{
            blockFixed: blockFixed
        }"
    >
        <div class="top left title">
            <h6>YouBike的通勤熱區在哪</h6>
            <p>- 上下班時段的起訖熱門區域-</p>
            <div class="mapLabel">
                <ChartLabel/>
                <MapPointLabel :text="'轉乘熱門度'" :gradient="['#fff', '#ee3c43']"/>
            </div>
        </div>
        <div class="middle right content">
            <div
                data-aos="fade-left"
                data-aos-duration="800"
            >
                YouBike使用熱區多為鄰近內科的捷運站周邊，大多通勤族使用YouBike至捷運站轉乘。
            </div>
            <div
                v-show="chartShow"
                data-aos="fade-left"
                data-aos-duration="800"
            >
                <ColumnBasicBike/>
            </div>
            <div
                v-if="article == 2"
                data-aos="fade-left"
                data-aos-duration="800"
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
        mobileDevice(){
            return this.$store.state.mobileDevice
        },
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        blockFixed(){
            return (this.currStep == 11 && this.currStepProgress > 0.05)
        },
        article(){
            if(this.currStep == 12)return 2
            return this.currStep == 11 && this.currStepProgress < 0.55 ? 1: 2
        },
        chartShow(){
            if(this.mobileDevice) return false
            if(this.currStep == 12)return true
            return this.currStep == 11 && this.currStepProgress >= 0.3
        }
    }
}
</script>
<style lang="scss" scoped>
    .bgBlock{
        &.bg1{ background-image: url('../../assets/img/zoom/Youbike-01.jpeg'); }
    }
    .cardBox{
        pointer-events: none;
        .middle2{
            @media screen and (max-width:501px){
                top: auto;
                bottom: 1rem;
            }
        }
    }
</style>

