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
import {TranData} from '@/assets/js/transport.js'
const ClearData = TranData.sort((a, b)=> b['bus_avg'] - a['bus_avg']).slice(0, 15)
// const values = ClearData.map(item => item['ubike_avg'])
// let sum = values.reduce((previous, current) => current += previous);
// let avg = sum / values.length;
const avg = 179.9
export default {
    data(){
        return {
            seriesData: [{
                name: '前15熱區',
                data: ClearData.map(item => item['bus_avg'])
            }],
            chartOptions: {
                colors: ['#5b955b'],
                title: {
                    text: '公車通勤前15熱區',
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
                                fontSize: '10px',
                                color: '#fff',
                                background: '#567888',
                            },
                            text: `前15區平均線:${avg}`,
                        }
                    }]
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '60%',
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
                    },
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
.apexChartContainer.columnBus{
    width: 100%;
    height: 13rem;
    overflow: hidden;
}
</style>
