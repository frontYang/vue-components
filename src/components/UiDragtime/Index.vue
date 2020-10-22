<template>
  <div class="ui-weektime">
    <div class="weektime-schedue" />
    <div
      :class="{ 'weektime-schedue': true, 'weektime-schedue-notransi': mode }"
      :style="styleValue"
    />

    <table class="ui-weektime-table" :class="{ 'box-min-table': colspan < 2 }">
      <thead class="ui-weektime-head">
        <tr>
          <th rowspan="8" class="week-td">
            {{ hideSub ? "时间" : "星期/时间" }}
          </th>
          <th :colspan="12 * colspan">00:00 - 12:00</th>
          <th :colspan="12 * colspan">12:00 - 24:00</th>
          <th>操作</th>
        </tr>
        <tr>
          <td v-for="t in theadArr" :key="t" :colspan="colspan">{{ t }}</td>
          <td>
            <el-checkbox
              v-if="!hideSub"
              v-model="checkAll"
              :indeterminate="indeterminate"
              @change="selectAll"
            >
              全选
            </el-checkbox>
          </td>
        </tr>
      </thead>
      <tbody class="ui-weektime-body">
        <tr v-for="t in data" :key="t.row">
          <td>{{ hideSub ? "" : t.value }}</td>
          <td
            v-for="n in t.child"
            :key="`${n.row}-${n.col}`"
            :data-week="n.row"
            :data-time="n.col"
            :class="selectClasses(n)"
            class="weektime-atom-item"
            @mouseenter="cellEnter(n)"
            @mousedown="cellDown(n)"
            @mouseup="cellUp(n)"
          />
          <td>
            <div class="checkbox">
              <el-checkbox
                v-model="rowFlg[t.row]"
                @change="selectAllDay(t.row)"
              >
                全天
              </el-checkbox>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="50" class="ui-weektime-preview">
            <div class="g-clearfix ui-weektime-con">
              <span class="g-pull-left">{{
                selectState ? "已选择时间段" : "可拖动鼠标选择时间段"
              }}</span>
              <a class="g-pull-right" @click.prevent="clearSelect">清空选择</a>
            </div>
            <div v-if="selectState" class="ui-weektime-time">
              <div v-for="t in selectValue" :key="t.id">
                <p v-if="t.value">
                  <span class="g-tip-text">{{
                    hideSub ? "" : t.week + "："
                  }}</span>
                  <span>{{ t.value }}</span>
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
const createArr = (len) => {
  return Array.from(Array(len)).map((ret, id) => id)
}

