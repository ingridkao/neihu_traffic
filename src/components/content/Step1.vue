<template>
    <div 
        id="aricle1"
        data-aos="fade-up"
        data-aos-duration="1000"
    >
        <p>
            <span>內湖的塞車問題不僅是通勤族的夢靨，也是台北市政府長久以來的施政痛點。儘管市府已經針對交通壅塞提出</span>
            <AnnotationTrigger :toggle="annotationToggle" :text="'短、中、長期計畫'" @update="updateToggle"/>
            <span>，現階段的交通改善仍然有限。而實際上內科面對的不只是交通問題，核心的問題是最初的都市計畫的設定低估了未來發展的潛力。</span>
        </p>
        <p>
            於2021年臺北大數據中心與台北市交通局共同合作，以全觀的視角，理解車流與人流如何進到內湖，並將地理位置鄰近內湖的大直、士林、松山、汐止區納入研究，嘗試提供不同的政策思考。
        </p>
        <AnnotationContent 
            :dropdown="annotationToggle"
            :fix="'bottom'"
            :content="`
                <b>短期計畫</b>：
                針對交通阻塞要點，進行29項小工程改造。例如：拆除分隔島、調整匝道、縮短捷運文湖線間隔班次、增設快速公車等，預估可以節省5%至19%的行車時間。
                <br>
                <b>中期計畫</b>：
                道路拓寬與規劃，例如：將港墘路拓寬、成功橋再拓寬，以及瑞湖街改成單向車道等。
                <br>
                <b>長期計畫</b>：
                打造捷運「環狀線」運輸系統，連接文湖、松山、板南、信義線的東側南北向軌道。在住宅方面，計畫建造優先出租給內湖上班族的社會住宅。
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