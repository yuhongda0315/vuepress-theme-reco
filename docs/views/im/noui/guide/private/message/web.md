---
categorys:
  - name: '客户端'
    languages:
      - {name: 'ios', text: 'iOS', link: './ios'}
      - {name: 'android', text: 'Android', link: './android'}
      - {name: 'multi', groupName: 'web', children: [{name: 'web3', text: 'Web 3.0', link: './web3'}, {name: 'web', text: 'Web 2.0', link: './web'}]}
    #   - {name: 'mini', text: '小程序 3.x', link: './web3?plat=mini'}
    #   - {name: 'multi', groupName: 'Android', children: [{name: 'Android2', text: 'Android', link: './web3'}, {name: 'Android3', text: 'Android 3.0', link: './web'}]}
  - name: '服务端'
    languages:
      - {name: 'java', text: 'Java', link: './java'}
      - {name: 'php', text: 'PHP', link: './php'}
      - {name: 'nodejs', text: 'Node.js', link: './nodejs'}
      - {name: 'serverapi', text: 'Server API', link: './serverapi'}
---

[[toc]]

!!!include(im/noui/intro/index.md)!!!

:::: el-tabs
::: el-tab-pane label=创建应用
<el-tag type="danger">标签五</el-tag>

<el-button type="danger" @click='function (){console.info(11)}'>标签五</el-button>

:::
::: el-tab-pane label=加入房间
``` javascript
() => {
  console.log('Javascript code example')
}
```
:::
::::

#### RTC-Media-Gateway

各种协商网关

* 微信小程序

##### 业务流程

<canvas  width="800" sequenced>
  Wechat-Client -> Media-Gateway: /wechat/exchange
  Media-Gateway -> RTMP-Server: genereate rtmpUri
  RTMP-Server -> Media-Gateway: rtmpUri
  Media-Gateway -> Stream-Server: /rtmp/exchange
  Stream-Server -> Media-Server: /exchange
  Media-Server -> Stream-Server: get publish uris, sub uris
  Stream-Server <-> RTMP-Server: rtmp2rtc
  Stream-Server <-> RTMP-Server: rtc2rtmp
  Stream-Server -> Media-Gateway: exchange response
  Media-Gateway -> Wechat-Client: exchange repsonse
</canvas>

##### API

###### 通用

#### 服务状态接口

主要用于监控服务状态。

* Method: `HTTP GET`

* URL: `/monitor/state`

* Content-Type: `json`

* Request Header

无

* Request Body

* 示例

```json
{
    "resultCode": 10000
}
```

#### 微信小程序

##### 客户端资源协商

订阅、发布、变更资源，均可以使用此接口。

* Method: `HTTP POST`

* URL: `/wechat/exchange`

* Content-Type: `json`

* Request Header

| 字段 | 类型 | 值 | 备注 |
|  ---  |  ---  |  ---  |  ---  |
| Client-Version |  string | sdk版本号 | 接口版本号，要求填写真实sdk版本号，越详细越好 |
| Client-Type | string | WeChat-MiniProgram | xiaomi、华为、iphone8、windows2010 | 操作系统版本 |       |
| Token | string | VoIP Token | 用于鉴权，其中也携带了 App 或房间的相关配置 |
| Room-Id | string | 房间 ID |       |
| App-Key | string | 开发者的Key |       |

* Request Body

| 字段 | 类型 | 值 | 备注 |
|  ---  |  ---  |  ---  |  ---  |
| rtmp | dict | 客户端要发送本地流的 rtmp 信息 |  |
| rtmp.audio | bool | true/false | 是否发送音频 |
| rtmp.video | bool | true/false | 是否发送视频 |
| rtmp.resolution | string | 0X0 | 视频分辨率 |
| subscribeList | list | 订阅列表，与普通 RTC 格式完全一致 |  |
| subscribeList.{id}.uri | string | 资源 URI |  |
| subscribeList.{id}.simulcast | int | 资源订阅大流或小流(1: 大流，2: 小流，为空
默认小流) |  |
| rtmpSubscribeList | list | 订阅 rtmp 列表，用于计费 |  |
| rtmpSubscribeList.{id}.userId | string | 要拉取的 rtmp 用户的 userId，用于计费 |  |
| rtmpSubscribeList.{id}.rtmpUri | string | 要拉取的用户的 rtmp URI，用于计费 |  |

