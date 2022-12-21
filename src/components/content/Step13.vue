<template>
    <header 
        class="rowFlex"
        data-aos="fade-down"
        data-aos-duration="3000"
        data-aos-offset="500"
    >
        <h6>解決大內科交通問題，我們有哪些機會？</h6>
        <p>
            <p>內湖科學園區的交通問題，受限於先天的都市規劃與既成路網系統，較難一次到位的解決。但透過數據得出的洞察，可以為我們指引一些可能性：</p>
            <p>1. 未來捷運環狀線(北環段)的開通，有望化解如士林、北投區需多段轉乘的困擾，藉此提高通勤族搭乘捷運的意願、減少開車比例。</p>
        </p>
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
    <div v-if="displayShow(2)" data-aos="fade-up" data-aos-duration="1600">
        <p>讓大眾運輸更便利：</p>
        <div class="list">
            <p>1. 針對需求熱區，提供接駁車。</p>
            <p>2. 提高捷運轉乘公車的便利性，如改善慢行路徑、優化班次等。</p>
            <p>3. 與民間業者合作，提供多樣的替代交通選擇，如共享運具、共乘等。</p>
        </div>
    </div>
    <div v-if="displayShow(3)" data-aos="fade-up" data-aos-duration="1600">
        <p>提供更好的「最後一哩」選擇：</p>
        <div class="list">
            <p>1. 針對需求熱區增設YouBike站，或加強車輛調度，提高使用性。</p>
            <p>2. 配合環狀線的建設，建立更完善慢行系統如人行道、自行車道等，串連住宅與辦公區。</p>
        </div>
    </div>
    <div v-if="displayShow(4)" data-aos="fade-up" data-aos-duration="1600">
        <p>交通總量調控：</p>
        <div class="list">
            <p>
               1. 借鑑後疫情時代，國際興起的「混合辦公」制度，將有助降低進出內科的通勤量。註.參考資料4Tomtom研究報告
            </p>
            <p>
               2. 亦可借鏡國外在核心地區設置「超低碳排區」的做法，提高開車成本(如通行費、停車費等)，以抑制交通流量。註.參考資料5倫敦市政府研究報告
            </p>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
	components:{
        RatioLabel: defineAsyncComponent(() => import('@/components/box/RatioLabel.vue'))
	},
    data(){
        return {
            annotationToggle1: false,
            annotationToggle2: false,
        }
    },
    computed: {
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        blockFixed(){
            return  this.currStep == 13 && this.currStepProgress >= 10 && this.currStepProgress <= 85
        },
        blockBottom(){
            return  (this.currStep == 13 && this.currStepProgress > 85)
        },
        listShow(){
            if(this.currStep == 14)return 5
            if(this.currStep == 13 && this.currStepProgress >= 60)return 5
            if(this.currStep == 13 && this.currStepProgress >= 45)return 4
            if(this.currStep == 13 && this.currStepProgress >= 30)return 3
            if(this.currStep == 13 && this.currStepProgress >= 15)return 2
            return 1
        }
    },
    methods:{
        displayShow(val){
            return this.listShow >= val
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
<style lang="scss" scoped>
.articalBox{
    padding-top: 2rem;
}
.list{
    padding-left: 2rem;
    margin-bottom: 2rem;
}
.imgBox{
    height: auto;
    margin-bottom: 2rem;
    .bgBlock{
        position: relative;
        height:calc(100vh - 18rem);
        background-image: url('../../assets/img/epilogue/circular.jpeg');
    }
    p{
        font-size: 0.75rem;
        opacity: 0.75;
    }
}

</style>