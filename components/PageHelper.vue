<template>
  <div class="rc-page-helper">
    <button v-if="selectedPage > 1" @click="select(selectedPage - 1)" class="rc-page-helper-btn rc-page-helper-pre"></button
      ><button
        v-for="index in pageList"
        @click="select(index)"
        class="rc-page-helper-btn"
        v-bind:key="index"
        :class="isSelected(index) ? 'rc-page-helper-selected' : ''">
      {{index}}
    </button
    ><button v-if="selectedPage < validPageSize" @click="select(selectedPage + 1)" class="rc-page-helper-btn rc-page-helper-next"></button>

    <div class="rc-page-hepler-input-box">
      <span>跳至</span>
      <input v-model="inputVal" type="number">
      <span>页</span>
    </div>
    <button @click="select(inputVal)" class="rc-page-helper-btn rc-page-helper-btn-confirm">确定</button>
  </div>
</template>

<script>
const MaxPageCount = 10 // 最多显示 10 个
const EventName = {
  Select: 'select'
}

const getIndexList = function (min, max) {
  const list = []
  for (let i = min; i <= max; i++) {
    list.push(i)
  }
  return list
}

export default {
  props: ['selectedPage', 'pageSize'],
  data: function () {
    return {
      inputVal: this.selectedPage || 1
    }
  },
  computed: {
    pageList: function () {
      const pageSize = this.validPageSize || 1
      const selectedPage = Number(this.selectedPage || 1)
      let list = []
      if (pageSize < MaxPageCount) {
        list = getIndexList(1, pageSize)
      } else if ((selectedPage + MaxPageCount) > pageSize) {
        list = getIndexList(pageSize - MaxPageCount, pageSize)
      } else {
        list = getIndexList(selectedPage, selectedPage + MaxPageCount)
      }
      return list
    },
    validPageSize: function () {
      const { pageSize = 0 } = this
      const isInteger = pageSize % 1 === 0
      const intergerPageSize = parseInt(pageSize)
      return isInteger ? intergerPageSize : intergerPageSize + 1
    }
  },
  watch: {
    selectedPage: function (newPage) {
      this.inputVal = newPage
    }
  },
  methods: {
    isSelected: function (index) {
      return index === this.selectedPage
    },
    select: function (pageIndex) {
      if (pageIndex < 1 || pageIndex > this.validPageSize) {
        // return dialog.Confirm({
        //   content: '请选择正确的页数'
        // });
      }
      this.$emit(EventName.Select, Number(pageIndex))
    }
  }
}
</script>

<style lang="stylus">
.rc-page-helper {
  text-align: right;
  margin-top: 50px;
}
.rc-page-hepler-input-box {
  display: inline-block;
  color: #666666;
  font-size: 12px;
  margin-left: 40px;
}
.rc-page-hepler-input-box input {
  display: inline-block;
  width: 48px;
  height: 28px;
  border-radius: 4px;
  border:1px solid rgba(217,217,217,1);
  background-color: white;
  text-align: center;
  padding-left: 8px;
}
.rc-page-hepler-input-box span {
  margin: 0 8px;
}
.rc-page-helper .rc-page-helper-btn {
  min-width: 28px;
  height: 28px;
  background: rgba(255,255,255,1);
  border-radius: 4px;
  border: 1px solid rgba(217,217,217,1);
  font-size: 12px;
  color: #666666;
  line-height: 28px;
  margin: 0 4px;
  cursor: pointer;
  padding: 0 8px;
}

.rc-page-helper .rc-page-helper-selected {
  background-color: #108EE9;
  color: white;
  border: 1px solid #108EE9;
  cursor: default;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
.rc-page-helper .rc-page-helper-btn-confirm {
  min-width: 28px;
  width: auto;
  padding: 0 14px;
}

.rc-page-helper-pre::before, .rc-page-helper-next::before {
  content: '';
  width: 12px;
  height: 12px;
  display: inline-block;
  background-image: url(../images/icons.svg);
}

.rc-page-helper-pre::before {
  background-position: -11px -41px;
}

.rc-page-helper-next::before {
  background-position: 1px -41px;
}
</style>