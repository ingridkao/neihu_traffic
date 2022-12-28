<template>
	<div id="HeaderCover"
		:style="{
			opacity: bgOpacity
		}"
	>
		<keep-alive>
			<div v-if="mobileDevice" id="gifWapper" />
			<VideoPlayer v-else id="videoWapper"/>
		</keep-alive>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
	name: "HeaderCover",
	computed: {
        mobileDevice(){
            return this.$store.state.mobileDevice
        },
        currStep() {
			return this.$store.state.step
		},
		bgOpacity(){
			return this.currStep == 0 ? 0.6: 0.9
		}
    },
	components: {
		VideoPlayer: defineAsyncComponent(() => import('@/components/header/VideoPlayer.vue'))
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
	#videoWapper, #gifWapper{
		position: absolute;
		width: 100%;
		height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
		z-index: 0;
	}
	#gifWapper{
		background-image: url('../../assets/video/studio_m.gif');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.vjs-loading-spinner{
		display: none;
	}
}
</style>
