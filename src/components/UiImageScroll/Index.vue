<template>
  <div class="ui-image-scroll">
    <div
      class="image-item"
      v-for="(item, index) in list" :key="index"
      @mouseenter="onMouseenter(index, item)"
      @mouseleave="onMouseleave(index, item)"
    >
      <el-image :src="item.image" :lazy="true" fits="contain">
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-loading"></i>
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
const timmer = null
function scroll(s, t, obj) {
  const sp = 10
  let cont = Number.parseInt(t / sp)
  const oneLong = s / cont
  const timer = setInterval(() => {
    if (cont > 0) {
      cont--
      obj.style.marginTop = `-${oneLong}px`
    } else {
      clearInterval(timer)
    }
  }, sp)
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
  components: {

  },
  mounted() {},
  methods: {
    onMouseenter(index, item) {
      if (timmer) { clearTimeout(timmer) }

      // timmer = setTimeout(() => {
      const itemObj = document.querySelectorAll('.image-item')[index]
      const imgObj = itemObj.querySelector('img')
      scroll(20, 500 - 240, imgObj)

      // itemObj.className = 'image-item slidein'
      // imgObj.offsetTop = `-${500}`
      // }, 1000)
    },
    onMouseleave(index, item) {
      // const itemObj = document.querySelectorAll('.image-item')[index]
      // itemObj.className = 'image-item'
      const itemObj = document.querySelectorAll('.image-item')[index]
      const imgObj = itemObj.querySelector('img')
      imgObj.style.marginTop = 0
    }
  }
}
</script>

<style lang="scss">
@keyframes slideIn {
  from { transform: translateY(-100%) }
  to   { transform: translateY(0); }
}

.ui-image-scroll{
  display: flex;
  .image-item{
    position: relative;
    height: 240px;
    width: 320px;
    margin: 10px;
    box-sizing: border-box;
    cursor: pointer;

    &.slidein {
      img{
        animation: 5s ease-in 1s reverse both running slideIn;
      }
    }

  }
  .el-image{
    height: 240px;
    width: 320px;
    .el-image__inner{
      height: auto;
    }
  }
  .image-slot{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .el-icon-loading{
    font-size: 40px;
    color: #333;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -20px 0 0 -20px;
  }
}
</style>
