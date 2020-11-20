// import Common from '@/views/Common/Index'
import Home from '@/views/Home'
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
import DragTable from '@/views/Common/DragTable/Index'
import UploadGroup from '@/views/Common/UploadGroup/Index'

// 子路由
export default {
  path: '/common',
  name: 'common',
  component: Home,
  meta: {
    title: 'Common'
  },
  children: [
    {
      path: 'dragtime',
      name: 'dragtime',
      component: Dragtime,
      meta: {
        title: '时间拖拽__样式一'
      }
    },
    {
      path: 'dragtime2',
      name: 'dragtime2',
      component: Dragtime2,
      meta: {
        title: '时间拖拽__样式二'
      }
    },
    {
      path: 'cascader',
      name: 'cascader',
      component: Cascader,
      meta: {
        title: '级联多选__样式一'
      }
    },
    {
      path: 'cascader2',
      name: 'cascader2',
      component: Cascader2,
      meta: {
        title: '级联多选__样式二'
      }
    },
    {
      path: 'videoplay',
      name: 'videoplay',
      component: VideoPlay,
      meta: {
        title: '鼠标移入图片内 自动播放对应视频'
      }
    },
    {
      path: 'imagescroll',
      name: 'imagescroll',
      component: ImageScroll,
      meta: {
        title: '鼠标移入固定宽高标签内 图片自动滚动至底部'
      }
    },
    {
      path: 'selectdrop',
      name: 'selectdrop',
      component: SelectDrop,
      meta: {
        title: '鼠标移入固定宽高标签内 图片自动滚动至底部'
      }
    },
    {
      path: 'treesearch',
      name: 'treesearch',
      component: TreeSearch,
      meta: {
        title: '树形数组下拉框搜索'
      }
    },
    {
      path: 'calendar_custom',
      name: 'calendar_custom',
      component: CalendarCustom,
      meta: {
        title: '树形数组下拉框搜索'
      }
    },
    {
      path: 'drag_table',
      name: 'drag_table',
      component: DragTable,
      meta: {
        title: '表格拖拽排序'
      }
    },
    {
      path: 'editor',
      name: 'editor',
      component: Editor,
      meta: {
        title: '富文本编辑器（背景图片）'
      }
    },
    {
      path: 'h5',
      name: 'h5',
      component: H5,
      meta: {
        title: 'h5可视化'
      }
    },
    {
      path: 'upload_group',
      name: 'UploadGroup',
      component: UploadGroup,
      meta: {
        title: '头条上传组件'
      }
    }
  ]
}
