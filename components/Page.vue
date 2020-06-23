<template>
  <main class="page rong-page" :class="{ 'page-api': isAPI, 'rong-page-faq': isFaq }">
    <APIPage v-if="isAPI" />
    <div v-else>
      <ModuleTransition>
        <ul class="header-navs">
          <li class="header-nav" v-for="(item, index) in navs" :key="index" :class="{'is-active': navs.length -1 == index}">
            <a class="iconfont" @click="navigateTo(item.url)" v-text="item.title" />
          </li>
        </ul>
      </ModuleTransition>

      <ModuleTransition delay="0.08">
        <div class="page-title">
          <p class="page-title-content">{{pageTitle}}
            <span v-if="this.$page.frontmatter.time" class="page-title-time">( {{this.$page.frontmatter.time}} )</span>
          </p>
        </div>
      </ModuleTransition>

      <div class="rong-category-box rong-category-padding">
        <div class="rong-category-titles">
          <template v-for="(category, index) in categorys">
            <a class="rong-category-title" :key="index" v-if="!category.isHide" :selected="isCategorySelected(category)" @click.prevent="selectCategory(category)">
              {{category.name}}
            </a>
          </template>
        </div>
        <div class="rong-category-titles">
          <template v-for="(category, index) in categorys">
            <ul class="category-wrapper rong-category-wrapper" :key="index" v-if="isCategorySelected(category)">
              <li class="category-item" v-for="(item, index) in category.platforms" :key="index" :class="isPlatformSelected(item) ? 'active': ''">
                <v-select
                  :ref="'select' + index"
                  v-if="item.name === 'multi'"
                  class="rong-category-child"
                  :value="item.selected.text"
                  :clearable="false"
                  :options="item.children"
                  @input="setSelected($event, index)"
                  label="text"
                  :searchable="false"
                  >
                  <template v-slot:option="option">
                    <span
                      class="iconfont"
                      :class="{'reco-fire':option.isFire,  'rong-option': option.isFire}"
                    ></span>
                    {{ option.text }}
                  </template>
                </v-select>
                <a v-else @click="setSelected(item)">
                  <span class="category-name">{{item.text}}</span>
                </a>
              </li>
            </ul>
          </template>
        </div>
      </div>

      <Content class="rong-page-box" />

      <div class="rong-like" v-if="this.$site.themeConfig.like && this.$site.themeConfig.like.title">
        <p class="rong-like-title">{{this.$site.themeConfig.like.title}}</p>
        <div class="rong-like-btn-box">
          <a
            @click="selectLike(true)"
            :disabled="isLikePanelSelected"
            :selected="likeStatus === LIKE_STATUS.LIKED"
            class="rong-like-btn"
          ></a>
          <a
            @click="selectLike(false)"
            class="rong-dislike-btn"
            :selected="likeStatus === LIKE_STATUS.UN_LIKED"
            :disabled="isLikePanelSelected"
          ></a>
        </div>
        <div class="rong-like-success-box" v-if="isLikePanelSelected">
          <i class="rong-like-success-icon"></i>
          <div class="rong-like-success-content">
            <p class="rong-like-success-title">{{this.$site.themeConfig.like.success}}</p>
            <p class="rong-like-success-thank">{{this.$site.themeConfig.like.thank}}</p>
          </div>
        </div>
        <div class="rong-like-other" v-html="this.$site.themeConfig.like.afterHtml"></div>
      </div>

      <ModuleTransition delay="0.32">
        <div class="page-nav" v-if="recoShowModule && (prev || next)">
          <p class="inner">
            <span v-if="prev" class="prev">
              ←
              <router-link v-if="prev" class="prev" :to="prev.path">{{ prev.title || prev.path }}</router-link>
            </span>

            <span v-if="next" class="next">
              <router-link v-if="next" :to="next.path">{{ next.title || next.path }}</router-link>→
            </span>
          </p>
        </div>
      </ModuleTransition>
      <ModuleTransition delay="0.40">
        <slot v-show="recoShowModule" name="bottom" />
      </ModuleTransition>

    </div>
  </main>
</template>

<script>
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'
import APIPage from '@theme/components/APIPage'
import { resolvePage } from '@theme/helpers/utils'
import ModuleTransition from '@theme/components/ModuleTransition'
import utils from '@theme/components/utils'
import common from '@theme/components/sequenced'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const PLATFORM_KEY = 'plat'
const VERSION_KEY = 'ver'

