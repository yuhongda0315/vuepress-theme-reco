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

    <ul
      class="suggestions rong-searchbox-suggestions"
      v-if="showSuggestions"
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
      placeholder: undefined
    };
  },
  mounted() {
    this.placeholder = this.$site.themeConfig.searchPlaceholder || "搜索";
  },
  computed: {
    showSuggestions() {
      return this.focused && this.suggestions && this.suggestions.length;
    },
    // make suggestions align right when there are not enough items
    alignRight() {
      const navCount = (this.$site.themeConfig.nav || []).length;
      const repo = this.$site.repo ? 1 : 0;
      return navCount + repo <= 2;
    }
  },
  methods: {
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
        common: "#CC66FF"
      };
      return colors[name] || name;
    },
    getPlatform: function(name) {
      let platforms = {
        android: "Android",
        ios: "iOS",
        server: "Server",
        web: "Web",
        common: "产品介绍"
      };
      return platforms[name] || name;
    }
  }
};
function scrollTop(i) {
  let content = document.querySelector("#suggestion" + i);
  let box = document.querySelector(".suggestions");
  box.scrollTo(0, content.offsetTop);
}
function search(context) {
  let { APIUrl } = context.$themeConfig;
  let url = APIUrl || "//localhost:8992";
  url = `${url}/misc/search_docs`;
  utils
    .request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keyword: context.query
      })
    })
    .then(({ result: suggestions }) => {
      context.suggestions = suggestions;
    });
}
</script>

<style lang="stylus" scoped>
.search-box {
  display: inline-block;
  position: relative;
  margin-right: 1rem;
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
      }
    }

    .rong-search-content {
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      font-size: 14px;
      padding-left: 115px;
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
  float: none !important;
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
