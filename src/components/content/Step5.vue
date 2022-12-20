<template>
    <header class="carouselHeader">
        <h6>工作人口從哪來？士林、松山、汐止佔多數</h6>
        <p v-if="textShow1"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            大內科的工作人口，除了來自內湖當地，還有地緣上鄰近內湖的士林、南港以及汐止區，共佔15%。另外，居住於台北市中心的內科通勤族（松山、大安、信義以及中山區），約佔16%。
        </p>
        <p v-if="textShow2"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <span>如果我們將大內科以距捷運站距離，分成</span>
            <AnnotationTrigger :toggle="annotationToggle" :text="'A、B、C三區域'" @update="updateToggle"/>
            <span>
                ，可以更詳細的讀出，不同居住地的工作人口要往大內科的北端還是南端上班。由於A區鄰近文湖線，因此工作人口涵蓋雙北甚至到基隆，B、C區工作人口較多來自內湖及鄰近行政區。
            </span>
        </p>
        <AnnotationContent
            :dropdown="annotationToggle"
            :fix="'rowLayout'"
            :content="`
                <b>A區</b>：距離捷運文湖線 500 公尺內<br>
                <b>B區</b>：距離捷運文湖線 500 公尺外<br>
                <b>C區</b>：大安南段工業區                    
            `"
            @update="updateToggle"
        />
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
    </div>
</template>

<script>
import CarouselHeader from "@/components/carousel/CarouselHeader.vue"
import CarouselImage from "@/components/carousel/CarouselImage.vue"

export default {
	components:{
		CarouselHeader,
        CarouselImage
	},
    computed: {
        mobildDevice(){
            return this.$store.state.mobildDevice
        },
        currStep() {
			return this.$store.state.step
		},
        textShow1(){
            if(!this.mobildDevice) return true
            return this.currStep == 4
        },
        textShow2(){
            if(!this.mobildDevice) return true
            return !this.textShow1
        }
    },
    data(){
		return {
			tab: [
				{index: 'All', name: '全區'},
				{index: 'A', name: 'A區'},
				{index: 'B', name: 'B區'},
				{index: 'C', name: 'C區'},
			],
			currentTab: "All",
            annotationToggle: false
		}
	},
    methods: {
		selectPage(val){
			this.currentTab = val
		},
        updateToggle(boolen) {
            this.annotationToggle = boolen
        }
	}
}
</script>
<style lang="scss" scoped>
header{
    position: relative;
    max-width: calc(100vw - 20rem);
    @media screen and (max-width:501px){ // For mobile
        max-width: none;
    }
}
</style>

