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
        fixed: (currStep == 2 && currStepProgress >= 0.375) || (currStep == 3 && currStepProgress < 0.1) 
    }]">
        <div class="bgBlock bg6 active"/>
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
    &.bg6{ background-image: url('../../assets/img/map/6.jpg'); }
}
</style>

