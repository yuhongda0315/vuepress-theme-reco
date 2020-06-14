<template>
<div class="rong-serp-summary" id="searchSummary">
  <div class="rong-summay-search-head">
    <div class="rong-summay-search-head-back"></div>
    <div class="rong-summary-search-box">
      <input v-model="keyword" type="text" @keydown="onKeyDown" @keyup.enter="search" placeholder="请输入搜索内容"><button @click="search" >搜索</button>
    </div>
  </div>
  <div class="rong-summary-content-box">
    <div class="rong-summary-platform-navi">
      <a
      v-for="(item, index) in PlatformList"
      v-bind:key="index"
      :selected="isPlatformSelected(item)"
      @click="selectPlatform(item)"
      >
        {{item.text}}
      </a>
    </div>
    <!-- Start 内容 -->
    <div v-if="searchResults && searchResults.length" class="rong-summary-search-content-box">
      <!-- Start 搜索结果 -->
      <ul class="rong-summary-search-list">
        <li v-for="(item, key, index) in searchResults" v-bind:key="index" @click="toUrl(item.url)">
          <h4 :title="item.title">{{item.title}}</h4>
          <p class="rong-summary-search-text" v-html="item.content"></p>
          <p class="rong-summary-search-source">
            <span>来自: </span>
            <span>{{item.levels}}</span>
          </p>
          <strong
            class="rong-search-summary-header-platform"
            :style="{boderColor: getBGColor(item.platform), color: getBGColor(item.platform)}"
            >{{ getPlatform(item.platform)}}</strong>
        </li>
      </ul>
      <!-- End 搜索结果 -->
      <!--  -->
      <!-- Start 分页 -->
      <PageHelper
        v-if="searchResultsTotal"
        @select="selectPage"
        :pageSize="pageTotal"
        :selectedPage="searchOffset + 1"
        ></PageHelper>
      <!-- End 分页  -->
    </div>
    <div v-else class="rong-summary-search-empty">
      <div class="rong-summary-search-empty-inner">
        <img src="../images/search-empty.png">
        <p>未找到要查询的内容</p>
      </div>
    </div>
    <div class="rong-summary-recommend">
      <div class="rong-summary-recommend-box" v-for="(item, index) in recommends" v-bind:key="index">
        <h5>{{item.title}}</h5>
        <li v-for="(sub, index) in item.childs" v-bind:key="index">
          <a :href="sub.url" target="_blank">{{sub.title}}</a>
        </li>
      </div>
    </div>
    <!-- End 内容 -->
  </div>
</div>
</template>

<script>
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'
import PageHelper from './PageHelper'
import utils from '@theme/components/utils'

const SearchLimit = 10

let timer = 0

const setBodyHidden = (isHidden) => {
  const body = document.body
  body.style['overflow-x'] = isHidden ? 'hidden' : ''
}

const getStyle = (parm1, parm2) => {
  return parm1.currentStyle ? parm1.currentStyle[parm2] : getComputedStyle(parm1)[parm2]
}

const setSearchWidth = () => {
  const el = document.getElementById('searchSummary')
  const navEl = document.querySelector('.rong-nav-box')
  if (el && navEl) {
    el.style.width = parseInt(getStyle(navEl, 'width')) - 50 + 'px'
  }
}

