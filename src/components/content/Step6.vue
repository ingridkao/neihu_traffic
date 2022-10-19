<template>
    <div 
        id="chapter3"
        class="block_scrollama contextbox carouselContainer"
    >
        <header class="halfRowBox">
            <div>
                <h6>大內科通勤族，約有3成選擇大眾運輸</h6>
                <p>
                    <span>
                        捷運、公車為台北市重要的大眾運輸系統。我們
                    </span>
                    <Annotation 
                        :text="'使用悠遊卡票證資料進行空間分析'" 
                        :content="`
                            步驟一、篩選出位於大內科範圍內的捷運、公車及YouBike 站點。<br>
                            步驟二、統計各站點在上班時段的上車（騎乘）起點。<br>
                            步驟三、繪製各站點的服務半徑，依照最小統計單元的人口密度，將人數分配至 250m*250m 的網格。以便依照顏色深淺區分使用量。
                        `"
                        :content-img="'visMethods.jpeg'"
                    />
                    <span>後發現，在上班時段透過捷運、公車、或是 YouBike 進入大內科的平均人數為 42,500 人。與總工作人口 133,500人相比，可知僅約三成的通勤族選擇大眾運輸上下班，另外七成的通勤族偏好私人運具。（此方法可能忽略少部分非悠遊卡用戶的大眾運輸使用者，但仍可供大概的估算。）</span>
                </p>
            </div>
            <div>
                <RadialsBasicAll v-if="(currStep == 5 && currStepProgress > 25) || (currStep == 6 && currStepProgress < 15)"/>
                <RadialsBasic v-if="(currStep == 6 && currStepProgress >= 15)"/>
            </div>
        </header>
        <div class="carousel">
            <CarouselHeader 
                :tab="tab" 
                :currentTab="currentTab" 
                @update="selectPage"
            />
            <CarouselImage 
                :tab="tab" 
                :currentTab="currentTab" 
                :label="'熱門上車點'" 
                :gradient="['#e5eed6', '#78c17a']"
                :imgURL="'transportation'"
                @update="selectPage"
            />
        </div>
    </div>
</template>

<script>
import RadialsBasic from "@/components/charts/RadialsBasic.vue"
import RadialsBasicAll from "@/components/charts/RadialsBasicAll.vue"
import CarouselHeader from "@/components/carousel/CarouselHeader.vue"
import CarouselImage from "@/components/carousel/CarouselImage.vue"

export default {
	components:{
		RadialsBasic,
        RadialsBasicAll,
        CarouselHeader,
        CarouselImage
	},
    computed: {
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		}
    },
    data(){
		return {
			tab: [
				{index:'total', name: '大眾運輸'},
				{index:'mrt', name: '捷運'},
				{index:'bus', name: '公車'},
				{index:'bike', name: 'Youbike'},
			],
			currentTab: "total"
		}
	},
    methods: {
		selectPage(val){
			this.currentTab = val
		}
	}
}
</script>



