<template>
  <div class="footer-wrapper">
    <!-- <span>
      <i class="iconfont reco-theme"></i>
      <a target="blank" href="https://www.rongcloud.cn">RongCloud</a>
    </span>-->
    <span v-if="$themeConfig.record">
      <i class="iconfont reco-beian"></i>
      <a :href="$themeConfig.recordLink || '#'">{{ $themeConfig.record }}</a>
    </span>
    <span>
      <i class="iconfont reco-copyright"></i>
      <a>
        <span v-if="$themeConfig.startYear">{{ $themeConfig.startYear }} -</span>
        {{ year }}
        &nbsp;&nbsp;
        <span
          v-if="$themeConfig.author || $site.title"
        >{{ $themeConfig.author || $site.title }}</span>
      </a>
    </span>
    <span v-show="$themeConfig.valineConfig !== undefined">
      <i class="iconfont reco-eye"></i>
    </span>
    <p class="cyber-security" v-if="$themeConfig.cyberSecurityRecord">
      <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" alt />
      <a :href="$themeConfig.cyberSecurityLink || '#'">{{ $themeConfig.cyberSecurityRecord }}</a>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="stylus" scoped>
.footer-wrapper {
  padding: 1.5rem 2.5rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
  color: lighten($textColor, 25%);
  position: absolute;
  bottom: 0;
  width: 100%;

  a {
    font-size: 14px;
  }

  > span {
    margin-left: 1rem;

    > i {
      margin-right: 0.5rem;
    }
  }

  .cyber-security {
    img {
      margin-right: 0.5rem;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }

    a {
      vertical-align: middle;
    }
  }
}

@media (max-width: $MQMobile) {
  .footer {
    text-align: left !important;

    > span {
      display: block;
      margin-left: 0;
      line-height: 2rem;
    }
  }
  .footer-wrapper {
    position relative
  }
}
</style>
