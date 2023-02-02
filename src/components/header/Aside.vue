<template>
    <div id="slideContainer" 
        class="buttonBox" 
        :class="{active: showAside}"
        :style="scrollBind"
    >
        <button class="slideBtn" @click="showAside = !showAside">
            <img v-if="showAside" :src="Close" alt="關閉Close" />
            <img v-else :src="require('@/assets/icon/detail.png')" alt="摘要連結" class="svg_scroll">
        </button>
        <aside :class="{active: showAside}">
            <MainAction :video-btn-show="false"/>
            <h6>{{$t("contentLink")}}</h6>
            <ul>
                <li 
                    v-for="(item, key) in article" 
                    :key="key" 
                    :class="{active: secActive === key}"
                    @click="scrollTo(key)"
                >
                    {{item}}
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import Close from '@/assets/icon/close.svg'
export default {
    props: {
        containerHeight: {
            type: Number
        }
    },
	components: {
		MainAction: defineAsyncComponent(() => import('@/components/header/Action.vue'))
	},
	computed: {
        step() {
			return this.$store.state.step
		},
        scrollBind() {
			return {
				'--scroll': this.scrollValue
			}
		}
    },
	watch:{
		step: {
            immediate: true,
            handler(val, oldVal){
                if(this.secActive) return
                if(val == 1){
                    this.secActive = 'chapter1'
                }
            }
        }
	},
    data(){
        return {
            showAside: false,
            Close,
            article: {
                "chapter1": this.$t("article.step2.title"),
                "chapter2": this.$t("article.step4.title"),
                "chapter3": this.$t("article.step6.title"),
                "chapter4": this.$t("article.step9.title"),
                "chapter5": this.$t("article.step13.title")
            },
            secActive: null,
            pageYOffset: 0,
            scrollValue: 0
        }
    },
	mounted () {
		document.addEventListener("scroll", this.handleScroll)
        document.addEventListener("click", this.bodyCloseAside)
	},
	beforeUnmount() {
	    document.removeEventListener('scroll', this.handleScroll)
        document.removeEventListener("click", this.bodyCloseAside)
	},
    methods: {
        scrollTo(key){
            this.secActive = key
            const target = document.getElementById(key)
            if(!target) return

            const offsetTarget = target.getBoundingClientRect()
            
            window.scrollTo({
                top: (offsetTarget.top + this.pageYOffset),
                behavior: 'smooth'
            })
            this.$gtag.event('scroll_aside', {
                event_category: 'neihu_traffic_action'
            })
        },
        handleScroll(){
            const innerHeight = window.innerHeight
            this.pageYOffset = window.pageYOffset
			this.scrollValue = this.pageYOffset / (this.containerHeight - innerHeight)
            this.$store.commit('updateContentEnter', this.pageYOffset >= innerHeight*2)
		},
        bodyCloseAside(e) {
            if(!this.showAside)return
            if(!(e.target && e.target.className))return
            const classList = e.target.className.split(' ')
            this.showAside = !classList.includes('buttonBox')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
#slideContainer{
    @extend %fixedLayout;
    width: 3.5rem;
    height: 3rem;
    z-index: 50;
    &.active{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
    }
    .slideBtn{
        @extend %absoluteLayout;
        width: 2rem;
        height: 2rem;
        margin: .5rem 1.5rem .5rem .5rem;
        z-index: 5;
        background-color: transparent;
        img{
            width: 100%;
        }
    }
    aside{
        @extend %whiteCardShadow;
        @extend %contentPadding;
        @extend %absoluteLayout;
        right: #{-$mapGifWidth};
        width: $mapGifWidth;
        height: 100vh;
        transition: right 0.5s ease;
        padding-top: 4rem;
        &.active{
            right: 0;
        }
        h6{
            margin: 2rem 0;
        }
        ul{
            list-style-type: none;
            li{
                padding: .5rem 1rem;
                color: $blackColor;
                cursor: pointer;
                &.active{
                    position: relative;
                    &:before{
                        content: "";
                        @extend %absoluteLeftLayout;
                        border-radius: 2px;
                        width: 4px;
                        height: 100%;
                        background-color: $blackColor;
                    }
                }
            }
        }
    }
}
.svg_scroll{
	// animation: rotate 1s linear infinite;
	// animation-play-state: paused;
	// animation-delay: calc(var(--scroll) * -1s);

	// animation-iteration-count: 1;
	// animation-fill-mode: both;
	&.svgImg{
		position: fixed;
		z-index: 1000;
		top: 50%;
		left: 50%;
		margin-top: -50px;
		margin-left: -50px;
	}
}
// @keyframes rotate {
//   to {
//     transform: rotate(360deg);
//   }
// }
</style>