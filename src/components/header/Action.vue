<template>
	<div id="headerActionWrapper" class="space-between">
		<div style="flex-basis: 30vh;"/>
		<div class="titleBox">
			<a :href="copyUrl" class="logoBox">
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
			<input type="hidden" id="webURL" :value="copyUrl">
			<button class="fbBtn" @click="shareToFb($event)"/>
			<button class="linkBtn" @click="copyURL($event)"/>
			<button 
				v-if="videoBtnShow" 
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
		},
		videoBtnShow(){
			return this.currStep == 0 && !this.mobildDevice
		}
	},
	data() {
		return {
			timeout: null,
			copyUrl: '#',
			showSlide: false
		}
	},
	beforeUnmount(){
		if(this.timeout){
			clearTimeout(this.timeout)
		}
	},
	created(){
		this.checkParentLang()
	},
	mounted(){
		this.copyUrl = window.location.href
	},
    methods: {
        shareToFb(e){
            e.preventDefault()
            window.open(`http://www.facebook.com/sharer.php?u=${encodeURIComponent(this.copyUrl)}`)
        },
        copyURL(e){
            e.preventDefault()
            if(window.innerWidth > 768){
				const webURLSelect = document.querySelector('#webURLwebURL')
				webURLSelect.setAttribute('type', 'text')
				webURLSelect.select()
                document.execCommand("copy")
				/* unselect the range */
				webURLSelect.setAttribute('type', 'hidden')
				window.getSelection().removeAllRanges()
            }else if (navigator.share) {
				navigator.share({
					title: this.$t('mainTitle'),
					text: this.$t('pageDesc'),
					url: this.copyUrl,
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
