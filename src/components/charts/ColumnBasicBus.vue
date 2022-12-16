<template>
    <div class="apexChartContainer columnBus">
        <apexchart 
            type="bar"
            height="250"
            :options="chartOptions" 
            :series="seriesData"
        />
    </div>
</template>

<script>
import { TranData, ParseRatio } from '@/assets/js/transport.js'
// const ClearData = TranData.sort((a, b)=> b['bus_avg'] - a['bus_avg']).slice(0, 15)
// const avg = 269.9
const AvgSum = 8750
const ClearData = TranData.slice(0,15).map(item => {
    return {
        ...item,
        ratio: ParseRatio(item['bus_avg'], AvgSum, 0)
    }
})
export default {
    data(){
        return {
            seriesData: [{
                name: '前15熱區',
                data: ClearData.map(item => item['ratio'])
            }],
            chartOptions: {
                colors: ['#5b955b'],
                title: {
                    text: '公車通勤前15轉乘站點',
                    margin: 0,
                    style: {
                        fontSize: '12px'
                    }
                },
                subtitle: {
                    text: `樣本數量:${AvgSum}人`,
                    margin: 0,
                    offsetY: 15
                },
                // annotations: {
                //     yaxis: [{
                //         y: avg,
                //         borderColor: '#00E396',
                //         label: {
                //             style: {
                //                 fontSize: '10px',
                //                 color: '#fff',
                //                 background: '#567888',
                //             },
                //             text: `前15區平均線:${avg}`,
                //         }
                //     }]
                // },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '60%',
                    },
                },
                xaxis: {
                    categories: ClearData.map(item => item['name']),
                    labels: {
                        rotate: -90,
                        style: {
                            fontSize: '10px',
                        },
                        minHeight: 120,
                        offsetY: -5
                    }
                },
                yaxis: {
                    labels: {
                        maxWidth: 10,
                        style: {
                            fontSize: '8px',
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                tooltip:{
                    y: {
                        formatter: (val) => (`${val}%`)
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss"> 
.apexChartContainer.columnBus{
    width: 100%;
    height: 13rem;
    overflow: hidden;
}
</style>
