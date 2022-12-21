<template>
    <div class="articalBox"
        data-aos="fade-up"
        data-aos-duration="1600"
    >
        <p>
            大內科區域聚集6,000家以上企業，包含許多大型企業的營運總部，扮演「北台灣技產業軸帶」的關鍵性角色。園區以研發設計、行銷、服務知識經濟產業鏈為主，也包括資訊通訊、數位內容、生技等高附加價值的產業。
        </p>
    </div>
    <div :class="['imgBox',{
        currStep: currStep == 3,
        fixedbox: currStep == 3 || (currStep == 4 && currStepProgress <= 10)
    }]">
        <div class="bgBlock bg4 active"
            :class="{
                activeOpacity: continuePrev || (currStep == 3 && currStepProgress <= 10) || eyecatch
            }"
        />
        <div class="bgBlock bg6"
            :class="{
                active: currStep == 3 && !img1Show,
                activeOpacity: eyecatch
            }"
        />
    </div>
</template>

<script>
export default {
    computed: {
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        img1Show(){
            if(this.currStep != 3) return false
            return this.currStepProgress < 50
        },
        continuePrev(){
            if(this.currStep != 2) return false
            return this.currStepProgress > 75
        },
        eyecatch(){
            if(this.currStep != 3) return false
            return this.currStepProgress >= 45 && this.currStepProgress < 50
        }
    }
}
</script>
<style lang="scss" scoped>
.bgBlock{
    &.bg4{ background-image: url('../../assets/img/map/4.jpg'); }
    &.bg6{ background-image: url('../../assets/img/map/6.jpg'); }
}
</style>

