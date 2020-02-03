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
      navs: [{ text: 'Home', link: '/views/other/guide.html', icon: 'reco-home' },
        { text: 'TimeLine', link: '/timeLine/', icon: 'reco-date' }]
    },
    // logo: '/head.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    sidebar: {
      '/views/other/': [
        ['guide', '产品概述']
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
