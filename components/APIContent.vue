<template>
  <modal
    name="api-modal"
    transition="nice-modal-fade"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="90%"
    height="90%"
    @before-open="onBeforeOpen"
  >
    <div class="rong-modal">
      <div class="rong-loading-box" v-if="!navs.length">
        <div class="rong-loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="rong-wrapper" v-if="navs.length">
        <div class="rong-sidebars">
          <ul class="rong-navs">
            <li class="rong-nav" v-for="(nav, index) in navs" :key="index">
              <a :href="'#' + nav.id">{{nav.name}}</a>
            </li>
          </ul>
        </div>
        <div class="rong-main">
          <ul class="rong-apis">
            <li id="connect" class="rong-api" v-for="(api, index) in apis" :key="index">
              <p class="rong-api-name">{{api.name}}</p>
              <pre class="rong-api-code">{{api.code}}</pre>
              <span class="rong-part-name" v-if="api.params">Parameters</span>
              <ul class="rong-params">
                <li class="rong-param" v-for="(param, p) in api.params" :key="p">
                  <span class="rong-param-column">{{param.name}}</span>
                  <span class="rong-param-column">{{param.desc}}</span>
                </li>
              </ul>
              <span class="rong-part-name" v-if="api.warnings">Warning</span>
              <ul class="rong-warings" v-for="(waring, w) in api.warnings" :key="w">
                <li class="rong-warning">{{waring.desc}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  name: "APIModal",
  props: ["api", "platform"],
  data() {
    return {
      navs: [],
      apis: []
    };
  },
  methods: {
    onBeforeOpen: function() {
      setTimeout(() => {
        getAPIs(this);
      }, 3000);
    }
  }
};
function getAPIs(context) {
  context.navs = [
    { id: "connect", name: "connect" },
    { id: "disconnect", name: "disconnect" },
    { id: "reconnect", name: "reconnect" },
    {
      id: "setConnectionStatusListener",
      name: "setConnectionStatusListener"
    }
  ];
  context.apis = [
    {
      name: "连接方法",
      code:
        "- (RCMessage *)sendMessage:(RCConversationType)conversationType targetId:(NSString *)targetId content:(RCMessageContent *)content pushContent:(NSString *)pushContent success:(void (^)(long messageId))successBlock error:(void (^)(RCErrorCode nErrorCode, long messageId))errorBlock",
      params: [
        { name: "token", desc: "用户 Token" },
        {
          name: "userId",
          desc:
            "用户 ID，在开发者应用服务器生成在开发者应用服务器生成在开发者应用服务器生成在开发者应用服务器生成在开发者应用服务器生成在开发者应用服务器生成"
        },
        { name: "userId", desc: "用户 ID，在开发者应用服务器生成" }
      ],
      warnings: [{ desc: "已废弃，请勿使用" }]
    }
  ];
}
</script>
<style scoped>
.rong-modal {
  padding: 10px;
  border-radius: 5px;
  background: #f7f7f7;
  box-shadow: 5px 5px 30px 0px rgba(46, 61, 73, 0.6);
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.v--modal-overlay[data-modal="size-modal"] {
  background: rgba(0, 0, 0, 0.5);
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.rong-wrapper {
  animation: fade-in;
  animation-duration: 0.5s;
  height: 100%;
}

.rong-sidebars {
  width: 200px;
  height: 100%;
  float: left;
  overflow-y: auto;
  border-right: 2px solid rgb(231, 227, 227);
}
.rong-nav {
  margin: 3px;
  padding: 0 10px;
  border-radius: 3px;
  word-break: break-all;
}
.rong-nav a {
  color: var(--text-color);
}
.rong-nav:hover {
  background-color: #0000000d;
}
.rong-loading-box {
  width: 98%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
}
.rong-loading {
  width: 80px;
  height: 40px;
  margin: 0 auto;
}
.rong-loading span {
  display: inline-block;
  width: 8px;
  height: 100%;
  border-radius: 4px;
  background: #90ee90;
  animation: load 1s ease infinite;
}
@keyframes load {
  0%,
  100% {
    height: 40px;
    background: #90ee90;
  }
  50% {
    height: 70px;
    margin: -15px 0;
    background: #add8e6;
  }
}
.rong-loading span:nth-child(2) {
  animation-delay: 0.2s;
}
.rong-loading span:nth-child(3) {
  animation-delay: 0.4s;
}
.rong-loading span:nth-child(4) {
  animation-delay: 0.6s;
}
.rong-loading span:nth-child(5) {
  animation-delay: 0.8s;
}
.rong-main {
  height: 100%;
  margin-left: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  box-sizing: border-box;
  font-family: "Source Code Pro", Monaco, Menlo, Consolas, monospace;
  font-size: 0.9em;
}
.rong-navs,
.rong-apis,
.rong-params,
.rong-warings {
  margin: 0;
  list-style: none;
  padding: 0;
}
.rong-api {
  border-bottom: 2px solid #f1eeee;
  padding-bottom: 5px;
}
.rong-api-name {
  margin: 0;
  font-weight: bold;
}
.rong-part-name {
  display: inline-block;
  font-weight: bold;
  font-size: 12px;
  margin-top: 5px;
}
.rong-params {
  width: 100%;
}
.rong-param {
  border-right: 1px solid #dbd6d6;
  display: table;
}
.rong-param:nth-child(odd) {
  border-top: 1px solid #dbd6d6;
  border-bottom: 1px solid #dbd6d6;
}
.rong-param:last-child {
  border-bottom: 1px solid #dbd6d6;
}

.rong-param-column {
  display: inline-block;
  min-width: 180px;
  padding: 2px 2px 3px 3px;
  box-sizing: border-box;
  display: table-cell;
}
.rong-param-column:first-child {
  color: #808095;
  text-align: right;
  font-size: 1em;
  font-style: italic;
  font-weight: bold;
  padding-right: 8px;
}
.rong-param-column:last-child {
  width: 100%;
}
.rong-param-column:nth-child(odd) {
  border-right: 1px solid #dbd6d6;
  border-left: 1px solid #dbd6d6;
}

.rong-api-code {
  white-space: pre-wrap;
  border-left: 5px solid #009b3333;
  padding-left: 5px;
  background-color: #f1eeee;
  margin: 0;
  margin-top: 5px;
}
</style>