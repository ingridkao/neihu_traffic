<template>
    <div class="articalBox space-between">
        <div>
            <h6>內湖交通改善計畫：先了解大內科園區</h6>
            <p v-if="textShow1" data-aos="fade-up" data-aos-duration="1600">
                <span>根據</span>
                <AnnotationTrigger :toggle="annotationToggle1" :text="'2019年交通流量資料'" @update="updateToggle1"/>
                <span>，內湖的交通壅塞熱點，主要集中在以內湖科技園區及大彎南段工業區組成的「大內湖科技園區」(以下簡稱大內科)。大內科總面積2.8km²，其中多為工商業用地，住宅用地次之。</span> 
            </p>
            <p v-if="textShow2" data-aos="fade-up" data-aos-duration="1600">
                <span>大內科周邊的主要道路，除了供大內科工作的人使用外，同時也要負擔其他區域的過境車流。據</span>
                <AnnotationTrigger :toggle="annotationToggle2" :text="'交通局委託民間業者的分析報告'" @update="updateToggle2"/>
                <span>指出，在通勤時段從其他區域進入大內科的車流為42.5%，過境大內科的車流為57.5%。</span>
            </p>
            <div class="annotationbox">
                <AnnotationContent 
                    :dropdown="annotationToggle1"
                    :fix="'bottom'"
                    :content="'資料來源: TomTom Traffic Stats'"
                    @update="updateToggle1"
                />
                <AnnotationContent 
                    :dropdown="annotationToggle2"
                    :fix="'bottom'"
                    :content="'臺北市運輸走廊整合道路交通與電信資訊應用計畫'"
                    @update="updateToggle2"
                />
            </div>
        </div>
        <SpeedLabel 
            v-if="speedLabelShow" 
            data-aos="fade-up"
            data-aos-duration="1600"
            :low-speed="lowSpeed" 
            @update="updateLowSpeed"
        />
    </div>

    <div :class="['imgBox',{
        currStep: currStep == 2,
        fixedbox: speedLabelShow || continueNext
    }]">
        <div class="bgBlock bg1 active"
            :class="{
                activeOpacity: eyecatch
            }"
        />
        <div class="bgBlock"
            :class="{
                active: img2Show || continueNext,
                activeOpacity: eyecatch || continueNext
            }"
            :style="{
                backgroundImage: `url(${lowSpeed? MapImg2: MapImg3})`
            }"
        />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import MapImg2 from '@/assets/img/map/2.jpg'
import MapImg3 from '@/assets/img/map/3.jpg'
export default {
    components:{
        SpeedLabel: defineAsyncComponent(() => import('@/components/box/SpeedLabel.vue'))
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
        img2Show(){
            return this.currStep == 2 && this.currStepProgress >= 40
        },
        continueNext(){
            return this.currStep == 3 && this.currStepProgress <= 10
        },
        textShow1(){
            if(this.mobildDevice) return !(this.currStep == 2 && this.currStepProgress >= 25)
            return this.currStep == 2 && this.currStepProgress > 10
        },
        textShow2(){
            if(this.mobildDevice) return this.currStep == 2 && this.currStepProgress >= 25
            return this.img2Show
        },
        speedLabelShow(){
            if(this.mobildDevice) return false
            return this.img2Show && this.currStepProgress > 50
        },
        eyecatch(){
            return (this.img2Show && this.currStepProgress < 50)
        }
    },
    data(){
        return {
            lowSpeed: false,
            MapImg2,
            MapImg3,
            annotationToggle1: false,
            annotationToggle2: false
        }
    },
    methods:{
        updateLowSpeed(boolen){
            this.lowSpeed = boolen
        },
        updateToggle1(boolen) {
            this.annotationToggle1 = boolen
            this.annotationToggle2 = boolen && this.annotationToggle2? false: this.annotationToggle2
        },
        updateToggle2(boolen) {
            this.annotationToggle2 = boolen
            this.annotationToggle1 = boolen && this.annotationToggle1? false: this.annotationToggle1
        }
    }
}
</script>

<style lang="scss" scoped>
.bgBlock{
    &.bg1{ background-image: url('../../assets/img/map/1.jpg'); }
}
</style>


