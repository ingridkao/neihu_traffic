<template>
    <div class="imgBox"
        :class="{
            fixedbox: blockFixed,
            blockBottom: blockBottom,
            currStep: currStep == 10
        }"
    >
        <div class="bgBlock imgCenter bg1 active"/>
        <div class="bgBlock imgCenter bg2" :class="{active: article === 2}"/>
        <div class="bgBlock imgCenter bg3" :class="{active: article === 3}"/>
        <div class="bgBlock imgCenter bg4" :class="{active: article === 4}"/>
    </div>
    <div class="cardBox"
        :class="{
            blockFixed: blockFixed,
        }"
    >
        <div class="top left title">
            <h6>捷運的通勤熱區在哪</h6>
            <p>- 上下班時段的起訖熱門區域 -</p>
        </div>
        <div class="middle right content">
            <div
                v-if="article == 1"
                data-aos="fade-down"			
                data-aos-duration="1600"
            >
                1. 主要的捷運通勤族皆來自文湖線站點周邊。
            </div>
            <div
                v-if="article == 2"
                data-aos="fade-down"			
                data-aos-duration="1600"
            >
                2. 在轉乘的部分最多的人次來自板南線、其次為松山新店線與中和新蘆線。
                <ColumnBasicMrt />
            </div>
            <div
                v-if="article == 3"
                data-aos="fade-down"			
                data-aos-duration="1600"
            >
                3. 士林北投區域的工作人口佔9.2%但使用捷運通勤人數相當少數。
            </div>
            <div
                v-if="article >= 4"
                data-aos="fade-down"			
                data-aos-duration="1600"
            >
                4. 不管上班或下班，南港展覽館為進出人次最高的站，推測其周邊汐止區居住人口至此搭乘至內科工作。
            </div>
        </div>
    </div>
</template>

<script>
import ColumnBasicMrt from '@/components/charts/ColumnBasicMrt.vue';
export default {
	components:{
		ColumnBasicMrt,
	},
    computed: {
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        blockFixed(){
            return  this.currStep == 10 && this.currStepProgress >= 15 && this.currStepProgress < 90
        },
        blockBottom(){
            return  (this.currStep == 10 && this.currStepProgress >= 90) || this.currStep == 11
        },
        article(){
            if(this.currStep == 11 || (this.currStep == 10 && this.currStepProgress >= 75)){
                return 4
            }else if(this.currStep == 10 && this.currStepProgress >= 50){
                return 3
            }else if(this.currStep == 10 && this.currStepProgress >= 25){
                return 2
            }else{
                return 1
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.bgBlock{
    &.bg1{ background-image: url('../../assets/img/zoom/MRT-02.jpg'); }
    &.bg2{ background-image: url('../../assets/img/zoom/MRT-03.jpg'); }
    &.bg3{ background-image: url('../../assets/img/zoom/MRT-04.jpg'); }
    &.bg4{ background-image: url('../../assets/img/zoom/MRT-05.jpg'); }
}
</style>

