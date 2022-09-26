<template>
	<div class="block_scrollama contextbox carouselContainer">
        <header>
            <h6>工作人口從哪來？士林、松山、汐止佔多數</h6>
            <p>運用電信數據除了能掌握區域內的工作人口數量外，更可以進一步解析工作人口的實際居住地。由下圖可知，大內科的工作人口，除了來自內湖當地，還有地緣上鄰近內湖的士林、松山、南港以及汐止，共佔 19 % 。另外，從市中心出發的大安、信義、中山，總計佔了 11 % 。</p>
            <p>
                <span>如果我們將大內科以距捷運站距離，分成</span>
                <Annotation 
                    :text="'A、B、C三區域'" 
                    :content="`
                        <b>A區</b>：距離捷運文湖線 500 公尺內<br>
                        <b>B區</b>：距離捷運文湖線 500 公尺外<br>
                        <b>C區</b>：大安南段工業區                    
                    `"
                />
                <span>
                    可以更詳細的讀出，不同居住地的工作人口要往大內科的北端還是南端上班。由於 A 區鄰近文湖線，因此工作人口涵蓋雙北甚至到基隆，B、C區工作人口較多來自內湖及鄰近行政區。
                </span>
            </p>
        </header>
        <Carousel/>
	</div>
</template>

<script>
import Annotation from "@/components/content/Annotation.vue"
import Carousel from "@/components/content/Carousel.vue"

export default {
	components:{
        Annotation,
		Carousel
	}
}
</script>
<style lang="scss" scoped>
.carouselContainer>header{
    max-width: 60rem;
}
</style>

