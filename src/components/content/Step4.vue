<template>
	<div 
        id="chapter2"
        class="block_scrollama contextbox rowBox"
    >
        <div class="articalBox"
            data-aos="fade-up"
            data-aos-duration="1600"
        >
            <h6>13萬的工作人口，居住內湖不到4成</h6>
            <p v-if="textShow1">
                <span>本次研究，透過</span>
                <Annotation :text="'電信資料'" :content="'電信業者透過手機訊號，推估空間範圍內的人口變化。這能幫助我們更精確掌握如上下班通勤的實際流動、居住與就業地分佈等資訊。'"/>
                <span>推估大內科的人口特性。大內科工作人口為 13 萬 3500 人，居住在內湖的比例為37.6 % 。由此可知，多數人無法就近前往大內科工作，而需要較長距離的通勤。</span>
            </p>
            <p v-if="textShow2">
                此外，對比全台北市，大內科的居住人口密度為台北居住人口密度的一半、但工作人口密度卻為 2.5 倍。而未來大內科南區進駐更多企業後，可預見將帶來更大的交通壓力。
            </p>
            <p
                v-if="textShow3"
                data-aos="fade-up"			
                data-aos-duration="1600"
            >
                <TelLabel/>
            </p>
        </div>
        <div class="imgBox"
            :class="{
                fixedbox: currStep == 4 && currStepProgress <= 50
            }"
        >
            <div class="bgBlock bg1 active"/>
            <div class="bgBlock bg2"
                :class="{
                    activeOpacity: currStep == 4 && currStepProgress >= 10 && currStepProgress <= 30,
                    active: (currStep == 4 && currStepProgress > 30) || currStep == 5,
                }"
            />
        </div>
	</div>
</template>

<script>
import TelLabel from "@/components/box/TelLabel.vue"
export default {
    components:{
        TelLabel
	},
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
        textShow1(){
            if(this.mobildDevice) return !(this.currStep == 4 && this.currStepProgress >= 25)
            return true
        },
        textShow2(){
            if(this.currStep != 4) return false
            if(this.mobildDevice) return this.currStep == 4 && this.currStepProgress >= 25
            return true
        },
        textShow3(){
            if(this.mobildDevice) return false
            return (this.currStep == 4 && this.currStepProgress >= 10) || this.currStep == 5
        },

    }
}
</script>
<style lang="scss" scoped>
.bgBlock{
    &.bg1{ background-image: url('../../assets/img/map/6.jpg'); }
    &.bg2{ background-image: url('../../assets/img/map/7.jpg'); }
}
</style>

