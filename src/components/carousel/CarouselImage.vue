<template>
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
					'background-image': 'url('+ require(`@/assets/img/${imgURL}/${slide.index}.jpg`)+')',
				}"
			/>
		</div>
		<ChartLabel :text="label" :gradient="gradient"/>
	</div>
</template>

<script>
import ChartLabel from "@/components/content/ChartLabel.vue"

export default {
    props: {
        tab: {
            type: Array
        },
		currentTab: {
			type: String
		},
		gradient: {
			type: Array
		},
		label: {
			type: String
		},
		imgURL: {
			type: String
		}
    },
	components:{
		ChartLabel
	},
	methods: {
		slideSelect(index) {
			const selectIndex = this.tab.findIndex( item => item.index == this.currentTab)
			return {
				left : `${(index-selectIndex)*100}%`
			}
		}
	}
}
</script>

