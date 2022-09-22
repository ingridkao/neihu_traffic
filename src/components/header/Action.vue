<template>
	<div id="headerActionWrapper" class="block_scrollama">
		<div style="flex-basis: calc(50% - 5rem);"/>
		<div>
			<a :href="copyUrl" id="logoBox"><img :src="LOGO" alt="TUIC"></a>
			<div>
				<h2>{{$t('mainTitle2')}}</h2>
				<h1>{{$t('mainTitle')}}</h1>
				<h3>{{$t('subTitle')}}</h3>
			</div>
		</div>
		<p v-if="mobildDevice">{{$t('suggest')}}</p>
		<div id="actionBox" class="buttonBox">
			<input type="hidden" id="webURL" :value="copyUrl">
			<button class="fbBtn" @click="shareToFb($event)"/>
			<button class="linkBtn" @click="copyURL($event)"/>
			<!-- <button v-if="step == 0 && !mobildDevice" :class="['videoBtn',videoStart? 'videoPause': 'videoStart']" @click="videoStart = !videoStart"/> -->
			<button id="translateToggle" :title="$t('langTranslate')" @click="toggleLocaleLang">{{$t('langZh')}}</button>
		</div>
		<footer>
			<ScrollButton/>
		</footer>
	</div>
</template>

<script>
import LOGO from '@/assets/TUIC.svg'
import ScrollButton from "@/components/header/ScrollButton.vue"
import MobileDetect from 'mobile-detect'
const mobileDetect = new MobileDetect(window.navigator.userAgent)
export default {
	name: "HeaderPage",
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
		ScrollButton
	},
	data() {
		return {
			LOGO,
			timeout: null,
			copyUrl: '#',
			mobildDevice: mobileDetect.phone()? true: false,
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
		}
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
$mainColor: darken($whiteColor, 25);
#headerActionWrapper{
	display: flex;
	flex-direction: column;
	align-items: self-start;
	justify-content: space-between;
	z-index: 1;
	padding: 3rem;
	h1, h2, h3{
		color: $blackColor;
	}
	footer{
		width: 100%;
		text-align: center;
	}
}

#logoBox{
	display: inline-block;
	text-align: left;
	height: 3rem;
    margin: 0.5rem;
}

#actionBox{
	position: fixed;
	z-index: 100;
	top: .75rem;
	right: 1rem;
    width: 11rem;
    height: 1.5rem;

	display: inline-flex;
	.fbBtn{
		background-image: url('../../assets/icon/fb.svg');
	}
	.linkBtn{
		background-image: url('../../assets/icon/link.svg');
	}
	.videoBtn{
		background-size: 65%;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		&.videoStart{
			background-image: url('../../assets/icon/play.svg');
		}
		&.videoPause{
			background-image: url('../../assets/icon/pause.svg');
		}
	}
	#translateToggle{
		font-weight: 500;
		font-size: 1rem;
		width: auto;
		padding: 0 0.25rem;
		color: darken($whiteColor, 10);
		border-radius: 0.25rem;
		&:hover{
			color: $whiteColor;
		}
	}
}
</style>
