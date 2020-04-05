module.exports = {
  title: '单聊会话集成',
  depth: 'guide/private/',
  children: [{
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
      }
    ]
  },{
    title: '消息管理',
    depth: 1,
    children: [
      { title: '消息发送', path: 'guide/private/message/ios', depth: '' }
    ]
  }
  ]
}