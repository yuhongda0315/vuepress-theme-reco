(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{305:function(t,e,v){"use strict";v.r(e);var _=v(2),l=Object(_.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("消息属性")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("消息描述")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("消息属性")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("消息描述")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("消息类名")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("各端消息名")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("ObjectName")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("传输层名称，与消息类名一一对应")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("存储属性")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("存储 / 不存储")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("计数属性")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("计数 / 不计数")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("离线属性")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("缓存 / 不缓存")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("消息尺寸")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("128 KB")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("推送属性")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("是/否")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("推送内容")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("详见各消息类送方式")])])])]),t._v(" "),v("h6",{attrs:{id:"存储属性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#存储属性"}},[t._v("#")]),t._v(" 存储属性")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"left"}},[t._v("存储属性")]),t._v(" "),v("th",{staticStyle:{"text-align":"left"}},[t._v("存储分类")]),t._v(" "),v("th",{staticStyle:{"text-align":"left"}},[t._v("支持平台")]),t._v(" "),v("th",{staticStyle:{"text-align":"left"}},[t._v("详细描述")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("存储")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("客户端")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("Android、iOS、Flutter、PC")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("发送、接收该消息后，本地数据库存储 "),v("br"),t._v("Web 端 和 小程序端因本地存储不可靠，不支持客户端消息存储，但可通过历史消息云存储服务获取历史记录")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("存储")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("云端")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("Android、iOS、Flutter、PC、Web、小程序")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("默认不在云端进行存储，需开通"),v("a",{attrs:{href:"https://docs.rongcloud.cn/im/introduction/advanced_features/#_2",target:"_blank",rel:"noopener noreferrer"}},[t._v("历史消息云存储"),v("OutboundLink")],1),t._v("服务，开通后，可在融云服务端存储 6 个月的历史消息，供客户端按需拉取")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("不存储")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("客户端")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("Android、iOS、Flutter、PC")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("发送、接收该消息后，本地数据库不存储")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("不存储")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("云端")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("Android、iOS、Flutter、PC、Web、小程序")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("无论是否开通历史消息云存储服务，该消息均不存储")])])])]),t._v(" "),v("h6",{attrs:{id:"计数属性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#计数属性"}},[t._v("#")]),t._v(" 计数属性")]),t._v(" "),v("p",[t._v("计数属性：计数 / 不计数")]),t._v(" "),v("p",[t._v("表示客户端收到消息后，是否进行未读消息计数。")]),t._v(" "),v("p",[t._v("计数：该会话未读消息数 + 1，该属性只影响会话列表未读数计数。App 应用角标可根据每个会话列表未读数累加获得。")]),t._v(" "),v("p",[t._v("不计数：该会话未读消息数不变。")]),t._v(" "),v("p",[t._v("离线属性：存储 / 不存储")]),t._v(" "),v("p",[t._v("表示接收人当前不在线时，是否进行离线缓存。")]),t._v(" "),v("p",[t._v("存储：该消息进行离线缓存，默认 7 天。接收人在 7 天内上线，均可接收到该消息。超过 7 天后，消息被离线缓存淘汰。如有需要，可通过云端存储拉取到该消息。")]),t._v(" "),v("p",[t._v("​不存储：该消息不进行离线缓存。因此，只有接收人在线时，才可收到该消息。该消息不进行历史消息云存储、不进入云端存储（log日志）、不进行消息抄送（消息路由）。")]),t._v(" "),v("p",[t._v("推送属性：")]),t._v(" "),v("p",[t._v("当离线属性为 “ 存储 ” 时，该属性生效。离线属性为 ” 不存储“ 时，该属性无效。")]),t._v(" "),v("p",[t._v("移动端（iOS、Android）")]),t._v(" "),v("p",[t._v("​推送：当有离线缓存消息时，进行远程推送提醒。推送内容为该推送提醒显示的内容。")]),t._v(" "),v("p",[t._v("​iOS 推送平台：APNS")]),t._v(" "),v("p",[t._v("​Android 推送平台：华为、小米、魅族、OPPO、vivo、FCM、融云 PUSH")]),t._v(" "),v("p",[t._v("​不推送：当有离线缓存消息时，不进行远程推送提醒。")]),t._v(" "),v("p",[t._v("Web、小程序、PC端，由于没有推送平台，无法收到推送提醒。")])])}),[],!1,null,null,null);e.default=l.exports}}]);