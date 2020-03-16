module.exports = function(option){
  let {base} = option;
  return {
    main: [
      {
        name: '即时通讯',
        sub: [
          {
            name: '单聊',
            titles: [
              { name: '含 UI SDK 集成', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' },
              { name: '无 UI SDK 集成', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' }
            ]
          },
          {
            name: '群聊',
            titles: [
              { name: '含 UI SDK 集成', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' },
              { name: '无 UI SDK 集成', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' }
            ]
          },
          {
            name: '聊天室',
            titles: [
              { name: '集 成 文 档', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' },
              { name: '最 佳 实 践', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' },
            ]
          },
          {
            name: '系统通知',
            titles: [
              { name: '含 UI SDK 集成', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' },
              { name: '无 UI SDK 集成', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' }
            ]
          }
        ]
      },
      {
        name: '实时音视频',
        sub: [
          {
            name: '音视频通话',
            titles: [
              { name: '含 UI SDK 集成', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' },
              { name: '无 UI SDK 集成', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' }
            ]
          },
          {
            name: '音视频会议',
            titles: [
              { name: '集 成 文 档', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' },
            ]
          },
          {
            name: '互动直播',
            titles: [
              { name: '集 成 文 档', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' },
            ]
          }
        ]
      },{
        name: '运营服务',
        sub: [
          {
            name: '',
            titles:[{ name: '短信', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' }]
          },
          {
            name: '',
            titles:[{ name: '客服', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' }]
          },
          {
            name: '',
            titles:[
            { name: '手机号画像', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' }]
          },
          {
            name: '',
            titles:[
            { name: '反垃圾', link: '/developer-docs/views/im/noui/guide/quick/premise/ios.html' }]
          }
        ]
      }
    ],
    other: [
    ]
  };
};