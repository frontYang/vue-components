<template>
  <!-- 配置 -->
  <div class="ui-h5__config">
    <el-form size="small" label-position="right" :inline="true">
      <el-collapse
        v-for="(item, index) in curEle.node"
        :key="index"
        v-model="collName"
      >
        <el-collapse-item :title="item.group" :name="index">
          <el-form-item
            v-for="(eleItem, eleIndex) in item.data"
            :key="eleIndex"
            :label="`${eleItem.label}`"
          >
            <!-- input -->
            <el-input
              v-if="eleItem.field === 'input'"
              v-model="eleItem.value"
              :placeholder="eleItem.label"
            />

            <!-- input-number -->
            <el-input-number
              v-else-if="eleItem.field === 'input-number'"
              v-model="eleItem.value"
              controls-position="right"
              :placeholder="eleItem.label"
            />

            <!-- select -->
            <el-select
              v-else-if="eleItem.field === 'select'"
              v-model="eleItem.value"
              :placeholder="eleItem.label"
            >
              <el-option
                v-for="(eleItem, index) in eleItem.options"
                :key="index"
                :label="eleItem"
                :value="eleItem"
              />
            </el-select>

            <!-- color-picker -->
            <el-color-picker
              v-else-if="eleItem.field === 'color-picker'"
              v-model="eleItem.value"
              :placeholder="eleItem.label"
            />

            <!-- upload -->
            <template v-if="eleItem.field === 'upload'">
              <el-button size="small" type="primary">选择图片</el-button>
            </template>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <!-- 删除组件按钮 -->
      <el-button
        v-if="showDeleteBtn"
        class="btn-delete"
        type="danger"
        icon="el-icon-delete"
        round
        @click="deleteEle"
      >
        删除组件
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      collName: 0,
      curEle: {}
    }
  },
  computed: {
    ...mapState(['h5']),
    showDeleteBtn() {
      return Object.keys(this.curEle).length > 0
    }
  },
  watch: {
    'h5.current': {
      handler() {
        this.curEle =
          this.$utils.deepCopy(this.h5.elements[this.h5.current]) || []
        // this.curEle = this.h5.elements[this.h5.current] || []
      }
    },
    curEle: {
      handler() {
        const isDel = this.curEle.node.length === 0
        this.setElement({
          status: isDel ? 'delete' : 'modify',
          current: this.h5.current,
          element: this.$utils.deepCopy(this.curEle)
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['setElement']),
    deleteEle() {
      this.curEle = []
    }
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

  .el-upload {
    display: inline-block;
  }

  .btn-delete {
    display: block;
    margin: 20px auto;
  }
}
</style>
