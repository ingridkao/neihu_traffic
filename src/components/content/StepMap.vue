<template>
    <aside>
        <p>
            此外，我們也將上述的大眾運輸通勤佔比，以空間網格的方式做互動呈現，利於相關單位針對不同區域做深入查詢研究。
        </p>
        <MapSelect 
            :location="location" 
            @trigger="clickLocation"
        />
        <div class="townBox">
            <TownSelect 
                v-if="location.index === 'taipei_city'"
                :town="tpTown" 
                @trigger="clickTpTown"
            />
            <TownSelectNewTaipei 
                v-if="location.index === 'new_taipei_city'" 
                :town="ntpTown" 
                @trigger="clickNTpTown"
            />
        </div>
        <MapChart 
            :location="location" 
            :tpTown="tpTown" 
            :ntpTown="ntpTown"
        />
    </aside>
    <MapBox 
        :location="location"
        :tp-town="tpTown"
        :ntp-town="ntpTown"
    /> 
</template>

<script>
import { defineAsyncComponent } from 'vue'
import MapSelect from "@/components/maps/MapSelect.vue"
import MapBox from "@/components/maps/MapBox.vue"
import MapChart from "@/components/maps/Chart.vue"
export default {
	data() {
		return {
            location: {},
            tpTown: {},
            ntpTown: {},
		}
	},
    computed: {
        currStep() {
			return this.$store.state.step
		},
        load() {
			return this.currStep >= 7 && this.currStep <= 9
		}
    },
	components:{
        MapSelect,
        MapBox,
        MapChart,
		TownSelect: defineAsyncComponent(() => import('@/components/maps/TownSelect.vue')),
		TownSelectNewTaipei: defineAsyncComponent(() => import('@/components/maps/TownSelectNewTaipei.vue'))
	},
    methods: {
        clickLocation(target){
            this.location = target? target: {}
            this.tpTown = {}
            this.ntpTown = {}
        },
        clickTpTown(targetObj){
            this.tpTown = targetObj
            this.$gtag.event('click', {
                event_category: 'neihu_traffic',
                event_label: 'update_map_filter',
                value: 'tp'
            })
        },
        clickNTpTown(targetObj){
            this.ntpTown = targetObj
            this.$gtag.event('click', {
                event_category: 'neihu_traffic',
                event_label: 'update_map_filter',
                value: 'ntp'
            })
        } 
    }
}
</script>