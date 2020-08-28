<template>
  <div class="home rong-home-smallscreen" v-if="isSmallScreen">
    <div class="rong-home-nav" v-for="(summary, index) in mainSummary" :key="index">
      <a selected="selected">{{summary.name}}</a>
      <p></p>
      <div class="rong-home-vertical-list">
        <div
          class="rong-home-vertical-content"
          v-for="(subSummary, index) in summary.sub"
          :key="index"
        >
          <h4>{{subSummary.name}}</h4>
          <ul>
            <li v-for="(title, index) in subSummary.titles" :key="index">
              <a :href="title.link">{{title.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="home" v-else>
    <div class="rong-home-nav" v-if="mainSummary">
      <a
        v-for="(summary, index) in mainSummary"
        :key="index"
        :selected="isSelected(summary)"
        @click="select(summary)"
      >{{summary.name}}</a>
    </div>
    <div class="rong-home-vertical-list" v-if="selectedSummary">
      <div
        class="rong-home-vertical-content"
        v-for="(subSummary, index) in selectedSummary.sub"
        :key="index"
      >
        <h4 :style="subSummary.style">
          {{subSummary.name}}
          <i class="rong-home-summary-icon" v-if="subSummary.icon" :style="{'background-image': 'url(' + subSummary.icon + ')'}"></i>
        </h4>
        <ul>
          <li v-for="(title, index) in subSummary.titles" :key="index">
            <a :href="title.link">{{title.name}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="rong-home-horizontal-list">
      <div
        class="rong-home-horizontal-content"
        v-for="(summary, index) in otherSummary"
        :key="index"
      >
        <h4>{{summary.name}}</h4>
        <ul>
          <li v-for="(title, index) in summary.titles" :key="index">
            <a :href="title.link">{{title.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import NavLink from '@theme/components/NavLink'
// import ModuleTransition from '@theme/components/ModuleTransition'
import moduleTransitonMixin from "@theme/mixins/moduleTransiton";
import utils from './utils'

const HomeClassName = 'rong-in-home'

const isSmallScreen = utils.isSmallScreen

const setHomeBodyClass = utils.setHomeBodyClass

export default {
  data: function() {
    return {
      mainSummary: [],
      otherSummary: [],
      selectedSummary: {},
      isSmallScreen: isSmallScreen()
    }
  },
  mixins: [moduleTransitonMixin],
  // components: { NavLink, ModuleTransition },
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

    // list() {
    //   return [
    //     {
    //       title: '即时通讯',

    //     }
    //   ]
    // }
  },
  methods: {
    isSelected: function(summary) {
      return this.selectedSummary === summary;
    },
    select: function(summary) {
      this.selectedSummary = summary;
    },
    onWindowResize () {
      this.isSmallScreen = isSmallScreen()
    }
  },
  mounted: function() {
    var summary = this.$themeConfig.summary || {};
    this.mainSummary = summary.main;
    this.otherSummary = summary.other;
    this.selectedSummary = this.mainSummary[0];
    window.addEventListener('resize', this.onWindowResize)
    setHomeBodyClass({
      className: HomeClassName
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.onWindowResize)
    setHomeBodyClass({
      isRemove: true,
      className: HomeClassName
    })
  }
}
</script>

<style lang="stylus">
@require '../styles/mode.styl';

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
    background-color: white;
    font-size: 18px;
    color: black;
    cursor: pointer;
    border: 1px solid #2B2E3D;
    box-sizing: border-box;

    &:nth-child(even) {
      border-right: 0;
      border-left: 0;
    }

    &:last-child {
      border-right: 1px solid #2B2E3D;
    }
  }

  a[selected] {
    background-color: #2B2E3D;
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
  display: flex;

  .rong-home-vertical-content {
    display: inline-block;
    margin-bottom: 30px;
    text-align: left;
    flex: 1;

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
      font-size: 14px;
      margin-top: 20px;

      a {
        color: #0099FF;
      }
    }
  }
}

.home {
  padding-top: 120px;

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
      border-radius: $borderRadius;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      load-start();

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
    transition: all 0.5s;
    color: var(--text-color);

    h2 {
      font-size: 1.6rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
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

  .rong-home-vertical-list {
    display: block;

    .rong-home-vertical-content {
      margin-left: 0px;
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

.rong-outer .no-sidebar .rong-page-content {
  padding-right: 0;
}
.rong-home-smallscreen .rong-home-vertical-list {
  display: block;
}
.rong-home-smallscreen .rong-home-vertical-list  .rong-home-vertical-content {
  display: block;
  text-align: center;
}
.rong-home-smallscreen {
  padding-top: 50px;
  .rong-home-nav {
    margin-bottom 30px;
    padding-right: 0;
  }
}
.rong-home-smallscreen .rong-home-vertical-list  {
  .rong-home-vertical-content {
    margin-bottom: 20px;
    ul {
      margin: 5px;
    }
    li a {
      border: none;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
    }
    li {
      height: 18px;
      line-height: 18px;
      margin: 8px;
    }
  }
}

@media (max-width: 900px) {
  .search-box, .feed-back-buttonSpace {
    display: none !important;
  }
}

.rong-in-home {
  .sidebar-button {
    display: none;
  }
  .back-to-ceiling {
    right: 10px !important;
  }
}
.rong-home-summary-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  top: 2px;
  margin-left: 1px;
}
</style>
