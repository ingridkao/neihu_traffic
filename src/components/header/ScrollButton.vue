<template>
    <button id="scroll_button" @click="scrollTo()"/>    
</template>

<script>
export default {
    methods: {
        scrollTo(){
            // const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            const innerHeight =  window.innerHeight
			let count = 0
            for( let i = 0; i <  innerHeight; i++ ) {
                this.timeout = window.setTimeout(()=> {
                    count = count + 1
                    window.scrollTo({
                        top: count
                    })
                }, 0.5 * i)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
#scroll_button{
	width: 4.75rem;
	height: 4.75rem;
    outline: none;
	background-image: url('../../assets/icon/scroll.svg');
	filter: invert(0.8) drop-shadow(2px 4px 6px rgba($blackColor, 0.9));
	&:hover{
		filter: invert(1) drop-shadow(2px 4px 3px $blackColor);
	}
}
</style>