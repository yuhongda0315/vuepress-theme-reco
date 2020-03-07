<template>
  <div class="home">
    <div class="rong-home-nav">
      <a>即时通讯
        </a><a>实时音视频</a>
    </div>
    <div class="rong-home-vertical-list">
      <div class="rong-home-vertical-content">
        <h4>服务指南</h4>
        <ul>
          <li><a>产品简介</a></li>
          <li><a>名词列表</a></li>
          <li><a>常见问题</a></li>
          <li><a>状态码</a></li>
        </ul>
      </div>
      <div class="rong-home-vertical-content">
        <h4>服务指南</h4>
        <ul>
          <li><a>产品简介</a></li>
          <li><a>名词列表</a></li>
          <li><a>常见问题</a></li>
          <li><a>状态码</a></li>
        </ul>
      </div>
      <div class="rong-home-vertical-content">
        <h4>服务指南</h4>
        <ul>
          <li><a>产品简介</a></li>
          <li><a>名词列表</a></li>
          <li><a>常见问题</a></li>
          <li><a>状态码</a></li>
        </ul>
      </div>
      <div class="rong-home-vertical-content">
        <h4>服务指南</h4>
        <ul>
          <li><a>产品简介</a></li>
          <li><a>名词列表</a></li>
          <li><a>常见问题</a></li>
          <li><a>状态码</a></li>
        </ul>
      </div>
      <div class="rong-home-vertical-content">
        <h4>服务指南</h4>
        <ul>
          <li><a>产品简介</a></li>
          <li><a>名词列表</a></li>
          <li><a>常见问题</a></li>
          <li><a>状态码</a></li>
        </ul>
      </div>
    </div>
    <div class="rong-home-horizontal-list">
      <div class="rong-home-horizontal-content">
        <h4>运营服务</h4>
        <ul>
          <li>产品简介</li>
          <li>短信</li>
          <li>预防黑产</li>
          <li>初次集成</li>
        </ul>
      </div>

      <div class="rong-home-horizontal-content">
        <h4>初次集成</h4>
        <ul>
          <li>集成必须</li>
          <li>视频教程</li>
          <li>寻求帮助</li>
          <li>三分钟跑通 Demo</li>
          <li>一天接入 SDK</li>
          <li>十分钟上线</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import NavLink from '@theme/components/NavLink'
// import ModuleTransition from '@theme/components/ModuleTransition'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'

export default {
  mixins: [moduleTransitonMixin],
  // components: { NavLink, ModuleTransition },
  computed: {
    actionLink () {
      return {
        link: this.$frontmatter.actionLink,
        text: this.$frontmatter.actionText
      }
    },

    heroImageStyle () {
      return this.$frontmatter.heroImageStyle || {
        maxHeight: '200px',
        margin: '6rem auto 1.5rem'
      }
    }

    // list() {
    //   return [
    //     {
    //       title: '即时通讯',

    //     }
    //   ]
    // }
  }
}
</script>

<style lang="stylus">
@require '../styles/mode.styl'

.rong-home-nav {
  width: 100%;
  text-align: center;
  margin-bottom: 60px;
  padding-right: 85px;
  box-sizing: border-box;
  a {
    display: inline-block;
    width: 165px;
    height: 50px;
    line-height: 50px;
    background-color: #2B2E3D;
    font-size 18px;
    color: white;
  }
}
.rong-home-horizontal-list {
  margin-top: 120px;
  width: 100%;
  // text-align: center;
  margin-bottom: 100px;
  .rong-home-horizontal-content {
    text-align: left;
    display: inline-block;
    width: 49%;
    vertical-align: top;
    h4 {
      color: black;
      font-size: 18px;
      margin: 0;
      margin-bottom: 20px;
    }
    ul {
      padding: 0;
    }
    li {
      list-style: none;
      display: inline-block;
      font-size: 14px;
      color: #0099FF;
      margin-right: 38px;
      margin-bottom: 15px;
    }
  }
}
.rong-home-vertical-list {
  // text-align: center;
  .rong-home-vertical-content {
    // min-width: 135px;
    // margin-right: 15px;
    width: 220px;
    display: inline-block;
    margin-bottom: 20px;
    text-align: left;
    h4 {
      font-size: 18px;
      color: #666666;
      margin: 0;
    }
    ul {
      padding: 0;
    }
    li {
      list-style: none;
      font-size 14px;
      margin-top: 20px;
      a {
        color: #0099FF;
      }
    }
  }
}

.home {
  padding: $navbarHeight 2rem 0;
  max-width: 1200px;
  margin: 0px auto;
  padding-top: 60px;
  padding-left: 85px;
  padding-right: 0;
  box-sizing: border-box;

  .hero {
    text-align: center;
    h1 {
      font-size: 2.5rem;
      color: var(--text-color);
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      font-size: 1.6rem;
      line-height: 1.3;
      color: var(--text-color);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.6rem 1.2rem;
      border-radius: $borderRadius
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      load-start()

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .features {
    // border-top: 1px solid var(--border-color);;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;
    transition: all .5s
    color: var(--text-color);
    h2 {
      font-size: 1.6rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
    }

    &:hover {
      transform scale(1.05)
    }
  }

//   &.reco-hide {
//   .hero {
//     img {
//       load-start()
//     }
//     .h1 {
//       load-start()
//     }
//     .description {
//       load-start()
//     }
//     .huawei {
//       load-start()
//     }
//     .action-button {
//       load-start()
//     }
//   }
//   .features {
//     load-start()
//   }
//   .home-center {
//     load-start()
//     padding 0
//   }
// }

//   &.reco-show {
//     .hero {
//       img {
//         load-end(0.08s)
//       }
//       .h1 {
//         load-end(0.16s)
//       }
//       .description {
//         load-end(0.24s)
//       }
//       .huawei {
//         load-end(0.32s)
//       }
//       .action-button {
//         load-end(0.4s)
//       }
//     }
//     .features {
//       load-end(0.40s)
//     }
//     .home-center {
//       load-end(0.48s)
//     }
//   }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
