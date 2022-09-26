<template>
	<div class="carousel">
		<div class="carousel-header">
			<div class="carousel-btn">
				<button
					v-for="(slide) in tab" 
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
				v-for="(slide) in tab" 
				:key="slide.index"
				:style="slideSelect(slide.index)"
				:class="{
					'slideActive': (currentTab === slide.index)
				}"
			>
				<div 
					class="imgContainer"
					:style="{
						'background-image': 'url('+ require(`@/assets/img/tab/${slide.index}.jpg`)+')',
					}"
				/>
			</div>
			<ChartLabel :text="'工作人口數量'" :gradient="['#e3c5c7', '#cf181b']"/>
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
		},
		slideSelect(index) {
			const selectIndex = this.tab.findIndex( item => item == this.currentTab)
			return {
				left : `${(index-selectIndex)*100}%`
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.carousel{
	.carousel-image{
		.imgContainer{
			height: 80vh;
			background-size: contain;
			background-position-x: center;
			background-position-y: top;
		}
	}
}
</style>

