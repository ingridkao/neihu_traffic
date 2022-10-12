<template>
    <div id="mapbox_container" class="mapboxBox"/>
    <!-- <Loading :load-start="mapLoading"/> -->
</template>
<script>
import { createApp, defineComponent, nextTick } from 'vue'
import * as turf from '@turf/turf' 
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

import Loading from '@/components/Loading.vue'
import MapboxPopup from '@/components/MapboxPopup.vue'

import { PopWorkStyle, taiwanFillStyle, taiwanSymbolStyle, taiwanLineStyle, mapboxBuildings } from '@/assets/config/mapbox-style.js'
import { locationsCenter, initZoom, maxBound, durationConfig} from '@/assets/config/map-config.js'
import {hotspot} from '@/assets/js/topspot.js'
const BASE_URL = process.env.NODE_ENV === 'production'? process.env.VUE_APP_BASE_URL: '../..'
const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN

const MapboxLanguage = require('@/assets/js/mapbox-gl-language.js')
export default {
    props: {
        location: {
            type: Object
        },
        tpTownId: {
            type: String
        },
        ntpTownId: {
            type: String
        }
    },
    data(){
        return {
            MapBoxObject: null,
            MapBoxPopup: null,
            mapLoading: false,
            timeout: null,
            countyCode: null,
            townCode: '',
            langObj : {
                COUNTYNAME: '縣市',
                TOWNNAME: '區',
                //COUNTYCODE - location.id
                //TOWNID - tpTownId || ntpTownId
                transport_rate: '大眾運輸比例',
                bus_avg: '公車轉乘',
                mrt_avg: '捷運轉乘',
                ubike_avg: 'ubike轉乘',
                untransport: '私人運具',
                // ROADNAME: this.$t('hotmap.name'),
            }
        }
    },
    mounted(){
        this.initMapBox()
    },
    destroyed(){
        this.MapBoxObject.remove()
        clearInterval(this.timeout)
    },
	components:{
		Loading, MapboxPopup
	},
    computed: {
        langZh(){
            return this.$i18n.locale === 'zh-TW'
        }
    },
    watch: {
        'location.index'(){
            this.setViewToCenter()
        },
        'tpTownId'(){
            this.townCode = this.tpTownId? this.tpTownId: null

            this.filterTown(initZoom.taipei)
        },
        'ntpTownId'(){
            this.townCode = this.ntpTownId? this.ntpTownId: null
            this.filterTown(initZoom.new_taipei)
        }
    },
    methods: {
        initMapBox(){
            const Lang = this.$i18n.locale === 'zh-TW'? 'zh-Hant': 'en'
            mapboxgl.accessToken = MAPBOXTOKEN
            this.MapBoxObject = new mapboxgl.Map({
                antialias: true,
                container: "mapbox_container",
                style: 'mapbox://styles/mapbox/light-v10',
                center: locationsCenter.northArea,
                zoom: initZoom.northArea,
                minZoom: initZoom.northArea - 1,
                maxZoom: initZoom.maxZoom
            }).addControl(new MapboxLanguage({ defaultLanguage: Lang }))

            // Add zoom and rotation controls to the map.
            this.MapBoxObject.addControl( new mapboxgl.NavigationControl() )

            //https://docs.mapbox.com/mapbox-gl-js/example/toggle-interaction-handlers/
            this.MapBoxObject.touchZoomRotate.enable()
            // this.MapBoxObject.scrollZoom.disable()

            // Add language controls to the map.
            if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
                mapboxgl.setRTLTextPlugin(`${BASE_URL}/js/mapbox-gl-rtl-text.js`) 
            }

            this.MapBoxObject.on("load", () => {
                this.mapLoading = true
                // console.log(this.MapBoxObject.getStyle().layers);
                this.MapBoxObject.addLayer(mapboxBuildings)
                this.MapBoxObject.setLayoutProperty('settlement-label', 'visibility', 'none')
                this.loadDataToMapbox()
            })
            this.MapBoxObject.on("click", (e) => {
                // console.log( this.MapBoxObject.getBounds())
                console.log( this.MapBoxObject.getCenter())
                // console.log( this.MapBoxObject.getBearing())
                // console.log( this.MapBoxObject.getPitch())
                // console.log( this.MapBoxObject.getZoom())
                // console.log(JSON.stringify(e.lngLat.wrap()))
            })
        },
        loadDataToMapbox(){
            const requestArray = [
                // axios.get(`${BASE_URL}/data/taiwan_cities.geojson`),//台灣縣市界線
                axios.get(`${BASE_URL}/data/neihu_pop.geojson`),//內湖的數值
            ]
            const TaiwanSymbol = taiwanSymbolStyle(this.langZh)

            axios.all(requestArray).then(axios.spread((res1) => {
                // this.MapBoxObject.addSource('taiwan_city', { 
                //     type: 'geojson', 
                //     data: res0.data 
                // }).addLayer(TaiwanSymbol).addLayer(taiwanLineStyle)

                const popData = res1.data
                // let rr_crds = []
                // for(let i=0; i<popData.features.length; i++){
                //     if(popData.features[i].geometry.coordinates){
                //         let point = turf.point(popData.features[i].geometry.coordinates)
                //         let mileBuffer = turf.buffer(point, 80, {units: 'meters'})
                //         rr_crds.push(mileBuffer)
                //     }
                // }
                this.MapBoxObject.addSource('pop_work', { 
                    type: 'geojson', 
                    data: popData 
                }).addLayer(PopWorkStyle)
            })).finally(()=>{
                // if(this.MapBoxObject.getLayer('top100hotspot')){
                //     this.MapBoxObject.on('click', 'top100hotspot', (e) => {
                //         this.MapBoxObject.getCanvas().style.cursor = 'pointer'
                //         const LngLat = e.lngLat
                //         const featuresData = e.features
                //         const properties = featuresData[0]['properties']
                //         // this.parseCenter({
                //         //     target: properties['序號'],
                //         //     pos: LngLat
                //         // })
                //         this.openMapboxPopup(featuresData, LngLat)
                //     })
                // }
                this.mapLoading = false
            })
        },
        parseBound(){
            if(!(this.location && this.location.index)) return maxBound.northArea
            const target = this.location.index 
            if(target === 'taoyuan_country') return maxBound.taoyuan
            if(target === 'keelung_city') return maxBound.keelung
            if(target === 'taipei_city') return maxBound.taipei
            if(target === 'new_taipei_city') return maxBound.new_taipei
        },
        setViewToCenter(){
            const LocBound = this.parseBound()
            if(!(LocBound && Array.isArray(LocBound))) return
            this.MapBoxObject.fitBounds(LocBound, {
                duration: durationConfig,
                padding: 10
            })

            this.countyCode = this.location && this.location.id? (this.location.id.toString()): null
            if(this.MapBoxObject.getLayer('pop_work_fill')){ 
                this.MapBoxObject.setFilter('pop_work_fill', this.updateFilter() )  
            }
        },
        updateFilter(){
            const FilterRule = [
                "all", 
                ["has", 'pop_work_min'], 
                [">=", ['get', 'pop_work_min'], 5]
            ]
            if(this.countyCode){
                FilterRule.push(["==", ['get', 'COUNTYCODE'],this.countyCode])
            }
            if(this.townCode){
                FilterRule.push(["==", ['get', 'TOWNID'],this.townCode])
            }
            return FilterRule
        },
        filterTown(zoom){
            if(this.MapBoxObject.getLayer('pop_work_fill')){
                this.MapBoxObject.setFilter('pop_work_fill', this.updateFilter() )  
            }
            this.MapBoxObject.easeTo({
                // center: [0, 0],
                zoom: zoom + 1,
                speed: 0.2,
                curve: 1,
                duration: durationConfig
            })
        },
        openMapboxPopup(featuresData, LngLat){
            const LangObj = this.langObj
            const defindPopup = defineComponent({
                extends: MapboxPopup,
                setup() {
                    return { featuresData, LangObj}
                }
            })
            if(this.MapBoxPopup){
                this.MapBoxPopup.remove()
            }
            this.MapBoxPopup = new mapboxgl.Popup().setLngLat(LngLat).setHTML('<div id="popup-content"></div>').addTo(this.MapBoxObject)
            nextTick(() => { createApp(defindPopup).mount("#popup-content") })
        }
    }
}
</script>
<style lang="scss">
.mapboxBox, 
.mapboxgl-canvas{
    width: 100%;
    height: 100vh;
}
.loadingBox{
    height: 100vh;
}
</style>