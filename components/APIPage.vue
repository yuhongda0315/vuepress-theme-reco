<template>
  <div class="rong-container">
    <div class="rong-search-box">
      <SearchAPI class="rong-search" />
    </div>
    <ul class="rong-modules">
      <li class="rong-module" v-for="(module, index) in modules" :key="index">
        <span class="rong-module-name">{{module.name}}</span>
        <table class="rong-apis">
          <tr>
            <th>API 名称</th>
            <th>API 描述</th>
          </tr>
          <tr class="rong-api" v-for="(api, i) in module.apis" :key="i">
            <td>
              <a class="rong-api-name" @click="$modal.show('size-modal')" >{{api.name}}</a>
            </td>
            <td>{{api.desc}}</td>
          </tr>
        </table>
      </li>
    </ul>
    <APIContent/>
  </div>
</template>

<script>
import SearchAPI from "@theme/components/SearchAPI";
import APIContent from "@theme/components/APIContent";
export default {
  components: { SearchAPI, APIContent },
  data() {
    return {
      modules: [
        {
          name: "连接模块",
          apis: [
            { name: "connect", desc: "连接方法", isTip: false },
            { name: "disconnect", desc: "断开连接", isTip: false },
            { name: "reconnect", desc: "重连方法", isTip: false },
            {
              name: "setConnectionStatusListener",
              desc: "状态监听",
              isTip: false
            }
          ]
        },
        {
          name: "会话模块",
          apis: [
            { name: "getConversationList", desc: "获取会话列表", isTip: false }
          ]
        }
      ]
    };
  },
  computed: {},
  methods: {
    showTip: function(api) {
      api.isTip = true;
    },
    hideTip: function(api) {
      api.isTip = false;
    }
  },
  watch: {}
};
</script>

<style lang="stylus" scoped>
@require '../styles/mode.styl';

.rong-container {
  padding: 0 5px;
}

.rong-search-box {
  text-align: center;
  margin-bottom: 20px;
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

>>> td{
  width: 50%;
  line-height: 16px
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
