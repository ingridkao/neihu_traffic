<template>
	<div class="textbox">
		<div 
			data-aos="fade-up"			
			data-aos-duration="1000"
			:class="direction"
		>
			<p>{{content}}</p>
		</div>
	</div>
	
</template>

<script>
export default {
	props:{ 
		direction: {
            type: String,
            default: 'center'
        },
		content: {
            type: String,
            default: ''
        }
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.textbox{
	@extend %verticalCenter;
	>div{
		width: 30em;
		height: auto;
		@media screen and (max-width:501px){
			width: 80%;
		}
		@extend %whiteCardShadow;
		@extend %contentPadding;
		border-radius: .25rem;
		border: 1px solid rgba($blackColor, 0.3);
		background-color: rgba($whiteColor, 0.8);
	}
}
</style>

