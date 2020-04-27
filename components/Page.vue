<template>
  <main class="page rong-page" :class="{'page-api': isAPI() }">
    <APIPage v-if="isAPI()" />
    <div v-else>
      <ModuleTransition>
        <ul class="header-navs">
          <li
            class="header-nav"
            v-for="(item,index) in navs"
            :key="item.url"
            :class="{'is-active': navs.length -1 == index}"
          >
            <a class="iconfont" @click="navigateTo(item.url)" v-text="item.title" />
          </li>
        </ul>
      </ModuleTransition>

      <ModuleTransition delay="0.08">
        <div class="page-title">
          <p class="page-title-content">{{getTitle()}}</p>
          <!-- <hr /> -->
          <!-- <PageInfo :pageInfo="$page" :hideAccessNumber="hideAccessNumber"></PageInfo> -->
        </div>
      </ModuleTransition>

      <div v-if="this.$page.frontmatter.platforms && !categorys.length" class="rong-platforms-box">
        <ul class="category-wrapper rong-category-wrapper rong-category-padding">
          <li
            class="category-item"
            v-for="(item, index) in this.$page.frontmatter.platforms"
            :key="index"
            :class="isSelected(item) ? 'active': ''"
          >
            <v-select
              v-if="item.name == 'multi'"
              v-model="selectedValue"
              class="rong-category-child"
              :clearable="false"
              :options="item.children"
              @input="setSelected"
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
            <a @click="rediectTo(item)" v-else>
              <span class="category-name">{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div v-if="this.$page.frontmatter.languages && !categorys.length" class="rong-platforms-box">
        <ul class="category-wrapper rong-category-wrapper rong-category-padding">
          <li
            class="category-item"
            :class="isSelected(item) ? 'active': ''"
            v-for="(item, index) in this.$page.frontmatter.languages"
            :key="index"
          >
            <v-select
              v-if="item.name == 'multi'"
              v-model="selectedValue"
              class="rong-category-child"
              :clearable="false"
              :options="item.children"
              @input="setSelected"
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
            <a @click="rediectTo(item)" v-else>
              <span class="category-name">{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="rong-category-box rong-category-padding" v-if="categorys.length">
        <div class="rong-category-titles">
          <a
            v-for="(category, index) in categorys"
            :key="index"
            class="rong-category-title"
            @click.prevent="selectCategory(category)"
            :selected="isCategorySelected(category)"
          >{{category.name}}</a>
        </div>
        <div class="rong-category-titles">
          <ul
            class="category-wrapper rong-category-wrapper"
            v-for="(category, index) in categorys"
            :key="index"
            v-if="isCategorySelected(category)"
          >
            <li
              class="category-item"
              :class="isSelected(item) ? 'active': ''"
              v-for="(item, index) in category.languages"
              :key="index"
            >
              <v-select
                v-if="item.name == 'multi'"
                v-model="selectedValue"
                class="rong-category-child"
                :clearable="false"
                :options="item.children"
                @input="setSelected"
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
              <a @click="rediectTo(item)" v-else>
                <span class="category-name">{{ item.text }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Content class="rong-page-box" />

      <div
        class="rong-like"
        v-if="this.$site.themeConfig.like && this.$site.themeConfig.like.title"
      >
        <p class="rong-like-title">{{this.$site.themeConfig.like.title}}</p>
        <div class="rong-like-btn-box">
          <a
            @click="selectLike(true)"
            :disabled="!!isSelectedLike"
            :selected="isSelectedLike && isLike"
            class="rong-like-btn"
          ></a>
          <a
            @click="selectLike(false)"
            class="rong-dislike-btn"
            :selected="isSelectedLike && !isLike"
            :disabled="!!isSelectedLike"
          ></a>
        </div>
        <div class="rong-like-success-box" v-if="this.isSelectedLike">
          <i class="rong-like-success-icon"></i>
          <div class="rong-like-success-content">
            <p class="rong-like-success-title">{{this.$site.themeConfig.like.success}}</p>
            <p class="rong-like-success-thank">{{this.$site.themeConfig.like.thank}}</p>
          </div>
        </div>
        <div class="rong-like-other" v-html="this.$site.themeConfig.like.afterHtml"></div>
      </div>

      <ModuleTransition delay="0.24">
        <footer v-show="recoShowModule" class="page-edit">
          <div class="edit-link" v-if="editLink">
            <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
            <OutboundLink />
          </div>

          <div class="last-updated" v-if="lastUpdated">
            <span class="prefix">{{ lastUpdatedText }}:</span>
            <span class="time">{{ lastUpdated }}</span>
          </div>
        </footer>
      </ModuleTransition>

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
import PageInfo from "@theme/components/PageInfo";
import APIPage from "@theme/components/APIPage";
import { resolvePage, outboundRE, endingSlashRE } from "@theme/helpers/utils";
import ModuleTransition from "@theme/components/ModuleTransition";
import moduleTransitonMixin from "@theme/mixins/moduleTransiton";
import utils from "@theme/components/utils";
import common from "@theme/components/sequenced";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  mixins: [moduleTransitonMixin],
  components: { PageInfo, ModuleTransition, APIPage, vSelect },

  props: ["sidebarItems"],

  data() {
    return {
      selectedValue: "Web 3.x",
      navs: [],
      isHasKey: true,
      categorys: [],
      selectedCategory: {},
      isSelectedLike: false,
      isLike: false
    };
  },

  computed: {
    hideAccessNumber() {
      const valineConfig = this.$themeConfig.valineConfig;
      if (valineConfig) {
        return false;
      } else {
        return true;
      }
    },
    lastUpdated() {
      return this.$page.lastUpdated;
    },
    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$themeConfig.lastUpdated === "string") {
        return this.$themeConfig.lastUpdated;
      }
      return "Last Updated";
    },
    prev() {
      const prev = this.$frontmatter.prev;
      if (prev === false) {
        return;
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path);
      } else {
        return resolvePrev(this.$page, this.sidebarItems);
      }
    },
    next() {
      const next = this.$frontmatter.next;
      if (next === false) {
        return;
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path);
      } else {
        return resolveNext(this.$page, this.sidebarItems);
      }
    },
    editLink() {
      if (this.$frontmatter.editLink === false) {
        return false;
      }
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo
      } = this.$themeConfig;

      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        );
      }
      return "";
    },
    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$themeConfig.editLinkText ||
        `Edit this page`
      );
    }
  },
  methods: {
    rediectTo: function(item) {
      rediectTo(this, item);
    },
    setSelected: function() {
      rediectTo(this, this.selectedValue);
    },
    selectLike: function(isLike) {
      let context = this;
      context.isSelectedLike = true;
      context.isLike = isLike;
      let { feedbackURL } = context.$themeConfig;
      let url = feedbackURL || "//localhost:9095";
      url = `${url}/like`;
      let currentPath = getPath();
      utils.request(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isLike: isLike ? 1 : 0,
          page: currentPath
        })
      });
    },
    isCategorySelected: function(category) {
      return this.selectedCategory === category;
    },
    selectCategory: function(category) {
      this.selectedCategory = category;
      let languages = category.languages || [];
      let lang = languages[0];
      if (lang) {
        this.$router.push(lang.link).catch(() => {});
      }
    },
    navigateTo: function(url) {
      let context = this;
      if (url && url != this.$page.path) {
        context.$router.push(url);
      }
      console.log(url);
    },
    formatNavName: function(name) {
      return name.toLocaleLowerCase();
    },
    isSelected: function(item) {
      let name = item.name.toLocaleLowerCase();
      if (name == "multi") {
        name = item.groupName;
      }
      return this.$page.path.indexOf(name) > -1;
    },
    isAPI: function() {
      return this.$frontmatter.APIConf;
    },
    getTitle: function() {
      let { navs } = this;
      let nav = navs[navs.length - 1] || { title: "" };
      return nav.title;
    },
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo;
        return (
          base.replace(endingSlashRE, "") +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;
      return (
        base.replace(endingSlashRE, "") +
        `/edit` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
        path
      );
    },
    initCategorys: function() {
      var categorys = this.$frontmatter.categorys || [];
      var selectedCategory;
      for (var i = 0, max = categorys.length; i < max; i++) {
        var category = categorys[i];
        var languages = category.languages || [];
        for (var j = 0; j < languages.length; j++) {
          var language = languages[j];
          if (this.isSelected(language)) {
            selectedCategory = category;
          }
        }
      }

      this.categorys = categorys;
      if (selectedCategory) {
        this.selectedCategory = selectedCategory;
      } else if (categorys.length) {
        this.selectedCategory = categorys[0];
      }
    }
  },
  created: function() {
    getNavs(this);
  },
  mounted: function() {
    this.initCategorys();
    scrollToAnchor();
    initDefaultSelected(this);
    initSequence();
    initTOCScroll();
  },
  watch: {
    $route: function(newRoute, oldRoute) {
      getNavs(this);
      initSequence(newRoute, oldRoute);
      this.initCategorys();
      this.isSelectedLike = false;
      this.selectedValue = this.selectedValue.text || this.selectedValue;
      this.$nextTick(() => {
        initTOCScroll();
      });
    }
  }
};
function initTOCScroll() {
  var filter = function(arrs, callback) {
    var _arrs = [];
    for (var i = 0; i < arrs.length; i++) {
      var item = arrs[i];
      if (callback(item)) {
        _arrs.push(item);
      }
    }
    return _arrs;
  };
  var getElements = () => {
    var root = document.querySelector(".rong-page-box.content__default");
    var children = root.children;
    var elements = [];
    for (var i = 0; i < children.length; i++) {
      var element = children[i];
      if (element.tagName.indexOf("H") > -1) {
        elements.push(element);
      }
    }
    return elements;
  };
  var elements = getElements();
  var beforeScrollTop = 0;
  var lastUpNode = null,
    lastDownNode = null;
  var CLASS_NAME = "rong-scroll-active";
  var addClass = function(id) {
    var reg = /[\u4E00-\u9FFF]+/;
    var isChina = reg.test(id);
    if (isChina) {
      id = " " + id;
    }
    var nextNavs = document.querySelectorAll('a[href="#' + id + '"]');
    var nextNav = filter(nextNavs, nav => {
      return nav.className.indexOf("header-anchor") == -1;
    })[0];
    if (nextNav && nextNav !== lastUpNode) {
      removeClass();
      nextNav.parentNode.classList.add(CLASS_NAME);
      lastUpNode = nextNav;
    }
  };
  var removeClass = function() {
    if (lastUpNode) {
      lastUpNode.parentNode.classList.remove(CLASS_NAME);
    }
  };
  var getDownIndex = function(i, len) {
    var _i = 0;
    if (i != 0) {
      _i = i - 1;
    }
    if (i == len - 1) {
      _i = i;
    }
    return _i;
  };
  var getUpIndex = function(i, len) {
    var _i = 0;
    var maxIndex = len - 1;
    if (i != maxIndex) {
      _i = i + 1;
    }
    if (i == maxIndex) {
      _i = maxIndex;
    }
    return _i;
  };
  var direction = {
    up: function(scrollTop) {
      var first = elements[0];
      var isTop = scrollTop < first.offsetTop;
      if (isTop) {
        return addClass(first.id);
      }
      for (var i = elements.length - 1; i >= 0; i--) {
        var el = elements[i];
        if (el.offsetTop <= window.pageYOffset) {
          var index = getUpIndex(i, elements.length);
          el = elements[index];
          return addClass(el.id);
        }
      }
    },
    down: function(scrollTop) {
      var last = elements[elements.length - 1];
      var isBottom = scrollTop > last.offsetTop;
      if (isBottom) {
        return addClass(last.id);
      }
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.offsetTop >= window.pageYOffset) {
          var index = getDownIndex(i, elements.length);
          el = elements[index];
          return addClass(el.id);
        }
      }
    }
  };
  var interval = 0;
  var onScroll = function() {
    clearTimeout(interval);
    interval = setTimeout(function() {
      var afterScrollTop = window.pageYOffset;
      var delta = afterScrollTop - beforeScrollTop;
      var type = delta > 0 ? "down" : "up";
      direction[type](afterScrollTop);
      beforeScrollTop = afterScrollTop;
    }, 50);
  };
  if (elements.length > 0) {
    window.addEventListener("scroll", onScroll);
    onScroll();
  }
}
function rediectTo(context, item) {
  window.localStorage.setItem("rong-current-page", item.link);
  context.$router
    .push({
      path: item.link
    })
    .catch(error => {});
}
function initSequence(newRoute, oldRoute) {
  newRoute = newRoute || { path: "new" };
  oldRoute = oldRoute || { path: "old" };
  setTimeout(() => {
    if (newRoute.path != oldRoute.path) {
      common.Sequenced.renderAll();
    }
  }, 1000);
}
function initDefaultSelected(context) {
  let link = window.localStorage.getItem("rong-current-page");
  let pages = [];
  let {
    $page: { frontmatter }
  } = context;
  let languages = frontmatter.languages || [];
  let platforms = frontmatter.platforms || [];
  let categorys = frontmatter.categorys || [];

  pages = pages.concat(languages);
  pages = pages.concat(platforms);
  for (let i = 0; i < categorys.length; i++) {
    let category = categorys[i];
    pages = pages.concat(category.languages);
  }
  let page = pages.filter(page => {
    return page.name == "multi";
  })[0];
  if (page) {
    console.log(page);
    let { children } = page;
    let child = children.filter(_child => {
      return _child.link == link;
    })[0];
    if (child) {
      context.selectedValue = child.text;
    }
  }
}
function scrollToAnchor() {
  let hash = window.location.hash;
  if (hash) {
    let node = document.querySelector(`a[href="${hash}"]`);
    if (node) {
      node.click();
    }
  }
}

