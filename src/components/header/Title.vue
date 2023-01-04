<template>
	<div id="headerTitle" class="space-between">
		<div></div>
		<div class="titleBox">
			<a :href="currentUrl" class="logoBox">
				<img :src="require('@/assets/img/tuic_logo_simple.svg')" :alt="$t('TUIC')">
			</a>
			<div>
				<h2>{{$t('mainTitle2')}}</h2>
				<h1>{{$t('mainTitle')}}</h1>
				<h3>{{$t('subTitle')}}</h3>
			</div>
		</div>
		<p v-if="mobileDevice">{{$t('suggest')}}</p>
		<MainAction v-if="!mobileDevice"/>
		<footer>
			<ScrollButton/>
		</footer>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
	components: {
		MainAction: defineAsyncComponent(() => import('@/components/header/Action.vue')),
		ScrollButton: defineAsyncComponent(() => import('@/components/header/ScrollButton.vue'))
	},
	computed: {
        mobileDevice(){
            return this.$store.state.mobileDevice
        }
	},
	data() {
		return {
			currentUrl: '#',
		}
	},
	mounted(){
		this.currentUrl = window.location.href
	}
}
</script>