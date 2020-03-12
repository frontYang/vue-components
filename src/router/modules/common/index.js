
import Common from '@/views/Common/Index'
import Dragtime from '@/views/Common/Dragtime/Index'

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
    }
  ]
}