const SmallScreenClassName = 'rong-small-screen-app'

const LIKE_STATUS = {
  UN_SELECT: 0,
  LIKED: 1,
  UN_LIKED: 2
}

const setSmallScreen = () => {
  const isSmall = utils.isSmallScreen()
  utils.setHomeBodyClass({
    className: SmallScreenClassName,
    isRemove: !isSmall
  })
  return isSmall
}

const initSelectedCategory = (context) => {
  const { categorys = [] } = context
  let selectedCategory
  utils.forEach(categorys, (cate, index) => {
    const platformList = cate.platforms || cate.languages
    utils.forEach(platformList, (platform) => {
      if (context.isPlatformSelected(platform)) {
        selectedCategory = cate
      }
    })
  })

  context.selectedCategory = selectedCategory || categorys[0]
}

const scrollToAnchor = () => {
  const hash = window.location.hash
  if (hash) {
    const node = document.querySelector(`a[href="${hash}"]`)
    if (node) {
      node.click()
    }
  }
}

// const getPlatformLink = (platform) => {
//   const link = platform.link || platform.groupName
//   let index = link.indexOf('?')
//   let path = index !== -1 ? link.substring(0, index) : link
//   index = path.indexOf('./')
//   if (index === 0) {
//     path = path.substring(2)
//   }
//   return path
// }

function initSequence (newRoute, oldRoute) {
  newRoute = newRoute || { path: 'new' }
  oldRoute = oldRoute || { path: 'old' }
  setTimeout(() => {
    if (newRoute.path != oldRoute.path) {
      common.Sequenced.renderAll()
    }
  }, 1000)
}

function initTOCScroll (newRoute, oldRoute) {
  newRoute = newRoute || { path: 'new' }
  oldRoute = oldRoute || { path: 'old' }
  if (newRoute.path == oldRoute.path) {
    return
  }
  var filter = function (arrs, callback) {
    var _arrs = []
    for (var i = 0; i < arrs.length; i++) {
      var item = arrs[i]
      if (callback(item)) {
        _arrs.push(item)
      }
    }
    return _arrs
  }
  var getElements = () => {
    var elements = []
    var root = document.querySelector('.rong-page-box.content__default')
    if (!root) {
      return elements
    }
    var children = root.children
    for (var i = 0; i < children.length; i++) {
      var element = children[i]
      if (element.tagName.indexOf('H') > -1) {
        elements.push(element)
      }
    }
    return elements
  }
  var elements = getElements()
  var beforeScrollTop = 0
  var lastNode = null
  var CLASS_NAME = 'rong-scroll-active'
  var addClass = function (id) {
    var reg = /[\u4E00-\u9FFF]+/
    var isChina = reg.test(id)
    if (isChina) {
      id = ' ' + id
    }
    var nextNavs = document.querySelectorAll('a[href="#' + id + '"]')
    var nextNav = filter(nextNavs, nav => {
      return nav.className.indexOf('header-anchor') == -1
    })[0]
    if (nextNav && nextNav !== lastNode) {
      removeClass()
      nextNav.parentNode.classList.add(CLASS_NAME)
      lastNode = nextNav
    }
  }
  var removeClass = function () {
    if (lastNode) {
      lastNode.parentNode.classList.remove(CLASS_NAME)
    }
  }
  var getDownIndex = function (i, len) {
    var _i = 0
    if (i != 0) {
      _i = i - 1
    }
    if (i == len - 1) {
      _i = i
    }
    return _i
  }
  var getUpIndex = function (i, len) {
    var _i = 0
    var maxIndex = len - 1
    if (i != maxIndex) {
      _i = i + 1
    }
    if (i == maxIndex) {
      _i = maxIndex
    }
    return _i
  }
  var direction = {
    up: function (scrollTop) {
      var first = elements[0]
      var isTop = scrollTop < first.offsetTop
      if (isTop) {
        return addClass(first.id)
      }
      for (var i = elements.length - 1; i >= 0; i--) {
        var el = elements[i]
        if (el.offsetTop <= window.pageYOffset) {
          var index = getUpIndex(i, elements.length)
          el = elements[index]
          return addClass(el.id)
        }
      }
    },
    down: function (scrollTop) {
      var last = elements[elements.length - 1]
      var isBottom = scrollTop > last.offsetTop
      if (isBottom) {
        return addClass(last.id)
      }
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i]
        if (el.offsetTop >= window.pageYOffset) {
          var index = getDownIndex(i, elements.length)
          el = elements[index]
          return addClass(el.id)
        }
      }
    }
  }
  var interval = 0
  var onScroll = function () {
    clearTimeout(interval)
    interval = setTimeout(function () {
      var afterScrollTop = window.pageYOffset
      var delta = afterScrollTop - beforeScrollTop
      var type = delta > 0 ? 'down' : 'up'
      direction[type](afterScrollTop)
      beforeScrollTop = afterScrollTop
    }, 10)
  }
  if (elements.length > 0) {
    window.addEventListener('scroll', onScroll)
    onScroll()
  }
}

