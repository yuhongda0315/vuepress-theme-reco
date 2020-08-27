<template>
  <header class="navbar rong-nav">
    <div class="rong-nav-box">
      <a :href="$themeConfig.nav.logo.link" target="_blank"><img class="rong-nav-logo" :src="$themeConfig.nav.logo.url" alt=""></a>
      <a class="rong-nav-title rong-small-screen-nav-title" :href="$site.base">
        文档首页
      </a>
      <a
        class="rong-nav-title"
        v-for="title in $themeConfig.nav.titles"
        :key="title.text"
        :href="title.link">
        {{ title.text }}
      </a>
      <SearchBox/>
      <a
        class="rong-nav-subtitle"
        v-for="subtitle in $themeConfig.nav.subTitles"
        :key="subtitle.text"
        :target="subtitle.target"
        :href="subtitle.link">
        <el-dropdown v-if="subtitle.type === 'select'" class="rong-nav-version-dropdown-box">
          <span class="el-dropdown-link">
            {{subtitle.text}}<i class="rong-nav-version-dropdown-icon el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(child, index) in subtitle.children"
              v-bind:key="index"
              @click.native="linkUrl(child.link)">
              {{child.text}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <template v-else>
          {{ subtitle.text }}
        </template>
      </a>
      <a class="rong-nav-subtitle" v-if="dropdownVersions && dropdownVersions.length > 1">
        <el-dropdown class="rong-nav-version-dropdown-box">
          <span class="el-dropdown-link">
            {{selectedDropdownVersion.name}}<i class="rong-nav-version-dropdown-icon el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(versionItem, index) in dropdownVersions"
              v-bind:key="index"
              @click.native="versionItem.click && versionItem.click()">
              {{versionItem.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </a>
    </div>
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton'
import NavLinks from '@theme/components/NavLinks'
import Mode from '@theme/components/Mode'
import utils from '@theme/components/utils'

const getDropdownVersions = utils.getDropdownVersions

const initData = (context) => {
  const { $themeConfig: { oldBase, newBase }} = context
  if (!oldBase || !newBase) {
    return
  }
  context.dropdownVersions = getDropdownVersions(context) || [
    { name: '4.x 版本', click: () => {
      window.location.href = window.location.origin + context.$themeConfig.newBase
    } },
    { name: '2.x 版本', click: () => {
      window.location.href = window.location.origin + context.$themeConfig.oldBase
    } }
  ]
  const versionCount = context.dropdownVersions.length
  if (context.dropdownVersions && versionCount) {
    context.selectedDropdownVersion = context.$themeConfig.isOldVersion ? context.dropdownVersions[versionCount - 1] : context.dropdownVersions[0]
  }
}

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox, Mode },

  data () {
    return {
      linksWrapMaxWidth: null,
      dropdownVersions: null,
      selectedDropdownVersion: null
    }
  },

  watch: {
    $route (newRoute, oldRoute) {
      initData(this)
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING -
          (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
    initData(this)
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  methods: {
    linkUrl (url) {
      url && (window.location.href = url)
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
@require '../styles/mode.styl'

$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  box-shadow var(--box-shadow)
  background var(--background-color)
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.2rem
    font-weight 600
    color var(--text-color)
    position relative
    background var(--background-color)
  .links
    padding-left 1.5rem
    box-sizing border-box
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    background-color var(--background-color)
    .search-box
      flex: 0 0 auto
      vertical-align top

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
.rong-nav-version-dropdown-box {
  position: relative;
  // top: 140px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px;
  vertical-align: middle;
  z-index: 99;
  .rong-nav-version-dropdown-icon {
    float: none;
  }
  .el-dropdown-link {
    color: white;
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
}
</style>
