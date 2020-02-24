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
      '/views/im/ui/': [],
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
      includeLevel: [3,4,5],
    },
    extendMarkdown: md => {
      md.use(require('markdown-it-include'), 'docs/views/');
      md.use(require('markdown-it-super-header'));
      md.use(require('markdown-it-toc-done-right'), {
        listType: 'ul',
        slugify: function(s){
          let matches = s.match(/\\?\{([^}]+)\}/) || [];
          let id = matches[1] || s;
          id = id.replace('#', '');
          return id;
        },
        format: function(label, htmlencode){
          label = label.replace(/\\?\{([^}]+)\}/, '');
          return `${htmlencode(label)}`;
        }
      });
    }
  }
}
