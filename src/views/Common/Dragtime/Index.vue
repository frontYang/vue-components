<template>
  <div class="page">
    <h2>展示一周的时间点</h2>
    <ui-dragtime v-model="timeRange" :data="weekData" @on-clear="clearTime" />
    <p>提交数据：</p>
    <pre style="border: 1px solid #ddd; max-height: 200px; overflow: auto;">{{
      JSON.stringify(result)
    }}</pre>
  </div>
</template>

<script>
import UiDragtime from '@/components/UiDragtime/Index'
import week from '@/utils/weektime_data'
const weekData = week()

export default {
  components: {
    'ui-dragtime': UiDragtime
  },
  data() {
    return {
      drawer: false,
      weekData: weekData,
      timeVal: {
        '0': [8, 9, 10],
        '1': [],
        '2': [10, 11, 12],
        '3': [],
        '4': [],
        '5': [],
        '6': []
      }
    }
  },
  computed: {
    timeRange() {
      const val = this.timeVal
      return weekData.map((item, index) => {
        val[index] &&
          val[index].forEach((valItem) => {
            item.child.forEach((childItem) => {
              if (childItem.col === valItem) {
                childItem.check = true
              }
            })
          })

        return {
          id: item.row,
          week: item.value,
          value: this.$utils.splicing(item.child)
        }
      })
    },
    result() {
      return this.getTimeHighSetting()
    }
  },
  mounted() {},
  methods: {
    // 获取时间段
    getTimeHighSetting() {
      const allTimeData = this.$utils.getResult(this.timeRange, weekData, this)
      const allTimeObj = {}

      allTimeData.forEach((item, index) => {
        allTimeObj[index] = item
      })

      /*
        如需获取字符串，可用这种提交
        const allTimeStr1 = JSON.stringify(allTimeObj).replace(/\"/g, '').replace(/\],/g, '];')
        allTimeStr1.match(/\{(.+)\}/g)
        return RegExp.$1
      */
      return allTimeObj
    },

    clearTime() {
      this.weekData.forEach((item) => {
        item.child.forEach((t) => {
          this.$set(t, 'check', false)
        })
      })
      this.timeVal = {
        '0': [],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': []
      }
    }
  }
}
</script>

