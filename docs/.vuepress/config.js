const NoUINavs = require('./navs/noui');
module.exports = {
  title: "融云开发者文档",
  plugins: ['@vuepress/active-header-links', 'vuepress-plugin-element-tabs'],
  head: [
    ['link', { rel: 'icon', href: 'https://docs.rongcloud.cn/assets/images/favicon.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: require.resolve('../../'),
  themeConfig: {
    nav: [
      { text: '书写规范', link: '/helper/', icon: 'reco-chanpin' },
      { text: 'SDK 下载', link: 'https://www.rongcloud.cn/downloads', icon: 'reco-xiazai' },
      { text: '工单', link: 'https://developer.rongcloud.cn/ticket/create', icon: 'reco-gongdan' },
      { text: '我的控制台/登录', link: 'https://developer.rongcloud.cn', icon: 'reco-denglu' },
    ],
    routerConfig: {
      navs: [
        { text: '含 UI 集成', link: '/views/im/ui/intro/', keyword: '/views/im/ui' },
        { text: '无 UI 集成', link: '/views/im/noui/intro/', keyword: '/views/im/noui' }
      ]
    },
    sidebar: {
      '/views/im/ui/': [{
        title: '产品简介',
        sidebarDepth: 1,
        children: [
          ['intro/', '架构介绍'],
          ['intro/', '主要功能'],
        ]
      },{
        title: '快速集成',
        sidebarDepth: 1,
        children: [
          ['quick-start/', '前提条件'],
          ['quick-start/', '导入 SDK'],
          ['quick-start/', '初始化'],
          ['quick-start/', '连接融云服务'],
          ['quick-start/', '集成会话列表'],
          ['quick-start/', '集成会话界面'],
          ['quick-start/', '设置用户信息'],
        ]
      },{
        title: '集成文档',
        children: [
          {
            title: '用户管理',
            sidebarDepth: 1,
            children: [
              ['integrate-guide/', '注册用户']
            ]
          },
          {
            title: '群组管理',
            sidebarDepth: 1
          },
          {
            title: '全局配置',
            sidebarDepth: 1
          },
          {
            title: '初始化',
            sidebarDepth: 1
          },
          {
            title: '连接管理',
            sidebarDepth: 1
          },
          {
            title: '会话列表',
            sidebarDepth: 1
          },
          {
            title: '会话界面',
            sidebarDepth: 1
          },
          {
            title: '聊天室',
            sidebarDepth: 1
          }
        ]
      },{
        title: 'API 文档',
        children: [
          ['api', 'Android'],
          ['api', 'iOS'],
          ['api', 'Web']
        ]
      }],
      '/views/im/noui/': NoUINavs,
      '/helper/': [
        ['', '组织逻辑']
      ]
    },
    // logo: '/head.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // 备案号
    record: '京公网安备 11010502033445 号',
    startYear: '2019',
    noFoundPageByTencent: false
  },
  markdown: {
    lineNumbers: true,
    toc: {
      includeLevel: [3,4,5]
    },
    extendMarkdown: md => {
      md.use(require('markdown-it-include'), 'docs/views/')
    }
  }
}
