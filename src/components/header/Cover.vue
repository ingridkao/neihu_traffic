<template>
	<div id="HeaderCover">
		<div id="imgWapper" :class="{show: step == 0}" />
		<!-- <keep-alive>
			<VideoPlayer id="videoWapper" v-if="!mobildDevice" :video-start="videoStart" @toggle="toggleVideoStatus"/>
		</keep-alive> -->
	</div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue"
export default {
	name: "HeaderCover",
	props:{ 
		step: {
            type: String,
            default: '0'
        },
		videoStart: {
            type: Boolean,
            default: false
        }
	},
	components: {
		VideoPlayer
	},
	watch:{
		step(val, oldVal){
			if(val > 0 && this.videoStart){
				this.toggleVideoStatus(false)
			}else if(val == 0 && !this.videoStart){
				this.toggleVideoStatus(true)
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
	background-color: #ddd;
	z-index: 0;
	width: 100%;
	height: 100%;
	>div{
		position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
		&#imgWapper{
			width: 100%;
			height: 100%;
			background-size: cover;
			background-position: center;
			// background-image: url('../assets/video/videoPoster.png');
			background-image: url('../../assets/img/cover.png');
			opacity: 0.5;
			transition: opacity 1s ease;
			&.show{
				opacity: 1;
			}
		}
		&#videoWapper{
			z-index: 0;
		}
	}
}
</style>
