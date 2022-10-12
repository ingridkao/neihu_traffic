<template>
	<div id="map_container" class="block_scrollama contextbox">
       <aside>
           <p>
               此外，我們也將上述的大眾運輸通勤佔比，以空間網格的方式做互動呈現，利於相關單位針對不同區域做深入查詢研究。
           </p>
            <MapChart 
                v-if="load" 
                :location="location" 
                :tpTown="tpTown" 
                :ntpTown="ntpTown"
            />
            <MapSelect 
                :location="location" 
                @trigger="clickLocation"
            />
            <!-- :style="{visibility: (location.index === 'taipei_city')? 'visible': 'hidden'}" -->
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
       </aside>
       <main>
            <MapBox 
                :location="location"
                :tp-town-id="tpTown && tpTown.id? tpTown.id: ''"
                :ntp-town-id="ntpTown && ntpTown.id? ntpTown.id: ''"
            /> 
       </main>
	</div>
</template>

<script>
import MapSelect from "@/components/maps/MapSelect.vue"
import TownSelect from "@/components/maps/TownSelect.vue"
import TownSelectNewTaipei from "@/components/maps/TownSelectNewTaipei.vue"
import MapChart from "@/components/maps/Chart.vue"
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
        TownSelect,
        TownSelectNewTaipei,
        MapChart,
        MapBox
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
#map_container{
    @extend %horizontalCenter;
    width: 100vw;
    >aside{
        flex-basis: $mapAsideWidth;
        padding: 1rem;
        .chartContainer{
            width: 100%;
            height: calc(100vh - 27rem);
        }
        .townBox{
            height: 19rem;
        }
    }
    >main{
        flex: 1 1 calc(100% - #{$mapAsideWidth});
        background-color: #999;
        padding: 0;
    }
}
</style>

