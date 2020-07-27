(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c81b3618"],{5311:function(t,e,i){"use strict";var a=i("5607"),n=i("2b0e");e["a"]=n["a"].extend({name:"rippleable",directives:{ripple:a["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),t.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",t)):null},onChange:function(){}}})},"6ca7":function(t,e,i){},8547:function(t,e,i){"use strict";var a=i("2b0e"),n=i("80d2");e["a"]=a["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:n["j"]}}})},"87bd":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticClass:"container fill-height",attrs:{fluid:""}},[i("v-row",{attrs:{align:"center",justify:"center"}},[i("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[i("v-card",{staticClass:"elevation-12"},[i("v-toolbar",{staticClass:"title primary white--text",attrs:{flat:""}},[i("v-toolbar-title",[t._v("Регистрация")]),i("v-spacer"),i("v-btn",{staticClass:"primary white--text",attrs:{to:"/"}},[t._v("X")])],1),i("v-card-text",[i("v-form",{ref:"form",attrs:{"lazy-validation":t.lazy},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-text-field",{attrs:{required:"",rules:t.emailRules,label:"E-mail",name:"email","prepend-icon":"mdi-email",type:"text"},model:{value:t.email,callback:function(e){t.email="string"===typeof e?e.trim():e},expression:"email"}}),i("v-text-field",{attrs:{required:"",rules:t.passwordRules,counter:"","append-icon":t.passwordShow?"mdi-eye":"mdi-eye-off",type:t.passwordShow?"text":"password",label:"Password",name:"password","prepend-icon":"mdi-lock"},on:{"click:append":function(e){t.passwordShow=!t.passwordShow}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),i("v-text-field",{attrs:{required:"",rules:t.userNameRules,counter:"",label:"Имя пользователя",name:"userName","prepend-icon":"mdi-account"},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}}),i("v-checkbox",{attrs:{rules:t.checkboxRules,label:"Вы согласны с правилами?",required:""},model:{value:t.checkbox,callback:function(e){t.checkbox=e},expression:"checkbox"}})],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{staticClass:"primary white--text",attrs:{block:"",disabled:!t.valid},on:{click:t.onRegister}},[t._v(" Регистрация ")])],1),t.message?i("v-layout",{attrs:{"justify-center":""}},[i("v-card-actions",{staticClass:"message"},[t._v(" "+t._s(t.message)+" ")])],1):t._e(),i("v-card-actions",[i("p",{staticClass:"card_register"},[t._v(" Есть аккаунт? "),i("v-btn",{attrs:{text:"",to:"/Login"}},[t._v(" Войти ")])],1)])],1)],1)],1)],1)},n=[],r=(i("96cf"),i("1da1")),s=i("5530"),o=i("2b0e"),c=i("2f62"),u=i("8c2e"),l=o["a"].extend({name:"RegisterPage",data:function(){return{valid:!0,lazy:!1,email:"",emailRules:[function(t){return!!t||"E-mail нужно заполнить"},function(t){return/.+@.+\..+/.test(t)||"E-mail должен быть правильным"}],userName:"",userNameRules:[function(t){return!!t||"Имя пользователя нужно заполнить"},function(t){return/^[\t-\r a-z\xA0\u017F\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u212A\u3000\uFEFF]+$/i.test(t)||"Должны быть только английские буквы"},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;return t&&t.length>=e||"Длинна имени должна быть больше ".concat(e," символов")}],password:"",passwordShow:!1,passwordRules:[function(t){return!!t||"Password нужно заполнить"},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;return t&&t.length>=e||"Длинна пароля должна быть больше ".concat(e," символов")}],checkbox:!1,checkboxRules:[function(t){return!!t||"Просто согласись с неизбежностью!"}],message:"",messages:u["a"]}},computed:Object(s["a"])({},Object(c["c"])(["errorNotificationGetter"])),mounted:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,!t.$store.getters.uidGetter;case 2:if(!e.sent){e.next=5;break}return e.next=5,t.$store.dispatch("fetchInfoAction");case 5:case"end":return e.stop()}}),e)})))()},watch:{errorNotificationGetter:function(t){if(t){var e=this.messages,i=t.code,a=e[i];this.message=a}else this.message="",this.clearErrorNotificationMutation}},methods:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(c["b"])(["registerAction"])),Object(c["d"])(["clearErrorNotificationMutation"])),{},{onRegister:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,i={email:t.email,password:t.password,name:t.userName},console.log("registerFormData :>> ",i),e.next=5,t.registerAction(i);case 5:t.clearErrorNotificationMutation,t.$router.push("/"),e.next=12;break;case 9:throw e.prev=9,e.t0=e["catch"](0),e.t0;case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()}})}),h=l,d=(i("e321"),i("2877")),p=i("6544"),f=i.n(p),m=i("8336"),v=i("b0af"),b=i("99d9"),g=(i("d3b7"),i("25f0"),i("6ca7"),i("ec29"),i("9d26")),x=i("c37a"),w=i("fe09"),k=w["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},x["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(g["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(s["a"])(Object(s["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}}),C=i("62ad"),V=i("a523"),y=i("4bd4"),I=i("a722"),j=i("0fd9"),A=i("2fa4"),S=i("8654"),O=i("71d9"),R=i("2a7f"),$=Object(d["a"])(h,a,n,!1,null,"11021161",null);e["default"]=$.exports;f()($,{VBtn:m["a"],VCard:v["a"],VCardActions:b["a"],VCardText:b["b"],VCheckbox:k,VCol:C["a"],VContainer:V["a"],VForm:y["a"],VLayout:I["a"],VRow:j["a"],VSpacer:A["a"],VTextField:S["a"],VToolbar:O["a"],VToolbarTitle:R["a"]})},bab9:function(t,e,i){},e321:function(t,e,i){"use strict";var a=i("bab9"),n=i.n(a);n.a},ec29:function(t,e,i){},fe09:function(t,e,i){"use strict";i("4de4"),i("45fc"),i("d3b7"),i("25f0");var a=i("c37a"),n=i("5311"),r=i("8547"),s=i("58df");e["a"]=Object(s["a"])(a["a"],n["a"],r["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=this,e=a["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:function(e){e.preventDefault(),t.onChange()}},e):e},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var a=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===a&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=chunk-c81b3618.b76f1797.js.map