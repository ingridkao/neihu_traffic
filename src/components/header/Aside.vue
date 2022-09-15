<template>
    <div id="slideContainer" class="buttonBox">
        <button id="slideBtn" @click="showAside = !showAside">
            <img v-if="showAside" :src="Close" alt="關閉" />
            <img v-else :src="Logo" alt="本文內容" class="svg_scroll" />
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
                    this.secActive = 'chapter1'
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
                "chapter1": "內湖交通改善計畫：先了解大內科園區",
                "chapter2": "大內科的工作人口從哪來？士林、松山、汐止佔多數",
                "chapter3": "哪一區的通勤人口最少使用大眾運輸？"
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
            window.scrollTo({
                top: (offsetTarget.top + window.pageYOffset)
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
</style>