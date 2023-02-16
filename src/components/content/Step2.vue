<template>
    <div class="articalBox space-between">
        <div>
            <template v-if="textShow1">
                <h6>{{$t("article.step2.title")}}</h6>
                <p data-aos="fade-up" data-aos-duration="1600">
                    <span>{{$t("article.step2.p1")}}</span>
                    <AnnotationTrigger :toggle="annotationToggle1" :text="$t('article.step2.annotationTrigger1')" @update="updateToggle1"/>
                    <span>{{$t("article.step2.p2")}}</span>
                </p>
            </template>
            <p v-if="textShow2" data-aos="fade-up" data-aos-duration="800">
                <span>{{$t("article.step2.p3")}}</span>
                <AnnotationTrigger :toggle="annotationToggle2" :text="$t('article.step2.annotationTrigger2')" @update="updateToggle2"/>
                <span>{{$t("article.step2.p4")}}</span>
            </p>
            <div class="annotationbox">
                <AnnotationContent 
                    :dropdown="annotationToggle1"
                    :fix="'bottom'"
                    :content="`${$t('footer.title2')}: TomTom Traffic Stats`"
                    @update="updateToggle1"
                />
                <AnnotationContent 
                    :dropdown="annotationToggle2"
                    :fix="'bottom'"
                    :content="`${$t('footer.linkTitle3')}`"
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
        textShow1(){
            if(!this.mobileDevice)return true
            if(this.currStep == 2) return false
            return this.currStep == 1 && this.currStepProgress < 0.3
        },
        textShow2(){
            if(this.currStep < 1) return false
            if(this.currStep > 2) return false
            if(this.currStep == 2) return true
            if(this.mobileDevice)return this.currStepProgress >= 0.3 && this.currStepProgress < 0.8
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


