<template>
	<span class="annotationBox">
        <span class="annotationText">
            {{text}}
            <button @click="dropdown = !dropdown" class="annotationBtn">註{{dropdown? '▲': '▼'}}</button>
        </span>
		<div :class="{open: dropdown}" class="annotationDropdown">
			<p class="annotationContent">{{content}}</p>
		</div>
	</span>
</template>

<script>
const includeEl = ["annotationBox", "annotationText", "annotationBtn", "annotationDropdown", "annotationContent"]
export default {
	props:{ 
		text: {
            type: String,
            default: 'center'
        },
		content: {
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
    position: relative;
    .annotationText{
        font-weight: bold;
        padding: 0;
        .annotationBtn{
            cursor: pointer;
            padding: 0;
        }
    }
	.annotationDropdown{
        position: absolute;
        top: 1.5em;
        left: 0;
        width: 50vw;
        height: 0;
        background-color: $whiteColor;
        transition: height 0.5s ease;
        .annotationContent{
            display: none;
            margin: 0;
        }
        &.open{
            height: auto;
            border-radius: .25rem;
            border: 1px solid rgba($blackColor, 0.3);
            padding: .5rem;
            .annotationContent{
                display: block;
            }
        }
	}
}
</style>

