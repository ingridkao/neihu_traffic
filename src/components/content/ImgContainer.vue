<template>
    <div class="imgBox">
        <div class="bgBlock bg1 active"/>
        <div class="bgBlock"
            :class="{
                active: block2,
            }"
            :style="{
                backgroundImage: `url(${lowSpeed? MapImg2: MapImg3})`
            }"
        />
        <div class="bgBlock bg6"
            :class="{
                active: block3,
            }"
        />
        <div class="bgBlock bg7"
            :class="{
                active: block4
            }"
        />
    </div>
</template>

<script>
import MapImg2 from '@/assets/img/map/2.jpg'
import MapImg3 from '@/assets/img/map/3.jpg'
export default {
    computed: {
        mobileDevice(){
            return this.$store.state.mobileDevice
        },
        lowSpeed() {
			return this.$store.state.lowSpeed
		},
        currStep() {
			return this.$store.state.step
		},
		currStepProgress() {
			return this.$store.state.progres
		},
        block2(){
            if(this.mobileDevice)return this.currStep == 1 && this.currStepProgress >= 0.35 && this.currStepProgress < 0.8
            return (this.currStep == 1 && this.currStepProgress >= 0.45 ) || (this.currStep == 2 && this.currStepProgress < 0.1) 
        },
        block3(){
            if(this.mobileDevice)return (this.currStep == 1 && this.currStepProgress >= 0.8) || (this.currStep == 2 && this.currStepProgress < 0.8)
            return (this.currStep == 2 && this.currStepProgress >= 0.1) || (this.currStep == 3 && this.currStepProgress < 0.1)
        },
        block4(){
            if(this.mobileDevice)return (this.currStep == 2 && this.currStepProgress >= 0.8) || (this.currStep > 2 && this.currStep <= 4)
            return this.currStep == 3 && this.currStepProgress >= 0.1
        }
    },
    data(){
        return {
            MapImg2,
            MapImg3
        }
    }
}
</script>

<style lang="scss" scoped>
.bgBlock{
    &.bg1{ background-image: url('../../assets/img/map/1.jpg'); }
    &.bg6{ background-image: url('../../assets/img/map/6.jpg'); }
    &.bg7{ background-image: url('../../assets/img/map/7.jpg'); }
}
</style>
