<template>
  <div class="ui-h5 f-flex f-flex-strength">
    <div class="box box-elements f-flex-left">
      <elements />
    </div>
    <div class="box box-view">
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
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    config: Config,
    panel: Panel,
    elements: Elements
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['h5'])
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/_common.scss';
.ui-h5 {
  width: 100vw;
  height: 100vh;
  // border-radius: 5px;
  box-sizing: border-box;
  .box {
    &.box-view {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      width: 50%;
    }
  }
}
</style>
