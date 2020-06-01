<template>
  <div class="rong-outer">
    <Common>
      <component v-if="$frontmatter.home" :is="homeCom"></component>
      <component v-else-if="$frontmatter.summary" :is="SummaryCon"></component>
      <Page v-else :sidebar-items="sidebarItems">
        <slot name="page-top" slot="top" />
        <slot name="page-bottom" slot="bottom" />
      </Page>
    </Common>
    <Footer v-if="$frontmatter.home" class="footer" />
  </div>
</template>

<script>
import Home from "@theme/components/Home";
import Summary from "@theme/components/Summary";
import Page from "@theme/components/Page";
import Footer from "@theme/components/Footer";
import Common from "@theme/components/Common";
import { resolveSidebarItems } from "@theme/helpers/utils";

export default {
  components: { Home, Page, Common, Footer, Summary },

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
      return "Home";
    },
    SummaryCon(){
      return "Summary";
    }
  }
};
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../styles/theme.styl" lang="stylus"></style>
