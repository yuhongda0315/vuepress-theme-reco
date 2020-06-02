<template>
<div class="rong-serp-summary">
  <div class="rong-summay-search-head">
    <div class="rong-summary-search-box">
      <input v-model="keyword" type="text" placeholder="请输入搜索内容"><button @click="search" >搜索</button>
    </div>
  </div>
  <div class="rong-summary-content-box">
    <!-- Start 内容 -->
    <div class="rong-summary-search-content-box">
      <!-- Start 搜索结果 -->
      <ul class="rong-summary-search-list">
        <li v-for="(item, key, index) in searchResults" v-bind:key="index" @click="toUrl(item.url)">
          <h4>{{item.title}}</h4>
          <p class="rong-summary-search-text" v-html="item.content"></p>
          <p class="rong-summary-search-source">
            <span>来自: </span>
            <span>{{item.levels}}</span>
          </p>
        </li>
      </ul>
      <!-- End 搜索结果 -->
      <!-- Start 分页 -->
      <!-- <div>
        <button v-if="selectedPage > 1" @click="select(selectedPage - 1)" class="rc-page-helper-btn rc-page-helper-pre"></button
          ><button v-for="index in pageTotal" 
            @click="select(index)"
            class="rc-page-helper-btn" :class="isSelected(index) ? 'rc-page-helper-selected' : ''">
          {{index}}
        </button
        ><button v-if="selectedPage < pageTotal" @click="select(selectedPage + 1)" class="rc-page-helper-btn rc-page-helper-next"></button>

        <div class="rc-page-hepler-input-box">
          <span>跳至</span>
          <input v-model="inputVal" type="number">
          <span>页</span>
        </div>
        <button @click="select(inputVal)" class="rc-page-helper-btn rc-page-helper-btn-confirm">确定</button>
      </div> -->
      <!-- End 分页  -->
    </div>
    <!-- End 内容 -->
  </div>
</div>
</template>

<script>
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'
import utils from '@theme/components/utils'

export default {
  data: function () {
    return {
      keyword: '',
      searchResults: []
    }
  },
  mixins: [moduleTransitonMixin],
  // components: { ModuleTransition },
  computed: {
  },
  methods: {
    search () {
      const self = this
      const { keyword } = self
      if (!keyword) return
      const { APIUrl } = self.$themeConfig
      const url = `${APIUrl}/misc/search_docs`
      utils.request(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword
        })
      }).then(({ result }) => {
        self.searchResults = result
      })
    },
    toUrl (url) {
      window.open(url)
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
  left: 0;
  width: 100%;
  margin: 0 auto;
  * {
    border: none;
    outline: none;
  }
}

.rong-summay-search-head {
  width: 100%;
  height: 250px;
  position: relative;
  background-color: rgb(229, 229, 229);
  .rong-summary-search-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
    input {
      display: inline-block;
      width: 640px;
      height: 42px;
      padding-left: 10px;
    }
    button {
      height: 44px;
      width: 160px;
      font-size: 16px;
      background-color: #1E3A6A;
      text-align: center;
      vertical-align: middle;
      color: white;
      cursor pointer;
    }
  }
}

.rong-summary-search-content-box {
  width: 100%;
}

.rong-summary-search-list {
  width: 100%;
  li {
    width: 100%;
    list-style: none;
    cursor: pointer;
  }
  h4 {
    color: #373D41;
    line-height: 24px;
    font-size: 16px;
  }
  h4:hover {
    color: #00C1DE;
  }

  .rong-summary-search-text {
    color: #73777A;
    font-size: 14px;
    margin-top: 8px;
    color: #73777A;
    line-height: 24px;
  }

  .rong-summary-search-source {
    margin-top: 8px;
    color: #C3C5C6;
    font-size: 12px;
  }
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
