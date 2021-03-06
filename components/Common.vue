<template>
  <div
    class="theme-container rong-box"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">
    <div >
      <transition name="fade">
        <div>
          <Navbar
          v-if="shouldShowNavbar"
          @toggle-sidebar="toggleSidebar"/>

          <div
            class="sidebar-mask"
            @click="toggleSidebar(false)"></div>

          <div class="rong-content-box" :class="(!$themeConfig.nav.subTitles || !$themeConfig.nav.subTitles.length) && 'rong-content-no-subnavi'">
            <Sidebar
              :items="sidebarItems"
              :isSidebarOpen="isSidebarOpen"
              @toggle-sidebar="toggleSidebar">
              <slot
                name="sidebar-top"
                slot="top"/>
              <slot
                name="sidebar-bottom"
                slot="bottom"/>
            </Sidebar>

            <Password v-if="!isHasPageKey" :isPage="true"></Password>
            <div v-else class="rong-page-content">
              <slot></slot>
              <!-- <Comments :isShowComments="shouldShowComments"/> -->
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar'
import Sidebar from '@theme/components/Sidebar'
import { resolveSidebarItems } from '@theme/helpers/utils'
import Password from '@theme/components/Password'
import { setTimeout } from 'timers'

export default {
  components: { Sidebar, Navbar, Password },

  props: {
    sidebar: {
      type: Boolean,
      default: true
    },
    isComment: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      isSidebarOpen: false,
      isHasKey: true,
      isHasPageKey: true,
      firstLoad: true
    }
  },

  computed: {
    absoluteEncryption () {
      return this.$themeConfig.keyPage && this.$themeConfig.keyPage.absoluteEncryption === true
    },
    // 是否显示评论
    shouldShowComments () {
      const { isShowComments, home } = this.$frontmatter
      return !(
        this.isComment == false ||
        isShowComments == false ||
        home == true
      )
    },

    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page

      if (
        frontmatter.navbar === false ||
        themeConfig.navbar === false
      ) return false

      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        this.sidebar !== false &&
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },

    sidebarItems () {
      const items = resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
      return items
    },

    pageClasses () {
      const userPageClass = this.$frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  mounted () {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })

    this.hasKey()
    this.hasPageKey()
    this.handleLoading()
  },

  methods: {
    hasKey () {
      const keyPage = this.$themeConfig.keyPage
      if (!keyPage) {
        this.isHasKey = true
        return
      }

      const keys = keyPage.keys
      this.isHasKey = keys && keys.indexOf(sessionStorage.getItem('key')) > -1
    },
    hasPageKey () {
      const pageKeys = this.$frontmatter.keys
      if (!pageKeys) {
        this.isHasPageKey = true
        return
      }

      this.isHasPageKey = pageKeys && pageKeys.indexOf(sessionStorage.getItem(`pageKey${window.location.pathname}`)) > -1
    },
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },

    handleLoading () {
      const time = this.$frontmatter.home && sessionStorage.getItem('firstLoad') == undefined ? 1000 : 0
      setTimeout(() => {
        this.firstLoad = false
        if (sessionStorage.getItem('firstLoad') == undefined) sessionStorage.setItem('firstLoad', false)
      }, time)
    }
  },

  watch: {
    $frontmatter (newVal, oldVal) {
      this.hasKey()
      this.hasPageKey()
    }
  }
}
</script>

<style lang="stylus" scoped>
.theme-container
  .loading-wrapper
    position absolute
    z-index 22
    top 0
    bottom 0
    left 0
    right 0
    margin auto
  .password-wrapper-out
    position absolute
    z-index 21
    top 0
    bottom 0
    left 0
    right 0
    margin auto
  .password-wrapper-in
    position absolute
    z-index 8
    top 0
    bottom 0
    left 0
    right 0
  .hide
    height 100vh
    overflow hidden
.theme-container.no-sidebar
  .comments-wrapper
    padding-left 2rem

.comments-wrapper
  padding 2rem 2rem 2rem 22rem
  max-width: 740px;
  margin: 0 auto;
@media (max-width: $MQNarrow)
  .theme-container.no-sidebar
    .comments-wrapper
      padding-left 2rem
  .comments-wrapper
    padding-left: 18.4rem;
@media (max-width: $MQMobile)
  .comments-wrapper
    padding-left: 2rem
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
