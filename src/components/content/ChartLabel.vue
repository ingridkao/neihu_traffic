<template>
	<div class="chartLabel">
		<span>Min</span>
		<div
			:style="{
				background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`
			}"
		>
			{{text}}
		</div>
		<span>Max</span>
	</div>
</template>

<script>
export default {
	props: {
        text: {
            type: String,
        },
        gradient: {
            type: Array,
			default: () => ["#999", "#111"]
        }
    },
}
</script>
<style lang="scss" scoped>
.chartLabel{
	width: 12rem;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	font-size: 0.5rem;
	color: #999;
	>div{
		width: 6rem;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		color: #fff;
	} 
}
</style>

