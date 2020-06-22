<template>
  <div class="search-box">
    <i class="iconfont reco-search"></i>
    <input
      @input="query = $event.target.value"
      aria-label="Search"
      :value="query"
      :class="{ 'focused': focused }"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
      @keydown="onKeyDown"
      ref="input"
    />

    <div class="rong-searchbox-search-empty-box" v-if="!hasSearchSuggestionResult && focused && !isHideSearchBoxResult">
      <div class="rong-summary-search-empty-inner">
        <img src="../images/search-empty.png">
        <p>未找到要查询的内容</p>
      </div>
    </div>
    <ul
      class="suggestions rong-searchbox-suggestions"
      v-else-if="showSuggestions"
      :class="{ 'align-right': alignRight }"
      @mouseleave="unfocus"
    >
      <li
        class="suggestion rong-suggestion"
        v-for="(s, i) in suggestions"
        :key="i"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
        @click="go(i)"
        :id="'suggestion'+i"
      >
        <p class="rong-search-header">
          <span class="rong-search-header-title">{{s.title}}</span>
          <span class="rong-search-header-nav">{{s.levels}}</span>
          <strong
            class="rong-search-header-platform"
            :style="{boderColor: getBGColor(s.platform), color: getBGColor(s.platform)}"
          >{{ getPlatform(s.platform)}}</strong>
        </p>
        <p class="rong-search-content" v-html="s.content"></p>
      </li>
      <li class="rong-search-more-box" v-if="hasMore">
        <button @mousedown="showMore" @click="showMore">查看更多搜索结果</button>
      </li>
    </ul>
  </div>
</template>

<script>
import utils from "@theme/components/utils";
let timer = 0;

export default {
  data() {
    return {
      suggestions: [],
      query: "",
      focused: false,
      focusIndex: 0,
      placeholder: undefined,
      hasMore: false,
      hasSearchSuggestionResult: true,
      isHideSearchBoxResult: false
    };
  },
  created () {
    const self = this
    self.$root.$on('hideSearchBoxResult', () => {
      self.isHideSearchBoxResult = true
    })
    self.$root.$on('showSearchBoxResult', () => {
      self.isHideSearchBoxResult = false
    })
  },
  mounted() {
    this.placeholder = this.$site.themeConfig.searchPlaceholder || "搜索";
  },
  computed: {
    showSuggestions() {
      // return true
      return this.focused && this.suggestions && this.suggestions.length && !this.isHideSearchBoxResult
    },
    // make suggestions align right when there are not enough items
    alignRight() {
      const navCount = (this.$site.themeConfig.nav || []).length;
      const repo = this.$site.repo ? 1 : 0;
      return navCount + repo <= 2;
    }
  },
  methods: {
    showMore() {
      let base = this.$themeConfig.base || this.$site.base
      base = base === '/' ? '' : base
      window.location.href = `${base}summary.html?k=${this.query}`
      // this.$router.push({
      //   path: '/summary?keywork=' + this.query
      // }).catch((e) => {})
    },
    getPageLocalePath(page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== "/" && page.path.indexOf(localePath) === 0) {
          return localePath;
        }
      }
      return "/";
    },
    onUp() {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--;
        } else {
          this.focusIndex = this.suggestions.length - 1;
        }
        // scrollTop(this.focusIndex);
      }
    },
    onDown() {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++;
        } else {
          this.focusIndex = 0;
        }
        // scrollTop(this.focusIndex);
      }
    },
    onKeyDown: function() {
      let conext = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!conext.query) {
          conext.suggestions = [];
          conext.hasSearchSuggestionResult = true
          return;
        }
        search(conext);
      }, 500);
    },
    go(i) {
      if (!this.showSuggestions || i == -1) {
        return;
      }
      this.$router.push(this.suggestions[i].url);
      this.query = "";
      this.focusIndex = 0;
    },
    focus(i) {
      this.focusIndex = i;
    },
    unfocus() {
      this.focusIndex = -1;
    },
    getBGColor: function(name) {
      let colors = {
        android: "#4DA626",
        ios: "#009BFF",
        server: "#4E4DC0",
        web: "#F36618",
        web3: "#F36618",
        common: "#CC66FF"
      };
      return colors[name] || name;
    },
    getPlatform: function(name) {
      const searchPlatform = this.$themeConfig.searchPlatform || {}
      return searchPlatform[name] || name
    }
  }
};
function scrollTop(i) {
  let content = document.querySelector("#suggestion" + i);
  let box = document.querySelector(".suggestions");
  box.scrollTo(0, content.offsetTop);
}
function search(context) {
  context.$root.$emit('searchBoxChange', context.query)

  const limit = 6
  let { APIUrl } = context.$themeConfig;
  let url = APIUrl || "//localhost:8992";
  context.hasMore = false
  url = `${url}/misc/search_docs`
  utils
    .request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        limit,
        keyword: context.query
      })
    })
    .then(({ result: suggestions }) => {
      context.suggestions = suggestions;
      context.hasMore = suggestions.length >= limit
      context.hasSearchSuggestionResult = !!suggestions.length
    });
}
</script>

