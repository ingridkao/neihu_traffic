(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22c4fe"],{f361:function(e,t,o){"use strict";o.r(t);var n=o("7a23");const a={class:"articalBox space-between"},r={"data-aos":"fade-up","data-aos-duration":"400"},l={key:1,"data-aos":"fade-up","data-aos-duration":"400"},c={class:"annotationbox"};function i(e,t,o,i,s,p){const d=Object(n["resolveComponent"])("AnnotationTrigger"),g=Object(n["resolveComponent"])("AnnotationContent"),u=Object(n["resolveComponent"])("SpeedLabel");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",a,[Object(n["createElementVNode"])("div",null,[p.textShow1?(Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],{key:0},[Object(n["createElementVNode"])("h6",null,Object(n["toDisplayString"])(e.$t("article.step2.title")),1),Object(n["createElementVNode"])("p",r,[Object(n["createElementVNode"])("span",null,Object(n["toDisplayString"])(e.$t("article.step2.p1")),1),Object(n["createVNode"])(d,{toggle:s.annotationToggle1,text:e.$t("article.step2.annotationTrigger1"),onUpdate:p.updateToggle1},null,8,["toggle","text","onUpdate"]),Object(n["createElementVNode"])("span",null,Object(n["toDisplayString"])(e.$t("article.step2.p2")),1)])],64)):Object(n["createCommentVNode"])("",!0),p.textShow2?(Object(n["openBlock"])(),Object(n["createElementBlock"])("p",l,[Object(n["createElementVNode"])("span",null,Object(n["toDisplayString"])(e.$t("article.step2.p3")),1),Object(n["createVNode"])(d,{toggle:s.annotationToggle2,text:e.$t("article.step2.annotationTrigger2"),onUpdate:p.updateToggle2},null,8,["toggle","text","onUpdate"]),Object(n["createElementVNode"])("span",null,Object(n["toDisplayString"])(e.$t("article.step2.p4")),1)])):Object(n["createCommentVNode"])("",!0),Object(n["createElementVNode"])("div",c,[Object(n["createVNode"])(g,{dropdown:s.annotationToggle1,fix:"bottom",content:e.$t("footer.title2")+": TomTom Traffic Stats",onUpdate:p.updateToggle1},null,8,["dropdown","content","onUpdate"]),Object(n["createVNode"])(g,{dropdown:s.annotationToggle2,fix:"bottom",content:""+e.$t("footer.linkTitle3"),onUpdate:p.updateToggle2},null,8,["dropdown","content","onUpdate"])])]),Object(n["createVNode"])(u,{"data-aos":"fade-up","data-aos-duration":"1600","low-speed":p.lowSpeed,onUpdate:p.updateLowSpeed},null,8,["low-speed","onUpdate"])])}var s={components:{SpeedLabel:Object(n["defineAsyncComponent"])(()=>o.e("chunk-2bd2f0b2").then(o.bind(null,"4aa7")))},computed:{lowSpeed(){return this.$store.state.lowSpeed},mobileDevice(){return this.$store.state.mobileDevice},currStep(){return this.$store.state.step},currStepProgress(){return this.$store.state.progres},textShow1(){return!this.mobileDevice||(1==this.currStep?this.currStepProgress<.35:void 0)},textShow2(){return 2==this.currStep||1==this.currStep&&(this.mobileDevice?this.currStepProgress>=.35&&this.currStepProgress<.8:this.currStepProgress>=.35)}},data(){return{annotationToggle1:!1,annotationToggle2:!1}},methods:{updateLowSpeed(e){this.$store.commit("updateLowSpeed",e)},updateToggle1(e){this.annotationToggle1=e,this.annotationToggle2=(!e||!this.annotationToggle2)&&this.annotationToggle2},updateToggle2(e){this.annotationToggle2=e,this.annotationToggle1=(!e||!this.annotationToggle1)&&this.annotationToggle1}}},p=o("6b0d"),d=o.n(p);const g=d()(s,[["render",i]]);t["default"]=g}}]);