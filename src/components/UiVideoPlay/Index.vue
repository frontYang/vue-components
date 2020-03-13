<template>
  <div class="ui-video-play" id="UiVideoPlay">
    <div
      class="video-item"
      v-for="(item, index) in list" :key="index"
      @mouseenter="onMouseenter(index, item)"
      @mouseleave="onMouseleave(index, item)"
    >
      <el-image :src="item.cover" :lazy="true" fits="contain">
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-loading"></i>
        </div>
      </el-image>
      <i class="icon-loading el-icon-loading"></i>
      <i class="el-icon-video-play"></i>
    </div>
  </div>
</template>

<script>
let timmer = null
const createVideo = (src) => {
  const video = document.createElement('video')
  video.className = 'video'
  video.src = src
  video.autoplay = true
  return video
}
export default {
  data() {
    return {
      list: [
        {
          cover: '//dummyimage.com/320x240',
          video: '//www.w3school.com.cn/i/movie.ogg'
        },
        {
          cover: '//dummyimage.com/320x240',
          video: '//www.w3school.com.cn/i/movie.ogg'
        }
      ]
    }
  },
  methods: {
    onMouseenter(index, item) {
      if (timmer) { clearTimeout(timmer) }

      timmer = setTimeout(() => {
        const UiVideoPlay = document.getElementById('UiVideoPlay')
        const itemObj = UiVideoPlay.querySelectorAll('.video-item')[index]
        const loading = itemObj.querySelector('.icon-loading')
        const videoObj = itemObj.querySelectorAll('video')
        if (videoObj.length > 0) { return }

        loading.style.display = 'block'

        this.$utils.loadVideo(item.video).then(res => {
          itemObj.appendChild(createVideo(item.video))
          loading.style.display = 'none'
        })
      }, 1000)
    },
    onMouseleave(index, item) {
      if (timmer) { clearTimeout(timmer) }
      const UiVideoPlay = document.getElementById('UiVideoPlay')
      const itemObj = UiVideoPlay.querySelectorAll('.video-item')[index]
      const loading = itemObj.querySelector('.icon-loading')
      const videoObj = itemObj.querySelectorAll('video')

      if (videoObj.length <= 0) { return }
      itemObj.removeChild(videoObj[0])
      loading.style.display = 'none'
    }
  }
}
</script>

<style lang="scss">

.ui-video-play{
  display: flex;
  .video-item{
    position: relative;
    height: 240px;
    width: 320px;
    margin: 10px;
    box-sizing: border-box;
  }
  .el-image{
    height: 240px;
    width: 320px;
  }
  .video{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .image-slot{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .el-icon-loading{
      display: block !important;
    }
  }
  .el-icon-loading{
    display: none;
    font-size: 40px;
    color: #333;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -20px 0 0 -20px;
  }
  .el-icon-video{
    font-size: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
