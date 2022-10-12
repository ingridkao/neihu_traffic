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
// console.log(avg);
const avg = 179.9

export default {
    data(){
        return {
            seriesData: [{
                name: '公車通勤前15熱區',
                data: ClearData.map(item => item['bus_avg'])
            }],
            chartOptions: {
                colors: ['#5b955b'],
                annotations: {
                    yaxis: [{
                        y: avg,
                        borderColor: '#00E396',
                        label: {
                            style: {
                                fontSize: '8px',
                                color: '#fff',
                                background: '#00E396',
                            },
                            text: `前15平均線:${avg}`,
                        }
                    }]
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        dataLabels: {
                            position: 'top'
                        },
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
                    enabled: false,
                //     enabled: true,
                //     style: {
                //         fontSize: '8px',
                //         fontWeight: 'normal',
                //         colors: ['#666']
                //     },
                //     offsetY: -20,
                //     formatter: (val, opts) => {
                //         return (val%1 === 0)? val: `${parseFloat(val.toFixed(1))}%`
                //     },
                }
            }
        }
    }
}
</script>

<style lang="scss"> 
.apexChartContainer.columnBus{
    width: 100%;
    height: 15rem;
    overflow: hidden;
}
</style>
