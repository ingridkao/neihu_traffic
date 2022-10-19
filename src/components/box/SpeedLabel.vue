<template>
    <div class="mapLabelBox">
        <h6>路段平均時速</h6>
        <p>Avg Speed km/hr</p>
        <div class="legendBox" v-for="(item) in showSpeed" :key="item.text">
            <span :style="{
                'background-color': item.color
            }"/>
            <span>{{item.text}}km/hr</span>
        </div>
        <div class="toggleBtn" data-attr="路段時速">
            <button :class="{active:!lowSpeed}" @click="updateLowSpeed(false)">全部</button>
            <button :class="{active:lowSpeed}" @click="updateLowSpeed(true)">篩選低速</button>
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
        },
        updateLowSpeed(boolen){
            this.$emit('update', boolen)
        }
    }
}
</script>
<style lang="scss" scoped>
    .mapLabelBox{
        width: 15rem;
        .legendBox{
            width: 11rem;
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
        .toggleBtn{
            margin-left: 1rem;
            margin-top: 2rem;
        }
    }
</style>

