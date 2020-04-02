<template>
  <!-- 配置 -->
  <div class="ui-h5__config">
    <el-form size="small" label-position="right" :inline="true">
      <el-collapse v-for="(item, index) in curEle" :key="index" v-model="collName" @change="changeColl">
        <el-collapse-item :title="item.group" :name="index">
          <el-form-item v-for="(eleItem, eleIndex) in item.data" :key="eleIndex" :label="`${eleItem.label}`">
            <el-input v-if="eleItem.field === 'input'" v-model="eleItem.value" :placeholder="eleItem.label" />
            <el-input-number
              v-else-if="eleItem.field === 'input-number'"
              v-model="eleItem.value"
              controls-position="right"
              :placeholder="eleItem.label"
            />
            <el-select v-else-if="eleItem.field === 'select'" v-model="eleItem.value" :placeholder="eleItem.label">
              <el-option
                v-for="(eleItem, index) in eleItem.options"
                :key="index"
                :label="eleItem"
                :value="eleItem"
              ></el-option>
            </el-select>
            <el-color-picker
              v-else-if="eleItem.field === 'color-picker'"
              v-model="eleItem.value"
              :placeholder="eleItem.label"
            />
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      collName: 0,
      curEle: []
    }
  },
  computed: {
    ...mapState(['h5'])
  },
  watch: {
    'h5.current': {
      handler() {
        this.curEle = this.$utils.deepCopy(this.h5.elements[this.h5.current]) || []
      }
    },
    'curEle': {
      handler() {
        this.setElement({
          status: 'modify',
          current: this.h5.current,
          element: this.$utils.deepCopy(this.curEle)
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['setElement']),
    changeColl() {}
  }
}
</script>

<style lang="scss">
.ui-h5__config {
  min-height: 667px;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0 15px;

  .el-select,
  .el-input-number {
    width: 100px;
  }
  .el-input {
    width: 100%;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
  .el-form-item__label {
    min-width: 40px;
  }
}
</style>
