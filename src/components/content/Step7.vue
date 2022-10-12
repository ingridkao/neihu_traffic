<template>
    <div class="block_scrollama contextbox">
        <header 
            class="contextbox rowBox"
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-offset="500"
        >
            <h6>住哪區的通勤族，最少使用大眾運輸？</h6>
            <p>
                為了進一步了解大內科工作者的居住地，與大眾運輸使用率的關係，我們篩選出位於大內科的所有捷運、公車及YouBike 站點，並將使用這些站點的「使用者上車地點」做分類。數據顯示，住在內湖當地的 58,742位工作人口，僅兩成使用大眾運輸， 有八成通勤族選擇使用私人運具（汽車、機車、或步行）。另外，住在汐止、士林、北投、文山區的大內科通勤族，也偏好以私人運具上下班。
            </p>
        </header>
        <ColumnBasic :load="load"/>
    </div>
</template>

<script>
import ColumnBasic from '@/components/charts/ColumnBasic.vue';
export default {
	components:{
		ColumnBasic,
	},
    computed: {
        load() {
			return this.$store.state.step == 7
		}
    }
}
</script>



