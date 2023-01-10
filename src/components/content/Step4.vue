<template>
    <div class="articalBox space-between">
        <div>
            <h6>13萬以上的工作人口，大多居住在園區以外</h6>
            <p
                v-if="articleShow1"
                data-aos="fade-up"
                data-aos-duration="800"
            >
                <span>本次研究，透過</span>
                <AnnotationTrigger :key="'電信資料'" :toggle="annotationToggle1" :text="'電信資料'" @update="updateToggle1"/>
                <span>推估大內科的人口特性。大內科工作人口為13萬3500人，從右圖可知整體大內科屬於工作為主的區域較少住商混合的狀態，多數人前往大內科工作，需要較長距離的通勤。</span>
            </p>
            <p 
                v-if="articleShow2"
                data-aos="fade-up"
                data-aos-duration="800"
            >
                <span>此外，</span>
                <AnnotationTrigger :key="'對比台北市建成區'" :toggle="annotationToggle2" :text="'對比台北市建成區'" @update="updateToggle2"/>
                <span>，大內科的工作人口密度為53,400人/平方公里，約為台北市平均工作人口密度的2.5倍。而未來大灣南段進駐更多企業後，可預見將帶來更大的通勤需求通勤需求。</span>
            </p>
            <AnnotationContent
                :dropdown="annotationToggle1" 
                :fix="'bottom'" 
                :content="`電信業者透過手機訊號，推估空間範圍內的人口變化。這能幫助我們更精確掌握如上下班通勤的實際流動、居住與就業地分佈等資訊。`"
                @update="updateToggle1"
            />
            <AnnotationContent
                :dropdown="annotationToggle2" 
                :fix="'bottom'" 
                :content="`指市行政區範圍內經過徵用的土地和實際建設發展起來的非農業生產建設地段，它包括市區集中連片的部分以及分散在近郊區與城市有著密切聯繫，具有基本完善的市政公用設施的城市建設用地（如機場、鐵路編組站、污水處理廠、通訊電台等）。`"
                @update="updateToggle2"
            />
        </div>
        <TelLabel
            v-if="telLabelShow"
            data-aos="fade-up"
            data-aos-duration="800"
        />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components:{
        TelLabel: defineAsyncComponent(() => import('@/components/box/TelLabel.vue'))
	},
    data(){
        return {
            annotationToggle1: false,
            annotationToggle2: false
        }
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
        articleShow1(){
            if(!this.mobileDevice)return true
            if(this.currStep == 2) return true
            return this.currStep == 3 && this.currStepProgress < 0.3
        },
        articleShow2(){
            if(!this.mobileDevice)return true
            if(this.currStep == 4) return true
            return this.currStep == 3 && this.currStepProgress >= 0.3
        },
        telLabelShow(){
            return !this.mobileDevice
        }
    },
    methods: {
        updateToggle1(boolen) {
            this.annotationToggle1 = boolen
            if(boolen){
                this.annotationToggle2 = this.annotationToggle2? false: this.annotationToggle2
            }
        },
        updateToggle2(boolen) {
            this.annotationToggle2 = boolen
            if(boolen){
                this.annotationToggle1 = this.annotationToggle1? false: this.annotationToggle1
            }
        }
    }
}
</script>