const setRightBarPosition = () => {
  var innerPageEl = document.querySelector('.rong-page')
  var rightBarEl = document.querySelector('.table-of-contents')
  if (innerPageEl && rightBarEl) {
    var width = innerPageEl.clientWidth - 50
    rightBarEl.style.marginLeft = width + 'px'
  }
}

const initData = (context, newRoute, oldRoute) => {
  context.likeStatus = LIKE_STATUS.UN_SELECT
  initSelectedCategory(context)
  initSequence(newRoute, oldRoute)
  context.$nextTick(() => {
    initTOCScroll(newRoute, oldRoute)
    setRightBarPosition()
  })
}

const getUrlParam = (name, url) => {
  if (!url && typeof window !== 'undefined') {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, '\\$&')

  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i')
  var results = regex.exec(url)

  if (!results) {
    return null
  }
  if (!results[2]) {
    return ''
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export default {
  mixins: [moduleTransitonMixin],
  props: ['sidebarItems'],
  components: {
    APIPage,
    ModuleTransition,
    vSelect
  },
  data () {
    return {
      likeStatus: LIKE_STATUS.UN_SELECT,
      selectedCategory: {},
      isSmallScreen: setSmallScreen()
    }
  },
  watch: {
    $route (newRoute, oldRoute) {
      initData(this, newRoute, oldRoute)
    }
  },
  computed: {
    LIKE_STATUS: () => LIKE_STATUS,
    isLikePanelSelected () { // 点赞面板已经被选择
      return this.likeStatus !== LIKE_STATUS.UN_SELECT
    },
    isAPI () {
      return this.$frontmatter.APIConf
    },
    isFaq () {
      return this.$frontmatter.isFaq
    },
    navs () {
      const { $route, $site: { pages, themeConfig: { sidebar }}} = this
      const links = getLinks($route.fullPath)
      const elements = getElements(sidebar, pages)
      const navs = []
      links.forEach(link => {
        elements.forEach(element => {
          const { name } = element
          if (name === link && name !== '/' && element.title) {
            navs.push(element)
          }
        })
      })
      return navs
    },
    pageTitle () {
      const { navs } = this
      const nav = navs[navs.length - 1] || { title: '' }
      return nav.title
    },
    prev () {
      const prev = this.$frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },
    next () {
      const next = this.$frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },
    /**
     * 分类
     * 格式 1:
     * categorys: [
     *  { name: '客户端', languages: [ { name: 'ios', text: 'iOS', link: './ios' } ] },
     *  { name: '服务端', platforms: [ { name: 'ios', text: 'iOS', link: './ios' } ] },
     * ]
     * 格式 2:
     * languages: [
     *  { name: 'ios', text: 'iOS', link: './ios' }
     * ]
     * 格式 3:
     * platforms: [
     *  { name: 'ios', text: 'iOS', link: './ios' }
     * ]
    */
    categorys () {
      const self = this
      const { $frontmatter: { categorys, platforms, languages }} = this
      if (utils.isEmpty(categorys) && utils.isEmpty(platforms) && utils.isEmpty(languages)) {
        return []
      }
      let categoryList = []
      if (categorys && categorys.length) {
        categoryList = categorys
      } else {
        const platformList = platforms || languages
        categoryList = [
          { isHide: true, name: '', platforms: platformList }
        ]
      }
      return utils.map(categoryList, (category) => {
        const platformList = category.platforms || category.languages
        category.platforms = utils.map(platformList, (platform) => {
          if (!self.isMultiPlatform(platform)) {
            return platform
          }
          if (!platform.selected) {
            utils.forEach(platform.children, (child) => {
              if (self.isPlatformSelected(child)) {
                platform.selected = child
              }
            })
            if (!platform.selected) {
              platform.selected = platform.children[0]
            }
          }
          return platform
        })
        return category
      })
    }
  },
  created () {
    // initData(this)
  },
  mounted () {
    const self = this
    initData(self)
    scrollToAnchor()
    window.onresize = function () {
      setRightBarPosition()
      self.isSmallScreen = setSmallScreen()
    }
    window.test = this
    // 兼容 localstorage 存储中带 ? 导致死循环
    let link = window.localStorage.getItem('rong-current-page')
    if (link && link.indexOf('?') !== -1) {
      link = link.split('?')[0]
      window.localStorage.setItem('rong-current-page', link)
    }
  },
  methods: {
    isMultiPlatform (platform) {
      return platform.name === 'multi' && platform.children
    },
    rediectTo (platform) {
      let { link = '' } = platform
      const plat = getUrlParam(PLATFORM_KEY, link)
      const ver = getUrlParam(VERSION_KEY, link)
      const index = link.indexOf('?')
      if (index !== -1) {
        link = link.substring(0, index)
      }
      window.localStorage.setItem('rong-current-page', link)

      const replaceRoute = () => {
        const query = {}
        plat && (query.plat = plat)
        ver && (query.ver = ver)
        const hasChanged = plat || ver
        hasChanged && this.$router.replace({
          query
        })
      }

      this.$router
        .push({
          path: link
        }).then(replaceRoute).catch(replaceRoute)
    },
    setSelected (platform, index) {
      const self = this
      self.rediectTo(platform)
      self.$nextTick(() => {
        const instanceList = self.$refs['select' + index]
        if (instanceList) {
          const instance = instanceList[0]
          instance.$watch('selectedValue', (val) => {
            instance.$el.querySelector('.vs__selected').textContent = platform.text
          })
          instance.$el.querySelector('.vs__selected').textContent = platform.text
        }
      })
    },
    navigateTo (url) {
      if (url && url !== this.$page.path) {
        this.$router.push(url)
      }
    },
    isPlatformSelected (item) {
      let name = item.name.toLocaleLowerCase()
      let href
      if (typeof location !== 'undefined') {
        href = location.href
      }
      // const href = winLocation.href
      const { link = '' } = item
      const locationVer = getUrlParam(VERSION_KEY, href)
      const ver = getUrlParam(VERSION_KEY, link)
      if (link && locationVer && ver) {
        return locationVer === ver
      }

      if (name === 'multi') {
        name = item.groupName
      }
      const pathPlat = getUrlParam(PLATFORM_KEY, href)
      if (pathPlat) {
        return pathPlat === item.name
      }
      // const link = getPlatformLink(item)
      return this.$page.path.indexOf(name) > -1
    },
    isCategorySelected (category) {
      return this.selectedCategory === category
    },
    selectCategory (category) {
      this.selectedCategory = category
      const platformList = category.platform || category.languages || []
      const first = platformList[0]
      if (first) {
        this.$router.push(first.link).catch(() => {})
      }
    },
    selectLike (isLike) {
      const context = this
      const { feedbackURL } = context.$themeConfig
      let url = feedbackURL || '//localhost:9095'
      url = `${url}/like`
      const currentPath = window.location.href

      context.likeStatus = isLike ? LIKE_STATUS.LIKED : LIKE_STATUS.UN_LIKED

      utils.request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isLike: isLike ? 1 : 0,
          page: currentPath
        })
      })
    }
  }
}

