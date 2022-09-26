<template>
    <div 
        class="block_scrollama contextbox"
    >
        <div class="imgBox">
            <div
                :style="{
                    backgroundImage: `url(${require('@/assets/img/zoom/2.jpeg')})`
                }"
                class="bgBlock imgCenter active"
            />
        </div>
        <div class="cardBox">
            <div class="top left title">
                <h6>公車的通勤熱區在哪</h6>
                <p>- 上下班時段的起訖熱門區域-</p>
            </div>
            <div class="middle right content large">
                <div
                    v-if="currStep == 11 && currStepProgress > 25"
                    data-aos="fade-up"			
                    data-aos-duration="3000"
                >
                    公車搭乘熱區大多為捷運站周邊，推測有多數人使用捷運轉乘公車通勤至內科。松山捷運站為轉乘至內科最熱門的捷運站，其餘依序為港墘、中山國小、西湖、內湖。
                    <ColumnBasicBus />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ColumnBasicBus from '@/components/charts/ColumnBasicBus.vue';

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
		ColumnBasicBus,
	},
}
</script>

