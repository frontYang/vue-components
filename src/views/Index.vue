<template>
	<div class="page page-index">
		<p>欢迎！</p>
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
          label: '时间拖拽选中',
          checked: true,
          url: '/#/common/dragtime'
        },
        {
          label: '级联多选__样式一',
          checked: false
        },
        {
          label: '级联多选__样式二',
          checked: false
        },
        {
          label: '下拉链接预览h5页面',
          checked: false
        },
        {
          label: 'h5可视化网站',
          checked: false
        },
        {
          label: '鼠标移入固定宽高标签内 图片自动滚动至底部',
          checked: false
        },
        {
          label: '鼠标移入图片内 自动播放对应视频',
          url: '/#/common/videoplay',
          checked: true
        }
      ]
    }
  },
  components: {

  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.el-link{
  margin-left: 10px;
}
</style>

