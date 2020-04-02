<template>
  <div :class="`ui-h5__dragbox ui-h5__dragbox-${h5.current}`" :style="style">
    <div
      v-for="(item, index) in point"
      :key="index"
      :class="`point ${item}`"
      @mousedown.stop="roundMouseEvent($event, index + 1)"
      @mousemove.stop="roundMousemove($event, index + 1)"
      @mouseup.stop="roundMousemove($event, index + 1)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'drag-box',
  data() {
    return {
      layout: {},
      point: ['top_left', 'top_top', 'top_right', 'bottom_left', 'bottom_bottom', 'bottom_right']
    }
  },
  computed: {
    ...mapState(['h5']),
    style() {
      return {
        'width': this.layout.width + 'px',
        'height': this.layout.height + 'px',
        'left': this.layout.x + 'px',
        'top': this.layout.y + 'px',
        'color': this.layout.color + 'px',
        'font-size': this.layout.fontSize + 'px'
      }
    }
  },
  mounted() {
    this.getLayout()
    this.setStyle()
  },
  methods: {
    ...mapMutations(['setElement']),

    getLayout() {
      const node = this.h5.elements[this.h5.current].node
      const baseData = Array.prototype.concat.apply(
        [],
        node.map((v) => v.data)
      )
      const layout = {}

      baseData.forEach((m) => (layout[m.prop] = m.value))
      this.layout = layout
    },

    // 设置样式
    setStyle() {
      this.$nextTick(() => {
        const elements = document.querySelector(`.ui-h5__dragbox-${this.h5.current} .base-text`)
        const width = elements.offsetWidth
        const height = elements.offsetHeight
        console.log(this.layout.width, width)
        this.$set(this.layout, 'width', this.layout.width === 0 ? width : this.layout.width)
        this.$set(this.layout, 'height', this.layout.height === 0 ? height : this.layout.height)
      })
    },
    roundMousedown(e, index) {
      const moveX = e.movementX
      const moveY = e.movementY
      console.log('down' + index, moveX, moveY)
      this.$emit('on-size', index)
    },
    roundMousemove(e, index) {
      const moveX = e.movementX
      const moveY = e.movementY
      console.log('move' + index, moveX, moveY)
      // this.$emit('on-size', index)
    },
    roundMouseup(e, index) {
      const moveX = e.movementX
      const moveY = e.movementY
      console.log('up' + index, moveX, moveY)
      // this.$emit('on-size', index)
    }
  }
}
</script>

<style scoped lang="scss">
.ui-h5__dragbox {
  position: absolute;
  outline: 1px dashed #ddd;
  user-select: none;
  cursor: move;

  .inline_btn {
    margin: 0px;
  }

  .point {
    box-sizing: border-box;
    z-index: 10;
    position: absolute;
    width: 6px;
    height: 6px;
    border: 2px solid #1890ff;
  }
  .top_left {
    left: -3px;
    top: -3px;
    cursor: nw-resize;
  }
  .top_top {
    left: 50%;
    top: -3px;
    margin-left: -3px;
    cursor: n-resize;
  }
  .top_right {
    right: -3px;
    top: -3px;
    cursor: ne-resize;
  }
  .bottom_left {
    left: -3px;
    bottom: -3px;
    cursor: sw-resize;
  }
  .bottom_bottom {
    left: 50%;
    margin-left: -3px;
    bottom: -3px;
    cursor: s-resize;
  }
  .bottom_right {
    right: -3px;
    bottom: -3px;
    cursor: se-resize;
  }
}
</style>
