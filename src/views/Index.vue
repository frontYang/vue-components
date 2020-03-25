<template>
	<div class="page page-index">
		<h2>todoList</h2>
    <p v-for="(item, index) in todoList" :key="index">
      <el-checkbox :disabled="true" :value="item.checked"></el-checkbox>
      <el-link type="primary" :disabled="!item.checked" :href="item.url">{{item.label}}</el-link>
    </p>
	</div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      todoList: [
        {
          label: '时间拖拽选中__样式一',
          checked: true,
          url: '/#/common/dragtime'
        },
        {
          label: '时间拖拽选中__样式二',
          checked: true,
          url: '/#/common/dragtime2'
        },
        {
          label: '级联多选__样式一',
          url: '/#/common/cascader',
          checked: true
        },
        {
          label: '级联多选__样式二',
          url: '/#/common/cascader2',
          checked: true
        },
        {
          label: '树形数组下拉框模糊搜索',
          url: '/#/common/treesearch',
          checked: true
        },
        {
          label: '下拉链接预览h5页面',
          url: '/#/common/selectdrop',
          checked: true
        },
        {
          label: '鼠标移入图片内 自动播放对应视频',
          url: '/#/common/videoplay',
          checked: true
        },
        {
          label: '鼠标移入固定宽高标签内 图片自动滚动至底部',
          url: '/#/common/imagescroll',
          checked: true
        },
        {
          label: '自定义日期设置&多选',
          url: '/#/common/calendar_custom',
          checked: true
        },
        {
          label: '富文本编辑器（背景图片）',
          checked: true,
          url: '/#/common/editor'
        },
        {
          label: '头条上传组件（tab内嵌套tab，动态控制）',
          checked: false
        },
        {
          label: 'h5可视化网站',
          checked: false
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-link{
  margin-left: 10px;
}
</style>

