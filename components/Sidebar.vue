<template>
  <div v-if="isSidebarOpen" class="rong-sidebar-box rong-mobile-sidebar-box">
    <aside class="sidebar rong-sidebar">
          <!-- <PersonalInfo/> -->
          <NavLinks/>
          <slot name="top"/>
          <SidebarLinks :depth="0" :items="items"/>
          <slot name="bottom"/>
    </aside>
  </div>
  <div v-else class="rong-sidebar-box">
    <div class="rong-sidebar-all">
      <div class="rong-sidebar-all-title">
        全部文档
        <div class="rong-sidebar-all-content-placeholder"></div>
        <div class="rong-sidebar-all-content" v-if="(mainSummary && mainSummary.length) || (otherSummary && otherSummary.length)">
          <div v-for="(summary, index) in mainSummary" :key="index" class="rong-sidebar-summary">
            <p class="rong-sidebar-summary-title">{{summary.name}}</p>
            <div v-for="(subSummary, index) in summary.sub" :key="index" class="rong-sidebar-sub-summary">
              <p class="rong-sidebar-sub-summary-title">{{subSummary.name}}</p>
              <ul>
                <li v-for="(title, index) in subSummary.titles" :key="index">
                  <a :href="title.link">{{title.name}}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="rong-sidebar-summary rong-sidebar-other-summary">
            <div v-for="(summary, index) in otherSummary" :key="index" class="rong-sidebar-sub-summary">
              <p class="rong-sidebar-summary-title">{{summary.name}}</p>
              <ul>
                <li v-for="(title, index) in summary.titles" :key="index">
                  <a :href="title.link">{{title.name}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <NavRouter/>
      </div>
    </div>
    <aside class="sidebar rong-sidebar">
      <!-- <PersonalInfo/> -->
      <NavLinks/>
      <slot name="top"/>
      <SidebarLinks :depth="0" :items="items"/>
      <slot name="bottom"/>
    </aside>
  </div>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks'
import PersonalInfo from '@theme/components/PersonalInfo'
import NavLinks from '@theme/components/NavLinks'
import NavRouter from '@theme/components/NavRouter'

export default {
  name: 'Sidebar',

  data: function () {
    return {
      mainSummary: [],
      otherSummary: []
    }
  },

  components: { SidebarLinks, NavLinks, PersonalInfo, NavRouter },

  mounted: function () {
    var summary = this.$themeConfig.summary || {}
    this.mainSummary = summary.main
    this.otherSummary = summary.other
    console.log(summary)
  },

  props: ['items', 'isSidebarOpen']
}
</script>

<style lang="stylus">
.sidebar
  user-select: none;
  .personal-info-wrapper
    display none
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid var(--border-color)
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 0.9em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 3rem 0 1.5rem 0
    & > li > a.sidebar-link
      font-size 0.9rem
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem

@media (max-width: $MQMobile)
  .sidebar
    .personal-info-wrapper
      display block
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>
