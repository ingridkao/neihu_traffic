<template>
	<header id="HeaderPage" ref="headerPage">
		<!-- <keep-alive>
			<VideoPlayer id="videoWapper" v-if="!mobildDevice" :video-start="videoStart" @toggle="toggleVideoStatus"/>
		</keep-alive> -->
		<div id="contextWrapper">
			<div>
				<a :href="copyUrl" id="logoBox"><img :src="LOGO" alt="TUIC"></a>
				<div>
					<h1>{{$t('mainTitle')}}</h1>
					<h2>{{$t('subTitle')}}</h2>
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
	</header>
</template>

<script>
import LOGO from '@/assets/TUIC.svg'
import VideoPlayer from "@/components/VideoPlayer.vue"
import ScrollButton from "@/components/header/ScrollButton.vue"
import MobileDetect from 'mobile-detect'
const mobileDetect = new MobileDetect(window.navigator.userAgent)
export default {
	name: "HeaderPage",
	props:{ 
		step: {
            type: String,
            default: '0'
        }
	},
	components: {
		VideoPlayer, ScrollButton
	},
	data() {
		return {
			LOGO,
			timeout: null,
			videoStart: false,
			copyUrl: '#',
			mobildDevice: mobileDetect.phone()? true: false,
			showSlide: false
		}
	},
	beforeDestroy(){
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
	watch:{
		step(val, oldVal){
			if(val > 0 && this.videoStart){
				this.toggleVideoStatus(false)
			}else if(val == 0 && !this.videoStart){
				this.toggleVideoStatus(true)
			}
		}
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
        toggleVideoStatus(boolen){
            this.videoStart = boolen
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
#HeaderPage{
	position: relative;
	box-sizing: border-box;
    width: 100vw;
	height: 100vh;
	background-color: $blackColor;
	background-size: cover;
	background-position: center;
	// background-image: url('../assets/video/videoPoster.png');
	background-image: url('../assets/img/cover.png');
	>div{
		position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
		&#videoWapper{
			z-index: 0;
		}
		&#contextWrapper{
			box-sizing: border-box;
			padding: 2rem;
			color: $mainColor;
			background-color: transparent;
			display: flex;
			flex-direction: column;
			align-items: self-start;
			justify-content: space-around;
			z-index: 1;
			h1, h2{
				color: $blackColor;
			}
			footer{
				width: 100%;
				text-align: center;
			}
		}
	}
}
#logoBox{
	display: inline-block;
	text-align: left;
	height: 3rem;
    margin: 0.5rem;
	img{
		// filter: invert(1);
	}
}
.buttonBox{
	button{
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		margin: 0 .25rem;
		background-color: $blackColor;
		border-radius: 50%;
	}
}

#slideContainer{

}
#actionBox{
	position: fixed;
	z-index: 100;
	top: .75rem;
	right: 3.5rem;
	display: inline-flex;
	// @media screen and (min-width:1920px){}
	.fbBtn{
		background-image: url('../assets/icon/fb.svg');
	}
	.linkBtn{
		background-image: url('../assets/icon/link.svg');
	}
	.videoBtn{
		background-size: 65%;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		&.videoStart{
			background-image: url('../assets/icon/play.svg');
		}
		&.videoPause{
			background-image: url('../assets/icon/pause.svg');
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
