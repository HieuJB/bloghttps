(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26b3c5da"],{6645:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex items-center justify-center mt-10 mb-14 "},[a("svg",{staticClass:"w-24 h-24 text-red-600 animate-spin",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[a("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"}})])])},s=[],i={name:"LoadingAnimation"},r=i,o=a("2877"),l=Object(o["a"])(r,n,s,!1,null,null,null);e["a"]=l.exports},f001:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"text-gray-600 body-font"},[t.data.length?a("div",{staticClass:"container pt-2 pb-8 mx-auto"},[a("div",{staticClass:"flex flex-wrap -m-4"},t._l(t.data,(function(e,n){return a("div",{key:n,staticClass:"p-4 md:w-1/3"},[a("div",{staticClass:"h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"},[a("img",{staticClass:"lg:h-48 md:h-36 w-full object-cover object-center",attrs:{src:e.background,alt:"blog"}}),a("div",{staticClass:"p-6"},[a("h2",{staticClass:"tracking-widest text-xs title-font font-medium text-gray-400 mb-1"},[t._v("Chuyên mục")]),a("h1",{staticClass:"title-font text-lg font-medium text-blue-500 mb-3"},[t._v(t._s(e.categorie))]),a("p",{staticClass:"font-medium mb-3"},[t._v(t._s(e.heading))]),a("div",{staticClass:"flex items-center flex-wrap justify-between "},[a("router-link",{staticClass:"text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0",attrs:{to:{name:"Post",params:{id:e.router}}}},[t._v("Đọc thêm "),a("svg",{staticClass:"w-4 h-4 ml-2",attrs:{viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}},[a("path",{attrs:{d:"M5 12h14"}}),a("path",{attrs:{d:"M12 5l7 7-7 7"}})])])],1)])])])})),0)]):a("div",[a("LoadingAnimation")],1)])},s=[],i=(a("159b"),a("b64b"),a("b0c0"),a("6645")),r=a("2f62"),o={name:"Saved",components:{LoadingAnimation:i["a"]},data:function(){return{data:[]}},computed:Object(r["c"])(["userName"]),methods:{checkSave:function(){var t=this,e=firebase.database().ref("SavePost");e.on("value",(function(e){var a=e.val();Object.keys(a).forEach((function(e){if(a[e].name==t.userName)return t.data.push({background:a[e].background,heading:a[e].heading,categorie:a[e].categorie,router:a[e].router}),!0}))}))}},mounted:function(){this.checkSave()}},l=o,c=a("2877"),d=Object(c["a"])(l,n,s,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-26b3c5da.55d6c7dd.js.map