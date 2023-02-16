<template>
    <div :class="['imgBox', {
        fixed: blockFixed
    }]">
        <div class="bgBlock imgCenter mrtbg1 active"/>
        <div class="bgBlock imgCenter mrtbg2" :class="{active: article >= 2}"/>
        <div class="bgBlock imgCenter mrtbg3" :class="{active: article >= 3}"/>
        <div class="bgBlock imgCenter mrtbg4" :class="{active: article >= 4}"/>
        <div class="bgBlock imgCenter mrtbg5" :class="{active: article >= 5, zoom: article == 6}"/>
    </div>
    <div class="cardBox"
        :class="{
            blockFixed: blockFixed
        }"
    >
        <div class="top left title">
            <h6>{{$t("article.step10.title")}}</h6>
            <p>{{$t("article.step10.supTitle")}}</p>
            <div class="mapLabel">
                <ChartLabel :text="$t('popularPick')"/>
                <MapLabel v-if="article >= 5" :text="$t('article.step10.mapLabel')" :borderWidth="2" :borderColor="'#c2272d'" :borderStyle="'dotted'"/>
            </div>
        </div>
        <div class="middle3 right content">
            <div
                v-if="article == 2"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                1. {{$t("article.step10.list[0]")}}
            </div>
            <div
                v-if="article == 3"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                2. {{$t("article.step10.list[1]")}}
            </div>
            <div
                v-if="article == 4"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                3. {{$t("article.step10.list[2]")}}
            </div>
            <div
                v-if="article >= 5"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                4. {{$t("article.step10.list[3]")}}
            </div>
        </div>
        <div class="content right middle2">
            <keep-alive>
                <ColumnBasicMrt
                    v-if="!mobileDevice"
                    :article="article"
                />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ColumnBasicMrt from '@/components/charts/ColumnBasicMrt.vue';
export default {
	components:{
		ColumnBasicMrt,
        ChartLabel: defineAsyncComponent(() => import('@/components/content/ChartLabel.vue')),
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
            if(this.currStep < 9) return false
            if(this.currStep == 10) return this.currStepProgress <= 0.1
            return this.currStepProgress >= 0.05
        },
        article(){
            if(this.currStep == 10)return 6
            if(this.currStep == 8)return 1
            if(this.currStepProgress > 0.75)return 6
            if(this.currStepProgress > 0.6)return 5
            if(this.currStepProgress > 0.45)return 4
            if(this.currStepProgress > 0.3)return 3    
            if(this.currStepProgress > 0.15)return 2
            return 1
        }
    }
}
</script>
<style lang="scss" scoped>
.imgBox{
    .bgBlock.imgCenter{
        background-position-x: 55%;
        &.mrtbg1{ background-image: url('../../assets/img/zoom/MRT-01.jpg'); }
        &.mrtbg2{ background-image: url('../../assets/img/zoom/MRT-02.jpg'); }
        &.mrtbg3{ background-image: url('../../assets/img/zoom/MRT-03.jpg'); }
        &.mrtbg4{ background-image: url('../../assets/img/zoom/MRT-04.jpg'); }
        &.mrtbg5{ 
            background-image: url('../../assets/img/zoom/MRT-05.jpg'); 
            &.zoom{
                @media screen and (min-width:1024px){ // For desktop
                    animation-name:image;
                    animation-duration: 3s;
                    animation-fill-mode: both;
                }
            }
        }
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

@keyframes image{
	0%{
        background-size: cover;
        background-position-x: 55%;
	}
	25%{
        background-size: 200%;
        background-position-x: 60%;
	}
	100%{
        background-size: 250%;
        background-position-x: 75%;
	}
}
</style>

