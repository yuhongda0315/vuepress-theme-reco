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

#### 架构介绍{#Intro}

| SDK 常用框架和模型    | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| RongRTCEngine         | 音视频引擎，SDK 初始化管理类                                 |
| RongRTCRoom           | 音视频房间对象，负责管理房间内所有人员，包含当前登录用户 localUser 和远端用户 remoteUsers |
| RongRTCLocalUser      | 当前登录用户，负责发布和取消发布本端资源                     |
| RongRTCRemoteUser     | 远端房间内用户                                               |
| RongRTCCapturer     | 音视频采集类，负责音视频的采集，音视频参数设置，音视频数据回调监听和管理，音视频数据发送等 |
| RongRTCAVInputStream  | 要订阅的音视频流对象，App 通过 remoteUser 的订阅方法，传入该对象即可完成音视频的订阅功能，目前支持音频和视频功能 |
| RongRTCAVOutputStream | 自定义音视频类，用户可以通过该自定义对象构建一个音视频流，通过该对象即可完成自定义音视频发布 |

##### 使用RongRTCLib 构建直播业务流程{#Flow}

<img :src="$withBase('/images/rtc/live/intro/liveFlow.png')" class="rong-content-image" height="800">

#### 音视频通话基础架构{#RtcFlow}

直播间内业务场景与实时音视频一致，相关业务流程与架构见下面的介绍
 
##### RongRTCLib 建立音视频通信流程{#Flow}

<img :src="$withBase('/images/rtc/meet/intro/rtc_flow_release.png')" class="rong-content-image" height="500">

###### tip 流程图解{#FlowTip}

* 1. 加入房间，获取房间内远端用户列表和当前用户列表;
* 2. 发布音视频资源（SDK 提供发布默认音视频流 API 方便快速集成使用）;
* 3. 订阅远端用户音视频资源;
* 4. 监听房间内事件，获取事件回调内容;
* 5. 监听房间内事件和音视频帧相关事件，获取事件回调内容;
   
##### 房间架构图{#Structure}

<img :src="$withBase('/images/rtc/meet/intro/rtc_room_architectuew.png')" class="rong-content-image" height="300">

###### tip 房间架构图解{#StructureTip}

* RongRTCRoom 包含本端和远端所有加入房间的用户列表
* APP 可以直接获取当前用户摄像设备或麦克采集的数据进行资源发布，也可以对房间内远端用户发布的音视频资源进行订阅

##### 音视频信令图{#Signaling}

RTC SDK V3.0 版本房间信令示意图

<img :src="$withBase('/images/rtc/meet/intro/rtc-v3.svg')" class="rong-content-image" height="500">

###### tip 房间架构图解{#SignalingTip}

* A 可见 B、C、D 的音频、视频
* B 可按需选择只听 A、D 的音频，只看 A、C 的视频
* C 可按需选择只听 A、B、D 的音频，但不看其他人视频
* D 可按需选择只看 A、B、C 的视频，但不听其他人的音频