export default {
  name: 'Dragtime',
  props: {
    value: {
      type: Array
    },
    data: {
      type: Array
    },
    colspan: {
      type: Number,
      default() {
        return 2
      }
    }
  },

  data() {
    return {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      mode: 0,
      row: 0,
      col: 0,
      theadArr: [],
      rowFlg: [],
      curItem: {},
      checkAll: false,
      indeterminate: false
    }
  },

  computed: {
    hideSub() {
      return this.data.length === 1
    },
    styleValue() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        left: `${this.left}px`,
        top: `${this.top}px`
      }
    },
    selectValue() {
      return this.value
    },
    selectState() {
      return this.value.some((ret) => ret.value)
    },
    selectClasses() {
      return (n) => (n.check ? 'ui-selected' : '')
    }
  },
  created() {
    this.theadArr = createArr(24)
    this.setRowFlg(false)
  },
  methods: {
    cellEnter(item) {
      const ele = document.querySelector(
        `td[data-week='${item.row}'][data-time='${item.col}']`
      )
      if (ele && !this.mode) {
        this.left = ele.offsetLeft
        this.top = ele.offsetTop
      } else {
        if (item.col <= this.col && item.row <= this.row) {
          this.width = (this.col - item.col + 1) * ele.offsetWidth
          this.height = (this.row - item.row + 1) * ele.offsetHeight
          this.left = ele.offsetLeft
          this.top = ele.offsetTop
        } else if (item.col >= this.col && item.row >= this.row) {
          this.width = (item.col - this.col + 1) * ele.offsetWidth
          this.height = (item.row - this.row + 1) * ele.offsetHeight
          if (item.col > this.col && item.row === this.row) {
            this.top = ele.offsetTop
          }
          if (item.col === this.col && item.row > this.row) {
            this.left = ele.offsetLeft
          }
        } else if (item.col > this.col && item.row < this.row) {
          this.width = (item.col - this.col + 1) * ele.offsetWidth
          this.height = (this.row - item.row + 1) * ele.offsetHeight
          this.top = ele.offsetTop
        } else if (item.col < this.col && item.row > this.row) {
          this.width = (this.col - item.col + 1) * ele.offsetWidth
          this.height = (item.row - this.row + 1) * ele.offsetHeight
          this.left = ele.offsetLeft
        }
      }
      this.curItem = item
    },
    cellDown(item) {
      const ele = document.querySelector(
        `td[data-week='${item.row}'][data-time='${item.col}']`
      )
      this.check = Boolean(item.check)
      this.mode = 1
      if (ele) {
        this.width = ele.offsetWidth
        this.height = ele.offsetHeight
      }

      this.row = item.row
      this.col = item.col
    },
    cellUp(item) {
      if (item.col <= this.col && item.row <= this.row) {
        this.selectWeek(
          [item.row, this.row],
          [item.col, this.col],
          !this.check
        )
      } else if (item.col >= this.col && item.row >= this.row) {
        this.selectWeek(
          [this.row, item.row],
          [this.col, item.col],
          !this.check
        )
      } else if (item.col > this.col && item.row < this.row) {
        this.selectWeek(
          [item.row, this.row],
          [this.col, item.col],
          !this.check
        )
      } else if (item.col < this.col && item.row > this.row) {
        this.selectWeek(
          [this.row, item.row],
          [item.col, this.col],
          !this.check
        )
      }

      this.width = 0
      this.height = 0
      this.mode = 0
    },
    selectWeek(row, col, check) {
      const [minRow, maxRow] = row
      const [minCol, maxCol] = col
      this.data.forEach((item) => {
        item.child.forEach((t) => {
          if (
            t.row >= minRow &&
            t.row <= maxRow &&
            t.col >= minCol &&
            t.col <= maxCol
          ) {
            this.$set(t, 'check', check)
          }
        })
      })
    },

    // 选择全天
    selectAllDay(row) {
      this.selectWeek([row, row], [this.col, 47], this.rowFlg[row])
      const arr = this.rowFlg.filter((item) => item === true)
      if (arr.length > 0 && arr.length <= this.rowFlg.length - 1) {
        this.indeterminate = true
      } else if (arr.length === this.rowFlg.length) {
        this.indeterminate = false
        this.checkAll = true
      }
    },

    // 全选
    selectAll() {
      this.selectWeek([0, 6], [0, 47], this.checkAll)
      this.setRowFlg(this.checkAll)
    },

    setRowFlg(flg) {
      for (let i = 0; i < 7; i++) {
        this.rowFlg[i] = flg
      }
    },

    clearSelect() {
      this.checkAll = false
      this.setRowFlg(false)
      this.$emit('on-clear')
    }
  }
}
</script>
<style lang="scss" scoped>
$primary: #409eff;

.ui-weektime {
  min-width: 640px;
  position: relative;
  display: inline-block;
}

.weektime-schedue {
  background: $primary;
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0.5;
  pointer-events: none;
}

.weektime-schedue-notransi {
  transition:
    width 0.12s ease,
    height 0.12s ease,
    top 0.12s ease,
    left 0.12s ease;
}

.ui-weektime-table {
  border-collapse: collapse;

  th {
    vertical-align: inherit;
    font-weight: bold;
  }

  tr {
    height: 30px;
  }

  tr,
  td,
  th {
    user-select: none;
    border: 1px solid #dee4f5;
    text-align: center;
    min-width: 12px;
    line-height: 1.8em;
    transition: background 0.2s ease;
  }

  .ui-weektime-head {
    font-size: 12px;

    .week-td {
      width: 70px;
    }
  }

  .ui-weektime-body {
    font-size: 12px;

    td {

      &.weektime-atom-item {
        user-select: unset;
        background-color: #f5f5f5;
      }

      &.ui-selected {
        background-color: $primary;
      }
    }

    .checkbox {
      padding: 0 10px;
    }
  }

  .ui-weektime-preview {
    line-height: 2.4em;
    padding: 0 10px;
    font-size: 14px;

    .ui-weektime-con {
      line-height: 46px;
      user-select: none;
    }

    .ui-weektime-time {
      text-align: left;
      line-height: 2.4em;

      p {
        max-width: 625px;
        line-height: 1.4em;
        word-break: break-all;
        margin-bottom: 8px;
      }
    }
  }
}

.box-min-table {

  tr,
  td,
  th {
    min-width: 24px;
  }
}

.g-clearfix {

  &::after,
  &::before {
    clear: both;
    content: " ";
    display: table;
  }
}

.g-pull-left {
  float: left;
}

.g-pull-right {
  float: right;
  cursor: pointer;
}

.g-tip-text {
  color: #999;
}
</style>
