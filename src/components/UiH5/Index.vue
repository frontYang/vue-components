<template>
  <div class="ui-h5 f-flex f-flex-strength">
    <div class="box box-elements f-flex-left">
      <elements />
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
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/_common.scss';
.ui-h5 {
  background: #f1f1f1;
  width: 100vw;
  height: 100vh;
  border-radius: 5px;
  box-sizing: border-box;
  .box {
    &.box-elements,
    &.box-config {
      background: #fff;
      flex-grow: 0;
    }
    &.box-elements {
      width: 258px;
    }
    &.box-config {
      width: 320px;
    }
    &.box-panel {
      min-width: 375px;
      flex-grow: 3;
    }
  }
}
</style>
