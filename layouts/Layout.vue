<template>
  <div class="rong-outer">
    <Common>
      <component v-if="$frontmatter.home" :is="homeCom"></component>
      <Page v-else :sidebar-items="sidebarItems">
        <slot name="page-top" slot="top" />
        <slot name="page-bottom" slot="bottom" />
      </Page>
      <Footer v-if="$frontmatter.home" class="footer" />
    </Common>
  </div>
</template>

<script>
import Home from "@theme/components/Home";
import HomeBlog from "@theme/components/HomeBlog";
import Page from "@theme/components/Page";
import Footer from "@theme/components/Footer";
import Common from "@theme/components/Common";
import { resolveSidebarItems } from "@theme/helpers/utils";
import RongcloudFeedback from './libs/rongcloud-feedback.1.0.0';
RongcloudFeedback()({
  source: "文档频道-V3",
  url: "https://api-tools.rongcloud.cn/feedback-server/save",
  right: '10px',
  bottom: '15%'
});

export default {
  components: { HomeBlog, Home, Page, Common, Footer },

  computed: {
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },
    homeCom() {
      const { type } = this.$themeConfig;
      if (type !== undefined) {
        return type == "blog" ? "HomeBlog" : type;
      }
      return "Home";
    }
  }
};
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./libs/rongcloud-feedback.css"></style>
<style src="../styles/theme.styl" lang="stylus"></style>