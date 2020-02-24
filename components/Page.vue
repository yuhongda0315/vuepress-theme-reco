<template>
  <main class="page">
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
      <div v-show="recoShowModule" class="page-title">
        <h3>{{$page.title}}</h3>
        <hr />
        <!-- <PageInfo :pageInfo="$page" :hideAccessNumber="hideAccessNumber"></PageInfo> -->
      </div>
    </ModuleTransition>

    <ul class="category-wrapper">
      <router-link
        v-for="(item, index) in this.$page.frontmatter.platforms"
        :key="index"
        :to="{path: item.link, query: {platform: formatNavName(item.name)}}"
      >
        <li class="category-item" :class="isSelected(item) ? 'active': ''">
          <span class="category-name">{{ item.text }}</span>
        </li>
      </router-link>
    </ul>

    <ul class="category-wrapper">
      <li
        class="category-item"
        :class="isSelected(item) ? 'active': ''"
        v-for="(item, index) in this.$page.frontmatter.languages"
        :key="index"
      >
        <router-link :to="{path: item.link, query: {platform: formatNavName(item.name)}}">
          <span class="category-name">{{ item.text }}</span>
        </router-link>
      </li>
    </ul>

    <Content v-show="recoShowModule" />
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
  </main>
</template>

<script>
import PageInfo from "@theme/components/PageInfo";
import { resolvePage, outboundRE, endingSlashRE } from "@theme/helpers/utils";
import ModuleTransition from "@theme/components/ModuleTransition";
import moduleTransitonMixin from "@theme/mixins/moduleTransiton";

export default {
  mixins: [moduleTransitonMixin],
  components: { PageInfo, ModuleTransition },

  props: ["sidebarItems"],

  data() {
    return {
      navs: [],
      isHasKey: true
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
    navigateTo:function(url){
      let context = this;
      if(url && url != location.pathname){
        context.$router.push(url)
      }
      console.log(url);
    },
    formatNavName: function(name) {
      return name.toLocaleLowerCase();
    },
    isSelected: function(item) {
      return location.href.indexOf(item.name.toLocaleLowerCase()) > -1;
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
    }
  },
  created: function(){
    getNavs(this);
  },
  watch: {
    $route: function() {
      getNavs(this);
    }
  }
};

function getLinks(path){
 /** 路径项 */
  const routePaths = path.split('#')[0].split('/');
  /** 链接 */
  const links = [];
  let link = '';
  // 生成链接
  routePaths.forEach((element, index) => {
    if (index !== routePaths.length - 1) {
      link += `${element}/`;
      links.push(link);
    } else if (element !== '') {
      link += element;
      links.push(link);
    }
  });
  return links;
}
function formatSidebars(bars, parent, root){
  parent = parent || '';
  var sidebars = [];
  bars.forEach((bar) => {
    var name = parent + bar.depth;
    let hasChild = !!bar.children;

    sidebars.push({
      title: bar.title,
      name: name,
      url: bar.cpath
    })
    if(hasChild){
      let children = formatSidebars(bar.children, name, root);
      sidebars = sidebars.concat(children);
    }
  });
  return sidebars;
}

function getElements(sidebar, pages){
  let elements = [];
  for(let name in sidebar){
    let bars = sidebar[name];
    let sidebars = formatSidebars(bars, name, name);
      sidebars.forEach((bar) => {
        elements.push(bar);
    });
  }
  
  pages.forEach(({title, path: url}) => {
    elements.push({
      title,
      name: url,
      url
    });
  });
  return elements;
}
function getNavs(context){
  let { $route,$site:{ pages, themeConfig: { sidebar } } } = context;
  let links = getLinks($route.fullPath);
  let elements = getElements(sidebar, pages);
  let navs = [];
  links.forEach((link) => {
    elements.forEach((element) => {
      let name = element.name;
      if(name == link && name != '/' && element.title){
        navs.push(element)
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

.page {
  padding-top: 5rem;
  padding-bottom: 2rem;
  display: block;
  margin-right: 190px;

  .header-navs{

  }
  .header-nav{
    list-style: none;
    display: inline-block;
    cursor pointer;
    a {
      &:hover{
        color: #3eaf7c
      }
    }
    &:nth-child(even){
      &:after, &:before  {
        content: '>'
        margin: 0 4px
      }
    }
    &:last-child{
      &:after{
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
    height: 26px;
    line-height: 26px;
    margin: 0 5px;
    cursor: pointer;
    padding: 0 2px;
    box-sizing: border-box;

    &:hover, &.active {
      background: #2b3e50;

        span.category-name {
        color: #fff;
      }
    }
  }

  .page-title {
    // max-width: 740px;
    margin: 0 auto;
    line-height: 50%;
    padding: 0 2.5rem 0rem 2.5rem;
    color: var(--text-color);
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
  right: 5%;
  top: 80px;
  overflow-y: -moz-scrollbars-none;
  -ms-overflow-style: none;
  overflow-y: auto;
  max-width: 240px;

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

      & > a {
        text-decoration: none !important;
        font-weight: 500;
        font-size: 0.9rem;
        color: var(--text-color);

        &:before {
          content: ' ';
          position: absolute;
          background-color: #FF6700;
          top: 10px;
          left: -16px;
        }

        &:hover {
          color: #3eaf7c;
        }
      }
    }
  }
}
</style>
