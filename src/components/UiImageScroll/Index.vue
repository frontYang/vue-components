<template>
  <div class="ui-image-scroll scrollbar">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="image-item"
      @mouseenter="onMouseenter(index, item)"
      @mouseleave="onMouseleave(index, item)"
    >
      <el-image :src="item.image" :lazy="true" fits="contain">
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-loading" />
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
let timmer = null
let timmerInterval = null
function scrollImage(item, space) {
  return setInterval(() => {
    if (space <= item.offsetHeight - 240) {
      item.style.marginTop = -space + 'px'
      space++
    } else {
      clearInterval(timmerInterval)
    }
  }, 8)
}

export default {
  data() {
    return {
      list: [
        {
          image: '//dummyimage.com/320x600'
        },
        {
          image: '//dummyimage.com/320x500'
        }
      ]
    }
  },

  methods: {
    onMouseenter(index, item) {
      if (timmer) {
        clearTimeout(timmer)
      }
      if (timmerInterval) {
        clearInterval(timmerInterval)
      }
      timmer = setTimeout(() => {
        const itemObj = document.querySelectorAll('.image-item')[index]
        const imgObj = itemObj.querySelector('img')
        imgObj.style.transition = 'initial'
        timmerInterval = scrollImage(imgObj, 50)
      }, 1000)
    },
    onMouseleave(index, item) {
      if (timmer) {
        clearTimeout(timmer)
      }
      if (timmerInterval) {
        clearInterval(timmerInterval)
      }
      const itemObj = document.querySelectorAll('.image-item')[index]
      const imgObj = itemObj.querySelector('img')
      imgObj.style.transition = 'all .6s'
      imgObj.style.marginTop = 0 + 'px'
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_common.scss";

.ui-image-scroll {
  display: flex;

  .image-item {
    position: relative;
    height: 240px;
    width: 320px;
    margin: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .el-image {
    height: 240px;
    width: 320px;
    // overflow-y: scroll;

    img {
      // transition: all .6s;
    }

    .el-image__inner {
      height: auto;
    }
  }

  .image-slot {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .el-icon-loading {
    font-size: 40px;
    color: #333;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -20px 0 0 -20px;
  }
}
</style>
