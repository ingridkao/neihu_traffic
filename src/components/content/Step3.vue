<template>
    <div class="articalBox"
        data-aos="fade-up"			
        data-aos-duration="1600"
    >
        <p>
            大內科區域聚集6,000家以上企業，包含許多大型企業的營運總部，扮演「北台灣技產業軸帶」的關鍵性角色。園區以研發設計、行銷、服務知識經濟產業鏈為主，也包括資訊通訊、數位內容、生技等高附加價值的產業。
        </p>
    </div>
    <div class="imgBox"
        :class="{
            fixedbox: currStep == 3 || (currStep == 4 && currStepProgress <= 10),
            currStep: currStep == 3
        }"
    >
        <div class="bgBlock bg1 active"/>
        <div class="bgBlock bg2"
            :class="{
                activeOpacity: currStep == 3 && currStepProgress >= 20 && currStepProgress < 50,
                active: (currStep == 3 && currStepProgress >= 50 && currStepProgress < 75),
            }"
        />
        <div class="bgBlock bg3"
            :class="{
                activeOpacity: currStep == 3 && currStepProgress >= 75 && currStepProgress < 80,
                active: currStep == 3 && currStepProgress >= 80
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
		}
    }
}
</script>
<style lang="scss" scoped>
.bgBlock{
    &.bg1{ background-image: url('../../assets/img/map/4.jpg'); }
    &.bg2{ background-image: url('../../assets/img/map/5.jpg'); }
    &.bg3{ background-image: url('../../assets/img/map/6.jpg'); }
}
</style>

