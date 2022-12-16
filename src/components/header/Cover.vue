<template>
	<div id="HeaderCover"
		:style="{
			opacity: bgOpacity
		}"
	>
		<keep-alive>
			<VideoPlayer id="videoWapper" :video-start="videoStart" @toggle="toggleVideoStatus"/>
		</keep-alive>
		<!-- <div id="imgWapper" :class="{show: step == 0}" /> -->
	</div>
</template>

<script>
import VideoPlayer from "@/components/header/VideoPlayer.vue"
export default {
	name: "HeaderCover",
	props:{ 
		videoStart: {
            type: Boolean,
            default: false
        }
	},
	computed: {
        step() {
			return this.$store.state.step
		},
		bgOpacity(){
			return this.step == 0 ? 0.6: 1
		}
    },
	components: {
		VideoPlayer
	},
	watch:{
		step(val, oldVal){
			if(val == 0 && !this.videoStart){
				this.toggleVideoStatus(true)
			}
			if(val > 1 && this.videoStart){
				this.toggleVideoStatus(false)
			} 
		}
	},
    methods: {
        toggleVideoStatus(boolen){
			this.$emit('toggle', boolen)
        }
    }
}
</script>
<style lang="scss" scoped>
#HeaderCover{
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 0;
	transition: opacity 1s ease;
	>div{
		position: absolute;
		width: 100%;
		height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
		// &#imgWapper{
		// 	width: 100%;
		// 	height: 100%;
		// 	background-size: cover;
		// 	background-position: center;
		// 	background-image: url('../../assets/img/cover.png');
		// 	opacity: 0.5;
		// 	transition: opacity 1s ease;
		// 	&.show{
		// 		opacity: 1;
		// 	}
		// }
		&#videoWapper{
			z-index: 0;
		}
	}
	.vjs-loading-spinner{
		display: none;
	}
}
</style>
