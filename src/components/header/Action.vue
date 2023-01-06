<template>
	<div class="buttonBox buttonActionBox">
		<button class="fbBtn" @click.prevent="shareToFb"/>
		<button 
			class="linkBtn" 
			:class="{active: copySuccess}"
			@click.prevent="copyURL"
		/>
		<button 
			v-if="!mobileDevice"
			class="videoBtn"
			:class="videoStart? 'videoPause': 'videoStart'" 
			@click="toggleVideoStatus"
		/>
		<!-- <button id="translateToggle" :title="$t('langTranslate')" @click="toggleLocaleLang">{{$t('langZh')}}</button> -->
	</div>
</template>

<script>
export default {
	computed: {
        mobileDevice(){
            return this.$store.state.mobileDevice
        },
		videoStart() {
			return this.$store.state.videoStart
		}
	},
	data() {
		return {
			currentUrl: '#',
			timer: null,
			copySuccess: false
		}
	},
	created(){
		this.checkParentLang()
	},
	mounted(){
		this.currentUrl = window.location.href
	},
    destroyed(){
		if(this.timer){
			clearInterval(this.timer)
		}
    },
    methods: {
        shareToFb(){
            window.open(`http://www.facebook.com/sharer.php?u=${encodeURIComponent(this.currentUrl)}`)
            this.$gtag.event('share_to_fb', {
                event_category: 'neihu_traffic'
            })
        },
        copyURL(){
            if(navigator.clipboard){
				navigator.clipboard.writeText(this.currentUrl).then(() => {
					this.copySuccess = true
					this.timer = setInterval(()=>{
						this.copySuccess = false
					}, 5000)
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
			this.$gtag.event('action', {
                event_category: 'neihu_traffic',
                event_label: 'copyURL'
            })
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
        toggleVideoStatus(boolen){
			this.$store.commit('toggleVideoStatus', !this.videoStart)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/action.scss';
</style>