<template>
  <!-- 配置 -->
  <div class="ui-h5__config">
    <el-form v-for="(item, index) in curEle" :key="index" size="small">
      <el-form-item :label="`${item.label}：`">
        <el-input v-if="item.field === 'input'" v-model="item.prop" />
        <el-input-number v-else-if="item.field === 'input-number'" v-model="item.prop" />
        <el-select v-else-if="item.field === 'selected'" v-model="item.prop">
          <el-option v-for="(item, index) in item.options" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      formData: {}
    }
  },
  computed: {
    ...mapState(['h5']),
    curEle() {
      return this.$utils.deepCopy(this.h5.elements[this.h5.current]) || []
    }
  },
  methods: {
    ...mapMutations(['setElement'])
  }
}
</script>

<style scoped lang="scss">
.ui-h5__config {
  box-sizing: border-box;
  padding: 0 15px;
}
</style>
