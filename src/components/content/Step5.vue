<template>
	<div class="block_scrollama contextbox carouselContainer">
        <header>
            <h6>工作人口從哪來？士林、松山、汐止佔多數</h6>
            <p>大內科的工作人口，除了來自內湖當地，還有地緣上鄰近內湖的士林、松山、南港以及汐止區，共佔19% 。另外，居住於台北市中心的內科通勤族（大安、信義以及中山區），約佔12%。</p>
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
                    ，可以更詳細的讀出，不同居住地的工作人口要往大內科的北端還是南端上班。由於 A 區鄰近文湖線，因此工作人口涵蓋雙北甚至到基隆，B、C區工作人口較多來自內湖及鄰近行政區。
                </span>
            </p>
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
                :label="'工作人口數量'" 
                :gradient="['#e3c5c7', '#cf181b']"
                :imgURL="'tab'"
                @update="selectPage"
            />
			<div 
				class="imgLabelContainer"
				:style="{
                    backgroundImage: `url(${require('@/assets/img/zone.png')})`,
				}"
			/>
        </div>
	</div>
</template>

<script>
import Annotation from "@/components/content/Annotation.vue"
import CarouselHeader from "@/components/carousel/CarouselHeader.vue"
import CarouselImage from "@/components/carousel/CarouselImage.vue"

export default {
	components:{
        Annotation,
		CarouselHeader,
        CarouselImage
	},
    data(){
		return {
			tab: [
				{index: 'All', name: '全區'},
				{index: 'A', name: 'A區'},
				{index: 'B', name: 'B區'},
				{index: 'C', name: 'C區'},
			],
			currentTab: "All"
		}
	},
    methods: {
		selectPage(val){
			this.currentTab = val
		}
	}
}
</script>
<style lang="scss" scoped>
.carouselContainer>header{
    max-width: 60rem;
}
</style>

