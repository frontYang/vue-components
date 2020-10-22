<template>
  <div class="ui-calendar-custom">
    <el-checkbox
      v-model="checkAll[curTime]"
      :indeterminate="isIndeterminate"
      @change="checkAllChange"
    >
      全选
    </el-checkbox>

    <el-checkbox-group v-model="weekValue[curTime]" @change="clickWeek">
      <el-checkbox
        v-for="(item, index) in weekLabel"
        :key="item"
        :label="index"
      >
        {{ item }}
      </el-checkbox>
    </el-checkbox-group>
    <el-calendar ref="elCalendar" v-model="dateValue" :first-day-of-week="0">
      <template v-slot:dateCell="{ date, data }">
        <div
          :class="currentCls(data)"
          @click="selectDay(data)"
          v-html="dateLabel(data)"
        />
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'UiCalendarCustom',
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      stateLabel: ['休息', '上班'],
      selectDayArr: [], // 已选
      checkAll: {},
      weekLabel: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      dateValue: '',
      weekData: [], // 存储全选
      weekValue: {},
      selectDayArr1: [], // 备用存储
      curMonthData: [] // 当前月日期数据
    }
  },
  computed: {
    isIndeterminate() {
      return (
        this.weekValue[this.curTime] &&
        this.weekValue[this.curTime].length > 0 &&
        !this.checkAll
      )
    },

    // 选中样式
    currentCls() {
      return (item) => {
        return this.selectDayArr.includes(`${item.day}`)
          ? 'date-cell is-selected'
          : 'date-cell'
      }
    },

    // 日历文案自定义显示
    dateLabel() {
      return (item) => {
        const value = item.day.split('-').slice(2)
        const checked = this.selectDayArr.includes(`${item.day}`)
          ? `<span>${this.stateLabel[0]}</span>`
          : `<span>${this.stateLabel[1]}</span>`
        return `<span>${value}</span>` + checked
      }
    },

    // 当前年月，用来记录周期位置
    curTime() {
      const now = this.$utils.formatTime(
        this.dateValue !== '' ? this.dateValue : new Date()
      )
      return `${now.year}-${now.month}`
    }
  },
  watch: {
    curTime: {
      handler() {
        if (!this.weekValue[this.curTime]) {
          this.$set(this.weekValue, this.curTime, [])
        }
        if (this.checkAll[this.curTime] === 'undefined') {
          this.$set(this.checkAll, this.curTime, false)
        }
      }
    },
    selectDayArr: {
      handler() {
        this.$emit('input', this.selectDayArr)
      }
    },
    weekValue: {
      handler() {
        this.weekData = []
        const formatValue = this.$utils.formatTime(
          this.dateValue !== '' ? this.dateValue : new Date()
        )
        const daysInMonth = this.$utils.getDaysInMonth({
          year: formatValue.year,
          month: formatValue.month
        })
        this.weekValue[this.curTime].forEach((item, index) => {
          const daysInMonthData = daysInMonth
            .filter((v) => v.day === item)
            .map((m) => m.format)
          daysInMonthData.forEach((item) => {
            this.updateWeekDate({
              isSelected: false,
              day: item
            })
          })
        })
        this.selectDayArr = [...this.selectDayArr1, ...this.weekData]
      },
      deep: true
    }
  },
  created() {
    if (!this.weekValue[this.curTime]) {
      this.$set(this.weekValue, this.curTime, [])
    }
    if (!this.checkAll[this.curTime]) {
      this.$set(this.checkAll, this.curTime, false)
    }
  },
  mounted() {
    this.selectDayArr1 = this.value
    this.initWeek()
    this.selectDayArr = this.value
    this.bindBtn()
  },
  beforeDestroy() {
    this.unbindBtn()
  },
  methods: {
    /* 绑定切换事件 */
    bindBtn() {
      this.$nextTick(() => {
        const prevBtn = document.querySelector(
          '.el-calendar__button-group .el-button-group>button:nth-child(1)'
        )
        const currentBtn = document.querySelector(
          '.el-calendar__button-group .el-button-group>button:nth-child(2)'
        )
        const nextBtn = document.querySelector(
          '.el-calendar__button-group .el-button-group>button:nth-child(3)'
        )
        prevBtn.addEventListener('click', () => {
          this.changeMonth('prev')
        })
        currentBtn.addEventListener('click', () => {
          this.changeMonth('current')
        })
        nextBtn.addEventListener('click', () => {
          this.changeMonth('next')
        })
      })
    },

    /* 解除事件绑定 */
    unbindBtn() {
      const prevBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(1)'
      )
      const currentBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(2)'
      )
      const nextBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(3)'
      )
      prevBtn.removeEventListener('click', this.changeMonth)
      currentBtn.removeEventListener('click', this.changeMonth)
      nextBtn.removeEventListener('click', this.changeMonth)
    },

    /* 初始化计算 */
    initWeek() {
      const formatValue = this.$utils.formatTime(
        this.dateValue !== '' ? this.dateValue : new Date()
      )
      const daysInMonth = this.$utils.getDaysInMonth({
        year: formatValue.year,
        month: formatValue.month
      })

      const curDays = daysInMonth.map((m) => m.day)
      const selectSumArr = []
      const selectedDate = daysInMonth
        .filter((m) => this.value.includes(m.format))
        .map((m) => m.day)
      const defaultSumArr = []
      for (let i = 0; i < 7; i++) {
        defaultSumArr.push(curDays.filter((m) => m === i).length)
        selectSumArr.push(selectedDate.filter((m) => m === i).length)
      }

      // 本周全选
      for (let i = 0; i < selectSumArr.length; i++) {
        if (
          selectSumArr[i] === defaultSumArr[i] &&
          !this.weekValue[this.curTime].includes(i)
        ) {
          this.weekValue[this.curTime].push(i)
        }
      }
    },

    /* 切换月份 */
    changeMonth(type) {
      const formatValue = this.$utils.formatTime(this.dateValue)
      var daysInMonth = this.$utils.getDaysInMonth({
        year: formatValue.year,
        month: formatValue.month
      })
      this.weekValue[this.curTime].forEach((item) => {
        const daysInMonthData = daysInMonth
          .filter((v) => v.day === item)
          .map((m) => m.format)
        daysInMonthData.forEach((item) => {
          this.updateWeekDate({
            isSelected: false,
            day: item
          })
        })
      })

      this.initWeek()
    },

    /* 全选 */
    checkAllChange(val) {
      if (val) {
        this.weekValue[this.curTime] = [0, 1, 2, 3, 4, 5, 6]
      } else {
        this.weekValue[this.curTime] = []
      }
    },

    /* 周期选择 */
    clickWeek(val) {
      this.checkAll =
        this.weekValue[this.curTime].length === this.weekLabel.length
    },

    updateWeekDate(data) {
      if (!data.isSelected) {
        this.weekData.push(data.day)
      }
    },

    /* 选择日期 */
    selectDay(data) {
      if (!data.isSelected && this.selectDayArr.indexOf(data.day) === -1) {
        this.selectDayArr.push(data.day)
      } else {
        const index = this.selectDayArr.indexOf(data.day)
        this.$set(data, 'isSelected', false)
        index !== -1 && this.selectDayArr.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss">
.ui-calendar-custom {

  .date-cell {
    text-align: center;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    &.is-selected {
      background-color: #f2f8fe;
    }

    span {
      display: block;
    }
  }

  .el-calendar-table tr:first-child td {
    padding: 0;
  }

  .el-calendar-table .el-calendar-day {
    padding: 0;
  }
}
</style>
