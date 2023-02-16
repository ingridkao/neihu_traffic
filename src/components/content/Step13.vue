<template>
    <header
        data-aos="fade-down"
        data-aos-duration="400"
    >
        <h6>{{$t("article.step13.title")}}</h6>
        <p>{{$t("article.step13.p1")}}</p>
    </header>
    <div class="imgBox">   
        <div class="bgBlock active">
            <RatioLabel 
                data-aos="fade-up"
                data-aos-duration="800"
            />
        </div>
        <p>{{$t("article.step13.p2")}}</p>
    </div>
    <div data-aos="fade-up" data-aos-duration="800">
        <p>{{$t("article.step13.p3")}}：</p>
        <div class="list">
            <p>1. {{$t("article.step13.list1[0]")}}</p>
            <p>2. {{$t("article.step13.list1[1]")}}</p>
            <p>3. {{$t("article.step13.list1[2]")}}</p>
        </div>
    </div>
    <div data-aos="fade-up" data-aos-duration="800">
        <p>{{$t("article.step13.p4")}}：</p>
        <div class="list">
            <p>1. {{$t("article.step13.list2[0]")}}</p>
            <p>2. {{$t("article.step13.list2[1]")}}</p>
        </div>
    </div>
    <div data-aos="fade-up" data-aos-duration="800">
        <p>{{$t("article.step13.p5")}}：</p>
        <div class="list">
            <p>
                1. {{$t("article.step13.list3[0]")}}
                <AnnotationTrigger :toggle="annotationToggle1" @update="updateToggle1"/>
            </p>
            <p>
                2. {{$t("article.step13.list3[1]")}}
                <AnnotationTrigger :toggle="annotationToggle2" @update="updateToggle2"/>
            </p>
            <AnnotationContent
                :dropdown="annotationToggle1" 
                :fix="''"
                :content="$t('article.step13.annotationContent1')"
                @update="updateToggle1"
            />
            <AnnotationContent
                :dropdown="annotationToggle2" 
                :fix="''"
                :content="$t('article.step13.annotationContent2')"
                @update="updateToggle2"
            />
        </div>
        <Author/>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
	components:{
        RatioLabel: defineAsyncComponent(() => import('@/components/box/RatioLabel.vue')),
        Author: defineAsyncComponent(() => import('@/components/Author.vue'))
	},
    data(){
        return {
            annotationToggle1: false,
            annotationToggle2: false,
        }
    },
    methods:{
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
header{
    margin-bottom: 5rem;
    max-width: 38rem;
}
.imgBox{
    height: auto;
    .bgBlock{
        position: relative;
        height:calc(100vh - 2.5rem);
        background-image: url('../../assets/img/epilogue/circular.jpeg');
        @media screen and (max-width:501px){  // For mobile
            height:30rem;
        }
    }
    p{
        font-size: 0.75rem;
        opacity: 0.75;
    }
}
.list{
    padding-left: 2rem;
    margin-bottom: 2rem;
}
</style>