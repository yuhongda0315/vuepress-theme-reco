<template>
  <div class="rong-container">
    <div class="rong-search-box">
      <APISearch class="rong-search rong-api-search" @showAPIs="show" :platform="platform" :apiType="apiType" />
    </div>
    <div class="rong-api-list">
      <div class="rong-api-content" v-for="(module, index) in modules" :key="index">
        <table>
          <tr>
            <th>{{module.name}}</th>
            <th>描述</th>
          </tr>
          <tr v-for="(api, index) in module.apis" :key="index">
            <td>
              <a @click="showAPI(api)">{{api.name}}</a>
            </td>
            <td>{{api.desc}}</td>
          </tr>
        </table>
      </div>
    </div>
    <APIContent :api="selectedAPI" :platform="platform" :apiType="apiType"/>
  </div>
</template>

<script>
import APISearch from "@theme/components/APISearch";
import APIContent from "@theme/components/APIContent";
import utils from "@theme/components/utils";

export default {
  components: { APISearch, APIContent },
  data() {
    return {
      selectedAPI: {},
      platform: "",
      apiType: 0,
      modules: []
    };
  },
  computed: {},
  mounted: function() {
    let context = this;
    let conf = getConfig(this.$frontmatter);
    context.platform = conf.platform;
    context.apiType = conf.type;
    getModules(this);

    let name = location.hash.split("#")[1];
    if (name) {
      getOneModule(context, name, module => {
        var isRefresh = true;
        context.showAPI({
          id: name,
          module
        }, isRefresh);
      });
    }
  },
  methods: {
    show: function(api) {
      this.showAPI(api);
    },
    showAPI: function(api, isRefresh) {
      var context = this;
      context.selectedAPI.id = api.id || api.name;
      context.selectedAPI.module = api.module;
      context.selectedAPI.isRefresh = isRefresh;
      context.$modal.show("api-modal");
    },
    showTip: function(api) {
      api.isTip = true;
    },
    hideTip: function(api) {
      api.isTip = false;
    }
  },
  watch: {
    $frontmatter: function(option) {
      let conf = getConfig(option);
      this.platform = conf.platform;
      this.apiType = conf.type;
      getModules(this);
    }
  }
};
function getConfig(option) {
  let conf = option.APIConf[0];
  return conf;
}
function getModules(context) {
  let { APIUrl } = context.$themeConfig;
  let url = APIUrl || "//localhost:8992";
  url = `${url}/misc/modules/${context.platform}/${context.apiType}`;
  utils.request(url).then(({ result: modules }) => {
    context.modules = modules;
  });
}
function getOneModule(context, name, callback) {
  let { APIUrl } = context.$themeConfig;
  let url = APIUrl || "//localhost:8992";
  url = `${url}/misc/find_module/${context.platform}/${name}/${context.apiType}`;
  utils.request(url).then(({ result: { module } }) => {
    callback(module);
  });
}
</script>

<style lang="stylus" scoped>
@require '../styles/mode.styl';

.rong-container {
  // padding: 0 5px;
}

.rong-search-box {
  text-align: center;
  margin-bottom: 20px;
  min-height: 33px;
}

>>> .rong-search .reco-search {
  top: 10px;
}

>>> .rong-search input:focus {
  border: none;
  border-color: var(--border-color);
  border-bottom: 1px solid #3eaf7c;
  border-radius: 0;
}

>>> .rong-search input {
  border: none;
  border-bottom: 1px solid var(--border-color);
  border-radius: 0;
  width: 18rem;
}

.rong-search {
  border: none;
}

.rong-modules {
  list-style: none;
  column-count: 2;
  padding: 0 10px;
  column-gap: 8px;
}

.rong-module {
  background-color: #eee;
  margin-bottom: 5px;
  border-radius: 5px;
  display: block;
  break-inside: avoid;
  overflow: hidden;
}

.rong-module-name {
  margin: 3px;
  display: block;
}

.rong-apis {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rong-api {
  margin: 3px;
  padding: 3px;
  box-sizing: border-box;
  position: relative;
}

>>> td {
  width: 50%;
  line-height: 16px;
}

.rong-api-name {
}

.rong-api-desc {
  position: absolute;
  top: -14px;
  left: 3px;
  background: #000;
  opacity: 0.7;
  color: #fff;
  border-radius: 9px;
  padding: 0 8px;
  line-height: 18px;
  min-width: 100px;
  text-align: center;
  display: inline;
}

.rong-api-desc:before {
  position: absolute;
  content: '';
  border-bottom: 5px transparent dashed;
  border-left: 5px transparent dashed;
  border-right: 5px transparent dashed;
  border-top: 5px #000 solid;
  top: 17px;
  left: 45px;
}

.rong-api a:hover {
  cursor: pointer;
}
</style>
