<template>
    <div class="apexChartContainer columnBike">
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
// const avg = 269.9
const AvgSum = 791
const ClearData = TranData.sort((a, b)=> b['ubike_avg'] - a['ubike_avg']).slice(0, 10).map(item => {
    return {
        ...item,
        ratio: ParseRatio(item['ubike_avg'], AvgSum, 0)
    }
})
export default {
    data(){
        return {
            seriesData: [{
                name: '前10熱區',
                data: ClearData.map(item => item['ratio'])
            }],
            chartOptions: {
                colors: ['#5b955b'],
                title: {
                    text: 'Youbike通勤前10熱區',
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
                //                 color: '#fff',
                //                 background: '#567888',
                //             },
                //             text: `前10平均線:${avg}`,
                //         }
                //     }]
                // },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '60%'
                    },
                },
                xaxis: {
                    categories: ClearData.map(item => item['name']),
                    labels: {
                        rotate: -90,
                        style: {
                            fontSize: '10px',
                        },
                        minHeight: 90,
                        offsetY: -5,
                    }
                },
                yaxis: {
                    labels: {
                        maxWidth: 20,
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
.apexChartContainer.columnBike{
    width: 100%;
    height: 13rem;
    overflow: hidden;
}
</style>
