<template>
	<div id="chapter5" class="block_scrollama contextbox autoH">
        <header 
            class="contextbox rowBox"
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-offset="500"
        >
            <h6>在捷運環狀線尚未通車前，市府有機會為通勤族做哪些事？</h6>
            <div>
                <p>
                    <Annotation 
                        :text="'捷運東環段預計 2030 年完工'" 
                        :content="`
                            若捷運環狀線完工，可服務的區域為士林、北投到松山、信義、文山間的往返，但佔最多內科通勤人口的內湖(37.6%)、及汐止(6.2%)的上班族沒有被環狀線服務到。
                        `"
                        :content-img="'visMethods.jpeg'"
                    />
                    <span>
                        ，在尚未完工前，我們建議可從「提升轉乘便利性」、「完善慢行系統」兩個方向進行改善。在提升轉乘便利性上，除了增加捷運站至大內科的接駁專車，還可以增設 YouBike站點、共享機車等。在完善慢行系統部分，可搭配環狀線工程，優化內科區域周邊的人行道、自行車道以及行道樹等，改變慢行的路線體驗。
                    </span>
                </p>
            </div>
        </header>
	</div>
</template>

<script>
import Annotation from "@/components/content/Annotation.vue"
export default {
	components:{
		Annotation
	}
}
</script>

<style lang="scss" scoped>
.autoH{
    min-height: 50vh;
}
</style>

