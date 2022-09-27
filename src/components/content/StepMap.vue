<template>
	<div id="map_container" class="block_scrollama contextbox">
       <aside>
           <MapSelect :location="location" @trigger="clickLocation"/>
           <TownSelect :town="town" @trigger="clickTown"
                :style="{
                    visibility: location === '臺北市'? 'visible': 'hidden'
                }"
           />
           <div class="chartContainer">
               
           </div>
       </aside>
       <main>

       </main>
       <!-- 			
           <MapBox 
				:update-center="mapCenterData"
			/> 
        -->
	</div>
</template>

<script>
import MapSelect from "@/components/maps/MapSelect.vue"
import TownSelect from "@/components/maps/TownSelect.vue"
// import MapBox from "@/components/maps/MapBox.vue"
// import {hotspot} from '@/assets/js/topspot.js'

export default {
	data() {
		return {
            mapCenterData: {},
            location: '',
            town: '',
		}
	},
	components:{
        // MapBox
        MapSelect,
        TownSelect
	},
    methods: {
        clickLocation(target){
            this.location = target
            if(target === ''){
                 this.town = target
            }
        },
        clickTown(target){
            this.town = target
        }
        // mapSetCenter(e){
			// if(hotspot[e] && hotspot[e]['center']){
		// 		const hotspotData = hotspot[e]
		// 		this.mapCenterData = {
		// 			target: hotspotData['序號'],
		// 			pos: hotspotData['center']
		// 		}
		// 	}
		// } 
    }

}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
#map_container{
    width: 100vw;
    display: flex;
    flex-direction: row;
    >aside{
        flex-basis: $mapAsideWidth;
        padding: 1rem;
        .chartContainer{
            width: 100%;
            height: calc(100vh - 27rem);
            // background: #999;
        }
    }
    >main{
        flex: 1 1 calc(100% - #{$mapAsideWidth});
        background-color: #999;
    }
}
</style>

