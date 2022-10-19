<template>
    <div id="mapbox_container" class="mapboxBox"/>
    <Loading :load-start="mapLoading"/>
</template>
<script>
import { createApp, defineComponent, nextTick } from 'vue'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

import Loading from '@/components/Loading.vue'
import MapboxPopupComponent from '@/components/maps/MapboxPopup.vue'

import { PopWorkStyle, taiwanFillStyle, taiwanSymbolStyle, taiwanLineStyle, mapboxBuildings } from '@/assets/config/mapbox-style.js'
import { locationsCenter, initZoom, maxBound, durationConfig} from '@/assets/config/map-config.js'
const BASE_URL = process.env.NODE_ENV === 'production'? process.env.VUE_APP_BASE_URL: '../..'
const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN

const MapboxLanguage = require('@/assets/js/mapbox-gl-language.js')
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
    data(){
        return {
            mapLoading: false,
            MapBoxObject: null,
            MapBoxPopup: null,
            timeout: null,
            countyCode: null,
            townCode: null,
            langObj : {
                COUNTYNAME: '縣市',
                TOWNNAME: '行政區',
                // VILLNAME: '里',
                //COUNTYCODE - location.id
                //TOWNID - tpTown.id || ntpTown.id
                pop_work_min: '工作人口',
                transport_avg: '大眾運輸通勤人口',
                transport_rate: '使用大眾運輸比例',
                // bus_avg: '公車轉乘',
                // mrt_avg: '捷運轉乘',
                // ubike_avg: '腳踏車轉乘',
                // untransport: '私人運具',
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
		Loading
	},
    computed: {
        langZh(){
            return this.$i18n.locale === 'zh-TW'
        }
    },
    watch: {
        'location.index'(){
            this.townCode = null
            this.filterLocation()
        },
        'tpTown.id'(){
            if(Object.keys(this.tpTown).length === 0) return
            this.townCode = this.tpTown.id? this.tpTown.id: null
            this.filterTown(initZoom.taipei + 1.5, this.tpTown.center, 15)
        },
        'ntpTown.id'(){
            if(Object.keys(this.ntpTown).length === 0) return
            this.townCode = this.ntpTown.id? this.ntpTown.id: null
            this.filterTown(initZoom.new_taipei + 3, this.ntpTown.center, -15)
        }
    },
    methods: {
        initMapBox(){
            const Lang = this.$i18n.locale === 'zh-TW'? 'zh-Hant': 'en'
            mapboxgl.accessToken = MAPBOXTOKEN
            this.MapBoxObject = new mapboxgl.Map({
                container: "mapbox_container",
                style: 'mapbox://styles/mapbox/light-v10',
                // style: "mapbox://styles/taipei-tuic/cl9fha9yc000314pb5zl1fcqy",
                antialias: true,
                center: locationsCenter.haveData,
                zoom: initZoom.haveData,
                minZoom: initZoom.haveData - 1,
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
                this.MapBoxObject.addLayer(mapboxBuildings)
                console.log(this.MapBoxObject.getStyle().layers);
                this.MapBoxObject.setLayoutProperty('settlement-label', 'visibility', 'none')
                // this.MapBoxObject.setpaint('bridge-motorway-trunk-case', 'visibility', 'none')
                this.loadDataToMapbox()
            })
            this.MapBoxObject.on("click", (e) => {
                // console.log( this.MapBoxObject.getBounds())
                // console.log( this.MapBoxObject.getCenter())
                // console.log( this.MapBoxObject.getBearing())
                // console.log( this.MapBoxObject.getPitch())
                // console.log( this.MapBoxObject.getZoom())
                // console.log(JSON.stringify(e.lngLat.wrap()))
            })
        },
        loadDataToMapbox(){
            axios.get(`${BASE_URL}/data/neihu_pop.geojson`).then((res) => {
                const popData = res.data
                this.MapBoxObject.addSource('pop_work', { 
                    type: 'geojson', 
                    data: popData 
                }).addLayer(PopWorkStyle)
                // this.MapBoxObject.moveLayer('pop_work_fill', 'bridge-motorway-trunk-case');
                if(!this.MapBoxObject.getLayer('pop_work_fill'))return
                this.MapBoxObject.on('click', 'pop_work_fill', (e) => {
                    this.MapBoxObject.getCanvas().style.cursor = 'pointer'
                    const LngLat = e.lngLat
                    const featuresData = e.features
                    this.clearPopUp()
                    this.openMapboxPopup(featuresData, LngLat)
                })
            }).finally(()=>{
                this.mapLoading = false
            })
        },
        clearPopUp(){
            if(this.MapBoxPopup){
                this.MapBoxPopup.remove()
            }
        },
        parseLocationBound(){
            this.clearPopUp()
            if(!(this.location && this.location.index)) return maxBound.northArea
            const target = this.location.index 
            if(target === 'taoyuan_country') return maxBound.taoyuan
            if(target === 'keelung_city') return maxBound.keelung
            if(target === 'taipei_city') return maxBound.taipei
            if(target === 'new_taipei_city') return maxBound.new_taipei
        },
        parseTown(){
            this.clearPopUp()
            if(!(this.townCode )) return
            const target = this.location.index 
            if(target === 'taipei_city') return maxBound.taipei
            if(target === 'new_taipei_city') return maxBound.new_taipei
            this.townCode = null
            if(target === 'taoyuan_country') return maxBound.taoyuan
            if(target === 'keelung_city') return maxBound.keelung
        },
        filterLocation(){
            const LocBound = this.parseLocationBound()
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
        filterTown(zoom, center, bearing){
            if(!center)return
            if(this.MapBoxObject.getLayer('pop_work_fill')){
                this.MapBoxObject.setFilter('pop_work_fill', this.updateFilter() )  
            }
            this.MapBoxObject.easeTo({
                center: center,
                zoom: zoom,
                speed: 0.5,
                curve: 1,
                pitch: 60,
                bearing: bearing,
                duration: durationConfig
            })
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
        openMapboxPopup(featuresData, LngLat){
            this.MapBoxPopup = new mapboxgl.Popup().setLngLat(LngLat).setHTML('<div id="popup-content"></div>').addTo(this.MapBoxObject)
            // const LangObj = this.langObj
            const NewFeatures = featuresData.map(features => {
                const Propertie = features.properties
                if(Propertie){
                    const NewProp = {}
                    Object.keys(this.langObj).map(langKey => {
                        if(langKey === 'transport_rate'){
                            NewProp[this.langObj[langKey]] = `${(Propertie[langKey]*100).toFixed(1)}%`
                        }else{
                            NewProp[this.langObj[langKey]] = Propertie[langKey]
                        }
                    })
                    return NewProp
                }
            })
            const defindPopup = defineComponent({
                extends: MapboxPopupComponent,
                setup() {
                    return { 
                        featuresData: NewFeatures
                    }
                }
            })
            nextTick(() => { createApp(defindPopup).mount("#popup-content") })
            // this.MapBoxObject.easeTo({
            //     center: LngLat
            // })
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
.mapboxgl-ctrl-top-right{
    left: 0;
    right: auto;
    .mapboxgl-ctrl{
        margin-left: 10px;
    }
}
</style>