<template>
    <header class="carouselHeader colArticle halfRowHeader">
        <div
            data-aos="fade-up"
            data-aos-duration="800"
        >
            <h6>{{$t("article.step6.title")}}</h6>
            <p>
                <span>{{$t("article.step6.p1")}}</span>
                <AnnotationTrigger :toggle="annotationToggle" :text="$t('article.step6.annotationTrigger1')" @update="updateToggle"/>
                <span>{{$t("article.step6.p2")}}</span>
            </p>
            <AnnotationContent
                :dropdown="annotationToggle"
                :fix="'bottom left'"
                :text="$t('article.step6.annotationTrigger1')"
                :content="$t('article.step6.annotationContent1')"
                :content-img="'visMethods.jpeg'"
                @update="updateToggle"
            />
        </div>
        <div class="rowChart">
            <RadialsBasicAll/>
            <RadialsBasic/>
        </div>
    </header>
    <div class="carousel">
        <CarouselHeader 
            :tab="tab" 
            :currentTab="currentTab" 
            @update="selectPage"
        />
        <CarouselImage 
            :tab="tab" 
            :label="$t('popularPick')" 
            :currentTab="currentTab" 
            :imgURL="'transportation'"
            @update="selectPage"
        />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import CarouselHeader from "@/components/carousel/CarouselHeader.vue"
import CarouselImage from "@/components/carousel/CarouselImage.vue"

export default {
	components:{
        CarouselHeader,
        CarouselImage,
        RadialsBasic: defineAsyncComponent(() => import('@/components/charts/RadialsBasic.vue')),
        RadialsBasicAll: defineAsyncComponent(() => import('@/components/charts/RadialsBasicAll.vue')),
	},
    computed: {
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		}
    },
    data(){
		return {
			tab: [
				{index:'total', name: this.$t('charts.columnBasic.sort1')},
				{index:'bus', name: this.$t('charts.radialsBasic.label[0]')},
				{index:'mrt', name: this.$t('charts.radialsBasic.label[1]')},
				{index:'bike', name: this.$t('charts.radialsBasic.label[2]')}
			],
			currentTab: "total",
            annotationToggle: false
		}
	},
    methods: {
		selectPage(val){
			this.currentTab = val
		},
        updateToggle(boolen) {
            this.annotationToggle = boolen
        }
	}
}
</script>
<style lang="scss" scoped>
.rowChart{
    display: inline-flex;
    padding-top: 1rem;
    padding-left: 3rem;
    @media screen and (max-width:501px){ // For mobile
        flex-direction: column;
        width: 100%;
        padding-top: 0;
        padding-left: 0;
    }

}
</style>
