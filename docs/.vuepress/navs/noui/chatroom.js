module.exports = {
  title: '聊天室会话集成',
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
        ['guide/private/message/ios', '注册自定义消息'], 
        ['guide/private/message/ios', '消息回执'], 
        ['guide/private/message/ios', '消息撤回'], 
        ['guide/private/message/ios', '消息插入'], 
        ['guide/private/message/ios', '消息删除'], 
      ]
    },{
      title: '聊天室管理',
      sidebarDepth: 1,
      children: [
        ['guide/private/message/ios', '聊天室基础功能'],
        ['guide/private/message/ios', '超大消息量处理'],
        ['guide/private/message/ios', '聊天室保活'],
        ['guide/private/message/ios', '聊天室属性扩展'],
        ['guide/private/message/ios', '聊天室但成员管理'],
        ['guide/private/message/ios', '聊天室全体成员管理'],
        ['guide/private/message/ios', '聊天室全体成员管理'],
        ['guide/private/message/ios', '聊天室状态同步'],
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