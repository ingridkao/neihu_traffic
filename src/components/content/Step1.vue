<template>
    <div 
        id="aricle1"
        data-aos="fade-up"
        data-aos-duration="800"
        :class="$i18n.locale"
    >
        <p>
            <span>{{$t("article.step1.p1")}}</span>
            <AnnotationTrigger :toggle="annotationToggle" :text="$t('article.step1.annotationTrigger')" @update="updateToggle"/>
            <span>{{$t("article.step1.p2")}}</span>
        </p>
        <p>
            {{$t("article.step1.p3")}}
        </p>
        <AnnotationContent 
            :dropdown="annotationToggle"
            :fix="'bottom'"
            :content="`
                <b>${$t('article.step1.annotationContent[0].title')}</b>：
                ${$t('article.step1.annotationContent[0].text')}
                <br>
                <b>${$t('article.step1.annotationContent[1].title')}</b>：
                ${$t('article.step1.annotationContent[1].text')}
                <br>
                <b>${$t('article.step1.annotationContent[2].title')}</b>：
                ${$t('article.step1.annotationContent[2].text')}
                <br>
            `"
            @update="updateToggle"
        />
    </div>
</template>
<script>
export default {
    data(){
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