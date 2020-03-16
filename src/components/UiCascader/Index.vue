<template>
  <div class="ui-cascader scrollbar">
    <div class="cascader-box f-flex">
      <div class="cascader-item" v-for="(item, index) in resource" :key="index">
        <select-item :title="item.title">
          <select-box
            v-model="item.current"
            :prop="prop"
            :disabled="disabled"
            :data="item.data"
            :level="item.level"
            @on-child="pushChild"
            @on-select="selectAll"
          />
        </select-item>
      </div>
    </div>
    <div class="cascader-result" v-if="!hideResult">
      <select-item
        v-if="value.length"
        title="已选"
        clear
        @on-clear="clearTag">
        <div v-for="item in value" :key="item[prop.id]" class="pop-tip">
          <el-tag
            :name="item[prop.value]"
            closable
            class="tag-item"
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
      resource: []
    }
  },
  components: {
    'select-item': SelectItem,
    'select-box': SelectBox
  },
  computed: {
  },
  watch: {
    data(nVal) {
      if (nVal && nVal.length) {
        this.updateResource()
      } else {
        this.resource = []
      }
    }
  },
  created() {
    this.updateResource()
  },
  methods: {
    updateResource() {
      this.resource = []
      this.resource.push({
        data: this.data,
        current: this.value[this.value.length - 1] ? this.value[this.value.length - 1][this.prop.value] : '',
        level: 1,
        title: this.title[0]
      })
    },

    // 全选
    selectAll({ level, check, cat }) {
      const index = level - 2
      let current = index > -1 ? this.resource[index].current : ''
      cat && (current = cat)
      let data
      // 无限递归
      const setAllChecked = (data, check) => {
        data.forEach(ret => {
          if (ret.children && ret.children.length) { setAllChecked(ret.children, check) }
          this.$set(ret, 'check', check)
        })
      }
      if (current) {
        const item = this.$utils.getNameOfData(this.data, this.prop, current)
        data = item.children
      } else {
        data = this.data
      }
      setAllChecked(data, check)
    },

    // 删除
    handleClose(name) {
      const data = this.$utils.getNameOfData(this.data, this.prop, name)
      if (data.children && data.children.length) {
        this.selectAll({ list: this.data, check: false, current: data[this.prop.value] })
      } else {
        this.$set(data, 'check', false)
      }
    },
    // 清除
    clearTag() {
      this.$utils.clearTagOfData(this.data, this.prop, this)
    },

    pushChild(params) {
      const { item, level } = params
      const len = this.resource.length
      if (level <= len - 1) {
        this.resource.splice(level, len - level)
      }
      this.resource.push({
        data: item[this.prop.children],
        current: this.value[this.value.length - 1] ? this.value[this.value.length - 1][this.prop.value] : '',
        level: level + 1,
        title: this.title[level] || item[this.prop.value]
      })
      this.resource[level - 1].current = item[this.prop.value]
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/_common.scss';
.cascader-box{
  .cascader-item{
    flex: 1;
  }
}

</style>
