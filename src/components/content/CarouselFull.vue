<template>
	<div class="carousel">
		<div class="carousel-header">
			<div class="carousel-btn">
				<button
					v-for="slide in tab" 
					:key="slide.index"
					@click="selectPage(slide.index)"
					:class="{
						'slideActive': (currentTab === slide.index)
					}"
				>
					{{slide.name}}
				</button>
			</div>
		</div>
		<div class="carousel-image">
			<div 
				v-for="(slide, index) in tab" 
				:key="slide.index"
				:style="slideSelect(index)"
				:class="{
					'slideActive': (currentTab === slide.index)
				}"
			>
				<div 
					class="imgContainer"
					:style="{
						'background-image': 'url('+ require(`@/assets/img/transportation/${slide.index}.jpg`)+')',
					}"
				/>
			</div>
			<ChartLabel :text="'熱門上車點'" :gradient="['#e5eed6', '#78c17a']"/>
		</div>
	</div>
</template>

<script>
import ChartLabel from "@/components/content/ChartLabel.vue"
export default {
	components:{
		ChartLabel
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
		},
		slideSelect(index) {
			const selectIndex = this.tab.findIndex( item => item.index == this.currentTab)
			return {
				left : `${(index-selectIndex)*100}%`,
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.carousel{
    .carousel-image {
		.imgContainer{
			height: 85vh;
			background-size: cover;
			background-position-x: center;
			background-position-y: center;
		}
	}
}
</style>

