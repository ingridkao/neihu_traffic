<script setup>
	import { onMounted, onBeforeMount } from "vue"
	import { useStore } from 'vuex'
	import MobileDetect from 'mobile-detect'
	import Home from '@/views/Home.vue'
	import Footer from '@/views/Footer.vue'
	const stores = useStore()
    const resizeWindow = () => {
      	const mobileDetect = new MobileDetect(window.navigator.userAgent)
		const isMpbile = mobileDetect.phone() || document.body.clientWidth <= 600
		stores.commit('updatemobileDevice', isMpbile? true: false)
	}
	onBeforeMount(() => {
		window.removeEventListener('resize', resizeWindow);
		resizeWindow()
	})
</script>

<template v-cloak>
	<Home/>
	<Footer/>
</template>