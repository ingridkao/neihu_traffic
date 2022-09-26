<template>
	<div class="block_scrollama contextbox rowBox">
		<div 
            data-aos="fade-up"			
            data-aos-duration="3000"
            data-aos-offset="500"
        >
            <p>
                大內科區域聚集6,000家以上企業，包含許多大型企業的營運總部，扮演「北台灣技產業軸帶」的關鍵性角色。園區以研發設計、行銷、服務知識經濟產業鏈為主，也包括資訊通訊、數位內容、生技等高附加價值的產業。
            </p>
		</div>
        <div class="imgBox"
            :class="{
                fixedbox: currStep == 3 || (currStep == 4 && currStepProgress <= 10) 
            }"
        >
            <div
                :style="{
                    backgroundImage: `url(${MapImg4})`
                }"
                class="bgBlock active"
            />
            <div
                :style="{
                    backgroundImage: `url(${MapImg5})`
                }"
                :class="[
                    'bgBlock',
                    {
                        activeOpacity: currStep == 3 && currStepProgress >= 20 && currStepProgress < 50,
                        active: (currStep == 3 && currStepProgress >= 50 && currStepProgress < 75),
                    }
                ]"
            />
            <div
                :style="{
                    backgroundImage: `url(${MapImg6})`
                }"
                :class="[
                    'bgBlock',
                    {
                        activeOpacity: currStep == 3 && currStepProgress >= 75 && currStepProgress < 80,
                        active: currStep == 3 && currStepProgress >= 80
                    }
                ]"
            />
        </div>
	</div>
</template>

<script>
import MapImg4 from '@/assets/img/map/4.jpg'
import MapImg5 from '@/assets/img/map/5.jpg'
import MapImg6 from '@/assets/img/map/6.jpg'
export default {
    props: {
        currStep: {
            type: Number || String
        },
        currStepProgress: {
            type: Number
        }
    },
    data(){
        return {
            MapImg4,
            MapImg5,
            MapImg6
        }
    }
}
</script>

