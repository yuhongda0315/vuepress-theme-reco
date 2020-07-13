module.exports = [{
  title: '初始化 SDK，在整个程序全局只需要调用一次。',
  button: '初始化',
  clickFun: 'init',
  ispublish: false,
  code: [{
    language: 'web',
    content: `<code>
    // IM 实例化
    var im = RongIMLib.init({ appkey: '' });
    im.watch({
      conversation: function(event){},
      message: function(event){},
      status: function(event){}
    });
    // IM 连接
    var user = { token: '' };
    im.connect(user).then(function(user) {});
    // RTC 实例化
    let rongRTC = new RongRTC({ RongIMLib: RongIMLib });
    let { Room, Stream, Message, Device, Storage} = rongRTC;
    </code>`
  }, {
    language: 'iOS',
    content: `<code>
    // 连接IM服务
    [[RCIMClient sharedRCIMClient] connectWithToken:@"开发者的 server 通过请求 server api 获取到的 token 值"
      dbOpened:^(RCDBErrorCode code) {}
      success:^(NSString *userId) {}
      error:^(RCConnectErrorCode status) {}
      tokenIncorrect:^{}];
    </code>`
  }]
}, {
  title: '加入 RTC 房间',
  button: '加入房间',
  clickFun: 'roomJoin',
  ispublish: false,
  code: [{
    language: 'web',
    content: `<code>
    var room = new rongRTC.Room({
      id: 'test',
      joined: function(user){},
      left: function(user){}
    });
    let user = { id: '' };
    room.join(user).then(() => {});
    </code>`
  }]
}, {
  title: 'SDK 支持发布多路媒体流，发布后 SDK 会向服务器推送多路流，其他平台收到多路流，可按需展示。',
  button: '发布资源',
  clickFun: 'publishStream',
  ispublish: false,
  code: [{
    language: 'web',
    content: `<code>
    let stream = new rongRTC.Stream({
      published: function(user){},
      unpublished: function(user){}
    });
    stream.get().then(function ({ mediaStream }) {
      let user = {
        id: '',
        stream: {    
          tag: 'RongRTC',
          type: rongRTC.StreamType.AUDIO_AND_VIDEO,
          mediaStream: mediaStream
        }
      }
      stream.publish(user).then(() => {
        console.log('发布成功',user);
      });
    });
    </code>`
  }]
}, {
  title: '邀请其他人员加入：',
  button: '离开房间',
  clickFun: 'leaveRoom',
  ispublish: true,
  code: [{
    language: 'web',
    content: `<code>
    room.leave().then(() => {
      console.log('leave successfully');
    }, error => {
      console.log(error);
    });
    </code>`
  }]
}]