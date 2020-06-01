<template>
  <div class="serp-summary">搜索页面</div>
</template>

<script>
import moduleTransitonMixin from "@theme/mixins/moduleTransiton";

export default {
  data: function() {
    return {
      mainSummary: [],
      otherSummary: [],
      selectedSummary: {}
    };
  },
  mixins: [moduleTransitonMixin],
  // components: { ModuleTransition },
  computed: {
    actionLink() {
      return {
        link: this.$frontmatter.actionLink,
        text: this.$frontmatter.actionText
      };
    },
    heroImageStyle() {
      return (
        this.$frontmatter.heroImageStyle || {
          maxHeight: "200px",
          margin: "6rem auto 1.5rem"
        }
      );
    }
  },
  methods: {
    isSelected: function(summary) {
      return this.selectedSummary === summary;
    },
    select: function(summary) {
      this.selectedSummary = summary;
    }
  },
  mounted: function() {
    var summary = this.$themeConfig.summary || {};
    this.mainSummary = summary.main;
    this.otherSummary = summary.other;
    this.selectedSummary = this.mainSummary[0];
  }
};
</script>

<style lang="stylus">
@require '../styles/mode.styl';

.rong-content-box .rong-page-content {
  padding-left: 0 !important;
}

.serp-summary {
  max-width: 90%;
  background-color: #FF6700;
  margin: 0 auto;
}

@media (max-width: $MQMobile) {
  .serp-summary {
    .features {
      flex-direction: column;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .serp-summary {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
