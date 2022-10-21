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
            v-if="load" 
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
export default {
	data() {
		return {
            location: {},
            tpTown: {},
            ntpTown: {},
		}
	},
    computed: {
        load() {
			return this.$store.state.step >= 7 && this.$store.state.step <= 9
		}
    },
	components:{
        MapSelect,
        MapBox,
		TownSelect: defineAsyncComponent(() => import('@/components/maps/TownSelect.vue')),
		TownSelectNewTaipei: defineAsyncComponent(() => import('@/components/maps/TownSelectNewTaipei.vue')),
		MapChart: defineAsyncComponent(() => import('@/components/maps/Chart.vue'))
	},
    methods: {
        clickLocation(target){
            this.location = target? target: {}
            this.tpTown = {}
            this.ntpTown = {}
        },
        clickTpTown(targetObj){
            this.tpTown = targetObj
        },
        clickNTpTown(targetObj){
            this.ntpTown = targetObj
        } 
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
    aside{
        flex-basis: $mapAsideWidth;
        padding: 1rem;
        .chartContainer{
            width: 100%;
            height: 19rem;
        }
        .townBox{
            width: 100%;
            height: calc(100vh - 33rem);

            @include scrollbar_style;
            overflow: scroll;
            @media screen and (max-width:501px){
                height: auto;
                margin-bottom: 2rem;
            }
        }
    }
    main{
        flex: 1 1 calc(100% - #{$mapAsideWidth});
        padding: 0;
    }
</style>

