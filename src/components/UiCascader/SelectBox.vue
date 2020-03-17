<template>
  <div class="ui-cascader__box">
    <div class="check-all">
      <div :class="disabled ? 'item-select cataract disabled' : 'item-select cataract'" @click="selectAll"></div>
      <el-checkbox :disabled="disabled" class="check-item" :indeterminate="allIndeterminate" v-model="all">全选</el-checkbox>
    </div>
    <div v-for="item in data" :key="item[prop.id]" >
      <div
        :data-id="item[prop.id]"
        :data-name="item[prop.value]"
        v-if="item[prop.children] && item[prop.children].length"
        :class="itemClasses(item)"
        @click="!disabled && $emit('on-child', {item, level})"
      >
        <el-checkbox :disabled="disabled" :indeterminate="itemIndeterminate(item)" v-model="item[prop.check]">{{item[prop.value]}}</el-checkbox>
        <i class="el-icon-arrow-right"></i>
        <span class="item-checkbox cataract" @click="selectItem(item)"></span>
      </div>
      <el-checkbox v-else class="check-item" v-model="item[prop.check]">{{item[prop.value]}}</el-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    },
    data: {
      type: Array
    },
    level: {
      type: Number
    },
    prop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    itemClasses() {
      return item => {
        const cls = ['check-item']
        if (item[this.prop.value] === this.value) {
          cls.push('active')
        }
        if (this.disabled) {
          cls.push('disabled')
        }
        return cls
      }
    },
    all() {
      const len = this.data.filter(ret => ret[this.prop.check]).length
      return this.data.length === len
    },
    allIndeterminate() {
      const len = this.data.filter(ret => ret[this.prop.check]).length
      return len < this.data.length && len > 0
    }
  },
  watch: {
    data: {
      handler(nVal, oVal) {
        this.$utils.computeChild(nVal, this.prop, this)
      },
      deep: true
    }
  },
  mounted() {
    this.$utils.computeChild(this.data, this.prop, this)
  },
  methods: {
    selectAll() {
      if (this.disabled) { return }
      this.$emit('on-select', {
        check: !this.all,
        level: this.level
      })
    },
    selectItem(item) {
      if (this.disabled) { return }
      this.$emit('on-select', {
        check: !item[this.prop.check],
        level: this.level,
        cat: item[this.prop.id]
      })
    },
    itemIndeterminate(child) {
      const hasChild = (meta) => {
        return meta[this.prop.children].reduce((sum, item) => {
          let foundChilds = []
          if (item[this.prop.check]) { sum.push(item) }
          if (item[this.prop.children]) { foundChilds = hasChild(item) }
          return sum.concat(foundChilds)
        }, [])
      }
      const some = hasChild(child).length > 0
      const every = child[this.prop.children] && child[this.prop.children].every(ret => ret[this.prop.check])
      return some && !every
    }
  }
}
</script>

<style scoped lang="scss">
.ui-cascader__box{
  .cataract{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    cursor: pointer;
  }

  .check-all{
    width: 100%;
    height: 36px;
    position: relative;
    z-index: 9;
    &:hover{
      .check-item{
        background-color: #f8f8f8;
      }
    }
    .item-select{
      width: 100%;
      height: 100%;

      &.disabled{
        cursor: not-allowed;
      }
    }
  }

  .check-item{
    margin: 0;
    padding: 0 12px;
    display: block;
    position: relative;
    height: 36px;
    line-height: 36px;
    &.disabled{
      cursor: not-allowed;
    }
    &:hover{
      background-color: #f8f8f8;
    }

    &.active{
      color: #598fe6;
      background-color: #f8f8f8;
      .el-icon-arrow-right{
        color: #598fe6 !important;
      }
    }

    .el-icon-arrow-right{
      float: right;
      margin-top: 10px;
    }

    .item-checkbox{
      width: 36px;
      height: 36px;

    }

  }
}

</style>
