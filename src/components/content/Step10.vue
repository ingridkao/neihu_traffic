<template>
    <div class="imgBox"
        :class="{
            fixedbox: blockFixed,
            blockBottom: blockBottom,
            currStep: currStep == 10
        }"
    >
        <div class="bgBlock imgCenter mrtbg1 active"/>
        <div class="bgBlock imgCenter mrtbg2" :class="{active: article === 2}"/>
        <div class="bgBlock imgCenter mrtbg3" :class="{active: article === 3}"/>
        <div class="bgBlock imgCenter mrtbg4" :class="{active: article >= 4}"/>
    </div>
    <div class="cardBox"
        :class="{
            blockFixed: blockFixed,
        }"
    >
        <div class="top left title">
            <h6>捷運的通勤熱區在哪</h6>
            <p>- 上下班時段的起訖熱門區域 -</p>
            <div class="mapLabel">
                <ChartLabel/>
                <MapLabel v-if="article >= 4" :text="'捷運南港展覽館範圍'" :borderWidth="2" :borderColor="'#c2272d'" :borderStyle="'dotted'"/>
            </div>
        </div>
        <div class="middle right content" :class="{button: article === 4}">
            <div
                v-if="article === 1 "
                data-aos="fade-left"
                data-aos-duration="800"
            >
                1. 主要的捷運通勤族皆來自文湖線站點周邊。
            </div>
            <div
                v-if="article === 2"
                data-aos="fade-left"
                data-aos-duration="800"
            >
                2. 在轉乘的部分最多的人次來自板南線、其次為中和新蘆線與松山新店線。
            </div>
            <div
                v-if="article === 3"
                data-aos="fade-left"
                data-aos-duration="800"
            >
                3. 士林北投區域的工作人口佔9.2%但使用捷運通勤人數相當少數。
            </div>
            <div
                v-if="article === 4"
                data-aos="fade-left"
                data-aos-duration="800"
            >
                4. 不管上班或下班，南港展覽館為進出人次最高的站，推測其周邊汐止區居住人口至此搭乘至內科工作。
            </div>
            <keep-alive>
                <ColumnBasicMrt
                    v-if="!mobileDevice"
                    :article="article"
                />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ColumnBasicMrt from '@/components/charts/ColumnBasicMrt.vue';
export default {
	components:{
		ColumnBasicMrt,
        ChartLabel: defineAsyncComponent(() => import('@/components/content/ChartLabel.vue')),
        MapLabel: defineAsyncComponent(() => import('@/components/content/MapLabel.vue'))
	},
    computed: {
        mobileDevice(){
            return this.$store.state.mobileDevice
        },
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        blockFixed(){
            return this.currStep == 10 && this.currStepProgress >= 10 && this.currStepProgress <= 90
        },
        blockBottom(){
            return this.currStep == 11 || (this.currStep == 10 && this.currStepProgress > 90)
        },
        article(){
            if(this.currStep == 11)return 4
            if(this.currStep == 9)return 1
            if(this.currStepProgress >= 60)return 4
            if(this.currStepProgress >= 40)return 3    
            if(this.currStepProgress >= 20)return 2
            return 1
        }
    }
}
</script>
<style lang="scss" scoped>
.bgBlock.imgCenter{
    background-position-x: 55%;
    &.mrtbg1{ background-image: url('../../assets/img/zoom/MRT-02.jpg'); }
    &.mrtbg2{ background-image: url('../../assets/img/zoom/MRT-03.jpg'); }
    &.mrtbg3{ background-image: url('../../assets/img/zoom/MRT-04.jpg'); }
    &.mrtbg4{ 
        background-image: url('../../assets/img/zoom/MRT-05.jpg'); 
        &.active{
            @media screen and (min-width:501px){ // For desktop
                animation-name:image;
                animation-duration: 3s;
                animation-fill-mode: both;
            }
        }
    }
}
.mapLabel{
    background-color: rgba(255,255,255, 0.7);
}
@keyframes image{
	0%{
        background-size: cover;
        background-position-x: 55%;
	}
	25%{
        background-size: 200%;
        background-position-x: 60%;
	}
	100%{
        background-size: 250%;
        background-position-x: 75%;
	}
}
</style>

