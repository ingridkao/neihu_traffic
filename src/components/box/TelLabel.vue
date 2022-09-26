<template>
    <div class="mapLabelBox">
        <h6>信令推估人口</h6>
        <p>Telecom Population</p>
        <div class="patio">0%</div>
        <div class="gradient">
            <div 
                v-for="(item) in speed" 
                :key="item.text"
                :style="{
                    'background': `linear-gradient(180deg, #fff, ${item.color})`
                }"
            >
                <div>{{item.ch}}</div>
                <div>{{item.en}}</div>
            </div>
        </div>
        <div class="patio">100%</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            speed: [
                {ch: '工作人口', en: 'Working',  color: '#eaa3a5'},
                {ch: '混合人口', en: 'Mixed',  color: '#8e8cb2'},
                {ch: '居住人口', en: 'Resident',  color: '#adb4ce'},
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
    .mapLabelBox{
        width: 15rem;
        height: auto;
        padding: 0 0.5rem 0.5rem 0.5rem;
        >div{
            &.patio{
                text-align: right;
                font-size: 0.5rem;
            }
            &.gradient{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                width: 80%;
                height: 8rem;
                margin: auto;
                >div{
                    opacity: 0.9;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    flex-basis: 33%;
                    align-items: center;
                    font-size: 0.3rem;
                }
            }
        }
        >div{
            // width: 10rem;
            // height: 1rem;
            // display: inline-flex;
            // align-items: center;
            // justify-content: space-between;
            // span{
            //     margin: 0 .5rem;
            //     &:first-child{
            //         width: 3rem;
            //         height: 0.2rem;
            //     }
            // }
        }
    }
</style>

