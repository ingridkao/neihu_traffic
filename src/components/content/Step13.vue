<template>
	<div 
        id="chapter5" 
        class="block_scrollama contextbox rowBox"
    >
        <div 
            class="articalBox" 
            :class="{
                fixedbox: currStep == 13 && currStepProgress >= 40 && currStepProgress < 100
            }"
        >
            <h6>解決大內科交通問題，我們有哪些機會？</h6>
            <p>
                內湖科學園區的交通問題，受限於先天的都市規劃與既成路網系統，較難一次到位的解決。但透過數據得出的洞察，可以為我們指引一些可能性：
            </p>
            <div class="list">
                <p v-if="displayShow(1)" data-aos="fade-up" data-aos-duration="800">1. 未來捷運環狀線的開通，有望化解如士林、北投區需多段轉乘的困擾，藉此提高通勤族搭乘捷運的意願、減少開車比例。</p>
                <p v-if="displayShow(2)" data-aos="fade-up" data-aos-duration="800">2. 目前僅一成多的通勤族採用公車或YouBike抵達內科，建議優化公車與接駁車班次路線，尤其是待環狀線開通後，仍無法觸及的汐止區。</p>
                <p v-if="displayShow(3)" data-aos="fade-up" data-aos-duration="800">3. 改善大內科周遭的自行車系統，以及行人友善環境，讓住在內科當地的通勤者，能採用健康、環保的方式上下班。</p>
                <p v-if="displayShow(4)" data-aos="fade-up" data-aos-duration="800">4. 在後疫情時代，鼓勵企業採用遠端或彈性辦公，減少同時間出行的私人運具。</p>
                <p v-if="displayShow(5)" data-aos="fade-up" data-aos-duration="800">5. 要減少塞車，不僅需要提升大眾運輸或慢行交通的便利，還可適當提高開車的成本以抑制交通流量。</p>
            </div>
        </div>
        <div class="imgBox">   
            <div class="bgBlock bg1 active"/>
        </div>
	</div>
</template>

<script>
export default {
    computed: {
        mobildDevice(){
            return this.$store.state.mobildDevice
        },
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        imgBoxShow(){
            return this.currStep == 13 && this.currStepProgress >= 50
        },
        listShow(){
            if((this.currStep == 13 && this.currStepProgress >= 60) || this.currStep == 14)return 5
            if(this.currStep == 13 && this.currStepProgress >= 45)return 4
            if(this.currStep == 13 && this.currStepProgress >= 30)return 3
            if(this.currStep == 13 && this.currStepProgress >= 15)return 2
            return 1
        }
    },
    methods:{
        displayShow(val){
            if(this.mobildDevice){
                return this.listShow == val
            }else{
                return this.listShow >= val
            }
        }
    }
}
</script>
<style lang="scss">
#chapter5{
    .list{
        height: 30rem;
        @media screen and (max-width:501px){
            height: 5rem;
        }
    }
    .bgBlock{
        &.bg1{ background-image: url('../../assets/img/mrt.jpeg'); }
    }
    .articalBox.fixedbox{
        @media screen and (max-width:501px){
            position: fixed;
        }
    }
}
</style>