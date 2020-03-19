<template>
  <div class="ui-cascader scrollbar f-flex">
    <div class="cascader-box f-flex">
      <div class="cascader-item" v-for="(item, index) in resource" :key="index">
        <select-item :title="item.title">
          <select-box
            v-model="item.current"
            :prop="prop"
            :disabled="disabled"
            :data="item.data"
            :multi="index === 0 ? isMultiFirst : true"
            :level="item.level"
            @on-child="pushChild"
            @on-select="selectAll"
          />
        </select-item>
      </div>
    </div>
    <div class="cascader-result" v-if="!hideResult">
      <select-item
        v-if="selectedData.length"
        title="已选"
        clear
        @on-clear="clearTag">
        <div v-for="item in selectedData" :key="item[prop.id]" class="pop-tip">
          <el-tag
            :name="item[prop.value]"
            closable
            class="tag-item"
            @close="handleClose(item[prop.id])"
          >{{item[prop.value]}}</el-tag>
        </div>
      </select-item>
    </div>
  </div>
</template>

<script>
import SelectItem from './SelectItem'
import SelectBox from './SelectBox'
export default {
  name: 'cascader',
  props: {
    // 已选
    value: {
      type: Array
    },
    // 数据
    data: {
      type: Array
    },
    // 标题
    title: {
      type: Array
    },
    // 是否禁止选择
    disabled: {
      type: Boolean,
      default: false
    },
    // 首层是否多选
    isMultiFirst: {
      type: Boolean,
      default: true
    },
    // 是否隐藏结果ui
    hideResult: {
      type: Boolean,
      default: false
    },
    // key值
    prop: {
      type: Object,
      default() {
        return {
          check: 'check',
          children: 'children',
          id: 'id',
          value: 'value'
        }
      }
    }
  },
  data() {
    return {
      resource: [],
      newData: []
    }
  },
  components: {
    'select-item': SelectItem,
    'select-box': SelectBox
  },
  computed: {
    selectedData() {
      return this.$utils.findCheck({
        list: this.newData,
        prop: this.prop,
        filter: this.isMultiFirst ? 0 : 1
      })
    }
  },
  watch: {
    selectedData() {
      const selectedIdArr = this.selectedData.map(v => v.id)
      this.$emit('input', selectedIdArr)
    },
    newData(nVal) {
      if (nVal && nVal.length) {
        this.updateResource()
      } else {
        this.resource = []
      }
    }
  },
  created() {
    this.newData = this.$utils.selectCheck({
      data: this.data,
      selected: this.value,
      prop: this.prop
    })
  },
  mounted() {
    this.updateResource()
  },
  methods: {
    updateResource() {
      this.resource = []
      this.resource.push({
        data: this.newData,
        current: this.selectedData[this.selectedData.length - 1] ? this.selectedData[this.selectedData.length - 1][this.prop.value] : '',
        id: this.selectedData[this.selectedData.length - 1] ? this.selectedData[this.selectedData.length - 1][this.prop.id] : '',
        level: 1,
        title: this.title[0]
      })
    },

    selectFn({ list, check = true, id = '' }) {
      let data
      // 无限递归
      const setAllChecked = (data, check) => {
        data.forEach(ret => {
          if (ret[this.prop.children] && ret[this.prop.children].length) { setAllChecked(ret[this.prop.children], check) }
          this.$set(ret, this.prop.check, check)
        })
      }

      if (id) {
        const item = this.$utils.getIdOfData(list, this.prop, id)
        data = item[this.prop.children]
      } else {
        data = list
      }
      setAllChecked(data, check)
    },

    // 全选
    selectAll({ level, check, cat }) {
      const index = level - 2
      let id = index > -1 ? this.resource[index][this.prop.id] : ''
      cat && (id = cat)
      this.selectFn({
        check,
        id,
        list: this.newData
      })
    },

    // 删除
    handleClose(id) {
      const data = this.$utils.getIdOfData(this.newData, this.prop, id)
      if (data[this.prop.children] && data[this.prop.children].length) {
        this.selectFn({ list: this.newData, check: false, id: data[this.prop.id] })
      } else {
        this.$set(data, this.prop.check, false)
      }
    },
    // 清除
    clearTag() {
      this.$utils.clearTagOfData(this.newData, this.prop, this)
    },

    pushChild(params) {
      const { item, level } = params
      const len = this.resource.length
      if (level <= len - 1) {
        this.resource.splice(level, len - level)
      }
      this.resource.push({
        data: item[this.prop.children],
        current: this.selectedData[this.selectedData.length - 1] ? this.selectedData[this.selectedData.length - 1][this.prop.value] : '',
        id: this.selectedData[this.selectedData.length - 1] ? this.selectedData[this.selectedData.length - 1][this.prop.id] : '',
        level: level + 1,
        title: this.title[level] || item[this.prop.value]
      })
      this.resource[level - 1].current = item[this.prop.value]
      this.resource[level - 1].id = item[this.prop.id]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/_common.scss';

.ui-cascader{
  .cascader-result{
    flex: 1;
  }
  .cascader-box{
    flex: 1;
    min-width: 65%;
    .cascader-item{
      flex: 1;
    }
  }
  .cascader-result{
    .el-tag{
      width: 94%;
      margin: 8px 14px 0;
      display: block;
      font-size: 14px;
      height: 28px;
      position: relative;

      .el-icon-close{
        position: absolute;
        top: 50%;
        right: 5px;
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
      }
    }
  }
}

</style>
