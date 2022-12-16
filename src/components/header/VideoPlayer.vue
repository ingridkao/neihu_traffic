<template>
    <div id="videoWapper"
        :style="{
            backgroundImage: `url( ${ require('@/assets/img/cover.png') } )`            
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
import VideoMp4 from '@/assets/video/studio.mp4'
videojs.options.hls.overrideNative = true
videojs.options.html5.nativeAudioTracks = false
videojs.options.html5.nativeVideoTracks = false
export default {
    name: "VideoPlayer",
    props: {
        videoStart: {
            type: Boolean,
            default: false
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
						src:VideoMp4
					}
				]
            }
        }
    },
    watch: {
        videoStart: {
            handler(newVal) {
                if(!this.player)return
                if(newVal){
                    this.player.play()
                }else{
                    this.player.pause()
                }
            }
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options)
        this.player.on('ready', () => {
            this.$emit('toggle', true)
        })
    },
    beforeUnmount() {
        if(!this.player)return
        this.player.dispose()
    }
}
</script>

<style lang="scss" scoped>
    @import "~video.js/dist/video-js.min.css";
    #videoWapper{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center; 
        .videoBox{
            height: 100vh;
            width: 100vw;
            video{
                height: 100%;
            }
        }
    }
</style>
<style>
    .vjs-loading-spinner:after{
        display: none !important;
    }
</style>