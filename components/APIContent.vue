<template>
  <modal
    name="size-modal"
    transition="nice-modal-fade"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="90%"
    height="90%"
    @before-open="beforeOpen"
    @opened="opened"
    @closed="closed"
    @before-close="beforeClose"
  >
    <div class="rong-modal">
      <div class="rong-sidebars">
        <ul class="rong-navs">
          <li class="rong-nav">
            <a href="#connect">connect</a>
          </li>
          <li class="rong-nav">
            <a href="#disconnect">disconnect</a>
          </li>
          <li class="rong-nav">
            <a href="#disconnect">disconnect</a>
          </li>
          <li class="rong-nav">
            <a href="#disconnect">disconnect</a>
          </li>
        </ul>
      </div>
      <div class="rong-main">
        <ul class="rong-apis">
          <li id="connect" class="rong-api">
            <p class="rong-api-name">连接服务器</p>
            <pre class="rong-api-code">- (RCMessage *)sendMessage:(RCConversationType)conversationType targetId:(NSString *)targetId content:(RCMessageContent *)content pushContent:(NSString *)pushContent success:(void (^)(long messageId))successBlock error:(void (^)(RCErrorCode nErrorCode, long messageId))errorBlock</pre>

            <span class="rong-part-name">Parameters</span>
            <ul class="rong-params">
              <li class="rong-param">
                <span class="rong-param-column">conversationType</span>
                <span class="rong-param-column">发送消息的会话类型</span>
              </li>
              <li class="rong-param">
                <span class="rong-param-column">targetId</span>
                <span class="rong-param-column">消息的内容</span>
              </li>
              <li class="rong-param">
                <span class="rong-param-column">pushContent</span>
                <span class="rong-param-column">接收方离线时需要显示的远程推送内容</span>
              </li>
            </ul>

            <span class="rong-part-name">Warning</span>
            <ul class="rong-warings">
              <li class="rong-warning">已废弃，请勿使用</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  name: "SizeModalTest",
  data() {
    return {
      paragraphs: [true],
      timer: null
    };
  },
  methods: {
    beforeOpen: function() {},
    beforeClose: function() {},
    opened(e) {},
    closed(e) {}
  }
};
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
}
.rong-nav a {
  color: var(--text-color);
}
.rong-nav:hover {
  background-color: #0000000d;
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
}
.rong-param:last-child,
.rong-param:nth-child(odd) {
  border-top: 1px solid #dbd6d6;
  border-bottom: 1px solid #dbd6d6;
}

.rong-param-column {
  display: inline-block;
  min-width: 180px;
  padding: 3px;
  box-sizing: border-box;
}
.rong-param-column:first-child {
  color: #808095;
  text-align: right;
  font-size: 1em;
  font-style: italic;
  font-weight: bold;
  padding-right: 8px;
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