function getPath() {
  return window.location.href;
}
function getLinks(path) {
  /** 路径项 */
  const routePaths = path.split("#")[0].split("/");
  /** 链接 */
  const links = [];
  let link = "";
  // 生成链接
  routePaths.forEach((element, index) => {
    if (index !== routePaths.length - 1) {
      link += `${element}/`;
      links.push(link);
    } else if (element !== "") {
      link += element;
      links.push(link);
    }
  });
  return links;
}
function formatSidebars(bars, parent, root) {
  parent = parent || "";
  var sidebars = [];
  bars.forEach(bar => {
    var name = parent + bar.depth;
    let hasChild = !!bar.children;

    sidebars.push({
      title: bar.title,
      name: name,
      url: bar.cpath
    });
    if (hasChild) {
      let children = formatSidebars(bar.children, name, root);
      sidebars = sidebars.concat(children);
    }
  });
  return sidebars;
}

function getElements(sidebar, pages) {
  let elements = [];
  for (let name in sidebar) {
    let bars = sidebar[name];
    let sidebars = formatSidebars(bars, name, name);
    sidebars.forEach(bar => {
      elements.push(bar);
    });
  }

  pages.forEach(({ title, path: url }) => {
    elements.push({
      title,
      name: url,
      url
    });
  });
  return elements;
}
function getNavs(context) {
  let {
    $route,
    $site: {
      pages,
      themeConfig: { sidebar }
    }
  } = context;
  let links = getLinks($route.fullPath);
  let elements = getElements(sidebar, pages);
  let navs = [];
  links.forEach(link => {
    elements.forEach(element => {
      let name = element.name;
      if (name == link && name != "/" && element.title) {
        navs.push(element);
      }
    });
  });
  context.navs = navs;
}

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function find(page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset];
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === "group") {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
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
  width: 10px;
  height: 10px;
  z-index: 99;
  background-color: #09F;
  border-radius: 50%;
  left: 0;
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
    position: absolute;
  }

  .rong-category-child .vs__selected-options {
    display: block;
  }

  .page-title {
    // max-width: 740px;
    margin: 0 auto;
    line-height: 50%;
    padding: 0 2.5rem 0rem 2.5rem;
    color: var(--text-color);

    .page-title-content {
      font-size: 30px;
      margin: 20px 0 8px 0;
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
      margin: 0 38px;
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
</style>
