<template>
    <div class="articalBox space-between">
        <div>
            <template v-if="articleShow1">
                <h6>{{$t("article.step4.title")}}</h6>
                <p
                    data-aos="fade-up"
                    data-aos-duration="800"
                >
                    <span>{{$t("article.step4.p1")}}</span>
                    <AnnotationTrigger :key="'電信資料'" :toggle="annotationToggle1" :text="$t('telecom')" @update="updateToggle1"/>
                    <span>{{$t("article.step4.p2")}}</span>
                </p>
            </template>
            <p 
                v-if="articleShow2"
                data-aos="fade-up"
                data-aos-duration="800"
            >
                <span>{{$t("article.step4.p3")}}</span>
                <AnnotationTrigger :key="'對比台北市建成區'" :toggle="annotationToggle2" :text="$t('article.step4.annotationTrigger2')" @update="updateToggle2"/>
                <span>{{$t("article.step4.p4")}}</span>
            </p>
            <AnnotationContent
                :dropdown="annotationToggle1" 
                :fix="'bottom'" 
                :content="$t('article.step4.annotationContent1')"
                @update="updateToggle1"
            />
            <AnnotationContent
                :dropdown="annotationToggle2" 
                :fix="'bottom'" 
                :content="$t('article.step4.annotationContent2')"
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
            return this.currStep == 3 && this.currStepProgress < 0.25
        },
        articleShow2(){
            if(!this.mobileDevice)return true
            if(this.currStep == 4) return true
            return this.currStep == 3 && this.currStepProgress >= 0.25
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