<template>
    <div class="block_scrollama contextbox">
        <header 
            class="contextbox rowBox"
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-offset="500"
        >
            <h6>住哪區的通勤族，最少使用大眾運輸？</h6>
            <p>為了理解哪一通勤地區，可以優先檢討其大眾運輸往返大內科的狀況，我們將大眾運輸通勤者的上車地點做分類。數據顯示，住在內湖當地的 58,742位工作人口，僅兩成使用大眾運輸， 有八成通勤者選擇使用私人運具（汽車、機車、或步行）。另外，住在汐止、士林、北投的工作者，也偏好以私人運具上下班。至於有沒有辦法讓住最近的內湖工作者，改變通勤方式，還有賴相關單位進一步討論。</p>
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
    props: {
        load: {
            type: Boolean
        }
    }
}
</script>



