(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2095ca"],{a973:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.loading?r("LoaderComponent"):e.loading?e._e():r("div",[r("v-card-title",[e._v(" Планирование "),r("v-spacer"),e._v(" "+e._s(e._f("currencyFilter")(e.bill,e.currencyBase))+" ")],1),e._l(e.items,(function(t){return r("div",{key:t.categoryId},[r("v-card-actions",[r("h3",[e._v(e._s(t.categoryTitle))]),r("v-spacer"),e._v(" "+e._s(e._f("currencyFilter")(t.categoryLimit,e.currencyBase))+" ")],1),r("v-progress-linear",{attrs:{value:t.expensePercent,height:"25",color:"blue-grey lighten-3"}},[r("strong",[e._v(e._s(t.rate)+" | "+e._s(t.expensePercent)+"% ")])])],1)}))],2)},a=[],c=r("5530"),i=(r("96cf"),r("1da1")),s=r("2b0e"),o=r("2f62"),u=r("87c7"),l=s["a"].extend({name:"PlanningPage",components:{LoaderComponent:u["a"]},data:function(){return{loading:!0}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("getPlanningsAction");case 2:e.loading=!1;case 3:case"end":return t.stop()}}),t)})))()},computed:Object(c["a"])(Object(c["a"])({},Object(o["c"])(["infoBillGetter","currencyBaseGetter","planningsByCategoriesGetter","recordsGetter"])),{},{bill:function(){return this.infoBillGetter},currencyBase:function(){return this.currencyBaseGetter},items:function(){return this.planningsByCategoriesGetter},records:function(){return this.recordsGetter}})}),d=l,g=r("2877"),p=r("6544"),f=r.n(p),v=r("99d9"),_=r("8e36"),h=r("2fa4"),y=Object(g["a"])(d,n,a,!1,null,"571f9d8d",null);t["default"]=y.exports;f()(y,{VCardActions:v["a"],VCardTitle:v["c"],VProgressLinear:_["a"],VSpacer:h["a"]})}}]);
//# sourceMappingURL=chunk-2d2095ca.83002587.js.map