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

export default {
    data(){
        return {
            seriesData: [{
                name: '公車通勤熱區',
                data: ClearData.map(item => item['ubike_avg'])
            }],
            chartOptions: {
                colors: ['#5b955b'],
                annotations: {
                    yaxis: [{
                        y: 489,
                        borderColor: '#00E396',
                        label: {
                            style: {
                                color: '#fff',
                                background: '#00E396',
                            },
                            text: '平均線:489',
                        }
                    }]
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        dataLabels: {
                            position: 'top'
                        }
                    },
                },
                xaxis: {
                    categories: ClearData.map(item => item['TOWNNAME'])
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
                }
            }
        }
    }
}
</script>

<style lang="scss"> 
.apexChartContainer.columnBike{
    width: 100%;
    height: 250px;
    overflow: hidden;
}
</style>