export default {
  data: function () {
    return {
      keyword: '',
      searchResults: [],
      searchResultsTotal: 0,
      searchOffset: 0,
      searchPlatform: '',

      recommends: []
    }
  },
  mixins: [moduleTransitonMixin],
  components: { PageHelper },
  watch: {
    keyword (newVal, oldVal) {
      if (oldVal && newVal) {
        this.searchOffset = 0
      }
    },
    searchPlatform (newVal, oldVal) {
      if (oldVal && newVal) {
        this.searchOffset = 0
      }
    }
  },
  computed: {
    isShowPageHelper () {
      return this.searchResultsTotal > SearchLimit // 总个数大于 10 再显示分页
    },
    pageTotal () {
      return this.searchResultsTotal / SearchLimit
    },
    PlatformList () {
      const platformList = [{ text: '全部', platform: '' }]
      const searchPlatform = this.$themeConfig.searchPlatform || {}
      for (const key in searchPlatform) {
        const val = searchPlatform[key]
        platformList.push({ text: val, platform: key })
      }
      return platformList
    }
  },
  created () {
    const keyFromUrl = utils.getUrlParam('k')
    // const offsetFromUrl = utils.getUrlParam('offset') // 路由不存储 offset
    keyFromUrl && (this.keyword = keyFromUrl)
    // offsetFromUrl && (this.searchOffset = Number(offsetFromUrl))
    this.search()
  },
  mounted () {
    const self = this
    setBodyHidden(true)
    setSearchWidth()
    self.recommends = self.$themeConfig.recommends
    self.$root.$on('searchBoxChange', self.onSearchBoxChanged)
    self.$root.$emit('hideSearchBoxResult')
  },
  destroyed () {
    setBodyHidden(false)
    this.$root.$off('searchBoxChange', this.onSearchBoxChanged)
    this.$root.$emit('showSearchBoxResult')
  },
  methods: {
    getPlatform (name) {
      const searchPlatform = this.$themeConfig.searchPlatform || {}
      return searchPlatform[name] || name
    },
    getBGColor (name) {
      const colors = {
        android: '#4DA626',
        ios: '#009BFF',
        server: '#4E4DC0',
        web: '#F36618',
        web3: '#F36618',
        common: '#CC66FF'
      }
      return colors[name] || name
    },
    onSearchBoxChanged (keyword) {
      this.keyword = keyword
      this.search()
    },
    onKeyDown () {
      const self = this
      clearTimeout(timer)
      timer = setTimeout(() => {
        self.search()
      }, 500)
    },
    search () {
      const self = this
      const { keyword } = self
      if (!keyword) return
      const { APIUrl } = self.$themeConfig
      const url = `${APIUrl || 'http://localhost:8992'}/misc/search_docs`
      const searchParams = {
        offset: self.searchOffset,
        limit: SearchLimit,
        keyword
      }
      if (self.searchPlatform) {
        searchParams.platform = self.searchPlatform
      }
      utils.request(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchParams)
      }).then(({ result, total }) => {
        self.searchResults = result
        self.searchResultsTotal = total
        self.$router.replace({
          query: {
            k: self.keyword
            // offset: this.searchOffset
          }
        }).catch((e) => {})
      })
    },
    toUrl (url) {
      window.open(`${this.$themeConfig.base}/url`)
    },
    selectPage (page) {
      this.searchOffset = page - 1
      this.search()
      document.body.scrollIntoView()
    },
    selectPlatform ({ platform }) {
      this.searchPlatform = platform
      this.search()
    },
    isPlatformSelected ({ platform }) {
      return this.searchPlatform === platform
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/mode.styl';

// .rong-content-box .rong-page-content {
//   padding-left: 0 !important;
// }

.rong-serp-summary {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 40px;
  * {
    border: none;
    outline: none;
  }
}

.rong-summay-search-head {
  .rong-summay-search-head-back {
    position: absolute;
    width: 1000%;
    background-color: #f2f3f6;
    height: 100%;
    transform: translateX(-50%);
    left: 50%;
  }
  height: 120px;
  position: relative;
  transform: translateX(-50%);
  left: 50%;
  .rong-summary-search-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    // text-align: center;
    transform: translate(-50%, -50%);
    height: 48px;
    input {
      display: inline-block;
      width: 640px;
      height: 100%;
      padding-left: 10px;
      box-sizing: border-box;
      vertical-align: middle;
    }
    button {
      height: 100%;
      width: 80px;
      font-size: 16px;
      background-color: #0099FF;
      text-align: center;
      vertical-align: middle;
      color: white;
      cursor pointer;
      box-sizing: border-box;
    }
  }
}

.rong-summary-search-content-box {
  margin-right: 250px;
}

.rong-summary-content-box {
  position: relative;
}

.rong-summary-recommend {
  width: 150px;
  position: absolute;
  right: 0;
  top: 0;
  h5 {
    font-size: 16px;
    color: #333333;
    margin: 20px 0;
  }
  li {
    margin: 20px 0;
    list-style: none;
  }
  li a {
    font-size: 14px;
    color: #666666;
  }
}

.rong-summary-recommend-box {
  margin-top: 30px;
}

.rong-summary-search-list {
  width: 100%;
  padding: 0;
  li {
    width: 100%;
    list-style: none;
    cursor: pointer;
    position: relative;
  }
  h4 {
    color: #373D41;
    line-height: 24px;
    font-size: 18px;
    margin: 37px 0 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 80px;
  }
  h4:hover {
    color: #0099FF;
  }

  .rong-summary-search-text {
    font-size: 14px;
    margin-top: 8px;
    color: #666666;
    line-height: 24px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    white-space: normal;
  }

  .rong-summary-search-source {
    margin-top: 8px;
    color: #999999;
    font-size: 14px;
  }
}

.rong-summary-platform-navi {
  border-bottom: 1px solid rgb(241, 241, 241);
  margin-right: 250px;
  a {
    color: #0099FF;
    font-size: 16px;
    display: inline-block;
    color: #333333;
    padding: 20px 10px;
    // border-bottom: 2px solid rgb(67, 156, 247);
    // padding-left: 0;
  }
  a[selected] {
    color: #0099FF;
    border-bottom: 2px solid rgb(67, 156, 247);
  }
  a + a {
    margin: 0 25px;
    // padding: 20px 10px;
  }
}

.rong-summary-search-empty {
  min-height: 500px;
  margin-right: 550px;
  position: relative;
}

.rong-summary-search-empty-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  img {
    width: 79px;
    height: 67px;
  }
  p {
    color: #666666;
    font-size: 18px;
    margin-top: 24px;
  }
}

.rong-search-summary-header-platform {
  margin-left: 2px;
  background: transparent;
  padding: 3px 10px;
  display: inline;
  font-size: 12px;
  border: 1px solid !important;
  letter-spacing: 0.2px;
  font-weight: 500;
  position: absolute;
  right 0;
  width: 50px;
  text-align: center;
  top: -5px;
}

@media (max-width: $MQMobile) {
  .serp-summary {
    .features {
      flex-direction: column;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .serp-summary {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
