<template>
    <div class="apexChartContainer">
        <apexchart :options="chartOptions" :series="series"/>
    </div>
</template>

<script>
// const seriesData = [91000, 26390, 13610, 2500]
const seriesData = [68.2, 19.8, 10.2, 1.9]
export default {
    data(){
        return {    
            series: [],
            chartOptions: {
                chart: {
                    type: 'radialBar',
                    height: 400
                },
                plotOptions: {
                    radialBar: {
                        dataLabels: {
                            name: {
                                fontSize: '10px',
                                offsetY: -15
                            },
                            value: {
                                fontSize: '18px',
                                offsetY: -5,
                            },
                            total: {
                                show: true,
                                fontSize: '12px',
                                color: '#373d3f',
                                label: '總工作人口',
                                formatter: function (w) {
                                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                    return 133500 + '人'
                                }
                            }
                        }
                    }
                },
                labels: ['非大眾運輸', '公車', '捷運', 'Youbike']
            }
        }
    },
    props: {
        load: {
            type: Boolean,
            default: false
        }
    },
    watch:{
		load(newVal, oldVal){
            if(newVal){
                this.series = seriesData
            }else{
                this.series = []
            }
        }
    }
}
</script>
