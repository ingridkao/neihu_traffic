(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2bd2f0b2"],{"177c":function(e,t,c){"use strict";c("deb4")},"4aa7":function(e,t,c){"use strict";c.r(t);var o=c("7a23");const a=e=>(Object(o["pushScopeId"])("data-v-6abc504e"),e=e(),Object(o["popScopeId"])(),e),l={class:"mapLabelBox"},d=a(()=>Object(o["createElementVNode"])("h6",null,"路段平均時速",-1)),n=a(()=>Object(o["createElementVNode"])("p",null,"Avg Speed km/hr",-1)),r=["data-attr"];function s(e,t,c,a,s,p){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",l,[Object(o["createElementVNode"])("div",null,[d,n,(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(s.showSpeed,e=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{class:"legendBox",key:e.text},[Object(o["createElementVNode"])("span",{style:Object(o["normalizeStyle"])({"background-color":e.color})},null,4),Object(o["createElementVNode"])("span",null,Object(o["toDisplayString"])(e.text)+"km/hr",1)]))),128)),Object(o["createElementVNode"])("div",{class:"toggleBtn","data-attr":e.$t("box.speedLabel.roadSpeed")},[Object(o["createElementVNode"])("button",{class:Object(o["normalizeClass"])({active:!c.lowSpeed}),onClick:t[0]||(t[0]=e=>p.updateLowSpeed(!1))},Object(o["toDisplayString"])(e.$t("all")),3),Object(o["createElementVNode"])("button",{class:Object(o["normalizeClass"])({active:c.lowSpeed}),onClick:t[1]||(t[1]=e=>p.updateLowSpeed(!0))},Object(o["toDisplayString"])(e.$t("box.speedLabel.filterRow")),3)],8,r)])])}var p={data(){return{speed:[{text:"0-30",color:"#941c20"},{text:"30-40",color:"#d23d0d"},{text:"40-60",color:"#aa791c"},{text:">60",color:"#53a755"}],showSpeed:[]}},props:["lowSpeed"],watch:{lowSpeed:{immediate:!0,handler(e){this.showSpeed=e?[this.speed[0]]:this.speed}}},methods:{updateLowSpeed(e){this.$emit("update",e),this.$gtag.event("update_speed",{event_category:"neihu_traffic_action"})}}},b=(c("177c"),c("6b0d")),i=c.n(b);const u=i()(p,[["render",s],["__scopeId","data-v-6abc504e"]]);t["default"]=u},deb4:function(e,t,c){}}]);