<template>
  <div v-loading="loading" class="upload">
    <div class="upload-box">
      <el-upload
        ref="upload"
        :class="fileList.length > 0 ? 'upload hide' : 'upload'"
        action="http://192.168.3.24:2020/api/adp/toutiao/upload"
        :show-file-list="false"
        :accept="accept"
        :multiple="true"
        :on-success="onSuccess"
        :on-error="onError"
        :before-upload="onBeforeUpload"
      >
        <el-button class="btn-upload" size="small" icon="el-icon-upload">
          {{
            label
          }}
        </el-button>
      </el-upload>
      <!-- :file-list="fileList" -->
      <!-- 自定义图片预览 -->
      <div
        :class="
          fileList.length <= 0
            ? 'upload upload-preview hide'
            : 'upload upload-preview'
        "
      >
        <div
          v-for="(file, index) in fileList"
          :key="index"
          class="preview-item"
        >
          <template v-if="index === 0">
            <img :src="file.url">
            <div class="operation">
              <i class="el-icon-delete" @click="onRemove" />
            </div>
          </template>
        </div>
      </div>
      <div class="upload-sub">
        <el-button class="btn-source" size="small" @click="select">
          {{
            btnLabel
          }}
        </el-button>
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
    },
    accept: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      fileList: [],
      temp: []
    }
  },
  created() {
    this.fileList = this.getFileList()
    this.fileList.forEach((item, index) => {
      if (!item.response.data.view_url || item.response.data.view_url === '') {
        this.fileList.splice(index, 1)
      }
    })
  },
  methods: {
    select() {},
    onBeforeUpload(file) {
      this.loading = true
    },
    onSuccess(response, file, fileList) {
      console.log('onSuccess', response, file, fileList)
      this.fileList.push(response.data.url)
      this.loading = false
      // this.temp = []
      // this.setTemp(this.$refs.upload.uploadFiles)
      this.fileList.length > 1 && this.$emit('on-multi-upload', this.fileList)
    },
    onError(err, file, fileList) {
      this.loading = false
      console.log('onError', err, file, fileList)
    },
    onRemove() {
      this.fileList = []
    },
    /* 获取文件列表 */
    getFileList() {
      const value = this.value
      const arr = [
        {
          response: {
            data: Object.assign({}, value)
          }
        }
      ]
      return arr
    }

    /* 初始化temp */
    /*  setTemp(data) {
      data.forEach((e) => {
        // 把成功的状态的对象过滤过来，不处理状态为uploading的
        if (e.status === 'success') {
          if (e.response) {
            // 处理后台返回的值
            this.temp.push({
              response: e.response,
              status: 'success'
            })
          } else if (e.fkStaMemberQyfjId_) {
            // 数组里已经处理的对象不做处理
          }
        }
      })
    } */
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_var";

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
