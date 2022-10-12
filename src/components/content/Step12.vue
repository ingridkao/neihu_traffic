<template>
    <div 
        class="block_scrollama contextbox"
    >
        <div class="imgBox">
            <div class="bgBlock imgCenter bg1" :class="{active: article === 1}"/>
            <div class="bgBlock imgCenter bg2" :class="{active: article === 2}"/>
        </div>
        <div class="cardBox">
            <div class="top left title">
                <h6>You Bike的通勤熱區在哪</h6>
                <p>- 上下班時段的起訖熱門區域-</p>
            </div>
            <div class="middle2 right content">
                <div
                    v-if="article === 1"
                    data-aos="fade-down"			
                    data-aos-duration="1600"
                >
                    YouBike 使用熱區多為捷運站周邊，大多通勤族使用 YouBike 至捷運站轉乘。港墘捷運站為轉乘至內科最熱門的捷運站，依序為劍南路、文德、松山、西湖。
                </div>
            </div>
            <div class="middle right content">
                <div
                    v-if="article === 2"
                    data-aos="fade-up"			
                    data-aos-duration="3000"
                >
                    <ColumnBasicBike />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ColumnBasicBike from '@/components/charts/ColumnBasicBike.vue';

export default {
	components:{
		ColumnBasicBike,
	},
    computed: {
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        article(){
            if((this.currStep == 12 && this.currStepProgress >= 50) || this.currStep == 13){
                return 2
            }else{
                return 1
            }
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
    }
</style>

