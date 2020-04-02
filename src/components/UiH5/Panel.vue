<template>
  <!-- 视图 -->
  <div class="ui-h5__view"></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
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
    }
  },

  methods: {
    ...mapMutations(['setElement'])
  }
}
</script>

<style scoped lang="scss">
.ui-h5__view {
  background: #fff;
  height: 667px;
  overflow-y: auto;
  width: 375px;
  margin: 50px auto 0;
}
</style>
