const privateNavs = require('./private');
const groupNavs = require('./group');
const chatroomNavs = require('./chatroom');
const systemNavs = require('./system');

module.exports = [{
  title: '产品概要描述',
  sidebarDepth: 1,
  children: [
    ['intro/', '架构介绍'],
    ['intro/', '主要功能'],
  ]
}, {
  title: '快速集成指南',
  sidebarDepth: 1,
  children: [
    {title: '前提条件', path: 'quick-start/'},
    {title: '导入 SDK', path: 'quick-start/'},
    {title: '初始化', path: 'quick-start/'},
    {title: '连接融云服务', path: 'quick-start/'},
    {title: '获取会话列表', path: 'quick-start/'},
    {title: '获取历史消息', path: 'quick-start/'},
    {title: '接收消息', path: 'quick-start/'},
    {title: '发送消息', path: 'quick-start/'},
  ]
},
  privateNavs,
  groupNavs,
  chatroomNavs,
  systemNavs,
{
  title: 'API 接口文档',
  children: [
    ['android', 'Android'],
    ['ios', 'iOS'],
    ['web', 'Web']
  ]
}]