示例:

```json
{
    "rtmp": {
        "audio": true,
        "video": true,
        "resolution": "0X0"
    },
    "subscribeList":[
        {"uri":"xxx1"},
        {"uri":"xxx2", "simulcast":1},
    ],
    "rtmpSubscribeList":[
        {"userId":"userId", "rtmpUri" : "rtmp://XXXXX"}
    ],
}
```

* Response

| 字段 | 类型 | 值 | 备注 |
|  ---  |  ---  |  ---  |  ---  |
| resultCode | int | 错误码 | 10000 为成功 |
| message | string | 错误原因 | 若请求成功，则为空 |
| sdp | json | sdp信息 |  |
| publishList | array | 发布的 rtmp 对应的 webrtc URL，用于扩散 |  |
| rtmpPublishList | array | 用于推送的 rtmp 地址，可以用于扩散 |  |
| rtmpPublishList.{id}.rtmpUri | string | 用于推送的 rtmp 地址，可以用于扩散 |  |
| clusterId | string | 数据中心域名 | 防止数据中心漂移,后续请求采用该地址;如果前面带http:// 标示服务器不支持https |

正常示例:

```json
{
    "resultCode": 10000,
    "publishList":[ //发布的资源
        {"msid":"xxx","mediaType":0,"uri":"xxx"},
        {"msid":"xxx","mediaType":1,"uri":"xxx"},
    ],
    "rtmpPublishList": [
        {"rtmpUri" : "rtmp://XXXXX"}
    ]
}
```

异常示例:

```json
{
    "resultCode": 41002,
    "message": "http server hasn't the processor"
}
```

##### 客户端退出

* Method: `HTTP POST`

* URL: `/wechat/exit`

* Content-Type: `json`

* Request Header

| 字段 | 类型 | 值 | 备注 |
|  ---  |  ---  |  ---  |  ---  |
| Client-Version |  string | sdk版本号 | 接口版本号，要求填写真实sdk版本号，越详细越好 |
| Client-Type | string | WeChat-MiniProgram | xiaomi、华为、iphone8、windows2010 | 操作系统版本 |       |
| Token | string | VoIP Token | 用于鉴权，其中也携带了 App 或房间的相关配置 |
| Room-Id | string | 房间 ID |       |
| App-Key | string | 开发者的Key |       |

* Request Body

无

* Response

| 字段 | 类型 | 值 | 备注 |
|  ---  |  ---  |  ---  |  ---  |
| resultCode | int | 错误码 | 10000 为成功 |
| message | string | 错误原因 | 若请求成功，则为空 |

* 正常示例

```json
{
    "resultCode": 10000
}
```

* 异常示例

```json
{
    "resultCode": 41002,
    "message": "http server hasn't the processor"
}
```

### RTMP Gateway 接口

#### 发布或更新 rtmp

* Method: `HTTP POST`

* URL: `/rtmp/exchange`

* Content-Type: `json`

* Request Header

| 字段 | 类型 | 值 | 备注 |
|  ---  |  ---  |  ---  |  ---  |
| clientVersion |  string | sdk版本号 | 接口版本号，要求填写真实sdk版本号，越详细越好 |
| clientType | string | WeChat-MiniProgram | xiaomi、华为、iphone8、windows2010 | 操作系统版本 |       |
| Token | string | VoIP Token | 用于鉴权，其中也携带了 App 或房间的相关配置 |
| RoomId | string | 房间 ID |       |
| RoomType | int | 房间类型(普通音视频/直播) |       |
| App-Key | string | 开发者的Key |       |

> Header 部分可以直接 copy 作为与 MediaServer `exchange` 使用。

* Request Body

