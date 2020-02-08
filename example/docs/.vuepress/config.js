module.exports = {
  title: "融云开发者文档",
  dest: 'example/docs/public',
  plugins: ['@vuepress/active-header-links', 'vuepress-plugin-element-tabs'],
  head: [
    ['link', { rel: 'icon', href: 'https://docs.rongcloud.cn/assets/images/favicon.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  // theme: 'reco',
  theme: require.resolve('../../../'),
  themeConfig: {
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeLine/', icon: 'reco-date' },
      { text: 'Contact',
        icon: 'reco-message',
        items: [
          { text: 'NPM', link: 'https://www.npmjs.com/~reco_luan', icon: 'reco-npm' },
        ]
      }
    ],
    routerConfig: {
      navs: [
        { text: 'iOS', link: '/views/other/guide/private/user/register/ios', keyword: 'user/register/ios', icon: 'reco-home' },
        { text: 'Android', link: '/views/other/guide/private/user/register/android', keyword: 'user/register/android', icon: 'reco-home' },
        { text: 'TimeLine', link: '/timeLine/', keyword: 'timeLine', icon: 'reco-date' }]
    },
    // logo: '/head.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    sidebar: {
      '/views/other/': [
        {
          title: '单聊会话集成',
          depth: 'guide/private/',
          children: [{
            title: '用户管理',
            depth: 'user/',
            children: [{
              title: '用户注册',
              path: 'guide/private/user/register/ios'
            }]
        }]
        }
      ]
    },
    // 备案号
    record: '京公网安备 11010502033445 号',
    startYear: '2019'
  },
  markdown: {
    lineNumbers: true,
    toc: [2,3]
  }
}
