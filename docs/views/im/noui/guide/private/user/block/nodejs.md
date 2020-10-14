#### 全量消息路由{#msgsync}

哈哈哈哈哈哈哈

#### 功能描述{#msgsync-intro}

jjjjjjjjjjjjjj

#### 参数说明{#msgsync-params}

|   参数    |          类型         |           说明           |
| :-------- | :------------------| :----------------------- |
| fromUserId | String | 发送用户 Id。|
| toUserId   | String | 目标 Id，即为客户端 targetId，根据会话类型 channelType 的不同，可能为二人会话 Id、群聊 Id、聊天室 Id、客服 Id 等。|
| objectName | String | 消息类型，文本消息 `RC:TxtMsg` 、 图片消息 `RC:ImgMsg` 、语音消息 `RC:VcMsg` 、图文消息 `RC:ImgTextMsg` 、位置消息 `RC:LBSMsg` 、添加联系人消息 `RC:ContactNtf` 、提示条通知消息 `RC:InfoNtf` 、资料通知消息 `RC:ProfileNtf` 、通用命令通知消息 `RC:CmdNtf` ，详细请参见[消息类型说明文档](#objectName)。|
| content    | String | 发送消息内容，参考[融云消息类型说明](#objectName)|
| channelType   | String    | 会话类型，二人会话是 `PERSON` 、讨论组会话是 `PERSONS` 、群组会话是 `GROUP` 、聊天室会话是 `TEMPGROUP` 、客服会话是 `CUSTOMERSERVICE` 、 系统通知是 `NOTIFY` 、应用公众服务是 `MC` 、公众服务是 `MP`。对应客户端 SDK 中 `ConversationType` 类型，二人会话是 1 、讨论组会话是 2 、群组会话是 3 、聊天室会话是 4 、客服会话是 5 、 系统通知是 6 、应用公众服务是 7 、公众服务是 8。|
| msgTimestamp  | String | 服务端收到客户端发送消息时的服务器时间（1970年到现在的毫秒数）。|
| msgUID  | String | 可通过 msgUID 确定消息唯一。|
| sensitiveType | Int | 消息中是否含有敏感词标识，0 为不含有敏感词，1 为含有屏蔽敏感词，2 为含有替换敏感词。消息路由功能默认含有屏蔽敏感词的消息不进行路由，可提交工单开通含有敏感词的消息路由功能，未开通情况下 sensitiveType 值默认为 0 不代表任何意义。开通后可通过该属性判断消息中是否含有敏感词。目前支持单聊、群聊、聊天室会话类型，其他会话类型默认为 0 ，开通后含有屏蔽敏感词的消息也不会进行下发，只会进行消息路由。|
| source  | String  | 标识消息的发送源头，包括：iOS、Android、Websocket、MiniProgram（小程序）、PC、Server（通过 Server API 发送，需要开通 Server API 发送消息进行消息路由功能）。目前支持单聊、群聊会话类型，其他会话类型为空。|
| groupUserIds | String[] | channelType 为 GROUP 时此参数有效，显示为群组中指定接收消息的用户 ID 数组，该条消息为群组定向消息。非定向消息时内容为空，如指定的用户不在群组中内容也为空。|

::: tip
同步消息时需要服务提供应答 200，收到应答后表示消息同步成功，如果应答超时 5 秒，融云会再尝试推送 2 次，如果仍然失败，融云将不再推送此消息，如短时间内有大面积超时，将暂停推送，1 分钟后会继续推送。
:::

#### 代码示例{#msgsync-code}

为了验证数据有效性并确保调用者为融云 Server，每个请求前添加数据签名，详细参见 [API 接收签名规则](./../../../private/setting/include/serverapi.html#receive-signature)，签名信息参数在接收地址的 URL 上提供。

假设开发者注册的接收地址：`http://example.com/receive_message.php`

**请求方法：** POST

**Request：**

```java
POST /receive_message.php?signTimestamp=1408710653491&nonce=14314&signature=45beb7cc7307889a8e711219a47b7cf6a5b000e8 HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
User-Agent: RongCloud/1.0

fromUserId=123&toUserId=456&objectName=RC%3ATxtMsg&content=%7B"content"%3A"hello"%7D&channelType=PERSON&msgTimestamp=1408710653491&msgUID=596E-P5PG-4FS2-7OJK&groupUserIds=[543,567]
```

