<template>
    <div class="imgBox"
        :class="{
            fixed: blockFixed
        }"
        :data-currStep="currStep"
        :data-currStepProgress="currStepProgress"
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
                v-if="articleShow1"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                {{$t("article.step12.p1")}}
            </div>
            <div
                v-show="chartShow"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                <ColumnBasicBike/>
            </div>
            <div
                v-if="articleShow2"
                data-aos="fade-left"
                data-aos-duration="400"
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
            if(this.currStep == 11) return this.currStepProgress > 0.05
            if(this.currStep == 12) return this.currStepProgress <= 0.05
            return false
        },
        articleShow1(){
            if(this.currStep < 11)return true
            if(this.currStep == 12)return false
            if(this.currStep == 11) return this.currStepProgress < 0.35
        },
        articleShow2(){
            if(this.currStep < 11)return false
            if(this.currStep == 12)return true
            if(this.currStep == 11) return this.currStepProgress >= 0.35
        },
        chartShow(){
            if(this.mobileDevice) return false
            if(this.currStep == 11)return this.currStepProgress >= 0.25
            return this.articleShow2            
        }
    }
}
</script>
<style lang="scss" scoped>
.imgBox{
    .bgBlock{
        &.bg1{ background-image: url('../../assets/img/zoom/Youbike-01.jpeg'); }
    }
    @media screen and (max-width:1025px){
        height: 100%;
    }
}
.cardBox{
    pointer-events: none;
    @media screen and (max-width:1025px){
        height: 100%;
    }
}
</style>

