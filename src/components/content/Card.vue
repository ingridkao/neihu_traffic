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