| 字段 | 类型 | 值 | 备注 |
|  ---  |  ---  |  ---  |  ---  |
| rtmp | dict | 客户端要发送本地流的 rtmp 信息 |  |
| rtmp.audio | bool | true/false | 是否发送音频 |
| rtmp.video | bool | true/false | 是否发送视频 |
| rtmp.resolution | string | 0X0 | 视频分辨率 |
| rtmp.uri | string | 拉流的 rtmp uri |  |
| rtmp.timestamp | long | 发布资源的时间戳 | 如果时间戳变更，则表明 uri 或资源类型变更，需要重新拉取和发布。小于当前的时间戳可以忽略 |
| rtmp.rtmpSubscribeList.{id}.userId | string | rtc2rtmp 的用户 Id |  |
| rtmp.rtmpSubscribeList.{id}.rtmpUri | long | rtc2rtmp 的用户推送到的 uri | |

| rtc.subscribeList | list | 订阅列表，与普通 RTC 格式完全一致 |  |
| rtc.subscribeList.{id}.uri | string | 资源 URI |  |
| rtc.subscribeList.{id}.simulcast | int | 资源订阅大流或小流(1: 大流，2: 小流，为空
默认小流) |  |
| rtc.extend | string | 传递给后端服务的扩展字段，比如录像 |  |

> rtc 部分可以直接 copy 作为与 MediaServer `exchange`  body 使用，但是 sdp 字段徐需要转码服务生成。

* 示例

```json
{
    "rtmp": {
        "audio": true,
        "video": true,
        "resolution": "0X0",
        "uri": "rtmp://XXXXX",
        "timestamp": 1586273915475,
        "rtmpSubscribeList": [
            {"userId": "userId", "rtmpUri" : "rtmp://XXXXX"},
            {"userId": "userId", "rtmpUri" : "rtmp://XXXXX"},
        ]
    },
    "rtc": {
        "subscribeList":[
            {"uri":"xxx1"},
            {"uri":"xxx2", "simulcast":1},
        ],
        //扩展配置，mediaserver不解析，透传给后端服务
        "extend":"{\"resolutionInfo\":\"0X0\"}"
    }
}
```

* Response

| 字段 | 类型 | 值 | 备注 |
|  ---  |  ---  |  ---  |  ---  |
| resultCode | int | 错误码 | 10000 为成功 |
| sdp | string | 协商返回的 sdp 信息 |  |
| publishList | dict | 发布资源 uri 列表 |  |
| clusterId | string | MediaServer 数据中心 URL |  |

> 与 MediaServer 交互 `exchange` response 直接透传即可。

* 正常示例

```json
{
    "resultCode": 10000,
    "sdp": {
        "type": "answer",
        "sdp": "xxxx"
    },
    "publishList":[ //发布的资源
        {"msid":"xxx","mediaType":0,"uri":"xxx"},
        {"msid":"xxx","mediaType":1,"uri":"xxx"}
    ],
    "clusterId":"http://awsnx-rtc40-data-rtc40-109.rongcloud.net"
}
```

* 异常示例

```json
{
    "resultCode": 41002,
    "message": "http server hasn't the processor"
}
```

#### rtmp 退出

* Method: `HTTP POST`

* URL: `/rtmp/exit`

* Content-Type: `json`

* Request Header

| clientVersion |  string | sdk版本号 | 接口版本号，要求填写真实sdk版本号，越详细越好 |
| clientType | string | WeChat-MiniProgram | xiaomi、华为、iphone8、windows2010 | 操作系统版本 |       |
| Token | string | VoIP Token | 用于鉴权，其中也携带了 App 或房间的相关配置 |
| RoomId | string | 房间 ID |       |
| RoomType | int | 房间类型(普通音视频/直播) |       |
| App-Key | string | 开发者的Key |       |

> Header 部分可以直接 copy 作为与 MediaServer `exit` 使用。

* Request Body

无

* Response

| 字段 | 类型 | 值 | 备注 |
|  ---  |  ---  |  ---  |  ---  |
| resultCode | int | 错误码 | 10000 为成功 |
| message | string | 错误原因 | 若请求成功，则为空 |

> 与 MediaServer 交互 `exit` response 直接透传即可。

* 正常示例

```json
{
    "resultCode": 10000
}
```

* 异常示例

```json
{
    "resultCode": 41002,
    "message": "http server hasn't the processor"
}
```
