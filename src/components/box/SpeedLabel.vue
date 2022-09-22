<template>
    <div class="mapLabelBox">
        <h6>路段平均時速</h6>
        <p>Avg Speed km/hr</p>
        <div v-for="(item) in showSpeed" :key="item.text">
            <span :style="{
                'background-color': item.color
            }"/>
            <span>{{item.text}}km/hr</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showSpeed: [],
            speed: [
                {text: '0-30', color: '#941c20'},
                {text: '30-40', color: '#d23d0d'},
                {text: '40-60', color: '#aa791c'},
                {text: '>60', color: '#53a755'},
            ]
        }
    },
    props:['lowSpeed'],
    watch:{
		lowSpeed(){
            this.updateData()
        }
    },
    created(){
        this.updateData()
    },
    methods:{
        updateData(){
            if(this.lowSpeed){
                this.showSpeed = [this.speed[0]]
            }else{
                this.showSpeed = this.speed
            }
        }
    }
}
</script>
<style lang="scss">
    .mapLabelBox{
        width: 11rem;
        height: 11.5rem;
        border: 2px solid #ddd;
        border-radius: 0.3rem;
        h6{
            font-size: 1rem;
            font-weight: 500;
        }
        p{
            font-size: 0.7rem;
            line-height: 1;
        }
        h6, p{
            margin-bottom: 0 !important;
            text-align: center !important;
        }
        >div{
            width: 10rem;
            height: 1rem;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            span{
                margin: 0 .5rem;
                &:first-child{
                    width: 3rem;
                    height: 0.2rem;
                }
            }
        }
    }
</style>

