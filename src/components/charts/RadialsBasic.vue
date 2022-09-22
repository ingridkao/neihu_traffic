<template>
    <div class="apexChartContainer">
        <apexchart 
            type= "radialBar"
            height="300" 
            :options="chartOptions" 
            :series="series"
        />
    </div>
</template>

<script>
// const chartDatas = [68.2, 19.8, 10.2, 1.9]
const chartDatas = [62, 32, 6]
// const chartLabels = ['非大眾運輸','公車', '捷運', 'Youbike']
const chartLabels = ['公車', '捷運', 'Youbike']
// const chartColors = ['#e4a37b','#6b9a80','#72be95', '#8bc08b']
const chartColors = ['#6b9a80','#72be95', '#8bc08b']
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
                            margin: 5,
                            size: '40%',
                            background: 'transparent',
                            image: undefined,
                        },
                        dataLabels: {
                            name: {
                                fontSize: '10px',
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
                                label: '搭乘大眾運輸人口',
                                formatter: (w) => ("42,500人")
                            }
                        }
                    }
                },
                labels: chartLabels,
                legend: {
                    show: true,
                    inverseOrder: true,
                    height: 100,
                    floating: true,
                    position: 'left',
                    horizontalAlign: 'left',
                    offsetX: 120,
                    offsetY: 5,
                    labels: {
                        useSeriesColors: true,
                    },
                    markers: {
                        width: 6,
                        height: 6,
                        radius: 6,
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
.apexChartContainer{
    .apexcharts-legend-series{
        height: auto;
        line-height: .8rem;
        margin-bottom: 0 !important;
    }
}
</style>
