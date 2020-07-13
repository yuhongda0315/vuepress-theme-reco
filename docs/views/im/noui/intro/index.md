::: demo
<el-steps :active="active" finish-status="success" align-center>
<el-step title="初始化"></el-step>
<el-step title="加入房间"></el-step>
<el-step title="发布资源"></el-step>
<el-step title="离开房间"></el-step>
<el-step title="完成"></el-step>
</el-steps>
<div v-if='active==index' v-for="(data,index) in dataList">
<div v-if='data.ispublish' id='videoList'></div>
<div class='rong-fun-comment'>{{data.title}}<a href='https://docs.rongcloud.cn/v3/views/rtc/meeting/guide/quick/web.html'>点击查看更多信息</a></div>
<el-input v-if='data.ispublish' v-model="link"></el-input>
<div class='rong-code-tilte'>代码示例：</div>
<el-tabs v-model="activeName" type="card">
<el-tab-pane :label="code.language" :name="code.language" v-for='code in data.code'>
<pre v-html="code.content"></pre>
</el-tab-pane>
</el-tabs>
<el-button style="margin-top: 12px;" @click="handleClick(data.clickFun)">{{data.button}}</el-button>
</div>
<div v-if='active==4'>
<el-row>
<el-col>
<el-card :span="4">
<div class='rong-demo-title'>Demo 下载</div>
<img src="https://web-cdn.agora.io/dashboardv2/img/pic-SDK.f78a7138.png" class="image">
<p>可下载对应语言 Demo，快速开始</p>
<el-button class="button">下载</el-button>
</el-card>
<el-card :span="4">
<div class='rong-demo-title'>快速开始</div>
<img src="https://web-cdn.agora.io/dashboardv2/img/pic-start.e65277b6.png" class="image">
<p>分步教程轻松上手集成</p>
<el-button class="button">集成文档</el-button>
</el-card>
</el-col>
</el-row>
</div>

<script>
	import RongIMLib from './lib/RongIMLib-3.0.4-dev.es.js'
  import RongRTC from './lib/RongRTC-3.2.3.js'
  import dataList from './lib/data.js'
  window.dataList = dataList
	var im;
	var rongRTC;
	var room;
  export default {
    data() {
      return {
        active: 0,
        link:'http://localhost:8081/test/rtc/index.html?1581942572627',
        dataList:window.dataList,
        activeName: 'web'
      };
		},
    methods: {
      handleClick(fun){
        this[fun]();
      },
      next() {
        ++this.active;
			},
			init(){
				this.IMInit();
				this.RTCInit();
				this.next();
			},
			IMInit() {
				var config = {
					appkey: 'e5t4ouvptkm2a',
				};
				im = RongIMLib.init(config);
				im.watch({
					conversation: function(event){},
					message: function(event){
						var message = event.message;
						console.log('收到新消息:', message);
					},
					status: function(event){
						var status = event.status;
						console.log('连接状态码:', status);
					}
				});
				var user = {
					token: 'r4PJzl1H+apcy5Z0yqgpylp3k2hRcCHcRt/LxpGPGDN+rtvvPifnY4DeenH7Q6UMCqFXN1Dgk0EgOuVF9PkztjkcshgZ3OVN9m70UBApW+E='
				};
				im.connect(user).then(function(user) {
					console.log('链接成功, 链接用户 id 为: ', user.id);
				}).catch(function(error) {
					console.log('链接失败: ', error.code, error.msg);
				});
			},
			RTCInit() {
				rongRTC = new RongRTC({ RongIMLib: RongIMLib });
			},
			roomJoin(){
				room = new rongRTC.Room({
					id: 'test',
					joined: function(user){},
					left: function(user){}
				});
				let user = {
					id: '1581926435054'
				};
				room.join(user).then(() => {
					console.log('join successfully');
					this.next();
				}, error => {
					console.log(error);
				});
			},
			publishStream(){
				let content = this;
				let stream = new rongRTC.Stream({
					published: function(user){
						stream.subscribe(user).then((user) => {
							let {id, stream: {tag, mediaStream}} = user;
							// 订阅成功后会获取到对方媒体流，将媒体流添加到页面上的 video 节点即可展示对方音视频画面
							let node = document.createElement('video');
							node.autoplay = true;
							node.srcObject = mediaStream;
							node.id = id;
							document.getElementById('videoList').appendChild(node);
						});
					},
					unpublished: function(user){
						stream.unsubscribe(user).then(function() {
						});
					}
				});
				stream.get().then(function ({ mediaStream }) {
					let user = {
						id: '1581926435054',
						stream: {    
							tag: 'RongRTC',
							type: rongRTC.StreamType.AUDIO_AND_VIDEO,
							mediaStream: mediaStream
						}
					}
					stream.publish(user).then(() => {
						console.log('发布成功',user);
              let {id, stream: {tag, mediaStream}} = user;
              content.next();
							let node = document.createElement('video');
							node.autoplay = true;
							node.srcObject = mediaStream;
              node.id = id;
              setTimeout(()=>{
                document.getElementById('videoList').appendChild(node);
              })
					}, error => {
						console.log(error);
					});
				}, error => {
					console.error(error);
				});
      },
      leaveRoom() {
				let content = this;
        room.leave().then(() => {
          console.log('leave successfully');
          content.next();
        }, error => {
          console.log(error);
        });
      }
    }
  }
</script>
<style>
.code-control{
   display:none !important;
}
.language-vue{
    display:none !important;
}
video{
	width:300px;
	padding:10px;
}
.demo-and-code-wrapper{
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 4px;
}
pre{
	height: 200px;
  padding: 0 20px !important;
  margin: 0 !important;
}
.rong-code-tilte{
  font-weight: 700;
  color: #303133;
  font-size: 16px;
  line-height: 50px;
}
.rong-demo-title{
  font-size: 18px;
  font-weight: 500;
  padding: 0 20px;
}
img{
  width: 100px;
}
.rong-fun-comment{
  margin-top: 20px;
}
.el-card{
  width: 40% !important;
  display: inline-block !important;
  margin: 4%;
}
.el-card__body{
  text-align: center;
}
</style>
:::