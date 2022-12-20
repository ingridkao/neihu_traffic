<template>
	<div id="headerActionWrapper" class="space-between">
		<div style="flex-basis: 30vh;"/>
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
		<p v-if="mobildDevice">{{$t('suggest')}}</p>
		<div class="buttonBox buttonActionBox">
			<button class="fbBtn" @click.prevent="shareToFb"/>
			<button class="linkBtn" @click.prevent="copyURL"/>
			<button 
				class="videoBtn"
				:class="videoStart? 'videoPause': 'videoStart'" 
				@click="toggleVideoStatus"
			/>
			<!-- <button id="translateToggle" :title="$t('langTranslate')" @click="toggleLocaleLang">{{$t('langZh')}}</button> -->
		</div>
		<footer>
			<ScrollButton/>
		</footer>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
	name: "HeaderPage",
	components: {
		ScrollButton: defineAsyncComponent(() => import('@/components/header/ScrollButton.vue'))
	},
	props:{ 
		videoStart: {
            type: Boolean,
            default: false
        }
	},
	computed: {
        mobildDevice(){
            return this.$store.state.mobildDevice
        },
		currStep() {
			return this.$store.state.step
		}
	},
	data() {
		return {
			currentUrl: '#',
		}
	},
	created(){
		this.checkParentLang()
	},
	mounted(){
		this.currentUrl = window.location.href
	},
    methods: {
        shareToFb(){
            window.open(`http://www.facebook.com/sharer.php?u=${encodeURIComponent(this.currentUrl)}`)
        },
        copyURL(){
            if(navigator.clipboard){
				navigator.clipboard.writeText(this.currentUrl).then(() => {
					console.log(1);
				})
            }else if(navigator.share) {
				navigator.share({
					title: this.$t('mainTitle'),
					text: this.$t('pageDesc'),
					url: this.currentUrl,
				})
				.then(() => console.log('Successful share'))
				.catch((error) => console.log('Error sharing', error));
			}
        },
		getCookie(name) {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2) return parts.pop().split(';').shift();
		},
		checkParentLang(){
			const TuicWebLang = this.getCookie('tuic_i18n_redirected')
			const FollowLocal = localStorage.getItem("followParent")
			if(!TuicWebLang)return
			if(FollowLocal)return
			if(TuicWebLang === 'zh'){
				this.$i18n.locale = 'zh-TW'
			}else if(TuicWebLang === 'en'){
				this.$i18n.locale = 'en-US'
			}
			localStorage.setItem("followParent", TuicWebLang)
			localStorage.setItem("locale", this.$i18n.locale)
		},
		toggleLocaleLang(){
			this.$i18n.locale = this.$i18n.availableLocales.find(lang => lang !== this.$i18n.locale)
			localStorage.setItem("locale", this.$i18n.locale)
			location.reload()
		},
		toggleVideoStatus(){
			this.$emit('toggle', !this.videoStart)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/header.scss';
</style>
