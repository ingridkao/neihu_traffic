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
            default: ''
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
@import '@/assets/scss/annotation.scss';
</style>