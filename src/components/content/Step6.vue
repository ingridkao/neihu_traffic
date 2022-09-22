<template>
    <div 
        id="chapter3"
        class="block_scrollama contextbox carouselContainer full"
    >
        <header class="halfBox">
            <div>
                <h6>大內科通勤族，僅有 3 成選擇大眾運輸</h6>
                <p>增加捷運、公車等大眾交通工具的班次，為台北市府改善內湖交通的短期方針。但我們使用悠遊卡票證資料分析後發現，在上班時段透過捷運、公車、或是 YouBike 進入大內科的平均人數為 42,500 人。如果將大內科的總工作人數 133,500 人扣除 42,500，可得出有三成的通勤族選擇大眾運輸上下班，另外七成的通勤族偏好私人運具。（此方法並非非常的嚴謹，但藉此我們更能了解總體的通勤現況。）</p>
            </div>
            <RadialsBasicAll v-if="(currStep == 5 && currStepProgress > 0.25) || (currStep == 6 && currStepProgress < 0.15)"/>
            <RadialsBasic v-if="(currStep == 6 && currStepProgress >= 0.15)"/>
        </header>
        <CarouselFull/>
    </div>
</template>

<script>
import RadialsBasic from "@/components/charts/RadialsBasic.vue"
import RadialsBasicAll from "@/components/charts/RadialsBasicAll.vue"
import CarouselFull from "@/components/content/CarouselFull.vue"

export default {
	components:{
		RadialsBasic,
        RadialsBasicAll,
        CarouselFull
	},
    props: {
        currStep: {
            type: Number || String
        },
        currStepProgress: {
            type: Number
        }
    }
}
</script>



