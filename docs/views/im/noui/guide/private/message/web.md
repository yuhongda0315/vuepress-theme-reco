---
categorys:
  - name: '客户端'
    languages:
      - {name: 'ios', text: 'iOS', link: './ios'}
      - {name: 'android', text: 'Android', link: './android'}
      - {name: 'multi', groupName: 'web', children: [{name: 'web3', text: 'Web 3.0', link: './web3'}, {name: 'web', text: 'Web 2.0', link: './web'}]}
  - name: '服务端'
    languages:
      - {name: 'java', text: 'Java', link: './java'}
      - {name: 'php', text: 'PHP', link: './php'}
      - {name: 'nodejs', text: 'Node.js', link: './nodejs'}
      - {name: 'serverapi', text: 'Server API', link: './serverapi'}
---

[[toc]]

##### Emoji 消息{#emoji}

:::: tabs
::: tab label="代码示例"
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
::: tab label="代码示例"

**插件兼容性**
| Chrome | Firefox | Safari | IE   | Edge | iPhone                              | Android |
| :------| :------ | :----- | :--- | :--- | :--------------------------------- | :------ |
|  30+   |    30+  |  10+   | 7+   |  ✔️   | iOS 8.0+ 的Safari浏览器以及微信浏览器   | 4.4+系统的Chrome浏览器以及微信浏览器 |

::::





