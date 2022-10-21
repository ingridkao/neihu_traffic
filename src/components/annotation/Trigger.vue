<template>
    <button 
        class="annotationBtn"
        @click="trigger" 
    >
        {{text}}
        <span>
            {{toggle? '▲': '▼'}}註
        </span>
    </button>
</template>
<script>
export default {
	props:{
        toggle: {
            type: Boolean,
            default: false
        },
		text: {
            type: String,
            default: 'center'
        }
	},
    methods: {
        trigger(){
            this.$emit('update', !this.toggle)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.annotationBtn{
    border-bottom: 1px solid #999;
    padding-right: .25rem;
    font-size: 1rem;
    cursor: pointer;
    span{
        opacity: 0.5;
        font-size: 50%;
        pointer-events: none;
    }
}
</style>

