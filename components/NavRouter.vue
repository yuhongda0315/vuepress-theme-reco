<template>
  <div class="categories-wrapper" v-show="isShow">
    <div class="category-current rong-category-current" @click="change">{{selectedText}}{{appendIM()}}</div>
  </div>
</template>

<script>
const utils = require("../helpers/utils");
import componentUtils from '../components/utils'

export default {
  data() {
    return {
      selectedText: "",
      navs: [],
      isShow: false,
      showCategoryItem: false
    };
  },
  computed: {
    title() {
      return "";
    }
  },
  mounted() {
    selected(this);
  },
  methods: {
    change: function() {
      this.showCategoryItem = true;
    },
    appendIM: () => {
      if (typeof location !== 'undefined' && location.href) {
        var isIM = location.href.indexOf('/im/') > -1;
        return isIM ? '( 即时通讯 )' : ''
      }
      return ''
    },
    hide: function() {
      hide(this);
    }
  },
  watch: {
    $route: function() {
      selected(this);
    }
  }
};
function hide(context) {
  context.showCategoryItem = false;
}
function selected(context) {
  let routerConfig = context.$themeConfig.routerConfig || {};
  let navs = routerConfig.navs || [];
  let _default =
    navs.filter(nav => {
      if (nav.isMatchQuery) {
        const href = location.href
        const urlMatch = componentUtils.getUrlParam('match', href)
        return urlMatch === nav.keyword
      }
      return location.pathname.indexOf(nav.keyword) > -1
    })[0] || {}
  utils.extend(context, {
    navs,
    isShow: navs.length > 0,
    selectedLink: _default.link,
    selectedText: _default.text
  });
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

<style lang="stylus" scoped>
@require '../styles/mode.styl';

.categories-wrapper {
  max-width: 200px;
  height: 30px;
  margin: 12px auto 0px;
  border-radius: 0.25rem;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  position: absolute;
  z-index: 99;
  left: 8px;
  width: 178px;
  box-sizing: border-box;

  .category-current {
    background-color: #f7f8fa;
    color: #333;
    font-size: 14px;
    margin-left: 15px;
    text-align: left;
    font-weight: bold;
    border-bottom: 1px solid #d8d8d8;
    padding: 14px 14px 14px 0px;
    margin-top: -12px;
    cursor: default;
    box-sizing: border-box;
  }

  .category-wrapper {
    list-style: none;
    margin-top: 2px;
    border: 1px solid #F8F8F9;
    padding: 0;
    background-color: var(--background-color);

    .category-item {
      height: 30px;
      line-height: 30px;
      transition: all 0.5s;

      a {
        display: inline !important;
      }

      &:nth-child(even) {
        border-top: 1px solid #F9F9F9;
        border-bottom: 1px solid #F9F9F9;
      }

      &:hover, &.active {
        background: $accentColor;

        a span.category-name {
          color: #fff;

          .post-num {
            color: $accentColor;
          }
        }
      }

      a {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 8px 14px;
        justify-content: space-between;
        align-items: center;
        color: #2B3E50;

        .post-num {
          margin-left: 4px;
          width: 1.2rem;
          height: 1.2rem;
          text-align: center;
          line-height: 1.2rem;
          border-radius: $borderRadius;
          font-size: 0.7rem;
          color: #fff;
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .categories-wrapper {
    padding: 0 1rem 0;
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
</style>
