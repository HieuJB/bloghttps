(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7cdc2383"],{"3a5e":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.loading?a("div",{staticClass:"fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center",attrs:{"wire:loading":""}},[a("div",{staticClass:"loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"}),a("h2",{staticClass:"text-center text-white text-xl font-semibold"},[t._v("Loading...")]),a("p",{staticClass:"w-1/3 text-center text-white"},[t._v("Hệ thống đang xử lý yêu cầu của bạn...")])]):t._e()},s=[],i={name:"Loading",props:{loading:Boolean}},r=i,l=(a("a4f4"),a("2877")),c=Object(l["a"])(r,n,s,!1,null,"7b35d4a4",null);e["a"]=c.exports},"47bd":function(t,e,a){},5133:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4"},[a("div",{staticClass:"mail__wrapper max-w-md mx-auto"},[a("div",{staticClass:"mail__content bg-white p-8 shadow-md"},[t._m(0),a("div",{staticClass:"content__body py-8 border-b"},[a("p",[t._v(" Chào "+t._s(t.userName)+"!"),a("br"),a("br"),t._v(" Chúng tôi đã gửi cho bạn một email để xác nhận nhưng có vẻ bạn vẫn chưa xác nhận nó. ")]),a("p",{staticClass:"mt-2"},[t._v(" Nếu bạn không tìm thấy trong hòm thư bạn có thể nhấn vào nút dưới để gửi lại thư . ")]),a("div",{staticClass:"flex justify-between"},[a("button",{staticClass:"mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded",on:{click:t.handleresentEmail}},[t._v(" GỬI LẠI THƯ ")]),a("button",{staticClass:"mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded",on:{click:t.handleLogout}},[t._v(" ĐĂNG XUẤT ")])])]),t._m(1)]),t._m(2)]),a("Loading",{attrs:{loading:t.loading}})],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content__header h-64 flex flex-col items-center justify-center text-center tracking-wide leading-normal bg-purple-500 -mx-8 -mt-8"},[a("h1",{staticClass:"text-red text-5xl"}),a("p",{staticClass:"text-white text-2xl"},[t._v("THÔNG BÁO")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content__footer text-center text-grey-darker"},[a("h3",{staticClass:"text-base sm:text-lg mb-4"},[t._v("Cảm ơn bạn đã sử dụng website của chúng tôi!")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mail__meta text-center text-sm text-grey-darker mt-8"},[a("div",{staticClass:"meta__social flex justify-center my-4"},[a("a",{staticClass:"flex items-center justify-center mr-4 bg-blue-700 text-white rounded-full w-8 h-8 no-underline",attrs:{href:"#"}},[a("i",{staticClass:"fab fa-facebook-f"})]),a("a",{staticClass:"flex items-center justify-center mr-4 bg-blue-700 text-white rounded-full w-8 h-8 no-underline",attrs:{href:"#"}},[a("i",{staticClass:"fab fa-instagram"})]),a("a",{staticClass:"flex items-center justify-center bg-blue-700 text-white rounded-full w-8 h-8 no-underline",attrs:{href:"#"}},[a("i",{staticClass:"fab fa-twitter"})])]),a("div",{staticClass:"meta__help"},[a("p",{staticClass:"leading-loose"},[t._v(" Liên hệ để biết thêm? "),a("a",{staticClass:"text-grey-darkest",attrs:{href:"#"}},[t._v("trunghieuit061099@gmail.com")]),a("br")])])])}],i=a("5530"),r=a("a18c"),l=a("3a5e"),c=a("2f62"),o={name:"SentEmail",components:{Loading:l["a"]},data:function(){return{loading:!1}},computed:Object(c["c"])(["userName","notification"]),methods:Object(i["a"])(Object(i["a"])({},Object(c["b"])(["actionResentEmail"])),{},{handleresentEmail:function(){this.actionResentEmail(),this.loading=!0},handleLogout:function(){localStorage.removeItem("token_email"),r["a"].push({name:"Login"})}}),watch:{notification:function(){this.loading=!1}}},d=o,u=(a("80f1"),a("2877")),h=Object(u["a"])(d,n,s,!1,null,"9808a830",null);e["default"]=h.exports},"80f1":function(t,e,a){"use strict";a("d13e")},a4f4:function(t,e,a){"use strict";a("47bd")},d13e:function(t,e,a){}}]);
//# sourceMappingURL=chunk-7cdc2383.7345266f.js.map