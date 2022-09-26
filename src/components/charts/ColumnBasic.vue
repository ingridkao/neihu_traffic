<template>
    <div class="chartActionBox">
        <div>
            <span>排序方式</span> : 
            <button class="underLineBtn" :disabled="sortType == 1" @click="sortTypeToggle(1)">私人運具</button>
            <button class="underLineBtn" :disabled="sortType == 0" @click="sortTypeToggle(0)">大眾運輸</button>
            |
        </div>
        <div>
            <span>內湖數據顯示</span> : 
            <button class="underLineBtn" :disabled="!neiHuShow" @click="neiHuShowToggle(false)">ON</button>
            <button class="underLineBtn" :disabled="neiHuShow" @click="neiHuShowToggle(true)">OFF</button>
            |
        </div>
        <div>
            <span>呈現方式</span> : 
            <button class="underLineBtn" :disabled="!stackedChart" @click="stackedChartToggle(false)">類型比較</button>
            <button class="underLineBtn" :disabled="stackedChart" @click="stackedChartToggle(true)">運輸佔比</button>
        </div>
    </div>
    <div v-if="chartReload" class="apexChartContainer">
        <apexchart 
            type='bar'
            height='60%'
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
            stackedChart: true,
            transData: [],

            categories: [],
            seriesData: [],

            chartValue: [],
            chartOptions: {
                colors: ['rgb(244, 70, 70)', 'rgb(120, 198, 121)'],
                chart:{
                    stacked: false,
                    stackType: 'normal',
                    // stacked: true,
                    // stackType: '100%',
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        dataLabels: {
                            position: 'top'
                        }
                    },
                },
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
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: []
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right'
                },
                // tooltip: {
                //     y: {
                //         formatter: function (val) {
                //             return "$ " + val + " thousands"
                //         }
                //     }
                // }
            }
        }
    },
    props: {
        load: {
            type: Boolean,
            default: false
        }
    },
    watch:{
		load(newVal, oldVal){
            // if(newVal){
            //     this.chartValue = this.seriesData
            // }else{
            //     this.chartValue = []
            // }
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
            this.chartOptions = {
                ...this.chartOptions,
                chart: {
                    ...this.chartOptions.chart,
                    stacked: (this.stackedChart)? true: false,
                    stackType: (this.stackedChart)? '100%': 'normal'
                },
                yaxis: {
                    ...this.chartOptions.yaxis,
                    max: (e)=>{
                        return e
                    }
                }
            }
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
            this.chartOptions= {
                ...this.chartOptions,
                xaxis: {
                    ...this.chartOptions.xaxis,
                    categories: this.categories
                }  
            }
            this.chartReload = true
        }
    },
    mounted(){
        this.updateChart()
    }
}
</script>

<style lang="scss" scoped>
.chartActionBox{
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    padding: 0;
    >div{
        padding-right: 1rem;
    }
    input{
        margin: 0 .25rem 0 .75rem;
    }
}
.apexChartContainer{
    display: block;
    width: 100%;
    height: calc(100vh - 10rem);
}
</style>
<style lang="scss"> 
.apexChartContainer .vue-apexcharts{ 
    width: 100%;
    .apexcharts-legend{
        overflow: hidden;
    }
    .apexcharts-toolbar{
        right: -1rem !important;
    }
}
</style>
