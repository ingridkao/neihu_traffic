<template>
    <header class="carouselHeader colArticle">
        <h6>{{$t("article.step5.title")}}</h6>
        <p
            data-aos="fade-up"
            data-aos-duration="400"
        >
            {{$t("article.step5.p1")}}
        </p>
        <p 
            data-aos="fade-up"
            data-aos-duration="400"
        >
            <span>
                {{$t("article.step5.p2")}}
            </span>
            <AnnotationTrigger :toggle="annotationToggle" :text="$t('article.step5.annotationTrigger1')" @update="updateToggle"/>
            <span>
                {{$t('article.step5.p3')}}
            </span>
        </p>
        <AnnotationContent
            :dropdown="annotationToggle"
            :fix="'rowLayout'"
            :content="`
                <b>${$t('article.step5.tab[1]')}</b>：${$t('article.step5.annotationContent1[0]')}<br>
                <b>${$t('article.step5.tab[2]')}</b>：${$t('article.step5.annotationContent1[1]')}<br>
                <b>${$t('article.step5.tab[3]')}</b>：${$t('article.step5.annotationContent1[2]')}                
            `"
            @update="updateToggle"
        />
    </header> 
    <div class="carousel">
        <CarouselHeader 
            :tab="tab" 
            :currentTab="currentTab" 
            @update="selectPage"
        />
        <CarouselImage 
            :tab="tab" 
            :currentTab="currentTab" 
            :label="$t('charts.radialsAll.total')" 
            :gradient="['#e3c5c7', '#cf181b']"
            :imgURL="'tab'"
            @update="selectPage"
        />
    </div>
</template>

<script>
import CarouselHeader from "@/components/carousel/CarouselHeader.vue"
import CarouselImage from "@/components/carousel/CarouselImage.vue"

export default {
	components:{
		CarouselHeader,
        CarouselImage
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
				{index: 'All', name: this.$t('article.step5.tab[0]')},
				{index: 'A', name: this.$t('article.step5.tab[1]')},
				{index: 'B', name: this.$t('article.step5.tab[2]')},
				{index: 'C', name: this.$t('article.step5.tab[3]')}
			],
			currentTab: "All",
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