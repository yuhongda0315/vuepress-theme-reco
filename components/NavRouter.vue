<template>
  <div class="categories-wrapper" v-if="isShow">
    <div class="iconfont category-current reco-down rong-category-current" @click="change">{{selectedText}}</div>
    <!-- <ul class="category-wrapper" v-if="showCategoryItem" @mouseleave="hide">
      <li
        class="category-item"
        :class="selectedLink == item.link ? 'active': ''"
        v-for="(item, index) in navs"
        :key="index"
      >
        <router-link :to="item.link">
          <span class="category-name">{{ item.text }}</span>
        </router-link>
      </li>
    </ul> -->
  </div>
</template>

<script>
const utils = require("../helpers/utils");

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
      return location.pathname.indexOf(nav.keyword) > -1;
    })[0] || {};
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
  max-width: 90%;
  border-radius: $borderRadius;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  position: relative;
  z-index: 99;

  .category-current {
    height: 30px;
    line-height: 30px;
    background-color: #2B3E50;
    border-radius: 2px;
    color: #FFF;
    position: relative;

    &:before {
      position: absolute;
      right: 8px;
      font-size: 20px;
      top: 1px;
    }
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
