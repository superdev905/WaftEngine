(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{a61195d489620cdcdf8b:function(e,t,o){"use strict";o.r(t);var n={};o.r(n),o.d(n,"loadCategoryRequest",function(){return S}),o.d(n,"loadCategorySuccess",function(){return C}),o.d(n,"loadCategoryFailure",function(){return w}),o.d(n,"loadBlogRequest",function(){return j}),o.d(n,"loadBlogSuccess",function(){return L}),o.d(n,"loadBlogFailure",function(){return D});var a,r=o("8af190b70a6bc55c6f1b"),c=o.n(r),i=(o("8a2d1b95e05b6a321e74"),o("d7dd51e1bf6bfc2c9c3d")),u=o("e95a63b25fb92ed15721"),d=o("a28fc3c963a1d4d1a2e5"),l=o("ab4cb61bcb2dc161defb"),f=o("0d939196e59ed73c94e6"),p=o("0d7f0986bcd2f33d8a2a"),s=o("da010f21fea25912dd9e"),y=o.n(s),b=o("d95b0cf107403b178365"),g=o("adc20f99e57c573c589c"),v=o("fcb99a06256635f70435"),m=o("f542fec281976f8c13bd"),O=o.n(m),_="app/CategoryDetailPage/LOAD_CATEGORY_REQUEST",h="app/CategoryDetailPage/LOAD_BLOG_REQUEST",S=function(e){return{type:_,payload:e}},C=function(e){return{type:"app/CategoryDetailPage/LOAD_CATEGORY_SUCCESS",payload:e}},w=function(e){return{type:"app/CategoryDetailPage/LOAD_CATEGORY_FAILURE",payload:e}},j=function(e){return{type:h,payload:e}},L=function(e){return{type:"app/CategoryDetailPage/LOAD_BLOG_SUCCESS",payload:e}},D=function(e){return{type:"app/CategoryDetailPage/LOAD_BLOG_FAILURE",payload:e}},k=o("7edf83707012a871cdfb"),R={category:{},blog:[{category:{title:""}}]},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;return Object(k.a)(e,function(e){switch(t.type){case"app/CategoryDetailPage/LOAD_CATEGORY_SUCCESS":e.category=t.payload.data;break;case"app/CategoryDetailPage/LOAD_BLOG_SUCCESS":e.blog=t.payload.data}})},P=function(e){return e.categoryDetailPage||R},A=o("d782b72bc5b680c7122c"),x=o("6144be5eac76f277117a"),G=o("6542cd13fd5dd1bcffd4"),T=regeneratorRuntime.mark(U),B=regeneratorRuntime.mark(I),N=regeneratorRuntime.mark(Y);function U(e){var t,o;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.payload,n.next=3,Object(A.select)(Object(G.f)());case 3:return o=n.sent,n.next=6,Object(A.call)(x.a.get("blog/category/".concat(t),C,w,o));case 6:case"end":return n.stop()}},T)}function I(e){var t,o;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.payload,n.next=3,Object(A.select)(Object(G.f)());case 3:return o=n.sent,n.next=6,Object(A.call)(x.a.get("blog/blogbycat/".concat(t),L,D,o));case 6:case"end":return n.stop()}},B)}function Y(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.takeLatest)(_,U);case 2:return e.next=4,Object(A.takeLatest)(h,I);case 4:case"end":return e.stop()}},N)}function M(e){return(M="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function F(e,t,o,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),t&&r)for(var i in r)void 0===t[i]&&(t[i]=r[i]);else t||(t=r||{});if(1===c)t.children=n;else if(c>1){for(var u=new Array(c),d=0;d<c;d++)u[d]=arguments[d+3];t.children=u}return{$$typeof:a,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}function q(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function H(e,t){return!t||"object"!==M(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function J(e){return(J=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Q(e,t){return(Q=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var $=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),H(this,J(t).apply(this,arguments))}var o,n,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Q(e,t)}(t,c.a.Component),o=t,(n=[{key:"componentDidMount",value:function(){var e=this.props.match.params.id;this.props.loadBlogRequest(e)}},{key:"render",value:function(){var e=this.props.blog;return F("div",{className:"container"},void 0,F(p.Helmet,{},void 0,F("title",{},void 0,e[0].category?e[0].category.title:"")),F(f.Grid,{container:!0,spacing:8},void 0,F(f.Grid,{item:!0,lg:12},void 0,F("div",{className:"companyHeader"},void 0,F("h1",{className:"pageTitle"},void 0,F("span",{},void 0,"Blogs related to"," ",e[0].category?e[0].category.title:""))),F(f.Grid,{container:!0,spacing:8},void 0,e.map(function(e){var t=e.image,o=e.title,n=e.description,a=e.added_at,r=e.category,c=t&&t.length&&t[0].path&&"".concat(v.c).concat(t[0].path)||O.a;return F(f.Grid,{item:!0,xs:6,md:3},"blogcat-".concat(e._id),F(u.Link,{className:"blockLink",to:"/blog/".concat(e._id)},void 0,F("div",{className:"companyItem"},void 0,F("div",{},void 0,o))),F("div",{},void 0,y()(a).format("MMM Do YY")),F(u.Link,{to:"/blog-category/".concat(e.slug_url)},void 0,F("div",{className:"companyItem"},void 0,F("div",{},void 0,r?r.title:"NO"))),F(u.Link,{to:"/blog/".concat(e._id)},void 0,F("div",{className:"companyItem"},void 0,F("div",{dangerouslySetInnerHTML:{__html:n}}))),F(u.Link,{to:"/blog/".concat(e._id)},void 0,F("div",{className:"img"},void 0,F("img",{src:c,width:"200px"}))))})))))}}])&&q(o.prototype,n),a&&q(o,a),t}(),z=Object(b.a)({key:"categoryDetailPage",reducer:E}),K=Object(g.a)({key:"categoryDetailPage",saga:Y}),V=Object(d.b)({category:Object(d.a)(P,function(e){return e.category}),blog:Object(d.a)(P,function(e){return e.blog})}),W=Object(i.connect)(V,n);t.default=Object(l.compose)(z,K,W)($)}}]);