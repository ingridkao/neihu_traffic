<script setup>
	import { onMounted, onUnmounted } from "vue"
	import { useStore } from 'vuex'
	import Header from '@/views/Header.vue'
	import Home from '@/views/Home.vue'
	import Footer from '@/views/Footer.vue'
	const stores = useStore()
    const resizeWindow = () => {
		const isMpbile = document.body.clientWidth <= 600
		stores.commit('updatemobileDevice', isMpbile? true: false)
	}
	onMounted(()=>{
		window.addEventListener('resize', resizeWindow)
		resizeWindow()
	}) 
	onUnmounted(()=>{
		window.removeEventListener('resize', resizeWindow)
	}) 
</script>

<template v-cloak>
	<Header/>
	<Home/>
	<Footer/>
</template>