<template>
  <div class="rong-container">
    <div class="rong-search"></div>
    <div class="rong-api-list">
      <div class="rong-api-content" v-for="(module, index) in modules" :key="index">
        <table>
          <tr>
            <th>{{module.name}}</th>
            <th>描述</th>
          </tr>
          <tr v-for="(api, index) in module.apis" :key="index">
            <td>{{api.name}}</td>
            <td>{{api.desc}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- <ul class="rong-modules">
      <li class="rong-module" v-for="(module, index) in modules" :key="index">
        <span class="rong-module-name">{{module.name}}</span>
        <ul class="rong-apis">
          <li class="rong-api" v-for="(api, i) in module.apis" :key="i">
            <a class="rong-api-name" @mouseover="showTip(api)" @mouseleave="hideTip(api)">{{api.name}}</a>
            <span class="rong-api-desc" v-if="api.isTip">{{api.desc}}</span>
          </li>
        </ul>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      modules: [
        {
          name: '群组 API',
          apis: [
            {
              name: 'getGroupList',
              desc: '获取群组列表',
              isTip: false
            },
            {
              name: 'getGroupList',
              desc: '获取群组列表',
              isTip: false
            },
            {
              name: 'getGroupList',
              desc: '获取群组列表',
              isTip: false
            }
          ]
        },
        {
          name: '群组 API',
          apis: [
            {
              name: 'getGroupList',
              desc: '获取群组列表',
              isTip: false
            },
            {
              name: 'getGroupList',
              desc: '获取群组列表',
              isTip: false
            },
            {
              name: 'getGroupList',
              desc: '获取群组列表',
              isTip: false
            }
          ]
        },
        {
          name: '连接模块',
          apis: [
            {
              name: 'connect',
              desc: '开始链接',
              isTip: false
            },
            {
              name: 'connect',
              desc: '开始链接',
              isTip: false
            },
            {
              name: 'connect',
              desc: '开始链接',
              isTip: false
            }
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
  padding: 5px;
}

.rong-modules {
  list-style: none;
  column-count: 3;
  padding: 0 10px;
}

.page {
  background-color: red;
}

.rong-module {
  background-color: #eee;
  border-radius: 10px;
  width: 100%;
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
}

.rong-api {
  margin: 3px;
  padding: 3px;
  box-sizing: border-box;
  position: relative;
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
}

.rong-api-desc:before {
  position: absolute;
  content: '';
  border-bottom: 5px transparent dashed;
  border-left: 5px transparent dashed;
  border-right: 5px transparent dashed;
  border-top: 5px #000 solid;
  top: 17px;
  left: 14px;
}

.rong-api a:hover {
  cursor: pointer;
}
</style>
