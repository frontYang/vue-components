<template>
  <div class="ui-calendar-custom">
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="checkAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="weekValue" @change="clickWeek" >
      <el-checkbox v-for="(item, index) in weekLabel" :key="item" :label="index">{{ item }}</el-checkbox>
    </el-checkbox-group>
    <el-calendar ref="elCalendar" v-model="dateValue" :first-day-of-week="0">
      <template v-slot:dateCell="{date, data}">
        <div :class="currentCls(data)" @click="selectDay(data)" v-html="dateLabel(data)"></div>
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
      checkAll: false,
      weekLabel: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      dateValue: '',
      weekData: [], // 存储全选
      weekValue: [],
      curMonthData: [] // 当前月日期数据
    }
  },
  computed: {
    isIndeterminate() {
      return this.weekValue.length > 0 && !this.checkAll
    },
    currentCls() {
      return item => {
        return this.selectDayArr.includes(`${item.day}`) ? 'date-cell is-selected' : 'date-cell'
      }
    },
    dateLabel() {
      return item => {
        const value = item.day.split('-').slice(2)
        const checked = this.selectDayArr.includes(`${item.day}`) ? `<span>${this.stateLabel[0]}</span>` : `<span>${this.stateLabel[1]}</span>`
        return `<span>${value}</span>` + checked
      }
    }
  },
  watch: {
    selectDayArr: {
      handler() {
        this.$emit('input', this.selectDayArr)
      }
    },
    weekValue: {
      handler() {
        this.weekData = []
        const formatValue = this.$utils.formatTime(this.dateValue !== '' ? this.dateValue : new Date())
        const daysInMonth = this.$utils.getDaysInMonth({
          year: formatValue.year,
          month: formatValue.month
        })
        this.weekValue.forEach((item, index) => {
          const daysInMonthData = daysInMonth.filter(v => v.day === item).map(m => m.format)
          daysInMonthData.forEach((item) => {
            this.updateWeekDate({
              isSelected: false,
              day: item
            })
          })
        })
        this.selectDayArr = this.weekData
      }
    }
  },
  mounted() {
    this.selectDayArr = this.value
    this.bindBtn()
  },
  beforeDestroy() {
    const prevBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(1)')
    const currentBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(2)')
    const nextBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(3)')
    prevBtn.removeEventListener('click', this.changeMonth)
    currentBtn.removeEventListener('click', this.changeMonth)
    nextBtn.removeEventListener('click', this.changeMonth)
  },
  methods: {
    /* 绑定切换 */
    bindBtn() {
      this.$nextTick(() => {
        const prevBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(1)')
        const currentBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(2)')
        const nextBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(3)')
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

    /* 切换月份 */
    changeMonth(type) {
      const formatValue = this.$utils.formatTime(this.dateValue)
      var daysInMonth = this.$utils.getDaysInMonth({
        year: formatValue.year,
        month: formatValue.month
      })
      this.weekValue.forEach((item) => {
        const daysInMonthData = daysInMonth.filter(v => v.day === item).map(m => m.format)
        daysInMonthData.forEach((item) => {
          this.updateWeekDate({
            isSelected: false,
            day: item
          })
        })
      })
    },

    /* 全选 */
    checkAllChange(val) {
      if (val) {
        this.weekValue = [0, 1, 2, 3, 4, 5, 6]
      } else {
        this.weekValue = []
      }
    },

    /* 周期选择 */
    clickWeek(val) {
      this.checkAll = this.weekValue.length === this.weekLabel.length
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
.ui-calendar-custom{
  .date-cell{
    text-align: center;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    &.is-selected{
      background-color: #F2F8FE;
    }
    span{
      display: block;
    }
  }
  .el-calendar-table tr:first-child td{
    padding: 0;
  }

  .el-calendar-table .el-calendar-day{
    padding: 0;
  }
}
</style>
