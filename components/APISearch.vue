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
      @keydown="onKeyDown"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
      ref="input"
    />
    <ul class="suggestions" v-if="showSuggestions" @mouseleave="unfocus">
      <li
        class="suggestion"
        v-for="(s, i) in suggestions"
        :key="i"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a @click="showAPIs(s)">
          <span class="page-title">{{ s.desc }}</span>
          <i class="page-desc">({{ s.name }})</i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import utils from "@theme/components/utils";
let timer = 0;
export default {
  props: ["platform"],
  data() {
    return {
      suggestions: [
        // { title: "测试1", platform: "iOS" },
        // { title: "测试2", platform: "iOS" }
      ],
      query: "",
      focused: false,
      focusIndex: 0,
      placeholder: undefined
    };
  },
  mounted() {
    this.placeholder = this.$site.themeConfig.apiSearchPlaceholder || "";
  },
  computed: {
    showSuggestions() {
      return this.focused && this.suggestions && this.suggestions.length;
    }
  },
  methods: {
    showAPIs: function(api) {
      showAPIs(this, api);
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
      }
    },
    onDown() {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++;
        } else {
          this.focusIndex = 0;
        }
      }
    },
    onKeyDown() {
      let conext = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if(!conext.query){
          conext.suggestions = [];
          return;
        }
        search(conext);
      }, 500);
    },
    go(i) {
      if (!this.showSuggestions) {
        return;
      }
      this.query = "";
      this.focusIndex = 0;
      showAPIs(this, this.suggestions[i]);
    },
    focus(i) {
      this.focusIndex = i;
    },
    unfocus() {
      this.focusIndex = -1;
    }
  }
};
function showAPIs(context, api) {
  context.$emit("showAPIs", api);
}
function search(context) {
  let { APIUrl } = context.$themeConfig;
  let url = APIUrl || "//localhost:8992";
  url = `${url}/misc/search`;
  utils
    .request(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keyword: context.query,
        platform: context.platform
      })
    })
    .then(({ result: suggestions }) => {
      context.suggestions = suggestions;
    });
}
</script>

<style lang="stylus">
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
    background: var(--background-color);
    width: 20rem;
    position: absolute;
    top: 1.5rem;
    border: 1px solid darken($borderColor, 10%);
    border-radius: 6px;
    padding: 0.4rem;
    list-style-type: none;

    &.align-right {
      right: 0;
    }
  }

  .suggestion {
    line-height: 1.4;
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;

    a {
      white-space: normal;
      color: var(--text-color);

      .page-title {
        font-weight: 400;
        padding: 0 0.5rem 0rem 0;
      }
      .page-desc{
        font-size 12px;  
      }

      .header {
        font-size: 0.9em;
        margin-left: 0.25em;
      }
    }

    &.focused {
      background-color: var(--border-color);

      a {
        color: $accentColor;
      }
    }
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
