<template>
	<div id="chapter4" class="block_scrollama contextbox autoH">
        <header 
            class="contextbox rowBox"
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-offset="500"
        >
            <h6>從大眾運輸使用方式，分析通勤族的困境</h6>
            <div>
                <p>
                    <span>為了提升大眾運輸的使用，我們嘗試先理解目前的捷運、公車以及 YouBike 可能存在哪些困境。我們透過</span>
                    <Annotation 
                        :text="'視覺化方法'" 
                        :content="`
                            步驟一、篩選出位於大內科範圍內的捷運、公車及YouBike 站點。<br>
                            步驟二、統計各站點在上班時段的上車（騎乘）起點。<br>
                            步驟三、繪製各站點的服務半徑，依照最小統計單元的人口密度，將人數分配至 250m*250m 的網格。以便依照顏色深淺區分使用量。
                        `"
                        :content-img="'visMethods.jpeg'"
                    />
                    <span>
                        呈現捷運、公車以及 YouBike 的使用熱點；並進一步推論，透過大眾運輸通勤大內科的主要方式可能為：搭乘捷運至鄰近大內科的捷運西湖、港墘、或是松山站下車，再以公車或 YouBike 進入大內科園區。由於大部分的捷運線前往西湖、港墘站，都需多次轉乘，導致使用意願不高。以住在捷運士林站的通勤族為例，捷運加公車，至少需轉乘三次，相當耗費時間與精神。
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

