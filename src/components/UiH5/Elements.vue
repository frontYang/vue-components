<template>
  <!-- 组件元素 -->
  <div class="ui-h5__elements">
    <div class="elements-box f-flex f-flex-strength">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="elements-item"
        @click="nodeClick(item.type)"
      >
        <i :class="`el-icon-${item.icon}`" />
        <span class="label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import eleConfigs from './ele_config'

export default {
  data() {
    return {
      data: [
        { type: 'block', label: '块', icon: 'full-screen' },
        { type: 'picture', label: '单图', icon: 'picture-outline' },
        { type: 'text', label: '文本', icon: 'document' },
        { type: 'button', label: '按钮', icon: 'mouse' }
      ]
    }
  },
  computed: {
    ...mapState(['h5'])
  },
  mounted() {},
  methods: {
    ...mapMutations(['setElement']),
    nodeClick(type) {
      this.setElement({
        status: 'init',
        element: {
          type: type,
          node: eleConfigs[type]
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_common.scss";

.ui-h5__elements {
  min-height: 667px;
  overflow-y: auto;
  padding: 0 0;

  .elements-box {
    flex-wrap: wrap;

    .elements-item {
      box-sizing: border-box;
      // width: 112px;
      width: 80%;
      padding: 20px;
      // margin: 10px 0 0 10px;
      margin: 20px auto 0;
      text-align: center;
      color: $primary;
      border: 1px dashed #ddd;
      cursor: pointer;

      i {
        font-size: 28px;
      }

      .label {
        padding-top: 5px;
        display: block;
        font-size: 14px;
      }
    }
  }
}
</style>
