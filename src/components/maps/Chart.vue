<template>
    <div class="chartContainer">
        <header>
            <div>
                <h6>私人運具</h6>
                <!-- <h6>private vehicle ownership</h6> -->
                <h5>{{ownership}}</h5>
            </div>
            <div>
                <h6>大眾運輸</h6>
                <!-- <h6>public transit provision</h6> -->
                <h5>{{provision}}</h5>
            </div>
        </header>
        <Donut 
            :chart-data="chartData"
        />
    </div>
</template>

<script>
import Taipei from '@/assets/js/taipei.js'
import {Northern, TaipeiTotal, TaoyuanTotal, KeelungTotal} from '@/assets/js/totals.js'
import NewTaipei, {NewTaipeiTotal} from '@/assets/js/newTaipei.js'
import Donut from "@/components/maps/Donut.vue"
const comma=/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g

export default {
    props: {
        location: {
            type: Object
        },
        tpTown: {
            type: Object
        },
        ntpTown: {
            type: Object
        } 
    },
	components:{
        Donut
	},
	data() {
		return {
            chartData: [],
            ownership: 0,
            provision: 0
		}
	},
    created(){
        this.updateChart()
    },
    watch: {
        'location': {
            deep: true,
            handler(newValue, oldValue) {
                if(oldValue && newValue.index === oldValue.index)return
                this.updateChart()
            }
        },
        'tpTown': {
            deep: true,
            handler(newValue, oldValue) {
                if(!newValue.index)return
                if(newValue.index === oldValue.index)return
                if(this.location.index !== 'taipei_city')return
                this.updateChart()
            }
        },
        'ntpTown': {
            deep: true,
            handler(newValue, oldValue) {
                if(!newValue.id)return
                if(newValue.id === oldValue.id)return
                if(this.location.index !== 'new_taipei_city')return
                this.updateChart()
            }
        }
    },
    methods: {
        parseData(item){
            if(!item)return
            this.chartData = [item.bus_avg, item.mrt_avg, item.ubike_avg, item.untransport]
            this.parseCount('ownership', item.untransport)
            this.parseCount('provision', (item.bus_avg + item.mrt_avg + item.ubike_avg))
        },
        parseCount(target, countTo){
            let startTime = null
            let currentTime = Date.now()
            const step = (currentTime) => {
                if (!startTime) {
                    startTime = currentTime
                }
                //duration : 1600 = 1.6sec
                const progress = Math.min((currentTime - startTime) / 1600, 1)
                const currentNum = Math.floor(progress * countTo)
                // this[target] = currentNum
                this[target] = currentNum.toString().replace(comma, ',')
                if (progress < 1) {
                    window.requestAnimationFrame(step)
                } else {
                    window.cancelAnimationFrame(window.requestAnimationFrame(step))
                }
            };
            window.requestAnimationFrame(step)
        },
        updateChart(){
            this.chartData = [0,0,0,0]
            switch (this.location.index) {
                case 'taipei_city':
                    if(!this.tpTown.index){
                        this.parseData(TaipeiTotal)
                    }else{
                        const TargetTPTownTotal = {
                            "bus_avg": 0,
                            "mrt_avg": 0,
                            "ubike_avg": 0,
                            "untransport": 0
                        }
                        const TargetTown = Taipei.filter(item => item.TOWNID === this.tpTown.id)
                        TargetTown.map(item => {
                            TargetTPTownTotal.bus_avg += item.bus_avg
                            TargetTPTownTotal.mrt_avg += item.mrt_avg
                            TargetTPTownTotal.ubike_avg += item.ubike_avg
                            TargetTPTownTotal.untransport += item.untransport
                        })
                        this.parseData(TargetTPTownTotal)
                    }
                    break;
                case 'new_taipei_city':
                    if(!(this.ntpTown && this.ntpTown.id)){
                        this.parseData(NewTaipeiTotal)
                    }else{
                        const TargetNTPTownTotal = {
                            "bus_avg": 0,
                            "mrt_avg": 0,
                            "ubike_avg": 0,
                            "untransport": 0
                        }
                        const TargetTown = NewTaipei.filter(item => item.TOWNID === this.ntpTown.id)
                        if(TargetTown.length > 0){
                            TargetTown.map(item => {
                                TargetNTPTownTotal.bus_avg += item.bus_avg
                                TargetNTPTownTotal.mrt_avg += item.mrt_avg
                                TargetNTPTownTotal.ubike_avg += item.ubike_avg
                                TargetNTPTownTotal.untransport += item.untransport
                            })
                            this.parseData(TargetNTPTownTotal)
                        }else{
                            this.ownership = 0
                            this.provision = 0
                        }
                    }
                    break;
                case 'taoyuan_country':
                    this.parseData(TaoyuanTotal)
                    break;
                case 'keelung_city':
                    this.parseData(KeelungTotal)
                    break;
                default:
                    this.parseData(Northern)
                    break;
            }
        } 
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.chartContainer{
    header{
        @extend %horizontalSpaceAround;
        width: 14rem;
        margin-bottom: 1rem;
		@extend %titleCardShadow;
        h6{
            font-weight: normal;
            font-size: 1.1rem;
            margin-bottom: 0 !important;
        }
        h5{
            font-weight: normal;
            font-size: 1.5rem;
            margin-bottom: 0 !important;
            text-align: right;
        }
    }
}
</style>

