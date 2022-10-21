<template>
    <div class="imgBox"
        :class="{
            fixedbox: blockFixed,
            blockBottom: blockBottom,
            currStep: currStep == 11
        }"
    >
        <div class="bgBlock imgCenter bg1 active"/>
        <div class="bgBlock imgCenter bg2" :class="{active: article === 2}"/>
    </div>
    <div class="cardBox"
        :class="{
            blockFixed: blockFixed,
        }"
    >
        <div class="top left title">
            <h6>公車的通勤熱區在哪</h6>
            <p>- 上下班時段的起訖熱門區域-</p>
        </div>
        <div class="middle2 right content">
            <div
                v-if="article === 1"
                data-aos="fade-down"			
                data-aos-duration="1600"
            >
                公車搭乘熱區大多為捷運站周邊，推測有多數人使用捷運轉乘公車通勤至內科。
            </div>
        </div>
        <div class="middle right content">
            <div
                v-if="article === 2"
                data-aos="fade-up"			
                data-aos-duration="1600"
            >
                松山捷運站為轉乘至內科最熱門的捷運站，其餘依序為港墘、中山國小、西湖、內湖。
                <ColumnBasicBus />
            </div>
        </div>
    </div>
</template>

<script>
import ColumnBasicBus from '@/components/charts/ColumnBasicBus.vue';
export default {
	components:{
		ColumnBasicBus
	},
    computed: {
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        article(){
            if((this.currStep == 11 && this.currStepProgress >= 50) || this.currStep == 12){
                return 2
            }else{
                return 1
            }
        },
        blockFixed(){
            return  this.currStep == 11 && this.currStepProgress >= 15 && this.currStepProgress < 90
        },
        blockBottom(){
            return  (this.currStep == 11 && this.currStepProgress >= 90) || this.currStep == 12
        }
    }
}
</script>
<style lang="scss" scoped>
    .bgBlock{
        &.bg1{ background-image: url('../../assets/img/zoom/Bus-01.jpg'); }
        &.bg2{ background-image: url('../../assets/img/zoom/Bus-02.jpg');}
    }
    .cardBox{
        pointer-events: none;
    }
</style>

