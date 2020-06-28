<template>
  <div>
    <div>
      <h3>可能遇见的常见问题</h3>
      <p>为您整理出可能遇到的常见问题并解答, 您可根据解答快速解决问题</p>
    </div>
    <!-- 常见问题列表 -->
    <div>
      <div v-for="(item, i) in FaqItemList" :key="i">
        <!-- 左侧标题与图片 -->
        <div>
          <img :src="item.img" alt="">
          <p>{{item.title}}</p>
        </div>
        <!-- 问题列表 -->
        <div>
          <ul>
            <li v-for="(faq, j) in item.faqs" :key="j">
              <a :href="faq.url">{{faq.title}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const FaqItemList = [
  {
    title: '即时通讯',
    img: '',
    faqs: [
      { title: '什么是 AppKey ?', url: '' },
      { title: '什么是 AppKey ?', url: '' },
      { title: '什么是 AppKey ?', url: '' },
      { title: '什么是 AppKey ?', url: '' }
    ]
  },
  {
    title: '实时音视频',
    img: '',
    faqs: [
      { title: '什么是 AppKey ?', url: '' },
      { title: '什么是 AppKey ?', url: '' },
      { title: '什么是 AppKey ?', url: '' },
      { title: '什么是 AppKey ?', url: '' }
    ]
  }
]

export default {
  computed: {
    FaqItemList: () => FaqItemList
  }
}
</script>>

<style lang="stylus" scoped>
</style>
