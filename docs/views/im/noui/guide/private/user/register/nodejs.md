---
ConversationType: PRIVATE
---

!!!include(im/noui/guide/common/user/register/nodejs.md?conversationType=PRIVATE&userId=用户 ID)!!!

!!!include(im/noui/guide/common/user/register/nodejs.md?conversationType=GROUP&userId=群组 ID)!!!

#### getRemoteHistoryMessages


```objectivec
RCMessage *message  = [[RCIMClient sharedRCIMClient] insertOutgoingMessage:{{conversationType}}
                                                                  targetId:@"{{userId}}"
                                                                sentStatus:SentStatus_SENT
                                                                   content:content
                                                                  sentTime:sentTime];
```