function formatSidebars (bars, parent, root) {
  parent = parent || ''
  var sidebars = []
  bars.forEach(bar => {
    var name = parent + bar.depth
    const hasChild = !!bar.children

    sidebars.push({
      title: bar.title,
      name: name,
      url: bar.cpath
    })
    if (hasChild) {
      const children = formatSidebars(bar.children, name, root)
      sidebars = sidebars.concat(children)
    }
  })
  return sidebars
}

function getLinks (path) {
  // 路径项
  const routePaths = path.split('#')[0].split('/')
  // 链接
  const links = []
  let link = ''
  // 生成链接
  routePaths.forEach((element, index) => {
    if (index !== routePaths.length - 1) {
      link += `${element}/`
      links.push(link)
    } else if (element !== '') {
      link += element
      links.push(link)
    }
  })
  return links
}

function getElements (sidebar, pages) {
  const elements = []
  for (const name in sidebar) {
    const bars = sidebar[name]
    const sidebars = formatSidebars(bars, name, name)
    sidebars.forEach(bar => {
      elements.push(bar)
    })
  }
  pages.forEach(({ title, path: url }) => {
    elements.push({
      title, name: url, url
    })
  })
  return elements
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = []
  flatten(items, res)
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}

function flatten (items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}

</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.rong-scroll-active {
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  30% {
    opacity: 0.3;
  }

  60% {
    opacity: 0.6;
  }

  80% {
    opacity: 0.8;
  }

  100% {
    opacity: 1;
  }
}

