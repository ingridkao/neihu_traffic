<template>
	<span class="annotationBox">
        <button @click="dropdown = !dropdown" class="annotationBtn">
            {{text}}
            <span>
                {{dropdown? '▲': '▼'}}註
            </span>
        </button>
		<div :class="{open: dropdown}" class="annotationDropdown">
			<p class="annotationContent" v-html="content"/>
            <img 
                v-if="contentImg !== ''" 
                class="annotationImage"
                :src="require(`@/assets/img/${contentImg}`)" :alt="text"
            />
		</div>
	</span>
</template>

<script>
const includeEl = ["annotationBox", "annotationBtn", "annotationDropdown", "annotationContent", "annotationImage"]
export default {
	props:{ 
		text: {
            type: String,
            default: 'center'
        },
		content: {
            type: String,
            default: ''
        },
        contentImg: {
            type: String,
            default: ''
        }
	},
    data(){
        return {
            dropdown: false
        }
    },
    mounted() {
        document.addEventListener("click", this.bodyClosePopover)
    },
    beforeUnmount() {
        document.removeEventListener("click", this.bodyClosePopover)
    },
    methods: {
        bodyClosePopover(e) {
            if(!this.dropdown)return
            if(e.target && e.target.classList.value && includeEl.includes(e.target.classList.value)) return
            this.dropdown = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.annotationBox{
    .annotationBtn{
        border-bottom: 1px solid #999;
        padding: 0 .25rem;
        font-size: 0.9rem;
        outline: none;
        cursor: pointer;
        span{
            opacity: 0.5;
            font-size: 50%;
            pointer-events: none;
        }
    }
	.annotationDropdown{
        display: none;
        position: absolute;
        top: 2rem;
        left: 0;
        width: 100%;
        height: 0;
        z-index: 1;
        background-color: $whiteColor;
        transition: height 0.5s ease;
        font-size: .8rem;
        .annotationContent{
            display: none;
            margin: 0;
        }
        .annotationImage{
            width: 100%;
            padding: .5rem;
        }
        &.open{
            display: block;
            height: auto;
            border-radius: .25rem;
            border: 1px dashed rgba($blackColor, 0.3);
            padding: .25rem;
            .annotationContent{
                display: block;
                margin-bottom: 0 !important;
            }
        }
	}
}
</style>

