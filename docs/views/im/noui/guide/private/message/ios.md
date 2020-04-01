---
languages:
  - {name: 'ios', text: 'iOS', link: './ios'}
  - {name: 'android', text: 'Android', link: './android'}
  - {name: 'multi', groupName: 'web', children: [{name: 'web3', isFire: true, text: 'Web 3.0', link: './web3'}, {name: 'web', text: 'Web 2.0', link: './web'}]}
---
[[toc]]

#### 功能描述

#### 实现方法

#### 注意事项 

:::: tabs
::: tab label="代码示例"&lazy
```js
var textMessageInfo = { content: '😀' }
var msg = new RongIMLib.TextMessage(textMessageInfo);
var conversationType = RongIMLib.ConversationType.{{ConversationType}};
var targetId = {{targetId}};  // 目标 ID

RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
  onSuccess: function (message) {
    // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
    console.log('发送文本消息成功', message);
  },
  onError: function (errorCode) {
    console.log('发送文本消息失败', errorCode);
  }
});
```
:::
::::