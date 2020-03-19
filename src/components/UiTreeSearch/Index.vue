<template>
<!-- 搜索 -->
  <el-form class="ui-input-search">
    <el-input v-model="searchVal" @input="input" class="input-search" prefix-icon="el-icon-search" placeholder="请输入行为类目词或关键词" clearable @clear="clear"></el-input>
    <el-card class="list-search" v-if="showList" v-loading="loading">
      <ul>
        <template v-if="list.length > 0">
          <li @click.stop="selected(index)" v-for="(item, index) in list" :key="index">
            <p class="label">{{item.path_name || item.name}}</p>
          </li>
        </template>
        <template v-else>
          <li>
            无搜索结果
          </li>
        </template>
      </ul>
    </el-card>
  </el-form>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    treeData: {
      type: Array
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      searchVal: '',
      disabled: false,
      showList: false
    }
  },
  computed: {
  },
  watch: {
    searchVal: {
      handler(nVal) {
        if (!this.disabled) {
          this.treeData.length > 0 && this.findTreeData()
          this.$emit('input', this.searchVal)
        }
      }
    },
    value: {
      handler() {
        this.searchVal = this.value
      }
    }
  },
  created() {
    this.searchVal = this.value
  },
  mounted() {
    this.$nextTick(() => {
      document.documentElement.addEventListener('click', this.hidePop)
    })
  },
  beforeDestroy() {
    document.documentElement.removeEventListener('click', this.hidePop)
  },
  methods: {
    /* 获取树形结构 */
    findTreeData() {
      this.list = this.$utils.findTreeFuzzy({
        val: this.searchVal,
        data: this.treeData
      }) || []
    },

    /* 选中 */
    selected(index) {
      this.searchVal = this.list[index].path_name || this.list[index].name
      this.hidePop()
      this.disabled = true
      this.$emit('on-selected', this.list[index])
    },

    /* 清空 */
    clear() {
      this.list = []
    },

    /* 输入 */
    input() {
      this.disabled = false
      this.showList = true
      this.$emit('on-input')
    },

    /* 隐藏 */
    hidePop() {
      this.showList = false
    },

    initShow() {
      this.showList = this.list.length > 0 && this.value !== ''
    }
  }
}
</script>

<style scope lang="scss">
@import '@/assets/styles/_common.scss';
.ui-input-search{
  &.el-form{
    position: relative;
  }
  .list-search{
    width: 100%;
    box-sizing: border-box;
    position: absolute !important;
    top: 39px;
    left: 0;
    max-height: 150px;
    overflow: auto;
    z-index: 10;

    .el-card__body{
      padding: 5px 0 10px !important;
    }

    ul{
      list-style: none;
      margin: 0;
      padding: 0;

      li{
        font-size: 14px;
        line-height: 22px;
        cursor: pointer;
        padding: 12px;

        p{
          padding: 0;
          margin: 0;
        }

        .tip{
          color: $gray;
          font-size: 12px;
        }

        &:hover{
          background: $hoverbg;
        }
      }
    }
  }
}
</style>
