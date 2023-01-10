<template>
    <header class="colArticle">
        <h6>住哪區的通勤族，最少使用大眾運輸？</h6>
        <p
            data-aos="fade-down"
            data-aos-duration="1800"
        >
            <span>為了進一步了解大內科工作者的居住地，與大眾運輸使用率的關係，我們篩選出位於大內科的所有捷運、公車及YouBike站點，並將使用這些站點的「使用者上車地點」做分類。數據顯示，住在內湖當地的工作人口，約兩成使用大眾運輸，有八成通勤族選擇，有八成通勤族選擇</span>
            <AnnotationTrigger :toggle="annotationToggle" :text="'使用私人運具（汽車、機車、或步行）'" @update="updateToggle"/>
            <span>。 另外，住在汐止、士林、北投、文山區的大內科通勤族，也偏好以私人運具上下班。</span> 
        </p>
        <p
            data-aos="fade-down"
            data-aos-duration="1800"
        >
            透過下列的統計圖表，可以檢視不同行政區使用私人運具與大眾運輸的數量以及占比，對於私人運具使用人數及比例高的行政區，即是需要先關注的區域。
            <AnnotationContent
                :dropdown="annotationToggle" 
                :fix="''"
                :content="`
                    私人運具通勤工作人口：來源地總工作人口減去來源地大眾運輸通勤工作人口，此方法僅為推估總體的通勤現況，若該區域的大眾運輸通勤工作人口超過來源地總工作人口，表示有使用其他通勤方式至該區域搭乘大眾運輸的行為。
                `"
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