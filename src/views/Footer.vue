<template>
	<footer id="main_footer">
		<div>
			<div class="tuicLogo">
				<a target="_blank" href="https://tuic.gov.taipei/">
					<img :src="require('@/assets/img/tuic_logo.svg')" :alt="$t('TUIC')">
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
				1. {{$t('footer.linkHost1')}}：
				<a target="_blank" href="https://invest.taipei/pages/NeihuTechnologyPark.html?1653362761" :title="`${$t('linkTo')}:${$t('footer.linkTitle1')}`">
					{{$t('footer.linkTitle1')}}
				</a>
			</p>
			<p>
				2. {{$t('footer.linkHost2')}}：
				<a target="_blank" href="https://www.digitimes.com.tw/seminar/ceci_20190305/article.html" :title="`${$t('linkTo')}:${$t('footer.linkTitle2')}`">
					{{$t('footer.linkTitle2')}}
				</a>
			</p>
			<p>
				3. {{$t('footer.linkHost3')}}：{{$t('footer.linkTitle3')}}
			</p>
			<p>
				4. TomTom：
				<a target="_blank" href="https://spectrum.ieee.org/mining-traffic-data-for-insights-about-the-pandemic" :title="$t('linkTo')">
					Mining Traffic Data for Insights About The Pandemic
				</a>
			</p>
			<p>
				5. {{$t('footer.linkHost5')}}：
				<a target="_blank" href="https://tfl.gov.uk/modes/driving/ultra-low-emission-zone" :title="`${$t('linkTo')}:${$t('footer.linkTitle2')}`">
					Ultra Low Emission Zone
				</a>
			</p>

			<h6>{{$t('footer.title2')}}</h6>
			<p>{{$t('footer.linkTitle4')}}</p>
			<p>{{$t('footer.linkTitle5')}}</p>
			<p>{{$t('footer.linkTitle6')}}</p>
			<p>{{$t('footer.linkTitle7')}}</p>
			<p>{{$t('footer.linkTitle8')}}</p>
			<p>{{$t('footer.linkTitle9')}}</p>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/footer.scss';
</style>
