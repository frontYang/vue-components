<template>
  <!-- 组件元素 -->
  <div class="ui-h5__elements">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
