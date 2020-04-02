<template>
  <!-- 视图 -->
  <div class="ui-h5__view">
    <drag-box v-for="(item, index) in curEles" :key="index" @on-size="emitSize">
      <base-text v-if="item.type === 'text'" v-model="item.node" />
    </drag-box>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DragBox from './DragBox'
import BaseText from './BaseUi/BaseText'

export default {
  name: 'panel',
  components: {
    'drag-box': DragBox,
    'base-text': BaseText
  },
  data() {
    return {
      curEles: []
    }
  },
  computed: {
    ...mapState(['h5'])
  },
  watch: {
    'h5.elements': {
      handler(newVal) {
        for (const [index, item] of this.h5.elements.entries()) {
          this.$set(this.curEles, index, item)
        }
      },
      deep: true
    }
    /* 'curEles': {
      handler() {
        const isDel = this.curEles[this.h5.current].data.length === 0
        this.setElement({
          status: isDel ? 'delete' : 'modify',
          current: this.h5.current,
          element: {
            type: this.curEles.type,
            data: this.$utils.deepCopy(this.curEles)
          }
        })
      },
      deep: true
    } */
  },
  mounted() {},
  methods: {
    ...mapMutations(['setElement']),
    emitSize(index) {
      console.log(this.curEles[this.h5.current])
    }
  }
}
</script>

<style scoped lang="scss">
.ui-h5__view {
  position: relative;
  background: #fff;
  height: 667px;
  overflow-y: auto;
  width: 375px;
  margin: 50px auto 0;
}
</style>
