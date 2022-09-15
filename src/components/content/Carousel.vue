<template>
	<div id="carousel">
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
		<div class="carousel-image">
			<div 
				v-for="(slide, index) in tab" 
				:key="index"
				:style="slideSelect(index)"
				:class="{
					'slideActive': (currentTab === slide)
				}"
			>
				<img :src="`/img/tab/tab${index}.png`" :alt="`tab${index}`">
			</div>
		</div>
	</div>
</template>

<script>
export default {
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
			const selectIndex = this.tab.findIndex( item => item == this.currentTab)
			return {
				left : `${(index-selectIndex)*100}%`
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
	#carousel{
		padding-top: 0 !important;
		>*{
			display: flex;
			flex-direction: row;
			&.carousel-btn{
				button{
					border-bottom: 2px solid $blackColor;
					padding: .25rem .5rem;
					margin: .5rem;
					opacity: 0.3;
					&.slideActive{
						opacity: 1;
					}
				}
			}
			&.carousel-image{
				position: relative;
				height: 60vh;
				>div{
					position: absolute;
					transition: left 3s, opacity 1s;
					opacity: 0.1;
					z-index: 0;
					>*{
						width: 100%;
					}
					&.slideActive{
						opacity: 1;
						z-index: 1;
					}
				}
			}
		}
	}
</style>

