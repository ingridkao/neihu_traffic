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
import {TranData} from '@/assets/js/transport.js'
const ClearData = TranData.sort((a, b)=> b['ubike_avg'] - a['ubike_avg']).slice(0, 10)
// const values = ClearData.map(item => item['ubike_avg'])
// let sum = values.reduce((previous, current) => current += previous);
// let avg = sum / values.length;
// console.log(avg);
const avg = 269.9
export default {
    data(){
        return {
            seriesData: [{
                name: '前10熱區',
                data: ClearData.map(item => item['ubike_avg'])
            }],
            chartOptions: {
                colors: ['#5b955b'],
                title: {
                    text: 'Youbike通勤前10熱區',
                    margin: 0,
                    offsetX: -10,
                    offsetY: 5,
                    style: {
                        fontSize: '10px'
                    }
                },
                annotations: {
                    yaxis: [{
                        y: avg,
                        borderColor: '#00E396',
                        label: {
                            style: {
                                color: '#fff',
                                background: '#567888',
                            },
                            text: `前10平均線:${avg}`,
                        }
                    }]
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '60%'
                    },
                },
                xaxis: {
                    categories: ClearData.map(item => item['TOWNNAME']),
                    labels: {
                        rotate: -90,
                        style: {
                            fontSize: '8px',
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
