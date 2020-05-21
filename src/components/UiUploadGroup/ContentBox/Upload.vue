<template>
  <div class="upload" v-loading="loading">
    <div class="upload-box">
      <el-upload
        :class="fileList.length > 0 ? 'upload hide' : 'upload'"
        action="http://192.168.3.24:2020/api/adp/toutiao/upload"
        :show-file-list="false"
        :file-list="fileList"
        :multiple="true"
        :on-success="onSuccess"
        :on-error="onError"
        :on-progress="onProgress"
        :on-change="onChange"
        :before-upload="onBeforeUpload"
      >
        <el-button class="btn-upload" size="small" icon="el-icon-upload">{{ label }}</el-button>
      </el-upload>

      <!-- 自定义图片预览 -->
      <div :class="fileList.length <= 0 ? 'upload upload-preview hide' : 'upload upload-preview'">
        <div class="preview-item" v-for="(file, index) in fileList" :key="index">
          <img :src="file.url" />
          <div class="operation">
            <i class="el-icon-delete" @click="onRemove"></i>
          </div>
        </div>
      </div>
      <div class="upload-sub">
        <el-button class="btn-source" size="small" @click="select">{{ btnLabel }}</el-button>
      </div>
    </div>
    <div class="upload-tip">{{ tip }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '上传图片'
    },
    btnLabel: {
      type: String,
      default: '素材库'
    },
    tip: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      fileList: []
    }
  },
  components: {},
  methods: {
    select() {},
    onChange(file, fileList) {
      console.log('onChange', file, fileList)
    },
    onBeforeUpload(file) {
      this.loading = true
      console.log('onBeforeUpload', file)
    },
    onSuccess(response, file, fileList) {
      console.log('onSuccess', response, file, fileList)
      this.fileList.push(response.data)
      this.loading = false
      this.fileList.length > 1 && this.$emit('on-multi-upload', this.fileList)
    },
    onError(err, file, fileList) {
      this.loading = false
      console.log('onError', err, file, fileList)
    },
    onProgress(event, file, fileList) {
      console.log('onProgress', event, file, fileList)
    },
    onRemove() {
      this.fileList = []
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/_var';
.upload {
  display: inline-block;
  position: relative;
  .upload-tip {
    color: $gray;
    font-size: 12px;
    line-height: 20px;
  }
  .upload-box {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    .upload {
      width: 100%;
      ::v-deep .el-upload {
        width: 100%;
      }

      &.hide {
        display: none !important;
      }
    }
    .el-button {
      background: #f8f8f8;
    }

    .btn-upload {
      width: 100%;
      height: 115px;
      border-style: dashed;
    }

    .upload-sub {
      display: flex;
      margin-top: 10px;
    }

    .btn-source {
      flex: 1;
    }
  }

  &.upload-preview {
    height: 115px;
    display: flex;
    justify-content: center;
    align-items: center;

    .preview-item {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 100%;
        max-height: 100%;
      }
      .operation {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        cursor: pointer;
        text-align: right;

        &:hover {
          color: $primary;
        }
      }
    }
  }
}
</style>
