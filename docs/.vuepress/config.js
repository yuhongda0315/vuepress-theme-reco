const NoUINavs = require('./navs/noui');
const TestNavs = require('./navs/test/index');
const Test2Navs = require('./navs/test/test');

let base = '';
let Summary = require('./summary');
Summary = Summary({
  base
});

module.exports = {
  title: "融云开发者文档",
  plugins: ['@vuepress/active-header-links', 'vuepress-plugin-element-tabs', 'vuepress-plugin-glossary', '@codeciting/vuepress-plugin-plantuml', 'element-ui', 'demo-code'],
  patterns: ['**/*.md', '**/*.vue'],
  head: [
    ['link', { rel: 'icon', href: 'https://docs.rongcloud.cn/assets/images/favicon.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['script', { src: '//cdn.ronghub.com/rongcloud-feedback.1.0.0.js' }],
    ['script', { src: '//cdn.ronghub.com/docs-feedback-inject.1.0.0.js' }],
    ['link', { rel: "stylesheet", href: '//cdn.ronghub.com/rongcloud-feedback.css' }],
  ],
  theme: require.resolve('../../'),
  themeConfig: {
    isOldVersion: false,
    tabs: {
      hasIMTab: {
        categorys: [
          {
            name: '客户端',
            languages: [
              { name: 'multi', groupName: 'ios', children: [{ name: 'ios4', text: 'iOS 4.x', link: './ios?ver=4', isFire: true }, { name: 'ios2', text: 'iOS 2.x', link: './ios' }] },
              { name: 'multi', groupName: 'android', children: [{ name: 'android4', text: 'Android 4.x', link: './android?ver=4', isFire: true }, { name: 'android2', text: 'Android 2.x', link: './android' }] },
              { name: 'multi', groupName: 'web', children: [{ name: 'web3', text: 'Web 3.x', isFire: true, link: './web3' }, { name: 'web', text: 'Web 2.x', link: './web' }] },
              { name: 'mini', text: '小程序 3.x', link: './web3?plat=mini' },
              { name: 'uniapp', text: 'uni-app 3.x', link: './web3?plat=uniapp' }
            ]
          },
          {
            name: '服务端',
            languages: [
              { name: 'serverapi', text: 'Server API', link: './serverapi' }
            ]
          }
        ]
      }
    },
    base,
    oldBase: '/v2',
    newBase: '/v4',
    nav: {
      logo: {
        url: 'https://www.rongcloud.cn/pc/images/logo.png',
        link: 'https://www.rongcloud.cn/'
      },
      titles: [
        { text: '文档首页', link: '/' },
        { text: '即时通讯', link: '/views/im/noui/guide/private/message/web.html' },
        { text: '运营服务', link: '/views/im/noui/guide/private/message/web.html' },
        { text: '音视频', link: '/views/im/noui/guide/private/message/web.html' },
      ],
      subTitles: [
        {
          type: 'select',
          text: '场景阅读模式',
          children: [{ text: '平台阅读模式', link: '' }]
        }
      ]
    },
    summary: Summary,
    apiSearchPlaceholder: '输入 API 快速检索',
    like: {
      title: '文档是否解决您的问题 ?',
      success: '提交成功',
      thank: '非常感谢您的反馈，我们会继续努力做到更好 !',
      afterHtml: '<p>如果遇到产品相关问题，您可 <a href="https://www.baidu.com">提交工单</a> 寻求帮助</p>'
    },
    routerConfig: {
      navs: [
        { text: '含 UI 集成', link: '/views/im/ui/intro/', keyword: '/views/im/ui' },
        { text: '无 UI 集成', link: '/views/im/noui/intro/', keyword: '/views/im/noui' }
      ]
    },
    sidebar: {
      '/views/im/noui/': NoUINavs
    },
    // sidebar: [
    //   { key: 'hahatest2', bars: Test2Navs, isMatchQuery: true },
    //   { key: `/views/im/noui/quick-start`, bars: TestNavs },
    //   // { key: `/views/im/noui/intro`, bars: Test2Navs }
    // ],
    // logo: '/head.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // 备案号
    record: '京公网安备 11010502033445 号',
    startYear: '2019',
    noFoundPageByTencent: false,
    recommends: [
      {
        title: '推荐产品',
        childs: [
          { title: 'IM 即时通讯', url: '' },
          { title: '聊天室', url: '' },
          { title: '实时音视频', url: '' },
          { title: '低延时直播', url: '' },
          { title: '音视频会议', url: '' }
        ]
      },
      {
        title: '推荐解决方案',
        childs: [
          { title: '语音聊天室解决方案', url: '' },
          { title: '在线教育解决方案', url: '' },
          { title: '小程序解决方案', url: '' },
          { title: '金融解决方案', url: '' },
          { title: '企业通讯解决方案', url: '' }
        ]
      }
    ],
    searchPlatform: {
      common: "产品介绍",
      android: "Android",
      ios: "iOS",
      web: "Web 2.x",
      web3: "Web 3.x",
      server: "Server"
    }
  },
  markdown: {
    lineNumbers: true,
    toc: {
      includeLevel: [3, 4, 5],
    },
    extendMarkdown: md => {
      md.use(require('markdown-it-include'), 'docs/views/');

      md.use(require('markdown-it-toc-done-right'), {
        listType: 'ul',
        slugify: function (s) {
          let matches = s.match(/\\?\{([^}]+)\}/) || [];
          let id = matches[1] || s;
          id = id.replace('#', '');
          return id;
        },
        format: function (label, htmlencode) {
          label = label.replace(/\\?\{([^}]+)\}/, '');
          return `${htmlencode(label)}`;
        }
      });
      md.use(require('markdown-it-super-header'));
    }
  }
}
