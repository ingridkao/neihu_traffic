<template>
    <div class="chartActionBox">
        <div class="toggleBtn" data-attr="呈現方式">
            <button :class="{active:!stackedChart}" @click="stackedChartToggle(false)">類型比較</button>
            <button :class="{active:stackedChart}" @click="stackedChartToggle(true)">運輸佔比</button>
        </div>
        <div class="toggleBtn" data-attr="排序方式">
            <button :class="{active:sortType == 0}" @click="sortTypeToggle(0)">私人運具</button>
            <button :class="{active:sortType == 1}" @click="sortTypeToggle(1)">大眾運輸</button>
        </div>
        <div class="toggleBtn" data-attr="內湖數據顯示">
            <button :class="{active:neiHuShow}" @click="neiHuShowToggle(true)">ON</button>
            <button :class="{active:!neiHuShow}" @click="neiHuShowToggle(false)">OFF</button>
        </div>
    </div>
    <div v-if="chartReload" class="apexChartContainer basic">
        <apexchart 
            type='bar'
            height='100%'
            :options="chartOptions" 
            :series="chartValue"/>
    </div>
</template>

<script>
// import transportData, {PrivateT, PublicT} from '@/assets/js/transport.js'
import {PrivateT, PublicT} from '@/assets/js/transport.js'
// const seriesData = [{
//     name: '大眾運輸',
//     data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
// }, {
//     name: '私人運具',
//     data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
// }]
// const Categories = ['內湖區', '汐止區', '士林區', '大安區', '中山區','松山區','信義區','北投區','南港區','文山區','三重區','中正區','板橋區','中和區','新莊區','蘆洲區','新店區','大同區','安樂區','永和區']
export default {
    data(){
        return {
            chartReload: false,
            seriesType: {
                '0':{index:'private_transport',name: '私人運具'},
                '1':{index:'public_transport', name: '大眾運輸'}
            },
            sortType: '0',  
            neiHuShow: true,
            stackedChart: false,
            transData: [],

            categories: [],
            seriesData: [],

            chartValue: []
        }
    },
    props: {
        load: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        chartOptions(){
            const Option = {
                colors: ['#fb6b6d', '#73ba8c'],
                chart:{
                    stacked: (this.stackedChart)? true: false,
                    stackType: (this.stackedChart)? '100%': 'normal'
                },
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                xaxis: {
                    categories: this.categories
                },
                yaxis: {
                    labels: {
                        maxWidth: 40
                    },
                    max: (e)=>{
                        return e
                    }
                }
            }
            if(this.$store.state.mobileDevice){
                return {
                    ...Option,
                    dataLabels: {
                        enabled: false,
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'left'
                    }
                }
            }else{
                return {
                    ...Option,
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '8px',
                            fontWeight: 'normal',
                            colors: ['#666']
                        },
                        offsetY: -20,
                        formatter: (val, opts) => {
                            return (val%1 === 0)? val: `${parseFloat(val.toFixed(1))}%`
                        },
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right'
                    }
                }
            }
        }

    },
    methods:{
        sortTypeToggle(val){
            this.sortType = val
            this.updateChart()
        },
        neiHuShowToggle(boolen){
            this.neiHuShow = boolen
            this.updateChart()
        },
        stackedChartToggle(boolen){
            this.stackedChart = boolen
        },
        updateChart(){
            this.chartReload = false
            this.chartValue = []
            this.seriesData = []
            //依據大眾運輸｜私人運具排序
            // const targetKey = this.seriesType[this.sortType]['index']
            // const clearData = transportData.sort((a, b)=>{
                //     return b[targetKey] - a[targetKey]    //從大到小
            //     // return a[targetKey] - b[targetKey] //從小到大
            // })
            const clearData = this.sortType == 0? PrivateT: PublicT
            //是否顯示內湖資料：內湖都在第一筆
            this.transData = this.neiHuShow? clearData.slice(0, 20): clearData.slice(1, 21)
            
            // 依據大眾運輸｜私人運具顯示
            Object.keys(this.seriesType).map(key=>{
                const {name, index} = this.seriesType[key]
                this.seriesData.push({
                    name: name,
                    data: this.transData.map(item => item[index])
                })
            })
            this.categories = this.transData.map(item => item['TOWNNAME'])
            this.chartValue = this.seriesData
            this.chartReload = true
        }
    },
    mounted(){
        this.updateChart()
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.apexChartContainer{
    display: block;
    width: 100%;
    height: calc(100vh - 20rem);
    @media screen and (max-width:501px){
        height: 55vh;
    }
}
</style>
<style lang="scss"> 
.apexChartContainer.basic .vue-apexcharts{ 
    width: 100%;
    height: 100%;
    .apexcharts-legend{
        overflow: hidden;
    }
    .apexcharts-toolbar{
        right: -1rem !important;
    }
}
</style>
