import Common from '@/views/Common/Index'
import Dragtime from '@/views/Common/Dragtime/Index'
import Dragtime2 from '@/views/Common/Dragtime2/Index'
import VideoPlay from '@/views/Common/VideoPlay/Index'
import ImageScroll from '@/views/Common/ImageScroll/Index'
import SelectDrop from '@/views/Common/SelectDrop/Index'
import Cascader from '@/views/Common/Cascader/Index'
import Cascader2 from '@/views/Common/Cascader2/Index'
import TreeSearch from '@/views/Common/TreeSearch/Index'
import CalendarCustom from '@/views/Common/CalendarCustom/Index'
import Editor from '@/views/Common/Editor/Index'
import H5 from '@/views/Common/H5/Index'
import UploadGroup from '@/views/Common/UploadGroup/Index'

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
        title: '时间拖拽__样式一'
      }
    },
    {
      path: '/common/dragtime2',
      name: 'dragtime2',
      component: Dragtime2,
      meta: {
        title: '时间拖拽__样式二'
      }
    },
    {
      path: '/common/cascader',
      name: 'cascader',
      component: Cascader,
      meta: {
        title: '级联多选__样式一'
      }
    },
    {
      path: '/common/cascader2',
      name: 'cascader2',
      component: Cascader2,
      meta: {
        title: '级联多选__样式二'
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
    },
    {
      path: '/common/treesearch',
      name: 'treesearch',
      component: TreeSearch,
      meta: {
        title: '树形数组下拉框搜索'
      }
    },
    {
      path: '/common/calendar_custom',
      name: 'calendar_custom',
      component: CalendarCustom,
      meta: {
        title: '树形数组下拉框搜索'
      }
    },
    {
      path: '/common/editor',
      name: 'editor',
      component: Editor,
      meta: {
        title: '富文本编辑器（背景图片）'
      }
    },
    {
      path: '/common/h5',
      name: 'h5',
      component: H5,
      meta: {
        title: 'h5可视化'
      }
    },
    {
      path: '/common/upload_group',
      name: 'UploadGroup',
      component: UploadGroup,
      meta: {
        title: '头条上传组件'
      }
    }
  ]
}
