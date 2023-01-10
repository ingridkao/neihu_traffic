<template>
    <header
        data-aos="fade-down"
        data-aos-duration="800"
    >
        <h6>解決大內科交通問題，我們有哪些機會？</h6>
        <p>內湖科學園區的交通問題，受限於先天的都市規劃與既成路網系統，較難一次到位的解決。但透過數據得出的洞察，可以為我們指引一些可能性：</p>
    </header>
    <div class="imgBox">   
        <div class="bgBlock active">
            <RatioLabel 
                data-aos="fade-up"
                data-aos-duration="1600"
            />
        </div>
        <p>若捷運環狀線完工，可服務的區域包括士林、北投、松山、信義、文山等。但佔最多內科通勤人口的內湖(37.6%)、及汐止(6.2%)的上班族沒有被環狀線服務到。</p>
    </div>
    <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
        <p>讓大眾運輸更便利：</p>
        <div class="list">
            <p>1. 針對需求熱區，提供接駁車。</p>
            <p>2. 提高捷運轉乘公車的便利性，如改善慢行路徑、優化班次等。</p>
            <p>3. 與民間業者合作，提供多樣的替代交通選擇，如共享運具、共乘等。</p>
        </div>
    </div>
    <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
        <p>提供更好的「最後一哩」選擇：</p>
        <div class="list">
            <p>1. 針對需求熱區增設YouBike站，或加強車輛調度，提高使用性。</p>
            <p>2. 配合環狀線的建設，建立更完善慢行系統如人行道、自行車道等，串連住宅與辦公區。</p>
        </div>
    </div>
    <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
        <p>交通總量調控：</p>
        <div class="list">
            <p>
                1. 借鑑後疫情時代，
                <AnnotationTrigger :toggle="annotationToggle1" :text="'國際興起的「混合辦公」制度，將有助降低進出內科的通勤量'" @update="updateToggle1"/>
                。
            </p>
            <p>
                2. 亦可借鏡國外
                <AnnotationTrigger :toggle="annotationToggle2" :text="'在核心地區設置「超低碳排區」的做法，提高開車成本(如通行費、停車費等)，以抑制交通流量'" @update="updateToggle2"/>
                。
            </p>
            <AnnotationContent
                :dropdown="annotationToggle1" 
                :fix="''"
                :content="`
                    交通數據公司TOMTOM在研究指出，各城市疫情解封總運量回到80-90%，在流量減少10-15%的情況下便能有效預防壅塞；更多細節可透過參考著資料4的Tomtom研究報告連結查閱。
                `"
                @update="updateToggle1"
            />
            <AnnotationContent
                :dropdown="annotationToggle2" 
                :fix="''"
                :content="`
                    倫敦市政府交通局設置超低碳排區，需支付12.50 英鎊的費用才能在該區域內行駛；更多細節可透過參考著資料5的倫敦市政府研究報告連結查閱。
                `"
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