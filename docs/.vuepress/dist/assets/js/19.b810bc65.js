(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{300:function(t,e,l){"use strict";l.r(e);var a=l(2),v=Object(a.a)({},(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[l("p",[t._v("1、群组指两个以上用户一起进行聊天，群组成员信息由 App 提供并进行维系，融云只负责将消息传达给群组中的所有用户。")]),t._v(" "),l("p",[t._v("2、App 在后台运行或者 App 进程被杀死后可以收到推送通知。")]),t._v(" "),l("p",[t._v("3、每个群最大人数上限为 3000 人，App 内的群组数量没有限制，每个用户加入和创建的群组数量没有限制。")]),t._v(" "),l("p",[t._v("4、群主、群管理员、群公告、邀请入群、群号搜索等均为群组业务逻辑，需在 App 侧实现，融云提供必要的管理接口。")]),t._v(" "),l("h5",{attrs:{id:"群组与聊天室的区别"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#群组与聊天室的区别"}},[t._v("#")]),t._v(" 群组与聊天室的区别")]),t._v(" "),l("p",[t._v("融云提供群组与聊天室业务，其主要区别如下，客户可根据自己的业务场景进行选择：")]),t._v(" "),l("table",[l("thead",[l("tr",[l("th",{staticStyle:{"text-align":"center"}},[t._v("功能")]),t._v(" "),l("th",{staticStyle:{"text-align":"left"}},[t._v("群组（group）")]),t._v(" "),l("th",{staticStyle:{"text-align":"left"}},[t._v("聊天室（Chatroom）")])])]),t._v(" "),l("tbody",[l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("场景")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("类似微信的群组，无论是否在线都会接收消息")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("类似直播间的弹幕，只有观看的时候接收消息")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("离线缓存消息")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("支持离线消息存储，存储时间可设置（1 ～ 7 天），默认存储 7 天。")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("无离线消息，只有在线用户才可收到聊天室消息")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("人数限制")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("默认一个群上限为 3000 人")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("聊天室人数无上限")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("消息提醒")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("离线状态，群组中有新消息时，支持远程推送（PUSH)通知")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("离开聊天室后不再接收消息")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("本地存储")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("移动端本地数据库存储，提供本地消息搜索接口")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("退出聊天室后同时删除本地聊天室消息，不支持消息搜索功能")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("云端存储")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("需开通单群聊消息云存储，可以提供 6 - 36 个月存储服务")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("需开通聊天室消息云存储，可以提供 2 - 12 个月存储服务")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("用户加入限制")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("一个用户可加入多个群组，无限制")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("默认一个用户只能加入一个聊天室，加入多个聊天室功能可在开发者后台自行开通")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("加入后消息获取逻辑")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("默认加入群组后，只能查看加入后群组中产生的消息。如需要查看群历史消息，则需要开通单群聊消息云存储后，再开通“查看加入前群消息”功能")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("加入后可获取聊天室中最新的 50 条消息。")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("销毁/解散逻辑")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("需要通过 AppServer 自行调用解散群组接口。")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("提供销毁聊天室接口，可通过 AppServer 调用。同时聊天室中 1 小时内没有消息产生时，将自动销毁聊天室。")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("消息可靠度")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("100% 可靠，不丢消息。")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("消息量较大时，超出消费上限的消息将被丢弃，查看详细")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("相关接口调用")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("SDK 不提供群组管理功能接口，通过 Server API 提供群组功能接口。")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("SDK 和 Server API 同时提供功能接口，销毁聊天室操作只能通过 Server API 方式调用。")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"center"}},[t._v("发送消息频率")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("每个客户端 5 条/秒，服务端调用，每秒钟 20 条/秒")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("每个客户端 5 条/秒，服务端调用，每秒钟 100 条/秒")])])])])])}),[],!1,null,null,null);e.default=v.exports}}]);