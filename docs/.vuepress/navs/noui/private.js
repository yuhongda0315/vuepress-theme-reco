module.exports = {
  title: '单聊会话集成',
  depth: 'guide/private/',
  children: [{
    title: '全局配置',
    depth: 1,
    children: [
      { title: 'SDK', path: 'guide/private/message/ios', depth: '' },
      { title: '初始化', path: 'guide/private/message/ios', depth: '' },
      { title: '打包混淆', path: 'guide/private/message/ios', depth: '' },
    ]
  }, {
    title: '用户管理',
    depth: 'user/',
    children: [
      {
        title: '注册用户',
        depth: 'register/',
        path: 'guide/private/user/register/nodejs'
      },
      {
        title: '封禁用户',
        depth: 'block/',
        path: 'guide/private/user/block/nodejs'
      },
      {
        title: '删除用户',
        depth: 'message',
        path: 'guide/private/user/block/nodejs'
      },
      {
        title: '修改用户信息',
        depth: 'message',
        path: 'guide/private/user/block/nodejs'
      },
      { 
        title: '获取用户信息',
        depth: 'message',
        path: 'guide/private/user/block/nodejs'
      },
      {
        title: '显示用户信息',
        depth: 'message',
        path: 'guide/private/user/block/nodejs'
      },
    ]
  },
  {
    title: '单聊管理',
    depth: 1,
    children: [
      { title: '好友关系', path: 'guide/private/message/ios', depth: '' },
      { title: '用户黑名单', path: 'guide/private/message/ios', depth: '' },
      { title: '用户白名单', path: 'guide/private/message/ios', depth: '' },
    ]
  }, {
    title: '连接管理',
    depth: 1,
    children: [
      { title: '连接服务', path: 'guide/private/message/ios', depth: '' },
      { title: '断开连接', path: 'guide/private/message/ios', depth: '' },
      { title: '在线状态', path: 'guide/private/message/ios', depth: '' },
      { title: '多端同时在线', path: 'guide/private/message/ios', depth: '' },
    ]
  }, {
    title: '会话管理',
    depth: 1,
    children: [
      { title: '李斐补充', path: 'guide/private/message/ios', depth: '' },
    ]
  }, {
    title: '消息管理',
    depth: 1,
    children: [
      { title: '消息发送', path: 'guide/private/message/ios', depth: '' },
      { title: '消息接收', path: 'guide/private/message/ios', depth: '' },
      { title: '本地通知提醒', path: 'guide/private/message/ios', depth: '' },
      { title: '远端推送提醒', path: 'guide/private/message/ios', depth: '' },
      { title: '注册自定义消息', path: 'guide/private/message/ios', depth: ''},
        { title: '消息回执', path: 'guide/private/message/ios', depth: '' },
      { title: '消息撤回', path: 'guide/private/message/ios', depth: '' },
      { title: '消息搜索', path: 'guide/private/message/ios', depth: '' },
      { title: '消息插入', path: 'guide/private/message/ios', depth: '' },
      { title: '消息更新', path: 'guide/private/message/ios', depth: '' },
      { title: '消息删除', path: 'guide/private/message/ios', depth: '' },
      { title: '消息存储', path: 'guide/private/message/ios', depth: '' },
    ]
  }, {
    title: '安全管理',
    depth: 1,
    children: [
      { title: '消息敏感词', path: 'guide/private/message/ios', depth: '' },
      { title: '消息反垃圾', path: 'guide/private/message/ios', depth: '' },
      { title: '手机号画像', path: 'guide/private/message/ios', depth: '' },
      { title: '消息回调服务', path: 'guide/private/message/ios', depth: '' },
    ]
  }, {
    title: '日志管理',
    depth: 1,
    children: []
  }
  ]
}