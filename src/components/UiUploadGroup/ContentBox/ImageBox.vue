<template>
  <div class="image-box">
    <el-form :model="formData" :rules="rules">
      <el-form-item>
        <upload label="上传图片" :tip="element.description" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from './Upload'
export default {
  components: {
    upload: Upload
  },
  props: {
    data: {
      type: Object
    },
    element: {
      type: Object
    }
  },
  data() {
    return {
      formData: {},
      rules: {}
    }
  },
  mounted() {},
  methods: {
    select() {}
  }
}
</script>

<style scoped lang="scss">
.image-box {
  width: 250px;
  display: inline-block;
}
</style>
