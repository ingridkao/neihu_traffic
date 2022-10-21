<template>
    <div class="apexChartContainer columnMrt">
        <apexchart 
            type="bar"
            height="350"
            :options="chartOptions" 
            :series="seriesData"
        />
    </div>
</template>

<script>
import { MrtData } from '@/assets/js/transport.js'
export default {
    data(){
        return {
            seriesData: [{
                name: '轉乘人數',
                data: MrtData.map(item => item['avg'])
            }],
            chartOptions: {
                title: {
                    text: '上班通勤非木柵線的轉乘站',
                    margin: 0,
                    offsetX: -10,
                    offsetY: 5,
                    style: {
                        fontSize: '12px'
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            position: 'bottom'
                        },
                    }
                },
                colors: ['#ddd'],
                xaxis: {
                    categories: MrtData.map(item => item['name']),
                    labels: {
                        style: {
                            fontSize: '10px',
                        },
                        minHeight: 90
                    },
                },
                yaxis: {
                    labels: {
                        maxWidth: 60,
                        style: {
                            fontSize: '10px',
                            colors: [
                                '#007ffd', '#007ffd', '#007ffd', '#007ffd','#007ffd',
                                '#ff9800', 
                                '#007ffd', '#007ffd', '#007ffd', '#007ffd',
                                '#ff9800', '#ff9800', '#ff9800', 
                                '#007ffd', '#007ffd', '#007ffd', '#007ffd',
                                '#f44336',
                                '#ff9800', '#ff9800'
                            ]
                        }
                    },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '10px',
                        fontWeight: 'normal',
                        colors: ['#666']
                    },
                    textAnchor: 'start',
                    formatter: (val, opt) => {
                        // return val
                        if(val && opt.dataPointIndex >= 0){
                            const Target = MrtData[opt.dataPointIndex]
                            return Target.mrt_type ? `${Target.mrt_type}`: ''
                        }
                    }
                },
                tooltip:{
                    x: {
                        formatter: (val, { series, seriesIndex, dataPointIndex, w }) => {
                            const Target = MrtData[dataPointIndex]
                            if(Target.mrt_type){
                                return `${val}(${Target.mrt_type}${Target.type? '、'+ Target.type: ''})`
                            }else{
                                return val
                            }
                        }
                    },
                    y: {
                        formatter: (val) => (`${val}人`)
                    },
                    marker: {
                        show: false,
                    },
                }
            }
        }
    }
}
</script>

<style lang="scss"> 
.apexChartContainer.columnMrt{
    width: 100%;
    height: 18rem;
    overflow: hidden;
}
</style>
