<template>
    <div class="articalBox space-between">
        <div>
            <h6>內湖交通改善計畫：先了解大內科園區</h6>
            <p data-aos="fade-up" data-aos-duration="1600">
                <span>根據</span>
                <AnnotationTrigger :toggle="annotationToggle1" :text="'2019年交通流量資料'" @update="updateToggle1"/>
                <span>，內湖的交通壅塞熱點，主要集中在以內湖科技園區及大彎南段工業區組成的「大內湖科技園區」(以下簡稱大內科)。大內科總面積2.8km²，其中多為工商業用地，住宅用地次之。</span> 
            </p>
            <p v-if="textShow2" data-aos="fade-up" data-aos-duration="800">
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
            data-aos="fade-up"
            data-aos-duration="1600"
            :low-speed="lowSpeed" 
            @update="updateLowSpeed"
        />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components:{
        SpeedLabel: defineAsyncComponent(() => import('@/components/box/SpeedLabel.vue'))
	},
    computed: {
        lowSpeed() {
			return this.$store.state.lowSpeed
		},
        mobileDevice(){
            return this.$store.state.mobileDevice
        },
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        textShow2(){
            if(this.currStep < 1) return false
            if(this.currStep > 2) return false
            if(this.currStep == 2) return true
            if(this.mobileDevice)return this.currStepProgress >= 0.35 && this.currStepProgress < 0.8
            return this.currStepProgress >= 0.45
        }
    },
    data(){
        return {
            annotationToggle1: false,
            annotationToggle2: false
        }
    },
    methods:{
        updateLowSpeed(boolen){
            this.$store.commit('updateLowSpeed', boolen)
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


