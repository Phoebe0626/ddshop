(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60dcfb4e"],{"0653":function(t,e,i){"use strict";i("68ef"),i("5c56")},"0ec5":function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("e15d")},"1a04":function(t,e,i){},"21ab":function(t,e,i){"use strict";var n=i("c31d"),a=i("d282"),r=i("ea8e"),c=i("b1d2"),s=i("48f4"),o=i("9884"),l=i("6f2f"),u=i("ad06"),d=Object(a["a"])("grid-item"),f=d[0],b=d[1];e["a"]=f({mixins:[Object(o["a"])("vanGrid")],props:Object(n["a"])({},s["c"],{dot:Boolean,text:String,icon:String,iconPrefix:String,info:[Number,String],badge:[Number,String]}),computed:{style:function(){var t=this.parent,e=t.square,i=t.gutter,n=t.columnNum,a=100/n+"%",c={flexBasis:a};if(e)c.paddingTop=a;else if(i){var s=Object(r["a"])(i);c.paddingRight=s,this.index>=n&&(c.marginTop=s)}return c},contentStyle:function(){var t=this.parent,e=t.square,i=t.gutter;if(e&&i){var n=Object(r["a"])(i);return{right:n,bottom:n,height:"auto"}}}},methods:{onClick:function(t){this.$emit("click",t),Object(s["b"])(this.$router,this)},genIcon:function(){var t,e=this.$createElement,i=this.slots("icon"),n=null!=(t=this.badge)?t:this.info;return i?e("div",{class:b("icon-wrapper")},[i,e(l["a"],{attrs:{dot:this.dot,info:n}})]):this.icon?e(u["a"],{attrs:{name:this.icon,dot:this.dot,badge:n,size:this.parent.iconSize,classPrefix:this.iconPrefix},class:b("icon")}):void 0},getText:function(){var t=this.$createElement,e=this.slots("text");return e||(this.text?t("span",{class:b("text")},[this.text]):void 0)},genContent:function(){var t=this.slots();return t||[this.genIcon(),this.getText()]}},render:function(){var t,e=arguments[0],i=this.parent,n=i.center,a=i.border,r=i.square,s=i.gutter,o=i.direction,l=i.clickable;return e("div",{class:[b({square:r})],style:this.style},[e("div",{style:this.contentStyle,attrs:{role:l?"button":null,tabindex:l?0:null},class:[b("content",[o,{center:n,square:r,clickable:l,surround:a&&s}]),(t={},t[c["a"]]=a,t)],on:{click:this.onClick}},[this.genContent()])])}})},2830:function(t,e,i){"use strict";var n=i("d282"),a=i("ea8e"),r=i("b1d2"),c=i("9884"),s=Object(n["a"])("grid"),o=s[0],l=s[1];e["a"]=o({mixins:[Object(c["b"])("vanGrid")],props:{square:Boolean,gutter:[Number,String],iconSize:[Number,String],direction:String,clickable:Boolean,columnNum:{type:[Number,String],default:4},center:{type:Boolean,default:!0},border:{type:Boolean,default:!0}},computed:{style:function(){var t=this.gutter;if(t)return{paddingLeft:Object(a["a"])(t)}}},render:function(){var t,e=arguments[0];return e("div",{style:this.style,class:[l(),(t={},t[r["e"]]=this.border&&!this.gutter,t)]},[this.slots()])}})},"34e9":function(t,e,i){"use strict";var n=i("2638"),a=i.n(n),r=i("d282"),c=i("ba31"),s=i("b1d2"),o=Object(r["a"])("cell-group"),l=o[0],u=o[1];function d(t,e,i,n){var r,o=t("div",a()([{class:[u(),(r={},r[s["f"]]=e.border,r)]},Object(c["b"])(n,!0)]),[null==i.default?void 0:i.default()]);return e.title||i.title?t("div",[t("div",{class:u("title")},[i.title?i.title():e.title]),o]):o}d.props={title:String,border:{type:Boolean,default:!0}},e["a"]=l(d)},"3df5":function(t,e,i){"use strict";i("68ef"),i("75ad")},"3eb2":function(t,e,i){t.exports=i.p+"img/default_avatar.4f32be5d.jpg"},"4ddd":function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("dde9")},"5c56":function(t,e,i){},"72fd":function(t,e,i){"use strict";i("9029")},"75ad":function(t,e,i){},7744:function(t,e,i){"use strict";var n=i("c31d"),a=i("2638"),r=i.n(a),c=i("d282"),s=i("a142"),o=i("ba31"),l=i("48f4"),u=i("dfaf"),d=i("ad06"),f=Object(c["a"])("cell"),b=f[0],p=f[1];function v(t,e,i,n){var a,c=e.icon,u=e.size,f=e.title,b=e.label,v=e.value,g=e.isLink,h=i.title||Object(s["c"])(f);function A(){var n=i.label||Object(s["c"])(b);if(n)return t("div",{class:[p("label"),e.labelClass]},[i.label?i.label():b])}function m(){if(h)return t("div",{class:[p("title"),e.titleClass],style:e.titleStyle},[i.title?i.title():t("span",[f]),A()])}function y(){var n=i.default||Object(s["c"])(v);if(n)return t("div",{class:[p("value",{alone:!h}),e.valueClass]},[i.default?i.default():t("span",[v])])}function j(){return i.icon?i.icon():c?t(d["a"],{class:p("left-icon"),attrs:{name:c,classPrefix:e.iconPrefix}}):void 0}function k(){var n=i["right-icon"];if(n)return n();if(g){var a=e.arrowDirection;return t(d["a"],{class:p("right-icon"),attrs:{name:a?"arrow-"+a:"arrow"}})}}function O(t){Object(o["a"])(n,"click",t),Object(l["a"])(n)}var x=null!=(a=e.clickable)?a:g,C={clickable:x,center:e.center,required:e.required,borderless:!e.border};return u&&(C[u]=u),t("div",r()([{class:p(C),attrs:{role:x?"button":null,tabindex:x?0:null},on:{click:O}},Object(o["b"])(n)]),[j(),m(),y(),k(),null==i.extra?void 0:i.extra()])}v.props=Object(n["a"])({},u["a"],l["c"]),e["a"]=b(v)},9029:function(t,e,i){},"94bb":function(t,e,i){},"9d53":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAChUlEQVRYR+2Wy3HaUBSG/yOki1iFVBCngpAKAjNG2yQVxK4AUgGkgsgVBCoI3kJmUCoIrsCkA7yyHqCTuWIQ6HElBZhhY22le86n/7/nQbjwQxfOjxeA/1LAnOMKG+MDMVoMrZW0jx1mWpHh3bsdLKtaWwnAnBo3BOqBKJVUkYZ5wRrb7nUwLgMpBDBnehtc+0GEq7JAee+ZsQRtbt3u2lGdVwI0poYN0nrHJE6fCRl9z/Lu8mLlAphTMSKiL+dIHsfg8O7ZCvrpmBkA8Ut8qjH9PFdyBv4yYHu6N0IHq2KAOZqNtXgEqHkqADN+A+HItYKRjCXvE0Hrse5/PayShALmTAwJNDglOTOPN2A7sIJFlFiWbiAGRHQTxU1ZkQKoLwl4cwggJSTwAqCPKjAGPwGwofuj+O/maJpr0SOgn1SUV89d//UuVgwgSWldf0wnkaXkWt7b+qzeJ7BU6NXuGwkHDoeuEUwO/ZV9A9AGqvJdc/h+p9AeIPKoNs+v5/BWermFFHakJEI7Xd9R30BtQEC7yEbGprM7Ww0AcNyu11EFzfhccolyAYyp0dJJ+6P2eU8df6P0uZgg1wJ5pDGrsxogqUKZz0UX1u36cZknq6CkA26IP2scrqr4rARgHruWvy1JILmQlNlwSn/YV07SykwrPucQygDnzIPcYdSYigWI3p3jj+MYzA/Pht9Oz4P8cSxnQiCcs0EokmfuQPqPGzMxKWrBVRRi8De36w9V3xZuRLL9asD3KomyLTw5lI4CSCrA9wwsCHIhRftwJmxbMz8R4IQgh3RvUnUxLVQgakzMD0xhv2ivO0ah3D6QDiS3I//an5ySoOxspbW8LMgp718ALq7AP+z4KjDSrNyxAAAAAElFTkSuQmCC"},"9f14":function(t,e,i){"use strict";var n=i("d282"),a=i("0a26"),r=Object(n["a"])("radio"),c=r[0],s=r[1];e["a"]=c({mixins:[Object(a["a"])({bem:s,role:"radio",parent:"vanRadio"})],computed:{currentValue:{get:function(){return this.parent?this.parent.value:this.value},set:function(t){(this.parent||this).$emit("input",t)}},checked:function(){return this.currentValue===this.name}},methods:{toggle:function(){this.currentValue=this.name}}})},a44c:function(t,e,i){"use strict";i("68ef"),i("dc1b")},b23b:function(t,e,i){"use strict";i("94bb")},b4f1:function(t,e,i){"use strict";i.r(e);var n,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vip-pay-container"},[n("van-nav-bar",{attrs:{title:"开通绿卡会员",fixed:"",placeholder:"","safe-area-inset-top":"",border:!1,"left-arrow":""},on:{"click-left":function(e){return t.$router.back()}}}),n("header",{staticClass:"header"},[n("div",{staticClass:"left"},[n("div",{staticClass:"name"},[t._v(t._s(t.userInfo.user_name))]),n("div",{staticClass:"info"},[t._v("绿卡会员未开通")])]),t._m(0)]),n("div",{staticClass:"icons"},[n("div",{staticClass:"title"},[t._v("开通享3大权益，预计每单省6.96元")]),n("van-grid",{attrs:{border:!1,"column-num":3}},[n("van-grid-item",{attrs:{icon:"vip-card-o",text:"绿卡专享券"}}),n("van-grid-item",{attrs:{icon:"discount",text:"绿卡专享价"}}),n("van-grid-item",{attrs:{icon:"calendar-o",text:"周五绿卡日"}})],1)],1),n("div",{ref:"Outter"},[n("div",{staticClass:"price"},t._l(t.priceList,(function(e,i){return n("div",{key:i,staticClass:"item",class:{selected:t.currentIndex===i},on:{click:function(e){t.currentIndex=i}}},[n("div",{staticClass:"first-line"},[t._v(t._s(e.title))]),n("div",{staticClass:"second-line"},[t._v(" ￥"),n("span",[t._v(t._s(e.price))])]),n("div",{staticClass:"third-line"},[t._v(t._s(e.info))])])})),0)]),0===t.currentIndex||2===t.currentIndex?n("div",{staticClass:"tag"},[n("span",{staticClass:"text"},[t._v("自动续费，可随时关闭")]),n("van-icon",{staticClass:"icon",attrs:{name:"question-o"},on:{click:t.hOpenDialog}})],1):t._e(),n("div",{staticClass:"pay-type"},[n("div",{staticClass:"title"},[t._v("支付方式")]),n("van-radio-group",{model:{value:t.payType,callback:function(e){t.payType=e},expression:"payType"}},[n("van-cell-group",[n("van-cell",{attrs:{clickable:""},on:{click:function(e){t.payType="1"}},scopedSlots:t._u([{key:"right-icon",fn:function(){return[n("van-radio",{attrs:{name:"1"}})]},proxy:!0}])},[n("template",{slot:"title"},[n("img",{attrs:{src:i("f9af"),alt:""}}),n("span",[t._v("支付宝支付")]),n("span",{staticStyle:{"font-size":"12px",color:"red","margin-left":"5px"}},[t._v("安全保障")])])],2),n("van-cell",{attrs:{clickable:""},on:{click:function(e){t.payType="2"}},scopedSlots:t._u([{key:"right-icon",fn:function(){return[n("van-radio",{attrs:{name:"2"}})]},proxy:!0}])},[n("template",{slot:"title"},[n("img",{attrs:{src:i("9d53"),alt:""}}),n("span",[t._v("微信支付")])])],2)],1)],1)],1),n("footer",{staticClass:"footer"},[n("div",{staticClass:"agree"},[n("van-checkbox",{attrs:{"label-disabled":""},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[t._v(" 已阅读并同意 "),n("span",{on:{click:function(e){return t.$toast("绿卡会员服务协议")}}},[t._v("《绿卡会员服务协议》")]),t._v("和 "),n("span",{on:{click:function(e){return t.$toast("自动续费协议")}}},[t._v("《自动续费协议》")])])],1),n("div",{staticClass:"btn",on:{click:t.hPay}},[t._v(" 立即支付 ")])])],1)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"right"},[n("div",{staticClass:"avatar"},[n("img",{staticStyle:{"border-radius":"50%",border:"1px solid #fff"},attrs:{width:"40",height:"40",src:i("3eb2")}})])])}],c=i("5530"),s=i("ade3"),o=(i("5246"),i("6b41")),l=(i("4056"),i("44bf")),u=(i("c3a6"),i("ad06")),d=(i("0ec5"),i("21ab")),f=(i("3df5"),i("2830")),b=(i("e17f"),i("2241")),p=(i("0653"),i("34e9")),v=(i("c194"),i("7744")),g=(i("a44c"),i("e27c")),h=(i("4ddd"),i("9f14")),A=(i("3c32"),i("417e")),m=(i("b0c0"),i("2f62")),y=i("f40f"),j={components:(n={},Object(s["a"])(n,A["a"].name,A["a"]),Object(s["a"])(n,h["a"].name,h["a"]),Object(s["a"])(n,g["a"].name,g["a"]),Object(s["a"])(n,v["a"].name,v["a"]),Object(s["a"])(n,p["a"].name,p["a"]),Object(s["a"])(n,b["a"].name,b["a"]),Object(s["a"])(n,f["a"].name,f["a"]),Object(s["a"])(n,d["a"].name,d["a"]),Object(s["a"])(n,u["a"].name,u["a"]),Object(s["a"])(n,l["a"].name,l["a"]),Object(s["a"])(n,o["a"].name,o["a"]),n),computed:Object(c["a"])({},Object(m["b"])(["userInfo"])),mounted:function(){var t=this;this.$nextTick((function(){if(t.priceScroll)t.priceScroll.refresh();else{var e=document.querySelector(".price"),i=document.querySelectorAll(".price .item");e.style.width=(i[0].offsetWidth+10)*i.length+"px",console.log(i[0].offsetWidth,i[0].clientWidth),t.priceScroll=new y["a"](t.$refs.Outter,{scrollX:!0,click:!0,disableTouch:!1})}}))},data:function(){return{checked:!1,payType:"1",currentIndex:0,priceList:[{title:"连续包年",price:88,info:"限时加享喜马拉雅半年VIP"},{title:"年卡会员",price:108,info:"折合27元/季"},{title:"连续包季",price:30,info:""},{title:"季卡会员",price:45,info:""}]}},methods:{hPay:function(){if(!this.checked)return this.$toast("请先阅读并勾选服务协议哦");this.$toast("未实现支付功能哦")},hOpenDialog:function(){Object(b["a"])({title:"自动续费声明",message:"1. 会员到期前一天自动续费\n2. 扣费前短信通知，扣费过程公开透明\n3. 开通后可随时关闭，关闭后不影响当期权益使用",messageAlign:"left"})}}},k=j,O=(i("72fd"),i("b23b"),i("2877")),x=Object(O["a"])(k,a,r,!1,null,"6b384810",null);e["default"]=x.exports},c194:function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("1a04")},c3a6:function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743")},dc1b:function(t,e,i){},dde9:function(t,e,i){},dfaf:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var n={icon:String,size:String,center:Boolean,isLink:Boolean,required:Boolean,iconPrefix:String,titleStyle:null,titleClass:null,valueClass:null,labelClass:null,title:[Number,String],value:[Number,String],label:[Number,String],arrowDirection:String,border:{type:Boolean,default:!0},clickable:{type:Boolean,default:null}}},e15d:function(t,e,i){},e27c:function(t,e,i){"use strict";var n=i("d282"),a=i("78eb"),r=i("9884"),c=Object(n["a"])("radio-group"),s=c[0],o=c[1];e["a"]=s({mixins:[Object(r["b"])("vanRadio"),a["a"]],props:{value:null,disabled:Boolean,direction:String,checkedColor:String,iconSize:[Number,String]},watch:{value:function(t){this.$emit("change",t)}},render:function(){var t=arguments[0];return t("div",{class:o([this.direction]),attrs:{role:"radiogroup"}},[this.slots()])}})},f9af:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACsElEQVRYR9WXX1IaQRDG+5u1MKlS2RuoJxBPkPUG5kX0KeQE8QbqCcINAk8EX/QG4gmCJ4i5wRJNWRKZLzUjkNl/7ABWrOwju939m+6vexrIKz945fjyHwB07iIJhAtn6mD9epZtfgbO72vQT58BRAsHdgxJ9sjVj3L09jbtLwtggvPpCoLwJYJPfFAYU6/upiEyAOjGPQjeeQRvi4g9EckGgM0yG5uJw3DP/S4DoLoDr3prrfbkaL1nnM0BLbpeTcRMAnTuIqX0VdlJzPuFARxwC58Ilg/Q1lq1MlBv1vryHrH9/fy+JiNmNKOUbojIB9fWBfcCMHUDYFOddFRpTwV1/rOhyIwGSEbpTpoboKgc/7IERuU3ZHCcgCkpATBqAtjJZu6veL1KYNtMGAulXyZOt8XQjWMIqi8CUBZ4PAtueBjWJqJUHH3Ls5tbAyb9AC5dZ6TUBIxSJzzT9eqp+U59HTQF8mkpAAoH1MG+HTadhy0JnjZltPIjMUpN++lRBGGDXN237y4YYjj4XjTKvTOgEexa5+CJ68zoAcSlpmpPJmHipM8t+cWnewpFSOE1RTWV8GJW/Z9vueAsA2IyhuG+yUy6E7wyYAAgdviczAQwZcJKJAdrxR2SgvEGIFRrViqtRpzgRngU7uRmZHIKO7KD2NVR4V2gdWVbqaFRdWKWj321dWXjeHIXqO7A3BXT7wpLk5POQgAK+6xU9+T3ry0jRgUJtaAvlfWeewnN2pwsCFRL6htmd8h9Zt6GJG8paIoKrqd1Njui4iaojcC8VjbrB+o0D2ThhcRnOqa/sSCH4bb7+zIr2dwMtr3rYSJr2aW087AF9djPu0jmjugYpLtm8ip/LX+GaHkup6Vc9uRYOc6bF+X/jIzolnnGi6tfFywTaEHb8gws6NjX7NUB/gBxSa8wL3DlUAAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=chunk-60dcfb4e.c8d300ad.js.map