<template>
	<header id="headerMain">
		<div id="headerCover">
			<keep-alive>
				<div v-if="mobileDevice" id="gifWapper" />
				<VideoPlayer v-else id="videoWapper"/>
			</keep-alive>
		</div>
		<HeaderTitle/>
		<Step1/>
	</header>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
	name: "HeaderCover",
	computed: {
        mobileDevice(){
            return this.$store.state.mobileDevice
        }
    },
	components: {
		HeaderTitle: defineAsyncComponent(() => import('@/components/header/Title.vue')),
		VideoPlayer: defineAsyncComponent(() => import('@/components/header/VideoPlayer.vue')),
		Step1: defineAsyncComponent(() => import('@/components/content/Step1.vue'))
	}
}
</script>
<style lang="scss">
@import '@/assets/scss/header.scss';
</style>
