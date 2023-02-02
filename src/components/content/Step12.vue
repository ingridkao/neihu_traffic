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
            <h6>{{$t("article.step12.title")}}</h6>
            <p>{{$t("article.step10.supTitle")}}</p>
            <div class="mapLabel">
                <ChartLabel :text="$t('popularPick')"/>
                <MapPointLabel :text="$t('article.step11.mapPointLabel')" :gradient="['#fff', '#ee3c43']"/>
            </div>
        </div>
        <div class="bottom right content">
            <div
                data-aos="fade-left"
                data-aos-duration="800"
            >
                {{$t("article.step12.p1")}}
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
                {{$t("article.step12.p2")}}
                
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
            if(this.currStep == 12)return true
            return (this.currStep == 11 && this.currStepProgress > 0.05)
        },
        article(){
            if(this.currStep == 12)return 2
            return this.currStep == 11 && this.currStepProgress < 0.5 ? 1: 2
        },
        chartShow(){
            if(this.mobileDevice) return false
            if(this.currStep == 12)return true
            return this.currStep == 11 && this.currStepProgress >= 0.25
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

