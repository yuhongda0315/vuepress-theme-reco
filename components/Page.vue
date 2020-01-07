<template>
  <main class="page">
    <ModuleTransition>
      <slot v-show="recoShowModule" name="top" />
    </ModuleTransition>

    <ModuleTransition delay="0.08">
      <div v-show="recoShowModule" class="page-title">
        <h3>{{$page.title}}</h3>
        <hr />
        <!-- <PageInfo :pageInfo="$page" :hideAccessNumber="hideAccessNumber"></PageInfo> -->
      </div>
    </ModuleTransition>

    <!-- <ModuleTransition delay="0.16"> -->
    <Content v-show="recoShowModule" />

    <!-- </ModuleTransition> -->

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
  }
};

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
  right: 0;
  top: 80px;
  overflow-y: -moz-scrollbars-none;
  -ms-overflow-style: none;
  overflow-y: auto;
  max-width: 240px;

  @media (min-width: 768px) {
    right: calc(((100% - 750px) / 2));
  }

  @media (min-width: 992px) {
    right: calc(((100% - 970px) / 2));
  }

  @media (min-width: 1200px) {
    right: calc(((100% - 1140px) / 2));
  }

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
      border-left: 3px solid #2b3e50;
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
        &:hover{
          color: #3eaf7c
        }
      }

      & > ul {
        padding-left: 17px;
        list-style-type: none;

        li {
          cursor: pointer;

          a {
            text-decoration: none !important;
            color: var(--text-color);
            display: inline-block;
            position: relative;
            width: 100%;
            padding: 5px 0;
            text-indent: 5px;
            border-radius: 2px;

            &:before {
              content: '';
              position: absolute;
              background-color: #827c7c;
              height: 5px;
              width: 5px;
              top: 17px;
              left: -6px;
              border-radius: 44%;
            }

            &.active {
              background-color: #FF6700;
              color: #FFF;
            }

            &:hover {
              color: #3eaf7c
            }
          }
        }
      }
    }
  }
}
</style>
