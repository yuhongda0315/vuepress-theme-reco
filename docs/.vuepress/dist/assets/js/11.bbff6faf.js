(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{240:function(t,e,a){},285:function(t,e,a){"use strict";var r=a(240);a.n(r).a},292:function(t,e,a){"use strict";a.r(e);a(47);var r=a(198),n=a(245),s=a(202),o=a(201),i=a(196),u=a(187),c={mixins:[o.a,u.a],components:{Common:r.a,NoteAbstract:s.a,TagList:n.a,ModuleTransition:i.a},data:function(){return{tags:[],currentTag:"全部",currentPage:1,allTagName:"全部"}},created:function(){this.$tags.list.length>0&&(this.currentTag=this.$route.query.tag?this.$route.query.tag:this.currentTag)},mounted:function(){this._setPage(this._getStoragePage())},methods:{tagClick:function(t){this.$router.push({path:t.path})},getCurrentTag:function(t){this.$emit("currentTag",t)},getCurrentPage:function(t){this._setPage(t),setTimeout((function(){window.scrollTo(0,0)}),100)},_setPage:function(t){this.currentPage=t,this.$page.currentPage=t,this._setStoragePage(t)}}},g=(a(188),a(285),a(2)),l=Object(g.a)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tags-wrapper"},[a("Common",{attrs:{sidebar:!1,isComment:!1}},[a("ModuleTransition",[a("TagList",{directives:[{name:"show",rawName:"v-show",value:t.recoShowModule,expression:"recoShowModule"}],attrs:{currentTag:t.currentTag},on:{getCurrentTag:t.tagClick}})],1),t._v(" "),a("ModuleTransition",{attrs:{delay:"0.08"}},[a("note-abstract",{directives:[{name:"show",rawName:"v-show",value:t.recoShowModule,expression:"recoShowModule"}],staticClass:"list",attrs:{data:t.$recoPosts,currentPage:t.currentPage,currentTag:t.currentTag},on:{currentTag:t.getCurrentTag}})],1),t._v(" "),a("ModuleTransition",{attrs:{delay:"0.16"}},[a("pagation",{staticClass:"pagation",attrs:{total:t.$recoPosts.length,currentPage:t.currentPage},on:{getCurrentPage:t.getCurrentPage}})],1)],1)],1)}),[],!1,null,"2fdc170c",null);e.default=l.exports}}]);