const privateNavs = require('./private');

module.exports = [ {
  title: '快速集成指南',
  sidebarDepth: 1,
  children: [
    {title: '前提条件', path: 'quick-start/'}
  ]
},
  privateNavs
  ,
{
  title: 'API 接口文档',
  children: [
    ['android', 'Android'],
    ['ios', 'iOS'],
    ['web', 'Web']
  ]
}
]