<template>
    <div id="slideContainer" 
        class="buttonBox" 
        :class="{active: showAside}"
        :style="scrollBind"
    >
        <button id="slideBtn" @click="showAside = !showAside">
            <img v-if="showAside" :src="Close" alt="關閉" />
            <img v-else :src="require('@/assets/img/tuic_logo_simple.svg')" alt="本文內容" class="svg_scroll">
        </button>
        <aside :class="{active: showAside}">
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
            <MainAction/>
        </aside>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import Close from '@/assets/icon/close.svg'
export default {
    props: {
        containerHeight: {
            type: Number,
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
                "chapter1": "內湖交通改善計畫：先了解大內科園區",
                "chapter2": "13萬的工作人口，大多居住在園區以外",
                "chapter3": "大內科通勤族，約有3成選擇大眾運輸",
                "chapter4": "從大眾運輸使用方式，分析通勤族的困境",
                "chapter5": "解決大內科交通問題，我們有哪些機會？"
            },
            secActive: null,
            scrollValue: 0
        }
    },
	mounted () {
		window.addEventListener("scroll", this.handleScroll)
	},
	beforeUnmount() {
	    window.removeEventListener('scroll', this.handleScroll)
	},
    methods: {
        scrollTo(key){
            this.secActive = key
            const target = document.getElementById(key)
            if(!target) return

            const offsetTarget = target.getBoundingClientRect()
            window.scrollTo({
                top: (offsetTarget.top + window.pageYOffset),
                behavior: 'smooth'
            })
        },
        handleScroll(){
			this.scrollValue = window.pageYOffset / (this.containerHeight - window.innerHeight)
		}
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
#slideContainer{
    position: fixed;
    width: 3.5rem;
    height: 3rem;
    top: 0;
    right: 0;
    z-index: 10;
    &.active{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
    }
    #slideBtn{
        position: absolute;
        top: 0;
        right: 0;
        width: 2rem;
        height: 2rem;
        margin: .5rem 1rem;
        z-index: 5;
        background-color: transparent;
        img{
            width: 100%;
        }
    }
    aside{
        position: absolute;
        @extend %whiteCardShadow;
        @extend %contentPadding;
        width: $mapGifWidth;
        height: 100vh;
        top: 0;
        right: #{-$mapGifWidth};
        transition: right 0.5s ease;
        &.active{
            right: 0;
        }
        ul{
            list-style-type: none;
            margin-top: 5rem;
            li{
                padding: .5rem 1rem;
                color: $blackColor;
                cursor: pointer;
                &.active{
                    position: relative;
                    &:before{
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
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
	animation: rotate 1s linear infinite;
	animation-play-state: paused;
	animation-delay: calc(var(--scroll) * -1s);

	animation-iteration-count: 1;
	animation-fill-mode: both;
	&.svgImg{
		position: fixed;
		z-index: 1000;
		top: 50%;
		left: 50%;
		margin-top: -50px;
		margin-left: -50px;
	}
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>