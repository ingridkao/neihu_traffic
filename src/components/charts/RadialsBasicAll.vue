<template>
    <div class="apexChartContainer radialsAll">
        <apexchart 
            type= "radialBar"
            height="280" 
            :options="chartOptions" 
            :series="series"
        />
    </div>
</template>

<script>
const chartDatas = [68.2, 19.8, 10.2, 1.9]
const chartLabels = ['非大眾運輸','公車', '捷運', 'Youbike']
const chartColors = ['#fb6b6d','#73ba8c','#a0cfb2', '#c1ddca']
export default {
    data(){
        return {
            series: chartDatas,
            chartOptions: {
                colors: chartColors,
                plotOptions: {
                    radialBar: {
                        inverseOrder: true,
                        startAngle: 0,
                        endAngle: 270,
                        hollow: {
                            margin: 10,
                            size: '35%',
                            background: 'transparent',
                            image: undefined,
                        },
                        dataLabels: {
                            name: {
                                fontSize: '14px',
                                offsetY: -15
                            },
                            value: {
                                fontSize: '18px',
                                offsetY: -5
                            },
                            total: {
                                show: true,
                                fontSize: '12px',
                                color: '#373d3f',
                                label: '總工作人口',
                                formatter: (w) => ("133,500人")
                            }
                        }
                    }
                },
                labels: chartLabels,
                legend: {
                    show: true,
                    inverseOrder: true,
                    height: 'auto',
                    floating: true,
                    position: 'left',
                    horizontalAlign: 'left',
                    offsetX: -10,
                    offsetY: -10,
                    labels: {
                        useSeriesColors: true
                    },
                    markers: {
                        width: 5,
                        height: 5,
                        radius: 5
                    },
                    formatter: function(seriesName, opts) {
                        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%"
                    }
                },
                itemMargin: {
                    horizontal: 0,
                    vertical: 0
                },
                responsive: [{
                    breakpoint: 380,
                    options: {
                        legend: {
                            show: false
                        }
                    }
                }]
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';
.apexChartContainer{
    &.radialsAll{
        .apexcharts-legend-series{
            height: auto;
            line-height: .8rem;
            margin-bottom: 0 !important;
        }
    }
}
</style>
