<template>
    <div class="apexChartContainer donut">
        <apexchart 
            id="donutChart" 
            type= "donut"
            height="200" 
            :options="chartOptions" 
            :series="chartValue"
        />
    </div>
</template>

<script>
// const chartData = []
const chartLabels =  ['公車', '捷運', 'Youbike', '私人運具']
const chartColors = ['#6b9a80','#72be95', '#8bc08b', 'rgb(244, 70, 70)']
export default {
    props: {
        chartData: {
            type: Array
        }
    },
    data(){
        return {
            chartValue: [0,0,0,0],
            chartOptions: {
                colors: chartColors,
                labels: chartLabels,
                legend: {
                    show: false,
                    position: 'right',
                    formatter:(seriesName, opts) =>{
                        const chartVal = opts.w.globals.seriesPercent[opts.seriesIndex][0]
                        return `${seriesName}: ${chartVal? parseFloat(chartVal.toFixed(1)): 0}%`
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: (val, opts) => {
                        if(val <= 5)return
                        return `
                            ${chartLabels[opts.seriesIndex]}
                            ${parseFloat(val.toFixed(1))}%
                        `
                    },
                    style: {
                        colors: ['#fff'],
                        fontWeight: 'normal',
                    },
                    background: {
                        enabled: true,
                        foreColor: '#000',
                        borderColor: '#666',
                        borderWidth: 1
                    }
                },
                tooltip:{
                    enabled: true
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
    },
    watch:{
		chartData(newVal, oldVal){
            if(oldVal){
                this.updateChart()
            }
        }
    },
    methods:{
        updateChart(){
            this.chartValue = this.chartData
            if(!this.chartOptions.legend.show){
                this.chartOptions = {
                    ...this.chartOptions,
                    legend: {
                        ...this.chartOptions.legend,
                        show: true
                    }
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.apexChartContainer{
    &.donut{
        .apexcharts-legend-series{
            height: auto;
            line-height: .8rem;
            margin-bottom: 0 !important;
        }
    }
}
</style>
