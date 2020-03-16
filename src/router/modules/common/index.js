
import Common from '@/views/Common/Index'
import Dragtime from '@/views/Common/Dragtime/Index'
import VideoPlay from '@/views/Common/VideoPlay/Index'
import ImageScroll from '@/views/Common/ImageScroll/Index'
import SelectDrop from '@/views/Common/SelectDrop/Index'
import Cascader from '@/views/Common/Cascader/Index'

// 子路由
export default {
  path: '/common',
  name: 'common',
  component: Common,
  meta: {
    title: 'Common'
  },
  children: [
    {
      path: '/common/dragtime',
      name: 'dragtime',
      component: Dragtime,
      meta: {
        title: '时间拖拽'
      }
    },
    {
      path: '/common/cascader',
      name: 'cascader',
      component: Cascader,
      meta: {
        title: '时间拖拽'
      }
    },
    {
      path: '/common/videoplay',
      name: 'videoplay',
      component: VideoPlay,
      meta: {
        title: '鼠标移入图片内 自动播放对应视频'
      }
    },
    {
      path: '/common/imagescroll',
      name: 'imagescroll',
      component: ImageScroll,
      meta: {
        title: '鼠标移入固定宽高标签内 图片自动滚动至底部'
      }
    },
    {
      path: '/common/selectdrop',
      name: 'selectdrop',
      component: SelectDrop,
      meta: {
        title: '鼠标移入固定宽高标签内 图片自动滚动至底部'
      }
    }
  ]
}
