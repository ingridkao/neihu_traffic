<template>
    <div id="videoWapper"
        :style="{
            backgroundImage: `url( ${ require('@/assets/img/tuic_logo_simple.svg') } )`            
        }"
    >
        <video 
            ref="videoPlayer" 
            class="videoBox"
        />
    </div>
</template>

<script>
//https://ithelp.ithome.com.tw/articles/10205387
import videojs from 'video.js'
videojs.options.hls.overrideNative = true
videojs.options.html5.nativeAudioTracks = false
videojs.options.html5.nativeVideoTracks = false
export default {
    name: "VideoPlayer",
	computed: {
		videoStart() {
			return this.$store.state.videoStart
		},
        currStep() {
			return this.$store.state.step
		}
    },
    data() {
        return {
            player: null,
            options:{
				controls: false,
				autoplay: true,
                preload: 'auto',
				muted: 'muted',
                loop: true,
				sources: [
                    {
                        type: "video/mp4",
						src: require("@/assets/video/studio_d.mp4")
					}
				]
            }
        }
    },
    watch: {
		currStep(newVal){
			if(newVal == 0 && !this.videoStart) {
                this.$store.commit('toggleVideoStatus', false)
            }else if(newVal > 1 && this.videoStart){
                this.$store.commit('toggleVideoStatus', true)
            }
		},
        videoStart(newVal){
            if(!this.player)return
            if(newVal){
                this.player.play()
            }else{
                this.player.pause()
            }
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options)
        this.player.on('ready', () => {
            this.$store.commit('toggleVideoStatus', true)
        })
    },
    beforeUnmount() {
        if(!this.player)return
        this.player.dispose()
    }
}
</script>
<style>
    .vjs-loading-spinner:after{
        display: none !important;
    }
</style>