<template>
	<div 
        id="chapter2"
        class="block_scrollama contextbox rowBox"
    >
        <div
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-offset="500"
        >
            <h6>13 萬的工作人口，居住內湖不到 4 成</h6>
            <p>
                <span>本次研究，透過</span>
                <Annotation :text="'電信資料'" :content="'電信業者將手機通訊資料去識別化後，能推估出一定空間範圍內的人口變化。這能幫助我們更精確掌握如上下班通勤的時段性人潮、居住與就業地分佈等資訊。'"/>
                <span>推估大內科的人口特性。大內科工作人口為 133,500 人，居住在內湖的比例為37.6%，由此可知，多數人無法就近前往大內科工作。</span>
            </p>
            <p>此外，對比全台北市，大內科的居住人口密度為台北居住人口密度的 0.5 倍、工作人口密度則為 2.5 倍。</p>
        </div>
        <div class="imgBox"
            :class="{
                fixedbox: currStep == 4 && currStepProgress <= 50
            }"
        >
            <div class="bg-map6 active"/>
            <div class="bg-map7" :class="{
                activeOpacity: currStep == 4 && currStepProgress >= 10 && currStepProgress < 30,
                active: (currStep == 4 && currStepProgress > 30),
            }"/>
        </div>
	</div>
</template>

<script>
import Annotation from "@/components/content/Annotation.vue"
export default {
    components:{
		Annotation
	},
    props: {
        currStep: {
            type: Number || String
        },
        currStepProgress: {
            type: Number
        }
    }
}
</script>

