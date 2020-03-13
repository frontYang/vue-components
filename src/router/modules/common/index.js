
import Common from '@/views/Common/Index'
import Dragtime from '@/views/Common/Dragtime/Index'
import VideoPlay from '@/views/Common/VideoPlay/Index'

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
      path: '/common/videoplay',
      name: 'videoplay',
      component: VideoPlay,
      meta: {
        title: '时间拖拽'
      }
    }
  ]
}
