<script setup>
	import { useStore } from 'vuex'
	import MobileDetect from 'mobile-detect'

	import Home from '@/views/Home.vue'
	import Footer from '@/views/Footer.vue'

	const store = useStore()
	const mobileDetect = new MobileDetect(window.navigator.userAgent)
	const isMpbile = mobileDetect.phone() || document.body.clientWidth <= 600
	store.commit('updateMobildDevice', isMpbile? true: false)
</script>
<template v-cloak>
	<Home/>
	<Footer/>
	{{isMpbile? 1: 0}}
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,500,600&display=swap&subset=chinese-traditional');
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/reset.scss';
[v-cloak] { display:none; }
#app {
	font-family: "Noto Sans TC", "Microsoft Yahei", "微軟雅黑", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
    background: $whiteColor;
	color: $blackColor;
}
</style>
