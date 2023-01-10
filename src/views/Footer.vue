<template>
	<footer id="main_footer">
		<div>
			<div class="tuicLogo">
				<a target="_blank" href="https://tuic.gov.taipei/">
					<img :src="require('@/assets/img/tuic_logo.svg')" :alt="$t('TUIC')">
				</a>
			</div>
			<div class="contact_list">
				<div>
					<img src="https://tuic.gov.taipei/img/icon/pin.svg" alt="地址圖示">
					<span>地址:</span>
					<span>110204 臺北市信義區市府路1號</span>
				</div>
				<div>
					<img src="https://tuic.gov.taipei/img/icon/phone.svg" alt="電話圖示">
					<span>電話:</span>
					<span>臺北市民當家熱線
						<a href="tel:1999">1999</a>
						分機8585(免付費電話服務，公共電話、放心講及第二類電信除外)， 外縣市請撥
						<a href="tel:0227208889">(02)2720-8889</a>
					</span>
				</div>
				<div>
					<img src="https://tuic.gov.taipei/img/icon/mail.svg" alt="聯絡信箱圖示">
					<span>聯絡信箱:</span>
					<a href="mailto:tuic@mail.taipei.gov.tw">tuic@mail.taipei.gov.tw</a>
				</div>
			</div>
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