<style lang="stylus" scoped>
.search-box {
  display: inline-block;
  position: relative;
  margin-right: 1rem;
  font-size: 14px;
  .iconfont {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 0;
    left: 0.6rem;
    margin: auto;
  }

  input {
    cursor: text;
    width: 10rem;
    height: 2rem;
    color: lighten($textColor, 25%);
    display: inline-block;
    border: 1px solid var(--border-color);
    border-radius: $borderRadius;
    font-size: 0.9rem;
    line-height: 2rem;
    padding: 0 0.5rem 0 2rem;
    outline: none;
    transition: all 0.2s ease;
    background: transparent;
    background-size: 1rem;

    &:focus {
      cursor: auto;
      border-color: $accentColor;
    }
  }

  .suggestions {
    width: 43rem;
    position: absolute;
    top: 2.2rem;
    border-radius: 0;
    padding: 0.4rem;
    list-style-type: none;
    max-height: 435px;
    box-shadow: 0 2px 40px 0 rgba(168,168,168,0.68);
    border: 0;

    &.align-right {
      right: 0;
    }
  }

.rong-searchbox-suggestions::-webkit-scrollbar{
  width: 0px;
}

  .suggestion {
    border-radius: 0;
    cursor: pointer;
    width: 95%;

    p {
      margin: 0;
    }

    .rong-search-header {
      position: relative;
      width: 100%;
      span{
        display: inline-block;
        margin-right: 10px;
        color: #000 !important;
      }

      .rong-search-header-title {
        font-weight: bold;
        width: 100px;
        text-align: right;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .rong-search-header-nav {
        font-size: 14px;
        line-height: 26px;
        color: #989A9C !important;
      }

      .rong-search-header-platform {
        margin-left: 2px;
        background: transparent;
        padding: 0 8px;
        display: inline;
        font-size: 12px;
        border: 1px solid !important;
        letter-spacing: 0.2px;
        font-weight: 500;
        position: absolute;
        right 0;
        width: 50px;
        text-align: center;
      }
    }

    .rong-search-content {
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      font-size: 14px;
      padding-left: 110px;
      box-sizing: border-box;
    }

    .rong-search-keyword {
      color: red;
      display: inline;
      border-bottom: 1px solid red;
      font-style: oblique;
      float: none;
    }
  }

  .rong-suggestion {
    border-bottom: 1px solid var(--border-color);

    &:last-child {
      border-bottom: none;
    }
  }
}

.search-box * {
  // float: none !important;
}

.rong-search-more-box {
  text-align: center;
  position: relative;
  height: 30px;
  width: 100%;
  button {
    border: none;
    color: black;
    width: 150px;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    color: #0099FF;
  }
}

.rong-searchbox-search-empty-box {
  width: 43rem;
  position: absolute;
  top: 2.2rem;
  border-radius: 0;
  padding: 0.4rem;
  list-style-type: none;
  max-height: 435px;
  box-shadow: 0 2px 40px 0 rgba(168,168,168,0.68);
  border: 0;
  background-color: white;
  height: 175px;
}

.rong-summary-search-empty-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  img {
    width: 55px;
    height: 48px;
    float: none;
  }
  p {
    color: #666666;
    font-size: 16px;
    margin-top: -7px;
    float: none;
  }
}

@media (max-width: $MQNarrow) {
  .search-box {
    input {
      cursor: pointer;
      width: 0;
      border-color: transparent;
      position: relative;

      &:focus {
        cursor: text;
        left: 0;
        width: 10rem;
      }
    }
  }
}

// Match IE11
@media all and (-ms-high-contrast: none) {
  .search-box input {
    height: 2rem;
  }
}

@media (max-width: $MQNarrow) and (min-width: $MQMobile) {
  .search-box {
    margin-right: 0;

    .suggestions {
      left: 0;
    }
  }
}

@media (max-width: $MQMobile) {
  .search-box {
    margin-right: 0;

    .suggestions {
      right: 0;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .search-box {
    .suggestions {
      width: calc(100vw - 4rem);
    }

    input:focus {
      width: 8rem;
    }
  }
}
</style>
