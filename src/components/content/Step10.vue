<template>
    <div :class="['imgBox', {
        fixed: blockFixed
    }]">
        <div class="bgBlock imgCenter mrtbg1 active"/>
        <div class="bgBlock imgCenter mrtbg2" :class="{active: article >= 2}"/>
        <div class="bgBlock imgCenter mrtbg3" :class="{active: article >= 3}"/>
        <div class="bgBlock imgCenter mrtbg4" :class="{active: article >= 4}"/>
        <div class="bgBlock imgCenter mrtbg5" :class="{active: article >= 5, zoom: article == 6}"/>
    </div>
    <div class="cardBox"
        :class="{
            blockFixed: blockFixed
        }"
    >
        <div class="top left title">
            <h6>捷運的通勤熱區在哪</h6>
            <p>- 上下班時段的起訖熱門區域 -</p>
            <div class="mapLabel">
                <ChartLabel/>
                <MapLabel v-if="article >= 5" :text="'捷運南港展覽館範圍'" :borderWidth="2" :borderColor="'#c2272d'" :borderStyle="'dotted'"/>
            </div>
        </div>
        <div class="middle right content">
            <div
                v-if="article == 2"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                1. 主要的捷運通勤族皆來自文湖線站點周邊。
            </div>
            <div
                v-if="article == 3"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                2. 在轉乘的部分最多的人次來自板南線、其次為中和新蘆線與松山新店線。
            </div>
            <div
                v-if="article == 4"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                3. 士林北投區域的工作人口佔9.2%但使用捷運通勤人數相當少數。
            </div>
            <div
                v-if="article >= 5"
                data-aos="fade-left"
                data-aos-duration="400"
            >
                4. 不管上班或下班，南港展覽館為進出人次最高的站，推測其周邊汐止區居住人口至此搭乘至內科工作。
            </div>
        </div>
        <div class="content right middle2">
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
            return this.currStep == 9  || (this.currStep == 10 && this.currStepProgress <= 0.1)
        },
        article(){
            if(this.currStep == 10)return 6
            if(this.currStep == 8)return 1
            if(this.currStepProgress > 0.8)return 6
            if(this.currStepProgress > 0.65)return 5
            if(this.currStepProgress > 0.5)return 4
            if(this.currStepProgress > 0.35)return 3    
            if(this.currStepProgress > 0.2)return 2
            return 1
        }
    }
}
</script>
<style lang="scss" scoped>
.imgBox{
    .bgBlock.imgCenter{
        background-position-x: 55%;
        &.mrtbg1{ background-image: url('../../assets/img/zoom/MRT-01.jpg'); }
        &.mrtbg2{ background-image: url('../../assets/img/zoom/MRT-02.jpg'); }
        &.mrtbg3{ background-image: url('../../assets/img/zoom/MRT-03.jpg'); }
        &.mrtbg4{ background-image: url('../../assets/img/zoom/MRT-04.jpg'); }
        &.mrtbg5{ 
            background-image: url('../../assets/img/zoom/MRT-05.jpg'); 
            &.zoom{
                @media screen and (min-width:501px){ // For desktop
                    animation-name:image;
                    animation-duration: 3s;
                    animation-fill-mode: both;
                }
            }
        }
    }
}
.cardBox{
    pointer-events: none;
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

