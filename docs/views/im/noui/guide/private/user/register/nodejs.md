---
ConversationType: PRIVATE
---

!!!include(im/noui/guide/common/user/register/nodejs.md?conversationType=PRIVATE&userId=用户 ID)!!!

!!!include(im/noui/guide/common/user/register/nodejs.md?conversationType=GROUP&userId=群组 ID)!!!

#### getRemoteHistoryMessages

public void getRemoteHistoryMessages(Conversation.ConversationType conversationType, String targetId, long dataTime, int count, RongIMClient.ResultCallback callback)

/**
* 根据会话类型和目标 Id，获取 N 条远端历史消息记录。
* 该方法只支持拉取指定时间之前的远端历史消息
* @param conversationType 会话类型。不支持传入 ConversationType.CHATROOM。
* @param targetId         目标 Id。根据不同的 conversationType，可能是用户 Id、讨论组 Id、群组 Id。
* @param dataTime         从该时间点开始获取消息。即：消息中的 sendTime；第一次可传 0，获取最新 count 条。
* @param count            要获取的消息数量，最多 20 条。
* @param callback         获取历史消息记录的回调，按照时间顺序从新到旧排列。
*/
