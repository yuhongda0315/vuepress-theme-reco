const path = require('path')

// Theme API.
module.exports = (options, ctx) => ({
  alias() {
    const { themeConfig, siteConfig } = ctx
    // resolve algolia
    const isAlgoliaSearch = (
      themeConfig.algolia ||
      Object.keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
    )
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js'),
      '@SearchBox': path.resolve(__dirname, 'components/SearchBox.vue')
    }
  },
  plugins: [
    'vuepress-plugin-element-tabs',
    ['@vuepress-reco/back-to-top', {
      customStyle: {
        right: '12rem',
        bottom: '4rem',
        width: '2.5rem',
        height: '2.5rem',
        'border-radius': '.25rem',
        'line-height': '2.5rem'
      }
    }],
    '@vuepress-reco/extract-code',
    '@vuepress-reco/pagation',
    '@vuepress/active-header-links',
    ['@vuepress/medium-zoom', {
      selector: '.theme-reco-content :not(a) > img'
    }],
    '@vuepress/plugin-nprogress',
    ['container', {
      type: 'tip',
      defaultTitle: {
        '/zh/': '提示'
      }
    }],
    ['container', {
      type: 'warning',
      defaultTitle: {
        '/zh/': '注意'
      }
    }],
    ['container', {
      type: 'danger',
      defaultTitle: {
        '/zh/': '警告'
      }
    }]
  ]
})
