<template>
	<footer id="main_footer">
		<div>
			<div class="tuicLogo">
				<a target="_blank" href="https://tuic.gov.taipei/">
					<img :src="tuic" :alt="$t('TUIC')">
				</a>
			</div>
			<h6>{{$t('footer.participate')}}</h6>
			<p v-html="$t('footer.menber')"/>
			<h6>{{$t('footer.collaborate')}}</h6>
			<p v-html="$t('footer.unit')"/>
		</div>
		<div>
			<h6>{{$t('footer.title1')}}</h6>
			<p>
				<a target="_blank" href="https://invest.taipei/pages/NeihuTechnologyPark.html?1653362761" :title="$t('linkTo')">台北投資服務辦公室</a>
			</p>
			<p>
				台北市政府交通局 108年度臺北市運輸走廊整合道路交通與電信資訊應用服務案
			</p>
			<p>
				<a target="_blank" href="https://spectrum.ieee.org/mining-traffic-data-for-insights-about-the-pandemic" :title="$t('linkTo')">Mining Traffic Data for Insights About The Pandemic</a>
			</p>
			<h6>{{$t('footer.title2')}}</h6>
			<p>Tom Tom Traffic stats 2019/04</p>
			<p>信令工作人口與居住人口推估</p>
			<p>信令工作人口居住地推估</p>
			<p>捷運每日分時各站OD流量統計資料</p>
			<p>公車上下車刷卡交易資料</p>
			<p>Youbike借還車刷卡交易資料</p>
		</div>
	</footer>
</template>
<script>
import tuic from '@/assets/img/tuic_logo.svg'
export default {
	data() {
		return {
			tuic
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';
#main_footer {
	position: relative;
	text-align: left;
	background: rgba($titleColor, .9);
	color: $whiteColor;
	padding: 2rem 2rem 4rem 2rem;

	display: flex;
	justify-content: center;
	>div:first-child{
		border-right: 1px solid rgba($whiteColor, .6);
		margin-right: 3rem;
		.tuicLogo{
			display: flex;
			align-items: center;
			padding: 1.5rem 4.5rem 1.5rem 0;
			img{
				width: 100%;
			}
		}
	}
	@media screen and (max-width:901px){
		flex-direction: column-reverse;
		>div:first-child{
			border-right: none;
			margin-top: 5rem;
			margin-right: 0;
			.tuicLogo{
				width: 15rem;
				padding: 0;
			}
		}
	}
	h6{
		font-size: 1rem;
		margin: 2rem 0 0.5rem 0;
		color: $whiteColor;
	}
	p{
		font-size: 0.875rem;
		margin-left: 2em;
	}
	a{
		color: $whiteColor;
		&:hover{
			color: $blueColor;
		}
	}
}
</style>
