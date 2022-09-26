<template>
    <div 
        class="block_scrollama contextbox"
    >
        <div class="imgBox">
            <div
                :style="{
                    backgroundImage: `url(${require('@/assets/img/zoom/3.jpeg')})`
                }"
                class="bgBlock imgCenter active"
            />
        </div>
        <div class="cardBox">
            <div class="top left title">
                <h6>You Bike的通勤熱區在哪</h6>
                <p>- 上下班時段的起訖熱門區域-</p>
            </div>
            <div class="middle right content large">
                <div
                    v-if="currStep == 12 && currStepProgress > 25"
                    data-aos="fade-up"			
                    data-aos-duration="3000"
                >
                    YouBike 使用熱區多為捷運站周邊，大多通勤族使用 YouBike 至捷運站轉乘。港墘捷運站為轉乘至內科最熱門的捷運站，依序為劍南路、文德、松山、西湖。
                    <ColumnBasicBike />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ColumnBasicBike from '@/components/charts/ColumnBasicBike.vue';

export default {
    props: {
        currStep: {
            type: Number || String
        },
        currStepProgress: {
            type: Number
        }
    },
	components:{
		ColumnBasicBike,
	}
}
</script>

