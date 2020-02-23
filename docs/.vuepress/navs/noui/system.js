module.exports = {
  title: '系统会话集成',
  children: [ {
    title: '全局配置',
    sidebarDepth: 1,
    children: [
      ['guide/private/message/ios', '导入 SDK'],
      ['guide/private/message/ios', '初始化'],
      ['guide/private/message/ios', '打包混淆'],
    ]
  }, {
    title: '用户管理',
    sidebarDepth: 1,
    children: [
      ['guide/private/message/ios', '注册用户'],
      ['guide/private/message/ios', '封禁用户'],
      ['guide/private/message/ios', '删除用户'],
      ['guide/private/message/ios', '修改用户信息'],
      ['guide/private/message/ios', '获取用户信息'],
      ['guide/private/message/ios', '显示用户信息'],
    ]
  },{
    title: '连接管理',
    sidebarDepth: 1,
    children: [
      ['guide/private/message/ios', '连接服务'],
      ['guide/private/message/ios', '断开连接'],
      ['guide/private/message/ios', '在线状态'],
      ['guide/private/message/ios', '多端同时在线'],
    ]
  },{
      title: '会话管理',
      sidebarDepth: 1,
      children: [
        ['guide/private/message/ios', '李斐补充'],
      ]
    }, {
      title: '消息管理',
      sidebarDepth: 1,
      children: [
        ['guide/private/message/ios', '消息发送'], 
        ['guide/private/message/ios', '消息接收'], 
        ['guide/private/message/ios', '本地通知提醒'], 
        ['guide/private/message/ios', '远端推送提醒'], 
        ['guide/private/message/ios', '注册自定义消息'], 
        ['guide/private/message/ios', '消息存储'], 
        ['guide/private/message/ios', '消息撤回'], 
        ['guide/private/message/ios', '消息搜索'], 
        ['guide/private/message/ios', '消息删除'], 
      ]
    }, {
      title: '安全管理',
      sidebarDepth: 1,
      children: [
        ['guide/private/message/ios', '消息敏感词'],
        ['guide/private/message/ios', '消息反垃圾'],
        ['guide/private/message/ios', '手机号画像'],
        ['guide/private/message/ios', '消息回调服务'],
      ]
    }, {
      title: '日志管理',
      sidebarDepth: 1,
      children: []
    }
  ]
}