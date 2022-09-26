<template>
    <div 
        class="block_scrollama contextbox"
    >
        <div class="imgBox">
            <div
                :style="{
                    backgroundImage: `url(${require('@/assets/img/zoom/1.jpeg')})`
                }"
                class="bgBlock imgCenter active"
            />
        </div>
        <div class="cardBox">
            <div class="top left title">
                <h6>捷運的通勤熱區在哪</h6>
                <p>- 上下班時段的起訖熱門區域-</p>
            </div>
            <div class="middle right content">
                <div>
                    1. 主要的捷運通勤族皆來自文湖線站點周邊。
                </div>
                <div
                    v-if="currStep == 10 && currStepProgress > 15"
                    data-aos="fade-up"			
                    data-aos-duration="3000"
                >
                    2. 在轉乘的部分最多的人次來自板南線、其次為松山線，其餘路線較少有通勤人口使用。</div>
                <div
                    v-if="currStep == 10 && currStepProgress > 30"
                    data-aos="fade-up"			
                    data-aos-duration="3000"
                >
                    3. 士林北投區域的工作人口佔9.2%但使用捷運通勤人數相當少數。
                </div>
                <div
                    v-if="currStep == 10 && currStepProgress > 45"
                    data-aos="fade-up"			
                    data-aos-duration="3000"
                >
                    4. 不管上班或下班，南港展覽館為進出人次最高的站，推測其周邊居住人口/搭乘台鐵人口至此轉乘文湖線的需求大。
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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

