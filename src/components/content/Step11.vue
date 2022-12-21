<template>
    <div class="imgBox"
        :class="{
            fixedbox: blockFixed,
            blockBottom: blockBottom,
            currStep: currStep == 11
        }"
    >
        <div class="bgBlock imgCenter busbg1 active"/>
        <div class="bgBlock imgCenter busbg2" :class="{active: article === 2}"/>
        <div class="bgBlock imgCenter busbg3" :class="{active: article === 3}"/>
    </div>
    <div class="cardBox"
        :class="{
            blockFixed: blockFixed,
        }"
    >
        <div class="top left title">
            <h6>公車的通勤熱區在哪</h6>
            <p>- 上下班時段的起訖熱門區域-</p>
            <div class="mapLabel">
                <ChartLabel/>
                <MapPointLabel v-if="article >= 2" :text="'轉乘熱門度'" :gradient="['#fff', '#ee3c43']"/>
                <template  v-if="article >= 3">
                    <MapLabel :text="'捷運服務可及範圍'" :borderWidth="1.5" :borderColor="'#666'" :borderStyle="'dotted'"/>
                    <MapLabel :text="'捷運服務範圍外公車搭乘熱區'" :borderWidth="3" :borderColor="'#c2272d'" :borderStyle="'dotted'"/>
                </template>
            </div>
        </div>
        <div class="middle right content">
            <div
                v-if="article >= 1"
                data-aos="fade-down"
                data-aos-duration="1600"
            >
                除了搭乘公車直達內科上班外，有大量的上班族也會透過捷運轉公車的方式至內科上班。從數據上發現，松山捷運站為最熱門的轉乘站點。
            </div>
            <div
                v-if="chartShow"
                data-aos="fade-down"
                data-aos-duration="1600"
            >
                <ColumnBasicBus />
            </div>
            <div
                v-if="article == 2"
                data-aos="fade-up"
                data-aos-duration="1600"
            >
                除了捷運轉乘公車的需求外，捷運無覆蓋的士林、內湖、松山、南港、中山、新莊、汐止等臨近地區，也是公車通勤的主要熱區。
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ColumnBasicBus from '@/components/charts/ColumnBasicBus.vue';
export default {
	components:{
		ColumnBasicBus,
        ChartLabel: defineAsyncComponent(() => import('@/components/content/ChartLabel.vue')),
        MapPointLabel: defineAsyncComponent(() => import('@/components/content/MapPointLabel.vue')),
        MapLabel: defineAsyncComponent(() => import('@/components/content/MapLabel.vue'))
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
            return  this.currStep == 11 && this.currStepProgress >= 10 && this.currStepProgress <= 95
        },
        blockBottom(){
            return  this.currStep == 12 || (this.currStep == 11 && this.currStepProgress > 95)
        },
        article(){
            if(this.currStep == 12)return 2
            if(this.mobileDevice){
                return this.currStep == 11 && this.currStepProgress < 40 ? 1: 2
            }else{
                return this.currStep == 11 && this.currStepProgress < 60 ? 1: 2
            }
        },
        chartShow(){
            if(this.mobileDevice) return false
            if(this.currStep == 12)return true
            return this.currStep == 11 && this.currStepProgress >= 30
        }
    }
}
</script>
<style lang="scss" scoped>
    .bgBlock{
        &.busbg1{ background-image: url('../../assets/img/zoom/Bus-01.jpg');}
        &.busbg2{ background-image: url('../../assets/img/zoom/Bus-02.jpg');}
        &.busbg3{ background-image: url('../../assets/img/zoom/Bus-03.jpg');}
    }
    .cardBox{
        pointer-events: none;
    }
    .mapLabel{
        background-color: rgba(255,255,255, 0.7);
    }
</style>

