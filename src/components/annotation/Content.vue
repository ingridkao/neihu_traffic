<template>
    <div :class="[
        'annotationDropdown',
        fix,
        {open: dropdown},
    ]" >
        <p class="annotationContent" v-html="content"/>
        <img 
            v-if="contentImg !== ''" 
            class="annotationImage"
            :src="require(`@/assets/img/${contentImg}`)" :alt="text"
        />
    </div>
</template>
<script>
const includeEl = ["annotationBtn", "annotationDropdown", "annotationContent", "annotationImage"]
export default {
	props:{
        dropdown: {
            type: Boolean,
            default: false
        },
        fix: {
            type: String,
            default: ''
        },
		content: {
            type: String,
            default: ''
        },
        contentImg: {
            type: String,
            default: ''
        },
		text: {
            type: String,
            default: ''
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
            this.$emit('update', false)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.annotationDropdown{
    width: 100%;
    height: auto;
    padding: .25rem;
    font-size: .8rem;
    opacity: 0;
    transition: opacity 1s 0.5s;
    z-index: 1;
    .annotationContent{
        visibility: hidden;
        margin: 0;
    }
    .annotationImage{
        width: 100%;
        padding: .5rem;
    }
    &.open{
        opacity: 1;
        border-radius: .25rem;
        background-color: $whiteColor;
        border: 1px dashed rgba($blackColor, 0.3);
        .annotationContent{
            visibility: visible;
        }
    }
    &.bottom{
        position: absolute;
        width: 110%;
        left: -5%;
        top: 92.5%;
        z-index: 1;
        &.left{
            left: 0;
            pointer-events: none;
        }
        &.right{
            left: auto;
            right: 0;
            pointer-events: none;
        }
    }
    &.rowLayout{
        position: absolute;
        z-index: 1;
        bottom: 0;
        width: 16rem;
        right: -16rem;
        @media screen and (max-width:501px){
            position: relative;
            width: 100%;
            left: 0;
        }
    }
}
</style>