.rong-scroll-active > a:after {
  content: '';
  position: absolute;
  left: 0;
  width: 8px;
  height: 8px;
  z-index: 99;
  background-color: #09F;
  border-radius: 50%;
  left: 1px;
  margin-top: 6px;
  animation-name: fadeIn;
  animation-duration: 0.5s;
}

.rong-scroll-active > a {
  color: #09F !important;
}

.page {
  padding-top: 200px;
  padding-bottom: 2rem;
  display: block;
  margin-right: 190px;

  .header-navs {
  }

  .header-nav {
    list-style: none;
    display: inline-block;
    cursor: pointer;

    a {
      font-weight: 400;

      &:hover {
        color: #0099FF;
      }
    }

    &:nth-child(even) {
      &:after, &:before {
        content: '>';
        margin: 0 4px;
        color: #888;
      }
    }

    &:last-child {
      a {
        color: #333;
      }

      &:after {
        content: '';
      }
    }
  }

  .category-wrapper {
  }

  .category-item {
    display: inline-block;
    border: 1px solid #2b3e50;
    min-width: 70px;
    text-align: center;
    height: 28px;
    line-height: 28px;
    margin: 0 5px;
    cursor: pointer;
    padding: 0 2px;
    box-sizing: border-box;

    &:hover, &.active {
      // background: #2b3e50 !important;
      span.category-name {
        color: #fff;
      }
    }
  }

  .rong-category-child {
    min-width: 130px;
    margin-top: -4px;
  }

  .rong-option:after {
    color: red;
    position: absolute;
    right: 15px;
    font-size: 20px;
  }

  .rong-category-child .vs__search::placeholder, .rong-category-child .vs__dropdown-toggle, .rong-category-child .vs__dropdown-menu {
    border: none;
    color: #394066;
    font-weight: 500;
    min-width: 120px;
    font-size: 18px;
  }

  .rong-category-child .vs__selected {
    // position: absolute;
    white-space: nowrap;
    position: relative;
    margin-right: 40px;
  }

  .rong-category-child .vs__actions {
    position: absolute;
    top: 9px;
    right: 0;
  }

  .rong-category-child .vs__selected-options {
    display: block;
    input {
      position: absolute;
    }
  }

  .page-title {
    // max-width: 740px;
    margin: 0 auto;
    line-height: 50%;
    padding: 0 2.5rem 0rem 2.5rem;
    color: var(--text-color);

    .page-title-content {
      font-size: 30px;
      margin: 20px 0 0 0;
    }
    .page-title-time{
      margin: 2px 0 16px 0;
      font-size: 14px;
      color: #333;
    }
  }

  .page-edit {
    @extend $wrapper;
    padding-top: 1rem;
    padding-bottom: 1rem;
    overflow: auto;

    .edit-link {
      display: inline-block;

      a {
        color: lighten($textColor, 25%);
        margin-right: 0.25rem;
      }
    }

    .last-updated {
      float: right;
      font-size: 0.9em;

      .prefix {
        font-weight: 500;
        color: lighten($textColor, 25%);
      }

      .time {
        font-weight: 400;
        color: #aaa;
      }
    }
  }
}

.page-api {
  margin-right: 0;
}

.page-nav {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 0;

  .inner {
    min-height: 2rem;
    margin-top: 0;
    border-top: 1px solid var(--border-color);
    padding-top: 1rem;
    overflow: auto; // clear float
  }

  .next {
    float: right;
  }
}

@media (max-width: $MQMobile) {
  .page {
    margin-right: 0;
  }

  .page-title {
    padding: 0 1rem;
  }

  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}

.rong-page-faq .table-of-contents {
  ul li a {
    color: rgba(0,0,0,.6);
    font-size: 12px;
  }
}

