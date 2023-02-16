<template>
    <div class="imgBox"
        :class="{
            fixed: blockFixed
        }"
    >
        <div class="bgBlock imgCenter busbg1 active"/>
        <div class="bgBlock imgCenter busbg2" :class="{active: articleShow2}"/>
    </div>
    <div class="cardBox"
        :class="{
            blockFixed: blockFixed,
        }"
    >
        <div class="top left title">
            <h6>{{$t("article.step11.title")}}</h6>
            <p>{{$t("article.step10.supTitle")}}</p>
            <div class="mapLabel">
                <ChartLabel :text="$t('popularPick')"/>
                <template v-if="articleShow1" >
                    <MapPointLabel :text="$t('article.step11.mapPointLabel')" :gradient="['#fff', '#ee3c43']"/>
                </template>
                <template  v-else>
                    <MapLabel :text="$t('article.step11.mapLabel1')" :borderWidth="1.5" :borderColor="'#666'" :borderStyle="'dotted'"/>
                    <MapLabel :text="$t('article.step11.mapLabel2')" :borderWidth="3" :borderColor="'#c2272d'" :borderStyle="'dotted'"/>
                </template>
            </div>
        </div>
        <div class="bottom right content">
            <div
                v-if="articleShow1"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                <p>{{$t("article.step11.p1")}}</p>
            </div>
            <div
                v-if="chartShow"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                <ColumnBasicBus />
            </div>
            <div
                v-if="articleShow2"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                <p>{{$t("article.step11.p2")}}</p>
                
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
            if(this.currStep == 11) return this.currStepProgress <= 0.1
            if(this.currStep == 10) return this.currStepProgress >= 0.05
            return false
        },
        articleShow1(){
            if(this.currStep < 10)return true
            if(this.currStep == 11)return false
            if(this.currStep == 10)return this.currStepProgress < 0.35
        },
        articleShow2(){
            if(this.currStep < 10)return false
            if(this.currStep == 11)return true
            if(this.currStep == 10)return this.currStepProgress >= 0.35
        },
        chartShow(){
            if(this.mobileDevice) return false
            if(this.currStep == 10)return this.currStepProgress >= 0.25
            return this.articleShow2
        }
    }
}
</script>
<style lang="scss" scoped>
.imgBox{
    @media screen and (max-width:1025px){
        height: 100%;
    }
    .bgBlock{
        &.busbg1{ background-image: url('../../assets/img/zoom/Bus-01.jpeg');}
        &.busbg2{ background-image: url('../../assets/img/zoom/Bus-02.jpeg');}
    }
}
.cardBox{
    pointer-events: none;
    @media screen and (max-width:1025px){
        height: 100%;
    }
}
</style>

