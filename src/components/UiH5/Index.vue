<template>
  <div class="ui-h5 f-flex f-flex-strength scrollbar">
    <div class="box box-elements f-flex-left">
      <el-tabs
        v-model="activeName"
        type="border-card"
        tab-position="left"
        @tab-click="tabClick"
      >
        <el-tab-pane label="元素" name="elements"><elements /></el-tab-pane>
        <el-tab-pane label="设置" name="page" />
      </el-tabs>
    </div>
    <div class="box box-panel">
      <panel />
    </div>
    <div class="box box-config f-flex-right">
      <config />
    </div>
  </div>
</template>

<script>
import Config from './Config'
import Panel from './Panel'
import Elements from './Elements'

export default {
  components: {
    config: Config,
    panel: Panel,
    elements: Elements
  },
  data() {
    return {
      activeName: 'elements'
    }
  },
  methods: {
    tabClick() {}
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_common.scss";
.ui-h5 {
  background: #f1f1f1;
  width: 100%;
  height: 100%;
  min-height: 767px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  box-sizing: border-box;
  .box {
    position: relative;
    &.box-elements,
    &.box-config {
      background: #fff;
      flex-grow: 0;
    }
    &.box-elements {
      width: 258px;
      .el-tabs {
        height: 100%;
        .el-tabs__header {
          margin-right: 0;
        }
        & > .el-tabs__content {
          padding: 0;
        }
      }
    }
    &.box-config {
      width: 340px;
    }
    &.box-panel {
      min-width: 375px;
      flex-grow: 3;
    }
  }
}
</style>