.rong-page-faq .rong-page-box {
  code {
    font-size: 0.95em;
  }
}
.table-of-contents {
  position: fixed;
  top: 80px;
  overflow-y: -moz-scrollbars-none;
  -ms-overflow-style: none;
  overflow-y: auto;
  max-width: 240px;
  user-select: none;

  @media (max-width: 768px) {
    display: none;
  }

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  & > ul {
    list-style-type: none;
    margin: 0;
    height: 100%;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 4px;
      bottom: 0;
      width: 2px;
      background-color: #FFF;
      opacity: 0.5;
    }

    & > li {
      border-left: 3px solid #CCC;
      padding-left: 4px;

      & > ul {
        & > li {
          & > a {
            color: #333;
            font-size: 0.95em;
          }
        }
      }

      & > a {
        text-decoration: none !important;
        font-weight: 500;
        font-size: 0.9rem;

        &:before {
          content: ' ';
          position: absolute;
          top: 10px;
          left: -16px;
        }

        &:hover {
          color: #0099FF;
        }
      }
    }
  }
}

.rong-category-titles {
  margin-bottom: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.rong-page-intro {
  padding-top: 20px !important;
}

.rong-page {
  .rong-category-title {
    width: 112px;
    height: 32px;
    line-height: 30px;
    border: 1px solid #979797;
    border-right: none;
    font-size: 16px;
    color: #333333;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
  }

  .rong-category-title[selected] {
    border: 1px solid #0099FF;
    background-color: #0099FF;
    color: #FFF;
  }

  .rong-category-title + .rong-category-title {
    // border-left: none;
    border-right: 1px solid #979797;
  }

  .rong-category-title + .rong-category-title[selected] {
    border-right: 1px solid #0099FF;
  }

  .rong-category-title[selected] + .rong-category-title {
    border-left: none;
  }

  .rong-category-wrapper:before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    background-color: #F0F0F0;
    width: 100%;
  }

  .rong-category-wrapper {
    position: relative;
    display: inline-block;
    margin: 0;
    z-index: 19;
    padding-left: 0;
    padding-bottom: 5px;

    // border-bottom: 1px solid #F0F0F0;
    .category-item + .category-item {
      margin: 0 25px;
    }

    .category-item {
      border: none;
      font-size: 16px;
      margin-right: 38px;
      margin-left: 0;
      min-width: auto;
      padding: 0 3px;

      a {
        color: #000;
      }
    }

    .category-item.active {
      background-color: transparent;
      position: relative;
      z-index: 20;

      .category-name {
        color: #0099FF;
      }

      .vs__selected {
        color: #0099FF;
      }

      svg {
        fill: #09F;
      }
    }

    .category-item:hover {
      background-color: transparent;

      .category-name {
        color: #0099FF;
      }
    }

    .category-item.active:before {
      content: '';
      position: absolute;
      bottom: -4px;
      height: 3px;
      background-color: #0099FF;
      width: 100%;
      z-index: 21;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .rong-category-padding {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    margin-bottom: 12px;
    margin-top: 10px;
  }
}

.rong-page .rong-page-box {
  color: #333;

  h1, h2 {
    font-size: 1.95rem;
    padding: 0;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.15rem;
  }

  h6 {
    font-size: 0.8rem;
  }

  .table-of-contents {
    // margin-left: 100%;
    margin-left: 998px;
    // ul li {
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // }
  }
}

.rong-like-btn {
  background-image: url('../images/like.svg');
}

.rong-like-btn:hover, .rong-like-btn[selected] {
  background-image: url('../images/like-selected.svg');
}

.rong-dislike-btn {
  background-image: url('../images/dislike.svg');
}

.rong-dislike-btn:hover, .rong-dislike-btn[selected] {
  background-image: url('../images/dislike-selected.svg');
}

.rong-like-success-icon {
  background-image: url('../images/like-success.svg');
}
.rong-small-screen-app {
  .rong-nav .rong-nav-logo {
    margin-left: 30px;
  }
  .rong-nav .search-box {
    display: none;
  }
  .back-to-ceiling {
    right: 10px !important;
  }
  .rong-page .rong-category-wrapper .category-item {
    margin: 7px 0;
    text-align: left;
    display: block;
  }
  .rong-page .rong-category-wrapper .category-item .vs__selected-options {
    padding-left: 0;
  }
  .rong-page .rong-category-wrapper .category-item .vs__selected {
    padding-left: 0;
    margin-left: 0;
  }
}

.rong-small-screen-app .feed-back-buttonSpace {
  display: none !important;
}
</style>
