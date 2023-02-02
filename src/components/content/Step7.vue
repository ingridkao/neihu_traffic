<template>
    <header class="colArticle">
        <h6>{{$t("article.step7.title")}}</h6>
        <p
            data-aos="fade-down"
            data-aos-duration="1800"
        >
            <span>{{$t("article.step7.p1")}}</span>
            <AnnotationTrigger 
                :toggle="annotationToggle" 
                :text="$t('article.step7.annotationTrigger1')"
                @update="updateToggle"
            />
            <span>{{$t("article.step7.p2")}}</span>
        </p>
        <p
            data-aos="fade-down"
            data-aos-duration="1800"
        >
            {{$t("article.step7.p3")}}
            <AnnotationContent
                :dropdown="annotationToggle" 
                :fix="''"
                :content="$t('article.step7.annotationContent1')"
                @update="updateToggle"
            />
        </p>
    </header>
    <ColumnBasic :load="load"/>
</template>

<script>
import ColumnBasic from '@/components/charts/ColumnBasic.vue';
export default {
	components:{
		ColumnBasic,
	},
    computed: {
        load() {
			return this.$store.state.step == 7
		}
    },
	data() {
		return {
            annotationToggle: false
		}
	},
    methods: {
        updateToggle(boolen) {
            this.annotationToggle = boolen
        }  
    }
}
</script>