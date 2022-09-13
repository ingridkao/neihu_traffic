<template>
    <div id="slideContainer" class="buttonBox">
        <button id="slideBtn" @click="showAside = !showAside">
            <img v-if="showAside" :src="Close" alt="關閉" />
            <img v-else :src="Logo" alt="本文內容" class="svg_scroll"/>
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
        </aside>
    </div>
</template>

<script>
import Logo from '@/assets/TUIC.svg'
import Close from '@/assets/icon/close.svg'

export default {
	props:{ 
		step: {
            type: String,
            default: '0'
        }
	},
	watch:{
		step: {
            immediate: true,
            handler(val, oldVal){
                if(this.secActive) return
                if(val == 1){
                    this.secActive = 'content1'
                }
            }
        }
	},
    data(){
        return {
            showAside: false,
            Logo,
            Close,
            article: {
                "content1": "章節1",
                "content2": "章節2",
                "content3": "章節3",
                "content4": "章節4",
            },
            secActive: null
        }
    },
    methods: {
        scrollTo(key){
            this.secActive = key
            const target = document.getElementById(key)
            if(!target) return

            const offsetTarget = target.getBoundingClientRect()
            const targetTop = offsetTarget.top + window.pageYOffset
            window.scrollTo({
                top: targetTop
            })
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
    z-index: 1;
    #slideBtn{
        position: absolute;
        top: 0;
        right: 0;
        width: 2rem;
        height: 2rem;
        margin: .5rem 1rem;
        z-index: 2;
        img{
            width: 100%;
            height: 100%;
        }
    }
    aside{
        position: absolute;
        @extend %whiteCardShadow;
        width: $asideWidth;
        height: 100vh;
        top: 0;
        right: #{-$asideWidth};
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
</style>