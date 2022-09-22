<template>
	<div class="carousel">
		<div class="carousel-header">
			<div class="carousel-btn">
				<button
					v-for="(slide, index) in tab" 
					:key="index"
					@click="selectPage(slide)"
					:class="{
						'slideActive': (currentTab === slide)
					}"
				>
					{{slide}}
				</button>
			</div>
			<ChartLabel :text="'工作人口數量'" :gradient="['#e3c5c7', '#cf181b']"/>
		</div>
		<div class="carousel-image">
			<div 
				v-for="(slide, index) in tab" 
				:key="index"
				:style="slideSelect(index)"
				:class="{
					'slideActive': (currentTab === slide)
				}"
			>
				<div 
					class="imgContainer"
					:style="{
						'background-image': `url(/img/tab/tab${index}.png)`,
					}"
				/>
			</div>
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
				"全區", "A區", "B區", "C區"
			],
			currentTab: "全區"
		}
	},
	methods: {
		selectPage(val){
			this.currentTab = val
		},
		slideSelect(index) {
			// const selectIndex = this.tab.findIndex( item => item == this.currentTab)
			// return {
			// 	left : `${(index-selectIndex)*100}%`
			// }
		}
	}
}
</script>

<style lang="scss" scoped>
.carousel{
	.carousel-image .imgContainer{
		height: 60vw;
		background-position-x: center;
		background-position-y: top;
		background-size: contain;
    	@media screen and (max-width:641px){
			height: 100%;
			background-size: cover;
		}
	}
}
</style>

